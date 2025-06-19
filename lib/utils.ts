import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ApiMeal, Meal, CreateMealInput, CreateMealRequest } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Transform API data to frontend format
export function transformApiMealToMeal(apiMeal: ApiMeal): Meal {
  return {
    id: apiMeal.id,
    food_name: apiMeal.name,
    food_rating: Number.parseFloat(apiMeal.rating) || 0,
    food_image: apiMeal.avatar,
    restaurant_name: apiMeal.name, // Using name as restaurant name since API doesn't separate them
    restaurant_logo: apiMeal.logo,
    restaurant_status: apiMeal.open ? "Open Now" : "Closed",
    price: Number.parseFloat(apiMeal.price || "0") || 0,
    category: apiMeal.open ? "Open" : "Closed",
    createdAt: apiMeal.createdAt,
  }
}

// Transform frontend form data to API format
export function transformMealInputToApiRequest(input: CreateMealInput): CreateMealRequest {
  return {
    name: input.food_name,
    avatar: input.food_image,
    rating: input.food_rating.toString(),
    open: input.restaurant_status === "Open Now",
    logo: input.restaurant_logo,
    price: input.price?.toString(),
  }
}

// Format price for display
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

// Format rating for display
export function formatRating(rating: number): string {
  return rating.toFixed(1)
}
