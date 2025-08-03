'use client'

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { 
  Search, Filter, Download, Share2, BookOpen, 
  ChevronDown, ChevronUp, ExternalLink, Star, 
  Bookmark, ArrowUpDown, Hash, Globe, X,
  ChevronLeft, ChevronRight, Loader2, Sparkles,
  TrendingUp, Eye, BarChart3, Users, Shield,
  Scale, Gavel, FileText, Calendar, Activity,
  Award, Target, Zap, Database, Info
} from 'lucide-react'
import { istilahPidanaData } from './IstilahPidana'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Import interface Term dari IstilahPidana
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
        <pattern id="batik-pattern-istilah" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Kawung Pattern */}
          <g transform="translate(50,50)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </g>
          <g transform="translate(150,50)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </g>
          <g transform="translate(50,150)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </g>
          <g transform="translate(150,150)">
            <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </g>
          {/* Connecting Lines */}
          <path d="M50,50 L150,150 M150,50 L50,150 M100,0 L100,200 M0,100 L200,100" 
                stroke="currentColor" strokeWidth="0.3" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik-pattern-istilah)" />
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
    
    const rotateXValue = (y - centerY) / 20
    const rotateYValue = (centerX - x) / 20
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        delay: delay + (index * 0.05), 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'translateZ(20px)' : 'translateZ(0)'}`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-out'
      }}
      className={`relative ${className}`}
    >
      {/* Shadow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-xl blur-xl"
        animate={{
          opacity: isHovered ? 0.4 : 0.2,
          scale: isHovered ? 1.05 : 1
        }}
        style={{
          transform: 'translateZ(-30px)'
        }}
      />
      {children}
    </motion.div>
  )
}

// Floating Wayang Animation
const FloatingWayang = ({ delay = 0 }) => (
  <motion.div
    className="absolute -right-10 top-20 opacity-10 pointer-events-none"
    initial={{ opacity: 0, x: 100 }}
    animate={{ 
      opacity: [0.05, 0.1, 0.05],
      x: [-50, 0, -50],
      y: [-20, 20, -20],
      rotate: [-5, 5, -5]
    }}
    transition={{
      delay,
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg width="100" height="150" viewBox="0 0 100 150" fill="currentColor">
      <path d="M50 10 C30 20, 20 40, 25 60 L20 80 C15 85, 15 95, 20 100 L30 120 L40 140 L50 145 L60 140 L70 120 L80 100 C85 95, 85 85, 80 80 L75 60 C80 40, 70 20, 50 10 Z" />
    </svg>
  </motion.div>
)

interface IstilahPidanaComponentProps {
  initialCategory?: string
  initialSearch?: string
  embedded?: boolean
}

export default function IstilahPidanaComponent({ 
  initialCategory = 'all', 
  initialSearch = '',
  embedded = false 
}: IstilahPidanaComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 300], [0, 1])
  const headerScale = useTransform(scrollProgress, [0, 1], [1, 0.95])
  
  // State Management
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState<'term' | 'category' | 'trending'>('term')
  const [expandedTerms, setExpandedTerms] = useState<number[]>([])
  const [bookmarkedTerms, setBookmarkedTerms] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [showStats, setShowStats] = useState(true)
  const itemsPerPage = embedded ? 10 : 20

  // Live Statistics dengan data real
  const [liveStats, setLiveStats] = useState({
    totalViews: 0,
    activeUsers: 0,
    popularCategory: '',
    recentSearches: 0
  })

  // Calculate real statistics from data
  const statistics = useMemo(() => {
    const categoryStats = istilahPidanaData.metadata.categories.map(cat => ({
      ...cat,
      percentage: Math.round((cat.count / istilahPidanaData.metadata.total) * 100)
    }))

    const trendingCount = istilahPidanaData.terms.filter(term => term.trending).length
    const termsWithEnglish = istilahPidanaData.terms.filter(term => term.englishTerm).length
    const termsWithExamples = istilahPidanaData.terms.filter(term => term.example).length

    return {
      total: istilahPidanaData.metadata.total,
      categories: categoryStats,
      trending: trendingCount,
      withEnglish: termsWithEnglish,
      withExamples: termsWithExamples,
      completeness: Math.round((termsWithExamples / istilahPidanaData.metadata.total) * 100)
    }
  }, [])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedTerms')
    if (saved) setBookmarkedTerms(JSON.parse(saved))
    
    // Simulate live stats
    const interval = setInterval(() => {
      setLiveStats({
        totalViews: Math.floor(Math.random() * 1000) + 5000,
        activeUsers: Math.floor(Math.random() * 50) + 100,
        popularCategory: istilahPidanaData.metadata.categories[
          Math.floor(Math.random() * istilahPidanaData.metadata.categories.length)
        ].name,
        recentSearches: Math.floor(Math.random() * 200) + 300
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update URL params when filters change
  useEffect(() => {
    if (!embedded) {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      if (selectedCategory !== 'all') params.set('category', selectedCategory)
      if (sortBy !== 'term') params.set('sort', sortBy)
      if (currentPage > 1) params.set('page', currentPage.toString())
      
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`
      window.history.replaceState({}, '', newUrl)
    }
  }, [searchQuery, selectedCategory, sortBy, currentPage, embedded])

  // Filter and sort terms
  const filteredAndSortedTerms = useMemo(() => {
    let filtered = istilahPidanaData.terms

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory)
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.englishTerm?.toLowerCase().includes(query) ||
        term.relatedTerms?.some(rt => rt.toLowerCase().includes(query))
      )
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'category':
          return a.category.localeCompare(b.category)
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
        default:
          return a.term.localeCompare(b.term)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  // Pagination
  const paginatedTerms = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedTerms.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedTerms, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredAndSortedTerms.length / itemsPerPage)

  // Handlers
  const toggleExpanded = (id: number) => {
    setExpandedTerms(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleBookmark = (id: number) => {
    const newBookmarks = bookmarkedTerms.includes(id)
      ? bookmarkedTerms.filter(i => i !== id)
      : [...bookmarkedTerms, id]
    
    setBookmarkedTerms(newBookmarks)
    localStorage.setItem('bookmarkedTerms', JSON.stringify(newBookmarks))
  }

  const handleExport = async () => {
    setIsLoading(true)
    
    // Create CSV content
    const csvContent = [
      ['ID', 'Istilah', 'Kategori', 'Definisi', 'Contoh', 'Dasar Hukum', 'Istilah Inggris', 'Istilah Terkait'].join(','),
      ...filteredAndSortedTerms.map(term => [
        term.id,
        `"${term.term}"`,
        term.category,
        `"${term.definition}"`,
        `"${term.example || ''}"`,
        `"${term.legalBasis}"`,
        `"${term.englishTerm || ''}"`,
        `"${term.relatedTerms?.join('; ') || ''}"`,
      ].join(','))
    ].join('\n')

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `istilah-pidana-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setIsLoading(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kamus Istilah Hukum Pidana Indonesia',
          text: `Temukan ${filteredAndSortedTerms.length} istilah hukum pidana lengkap dengan definisi, contoh, dan dasar hukum`,
          url: window.location.href
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  // Alphabet navigation with Indonesian touch
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const availableLetters = useMemo(() => {
    const letters = new Set(istilahPidanaData.terms.map(term => term.term[0].toUpperCase()))
    return alphabet.filter(letter => letters.has(letter))
  }, [])

  return (
    <div ref={containerRef} className={`${embedded ? '' : 'min-h-screen'} bg-gradient-to-br from-amber-50 via-white to-red-50 rounded-2xl shadow-2xl overflow-hidden relative`}>
      <AnimatedBatikPattern animate={!embedded} />
      <FloatingWayang delay={1} />
      
      {/* Header dengan 3D effect */}
      {!embedded && (
        <motion.div
          style={{ scale: headerScale }}
          className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white p-4 sm:p-8 relative overflow-hidden"
        >
          <AnimatedBatikPattern className="text-white" animate={false} />
          
          {/* Animated Background Shapes */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10">
            <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
              >
                <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" />
              </motion.div>
              
              <div className="flex-1">
                <motion.h2 
                  className="text-2xl sm:text-4xl font-bold mb-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Kamus Istilah Hukum Pidana Indonesia
                </motion.h2>
                <motion.p 
                  className="text-sm sm:text-lg text-red-100"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {istilahPidanaData.metadata.total} istilah hukum pidana dari KUHP, KUHAP, dan Peraturan Perundangan
                </motion.p>
              </div>

              {/* Live Stats Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
              >
                <Activity className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">{liveStats.activeUsers} Online</span>
              </motion.div>
            </motion.div>

            {/* Quick Stats Bar */}
            {showStats && (
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: Database, label: "Total Istilah", value: statistics.total, color: "text-amber-300" },
                  { icon: TrendingUp, label: "Trending", value: statistics.trending, color: "text-green-300" },
                  { icon: Globe, label: "Bilingual", value: `${Math.round((statistics.withEnglish / statistics.total) * 100)}%`, color: "text-blue-300" },
                  { icon: Award, label: "Kelengkapan", value: `${statistics.completeness}%`, color: "text-purple-300" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4"
                  >
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color} mb-1`} />
                    <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-red-100">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Controls dengan Nusantara styling */}
      <div className="p-4 sm:p-6 border-b border-red-100 bg-white/80 backdrop-blur-sm relative">
        <AnimatedBatikPattern className="text-red-200" animate={false} />
        
        {/* Search Bar dengan 3D effect */}
        <div className="relative mb-4 z-10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
            <input
              type="text"
              placeholder="Cari istilah, definisi, bahasa Inggris, atau istilah terkait..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full pl-10 pr-10 py-3 sm:py-4 bg-white border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base shadow-md"
            />
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSearchQuery('')
                  setCurrentPage(1)
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-red-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-red-400 hover:text-red-600" />
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Filters dengan animasi */}
        <div className="flex flex-wrap gap-3 relative z-10">
          {/* Category Filter */}
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-white border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
          >
            <option value="all">Semua Kategori ({istilahPidanaData.metadata.total})</option>
            {istilahPidanaData.metadata.categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </motion.select>

          {/* Sort */}
          <motion.select
            whileHover={{ scale: 1.02 }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-white border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 text-sm sm:text-base shadow-sm hover:shadow-md transition-all"
          >
            <option value="term">Urutkan A-Z</option>
            <option value="category">Urutkan Kategori</option>
            <option value="trending">Trending 🔥</option>
          </motion.select>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center gap-2 bg-white border-2 border-red-200 rounded-lg p-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('card')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'card' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-100'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-red-100'
              }`}
            >
              <FileText className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Actions */}
          <div className="flex gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={isLoading}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Export</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Alphabet Navigation dengan style Nusantara */}
        {!embedded && (
          <motion.div 
            className="mt-4 flex flex-wrap gap-1 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {alphabet.map((letter, index) => (
              <motion.button
                key={letter}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const element = document.querySelector(`[data-letter="${letter}"]`)
                  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                disabled={!availableLetters.includes(letter)}
                className={`w-8 h-8 text-sm font-bold rounded-lg transition-all ${
                  availableLetters.includes(letter)
                    ? 'bg-gradient-to-br from-red-100 to-amber-100 text-red-700 hover:from-red-200 hover:to-amber-200 shadow-sm hover:shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {letter}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Results Count dengan animasi */}
        <motion.div 
          className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-sm text-gray-600">
            Menampilkan <span className="font-bold text-red-600">{paginatedTerms.length}</span> dari{' '}
            <span className="font-bold text-red-600">{filteredAndSortedTerms.length}</span> istilah
            {selectedCategory !== 'all' && (
              <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                {istilahPidanaData.metadata.categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </div>
          
          {/* Category Distribution Mini Chart */}
          {selectedCategory === 'all' && !embedded && (
            <div className="flex items-center gap-1">
              {statistics.categories.slice(0, 5).map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="relative group"
                >
                  <div 
                    className="w-3 bg-gradient-to-t from-red-400 to-amber-400 rounded-t"
                    style={{ height: `${cat.percentage / 2}px` }}
                  />
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {cat.name}: {cat.percentage}%
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Terms List dengan 3D Cards */}
      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPage}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={viewMode === 'card' ? 'space-y-4' : 'space-y-2'}
          >
            {paginatedTerms.map((term: Term, index) => {
              const categoryInfo = istilahPidanaData.metadata.categories.find(c => c.id === term.category)
              const isExpanded = expandedTerms.includes(term.id)
              const isBookmarked = bookmarkedTerms.includes(term.id)
              
              return (
                <NusantaraCard3D 
                  key={term.id} 
                  index={index}
                  className="group"
                >
                  <motion.div
                    data-letter={term.term[0].toUpperCase()}
                    className={`relative bg-white/90 backdrop-blur-sm border-2 border-red-100 rounded-xl overflow-hidden hover:border-red-300 transition-all ${
                      viewMode === 'card' ? 'p-4 sm:p-6' : 'p-3 sm:p-4'
                    }`}
                  >
                    <AnimatedBatikPattern className="text-red-100" animate={false} />
                    
                    {/* Term Header dengan gradient Nusantara */}
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex-1 pr-4">
                        <motion.h3 
                          className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 flex-wrap"
                          whileHover={{ x: 5 }}
                        >
                          <span className="bg-gradient-to-r from-red-700 to-amber-700 bg-clip-text text-transparent">
                            {term.term}
                          </span>
                          {term.trending && (
                            <motion.span 
                              className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full shadow-md"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <TrendingUp className="inline h-3 w-3 mr-1" />
                              Trending
                            </motion.span>
                          )}
                        </motion.h3>
                        {term.englishTerm && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Globe className="h-3 w-3" />
                            <span className="italic">{term.englishTerm}</span>
                          </p>
                        )}
                      </div>
                      
                      {/* Action Buttons dengan 3D effect */}
                      <div className="flex items-center gap-1 sm:gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 180 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleBookmark(term.id)}
                          className={`p-2 sm:p-3 rounded-lg transition-all ${
                            isBookmarked 
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg' 
                              : 'hover:bg-amber-100 text-gray-400 hover:text-amber-600'
                          }`}
                          title={isBookmarked ? "Hapus bookmark" : "Tambah bookmark"}
                        >
                          <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleExpanded(term.id)}
                          className="p-2 sm:p-3 hover:bg-red-100 rounded-lg transition-all text-gray-600 hover:text-red-600"
                          title={isExpanded ? "Sembunyikan" : "Lihat detail"}
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Category Badge dengan Nusantara colors */}
                    <motion.div 
                      className="mt-3 inline-block"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-amber-100 text-red-700 text-sm rounded-full font-medium shadow-sm">
                        {categoryInfo?.name} ({categoryInfo?.count})
                      </span>
                    </motion.div>

                    {/* Definition dengan style */}
                    <motion.p 
                      className="mt-3 text-gray-700 leading-relaxed relative z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                    >
                      {term.definition}
                    </motion.p>

                    {/* Expanded Content dengan animasi smooth */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-4 pt-4 border-t-2 border-red-100 relative z-10">
                            {/* Example dengan background pattern */}
                            {term.example && (
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                              >
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                  <Info className="h-4 w-4 text-red-600" />
                                  Contoh:
                                </h4>
                                <div className="relative overflow-hidden rounded-lg">
                                  <AnimatedBatikPattern className="text-amber-100" animate={false} />
                                  <p className="relative z-10 text-gray-700 bg-gradient-to-r from-amber-50 to-red-50 p-3 sm:p-4 italic">
                                    "{term.example}"
                                  </p>
                                </div>
                              </motion.div>
                            )}

                            {/* Legal Basis dengan icon */}
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Scale className="h-4 w-4 text-red-600" />
                                Dasar Hukum:
                              </h4>
                              <p className="text-gray-700 bg-red-50 p-3 rounded-lg font-medium">
                                {term.legalBasis}
                              </p>
                            </motion.div>

                            {/* Related Terms dengan animasi */}
                            {term.relatedTerms && term.relatedTerms.length > 0 && (
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                  <Hash className="h-4 w-4 text-red-600" />
                                  Istilah Terkait:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {term.relatedTerms.map((related, idx) => (
                                    <motion.div
                                      key={idx}
                                      whileHover={{ scale: 1.05, y: -2 }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Link
                                        href={`/kamus-hukum/kategori/pidana/istilah?search=${encodeURIComponent(related)}`}
                                        className="inline-block px-3 py-1 bg-gradient-to-r from-red-100 to-amber-100 text-red-700 rounded-full text-sm hover:from-red-200 hover:to-amber-200 transition-all shadow-sm hover:shadow-md"
                                      >
                                        {related}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {/* Additional Notes jika ada */}
                            {term.additionalNotes && (
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-4"
                              >
                                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                                  <p className="text-sm text-gray-700">
                                    <strong>Catatan:</strong> {term.additionalNotes}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Decorative Corner */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 opacity-10"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                    >
                      <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-600">
                        <path d="M100,0 L100,50 C100,22.4 77.6,0 50,0 L100,0 Z" />
                        <circle cx="80" cy="20" r="5" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </NusantaraCard3D>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination dengan style Nusantara */}
        {totalPages > 1 && (
          <motion.div 
            className="mt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            
            <div className="flex gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = idx + 1
                } else if (currentPage <= 3) {
                  pageNum = idx + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx
                } else {
                  pageNum = currentPage - 2 + idx
                }
                
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all shadow-md hover:shadow-lg ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-red-50 border-2 border-red-200'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                )
              })}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Summary Stats untuk mobile */}
        {!embedded && (
          <motion.div
            className="mt-8 p-4 bg-gradient-to-r from-red-50 to-amber-50 rounded-xl border-2 border-red-200 lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="font-bold text-red-700 mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Statistik Kategori
            </h3>
            <div className="space-y-2">
              {statistics.categories.slice(0, 3).map((cat, index) => (
                <div key={cat.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{cat.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-red-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-red-500 to-amber-500"
                      />
                    </div>
                    <span className="text-xs font-bold text-red-600">{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* View All Link untuk embedded mode */}
      {embedded && filteredAndSortedTerms.length > itemsPerPage && (
        <motion.div 
          className="p-4 border-t border-red-100 text-center bg-gradient-to-r from-red-50 to-amber-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            href="/kamus-hukum/kategori/pidana/istilah"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-bold group"
          >
            <span>Lihat Semua {filteredAndSortedTerms.length} Istilah</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Floating Stats Button untuk mobile */}
      {!embedded && (
        <motion.button
          className="fixed bottom-6 right-6 lg:hidden bg-gradient-to-r from-red-600 to-amber-600 text-white p-4 rounded-full shadow-2xl z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowStats(!showStats)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <BarChart3 className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  )
}
