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
import {
  fetchMeals,
  searchMeals,
  setSearchQuery,
  setSelectedMeal,
  clearError,
  hydrate,
} from "@/lib/store/slices/mealsSlice"
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
  const { filteredMeals, searchQuery, selectedMeal, loading, error, lastFetch, hydrated } = useAppSelector(
    (state) => state.meals,
  )

  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen, selectedDeliveryType } = useAppSelector(
    (state) => state.ui,
  )

  // Hydrate from localStorage on client
  useEffect(() => {
    dispatch(hydrate())
  }, [dispatch])

  // Fetch meals on component mount
  useEffect(() => {
    if (!hydrated) return // Wait for hydration

    const shouldFetch = !lastFetch || Date.now() - lastFetch > 5 * 60 * 1000 // 5 minutes
    if (shouldFetch) {
      dispatch(fetchMeals())
    }
  }, [dispatch, lastFetch, hydrated])

  // Handle search with debouncing
  useEffect(() => {
    if (!hydrated) return // Wait for hydration

    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(searchMeals(searchQuery))
      } else {
        dispatch(fetchMeals())
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, dispatch, hydrated])

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header - Figma Match */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍕</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">FoodWagon</span>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <Button
                onClick={() => dispatch(setAddModalOpen(true))}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 text-sm rounded-lg"
              >
                Add Food
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Figma Match */}
      <section className="bg-hero-gradient py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">Are you starving?</h1>
              <p className="text-white/90 text-lg mb-8 font-medium">
                Within a few clicks, find meals that are accessible near you
              </p>

              {/* Search Section - Figma Match */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                {/* Delivery/Pickup Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => dispatch(setSelectedDeliveryType("delivery"))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedDeliveryType === "delivery"
                        ? "bg-primary-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Delivery</span>
                  </button>
                  <button
                    onClick={() => dispatch(setSelectedDeliveryType("pickup"))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedDeliveryType === "pickup"
                        ? "bg-primary-500 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Pickup</span>
                  </button>
                </div>

                {/* Search Input */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500 w-5 h-5" />
                    <Input
                      id="search-bar"
                      type="text"
                      placeholder="What do you like to eat today?"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-12 h-12 text-sm border-gray-200 focus:border-primary-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    {loading && (
                      <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-primary-500" />
                    )}
                  </div>
                  <Button className="bg-red-500 hover:bg-red-600 text-white h-12 px-6 font-medium text-sm rounded-lg">
                    Find Food
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="/images/Image.png"
                  alt="Delicious food bowl"
                  className="w-full h-auto rounded-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section - Figma Match */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className="text-red-700 dark:text-red-300"
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
          {!loading && !error && filteredMeals.length === 0 && hydrated && (
            <div className="text-center py-12">
              <div className="empty-state-message text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery ? `No meals found for "${searchQuery}"` : "No items available"}
              </div>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => handleSearchChange("")}
                  className="mt-4 border-primary-500 text-primary-500"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}

          {/* Meals Grid - Figma Match */}
          {filteredMeals.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  {/* Food Image with Price Badge */}
                  <div className="relative">
                    <img
                      src={meal.food_image || "/placeholder.svg?height=200&width=280"}
                      alt={meal.food_name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    {/* Price Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"
                        style={{ backgroundColor: '#F17228' }}
                      >
                        <span className="text-xs">💰</span>
                        {formatPrice(meal.price)}
                      </span>

                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {/* Restaurant Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 flex-shrink-0">
                        {meal.restaurant_logo ? (
                          <img
                            src={meal.restaurant_logo || "/placeholder.svg"}
                            alt={`${meal.restaurant_name} logo`}
                            className="w-8 h-8 rounded object-cover border border-gray-200 dark:border-gray-600"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                              const fallback = target.nextElementSibling as HTMLElement
                              if (fallback) fallback.style.display = "flex"
                            }}
                          />
                        ) : null}
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

          {/* Load More Button - Figma Match */}
          {filteredMeals.length > 0 && (
            <div className="text-center mt-12">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium">
                Load more
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
