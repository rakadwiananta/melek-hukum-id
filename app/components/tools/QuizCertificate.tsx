'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Share2, 
  Award, 
  Trophy, 
  Shield, 
  Star, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Hash, 
  Globe, 
  ChevronDown 
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface QuizCertificateProps {
  score: number
  totalQuestions: number
  timeSpent: number
  className?: string
}

// Certificate levels based on KPK Education standards
const certificateLevels = {
  expert: {
    minScore: 90,
    level: 'Expert',
    title: 'Sertifikat Anti-Korupsi Expert',
    description: 'Anda telah menunjukkan pemahaman mendalam tentang anti-korupsi',
    color: 'from-yellow-400 to-orange-500',
    badge: '🏆',
    icon: Trophy,
    benefits: ['Eligible untuk Program Lanjutan KPK', 'Akses Materi Premium', 'Badge Digital LinkedIn']
  },
  advanced: {
    minScore: 80,
    level: 'Advanced',
    title: 'Sertifikat Anti-Korupsi Advanced',
    description: 'Anda telah menunjukkan pemahaman yang baik tentang anti-korupsi',
    color: 'from-blue-400 to-purple-500',
    badge: '🥇',
    icon: Award,
    benefits: ['Akses Webinar Eksklusif', 'E-Book Anti-Korupsi', 'Certificate Badge']
  },
  intermediate: {
    minScore: 70,
    level: 'Intermediate',
    title: 'Sertifikat Anti-Korupsi Intermediate',
    description: 'Anda telah menunjukkan pemahaman dasar tentang anti-korupsi',
    color: 'from-green-400 to-blue-500',
    badge: '🥈',
    icon: Shield,
    benefits: ['Materi Pembelajaran Tambahan', 'Forum Diskusi', 'Digital Certificate']
  },
  beginner: {
    minScore: 0,
    level: 'Beginner',
    title: 'Sertifikat Anti-Korupsi Beginner',
    description: 'Anda telah memulai perjalanan belajar anti-korupsi',
    color: 'from-gray-400 to-gray-500',
    badge: '🥉',
    icon: Star,
    benefits: ['Panduan Belajar Lanjutan', 'Rekomendasi Materi', 'Participation Certificate']
  }
}

// 3D Batik Frame Component
const BatikFrame3D = ({ color }: { color: string }) => {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA500" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF6347" stopOpacity="0.1" />
          </linearGradient>
          <pattern id="batik-certificate" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "30px 30px" }}
            >
              <circle cx="30" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              <path d="M30,5 Q55,30 30,55 Q5,30 30,5" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
            </motion.g>
          </pattern>
        </defs>
        
        {/* Top Border */}
        <rect x="0" y="0" width="400" height="20" fill="url(#batik-certificate)" />
        {/* Bottom Border */}
        <rect x="0" y="280" width="400" height="20" fill="url(#batik-certificate)" />
        {/* Left Border */}
        <rect x="0" y="0" width="20" height="300" fill="url(#batik-certificate)" />
        {/* Right Border */}
        <rect x="380" y="0" width="20" height="300" fill="url(#batik-certificate)" />
      </svg>
    </motion.div>
  )
}

// 3D Garuda Pancasila Component
const GarudaPancasila3D = () => {
  return (
    <motion.div
      className="relative w-24 h-24 md:w-32 md:h-32"
      animate={{
        rotateY: [0, 360]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Garuda Body */}
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Wings */}
          <path
            d="M50 30 Q20 20 10 40 Q20 35 50 50 Q80 35 90 40 Q80 20 50 30"
            fill="#FFD700"
            opacity="0.8"
          />
          {/* Shield */}
          <polygon
            points="50,40 65,45 65,65 50,70 35,65 35,45"
            fill="#DC143C"
            stroke="#8B0000"
            strokeWidth="2"
          />
          {/* Pancasila Star */}
          <motion.path
            d="M50,45 L52,50 L57,50 L53,53 L55,58 L50,55 L45,58 L47,53 L43,50 L48,50 Z"
            fill="#FFD700"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 51.5px" }}
          />
        </motion.g>
      </svg>
    </motion.div>
  )
}

