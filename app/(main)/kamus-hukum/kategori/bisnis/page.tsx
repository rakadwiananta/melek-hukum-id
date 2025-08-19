'use client'

import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Loader2, Briefcase, TrendingUp, Building, ScrollText,
  BarChart3, Shield, Globe, Activity, Sparkles, ChevronRight,
  BookOpen, Scale, Users, Award, DollarSign
} from 'lucide-react'
import Link from 'next/link'

// Enhanced Batik Pattern Component with 3D effect
const BatikPattern = ({ className = "" }: { className?: string }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <svg 
      className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
      preserveAspectRatio="xMidYMid slice"
      style={{
        transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
      }}
    >
      <defs>
        <pattern id="batik-pattern-istilah-3d" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
          <g transform="translate(75,75)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <circle r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle r="45" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <circle r="60" fill="none" stroke="currentColor" strokeWidth="0.2"/>
            </motion.g>
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <rect x="-20" y="-20" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="0.4" transform="rotate(45)"/>
              <rect x="-30" y="-30" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.2" transform="rotate(45)"/>
            </motion.g>
          </g>
          <path d="M0,75 Q37.5,50 75,75 T150,75" stroke="currentColor" strokeWidth="0.3" fill="none"/>
          <path d="M75,0 Q50,37.5 75,75 T75,150" stroke="currentColor" strokeWidth="0.3" fill="none"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik-pattern-istilah-3d)" />
    </svg>
  )
}

// Enhanced Card Component
const EnhancedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}

// Enhanced Loading Component with Statistics
const LoadingState = () => {
  const loadingStats = [
    { label: "Memuat Database", value: "295+ Istilah" },
    { label: "Sinkronisasi", value: "11 Kategori" },
    { label: "Render UI", value: "Nusantara Theme" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden max-w-lg w-full mx-4"
      >
        <BatikPattern className="text-emerald-300" />
        
        <div className="relative z-10">
          {/* 3D Loading Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity }
              }}
              className="relative"
            >
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl shadow-lg">
                <Briefcase className="h-16 w-16 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)"
                }}
              />
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl font-bold text-center text-gray-800 mb-2"
          >
            Memuat Kamus Istilah Bisnis
          </motion.h2>
          
          <p className="text-center text-gray-600 mb-6">
            Menyiapkan pengalaman visual interaktif Nusantara
          </p>

          {/* Loading Stats */}
          <div className="space-y-3 mb-6">
            {loadingStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{stat.label}</span>
                <span className="text-sm font-semibold text-emerald-600">{stat.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Loading Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {[0, 0.2, 0.4].map((delay, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-emerald-500 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay, 
                  repeat: Infinity 
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Dynamic import dengan loading state yang lebih baik
const IstilahBisnisComponent = dynamic(
  () => import('@/app/components/kamus/istilah/IstilahBisnisComponent'),
  {
    loading: () => <LoadingState />,
    ssr: false,
  }
)

// Floating decoration component with 3D effect
const FloatingElement = ({ delay = 0, children, className = "" }: { delay?: number; children: React.ReactNode; className?: string }) => (
  <motion.div
    className={`absolute ${className}`}
    initial={{ y: 0, z: 0 }}
    animate={{ 
      y: [-20, 20, -20],
      z: [-10, 10, -10],
      rotate: [-5, 5, -5]
    }}
    transition={{
      delay,
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    {children}
  </motion.div>
)

// Quick Stats Component
const QuickStats = () => {
  const stats = [
    { icon: Building, value: "295+", label: "Istilah Bisnis" },
    { icon: ScrollText, value: "11", label: "Kategori" },
    { icon: Scale, value: "100%", label: "Dasar Hukum" },
    { icon: Users, value: "1.4M+", label: "PT Indonesia" }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <EnhancedCard key={idx} delay={idx * 0.1}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-100 shadow-lg">
            <stat.icon className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600">{stat.label}</div>
          </div>
        </EnhancedCard>
      ))}
    </div>
  )
}

export default function Page() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100])
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div style={{ y: backgroundY }}>
        <BatikPattern className="text-emerald-900" />
      </motion.div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} className="top-20 left-10">
          <div className="w-64 h-64 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full blur-3xl opacity-30" />
        </FloatingElement>
        <FloatingElement delay={1} className="bottom-20 right-10">
          <div className="w-96 h-96 bg-gradient-to-br from-blue-200 to-emerald-200 rounded-full blur-3xl opacity-30" />
        </FloatingElement>
        <FloatingElement delay={2} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20" />
        </FloatingElement>
      </div>

      {/* Enhanced Breadcrumb Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-emerald-100 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/kamus-hukum" className="text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Kamus Hukum
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/kamus-hukum/kategori/bisnis" className="text-gray-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              Bisnis
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <ScrollText className="w-4 h-4" />
              Istilah
            </span>
          </nav>
        </div>
      </motion.div>

      {/* Hero Section with 3D Icons */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kamus Istilah Hukum Bisnis Indonesia
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Database lengkap dengan visualisasi interaktif dan data statistik terkini
          </p>
        </motion.div>

        {/* Quick Access Icons with hover effects */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: Building, color: "from-emerald-500 to-teal-500", delay: 0 },
            { icon: ScrollText, color: "from-blue-500 to-indigo-500", delay: 0.1 },
            { icon: TrendingUp, color: "from-purple-500 to-pink-500", delay: 0.2 },
            { icon: Shield, color: "from-amber-500 to-orange-500", delay: 0.3 }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: item.delay, type: "spring" }}
              whileHover={{ scale: 1.2, rotateY: 180 }}
              className="relative"
            >
              <div className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg text-white`}>
                <item.icon className="h-8 w-8" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: `radial-gradient(circle, ${item.color.includes('emerald') ? 'rgba(16,185,129,0.4)' : 'rgba(99,102,241,0.4)'} 0%, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <QuickStats />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Suspense fallback={<LoadingState />}>
          <IstilahBisnisComponent />
        </Suspense>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-gray-600">Scroll untuk eksplor</span>
              <ChevronRight className="w-5 h-5 text-emerald-600 rotate-90" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Activity className="w-6 h-6" />
      </motion.button>
    </div>
  )
}
