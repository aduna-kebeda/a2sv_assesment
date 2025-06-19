import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { foodApi } from "@/lib/api"
import { transformApiMealToMeal, transformMealInputToApiRequest } from "@/lib/utils"
import type { CreateMealInput, UpdateMealInput } from "@/lib/types"
import { toast } from "react-hot-toast"

// Query keys
export const mealKeys = {
  all: ["meals"] as const,
  lists: () => [...mealKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...mealKeys.lists(), { filters }] as const,
  details: () => [...mealKeys.all, "detail"] as const,
  detail: (id: string) => [...mealKeys.details(), id] as const,
  search: (term: string) => [...mealKeys.all, "search", term] as const,
}

// Get all meals
export function useMeals() {
  return useQuery({
    queryKey: mealKeys.lists(),
    queryFn: async () => {
      const apiMeals = await foodApi.getFoods()
      return apiMeals.map(transformApiMealToMeal)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Search meals
export function useSearchMeals(searchTerm: string) {
  return useQuery({
    queryKey: mealKeys.search(searchTerm),
    queryFn: async () => {
      if (!searchTerm.trim()) {
        const apiMeals = await foodApi.getFoods()
        return apiMeals.map(transformApiMealToMeal)
      }
      const apiMeals = await foodApi.searchFoods(searchTerm)
      return apiMeals.map(transformApiMealToMeal)
    },
    enabled: true,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  })
}

// Get single meal
export function useMeal(id: string) {
  return useQuery({
    queryKey: mealKeys.detail(id),
    queryFn: async () => {
      const apiMeal = await foodApi.getFoodById(id)
      return transformApiMealToMeal(apiMeal)
    },
    enabled: !!id,
  })
}

// Create meal mutation
export function useCreateMeal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateMealInput) => {
      const apiRequest = transformMealInputToApiRequest(data)
      const apiMeal = await foodApi.createFood(apiRequest)
      return transformApiMealToMeal(apiMeal)
    },
    onSuccess: (newMeal) => {
      // Invalidate and refetch meals list
      queryClient.invalidateQueries({ queryKey: mealKeys.lists() })
      queryClient.invalidateQueries({ queryKey: mealKeys.all })

      // Add the new meal to the cache
      queryClient.setQueryData(mealKeys.detail(newMeal.id), newMeal)

      toast.success("Food item created successfully!")
    },
    onError: (error: any) => {
      console.error("Create meal error:", error)
      toast.error(error?.response?.data?.message || "Failed to create food item")
    },
  })
}

// Update meal mutation
export function useUpdateMeal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateMealInput) => {
      const { id, ...updateData } = data
      const apiRequest = transformMealInputToApiRequest(updateData)
      const apiMeal = await foodApi.updateFood(id, apiRequest)
      return transformApiMealToMeal(apiMeal)
    },
    onSuccess: (updatedMeal) => {
      // Update the specific meal in cache
      queryClient.setQueryData(mealKeys.detail(updatedMeal.id), updatedMeal)

      // Invalidate lists to ensure consistency
      queryClient.invalidateQueries({ queryKey: mealKeys.lists() })
      queryClient.invalidateQueries({ queryKey: mealKeys.all })

      toast.success("Food item updated successfully!")
    },
    onError: (error: any) => {
      console.error("Update meal error:", error)
      toast.error(error?.response?.data?.message || "Failed to update food item")
    },
  })
}

// Delete meal mutation
export function useDeleteMeal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await foodApi.deleteFood(id)
      return id
    },
    onSuccess: (deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: mealKeys.detail(deletedId) })

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: mealKeys.lists() })
      queryClient.invalidateQueries({ queryKey: mealKeys.all })

      toast.success("Food item deleted successfully!")
    },
    onError: (error: any) => {
      console.error("Delete meal error:", error)
      toast.error(error?.response?.data?.message || "Failed to delete food item")
    },
  })
}
