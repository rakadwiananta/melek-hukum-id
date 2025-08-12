'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FilterState } from '@/app/components/article/meta/CategoryFilter'
import { getArticles } from '@/app/lib/articles'

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
  const [loading, setLoading] = useState(true)
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
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <div className="relative w-20 h-20">
                  <Image
                    src={article.featured_image || '/timbangkan.jpg'}
                    alt={article.title}
                    fill
                    className="object-cover"
                    loading="eager"
                    fetchPriority="high"
                    sizes="80px"
                  />
                </div>
              </div>
              
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