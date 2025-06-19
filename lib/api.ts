import axios from "axios"
import type { ApiMeal, CreateMealRequest } from "./types"

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io"

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// API functions
export const foodApi = {
  // Get all foods
  getFoods: async (): Promise<ApiMeal[]> => {
    const response = await api.get<ApiMeal[]>("/Food")
    return response.data
  },

  // Get foods with search filter
  searchFoods: async (searchTerm: string): Promise<ApiMeal[]> => {
    const response = await api.get<ApiMeal[]>(`/Food?name=${encodeURIComponent(searchTerm)}`)
    return response.data
  },

  // Get single food by ID
  getFoodById: async (id: string): Promise<ApiMeal> => {
    const response = await api.get<ApiMeal>(`/Food/${id}`)
    return response.data
  },

  // Create new food
  createFood: async (data: CreateMealRequest): Promise<ApiMeal> => {
    const response = await api.post<ApiMeal>("/Food", data)
    return response.data
  },

  // Update existing food
  updateFood: async (id: string, data: Partial<CreateMealRequest>): Promise<ApiMeal> => {
    const response = await api.put<ApiMeal>(`/Food/${id}`, data)
    return response.data
  },

  // Delete food
  deleteFood: async (id: string): Promise<void> => {
    await api.delete(`/Food/${id}`)
  },
}
