'use client'

import React, { useState, useEffect } from 'react'
import KategoriBisnis from '@/app/components/kamus/KategoriBisnis'
import { 
  Briefcase, Building, Scale, TrendingUp, Shield, 
  Globe, Users, Award, DollarSign, BarChart3,
  Activity, Sparkles, ChevronRight, BookOpen, ScrollText
} from 'lucide-react'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import NusantaraCanvas from '@/app/components/nusantara/NusantaraCanvas'
import WayangModel from '@/app/components/nusantara/WayangModel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment, PerspectiveCamera } from '@react-three/drei'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// 3D Floating Icons
const FloatingIcon = ({ Icon, position, color }: any) => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  )
}

// Enhanced 3D Scene
const BusinessScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2.5}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#f59e0b" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <WayangModel scale={1.3} position={[0, -0.3, 0]} />
      </Float>

      {/* Floating business icons */}
      <FloatingIcon Icon={Building} position={[-2, 1, -1]} color="#10b981" />
      <FloatingIcon Icon={Scale} position={[2, 1, -1]} color="#3b82f6" />
      <FloatingIcon Icon={Globe} position={[0, -1.5, -1]} color="#8b5cf6" />
      
      <Environment preset="sunset" />
    </>
  )
}

// Category Statistics Card
const CategoryCard = ({ category, delay }: any) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
            <category.icon className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{category.count}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{category.description}</p>
        
        <div className="space-y-2">
          {category.subcategories.map((sub: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{sub.name}</span>
              <span className="font-medium text-gray-900">{sub.count}</span>
            </div>
          ))}
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-b-2xl"
        />
      </div>
    </motion.div>
  )
}

