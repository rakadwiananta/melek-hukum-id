'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import FeaturedArticle from '@/app/components/article/display/FeaturedArticle'
import LatestArticles from '@/app/components/article/display/LatestArticles'

interface ArticleHeroProps {
  showLatest?: boolean
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

export default function ArticleHero({ showLatest = true }: ArticleHeroProps) {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      try {
        setLoading(true)
        
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockFeatured = mockArticles.sort((a, b) => (b.view_count || 0) - (a.view_count || 0))[0]
          setFeaturedArticle(mockFeatured)
          setLoading(false)
          return
        }

        // Get the most viewed article as featured
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          .order('view_count', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          console.error('Error fetching featured article:', error)
          return
        }

        if (data) {
          setFeaturedArticle(data)
        }
      } catch (error) {
        console.error('Error fetching featured article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedArticle()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-96 rounded-2xl"></div>
        </div>
        {showLatest && (
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!featuredArticle) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada artikel yang tersedia.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Featured Article */}
      <FeaturedArticle article={featuredArticle} />
      
      {/* Latest Articles */}
      {showLatest && (
        <LatestArticles limit={3} showHeader={true} />
      )}
    </div>
  )
} 