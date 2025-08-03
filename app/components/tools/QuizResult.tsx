'use client'

import { motion } from 'framer-motion'
import { Trophy, Award, Target, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface QuizResultProps {
  score: number
  totalQuestions: number
  correctAnswers: number
  onRestart: () => void
}

export default function QuizResult({
  score,
  totalQuestions,
  correctAnswers,
  onRestart
}: QuizResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A', message: 'Luar biasa! Anda sangat paham tentang anti-korupsi.' }
    if (percentage >= 80) return { grade: 'B', message: 'Bagus! Pemahaman Anda tentang anti-korupsi sudah baik.' }
    if (percentage >= 70) return { grade: 'C', message: 'Cukup baik! Terus tingkatkan pemahaman Anda.' }
    if (percentage >= 60) return { grade: 'D', message: 'Perlu belajar lebih banyak tentang anti-korupsi.' }
    return { grade: 'E', message: 'Jangan menyerah! Mari belajar lagi tentang anti-korupsi.' }
  }

  const { grade, message } = getGrade()
  
  const getIcon = () => {
    if (percentage >= 80) return Trophy
    if (percentage >= 60) return Award
    return Target
  }
  
  const Icon = getIcon()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      {/* Icon */}
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="inline-flex"
      >
        <div className={`p-6 rounded-full ${
          percentage >= 80 ? 'bg-yellow-100' : 
          percentage >= 60 ? 'bg-gray-100' : 
          'bg-blue-100'
        }`}>
          <Icon className={`h-16 w-16 ${
            percentage >= 80 ? 'text-yellow-600' : 
            percentage >= 60 ? 'text-gray-600' : 
            'text-blue-600'
          }`} />
        </div>
      </motion.div>

      {/* Score */}
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-6xl font-bold text-primary mb-2"
        >
          {percentage}%
        </motion.div>
        <p className="text-lg text-muted-foreground">
          {correctAnswers} dari {totalQuestions} jawaban benar
        </p>
      </div>

      {/* Grade */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="text-4xl font-bold mb-2">Grade: {grade}</div>
        <p className="text-muted-foreground">{message}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
          <div className="text-sm text-green-700">Benar</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
          <div className="text-sm text-red-700">Salah</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-sm text-blue-700">Skor</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
          Coba Lagi
        </button>
        <Link
          href="/anti-korupsi"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
        >
          Pelajari Anti-Korupsi
        </Link>
      </div>

      {/* Share */}
      <div className="pt-4">
        <p className="text-sm text-muted-foreground mb-3">Bagikan hasil Anda:</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const text = `Saya mendapat skor ${percentage}% di Kuis Anti-Korupsi Melek Hukum ID! Ayo test pengetahuan anti-korupsi Anda!`
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank')
              }
            }}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            aria-label="Share on Twitter"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const text = `Saya mendapat skor ${percentage}% di Kuis Anti-Korupsi Melek Hukum ID! Ayo test pengetahuan anti-korupsi Anda!`
                window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.href)}`, '_blank')
              }
            }}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            aria-label="Share on WhatsApp"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const text = `Saya mendapat skor ${percentage}% di Kuis Anti-Korupsi Melek Hukum ID!`
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`, '_blank')
              }
            }}
            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            aria-label="Share on Facebook"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
