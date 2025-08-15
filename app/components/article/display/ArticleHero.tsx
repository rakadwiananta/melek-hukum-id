'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import FeaturedArticle from '@/app/components/article/display/FeaturedArticle'
import LatestArticles from '@/app/components/article/display/LatestArticles'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Award, Sparkles, Eye, Clock, ChevronRight, BarChart3, Users, AlertTriangle, Tag } from 'lucide-react'
import Link from 'next/link'
import { ArticleHeroImage, ArticleCardImage } from '@/app/components/ui/ArticleImage'
import { EnhancedArticleHeroImage, EnhancedArticleCardImage } from '@/app/components/ui/AdvancedArticleImage'

interface ArticleHeroProps {
  showLatest?: boolean
  showStatistics?: boolean
  variant?: 'default' | 'magazine' | 'newspaper'
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
}

// Indonesian legal statistics
const heroStatistics = {
  totalArticles: 1234,
  monthlyReaders: 567890,
  legalAwareness: 67.3,
  satisfaction: 92.5
}

export default function ArticleHero({ 
  showLatest = true, 
  showStatistics = true,
  variant = 'default' 
}: ArticleHeroProps) {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null)
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setLoading(true)
        
        if (!supabase) {
          setFeaturedArticle(null)
          setTrendingArticles([])
          setLoading(false)
          return
        }

        const { data: featuredData, error: featuredError } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author, like_count, comment_count')
          .order('view_count', { ascending: false })
          .limit(1)
          .single()

        if (featuredError) {
          console.error('Error fetching featured article:', featuredError)
          setFeaturedArticle(null)
        } else if (featuredData) {
          setFeaturedArticle(featuredData)
        }

        const { data: trendingData, error: trendingError } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          .order('view_count', { ascending: false })
          .range(1, 3)

        if (trendingError) {
          console.error('Error fetching trending articles:', trendingError)
          setTrendingArticles([])
        } else if (trendingData) {
          setTrendingArticles(trendingData)
        }
      } catch (error) {
        console.error('Error fetching hero content:', error)
        setFeaturedArticle(null)
        setTrendingArticles([])
      } finally {
        setLoading(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }

    fetchHeroContent()
  }, [])

  // Auto-rotate images for magazine variant
  useEffect(() => {
    if (variant === 'magazine' && trendingArticles.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % trendingArticles.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [variant, trendingArticles.length])

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading State with Animation */}
        <div className="relative h-[600px] rounded-3xl overflow-hidden animate-pulse bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <Sparkles className="h-16 w-16 text-gray-400 animate-spin" />
                <div className="absolute inset-0 h-16 w-16 animate-ping">
                  <Sparkles className="h-16 w-16 text-gray-400/50" />
                </div>
              </div>
              <p className="text-gray-500 font-medium">Memuat artikel unggulan...</p>
            </div>
          </div>
        </div>
        
        {showLatest && (
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
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
      <div className="text-center py-16">
        <div className="inline-block p-8 bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl">
          <BarChart3 className="h-20 w-20 text-amber-600 mx-auto mb-4" />
          <p className="text-gray-700 text-xl font-semibold">Tidak ada artikel yang tersedia</p>
          <p className="text-gray-600 mt-2">Silakan kembali lagi nanti untuk konten terbaru</p>
        </div>
      </div>
    )
  }

  // Magazine Layout Variant
  if (variant === 'magazine') {
    return (
      <div className={`space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Statistics Bar */}
        {showStatistics && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{heroStatistics.totalArticles.toLocaleString('id-ID')}</p>
                <p className="text-sm opacity-90">Total Artikel</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{heroStatistics.monthlyReaders.toLocaleString('id-ID')}</p>
                <p className="text-sm opacity-90">Pembaca/Bulan</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{heroStatistics.legalAwareness}%</p>
                <p className="text-sm opacity-90">Kesadaran Hukum</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{heroStatistics.satisfaction}%</p>
                <p className="text-sm opacity-90">Kepuasan Pembaca</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Magazine Style Hero */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Featured Article */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <EnhancedArticleHeroImage
                src={featuredArticle.featured_image}
                alt={featuredArticle.title}
                category={featuredArticle.category}
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                index={0}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Batik Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <pattern id="hero-batik-magazine" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <g transform="translate(50,50)">
                      <circle cx="0" cy="0" r="40" fill="none" stroke="#FFF" strokeWidth="2"/>
                      <circle cx="0" cy="0" r="30" fill="none" stroke="#FFF" strokeWidth="1.5"/>
                      <circle cx="0" cy="0" r="20" fill="none" stroke="#FFF" strokeWidth="1"/>
                    </g>
                  </pattern>
                  <rect width="400" height="400" fill="url(#hero-batik-magazine)" />
                </svg>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {featuredArticle.category && (
                  <span className="inline-flex items-center px-4 py-2 bg-red-600/90 backdrop-blur text-white text-sm font-semibold rounded-full shadow-lg mb-4 self-start">
                    <Tag className="h-4 w-4 mr-1.5" />
                    {featuredArticle.category}
                  </span>
                )}
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-lg text-white/90 mb-6 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    {featuredArticle.author && (
                      <span className="font-medium">{featuredArticle.author}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredArticle.view_count.toLocaleString('id-ID')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      5 menit baca
                    </span>
                  </div>
                  
                  <Link 
                    href={`/artikel/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Baca Artikel
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Magazine Badge */}
              <div className="absolute top-8 right-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  <Award className="h-4 w-4 inline mr-1" />
                  ARTIKEL PILIHAN
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trending Articles Grid */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-red-600" />
                Sedang Trending
              </h3>
              <Link href="/artikel" className="text-red-600 hover:text-red-700 font-medium">
                Lihat Semua →
              </Link>
            </motion.div>

            <div className="space-y-4">
              {trendingArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <Link href={`/artikel/${article.slug}`}>
                    <div className="flex gap-4 p-4">
                      <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                        <EnhancedArticleCardImage
                          src={article.featured_image}
                          alt={article.title}
                          category={article.category}
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          index={index + 1}
                        />
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-full font-bold">
                          #{index + 2}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors">
                          {article.title}
                        </h4>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            {article.category && (
                              <span className="text-red-600 font-medium">{article.category}</span>
                            )}
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.view_count.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Interactive CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-6 bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl border border-amber-200"
            >
              <h4 className="font-bold text-lg mb-2">📚 Tingkatkan Pengetahuan Hukum Anda</h4>
              <p className="text-gray-700 text-sm mb-4">
                Dapatkan update artikel hukum terbaru langsung di email Anda
              </p>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Berlangganan Newsletter
              </button>
            </motion.div>
          </div>
        </div>

        {/* Latest Articles Section */}
        {showLatest && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <LatestArticles limit={6} showHeader={true} />
          </motion.div>
        )}
      </div>
    )
  }

  // Default Hero Layout
  return (
    <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section with Parallax Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
      >
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 transform scale-110 group-hover:scale-125 transition-transform duration-1500">
          <EnhancedArticleHeroImage
            src={featuredArticle.featured_image}
            alt={featuredArticle.title}
            category={featuredArticle.category}
            className="object-cover"
            index={0}
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Indonesian Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 800">
            <pattern id="hero-batik-default" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Mega Mendung Pattern */}
              <g transform="translate(100,100)">
                <path d="M0,0 Q50,-50 100,0 T200,0 Q150,50 100,0 T0,0" 
                      fill="none" stroke="#FFF" strokeWidth="2" opacity="0.3"/>
                <circle cx="50" cy="0" r="30" fill="none" stroke="#FFF" strokeWidth="1.5" opacity="0.2"/>
                <circle cx="150" cy="0" r="30" fill="none" stroke="#FFF" strokeWidth="1.5" opacity="0.2"/>
              </g>
            </pattern>
            <rect width="800" height="800" fill="url(#hero-batik-default)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-600 rounded-full opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-600 rounded-full opacity-20 blur-3xl animate-float-delayed" />

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {featuredArticle.category && (
                <span className="inline-flex items-center px-4 py-2 bg-red-600/90 backdrop-blur text-white text-sm font-semibold rounded-full shadow-lg mb-6">
                  <Tag className="h-4 w-4 mr-1.5" />
                  {featuredArticle.category}
                </span>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                {featuredArticle.title}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow">
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link 
                  href={`/artikel/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Baca Selengkapnya
                  <ChevronRight className="h-5 w-5" />
                </Link>
                
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  {featuredArticle.author && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold">
                        {featuredArticle.author.charAt(0)}
                      </div>
                      <span>{featuredArticle.author}</span>
                    </div>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {featuredArticle.view_count.toLocaleString('id-ID')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    5 menit
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero Badge */}
        <div className="absolute top-8 right-8">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            ARTIKEL UNGGULAN
          </motion.div>
        </div>
      </motion.div>
      
      {/* Latest Articles */}
      {showLatest && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <LatestArticles limit={3} showHeader={true} />
        </motion.div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(-10px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(20px) translateX(-10px);
          }
          50% {
            transform: translateY(0) translateX(10px);
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
