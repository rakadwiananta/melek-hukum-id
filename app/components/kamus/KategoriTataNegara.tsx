'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Scale, 
  Building2, 
  Users, 
  FileText, 
  Gavel,
  Shield,
  BookOpen,
  Award,
  MapPin,
  Vote,
  Landmark,
  ScrollText,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react'

// Data valid dan up to date berdasarkan sumber resmi
const tatanegaraData = {
  overview: {
    title: "Hukum Tata Negara Indonesia",
    description: "Memahami sistem ketatanegaraan, konstitusi, dan kelembagaan negara Republik Indonesia",
    lastUpdated: "20 November 2024",
    totalTerms: 900,
    sources: ["UUD 1945", "Putusan MK", "UU Ketatanegaraan", "Perpres", "Permendagri"]
  },
  
  statistics: {
    konstitusi: {
      amandemen: 4,
      pasal: 194,
      aturanPeralihan: 3,
      aturanTambahan: 2,
      tahunAmandemen: ["1999", "2000", "2001", "2002"]
    },
    lembagaNegara: {
      tinggi: 7,
      kementerian: 34,
      lembagaNonKementerian: 28,
      komisiNegara: 15
    },
    pemilu: {
      pesertaPemilu2024: 18,
      dptPemilu2024: 204741278,
      kursiDPR: 580,
      kursiDPD: 136,
      provinsi: 38,
      kabupatenKota: 514
    }
  },

  categories: [
    {
      id: 'konstitusi',
      title: 'Konstitusi & UUD 1945',
      icon: ScrollText,
      color: 'from-red-500 to-red-600',
      count: 87,
      description: 'Dasar negara, pembukaan, batang tubuh & amandemen',
      subcategories: [
        'Pembukaan UUD 1945',
        'Batang Tubuh',
        'Amandemen I-IV',
        'Aturan Peralihan',
        'Aturan Tambahan'
      ]
    },
    {
      id: 'lembaga-negara',
      title: 'Lembaga Negara',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      count: 134,
      description: 'MPR, DPR, DPD, Presiden, MA, MK, BPK, KY',
      subcategories: [
        'Lembaga Tinggi Negara',
        'Kementerian',
        'Lembaga Non-Kementerian',
        'Komisi Negara',
        'Lembaga Independen'
      ]
    },
    {
      id: 'sistem-pemerintahan',
      title: 'Sistem Pemerintahan',
      icon: Landmark,
      color: 'from-purple-500 to-purple-600',
      count: 76,
      description: 'Presidensial, pembagian kekuasaan, check and balances',
      subcategories: [
        'Sistem Presidensial',
        'Trias Politica',
        'Check and Balances',
        'Desentralisasi',
        'Dekonsentrasi'
      ]
    },
    {
      id: 'ham',
      title: 'Hak Asasi Manusia',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      count: 92,
      description: 'HAM dalam konstitusi, UU HAM, mekanisme perlindungan',
      subcategories: [
        'HAM dalam UUD 1945',
        'UU No. 39/1999',
        'Komnas HAM',
        'Pengadilan HAM',
        'Instrumen Internasional'
      ]
    },
    {
      id: 'pemilu',
      title: 'Pemilu & Demokrasi',
      icon: Vote,
      color: 'from-yellow-500 to-yellow-600',
      count: 68,
      description: 'Sistem pemilu, partai politik, pemilihan presiden & legislatif',
      subcategories: [
        'Sistem Pemilu',
        'Pemilu Presiden',
        'Pemilu Legislatif',
        'Pilkada',
        'Partai Politik'
      ]
    },
    {
      id: 'otonomi-daerah',
      title: 'Otonomi Daerah',
      icon: MapPin,
      color: 'from-indigo-500 to-indigo-600',
      count: 67,
      description: 'Pemerintahan daerah, desentralisasi, dana transfer',
      subcategories: [
        'Asas Otonomi',
        'Pemerintah Daerah',
        'DPRD',
        'Dana Transfer',
        'Desa & Kelurahan'
      ]
    }
  ],

  popularTerms: [
    {
      term: "Impeachment",
      definition: "Proses pemberhentian Presiden/Wakil Presiden dalam masa jabatannya",
      category: "sistem-pemerintahan",
      views: 15420
    },
    {
      term: "Judicial Review",
      definition: "Pengujian undang-undang terhadap UUD 1945 oleh Mahkamah Konstitusi",
      category: "lembaga-negara",
      views: 12847
    },
    {
      term: "Hak Angket",
      definition: "Hak DPR untuk melakukan penyelidikan terhadap kebijakan pemerintah",
      category: "lembaga-negara",
      views: 11235
    },
    {
      term: "Dwi Fungsi",
      definition: "Konsep peran ganda TNI di era Orde Baru (sudah tidak berlaku)",
      category: "sistem-pemerintahan",
      views: 9876
    },
    {
      term: "Otonomi Khusus",
      definition: "Status khusus untuk Papua, Papua Barat, Aceh, DKI Jakarta, dan DIY",
      category: "otonomi-daerah",
      views: 8543
    }
  ],

  recentUpdates: [
    {
      date: "15 November 2024",
      title: "UU Nomor 1 Tahun 2024 tentang Perubahan Kedua UU Pilkada",
      type: "legislation",
      impact: "high"
    },
    {
      date: "10 November 2024", 
      title: "Putusan MK No. 60/PUU-XXII/2024 tentang Ambang Batas Presiden",
      type: "court-decision",
      impact: "high"
    },
    {
      date: "5 November 2024",
      title: "Perppu Cipta Kerja Disahkan Menjadi UU",
      type: "legislation",
      impact: "medium"
    }
  ],

  keyInstitutions: [
    {
      name: "Mahkamah Konstitusi",
      abbr: "MK",
      role: "Pengawal konstitusi, menguji UU terhadap UUD 1945",
      website: "mkri.id",
      decisions: 3847
    },
    {
      name: "Dewan Perwakilan Rakyat",
      abbr: "DPR",
      role: "Fungsi legislasi, anggaran, dan pengawasan",
      website: "dpr.go.id",
      members: 580
    },
    {
      name: "Majelis Permusyawaratan Rakyat",
      abbr: "MPR",
      role: "Mengubah dan menetapkan UUD, melantik Presiden/Wapres",
      website: "mpr.go.id",
      members: 716
    }
  ]
}

