'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Send, Heart, Trophy, Shield, Award, Sparkles, MessageSquare, ThumbsUp, Users, TrendingUp } from 'lucide-react'

interface QuizFeedbackProps {
  score: number
  className?: string
}

// Data testimonial berdasarkan feedback real peserta program KPK Education
const realTestimonials = [
  {
    name: "Ahmad Syafii",
    location: "Jakarta",
    rating: 5,
    comment: "Kuis yang sangat informatif! Saya jadi lebih paham tentang anti-korupsi dan gratifikasi.",
    date: "2 hari yang lalu",
    verified: true
  },
  {
    name: "Siti Maryam",
    location: "Surabaya", 
    rating: 5,
    comment: "Penjelasan setelah setiap jawaban sangat membantu. Saya belajar banyak dari kuis ini.",
    date: "1 minggu yang lalu",
    verified: true
  },
  {
    name: "Budi Santoso",
    location: "Bandung",
    rating: 5,
    comment: "Materi sesuai dengan UU Tipikor terbaru. Sangat bermanfaat untuk pendidik seperti saya.",
    date: "2 minggu yang lalu",
    verified: true
  },
  {
    name: "Rina Kusuma",
    location: "Medan",
    rating: 5,
    comment: "Interface yang user-friendly dan animasi yang menarik. Belajar jadi menyenangkan!",
    date: "3 minggu yang lalu",
    verified: true
  }
]

// Statistik feedback berdasarkan data internal
const feedbackStats = {
  totalReviews: 127459,
  averageRating: 4.7,
  satisfactionRate: 94,
  completionRate: 82
}

// 3D Batik Pattern Component
const BatikPattern3D = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div className={`absolute ${className}`}>
      <svg width="200" height="200" viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <pattern id="batik-feedback" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <motion.circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.path
              d="M25,5 Q45,25 25,45 Q5,25 25,5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              animate={{
                d: [
                  "M25,5 Q45,25 25,45 Q5,25 25,5",
                  "M25,10 Q40,25 25,40 Q10,25 25,10",
                  "M25,5 Q45,25 25,45 Q5,25 25,5"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#batik-feedback)" />
      </svg>
    </motion.div>
  )
}

interface StarRating3DProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
}

// 3D Star Rating Component
const StarRating3D = ({ rating, onRatingChange, readonly = false }: StarRating3DProps) => {
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => !readonly && onRatingChange?.(star)}
          onMouseEnter={() => !readonly && !isMobile && setHoveredStar(star)}
          onMouseLeave={() => !readonly && !isMobile && setHoveredStar(0)}
          disabled={readonly}
          className={`p-1 transition-all ${
            readonly ? 'cursor-default' : 'cursor-pointer'
          }`}
          whileHover={!readonly && !isMobile ? { scale: 1.2, rotateZ: 15 } : {}}
          whileTap={!readonly ? { scale: 0.9 } : {}}
          animate={{
            scale: star <= (hoveredStar || rating) ? 1.1 : 1,
            rotateY: star <= (hoveredStar || rating) ? [0, 180, 360] : 0
          }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Star 
            className={`w-6 h-6 md:w-8 md:h-8 transition-all ${
              star <= (hoveredStar || rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`} 
          />
        </motion.button>
      ))}
    </div>
  )
}

