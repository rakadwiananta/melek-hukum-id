'use client'

import Link from 'next/link'
import { formatDate, calculateReadingTime } from '@/app/lib/utils'
import { Clock, Eye, Tag, TrendingUp, Award, Flame, Heart, MessageCircle, Share2, BookOpen, BarChart2, ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import ArticleImage, { ArticleCardImage, ArticleHeroImage } from '@/app/components/ui/ArticleImage'
import { EnhancedArticleCardImage, EnhancedArticleHeroImage } from '@/app/components/ui/AdvancedArticleImage'
import { RobustArticleCardImage, RobustArticleHeroImage } from '@/app/components/ui/RobustArticleImage'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt: string
    content?: string
    featured_image?: string
    published_at: string
    view_count: number
    category?: string
    author?: string
    author_avatar?: string
    reading_time?: number
    popularity_score?: number
    like_count?: number
    comment_count?: number
    tags?: string[]
  }
  variant?: 'default' | 'featured' | 'compact' | '3d-batik' | 'magazine' | 'minimal' | 'interactive'
  showStats?: boolean
  index?: number
}

export default function ArticleCard({ article, variant = 'default', showStats = true, index }: ArticleCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(article.like_count || 0)
  const cardRef = useRef<HTMLElement>(null)
  const controls = useAnimation()

  // Calculate reading time if content is available
  const readingTime = article.reading_time || (article.content ? calculateReadingTime(article.content) : '5 menit')

  // Enhanced popularity calculation
  const getPopularityInfo = (views: number, likes?: number, comments?: number) => {
    const score = views + (likes || 0) * 10 + (comments || 0) * 20
    
    if (score > 50000) return { 
      text: 'Viral', 
      color: 'from-red-500 to-orange-500', 
      bgColor: 'bg-red-500',
      icon: Flame,
      animation: true 
    }
    if (score > 20000) return { 
      text: 'Trending', 
      color: 'from-orange-500 to-amber-500', 
      bgColor: 'bg-orange-500',
      icon: TrendingUp,
      animation: true 
    }
    if (score > 10000) return { 
      text: 'Populer', 
      color: 'from-blue-500 to-purple-500', 
      bgColor: 'bg-blue-500',
      icon: Award,
      animation: false 
    }
    return null
  }

  const popularity = getPopularityInfo(article.view_count, article.like_count, article.comment_count)

  // Eager-load only for first few items when index is provided by parent
  const shouldEagerLoad = typeof index === 'number' && index >= 0 && index < 6

  // Handle like action
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
    
    // Trigger animation
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    })
  }

  // Handle share action  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: `/artikel/${article.slug}`
      })
    }
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: (typeof index === 'number' ? index : 0) * 0.1 }
          })
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [controls, index])

  // Interactive variant with full animations
  if (variant === 'interactive') {
    return (
      <motion.article
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        whileHover={{ y: -5 }}
        className="relative group"
      >
        <Link href={`/artikel/${article.slug}`}>
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Image Section with Ken Burns effect */}
            <div className="relative h-64 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  transition: { duration: 10, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <RobustArticleCardImage
                  src={article.featured_image}
                  alt={article.title}
                  category={article.category}
                  className="object-cover"
                  priority={shouldEagerLoad}
                  index={index}
                />
              </motion.div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Floating stats */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white/90">
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full text-sm">
                      <Eye className="h-4 w-4" />
                      {article.view_count.toLocaleString('id-ID')}
                    </span>
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full text-sm">
                      <Clock className="h-4 w-4" />
                      {readingTime}
                    </span>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      animate={controls}
                      onClick={handleLike}
                      className={`p-2 rounded-full backdrop-blur transition-all ${
                        isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.button>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-white/20 text-white rounded-full backdrop-blur hover:bg-white/30 transition-all"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Category badge with animation */}
                {article.category && (
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-4 left-4"
                  >
                    <span className="inline-flex items-center px-3 py-1.5 bg-red-600/90 text-white text-xs font-semibold rounded-full backdrop-blur">
                      {article.category}
                    </span>
                  </motion.div>
                )}

                {/* Popularity indicator */}
                {popularity && (
                  <motion.div
                    animate={popularity.animation ? {
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-4 right-4"
                  >
                    <span className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${popularity.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {popularity.text}
                    </span>
                  </motion.div>
                )}
              </div>
            
            {/* Content Section */}
            <div className="p-6">
              {/* Author info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-red-400 to-amber-600">
                  {article.author_avatar ? (
                    <ArticleImage
                      src={article.author_avatar}
                      alt={article.author || 'Author'}
                      fill
                      className="object-cover"
                      loading="lazy"
                      showSkeleton={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {article.author?.charAt(0) || 'A'}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{article.author || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{formatDate(article.published_at)}</p>
                </div>
              </div>

              {/* Title with hover effect */}
              <h3 className="font-bold text-xl mb-3 line-clamp-2 text-gray-900 group-hover:text-red-700 transition-colors">
                {article.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                {article.excerpt}
              </p>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-red-100 hover:text-red-700 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats bar */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                    {likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {article.comment_count || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart2 className="h-4 w-4" />
                    {Math.round((likes / article.view_count) * 100)}%
                  </span>
                </div>
                
                <motion.span
                  whileHover={{ x: 5 }}
                  className="text-red-600 font-semibold text-sm flex items-center gap-1"
                >
                  Baca
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  // Magazine style variant
  if (variant === 'magazine') {
    return (
      <article className="group relative">
        <Link href={`/artikel/${article.slug}`}>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            {/* Background image with parallax effect */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <RobustArticleHeroImage
                src={article.featured_image}
                alt={article.title}
                category={article.category}
                className="object-cover"
                index={index}
              />
            </div>
            
            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Content overlay */}
<div className="absolute inset-0 p-8 flex flex-col justify-end">
  {/* Category & Stats */}
  <div className="flex items-center gap-4 mb-4">
    {article.category && (
      <span className="inline-flex items-center px-3 py-1.5 bg-red-600/90 backdrop-blur text-white text-xs font-semibold rounded-full shadow-lg">
        <Tag className="h-3 w-3 mr-1" />
        {article.category}
      </span>
    )}
    {popularity && (
      <span className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${popularity.color} backdrop-blur text-white text-xs font-semibold rounded-full shadow-lg`}>
        <TrendingUp className="h-3 w-3 mr-1" />
        {popularity.text}
      </span>
    )}
  </div>

  {/* Title */}
  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 drop-shadow-lg">
    {article.title}
  </h3>

  {/* Excerpt */}
  <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2 drop-shadow">
    {article.excerpt}
  </p>

  {/* Meta Info */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4 text-white/80 text-sm">
      {article.author && (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-xs font-bold">
            {article.author.charAt(0)}
          </div>
          <span>{article.author}</span>
        </div>
      )}
      <time dateTime={article.published_at} className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {formatDate(article.published_at)}
      </time>
    </div>
    
    {/* View Count */}
    <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-1 rounded-full">
      <Eye className="h-3 w-3 text-white" />
      <span className="text-white text-sm font-semibold">{article.view_count.toLocaleString('id-ID')}</span>
    </div>
  </div>

  {/* Read More Button */}
  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <span className="inline-flex items-center gap-2 text-white font-semibold">
      Baca Selengkapnya
      <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
    </span>
  </div>
</div>

{/* Hover Effect Overlay */}
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

{/* 3D Shadow Effect */}
<div className="absolute -bottom-4 left-4 right-4 h-20 bg-gradient-to-b from-black/20 to-transparent rounded-b-2xl blur-xl transform scale-95 opacity-0 group-hover:opacity-100 transition-all duration-500" />
</div>
</Link>
</article>
)
}

  // Default variant
  return (
    <article className="group relative bg-white rounded-2xl shadow hover:shadow-lg transition">
      <Link href={`/artikel/${article.slug}`}>
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{article.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 mt-2">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{article.view_count.toLocaleString('id-ID')}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