export default function QuizCertificate({ score, totalQuestions, timeSpent, className = '' }: QuizCertificateProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [showBenefits, setShowBenefits] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const percentage = Math.round((score / totalQuestions) * 100)
  
  const getCertificateLevel = () => {
    if (percentage >= certificateLevels.expert.minScore) return certificateLevels.expert
    if (percentage >= certificateLevels.advanced.minScore) return certificateLevels.advanced
    if (percentage >= certificateLevels.intermediate.minScore) return certificateLevels.intermediate
    return certificateLevels.beginner
  }

  const certificate = getCertificateLevel()
  const Icon = certificate.icon
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const certificateId = `AC-${Date.now().toString().slice(-8)}`
  const issueDate = new Date().toLocaleDateString('id-ID', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const downloadCertificate = async () => {
    setIsDownloading(true)
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const link = document.createElement('a')
    link.href = '#'
    link.download = `sertifikat-anti-korupsi-${certificate.level.toLowerCase()}-${certificateId}.pdf`
    link.click()
    
    setIsDownloading(false)
  }

  const shareCertificate = async () => {
    setIsSharing(true)
    
    if (typeof window === 'undefined') {
      setIsSharing(false)
      return
    }
    
    const text = `Saya telah mendapatkan ${certificate.title} dengan skor ${percentage}% dari Melek Hukum ID! 🎉`
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: certificate.title,
          text: text,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(text + ' ' + window.location.href)
        alert('Link sertifikat telah disalin ke clipboard!')
      }
    } catch (error) {
      console.error('Share error:', error)
    }
    
    setIsSharing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ delay: 1.3, type: "spring", stiffness: 100 }}
      className={`bg-white rounded-2xl shadow-2xl overflow-hidden relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Batik Frame */}
      <BatikFrame3D color={certificate.color} />

      {/* Certificate Header with 3D Gradient */}
      <motion.div
        className={`relative bg-gradient-to-r ${certificate.color} p-6 md:p-8 text-white text-center overflow-hidden`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            backgroundPosition: { duration: 20, repeat: Infinity, repeatType: "reverse" },
            scale: { duration: 10, repeat: Infinity }
          }}
        >
          <div className="w-full h-full bg-wayang-pattern" />
        </motion.div>

        <div className="relative z-10">
          {/* 3D Badge Animation */}
          <motion.div 
            className="text-5xl md:text-6xl mb-3"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {certificate.badge}
          </motion.div>
          
          <motion.h3 
            className="text-xl md:text-2xl font-bold mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {certificate.title}
          </motion.h3>
          
          <motion.p 
            className="text-sm md:text-base opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {certificate.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Certificate Content */}
      <div className="p-6 md:p-8">
        {/* Garuda Pancasila */}
        <div className="flex justify-center mb-6">
          <GarudaPancasila3D />
        </div>

        {/* Score Grid with 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { 
              label: 'Skor', 
              value: `${percentage}%`, 
              icon: Trophy, 
              color: 'text-orange-600',
              bgColor: 'bg-orange-50'
            },
            { 
              label: 'Jawaban Benar', 
              value: `${score}/${totalQuestions}`, 
              icon: CheckCircle, 
              color: 'text-green-600',
              bgColor: 'bg-green-50'
            },
            { 
              label: 'Waktu', 
              value: formatTime(timeSpent), 
              icon: Clock, 
              color: 'text-blue-600',
              bgColor: 'bg-blue-50'
            }
          ].map((item, index) => {
            const ItemIcon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ scale: 0, rotateX: -30 }}
                animate={{ scale: 1, rotateX: 0 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                whileHover={!isMobile ? { 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                } : {}}
                className={`text-center p-4 ${item.bgColor} rounded-xl`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <ItemIcon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
                <div className={`text-xl md:text-2xl font-bold ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600">{item.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Certificate Details with 3D Border */}
        <motion.div
          className="border-2 border-dashed border-gray-300 rounded-xl p-4 md:p-6 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Level:
              </span>
              <span className={`font-bold text-lg ${
                certificate.level === 'Expert' ? 'text-orange-600' :
                certificate.level === 'Advanced' ? 'text-purple-600' :
                certificate.level === 'Intermediate' ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {certificate.level}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tanggal:
              </span>
              <span className="font-medium">{issueDate}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Hash className="w-4 h-4" />
                ID Sertifikat:
              </span>
              <span className="font-mono text-xs md:text-sm font-bold">{certificateId}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Verifikasi:
              </span>
              <span className="text-green-600 font-medium">Terverifikasi KPK</span>
            </div>
          </div>
        </motion.div>

        {/* Benefits Section with 3D Animation */}
        <motion.div className="mb-6">
          <motion.button
            onClick={() => setShowBenefits(!showBenefits)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Manfaat Sertifikat Anda
            </span>
            <motion.div
              animate={{ rotate: showBenefits ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {showBenefits && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3 space-y-2">
                  {certificate.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons with 3D Effect */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={downloadCertificate}
            disabled={isDownloading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            whileHover={!isDownloading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isDownloading ? { scale: 0.98 } : {}}
          >
            {isDownloading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-5 h-5" />
              </motion.div>
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isDownloading ? 'Mengunduh...' : 'Download Sertifikat'}
          </motion.button>
          
          <motion.button
            onClick={shareCertificate}
            disabled={isSharing}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all disabled:opacity-50"
            whileHover={!isSharing ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isSharing ? { scale: 0.98 } : {}}
          >
            {isSharing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-5 h-5" />
              </motion.div>
            ) : (
              <Share2 className="w-5 h-5" />
            )}
            {isSharing ? 'Membagikan...' : 'Bagikan Sertifikat'}
          </motion.button>
        </div>
      </div>

      {/* Footer with 3D Effect */}
      <motion.div 
        className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs md:text-sm text-gray-600">
          Sertifikat ini dikeluarkan oleh <span className="font-semibold">Melek Hukum ID</span> 
          {' '}bekerja sama dengan <span className="font-semibold">KPK RI</span> 
          {' '}sebagai bukti partisipasi dalam program edukasi anti-korupsi nasional
        </p>
        
        {/* 3D Verification Badge */}
        <motion.div
          className="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-3 h-3" />
          Terverifikasi & Resmi
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
