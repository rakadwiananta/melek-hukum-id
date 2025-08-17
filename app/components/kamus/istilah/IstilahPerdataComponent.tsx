'use client'

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { 
  Search, Filter, Download, Share2, BookOpen, 
  ChevronDown, ChevronUp, ExternalLink, Star, 
  Bookmark, ArrowUpDown, Hash, Globe, X,
  ChevronLeft, ChevronRight, Loader2, Sparkles,
  TrendingUp, Eye, BarChart3, Users, Shield,
  Scale, FileText, Calendar, Activity,
  Award, Target, Zap, Database, Info, Home,
  Heart, ScrollText, Banknote, UserCheck
} from 'lucide-react'
import { istilahPerdataData } from './IstilahPerdata'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Import interface Term dari IstilahPerdata
interface Term {
  id: number
  term: string
  category: string
  definition: string
  example?: string
  legalBasis: string
  relatedTerms?: string[]
  trending?: boolean
  englishTerm?: string
  additionalNotes?: string
}

// Batik Pattern Component dengan animasi
const AnimatedBatikPattern = ({ className = "", animate = true }) => {
  const rotation = useMotionValue(0)
  
  useEffect(() => {
    if (animate) {
      const interval = setInterval(() => {
        rotation.set(rotation.get() + 0.5)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [animate, rotation])

  return (
    <motion.svg 
      className={`absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none ${className}`}
      style={{ rotate: rotation }}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="batik-pattern-perdata" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Parang Pattern */}
          <g transform="translate(50,50)">
            <path d="M0,0 Q25,25 50,0 Q75,25 100,0" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M0,50 Q25,75 50,50 Q75,75 100,50" fill="none" stroke="currentColor" strokeWidth="1"/>
            <path d="M0,100 Q25,125 50,100 Q75,125 100,100" fill="none" stroke="currentColor" strokeWidth="1"/>
          </g>
          {/* Connecting Lines */}
          <path d="M0,0 L200,200 M200,0 L0,200" 
                stroke="currentColor" strokeWidth="0.3" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik-pattern-perdata)" />
    </motion.svg>
  )
}

// 3D Card Component dengan Nusantara Style
const NusantaraCard3D = ({ children, className = "", delay = 0, index = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
  index?: number
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 15)
    setRotateY((centerX - x) / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-300"
        animate={{
          scale: isHovered ? 1.02 : 1,
          rotateZ: isHovered ? Math.sin(Date.now() * 0.001) * 2 : 0
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Main Component
interface IstilahPerdataComponentProps {
  searchQuery?: string
  initialCategory?: string
}

const IstilahPerdataComponent: React.FC<IstilahPerdataComponentProps> = ({ 
  searchQuery: propSearchQuery = '',
  initialCategory = ''
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(propSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState<'alphabetical' | 'trending' | 'recent'>('alphabetical')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [bookmarkedTerms, setBookmarkedTerms] = useState<number[]>([])
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const itemsPerPage = 12
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Scroll animations
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 100], [0, -20])
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9])

  // Filter and sort terms
  const filteredAndSortedTerms = useMemo(() => {
    let filtered = istilahPerdataData.terms

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.category.toLowerCase().includes(query) ||
        term.legalBasis.toLowerCase().includes(query) ||
        term.englishTerm?.toLowerCase().includes(query) ||
        term.relatedTerms?.some(related => related.toLowerCase().includes(query))
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory)
    }

    // Sort terms
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          if (a.trending && !b.trending) return -1
          if (!a.trending && b.trending) return 1
          return a.term.localeCompare(b.term, 'id')
        case 'recent':
          return b.id - a.id
        case 'alphabetical':
        default:
          return a.term.localeCompare(b.term, 'id')
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTerms.length / itemsPerPage)
  const paginatedTerms = filteredAndSortedTerms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookmarked-perdata-terms')
    if (saved) {
      setBookmarkedTerms(JSON.parse(saved))
    }
  }, [])

  // Save bookmarks to localStorage
  const toggleBookmark = useCallback((termId: number) => {
    setBookmarkedTerms(prev => {
      const updated = prev.includes(termId)
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
      localStorage.setItem('bookmarked-perdata-terms', JSON.stringify(updated))
      return updated
    })
  }, [])

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'hukum-orang': Users,
      'hukum-keluarga': Heart,
      'hukum-waris': ScrollText,
      'hukum-benda': Home,
      'hukum-perikatan': Banknote,
      'hukum-perjanjian': UserCheck,
      'hukum-jaminan': Shield,
      'acara-perdata': Scale,
      'hukum-perdata-internasional': Globe,
      'hukum-perdata-khusus': Star
    }
    return iconMap[category] || FileText
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'hukum-orang': 'from-blue-500 to-blue-600',
      'hukum-keluarga': 'from-pink-500 to-rose-600',
      'hukum-waris': 'from-purple-500 to-purple-600',
      'hukum-benda': 'from-green-500 to-green-600',
      'hukum-perikatan': 'from-yellow-500 to-orange-600',
      'hukum-perjanjian': 'from-indigo-500 to-indigo-600',
      'hukum-jaminan': 'from-red-500 to-red-600',
      'acara-perdata': 'from-teal-500 to-teal-600',
      'hukum-perdata-internasional': 'from-cyan-500 to-cyan-600',
      'hukum-perdata-khusus': 'from-amber-500 to-amber-600'
    }
    return colorMap[category] || 'from-gray-500 to-gray-600'
  }

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }, [])

  // Handle term click
  const handleTermClick = (term: Term) => {
    setSelectedTerm(term)
  }

  // Export functionality
  const handleExport = useCallback(() => {
    const dataToExport = {
      metadata: istilahPerdataData.metadata,
      terms: filteredAndSortedTerms,
      exportDate: new Date().toISOString(),
      filters: {
        searchQuery,
        selectedCategory,
        sortBy
      }
    }
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `istilah-perdata-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [filteredAndSortedTerms, searchQuery, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 relative overflow-hidden">
      <AnimatedBatikPattern />
      
      {/* Header Section */}
      <motion.div 
        className="relative z-10 pt-8 pb-12"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg"
                whileHover={{ scale: 1.05, rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.3 }}
              >
                <FileText className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Istilah{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Hukum Perdata
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Jelajahi {istilahPerdataData.metadata.total} istilah hukum perdata lengkap dengan definisi, 
              contoh, dan dasar hukumnya. Dari KUHPerdata hingga undang-undang khusus.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'Total Istilah', value: istilahPerdataData.metadata.total, icon: Database },
                { label: 'Kategori', value: istilahPerdataData.metadata.categories.length, icon: Bookmark },
                { label: 'Trending', value: istilahPerdataData.terms.filter(t => t.trending).length, icon: TrendingUp },
                { label: 'Sumber Hukum', value: istilahPerdataData.metadata.sources.length, icon: BookOpen }
              ].map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-green-100"
                  >
                    <IconComponent className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-100"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari istilah hukum perdata..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg bg-white/50 backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Semua Kategori</option>
                    {istilahPerdataData.metadata.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort Filter */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="alphabetical">A-Z</option>
                    <option value="trending">Trending</option>
                    <option value="recent">Terbaru</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex bg-white border border-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-600">
              Menampilkan {paginatedTerms.length} dari {filteredAndSortedTerms.length} istilah
              {searchQuery && ` untuk "${searchQuery}"`}
              {selectedCategory && ` dalam kategori "${istilahPerdataData.metadata.categories.find(c => c.id === selectedCategory)?.name}"`}
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
          )}

          {/* Terms Grid/List */}
          {!isLoading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {paginatedTerms.map((term, index) => {
                  const CategoryIcon = getCategoryIcon(term.category)
                  const isBookmarked = bookmarkedTerms.includes(term.id)
                  
                  return (
                    <NusantaraCard3D
                      key={term.id}
                      index={index}
                      className={viewMode === 'list' ? 'w-full' : ''}
                    >
                      <motion.div
                        className={`
                          bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 
                          hover:border-green-300 transition-all duration-300 shadow-lg hover:shadow-xl
                          ${viewMode === 'list' ? 'p-6' : 'p-6 h-full'}
                        `}
                        whileHover={{ y: -2 }}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(term.category)}`}>
                              <CategoryIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                                {term.term}
                              </h3>
                              {term.englishTerm && (
                                <p className="text-sm text-gray-500 italic">
                                  {term.englishTerm}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {term.trending && (
                              <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                <TrendingUp className="w-3 h-3" />
                                Trending
                              </span>
                            )}
                            <button
                              onClick={() => toggleBookmark(term.id)}
                              className={`p-1.5 rounded-full transition-colors ${
                                isBookmarked 
                                  ? 'text-yellow-500 bg-yellow-50' 
                                  : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                              }`}
                            >
                              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            <Hash className="w-3 h-3" />
                            {istilahPerdataData.metadata.categories.find(c => c.id === term.category)?.name || term.category}
                          </span>
                        </div>

                        {/* Definition */}
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed line-clamp-3">
                            {term.definition}
                          </p>
                        </div>

                        {/* Example */}
                        {term.example && (
                          <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                            <p className="text-sm text-green-800">
                              <strong>Contoh:</strong> {term.example}
                            </p>
                          </div>
                        )}

                        {/* Legal Basis */}
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            <strong>Dasar Hukum:</strong> {term.legalBasis}
                          </p>
                        </div>

                        {/* Related Terms */}
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Istilah Terkait:</strong>
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {term.relatedTerms.slice(0, 3).map((related, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                                >
                                  {related}
                                </span>
                              ))}
                              {term.relatedTerms.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{term.relatedTerms.length - 3} lainnya
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleTermClick(term)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            Detail
                          </button>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                navigator.share?.({
                                  title: term.term,
                                  text: term.definition,
                                  url: window.location.href
                                }) || navigator.clipboard.writeText(`${term.term}: ${term.definition}`)
                              }}
                              className="p-2 text-gray-400 hover:text-green-500 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </NusantaraCard3D>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty State */}
          {!isLoading && filteredAndSortedTerms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada istilah ditemukan
              </h3>
              <p className="text-gray-600 mb-6">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('')
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Reset Filter
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = currentPage <= 3 
                  ? i + 1 
                  : currentPage >= totalPages - 2 
                    ? totalPages - 4 + i 
                    : currentPage - 2 + i
                
                if (pageNum < 1 || pageNum > totalPages) return null
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      currentPage === pageNum
                        ? 'bg-green-500 text-white border-green-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Term Detail Modal */}
      <AnimatePresence>
        {selectedTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTerm(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedTerm.term}
                    </h2>
                    {selectedTerm.englishTerm && (
                      <p className="text-lg text-gray-600 italic">
                        {selectedTerm.englishTerm}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedTerm(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Definisi</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedTerm.definition}</p>
                  </div>

                  {selectedTerm.example && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contoh</h3>
                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <p className="text-green-800">{selectedTerm.example}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Dasar Hukum</h3>
                    <p className="text-gray-700">{selectedTerm.legalBasis}</p>
                  </div>

                  {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Istilah Terkait</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTerm.relatedTerms.map((related, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {related}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTerm.additionalNotes && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Catatan Tambahan</h3>
                      <p className="text-gray-700">{selectedTerm.additionalNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default IstilahPerdataComponent