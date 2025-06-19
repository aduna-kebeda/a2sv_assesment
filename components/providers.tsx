"use client"

import type React from "react"
import { Provider } from "react-redux"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"
import { store } from "@/lib/store"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="foodwagon-theme"
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#FFFFFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </ThemeProvider>
    </Provider>
  )
}
