'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '@/app/components/ui/use-toast'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success' | 'error'
  duration?: number
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  useEffect(() => {
    const timers = toasts.map((toast: Toast) => {
      if (toast.duration !== Infinity) {
        return setTimeout(() => dismiss(toast.id), toast.duration || 5000)
      }
    })

    return () => timers.forEach((timer: NodeJS.Timeout | undefined) => timer && clearTimeout(timer))
  }, [toasts, dismiss])

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 pointer-events-none max-w-md w-full">
      <AnimatePresence mode="sync">
        {toasts.map((toast: Toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={cn(
              'relative bg-white rounded-lg shadow-lg p-4 pr-8 pointer-events-auto',
              'border',
              toast.variant === 'destructive' && 'border-destructive bg-destructive/10'
            )}
          >
            {toast.title && (
              <div className="font-semibold text-sm">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm text-muted-foreground mt-1">
                {toast.description}
              </div>
            )}
            
            <button
              onClick={() => dismiss(toast.id)}
              className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
