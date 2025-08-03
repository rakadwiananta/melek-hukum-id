'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Heart, Clock, Calendar } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'

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

// Mock data - replace with actual API call
const mockCarouselArticles: CarouselArticle[] = [
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
    likes: 89
  },
  {
    id: '2',
    title: 'Hak Konsumen dalam Transaksi Online Menurut UU Perlindungan Konsumen',
    slug: 'hak-konsumen-transaksi-online',
    excerpt: 'Ketahui hak-hak Anda sebagai konsumen dalam berbelanja online. Mulai dari hak mendapat informasi yang jelas hingga hak pengembalian barang.',
    category: 'Solusi',
    featuredImage: '/images/articles/consumer-rights.jpg',
    author: 'Andi Pratama',
    publishedAt: '2024-01-18',
    readingTime: 7,
    views: 892,
    likes: 67
  },
  {
    id: '3',
    title: 'Update UU ITE: Apa yang Berubah dan Dampaknya terhadap Kebebasan Berekspresi',
    slug: 'update-uu-ite-perubahan-dampak',
    excerpt: 'Analisis mendalam tentang perubahan UU ITE terbaru, pasal-pasal yang direvisi, dan dampaknya terhadap kebebasan berekspresi di media sosial.',
    category: 'Regulasi',
    featuredImage: '/images/articles/uu-ite.jpg',
    author: 'Sarah Wijaya',
    publishedAt: '2024-01-15',
    readingTime: 10,
    views: 1567,
    likes: 124
  },
  {
    id: '4',
    title: 'Panduan Lengkap Hak Pekerja Menurut UU Ketenagakerjaan',
    slug: 'panduan-hak-pekerja-uu-ketenagakerjaan',
    excerpt: 'Pelajari hak-hak dasar pekerja yang dijamin undang-undang, termasuk upah minimum, jam kerja, cuti, dan perlindungan keselamatan kerja.',
    category: 'Solusi',
    featuredImage: '/images/articles/worker-rights.jpg',
    author: 'Budi Santoso',
    publishedAt: '2024-01-12',
    readingTime: 8,
    views: 2034,
    likes: 156
  },
  {
    id: '5',
    title: 'Cara Mengajukan Gugatan Perdata dengan Benar',
    slug: 'cara-mengajukan-gugatan-perdata',
    excerpt: 'Panduan lengkap mengajukan gugatan perdata, mulai dari persiapan dokumen hingga proses di pengadilan.',
    category: 'Solusi',
    featuredImage: '/images/articles/civil-lawsuit.jpg',
    author: 'Dewi Kartika',
    publishedAt: '2024-01-10',
    readingTime: 12,
    views: 1789,
    likes: 98
  }
]

export default function ArticleCarousel() {
  const [articles, setArticles] = useState<CarouselArticle[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(mockCarouselArticles)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

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
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container-padding mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Artikel Unggulan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Artikel pilihan yang wajib Anda baca untuk memahami hukum dengan lebih baik
            </p>
          </motion.div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Link href={`/artikel/${articles[currentIndex].slug}`}>
                  <div className="relative h-full">
                    <Image
                      src={articles[currentIndex].featuredImage}
                      alt={articles[currentIndex].title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                          {articles[currentIndex].category}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 line-clamp-2">
                        {articles[currentIndex].title}
                      </h3>
                      <p className="text-lg mb-4 line-clamp-2 opacity-90">
                        {articles[currentIndex].excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm opacity-75">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(articles[currentIndex].publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{articles[currentIndex].readingTime} menit baca</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{articles[currentIndex].views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span>{articles[currentIndex].likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              {isAutoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {articles.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8 grid grid-cols-5 gap-4">
            {articles.map((article, index) => (
              <button
                key={article.id}
                onClick={() => goToSlide(index)}
                className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-2 ring-primary scale-105'
                    : 'hover:scale-105'
                }`}
              >
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 15vw"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-1 left-1">
                  <span className="px-1 py-0.5 bg-white/90 text-black text-xs font-medium rounded">
                    {index + 1}
                  </span>
                </div>
              </button>
            ))}
          </div>
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            Lihat Semua Artikel
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 