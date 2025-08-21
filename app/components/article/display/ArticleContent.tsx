'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/app/lib/supabase'
import { toast } from '@/app/components/ui/use-toast'
import ArticleHeader from '@/app/components/article/display/ArticleHeader'
import ArticleBody from '@/app/components/article/display/ArticleBody'
import ArticleFooter from '@/app/components/article/meta/ArticleFooter'
import RelatedArticles from '@/app/components/article/display/RelatedArticles'
import TableOfContents from '@/app/components/article/meta/TableOfContents'
import ShareModal from '@/app/components/article/meta/ShareModal'
import CommentSection from '@/app/components/article/comments/CommentSection'
import MobileCommentFAB from '@/app/components/article/comments/MobileCommentFAB'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, TrendingUp, Users, AlertTriangle, BookOpen, Scale, Download, MessageSquare, Heart, Share2, Bookmark, ChevronRight, PlayCircle, FileText, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface ArticleContentProps {
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
}

// Enhanced legal statistics with more categories
const legalStatistics = {
  corruption: {
    cases2024: 579,
    totalLoss: "Rp 23.5 Triliun",
    convictionRate: 98.7,
    preventedLoss: "Rp 45.2 Triliun",
    source: "KPK RI"
  },
  legalAwareness: {
    percentage: 67.3,
    increase: 12.5,
    targetYear: 2025,
    target: 80,
    educationPrograms: 234,
    source: "BPS & Kemenkumham"
  },
  onlineLegalServices: {
    users: 2450000,
    satisfaction: 87.5,
    reportsFiled: 89420,
    documentsProcessed: 1234567,
    source: "Kemenkumham RI"
  },
  courtCases: {
    total: 4563218,
    resolved: 3587642,
    resolutionRate: 78.6,
    averageDuration: "4.2 bulan",
    mediationSuccess: 65.3,
    source: "Mahkamah Agung RI"
  },
  legalAid: {
    recipients: 234567,
    organizations: 524,
    budget: "Rp 123.4 Miliar",
    successRate: 82.1,
    source: "BPHN"
  }
}

// Legal quiz questions
const legalQuizQuestions = [
  {
    question: "Berapa lama masa kadaluwarsa untuk melaporkan tindak pidana korupsi?",
    options: ["5 tahun", "10 tahun", "15 tahun", "Tidak ada kadaluwarsa"],
    correct: 3,
    explanation: "Tindak pidana korupsi tidak mengenal kadaluwarsa berdasarkan UU Tipikor."
  },
  {
    question: "Apa yang dimaksud dengan asas praduga tak bersalah?",
    options: [
      "Tersangka harus membuktikan dirinya tidak bersalah",
      "Setiap orang dianggap tidak bersalah sampai ada putusan pengadilan",
      "Hakim bebas menentukan bersalah atau tidak",
      "Polisi yang menentukan bersalah atau tidak"
    ],
    correct: 1,
    explanation: "Asas praduga tak bersalah menyatakan bahwa setiap orang dianggap tidak bersalah sampai dibuktikan kesalahannya oleh putusan pengadilan yang berkekuatan hukum tetap."
  }
]

