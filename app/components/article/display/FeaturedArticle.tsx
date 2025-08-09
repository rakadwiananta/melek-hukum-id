'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, TrendingUp, Award, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface FeaturedArticleProps {
  article: {
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
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <article className={`relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-amber-600/10 rounded-3xl" />

      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section with 3D Effect */}
          <div className="relative h-[300px] lg:h-full group">
            {article.featured_image ? (
              <>
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute top-6 left-6 space-y-3">
                  {article.category && (
                    <span className="inline-flex items-center px-4 py-2 bg-red-600/90 backdrop-blur text-white text-sm font-bold rounded-full shadow-lg animate-float">
                      <Tag className="h-4 w-4 mr-1.5" />
                      {article.category}
                    </span>
                  )}
                  
                  {article.view_count > 10000 && (
                    <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold rounded-full shadow-lg animate-float animation-delay-200">
                      <Award className="h-4 w-4 mr-1.5" />
                      Artikel Viral
                    </span>
                  )}
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white/90">
                  <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
                    <Eye className="h-4 w-4" />
                    {article.view_count.toLocaleString('id-ID')}
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    {article.reading_time || 5} menit
                  </span>
                </div>

                {/* 3D Frame Effect */}
                <div className="absolute inset-4 border-2 border-white/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-50" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                    <path d="M6.5 10.5l2.5 3L11 11l3 4H6z"/>
                  </svg>
                  <p className="text-lg font-medium">Artikel Unggulan</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Featured Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-amber-100 text-red-700 rounded-full text-sm font-bold">
                <TrendingUp className="h-4 w-4" />
                Artikel Pilihan Editor
              </div>
            </div>

            {/* Title with 3D Text Effect */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight relative">
              <Link href={`/artikel/${article.slug}`} className="hover:text-red-700 transition-colors">
                {article.title}
              </Link>
              <span className="absolute inset-0 text-red-600/10 transform translate-x-1 translate-y-1 -z-10">
                {article.title}
              </span>
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>

            {/* Author & Date */}
            <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
              {article.author && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-white font-bold">
                    {article.author.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-700">{article.author}</span>
                </div>
              )}
              <span>•</span>
              <time dateTime={article.published_at}>
                {formatDate(article.published_at)}
              </time>
            </div>

            {/* CTA Button */}
            <Link
              href={`/artikel/${article.slug}`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 self-start"
            >
              Baca Selengkapnya
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>

            {/* Indonesian Pattern Decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <pattern id="featured-batik" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="20" fill="#dc2626" opacity="0.5"/>
                  <path d="M25,5 Q45,25 25,45 Q5,25 25,5" fill="#f59e0b" opacity="0.6"/>
                </pattern>
                <rect width="100" height="100" fill="url(#featured-batik)" />
              </svg>
            </div>
          </div>
        </div>
      </div>

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

        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </article>
  )
}
