'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryArticlesProps {
  category: string
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

export default function CategoryArticles({ 
  category, 
  limit = 10, 
  showHeader = false,
  headerTitle = 'Artikel Kategori'
}: CategoryArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles
            .filter(article => article.category === category)
            .slice(0, limit)
          setArticles(mockData)
          return
        }
        
        const { data, error } = await supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.eq('category', category)
          ?.order('published_at', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (error) {
          console.error('Error fetching category articles:', error)
          // Fallback to mock data
          const mockData = mockArticles
            .filter(article => article.category === category)
            .slice(0, limit)
          setArticles(mockData)
          return
        }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching category articles:', error)
        // Fallback to mock data
        const mockData = mockArticles
          .filter(article => article.category === category)
          .slice(0, limit)
        setArticles(mockData)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryArticles()
  }, [category, limit])

  if (loading) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="flex items-center gap-2 mb-6">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Artikel {category}</h2>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada artikel dalam kategori &ldquo;{category}&rdquo;.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex items-center gap-2 mb-6">
          <Tag className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Artikel {category}</h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/artikel/${article.slug}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatDate(article.published_at)}
                  <span className="mx-1">•</span>
                  <Eye className="mr-1 h-4 w-4" />
                  {article.view_count}
                  <span className="mx-1">•</span>
                  <Tag className="mr-1 h-4 w-4" />
                  {article.category}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 