'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, Heart, Clock, Calendar, BookOpen, Share2 } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'
import { supabase } from '@/app/lib/supabase'
import { validateAndFixImageUrl } from '@/app/lib/fallback-images'

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

export default function ArticleMasonry() {
  const [articles, setArticles] = useState<MasonryArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!supabase) {
          setArticles([])
          return
        }
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, category, featured_image, author, published_at, view_count, like_count, is_latest, latest_rank, latest_at')
          .eq('status', 'published')
          .not('published_at', 'is', null)
          .eq('is_latest', true)
          .order('latest_rank', { ascending: true, nullsFirst: false })
          .order('latest_at', { ascending: false, nullsFirst: false })
          .order('published_at', { ascending: false })
          .limit(12)
        if (error) throw error

        let source: any[] = data || []

        // Fallback 1: jika tidak ada kurasi latest, ambil non-kurasi terbaru (mengecualikan unggulan/pilihan)
        if (source.length === 0) {
          const { data: nonCurated, error: nonCurErr } = await supabase
            .from('articles')
            .select('id, title, slug, excerpt, category, featured_image, author, published_at, view_count, like_count')
            .eq('status', 'published')
            .not('published_at', 'is', null)
            .eq('is_featured', false)
            .eq('is_editor_pick', false)
            .order('published_at', { ascending: false })
            .limit(12)
          if (nonCurErr) throw nonCurErr
          source = nonCurated || []
        }

        // Fallback 2: jika tetap kosong, ambil artikel terbaru umum
        if (source.length === 0) {
          const { data: fallbackData, error: fbErr } = await supabase
            .from('articles')
            .select('id, title, slug, excerpt, category, featured_image, author, published_at, view_count, like_count')
            .eq('status', 'published')
            .not('published_at', 'is', null)
            .order('published_at', { ascending: false })
            .limit(12)
          if (fbErr) throw fbErr
          source = fallbackData || []
        }

        const mapped = source.map((a: any, idx: number) => ({
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
          likes: a.like_count || 0,
          featured: idx === 0
        }))
        setArticles(mapped)
      } catch (e) {
        console.error('Error loading masonry articles:', e)
        // Fallback ke artikel yang sudah ada di project
        setArticles([
          {
            id: '1',
            title: 'Panduan Lengkap Mengurus Perceraian di Indonesia',
            slug: 'cara-mengurus-perceraian-2024',
            excerpt: 'Panduan komprehensif untuk mengurus perceraian di Indonesia, termasuk syarat, prosedur, biaya, dan tips praktis berdasarkan UU Perkawinan.',
            category: 'Hukum Keluarga',
            featuredImage: '/images/articles/perceraian.jpg',
            author: 'Dr. Fatimah Azzahra, S.H.I., M.H.',
            publishedAt: '2024-12-15',
            readingTime: 12,
            views: 1250,
            likes: 89,
            featured: true
          },
          {
            id: '2', 
            title: 'Cara Mendirikan PT (Perseroan Terbatas) - Panduan 2024',
            slug: 'cara-mendirikan-pt-2024',
            excerpt: 'Panduan lengkap mendirikan PT di Indonesia, mulai dari persiapan dokumen hingga pengesahan badan hukum.',
            category: 'Hukum Bisnis',
            featuredImage: '/images/articles/pt.jpg',
            author: 'Dr. Budi Santoso, S.H., M.B.A.',
            publishedAt: '2024-12-14',
            readingTime: 15,
            views: 980,
            likes: 67,
            featured: false
          },
          {
            id: '3',
            title: 'Prosedur Jual Beli Tanah yang Aman dan Sah',
            slug: 'jual-beli-tanah',
            excerpt: 'Panduan aman jual beli tanah: cek sertifikat, AJB, balik nama, dan tips menghindari penipuan.',
            category: 'Hukum Perdata',
            featuredImage: '/images/articles/tanah.jpg',
            author: 'Dr. Sari Permata, S.H., M.H.',
            publishedAt: '2024-12-13',
            readingTime: 18,
            views: 876,
            likes: 54,
            featured: false
          },
          {
            id: '4',
            title: 'Panduan Balik Nama Kendaraan BPKB dan STNK',
            slug: 'balik-nama-kendaraan',
            excerpt: 'Panduan balik nama STNK dan BPKB: syarat dokumen, cek fisik, pembayaran, dan waktu pengurusan.',
            category: 'Panduan Praktis',
            featuredImage: '/images/articles/kendaraan.jpg', 
            author: 'Ir. Bambang Sutrisno, S.H.',
            publishedAt: '2024-12-12',
            readingTime: 8,
            views: 654,
            likes: 43,
            featured: false
          },
          {
            id: '5',
            title: 'Prosedur Pelaporan ke Polisi - Panduan Lengkap',
            slug: 'prosedur-pelaporan',
            excerpt: 'Panduan lengkap cara membuat laporan polisi untuk berbagai kasus: kehilangan, pencurian, penipuan, kecelakaan.',
            category: 'Panduan Praktis',
            featuredImage: '/images/articles/polisi.jpg',
            author: 'Kombes Pol. Dr. Agus Rahardjo, S.H.',
            publishedAt: '2024-12-11',
            readingTime: 10,
            views: 1100,
            likes: 78,
            featured: false
          },
          {
            id: '6',
            title: 'Cara Mengurus Dokumen Hilang (KTP, SIM, STNK, Paspor)',
            slug: 'mengurus-dokumen-hilang', 
            excerpt: 'Panduan lengkap prosedur pelaporan dan pengurusan dokumen pengganti dengan statistik terbaru.',
            category: 'Panduan Praktis',
            featuredImage: '/images/articles/dokumen.jpg',
            author: 'Dra. Siti Nurhaliza, S.H., M.M.',
            publishedAt: '2024-12-10',
            readingTime: 14,
            views: 892,
            likes: 65,
            featured: false
          }
        ])
      } finally {
        setIsLoading(false)
      }
    }
    fetch()
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

  if (!isLoading && articles.length === 0) {
    return null
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
                      <span>{formatDate(article.publishedAt)}</span>
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