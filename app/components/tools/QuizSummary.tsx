'use client'

import { motion } from 'framer-motion'
import { quizData } from './QuizData'

interface QuizSummaryProps {
  answers: number[]
  className?: string
}

export default function QuizSummary({ answers, className = '' }: QuizSummaryProps) {
  const getCategoryStats = () => {
    const categories = ['korupsi', 'gratifikasi', 'suap', 'penyalahgunaan']
    const stats = categories.map(category => {
      const categoryQuestions = quizData.filter(q => q.category === category)
      const correctAnswers = categoryQuestions.filter((q, index) => {
        const globalIndex = quizData.findIndex(question => question.id === q.id)
        return answers[globalIndex] === q.correctAnswer
      }).length
      
      return {
        category,
        total: categoryQuestions.length,
        correct: correctAnswers,
        percentage: Math.round((correctAnswers / categoryQuestions.length) * 100)
      }
    })
    
    return stats.filter(stat => stat.total > 0)
  }

  const getDifficultyStats = () => {
    const difficulties = ['easy', 'medium', 'hard']
    const stats = difficulties.map(difficulty => {
      const difficultyQuestions = quizData.filter(q => q.difficulty === difficulty)
      const correctAnswers = difficultyQuestions.filter((q, index) => {
        const globalIndex = quizData.findIndex(question => question.id === q.id)
        return answers[globalIndex] === q.correctAnswer
      }).length
      
      return {
        difficulty,
        total: difficultyQuestions.length,
        correct: correctAnswers,
        percentage: Math.round((correctAnswers / difficultyQuestions.length) * 100)
      }
    })
    
    return stats.filter(stat => stat.total > 0)
  }

  const categoryStats = getCategoryStats()
  const difficultyStats = getDifficultyStats()

  const getCategoryColor = (category: string) => {
    const colors = {
      korupsi: 'bg-red-100 text-red-800',
      gratifikasi: 'bg-blue-100 text-blue-800',
      suap: 'bg-orange-100 text-orange-800',
      penyalahgunaan: 'bg-purple-100 text-purple-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Performa berdasarkan Kategori</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryStats.map((stat, index) => (
            <motion.div
              key={stat.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(stat.category)}`}>
                  {stat.category.toUpperCase()}
                </span>
                <span className="text-sm text-gray-600">
                  {stat.correct}/{stat.total}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{stat.percentage}%</div>
                <div className="text-xs text-gray-500">Akurasi</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Difficulty Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Performa berdasarkan Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficultyStats.map((stat, index) => (
            <motion.div
              key={stat.difficulty}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center p-4 rounded-lg border"
            >
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getDifficultyColor(stat.difficulty)}`}>
                {stat.difficulty.toUpperCase()}
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.percentage}%</div>
              <div className="text-sm text-gray-600">
                {stat.correct}/{stat.total} benar
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 