'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Heart, Clock, Calendar, BookOpen, Share2 } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'

interface MasonryArticle {
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
  featured: boolean
}

// Mock data - replace with actual API call
const mockMasonryArticles: MasonryArticle[] = [
  {
    id: '1',
    title: 'Cara Melaporkan Dugaan Korupsi ke KPK dengan Aman dan Efektif',
    slug: 'cara-melaporkan-dugaan-korupsi-kpk',
    excerpt: 'Panduan lengkap melaporkan dugaan korupsi ke KPK dengan aman dan efektif. Pelajari prosedur, dokumen yang diperlukan, dan perlindungan saksi.',
    category: 'Anti-Korupsi',
    featuredImage: '/images/articles/kpk-report.jpg',
    author: 'Tim Melek Hukum',
    publishedAt: '2024-01-20',
    readingTime: 5,
    views: 1247,
    likes: 89,
    featured: true
  },
  {
    id: '2',
    title: 'Hak Konsumen dalam Transaksi Online',
    slug: 'hak-konsumen-transaksi-online',
    excerpt: 'Ketahui hak-hak Anda sebagai konsumen dalam berbelanja online.',
    category: 'Solusi',
    featuredImage: '/images/articles/consumer-rights.jpg',
    author: 'Andi Pratama',
    publishedAt: '2024-01-18',
    readingTime: 7,
    views: 892,
    likes: 67,
    featured: false
  },
  {
    id: '3',
    title: 'Update UU ITE: Perubahan dan Dampaknya',
    slug: 'update-uu-ite-perubahan-dampak',
    excerpt: 'Analisis mendalam tentang perubahan UU ITE terbaru.',
    category: 'Regulasi',
    featuredImage: '/images/articles/uu-ite.jpg',
    author: 'Sarah Wijaya',
    publishedAt: '2024-01-15',
    readingTime: 10,
    views: 1567,
    likes: 124,
    featured: false
  },
  {
    id: '4',
    title: 'Panduan Lengkap Hak Pekerja',
    slug: 'panduan-hak-pekerja-uu-ketenagakerjaan',
    excerpt: 'Pelajari hak-hak dasar pekerja yang dijamin undang-undang.',
    category: 'Solusi',
    featuredImage: '/images/articles/worker-rights.jpg',
    author: 'Budi Santoso',
    publishedAt: '2024-01-12',
    readingTime: 8,
    views: 2034,
    likes: 156,
    featured: false
  },
  {
    id: '5',
    title: 'Cara Mengajukan Gugatan Perdata dengan Benar',
    slug: 'cara-mengajukan-gugatan-perdata',
    excerpt: 'Panduan lengkap mengajukan gugatan perdata.',
    category: 'Solusi',
    featuredImage: '/images/articles/civil-lawsuit.jpg',
    author: 'Dewi Kartika',
    publishedAt: '2024-01-10',
    readingTime: 12,
    views: 1789,
    likes: 98,
    featured: false
  },
  {
    id: '6',
    title: 'Memahami Hak Cipta dalam Era Digital',
    slug: 'memahami-hak-cipta-era-digital',
    excerpt: 'Panduan lengkap tentang hak cipta di era digital.',
    category: 'Regulasi',
    featuredImage: '/images/articles/copyright.jpg',
    author: 'Rina Sari',
    publishedAt: '2024-01-08',
    readingTime: 6,
    views: 1456,
    likes: 78,
    featured: false
  }
]

export default function ArticleMasonry() {
  const [articles, setArticles] = useState<MasonryArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(mockMasonryArticles)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleShare = (article: MasonryArticle) => {
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
      <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm break-inside-avoid">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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
    <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Artikel Terbaru
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kumpulan artikel hukum terbaru dalam format yang mudah dibaca
            </p>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 break-inside-avoid ${
                article.featured ? 'md:col-span-2' : ''
              }`}
            >
              <Link href={`/artikel/${article.slug}`}>
                <div className={`relative overflow-hidden ${article.featured ? 'h-80' : 'h-48'}`}>
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>
                  {article.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className={`text-white font-semibold line-clamp-2 group-hover:text-green-200 transition-colors ${
                      article.featured ? 'text-xl' : 'text-lg'
                    }`}>
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishedAt, { dateStyle: 'short' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readingTime} menit</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{article.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/artikel/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            Lihat Semua Artikel
            <BookOpen className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 