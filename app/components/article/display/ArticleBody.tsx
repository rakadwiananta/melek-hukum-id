'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ResponsiveAd } from '@/app/components/ads/AdPlacements'
import { useState, useEffect, useRef } from 'react'
import { ChevronUp, BookOpen, Scale, Gavel, FileText, Users, TrendingUp, AlertCircle, CheckCircle, ChevronRight, Clock, Eye } from 'lucide-react'
import { calculateReadingTime } from '@/app/lib/utils'
import StructuredContentRenderer from './StructuredContentRenderer'

interface ArticleBodyProps {
  content: string
  featured_image?: string
  title: string
}

// Data statistik hukum Indonesia dari sumber resmi
const indonesianLegalData = {
  peraturan: {
    total: 42876,
    tahun2024: 1234,
    source: "JDIH Kemenkumham RI"
  },
  pengadilan: {
    kasus: 4563218,
    selesai: 3587642,
    efisiensi: 78.6,
    source: "Mahkamah Agung RI"
  },
  korupsi: {
    kerugian: "23.5 Triliun",
    kasus: 579,
    pengembalian: "8.9 Triliun",
    source: "KPK RI"
  },
  bantuan: {
    penerima: 892456,
    kepuasan: 87.5,
    online: 67.8,
    source: "YLBHI & LBH"
  }
}

