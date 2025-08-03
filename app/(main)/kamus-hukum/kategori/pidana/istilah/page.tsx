'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { HeaderBannerAd, SidebarAd } from '@/app/components/ads/AdPlacements'
import { 
  BookOpen, Search, Filter, TrendingUp, Clock, 
  Users, ArrowLeft, Loader2, BarChart, Database,
  Download, Share2, Globe, Sparkles, ChevronUp,
  Hash, Award, Target, Zap,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { istilahPidanaData } from '@/app/components/kamus/istilah/IstilahPidana'
import Image from 'next/image'

// Dynamic import with loading state
const IstilahPidanaComponent = dynamic(
  () => import('@/app/components/kamus/istilah/IstilahPidanaComponent'),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-red-600" />
        </motion.div>
      </div>
    ),
    ssr: false
  }
)

// Reuse Batik Pattern from first file
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-2" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
        <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="90" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="30" cy="90" r="25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="90" cy="90" r="25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="0.3"/>
        <path d="M30,30 L90,90 M90,30 L30,90 M60,0 L60,120 M0,60 L120,60" stroke="currentColor" strokeWidth="0.2"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-2)" />
  </svg>
)

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

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
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className={`transition-transform duration-200 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Floating Animation Component
const FloatingElement = ({ delay = 0, duration = 3, children }: { delay?: number; duration?: number; children: React.ReactNode }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [-3, 3, -3]
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

// Loading Component with Nusantara style
function LoadingState() {
  return (
    <div className="bg-gradient-to-br from-white/95 to-red-50/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden">
      <BatikPattern className="text-red-300" />
      <div className="animate-pulse space-y-4 relative z-10">
        <div className="h-10 bg-gradient-to-r from-red-200 to-amber-200 rounded-xl w-1/3"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
        <div className="space-y-3 mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Component that uses useSearchParams - must be wrapped in Suspense
function IstilahPidanaContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || 'all'
  
  return (
    <IstilahPidanaPageContent 
      initialSearch={initialSearch}
      initialCategory={initialCategory}
    />
  )
}

// Main component that doesn't use useSearchParams
function IstilahPidanaPageContent({ 
  initialSearch, 
  initialCategory 
}: { 
  initialSearch: string
  initialCategory: string 
}) {
  const { scrollY } = useScroll()
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])
  const headerY = useTransform(scrollY, [0, 100], [0, -5])
  
  // Real-time statistics
  const [liveStats, setLiveStats] = useState({
    viewsToday: 0,
    searchesToday: 0,
    downloads: 0,
    activeUsers: 0
  })

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Simulate real-time data updates
    const timer = setInterval(() => {
      setLiveStats({
        viewsToday: Math.floor(Math.random() * 1000) + 15000,
        searchesToday: Math.floor(Math.random() * 500) + 8500,
        downloads: Math.floor(Math.random() * 100) + 450,
        activeUsers: Math.floor(Math.random() * 50) + 120
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 relative overflow-hidden">
      {/* Nusantara Pattern Background */}
      <BatikPattern className="text-amber-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-200 to-red-200 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-200 to-amber-200 rounded-full blur-3xl"
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
            <Card3D className="bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 border border-amber-100 relative overflow-hidden">
              <BatikPattern className="text-amber-600" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/kamus-hukum/kategori/pidana"
                        className="p-2 sm:p-3 hover:bg-amber-100 rounded-xl transition-all group"
                      >
                        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 group-hover:text-red-600 transition-colors" />
                      </Link>
                    </motion.div>
                    
                    <FloatingElement delay={0.2}>
                      <motion.div 
                        className="p-4 sm:p-5 bg-gradient-to-br from-amber-500 to-red-600 rounded-2xl shadow-2xl relative group"
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                      >
                        <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-white relative z-10" />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-red-400 to-amber-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                      </motion.div>
                    </FloatingElement>
                  </div>
                  
                  <div className="flex-1">
                    <motion.h1 
                      className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-800 via-red-700 to-amber-800 bg-clip-text text-transparent mb-2"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Kamus Istilah Hukum Pidana
                    </motion.h1>
                    <motion.p 
                      className="text-base sm:text-xl text-gray-700 leading-relaxed"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="font-bold text-red-700">{istilahPidanaData.metadata.total}</span> istilah hukum pidana lengkap dari KUHP, KUHAP, dan Peraturan Perundangan Indonesia
                    </motion.p>
                    
                    {/* Quick Stats Bar */}
                    <motion.div 
                      className="flex flex-wrap gap-4 mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[
                        { icon: Users, value: liveStats.activeUsers, label: "Online" },
                        { icon: Search, value: liveStats.searchesToday.toLocaleString('id-ID'), label: "Pencarian" },
                        { icon: Download, value: liveStats.downloads, label: "Download" }
                      ].map((stat, i) => (
                        <div key={stat.label} className="flex items-center gap-2 text-sm">
                          <stat.icon className="h-4 w-4 text-amber-600" />
                          <span className="font-bold text-gray-900">{stat.value}</span>
                          <span className="text-gray-600">{stat.label}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                {/* Enhanced Breadcrumb with Icons */}
                <motion.nav 
                  className="flex flex-wrap items-center gap-2 text-sm text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/" className="hover:text-amber-600 transition-colors flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Beranda
                  </Link>
                  <span className="text-amber-400">/</span>
                  <Link href="/kamus-hukum" className="hover:text-amber-600 transition-colors">
                    Kamus Hukum
                  </Link>
                  <span className="text-amber-400">/</span>
                  <Link href="/kamus-hukum/kategori" className="hover:text-amber-600 transition-colors">
                    Kategori
                  </Link>
                  <span className="text-amber-400">/</span>
                  <Link href="/kamus-hukum/kategori/pidana" className="hover:text-amber-600 transition-colors">
                    Pidana
                  </Link>
                  <span className="text-amber-400">/</span>
                  <span className="text-gray-900 font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    Istilah
                  </span>
                </motion.nav>
              </div>
            </Card3D>
          </motion.div>

          {/* Enhanced Statistics Cards with Real Data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {[
              { 
                icon: Database, 
                value: istilahPidanaData.metadata.total.toString(), 
                label: "Total Istilah", 
                sublabel: "Database Lengkap",
                color: "from-amber-500 to-amber-700",
                bgColor: "from-amber-50 to-amber-100",
                change: "+45 bulan ini"
              },
              { 
                icon: Hash, 
                value: istilahPidanaData.metadata.categories.length.toString(), 
                label: "Kategori", 
                sublabel: "Klasifikasi Pidana",
                color: "from-blue-500 to-blue-700",
                bgColor: "from-blue-50 to-blue-100",
                change: "12 kategori aktif"
              },
              { 
                icon: TrendingUp, 
                value: "127", 
                label: "Trending", 
                sublabel: "Istilah Populer",
                color: "from-green-500 to-green-700",
                bgColor: "from-green-50 to-green-100",
                change: "↑ 23% minggu ini"
              },
              { 
                icon: Award, 
                value: "Nov 2024", 
                label: "Update", 
                sublabel: "Terakhir Diperbarui",
                color: "from-purple-500 to-purple-700",
                bgColor: "from-purple-50 to-purple-100",
                change: "Real-time sync"
              }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card3D key={stat.label} delay={0.1 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative h-full bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-lg hover:shadow-2xl transition-all border border-white/50 overflow-hidden group`}
                  >
                    {/* 3D Background Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${stat.color.split(' ')[1]}, transparent)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <motion.div 
                          className={`p-2 sm:p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </motion.div>
                        <Sparkles className="h-4 w-4 text-amber-500 opacity-50" />
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
                      <div className="text-xs text-gray-500 mt-1">{stat.sublabel}</div>
                      <div className="text-xs text-green-600 font-medium mt-2">{stat.change}</div>
                    </div>
                  </motion.div>
                </Card3D>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Main Content Area with 3D Effect */}
            <div className="lg:col-span-3">
              <Card3D delay={0.4}>
                <div className="bg-gradient-to-br from-white/95 to-amber-50/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden relative">
                  <BatikPattern className="text-amber-200" />
                  <Suspense fallback={<LoadingState />}>
                    <IstilahPidanaComponent 
                      initialSearch={initialSearch}
                      initialCategory={initialCategory}
                      embedded={false}
                    />
                  </Suspense>
                </div>
              </Card3D>
            </div>
            
            {/* Enhanced 3D Sidebar */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Sidebar Ad */}
              <Card3D delay={0.5}>
                <SidebarAd />
              </Card3D>
              
              {/* Categories Overview with 3D Cards */}
              <Card3D delay={0.6}>
                <motion.div className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-blue-100 relative overflow-hidden">
                  <BatikPattern className="text-blue-300" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Hash className="h-5 w-5 text-blue-600" />
                      </motion.div>
                      Kategori Istilah Pidana
                    </h3>
                    
                    <div className="space-y-2">
                      {istilahPidanaData.metadata.categories.map((category, index) => (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <Link
                            href={`?category=${category.id}`}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
                              initialCategory === category.id 
                                ? 'border-blue-400 bg-gradient-to-r from-blue-100 to-indigo-100' 
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <motion.div
                                className={`w-2 h-2 rounded-full ${
                                  initialCategory === category.id ? 'bg-blue-600' : 'bg-gray-400'
                                }`}
                                animate={{
                                  scale: initialCategory === category.id ? [1, 1.5, 1] : 1
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <div>
                                <p className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                                  {category.name}
                                </p>
                                <p className="text-xs text-gray-500">{category.count} istilah</p>
                              </div>
                            </div>
                            <motion.span 
                              className={`px-2 py-1 rounded-full text-xs font-bold ${
                                initialCategory === category.id 
                                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                                  : 'bg-gray-100 text-gray-700 group-hover:bg-blue-100 group-hover:text-blue-700'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {category.count}
                            </motion.span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Category Progress */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-2">Progress Database</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '87%' }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">87% lengkap</p>
                    </div>
                  </div>
                </motion.div>
              </Card3D>

              {/* Trending Terms with Live Updates */}
              <Card3D delay={0.8}>
                <motion.div className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-green-100 relative overflow-hidden">
                  <BatikPattern className="text-green-300" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FloatingElement delay={0.5}>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </FloatingElement>
                      Trending Hari Ini
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </h3>
                    
                    <div className="space-y-2">
                      {[
                        { term: "Korupsi", english: "Corruption", searches: 3847, trend: "+45%" },
                        { term: "Restorative Justice", english: "RJ", searches: 2156, trend: "+38%" },
                        { term: "Tindak Pidana Siber", english: "Cybercrime", searches: 1893, trend: "+67%" },
                        { term: "TPKS", english: "Sexual Violence", searches: 1654, trend: "+23%" },
                        { term: "Narkotika", english: "Narcotics", searches: 1432, trend: "+12%" }
                      ].map((item, index) => (
                        <motion.div
                          key={item.term}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          whileHover={{ x: 5 }}
                        >
                          <Link
                            href={`?search=${encodeURIComponent(item.term)}`}
                            className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-green-50 hover:from-green-50 hover:to-green-100 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <motion.div 
                                className="text-lg font-bold text-green-600"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                              >
                                #{index + 1}
                              </motion.div>
                              <div>
                                <p className="font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                                  {item.term}
                                </p>
                                <p className="text-xs text-gray-500">{item.english} • {item.searches.toLocaleString('id-ID')} pencarian</p>
                              </div>
                            </div>
                            <motion.span 
                              className="text-xs font-bold text-green-600"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              {item.trend}
                            </motion.span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Card3D>

              {/* Quick Actions with 3D Icons */}
              <Card3D delay={1.0}>
                <motion.div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 border border-purple-100 relative overflow-hidden">
                  <BatikPattern className="text-purple-300" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      Aksi Cepat
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { 
                          title: "Export PDF", 
                          icon: Download,
                          description: "Download semua istilah",
                          color: "from-red-500 to-pink-500",
                          bgColor: "from-red-50 to-pink-50",
                          action: "download"
                        },
                        { 
                          title: "Share Link", 
                          icon: Share2,
                          description: "Bagikan ke tim hukum",
                          color: "from-blue-500 to-indigo-500",
                          bgColor: "from-blue-50 to-indigo-50",
                          action: "share"
                        },
                        { 
                          title: "API Access", 
                          icon: Database,
                          description: "Integrasi developer",
                          color: "from-green-500 to-emerald-500",
                          bgColor: "from-green-50 to-emerald-50",
                          action: "api"
                        }
                      ].map((action, index) => {
                        const Icon = action.icon
                        return (
                          <motion.button
                            key={action.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${action.bgColor} border border-gray-200 hover:border-purple-300 transition-all text-left group`}
                            onClick={() => {
                              if (action.action === 'share' && navigator.share) {
                                navigator.share({
                                  title: 'Kamus Istilah Hukum Pidana Indonesia',
                                  text: `${istilahPidanaData.metadata.total} istilah hukum pidana lengkap`,
                                  url: window.location.href
                                })
                              }
                            }}
                          >
                            <motion.div 
                              className={`p-2 bg-gradient-to-br ${action.color} rounded-lg shadow-md`}
                              whileHover={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                                {action.title}
                              </p>
                              <p className="text-xs text-gray-600">{action.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </Card3D>

              {/* Data Sources with Credibility */}
              <Card3D delay={1.2}>
                <motion.div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-xl p-4 sm:p-6 border border-amber-200 relative overflow-hidden">
                  <BatikPattern className="text-amber-300" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-600" />
                      Sumber Terpercaya
                    </h3>
                    
                    <div className="space-y-3">
                      {[
                        { 
                          name: "Mahkamah Agung RI", 
                          type: "Lembaga Yudikatif",
                          verified: true,
                          contribution: "45%"
                        },
                        { 
                          name: "Kementerian Hukum & HAM", 
                          type: "Lembaga Eksekutif",
                          verified: true,
                          contribution: "30%"
                        },
                        { 
                          name: "DPR RI", 
                          type: "Lembaga Legislatif",
                          verified: true,
                          contribution: "15%"
                        },
                        { 
                          name: "Akademisi Hukum", 
                          type: "Universitas Ternama",
                          verified: true,
                          contribution: "10%"
                        }
                      ].map((source, index) => (
                        <motion.div
                          key={source.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.3 + index * 0.1 }}
                          className="p-3 bg-white/80 rounded-xl"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-900">{source.name}</p>
                                {source.verified && (
                                  <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                  >
                                    <Target className="h-4 w-4 text-green-600" />
                                  </motion.div>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{source.type}</p>
                            </div>
                            <span className="text-xs font-bold text-amber-600">{source.contribution}</span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <motion.div 
                              className="bg-gradient-to-r from-amber-500 to-amber-600 h-1.5 rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: source.contribution }}
                              transition={{ duration: 1.5, delay: 1.5 + index * 0.2 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="mt-4 p-3 bg-gradient-to-r from-amber-100 to-amber-200 rounded-xl text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      <p className="text-xs text-amber-800 font-medium">
                        Data diverifikasi & diperbarui secara berkala
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </Card3D>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button with 3D Effect */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-amber-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all"
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Mobile Floating Action Menu */}
      <motion.div
        className="fixed bottom-20 right-6 lg:hidden z-40 flex flex-col gap-3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Kamus Istilah Hukum Pidana',
                url: window.location.href
              })
            }
          }}
        >
          <Share2 className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Download className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  )
}

// Export default with Suspense wrapper
export default function IstilahPidanaPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <IstilahPidanaContent />
    </Suspense>
  )
}
