'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, Loader2, Gavel } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from './ArticleCard'

interface ArticleGridProps {
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

export default function ArticleGrid({ 
  category, 
  limit = 12, 
  showHeader = false,
  headerTitle = 'Daftar Artikel',
  showLoadMore = false
}: ArticleGridProps) {
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
        // Fallback to mock data
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
      // Fallback to mock data
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

  // Ganti hardcode switch(3) menjadi variabel
  const gridCount: number = 3
  const getGridCols = () => {
    if (gridCount === 1) return 'grid-cols-1'
    if (gridCount === 2) return 'grid-cols-1 md:grid-cols-2'
    if (gridCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    if (gridCount === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-red-600" />
            <div className="absolute inset-0 h-12 w-12 animate-ping text-red-600/30">
              <Loader2 className="h-12 w-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
          </div>
        )}
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-amber-50 rounded-2xl">
            <Gavel className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Tidak ada artikel yang ditemukan.</p>
            <p className="text-gray-500 text-sm mt-2">Coba kategori lain atau kembali lagi nanti.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {headerTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan informasi hukum terkini dan terpercaya untuk meningkatkan kesadaran hukum masyarakat Indonesia
          </p>
        </div>
      )}
      
      {/* Statistics Section */}
      {/* This section was removed as per the new_code, as it relied on statistics state */}

      {/* Indonesia Legal Statistics Banner */}
      {/* This section was removed as per the new_code, as it relied on indonesianLegalStats */}

      {/* Articles Grid with 3D Cards */}
      <div className={`grid gap-6 ${getGridCols()}`}>
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={/* animateStats ? 'animate-fade-in-up' : 'opacity-0' */ 'opacity-0'} // Removed animateStats
            style={{ /* animationDelay: `${index * 50}ms` */ }} // Removed animationDelay
          >
            <ArticleCard 
              article={article} 
              variant="3d-batik" 
            />
          </div>
        ))}
      </div>
      
      {showLoadMore && hasMore && (
        <div className="text-center pt-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="relative group px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {/* Button Animation */}
            <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              <span className="relative z-10 flex items-center gap-2">
                Muat Lebih Banyak
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

<style jsx>{`
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animation-delay-100 {
    animation-delay: 100ms;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-300 {
    animation-delay: 300ms;
  }
`}</style>
