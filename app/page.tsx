"use client"

import { useEffect } from "react"
import { Search, Star, Loader2, AlertCircle, Bike, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AddMealModal from "@/components/add-meal-modal"
import EditMealModal from "@/components/edit-meal-modal"
import DeleteMealModal from "@/components/delete-meal-modal"
import MealCardMenu from "@/components/meal-card-menu"
import Footer from "@/components/footer"
import ThemeToggle from "@/components/theme-toggle"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { fetchMeals, searchMeals, setSearchQuery, setSelectedMeal, clearError } from "@/lib/store/slices/mealsSlice"
import {
  setAddModalOpen,
  setEditModalOpen,
  setDeleteModalOpen,
  setSelectedDeliveryType,
  closeAllModals,
} from "@/lib/store/slices/uiSlice"
import { formatPrice, formatRating } from "@/lib/utils"
import type { Meal } from "@/lib/types"

export default function HomePage() {
  const dispatch = useAppDispatch()

  // Redux state
  const { filteredMeals, searchQuery, selectedMeal, loading, error, lastFetch } = useAppSelector((state) => state.meals)

  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen, selectedDeliveryType } = useAppSelector(
    (state) => state.ui,
  )

  // Fetch meals on component mount
  useEffect(() => {
    const shouldFetch = !lastFetch || Date.now() - lastFetch > 5 * 60 * 1000 // 5 minutes
    if (shouldFetch) {
      dispatch(fetchMeals())
    }
  }, [dispatch, lastFetch])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchMeals(searchQuery))
      } else {
        dispatch(fetchMeals())
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, dispatch])

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value))
  }

  const openEditModal = (meal: Meal) => {
    dispatch(setSelectedMeal(meal))
    dispatch(setEditModalOpen(true))
  }

  const openDeleteModal = (meal: Meal) => {
    dispatch(setSelectedMeal(meal))
    dispatch(setDeleteModalOpen(true))
  }

  const handleCloseModals = () => {
    dispatch(closeAllModals())
    dispatch(setSelectedMeal(null))
  }

  const clearErrorMessage = () => {
    dispatch(clearError())
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - Ultra Compact */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-6 bg-primary-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">🍕</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">FoodWagon</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ThemeToggle />
              <Button
                onClick={() => dispatch(setAddModalOpen(true))}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-3 py-1 text-xs h-7"
              >
                Add Food
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Ultra Compact */}
      <section className="bg-hero-gradient py-4 px-3">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-4 items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-1">Are you starving?</h1>
              <p className="text-white/90 text-sm mb-3 font-medium">
                Within a few clicks, find meals that are accessible near you
              </p>

              {/* Search Section - Ultra Compact */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-card">
                {/* Delivery/Pickup Tabs - Ultra Small */}
                <div className="flex gap-1 mb-3">
                  <button
                    onClick={() => dispatch(setSelectedDeliveryType("delivery"))}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                      selectedDeliveryType === "delivery"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Bike className="w-3 h-3" />
                    <span>Delivery</span>
                  </button>
                  <button
                    onClick={() => dispatch(setSelectedDeliveryType("pickup"))}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                      selectedDeliveryType === "pickup"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Pickup</span>
                  </button>
                </div>

                {/* Search Input - Ultra Small */}
                <div className="flex gap-1.5">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-500 w-3.5 h-3.5" />
                    <Input
                      id="search-bar"
                      type="text"
                      placeholder="What do you like to eat today?"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-8 h-8 text-xs border-gray-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    {loading && (
                      <Loader2 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 animate-spin text-primary-500" />
                    )}
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600 text-white h-8 px-3 text-xs font-medium">
                    <Search className="w-3 h-3 mr-1" />
                    Find
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="/images/Image.png"
                  alt="Delicious food bowl"
                  className="w-full h-auto rounded-full max-w-xs mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section - Ultra Compact */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">Featured Meals</h2>

          {/* Error State */}
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-700 dark:text-red-300 flex justify-between items-center text-xs">
                <span>{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearErrorMessage}
                  className="text-red-700 dark:text-red-300 text-xs h-6 px-2"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && filteredMeals.length === 0 && (
            <div className="flex justify-center items-center py-6">
              <div className="flex items-center space-x-1.5">
                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                <span className="text-gray-600 dark:text-gray-300 text-xs">Loading meals...</span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredMeals.length === 0 && (
            <div className="text-center py-6">
              <div className="empty-state-message text-gray-500 dark:text-gray-400 text-sm">
                {searchQuery ? `No meals found for "${searchQuery}"` : "No items available"}
              </div>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => handleSearchChange("")}
                  className="mt-2 border-primary-500 text-primary-500 text-xs h-7 px-3"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}

          {/* Meals Grid - Ultra Compact Cards */}
          {filteredMeals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-0">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Food Image with Price Badge - Ultra Small */}
                  <div className="relative">
                    <img
                      src={meal.food_image || "/placeholder.svg?height=120&width=180"}
                      alt={meal.food_name}
                      className="w-full h-24 object-cover"
                      loading="lazy"
                    />
                    {/* Price Badge - Ultra Small */}
                    <div className="absolute top-1 left-1">
                      <span className="bg-primary-500 text-white text-xs font-medium px-1 py-0.5 rounded text-[10px]">
                        {formatPrice(meal.price)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content - Minimal Padding */}
                  <div className="p-2">
                    {/* Restaurant Info - Ultra Small Logo */}
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-4 h-4 flex-shrink-0">
                        {meal.restaurant_logo ? (
                          <img
                            src={meal.restaurant_logo || "/placeholder.svg"}
                            alt={`${meal.restaurant_name} logo`}
                            className="w-4 h-4 rounded object-cover border border-gray-200 dark:border-gray-600"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                              const fallback = target.nextElementSibling as HTMLElement
                              if (fallback) fallback.style.display = "flex"
                            }}
                          />
                        ) : null}
                        <div
                          className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center"
                          style={{ display: meal.restaurant_logo ? "none" : "flex" }}
                        >
                          <span className="text-white text-[8px] font-bold">
                            {meal.restaurant_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <span className="restaurant-name text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate flex-1">
                        {meal.restaurant_name}
                      </span>
                      <MealCardMenu meal={meal} onEdit={openEditModal} onDelete={openDeleteModal} />
                    </div>

                    {/* Food Name - Ultra Small */}
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1 text-xs leading-tight line-clamp-2">
                      {meal.food_name}
                    </h3>

                    {/* Rating - Ultra Small */}
                    <div className="flex items-center gap-0.5 mb-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="restaurant-rating text-[10px] font-medium text-gray-700 dark:text-gray-300">
                        {formatRating(meal.food_rating)}
                      </span>
                    </div>

                    {/* Status Badge - Ultra Small */}
                    <div className="flex justify-start">
                      <span
                        className={`restaurant-status text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                          meal.restaurant_status === "Open Now"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {meal.restaurant_status === "Open Now" ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button - Ultra Small */}
          {filteredMeals.length > 0 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-4 py-1 rounded-full text-xs h-7"
              >
                View more
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AddMealModal isOpen={isAddModalOpen} onClose={handleCloseModals} />

      {selectedMeal && <EditMealModal isOpen={isEditModalOpen} onClose={handleCloseModals} meal={selectedMeal} />}

      {selectedMeal && (
        <DeleteMealModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModals}
          mealId={selectedMeal.id}
          mealName={selectedMeal.food_name}
        />
      )}
    </div>
  )
}
