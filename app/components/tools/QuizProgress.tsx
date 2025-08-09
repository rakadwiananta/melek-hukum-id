'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Trophy, Target, Brain, Zap, Star, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

// Fallback untuk AnimatePresence jika ada masalah dengan import
const AnimatePresenceFallback = ({ children }: { children: React.ReactNode }) => {
  try {
    return <AnimatePresence>{children}</AnimatePresence>
  } catch (error) {
    return <>{children}</>
  }
}

interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
  className?: string
}

// Milestone achievements
const milestones = [
  { at: 25, icon: Star, label: 'Pemula', color: 'text-blue-500' },
  { at: 50, icon: Zap, label: 'Menengah', color: 'text-purple-500' },
  { at: 75, icon: Brain, label: 'Mahir', color: 'text-orange-500' },
  { at: 100, icon: Trophy, label: 'Expert', color: 'text-yellow-500' }
]

// 3D Keris Progress Indicator
const KerisProgress = ({ progress }: { progress: number }) => {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.svg
        width="40"
        height="100"
        viewBox="0 0 40 100"
        className="absolute"
        animate={{
          y: [-50 + (progress / 2), -50 + (progress / 2)],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
          y: { duration: 0.5 },
          opacity: { duration: 2, repeat: Infinity }
        }}
      >
        <path
          d="M20 10 Q15 30 20 50 Q25 70 20 90"
          fill="none"
          stroke="url(#kerisGradient)"
          strokeWidth="3"
        />
        <circle cx="20" cy="15" r="5" fill="url(#kerisGradient)" />
        <defs>
          <linearGradient id="kerisGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  )
}

interface MilestoneBadgeProps {
  milestone: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    color: string
    at: number
  }
  achieved: boolean
  index: number
}

// 3D Milestone Badge Component
const MilestoneBadge = ({ milestone, achieved, index }: MilestoneBadgeProps) => {
  const Icon = milestone.icon
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (achieved && !showAnimation) {
      setShowAnimation(true)
    }
  }, [achieved])

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ 
        scale: achieved ? 1 : 0.8, 
        rotateY: achieved ? 0 : -180,
        opacity: achieved ? 1 : 0.5
      }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Achievement Glow Effect */}
      {achieved && showAnimation && (
        <motion.div
          className="absolute inset-0 bg-yellow-400 rounded-full blur-xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1 }}
        />
      )}
      
      <motion.div
        className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
          achieved 
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg' 
            : 'bg-gray-200'
        }`}
        whileHover={achieved ? { 
          scale: 1.1,
          rotate: 360,
          boxShadow: "0 10px 30px rgba(251, 191, 36, 0.5)"
        } : {}}
      >
        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${
          achieved ? 'text-white' : 'text-gray-400'
        }`} />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: achieved ? 1 : 0.5 }}
      >
        <span className={achieved ? milestone.color : 'text-gray-400'}>
          {milestone.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function QuizProgress({ currentQuestion, totalQuestions, className = '' }: QuizProgressProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const getCurrentMilestone = () => {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (progress >= milestones[i].at) {
        return milestones[i]
      }
    }
    return null
  }

  const currentMilestone = getCurrentMilestone()

  return (
    <motion.div 
      className={`mb-6 md:mb-8 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with 3D Animation */}
      <div className="flex justify-between items-center mb-3">
        <motion.div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Target className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
          </motion.div>
          <span className="text-sm md:text-base font-medium text-gray-700">
            Pertanyaan {currentQuestion + 1} dari {totalQuestions}
          </span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {currentMilestone && (
            <motion.div
              key={currentMilestone.label}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className={`flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full`}
            >
              <currentMilestone.icon className={`w-4 h-4 ${currentMilestone.color}`} />
              <span className={`text-xs font-semibold ${currentMilestone.color}`}>
                {currentMilestone.label}
              </span>
            </motion.div>
          )}
          <span className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
            {Math.round(progress)}%
          </span>
        </motion.div>
      </div>
      
      {/* 3D Progress Bar Container */}
      <div className="relative">
        <motion.div 
          className="h-4 md:h-5 bg-gray-200 rounded-full overflow-hidden shadow-inner relative"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(10deg)'
          }}
        >
          {/* Batik Pattern Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
              <pattern id="progress-batik" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2" fill="#E5E7EB" />
              </pattern>
              <rect width="100" height="20" fill="url(#progress-batik)" />
            </svg>
          </div>

          {/* Animated Progress Fill */}
          <motion.div
            className="h-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500" />
            
            {/* Animated Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            
            {/* Wave Pattern */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 0%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                backgroundSize: '20px 20px'
              }}
            />
          </motion.div>

          {/* Keris Progress Indicator */}
          {!isMobile && <KerisProgress progress={progress} />}
        </motion.div>

        {/* 3D Shadow Effect */}
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-2 bg-black/10 blur-md rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
      
      {/* Milestone Badges */}
      <div className="relative mt-8 mb-2">
        <div className="flex justify-between items-center px-2">
          {milestones.map((milestone, index) => (
            <MilestoneBadge
              key={milestone.at}
              milestone={milestone}
              achieved={progress >= milestone.at}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Progress Labels with 3D Effect */}
      <motion.div 
        className="flex justify-between mt-12 text-xs md:text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span 
          className="flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <Award className="w-3 h-3 md:w-4 md:h-4" />
          Mulai
        </motion.span>
        <motion.span 
          className="flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
        >
          <Trophy className="w-3 h-3 md:w-4 md:h-4" />
          Selesai
        </motion.span>
      </motion.div>

      {/* Motivational Message */}
      <AnimatePresenceFallback>
        {progress > 0 && progress < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mt-4"
          >
            <motion.p 
              className="text-xs md:text-sm text-gray-600 font-medium"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress < 25 && "🚀 Awal yang bagus! Terus semangat!"}
              {progress >= 25 && progress < 50 && "💪 Kamu sudah separuh jalan!"}
              {progress >= 50 && progress < 75 && "🔥 Luar biasa! Tinggal sedikit lagi!"}
              {progress >= 75 && progress < 100 && "🏆 Hampir selesai! Ayo selesaikan!"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresenceFallback>
    </motion.div>
  )
}