// Business Law Trends Component
const BusinessLawTrends = () => {
  const trends = [
    {
      category: "ESG & Sustainability",
      growth: "+87%",
      description: "Peningkatan implementasi ESG di perusahaan Indonesia",
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      category: "Digital Business",
      growth: "+124%",
      description: "Pertumbuhan bisnis digital dan e-commerce",
      icon: Globe,
      color: "from-blue-500 to-indigo-500"
    },
    {
      category: "Fintech Regulation",
      growth: "+156%",
      description: "Regulasi baru untuk fintech dan cryptocurrency",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500"
    },
    {
      category: "UMKM Digitalization",
      growth: "+203%",
      description: "Program digitalisasi untuk UMKM nasional",
      icon: Users,
      color: "from-amber-500 to-orange-500"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {trends.map((trend, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 shadow-md border border-gray-100"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${trend.color}`}>
              <trend.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-green-600">{trend.growth}</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">{trend.category}</h4>
          <p className="text-xs text-gray-600">{trend.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Page() {
  const reduced = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.98])
  const [activeView, setActiveView] = useState('overview')
  
  // Business law categories with real data
  const categories = [
    {
      icon: Building,
      title: "Corporate Law",
      count: "83",
      description: "Hukum perseroan dan badan usaha",
      color: "from-blue-500 to-indigo-600",
      subcategories: [
        { name: "Perseroan Terbatas", count: "45" },
        { name: "Corporate Action", count: "23" },
        { name: "M&A", count: "15" }
      ]
    },
    {
      icon: ScrollText,
      title: "Contract Law",
      count: "67",
      description: "Perjanjian dan kontrak bisnis",
      color: "from-emerald-500 to-teal-600",
      subcategories: [
        { name: "Sales Agreement", count: "28" },
        { name: "Service Contract", count: "21" },
        { name: "License Agreement", count: "18" }
      ]
    },
    {
      icon: DollarSign,
      title: "Finance & Banking",
      count: "92",
      description: "Hukum keuangan dan perbankan",
      color: "from-purple-500 to-pink-600",
      subcategories: [
        { name: "Loan Agreement", count: "35" },
        { name: "Securities", count: "32" },
        { name: "Trade Finance", count: "25" }
      ]
    },
    {
      icon: Shield,
      title: "Compliance",
      count: "53",
      description: "Kepatuhan dan tata kelola",
      color: "from-amber-500 to-orange-600",
      subcategories: [
        { name: "Anti Korupsi", count: "18" },
        { name: "ESG", count: "20" },
        { name: "Data Protection", count: "15" }
      ]
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 overflow-hidden">
      <PatternBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200 to-rose-200 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ 
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-rose-200 to-red-200 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Enhanced Header */}
      <motion.header 
        style={{ scale: headerScale }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-rose-600 to-red-600"
      >
        {/* Animated Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <NusantaraCanvas height={320} reducedMotion={reduced} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-amber-100 mb-6">
            <Link href="/kamus-hukum" className="hover:text-white transition-colors flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Kamus Hukum
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Kategori Bisnis</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ type: "spring" }}
                >
                  <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </motion.div>
                
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
                    Kategori Hukum Bisnis
                  </h1>
                  <p className="text-lg text-amber-100 max-w-xl">
                    Statistik lengkap, analisis mendalam, dan tren terkini hukum bisnis Indonesia
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Istilah", value: "295+", icon: Activity },
                  { label: "Kategori", value: "11", icon: BarChart3 },
                  { label: "Update", value: "2024", icon: Sparkles },
                  { label: "Pengguna", value: "10K+", icon: Users }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center"
                  >
                    <stat.icon className="h-5 w-5 text-amber-200 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-amber-100">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 mt-6">
                {['overview', 'trends', 'details'].map((view) => (
                  <motion.button
                    key={view}
                    onClick={() => setActiveView(view)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeView === view
                        ? 'bg-white text-amber-600 shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Scene */}
            {!reduced && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative h-64 sm:h-80 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 to-rose-300/20 rounded-3xl" />
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                  <Canvas>
                    <BusinessScene />
                  </Canvas>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Categories Overview */}
        {activeView === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Kategori Utama Hukum Bisnis
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Jelajahi berbagai kategori hukum bisnis dengan total 295+ istilah lengkap
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {categories.map((category, idx) => (
                <CategoryCard key={idx} category={category} delay={idx * 0.1} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Trends View */}
        {activeView === 'trends' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Tren Hukum Bisnis 2024
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Perkembangan terkini dan proyeksi masa depan hukum bisnis Indonesia
              </p>
            </div>
            
            <BusinessLawTrends />
            
            {/* Additional Charts */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case Types Distribution */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-blue-500" />
                  Distribusi Kasus Hukum Bisnis 2023
                </h3>
                <div className="space-y-3">
                  {[
                    { type: "Sengketa Kontrak", percentage: 35, color: "from-blue-500 to-indigo-500" },
                    { type: "Kepailitan & PKPU", percentage: 20, color: "from-red-500 to-rose-500" },
                    { type: "Perselisihan Saham", percentage: 18, color: "from-purple-500 to-pink-500" },
                    { type: "Hak Kekayaan Intelektual", percentage: 15, color: "from-green-500 to-emerald-500" },
                    { type: "Persaingan Usaha", percentage: 12, color: "from-amber-500 to-orange-500" }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.type}</span>
                        <span className="text-gray-600">{item.percentage}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: idx * 0.1, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Regional Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" />
                  Distribusi Regional Bisnis
                </h3>
                <div className="space-y-3">
                  {[
                    { region: "DKI Jakarta", count: "487,230", growth: "+12%" },
                    { region: "Jawa Barat", count: "312,450", growth: "+18%" },
                    { region: "Jawa Timur", count: "298,100", growth: "+15%" },
                    { region: "Jawa Tengah", count: "187,300", growth: "+22%" },
                    { region: "Sumatera Utara", count: "156,800", growth: "+19%" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.region}</div>
                        <div className="text-sm text-gray-600">{item.count} usaha</div>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{item.growth}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Details View - Original Component */}
        {activeView === 'details' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl ring-1 ring-gray-200/70 overflow-hidden"
          >
            <KategoriBisnis />
          </motion.div>
        )}
      </main>

      {/* Floating Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-white/90 backdrop-blur-lg rounded-full shadow-xl px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setActiveView('overview')}
            className={`p-2 rounded-lg transition-all ${
              activeView === 'overview' ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActiveView('trends')}
            className={`p-2 rounded-lg transition-all ${
              activeView === 'trends' ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActiveView('details')}
            className={`p-2 rounded-lg transition-all ${
              activeView === 'details' ? 'bg-amber-100 text-amber-600' : 'hover:bg-gray-100'
            }`}
          >
            <ScrollText className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}