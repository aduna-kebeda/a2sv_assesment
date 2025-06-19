import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  isAddModalOpen: boolean
  isEditModalOpen: boolean
  isDeleteModalOpen: boolean
  selectedDeliveryType: "delivery" | "pickup"
  theme: "light" | "dark" | "system"
}

const initialState: UiState = {
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedDeliveryType: "delivery",
  theme: "light",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload
    },
    setEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload
    },
    setDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpen = action.payload
    },
    setSelectedDeliveryType: (state, action: PayloadAction<"delivery" | "pickup">) => {
      state.selectedDeliveryType = action.payload
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    closeAllModals: (state) => {
      state.isAddModalOpen = false
      state.isEditModalOpen = false
      state.isDeleteModalOpen = false
    },
  },
})

export const {
  setAddModalOpen,
  setEditModalOpen,
  setDeleteModalOpen,
  setSelectedDeliveryType,
  setTheme,
  closeAllModals,
} = uiSlice.actions

export default uiSlice.reducer
