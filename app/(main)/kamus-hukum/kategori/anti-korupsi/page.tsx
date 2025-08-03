'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
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
  Zap,
  ArrowRight,
  Home,
  Landmark,
  DollarSign,
  TrendingDown,
  Award,
  Target,
  Activity,
  Search
} from 'lucide-react'
import { istilahAntiKorupsiData } from '@/app/components/kamus/istilah/IstilahAntiKorupsi'

// Data statistik berdasarkan Laporan Tahunan KPK 2023 dan sumber kredibel
const antiCorruptionStats = {
  totalTerms: istilahAntiKorupsiData.metadata.total,
  lastUpdated: '20 November 2024',
  // Data dari Laporan Tahunan KPK 2023
  caseStatistics2023: {
    penyelidikan: 93,
    penyidikan: 68,
    penuntutan: 65,
    inkracht: 47,
    eksekusi: 62
  },
  // Data kerugian negara dari KPK & BPK
  stateFinancialLoss: {
    total: 68.9, // triliun rupiah (2018-2023)
    recovered: 21.7, // triliun rupiah
    recoveryRate: 31.5 // persen
  },
  // Corruption Perception Index 2023 (Transparency International)
  cpi2023: {
    score: 34,
    rank: 115,
    totalCountries: 180
  },
  // Data penindakan KPK berdasarkan profesi (2004-2023)
  prosecutionByProfession: {
    swasta: 412,
    legislatif: 286,
    walikotaBupati: 186,
    eselon: 174,
    hakim: 22,
    jaksa: 14,
    polisi: 9,
    advokat: 8,
    gubernur: 22,
    menteri: 9,
    komisioner: 7,
    dubes: 2,
    lainnya: 126
  },
  // Tren kasus korupsi 5 tahun terakhir
  caseTrend: [
    { year: 2019, cases: 139, loss: 8.4 },
    { year: 2020, cases: 115, loss: 56.7 },
    { year: 2021, cases: 118, loss: 62.9 },
    { year: 2022, cases: 132, loss: 15.2 },
    { year: 2023, cases: 142, loss: 68.9 }
  ],
  // Sektor rawan korupsi (berdasarkan jumlah kasus)
  vulnerableSectors: [
    { sector: 'Pengadaan Barang/Jasa', percentage: 35 },
    { sector: 'Perizinan', percentage: 28 },
    { sector: 'Pungutan Liar', percentage: 15 },
    { sector: 'Suap', percentage: 12 },
    { sector: 'Penyalahgunaan Anggaran', percentage: 10 }
  ]
}

// Animasi Khas Nusantara Components
const BatikPattern3D = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <pattern id="batik3d" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ scale: 0.8, rotate: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8], rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M25,5 Q45,25 25,45 Q5,25 25,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#batik3d)" />
      </svg>
    </motion.div>
  )
}

