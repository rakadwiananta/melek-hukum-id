'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, Loader2, TrendingUp, Award, BarChart3, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ArticleMasonryProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
  showLoadMore?: boolean
  showFilter?: boolean
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
  trending_score?: number
}

const categories = ['Semua', 'Hukum Pidana', 'Hukum Perdata', 'Hukum Bisnis', 'Hak Asasi Manusia', 'Korupsi']

export default function ArticleMasonry({ 
  category, 
  limit = 12, 
  showHeader = false,
  headerTitle = 'Artikel Terbaru',
  showLoadMore = true,
  showFilter = false
}: ArticleMasonryProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const masonryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        if (!supabase) { setArticles([]); setHasMore(false); return }
        
        const queryBuilder = supabase
          .from('articles')
          .select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          .order('published_at', { ascending: false })
          .limit(limit)

        const query = (category || (selectedCategory !== 'Semua'))
          ? queryBuilder.eq('category', category || selectedCategory)
          : queryBuilder

        const { data, error } = await query

        if (error) { console.error('Error fetching articles:', error); setArticles([]); setHasMore(false); return }

        if (data) {
          setArticles(data)
          setHasMore(data.length === limit)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
        setArticles([])
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [category, limit, selectedCategory])

  const handleLoadMore = () => {
    // Implement load more functionality
    setHasMore(false)
  }

  const getMasonryHeight = (index: number) => {
    // Create varied heights for masonry effect
    const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-56', 'h-88']
    return heights[index % heights.length]
  }

  const getCardRotation = (index: number) => {
    // Subtle random rotations for organic feel
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0']
    return rotations[index % rotations.length]
  }

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className={`bg-gray-200 rounded-2xl ${getMasonryHeight(index)}`} />
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
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          </div>
        )}
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl">
            <BarChart3 className="h-20 w-20 text-amber-600 mx-auto mb-4" />
            <p className="text-gray-700 text-xl font-semibold">Tidak ada artikel yang ditemukan</p>
            <p className="text-gray-600 mt-2">Coba kategori lain atau kembali lagi nanti</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {headerTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Jelajahi koleksi artikel hukum kami yang komprehensif dan terkini
          </p>
        </div>
      )}

      {/* Category Filter */}
      {showFilter && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                ${selectedCategory === cat 
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg' 
                  : 'bg-white border-2 border-gray-300 hover:border-red-600 hover:shadow-md'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      
      {/* Masonry Grid with Indonesian Patterns */}
      <div 
        ref={masonryRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]"
      >
        <AnimatePresence>
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className={`relative group ${getCardRotation(index)} transition-all duration-500`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Batik Pattern Overlay */}
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <pattern id={`masonry-pattern-${index}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                    <circle cx="12.5" cy="12.5" r="10" fill="#DC2626" opacity="0.1"/>
                    <path d="M0,12.5 Q12.5,0 25,12.5 Q12.5,25 0,12.5" fill="#F59E0B" opacity="0.1"/>
                  </pattern>
                  <rect width="100" height="100" fill={`url(#masonry-pattern-${index})`} />
                </svg>
              </div>

              <Link href={`/artikel/${article.slug}`}>
                <div className={`
                  relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden 
                  transform transition-all duration-500 hover:scale-[1.02]
                  ${getMasonryHeight(index)}
                `}>
                  {true && (
                    <div className="relative h-full">
                      <Image
                        src={(article.featured_image && !article.featured_image.startsWith('/images/articles/')) ? article.featured_image : '/timbangkan.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Trending Badge */}
                      {article.view_count > 5000 && (
                        <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </div>
                      )}

                      {/* Popular Badge */}
                      {article.view_count > 10000 && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg animate-pulse">
                          <Award className="h-3 w-3" />
                          Populer
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category */}
                    {article.category && (
                      <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-semibold rounded-full mb-3 self-start">
                        <Tag className="h-3 w-3 mr-1" />
                        {article.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-lg">
                      {article.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {article.view_count.toLocaleString('id-ID')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(article.published_at)}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div className={`
                      absolute bottom-6 right-6 text-white transform transition-all duration-300
                      ${hoveredIndex === index ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                    `}>
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Load More Button */}
      {showLoadMore && hasMore && (
        <div className="text-center pt-12">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="relative group px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {/* Button Glow Effect */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-amber-600 blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
            
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Muat Lebih Banyak
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
