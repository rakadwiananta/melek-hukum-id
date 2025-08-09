'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Filter,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Hash,
  Info,
  Scale,
  Shield,
  Eye,
  Building2,
  HandCoins,
  Coins,
  Siren,
  ShieldCheck,
  FileWarning,
  UserCheck,
  FileSearch,
  BookOpen,
  Clock,
  Star,
  Bookmark,
  ArrowUpDown,
  ExternalLink,
  AlertTriangle,
  Globe,
  Users,
  Zap,
  Lock,
  Calendar,
  BarChart3,
  ChevronRight,
  X,
  Menu,
  AlertCircle,
  Ban,
  UserX,
  Sparkles,
  Home
} from 'lucide-react'
import { istilahAntiKorupsiData } from './IstilahAntiKorupsi'

interface IstilahAntiKorupsiComponentProps {
  initialCategory?: string
  initialSearch?: string
  embedded?: boolean
}

// Animated Nusantara Components
const AnimatedBatikPattern = ({ className = "", animate = true }: { className?: string; animate?: boolean }) => {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={animate ? {
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      } : {}}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <defs>
          <pattern id="batik-pattern-istilah" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.1" />
            <path d="M0,10 L20,10 M10,0 L10,20" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
            <path d="M10,10 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#batik-pattern-istilah)" />
      </svg>
    </motion.div>
  )
}

