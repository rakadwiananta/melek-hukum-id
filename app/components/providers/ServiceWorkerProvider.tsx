'use client'

import { useEffect, ReactNode } from 'react'
import { useServiceWorker } from '@/app/hooks/useServiceWorker'

interface ServiceWorkerProviderProps {
  children: ReactNode
}

export default function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const { isSupported, isRegistered, isOnline, cacheStats } = useServiceWorker()

  useEffect(() => {
    // Log service worker status in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Service Worker Status:', {
        supported: isSupported,
        registered: isRegistered,
        online: isOnline,
        cacheStats
      })
    }
  }, [isSupported, isRegistered, isOnline, cacheStats])

  return <>{children}</>
}