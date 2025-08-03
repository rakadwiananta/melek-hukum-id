'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ArticleCompactProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
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

export default function ArticleCompact({ 
  category, 
  limit = 10, 
  showHeader = false,
  headerTitle = 'Daftar Artikel'
}: ArticleCompactProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompactArticles = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles
            .filter(article => !category || article.category === category)
            .slice(0, limit)
          setArticles(mockData)
          return
        }
        
        let query = supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.order('published_at', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
          console.error('Error fetching articles:', error)
          // Fallback to mock data
          const mockData = mockArticles
            .filter(article => !category || article.category === category)
            .slice(0, limit)
          setArticles(mockData)
          return
        }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
        // Fallback to mock data
        const mockData = mockArticles
          .filter(article => !category || article.category === category)
          .slice(0, limit)
        setArticles(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchCompactArticles()
  }, [category, limit])

  if (loading) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="space-y-3">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">{headerTitle}</h2>
        </div>
      )}
      
      <div className="space-y-3">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            {article.featured_image && (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <Link href={`/artikel/${article.slug}`}>
                <h3 className="font-medium text-sm hover:text-primary transition-colors line-clamp-1">
                  {article.title}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                {article.category && (
                  <span className="inline-flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {article.category}
                  </span>
                )}
                <time dateTime={article.published_at} className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(article.published_at)}
                </time>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.view_count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 