'use client'

import { motion } from 'framer-motion'

interface QuizStatsProps {
  score: number
  totalQuestions: number
  timeSpent: number // dalam detik
  className?: string
}

export default function QuizStats({ score, totalQuestions, timeSpent, className = '' }: QuizStatsProps) {
  const accuracy = Math.round((score / totalQuestions) * 100)
  const averageTime = Math.round(timeSpent / totalQuestions)
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (accuracy >= 80) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (accuracy >= 70) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Need Improvement', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const performance = getPerformanceLevel()

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-md border"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">{score}/{totalQuestions}</div>
          <div className="text-sm text-gray-600">Skor</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md border"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{accuracy}%</div>
          <div className="text-sm text-gray-600">Akurasi</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md border"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{formatTime(timeSpent)}</div>
          <div className="text-sm text-gray-600">Total Waktu</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-3 bg-white p-6 rounded-lg shadow-md border"
      >
        <div className="text-center">
          <div className={`inline-block px-4 py-2 rounded-full ${performance.bg} ${performance.color} font-semibold mb-2`}>
            {performance.level}
          </div>
          <div className="text-sm text-gray-600">
            Rata-rata waktu per pertanyaan: {formatTime(averageTime)}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 