'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, Clock, User, Calendar, Tag, Share2, 
  ChevronRight, ArrowLeft, Eye, ThumbsUp, MessageCircle,
  FileText, Scale, Users, Download
} from 'lucide-react'
import Link from 'next/link'

// Wrapper untuk artikel existing agar konsisten dengan template baru
interface ExistingArticleWrapperProps {
  children: React.ReactNode
  title: string
  category: string
  readTime: string
  author?: string
  publishedAt?: string
  tags?: string[]
  summary?: string
}

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-existing" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="25" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-existing)" />
  </svg>
)

const ExistingArticleWrapper: React.FC<ExistingArticleWrapperProps> = ({ 
  children, 
  title, 
  category, 
  readTime, 
  author = 'Tim Ahli Hukum Melek Hukum ID',
  publishedAt = new Date().toISOString(),
  tags = [],
  summary
}) => {
  const [isSharing, setIsSharing] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: summary || title,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link berhasil disalin!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
    }
    setIsSharing(false)
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked-articles') || '[]')
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== window.location.pathname)
      localStorage.setItem('bookmarked-articles', JSON.stringify(updated))
    } else {
      localStorage.setItem('bookmarked-articles', JSON.stringify([...bookmarks, window.location.pathname]))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <BatikPattern />
      
      {/* Enhanced Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link href="/panduan" className="hover:text-blue-600 transition-colors">
              Panduan
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-blue-600 font-medium">{category}</span>
          </motion.nav>

          {/* Article Meta Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h1>
                {summary && (
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {summary}
                  </p>
                )}
                
                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(publishedAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{category}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  disabled={isSharing}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  <Share2 className="w-4 h-4" />
                  {isSharing ? 'Berbagi...' : 'Bagikan'}
                </button>
                
                <button
                  onClick={toggleBookmark}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  {isBookmarked ? 'Tersimpan' : 'Simpan'}
                </button>
              </div>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Existing Content with Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {children}
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mt-8 mb-16"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Suka
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Komentar
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  href="/konsultasi"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  <Users className="w-4 h-4" />
                  Konsultasi Ahli
                </Link>
                <Link
                  href="/panduan"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Panduan
                </Link>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Artikel ini bersifat informatif dan edukatif. Untuk kasus spesifik, disarankan berkonsultasi dengan ahli hukum yang kompeten. 
                    Informasi dapat berubah sesuai perkembangan regulasi terbaru.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ExistingArticleWrapper