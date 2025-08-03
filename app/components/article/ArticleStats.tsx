'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { FileText, Eye, ThumbsUp, Users, TrendingUp } from 'lucide-react'

interface ArticleStatsProps {
  className?: string
}

interface Stats {
  totalArticles: number
  totalViews: number
  totalLikes: number
  totalAuthors: number
  averageViews: number
}

export default function ArticleStats({ className = '' }: ArticleStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    totalAuthors: 0,
    averageViews: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles
          const totalArticles = mockData.length
          const totalViews = mockData.reduce((sum, article) => sum + (article.view_count || 0), 0)
          const totalLikes = mockData.reduce((sum, article) => sum + (article.like_count || 0), 0)
          const uniqueAuthors = new Set(mockData.map(article => article.author).filter(Boolean))
          const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

          setStats({
            totalArticles,
            totalViews,
            totalLikes,
            totalAuthors: uniqueAuthors.size,
            averageViews
          })
          return
        }
        
        const { data, error } = await supabase
          ?.from('articles')
          ?.select('view_count, like_count, comment_count, author')
          ?.not('view_count', 'is', null) || { data: null, error: null }

        if (error) {
          console.error('Error fetching stats:', error)
          // Fallback to mock data
          const mockData = mockArticles
          const totalArticles = mockData.length
          const totalViews = mockData.reduce((sum, article) => sum + (article.view_count || 0), 0)
          const totalLikes = mockData.reduce((sum, article) => sum + (article.like_count || 0), 0)
          const uniqueAuthors = new Set(mockData.map(article => article.author).filter(Boolean))
          const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

          setStats({
            totalArticles,
            totalViews,
            totalLikes,
            totalAuthors: uniqueAuthors.size,
            averageViews
          })
          return
        }

        if (data) {
          const totalArticles = data.length
          const totalViews = data.reduce((sum, article) => sum + (article.view_count || 0), 0)
          const totalLikes = data.reduce((sum, article) => sum + (article.like_count || 0), 0)
          const uniqueAuthors = new Set(data.map(article => article.author).filter(Boolean))
          const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

          setStats({
            totalArticles,
            totalViews,
            totalLikes,
            totalAuthors: uniqueAuthors.size,
            averageViews
          })
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback to mock data
        const mockData = mockArticles
        const totalArticles = mockData.length
        const totalViews = mockData.reduce((sum, article) => sum + (article.view_count || 0), 0)
        const totalLikes = mockData.reduce((sum, article) => sum + (article.like_count || 0), 0)
        const uniqueAuthors = new Set(mockData.map(article => article.author).filter(Boolean))
        const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

        setStats({
          totalArticles,
          totalViews,
          totalLikes,
          totalAuthors: uniqueAuthors.size,
          averageViews
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const statItems = [
    {
      icon: FileText,
      label: 'Total Artikel',
      value: stats.totalArticles.toLocaleString(),
      color: 'text-blue-600'
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      color: 'text-green-600'
    },
    {
      icon: ThumbsUp,
      label: 'Total Likes',
      value: stats.totalLikes.toLocaleString(),
      color: 'text-red-600'
    },
    {
      icon: Users,
      label: 'Penulis',
      value: stats.totalAuthors.toLocaleString(),
      color: 'text-purple-600'
    }
  ]

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Statistik Artikel</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3 ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-600">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Rata-rata Views per Artikel</div>
          <div className="text-2xl font-bold text-primary">
            {stats.averageViews.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  )
} 