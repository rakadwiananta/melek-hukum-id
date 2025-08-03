'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ArticleFeaturedProps {
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

export default function ArticleFeatured({ 
  limit = 3, 
  showHeader = false,
  headerTitle = 'Artikel Unggulan'
}: ArticleFeaturedProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles.slice(0, limit)
          setArticles(mockData)
          return
        }
        
        const { data, error } = await supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.eq('featured', true)
          ?.order('published_at', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (error) {
          console.error('Error fetching featured articles:', error)
          // Fallback to mock data
          const mockData = mockArticles.slice(0, limit)
          setArticles(mockData)
          return
        }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching featured articles:', error)
        // Fallback to mock data
        const mockData = mockArticles.slice(0, limit)
        setArticles(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedArticles()
  }, [limit])

  if (loading) {
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
              <div className="bg-gray-200 h-32 rounded-lg"></div>
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
        {articles.map((article, index) => (
          <div key={article.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {article.featured_image && (
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  {article.category && (
                    <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      <Tag className="h-4 w-4 mr-1" />
                      {article.category}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
                
                <Link href={`/artikel/${article.slug}`}>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{article.author}</span>
                    <time dateTime={article.published_at} className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDate(article.published_at)}
                    </time>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {article.view_count.toLocaleString()}
                    </span>
                  </div>
                  
                  <Link 
                    href={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
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
    </div>
  )
} 