'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Scale, 
  Shield, 
  Gavel,
  AlertTriangle,
  Info,
  Search,
  ChevronRight,
  Calendar,
  FileText,
  Users,
  Lock,
  Eye,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  BookMarked,
  Briefcase,
  Heart,
  DollarSign,
  Home,
  Car,
  Globe,
  Zap
} from 'lucide-react'

// Data KUHP berdasarkan UU No. 1 Tahun 2023
const kuhpData = {
  overview: {
    title: "Kitab Undang-Undang Hukum Pidana (KUHP)",
    lawNumber: "UU No. 1 Tahun 2023",
    effectiveDate: "2 Januari 2026",
    totalArticles: 624,
    totalBooks: 2,
    totalChapters: 32,
    previousLaw: "Wetboek van Strafrecht (WvS) 1915"
  },
  
  statistics: {
    newCrimes: 94,
    updatedPenalties: 237,
    alternativeSanctions: 11,
    restoredCrimes: 15,
    decriminalizedActs: 8
  },

  books: [
    {
      id: 'buku-1',
      title: 'Buku Kesatu: Ketentuan Umum',
      icon: BookOpen,
      articles: '1-145',
      chapters: 9,
      color: 'from-blue-600 to-cyan-600',
      description: 'Asas-asas hukum pidana, pertanggungjawaban pidana, pidana dan tindakan',
      keyTopics: [
        'Asas Legalitas',
        'Asas Teritorial',
        'Jenis-jenis Pidana',
        'Percobaan & Pembantuan',
        'Dasar Penghapus Pidana',
        'Perbarengan Tindak Pidana'
      ]
    },
    {
      id: 'buku-2',
      title: 'Buku Kedua: Tindak Pidana',
      icon: Gavel,
      articles: '146-624',
      chapters: 23,
      color: 'from-red-600 to-orange-600',
      description: 'Berbagai jenis tindak pidana dan ancaman pidananya',
      keyTopics: [
        'Tindak Pidana terhadap Keamanan Negara',
        'Tindak Pidana terhadap Nyawa',
        'Tindak Pidana terhadap Tubuh',
        'Tindak Pidana Kesusilaan',
        'Tindak Pidana terhadap Harta Benda',
        'Tindak Pidana Jabatan'
      ]
    }
  ],

  keyChanges: [
    {
      category: 'Pidana Baru',
      icon: Zap,
      changes: [
        {
          title: 'Pidana Kerja Sosial',
          description: 'Alternatif pidana penjara kurang dari 6 bulan',
          impact: 'high'
        },
        {
          title: 'Pidana Pengawasan',
          description: 'Pembinaan di luar lembaga pemasyarakatan',
          impact: 'high'
        },
        {
          title: 'Pidana Ganti Rugi',
          description: 'Kompensasi kepada korban tindak pidana',
          impact: 'medium'
        }
      ]
    },
    {
      category: 'Tindak Pidana Baru',
      icon: AlertTriangle,
      changes: [
        {
          title: 'Revenge Porn',
          description: 'Pasal 414-416 tentang pornografi balas dendam',
          impact: 'high'
        },
        {
          title: 'Penyadapan Ilegal',
          description: 'Pasal 262-264 tentang intersepsi komunikasi',
          impact: 'high'
        },
        {
          title: 'Living Law',
          description: 'Pasal 2 ayat (2) hukum yang hidup dalam masyarakat',
          impact: 'medium'
        }
      ]
    }
  ],

  majorCrimes: [
    {
      title: 'Pembunuhan',
      articles: 'Pasal 338-350',
      minPenalty: '5 tahun',
      maxPenalty: 'Mati/Seumur Hidup',
      icon: XCircle,
      color: 'red'
    },
    {
      title: 'Pencurian',
      articles: 'Pasal 462-472',
      minPenalty: '3 bulan',
      maxPenalty: '7 tahun',
      icon: Lock,
      color: 'orange'
    },
    {
      title: 'Korupsi',
      articles: 'Pasal 603-609',
      minPenalty: '2 tahun',
      maxPenalty: '20 tahun',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Kesusilaan',
      articles: 'Pasal 407-429',
      minPenalty: '6 bulan',
      maxPenalty: '15 tahun',
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Narkotika',
      articles: 'Tetap mengacu UU Narkotika',
      minPenalty: '4 tahun',
      maxPenalty: 'Mati/Seumur Hidup',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'ITE',
      articles: 'Pasal 353-361',
      minPenalty: '6 bulan',
      maxPenalty: '12 tahun',
      icon: Globe,
      color: 'blue'
    }
  ],

  timeline: [
    {
      date: '2 Juli 2012',
      event: 'Pembentukan Tim Perumus KUHP',
      description: 'Pemerintah membentuk tim untuk merancang KUHP baru'
    },
    {
      date: '2015-2019',
      event: 'Pembahasan Intensif',
      description: 'DPR dan Pemerintah melakukan pembahasan RUU KUHP'
    },
    {
      date: 'September 2019',
      event: 'Penundaan Pengesahan',
      description: 'Presiden menunda pengesahan karena masukan masyarakat'
    },
    {
      date: '6 Desember 2022',
      event: 'Pengesahan DPR',
      description: 'DPR mengesahkan RUU KUHP menjadi UU'
    },
    {
      date: '2 Januari 2023',
      event: 'Diundangkan',
      description: 'UU No. 1 Tahun 2023 tentang KUHP diundangkan'
    },
    {
      date: '2 Januari 2026',
      event: 'Berlaku Efektif',
      description: 'KUHP baru berlaku menggantikan WvS'
    }
  ]
}

