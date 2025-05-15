
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastPrimitive } from "@/components/ui/use-toast"

// Create a context for the toast functionality
const ToastContext = React.createContext<{
  toast: (props: any) => void
  toasts: any[]
}>({
  toast: () => {},
  toasts: []
})

// Create a custom toast provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  // Rename imported component to ToastProviderPrimitive to avoid naming conflicts
  const { toast: primitive, toasts } = useToastPrimitive()

  const toast = React.useCallback(
    (props: any) => {
      primitive(props)
    },
    [primitive]
  )

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      {children}
    </ToastContext.Provider>
  )
}

// Hook for components to use toast functionality
export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Direct toast function for non-component usage
export const toast = (props: any) => {
  // This is a mock implementation for direct imports
  const toastFn = (window as any).__TOAST_FN
  if (toastFn) {
    toastFn(props)
  } else {
    console.warn('Toast function not available. Use the useToast hook inside components.')
  }
}

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
}
