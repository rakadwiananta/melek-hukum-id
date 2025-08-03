'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award } from 'lucide-react'

interface LeaderboardEntry {
  name: string
  score: number
  time: number
  date: string
}

interface QuizLeaderboardProps {
  currentScore: number
  currentTime: number
  className?: string
}

export default function QuizLeaderboard({ currentScore, currentTime, className = '' }: QuizLeaderboardProps) {
  // Mock data untuk leaderboard
  const leaderboardData: LeaderboardEntry[] = [
    { name: 'Ahmad S.', score: 100, time: 540, date: '2024-01-15' },
    { name: 'Siti M.', score: 95, time: 600, date: '2024-01-14' },
    { name: 'Budi K.', score: 90, time: 480, date: '2024-01-13' },
    { name: 'Dewi L.', score: 85, time: 720, date: '2024-01-12' },
    { name: 'Rudi P.', score: 80, time: 660, date: '2024-01-11' },
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />
    if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />
    if (index === 2) return <Award className="w-5 h-5 text-orange-500" />
    return <span className="w-5 h-5 text-gray-400 text-sm font-bold">{index + 1}</span>
  }

  const getCurrentRank = () => {
    const currentEntry = { score: currentScore, time: currentTime }
    const allEntries = [...leaderboardData, currentEntry]
    allEntries.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score
      return a.time - b.time
    })
    
    return allEntries.findIndex(entry => entry.score === currentScore && entry.time === currentTime) + 1
  }

  const currentRank = getCurrentRank()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
      
      {/* Current Performance */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-primary">Skor Anda</h4>
            <p className="text-sm text-gray-600">
              {currentScore}% • {formatTime(currentTime)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">#{currentRank}</div>
            <div className="text-xs text-gray-500">Ranking</div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {leaderboardData.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              index === 0 ? 'bg-yellow-50 border-yellow-200' :
              index === 1 ? 'bg-gray-50 border-gray-200' :
              index === 2 ? 'bg-orange-50 border-orange-200' :
              'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(index)}
              </div>
              <div>
                <div className="font-medium text-gray-800">{entry.name}</div>
                <div className="text-xs text-gray-500">{entry.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-800">{entry.score}%</div>
              <div className="text-xs text-gray-500">{formatTime(entry.time)}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 text-xl">🏆</div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">Tips Meningkatkan Ranking</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Pelajari materi anti-korupsi secara rutin</li>
              <li>• Latih kecepatan menjawab dengan tetap akurat</li>
              <li>• Ikuti kuis secara berkala untuk mengukur progress</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 