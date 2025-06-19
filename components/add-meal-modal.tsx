"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { createMeal } from "@/lib/store/slices/mealsSlice"
import { CreateMealSchema, type CreateMealInput } from "@/lib/types"

interface AddMealModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddMealModal({ isOpen, onClose }: AddMealModalProps) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.meals)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateMealInput>({
    resolver: zodResolver(CreateMealSchema),
    defaultValues: {
      food_rating: 0,
      price: 0,
      restaurant_status: "Open Now",
    },
  })

  const restaurantStatus = watch("restaurant_status")

  const onSubmit = async (data: CreateMealInput) => {
    try {
      await dispatch(createMeal(data)).unwrap()
      reset()
      onClose()
    } catch (error) {
      console.error("Submit error:", error)
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm max-h-[80vh] overflow-y-auto shadow-2xl">
        {/* Header with Orange Background */}
        <div className="bg-primary-500 text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Add a meal</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="p-1 hover:bg-white/20 rounded-full text-white"
              disabled={loading}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3">
          {/* Food Name */}
          <div>
            <Label htmlFor="food_name" className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block">
              Food name
            </Label>
            <Input
              id="food_name"
              {...register("food_name")}
              name="food_name"
              type="text"
              placeholder="Food name"
              className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs"
              disabled={loading}
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
                Food Name is required
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div>
            <Label htmlFor="food_rating" className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block">
              Food rating
            </Label>
            <Input
              id="food_rating"
              {...register("food_rating", { valueAsNumber: true })}
              name="food_rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs"
              disabled={loading}
            />
            {errors.food_rating && (
              <p id="food-rating-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
                Food Rating must be a number
              </p>
            )}
          </div>

          {/* Food Image URL */}
          <div>
            <Label htmlFor="food_image" className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block">
              Food image URL
            </Label>
            <Input
              id="food_image"
              {...register("food_image")}
              name="food_image"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs"
              disabled={loading}
            />
            {errors.food_image && (
              <p id="food-image-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
                Food Image URL is required
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div>
            <Label
              htmlFor="restaurant_name"
              className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block"
            >
              Restaurant name
            </Label>
            <Input
              id="restaurant_name"
              {...register("restaurant_name")}
              name="restaurant_name"
              type="text"
              placeholder="Restaurant name"
              className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs"
              disabled={loading}
            />
            {errors.restaurant_name && (
              <p id="restaurant-name-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
                Restaurant Name is required
              </p>
            )}
          </div>

          {/* Restaurant Logo URL */}
          <div>
            <Label
              htmlFor="restaurant_logo"
              className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block"
            >
              Restaurant logo URL
            </Label>
            <Input
              id="restaurant_logo"
              {...register("restaurant_logo")}
              name="restaurant_logo"
              type="url"
              placeholder="https://example.com/logo.jpg"
              className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs"
              disabled={loading}
            />
            {errors.restaurant_logo && (
              <p id="restaurant-logo-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
                Restaurant Logo URL is required
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div>
            <Label
              htmlFor="restaurant_status"
              className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block"
            >
              Restaurant status (optional)
            </Label>
            <Select
              name="restaurant_status"
              value={restaurantStatus}
              onValueChange={(value: "Open Now" | "Closed") => setValue("restaurant_status", value)}
              disabled={loading}
            >
              <SelectTrigger className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                <SelectItem value="Open Now" className="dark:text-white dark:hover:bg-gray-700">
                  Open Now
                </SelectItem>
                <SelectItem value="Closed" className="dark:text-white dark:hover:bg-gray-700">
                  Closed
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="restaurant-status-error" className="text-red-500 dark:text-red-400 text-xs mt-1">
                Restaurant Status must be 'Open Now' or 'Closed'
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1 block">
              Price (optional)
            </Label>
            <Input
              id="price"
              {...register("price", { valueAsNumber: true })}
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="12.99"
              className="h-9 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-xs"
              disabled={loading}
            />
            {errors.price && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.price.message}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-500 hover:bg-primary-600 text-white h-9 font-medium shadow-sm transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 h-9 font-medium border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
