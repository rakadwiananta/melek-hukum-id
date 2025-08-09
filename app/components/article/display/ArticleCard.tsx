'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, TrendingUp, Award } from 'lucide-react'
import { useState } from 'react'

interface ArticleCardProps {
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
    popularity_score?: number
  }
  variant?: 'default' | 'featured' | 'compact' | '3d-batik'
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Statistik kredibel berdasarkan data KPK dan Kemenkumham
  const getPopularityBadge = (views: number) => {
    if (views > 10000) return { text: 'Viral', color: 'bg-red-500' }
    if (views > 5000) return { text: 'Populer', color: 'bg-orange-500' }
    if (views > 1000) return { text: 'Trending', color: 'bg-blue-500' }
    return null
  }

  const popularityBadge = getPopularityBadge(article.view_count)

  if (variant === '3d-batik') {
    return (
      <article 
        className="relative transform-gpu transition-all duration-500 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateY(5deg) rotateX(-5deg)' : 'rotateY(0deg) rotateX(0deg)'
        }}
      >
        {/* Batik Pattern Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <pattern id="batik-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="20" fill="#8B4513" opacity="0.3"/>
              <path d="M25,5 Q45,25 25,45 Q5,25 25,5" fill="#D2691E" opacity="0.4"/>
              <circle cx="25" cy="25" r="10" fill="#CD853F" opacity="0.5"/>
            </pattern>
            <rect width="200" height="200" fill="url(#batik-pattern)" />
          </svg>
        </div>

        <div className="relative bg-white/95 backdrop-blur rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden border border-amber-100">
          <Link href={`/artikel/${article.slug}`}>
            {article.featured_image && (
              <div className="relative h-56 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"
                  style={{
                    transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)',
                    transition: 'transform 0.5s ease-out'
                  }}
                />
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  style={{
                    transform: isHovered ? 'scale(1.1) translateZ(10px)' : 'scale(1) translateZ(0)'
                  }}
                />
                
                {/* Category & Stats Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                  {article.category && (
                    <span className="inline-flex items-center px-3 py-1.5 bg-red-600/90 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur">
                      <Tag className="h-3 w-3 mr-1" />
                      {article.category}
                    </span>
                  )}
                  {popularityBadge && (
                    <span className={`inline-flex items-center px-3 py-1.5 ${popularityBadge.color} text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {popularityBadge.text}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="p-6">
              {/* Title with 3D effect */}
              <h3 
                className="font-bold text-xl mb-3 line-clamp-2 text-gray-900 transition-all duration-300"
                style={{
                  transform: isHovered ? 'translateZ(30px)' : 'translateZ(0)',
                  textShadow: isHovered ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {article.title}
              </h3>
              
              {/* Excerpt with gradient */}
              <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                {article.excerpt}
              </p>
              
              {/* Stats Section */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                <div className="flex items-center gap-4">
                  {article.author && (
                    <span className="font-medium flex items-center gap-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {article.author.charAt(0)}
                      </div>
                      {article.author}
                    </span>
                  )}
                  <time dateTime={article.published_at} className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(article.published_at)}
                  </time>
                </div>
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  <Eye className="h-3 w-3" />
                  {article.view_count.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Reading Progress Indicator */}
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-red-600 rounded-full transition-all duration-1000"
                  style={{
                    width: isHovered ? '100%' : '0%'
                  }}
                />
              </div>
            </div>
          </Link>
        </div>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Wayang Pattern Overlay */}
        <div className="absolute -top-20 -right-20 w-40 h-40 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 M50,30 C60,30 70,40 70,50 C70,60 60,70 50,70 C40,70 30,60 30,50 C30,40 40,30 50,30" 
                  fill="currentColor" className="text-amber-700"/>
          </svg>
        </div>

        <Link href={`/artikel/${article.slug}`}>
          {article.featured_image && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Floating Stats */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">
                    <Eye className="h-4 w-4" />
                    {article.view_count.toLocaleString('id-ID')} pembaca
                  </span>
                  <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    {article.reading_time || 5} menit baca
                  </span>
                </div>
              </div>

              {article.category && (
                <span className="absolute top-4 left-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-full shadow-lg">
                  <Tag className="h-4 w-4 mr-1.5" />
                  {article.category}
                </span>
              )}
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {article.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
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
              
              <span className="text-red-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                Baca selengkapnya →
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-amber-200">
        {article.featured_image && (
          <div className="relative w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {popularityBadge && (
              <div className="absolute top-1 right-1">
                <div className={`w-2 h-2 ${popularityBadge.color} rounded-full animate-pulse`} />
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <Link href={`/artikel/${article.slug}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors">
              {article.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <time dateTime={article.published_at}>
                {formatDate(article.published_at)}
              </time>
              {article.category && (
                <>
                  <span>•</span>
                  <span className="text-red-600 font-medium">{article.category}</span>
                </>
              )}
            </div>
            <span className="flex items-center gap-1 font-medium">
              <Eye className="h-3 w-3" />
              {article.view_count.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </article>
    )
  }

  // Default variant with Indonesian ornament
  return (
    <article className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200">
      {/* Ornament Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600">
          <path d="M100,0 L100,100 L0,100 Q50,50 100,0" fill="currentColor"/>
        </svg>
      </div>

      <Link href={`/artikel/${article.slug}`}>
        {article.featured_image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {article.category && (
              <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 bg-red-600/90 text-white text-xs font-semibold rounded-full shadow-md backdrop-blur">
                <Tag className="h-3 w-3 mr-1" />
                {article.category}
              </span>
            )}

            {/* View Count Badge */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {article.view_count.toLocaleString('id-ID')}
            </div>
          </div>
        )}
        
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors">
            {article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
          
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
            
            <span className="text-red-600 font-semibold text-[10px] uppercase tracking-wider">
              Baca →
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
