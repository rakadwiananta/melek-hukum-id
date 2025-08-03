'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Scale, 
  Users,
  FileText,
  Phone,
  Heart,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Lock,
  Eye,
  Mic,
  UserCheck,
  Home,
  Languages,
  Briefcase,
  HandshakeIcon,
  Ban,
  HelpCircle,
  BookOpen,
  Download,
  Share2,
  ChevronRight,
  Zap
} from 'lucide-react'

// Data Hak Tersangka berdasarkan KUHAP dan peraturan terkait
const hakTersangkaData = {
  overview: {
    title: "Hak-Hak Tersangka dalam Hukum Indonesia",
    description: "Perlindungan hukum dan hak asasi yang dijamin untuk setiap tersangka",
    lastUpdated: "November 2024",
    totalRights: 23,
    sources: [
      "UU No. 8 Tahun 1981 (KUHAP)",
      "UU No. 39 Tahun 1999 (HAM)",
      "UU No. 16 Tahun 2011 (Bantuan Hukum)",
      "Peraturan Kapolri No. 14 Tahun 2012"
    ]
  },

  categories: [
    {
      id: 'fundamental',
      title: 'Hak Fundamental',
      icon: Shield,
      color: 'from-blue-600 to-cyan-600',
      rights: [
        {
          title: 'Praduga Tidak Bersalah',
          description: 'Setiap tersangka dianggap tidak bersalah sampai ada putusan pengadilan berkekuatan hukum tetap',
          legal: 'Pasal 8 UU No. 48/2009',
          icon: Scale,
          critical: true
        },
        {
          title: 'Bebas dari Penyiksaan',
          description: 'Tersangka berhak bebas dari penyiksaan, perlakuan atau hukuman yang kejam, tidak manusiawi atau merendahkan',
          legal: 'Pasal 33 UU No. 39/1999',
          icon: Ban,
          critical: true
        },
        {
          title: 'Diperlakukan Manusiawi',
          description: 'Hak untuk diperlakukan secara manusiawi dengan menghormati martabat yang melekat pada diri manusia',
          legal: 'Pasal 52 KUHAP',
          icon: Heart,
          critical: true
        }
      ]
    },
    {
      id: 'legal',
      title: 'Hak Hukum',
      icon: Briefcase,
      color: 'from-purple-600 to-pink-600',
      rights: [
        {
          title: 'Mendapat Bantuan Hukum',
          description: 'Hak mendapat bantuan hukum sejak saat ditangkap/ditahan pada semua tingkat pemeriksaan',
          legal: 'Pasal 54 KUHAP',
          icon: UserCheck,
          critical: true
        },
        {
          title: 'Memilih Penasihat Hukum',
          description: 'Tersangka berhak memilih sendiri penasihat hukumnya',
          legal: 'Pasal 55 KUHAP',
          icon: Users,
          critical: false
        },
        {
          title: 'Bantuan Hukum Gratis',
          description: 'Untuk tindak pidana ancaman 5 tahun atau lebih, bagi yang tidak mampu',
          legal: 'Pasal 56 KUHAP',
          icon: HandshakeIcon,
          critical: true
        }
      ]
    },
    {
      id: 'communication',
      title: 'Hak Komunikasi',
      icon: Phone,
      color: 'from-green-600 to-emerald-600',
      rights: [
        {
          title: 'Hubungi Keluarga',
          description: 'Memberitahu keluarga atau orang lain tentang penangkapan/penahanan',
          legal: 'Pasal 57 KUHAP',
          icon: Home,
          critical: true
        },
        {
          title: 'Hubungi Penasihat Hukum',
          description: 'Berkomunikasi dengan penasihat hukum tanpa diawasi',
          legal: 'Pasal 70 KUHAP',
          icon: Phone,
          critical: true
        },
        {
          title: 'Menerima Kunjungan',
          description: 'Kunjungan keluarga, rohaniawan, dokter untuk kepentingan kesehatan',
          legal: 'Pasal 60-61 KUHAP',
          icon: Users,
          critical: false
        }
      ]
    },
    {
      id: 'procedural',
      title: 'Hak Prosedural',
      icon: FileText,
      color: 'from-orange-600 to-red-600',
      rights: [
        {
          title: 'Diberitahu Tuduhan',
          description: 'Segera diberitahu dengan jelas dalam bahasa yang dimengerti tentang apa yang disangkakan',
          legal: 'Pasal 51 KUHAP',
          icon: Info,
          critical: true
        },
        {
          title: 'Pemeriksaan Segera',
          description: 'Hak untuk segera diperiksa, diajukan ke kejaksaan dan pengadilan',
          legal: 'Pasal 50 KUHAP',
          icon: Clock,
          critical: true
        },
        {
          title: 'Penerjemah',
          description: 'Mendapat penerjemah jika tidak mengerti bahasa Indonesia',
          legal: 'Pasal 53 KUHAP',
          icon: Languages,
          critical: false
        }
      ]
    },
    {
      id: 'defense',
      title: 'Hak Pembelaan',
      icon: Shield,
      color: 'from-indigo-600 to-blue-600',
      rights: [
        {
          title: 'Memberikan Keterangan',
          description: 'Bebas memberikan keterangan atau tidak memberikan keterangan (hak untuk diam)',
          legal: 'Pasal 52 KUHAP',
          icon: Mic,
          critical: true
        },
        {
          title: 'Mengajukan Saksi',
          description: 'Mengajukan saksi dan ahli yang menguntungkan (a de charge)',
          legal: 'Pasal 65 KUHAP',
          icon: UserCheck,
          critical: false
        },
        {
          title: 'Praperadilan',
          description: 'Mengajukan praperadilan atas sah tidaknya penangkapan/penahanan',
          legal: 'Pasal 77 KUHAP',
          icon: Scale,
          critical: true
        }
      ]
    }
  ],

  violations: [
    {
      violation: 'Penyiksaan/Kekerasan',
      consequence: 'Pidana penjara max 4 tahun (Pasal 422 KUHP)',
      report: 'Lapor ke Propam, Komnas HAM, atau Ombudsman'
    },
    {
      violation: 'Penangkapan Tanpa Surat',
      consequence: 'Praperadilan, ganti rugi, rehabilitasi',
      report: 'Ajukan praperadilan dalam 7 hari'
    },
    {
      violation: 'Tidak Diberi Penasihat Hukum',
      consequence: 'BAP tidak sah, dapat dibatalkan',
      report: 'Keberatan pada persidangan'
    },
    {
      violation: 'Penahanan Melebihi Batas',
      consequence: 'Harus dikeluarkan demi hukum',
      report: 'Praperadilan atau habeas corpus'
    }
  ],

  timeline: {
    arrest: {
      title: 'Saat Penangkapan',
      maxDuration: '1 x 24 jam',
      rights: [
        'Diberitahu alasan penangkapan',
        'Ditunjukkan surat tugas',
        'Diberi surat penangkapan',
        'Hubungi keluarga/penasihat hukum'
      ]
    },
    investigation: {
      title: 'Penyidikan',
      maxDuration: '20 + 40 hari',
      rights: [
        'Didampingi penasihat hukum',
        'Tidak dipaksa mengaku',
        'Dapat mengajukan saksi meringankan',
        'Menerima salinan BAP'
      ]
    },
    prosecution: {
      title: 'Penuntutan',
      maxDuration: '20 + 30 hari',
      rights: [
        'Menerima salinan surat dakwaan',
        'Mengajukan eksepsi',
        'Didampingi penasihat hukum',
        'Mengajukan pledoi'
      ]
    },
    trial: {
      title: 'Persidangan',
      maxDuration: '30 + 60 hari',
      rights: [
        'Sidang terbuka untuk umum',
        'Asas praduga tidak bersalah',
        'Mengajukan saksi dan bukti',
        'Banding/kasasi/PK'
      ]
    }
  }
}

