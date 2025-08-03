'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, TrendingUp, Award, Eye } from 'lucide-react'
import { formatDate } from '@/app/lib/utils'

interface RelatedArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  published_at: string
  view_count: number
  category?: string
  author?: string
  reading_time?: number
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  currentArticleId: string
}

export default function RelatedArticles({ articles, currentArticleId }: RelatedArticlesProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300)
  }, [])

  if (articles.length === 0) return null

  return (
    <section className={`mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Section Header with Indonesian Ornament */}
      <div className="relative mb-10">
        {/* Batik Pattern Background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <pattern id="related-batik" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <circle cx="12.5" cy="12.5" r="10" fill="#dc2626" opacity="0.2"/>
              <path d="M12.5,2.5 Q22.5,12.5 12.5,22.5 Q2.5,12.5 12.5,2.5" fill="#f59e0b" opacity="0.3"/>
            </pattern>
            <rect width="100" height="100" fill="url(#related-batik)" />
          </svg>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Artikel Terkait
            </h2>
            <p className="text-gray-600">
              Perluas wawasan hukum Anda dengan artikel pilihan kami
            </p>
          </div>
          
          <Link 
            href="/artikel"
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Lihat Semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Articles Grid with 3D Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <article
            key={article.id}
            className={`group relative transform transition-all duration-500 hover:scale-105 animate-fade-in-up`}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 3D Shadow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-amber-600/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
            
            <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100">
              <Link href={`/artikel/${article.slug}`}>
                {/* Image Container */}
                {article.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Stats Overlay */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Eye className="h-3 w-3" />
                      {article.view_count.toLocaleString('id-ID')}
                    </div>

                    {/* Category Badge */}
                    {article.category && (
                      <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                        {article.category}
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      {article.author && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-white text-[8px] font-bold">
                            {article.author.charAt(0)}
                          </div>
                          <span className="font-medium">{article.author}</span>
                        </div>
                      )}
                      <span>•</span>
                      <time dateTime={article.published_at}>
                        {formatDate(article.published_at)}
                      </time>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-1 text-red-600 font-medium">
                      <BookOpen className="h-3 w-3" />
                      {article.reading_time || 5} menit
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Popularity Indicator */}
            {article.view_count > 5000 && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1 animate-pulse">
                <TrendingUp className="h-3 w-3" />
                Populer
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Mobile CTA Button */}
      <div className="mt-8 text-center md:hidden">
        <Link 
          href="/artikel"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Lihat Semua Artikel
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Legal Tips Box */}
      <div className="mt-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              Tips Membaca Artikel Hukum
            </h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Pahami konteks dan latar belakang kasus</li>
              <li>• Catat istilah hukum penting untuk dipelajari</li>
              <li>• Verifikasi dengan sumber hukum resmi</li>
              <li>• Konsultasikan dengan ahli untuk kasus spesifik</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
