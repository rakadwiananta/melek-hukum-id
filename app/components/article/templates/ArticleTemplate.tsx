'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, Clock, User, Calendar, Tag, Share2, 
  ChevronRight, ArrowLeft, Eye, ThumbsUp, MessageCircle,
  FileText, AlertCircle, Info, CheckCircle, Lightbulb,
  Scale, Users, Download, ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Article Template Interface
export interface ArticleSection {
  id: string
  order: number
  title: string
  content: string
  type: 'paragraph' | 'list' | 'numbered-list' | 'quote' | 'warning' | 'info' | 'success'
  contentType: 'paragraph' | 'list' | 'numbered-list' | 'quote' | 'warning' | 'info' | 'success'
  subsections?: ArticleSection[]
}

export interface ArticleTemplate {
  id: string
  title: string
  subtitle?: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  summary: string
  sections: ArticleSection[]
  sources: string[]
  relatedArticles?: string[]
  disclaimer?: string
}

export interface ArticleMetadata {
  id: string
  title: string
  subtitle?: string
  slug: string
  category: string
  subcategory?: string
  tags: string[]
  author: string
  publishedAt: string
  updatedAt?: string
  readTime: string
  difficulty: string
  summary: string
  metaDescription: string
  keywords: string[]
  featured: boolean
  status: string
  viewCount?: number
  likeCount?: number
  shareCount?: number
}

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-article" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="25" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="75" cy="75" r="15" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        <path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-article)" />
  </svg>
)

// Section Renderer Component
const SectionRenderer: React.FC<{ section: ArticleSection; index: number }> = ({ section, index }) => {
  const renderContent = () => {
    const lines = section.content.split('\n').filter(line => line.trim())
    
    switch (section.type) {
      case 'numbered-list':
        return (
          <ol className="space-y-3">
            {lines.map((line, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{line}</span>
              </li>
            ))}
          </ol>
        )
      
      case 'list':
        return (
          <ul className="space-y-2">
            {lines.map((line, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        )
      
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
            <p className="text-gray-700 italic leading-relaxed">{section.content}</p>
          </blockquote>
        )
      
      case 'warning':
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-amber-800 leading-relaxed">{section.content}</div>
          </div>
        )
      
      case 'info':
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-blue-800 leading-relaxed">{section.content}</div>
          </div>
        )
      
      case 'success':
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-green-800 leading-relaxed">{section.content}</div>
          </div>
        )
      
      default:
        return (
          <div className="text-gray-700 leading-relaxed space-y-4">
            {lines.map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-12"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        {section.title}
      </h2>
      
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        {renderContent()}
        
        {section.subsections && section.subsections.length > 0 && (
          <div className="mt-8 space-y-6">
            {section.subsections.map((subsection, subIndex) => (
              <div key={subsection.id} className="ml-6 border-l-2 border-gray-200 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}.{subIndex + 1}
                  </span>
                  {subsection.title}
                </h3>
                <SectionRenderer section={subsection} index={subIndex} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}

// Additional interfaces for full article structure
export interface ArticleSource {
  id: string
  title: string
  type: 'undang-undang' | 'peraturan-pemerintah' | 'peraturan-menteri' | 'putusan-pengadilan' | 'jurnal' | 'buku' | 'website'
  url?: string
  year?: number
  description?: string
}

export interface RelatedArticle {
  id: string
  title: string
  slug: string
  category: string
  readTime: string
}

export interface FullArticle {
  metadata: ArticleMetadata
  sections: ArticleSection[]
  sources: ArticleSource[]
  relatedArticles?: RelatedArticle[]
  disclaimer?: string
  callToAction?: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
}

// Main Article Template Component
interface ArticleTemplateProps {
  article: ArticleTemplate
}

const ArticleTemplateComponent: React.FC<ArticleTemplateProps> = ({ article }) => {
  const [isSharing, setIsSharing] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.summary,
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
    // Save to localStorage or API
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked-articles') || '[]')
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== article.id)
      localStorage.setItem('bookmarked-articles', JSON.stringify(updated))
    } else {
      localStorage.setItem('bookmarked-articles', JSON.stringify([...bookmarks, article.id]))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      <BatikPattern />
      
      {/* Header Section */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link href="/artikel" className="hover:text-blue-600 transition-colors">
              Artikel
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-blue-600 font-medium">{article.category}</span>
          </motion.nav>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            {article.subtitle && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {article.subtitle}
              </p>
            )}

            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              {article.summary}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{article.category}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
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

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {article.tags.map((tag, index) => (
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
      <div className="relative z-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-12"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Daftar Isi
            </h3>
            <ul className="space-y-2">
              {article.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#section-${section.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </span>
                  </a>
                  {section.subsections && section.subsections.length > 0 && (
                    <ul className="ml-9 mt-2 space-y-1">
                      {section.subsections.map((subsection, subIndex) => (
                        <li key={subsection.id}>
                          <a
                            href={`#subsection-${subsection.id}`}
                            className="flex items-center gap-2 p-1 rounded text-sm hover:bg-blue-50 transition-colors group"
                          >
                            <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                              {index + 1}.{subIndex + 1}
                            </span>
                            <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                              {subsection.title}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Article Sections */}
          <div className="space-y-12">
            {article.sections.map((section, index) => (
              <div key={section.id} id={`section-${section.id}`}>
                <SectionRenderer section={section} index={index} />
              </div>
            ))}
          </div>

          {/* Sources */}
          {article.sources && article.sources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mt-12"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Sumber & Referensi
              </h3>
              <ul className="space-y-2">
                {article.sources.map((source, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-sm leading-relaxed">{source}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Disclaimer */}
          {article.disclaimer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Scale className="w-5 h-5 text-gray-600" />
                Disclaimer
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {article.disclaimer}
              </p>
            </motion.div>
          )}

          {/* Article Footer Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mt-12"
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
                  href="/panduan"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  <Users className="w-4 h-4" />
                  Konsultasi Ahli
                </Link>
                <Link
                  href="/artikel"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Artikel
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// All interfaces are exported above

export default ArticleTemplateComponent