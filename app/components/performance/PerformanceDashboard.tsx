'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, 
  Zap, 
  Image as ImageIcon, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Gauge,
  Monitor,
  Wifi,
  HardDrive,
  Cpu
} from 'lucide-react'
import { usePerformanceMonitoring } from '@/app/lib/performance-optimizer'
import { useAdvancedImageOptimization } from '@/app/lib/advanced-image-optimizer'
import { useServiceWorker } from '@/app/hooks/useServiceWorker'

interface PerformanceMetric {
  label: string
  value: number | string
  target: number | string
  status: 'good' | 'needs-improvement' | 'poor'
  unit: string
  description: string
}

export default function PerformanceDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const [networkInfo, setNetworkInfo] = useState<any>(null)
  const [memoryInfo, setMemoryInfo] = useState<any>(null)
  
  const { metrics, score, suggestions } = usePerformanceMonitoring()
  const { metrics: imageMetrics } = useAdvancedImageOptimization()
  const { cacheStats, isRegistered } = useServiceWorker()

  // Show only in development
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development')
    
    // Get network information
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      setNetworkInfo({
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      })
    }

    // Get memory information
    if ('memory' in performance) {
      const memory = (performance as any).memory
      setMemoryInfo({
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      })
    }
  }, [])

  if (!isVisible) return null

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatTime = (ms: number): string => {
    return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'First Contentful Paint',
      value: metrics.FCP ? formatTime(metrics.FCP) : 'N/A',
      target: '< 1.8s',
      status: !metrics.FCP ? 'good' : metrics.FCP < 1800 ? 'good' : metrics.FCP < 3000 ? 'needs-improvement' : 'poor',
      unit: 'ms',
      description: 'Time until first content is painted'
    },
    {
      label: 'Largest Contentful Paint',
      value: metrics.LCP ? formatTime(metrics.LCP) : 'N/A',
      target: '< 2.5s',
      status: !metrics.LCP ? 'good' : metrics.LCP < 2500 ? 'good' : metrics.LCP < 4000 ? 'needs-improvement' : 'poor',
      unit: 'ms',
      description: 'Time until largest content element is painted'
    },
    {
      label: 'Cumulative Layout Shift',
      value: metrics.CLS !== undefined ? metrics.CLS.toFixed(3) : 'N/A',
      target: '< 0.1',
      status: metrics.CLS === undefined ? 'good' : metrics.CLS < 0.1 ? 'good' : metrics.CLS < 0.25 ? 'needs-improvement' : 'poor',
      unit: '',
      description: 'Visual stability of the page'
    },
    {
      label: 'First Input Delay',
      value: metrics.FID ? formatTime(metrics.FID) : 'N/A',
      target: '< 100ms',
      status: !metrics.FID ? 'good' : metrics.FID < 100 ? 'good' : metrics.FID < 300 ? 'needs-improvement' : 'poor',
      unit: 'ms',
      description: 'Time until page responds to first interaction'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-50 w-96 max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-gray-200"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Performance Monitor</h3>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </div>
      </div>

      {/* Performance Score Gauge */}
      <div className="p-4 border-b border-gray-100">
        <div className="text-center mb-3">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={getScoreColor(score)}
                strokeWidth="2"
                strokeDasharray={`${score}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Gauge className="h-4 w-4" />
          Core Web Vitals
        </h4>
        <div className="space-y-2">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className={`p-2 rounded-lg border ${getStatusColor(metric.status)}`}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{metric.label}</div>
                  <div className="text-xs opacity-75">{metric.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{metric.value}</div>
                  <div className="text-xs opacity-75">Target: {metric.target}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Optimization Stats */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <ImageIcon className="h-4 w-4" />
          Image Performance
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded">
            <div className="font-medium text-blue-700">{imageMetrics.cacheSize}</div>
            <div className="text-blue-600 text-xs">Cached Images</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="font-medium text-green-700">
              {imageMetrics.supportedFormats.avif ? 'AVIF' : imageMetrics.supportedFormats.webp ? 'WebP' : 'JPEG'}
            </div>
            <div className="text-green-600 text-xs">Best Format</div>
          </div>
          <div className="bg-purple-50 p-2 rounded">
            <div className="font-medium text-purple-700">{cacheStats.cachedImages}</div>
            <div className="text-purple-600 text-xs">SW Cached</div>
          </div>
          <div className="bg-amber-50 p-2 rounded">
            <div className="font-medium text-amber-700">
              {formatBytes(imageMetrics.averageCompressionRatio)}
            </div>
            <div className="text-amber-600 text-xs">Avg Size</div>
          </div>
        </div>
      </div>

      {/* Service Worker Status */}
      <div className="p-4 border-b border-gray-100">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Service Worker
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <div className="flex items-center gap-2">
            {isRegistered ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isRegistered ? 'text-green-600' : 'text-red-600'}`}>
              {isRegistered ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      {/* Network Information */}
      {networkInfo && (
        <div className="p-4 border-b border-gray-100">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Network
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-500">Connection</div>
              <div className="font-medium">{networkInfo.effectiveType?.toUpperCase()}</div>
            </div>
            <div>
              <div className="text-gray-500">Downlink</div>
              <div className="font-medium">{networkInfo.downlink} Mbps</div>
            </div>
            <div>
              <div className="text-gray-500">RTT</div>
              <div className="font-medium">{networkInfo.rtt}ms</div>
            </div>
            <div>
              <div className="text-gray-500">Data Saver</div>
              <div className="font-medium">{networkInfo.saveData ? 'On' : 'Off'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Memory Information */}
      {memoryInfo && (
        <div className="p-4 border-b border-gray-100">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Memory Usage
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Used JS Heap</span>
              <span className="font-medium">{formatBytes(memoryInfo.usedJSHeapSize)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total JS Heap</span>
              <span className="font-medium">{formatBytes(memoryInfo.totalJSHeapSize)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${(memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Optimization Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-4">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Suggestions
          </h4>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-2 bg-amber-50 border border-amber-200 rounded text-sm">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-amber-700">{suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4 bg-gray-50 rounded-b-xl">
        <div className="text-xs text-gray-500 text-center">
          Performance monitoring active in development mode
        </div>
      </div>
    </motion.div>
  )
}