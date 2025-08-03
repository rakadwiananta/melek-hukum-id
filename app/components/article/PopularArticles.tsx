'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import ArticleCard from '@/app/components/article/ArticleCard'
import { TrendingUp } from 'lucide-react'

interface PopularArticlesProps {
  limit?: number
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  published_at: string
  view_count: number
  category?: string
  author?: string
}

export default function PopularArticles({ limit = 5 }: PopularArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularArticles = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles
            .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
            .slice(0, limit)
          setArticles(mockData)
          return
        }
        
        const { data, error } = await supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.order('view_count', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (error) {
          console.error('Error fetching popular articles:', error)
          // Fallback to mock data
          const mockData = mockArticles
            .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
            .slice(0, limit)
          setArticles(mockData)
          return
        }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching popular articles:', error)
        // Fallback to mock data
        const mockData = mockArticles
          .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
          .slice(0, limit)
        setArticles(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularArticles()
  }, [limit])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Artikel Populer</h3>
        </div>
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Artikel Populer</h3>
      </div>
      
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                <a href={`/artikel/${article.slug}`}>
                  {article.title}
                </a>
              </h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <span>{article.view_count.toLocaleString()} views</span>
                <span>•</span>
                <span>{article.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 