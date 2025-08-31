'use client'

import React from 'react'
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'error'
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  toast: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...newToast, id }])
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  // Always return a safe implementation to avoid SSR issues
  const [toasts, setToasts] = useState<Toast[]>([])
  
  const toast = useCallback((newToast: Omit<Toast, 'id'>) => {
    if (typeof window !== 'undefined') {
      const id = Math.random().toString(36).substr(2, 9)
      setToasts((prev) => [...prev, { ...newToast, id }])
    }
  }, [])

  const dismiss = useCallback((id: string) => {
    if (typeof window !== 'undefined') {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }
  }, [])
  
  return { toasts, toast, dismiss }
}

// Export toast function for convenience
export const toast = (props: Omit<Toast, 'id'>) => {
  // This will be replaced by the actual implementation when the provider is mounted
  console.warn('Toast called before provider is mounted')
}
