'use client'

import React, { useState, useEffect, useRef } from 'react'
import { BusinessLawDictionary } from './IstilahBisnis'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import NusantaraCanvas from '@/app/components/nusantara/NusantaraCanvas'
import WayangModel from '@/app/components/nusantara/WayangModel'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Building, Scale, TrendingUp, Users, Award, Globe, BarChart3, 
  Shield, BookOpen, DollarSign, Activity, Sparkles
} from 'lucide-react'

// Komponen Batik Animasi 3D
const BatikPattern3D = () => {
  const meshRef = useRef<any>()
  
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.PI / 6
    }
  }, [])

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <planeGeometry args={[10, 10, 32, 32]} />
        <meshStandardMaterial
          color="#d97706"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// Komponen Wayang 3D Enhanced
const WayangScene = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#fbbf24" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <WayangModel scale={1.5} position={[0, -0.5, 0]} />
      </Float>
      
      <BatikPattern3D />
      <Environment preset="sunset" />
    </>
  )
}

// Komponen Statistik Hukum Bisnis Indonesia
const BusinessLawStatistics = () => {
  const stats = [
    {
      icon: Building,
      value: "1.4 Juta+",
      label: "PT Terdaftar di Indonesia",
      source: "Kemenkumham 2024",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Scale,
      value: "2,847",
      label: "Kasus Hukum Bisnis 2023",
      source: "Mahkamah Agung RI",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: Globe,
      value: "$48.3 Miliar",
      label: "Nilai Investasi Asing 2023",
      source: "BKPM",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      value: "65.7%",
      label: "UMKM dari Total Usaha",
      source: "Kemenkop UKM",
      color: "from-amber-500 to-orange-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)"
          }}
          className="relative group"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
               style={{
                 background: `linear-gradient(135deg, ${stat.color.split(' ')[1]} 0%, ${stat.color.split(' ')[3]} 100%)`
               }} />
          
          <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-full -mr-16 -mt-16"
                 style={{
                   background: `linear-gradient(135deg, ${stat.color.split(' ')[1]} 0%, ${stat.color.split(' ')[3]} 100%)`
                 }} />
            
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            
            <motion.div 
              className="text-3xl font-bold text-gray-900 mb-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            >
              {stat.value}
            </motion.div>
            
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <div className="text-xs text-gray-400 italic">{stat.source}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Komponen Ornamen Nusantara
const NusantaraOrnament = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute ${className}`} width="120" height="120" viewBox="0 0 120 120">
    <defs>
      <linearGradient id="ornamentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <g transform="translate(60,60)">
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle r="50" fill="none" stroke="url(#ornamentGradient)" strokeWidth="0.5" />
        <path d="M0,-50 Q25,-25 50,0 Q25,25 0,50 Q-25,25 -50,0 Q-25,-25 0,-50" 
              fill="none" stroke="url(#ornamentGradient)" strokeWidth="0.5" />
      </motion.g>
    </g>
  </svg>
)

export default function IstilahBisnisComponent() {
  const reduced = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8])
  
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('dictionary')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50 overflow-hidden">
      {/* Enhanced Pattern Background */}
      <motion.div style={{ y: parallaxY, opacity }}>
        <PatternBackground />
      </motion.div>

      {/* Floating Ornaments */}
      <NusantaraOrnament className="top-10 left-10 opacity-20" />
      <NusantaraOrnament className="bottom-10 right-10 opacity-20" />

      {/* Hero Section with 3D Canvas */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/30">
          <NusantaraCanvas height={320} reducedMotion={reduced} className="opacity-60" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="p-4 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl shadow-xl"
                >
                  <Scale className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </motion.div>
                
                <div>
                  <motion.h1 
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="bg-gradient-to-r from-amber-700 via-rose-700 to-red-700 bg-clip-text text-transparent">
                      Istilah Hukum Bisnis
                    </span>
                  </motion.h1>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg text-gray-700 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Kamus lengkap dengan visualisasi 3D Nusantara
                  </motion.p>
                </div>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {['295+ Istilah', 'Dasar Hukum', 'Contoh Kasus', 'Mobile Friendly'].map((feature, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-md border border-amber-200"
                  >
                    <Sparkles className="inline-block w-4 h-4 mr-1 text-amber-500" />
                    {feature}
                  </motion.span>
                ))}
              </div>

              {/* Quick Navigation Tabs */}
              <div className="flex gap-2 mb-6">
                {[
                  { id: 'dictionary', label: 'Kamus', icon: BookOpen },
                  { id: 'statistics', label: 'Statistik', icon: BarChart3 },
                  { id: 'trends', label: 'Tren', icon: TrendingUp }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg'
                        : 'bg-white/60 text-gray-700 hover:bg-white/80'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right: 3D Wayang Model */}
            {!reduced && isLoaded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative h-64 sm:h-80 lg:h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-rose-200/20 rounded-3xl" />
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-amber-200/60">
                  <Canvas>
                    <WayangScene />
                  </Canvas>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full blur-2xl opacity-30" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-rose-400 to-red-400 rounded-full blur-2xl opacity-30" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {activeTab === 'statistics' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Statistik Hukum Bisnis Indonesia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Data terkini dari berbagai sumber resmi pemerintah dan lembaga terkait
            </p>
          </div>
          
          <BusinessLawStatistics />
          
          {/* Additional Charts */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business Entity Types Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-500" />
                Jenis Badan Usaha di Indonesia
              </h3>
              <div className="space-y-3">
                {[
                  { type: 'PT (Perseroan Terbatas)', percentage: 45, count: '630,000+' },
                  { type: 'CV (Commanditaire Vennootschap)', percentage: 25, count: '350,000+' },
                  { type: 'Firma', percentage: 10, count: '140,000+' },
                  { type: 'Koperasi', percentage: 15, count: '210,000+' },
                  { type: 'Perorangan', percentage: 5, count: '70,000+' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{item.type}</span>
                        <span className="text-gray-500">{item.count}</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500 italic">
                Sumber: Kemenkumham & Kemenkop UKM, 2024
              </div>
            </motion.div>

            {/* Investment Trends Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Tren Investasi 5 Tahun Terakhir
              </h3>
              <div className="space-y-3">
                {[
                  { year: '2019', domestic: 386.5, foreign: 423.1 },
                  { year: '2020', domestic: 413.5, foreign: 412.8 },
                  { year: '2021', domestic: 453.4, foreign: 447.7 },
                  { year: '2022', domestic: 502.7, foreign: 481.3 },
                  { year: '2023', domestic: 548.2, foreign: 515.6 }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm font-medium w-12">{item.year}</span>
                    <div className="flex-1 flex gap-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.domestic / 10)}%` }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded flex items-center justify-end pr-2"
                      >
                        <span className="text-xs text-white font-medium">{item.domestic}T</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.foreign / 10)}%` }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        className="h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-end pr-2"
                      >
                        <span className="text-xs text-white font-medium">{item.foreign}T</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded" />
                  <span className="text-gray-600">PMDN (Triliun Rp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />
                  <span className="text-gray-600">PMA (Triliun Rp)</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 italic">
                Sumber: BKPM, 2024
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Trends Section */}
      {activeTab === 'trends' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Tren Hukum Bisnis 2024
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perkembangan terkini dalam regulasi dan praktik hukum bisnis Indonesia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "ESG Compliance",
                description: "Peningkatan 78% perusahaan menerapkan prinsip ESG",
                trend: "+45%",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Globe,
                title: "Digital Transformation",
                description: "89% UMKM mulai adopsi teknologi digital",
                trend: "+62%",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Award,
                title: "Sertifikasi Halal",
                description: "Wajib sertifikasi halal untuk produk tertentu",
                trend: "+125%",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: DollarSign,
                title: "Fintech Regulation",
                description: "Regulasi baru untuk P2P lending dan crypto",
                trend: "+93%",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Users,
                title: "UMKM Empowerment",
                description: "Program akselerasi untuk 500,000 UMKM",
                trend: "+156%",
                color: "from-red-500 to-rose-500"
              },
              {
                icon: Activity,
                title: "Carbon Trading",
                description: "Implementasi bursa karbon Indonesia",
                trend: "New",
                color: "from-teal-500 to-cyan-500"
              }
            ].map((trend, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl"
                     style={{
                       background: `linear-gradient(135deg, ${trend.color.split(' ')[1]} 0%, ${trend.color.split(' ')[3]} 100%)`
                     }} />
                
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${trend.color} mb-4`}>
                    <trend.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="text-sm font-bold text-green-600">{trend.trend}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{trend.title}</h3>
                  <p className="text-sm text-gray-600">{trend.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Main Dictionary Content */}
      {activeTab === 'dictionary' && (
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div 
            className="rounded-3xl bg-white/90 backdrop-blur-lg shadow-2xl ring-1 ring-gray-200/70 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <BusinessLawDictionary />
          </motion.div>
        </main>
      )}

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-rose-500 rounded-full shadow-lg flex items-center justify-center text-white"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Activity className="w-6 h-6 sm:w-7 sm:h-7" />
        </motion.button>
      </motion.div>
    </div>
  )
}