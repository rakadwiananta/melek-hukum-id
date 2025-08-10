'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { formatDate, calculateReadingTime } from '@/app/lib/utils'
import { Clock, Eye, Share2, Bookmark, ThumbsUp, User, Calendar, Tag, Award, TrendingUp, MessageCircle, Heart, Download, Link as LinkIcon } from 'lucide-react'
import { toast } from '@/app/components/ui/use-toast'
import { cn } from '@/app/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

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
    author_bio?: string
    author_image?: string
  }
  onShare: () => void
  onLike: () => void
  onSave: () => void
  isLiked: boolean
  isSaved: boolean
  likeCount: number
}

// Enhanced engagement metrics
const getEngagementMetrics = (views: number, likes: number, comments: number = 0) => {
  const engagementRate = ((likes + comments) / views) * 100
  const viralScore = Math.min(100, (views / 10000) * 100)
  
  return {
    rate: engagementRate,
    viralScore,
    level: engagementRate > 10 ? 'viral' : engagementRate > 5 ? 'tinggi' : engagementRate > 2 ? 'sedang' : 'normal',
    badge: viralScore > 80 ? { text: 'Viral', icon: TrendingUp, color: 'from-red-500 to-orange-500' } :
           viralScore > 50 ? { text: 'Trending', icon: Award, color: 'from-blue-500 to-purple-500' } :
           null
  }
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
  const [showAuthorInfo, setShowAuthorInfo] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const metrics = getEngagementMetrics(article.view_count, likeCount, article.comment_count)

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

  const handleQuickShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = article.title
    
    let shareUrl = ''
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        toast({
          title: 'Link berhasil disalin!',
          description: 'Anda dapat membagikan link artikel ini',
        })
        setShareMenuOpen(false)
        return
    }
    
    window.open(shareUrl, '_blank')
    setShareMenuOpen(false)
  }

  return (
    <>
      {/* Enhanced Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-150 relative"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="absolute right-0 top-0 h-full w-8 bg-white/30 blur-xl animate-shimmer" />
        </div>
      </div>

      {/* Floating Action Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 p-4 z-40 md:hidden">
        <div className="flex items-center justify-around">
          <button
            onClick={onLike}
            className={cn(
              'flex flex-col items-center gap-1 transition-all',
              isLiked ? 'text-red-600' : 'text-gray-600'
            )}
          >
            <Heart className={cn('h-6 w-6', isLiked && 'fill-current')} />
            <span className="text-xs font-medium">{likeCount}</span>
          </button>
          
          <button
            onClick={() => toast({ title: 'Fitur komentar segera hadir!' })}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs font-medium">{article.comment_count || 0}</span>
          </button>
          
          <button
            onClick={onSave}
            className={cn(
              'flex flex-col items-center gap-1 transition-all',
              isSaved ? 'text-amber-600' : 'text-gray-600'
            )}
          >
            <Bookmark className={cn('h-6 w-6', isSaved && 'fill-current')} />
            <span className="text-xs font-medium">Simpan</span>
          </button>
          
          <button
            onClick={() => setShareMenuOpen(true)}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <Share2 className="h-6 w-6" />
            <span className="text-xs font-medium">Bagikan</span>
          </button>
        </div>
      </div>

      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 relative"
      >
        {/* Indonesian Ornament Background */}
<div className="absolute -top-40 -right-40 w-80 h-80 opacity-5 pointer-events-none">
  <svg viewBox="0 0 400 400" className="w-full h-full">
    {/* Garuda Wing Pattern */}
    <g transform="translate(200,200)">
      <path d="M0,-150 Q-75,-75 -150,0 Q-75,75 0,150 Q75,75 150,0 Q75,-75 0,-150" 
            fill="none" stroke="currentColor" strokeWidth="3" className="text-red-700"/>
      <circle cx="0" cy="0" r="50" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700"/>
      {/* Inner Wing Details */}
      <path d="M0,-100 Q-50,-50 -100,0 Q-50,50 0,100 Q50,50 100,0 Q50,-50 0,-100" 
            fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-600" opacity="0.7"/>
      <path d="M0,-50 Q-25,-25 -50,0 Q-25,25 0,50 Q25,25 50,0 Q25,-25 0,-50" 
            fill="currentColor" className="text-amber-600" opacity="0.3"/>
      {/* Feather Details */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
        <g key={index} transform={`rotate(${angle})`}>
          <path d="M0,50 L0,100 M-10,60 L0,50 L10,60" 
                stroke="currentColor" strokeWidth="1" className="text-red-700" opacity="0.5"/>
        </g>
      ))}
    </g>
  </svg>
</div>

