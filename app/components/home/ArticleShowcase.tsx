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

export default function ArticleShowcase() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabase) { setArticles([]); setIsLoading(false); return }
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, category, featured_image, author, published_at, view_count, like_count, is_editor_pick, editor_pick_rank, editor_pick_at')
          .eq('status', 'published')
          .not('published_at', 'is', null)
          .eq('is_editor_pick', true)
          .order('editor_pick_rank', { ascending: true, nullsFirst: false })
          .order('editor_pick_at', { ascending: false, nullsFirst: false })
          .order('published_at', { ascending: false })
          .limit(6)

        if (error) throw error

        const mapped = (data || []).map((a: any) => {
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
      } catch (e) {
        console.error('Error load showcase:', e)
        setArticles([])
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
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
            <div className="h-10 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Artikel Pilihan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Temukan artikel hukum terbaru dan informatif yang akan membantu Anda memahami hukum dengan lebih baik
            </p>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link href={`/artikel/${article.slug}`}>
                <div className="relative h-64 overflow-hidden">
                  <RobustArticleCardImage
                    src={article.featuredImage}
                    alt={article.title}
                    category={article.category}
                    fill={true}
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
                    priority={index < 6}
                    index={index}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-blue-200 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.readingTime} menit</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{article.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    Baca Artikel
                  </Link>
                  <button
                    onClick={() => handleShare(article)}
                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                    title="Bagikan artikel"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            Lihat Semua Artikel
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* Selected Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <RobustArticleCardImage
                    src={selectedArticle.featuredImage}
                    alt={selectedArticle.title}
                    category={selectedArticle.category}
                    fill={true}
                    className="object-cover object-center w-full h-full"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {selectedArticle.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{selectedArticle.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{selectedArticle.author}</span>
                      <span>{formatDate(selectedArticle.publishedAt)}</span>
                      <span>{selectedArticle.readingTime} menit baca</span>
                    </div>
                    <Link
                      href={`/artikel/${selectedArticle.slug}`}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Baca Selengkapnya
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 