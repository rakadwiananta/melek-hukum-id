'use client'

import { useEffect, useState } from 'react'

interface ServiceWorkerHook {
  isSupported: boolean
  isRegistered: boolean
  isOnline: boolean
  cacheStats: {
    totalImages: number
    cachedImages: number
  }
  preloadImages: (urls: string[]) => Promise<void>
  clearCache: () => Promise<void>
}

export function useServiceWorker(): ServiceWorkerHook {
  const [isSupported, setIsSupported] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [cacheStats, setCacheStats] = useState({
    totalImages: 0,
    cachedImages: 0
  })

  useEffect(() => {
    // Check if service worker is supported
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      setIsSupported(true)
      registerServiceWorker()
    }

    // Monitor online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      })

      console.log('Service Worker registered:', registration.scope)
      setIsRegistered(true)

      // Update on new service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New update available
              console.log('New service worker available')
            }
          })
        }
      })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_UPDATED') {
          updateCacheStats()
        }
      })

      // Initial cache stats update
      updateCacheStats()

    } catch (error) {
      console.error('Service Worker registration failed:', error)
    }
  }

  const updateCacheStats = async () => {
    if (!isSupported) return

    try {
      const cacheNames = await caches.keys()
      let totalImages = 0
      let cachedImages = 0

      for (const cacheName of cacheNames) {
        if (cacheName.includes('images')) {
          const cache = await caches.open(cacheName)
          const keys = await cache.keys()
          
          const imageKeys = keys.filter(request => 
            request.url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
          )
          
          totalImages += imageKeys.length
          cachedImages += imageKeys.length
        }
      }

      setCacheStats({ totalImages, cachedImages })
    } catch (error) {
      console.error('Failed to update cache stats:', error)
    }
  }

  const preloadImages = async (urls: string[]): Promise<void> => {
    if (!isRegistered || !navigator.serviceWorker.controller) {
      // Fallback preloading without service worker
      const preloadPromises = urls.map(url => {
        return new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve() // Don't fail the whole batch
          img.src = url
        })
      })
      
      await Promise.allSettled(preloadPromises)
      return
    }

    // Send preload request to service worker
    navigator.serviceWorker.controller.postMessage({
      type: 'PRELOAD_IMAGES',
      urls: urls.filter(Boolean) // Remove empty URLs
    })
  }

  const clearCache = async (): Promise<void> => {
    if (!isSupported) return

    try {
      const cacheNames = await caches.keys()
      const imageCaches = cacheNames.filter(name => name.includes('images'))
      
      await Promise.all(
        imageCaches.map(cacheName => caches.delete(cacheName))
      )
      
      setCacheStats({ totalImages: 0, cachedImages: 0 })
      console.log('Image cache cleared')
    } catch (error) {
      console.error('Failed to clear cache:', error)
    }
  }

  return {
    isSupported,
    isRegistered,
    isOnline,
    cacheStats,
    preloadImages,
    clearCache
  }
}

// Hook untuk automatic preloading artikel images
export function useArticleImagePreloader() {
  const { preloadImages, isRegistered } = useServiceWorker()

  const preloadArticleImages = async (articles: Array<{ featured_image?: string }>) => {
    if (!isRegistered || !articles.length) return

    const imageUrls = articles
      .map(article => article.featured_image)
      .filter(Boolean) as string[]

    if (imageUrls.length > 0) {
      await preloadImages(imageUrls)
      console.log(`Preloaded ${imageUrls.length} article images`)
    }
  }

  return { preloadArticleImages }
}