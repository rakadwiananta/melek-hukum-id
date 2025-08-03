'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface QuizTimerProps {
  duration: number // dalam detik
  onTimeUp: () => void
  className?: string
}

export default function QuizTimer({ duration, onTimeUp, className = '' }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  useEffect(() => {
    if (timeLeft <= 10) {
      setIsWarning(true)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <svg
          className={`w-5 h-5 ${isWarning ? 'text-red-500' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          className={`font-mono text-lg font-bold ${
            isWarning ? 'text-red-500' : 'text-gray-700'
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>
      
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${isWarning ? 'bg-red-500' : 'bg-primary'}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
} 