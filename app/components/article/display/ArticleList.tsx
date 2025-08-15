'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FilterState } from '@/app/components/article/meta/CategoryFilter'
import { getArticles } from '@/app/lib/articles'
import { RobustArticleCardImage } from '@/app/components/ui/RobustArticleImage'
import { motion } from 'framer-motion'

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
  const [loading, setLoading] = useState(false)
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

  if (articles.length === 0 && !loading) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Tag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada artikel ditemukan</h3>
            <p className="text-gray-600">Coba ubah filter pencarian atau kata kunci yang berbeda.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{headerTitle}</h2>
        </div>
      )}
      
      {/* Article Grid - Improved symmetry */}
      <div className="space-y-6">
        {articles.map((article, index) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Better proportions */}
              <div className="md:w-80 md:flex-shrink-0">
                <div className="relative h-48 md:h-full w-full">
                  <RobustArticleCardImage
                    src={article.featured_image}
                    alt={article.title}
                    category={article.category}
                    className="object-cover w-full h-full"
                    priority={index < 3}
                    index={index}
                  />
                  {/* Category Badge */}
                  {article.category && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-black/70 backdrop-blur-sm rounded-full">
                        <Tag className="h-3 w-3" />
                        {article.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Content Section - Better spacing and alignment */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Title */}
                  <Link 
                    href={`/artikel/${article.slug}`}
                    className="block group-hover:text-amber-600 transition-colors"
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                  </Link>
                  
                  {/* Excerpt */}
                  <p className="text-gray-600 line-clamp-3 text-base leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                
                {/* Meta Information - Better aligned */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      {/* Author */}
                      {article.author && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          <span className="font-medium">{article.author}</span>
                        </span>
                      )}
                      
                      {/* Date */}
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <time dateTime={article.published_at}>
                          {formatDate(article.published_at)}
                        </time>
                      </span>
                      
                      {/* Views */}
                      <span className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span>{article.view_count.toLocaleString()} views</span>
                      </span>
                    </div>
                    
                    {/* Read More Button */}
                    <Link 
                      href={`/artikel/${article.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-brown-500 text-white rounded-full hover:from-amber-600 hover:to-brown-600 transition-all duration-300 font-semibold text-sm group-hover:scale-105 whitespace-nowrap"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Load More Button - Better styling */}
      {showLoadMore && hasMore && (
        <div className="text-center pt-8">
          <motion.button
            onClick={handleLoadMore}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Memuat...</span>
              </>
            ) : (
              <>
                <span>Muat Lebih Banyak</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </div>
  )
} 