// Pattern Background Component
const PatternBackground = ({ variant = 'grid' }: { variant?: string }) => {
  const patterns = {
    grid: (
      <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    dots: (
      <pattern id="dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
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

// Crime Card Component
const CrimeCard = ({ crime, index }: { crime: typeof kuhpData.majorCrimes[0], index: number }) => {
  const Icon = crime.icon
  const colorMap: Record<string, string> = {
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative bg-white rounded-2xl shadow-xl p-6 overflow-hidden group"
    >
      <PatternBackground variant="dots" />
      
      <div className="relative z-10">
        <motion.div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorMap[crime.color]} text-white mb-4 shadow-lg`}
          whileHover={{ rotate: 5 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
        
        <h3 className="font-bold text-lg mb-2">{crime.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{crime.articles}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Min. Pidana</span>
            <span className="text-sm font-medium">{crime.minPenalty}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Max. Pidana</span>
            <span className="text-sm font-medium text-red-600">{crime.maxPenalty}</span>
          </div>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  )
}

// Timeline Item Component
const TimelineItem = ({ item, index }: { item: typeof kuhpData.timeline[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="relative flex items-start mb-8 last:mb-0"
  >
    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300" />
    <motion.div
      className="relative z-10 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
      whileHover={{ scale: 1.2 }}
    >
      {index + 1}
    </motion.div>
    <div className="ml-6 flex-1">
      <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">{item.date}</span>
        </div>
        <h4 className="font-semibold text-gray-800 mb-1">{item.event}</h4>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  </motion.div>
)

// Main KUHP Component
export default function KUHP() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <PatternBackground variant="grid" />
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full mb-6 shadow-lg"
            >
              <Scale className="h-5 w-5" />
              <span className="font-medium">{kuhpData.overview.lawNumber}</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {kuhpData.overview.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Reformasi hukum pidana Indonesia yang berlaku mulai {kuhpData.overview.effectiveDate}
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
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{kuhpData.overview.totalArticles}</div>
              <div className="text-sm text-gray-600">Total Pasal</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{kuhpData.statistics.newCrimes}</div>
              <div className="text-sm text-gray-600">Delik Baru</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{kuhpData.statistics.alternativeSanctions}</div>
              <div className="text-sm text-gray-600">Pidana Alternatif</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg text-center"
            >
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">2026</div>
              <div className="text-sm text-gray-600">Berlaku Efektif</div>
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['overview', 'books', 'crimes', 'changes', 'timeline'].map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {tab === 'overview' && 'Ringkasan'}
                {tab === 'books' && 'Struktur'}
                {tab === 'crimes' && 'Tindak Pidana'}
                {tab === 'changes' && 'Perubahan'}
                {tab === 'timeline' && 'Timeline'}
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
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-600" />
                  Tentang KUHP Baru
                </h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="text-lg mb-4">
                    KUHP baru merupakan hasil reformasi hukum pidana Indonesia yang menggantikan 
                    Wetboek van Strafrecht (WvS) warisan kolonial Belanda sejak 1915. 
                    Dengan {kuhpData.overview.totalArticles} pasal yang tersebar dalam {kuhpData.overview.totalBooks} buku 
                    dan {kuhpData.overview.totalChapters} bab, KUHP baru mengakomodasi perkembangan 
                    masyarakat dan teknologi modern.
                  </p>
                  <p className="text-lg">
                    Beberapa terobosan penting termasuk pidana alternatif, restorative justice, 
                    dan pengakuan hukum adat yang hidup dalam masyarakat.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                      Keunggulan KUHP Baru
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Mengakomodasi tindak pidana modern (cyber crime, dll)</li>
                      <li>• Pidana alternatif selain penjara</li>
                      <li>• Pendekatan restorative justice</li>
                      <li>• Perlindungan korban lebih baik</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                      Catatan Penting
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Masa transisi 3 tahun (2023-2026)</li>
                      <li>• Beberapa UU khusus tetap berlaku</li>
                      <li>• Perlu sosialisasi intensif</li>
                      <li>• Penyesuaian sistem peradilan</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Download KUHP Lengkap</h3>
                    <p className="opacity-90">Format PDF, 624 pasal lengkap dengan penjelasan</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
                  >
                    <Download className="h-5 w-5" />
                    Download
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Books Tab */}
          {activeTab === 'books' && (
            <motion.div
              key="books"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {kuhpData.books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${book.color}`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                        <p className="text-gray-600">{book.description}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${book.color} text-white`}>
                        <BookOpen className="h-8 w-8" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">{book.articles}</div>
                        <div className="text-sm text-gray-600">Pasal</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">{book.chapters}</div>
                        <div className="text-sm text-gray-600">Bab</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Topik Utama:</h4>
                      <div className="space-y-2">
                        {book.keyTopics.map((topic, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 + idx * 0.05 }}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                            {topic}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Crimes Tab */}
          {activeTab === 'crimes' && (
            <motion.div
              key="crimes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tindak Pidana Utama</h2>
                <p className="text-gray-600">Jenis-jenis tindak pidana dan ancaman pidananya</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kuhpData.majorCrimes.map((crime, index) => (
                  <CrimeCard key={crime.title} crime={crime} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {/* Changes Tab */}
          {activeTab === 'changes' && (
            <motion.div
              key="changes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Perubahan Signifikan</h2>
                <p className="text-gray-600">Terobosan dan pembaruan dalam KUHP baru</p>
              </div>
              
              {kuhpData.keyChanges.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8 mb-6"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white mr-4">
                      <category.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.changes.map((change, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="border-l-4 border-orange-500 pl-4"
                      >
                        <h4 className="font-semibold text-gray-800">{change.title}</h4>
                        <p className="text-sm text-gray-600">{change.description}</p>
                        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                          change.impact === 'high' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {change.impact === 'high' ? 'Dampak Tinggi' : 'Dampak Sedang'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Perjalanan KUHP Baru</h2>
                <p className="text-gray-600">Timeline pembentukan hingga pemberlakuan</p>
              </div>
              
              <div className="relative">
                {kuhpData.timeline.map((item, index) => (
                  <TimelineItem key={index} item={item} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <BookOpen className="h-6 w-6" />
      </motion.button>
    </div>
  )
}