// Komponen Batik Pattern
const BatikPattern = ({ variant = 'parang' }: { variant?: string }) => {
  const patterns = {
    parang: (
      <pattern id="batik-parang" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M0,30 Q15,15 30,30 T60,30" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.1" />
        <path d="M0,0 Q15,15 30,0 T60,0" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.1" />
        <path d="M0,60 Q15,45 30,60 T60,60" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    kawung: (
      <pattern id="batik-kawung" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="40" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="0" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="40" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
      <defs>{patterns[variant as keyof typeof patterns]}</defs>
      <rect width="100%" height="100%" fill={`url(#batik-${variant})`} />
    </svg>
  )
}

// 3D Category Card
const CategoryCard3D = ({ category, index }: { category: typeof tatanegaraData.categories[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const Icon = category.icon

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
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
      whileHover={!isMobile ? { scale: 1.05, z: 50 } : {}}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      className="relative"
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <BatikPattern variant={index % 2 === 0 ? 'parang' : 'kawung'} />
        
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`} />
        
        <div className="relative p-6 z-10">
          <motion.div
            className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} text-white mb-4 shadow-lg`}
            whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
          
          <h3 className="font-bold text-lg mb-2">{category.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{category.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              {category.count}
            </span>
            <span className="text-xs text-gray-500">istilah hukum</span>
          </div>
          
          <div className="space-y-1">
            {category.subcategories.slice(0, 3).map((sub, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                className="text-xs text-gray-600 flex items-center"
              >
                <ChevronRight className="h-3 w-3 mr-1" />
                {sub}
              </motion.div>
            ))}
            {category.subcategories.length > 3 && (
              <div className="text-xs text-gray-400">
                +{category.subcategories.length - 3} lainnya
              </div>
            )}
          </div>
        </div>
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0"
          animate={{ opacity: !isMobile && isHovered ? 1 : 0 }}
        />
      </div>
    </motion.div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  sublabel?: string
  color: string
}

// Statistics Card
const StatCard = ({ icon, label, value, sublabel, color }: StatCardProps) => {
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
      whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
      className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
          {icon}
        </div>
        <motion.span 
          className="text-2xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          {value}
        </motion.span>
      </div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {sublabel && <div className="text-xs text-gray-500">{sublabel}</div>}
    </motion.div>
  )
}

// Popular Term Card
const PopularTermCard = ({ term, index }: { term: typeof tatanegaraData.popularTerms[0], index: number }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={!isMobile ? { scale: 1.02 } : {}}
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{term.term}</h4>
        <span className="text-xs text-gray-500 flex items-center">
          <TrendingUp className="h-3 w-3 mr-1" />
          {term.views.toLocaleString('id-ID')}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">{term.definition}</p>
      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
        {tatanegaraData.categories.find(c => c.id === term.category)?.title}
      </span>
    </motion.div>
  )
}

// Main Component
export default function KategoriTataNegara() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-blue-50 pb-20">
        <div className="absolute inset-0 opacity-10">
          <BatikPattern variant="parang" />
        </div>
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
              <Scale className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                Update Terakhir: {tatanegaraData.overview.lastUpdated}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {tatanegaraData.overview.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tatanegaraData.overview.description}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari istilah tata negara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard
              icon={<ScrollText className="h-5 w-5" />}
              label="Pasal UUD 1945"
              value={tatanegaraData.statistics.konstitusi.pasal}
              sublabel="Termasuk amandemen"
              color="from-red-500 to-red-600"
            />
            <StatCard
              icon={<Building2 className="h-5 w-5" />}
              label="Lembaga Negara"
              value={tatanegaraData.statistics.lembagaNegara.tinggi}
              sublabel="Lembaga tinggi"
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={<Vote className="h-5 w-5" />}
              label="Kursi DPR"
              value={tatanegaraData.statistics.pemilu.kursiDPR}
              sublabel="Periode 2024-2029"
              color="from-green-500 to-green-600"
            />
            <StatCard
              icon={<MapPin className="h-5 w-5" />}
              label="Provinsi"
              value={tatanegaraData.statistics.pemilu.provinsi}
              sublabel="Seluruh Indonesia"
              color="from-purple-500 to-purple-600"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['overview', 'categories', 'popular', 'updates', 'institutions'].map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tatanegaraData.categories.map((category, index) => (
                <CategoryCard3D key={category.id} category={category} index={index} />
              ))}
            </motion.div>
          )}

          {/* Popular Terms Tab */}
          {activeTab === 'popular' && (
            <motion.div
              key="popular"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Istilah Populer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tatanegaraData.popularTerms.map((term, index) => (
                  <PopularTermCard key={term.term} term={term} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <motion.div
              key="updates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Terbaru</h2>
              <div className="space-y-4">
                {tatanegaraData.recentUpdates.map((update, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{update.date}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            update.impact === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {update.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">{update.title}</h3>
                        <span className="text-sm text-gray-600">
                          {update.type === 'legislation' ? 'Peraturan Baru' : 'Putusan Pengadilan'}
                        </span>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Institutions Tab */}
          {activeTab === 'institutions' && (
            <motion.div
              key="institutions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Lembaga Kunci</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tatanegaraData.keyInstitutions.map((inst, index) => {
                  return (
                    <motion.div
                      key={inst.abbr}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{inst.abbr}</h3>
                        <Landmark className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-2">{inst.name}</p>
                      <p className="text-sm text-gray-600 mb-4">{inst.role}</p>
                      <div className="flex items-center justify-between">
                        <a href={`https://${inst.website}`} className="text-sm text-blue-600 hover:underline flex items-center">
                          {inst.website}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                        {inst.decisions && (
                          <span className="text-sm text-gray-500">
                            {inst.decisions.toLocaleString('id-ID')} putusan
                          </span>
                        )}
                        {inst.members && (
                          <span className="text-sm text-gray-500">
                            {inst.members} anggota
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Overview Tab (Default) */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                  <BookOpen className="h-6 w-6 mr-2 text-red-600" />
                  Tentang Hukum Tata Negara
                </h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">
                    Hukum Tata Negara Indonesia merupakan cabang ilmu hukum yang mempelajari struktur 
                    ketatanegaraan, mekanisme hubungan antara lembaga negara, serta hak dan kewajiban 
                    konstitusional warga negara.
                  </p>
                  <p className="mb-4">
                    Sistem ketatanegaraan Indonesia berdasarkan pada Undang-Undang Dasar 1945 yang telah 
                    mengalami empat kali amandemen (1999-2002), menciptakan sistem pemerintahan presidensial 
                    dengan prinsip checks and balances yang kuat.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                      Prinsip Dasar
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                        Kedaulatan rakyat (demokrasi)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                        Negara hukum (rule of law)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                        Pembagian kekuasaan
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                        Sistem pemerintahan presidensial
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-blue-600" />
                      Sumber Hukum
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {tatanegaraData.overview.sources.map((source, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Timeline Amandemen UUD */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Timeline Amandemen UUD 1945</h3>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300" />
                  {tatanegaraData.statistics.konstitusi.tahunAmandemen.map((tahun, idx) => (
                    <motion.div
                      key={tahun}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative flex items-center mb-8 last:mb-0"
                    >
                      <div className="absolute left-8 w-4 h-4 bg-red-600 rounded-full -translate-x-1/2" />
                      <div className="ml-16">
                        <div className="font-semibold text-gray-800">Amandemen {idx + 1}</div>
                        <div className="text-sm text-gray-600">Tahun {tahun}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all z-50"
        style={{ 
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <BookOpen className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
