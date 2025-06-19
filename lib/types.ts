import { z } from "zod"

// API Response Types (matching the backend structure)
export const ApiMealSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  avatar: z.string().url(),
  rating: z.string(),
  open: z.boolean(),
  logo: z.string().url(),
  price: z.string().optional(),
})

export const ApiMealArraySchema = z.array(ApiMealSchema)

export type ApiMeal = z.infer<typeof ApiMealSchema>

// Frontend Types (for our UI)
export interface Meal {
  id: string
  food_name: string
  food_rating: number
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: "Open Now" | "Closed"
  price: number
  category: string
  createdAt: string
}

// Form validation schemas
export const CreateMealSchema = z.object({
  food_name: z.string().min(1, "Food Name is required"),
  food_rating: z.number().min(0).max(5, "Food Rating must be between 0 and 5"),
  food_image: z.string().url("Food Image URL is required"),
  restaurant_name: z.string().min(1, "Restaurant Name is required"),
  restaurant_logo: z.string().url("Restaurant Logo URL is required"),
  restaurant_status: z.enum(["Open Now", "Closed"], {
    errorMap: () => ({ message: "Restaurant Status must be 'Open Now' or 'Closed'" }),
  }),
  price: z.number().min(0).optional(),
})

export const UpdateMealSchema = CreateMealSchema.extend({
  id: z.string(),
})

export type CreateMealInput = z.infer<typeof CreateMealSchema>
export type UpdateMealInput = z.infer<typeof UpdateMealSchema>

// API request/response types
export interface CreateMealRequest {
  name: string
  avatar: string
  rating: string
  open: boolean
  logo: string
  price?: string
}

export interface UpdateMealRequest extends CreateMealRequest {
  id: string
}