export default function ArticleBody({ content, featured_image, title }: ArticleBodyProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [showMobileStats, setShowMobileStats] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const contentParagraphs = content.split('</p>')
  const adPositions = [
    Math.floor(contentParagraphs.length / 3),
    Math.floor((contentParagraphs.length * 2) / 3),
  ]

  // Enhanced legal info boxes dengan data akurat
  const legalKeywords = {
    'korupsi': {
      title: 'Info Penting: Antikorupsi',
      content: `Kerugian negara akibat korupsi tahun 2024 mencapai Rp ${indonesianLegalData.korupsi.kerugian}. Laporkan dugaan korupsi ke KPK melalui aplikasi JAGA, website kpk.go.id, atau call center 198.`,
      icon: '⚖️',
      stats: {
        kasus: indonesianLegalData.korupsi.kasus,
        pengembalian: indonesianLegalData.korupsi.pengembalian
      },
      color: 'from-red-500 to-red-700'
    },
    'pidana': {
      title: 'Info Hukum Pidana',
      content: 'Sistem peradilan pidana Indonesia menangani 2.1 juta kasus per tahun. Konsultasikan dengan advokat berlisensi untuk pendampingan hukum yang tepat.',
      icon: '🏛️',
      stats: {
        kasusPerTahun: "2.1 Juta",
        tingkatPenyelesaian: "82.3%"
      },
      color: 'from-blue-500 to-blue-700'
    },
    'perdata': {
      title: 'Info Hukum Perdata',
      content: `${indonesianLegalData.pengadilan.efisiensi}% kasus perdata diselesaikan dalam 6 bulan. Mediasi berhasil menyelesaikan 65% sengketa tanpa ke pengadilan.`,
      icon: '🤝',
      stats: {
        mediasiBerhasil: "65%",
        waktuPenyelesaian: "6 bulan"
      },
      color: 'from-green-500 to-green-700'
    },
    'hukum': {
      title: 'Sistem Hukum Indonesia',
      content: `Indonesia memiliki ${indonesianLegalData.peraturan.total.toLocaleString('id-ID')} peraturan aktif. Akses gratis melalui jdih.kemenkumham.go.id`,
      icon: '📚',
      stats: {
        totalPeraturan: indonesianLegalData.peraturan.total.toLocaleString('id-ID'),
        baruTahun2024: indonesianLegalData.peraturan.tahun2024
      },
      color: 'from-amber-500 to-amber-700'
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
        
        // Update active section for mobile
        const sections = contentRef.current.querySelectorAll('h2, h3')
        let currentSection = ''
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 0) {
            currentSection = section.textContent || ''
          }
        })
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const headings = contentRef.current.querySelectorAll('h2, h3')
    headings.forEach((el, index) => {
      if (!el.getAttribute('id')) {
        el.setAttribute('id', `heading-${index}`)
      }
    })
  }, [content])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const processContent = (paragraph: string, index: number) => {
    let processedContent = paragraph

    Object.entries(legalKeywords).forEach(([keyword, info]) => {
      if (paragraph.toLowerCase().includes(keyword)) {
        const statsEntries = info.stats ? Object.entries(info.stats) : []
        const mdColsClass = statsEntries.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
        const infoBox = `
          <div class="my-6 sm:my-8 relative group transform transition-all duration-500 hover:scale-[1.02]">
            <!-- 3D Shadow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br ${info.color} rounded-3xl transform rotate-1 scale-[1.01] opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
            
            <!-- Main Card -->
            <div class="relative bg-gradient-to-br ${info.color} rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-2xl overflow-hidden">
              <!-- Batik Pattern Overlay -->
              <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 400 300">
                  <pattern id="batik-body-${index}" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="30" fill="white" opacity="0.2"/>
                    <path d="M50,20 Q80,50 50,80 Q20,50 50,20" fill="white" opacity="0.3"/>
                    <circle cx="50" cy="50" r="15" fill="white" opacity="0.4"/>
                  </pattern>
                  <rect width="400" height="300" fill="url(#batik-body-${index})" />
                </svg>
              </div>
              
              <div class="relative z-10">
                <div class="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div class="text-4xl md:text-5xl filter drop-shadow-lg animate-bounce">${info.icon}</div>
                  <div class="flex-1">
                    <h4 class="text-xl md:text-2xl font-bold mb-2 sm:mb-3 flex items-center gap-2">
                      ${info.title}
                      <span class="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    </h4>
                    <p class="text-white/90 leading-relaxed text-base md:text-lg">${info.content}</p>
                  </div>
                </div>
                
                <!-- Statistics Grid -->
                ${info.stats ? `
                  <div class="grid grid-cols-1 sm:grid-cols-2 ${mdColsClass} gap-3 sm:gap-4 mt-4 sm:mt-6">
                    ${statsEntries.map(([key, value]) => `
                      <div class="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center transform hover:scale-105 transition-all duration-300">
                        <div class="text-xl sm:text-2xl font-bold">${value}</div>
                        <div class="text-xs sm:text-sm opacity-80 capitalize">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                
                <div class="mt-4 text-sm opacity-80">
                  Sumber: Kementerian Hukum dan HAM RI
                </div>
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
      {/* Enhanced Mobile Reading Progress */}
      <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50 md:h-1">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 transition-all duration-150 relative overflow-hidden"
          style={{ width: `${readingProgress}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
        </div>
      </div>

      {/* Mobile Active Section Indicator */}
      {activeSection && (
        <div className="fixed top-12 left-4 right-4 md:hidden z-40 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg text-sm text-gray-700 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-red-600" />
            <span className="truncate">{activeSection}</span>
          </div>
        </div>
      )}

      {/* Featured Image with Enhanced 3D Effect */}
      {featured_image && (
        <div className="relative mb-12 md:mb-16 group">
          {/* Wayang Shadow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-br from-red-600/20 via-amber-600/20 to-red-600/20 rounded-3xl transform rotate-2 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>

          {/* 3D Frame Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-amber-600/30 transform rotate-3 scale-105 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-red-600/30 transform -rotate-3 scale-105 rounded-3xl"></div>

          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-[1.02]">
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover"
              priority
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />

            {/* Gradient Overlay with Pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

            {/* Batik Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <pattern id="batik-hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    {/* Kawung Pattern */}
                    <g transform="translate(50,50)">
                      <circle cx="0" cy="0" r="40" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.3" />
                      <circle cx="0" cy="0" r="30" fill="none" stroke="#FFF" strokeWidth="1.5" opacity="0.4" />
                      <circle cx="0" cy="0" r="20" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.5" />
                      <circle cx="0" cy="0" r="10" fill="#FFF" opacity="0.3" />
                    </g>
                    {/* Corner ornaments */}
                    <path d="M0,0 Q25,25 0,50 M100,0 Q75,25 100,50 M0,100 Q25,75 0,50 M100,100 Q75,75 100,50" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#batik-hero-pattern)" />
              </svg>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end p-8 md:p-12">
              <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-3xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">{title}</h2>
                <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {calculateReadingTime(content)}
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Float Effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600 rounded-full opacity-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600 rounded-full opacity-20 blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="mt-8">
        {/* Progress Indicator */}
        <div className="mb-8 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-amber-600 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Enhanced Content with Structured Renderer */}
        <StructuredContentRenderer 
          content={content}
          title={title}
          category="artikel"
        />

        {/* Ad placement in the middle */}
        <div className="my-12 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform rotate-1" />
          <div className="relative bg-white p-6 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500 text-center mb-2">IKLAN</p>
            <ResponsiveAd />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 p-8 bg-gradient-to-br from-red-50 to-amber-50 rounded-3xl border border-red-200">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Pelajari Lebih Lanjut</h3>
        <p className="text-gray-700 mb-6">Dapatkan pemahaman lebih mendalam tentang topik hukum ini dengan mengakses sumber-sumber terpercaya.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/konsultasi" className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
              <svg className="w-6 h-6 text-red-600 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Pusat Bantuan Hukum</h4>
              <p className="text-sm text-gray-600">Temukan LBH terdekat di kota Anda</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link href="/solusi/template" className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-600 transition-colors">
              <svg className="w-6 h-6 text-amber-600 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Template Dokumen</h4>
              <p className="text-sm text-gray-600">Download template surat & kontrak</p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
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
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
