'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate, calculateReadingTime } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, TrendingUp, Award, Flame, MessageCircle, ThumbsUp, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ArticleCompactProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
  variant?: 'minimal' | 'detailed' | 'trending' | 'sidebar'
  showStats?: boolean
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
  like_count?: number
  comment_count?: number
  is_trending?: boolean
}

// Engagement metrics calculation
const calculateEngagement = (views: number, likes?: number, comments?: number) => {
  const totalEngagement = (likes || 0) + (comments || 0) * 2
  const engagementRate = views > 0 ? (totalEngagement / views) * 100 : 0
  
  if (engagementRate > 10) return { level: 'viral', color: 'text-red-600', bg: 'bg-red-100', icon: Flame }
  if (engagementRate > 5) return { level: 'hot', color: 'text-orange-600', bg: 'bg-orange-100', icon: TrendingUp }
  if (engagementRate > 2) return { level: 'rising', color: 'text-blue-600', bg: 'bg-blue-100', icon: BarChart3 }
  return null
}

export default function ArticleCompact({ 
  category, 
  limit = 10, 
  showHeader = false,
  headerTitle = 'Artikel Terpopuler',
  variant = 'minimal',
  showStats = true
}: ArticleCompactProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchCompactArticles = async () => {
      try {
        setLoading(true)
        
        if (!supabase) { setArticles([]); return }
        
        let query = supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author, like_count, comment_count')
          ?.order('view_count', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) { console.error('Error fetching articles:', error); setArticles([]); return }

        if (data) {
          setArticles(data.map(article => ({
            ...article,
            is_trending: article.view_count > 5000
          })))
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
        setArticles([])
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
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
          </div>
        )}
        <div className="space-y-3">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
                <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
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
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
          </div>
        )}
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <div className="inline-block p-6">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12h6m-3-3v6m-7 7h14a2 2 0 002-2V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
          </div>
        </div>
      </div>
    )
  }

  // Variant: Trending with rank numbers
  if (variant === 'trending') {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent flex items-center justify-center gap-3"
            >
              <Flame className="h-8 w-8 text-red-600" />
              {headerTitle}
              <Flame className="h-8 w-8 text-red-600" />
            </motion.h2>
          </div>
        )}
        
        <AnimatePresence>
          {articles.map((article, index) => {
            const engagement = calculateEngagement(article.view_count, article.like_count, article.comment_count)
            
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative"
              >
                <Link href={`/artikel/${article.slug}`}>
                  <div className={`
                    flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                    ${hoveredIndex === index ? 'bg-gradient-to-r from-red-50 to-amber-50 shadow-lg transform scale-[1.02]' : 'bg-white shadow-sm hover:shadow-md'}
                    border-2 ${index === 0 ? 'border-amber-400' : index === 1 ? 'border-gray-300' : index === 2 ? 'border-amber-700' : 'border-gray-200'}
                  `}>
                    {/* Ranking Badge */}
                    <div className={`
                      flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg' : 
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-lg' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg' :
                        'bg-gray-100 text-gray-600'}
                    `}>
                      {index + 1}
                    </div>

                    {/* Thumbnail with play effect */}
                    {true && (
                      <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={(article.featured_image && !article.featured_image.startsWith('/images/articles/')) ? article.featured_image : '/timbangkan.jpg'}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500"
                          style={{
                            transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)'
                          }}
                        />
                        {engagement && (
                          <div className="absolute top-1 right-1">
                            <engagement.icon className={`h-4 w-4 ${engagement.color} drop-shadow-lg`} />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base line-clamp-2 text-gray-900 mb-1">
                        {article.title}
                      </h3>
                      
                      {/* Meta info with icons */}
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        {article.category && (
                          <span className="inline-flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {article.category}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.view_count.toLocaleString('id-ID')}
                        </span>
                        {showStats && article.like_count && (
                          <span className="inline-flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {article.like_count.toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow indicator */}
                    <ArrowRight className={`
                      h-5 w-5 flex-shrink-0 transition-all duration-300
                      ${hoveredIndex === index ? 'text-red-600 translate-x-1' : 'text-gray-400'}
                    `} />
                  </div>
                </Link>

                {/* Trending flame animation */}
                {index < 3 && article.is_trending && (
                  <div className="absolute -top-2 -right-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg"
                    >
                      <Flame className="h-3 w-3" />
                      HOT
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    )
  }

  // Variant: Sidebar compact
  if (variant === 'sidebar') {
    return (
      <div className="space-y-4">
        {showHeader && (
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-amber-600 rounded-full" />
            {headerTitle}
          </h3>
        )}
        
        <div className="space-y-2">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Link href={`/artikel/${article.slug}`}>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <span className="text-lg font-bold text-gray-400 group-hover:text-red-600 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <time dateTime={article.published_at}>
                        {formatDate(article.published_at)}
                      </time>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {(article.view_count / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Default/Minimal variant
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {headerTitle}
          </h2>
        </div>
      )}
      
      <div className="space-y-3">
        {articles.map((article, index) => {
          const engagement = calculateEngagement(article.view_count, article.like_count, article.comment_count)
          
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <Link href={`/artikel/${article.slug}`}>
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-red-50 hover:to-amber-50 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-200">
                  {/* Thumbnail */}
                  {true && (
                    <div className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={(article.featured_image && !article.featured_image.startsWith('/images/articles/')) ? article.featured_image : '/timbangkan.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {engagement && (
                        <div className={`absolute inset-0 ${engagement.bg} opacity-80 flex items-center justify-center`}>
                          <engagement.icon className={`h-6 w-6 ${engagement.color}`} />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-1 text-gray-900 group-hover:text-red-700 transition-colors mb-1">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
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
                        {article.view_count.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Visual indicator */}
                  <div className="flex-shrink-0">
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-all duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* View All Link */}
      <div className="text-center pt-4">
        <Link href={category ? `/artikel/kategori/${category}` : '/artikel'}>
          <span className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors">
            Lihat Semua Artikel
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  )
}
