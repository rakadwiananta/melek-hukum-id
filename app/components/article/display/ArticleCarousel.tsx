'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, ChevronLeft, ChevronRight, Loader2, TrendingUp, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import ArticleCard from './ArticleCard'
import { motion, AnimatePresence } from 'framer-motion'

interface ArticleCarouselProps {
  category?: string
  limit?: number
  showHeader?: boolean
  headerTitle?: string
  variant?: 'default' | 'hero' | 'featured'
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

export default function ArticleCarousel({ 
  category, 
  limit = 6, 
  showHeader = false,
  headerTitle = 'Artikel Pilihan',
  variant = 'default'
}: ArticleCarouselProps) {
  const getImage = (src?: string) => {
    const s = (src || '').trim()
    if (!s || s.includes('/images/articles/')) return '/timbangkan.jpg'
    if (s.startsWith('http') || s.startsWith('/')) return s
    return `/${s}`
  }
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlay = true
  const interval = 5000
  const showNavigation = true

  useEffect(() => {
    const fetchCarouselArticles = async () => {
      try {
        setLoading(true)
        
        if (!supabase) { setArticles([]); return }
        
        let query = supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.order('published_at', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (category) {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) { console.error('Error fetching articles:', error); setArticles([]); return }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchCarouselArticles()
  }, [category, limit])

  useEffect(() => {
    if (autoPlay && articles.length > 0 && isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % articles.length)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, articles.length, isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (loading) {
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
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          </div>
        )}
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
        </div>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              {headerTitle}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
          </div>
        )}
        
        <div className="relative h-[600px] rounded-3xl overflow-hidden group">
          {/* Batik Pattern Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <pattern id="hero-batik" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <g transform="translate(50,50)">
                  <circle cx="0" cy="0" r="40" fill="none" stroke="#8B4513" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#D2691E" strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#CD853F" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="10" fill="#A0522D"/>
                </g>
              </pattern>
              <rect width="400" height="400" fill="url(#hero-batik)" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="relative h-full"
            >
              <Image
                src={getImage(articles[currentIndex].featured_image)}
                alt={articles[currentIndex].title}
                fill
                className="object-cover"
                priority
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div className="max-w-3xl">
                  {articles[currentIndex].category && (
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center px-4 py-2 bg-red-600/90 backdrop-blur text-white text-sm font-semibold rounded-full shadow-lg mb-4"
                    >
                      <Tag className="h-4 w-4 mr-1.5" />
                      {articles[currentIndex].category}
                    </motion.span>
                  )}
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                  >
                    {articles[currentIndex].title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-white/90 mb-6 line-clamp-2"
                  >
                    {articles[currentIndex].excerpt}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-6"
                  >
                    <Link 
                      href={`/artikel/${articles[currentIndex].slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      Baca Selengkapnya
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {articles[currentIndex].view_count.toLocaleString('id-ID')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(articles[currentIndex].published_at)}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {showNavigation && articles.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all group"
              >
                <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur hover:bg-white/30 text-white rounded-full p-3 shadow-lg transition-all group"
              >
                <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="relative group"
              >
                <div className={`w-16 h-1 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}>
                  {index === currentIndex && (
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-600 to-amber-600 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: interval / 1000, ease: 'linear' }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default Carousel with 3D Cards
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {headerTitle}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-amber-600 mx-auto rounded-full" />
        </div>
      )}
      
      <div className="relative" ref={carouselRef}>
        {/* Carousel Container with 3D perspective */}
        <div className="overflow-hidden rounded-2xl" style={{ perspective: '1000px' }}>
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {articles.map((article, index) => (
              <div 
                key={article.id} 
                className="w-full flex-shrink-0 px-4"
                style={{
                  transform: index === currentIndex 
                    ? 'rotateY(0deg) scale(1)' 
                    : index < currentIndex 
                      ? 'rotateY(45deg) scale(0.9)' 
                      : 'rotateY(-45deg) scale(0.9)',
                  transition: 'transform 0.7s ease-in-out'
                }}
              >
                <ArticleCard 
                  article={article} 
                  variant="featured" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons with Animation */}
        {showNavigation && articles.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hover:scale-110 group"
            >
              <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hover:scale-110 group"
            >
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {/* Enhanced Dots Indicator */}
        {articles.length > 1 && (
          <div className="flex justify-center mt-6 space-x-3">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 h-8' 
                    : 'w-6 h-6 hover:w-7 hover:h-7'
                }`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 animate-pulse' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`} />
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-amber-600 animate-ping opacity-50" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Auto-play Indicator */}
        {isAutoPlaying && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Auto-play aktif
          </div>
        )}
      </div>
    </div>
  )
}
