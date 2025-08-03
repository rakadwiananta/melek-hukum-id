'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Scale,
  Users,
  FileText,
  TrendingUp,
  Building2,
  BarChart3,
  Clock,
  HandCoins,
  Coins,
  Siren,
  ShieldCheck,
  FileWarning,
  UserCheck,
  FileSearch,
  Eye,
  Lock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Ban,
  UserX,
  BookOpen,
  Star,
  ChevronRight,
  ExternalLink,
  Download,
  Share2,
  Info,
  Hash,
  Globe,
  Zap
} from 'lucide-react'

interface KategoriAntiKorupsiProps {
  searchQuery?: string
}

// Data statistik berdasarkan KPK & BPS 2024
const antiCorruptionStats = {
  totalCases: {
    reported: 12456,
    processed: 11890,
    convicted: 10923,
    year: '2024'
  },
  caseTypes: [
    { name: 'Gratifikasi', cases: 3456, percentage: 28, trend: 'up' },
    { name: 'Suap', cases: 2987, percentage: 24, trend: 'up' },
    { name: 'Penggelapan', cases: 2345, percentage: 19, trend: 'down' },
    { name: 'Penyalahgunaan Wewenang', cases: 1987, percentage: 16, trend: 'stable' },
    { name: 'Kerugian Negara', cases: 1681, percentage: 13, trend: 'up' }
  ],
  convictionRate: {
    overall: 91.8,
    byType: {
      gratifikasi: 94.2,
      suap: 96.5,
      penggelapan: 89.3,
      penyalahgunaan: 92.1,
      kerugian: 88.7
    }
  },
  assetRecovery: {
    total: 2847,
    value: 156.7, // dalam triliun rupiah
    percentage: 78.3
  },
  prevention: {
    programs: 234,
    participants: 45678,
    effectiveness: 85.2
  }
}

// Batik Pattern untuk Anti Korupsi (Motif Kawung - melambangkan keadilan)
const BatikKawung = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none">
    <defs>
      <pattern id="kawung" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="30" cy="30" r="15" fill="currentColor" opacity="0.1" />
        <circle cx="0" cy="0" r="15" fill="currentColor" opacity="0.1" />
        <circle cx="60" cy="0" r="15" fill="currentColor" opacity="0.1" />
        <circle cx="0" cy="60" r="15" fill="currentColor" opacity="0.1" />
        <circle cx="60" cy="60" r="15" fill="currentColor" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#kawung)" />
  </svg>
)

// 3D Card Component
interface Card3DProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