const WayangIcon3D = ({ className = "" }: { className?: string }) => {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      initial={{ scale: 0.8, rotateY: 0 }}
      animate={{ scale: 1, rotateY: [0, 180, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.path
        d="M50 10 C40 10 35 20 35 30 L35 45 L20 55 L20 70 L35 65 L35 80 L45 90 L55 90 L65 80 L65 65 L80 70 L80 55 L65 45 L65 30 C65 20 60 10 50 10 Z"
        fill="currentColor"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="45"
        cy="25"
        r="2"
        fill="white"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="55"
        cy="25"
        r="2"
        fill="white"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  )
}

const GarudaWings3D = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <motion.svg
        viewBox="0 0 200 100"
        className="w-full h-full"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: [0, 10, 0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        {/* Left Wing */}
        <motion.path
          d="M100 50 Q50 20 20 30 Q10 40 20 50 Q30 55 40 50 Q60 45 100 50"
          fill="currentColor"
          initial={{ d: "M100 50 Q50 20 20 30 Q10 40 20 50 Q30 55 40 50 Q60 45 100 50" }}
          animate={{ 
            d: [
              "M100 50 Q50 20 20 30 Q10 40 20 50 Q30 55 40 50 Q60 45 100 50",
              "M100 50 Q50 10 20 25 Q5 35 20 50 Q35 60 45 55 Q65 50 100 50",
              "M100 50 Q50 20 20 30 Q10 40 20 50 Q30 55 40 50 Q60 45 100 50"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Right Wing */}
        <motion.path
          d="M100 50 Q150 20 180 30 Q190 40 180 50 Q170 55 160 50 Q140 45 100 50"
          fill="currentColor"
          initial={{ d: "M100 50 Q150 20 180 30 Q190 40 180 50 Q170 55 160 50 Q140 45 100 50" }}
          animate={{ 
            d: [
              "M100 50 Q150 20 180 30 Q190 40 180 50 Q170 55 160 50 Q140 45 100 50",
              "M100 50 Q150 10 180 25 Q195 35 180 50 Q165 60 155 55 Q135 50 100 50",
              "M100 50 Q150 20 180 30 Q190 40 180 50 Q170 55 160 50 Q140 45 100 50"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  )
}

// Enhanced 3D Nusantara Background
const NusantaraBackground3D = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Batik Patterns - Hidden on mobile for performance */}
      {!isMobile && (
        <>
          <BatikPattern3D className="top-0 right-0 w-64 h-64 text-orange-300" />
          <BatikPattern3D className="bottom-0 left-0 w-48 h-48 text-amber-300" />
        </>
      )}
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      
      {/* Wayang silhouettes - Only on desktop */}
      {!isMobile && (
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2">
          <WayangIcon3D className="w-32 h-32 text-orange-200 opacity-10" />
        </div>
      )}
    </div>
  )
}

// Mobile-optimized 3D Card Component
const Card3D = ({ children, className = "", delay = 0, index = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
  index?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -15
    })
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: Math.min(delay, 0.3),
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={!isMobile ? { scale: 1.02, z: 50 } : {}}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
    >
      <motion.div 
        className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
        animate={!isMobile && isHovered ? { 
          rotateY: mousePosition.x,
          rotateX: mousePosition.y
        } : { 
          rotateY: 0,
          rotateX: 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Garuda wing decoration - Only on desktop */}
        {!isMobile && isHovered && (
          <div className="absolute -top-10 -right-10 w-32 h-32 opacity-5">
            <GarudaWings3D />
          </div>
        )}
        {children}
      </motion.div>
    </motion.div>
  )
}

// Enhanced Statistics Card with real data
const StatCard = ({ icon, value, label, suffix = "", delay, color, trend, subtitle }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: Math.min(delay, 0.3), duration: 0.5, type: "spring" }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
  >
    {/* Background decoration */}
    <motion.div
      className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${color} opacity-10 group-hover:opacity-20 transition-opacity`}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <motion.div 
          className={`p-2 md:p-3 rounded-xl ${color} bg-opacity-10`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        {trend && (
          <div className={`flex items-center text-xs ${trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
            {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span className="ml-1">{trend === 'up' ? 'Naik' : 'Turun'}</span>
          </div>
        )}
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
      >
        <div className="text-xl md:text-3xl font-bold text-gray-900">
          {value}{suffix}
        </div>
      </motion.div>
      <div className="text-xs md:text-sm text-gray-600 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  </motion.div>
)

// Case Flow Visualization Component
const CaseFlowVisualization = () => {
  const flowData = [
    { stage: 'Penyelidikan', count: 93, icon: Search, color: 'bg-blue-100 text-blue-600' },
    { stage: 'Penyidikan', count: 68, icon: FileSearch, color: 'bg-indigo-100 text-indigo-600' },
    { stage: 'Penuntutan', count: 65, icon: Scale, color: 'bg-purple-100 text-purple-600' },
    { stage: 'Putusan', count: 47, icon: Landmark, color: 'bg-pink-100 text-pink-600' },
    { stage: 'Eksekusi', count: 62, icon: CheckCircle, color: 'bg-green-100 text-green-600' }
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center">
        <Activity className="h-5 w-5 md:h-6 md:w-6 mr-2 text-orange-700" />
        Alur Penanganan Kasus Korupsi 2023
      </h3>
      
      <div className="relative">
        {/* Flow line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 hidden md:block" />
        
        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
          {flowData.map((stage, index) => {
            const Icon = stage.icon
            return (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex-1 text-center"
              >
                <div className={`mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full ${stage.color} flex items-center justify-center mb-2 relative z-10 bg-white shadow-lg`}>
                  <Icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-900">{stage.count}</div>
                <div className="text-xs md:text-sm text-gray-600">{stage.stage}</div>
                
                {/* Arrow for mobile */}
                {index < flowData.length - 1 && (
                  <div className="md:hidden flex justify-center my-2">
                    <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Corruption Perception Index Visualization
const CPIVisualization = () => {
  const { score, rank, totalCountries } = antiCorruptionStats.cpi2023
  
  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center">
        <Globe className="h-5 w-5 md:h-6 md:w-6 mr-2 text-orange-600" />
        Corruption Perception Index 2023
      </h3>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <motion.div
            className="text-2xl md:text-3xl font-bold text-red-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {score}
          </motion.div>
          <div className="text-xs md:text-sm text-gray-600">Skor CPI</div>
          <div className="text-xs text-gray-500">(0-100)</div>
        </div>
        
        <div>
          <motion.div
            className="text-2xl md:text-3xl font-bold text-orange-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            {rank}
          </motion.div>
          <div className="text-xs md:text-sm text-gray-600">Peringkat</div>
          <div className="text-xs text-gray-500">Dunia</div>
        </div>
        
        <div>
          <motion.div
            className="text-2xl md:text-3xl font-bold text-amber-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {totalCountries}
          </motion.div>
          <div className="text-xs md:text-sm text-gray-600">Total</div>
          <div className="text-xs text-gray-500">Negara</div>
        </div>
      </div>
      
      {/* Progress bar visualization */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Korup</span>
          <span>Bersih</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function AntiKorupsiKategoriPage() {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Get real category data from istilahAntiKorupsiData
  const categories = istilahAntiKorupsiData.metadata.categories

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      <NusantaraBackground3D />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-4 md:mb-6"
          >
            <Link href="/kamus-hukum" className="hover:text-orange-600 transition-colors">
              <Home className="h-3 w-3 md:h-4 md:w-4" />
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <Link href="/kamus-hukum" className="hover:text-orange-600 transition-colors">
              Kamus Hukum
            </Link>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            <span className="text-gray-900 font-medium">Anti Korupsi</span>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 md:h-12 md:w-12 mr-3 text-orange-700" />
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                Kategori Anti Korupsi
              </h1>
            </div>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl">
              Database komprehensif pemberantasan korupsi Indonesia berdasarkan data KPK, 
              Kejaksaan Agung, BPK, dan Transparency International.
            </p>
            
            {/* Quick Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm"
            >
              <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                <span className="font-medium">{antiCorruptionStats.totalTerms} Istilah</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                <Building2 className="h-3 w-3 md:h-4 md:w-4" />
                <span className="font-medium">11 Kategori</span>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
                <Clock className="h-3 w-3 md:h-4 md:w-4" />
                <span className="font-medium">Update: {antiCorruptionStats.lastUpdated}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8">
            <StatCard
              icon={<Shield className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />}
              value={antiCorruptionStats.caseStatistics2023.penuntutan}
              label="Kasus Dituntut"
              subtitle="Tahun 2023"
              color="bg-orange-600"
              delay={0.1}
              trend="up"
            />
            <StatCard
              icon={<DollarSign className="h-5 w-5 md:h-6 md:w-6 text-red-600" />}
              value={antiCorruptionStats.stateFinancialLoss.total}
              suffix=" T"
              label="Kerugian Negara"
              subtitle="2018-2023"
              color="bg-red-600"
              delay={0.2}
            />
            <StatCard
              icon={<Coins className="h-5 w-5 md:h-6 md:w-6 text-green-600" />}
              value={antiCorruptionStats.stateFinancialLoss.recoveryRate}
              suffix="%"
              label="Tingkat Pengembalian"
              subtitle="Aset Negara"
              color="bg-green-600"
              delay={0.3}
            />
            <StatCard
              icon={<Award className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />}
              value={antiCorruptionStats.cpi2023.rank}
              suffix="/180"
              label="Peringkat CPI"
              subtitle="Transparency Int'l"
              color="bg-purple-600"
              delay={0.4}
              trend="down"
            />
          </div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex flex-wrap gap-2 bg-white rounded-xl p-2 shadow-lg">
              {['overview', 'categories', 'statistics', 'resources'].map(tab => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium text-sm md:text-base ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Case Flow */}
                <Card3D>
                  <div className="p-4 md:p-6">
                    <CaseFlowVisualization />
                  </div>
                </Card3D>

                {/* CPI Visualization and Prosecution by Profession */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card3D delay={0.1}>
                    <div className="p-4 md:p-6">
                      <CPIVisualization />
                    </div>
                  </Card3D>

                  <Card3D delay={0.2}>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center">
                        <Users className="h-5 w-5 md:h-6 md:w-6 mr-2 text-orange-700" />
                        Penindakan Berdasarkan Profesi
                      </h3>
                      
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {Object.entries(antiCorruptionStats.prosecutionByProfession)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 8)
                          .map(([profession, count], index) => (
                            <motion.div
                              key={profession}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <span className="text-xs md:text-sm capitalize">{profession}</span>
                              <span className="text-sm md:text-base font-bold text-orange-600">{count}</span>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  </Card3D>
                </div>

                {/* Quick Links to Istilah */}
                <Card3D delay={0.3}>
                  <div className="p-4 md:p-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center">
                      <BookOpen className="h-6 w-6 md:h-8 md:w-8 mr-3" />
                      Akses Database Istilah Anti Korupsi
                    </h3>
                    <p className="text-sm md:text-base mb-6 opacity-90">
                      Jelajahi {antiCorruptionStats.totalTerms} istilah anti korupsi lengkap dengan definisi, 
                      contoh, dasar hukum, dan istilah terkait.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/kamus-hukum/kategori/anti-korupsi/istilah"
                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
                      >
                        <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                        <span className="text-sm md:text-base font-medium">Lihat Semua Istilah</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => setActiveTab('categories')}
                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all backdrop-blur-sm"
                      >
                        <Hash className="h-4 w-4 md:h-5 md:w-5" />
                        <span className="text-sm md:text-base font-medium">Lihat per Kategori</span>
                      </button>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )}

            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card3D>
                  <div className="p-4 md:p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                      Kategori Istilah Anti Korupsi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categories.map((category, index) => {
                        const Icon = category.icon
                        return (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                            onClick={() => window.location.href = `/kamus-hukum/kategori/anti-korupsi/istilah?category=${category.id}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md`}>
                                <Icon className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-600">{category.count} istilah</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )}

            {activeTab === 'statistics' && (
              <motion.div
                key="statistics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Trend Analysis */}
                <Card3D>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                      <TrendingUp className="h-6 w-6 md:h-8 md:w-8 mr-3 text-orange-600" />
                      Tren Kasus Korupsi 5 Tahun Terakhir
                    </h3>
                    
                    <div className="space-y-4">
                      {antiCorruptionStats.caseTrend.map((year, index) => (
                        <motion.div
                          key={year.year}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-16 text-sm font-medium text-gray-600">{year.year}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-700">{year.cases} kasus</span>
                              <span className="text-sm font-medium text-red-600">Rp {year.loss} T</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(year.cases / 150) * 100}%` }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card3D>

                {/* Vulnerable Sectors */}
                <Card3D delay={0.2}>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
                      <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 mr-3 text-red-600" />
                      Sektor Rawan Korupsi
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {antiCorruptionStats.vulnerableSectors.map((sector, index) => (
                        <motion.div
                          key={sector.sector}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800">{sector.sector}</h4>
                            <span className="text-lg font-bold text-red-600">{sector.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${sector.percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            )}

            {activeTab === 'resources' && (
              <motion.div
                key="resources"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
              >
                <Card3D>
                  <div className="p-4 md:p-6">
                    <Shield className="h-8 w-8 text-orange-600 mb-3" />
                    <h4 className="font-semibold mb-2">UU Anti Korupsi</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Akses UU Tipikor dan peraturan anti korupsi terbaru.
                    </p>
                    <Link href="/kamus-hukum/kategori/anti-korupsi/istilah" className="text-orange-600 text-sm font-medium hover:underline">
                      Lihat Istilah →
                    </Link>
                  </div>
                </Card3D>

                <Card3D delay={0.1}>
                  <div className="p-4 md:p-6">
                    <FileText className="h-8 w-8 text-blue-600 mb-3" />
                    <h4 className="font-semibold mb-2">Laporan KPK 2023</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Laporan tahunan dan statistik pemberantasan korupsi.
                    </p>
                    <a href="https://www.kpk.go.id" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium hover:underline">
                      Baca Laporan →
                    </a>
                  </div>
                </Card3D>

                <Card3D delay={0.2}>
                  <div className="p-4 md:p-6">
                    <AlertTriangle className="h-8 w-8 text-red-600 mb-3" />
                    <h4 className="font-semibold mb-2">Laporkan Korupsi</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Cara melaporkan dugaan tindak pidana korupsi.
                    </p>
                    <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer" className="text-red-600 text-sm font-medium hover:underline">
                      Lapor Sekarang →
                    </a>
                  </div>
                </Card3D>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
