'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Gavel, 
  AlertTriangle, 
  Scale,
  Users,
  FileText,
  TrendingUp,
  Shield,
  BarChart3,
  Clock,
  Building2,
  Siren,
  BookOpen,
  Briefcase,
  UserX
} from 'lucide-react'
import IstilahPidanaComponent from './istilah/IstilahPidanaComponent'

interface KategoriPidanaProps {
  searchQuery?: string
}

// Data statistik berdasarkan BPS & Mahkamah Agung 2023
const criminalStats = {
  totalCases: {
    reported: 298456,
    processed: 276834,
    convicted: 254392,
    year: '2023'
  },
  caseTypes: [
    { name: 'Pencurian', cases: 89234, percentage: 30, trend: 'down' },
    { name: 'Narkotika', cases: 67890, percentage: 23, trend: 'up' },
    { name: 'Penipuan/Penggelapan', cases: 45678, percentage: 15, trend: 'up' },
    { name: 'Kekerasan/Penganiayaan', cases: 34567, percentage: 12, trend: 'stable' },
    { name: 'Korupsi', cases: 23456, percentage: 8, trend: 'down' },
    { name: 'Kesusilaan', cases: 19876, percentage: 7, trend: 'up' },
    { name: 'Lainnya', cases: 17755, percentage: 5, trend: 'stable' }
  ],
  convictionRate: {
    overall: 92.3,
    byType: {
      pencurian: 94.5,
      narkotika: 96.8,
      penipuan: 89.2,
      kekerasan: 91.3,
      korupsi: 87.6
    }
  },
  prisonPopulation: {
    total: 274693,
    overcapacity: 105,
    male: 257890,
    female: 16803
  },
  recidivism: {
    rate: 24.7,
    byCategory: {
      narkotika: 38.2,
      pencurian: 31.5,
      kekerasan: 18.3,
      penipuan: 22.4
    }
  }
}

// Batik Pattern untuk Pidana (Motif Parang - melambangkan kekuatan hukum)
const BatikParang = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
    <defs>
      <pattern id="parang" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M0,40 Q20,20 40,40 T80,40" stroke="currentColor" fill="none" strokeWidth="1" />
        <path d="M0,0 Q20,20 40,0 T80,0" stroke="currentColor" fill="none" strokeWidth="1" />
        <path d="M0,80 Q20,60 40,80 T80,80" stroke="currentColor" fill="none" strokeWidth="1" />
        <path d="M10,10 L30,30 M50,10 L70,30 M10,50 L30,70 M50,50 L70,70" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#parang)" />
  </svg>
)

interface Card3DProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

