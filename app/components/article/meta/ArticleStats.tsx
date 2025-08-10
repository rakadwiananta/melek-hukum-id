'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          setStats({
            totalArticles: 0,
            totalViews: 0,
            totalLikes: 0,
            totalAuthors: 0,
            averageViews: 0
          })
          return
        }
        
        // Try to fetch from Supabase with better error handling
        let supabaseData = null as any[] | null
        let supabaseError: any = null
        
        try {
          const { data, error } = await supabase
            .from('articles')
            .select('view_count, like_count, share_count, author')
            .eq('status', 'published')
          
          if (error) {
            supabaseError = error
            console.warn('Supabase error:', error)
          } else {
            supabaseData = data || []
          }
        } catch (err) {
          supabaseError = err instanceof Error ? err : new Error('Unknown error')
          console.warn('Supabase catch error:', err)
        }

        if (supabaseError || !supabaseData || supabaseData.length === 0) {
          console.log('Using mock data due to Supabase error or no data')
          setError(supabaseError ? (supabaseError as Error).message : 'No data available')
          // Fallback to mock data
          setStats({
            totalArticles: 0,
            totalViews: 0,
            totalLikes: 0,
            totalAuthors: 0,
            averageViews: 0
          })
          return
        }

        // Process Supabase data with validation
        const validData = Array.isArray(supabaseData) ? supabaseData : []
        console.log('Processing stats data:', { 
          totalRecords: validData.length, 
          sampleRecord: validData[0] 
        })
        
        const totalArticles = validData.length
        const totalViews = validData.reduce((sum, article) => sum + (Number(article.view_count) || 0), 0)
        const totalLikes = validData.reduce((sum, article) => sum + (Number(article.like_count) || 0), 0)
        const uniqueAuthors = new Set(validData.map(article => article.author).filter(Boolean))
        const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

        setStats({
          totalArticles,
          totalViews,
          totalLikes,
          totalAuthors: uniqueAuthors.size,
          averageViews
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setError(error instanceof Error ? error.message : 'Unknown error occurred')
        // Fallback to mock data
        setStats({
          totalArticles: 0,
          totalViews: 0,
          totalLikes: 0,
          totalAuthors: 0,
          averageViews: 0
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

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
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Statistik Artikel</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {statItems.map((item, index) => (
          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
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