const WayangDecoration = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
    >
      <motion.path
        d="M50 20 C40 20 35 30 35 40 L35 55 L20 65 L20 80 L35 75 L35 90 L45 100 L55 100 L65 90 L65 75 L80 80 L80 65 L65 55 L65 40 C65 30 60 20 50 20 Z"
        fill="currentColor"
        animate={{
          d: [
            "M50 20 C40 20 35 30 35 40 L35 55 L20 65 L20 80 L35 75 L35 90 L45 100 L55 100 L65 90 L65 75 L80 80 L80 65 L65 55 L65 40 C65 30 60 20 50 20 Z",
            "M50 15 C40 15 35 25 35 35 L35 50 L15 60 L15 75 L35 70 L35 85 L45 95 L55 95 L65 85 L65 70 L85 75 L85 60 L65 50 L65 35 C65 25 60 15 50 15 Z",
            "M50 20 C40 20 35 30 35 40 L35 55 L20 65 L20 80 L35 75 L35 90 L45 100 L55 100 L65 90 L65 75 L80 80 L80 65 L65 55 L65 40 C65 30 60 20 50 20 Z"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </motion.svg>
  )
}

// Mobile-optimized 3D Card Component
const Card3D = ({ children, className = "", delay = 0, index = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
  index?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -10
    })
  }

  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: Math.min(delay, 0.3),
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={!isMobile ? { scale: 1.01 } : {}}
      whileTap={{ scale: 0.99 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
    >
      <motion.div 
        className="relative bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
        animate={!isMobile && isHovered ? { 
          rotateY: mousePosition.x,
          rotateX: mousePosition.y
        } : { 
          rotateY: 0,
          rotateX: 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatedBatikPattern className="text-orange-100" animate={isHovered} />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Quick Navigation Component
const QuickNavigationIstilah = ({ onCategoryClick }: { onCategoryClick: (categoryId: string) => void }) => {
  const categories = istilahAntiKorupsiData.metadata.categories
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const displayCategories = showAll || !isMobile ? categories : categories.slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6"
    >
      <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center">
        <Shield className="h-5 w-5 md:h-6 md:w-6 mr-2 text-orange-600" />
        Kategori Istilah Anti Korupsi
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3">
        {displayCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(index * 0.05, 0.3) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryClick(category.id)}
              className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-2 group-hover:scale-110 transition-transform">
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-xs font-medium text-center text-gray-700 group-hover:text-orange-600 transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </motion.button>
          )
        })}
      </div>
      
      {/* Show more button for mobile */}
      {isMobile && categories.length > 6 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 mx-auto"
        >
          {showAll ? 'Tampilkan lebih sedikit' : `Lihat ${categories.length - 6} kategori lainnya`}
          <ChevronDown className={`h-3 w-3 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </motion.button>
      )}
    </motion.div>
  )
}

// Statistics Dashboard Component
const StatisticsDashboard = ({ filteredCount, totalCount }: { filteredCount: number; totalCount: number }) => {
  const stats = istilahAntiKorupsiData.getStatistics()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6"
    >
      <div className="bg-white rounded-xl p-3 md:p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-600">Total Istilah</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{totalCount}</p>
          </div>
          <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-orange-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 md:p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-600">Ditampilkan</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{filteredCount}</p>
          </div>
          <Eye className="h-6 w-6 md:h-8 md:w-8 text-blue-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 md:p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-600">Kategori</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.categories}</p>
          </div>
          <Hash className="h-6 w-6 md:h-8 md:w-8 text-green-600 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 md:p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-600">Trending</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{stats.trendingTerms}</p>
          </div>
          <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-600 opacity-20" />
        </div>
      </div>
    </motion.div>
  )
}

// Mobile Filter Modal
const MobileFilterModal = ({ 
  isOpen, 
  onClose, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  categories 
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: "term" | "category" | "trending") => void;
  categories: Array<{
    id: string;
    name: string;
    count?: number;
  }>;
}) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Filter & Sortir</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                onCategoryChange(e.target.value)
                onClose()
              }}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {categories.map((category: { id: string; name: string; count?: number }) => (
                <option key={category.id} value={category.id}>
                  {category.name} {category.id !== 'all' && `(${category.count})`}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Urutkan
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { value: 'term', label: 'Abjad (A-Z)' },
                { value: 'category', label: 'Kategori' },
                { value: 'trending', label: 'Trending' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value as "term" | "category" | "trending")
                    onClose()
                  }}
                  className={`p-3 rounded-xl text-left transition-all ${
                    sortBy === option.value
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
          >
            Terapkan Filter
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Term Card Component
interface TermCardProps {
  term: {
    term: string
    englishTerm?: string
    definition: string
    category: string
    legalBasis: string
    example?: string
    relatedTerms?: string[]
    trending?: boolean
    additionalNotes?: string
  }
  index: number
}

const TermCard = ({ term, index }: TermCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  
  const handleView = () => {
    setIsExpanded(!isExpanded)
  }

  const categoryInfo = istilahAntiKorupsiData.metadata.categories.find(
    cat => cat.id === term.category
  )
  const Icon = categoryInfo?.icon || Shield

  return (
    <Card3D delay={index * 0.05} index={index}>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{term.term}</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                <Icon className="h-3 w-3" />
                <span className="font-medium">{categoryInfo?.name}</span>
              </div>
              {term.trending && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-full"
                >
                  <TrendingUp className="h-3 w-3" />
                  <span className="font-medium">Trending</span>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 md:p-2 rounded-lg transition-all ${
                isBookmarked 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'hover:bg-orange-50 text-gray-400 hover:text-orange-600'
              }`}
              title="Bookmark"
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleView}
              className="p-1.5 md:p-2 hover:bg-orange-50 rounded-lg transition-all text-gray-600 hover:text-orange-600"
              title={isExpanded ? "Sembunyikan" : "Lihat detail"}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Definition */}
        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
          {term.definition}
        </p>

        {/* Quick info */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Scale className="h-3 w-3" />
            <span>{term.legalBasis}</span>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4 mt-4 border-t border-orange-100">
                {/* Example */}
                {term.example && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="font-bold text-sm md:text-base text-gray-900 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-orange-600" />
                      Contoh:
                    </h4>
                    <div className="bg-orange-50 p-3 md:p-4 rounded-lg border-l-4 border-orange-400">
                      <p className="text-sm text-orange-800 italic">&quot;{term.example}&quot;</p>
                    </div>
                  </motion.div>
                )}

                {/* Legal Basis */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-bold text-sm md:text-base text-gray-900 mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-orange-600" />
                    Dasar Hukum:
                  </h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg font-medium">
                    {term.legalBasis}
                  </p>
                </motion.div>

                {/* Related Terms */}
                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 className="font-bold text-sm md:text-base text-gray-900 mb-2 flex items-center gap-2">
                      <Hash className="h-4 w-4 text-orange-600" />
                      Istilah Terkait:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {term.relatedTerms.map((related: string, idx: number) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs md:text-sm font-medium hover:bg-orange-200 transition-colors"
                        >
                          {related}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 pt-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs md:text-sm font-medium"
                  >
                    <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                    Bagikan
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium"
                  >
                    <Download className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Download</span>
                    <span className="sm:hidden">PDF</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card3D>
  )
}

// Main Component
export default function IstilahAntiKorupsiComponent({ 
  initialCategory = 'all', 
  initialSearch = '',
  embedded = false 
}: IstilahAntiKorupsiComponentProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState<'term' | 'category' | 'trending'>('term')
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const itemsPerPage = useMemo(() => isMobile ? 10 : 20, [isMobile])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Filter categories
  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: BookOpen, count: istilahAntiKorupsiData.metadata.total },
    ...istilahAntiKorupsiData.metadata.categories
  ]

  // Filtered and sorted terms
  const filteredAndSortedTerms = useMemo(() => {
    let filtered = istilahAntiKorupsiData.terms

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        (term.example && term.example.toLowerCase().includes(query)) ||
        term.legalBasis.toLowerCase().includes(query) ||
        (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(query)))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(term => term.category === selectedCategory)
    }

    // Sort terms
    const sorted = [...filtered]
    switch (sortBy) {
      case 'term':
        sorted.sort((a, b) => a.term.localeCompare(b.term))
        break
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category))
        break
      case 'trending':
        sorted.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        break
    }

    return sorted
  }, [searchQuery, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTerms.length / itemsPerPage)
  const paginatedTerms = filteredAndSortedTerms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  // Export functionality
  const handleExport = () => {
    istilahAntiKorupsiData.exportToCSV()
  }

  // Share functionality
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Istilah Anti Korupsi - Melek Hukum ID',
          text: `Temukan ${filteredAndSortedTerms.length} istilah anti korupsi terlengkap`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        // Could add toast notification here
      }
    } catch (error) {
      console.error('Share error:', error)
    }
  }

  return (
    <div className={`${embedded ? '' : 'min-h-screen bg-gradient-to-br from-orange-50 to-white'} relative`}>
      {/* Nusantara Background Decoration */}
      {!embedded && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <WayangDecoration className="absolute top-20 right-10 w-48 h-48 text-orange-200" />
          <WayangDecoration className="absolute bottom-20 left-10 w-32 h-32 text-amber-200" />
        </div>
      )}

      <div className={`${embedded ? '' : 'container mx-auto px-4 py-6 md:py-8'} relative z-10`}>
        {/* Header */}
        {!embedded && (
          <>
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-4"
            >
              <Link href="/kamus-hukum" className="hover:text-orange-600 transition-colors flex items-center gap-1">
                <Home className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Kamus Hukum</span>
              </Link>
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              <Link href="/kamus-hukum/kategori/anti-korupsi" className="hover:text-orange-600 transition-colors">
                Anti Korupsi
              </Link>
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-gray-900 font-medium">Istilah</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 md:mb-8"
            >
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Istilah Anti Korupsi
              </h1>
              <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
                Database lengkap {istilahAntiKorupsiData.metadata.total} istilah anti korupsi berdasarkan UU Tipikor, 
                peraturan KPK, dan instrumen internasional
              </p>
            </motion.div>
          </>
        )}

        {/* Quick Navigation */}
        <QuickNavigationIstilah onCategoryClick={setSelectedCategory} />

        {/* Statistics Dashboard */}
        <StatisticsDashboard 
          filteredCount={filteredAndSortedTerms.length}
          totalCount={istilahAntiKorupsiData.metadata.total}
        />

        {/* Search and Filter Bar */}
        <Card3D className="mb-6">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari istilah anti korupsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "term" | "category" | "trending")}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="term">Urutkan: A-Z</option>
                  <option value="category">Urutkan: Kategori</option>
                  <option value="trending">Urutkan: Trending</option>
                </select>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilter(true)}
                className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-100 text-orange-700 rounded-lg font-medium"
              >
                <Filter className="h-4 w-4" />
                Filter & Sortir
              </button>

              {/* Action Buttons */}
              <div className="hidden md:flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
                >
                  <Download className="h-4 w-4 md:h-5 md:w-5" />
                  Export
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  <Share2 className="h-4 w-4 md:h-5 md:w-5" />
                  Share
                </motion.button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mt-3 text-xs md:text-sm text-gray-600">
              <span>
                Menampilkan <span className="font-semibold text-gray-900">{paginatedTerms.length}</span> dari{' '}
                <span className="font-semibold text-gray-900">{filteredAndSortedTerms.length}</span> istilah
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-orange-500" />
                <span>Database terpercaya</span>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Mobile Filter Modal */}
        <MobileFilterModal
          isOpen={showMobileFilter}
          onClose={() => setShowMobileFilter(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />

        {/* Terms List */}
        <div className="space-y-4 md:space-y-6">
          {paginatedTerms.length > 0 ? (
            paginatedTerms.map((term, index) => (
              <TermCard key={term.id} term={term} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada istilah ditemukan
              </h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter kategori
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mt-8"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-sm md:text-base text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 md:px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Mobile Export/Share Buttons */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 flex gap-2 z-40"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              className="p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-colors"
            >
              <Download className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-3 bg-white text-orange-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-orange-200"
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
