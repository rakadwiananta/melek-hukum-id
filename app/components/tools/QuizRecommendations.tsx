'use client'

import { motion } from 'framer-motion'
import { quizData } from './QuizData'

interface QuizRecommendationsProps {
  answers: number[]
  className?: string
}

export default function QuizRecommendations({ answers, className = '' }: QuizRecommendationsProps) {
  const getWeakCategories = () => {
    const categories = ['korupsi', 'gratifikasi', 'suap', 'penyalahgunaan']
    const weakCategories = categories.filter(category => {
      const categoryQuestions = quizData.filter(q => q.category === category)
      const correctAnswers = categoryQuestions.filter((q, index) => {
        const globalIndex = quizData.findIndex(question => question.id === q.id)
        return answers[globalIndex] === q.correctAnswer
      }).length
      
      return (correctAnswers / categoryQuestions.length) < 0.7 // Kurang dari 70%
    })
    
    return weakCategories
  }

  const getRecommendations = () => {
    const weakCategories = getWeakCategories()
    const recommendations = []

    if (weakCategories.includes('korupsi')) {
      recommendations.push({
        title: 'Pelajari Dasar-Dasar Korupsi',
        description: 'Pahami definisi, jenis-jenis, dan dampak korupsi dalam kehidupan bermasyarakat.',
        link: '/anti-korupsi',
        icon: '🏛️'
      })
    }

    if (weakCategories.includes('gratifikasi')) {
      recommendations.push({
        title: 'Pahami Aturan Gratifikasi',
        description: 'Pelajari kapan gratifikasi diperbolehkan dan kapan harus dilaporkan ke KPK.',
        link: '/artikel/gratifikasi-dalam-pelayanan-publik',
        icon: '🎁'
      })
    }

    if (weakCategories.includes('suap')) {
      recommendations.push({
        title: 'Kenali Bentuk-Bentuk Suap',
        description: 'Pelajari berbagai modus suap dan cara melaporkannya.',
        link: '/artikel/modus-suap-dalam-pengadaan',
        icon: '💰'
      })
    }

    if (weakCategories.includes('penyalahgunaan')) {
      recommendations.push({
        title: 'Penyalahgunaan Wewenang',
        description: 'Pahami batasan penggunaan wewenang dan fasilitas negara.',
        link: '/artikel/penyalahgunaan-wewenang',
        icon: '⚖️'
      })
    }

    // Default recommendations jika semua kategori sudah baik
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Lanjutkan Pembelajaran',
        description: 'Anda sudah memahami dasar-dasar anti-korupsi. Lanjutkan dengan materi yang lebih mendalam.',
        link: '/anti-korupsi',
        icon: '📚'
      })
    }

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-4">Rekomendasi Pembelajaran</h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
          >
            <div className="text-2xl">{rec.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <a
                href={rec.link}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium"
              >
                Pelajari Lebih Lanjut
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Tips Belajar</h4>
            <p className="text-sm text-blue-700">
              Luangkan waktu 15-30 menit setiap hari untuk mempelajari materi anti-korupsi. 
              Praktikkan pengetahuan Anda dalam kehidupan sehari-hari dan ajak keluarga serta teman untuk ikut belajar.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 