const Card3D = ({ children, delay = 0, className = "" }: Card3DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -90, z: -100 }}
      animate={{ opacity: 1, rotateX: 0, z: 0 }}
      transition={{ delay, duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, z: 50 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={className}
    >
      <motion.div
        animate={isHovered ? { rotateY: 5, rotateX: -5 } : { rotateY: 0, rotateX: 0 }}
        className="relative h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Case Statistics Overview
const CaseStatisticsOverview = () => {
  const { reported, processed, convicted } = antiCorruptionStats.totalCases
  
  return (
    <Card3D delay={0.2} className="lg:col-span-2">
      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-lg p-6 h-full">
        <BatikKawung />
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BarChart3 className="h-6 w-6 mr-2 text-orange-700" />
            Statistik Kasus Anti Korupsi 2024
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
                <div className="bg-orange-100 rounded-lg p-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-600">
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
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
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
                <span className="text-2xl font-bold text-green-600">{antiCorruptionStats.convictionRate.overall}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${antiCorruptionStats.convictionRate.overall}%` }}
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

// Case Type Distribution
const CaseTypeDistribution = () => {
  return (
    <Card3D delay={0.3} className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Scale className="h-6 w-6 mr-2 text-orange-600" />
          Distribusi Jenis Kasus Korupsi
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {antiCorruptionStats.caseTypes.map((type, index) => (
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
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
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

// Asset Recovery Statistics
const AssetRecoveryStatistics = () => {
  const { total, value, percentage } = antiCorruptionStats.assetRecovery
  
  return (
    <Card3D delay={0.4}>
      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Coins className="h-5 w-5 mr-2 text-green-600" />
          Pengembalian Aset
        </h3>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {total.toLocaleString('id-ID')}
            </div>
            <div className="text-sm text-gray-600">Total Aset</div>
        </div>
        
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nilai Aset</span>
              <span className="text-lg font-bold text-blue-600">Rp {value} T</span>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tingkat Pengembalian</span>
              <span className="text-lg font-bold text-orange-600">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Prevention Programs
const PreventionPrograms = () => {
  const { programs, participants, effectiveness } = antiCorruptionStats.prevention
  
  return (
    <Card3D delay={0.5}>
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 h-full">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
          Program Pencegahan
        </h3>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {programs}
            </div>
            <div className="text-sm text-gray-600">Program Aktif</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Peserta</span>
              <span className="text-lg font-bold text-purple-600">
                {participants.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Efektivitas</span>
              <span className="text-lg font-bold text-green-600">{effectiveness}%</span>
          </div>
          </div>
        </div>
      </div>
    </Card3D>
  )
}

// Main Component
export default function KategoriAntiKorupsi({ searchQuery }: KategoriAntiKorupsiProps) {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])
  const [activeTab, setActiveTab] = useState('overview')
  const tabs = ['overview', 'categories', 'terms', 'statistics']

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
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
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-3 text-orange-700" />
              Kategori Anti Korupsi
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Data komprehensif pemberantasan korupsi Indonesia berdasarkan laporan 
              KPK, Kejaksaan Agung, dan instrumen internasional.
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
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Overview
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('categories')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'categories' 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Kategori
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('terms')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'terms' 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                Istilah Hukum
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('statistics')}
                className={`px-6 py-3 rounded-xl font-medium ${
                  activeTab === 'statistics' 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white' 
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
                    { icon: Shield, value: "312", label: "Istilah Anti Korupsi", color: "text-orange-600" },
                    { icon: Clock, value: "156 hari", label: "Rata-rata Proses", color: "text-green-600" },
                    { icon: Users, value: "2,847", label: "Aset Dikembalikan", color: "text-blue-600" },
                    { icon: Star, value: "91.8%", label: "Tingkat Vonis", color: "text-purple-600" }
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
                  <AssetRecoveryStatistics />
                  <PreventionPrograms />
                  <CaseTypeDistribution />
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategori Anti Korupsi</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Tindak Pidana Korupsi', count: 42, icon: Shield, color: 'text-orange-600' },
                      { name: 'Lembaga Anti Korupsi', count: 28, icon: Building2, color: 'text-blue-600' },
                      { name: 'Pencegahan Korupsi', count: 35, icon: ShieldCheck, color: 'text-green-600' },
                      { name: 'Penegakan Hukum', count: 31, icon: Scale, color: 'text-purple-600' },
                      { name: 'Transparansi & Akuntabilitas', count: 29, icon: Eye, color: 'text-indigo-600' },
                      { name: 'Pengawasan & Pengendalian', count: 26, icon: FileSearch, color: 'text-red-600' },
                      { name: 'Gratifikasi & Suap', count: 24, icon: HandCoins, color: 'text-yellow-600' },
                      { name: 'Kerugian Negara', count: 22, icon: Coins, color: 'text-pink-600' },
                      { name: 'Pengembalian Aset', count: 25, icon: FileWarning, color: 'text-cyan-600' },
                      { name: 'Whistleblowing', count: 23, icon: Siren, color: 'text-orange-600' },
                      { name: 'Integritas & Etika', count: 27, icon: UserCheck, color: 'text-emerald-600' }
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
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Database Istilah Anti Korupsi
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Akses 312 istilah anti korupsi terlengkap dengan definisi, 
                    contoh, dan dasar hukum yang jelas.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-medium"
                  >
                    Lihat Istilah Anti Korupsi
                  </motion.button>
                </div>
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
                  <AssetRecoveryStatistics />
                  <PreventionPrograms />
                  <CaseTypeDistribution />
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
              <Shield className="h-8 w-8 text-orange-600 mb-3" />
              <h4 className="font-semibold mb-2">UU Anti Korupsi</h4>
              <p className="text-sm text-gray-600 mb-3">
                Akses UU Tipikor dan peraturan anti korupsi terbaru.
              </p>
              <a href="/kamus-hukum/kategori/anti-korupsi/istilah" className="text-orange-600 text-sm font-medium hover:underline">
                Lihat Istilah →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <FileText className="h-8 w-8 text-blue-600 mb-3" />
              <h4 className="font-semibold mb-2">Laporan KPK</h4>
              <p className="text-sm text-gray-600 mb-3">
                Laporan tahunan dan statistik pemberantasan korupsi.
              </p>
              <a href="/artikel/laporan-kpk" className="text-blue-600 text-sm font-medium hover:underline">
                Baca Laporan →
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <AlertTriangle className="h-8 w-8 text-red-600 mb-3" />
              <h4 className="font-semibold mb-2">Melapor Korupsi</h4>
              <p className="text-sm text-gray-600 mb-3">
                Panduan lengkap cara melapor tindak pidana korupsi.
              </p>
              <a href="/anti-korupsi/cara-melapor" className="text-red-600 text-sm font-medium hover:underline">
                Pelajari Cara →
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
