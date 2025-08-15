'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  CheckCircle, 
  Image as ImageIcon, 
  RefreshCw,
  Eye,
  XCircle,
  TrendingUp,
  Activity
} from 'lucide-react'

interface ImageRenderStats {
  totalImages: number
  successfulRenders: number
  failedRenders: number
  fallbacksUsed: number
  averageFallbackLevel: number
  errorsByCategory: Record<string, number>
  errorsBySrc: Record<string, number>
  lastErrors: Array<{
    src: string
    category: string
    error: string
    timestamp: number
    fallbackLevel: number
  }>
}

class ImageRenderTracker {
  private stats: ImageRenderStats = {
    totalImages: 0,
    successfulRenders: 0,
    failedRenders: 0,
    fallbacksUsed: 0,
    averageFallbackLevel: 0,
    errorsByCategory: {},
    errorsBySrc: {},
    lastErrors: []
  }

  private listeners: Set<(stats: ImageRenderStats) => void> = new Set()

  trackImageLoad(src: string, category: string, fallbackLevel: number) {
    this.stats.totalImages++
    this.stats.successfulRenders++
    
    if (fallbackLevel > 0) {
      this.stats.fallbacksUsed++
    }
    
    this.updateAverageFallbackLevel()
    this.notifyListeners()
  }

  trackImageError(src: string, category: string, error: string, fallbackLevel: number) {
    this.stats.totalImages++
    this.stats.failedRenders++
    
    // Track by category
    this.stats.errorsByCategory[category] = (this.stats.errorsByCategory[category] || 0) + 1
    
    // Track by source
    this.stats.errorsBySrc[src] = (this.stats.errorsBySrc[src] || 0) + 1
    
    // Add to recent errors
    this.stats.lastErrors.unshift({
      src,
      category,
      error,
      timestamp: Date.now(),
      fallbackLevel
    })
    
    // Keep only last 20 errors
    if (this.stats.lastErrors.length > 20) {
      this.stats.lastErrors = this.stats.lastErrors.slice(0, 20)
    }
    
    this.updateAverageFallbackLevel()
    this.notifyListeners()
  }

  private updateAverageFallbackLevel() {
    const totalFallbacks = this.stats.fallbacksUsed + this.stats.failedRenders
    this.stats.averageFallbackLevel = totalFallbacks > 0 
      ? (this.stats.fallbacksUsed * 1 + this.stats.failedRenders * 2) / totalFallbacks
      : 0
  }

  subscribe(listener: (stats: ImageRenderStats) => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener({ ...this.stats }))
  }

  getStats(): ImageRenderStats {
    return { ...this.stats }
  }

  clearStats() {
    this.stats = {
      totalImages: 0,
      successfulRenders: 0,
      failedRenders: 0,
      fallbacksUsed: 0,
      averageFallbackLevel: 0,
      errorsByCategory: {},
      errorsBySrc: {},
      lastErrors: []
    }
    this.notifyListeners()
  }
}

export const imageRenderTracker = new ImageRenderTracker()

export default function ImageRenderMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const [stats, setStats] = useState<ImageRenderStats>(imageRenderTracker.getStats())
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development')
    
    if (process.env.NODE_ENV === 'development') {
      const unsubscribe = imageRenderTracker.subscribe(setStats)
      return () => {
        unsubscribe()
      }
    }
  }, [])

  if (!isVisible) return null

  const successRate = stats.totalImages > 0 
    ? ((stats.successfulRenders / stats.totalImages) * 100).toFixed(1)
    : '0'

  const fallbackRate = stats.totalImages > 0
    ? ((stats.fallbacksUsed / stats.totalImages) * 100).toFixed(1)
    : '0'

  const getStatusColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600 bg-green-50 border-green-200'
    if (rate >= 80) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-50 bg-white rounded-xl shadow-lg border border-gray-200 max-w-sm"
    >
      {/* Header */}
      <div 
        className="p-4 border-b border-gray-100 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Image Render Monitor</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-sm font-bold ${parseFloat(successRate) >= 95 ? 'text-green-600' : parseFloat(successRate) >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
              {successRate}%
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="font-bold text-blue-700">{stats.totalImages}</div>
            <div className="text-blue-600 text-xs">Total Images</div>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="font-bold text-green-700">{stats.successfulRenders}</div>
            <div className="text-green-600 text-xs">Successful</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-lg">
            <div className="font-bold text-yellow-700">{stats.fallbacksUsed}</div>
            <div className="text-yellow-600 text-xs">Fallbacks</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded-lg">
            <div className="font-bold text-red-700">{stats.failedRenders}</div>
            <div className="text-red-600 text-xs">Failed</div>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-100"
        >
          {/* Success Rate */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="font-semibold text-gray-700 mb-2">Performance Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Success Rate</span>
                <span className={`font-medium ${parseFloat(successRate) >= 95 ? 'text-green-600' : parseFloat(successRate) >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {successRate}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fallback Rate</span>
                <span className="font-medium text-yellow-600">{fallbackRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg Fallback Level</span>
                <span className="font-medium text-blue-600">{stats.averageFallbackLevel.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Errors by Category */}
          {Object.keys(stats.errorsByCategory).length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-700 mb-2">Errors by Category</h4>
              <div className="space-y-1">
                {Object.entries(stats.errorsByCategory)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([category, count]) => (
                    <div key={category} className="flex justify-between text-sm">
                      <span className="truncate">{category || 'Unknown'}</span>
                      <span className="font-medium text-red-600">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Recent Errors */}
          {stats.lastErrors.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-700 mb-2">Recent Errors</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {stats.lastErrors.slice(0, 5).map((error, index) => (
                  <div key={index} className="text-xs bg-red-50 border border-red-200 rounded p-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-red-700 truncate">
                          {error.category || 'Unknown'}
                        </div>
                        <div className="text-red-600 truncate mt-1" title={error.src}>
                          {error.src}
                        </div>
                      </div>
                      <div className="ml-2 text-red-500">
                        L{error.fallbackLevel}
                      </div>
                    </div>
                    <div className="text-red-500 mt-1">
                      {formatTime(error.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <button
                onClick={() => imageRenderTracker.clearStats()}
                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Clear Stats
              </button>
              <div className="text-xs text-gray-500">
                Live monitoring active
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}