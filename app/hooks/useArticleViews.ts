'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/app/lib/supabase'

interface ArticleViewData {
  id: string
  view_count: number
  like_count: number
  title?: string
}

interface UseArticleViewsOptions {
  articleId: string
  autoIncrement?: boolean
  enableRealTime?: boolean
}

export function useArticleViews({ 
  articleId, 
  autoIncrement = true, 
  enableRealTime = true 
}: UseArticleViewsOptions) {
  const [viewData, setViewData] = useState<ArticleViewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasIncrementedView, setHasIncrementedView] = useState(false)

  // Fetch current view data
  const fetchViewData = useCallback(async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}/view`)
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch view data')
      }
      
      if (result.success && result.data) {
        setViewData(result.data)
      }
      setError(null)
    } catch (error) {
      console.error('Error fetching view data:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [articleId])

  // Increment view count
  const incrementView = useCallback(async () => {
    if (hasIncrementedView) return // Prevent multiple increments per session
    
    try {
      const response = await fetch(`/api/articles/${articleId}/view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        setViewData(prev => prev ? {
          ...prev,
          view_count: result.view_count
        } : null)
        setHasIncrementedView(true)
        
        // Store in sessionStorage to prevent multiple increments
        sessionStorage.setItem(`article_viewed_${articleId}`, 'true')
      }
    } catch (error) {
      console.error('Error incrementing view:', error)
    }
  }, [articleId, hasIncrementedView])

  // Setup real-time subscription
  useEffect(() => {
    if (!enableRealTime || !supabase) return

    const channel = supabase
      .channel(`article_${articleId}`)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'articles',
          filter: `id=eq.${articleId}`
        }, 
        (payload) => {
          if (payload.new) {
            setViewData(prev => prev ? {
              ...prev,
              view_count: payload.new.view_count || prev.view_count,
              like_count: payload.new.like_count || prev.like_count
            } : null)
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [articleId, enableRealTime])

  // Initial data fetch and auto-increment
  useEffect(() => {
    fetchViewData()
    
    // Check if already viewed in this session
    const alreadyViewed = sessionStorage.getItem(`article_viewed_${articleId}`)
    if (alreadyViewed) {
      setHasIncrementedView(true)
    }
    
    // Auto-increment view if enabled and not already viewed
    if (autoIncrement && !alreadyViewed) {
      // Delay to ensure user actually views the article
      const timer = setTimeout(() => {
        incrementView()
      }, 3000) // 3 second delay
      
      return () => clearTimeout(timer)
    }
  }, [articleId, autoIncrement, fetchViewData, incrementView])

  return {
    viewData,
    loading,
    error,
    incrementView,
    refetch: fetchViewData,
    hasIncrementedView
  }
}

// Hook for tracking multiple articles (for lists)
export function useArticleListViews(articleIds: string[]) {
  const [viewsData, setViewsData] = useState<Record<string, ArticleViewData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllViewsData = useCallback(async () => {
    try {
      setLoading(true)
      const promises = articleIds.map(async (id) => {
        const response = await fetch(`/api/articles/${id}/view`)
        const result = await response.json()
        return { id, data: result.success ? result.data : null }
      })
      
      const results = await Promise.allSettled(promises)
      const viewsMap: Record<string, ArticleViewData> = {}
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.data) {
          viewsMap[articleIds[index]] = result.value.data
        }
      })
      
      setViewsData(viewsMap)
      setError(null)
    } catch (error) {
      console.error('Error fetching views data:', error)
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [articleIds])

  // Setup real-time subscription for multiple articles
  useEffect(() => {
    if (!supabase || articleIds.length === 0) return

    const channel = supabase
      .channel('articles_list')
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'articles'
        }, 
        (payload) => {
          if (payload.new && articleIds.includes(payload.new.id)) {
            setViewsData(prev => ({
              ...prev,
              [payload.new.id]: {
                id: payload.new.id,
                view_count: payload.new.view_count || 0,
                like_count: payload.new.like_count || 0,
                title: payload.new.title || prev[payload.new.id]?.title
              }
            }))
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [articleIds])

  useEffect(() => {
    if (articleIds.length > 0) {
      fetchAllViewsData()
    }
  }, [articleIds, fetchAllViewsData])

  return {
    viewsData,
    loading,
    error,
    refetch: fetchAllViewsData
  }
}