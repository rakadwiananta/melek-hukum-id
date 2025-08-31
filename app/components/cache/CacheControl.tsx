'use client'

import { useState, useEffect } from 'react'

interface CacheControlProps {
  showButton?: boolean
  autoRefresh?: boolean
}

export default function CacheControl({ showButton = true, autoRefresh = false }: CacheControlProps) {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Auto refresh on mobile
  useEffect(() => {
    if (autoRefresh && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      const interval = setInterval(() => {
        checkForUpdates()
      }, 300000) // Check every 5 minutes

      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const checkForUpdates = async () => {
    try {
      // Check if service worker is available
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
          registration.update()
        }
      }
    } catch (error) {
      console.log('Error checking for updates:', error)
    }
  }

  const clearCache = async () => {
    setIsRefreshing(true)
    
    try {
      // Clear browser cache
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      }

      // Clear service worker cache
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
          registration.unregister()
        }
      }

      // Clear localStorage and sessionStorage
      localStorage.clear()
      sessionStorage.clear()

      // Force reload
      window.location.reload()
    } catch (error) {
      console.log('Error clearing cache:', error)
      setIsRefreshing(false)
    }
  }

  const forceRefresh = () => {
    setIsRefreshing(true)
    
    // Add timestamp to force reload
    const timestamp = Date.now()
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('_t', timestamp.toString())
    
    window.location.href = currentUrl.toString()
  }

  return (
    <div className="cache-control">
      {showButton && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={clearCache}
            disabled={isRefreshing}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? 'Memperbarui...' : 'Bersihkan Cache'}
          </button>
          
          <button
            onClick={forceRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRefreshing ? 'Memperbarui...' : 'Refresh Halaman'}
          </button>
        </div>
      )}
      
      <div className="text-xs text-gray-500">
        Terakhir diperbarui: {lastUpdate.toLocaleString('id-ID')}
      </div>
    </div>
  )
}

// Hook untuk cache control
export function useCacheControl() {
  const [cacheVersion, setCacheVersion] = useState<string>('')

  useEffect(() => {
    // Generate cache version based on build time
    const version = process.env.NODE_ENV === 'production' 
      ? `v${Date.now()}` 
      : `dev-${Date.now()}`
    
    setCacheVersion(version)
  }, [])

  const clearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      )
    }
    
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        registration.unregister()
      }
    }
    
    localStorage.clear()
    sessionStorage.clear()
    
    window.location.reload()
  }

  return {
    cacheVersion,
    clearCache
  }
}