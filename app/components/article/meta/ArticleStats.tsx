'use client'

import { FileText, Eye, ThumbsUp, Users, TrendingUp, RefreshCw } from 'lucide-react'
import { useRealTimeStats } from '@/app/hooks/useRealTimeStats'

interface ArticleStatsProps {
  className?: string
}

export default function ArticleStats({ className = '' }: ArticleStatsProps) {
  const { stats, loading, error, lastUpdate, refetch } = useRealTimeStats()

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Statistik Artikel</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    console.warn('ArticleStats error:', error)
  }

  // Ensure stats are always valid
  const validStats = {
    totalArticles: Math.max(0, stats.totalArticles),
    totalViews: Math.max(0, stats.totalViews),
    totalLikes: Math.max(0, stats.totalLikes),
    totalAuthors: Math.max(0, stats.totalAuthors),
    averageViews: Math.max(0, stats.averageViews)
  }

  const statItems = [
    {
      icon: FileText,
      label: 'Total Artikel',
      value: validStats.totalArticles.toLocaleString(),
      color: 'text-blue-600'
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: validStats.totalViews.toLocaleString(),
      color: 'text-green-600'
    },
    {
      icon: ThumbsUp,
      label: 'Total Likes',
      value: validStats.totalLikes.toLocaleString(),
      color: 'text-red-600'
    },
    {
      icon: Users,
      label: 'Penulis',
      value: validStats.totalAuthors.toLocaleString(),
      color: 'text-purple-600'
    }
  ]

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Statistik Artikel</h3>
        </div>
        <button
          onClick={refetch}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
          title="Refresh data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      {/* Real-time indicator */}
      <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Data real-time</span>
        {lastUpdate && (
          <span className="text-gray-400">
            • Terakhir update: {lastUpdate.toLocaleTimeString('id-ID')}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems.map((item, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-3 ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold text-gray-900 mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1 font-medium">Rata-rata Views per Artikel</div>
          <div className="text-2xl font-bold text-blue-600">
            {validStats.averageViews.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
} 