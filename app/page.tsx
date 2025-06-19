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
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">🍕</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">FoodWagon</span>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                onClick={() => dispatch(setAddModalOpen(true))}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all"
              >
                Add Food
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-hero mb-4">Are you starving?</h1>
              <p className="text-white/90 text-lg mb-8 font-medium">
                Within a few clicks, find meals that are accessible near you
              </p>

              {/* Search Section - Updated to match Figma */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-card">
                {/* Delivery/Pickup Tabs - Exact Figma Design */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => dispatch(setSelectedDeliveryType("delivery"))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDeliveryType === "delivery"
                        ? "bg-primary-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Delivery</span>
                  </button>
                  <button
                    onClick={() => dispatch(setSelectedDeliveryType("pickup"))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDeliveryType === "pickup"
                        ? "bg-primary-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pickup</span>
                  </button>
                </div>

                {/* Search Input - Updated styling */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                    <Input
                      id="search-bar"
                      type="text"
                      placeholder="What do you like to eat today?"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-12 h-12 border-gray-200 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 bg-gray-50 dark:bg-gray-700"
                    />
                    {loading && (
                      <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-primary-500" />
                    )}
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600 text-white h-12 px-6 font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Find Meal
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Delicious food bowl"
                  className="w-full h-auto rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Featured Meals</h2>

          {/* Error State */}
          {error && (
            <Alert className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-700 dark:text-red-300 flex justify-between items-center">
                <span>{error}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearErrorMessage}
                  className="text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && filteredMeals.length === 0 && (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                <span className="text-gray-600 dark:text-gray-300">Loading delicious meals...</span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredMeals.length === 0 && (
            <div className="text-center py-12">
              <div className="empty-state-message text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery ? `No meals found for "${searchQuery}"` : "No items available"}
              </div>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => handleSearchChange("")}
                  className="mt-4 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}

          {/* Meals Grid - Updated with Real Restaurant Logos */}
          {filteredMeals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  {/* Food Image with Price Badge */}
                  <div className="relative">
                    <img
                      src={meal.food_image || "/placeholder.svg?height=200&width=280"}
                      alt={meal.food_name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    {/* Price Badge - Top Left */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary-500 text-white text-sm font-semibold px-2 py-1 rounded-md shadow-sm">
                        {formatPrice(meal.price)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Restaurant Info with Real Logo and Three-Dot Menu */}
                    <div className="flex items-center gap-2 mb-2">
                      {/* Real Restaurant Logo */}
                      <div className="w-8 h-8 flex-shrink-0">
                        {meal.restaurant_logo ? (
                          <img
                            src={meal.restaurant_logo || "/placeholder.svg"}
                            alt={`${meal.restaurant_name} logo`}
                            className="w-8 h-8 rounded object-cover border border-gray-200 dark:border-gray-600"
                            onError={(e) => {
                              // Fallback to colored square with letter if image fails to load
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                              const fallback = target.nextElementSibling as HTMLElement
                              if (fallback) fallback.style.display = "flex"
                            }}
                          />
                        ) : null}
                        {/* Fallback colored square (hidden by default, shown if image fails) */}
                        <div
                          className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center"
                          style={{ display: meal.restaurant_logo ? "none" : "flex" }}
                        >
                          <span className="text-white text-xs font-bold">
                            {meal.restaurant_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <span className="restaurant-name text-sm font-medium text-gray-700 dark:text-gray-300 truncate flex-1">
                        {meal.restaurant_name}
                      </span>
                      {/* Three-Dot Menu */}
                      <MealCardMenu meal={meal} onEdit={openEditModal} onDelete={openDeleteModal} />
                    </div>

                    {/* Food Name */}
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-base leading-tight">
                      {meal.food_name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="restaurant-rating text-sm font-medium text-gray-700 dark:text-gray-300">
                        {formatRating(meal.food_rating)}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="flex justify-start">
                      <span
                        className={`restaurant-status text-xs px-3 py-1 rounded-full font-medium ${
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

          {/* Load More Button */}
          {filteredMeals.length > 0 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-8 py-2 rounded-full"
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
