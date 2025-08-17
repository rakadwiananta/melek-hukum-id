'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import IstilahPerdataComponent from '@/app/components/kamus/istilah/IstilahPerdataComponent'
import { HeaderBannerAd, SidebarAd } from '@/app/components/ads/AdPlacements'
import { 
  FileText, BookOpen, ArrowRight, Search,
  TrendingUp, Users, Home, Activity, 
  Calendar, BarChart3, Globe, Sparkles,
  Heart, ScrollText, Banknote, UserCheck, Scale, Shield
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-3 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-istilah-perdata" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
        <g transform="translate(75,75)">
          <path d="M-30,-30 Q0,-60 30,-30 Q60,0 30,30 Q0,60 -30,30 Q-60,0 -30,-30" 
                fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
          <path d="M-20,-20 Q0,-40 20,-20 Q40,0 20,20 Q0,40 -20,20 Q-40,0 -20,-20" 
                fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.5"/>
          <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.7"/>
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-istilah-perdata)" />
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
      className={`perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      {children}
    </motion.div>
  )
}

// Floating Elements
const FloatingElement = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ 
      delay, 
      duration: 0.8,
      type: "spring",
      stiffness: 100
    }}
    whileHover={{ 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.3 }
    }}
  >
    {children}
  </motion.div>
)

export default function IstilahPerdataPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 200], [0, -30])
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.9])

  // Update search from URL params
  useEffect(() => {
    const query = searchParams?.get('q') || ''
    const category = searchParams?.get('category') || ''
    setSearchQuery(query)
    setSelectedCategory(category)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 relative overflow-hidden">
      <BatikPattern />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingElement 
          className="absolute top-10 left-10 text-green-200/10" 
          delay={0.2}
        >
          <FileText size={150} />
        </FloatingElement>
        <FloatingElement 
          className="absolute top-20 right-10 text-emerald-200/10" 
          delay={0.4}
        >
          <Scale size={120} />
        </FloatingElement>
        <FloatingElement 
          className="absolute bottom-20 left-20 text-teal-200/10" 
          delay={0.6}
        >
          <Heart size={100} />
        </FloatingElement>
        <FloatingElement 
          className="absolute bottom-40 right-20 text-green-200/10" 
          delay={0.8}
        >
          <Home size={110} />
        </FloatingElement>
        <FloatingElement 
          className="absolute top-1/2 left-1/4 text-emerald-200/10" 
          delay={1.0}
        >
          <ScrollText size={80} />
        </FloatingElement>
        <FloatingElement 
          className="absolute top-1/3 right-1/3 text-green-200/10" 
          delay={1.2}
        >
          <UserCheck size={90} />
        </FloatingElement>
      </div>

      {/* Header Section */}
      <motion.div 
        className="relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <HeaderBannerAd />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-green-600 transition-colors">
              Beranda
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <Link href="/kamus-hukum" className="hover:text-green-600 transition-colors">
              Kamus Hukum
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <Link href="/kamus-hukum/kategori/perdata" className="hover:text-green-600 transition-colors">
              Hukum Perdata
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-green-600 font-medium">Istilah Perdata</span>
          </motion.nav>

          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <Card3D delay={0.2}>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                </Card3D>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Istilah{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Hukum Perdata
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Koleksi lengkap 743 istilah hukum perdata dengan definisi komprehensif, 
                contoh aplikatif, dan rujukan hukum yang akurat. Dari konsep dasar hingga 
                terminologi khusus dalam praktik hukum perdata Indonesia.
              </p>

              {/* Quick Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200 shadow-lg">
                  <Search className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    Cari dengan kata kunci
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200 shadow-lg">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    Filter berdasarkan kategori
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200 shadow-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">
                    Lihat trending terms
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-16">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Suspense fallback={
                <div className="flex justify-center items-center h-96">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full"
                  />
                </div>
              }>
                <IstilahPerdataComponent 
                  searchQuery={searchQuery}
                  initialCategory={selectedCategory}
                />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <SidebarAd />
                
                {/* Quick Navigation */}
                <Card3D delay={0.3}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      Navigasi Cepat
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href="/kamus-hukum/kategori/perdata"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Overview Hukum Perdata
                        </span>
                      </Link>
                      <Link
                        href="/kamus-hukum/kategori/perdata/istilah?category=hukum-keluarga"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <Heart className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Hukum Keluarga
                        </span>
                      </Link>
                      <Link
                        href="/kamus-hukum/kategori/perdata/istilah?category=hukum-waris"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <ScrollText className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Hukum Waris
                        </span>
                      </Link>
                      <Link
                        href="/kamus-hukum/kategori/perdata/istilah?category=hukum-benda"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <Home className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Hukum Benda
                        </span>
                      </Link>
                      <Link
                        href="/kamus-hukum/kategori/perdata/istilah?category=hukum-perjanjian"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <UserCheck className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Hukum Perjanjian
                        </span>
                      </Link>
                    </div>
                  </div>
                </Card3D>

                {/* Statistics */}
                <Card3D delay={0.5}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      Statistik Istilah
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Istilah</span>
                        <span className="text-lg font-bold text-green-600">743</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Kategori</span>
                        <span className="text-lg font-bold text-green-600">10</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Trending</span>
                        <span className="text-lg font-bold text-green-600">45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Sumber Hukum</span>
                        <span className="text-lg font-bold text-green-600">11</span>
                      </div>
                    </div>
                  </div>
                </Card3D>

                {/* Legal Sources */}
                <Card3D delay={0.7}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      Dasar Hukum Utama
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>KUHPerdata (Burgerlijk Wetboek)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>UU No. 1/1974 tentang Perkawinan</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>UU No. 5/1960 tentang Pokok-Pokok Agraria</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>UU No. 42/1999 tentang Jaminan Fidusia</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>UU No. 4/1996 tentang Hak Tanggungan</span>
                      </div>
                      <div className="text-center pt-2">
                        <span className="text-xs text-gray-500">dan 6 sumber lainnya</span>
                      </div>
                    </div>
                  </div>
                </Card3D>

                {/* Help Section */}
                <Card3D delay={0.9}>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Butuh Bantuan?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Tidak menemukan istilah yang dicari atau perlu penjelasan lebih lanjut?
                    </p>
                    <div className="space-y-2">
                      <Link
                        href="/konsultasi"
                        className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Konsultasi Gratis
                      </Link>
                      <Link
                        href="/contact"
                        className="block w-full text-center px-4 py-2 bg-white text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                      >
                        Hubungi Kami
                      </Link>
                    </div>
                  </div>
                </Card3D>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}