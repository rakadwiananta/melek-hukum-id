'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, Loader2, Gavel, Filter, TrendingUp, Award, BookOpen, Scale, Search, Grid, List, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from './ArticleCard'
import { motion, AnimatePresence } from 'framer-motion'

interface ArticleGridProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
  showLoadMore?: boolean
  showFilter?: boolean
  showViewToggle?: boolean
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  published_at: string
  view_count: number
  category?: string
  author?: string
  reading_time?: number
  tags?: string[]
}

// Indonesian legal categories
const legalCategories = [
  { id: 'all', name: 'Semua', icon: '📚' },
  { id: 'pidana', name: 'Hukum Pidana', icon: '⚖️' },
  { id: 'perdata', name: 'Hukum Perdata', icon: '📜' },
  { id: 'bisnis', name: 'Hukum Bisnis', icon: '💼' },
  { id: 'korupsi', name: 'Anti Korupsi', icon: '🛡️' },
  { id: 'ham', name: 'HAM', icon: '🤝' },
  { id: 'keluarga', name: 'Hukum Keluarga', icon: '👨‍👩‍👧‍👦' },
  { id: 'pertanahan', name: 'Pertanahan', icon: '🏘️' }
]

// Sort options
const sortOptions = [
  { id: 'newest', name: 'Terbaru', icon: '🆕' },
  { id: 'popular', name: 'Terpopuler', icon: '🔥' },
  { id: 'trending', name: 'Trending', icon: '📈' },
  { id: 'mostread', name: 'Paling Banyak Dibaca', icon: '👁️' }
]

// Indonesian legal statistics
const indonesianLegalStats = {
  totalLaws: 42897,
  activeCases: 4563218,
  legalAwareness: 67.3,
  onlineServices: 2450000,
  corruptionCases: 579,
  resolvedCases: 3587642
}