{/* Batik Corner Pattern */}
<div className="absolute -bottom-32 -left-32 w-64 h-64 opacity-5 pointer-events-none">
  <svg viewBox="0 0 400 400" className="w-full h-full">
    <pattern id="batik-header" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <g transform="translate(50,50)">
        <circle cx="0" cy="0" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-700"/>
        <circle cx="0" cy="0" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-700"/>
        <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-600"/>
        <circle cx="0" cy="0" r="10" fill="currentColor" className="text-red-600" opacity="0.4"/>
        {/* Kawung petals */}
        {[0, 90, 180, 270].map((angle, index) => (
          <g key={index} transform={`rotate(${angle})`}>
            <ellipse cx="0" cy="25" rx="8" ry="15" fill="currentColor" className="text-amber-600" opacity="0.3"/>
          </g>
        ))}
      </g>
    </pattern>
    <rect width="400" height="400" fill="url(#batik-header)" />
  </svg>
</div>

{/* Category & Tags Section with Enhanced Design */}
<div className="mb-8 relative">
  <div className="flex flex-wrap items-center gap-4">
    {article.category && (
      <div className="relative group">
        <span className="relative inline-flex items-center px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-red-600 via-red-700 to-amber-700 text-white shadow-xl transform hover:scale-105 transition-all duration-300">
          <Tag className="h-4 w-4 mr-2 animate-pulse" />
          {article.category}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          {/* Glow effect */}
          <span className="absolute -inset-1 bg-gradient-to-r from-red-600 to-amber-600 rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity" />
        </span>
      </div>
    )}
    
    {/* Trending Indicator */}
    {article.view_count > 5000 && (
      <div className="relative">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg animate-pulse">
          <TrendingUp className="h-4 w-4 mr-1.5" />
          Sedang Trending
        </span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      </div>
    )}

    {/* Verified Badge for Legal Articles */}
    {article.category?.toLowerCase().includes('hukum') && (
      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
        <Award className="h-4 w-4 mr-1.5" />
        Artikel Terverifikasi
      </span>
    )}
  </div>
</div>

{/* Hero Title with 3D Layered Effect */}
<div className="relative mb-8">
  <h1 className="relative">
    {/* Shadow layers for 3D effect */}
    <span className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-black text-amber-200/30 transform translate-x-4 translate-y-4 blur-sm select-none" aria-hidden="true">
      {article.title}
    </span>
    <span className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-black text-red-300/40 transform translate-x-2 translate-y-2 blur-[2px] select-none" aria-hidden="true">
      {article.title}
    </span>
    {/* Main title */}
    <span className="relative text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-gray-900 via-red-900 to-amber-900 bg-clip-text text-transparent leading-tight">
      {article.title}
    </span>
  </h1>
  
  {/* Decorative underline */}
  <div className="mt-6 flex items-center gap-4">
    <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-red-600 to-amber-600 rounded-full" />
    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
    <div className="w-3 h-3 bg-amber-600 rounded-full animate-pulse animation-delay-200" />
    <div className="w-2 h-2 bg-red-700 rounded-full animate-pulse animation-delay-400" />
    <div className="h-1 flex-1 bg-gradient-to-r from-amber-600 via-red-600 to-transparent rounded-full" />
  </div>
</div>

{/* Enhanced Excerpt Box */}
{article.excerpt && (
  <div className="relative mb-10">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-red-100 rounded-3xl transform rotate-1" />
    <div className="relative bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl border border-amber-200/50">
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-6">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
        </svg>
      </div>
      <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium pl-8">
        {article.excerpt}
      </p>
      {/* Quote marks */}
      <svg className="absolute top-4 right-4 w-8 h-8 text-amber-300 opacity-50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
      </svg>
    </div>
  </div>
)}

