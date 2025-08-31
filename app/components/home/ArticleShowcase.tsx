'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Eye, Heart, Share2, ChevronRight, BookOpen } from 'lucide-react'
import { formatDate, calculateReadingTime } from '@/app/lib/utils'
import { supabase } from '@/app/lib/supabase'
import { validateAndFixImageUrl } from '@/app/lib/fallback-images'
import { RobustArticleCardImage } from '@/app/components/ui/RobustArticleImage'

interface Article {
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

// Fallback articles for when database is not available
const fallbackArticles: Article[] = [
  {
    id: '1',
    title: 'Pahami Hak Tersangka dalam Proses Hukum',
    slug: 'hak-tersangka-proses-hukum',
    excerpt: 'Ketahui hak-hak yang dimiliki tersangka sejak ditangkap hingga proses peradilan berakhir.',
    category: 'Hukum Pidana',
    featuredImage: '/fallback-hukum.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-15',
    readingTime: 5,
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: 'Cara Melapor Korupsi yang Benar',
    slug: 'cara-melapor-korupsi',
    excerpt: 'Panduan lengkap cara melapor tindak pidana korupsi ke KPK dan instansi terkait.',
    category: 'Anti Korupsi',
    featuredImage: '/fallback-hukum.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-10',
    readingTime: 7,
    views: 2100,
    likes: 156
  },
  {
    id: '3',
    title: 'Perbedaan Tersangka dan Terdakwa',
    slug: 'perbedaan-tersangka-terdakwa',
    excerpt: 'Penjelasan detail perbedaan status tersangka dan terdakwa dalam hukum acara pidana.',
    category: 'Hukum Pidana',
    featuredImage: '/fallback-hukum.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-05',
    readingTime: 6,
    views: 1800,
    likes: 134
  }
]

export default function ArticleShowcase() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        // Check if Supabase is available
        if (!supabase) {
          console.log('Supabase not available, using fallback articles')
          setArticles(fallbackArticles)
          setIsLoading(false)
          return
        }

        // Fetch with timeout
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 5000)
        )

        const fetchPromise = supabase
          .from('articles')
          .select('id, title, slug, excerpt, category, featured_image, author, published_at, view_count, like_count, is_editor_pick, editor_pick_rank, editor_pick_at')
          .eq('status', 'published')
          .not('published_at', 'is', null)
          .eq('is_editor_pick', true)
          .order('editor_pick_rank', { ascending: true, nullsFirst: false })
          .order('editor_pick_at', { ascending: false, nullsFirst: false })
          .order('published_at', { ascending: false })
          .limit(6)

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        if (data && data.length > 0) {
          const mapped = data.map((a: any) => {
            const featuredImage = validateAndFixImageUrl(a.featured_image, a.category)
            const rt = calculateReadingTime(a.excerpt || '')?.match(/\d+/)?.[0]
            return {
              id: a.id,
              title: a.title,
              slug: a.slug,
              excerpt: a.excerpt,
              category: a.category,
              featuredImage,
              author: a.author,
              publishedAt: a.published_at,
              readingTime: rt ? Number(rt) : 5,
              views: a.view_count || 0,
              likes: a.like_count || 0,
            } as Article
          })
          setArticles(mapped)
        } else {
          // No data from database, use fallback
          setArticles(fallbackArticles)
        }
      } catch (e) {
        console.error('Error loading showcase articles:', e)
        setHasError(true)
        setArticles(fallbackArticles)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
  }

  const handleShare = (article: Article) => {
    if (typeof window === 'undefined') return
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: `${window.location.origin}/artikel/${article.slug}`
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/artikel/${article.slug}`)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          >
            Artikel Pilihan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Artikel terbaik yang dipilih oleh tim editor kami untuk membantu Anda memahami hukum dengan lebih baik
          </motion.p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <RobustArticleCardImage
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readingTime} menit
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {article.views.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {article.likes}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                  <button
                    onClick={() => handleShare(article)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/artikel"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Lihat Semua Artikel
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 