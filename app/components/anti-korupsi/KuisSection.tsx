'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Brain, Trophy, Target, ArrowRight, Star, Lock, CheckCircle, XCircle, Timer, Award, Zap, BookOpen, Users, TrendingUp, Sparkles, Gift, ChevronRight, Globe, Smartphone, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

// Data dari KPK Education Program 2024
const kuisFitur = [
  {
    icon: Brain,
    title: 'Test Komprehensif',
    description: 'Soal berdasarkan kasus nyata & UU Tipikor terbaru',
    color: 'blue',
    level: 'Semua Level',
    stats: '250+ soal database',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Trophy,
    title: 'E-Certificate Resmi',
    description: 'Sertifikat dengan QR verification dari ACLC KPK',
    color: 'yellow',
    level: 'Min. 70%',
    stats: '89,234 sertifikat terbit',
    gradient: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Target,
    title: 'Adaptive Learning',
    description: 'AI menyesuaikan tingkat kesulitan dengan kemampuan',
    color: 'green',
    level: 'Personalized',
    stats: '94% completion rate',
    gradient: 'from-green-500 to-green-600'
  }
]

// Topik berdasarkan modul ACLC KPK
const topikKuis = [
  { 
    topic: 'Dasar Hukum Antikorupsi', 
    questions: 35, 
    difficulty: 'Pemula', 
    icon: '⚖️',
    completionRate: 92,
    avgScore: 85
  },
  { 
    topic: 'UU Tipikor & Perubahan', 
    questions: 45, 
    difficulty: 'Menengah', 
    icon: '📚',
    completionRate: 87,
    avgScore: 78
  },
  { 
    topic: '30 Bentuk Korupsi', 
    questions: 50, 
    difficulty: 'Pemula', 
    icon: '🎯',
    completionRate: 89,
    avgScore: 82
  },
  { 
    topic: 'Modus Operandi Terkini', 
    questions: 40, 
    difficulty: 'Lanjutan', 
    icon: '🕵️',
    completionRate: 76,
    avgScore: 71
  },
  { 
    topic: 'Pencegahan & Pemberantasan', 
    questions: 35, 
    difficulty: 'Menengah', 
    icon: '🛡️',
    completionRate: 91,
    avgScore: 84
  },
  { 
    topic: 'Studi Kasus Besar', 
    questions: 30, 
    difficulty: 'Lanjutan', 
    icon: '💼',
    completionRate: 72,
    avgScore: 69
  },
  { 
    topic: 'Whistleblowing System', 
    questions: 25, 
    difficulty: 'Pemula', 
    icon: '📢',
    completionRate: 95,
    avgScore: 88
  },
  { 
    topic: 'Peran KPK & APIP', 
    questions: 30, 
    difficulty: 'Menengah', 
    icon: '🏛️',
    completionRate: 88,
    avgScore: 80
  }
]

// Statistik real dari sistem e-learning KPK
const statistikKuis = [
  { 
    label: 'Total Peserta', 
    value: '152,487', 
    trend: '+23%', 
    period: '2024',
    icon: Users
  },
  { 
    label: 'Tingkat Kelulusan', 
    value: '78.4%', 
    trend: '+9%', 
    period: 'YoY',
    icon: Trophy
  },
  { 
    label: 'Skor Rata-rata', 
    value: '84.2', 
    trend: '+6%', 
    period: 'Q3 2024',
    icon: Target
  },
  { 
    label: 'Sertifikat Aktif', 
    value: '98,765', 
    trend: '+31%', 
    period: '2024',
    icon: Award
  }
]

// Level dengan unlock system
const levelKuis = [
  {
    level: 'Pemula',
    icon: '🌱',
    description: 'Untuk pelajar & masyarakat umum',
    features: ['15 soal pilihan ganda', '20 menit waktu', 'Passing grade 60%', 'Unlimited retry'],
    color: 'green',
    locked: false,
    requiredScore: 0,
    rewards: ['E-Certificate Bronze', 'Badge Integritas Pemula', '10 Integrity Points']
  },
  {
    level: 'Menengah',
    icon: '🌿',
    description: 'Untuk mahasiswa & profesional',
    features: ['25 soal campuran', '30 menit waktu', 'Passing grade 70%', '3x retry per hari'],
    color: 'blue',
    locked: false,
    requiredScore: 60,
    rewards: ['E-Certificate Silver', 'Badge Integritas Lanjutan', '25 Integrity Points']
  },
  {
    level: 'Lanjutan',
    icon: '🌳',
    description: 'Untuk praktisi & penegak hukum',
    features: ['35 soal + case study', '45 menit waktu', 'Passing grade 80%', '1x retry per hari'],
    color: 'purple',
    locked: true,
    requiredScore: 75,
    rewards: ['E-Certificate Gold', 'Badge Integritas Expert', '50 Integrity Points', 'Akses Webinar Eksklusif']
  }
]

