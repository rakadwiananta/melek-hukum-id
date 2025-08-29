'use client'

import React, { Suspense, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import KategoriPerdata from '@/app/components/kamus/KategoriPerdata'
import { HeaderBannerAd, SidebarAd } from '@/app/components/ads/AdPlacements'
import { 
  FileText, BookOpen, Scale, Shield, ArrowRight, 
  TrendingUp, Users, Home, Activity, AlertCircle,
  Calendar, BarChart3, PieChart, Globe, Sparkles,
  Heart, ScrollText, Banknote, UserCheck, Search
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-perdata" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M25,25 Q50,0 75,25 Q100,50 75,75 Q50,100 25,75 Q0,50 25,25" 
              fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M75,25 Q100,0 125,25 Q150,50 125,75 Q100,100 75,75 Q50,50 75,25" 
              fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M25,75 Q50,50 75,75 Q100,100 75,125 Q50,150 25,125 Q0,100 25,75" 
              fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M75,75 Q100,50 125,75 Q150,100 125,125 Q100,150 75,125 Q50,100 75,75" 
              fill="none" stroke="currentColor" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-perdata)" />
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
    
    setRotateX((y - centerY) / 10)
    setRotateY((centerX - x) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 50 }}
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
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      delay, 
      duration: 0.6,
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

// Statistics data for civil law
const civilStats = [
  { label: 'Total Istilah', value: 743, icon: BookOpen, color: 'from-green-500 to-emerald-600' },
  { label: 'Kategori Hukum', value: 10, icon: BarChart3, color: 'from-blue-500 to-cyan-600' },
  { label: 'Sumber Peraturan', value: 11, icon: ScrollText, color: 'from-purple-500 to-violet-600' },
  { label: 'Trending Terms', value: 45, icon: TrendingUp, color: 'from-rose-500 to-pink-600' }
]

// Quick access categories
const quickCategories = [
  { 
    id: 'hukum-keluarga', 
    name: 'Hukum Keluarga', 
    count: 92, 
    icon: Heart, 
    color: 'from-pink-500 to-rose-600',
    description: 'Perkawinan, perceraian, dan hubungan keluarga'
  },
  { 
    id: 'hukum-waris', 
    name: 'Hukum Waris', 
    count: 78, 
    icon: ScrollText, 
    color: 'from-purple-500 to-violet-600',
    description: 'Pewarisan, wasiat, dan pembagian harta'
  },
  { 
    id: 'hukum-benda', 
    name: 'Hukum Benda', 
    count: 86, 
    icon: Home, 
    color: 'from-green-500 to-emerald-600',
    description: 'Hak milik, benda bergerak dan tidak bergerak'
  },
  { 
    id: 'hukum-perjanjian', 
    name: 'Hukum Perjanjian', 
    count: 88, 
    icon: UserCheck, 
    color: 'from-blue-500 to-cyan-600',
    description: 'Kontrak, kesepakatan, dan perikatan'
  },
  { 
    id: 'hukum-jaminan', 
    name: 'Hukum Jaminan', 
    count: 72, 
    icon: Shield, 
    color: 'from-red-500 to-rose-600',
    description: 'Gadai, hipotik, fidusia, dan hak tanggungan'
  },
  { 
    id: 'acara-perdata', 
    name: 'Acara Perdata', 
    count: 82, 
    icon: Scale, 
    color: 'from-indigo-500 to-blue-600',
    description: 'Prosedur pengadilan dan beracara perdata'
  }
]

function PerdataPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

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
          className="absolute top-20 left-10 text-green-200/20" 
          delay={0.2}
        >
          <FileText size={120} />
        </FloatingElement>
        <FloatingElement 
          className="absolute top-40 right-20 text-emerald-200/20" 
          delay={0.4}
        >
          <Scale size={100} />
        </FloatingElement>
        <FloatingElement 
          className="absolute bottom-40 left-20 text-teal-200/20" 
          delay={0.6}
        >
          <Heart size={80} />
        </FloatingElement>
        <FloatingElement 
          className="absolute bottom-20 right-40 text-green-200/20" 
          delay={0.8}
        >
          <Home size={90} />
        </FloatingElement>
      </div>

      {/* Header Section */}
      <motion.div 
        className="relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <HeaderBannerAd />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
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
            <span className="text-green-600 font-medium">Hukum Perdata</span>
          </motion.nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-6">
                <Card3D delay={0.2}>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl">
                    <FileText className="w-16 h-16 text-white" />
                  </div>
                </Card3D>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Hukum{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Perdata
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Jelajahi kompendium lengkap istilah hukum perdata Indonesia. 
                Dari KUHPerdata hingga undang-undang khusus, temukan definisi akurat 
                dengan contoh dan dasar hukum yang jelas.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {civilStats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <Card3D key={stat.label} delay={0.3 + index * 0.1}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.value.toLocaleString('id-ID')}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    </Card3D>
                  )
                })}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/kamus-hukum/kategori/perdata/istilah"
                className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Jelajahi Semua Istilah
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link
                href="/kamus-hukum?category=perdata"
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-green-700 font-semibold rounded-2xl border border-green-200 shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Cari Istilah Spesifik
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Categories Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-y border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori{' '}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Populer
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akses cepat ke kategori hukum perdata yang paling sering dicari
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card3D key={category.id} delay={index * 0.1}>
                  <Link
                    href={`/kamus-hukum/kategori/perdata/istilah?category=${category.id}`}
                    className="group block"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-green-300 transition-all duration-300 h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">
                          {category.count} istilah
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-16">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Suspense fallback={
                <div className="flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              }>
                <KategoriPerdata searchQuery={searchQuery} />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <SidebarAd />
                
                {/* Quick Links */}
                <Card3D delay={0.4}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-600" />
                      Akses Cepat
                    </h3>
                    <div className="space-y-3">
                      <Link
                        href="/kamus-hukum/kategori/perdata/istilah"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <BookOpen className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Semua Istilah Perdata
                        </span>
                      </Link>
                      <Link
                        href="/panduan/gugatan-sederhana"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <Scale className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Panduan Gugatan Sederhana
                        </span>
                      </Link>
                      <Link
                        href="/template"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                      >
                        <FileText className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700 group-hover:text-green-700">
                          Template Dokumen
                        </span>
                      </Link>
                    </div>
                  </div>
                </Card3D>

                {/* Legal Sources */}
                <Card3D delay={0.6}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      Sumber Hukum
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>• KUHPerdata (Burgerlijk Wetboek)</div>
                      <div>• UU No. 1/1974 tentang Perkawinan</div>
                      <div>• UU No. 5/1960 tentang Pokok-Pokok Agraria</div>
                      <div>• UU No. 42/1999 tentang Jaminan Fidusia</div>
                      <div>• UU No. 4/1996 tentang Hak Tanggungan</div>
                      <div>• UU No. 40/2007 tentang Perseroan Terbatas</div>
                      <div>• UU No. 2/2014 tentang Jabatan Notaris</div>
                      <div>• UU No. 37/2004 tentang Kepailitan</div>
                      <div>• Kompilasi Hukum Islam (KHI)</div>
                      <div>• HIR/RBg (Hukum Acara Perdata)</div>
                    </div>
                  </div>
                </Card3D>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Butuh Bantuan Hukum Perdata?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Konsultasikan kasus Anda dengan ahli hukum perdata berpengalaman
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/panduan"
                className="px-8 py-4 bg-white text-green-700 font-semibold rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center"
              >
                <Users className="w-5 h-5" />
                Panduan Hukum
              </Link>
              <Link
                href="/template"
                className="px-8 py-4 bg-green-700/30 backdrop-blur-sm text-white font-semibold rounded-2xl border border-green-400/30 hover:bg-green-700/40 transition-colors flex items-center gap-2 justify-center"
              >
                <FileText className="w-5 h-5" />
                Download Template
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function PerdataPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    }>
      <PerdataPageContent />
    </Suspense>
  )
}