// Pattern Background Component
const PatternBackground = ({ variant = 'dots' }: { variant?: string }) => {
  const patterns = {
    dots: (
      <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.1" />
      </pattern>
    ),
    grid: (
      <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>{patterns[variant as keyof typeof patterns]}</defs>
      <rect width="100%" height="100%" fill={`url(#${variant}-pattern)`} />
    </svg>
  )
}

// Right Card Component
const RightCard = ({ right, categoryColor }: { 
  right: {
    title: string;
    description: string;
    legal: string;
    icon: React.ComponentType<{ className?: string }>;
    critical?: boolean;
  };
  categoryColor?: string;
}) => {
  const Icon = right.icon

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group"
    >
      <PatternBackground variant="dots" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`p-3 rounded-lg bg-gradient-to-br ${categoryColor} text-white shadow-md`}
            whileHover={{ rotate: 5 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
          {right.critical && (
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Kritis
            </span>
          )}
        </div>
        
        <h4 className="font-semibold text-gray-800 mb-2">{right.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{right.description}</p>
        
        <div className="flex items-center text-xs text-gray-500">
          <Scale className="h-3 w-3 mr-1" />
          <span>{right.legal}</span>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  )
}

// Timeline Card Component
const TimelineCard = ({ phase, index }: { 
  phase: {
    title: string;
    maxDuration: string;
    rights: string[];
  };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-800">{phase.title}</h3>
      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
        {phase.maxDuration}
      </span>
    </div>
    
    <div className="space-y-2">
      {phase.rights.map((right: string, idx: number) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + idx * 0.05 }}
          className="flex items-start text-sm text-gray-600"
        >
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
          <span>{right}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

// Main Component
export default function HakTersangka() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState('fundamental')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <PatternBackground variant="grid" />
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-6 shadow-lg"
            >
              <Shield className="h-5 w-5" />
              <span className="font-medium">Dilindungi Hukum</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {hakTersangkaData.overview.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {hakTersangkaData.overview.description}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{hakTersangkaData.overview.totalRights}</div>
              <div className="text-sm text-gray-600">Hak Tersangka</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">4</div>
              <div className="text-sm text-gray-600">Sumber Hukum</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Jam Batas Tangkap</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Hak Pendampingan</div>
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {['overview', 'rights', 'timeline', 'violations'].map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {tab === 'overview' && 'Ringkasan'}
                {tab === 'rights' && 'Daftar Hak'}
                {tab === 'timeline' && 'Timeline'}
                {tab === 'violations' && 'Pelanggaran'}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Pentingnya Memahami Hak Tersangka
                </h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="text-lg mb-4">
                    Setiap orang yang disangka melakukan tindak pidana memiliki hak-hak yang dilindungi 
                    oleh hukum. Hak-hak ini bertujuan memastikan proses hukum berjalan adil dan 
                    menghormati martabat manusia.
                  </p>
                  <p className="text-lg">
                    Pemahaman tentang hak-hak ini penting tidak hanya bagi tersangka, tetapi juga 
                    bagi keluarga, penegak hukum, dan masyarakat umum untuk memastikan keadilan ditegakkan.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-green-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Mengapa Penting?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Mencegah kesalahan prosedur hukum</li>
                      <li>• Melindungi dari penyalahgunaan wewenang</li>
                      <li>• Memastikan proses hukum yang adil</li>
                      <li>• Menjaga martabat kemanusiaan</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Scale className="h-5 w-5 mr-2 text-blue-600" />
                      Dasar Hukum Utama
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {hakTersangkaData.overview.sources.map((source, idx) => (
                        <li key={idx}>• {source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-3" />
                  Kontak Darurat
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">LBH/YLBHI</h4>
                    <p className="text-sm opacity-90">Bantuan hukum gratis</p>
                    <p className="font-mono">021-3145518</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Komnas HAM</h4>
                    <p className="text-sm opacity-90">Pelanggaran HAM</p>
                    <p className="font-mono">021-3925230</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Ombudsman RI</h4>
                    <p className="text-sm opacity-90">Maladministrasi</p>
                    <p className="font-mono">137</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Rights Tab */}
          {activeTab === 'rights' && (
            <motion.div
              key="rights"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              {/* Category Selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {hakTersangkaData.categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                    }`}
                  >
                    <category.icon className="h-4 w-4 inline mr-2" />
                    {category.title}
                  </motion.button>
                ))}
              </div>

              {/* Rights Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hakTersangkaData.categories
                  .find(cat => cat.id === selectedCategory)?.rights
                  .map((right, index) => (
                    <motion.div
                      key={right.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <RightCard 
                        right={right} 
                        categoryColor={hakTersangkaData.categories.find(cat => cat.id === selectedCategory)?.color}
                      />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Timeline Proses Hukum</h2>
                <p className="text-gray-600">Hak-hak tersangka di setiap tahapan</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(hakTersangkaData.timeline).map(([key, phase], index) => (
                  <TimelineCard key={key} phase={phase} index={index} />
                ))}
              </div>

              {/* Process Flow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-white rounded-2xl shadow-xl p-8"
              >
                <h3 className="text-xl font-bold mb-6 text-center">Alur Proses Pidana</h3>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                  {['Penangkapan', 'Penyidikan', 'Penuntutan', 'Persidangan'].map((step, idx) => (
                    <React.Fragment key={step}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
                          {idx + 1}
                        </div>
                        <h4 className="font-semibold">{step}</h4>
                      </motion.div>
                      {idx < 3 && (
                        <ChevronRight className="h-6 w-6 text-gray-400 hidden md:block" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Violations Tab */}
          {activeTab === 'violations' && (
            <motion.div
              key="violations"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Pelanggaran Hak Tersangka</h2>
                <p className="text-gray-600">Apa yang harus dilakukan jika hak dilanggar</p>
              </div>
              
              <div className="space-y-6">
                {hakTersangkaData.violations.map((violation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                          {violation.violation}
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-red-50 rounded-lg p-4">
                            <h4 className="font-medium text-sm text-red-900 mb-2">Konsekuensi Hukum</h4>
                            <p className="text-sm text-red-700">{violation.consequence}</p>
                          </div>
                          
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-medium text-sm text-blue-900 mb-2">Cara Melaporkan</h4>
                            <p className="text-sm text-blue-700">{violation.report}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tips Box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200"
              >
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <HelpCircle className="h-6 w-6 mr-2 text-yellow-700" />
                  Tips Penting
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Selalu minta surat penangkapan/penahanan</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Dokumentasikan setiap proses (foto, video, saksi)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Jangan tandatangani dokumen tanpa membaca/tanpa pengacara</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Gunakan hak untuk diam jika diperlukan</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Download Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Download Panduan Lengkap</h2>
            <p className="text-lg mb-8 opacity-90">
              Dapatkan e-book gratis &ldquo;Hak-Hak Tersangka dalam Hukum Indonesia&rdquo;
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg"
            >
              <Download className="h-5 w-5" />
              Download PDF
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-full shadow-lg"
        >
          <Phone className="h-6 w-6" />
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg"
        >
          <Share2 className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  )
}
