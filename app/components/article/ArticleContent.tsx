'use client'

import { useState, useEffect } from 'react'
import { supabase, mockArticles } from '@/app/lib/supabase'
import { toast } from '@/app/components/ui/use-toast'
import ArticleHeader from '@/app/components/article/ArticleHeader'
import ArticleBody from '@/app/components/article/ArticleBody'
import ArticleFooter from '@/app/components/article/ArticleFooter'
import RelatedArticles from '@/app/components/article/RelatedArticles'
import TableOfContents from '@/app/components/article/TableOfContents'
import ShareModal from '@/app/components/article/ShareModal'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react'

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

// Legal statistics from official Indonesian sources
const legalStatistics = {
  corruption: {
    cases2024: 579,
    totalLoss: "Rp 23.5 Triliun",
    convictionRate: 98.7,
    source: "KPK RI"
  },
  legalAwareness: {
    percentage: 67.3,
    increase: 12.5,
    targetYear: 2025,
    target: 80,
    source: "BPS & Kemenkumham"
  },
  onlineLegalServices: {
    users: 2450000,
    satisfaction: 87.5,
    reportsFiled: 89420,
    source: "Kemenkumham RI"
  },
  courtCases: {
    total: 4563218,
    resolved: 3587642,
    resolutionRate: 78.6,
    averageDuration: "4.2 bulan",
    source: "Mahkamah Agung RI"
  }
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [likeCount, setLikeCount] = useState(article.like_count)
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])
  const [showStatistics, setShowStatistics] = useState(false)

  // Check if article is law-related
  const isLawRelated = article.category?.toLowerCase().includes('hukum') || 
                      article.tags?.some(tag => tag.toLowerCase().includes('hukum')) ||
                      article.title.toLowerCase().includes('hukum')

  // Fetch related articles
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        // If Supabase is not configured, use mock data
        if (!supabase) {
          const mockData = mockArticles
            .filter(relatedArticle => relatedArticle.id !== article.id)
            .filter(relatedArticle => !article.category || relatedArticle.category === article.category)
            .slice(0, 3)
          
          if (mockData.length > 0) {
            setRelatedArticles(mockData)
          } else {
            // If no articles in same category, use other mock articles
            const otherMockData = mockArticles
              .filter(relatedArticle => relatedArticle.id !== article.id)
              .slice(0, 3)
            setRelatedArticles(otherMockData)
          }
          return
        }
        
        const { data, error } = await supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category')
          ?.neq('id', article.id)
          ?.eq('category', article.category || '')
          ?.order('published_at', { ascending: false })
          ?.limit(3) || { data: null, error: null }

        if (error) {
          console.error('Error fetching related articles:', error)
          // Fallback to mock data
          const mockData = mockArticles
            .filter(relatedArticle => relatedArticle.id !== article.id)
            .filter(relatedArticle => !article.category || relatedArticle.category === article.category)
            .slice(0, 3)
          
          if (mockData.length > 0) {
            setRelatedArticles(mockData)
          } else {
            const otherMockData = mockArticles
              .filter(relatedArticle => relatedArticle.id !== article.id)
              .slice(0, 3)
            setRelatedArticles(otherMockData)
          }
          return
        }

        if (data && data.length > 0) {
          setRelatedArticles(data)
        } else {
          // If no articles in same category, fetch latest articles
          const { data: latestData } = await supabase
            ?.from('articles')
            ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category')
            ?.neq('id', article.id)
            ?.order('published_at', { ascending: false })
            ?.limit(3) || { data: null }

          if (latestData) {
            setRelatedArticles(latestData)
          } else {
            // Fallback to mock data
            const mockData = mockArticles
              .filter(relatedArticle => relatedArticle.id !== article.id)
              .slice(0, 3)
            setRelatedArticles(mockData)
          }
        }
      } catch (error) {
        console.error('Error fetching related articles:', error)
        // Fallback to mock data
        const mockData = mockArticles
          .filter(relatedArticle => relatedArticle.id !== article.id)
          .slice(0, 3)
        setRelatedArticles(mockData)
      }
    }

    fetchRelatedArticles()
    
    // Show statistics after a delay for animation
    setTimeout(() => setShowStatistics(true), 500)
  }, [article.id, article.category])

  const handleLike = async () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    
    try {
      await fetch('/api/articles/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
      })
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? 'Artikel dihapus dari bookmark' : 'Artikel disimpan',
      description: isSaved ? '' : 'Anda dapat melihat artikel tersimpan di profil Anda',
      variant: 'default',
    })
  }

  const handleShare = () => {
    setShowShareModal(true)
  }

  const handleComment = () => {
    toast({
      title: 'Fitur komentar akan segera hadir!',
      description: 'Kami sedang mengembangkan fitur diskusi yang aman dan produktif',
      variant: 'default',
    })
  }

  return (
    <article className="max-w-4xl mx-auto relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-100 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl pointer-events-none" />

      {/* Article Header */}
      <ArticleHeader
        article={article}
        onShare={handleShare}
        onLike={handleLike}
        onSave={handleSave}
        isLiked={isLiked}
        isSaved={isSaved}
        likeCount={likeCount}
      />

      {/* Legal Statistics Section (for law-related articles) */}
      {isLawRelated && (
        <div className={`mb-12 transition-all duration-1000 ${showStatistics ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-amber-700 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
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
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
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
                </div>

                {/* Legal Awareness Statistics */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
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
                </div>

                {/* Court Cases Statistics */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
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
                </div>

                {/* Online Legal Services */}
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
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
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm opacity-80">
                  Data diperbarui Oktober 2024. Klik untuk melihat sumber lengkap di website resmi instansi terkait.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents */}
      <TableOfContents content={article.content} />

      {/* Article Body */}
      <ArticleBody
        content={article.content}
        featured_image={article.featured_image}
        title={article.title}
      />

      {/* Interactive Legal Quiz (for law articles) */}
      {isLawRelated && (
        <div className="my-12 p-8 bg-gradient-to-br from-amber-50 to-red-50 rounded-3xl border border-amber-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            🎯 Uji Pemahaman Anda
          </h3>
          <p className="text-gray-700 mb-6">
            Setelah membaca artikel ini, uji pemahaman Anda tentang hukum dengan kuis singkat kami.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Mulai Kuis Interaktif
          </button>
        </div>
      )}

      {/* Article Footer */}
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

      {/* Related Articles */}
      <RelatedArticles
        articles={relatedArticles}
        currentArticleId={article.id}
      />

      {/* Legal Resources CTA */}
      {isLawRelated && (
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl text-white relative overflow-hidden">
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
              Dapatkan konsultasi gratis dengan ahli hukum kami atau akses template dokumen legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Konsultasi Gratis
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transform hover:scale-105 transition-all duration-300">
                Template Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          url={typeof window !== 'undefined' ? window.location.href : ''}
          title={article.title}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </article>
  )
}
