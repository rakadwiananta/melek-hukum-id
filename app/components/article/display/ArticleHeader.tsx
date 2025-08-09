'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatDate, calculateReadingTime } from '@/app/lib/utils'
import { Clock, Eye, Share2, Bookmark, ThumbsUp, User, Calendar, Tag, Award, TrendingUp, MessageCircle } from 'lucide-react'
import { toast } from '@/app/components/ui/use-toast'
import { cn } from '@/app/lib/utils'

interface ArticleHeaderProps {
  article: {
    id: string
    title: string
    content: string
    author: string
    published_at: string
    featured_image?: string
    view_count: number
    like_count: number
    category?: string
    tags?: string[]
    excerpt?: string
    comment_count?: number
  }
  onShare: () => void
  onLike: () => void
  onSave: () => void
  isLiked: boolean
  isSaved: boolean
  likeCount: number
}

// Engagement statistics based on real data
const getEngagementLevel = (views: number, likes: number) => {
  const engagementRate = (likes / views) * 100
  if (engagementRate > 10) return { level: 'Sangat Tinggi', color: 'text-green-600', bg: 'bg-green-100' }
  if (engagementRate > 5) return { level: 'Tinggi', color: 'text-blue-600', bg: 'bg-blue-100' }
  if (engagementRate > 2) return { level: 'Sedang', color: 'text-yellow-600', bg: 'bg-yellow-100' }
  return { level: 'Normal', color: 'text-gray-600', bg: 'bg-gray-100' }
}

export default function ArticleHeader({ 
  article, 
  onShare, 
  onLike, 
  onSave, 
  isLiked, 
  isSaved, 
  likeCount 
}: ArticleHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const engagement = getEngagementLevel(article.view_count, likeCount)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Wayang Pattern Background */}
        <div className="absolute -top-32 -right-32 w-64 h-64 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g transform="translate(100,100)">
              <path d="M0,-80 Q-40,-40 -80,0 Q-40,40 0,80 Q40,40 80,0 Q40,-40 0,-80" 
                    fill="currentColor" className="text-red-700"/>
              <circle cx="0" cy="0" r="30" fill="currentColor" className="text-amber-700"/>
            </g>
          </svg>
        </div>

        {/* Category & Tags Section */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {article.category && (
            <span className="group relative inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
              <Tag className="h-4 w-4 mr-1.5" />
              {article.category}
              <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </span>
          )}
          
          {/* Engagement Badge */}
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${engagement.bg} ${engagement.color}`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            Engagement {engagement.level}
          </span>

          {/* Popular Badge */}
          {article.view_count > 10000 && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-600 text-white animate-pulse">
              <Award className="h-3 w-3 mr-1" />
              Artikel Populer
            </span>
          )}
        </div>

        {/* Title with 3D Effect */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900 relative">
          <span className="relative z-10">{article.title}</span>
          <span className="absolute inset-0 text-red-600/20 transform translate-x-1 translate-y-1 -z-10">{article.title}</span>
        </h1>

        {/* Excerpt with gradient background */}
        {article.excerpt && (
          <div className="relative mb-8 p-6 bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl border border-amber-200">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
              {article.excerpt}
            </p>
            <div className="absolute -top-3 -left-3 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
              </svg>
            </div>
          </div>
        )}

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-gray-500">Penulis</p>
                <p className="font-semibold text-gray-900">{article.author}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar className="h-10 w-10 text-amber-600" />
              <div>
                <p className="text-xs text-gray-500">Dipublikasi</p>
                <p className="font-semibold text-gray-900">{formatDate(article.published_at)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Waktu Baca</p>
                <p className="font-semibold text-gray-900">{calculateReadingTime(article.content)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <Eye className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Dibaca</p>
                <p className="font-semibold text-gray-900">{article.view_count.toLocaleString('id-ID')}×</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Cloud */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Tags Terkait:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`
                    px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm
                    hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:text-white
                    hover:border-transparent hover:shadow-lg transform hover:scale-105
                    transition-all duration-300 cursor-pointer
                    animate-fade-in-up
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="relative">
          <div className="flex items-center gap-3 pb-8 border-b-2 border-gray-200">
            {/* Like Button with 3D effect */}
            <button
              onClick={onLike}
              className={cn(
                'group relative flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105',
                isLiked 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                  : 'bg-white border-2 border-gray-300 hover:border-red-600 hover:shadow-md'
              )}
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <ThumbsUp className={cn('h-5 w-5 transition-transform group-hover:scale-110', isLiked && 'fill-current')} />
              <span className="relative z-10">{likeCount.toLocaleString('id-ID')}</span>
              {isLiked && (
                <span className="absolute -top-2 -right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>

            {/* Comment Button */}
            <button
              className="group relative flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-full font-semibold hover:border-blue-600 hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-gray-700 group-hover:text-blue-600">{article.comment_count || 0}</span>
            </button>

            {/* Save Button */}
            <button
              onClick={onSave}
              className={cn(
                'group relative flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105',
                isSaved 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                  : 'bg-white border-2 border-gray-300 hover:border-amber-600 hover:shadow-md'
              )}
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <Bookmark className={cn('h-5 w-5 transition-transform group-hover:scale-110', isSaved && 'fill-current')} />
              <span className="relative z-10">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
            </button>

            {/* Share Button with ripple effect */}
            <button
              onClick={onShare}
              className="group relative ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-500" />
              <Share2 className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Bagikan</span>
            </button>
          </div>

          {/* Engagement Stats Bar */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border border-gray-200">
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <Eye className="h-4 w-4" />
                <span className="font-semibold">{article.view_count.toLocaleString('id-ID')}</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-gray-600">
                <ThumbsUp className="h-4 w-4" />
                <span className="font-semibold">{likeCount.toLocaleString('id-ID')}</span>
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1 text-gray-600">
                <MessageCircle className="h-4 w-4" />
                <span className="font-semibold">{article.comment_count || 0}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

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
    </>
  )
}
