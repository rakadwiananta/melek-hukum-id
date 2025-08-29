'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, FileText, Info, CheckCircle, AlertCircle, Quote, Scale } from 'lucide-react'
import { calculateReadingTime } from '@/app/lib/utils'
import Link from 'next/link'

interface ConsistentArticleFormatterProps {
  content: string
  title?: string
  category?: string
  author?: string
  publishedAt?: string
}

interface FormattedSection {
  type: 'heading' | 'paragraph' | 'list' | 'conclusion' | 'quote'
  content: string
  level?: number
  items?: string[]
  numbering?: string
}

export default function ConsistentArticleFormatter({ 
  content, 
  title = '',
  category = 'artikel',
  author = 'Tim Melek Hukum',
  publishedAt = new Date().toISOString()
}: ConsistentArticleFormatterProps) {
  
  // Professional content formatting with consistent numbering
  const formatContent = (rawContent: string): FormattedSection[] => {
    let cleanContent = rawContent
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Fix ampersands
      .replace(/&lt;/g, '<') // Fix less than
      .replace(/&gt;/g, '>') // Fix greater than
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    const sections: FormattedSection[] = []
    const paragraphs = cleanContent.split(/\n\s*\n|\r\n\s*\r\n/).filter(p => p.trim())
    
    let articleCounter = 0
    let subArticleCounter = 0
    
    paragraphs.forEach((paragraph, index) => {
      const trimmed = paragraph.trim()
      
      if (trimmed.length < 10) return // Skip very short paragraphs
      
      // Check for major headings (PASAL/BAB)
      if (isMajorHeading(trimmed)) {
        articleCounter++
        subArticleCounter = 0
        
        sections.push({
          type: 'heading',
          content: cleanHeading(trimmed),
          level: 1,
          numbering: `PASAL ${romanNumeral(articleCounter)}`
        })
        return
      }
      
      // Check for sub headings
      if (isSubHeading(trimmed)) {
        sections.push({
          type: 'heading',
          content: cleanHeading(trimmed),
          level: 2,
          numbering: ''
        })
        return
      }
      
      // Check for numbered lists
      if (isNumberedContent(trimmed)) {
        const listItems = extractListItems(trimmed)
        if (listItems.length > 1) {
          sections.push({
            type: 'list',
            content: '',
            items: listItems
          })
          return
        }
      }
      
      // Check for conclusion
      if (isConclusion(trimmed)) {
        sections.push({
          type: 'conclusion',
          content: trimmed
        })
        return
      }
      
      // Check for quotes
      if (isQuote(trimmed)) {
        sections.push({
          type: 'quote',
          content: trimmed.replace(/^["'""]|["'""]$/g, '')
        })
        return
      }
      
      // Regular paragraph with proper numbering
      if (trimmed.length > 30) {
        subArticleCounter++
        sections.push({
          type: 'paragraph',
          content: trimmed,
          numbering: `${subArticleCounter}.`
        })
      }
    })

    return sections
  }

  // Helper functions for content detection
  const isMajorHeading = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      lowerText.includes('pasal') ||
      lowerText.includes('bab') ||
      lowerText.includes('bagian') ||
      /^[A-Z\s]{3,}$/.test(text) // All caps text
    )
  }

  const isSubHeading = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      lowerText.includes('ketentuan') ||
      lowerText.includes('syarat') ||
      lowerText.includes('prosedur') ||
      lowerText.includes('tahapan') ||
      (text.length < 100 && text.endsWith(':'))
    )
  }

  const isNumberedContent = (text: string): boolean => {
    return /^(\d+\.|\([a-z]\)|\([0-9]+\)|[a-z]\.|[IVX]+\.)/m.test(text)
  }

  const extractListItems = (text: string): string[] => {
    const patterns = [
      /(\d+\.\s*[^0-9][^\n]*)/g,
      /(\([a-z]\)\s*[^\n]*)/g,
      /(\([0-9]+\)\s*[^\n]*)/g,
      /([a-z]\.\s*[^a-z][^\n]*)/g
    ]
    
    for (const pattern of patterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 1) {
        return matches.map(item => 
          item.replace(/^(\d+\.|\([a-z]\)|\([0-9]+\)|[a-z]\.)/, '').trim()
        )
      }
    }
    
    return []
  }

  const isConclusion = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      lowerText.includes('kesimpulan') ||
      lowerText.includes('dengan demikian') ||
      lowerText.includes('oleh karena itu') ||
      lowerText.includes('pada akhirnya') ||
      lowerText.includes('sebagai penutup')
    )
  }

  const isQuote = (text: string): boolean => {
    return (
      (text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith('"') && text.endsWith('"')) ||
      (text.startsWith("'") && text.endsWith("'"))
    )
  }

  const cleanHeading = (text: string): string => {
    return text.replace(/^(PASAL|BAB|BAGIAN)\s*\d*\.?\s*/i, '').trim()
  }

  const romanNumeral = (num: number): string => {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    
    let result = ''
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += numerals[i]
        num -= values[i]
      }
    }
    return result
  }

  const sections = formatContent(content)
  const readingTime = calculateReadingTime(content)

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
        </div>
      </motion.div>

      {/* Consistent Article Content */}
      <div className="space-y-6 md:space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="article-section"
          >
            {section.type === 'heading' && (
              <div className={`${section.level === 1 ? 'mb-6 mt-8' : 'mb-4 mt-6'}`}>
                <h2 className={`font-bold text-gray-900 ${
                  section.level === 1 
                    ? 'text-xl md:text-2xl text-center' 
                    : 'text-lg md:text-xl'
                }`}>
                  {section.numbering && (
                    <span className="block text-center text-gray-700 mb-2">
                      {section.numbering}
                    </span>
                  )}
                  <span className={section.level === 1 ? 'uppercase tracking-wide' : ''}>
                    {section.content}
                  </span>
                </h2>
              </div>
            )}

            {section.type === 'paragraph' && (
              <div className="mb-5">
                <p className="text-gray-800 leading-relaxed text-base md:text-lg text-justify">
                  {section.numbering && (
                    <span className="font-semibold text-gray-900 mr-2">
                      {section.numbering}
                    </span>
                  )}
                  <span className="inline" style={{ textIndent: section.numbering ? '0' : '2em' }}>
                    {section.content}
                  </span>
                </p>
              </div>
            )}

            {section.type === 'list' && (
              <div className="mb-6">
                <ol className="space-y-3">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white text-sm font-semibold rounded-full flex items-center justify-center mt-0.5">
                        {String.fromCharCode(97 + itemIndex)}
                      </span>
                      <p className="text-gray-800 leading-relaxed text-base flex-1 text-justify">
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

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

            {/* Legal Reference Insert */}
            {(index > 0 && (index + 1) % 4 === 0) && (
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
            <span>Artikel ini telah direview oleh tim ahli hukum Melek Hukum ID</span>
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
      </motion.div>
    </article>
  )
}