'use client'

import Image from 'next/image'
import { ResponsiveAd } from '@/app/components/ads/AdPlacements'
import { useState, useEffect, useRef } from 'react'
import { ChevronUp } from 'lucide-react'

interface ArticleBodyProps {
  content: string
  featured_image?: string
  title: string
}

export default function ArticleBody({ content, featured_image, title }: ArticleBodyProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Split content for ad insertion
  const contentParagraphs = content.split('</p>')
  const adPositions = [
    Math.floor(contentParagraphs.length / 3),
    Math.floor((contentParagraphs.length * 2) / 3),
  ]

  // Legal info boxes for specific keywords
  const legalKeywords = {
    'korupsi': {
      title: 'Info Penting: Korupsi',
      content: 'Korupsi adalah tindak pidana yang merugikan keuangan negara. Laporkan ke KPK melalui aplikasi JAGA atau call center 198.',
      icon: '⚖️'
    },
    'pidana': {
      title: 'Info Hukum Pidana',
      content: 'Hukum pidana mengatur perbuatan yang dilarang dan diancam dengan pidana. Konsultasikan dengan advokat untuk kasus pidana.',
      icon: '🏛️'
    },
    'perdata': {
      title: 'Info Hukum Perdata', 
      content: 'Hukum perdata mengatur hubungan antar individu. Mediasi dapat menjadi solusi sebelum ke pengadilan.',
      icon: '📜'
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { top, height } = contentRef.current.getBoundingClientRect()
        const scrolled = Math.max(0, -top)
        const progress = Math.min(100, (scrolled / height) * 100)
        setReadingProgress(progress)
        setShowBackToTop(progress > 20)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Function to insert legal info boxes
  const processContent = (paragraph: string, index: number) => {
    let processedContent = paragraph

    // Check for legal keywords and insert info boxes
    Object.entries(legalKeywords).forEach(([keyword, info]) => {
      if (paragraph.toLowerCase().includes(keyword)) {
        const infoBox = `
          <div class="my-6 p-6 bg-gradient-to-br from-amber-50 to-red-50 rounded-2xl border-2 border-amber-200 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
            <div class="flex items-start gap-4">
              <div class="text-4xl">${info.icon}</div>
              <div class="flex-1">
                <h4 class="font-bold text-lg text-gray-900 mb-2">${info.title}</h4>
                <p class="text-gray-700 leading-relaxed">${info.content}</p>
              </div>
            </div>
          </div>
        `
        processedContent += infoBox
      }
    })

    return processedContent
  }

  return (
    <div className="article-body relative" ref={contentRef}>
      {/* Reading Progress Indicator (Mobile) */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 z-40 md:hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Featured Image with 3D Effect */}
      {featured_image && (
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-12 rounded-3xl overflow-hidden group">
          {/* 3D Frame Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-amber-600/20 transform rotate-3 scale-105 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-red-600/20 transform -rotate-3 scale-105 rounded-3xl" />
          
          <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            
            {/* Image Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-sm font-medium">
                Ilustrasi: {title}
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600 rounded-full opacity-20 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-600 rounded-full opacity-20 blur-2xl" />
        </div>
      )}

      {/* Article Content with Enhanced Typography */}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-red-700 prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:relative prose-h2:pl-6 prose-h3:text-gray-800 prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-4 prose-p:text-justify prose-p:mb-6 prose-strong:text-red-700 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-amber-100 prose-blockquote:to-white prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:rounded-lg prose-blockquote:italic prose-blockquote:relative prose-ul:my-6 prose-ul:pl-8 prose-ol:my-6 prose-ol:pl-8 prose-li:mb-3 prose-a:text-red-600 prose-a:underline prose-a:transition-all prose-a:duration-300 hover:prose-a:text-amber-600 hover:prose-a:no-underline prose-code:bg-red-100 prose-code:text-red-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:my-8 prose-pre:shadow-2xl">

        {contentParagraphs.map((paragraph, index) => (
          <div key={index} className="mb-6 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            {/* Content with legal info boxes */}
            <div 
              dangerouslySetInnerHTML={{ 
                __html: processContent(
                  paragraph + (index < contentParagraphs.length - 1 ? '</p>' : ''),
                  index
                )
              }} 
              className="leading-relaxed"
            />
            
            {/* Insert ads at calculated positions */}
            {adPositions.includes(index) && (
              <div className="my-12 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform rotate-1" />
                <div className="relative bg-white p-6 rounded-xl shadow-sm">
                  <p className="text-xs text-gray-500 text-center mb-2">IKLAN</p>
                  <ResponsiveAd />
                </div>
              </div>
            )}
            
            {/* Interactive Legal Tips */}
            {index === Math.floor(contentParagraphs.length / 2) && (
              <div className="my-12 p-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl text-white relative overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern id="tips-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="white"/>
                    </pattern>
                    <rect width="100" height="100" fill="url(#tips-pattern)" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    💡 Tips Hukum Praktis
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">📱</span>
                      <span>Gunakan aplikasi resmi pemerintah untuk layanan hukum online</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">📄</span>
                      <span>Selalu simpan bukti dokumen dalam bentuk digital dan fisik</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl">🤝</span>
                      <span>Konsultasikan masalah hukum dengan advokat berlisensi</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-40 group"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
        </button>
      )}


    </div>
  )
}
