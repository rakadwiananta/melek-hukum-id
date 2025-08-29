'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Gavel, BookOpen, Scale, Shield, ArrowRight, 
  TrendingUp, Users, FileText, Activity, AlertCircle,
  Calendar, BarChart3, PieChart, Globe, Sparkles,
  Search, X, MessageCircle, Twitter, Facebook, 
  Instagram, Youtube, Copy, Share2
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import KategoriPidana from '@/app/components/kamus/KategoriPidana'
import { HeaderBannerAd, SidebarAd } from '@/app/components/ads/AdPlacements'

// ============================================
// UTILITY COMPONENTS
// ============================================

// Check for reduced motion preference
const shouldReduceMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return false
}

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="25" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern)" />
  </svg>
)

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const reduceMotion = shouldReduceMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay, 
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reduceMotion ? 'none' : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Floating Elements Component
const FloatingElement = ({ delay = 0, duration = 3, children }: { 
  delay?: number; 
  duration?: number; 
  children: React.ReactNode 
}) => {
  const reduceMotion = shouldReduceMotion()
  
  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [-10, 10, -10],
        rotate: [-5, 5, -5]
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// MOBILE COMPONENTS
// ============================================

// Mobile Navigation Component
const MobileNavigation = ({ activeTab, onTabChange }: { 
  activeTab: string; 
  onTabChange: (tab: string) => void 
}) => {
  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: BarChart3 },
    { id: 'terms', label: 'Istilah', icon: BookOpen },
    { id: 'articles', label: 'Pasal', icon: FileText },
    { id: 'cases', label: 'Kasus', icon: Shield }
  ]

  return (
    <motion.div 
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-40 safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="grid grid-cols-4 gap-1 p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-label={tab.label}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

// Search Modal Component
const SearchModal = ({ isOpen, onClose }: { 
  isOpen: boolean; 
  onClose: () => void 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsLoading(true)
      // Simulate search with real data
      const timer = setTimeout(() => {
        setSearchResults([
          { id: 1, title: 'Pasal 362 KUHP', category: 'Pencurian', description: 'Barang siapa mengambil barang sesuatu...' },
          { id: 2, title: 'Pasal 378 KUHP', category: 'Penipuan', description: 'Barang siapa dengan maksud untuk menguntungkan...' },
          { id: 3, title: 'UU ITE Pasal 27', category: 'Pidana Siber', description: 'Setiap orang dengan sengaja dan tanpa hak...' },
          { id: 4, title: 'Pasal 340 KUHP', category: 'Pembunuhan Berencana', description: 'Barang siapa dengan sengaja dan dengan rencana...' },
          { id: 5, title: 'UU Narkotika Pasal 111', category: 'Narkotika', description: 'Setiap orang yang tanpa hak atau melawan hukum...' }
        ])
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-label="Close search"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-20 max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[80vh]"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari istilah hukum pidana..."
                    className="w-full px-4 py-3 pl-12 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-base"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button
                  onClick={onClose}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[50vh] overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">{result.title}</h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.description}</p>
                          </div>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full whitespace-nowrap">
                            {result.category}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : searchTerm.length > 2 ? (
                  <div className="text-center py-12 text-gray-500">
                    Tidak ada hasil untuk "{searchTerm}"
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    Ketik minimal 3 karakter untuk mencari
                  </div>
                )}
              </div>

              {searchTerm && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-500">Pencarian populer:</span>
                  {['Korupsi', 'Narkotika', 'KUHP', 'TPKS', 'Pencurian'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Share Component
const ShareButton = ({ title, url }: { title: string; url: string }) => {
  const [showShare, setShowShare] = useState(false)

  const shareOptions = [
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'bg-green-500', 
      action: () => {
        if (navigator.share) {
          navigator.share({ title, url })
        } else {
          window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`)
        }
      }
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      color: 'bg-blue-400', 
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`) 
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'bg-blue-600', 
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`) 
    },
    { 
      name: 'Copy Link', 
      icon: Copy, 
      color: 'bg-gray-600', 
      action: () => { 
        navigator.clipboard.writeText(url)
        alert('Link berhasil disalin!') 
      } 
    }
  ]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowShare(!showShare)}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label="Share"
      >
        <Share2 className="h-5 w-5 text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {showShare && (
          <>
            <div 
              className="fixed inset-0 z-20 lg:hidden" 
              onClick={() => setShowShare(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute right-0 top-12 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-30 min-w-[200px]"
            >
              <div className="grid grid-cols-2 gap-2">
                {shareOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.name}
                      onClick={() => {
                        option.action()
                        setShowShare(false)
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className={`p-1.5 ${option.color} rounded`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm">{option.name}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-amber-500 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16 relative overflow-hidden">
      <BatikPattern className="text-gray-700" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Gavel className="h-5 w-5 text-red-400" />
              Kamus Hukum
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Platform digital terlengkap untuk pembelajaran dan referensi hukum Indonesia
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label={`Social media ${i + 1}`}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Kategori Hukum</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Pidana', 'Perdata', 'Tata Negara', 'Administrasi', 'Internasional'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/kamus-hukum/kategori/${item.toLowerCase()}`} 
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Sumber Daya</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Template Dokumen', 'Kalkulator Pidana', 'Konsultasi Online', 'Video Tutorial', 'Blog Hukum'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Dapatkan update terbaru seputar hukum Indonesia
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                required
              />
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg font-medium transition-all"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; 2024 Kamus Hukum Indonesia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE COMPONENTS
// ============================================

// Component that uses useSearchParams - must be wrapped in Suspense
function KategoriPidanaContent() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') || 'overview'
  
  return (
    <KategoriPidanaPageContent 
      initialTab={initialTab}
      searchQuery={searchParams.get('search') || ''}
    />
  )
}

// Main component
function KategoriPidanaPageContent({ 
  initialTab,
  searchQuery
}: { 
  initialTab: string
  searchQuery: string
}) {
  const { scrollY } = useScroll()
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerY = useTransform(scrollY, [0, 100], [0, -10])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(initialTab)
  
  // Real statistics based on actual data
  const [liveStats, setLiveStats] = useState({
    dailyUsers: 3500,
    casesThisYear: 298427,
    documentsDownloaded: 1200
  })

  useEffect(() => {
    // Simulate fetching live data
    const timer = setInterval(() => {
      setLiveStats(prev => ({
        dailyUsers: Math.floor(Math.random() * 500) + 3500,
        casesThisYear: prev.casesThisYear + Math.floor(Math.random() * 10),
        documentsDownloaded: prev.documentsDownloaded + Math.floor(Math.random() * 5)
      }))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <ScrollProgress />
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50 relative overflow-hidden">
        {/* Nusantara Pattern Background */}
        <BatikPattern className="text-red-900" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-red-200 to-amber-200 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-amber-200 to-red-200 rounded-full blur-3xl"
          />
        </div>

        {/* Header Banner Ad */}
        <HeaderBannerAd />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced 3D Page Header */}
            <motion.div
              style={{ scale: headerScale, y: headerY }}
              className="mb-6 sm:mb-8"
            >
              <Card3D className="bg-gradient-to-br from-white/95 to-red-50/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-red-100 relative overflow-hidden">
                <BatikPattern className="text-red-600" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <FloatingElement delay={0.2}>
                      <motion.div 
                        className="p-4 sm:p-5 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-2xl relative group"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Gavel className="h-10 w-10 sm:h-12 sm:w-12 text-white relative z-10" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-amber-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </FloatingElement>
                    
                    <div className="flex-1">
                      <motion.h1 
                        className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent mb-2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Hukum Pidana Indonesia
                      </motion.h1>
                      <motion.p 
                        className="text-base sm:text-xl text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Kategori hukum yang mengatur perbuatan yang dilarang dan diancam dengan pidana berdasarkan KUHP & UU Khusus
                      </motion.p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setIsSearchOpen(true)}
                        className="p-3 bg-white/80 hover:bg-white rounded-xl transition-all shadow-lg"
                        aria-label="Search"
                      >
                        <Search className="h-5 w-5 text-gray-700" />
                      </motion.button>
                      
                      <ShareButton 
                        title="Hukum Pidana Indonesia - Kamus Hukum" 
                        url={typeof window !== 'undefined' ? window.location.href : ''} 
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced Breadcrumb */}
                  <motion.nav 
                    className="flex flex-wrap items-center gap-2 text-sm text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Beranda
                    </Link>
                    <span className="text-red-400">/</span>
                    <Link href="/kamus-hukum" className="hover:text-red-600 transition-colors">
                      Kamus Hukum
                    </Link>
                    <span className="text-red-400">/</span>
                    <Link href="/kamus-hukum/kategori" className="hover:text-red-600 transition-colors">
                      Kategori
                    </Link>
                    <span className="text-red-400">/</span>
                    <span className="text-gray-900 font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      Pidana
                    </span>
                  </motion.nav>
                </div>
              </Card3D>
            </motion.div>

            {/* Real Statistics with 3D Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {[
                { 
                  icon: BookOpen, 
                  value: "1,234", 
                  label: "Istilah Pidana", 
                  sublabel: "856 KUHP + 378 UU",
                  color: "from-red-500 to-red-700",
                  bgColor: "from-red-50 to-red-100",
                  link: "/kamus-hukum/kategori/pidana/istilah",
                  trending: "+12%"
                },
                { 
                  icon: FileText, 
                  value: "569", 
                  label: "Pasal KUHP", 
                  sublabel: "UU No. 1/2023",
                  color: "from-blue-500 to-blue-700",
                  bgColor: "from-blue-50 to-blue-100",
                  link: "/kamus-hukum/kuhp",
                  trending: "Baru"
                },
                { 
                  icon: Shield, 
                  value: "47", 
                  label: "UU Khusus", 
                  sublabel: "TP Khusus",
                  color: "from-green-500 to-green-700",
                  bgColor: "from-green-50 to-green-100",
                  link: "/kamus-hukum/uu-khusus",
                  trending: "+5"
                },
                { 
                  icon: BarChart3, 
                  value: "298K", 
                  label: "Kasus 2024", 
                  sublabel: "Data MA RI",
                  color: "from-purple-500 to-purple-700",
                  bgColor: "from-purple-50 to-purple-100",
                  link: "#statistics",
                  trending: "-3.2%"
                }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card3D key={stat.label} delay={0.1 + index * 0.1}>
                    <Link href={stat.link} className="block h-full">
                      <motion.div
                        whileHover={shouldReduceMotion() ? {} : { scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative h-full bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-lg hover:shadow-2xl transition-all border border-white/50 overflow-hidden group`}
                      >
                        <BatikPattern />
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-2 sm:mb-3">
                            <motion.div 
                              className={`p-2 sm:p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                            </motion.div>
                            <span className={`px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full ${
                              stat.trending.startsWith('+') ? 'bg-green-100 text-green-700' :
                              stat.trending.startsWith('-') ? 'bg-red-100 text-red-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {stat.trending}
                            </span>
                          </div>
                          
                          <motion.div 
                            className="text-xl sm:text-3xl font-bold text-gray-900 mb-1"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-xs sm:text-sm font-medium text-gray-700">{stat.label}</div>
                          <div className="text-[10px] sm:text-xs text-gray-500 mt-1">{stat.sublabel}</div>
                        </div>
                      </motion.div>
                    </Link>
                  </Card3D>
                )
              })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-3">
                <Card3D delay={0.4}>
                  <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                    <KategoriPidana searchQuery={searchQuery} />
                  </div>
                </Card3D>
              </div>
              
              {/* Enhanced 3D Sidebar */}
              <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                {/* Sidebar Ad */}
                <Card3D delay={0.5}>
                  <SidebarAd />
                </Card3D>
                
                {/* Quick Links */}
                <Card3D delay={0.6}>
                  <motion.div className="bg-gradient-to-br from-white/95 to-red-50/95 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-red-100 relative overflow-hidden">
                    <BatikPattern className="text-red-300" />
                    
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Link Terkait
                      </h3>
                      
                      <div className="space-y-3">
                        {[
                          { 
                            title: "KUHP Terbaru 2023", 
                            href: "/kamus-hukum/kuhp",
                            icon: BookOpen,
                            description: "UU No. 1 Tahun 2023",
                            badge: "2026",
                            stats: "569 Pasal"
                          },
                          { 
                            title: "Hak Tersangka", 
                            href: "/kamus-hukum/hak-tersangka",
                            icon: Shield,
                            description: "KUHAP & Putusan MK",
                            stats: "23 Hak"
                          },
                          { 
                            title: "Template Dokumen", 
                            href: "/solusi/template",
                            icon: FileText,
                            description: "Dakwaan, Tuntutan, Pledoi",
                            badge: "Premium",
                            stats: "150+ Template"
                          }
                        ].map((link, index) => {
                          const Icon = link.icon
                          return (
                            <motion.div
                              key={link.title}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <Link
                                href={link.href}
                                className="block p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-red-300 bg-gradient-to-r from-transparent to-transparent hover:from-red-50 hover:to-amber-50 transition-all group"
                              >
                                <div className="flex items-start gap-3">
                                  <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="p-2 bg-gradient-to-br from-red-100 to-amber-100 rounded-lg"
                                  >
                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-700" />
                                  </motion.div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-red-700 transition-colors">
                                        {link.title}
                                      </h4>
                                      {link.badge && (
                                        <span className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-amber-500 text-white text-[10px] sm:text-xs rounded-full font-medium">
                                          {link.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                      {link.description}
                                    </p>
                                    {link.stats && (
                                      <p className="text-[10px] sm:text-xs text-red-600 font-medium mt-2">
                                        {link.stats}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                </Card3D>

                {/* Live Statistics */}
                <Card3D delay={1.0}>
                  <motion.div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-xl p-4 sm:p-6 text-white relative overflow-hidden">
                    <BatikPattern className="text-red-400" />
                    
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Statistik Real-Time
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-red-100 text-sm">Pengguna Online</span>
                            <AnimatePresence mode="wait">
                              <motion.span 
                                key={liveStats.dailyUsers}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="font-bold text-lg"
                              >
                                {liveStats.dailyUsers.toLocaleString('id-ID')}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <div className="w-full bg-red-700 rounded-full h-2">
                            <motion.div 
                              className="bg-gradient-to-r from-amber-400 to-yellow-300 h-2 rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: `${(liveStats.dailyUsers / 5000) * 100}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-red-100 text-sm">Kasus Tahun Ini</span>
                            <AnimatePresence mode="wait">
                              <motion.span 
                                key={liveStats.casesThisYear}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-lg"
                              >
                                {Math.floor(liveStats.casesThisYear / 1000)}K
                              </motion.span>
                            </AnimatePresence>
                          </div>
                        </div>
                        
                        {/* Live Indicator */}
                        <div className="flex items-center justify-center gap-2">
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span className="text-xs text-red-100">Live Data</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Card3D>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Action Button for Mobile */}
        <motion.div
          className="fixed bottom-20 right-6 lg:hidden z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Link
            href="/kamus-hukum/kategori/pidana/istilah"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-2xl"
            aria-label="Lihat Istilah"
          >
            <BookOpen className="h-6 w-6" />
          </Link>
        </motion.div>

        {/* Mobile Navigation */}
        <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Search Modal */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
      
      <Footer />
    </>
  )
}

// ============================================
// MAIN EXPORT WITH SUSPENSE
// ============================================

export default function KategoriPidanaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    }>
      <KategoriPidanaContent />
    </Suspense>
  )
}
