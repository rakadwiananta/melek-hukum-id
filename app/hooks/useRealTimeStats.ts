'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/lib/supabase'

interface RealTimeStats {
  totalArticles: number
  totalViews: number
  totalLikes: number
  totalAuthors: number
  averageViews: number
}

const REFRESH_INTERVAL = 30000 // 30 seconds

export function useRealTimeStats() {
  const [stats, setStats] = useState<RealTimeStats>({
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    totalAuthors: 0,
    averageViews: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      if (!supabase) {
        // Use mock data with some realistic numbers for demo
        const mockStats = {
          totalArticles: 13,
          totalViews: 6953,
          totalLikes: 399,
          totalAuthors: 4,
          averageViews: 535
        }
        setStats(mockStats)
        setLastUpdate(new Date())
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('articles')
        .select('view_count, like_count, share_count, author')
        .eq('status', 'published')

      if (error) {
        console.warn('Supabase error:', error)
        throw error
      }

      const articles = data || []
      const totalArticles = articles.length
      const totalViews = articles.reduce((sum: number, article: any) => sum + (Number(article.view_count) || 0), 0)
      const totalLikes = articles.reduce((sum: number, article: any) => sum + (Number(article.like_count) || 0), 0)
      const uniqueAuthors = new Set(articles.map((article: any) => article.author).filter(Boolean))
      const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

      setStats({
        totalArticles,
        totalViews,
        totalLikes,
        totalAuthors: uniqueAuthors.size,
        averageViews
      })
      setError(null)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching stats:', error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
      
      // Fallback to mock data on error
      setStats({
        totalArticles: 13,
        totalViews: 6953,
        totalLikes: 399,
        totalAuthors: 4,
        averageViews: 535
      })
      setLastUpdate(new Date())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    fetchStats()

    // Set up interval for real-time updates
    const interval = setInterval(fetchStats, REFRESH_INTERVAL)

    // Set up Supabase real-time subscription if available
    let subscription: any = null
    if (supabase) {
      subscription = supabase
        .channel('article_changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'articles' 
          }, 
          () => {
            // Refetch stats when articles change
            fetchStats()
          }
        )
        .subscribe()
    }

    return () => {
      clearInterval(interval)
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    lastUpdate,
    refetch: fetchStats
  }
}