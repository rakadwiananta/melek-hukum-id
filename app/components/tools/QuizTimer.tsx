'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface QuizTimerProps {
  duration: number // dalam detik
  onTimeUp: () => void
  className?: string
}

export default function QuizTimer({ duration, onTimeUp, className = '' }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isWarning, setIsWarning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onTimeUpRef = useRef(onTimeUp)

  // Update the ref when onTimeUp changes to avoid stale closures
  useEffect(() => {
    onTimeUpRef.current = onTimeUp
  }, [onTimeUp])

  // Memoized time up handler to prevent recreation
  const handleTimeUp = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    onTimeUpRef.current()
  }, [])

  // Single timer effect - much more efficient
  useEffect(() => {
    // Reset timer when duration changes
    setTimeLeft(duration)
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Start new timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        
        // Update warning state efficiently
        if (newTime <= 10 && !isWarning) {
          setIsWarning(true)
        } else if (newTime > 10 && isWarning) {
          setIsWarning(false)
        }
        
        // Handle time up
        if (newTime <= 0) {
          handleTimeUp()
          return 0
        }
        
        return newTime
      })
    }, 1000)

    // Cleanup on unmount or duration change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [duration, handleTimeUp, isWarning])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(Math.max(0, seconds) / 60)
    const secs = Math.max(0, seconds) % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <svg
          className={`w-5 h-5 transition-colors duration-200 ${isWarning ? 'text-red-500' : 'text-gray-600'}`}
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
          className={`font-mono text-lg font-bold transition-colors duration-200 ${
            isWarning ? 'text-red-500' : 'text-gray-700'
          }`}
        >
          {formatTime(timeLeft)}
        </span>
      </div>
      
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${isWarning ? 'bg-red-500' : 'bg-blue-600'}`}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
    </div>
  )
} 