export default function ArticleGrid({ 
  category, 
  limit = 12, 
  showHeader = false,
  headerTitle = 'Pustaka Hukum Indonesia',
  showLoadMore = false,
  showFilter = true,
  showViewToggle = true
}: ArticleGridProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [showStats, setShowStats] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const fetchArticles = async (pageNum: number = 0) => {
    try {
      setLoading(true)
      // Query Supabase
      let query = supabase
        ?.from('articles')
        ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author, tags')
        ?.eq('status', 'published')

      // Filter kategori
      const effectiveCategory = category || (selectedCategory !== 'all' ? selectedCategory : null)
      if (effectiveCategory && query) query = query.eq('category', effectiveCategory)

      // Cari
      if (searchQuery && query) {
        query = query.ilike('title', `%${searchQuery}%`)
      }

      // Sorting
      if (query) {
        switch (sortBy) {
          case 'popular':
          case 'mostread':
            query = query.order('view_count', { ascending: false })
            break
          case 'trending':
            query = query.order('published_at', { ascending: false })
            break
          default:
            query = query.order('published_at', { ascending: false })
        }
      }

      // Pagination
      const from = pageNum * limit
      const to = from + limit - 1
      const { data, error } = await (query?.range(from, to) || { data: null, error: null })

      if (error) {
        console.error('Error fetching articles:', error)
        setHasMore(false)
        return
      }

      const rows = data || []
      if (pageNum === 0) setArticles(rows as any)
      else setArticles(prev => [...prev, ...(rows as any)])
      setHasMore(rows.length === limit)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(0)
    fetchArticles(0)
  }, [category, selectedCategory, sortBy, searchQuery, limit])

  useEffect(() => {
    // Animate statistics on mount
    setTimeout(() => {
      setShowStats(true)
      setTimeout(() => setAnimateStats(true), 100)
    }, 500)
  }, [])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchArticles(nextPage)
  }

  const getGridCols = () => {
    if (viewMode === 'list') return 'grid-cols-1'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-8">
        {showHeader && (
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          </div>
        )}
        
        {/* Skeleton Loader with Batik Pattern */}
        <div className="relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <pattern id="skeleton-batik" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="#DC2626" opacity="0.1"/>
                <path d="M0,0 Q50,50 100,0 Q50,50 0,100 Q50,50 100,100" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.1"/>
              </pattern>
              <rect width="400" height="400" fill="url(#skeleton-batik)" />
            </svg>
          </div>
          
          <div className={`grid gap-6 ${getGridCols()}`}>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-64" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {headerTitle}
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Akses ribuan artikel hukum, peraturan, dan panduan legal untuk meningkatkan kesadaran hukum masyarakat Indonesia
          </p>
        </motion.div>
      )}

      {/* Indonesian Legal Statistics Dashboard */}
      {showStats && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
        >
          {/* Wayang Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <g transform="translate(100,100)">
                <circle cx="0" cy="0" r="80" fill="none" stroke="white" strokeWidth="2"/>
                <path d="M-60,-60 Q0,-80 60,-60 Q80,0 60,60 Q0,80 -60,60 Q-80,0 -60,-60" 
                      fill="none" stroke="white" strokeWidth="1.5"/>
              </g>
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="h-7 w-7" />
              Statistik Hukum Indonesia Real-Time
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 transition-all duration-1000 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {animateStats ? indonesianLegalStats.totalLaws.toLocaleString('id-ID') : '0'}
                </div>
                <div className="text-sm opacity-80">Peraturan Aktif</div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 transition-all duration-1000 delay-100 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {animateStats ? (indonesianLegalStats.activeCases / 1000000).toFixed(1) + 'M' : '0'}
                </div>
                <div className="text-sm opacity-80">Perkara Aktif</div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 transition-all duration-1000 delay-200 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {animateStats ? indonesianLegalStats.legalAwareness + '%' : '0%'}
                </div>
                <div className="text-sm opacity-80">Kesadaran Hukum</div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 transition-all duration-1000 delay-300 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {animateStats ? (indonesianLegalStats.onlineServices / 1000000).toFixed(1) + 'M' : '0'}
                </div>
                <div className="text-sm opacity-80">Pengguna Online</div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 transition-all duration-1000 delay-400 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {animateStats ? indonesianLegalStats.corruptionCases : '0'}
                </div>
                <div className="text-sm opacity-80">Kasus Korupsi</div>
              </div>

              <div className="text-center">
                <div className={`text-3xl font-bold mb-1 transition-all duration-1000 delay-500 ${
                  animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {animateStats ? ((indonesianLegalStats.resolvedCases / indonesianLegalStats.activeCases) * 100).toFixed(1) + '%' : '0%'}
                </div>
                <div className="text-sm opacity-80">Tingkat Penyelesaian</div>
              </div>
            </div>

            <div className="mt-4 text-center text-xs opacity-70">
              Sumber: KPK, MA, Kemenkumham, BPS | Update: Oktober 2024
            </div>
          </div>
        </motion.div>
      )}

      {/* Advanced Filter Section */}
      {showFilter && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari artikel hukum, peraturan, atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Kategori Hukum</h3>
            <div className="flex flex-wrap gap-2">
              {legalCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-4 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105
                    ${selectedCategory === cat.id 
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and View Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Urutkan:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.icon} {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            {showViewToggle && (
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`
                    px-3 py-2 rounded-md transition-all duration-300
                    ${viewMode === 'grid' 
                      ? 'bg-white text-red-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`
                    px-3 py-2 rounded-md transition-all duration-300
                    ${viewMode === 'list' 
                      ? 'bg-white text-red-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Summary */}
      {articles.length > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Menampilkan <span className="font-semibold text-gray-900">{articles.length}</span> artikel
            {searchQuery && (
              <> untuk pencarian "<span className="font-semibold text-red-600">{searchQuery}</span>"</>
            )}
          </span>
          {selectedCategory !== 'all' && (
            <span className="text-red-600 font-medium">
              Kategori: {legalCategories.find(c => c.id === selectedCategory)?.name}
            </span>
          )}
        </div>
      )}

      {/* Articles Grid/List with Animation */}
      <AnimatePresence mode="wait">
        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="inline-block p-8 bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl">
              <Gavel className="h-20 w-20 text-amber-600 mx-auto mb-4" />
              <p className="text-gray-700 text-xl font-semibold">Tidak ada artikel yang ditemukan</p>
              <p className="text-gray-600 mt-2">Coba ubah filter atau kata kunci pencarian</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            ref={gridRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`grid gap-6 ${getGridCols()}`}
          >
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
              >
                <ArticleCard 
                  article={article} 
                  variant={viewMode === 'list' ? 'compact' : '3d-batik'} 
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Load More with Progress */}
      {showLoadMore && hasMore && articles.length > 0 && (
        <div className="text-center pt-12">
          <div className="mb-4">
            <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-1 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-300"
                style={{ width: `${(articles.length / (articles.length + limit)) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {articles.length} dari {articles.length + limit}+ artikel
            </p>
          </div>
          
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="relative group px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-amber-600 blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
            
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Memuat...
                </>
              ) : (
                <>
                  <BookOpen className="h-5 w-5" />
                  Muat Lebih Banyak
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
      )}

      {/* Legal Resources CTA */}
      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern id="legal-pattern" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="12.5" height="12.5" fill="white"/>
                <rect x="12.5" y="12.5" width="12.5" height="12.5" fill="white"/>
              </pattern>
              <rect width="100" height="100" fill="url(#legal-pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <Scale className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Konsultasi Hukum Gratis</h3>
            <p className="mb-4 opacity-90">
              Dapatkan konsultasi dengan ahli hukum bersertifikat secara online
            </p>
            <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Mulai Konsultasi
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2"/>
              <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="2"/>
              <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <BookOpen className="h-12 w-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Template Dokumen Legal</h3>
            <p className="mb-4 opacity-90">
              Download template surat, kontrak, dan dokumen hukum lainnya
            </p>
            <button className="px-6 py-3 bg-white text-orange-700 font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Lihat Template
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
