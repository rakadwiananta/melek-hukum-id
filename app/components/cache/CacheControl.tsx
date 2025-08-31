'use client'

import { useState, useEffect } from 'react'

interface CacheControlProps {
  showButton?: boolean
  autoRefresh?: boolean
}

export default function CacheControl({ showButton = true, autoRefresh = false }: CacheControlProps) {
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [domainStatus, setDomainStatus] = useState<{
    current: string
    stored: string
    needsRefresh: boolean
  }>({
    current: '',
    stored: '',
    needsRefresh: false
  })

  // Check domain status
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    const currentDomain = window.location.hostname
    const storedDomain = localStorage.getItem('site_domain') || ''
    
    setDomainStatus({
      current: currentDomain,
      stored: storedDomain,
      needsRefresh: Boolean(storedDomain && storedDomain !== currentDomain)
    })
  }, [])

  // Auto refresh on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    
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
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
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
    if (typeof window === 'undefined') return
    
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
    if (typeof window === 'undefined') return
    
    setIsRefreshing(true)
    
    // Add timestamp to force reload
    const timestamp = Date.now()
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('_t', timestamp.toString())
    
    window.location.href = currentUrl.toString()
  }

  const verifyDomain = () => {
    if (typeof window === 'undefined') return
    
    const currentDomain = window.location.hostname
    localStorage.setItem('site_domain', currentDomain)
    setDomainStatus({
      current: currentDomain,
      stored: currentDomain,
      needsRefresh: false
    })
  }

  const testAllResources = async () => {
    if (typeof window === 'undefined') return
    
    const resources = [
      '/api/search',
      '/manifest.json',
      '/robots.txt',
      '/sitemap.xml'
    ]

    const results = await Promise.allSettled(
      resources.map(async (resource) => {
        const response = await fetch(resource)
        return {
          resource,
          status: response.status,
          ok: response.ok
        }
      })
    )

    console.log('Resource test results:', results)
    return results
  }

  return (
    <div className="cache-control">
      {showButton && (
        <div className="space-y-4">
          {/* Domain Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Domain Status</h3>
            <div className="space-y-2 text-sm">
              <div>Current Domain: <span className="font-mono text-blue-600">{domainStatus.current}</span></div>
              <div>Stored Domain: <span className="font-mono text-gray-600">{domainStatus.stored || 'None'}</span></div>
              {domainStatus.needsRefresh && (
                <div className="text-red-600 font-medium">⚠️ Domain changed, cache refresh recommended</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
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

            <button
              onClick={verifyDomain}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
            >
              Verifikasi Domain
            </button>

            <button
              onClick={testAllResources}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
            >
              Test Resources
            </button>
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-4">
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
    if (typeof window === 'undefined') return
    
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