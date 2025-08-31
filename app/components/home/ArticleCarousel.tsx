'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RobustArticleCardImage, RobustArticleHeroImage } from '@/app/components/ui/RobustArticleImage'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Heart, Clock, Calendar } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'
import { supabase } from '@/app/lib/supabase'
import { validateAndFixImageUrl } from '@/app/lib/fallback-images'

interface CarouselArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  featuredImage: string
  author: string
  publishedAt: string
  readingTime: number
  views: number
  likes: number
}

// Fallback articles for carousel
const fallbackCarouselArticles: CarouselArticle[] = [
  {
    id: '1',
    title: 'Panduan Lengkap Hukum Acara Pidana',
    slug: 'panduan-hukum-acara-pidana',
    excerpt: 'Memahami tahapan dan prosedur dalam hukum acara pidana Indonesia.',
    category: 'Hukum Pidana',
    featuredImage: '/fallback-hukum.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-20',
    readingTime: 8,
    views: 3200,
    likes: 245
  },
  {
    id: '2',
    title: 'Cara Mengurus Sertifikat Tanah',
    slug: 'cara-mengurus-sertifikat-tanah',
    excerpt: 'Langkah-langkah lengkap untuk mengurus sertifikat tanah dari awal hingga selesai.',
    category: 'Hukum Perdata',
    featuredImage: '/fallback-hukum.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-18',
    readingTime: 10,
    views: 2800,
    likes: 198
  },
  {
    id: '3',
    title: 'Hak dan Kewajiban Pekerja',
    slug: 'hak-kewajiban-pekerja',
    excerpt: 'Ketahui hak dan kewajiban pekerja sesuai dengan undang-undang ketenagakerjaan.',
    category: 'Hukum Ketenagakerjaan',
    featuredImage: '/fallback-hukum.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-15',
    readingTime: 6,
    views: 2500,
    likes: 167
  }
]

export default function ArticleCarousel() {
  const [articles, setArticles] = useState<CarouselArticle[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)

        // Check if Supabase is available
        if (!supabase) {
          console.log('Supabase not available, using fallback carousel articles')
          setArticles(fallbackCarouselArticles)
          setIsLoading(false)
          return
        }

        // Fetch with timeout
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        )

        const fetchPromise = supabase
          .from('articles')
          .select('id, title, slug, excerpt, category, featured_image, author, published_at, view_count, like_count, is_featured, featured_rank, featured_at')
          .eq('status', 'published')
          .not('published_at', 'is', null)
          .eq('is_featured', true)
          .order('featured_rank', { ascending: true, nullsFirst: false })
          .order('featured_at', { ascending: false, nullsFirst: false })
          .order('view_count', { ascending: false, nullsFirst: false })
          .order('published_at', { ascending: false })
          .limit(10)

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        if (data && data.length > 0) {
          const mapped = data.map((a: any) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            excerpt: a.excerpt,
            category: a.category,
            featuredImage: validateAndFixImageUrl(a.featured_image, a.category),
            author: a.author,
            publishedAt: a.published_at,
            readingTime: 5,
            views: a.view_count || 0,
            likes: a.like_count || 0
          }))
          setArticles(mapped)
        } else {
          // No data from database, use fallback
          setArticles(fallbackCarouselArticles)
        }
      } catch (e) {
        console.error('Error loading carousel articles:', e)
        setArticles(fallbackCarouselArticles)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    if (articles.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, articles.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="relative h-96 bg-gray-300 rounded-xl"></div>
          </div>
        </div>
      </section>
    )
  }

  if (articles.length === 0) {
    return null
  }

  const currentArticle = articles[currentIndex]

  return (
    <section className="py-16 bg-white">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Artikel Terpopuler
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Artikel yang paling banyak dibaca dan disukai oleh pengunjung kami
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <RobustArticleHeroImage
                  src={currentArticle.featuredImage}
                  alt={currentArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-end p-8 lg:p-12">
                <div className="max-w-4xl">
                  {/* Category Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {currentArticle.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl lg:text-4xl font-bold text-white mb-4 line-clamp-2"
                  >
                    {currentArticle.title}
                  </motion.h3>

                  {/* Excerpt */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-gray-200 mb-6 line-clamp-2"
                  >
                    {currentArticle.excerpt}
                  </motion.p>

                  {/* Meta */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center space-x-6 text-sm text-gray-300 mb-6"
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(currentArticle.publishedAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {currentArticle.readingTime} menit
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      {currentArticle.views.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      {currentArticle.likes}
                    </span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link
                      href={`/artikel/${currentArticle.slug}`}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Baca Artikel
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 