'use client'

import { useState, useEffect } from 'react'
import { useImagePerformance } from '@/app/components/ui/AdvancedArticleImage'
import { useServiceWorker } from '@/app/hooks/useServiceWorker'

export default function ImagePerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const imageStats = useImagePerformance()
  const { isSupported, isRegistered, isOnline, cacheStats } = useServiceWorker()
  const [networkStats, setNetworkStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageLoadTime: 0
  })

  // Only show in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development')
  }, [])

  // Monitor network performance
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const imageEntries = entries.filter(entry => {
        const resourceEntry = entry as PerformanceResourceTiming
        return resourceEntry.initiatorType === 'img' || 
               entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
      })

      let totalTime = 0
      let successful = 0
      let failed = 0

      imageEntries.forEach((entry) => {
        const resourceEntry = entry as PerformanceResourceTiming
        totalTime += resourceEntry.responseEnd - resourceEntry.requestStart
        // Assume successful if responseEnd exists (no direct status access)
        if (resourceEntry.responseEnd > 0) {
          successful++
        } else {
          failed++
        }
      })

      if (imageEntries.length > 0) {
        setNetworkStats(prev => ({
          totalRequests: prev.totalRequests + imageEntries.length,
          successfulRequests: prev.successfulRequests + successful,
          failedRequests: prev.failedRequests + failed,
          averageLoadTime: totalTime / imageEntries.length
        }))
      }
    })

    observer.observe({ entryTypes: ['resource'] })

    return () => observer.disconnect()
  }, [])

  if (!isVisible) return null

  const successRate = networkStats.totalRequests > 0 
    ? ((networkStats.successfulRequests / networkStats.totalRequests) * 100).toFixed(1)
    : '0'

  const cacheHitRate = cacheStats.totalImages > 0
    ? ((cacheStats.cachedImages / cacheStats.totalImages) * 100).toFixed(1)
    : '0'

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-sm">
      <div className="text-sm font-bold mb-2 flex items-center gap-2">
        📊 Image Performance Monitor
        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      
      <div className="space-y-2 text-xs">
        {/* Service Worker Status */}
        <div className="flex justify-between">
          <span>Service Worker:</span>
          <span className={isRegistered ? 'text-green-400' : 'text-red-400'}>
            {isRegistered ? '✓ Active' : '✗ Inactive'}
          </span>
        </div>

        {/* Cache Statistics */}
        <div className="border-t border-gray-600 pt-2">
          <div className="font-semibold">Cache Stats</div>
          <div className="flex justify-between">
            <span>Cached Images:</span>
            <span className="text-blue-400">{cacheStats.cachedImages}</span>
          </div>
          <div className="flex justify-between">
            <span>Cache Hit Rate:</span>
            <span className="text-blue-400">{cacheHitRate}%</span>
          </div>
        </div>

        {/* Image Loading Stats */}
        <div className="border-t border-gray-600 pt-2">
          <div className="font-semibold">Loading Stats</div>
          <div className="flex justify-between">
            <span>Total Images:</span>
            <span className="text-yellow-400">{imageStats.totalImages}</span>
          </div>
          <div className="flex justify-between">
            <span>Loaded:</span>
            <span className="text-green-400">{imageStats.loadedImages}</span>
          </div>
          <div className="flex justify-between">
            <span>Failed:</span>
            <span className="text-red-400">{imageStats.errorImages}</span>
          </div>
        </div>

        {/* Network Stats */}
        <div className="border-t border-gray-600 pt-2">
          <div className="font-semibold">Network Stats</div>
          <div className="flex justify-between">
            <span>Success Rate:</span>
            <span className="text-green-400">{successRate}%</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Load Time:</span>
            <span className="text-purple-400">
              {networkStats.averageLoadTime.toFixed(0)}ms
            </span>
          </div>
        </div>

        {/* Performance Tips */}
        <div className="border-t border-gray-600 pt-2">
          <div className="font-semibold">Tips</div>
          {cacheStats.cachedImages === 0 && (
            <div className="text-yellow-400">⚠️ No images cached</div>
          )}
          {imageStats.errorImages > 0 && (
            <div className="text-red-400">⚠️ {imageStats.errorImages} failed loads</div>
          )}
          {parseFloat(successRate) < 90 && (
            <div className="text-orange-400">⚠️ Low success rate</div>
          )}
          {networkStats.averageLoadTime > 2000 && (
            <div className="text-red-400">⚠️ Slow load times</div>
          )}
        </div>
      </div>
    </div>
  )
}