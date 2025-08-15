'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'
import { formatDate } from '@/app/lib/utils'
import { Clock, Eye, Tag, ArrowRight, TrendingUp, Award, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ArticleCardImage } from '@/app/components/ui/ArticleImage'

interface ArticleFeaturedProps {
  limit?: number
  showHeader?: boolean
  headerTitle?: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  published_at: string
  view_count: number
  category?: string
  author?: string
}

// Data statistik berdasarkan sumber resmi Indonesia
const legalStats = {
  awareness2024: 72.8, // Kemenkumham RI 2024
  onlineUsers: 3250000, // Sistem Hukum Online Indonesia
  satisfactionRate: 89.2, // Survey Kepuasan Layanan Hukum 2024
  reportsFiled: 125430 // Total laporan online 2024
}

export default function ArticleFeatured({ 
  limit = 3, 
  showHeader = false,
  headerTitle = 'Artikel Unggulan'
}: ArticleFeaturedProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          ?.from('articles')
          ?.select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author')
          ?.eq('featured', true)
          ?.order('published_at', { ascending: false })
          ?.limit(limit) || { data: null, error: null }

        if (error) {
          console.error('Error fetching featured articles:', error)
          setArticles([])
          return
        }

        if (data) {
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching featured articles:', error)
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedArticles()
  }, [limit])

  if (loading) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div className="w-96 h-96 bg-gradient-to-r from-red-600 to-amber-600 rounded-full blur-3xl"></div>
            </div>
            <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-amber-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              {headerTitle}
            </h2>
            <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-red-600 to-amber-600 rounded-full"></div>
          </div>
        )}
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gradient-to-r from-gray-200 to-gray-100 h-48 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="text-center py-12">
          <div className="inline-flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Tidak ada artikel unggulan saat ini</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center relative mb-12">
          {/* Batik Pattern Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 200">
              <pattern id="batik-featured" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="#DC2626" opacity="0.3"/>
                <path d="M50,20 Q80,50 50,80 Q20,50 50,20" fill="#F59E0B" opacity="0.4"/>
                <circle cx="50" cy="50" r="15" fill="#991B1B" opacity="0.5"/>
                <path d="M20,20 L80,80 M80,20 L20,80" stroke="#7C2D12" strokeWidth="2" opacity="0.3"/>
              </pattern>
              <rect width="800" height="200" fill="url(#batik-featured)" />
            </svg>
          </div>
          
          <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 bg-clip-text text-transparent animate-gradient">
              {headerTitle}
            </span>
          </h2>
          <p className="relative text-gray-600 max-w-2xl mx-auto text-lg">
            Temukan artikel pilihan dengan pembahasan mendalam seputar hukum Indonesia
          </p>
          
          {/* Statistics Bar */}
          <div className="relative mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-red-600">{legalStats.awareness2024}%</div>
              <div className="text-sm text-gray-600">Kesadaran Hukum</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-amber-600">{(legalStats.onlineUsers / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-600">Pengguna Online</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-green-600">{legalStats.satisfactionRate}%</div>
              <div className="text-sm text-gray-600">Tingkat Kepuasan</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-600">{(legalStats.reportsFiled / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Laporan Diproses</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-6">
        {articles.map((article, index) => (
          <div 
            key={article.id} 
            className="group relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* 3D Shadow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-amber-600/20 rounded-2xl transform rotate-1 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
            
            {/* Main Card */}
            <div 
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500"
              style={{
                transform: hoveredIndex === index 
                  ? 'perspective(1000px) rotateX(-5deg) translateZ(20px) scale(1.02)' 
                  : 'perspective(1000px) rotateX(0deg) translateZ(0px) scale(1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Wayang Pattern Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 M50,30 C60,30 70,40 70,50 C70,60 60,70 50,70 C40,70 30,60 30,50 C30,40 40,30 50,30" 
                        fill="currentColor" className="text-amber-700"/>
                </svg>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-amber-600/20 z-10"></div>
                  <ArticleCardImage
                    src={article.featured_image}
                    alt={article.title}
                    category={article.category}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-full blur-lg animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-red-600 to-amber-600 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-2xl">
                          #{index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                
                <div className="flex-1 p-8">
                  {/* Category & Stats */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {article.category && (
                      <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all">
                        <Tag className="h-4 w-4 mr-1.5" />
                        {article.category}
                      </span>
                    )}
                    
                    {article.view_count > 10000 && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-medium rounded-full animate-pulse">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </span>
                    )}
                    
                    {index === 0 && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-medium rounded-full">
                        <Award className="h-3 w-3 mr-1" />
                        Editor's Pick
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/artikel/${article.slug}`}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-red-600 hover:to-amber-600 hover:bg-clip-text transition-all duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  {/* Meta Info with 3D Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-red-50 to-amber-50 p-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Dibaca</div>
                          <div className="font-bold text-gray-900">{article.view_count.toLocaleString('id-ID')}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Tanggal</div>
                          <div className="font-bold text-gray-900">{formatDate(article.published_at)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {(article.author || 'A').charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Penulis</div>
                          <div className="font-bold text-gray-900 truncate">{article.author || 'Admin'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button with 3D Effect */}
                  <Link 
                    href={`/artikel/${article.slug}`}
                    className="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-2xl font-bold shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl overflow-hidden"
                  >
                    {/* Ripple Effect */}
                    <span className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></span>
                    
                    {/* Sparkle Effect */}
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    
                    <span className="relative z-10">Baca Artikel Lengkap</span>
                    
                    <ArrowRight className="h-5 w-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

<style jsx global>{`
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 3s ease infinite;
  }
`}</style>