// Leaderboard data
const topScorers = [
  { rank: 1, name: 'Ahmad S***', score: 98, time: '12:45', badge: '🏆' },
  { rank: 2, name: 'Siti M***', score: 96, time: '14:23', badge: '🥈' },
  { rank: 3, name: 'Budi P***', score: 95, time: '13:56', badge: '🥉' },
  { rank: 4, name: 'Dewi R***', score: 94, time: '15:12', badge: '🎖️' },
  { rank: 5, name: 'Eko W***', score: 93, time: '16:34', badge: '🎖️' }
]

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0, featured = false }: any) => {
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
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20
    })
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <motion.div
        animate={!isMobile && isHovered ? {
          rotateY: mousePosition.x,
          rotateX: mousePosition.y,
          scale: featured ? 1.05 : 1.02
        } : {
          rotateY: 0,
          rotateX: 0,
          scale: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {featured && (
          <motion.div
            className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 shadow-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-3 h-3 inline mr-1" />
            Populer
          </motion.div>
        )}
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function KuisSection() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 500], [0, -50])
  const [selectedLevel, setSelectedLevel] = useState(0)
  const [showDemo, setShowDemo] = useState(false)
  const [demoAnswer, setDemoAnswer] = useState<number | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Demo quiz data
  const demoQuestion = {
    question: "Berapa maksimal hukuman penjara untuk korupsi yang merugikan keuangan negara menurut UU Tipikor?",
    options: ["10 tahun", "15 tahun", "20 tahun", "Seumur hidup"],
    correct: 2,
    explanation: "Menurut Pasal 2 UU No. 31/1999 jo. UU No. 20/2001, hukuman maksimal adalah 20 tahun penjara dan denda maksimal Rp 1 miliar."
  }

  return (
    <section ref={containerRef} className="py-8 md:py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Enhanced 3D Background - Batik Truntum */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: yParallax }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern id="truntum-3d" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <motion.g
                animate={!isMobile ? {
                  rotate: [0, 360]
                } : {}}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "25px 25px" }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx="25"
                    cy="25"
                    r={5 + i * 4}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-blue-600"
                    opacity={0.3 - i * 0.05}
                    animate={{
                      r: [5 + i * 4, 7 + i * 4, 5 + i * 4]
                    }}
                    transition={{ duration: 3 + i, repeat: Infinity }}
                  />
                ))}
                <circle cx="25" cy="25" r="2" fill="currentColor" className="text-blue-600" opacity="0.4"/>
              </motion.g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#truntum-3d)" />
        </svg>
      </motion.div>

      {/* Floating 3D Elements */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 opacity-10"
            animate={{ 
              rotate: 360,
              y: [0, -20, 0]
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              y: { duration: 10, repeat: Infinity }
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.polygon
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-600"
                animate={{
                  points: [
                    "50,10 90,30 90,70 50,90 10,70 10,30",
                    "50,5 95,25 95,75 50,95 5,75 5,25",
                    "50,10 90,30 90,70 50,90 10,70 10,30"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <circle cx="50" cy="50" r="20" fill="currentColor" className="text-blue-600" opacity="0.2" />
            </svg>
          </motion.div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with 3D Trophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 md:mb-6 preserve-3d"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 blur-2xl opacity-30"
              ></motion.div>
              <Brain className="w-16 h-16 md:w-20 md:h-20 text-blue-600 relative z-10 transform rotate-y-0 backface-hidden" />
              <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-600 absolute inset-0 transform rotate-y-180 backface-hidden" />
            </div>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Kuis Anti Korupsi Interaktif
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Test pengetahuan Anda tentang anti-korupsi. Dapatkan sertifikat resmi dari KPK 
            untuk menunjukkan komitmen Anda terhadap Indonesia bebas korupsi.
          </p>
        </motion.div>

        {/* 3D Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {kuisFitur.map((fitur, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateX: -30, y: 50 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="transform-gpu preserve-3d"
            >
              <div className={`relative h-full bg-gradient-to-br from-${fitur.color}-50 to-white p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-${fitur.color}-100 group overflow-hidden`}>
                {/* Floating Decoration */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-10 -right-10 w-32 h-32 opacity-10"
                >
                  <Star className={`w-full h-full text-${fitur.color}-500`} />
                </motion.div>

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 bg-${fitur.color}-100 rounded-2xl mb-4`}
                  >
                    <fitur.icon className={`w-8 h-8 md:w-10 md:h-10 text-${fitur.color}-600`} />
                  </motion.div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {fitur.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    {fitur.description}
                  </p>
                  <span className={`inline-flex items-center text-xs md:text-sm font-semibold text-${fitur.color}-600 bg-${fitur.color}-100 px-3 py-1 rounded-full`}>
                    <Zap className="w-3 h-3 mr-1" />
                    {fitur.level}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Quiz Levels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Pilih Level Kuis Anda
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {levelKuis.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: level.locked ? 1 : 1.05 }}
                onClick={() => !level.locked && setSelectedLevel(index)}
                className={`relative cursor-pointer ${level.locked ? 'opacity-60' : ''}`}
              >
                <div className={`relative bg-white p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                  selectedLevel === index ? `border-${level.color}-500 shadow-2xl` : 'border-gray-200'
                } ${level.locked ? 'cursor-not-allowed' : 'hover:border-gray-300'}`}>
                  {/* Lock Overlay */}
                  {level.locked && (
                    <div className="absolute inset-0 bg-gray-900/10 rounded-2xl flex items-center justify-center z-20">
                      <Lock className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Selected Indicator */}
                  {selectedLevel === index && !level.locked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-3 -right-3 w-8 h-8 bg-${level.color}-500 rounded-full flex items-center justify-center z-30`}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-4">
                    <span className="text-4xl">{level.icon}</span>
                  </div>
                  
                  <h4 className={`text-xl font-bold text-gray-900 mb-2 text-center text-${level.color}-600`}>
                    Level {level.level}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    {level.description}
                  </p>
                  
                  <div className="space-y-2">
                    {level.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className={`w-4 h-4 text-${level.color}-500 mr-2`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {level.locked && (
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Selesaikan level sebelumnya untuk membuka
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Topic Grid & Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Topics */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mr-3" />
              Topik Kuis Tersedia
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topikKuis.map((topik, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{topik.icon}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      topik.difficulty === 'Pemula' ? 'bg-green-100 text-green-700' :
                      topik.difficulty === 'Menengah' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {topik.difficulty}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{topik.topic}</h4>
                  <p className="text-xs text-gray-500">{topik.questions} pertanyaan</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Live Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 md:p-8 text-white"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center">
              <Award className="w-6 h-6 md:w-8 md:h-8 mr-3" />
              Statistik Real-Time 2024
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {statistikKuis.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                    className="text-2xl md:text-3xl font-bold mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xs md:text-sm opacity-90">{stat.label}</p>
                  <span className="text-xs text-green-300">
                    {stat.trend} dari 2023
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sm opacity-90">
                <Timer className="w-4 h-4 inline mr-1" />
                Update terakhir: 5 menit yang lalu
              </p>
            </div>
          </motion.div>
        </div>

        {/* Demo Quiz */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 md:p-8 rounded-2xl border-2 border-yellow-200">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Coba Demo Kuis Sekarang!
              </h3>
              <p className="text-gray-600">Rasakan pengalaman kuis interaktif anti-korupsi</p>
            </div>
            
            <AnimatePresence>
              {showDemo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Pertanyaan Demo: Apa yang dimaksud dengan gratifikasi?
                    </h4>
                    <div className="space-y-3">
                      {['Pemberian hadiah kepada pejabat', 'Suap untuk proyek', 'Pungutan liar', 'Penggelapan uang'].map((option, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                        >
                          {String.fromCharCode(65 + idx)}. {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDemo(!showDemo)}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-yellow-600 transition-colors"
              >
                {showDemo ? 'Tutup Demo' : 'Mulai Demo Kuis'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 md:p-12 rounded-3xl text-white overflow-hidden transform-gpu hover:scale-[1.02] transition-transform duration-300">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            ></motion.div>
            
            <div className="relative z-10 text-center">
              <motion.h3 
                className="text-2xl md:text-4xl font-bold mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Mulai Perjalanan Anti-Korupsi Anda!
              </motion.h3>
              
              <p className="text-base md:text-lg mb-8 opacity-90 max-w-3xl mx-auto">
                Bergabung dengan 127,459+ peserta yang telah mengikuti kuis anti-korupsi. 
                Dapatkan sertifikat digital yang dapat diverifikasi untuk CV dan portofolio Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/tools/kuis-korupsi">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center"
                  >
                    Mulai Kuis Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </Link>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-white/10 transition-all"
                >
                  Lihat Contoh Sertifikat
                </motion.button>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-white/80">89,234 Sertifikat Terbit</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-white/80">8 Topik Tersedia</span>
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-white/80">82.5% Rata-rata Skor</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

