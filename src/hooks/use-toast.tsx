
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastPrimitive } from "@/components/ui/use-toast"

const ToastContext = React.createContext<{
  toast: (props: any) => void
}>({
  toast: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toast: primitive, ...others } = useToastPrimitive()

  const toast = React.useCallback(
    (props: any) => {
      primitive(props)
    },
    [primitive]
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const { toast } = React.useContext(ToastContext)
  return { toast }
}

export const toast = (props: any) => {
  // This is a mock implementation for direct imports
  // In reality, we would need a toast manager to handle this
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
