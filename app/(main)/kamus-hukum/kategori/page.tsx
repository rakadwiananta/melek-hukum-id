'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, Scale, FileText, Shield, Users,
  ArrowRight, Gavel, Building, Globe, Award
} from 'lucide-react'
import Link from 'next/link'

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-kategori" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="25" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-kategori)" />
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

// Categories data
const categories = [
  {
    id: 'pidana',
    name: 'Hukum Pidana',
    description: 'KUHP, UU Pidana Khusus, dan istilah terkait sistem peradilan pidana',
    count: 856,
    icon: Gavel,
    color: 'from-red-500 to-rose-600',
    href: '/kamus-hukum/kategori/pidana'
  },
  {
    id: 'perdata',
    name: 'Hukum Perdata',
    description: 'KUHPerdata, hukum keluarga, waris, kontrak, dan hukum benda',
    count: 743,
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
    href: '/kamus-hukum/kategori/perdata'
  },
  {
    id: 'tata-negara',
    name: 'Hukum Tata Negara',
    description: 'UUD 1945, lembaga negara, dan sistem ketatanegaraan Indonesia',
    count: 542,
    icon: Building,
    color: 'from-blue-500 to-cyan-600',
    href: '/kamus-hukum/kategori/tata-negara'
  },
  {
    id: 'anti-korupsi',
    name: 'Anti Korupsi',
    description: 'UU Tipikor, KPK, dan istilah pemberantasan korupsi',
    count: 387,
    icon: Shield,
    color: 'from-orange-500 to-amber-600',
    href: '/kamus-hukum/kategori/anti-korupsi'
  },
  {
    id: 'bisnis',
    name: 'Hukum Bisnis',
    description: 'Hukum perusahaan, perdagangan, dan ketenagakerjaan',
    count: 425,
    icon: Award,
    color: 'from-purple-500 to-violet-600',
    href: '/kamus-hukum/kategori/bisnis'
  },
  {
    id: 'internasional',
    name: 'Hukum Internasional',
    description: 'Konvensi internasional dan hukum antar negara',
    count: 234,
    icon: Globe,
    color: 'from-indigo-500 to-purple-600',
    href: '/kamus-hukum?category=internasional'
  }
]

export default function KategoriPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
      <BatikPattern />

      {/* Header Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <Link href="/kamus-hukum" className="hover:text-blue-600 transition-colors">
              Kamus Hukum
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-blue-600 font-medium">Kategori</span>
          </motion.nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <Card3D delay={0.2}>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                </Card3D>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Kategori{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Kamus Hukum
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Jelajahi berbagai bidang hukum Indonesia melalui kategori yang telah tersusun rapi. 
                Temukan istilah hukum berdasarkan bidang keahlian yang Anda butuhkan.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { label: 'Total Kategori', value: categories.length, icon: BookOpen },
                  { label: 'Total Istilah', value: categories.reduce((sum, cat) => sum + cat.count, 0), icon: FileText },
                  { label: 'Bidang Hukum', value: '6+', icon: Scale },
                  { label: 'Update Rutin', value: 'Mingguan', icon: Award }
                ].map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <Card3D key={stat.label} delay={0.3 + index * 0.1}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {typeof stat.value === 'number' ? stat.value.toLocaleString('id-ID') : stat.value}
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
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card3D key={category.id} delay={index * 0.1}>
                  <Link href={category.href} className="group block h-full">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-300 transition-all duration-300 h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-blue-600">
                          {category.count.toLocaleString('id-ID')} istilah
                        </span>
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tidak Menemukan yang Dicari?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Gunakan fitur pencarian atau hubungi tim kami untuk bantuan lebih lanjut
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kamus-hukum"
                className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center"
              >
                <BookOpen className="w-5 h-5" />
                Cari di Kamus
              </Link>
              <Link
                href="/panduan"
                className="px-8 py-4 bg-blue-700/30 backdrop-blur-sm text-white font-semibold rounded-2xl border border-blue-400/30 hover:bg-blue-700/40 transition-colors flex items-center gap-2 justify-center"
              >
                <Users className="w-5 h-5" />
                Konsultasi Ahli
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}