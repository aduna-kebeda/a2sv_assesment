import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { foodApi } from "@/lib/api"
import { transformApiMealToMeal, transformMealInputToApiRequest } from "@/lib/utils"
import type { Meal, CreateMealInput, UpdateMealInput } from "@/lib/types"
import { toast } from "react-hot-toast"

interface MealsState {
  meals: Meal[]
  filteredMeals: Meal[]
  searchQuery: string
  selectedMeal: Meal | null
  loading: boolean
  error: string | null
  lastFetch: number | null
}

// Helper functions for localStorage
const loadFromStorage = (): Partial<MealsState> => {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem("foodwagon-meals")
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

const saveToStorage = (state: MealsState) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(
      "foodwagon-meals",
      JSON.stringify({
        meals: state.meals,
        lastFetch: state.lastFetch,
      }),
    )
  } catch {
    // Ignore storage errors
  }
}

const storedState = loadFromStorage()

const initialState: MealsState = {
  meals: storedState.meals || [],
  filteredMeals: storedState.meals || [],
  searchQuery: "",
  selectedMeal: null,
  loading: false,
  error: null,
  lastFetch: storedState.lastFetch || null,
}

// Async thunks
export const fetchMeals = createAsyncThunk("meals/fetchMeals", async (_, { rejectWithValue }) => {
  try {
    const apiMeals = await foodApi.getFoods()
    return apiMeals.map(transformApiMealToMeal)
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to fetch meals"
    return rejectWithValue(message)
  }
})

export const searchMeals = createAsyncThunk("meals/searchMeals", async (searchTerm: string, { rejectWithValue }) => {
  try {
    if (!searchTerm.trim()) {
      const apiMeals = await foodApi.getFoods()
      return { meals: apiMeals.map(transformApiMealToMeal), searchTerm }
    }
    const apiMeals = await foodApi.searchFoods(searchTerm)
    return { meals: apiMeals.map(transformApiMealToMeal), searchTerm }
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to search meals"
    return rejectWithValue(message)
  }
})

export const createMeal = createAsyncThunk("meals/createMeal", async (data: CreateMealInput, { rejectWithValue }) => {
  try {
    const apiRequest = transformMealInputToApiRequest(data)
    const apiMeal = await foodApi.createFood(apiRequest)
    const newMeal = transformApiMealToMeal(apiMeal)
    toast.success("Food item created successfully!")
    return newMeal
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to create food item"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const updateMeal = createAsyncThunk("meals/updateMeal", async (data: UpdateMealInput, { rejectWithValue }) => {
  try {
    const { id, ...updateData } = data
    const apiRequest = transformMealInputToApiRequest(updateData)
    const apiMeal = await foodApi.updateFood(id, apiRequest)
    const updatedMeal = transformApiMealToMeal(apiMeal)
    toast.success("Food item updated successfully!")
    return updatedMeal
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to update food item"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const deleteMeal = createAsyncThunk("meals/deleteMeal", async (id: string, { rejectWithValue }) => {
  try {
    await foodApi.deleteFood(id)
    toast.success("Food item deleted successfully!")
    return id
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to delete food item"
    toast.error(message)
    return rejectWithValue(message)
  }
})

export const fetchMealById = createAsyncThunk("meals/fetchMealById", async (id: string, { rejectWithValue }) => {
  try {
    const apiMeal = await foodApi.getFoodById(id)
    return transformApiMealToMeal(apiMeal)
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || "Failed to fetch meal"
    return rejectWithValue(message)
  }
})

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
      // Filter meals locally if we have data
      if (state.meals.length > 0) {
        const query = action.payload.toLowerCase()
        state.filteredMeals = query
          ? state.meals.filter(
              (meal) =>
                meal.food_name.toLowerCase().includes(query) || meal.restaurant_name.toLowerCase().includes(query),
            )
          : state.meals
      }
    },
    setSelectedMeal: (state, action: PayloadAction<Meal | null>) => {
      state.selectedMeal = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    clearMeals: (state) => {
      state.meals = []
      state.filteredMeals = []
      state.lastFetch = null
      saveToStorage(state)
    },
  },
  extraReducers: (builder) => {
    // Fetch meals
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading = false
        state.meals = action.payload
        state.filteredMeals = state.searchQuery
          ? action.payload.filter(
              (meal) =>
                meal.food_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                meal.restaurant_name.toLowerCase().includes(state.searchQuery.toLowerCase()),
            )
          : action.payload
        state.lastFetch = Date.now()
        state.error = null
        saveToStorage(state)
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Search meals
    builder
      .addCase(searchMeals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.loading = false
        state.meals = action.payload.meals
        state.filteredMeals = action.payload.meals
        state.searchQuery = action.payload.searchTerm
        state.error = null
        saveToStorage(state)
      })
      .addCase(searchMeals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create meal
    builder
      .addCase(createMeal.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.loading = false
        state.meals.unshift(action.payload) // Add to beginning
        state.filteredMeals = state.searchQuery
          ? state.meals.filter(
              (meal) =>
                meal.food_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                meal.restaurant_name.toLowerCase().includes(state.searchQuery.toLowerCase()),
            )
          : state.meals
        state.error = null
        saveToStorage(state)
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update meal
    builder
      .addCase(updateMeal.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateMeal.fulfilled, (state, action) => {
        state.loading = false
        const index = state.meals.findIndex((meal) => meal.id === action.payload.id)
        if (index !== -1) {
          state.meals[index] = action.payload
        }
        state.filteredMeals = state.searchQuery
          ? state.meals.filter(
              (meal) =>
                meal.food_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                meal.restaurant_name.toLowerCase().includes(state.searchQuery.toLowerCase()),
            )
          : state.meals
        state.selectedMeal = action.payload
        state.error = null
        saveToStorage(state)
      })
      .addCase(updateMeal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Delete meal
    builder
      .addCase(deleteMeal.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.loading = false
        state.meals = state.meals.filter((meal) => meal.id !== action.payload)
        state.filteredMeals = state.filteredMeals.filter((meal) => meal.id !== action.payload)
        if (state.selectedMeal?.id === action.payload) {
          state.selectedMeal = null
        }
        state.error = null
        saveToStorage(state)
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch meal by ID
    builder
      .addCase(fetchMealById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedMeal = action.payload
        state.error = null
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setSearchQuery, setSelectedMeal, clearError, clearMeals } = mealsSlice.actions
export default mealsSlice.reducer