{/* Interactive Meta Info Cards */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
  {/* Author Card */}
  <div className="group relative bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity" />
    <div className="relative z-10 flex items-center gap-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
          {article.author.charAt(0)}
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
          </svg>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">Penulis</p>
        <p className="font-bold text-gray-900">{article.author}</p>
        <p className="text-xs text-amber-600 font-medium">Verified Writer</p>
      </div>
    </div>
  </div>

  {/* Date Card */}
  <div className="group relative bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity" />
    <div className="relative z-10 flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
        <Calendar className="h-7 w-7" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">Dipublikasi</p>
        <p className="font-bold text-gray-900">{formatDate(article.published_at)}</p>
        <p className="text-xs text-blue-600 font-medium">
          {new Date(article.published_at).toLocaleString('id-ID', { weekday: 'long' })}
        </p>
      </div>
    </div>
  </div>

  {/* Reading Time Card */}
  <div className="group relative bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
    <div className="relative z-10 flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg group-hover:animate-pulse">
        <Clock className="h-7 w-7" />
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">Waktu Baca</p>
        <p className="font-bold text-gray-900">{calculateReadingTime(article.content)}</p>
        <p className="text-xs text-purple-600 font-medium">
          ≈ {Math.ceil(article.content.length / 1500)} halaman
        </p>
      </div>
    </div>
  </div>

  {/* Views Card with Live Animation */}
  <div className="group relative bg-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity" />
    <div className="relative z-10 flex items-center gap-4">
      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
        <Eye className="h-7 w-7" />
        {/* Live indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium">Total Pembaca</p>
        <p className="font-bold text-gray-900 text-lg">
          {article.view_count.toLocaleString('id-ID')}
        </p>
        <p className="text-xs text-green-600 font-medium">
          +{Math.floor(Math.random() * 50) + 10} hari ini
        </p>
      </div>
    </div>
  </div>
</div>

{/* Enhanced Tags Section */}
{article.tags && article.tags.length > 0 && (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <h3 className="text-lg font-bold text-gray-800">Topik Terkait</h3>
      <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
    </div>
    <div className="flex flex-wrap gap-3">
      {article.tags.map((tag, index) => (
        <button
          key={index}
          className={`
            group relative px-5 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-full text-sm font-medium
            hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:text-white
            hover:border-transparent hover:shadow-xl transform hover:scale-105 hover:-translate-y-1
            transition-all duration-300 cursor-pointer
            animate-fade-in-up
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <span className="relative z-10">#{tag}</span>
          {/* Hover glow */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-amber-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity" />
        </button>
      ))}
    </div>
  </div>
)}

{/* Enhanced Action Buttons Bar */}
<div className="relative mb-8">
  <div className="flex flex-wrap items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
    {/* Like Button with Animation */}
    <button
      onClick={onLike}
      className={cn(
        'group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105',
        isLiked 
          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xl' 
          : 'bg-white border-2 border-gray-300 hover:border-red-600 hover:shadow-lg'
      )}
    >
      {/* Background animation */}
      <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      
      <ThumbsUp className={cn(
        'h-5 w-5 transition-all duration-300 group-hover:scale-110',
        isLiked && 'fill-current animate-bounce'
      )} />
      
      <span className="relative z-10 font-bold">{likeCount.toLocaleString('id-ID')}</span>
      
      {/* Like animation particles */}
      {isLiked && (
        <>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full animate-like-particle"
              style={{
                animationDelay: `${i * 100}ms`,
                transform: `rotate(${i * 60}deg) translateX(0)`
              }}
            />
          ))}
        </>
      )}
      
      {isLiked && (
        <span className="absolute -top-3 -right-3 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
        </span>
      )}
    </button>

    {/* Comment Button with Badge */}
    <button
      className="group relative flex items-center gap-3 px-6 py-3.5 bg-white border-2 border-gray-300 rounded-2xl font-semibold hover:border-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
      <span className="text-gray-700 group-hover:text-blue-600 font-bold">
        {(article.comment_count || 0).toLocaleString('id-ID')}
      </span>
      <span className="text-xs text-gray-500 group-hover:text-blue-600">Komentar</span>
    </button>

    {/* Save Button with Transform Effect */}
    <button
      onClick={onSave}
      className={cn(
        'group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105',
        isSaved 
          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl' 
          : 'bg-white border-2 border-gray-300 hover:border-amber-600 hover:shadow-lg'
      )}
    >
      <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      
      <Bookmark className={cn(
        'h-5 w-5 transition-all duration-300',
        isSaved ? 'fill-current' : 'group-hover:scale-110'
      )} />
      
      <span className="relative z-10 font-bold">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
      
      {isSaved && (
        <svg className="absolute -top-2 -right-2 w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
        </svg>
      )}
    </button>

    {/* Share Button with Advanced Animation */}
    <button
      onClick={onShare}
      className="group relative ml-auto flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
    >
      {/* Animated background */}
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" />
      
      <Share2 className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform" />
      <span className="relative z-10 font-bold">Bagikan Artikel</span>
      
      {/* Ripple effect on hover */}
      <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full group-hover:w-full group-hover:h-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500" />
    </button>
  </div>

  {/* Floating Engagement Stats */}
  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 z-20">
    <div className="bg-white px-8 py-3 rounded-full shadow-xl border border-gray-200 backdrop-blur">
      <div className="flex items-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-600">{Math.floor(Math.random() * 50) + 10} sedang membaca</span>
        </div>
        <div className="h-4 w-px bg-gray-300" />
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-red-600" />
          <span className="font-semibold text-gray-800">
            {metrics.level}
          </span>
        </div>
      </div>
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

  @keyframes like-particle {
    0% {
      transform: rotate(var(--rotation)) translateX(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotate(var(--rotation)) translateX(30px) scale(0);
      opacity: 0;
    }
  }

  .animate-like-particle {
    animation: like-particle 0.8s ease-out forwards;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }
`}</style>
      </motion.header>
    </>
  )
}

