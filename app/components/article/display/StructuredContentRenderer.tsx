'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, FileText, Info, CheckCircle, Quote, Scale } from 'lucide-react'
import Link from 'next/link'
import { calculateReadingTime } from '@/app/lib/utils'

interface StructuredContentRendererProps {
  content: string // JSON string or plain text from Supabase
  title?: string
  category?: string
  author?: string
  publishedAt?: string
  metadata?: {
    readingTime?: number
    wordCount?: number
    sectionCount?: number
    downloadable?: boolean
  }
}

interface ArticleSection {
  type: 'heading' | 'paragraph' | 'list' | 'conclusion' | 'quote'
  content: string
  level?: number
  items?: string[]
  metadata?: Record<string, any>
}

interface StructuredArticleContent {
  sections: ArticleSection[]
  metadata: {
    wordCount: number
    readingTime: number
    lastUpdated: string
    contentType: 'article' | 'template' | 'legal-document' | 'guide'
  }
}

export default function StructuredContentRenderer({
  content,
  title = '',
  category = 'artikel',
  author = 'Tim Melek Hukum',
  publishedAt = new Date().toISOString(),
  metadata = {}
}: StructuredContentRendererProps) {
  
  // Parse content from Supabase (could be JSON or plain text)
  const parseStoredContent = (storedContent: string): StructuredArticleContent | null => {
    try {
      // Try to parse as JSON (structured content)
      const parsed = JSON.parse(storedContent)
      if (parsed.sections && parsed.metadata) {
        return parsed as StructuredArticleContent
      }
    } catch (error) {
      // If JSON parsing fails, treat as plain text and parse it
      console.warn('Content is not structured JSON, parsing as plain text')
    }
    
    // Fallback: parse plain text to structured
    return parseArticleToStructured(storedContent)
  }

  // Parse plain text to structured format
  const parseArticleToStructured = (plainTextContent: string): StructuredArticleContent => {
    const sections: ArticleSection[] = []
    const lines = plainTextContent.split('\n').filter(line => line.trim())
    
    let currentParagraph = ''
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      
      if (trimmed.length < 3) return
      
      // Detect major headings (ALL CAPS)
      if (isMajorHeading(trimmed)) {
        // Save current paragraph if exists
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        sections.push({
          type: 'heading',
          content: trimmed,
          level: 1
        })
        return
      }
      
      // Detect sub headings (ends with colon)
      if (isSubHeading(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        sections.push({
          type: 'heading',
          content: trimmed.replace(':', ''),
          level: 2
        })
        return
      }
      
      // Detect numbered lists
      if (isNumberedList(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        // Collect consecutive list items
        const listItems = extractListItems(lines, index)
        if (listItems.length > 0) {
          sections.push({
            type: 'list',
            content: '',
            items: listItems
          })
        }
        return
      }
      
      // Detect quotes
      if (isQuote(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        sections.push({
          type: 'quote',
          content: trimmed.replace(/^["'""]|["'""]$/g, '')
        })
        return
      }
      
      // Detect conclusion
      if (isConclusion(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        sections.push({
          type: 'conclusion',
          content: trimmed
        })
        return
      }
      
      // Regular paragraph content
      if (trimmed.length > 10) {
        if (currentParagraph && currentParagraph.length > 0) {
          currentParagraph += ' ' + trimmed
        } else {
          currentParagraph = trimmed
        }
      }
    })
    
    // Add final paragraph
    if (currentParagraph.trim()) {
      sections.push({
        type: 'paragraph',
        content: currentParagraph.trim()
      })
    }
    
    // Calculate metadata
    const fullText = sections.map(s => s.content).join(' ')
    const wordCount = fullText.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)
    
    return {
      sections,
      metadata: {
        wordCount,
        readingTime,
        lastUpdated: new Date().toISOString(),
        contentType: 'article'
      }
    }
  }

  // Helper functions for content detection
  const isMajorHeading = (text: string): boolean => {
    return /^[A-Z\s]{5,}$/.test(text) && !text.includes(':')
  }
  
  const isSubHeading = (text: string): boolean => {
    return text.endsWith(':') && text.length < 100 && text.split(' ').length < 8
  }
  
  const isNumberedList = (text: string): boolean => {
    return /^(\d+\.|[a-z]\.)/.test(text)
  }
  
  const isQuote = (text: string): boolean => {
    return (text.startsWith('"') && text.endsWith('"')) ||
           (text.startsWith('"') && text.endsWith('"'))
  }
  
  const isConclusion = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return lowerText.includes('dengan demikian') ||
           lowerText.includes('oleh karena itu') ||
           lowerText.includes('kesimpulan')
  }
  
  const extractListItems = (lines: string[], startIndex: number): string[] => {
    const items = []
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim()
      if (/^(\d+\.|[a-z]\.)/.test(line)) {
        items.push(line.replace(/^(\d+\.|[a-z]\.)/, '').trim())
      } else if (line.length > 5) {
        break
      }
    }
    
    return items
  }

  const structuredContent = parseStoredContent(content)
  
  if (!structuredContent) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8">
        <div className="text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4" />
          <p>Tidak dapat memuat konten artikel</p>
        </div>
      </div>
    )
  }
  
  const { sections, metadata: contentMetadata } = structuredContent
  const readingTime = metadata.readingTime || contentMetadata.readingTime
  const wordCount = metadata.wordCount || contentMetadata.wordCount

  return (
    <article className="max-w-4xl mx-auto bg-white">
      {/* Professional Article Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 pb-6 border-b-2 border-gray-200"
      >
        {title && (
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h1>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Oleh {author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{readingTime} menit baca</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{sections.length} bagian</span>
          </div>
          <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          {wordCount && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{wordCount.toLocaleString('id-ID')} kata</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Structured Content Rendering */}
      <div className="space-y-6 md:space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="content-section"
          >
            {/* Major Headings */}
            {section.type === 'heading' && section.level === 1 && (
              <div className="mb-8 mt-12">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wide text-center">
                  {section.content}
                </h2>
              </div>
            )}

            {/* Sub Headings */}
            {section.type === 'heading' && section.level === 2 && (
              <div className="mb-6 mt-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {section.content}
                </h3>
              </div>
            )}

            {/* Paragraphs */}
            {section.type === 'paragraph' && (
              <div className="mb-5">
                <p className="text-gray-800 leading-relaxed text-base md:text-lg text-justify" 
                   style={{ textIndent: '1.5em' }}>
                  {section.content}
                </p>
              </div>
            )}

            {/* Lists */}
            {section.type === 'list' && section.items && (
              <div className="mb-6">
                <ol className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full flex items-center justify-center mt-0.5">
                        {itemIndex + 1}
                      </span>
                      <p className="text-gray-800 leading-relaxed text-base flex-1 text-justify">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Conclusions */}
            {section.type === 'conclusion' && (
              <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 rounded-r-lg">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-green-900 mb-3 uppercase text-sm tracking-wider">
                      KESIMPULAN
                    </h4>
                    <p className="text-green-800 leading-relaxed text-base text-justify">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quotes */}
            {section.type === 'quote' && (
              <div className="mb-8 mx-4 md:mx-8">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                  <blockquote className="pl-6 py-4 bg-blue-50 border border-blue-200 rounded-r-lg">
                    <Quote className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-lg italic text-blue-900 mb-3 leading-relaxed">
                      {section.content}
                    </p>
                  </blockquote>
                </div>
              </div>
            )}

            {/* Legal Reference Inserts */}
            {(index > 0 && (index + 1) % 5 === 0) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="my-8 p-5 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                      Referensi Hukum
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Artikel ini disusun berdasarkan peraturan perundang-undangan yang berlaku. 
                      Untuk konsultasi lebih lanjut, hubungi ahli hukum berlisensi.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Professional Article Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t-2 border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Scale className="w-4 h-4" />
            <span>Konten ini telah direview oleh tim ahli hukum Melek Hukum ID</span>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/kamus-hukum" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Kamus Hukum →
            </Link>
            <Link 
              href="/solusi/template" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Template Dokumen →
            </Link>
          </div>
        </div>
        
        {/* Content Quality Indicator */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-800">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Konten Terstruktur:</span>
            <span>Artikel ini menggunakan format terstruktur untuk konsistensi tampilan optimal.</span>
          </div>
        </div>
      </motion.div>
    </article>
  )
}