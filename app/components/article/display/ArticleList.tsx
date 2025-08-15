'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FilterState } from '@/app/components/article/meta/CategoryFilter'
import { getArticles } from '@/app/lib/articles'
import { RobustArticleCardImage } from '@/app/components/ui/RobustArticleImage'

interface ArticleListProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
  showLoadMore?: boolean
  searchQuery?: string
  filters?: FilterState
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
  showLoadMore = false,
  searchQuery = '',
  filters = {
    category: null,
    author: null,
    sortBy: 'newest',
    dateRange: 'all'
  }
}: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false) // Changed from true to false
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const fetchArticles = async (pageNum: number = 0) => {
    try {
      setLoading(true)

      const result = await getArticles({
        category: category || filters.category,
        author: filters.author,
        limit,
        page: pageNum,
        searchQuery,
        sortBy: filters.sortBy,
      })

      if (pageNum === 0) {
        setArticles(result as any)
      } else {
        setArticles((prev) => [...prev, ...(result as any)])
      }

      setHasMore(result.length === limit)
      return
    } catch (error) {
      console.error('Error fetching articles:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(0)
    fetchArticles(0)
  }, [category, limit, searchQuery, filters])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchArticles(nextPage)
  }

  // Removed loading skeleton - show empty state or articles immediately
  if (articles.length === 0 && !loading) {
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
        {articles.map((article, index) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <div className="relative w-20 h-20">
                  <RobustArticleCardImage
                    src={article.featured_image}
                    alt={article.title}
                    category={article.category}
                    className="object-cover"
                    priority={index < 3}
                    index={index}
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {article.category && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">
                      <Tag className="h-3 w-3" />
                      {article.category}
                    </span>
                  )}
                </div>
                
                <Link 
                  href={`/artikel/${article.slug}`}
                  className="block group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(article.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {article.view_count.toLocaleString()}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/artikel/${article.slug}`}
                    className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors font-medium"
                  >
                    Baca
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
          </button>
        </div>
      )}
    </div>
  )
} 