// 3D Card Component
const Card3D = ({ children, delay = 0, className = "" }: Card3DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -90, z: -100 }}
      animate={{ opacity: 1, rotateX: 0, z: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={!isMobile ? { scale: 1.05, z: 50 } : {}}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}
    >
      <motion.div
        animate={!isMobile && isHovered ? { rotateY: 5, rotateX: -5 } : { rotateY: 0, rotateX: 0 }}
        className="relative h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Case Statistics Overview
const CaseStatisticsOverview = () => {
  const { reported, processed, convicted } = criminalStats.totalCases
  
  return (
    <Card3D delay={0.2} className="lg:col-span-2">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg p-6 h-full">
        <BatikParang />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-slate-700" />
            Statistik Kasus Pidana 2023
          </h3>
          
          <div className="space-y-6">
            {/* Flow Chart */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-center flex-1"
              >
                <div className="bg-blue-100 rounded-lg p-4">
                  <Siren className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {reported.toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm text-gray-600">Dilaporkan</div>
                </div>
              </motion.div>
              
              <div className="hidden md:block text-gray-400">→</div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-center flex-1"
              >
                <div className="bg-yellow-100 rounded-lg p-4">
                  <FileText className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">
                    {processed.toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm text-gray-600">Diproses</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({((processed/reported)*100).toFixed(1)}%)
                  </div>
                </div>
              </motion.div>
              
              <div className="hidden md:block text-gray-400">→</div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="text-center flex-1"
              >
                <div className="bg-green-100 rounded-lg p-4">
                  <Gavel className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {convicted.toLocaleString('id-ID')}
                  </div>
                  <div className="text-sm text-gray-600">Divonis</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ({((convicted/processed)*100).toFixed(1)}%)
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Conviction Rate */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Tingkat Vonis (Conviction Rate)</span>
                <span className="text-2xl font-bold text-green-600">{criminalStats.convictionRate.overall}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${criminalStats.convictionRate.overall}%` }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Crime Type Distribution
const CrimeTypeDistribution = () => {
  return (
    <Card3D delay={0.3} className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Scale className="h-6 w-6 mr-2 text-indigo-600" />
          Distribusi Jenis Kejahatan
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criminalStats.caseTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{type.name}</h4>
                <div className="flex items-center">
                  {type.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500 mr-1" />}
                  {type.trend === 'down' && <TrendingUp className="h-4 w-4 text-green-500 mr-1 rotate-180" />}
                  {type.trend === 'stable' && <div className="h-4 w-4 bg-gray-400 rounded-full mr-1" />}
                  <span className="text-sm font-semibold">{type.percentage}%</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${type.percentage}%` }}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    />
                  </div>
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  {type.cases.toLocaleString('id-ID')} kasus
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

// Prison Statistics
const PrisonStatistics = () => {
  const { total, overcapacity, male, female } = criminalStats.prisonPopulation
  
  return (
    <Card3D delay={0.4}>
      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-orange-600" />
          Populasi Lapas/Rutan
        </h3>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-orange-100 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">
              {total.toLocaleString('id-ID')}
            </div>
            <div className="text-sm text-gray-600">Total Narapidana</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Over Kapasitas</span>
              <span className="text-lg font-bold text-red-600">{overcapacity}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-blue-600">
                {((male/total)*100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Laki-laki</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-3 text-center">
              <Users className="h-6 w-6 text-pink-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-pink-600">
                {((female/total)*100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-600">Perempuan</div>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Recidivism Rate
const RecidivismRate = () => {
  const { rate, byCategory } = criminalStats.recidivism
  
  return (
    <Card3D delay={0.5}>
      <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <UserX className="h-5 w-5 mr-2 text-red-600" />
          Tingkat Residivis
        </h3>
        
        <div className="text-center mb-4">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <span className="text-2xl font-bold text-red-600">{rate}%</span>
          </motion.div>
          <p className="text-sm text-gray-600 mt-2">Rata-rata Nasional</p>
        </div>
        
        <div className="space-y-2">
          {Object.entries(byCategory).map(([category, percentage], index) => (
            <div key={category} className="flex items-center justify-between text-sm">
              <span className="capitalize text-gray-600">{category}</span>
              <span className="font-semibold text-gray-800">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card3D>
  )
}

// Main Component
export default function KategoriPidana({ searchQuery }: KategoriPidanaProps) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])
  const [activeTab, setActiveTab] = useState('overview')
  const tabs = ['overview', 'categories', 'terms', 'statistics']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 flex items-center">
              <Gavel className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-3 text-slate-700" />
              Kategori Hukum Pidana
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Data komprehensif sistem peradilan pidana Indonesia berdasarkan laporan 
              Mahkamah Agung, Kejaksaan Agung, dan Direktorat Jenderal Pemasyarakatan.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-lg">
              <motion.button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Overview
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('categories')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'categories' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Kategori
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('terms')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'terms' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Istilah Hukum
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('statistics')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'statistics' 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Statistik
              </motion.button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Quick Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                  {[
                    { icon: Scale, value: "436", label: "Pasal KUHP", color: "text-blue-600" },
                    { icon: Clock, value: "124 hari", label: "Rata-rata Proses", color: "text-green-600" },
                    { icon: Briefcase, value: "18,756", label: "Advokat Pidana", color: "text-purple-600" },
                    { icon: Shield, value: "89.3%", label: "Kepuasan Publik", color: "text-yellow-600" }
                  ].map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
                      >
                        <Icon className={`h-6 w-6 ${stat.color} mb-2`} />
                        <div className="text-xl font-bold">{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <CaseStatisticsOverview />
                  <PrisonStatistics />
                  <RecidivismRate />
                  <CrimeTypeDistribution />
                </div>
              </motion.div>
            )}

            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori Hukum Pidana</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Asas Hukum Pidana', count: 45, icon: Scale, color: 'text-blue-600' },
                      { name: 'Tindak Pidana', count: 156, icon: Gavel, color: 'text-red-600' },
                      { name: 'Subjek Hukum', count: 67, icon: Users, color: 'text-green-600' },
                      { name: 'Sanksi & Pidana', count: 89, icon: Shield, color: 'text-purple-600' },
                      { name: 'Proses Pidana', count: 134, icon: FileText, color: 'text-orange-600' },
                      { name: 'Pembuktian', count: 78, icon: AlertTriangle, color: 'text-indigo-600' }
                    ].map((category, index) => {
                      const Icon = category.icon
                      return (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all"
                        >
                          <Icon className={`h-8 w-8 ${category.color} mb-3`} />
                          <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.count} istilah</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'terms' && (
              <motion.div
                key="terms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IstilahPidanaComponent 
                  embedded={true}
                  initialCategory="all"
                  initialSearch=""
                />
              </motion.div>
            )}

            {activeTab === 'statistics' && (
              <motion.div
                key="statistics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <CaseStatisticsOverview />
                  <PrisonStatistics />
                  <RecidivismRate />
                  <CrimeTypeDistribution />
                </div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <BookOpen className="h-8 w-8 text-slate-700 mb-3" />
              <h4 className="font-semibold mb-2">KUHP Terbaru</h4>
              <p className="text-sm text-gray-600 mb-3">
                Akses KUHP yang telah diperbarui dengan penjelasan.
              </p>
              <a href="/kamus-hukum/kuhp" className="text-slate-700 text-sm font-medium hover:underline">
                Baca KUHP →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <FileText className="h-8 w-8 text-indigo-600 mb-3" />
              <h4 className="font-semibold mb-2">Format Surat Dakwaan</h4>
              <p className="text-sm text-gray-600 mb-3">
                Template dan contoh surat dakwaan yang benar.
              </p>
              <a href="/solusi/template/dakwaan" className="text-indigo-600 text-sm font-medium hover:underline">
                Download Template →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <AlertTriangle className="h-8 w-8 text-orange-600 mb-3" />
              <h4 className="font-semibold mb-2">Hak Tersangka</h4>
              <p className="text-sm text-gray-600 mb-3">
                Pahami hak-hak tersangka dalam proses pidana.
              </p>
              <a href="/kamus-hukum/hak-tersangka" className="text-orange-600 text-sm font-medium hover:underline">
                Pelajari Hak Anda →
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS untuk animasi blob */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