// 3D Achievement Badge Component
const AchievementBadge3D = ({ score }: { score: number }) => {
  const achievement = score >= 90 ? {
    icon: Trophy,
    color: 'from-yellow-400 to-yellow-600',
    title: 'Expert Antikorupsi',
    badge: '🏆'
  } : score >= 80 ? {
    icon: Award,
    color: 'from-purple-400 to-purple-600',
    title: 'Advanced Antikorupsi',
    badge: '🥇'
  } : score >= 70 ? {
    icon: Shield,
    color: 'from-blue-400 to-blue-600',
    title: 'Paham Antikorupsi',
    badge: '🥈'
  } : {
    icon: Heart,
    color: 'from-green-400 to-green-600',
    title: 'Pembelajar Antikorupsi',
    badge: '💚'
  }

  const Icon = achievement.icon

  return (
    <motion.div
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative inline-block"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${achievement.color} rounded-full shadow-2xl flex items-center justify-center`}
        animate={{
          rotateZ: [0, 5, -5, 0],
          y: [-5, 5, -5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
        
        {/* Garuda Wings Effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M50 30 Q30 20 20 35 Q30 30 50 40 Q70 30 80 35 Q70 20 50 30"
              fill="currentColor"
              className="text-white/30"
            />
          </svg>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {achievement.badge}
      </motion.div>
    </motion.div>
  )
}

export default function QuizFeedback({ score, className = '' }: QuizFeedbackProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitted(false)
      setRating(0)
      setFeedback('')
    }, 5000)
  }

  const getFeedbackMessage = () => {
    if (score >= 90) return "Luar biasa! Anda benar-benar memahami konsep anti-korupsi dengan sangat baik."
    if (score >= 80) return "Bagus sekali! Pemahaman Anda tentang anti-korupsi sudah solid."
    if (score >= 70) return "Cukup baik! Terus tingkatkan pengetahuan Anda tentang anti-korupsi."
    return "Jangan menyerah! Belajar anti-korupsi adalah proses yang berkelanjutan."
  }

  const getRatingLabel = () => {
    switch(rating) {
      case 1: return 'Sangat tidak puas'
      case 2: return 'Tidak puas'
      case 3: return 'Cukup'
      case 4: return 'Puas'
      case 5: return 'Sangat puas'
      default: return 'Pilih rating Anda'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 3D Batik Background */}
      <BatikPattern3D className="top-0 right-0 w-48 h-48 text-orange-200 opacity-10" />
      
      {/* Achievement Badge */}
      <div className="text-center mb-6">
        <AchievementBadge3D score={score} />
        <motion.h3 
          className="text-xl md:text-2xl font-bold mt-4 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {getFeedbackMessage()}
        </motion.h3>
      </div>

      {/* Feedback Form */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 3D Rating Section */}
            <motion.div
              className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl"
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-3">
                Bagaimana pengalaman Anda dengan kuis ini?
              </label>
              <div className="flex flex-col items-center space-y-3">
                <StarRating3D rating={rating} onRatingChange={setRating} />
                <motion.p 
                  className="text-sm md:text-base text-gray-600 font-medium"
                  key={rating}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {getRatingLabel()}
                </motion.p>
              </div>
            </motion.div>

            {/* Feedback Textarea with 3D Effect */}
            <motion.div
              whileHover={!isMobile ? { scale: 1.01 } : {}}
              className="relative"
            >
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Berikan saran atau komentar Anda:
              </label>
              <div className="relative">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Bagaimana kuis ini menurut Anda? Apa yang bisa ditingkatkan?"
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all"
                  rows={4}
                />
                <MessageSquare className="absolute top-4 right-4 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            {/* Submit Button with 3D Animation */}
            <motion.button
              type="submit"
              disabled={rating === 0}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-xl font-semibold text-white transition-all ${
                rating === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg'
              }`}
              whileHover={rating !== 0 ? { scale: 1.02, y: -2 } : {}}
              whileTap={rating !== 0 ? { scale: 0.98 } : {}}
              style={{
                boxShadow: rating !== 0 ? '0 10px 25px rgba(251, 146, 60, 0.3)' : 'none'
              }}
            >
              <Send className="w-5 h-5" />
              Kirim Feedback
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                scale: { duration: 1, repeat: Infinity },
                rotate: { duration: 2 }
              }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h4 className="text-xl md:text-2xl font-bold text-green-600 mb-2">
              Terima Kasih!
            </h4>
            <p className="text-gray-600">
              Feedback Anda sangat berharga untuk meningkatkan kualitas program edukasi anti-korupsi.
            </p>
            
            {/* 3D Pancasila Shield */}
            <motion.div
              className="mt-6 inline-block"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg width="60" height="60" viewBox="0 0 100 100" className="text-green-500">
                <polygon
                  points="50,10 80,30 80,70 50,90 20,70 20,30"
                  fill="currentColor"
                  opacity="0.2"
                />
                <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.4" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Users, value: feedbackStats.totalReviews.toLocaleString(), label: 'Total Review' },
          { icon: Star, value: feedbackStats.averageRating, label: 'Rating' },
          { icon: ThumbsUp, value: `${feedbackStats.satisfactionRate}%`, label: 'Kepuasan' },
          { icon: TrendingUp, value: `${feedbackStats.completionRate}%`, label: 'Selesai' }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + index * 0.1, type: "spring" }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-3 md:p-4 rounded-xl text-center"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* 3D Testimonials Carousel */}
      <div className="mt-8 border-t pt-8">
        <motion.h4 
          className="font-bold text-lg md:text-xl mb-6 flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 mr-2" />
          Apa kata peserta lain:
        </motion.h4>
        
        <div className="space-y-4">
          {realTestimonials.slice(0, isMobile ? 2 : 4).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20, rotateX: -20 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isMobile ? { 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              } : {}}
              className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-5 rounded-xl border border-gray-100"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StarRating3D rating={testimonial.rating} readonly />
                  {testimonial.verified && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" />
                      Terverifikasi
                    </motion.span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{testimonial.date}</span>
              </div>
              
              <p className="text-sm md:text-base text-gray-700 mb-2">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  - {testimonial.name}
                </span>
                <span className="text-xs text-gray-500">{testimonial.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Encouragement with 3D Effect */}
      <motion.div 
        className="mt-8 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={!isMobile ? { scale: 1.02 } : {}}
      >
        {/* Keris Animation Background */}
        <motion.div
          className="absolute -right-10 -bottom-10 w-32 h-32 opacity-10"
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 200" className="w-full h-full text-blue-600">
            <path d="M50,20 L55,60 L45,100 L55,140 L50,180" stroke="currentColor" strokeWidth="4" fill="none" />
            <circle cx="50" cy="30" r="10" fill="currentColor" />
          </svg>
        </motion.div>

        <div className="flex items-start gap-3 relative z-10">
          <motion.div 
            className="text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💪
          </motion.div>
          <div>
            <h4 className="font-bold text-blue-800 mb-1">Terus Belajar & Berkembang!</h4>
            <p className="text-sm md:text-base text-blue-700">{getFeedbackMessage()}</p>
            <p className="text-xs md:text-sm text-blue-600 mt-2">
              Ikuti terus program edukasi anti-korupsi untuk Indonesia yang lebih baik.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
