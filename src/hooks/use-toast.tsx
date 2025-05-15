
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as ToastProviderPrimitive,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastPrimitive } from "@/components/ui/use-toast"

const ToastContext = React.createContext<{
  toast: (props: any) => void
  toasts?: any[]
}>({
  toast: () => {},
  toasts: []
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
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

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Export for compatibility
export { ToastProvider as ToastProviderLegacy }
