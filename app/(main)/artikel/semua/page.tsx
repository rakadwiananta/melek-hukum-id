'use client'

import React, { useState, useEffect } from 'react'
import InfiniteArticleList from '@/app/components/article/display/InfiniteArticleList'
import { Search, Filter, Images, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useImageBatchManager } from '@/app/lib/memory-efficient-images'
import { useServiceWorker } from '@/app/hooks/useServiceWorker'

export default function SemuaArtikelPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [autoLoadEnabled, setAutoLoadEnabled] = useState(false)
  const [stats, setStats] = useState({
    totalImages: 0,
    loadedImages: 0,
    memoryUsage: '0KB'
  })

  const { getStats } = useImageBatchManager()
  const { isRegistered, cacheStats } = useServiceWorker()

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const imageStats = getStats()
      setStats({
        totalImages: imageStats.total,
        loadedImages: imageStats.loaded,
        memoryUsage: imageStats.memoryUsage
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [getStats])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-brown-800 mb-4">
              Semua Artikel Hukum Indonesia
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Koleksi lengkap artikel hukum dengan sistem loading yang dioptimalkan untuk menampilkan semua gambar dari database
            </p>
          </div>

          {/* Performance Stats */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Images className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">{stats.totalImages}</div>
                <div className="text-sm text-blue-600">Gambar Terdaftar</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">{stats.loadedImages}</div>
                <div className="text-sm text-green-600">Gambar Dimuat</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Loader2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">{cacheStats.cachedImages}</div>
                <div className="text-sm text-purple-600">Cache Tersimpan</div>
              </div>

              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <AlertCircle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-amber-700">{stats.memoryUsage}</div>
                <div className="text-sm text-amber-600">Penggunaan Memori</div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Service Worker:</span>
                <span className={`font-medium ${isRegistered ? 'text-green-600' : 'text-red-600'}`}>
                  {isRegistered ? '✓ Aktif' : '✗ Tidak Aktif'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: stats.totalImages > 0 
                      ? `${(stats.loadedImages / stats.totalImages) * 100}%` 
                      : '0%' 
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Progress Loading: {stats.totalImages > 0 
                  ? `${((stats.loadedImages / stats.totalImages) * 100).toFixed(1)}%`
                  : '0%'
                }
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white shadow text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white shadow text-red-600'
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  Grid
                </button>
              </div>

              {/* Auto Load Toggle */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoLoadEnabled}
                    onChange={(e) => setAutoLoadEnabled(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoLoadEnabled ? 'bg-red-600' : 'bg-gray-300'
                  }`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoLoadEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Auto Load Semua
                  </span>
                </label>
              </div>
            </div>

            {autoLoadEnabled && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <Loader2 className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Mode Auto Load Aktif - Semua artikel akan dimuat secara otomatis
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Article List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InfiniteArticleList
            searchQuery={searchQuery}
            showHeader={false}
            autoLoadAll={autoLoadEnabled}
            maxArticles={5000} // Higher limit for this page
            batchSize={30} // Larger batches
            variant={viewMode}
            filters={{
              category: null,
              author: null,
              sortBy: 'newest',
              dateRange: 'all'
            }}
          />
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-6 border border-red-100"
        >
          <h3 className="text-lg font-semibold text-red-800 mb-4">
            💡 Tips Penggunaan Halaman Ini
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700">
            <div>
              <strong>Mode Manual:</strong> Artikel dimuat secara bertahap saat Anda scroll. Lebih hemat memori dan bandwidth.
            </div>
            <div>
              <strong>Mode Auto Load:</strong> Semua artikel dimuat sekaligus. Ideal untuk melihat koleksi lengkap gambar.
            </div>
            <div>
              <strong>Service Worker:</strong> Gambar akan di-cache secara otomatis untuk akses lebih cepat di masa mendatang.
            </div>
            <div>
              <strong>Memory Management:</strong> Sistem akan secara otomatis membersihkan gambar yang tidak terlihat untuk mengoptimalkan performa.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}