export default function ArticleContent({ article }: ArticleContentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [likeCount, setLikeCount] = useState(article.like_count)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [showStatistics, setShowStatistics] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showVideoGuide, setShowVideoGuide] = useState(false)
  const [downloadableResources, setDownloadableResources] = useState<any[]>([])
  const [showCommentForm, setShowCommentForm] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Check if article is law-related
  const isLawRelated = article.category?.toLowerCase().includes('hukum') || 
                      article.tags?.some(tag => tag.toLowerCase().includes('hukum')) ||
                      article.title.toLowerCase().includes('hukum')

  // Fetch related articles and resources
  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        // Fetch related articles
        if (!supabase) {
          setRelatedArticles([])
        }

        // Set downloadable resources based on category
        if (isLawRelated) {
          setDownloadableResources([
            { id: 1, title: 'Template Surat Gugatan', type: 'DOCX', size: '245 KB', icon: FileText },
            { id: 2, title: 'Panduan Mediasi Perdata', type: 'PDF', size: '1.2 MB', icon: BookOpen },
            { id: 3, title: 'Checklist Dokumen Hukum', type: 'PDF', size: '567 KB', icon: FileText },
            { id: 4, title: 'Format Laporan Polisi', type: 'DOCX', size: '189 KB', icon: FileText }
          ])
        }
        
        // Show statistics after delay
        setTimeout(() => setShowStatistics(true), 500)
      } catch (error) {
        console.error('Error fetching related data:', error)
      }
    }

    fetchRelatedData()
  }, [article.id, article.category, isLawRelated])

  const handleLike = async () => {
    const previousState = isLiked
    const previousCount = likeCount
    
    // Optimistic update
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    
    try {
      const response = await fetch(`/api/articles/${article.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLiked ? 'unlike' : 'like'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update like')
      }

      // Update with actual count from server
      setLikeCount(data.likeCount)
      
      toast({
        title: previousState ? 'Like dibatalkan' : 'Artikel disukai!',
        description: previousState ? '' : 'Terima kasih atas apresiasi Anda',
        variant: 'default',
      })
    } catch (error: any) {
      console.error('Error updating like:', error)
      // Revert optimistic update
      setIsLiked(previousState)
      setLikeCount(previousCount)
      
      toast({
        title: 'Terjadi kesalahan',
        description: error.message || 'Gagal memperbarui like. Silakan coba lagi.',
        variant: 'destructive',
      })
    }
  }
  
  const handleSave = async () => {
    const previousState = isSaved
    
    // Optimistic update
    setIsSaved(!isSaved)
    
    try {
      const response = await fetch(`/api/articles/${article.id}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isSaved ? 'unsave' : 'save'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update bookmark')
      }
      
      toast({
        title: previousState ? 'Artikel dihapus dari bookmark' : 'Artikel disimpan',
        description: previousState ? '' : 'Anda dapat melihat artikel tersimpan di profil Anda',
        variant: 'default',
      })
    } catch (error: any) {
      console.error('Error updating bookmark:', error)
      // Revert optimistic update
      setIsSaved(previousState)
      
      toast({
        title: 'Terjadi kesalahan',
        description: error.message || 'Gagal memperbarui bookmark. Silakan coba lagi.',
        variant: 'destructive',
      })
    }
  }
  
  const handleShare = () => {
    setShowShareModal(true)
  }
  
  const handleComment = () => {
    // Scroll to comment section
    const commentSection = document.getElementById('comment-section')
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToComments = () => {
    const commentSection = document.getElementById('comment-section')
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenCommentForm = () => {
    setShowCommentForm(true)
    // Scroll to comment section after opening form
    setTimeout(() => {
      const commentSection = document.getElementById('comment-section')
      if (commentSection) {
        commentSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
  
  // Track article view
  useEffect(() => {
    const trackView = async () => {
      try {
        if (!supabase) {
          // Handle mock data - update view count in localStorage
          const viewedArticles = JSON.parse(localStorage.getItem('viewedArticles') || '{}')
          if (!viewedArticles[article.id]) {
            viewedArticles[article.id] = true
            localStorage.setItem('viewedArticles', JSON.stringify(viewedArticles))
          }
          return
        }
        
        // Update view count in database
        const { error } = await supabase
          .from('articles')
          .update({ view_count: article.view_count + 1 })
          .eq('id', article.id)
        
        if (error) throw error
        
        // Track view analytics
        await supabase
          .from('article_views')
          .insert({
            article_id: article.id,
            viewed_at: new Date().toISOString(),
            user_agent: navigator.userAgent,
            referrer: document.referrer
          })
      } catch (error) {
        console.error('Error tracking view:', error)
      }
    }
    
    trackView()
  }, [article.id])
  
  // Initialize like and save states from API
  useEffect(() => {
    const initializeStates = async () => {
      try {
        // Check like status
        const likeResponse = await fetch(`/api/articles/${article.id}/like`)
        if (likeResponse.ok) {
          const likeData = await likeResponse.json()
          setIsLiked(likeData.isLiked)
          setLikeCount(likeData.likeCount)
        }

        // Check bookmark status
        const bookmarkResponse = await fetch(`/api/articles/${article.id}/bookmark`)
        if (bookmarkResponse.ok) {
          const bookmarkData = await bookmarkResponse.json()
          setIsSaved(bookmarkData.isBookmarked)
        }
      } catch (error) {
        console.error('Error initializing states:', error)
        // Fallback to localStorage for offline functionality
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]')
        setIsSaved(savedArticles.includes(article.id))
      }
    }
    
    initializeStates()
  }, [article.id])
  
  return (
    <article className="max-w-4xl mx-auto relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl pointer-events-none animate-pulse" />
  
      {/* Batik Pattern Background */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <pattern id="article-batik" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <g transform="translate(50,50)">
              <circle cx="0" cy="0" r="40" fill="none" stroke="#8B4513" strokeWidth="1"/>
              <circle cx="0" cy="0" r="30" fill="none" stroke="#D2691E" strokeWidth="0.8"/>
              <circle cx="0" cy="0" r="20" fill="none" stroke="#CD853F" strokeWidth="0.6"/>
              <circle cx="0" cy="0" r="10" fill="#A0522D" opacity="0.3"/>
            </g>
          </pattern>
          <rect width="400" height="400" fill="url(#article-batik)" />
        </svg>
      </div>
  
      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ArticleHeader
          article={article}
          onShare={handleShare}
          onLike={handleLike}
          onSave={handleSave}
          isLiked={isLiked}
          isSaved={isSaved}
          likeCount={likeCount}
        />
      </motion.div>
  
      {/* Legal Statistics Section (for law-related articles) */}
      {isLawRelated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: showStatistics ? 1 : 0, scale: showStatistics ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <pattern id="law-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="10" height="10" fill="white" opacity="0.1"/>
                  <rect x="10" y="10" width="10" height="10" fill="white" opacity="0.1"/>
                </pattern>
                <rect width="100" height="100" fill="url(#law-pattern)" />
              </svg>
            </div>
  
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                <BarChart3 className="h-8 w-8" />
                Statistik Hukum Indonesia Terkini
              </h3>
  
              <div className="grid md:grid-cols-2 gap-6">
                {/* Corruption Statistics */}
                <motion.div 
                  className="bg-white/10 backdrop-blur rounded-2xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Anti Korupsi
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Kasus Ditangani (2024)</span>
                      <span className="font-bold text-lg">{legalStatistics.corruption.cases2024}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Kerugian Negara</span>
                      <span className="font-bold text-lg">{legalStatistics.corruption.totalLoss}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Tingkat Vonis</span>
                      <span className="font-bold text-lg">{legalStatistics.corruption.convictionRate}%</span>
                    </div>
                    <p className="text-xs opacity-70 mt-2">Sumber: {legalStatistics.corruption.source}</p>
                  </div>
                </motion.div>
  
                {/* Legal Awareness Statistics */}
                <motion.div 
                  className="bg-white/10 backdrop-blur rounded-2xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Kesadaran Hukum
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Tingkat Saat Ini</span>
                      <span className="font-bold text-lg">{legalStatistics.legalAwareness.percentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Peningkatan YoY</span>
                      <span className="font-bold text-lg text-green-300">+{legalStatistics.legalAwareness.increase}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Target {legalStatistics.legalAwareness.targetYear}</span>
                      <span className="font-bold text-lg">{legalStatistics.legalAwareness.target}%</span>
                    </div>
                    <p className="text-xs opacity-70 mt-2">Sumber: {legalStatistics.legalAwareness.source}</p>
                  </div>
                </motion.div>
  
                {/* Court Cases Statistics */}
                <motion.div 
                  className="bg-white/10 backdrop-blur rounded-2xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Penyelesaian Perkara
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Total Perkara</span>
                      <span className="font-bold text-lg">{(legalStatistics.courtCases.total / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Tingkat Penyelesaian</span>
                      <span className="font-bold text-lg">{legalStatistics.courtCases.resolutionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Rata-rata Durasi</span>
                      <span className="font-bold text-lg">{legalStatistics.courtCases.averageDuration}</span>
                    </div>
                    <p className="text-xs opacity-70 mt-2">Sumber: {legalStatistics.courtCases.source}</p>
                  </div>
                </motion.div>
  
                {/* Online Legal Services */}
                <motion.div 
                  className="bg-white/10 backdrop-blur rounded-2xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Layanan Hukum Digital
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Pengguna Aktif</span>
                      <span className="font-bold text-lg">{(legalStatistics.onlineLegalServices.users / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Tingkat Kepuasan</span>
                      <span className="font-bold text-lg">{legalStatistics.onlineLegalServices.satisfaction}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Laporan Online</span>
                      <span className="font-bold text-lg">{(legalStatistics.onlineLegalServices.reportsFiled / 1000).toFixed(1)}K</span>
                    </div>
                    <p className="text-xs opacity-70 mt-2">Sumber: {legalStatistics.onlineLegalServices.source}</p>
                  </div>
                </motion.div>
              </div>
  
              <div className="mt-6 text-center">
                <p className="text-sm opacity-80">
                  Data diperbarui Oktober 2024. Klik untuk melihat sumber lengkap di website resmi instansi terkait.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
  
      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <TableOfContents content={article.content} />
      </motion.div>
  
      {/* Article Body */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <ArticleBody
          content={article.content}
          featured_image={article.featured_image}
          title={article.title}
        />
      </motion.div>
  
      {/* Interactive Legal Quiz (for law articles) */}
      {isLawRelated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="my-12 p-8 bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl border border-amber-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            🎯 Uji Pemahaman Anda
          </h3>
          <p className="text-gray-700 mb-6">
            Setelah membaca artikel ini, uji pemahaman Anda tentang hukum dengan kuis singkat kami.
          </p>
          <Link 
            href="/tools/kuis-korupsi"
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
          >
            Mulai Kuis Interaktif
          </Link>
        </motion.div>
      )}
  
      {/* Article Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <ArticleFooter
          article={article}
          isLiked={isLiked}
          isSaved={isSaved}
          likeCount={likeCount}
          onLike={handleLike}
          onSave={handleSave}
          onShare={handleShare}
          onComment={handleComment}
        />
      </motion.div>
  
      {/* Related Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <RelatedArticles
          articles={relatedArticles}
          currentArticleId={article.id}
        />
      </motion.div>
  
      {/* Legal Resources CTA */}
      {isLawRelated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Butuh Bantuan Hukum?</h3>
            <p className="mb-6 opacity-90">
              Dapatkan konsultasi terjangkau dengan ahli hukum kami atau akses template dokumen legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/panduan"
                className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
              >
                Panduan Hukum
              </Link>
              <Link 
                href="/solusi/template"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transform hover:scale-105 transition-all duration-300 text-center"
              >
                Template Dokumen
              </Link>
            </div>
          </div>
        </motion.div>
      )}
  
      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={article.title}
          onClose={() => setShowShareModal(false)}
        />
      )}
  
      {/* Comment Section */}
      <div id="comment-section">
        <CommentSection 
          articleId={article.id} 
          initialCommentCount={article.comment_count}
          showCommentForm={showCommentForm}
          onToggleCommentForm={setShowCommentForm}
        />
      </div>

      {/* Mobile Comment FAB */}
      <MobileCommentFAB
        commentCount={article.comment_count || 0}
        onScrollToComments={handleScrollToComments}
        onOpenCommentForm={handleOpenCommentForm}
      />
    </article>
  )
  }
  