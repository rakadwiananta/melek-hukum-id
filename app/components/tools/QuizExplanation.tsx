'use client'

import { motion } from 'framer-motion'

interface QuizExplanationProps {
  isCorrect: boolean
  explanation: string
  correctAnswer: string
  userAnswer: string
  onContinue: () => void
  className?: string
}

export default function QuizExplanation({
  isCorrect,
  explanation,
  correctAnswer,
  userAnswer,
  onContinue,
  className = ''
}: QuizExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mt-6 p-6 rounded-lg border-2 ${
        isCorrect
          ? 'border-green-200 bg-green-50'
          : 'border-red-200 bg-red-50'
      } ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isCorrect ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {isCorrect ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <h3 className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
          {isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah'}
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Jawaban Anda:</p>
          <p className="text-gray-600">{userAnswer}</p>
        </div>

        {!isCorrect && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Jawaban Benar:</p>
            <p className="text-green-700 font-medium">{correctAnswer}</p>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Penjelasan:</p>
          <p className="text-gray-600 leading-relaxed">{explanation}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContinue}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Lanjutkan
      </motion.button>
    </motion.div>
  )
} 