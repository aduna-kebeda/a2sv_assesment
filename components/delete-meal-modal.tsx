"use client"

import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { deleteMeal } from "@/lib/store/slices/mealsSlice"

interface DeleteMealModalProps {
  isOpen: boolean
  onClose: () => void
  mealId: string
  mealName: string
}

export default function DeleteMealModal({ isOpen, onClose, mealId, mealName }: DeleteMealModalProps) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.meals)

  const handleDelete = async () => {
    try {
      await dispatch(deleteMeal(mealId)).unwrap()
      onClose()
    } catch (error) {
      // Error is handled by the slice
      console.error("Delete error:", error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-4 shadow-2xl">
        <h2 className="text-lg font-bold text-primary-500 mb-3">Delete Meal</h2>

        <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed">
          Are you sure you want to delete "
          <span className="font-semibold text-gray-900 dark:text-white">{mealName}</span>"? This action cannot be
          undone.
        </p>

        <div className="flex gap-2">
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white h-9 font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1 h-9 font-medium border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
