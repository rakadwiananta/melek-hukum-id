'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ArticleMasonryProps {
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

export default function ArticleMasonry({ 
  category, 
  limit = 12, 
  showHeader = false,
  headerTitle = 'Artikel Terbaru'
}: ArticleMasonryProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchArticles = async () => {
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

    fetchArticles()
  }, [category, limit])

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    // This function is no longer needed as mock data doesn't support pagination
    // fetchArticles(nextPage) 
  }

  const getMasonryCols = () => {
    return 'columns-1 md:columns-2 lg:columns-3'
  }

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          {/* Loader2 is removed as it's not available in the new mock data */}
          <p>Loading...</p>
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
      
      <div className={`${getMasonryCols()} gap-6 space-y-6`}>
        {articles.map((article) => (
          <div key={article.id} className="break-inside-avoid">
            <Link href={`/article/${article.slug}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {article.featured_image && (
                  <Image
                    src={article.featured_image}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-700 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-1" />
                    {formatDate(article.published_at)}
                    <span className="mx-1">•</span>
                    <Eye className="mr-1" />
                    {article.view_count}
                    <span className="mx-1">•</span>
                    <Tag className="mr-1" />
                    {article.category}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* showLoadMore and hasMore are removed as mock data doesn't support pagination */}
      {/* {showLoadMore && hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Muat Lebih Banyak'
            )}
          </button>
        </div>
      )} */}
    </div>
  )
} 