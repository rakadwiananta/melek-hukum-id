'use client'

import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Award, TrendingUp, Users, BarChart3 } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface ArticleFooterProps {
  article: {
    id: string
    title: string
    author: string
    like_count: number
    comment_count?: number
    view_count?: number
    share_count?: number
  }
  isLiked: boolean
  isSaved: boolean
  likeCount: number
  onLike: () => void
  onSave: () => void
  onShare: () => void
  onComment: () => void
}

// Simulated reader statistics
const readerStats = {
  totalReaders: 145780,
  averageRating: 4.7,
  completionRate: 89,
  shareRate: 23,
  monthlyGrowth: 15.5
}

export default function ArticleFooter({
  article,
  isLiked,
  isSaved,
  likeCount,
  onLike,
  onSave,
  onShare,
  onComment
}: ArticleFooterProps) {
  const [animateStats, setAnimateStats] = useState(false)
  const [readerCount, setReaderCount] = useState(0)

  useEffect(() => {
    // Animate stats on mount
    setTimeout(() => setAnimateStats(true), 100)
    
    // Animate reader count
    const targetCount = article.view_count || 1000
    const increment = targetCount / 50
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= targetCount) {
        setReaderCount(targetCount)
        clearInterval(timer)
      } else {
        setReaderCount(Math.floor(current))
      }
    }, 30)
    
    return () => clearInterval(timer)
  }, [article.view_count])

  return (
    <footer className="mt-16 pt-8 border-t-2 border-gray-200">
      {/* Reader Statistics Section */}
      <div className={`mb-10 p-8 bg-gradient-to-br from-amber-50 via-red-50 to-amber-50 rounded-3xl border border-amber-200 ${animateStats ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-red-600" />
          Statistik Pembaca
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{readerCount.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600">Total Pembaca</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{readerStats.averageRating}/5</p>
            <p className="text-sm text-gray-600">Rating Artikel</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{readerStats.completionRate}%</p>
            <p className="text-sm text-gray-600">Selesai Dibaca</p>
          </div>
          
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <Share2 className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{readerStats.shareRate}%</p>
            <p className="text-sm text-gray-600">Dibagikan</p>
          </div>
        </div>
      </div>

      {/* Author Info with 3D Card */}
      <div className={`mb-10 ${animateStats ? 'animate-fade-in-up animation-delay-100' : 'opacity-0'}`}>
        <h3 className="text-xl font-bold mb-6 text-gray-900">Tentang Penulis</h3>
        <div className="relative group">
          {/* 3D Shadow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
          
          <div className="relative bg-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900">{article.author}</h4>
                <p className="text-sm text-gray-600 mb-3">Penulis Hukum Tersertifikasi</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    <Award className="h-3 w-3 mr-1" />
                    Expert Writer
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    <Users className="h-3 w-3 mr-1" />
                    {(readerStats.totalReaders / 1000).toFixed(0)}K+ Pembaca
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Top Contributor
                  </span>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Ikuti
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className={`flex flex-wrap items-center justify-between gap-4 mb-10 ${animateStats ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          {/* Like Button with Animation */}
          <button
            onClick={onLike}
            className={cn(
              'group relative flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105',
              isLiked 
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                : 'bg-white border-2 border-gray-300 hover:border-red-600 hover:shadow-md'
            )}
          >
            <ThumbsUp className={cn('h-5 w-5 transition-transform group-hover:scale-110', isLiked && 'fill-current animate-bounce')} />
            <span>{likeCount.toLocaleString('id-ID')}</span>
            {isLiked && (
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-600 text-2xl animate-float">
                ❤️
              </span>
            )}
          </button>

          {/* Comment Button */}
          <button
            onClick={onComment}
            className="group relative flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 rounded-full font-semibold hover:border-blue-600 hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="text-gray-700 group-hover:text-blue-600">{article.comment_count || 0}</span>
          </button>

          {/* Save Button */}
          <button
            onClick={onSave}
            className={cn(
              'group relative flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105',
              isSaved 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg' 
                : 'bg-white border-2 border-gray-300 hover:border-amber-600 hover:shadow-md'
            )}
          >
            <Bookmark className={cn('h-5 w-5 transition-transform group-hover:scale-110', isSaved && 'fill-current')} />
            <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <Share2 className="h-5 w-5 relative z-10" />
          <span className="relative z-10">Bagikan Artikel</span>
        </button>
      </div>

      {/* Related Topics Suggestion */}
      <div className={`bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 rounded-3xl text-white relative overflow-hidden ${animateStats ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id="footer-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white"/>
            </pattern>
            <rect width="100" height="100" fill="url(#footer-pattern)" />
          </svg>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">🚀 Tingkatkan Pengetahuan Hukum Anda</h3>
          <p className="mb-6 opacity-90 text-lg">
            Artikel ini telah dibaca {readerCount.toLocaleString('id-ID')} kali. Bergabunglah dengan ribuan pembaca lainnya untuk memahami hukum dengan lebih baik.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all duration-300 text-left group">
              <h4 className="font-semibold mb-1 group-hover:translate-x-1 transition-transform">📚 Kamus Hukum</h4>
              <p className="text-sm opacity-80">Pelajari istilah hukum</p>
            </button>
            
            <button className="p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all duration-300 text-left group">
              <h4 className="font-semibold mb-1 group-hover:translate-x-1 transition-transform">🎯 Kuis Interaktif</h4>
              <p className="text-sm opacity-80">Uji pemahaman Anda</p>
            </button>
            
            <button className="p-4 bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition-all duration-300 text-left group">
              <h4 className="font-semibold mb-1 group-hover:translate-x-1 transition-transform">💬 Konsultasi</h4>
              <p className="text-sm opacity-80">Tanya ahli hukum</p>
            </button>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-10px) translateX(-50%);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 2s ease-in-out;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </footer>
  )
}
