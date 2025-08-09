'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ArticleListProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
  showLoadMore?: boolean
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

export default function ArticleList({ 
  category, 
  limit = 10, 
  showHeader = false,
  headerTitle = 'Daftar Artikel',
  showLoadMore = false
}: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const fetchArticles = async (pageNum: number = 0) => {
    try {
      setLoading(true)
      
      // If Supabase is not configured, use mock data
      if (!supabase) {
        const mockData = mockArticles
          .filter(article => !category || article.category === category)
          .slice(pageNum * limit, (pageNum + 1) * limit)
        
        if (pageNum === 0) {
          setArticles(mockData)
        } else {
          setArticles(prev => [...prev, ...mockData])
        }
        
        setHasMore(mockData.length === limit)
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
        // Fallback to mock data on error
        const mockData = mockArticles
          .filter(article => !category || article.category === category)
          .slice(pageNum * limit, (pageNum + 1) * limit)
        
        if (pageNum === 0) {
          setArticles(mockData)
        } else {
          setArticles(prev => [...prev, ...mockData])
        }
        
        setHasMore(mockData.length === limit)
        return
      }

      if (data) {
        if (pageNum === 0) {
          setArticles(data)
        } else {
          setArticles(prev => [...prev, ...data])
        }
        
        setHasMore(data.length === limit)
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      // Fallback to mock data on error
      const mockData = mockArticles
        .filter(article => !category || article.category === category)
        .slice(pageNum * limit, (pageNum + 1) * limit)
      
      if (pageNum === 0) {
        setArticles(mockData)
      } else {
        setArticles(prev => [...prev, ...mockData])
      }
      
      setHasMore(mockData.length === limit)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [category, limit])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchArticles(nextPage)
  }

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
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
      
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex items-start gap-4">
              {article.featured_image && (
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {article.category && (
                    <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      <Tag className="h-3 w-3 mr-1" />
                      {article.category}
                    </span>
                  )}
                  <time dateTime={article.published_at} className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(article.published_at)}
                  </time>
                </div>
                
                <Link href={`/artikel/${article.slug}`}>
                  <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{article.author}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.view_count.toLocaleString()}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/artikel/${article.slug}`}
                    className="flex items-center gap-1 text-primary hover:text-primary-600 text-sm font-medium"
                  >
                    Baca Artikel
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showLoadMore && hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
          </button>
        </div>
      )}
    </div>
  )
} 