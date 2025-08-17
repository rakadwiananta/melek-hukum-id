'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, FileText, Info, CheckCircle, Quote, Scale, Download, AlertCircle, Eye, Tag, Award } from 'lucide-react'
import { calculateReadingTime } from '@/app/lib/utils'
import Link from 'next/link'

interface UniversalContentFormatterProps {
  content: string
  title?: string
  category?: string
  author?: string
  publishedAt?: string
  contentType?: 'article' | 'template' | 'legal-document' | 'guide'
  metadata?: {
    readingTime?: number
    wordCount?: number
    sectionCount?: number
    downloadable?: boolean
    templateId?: string
  }
}

interface FormattedSection {
  type: 'heading' | 'paragraph' | 'list' | 'conclusion' | 'quote' | 'legal-article' | 'template-section'
  content: string
  level?: number
  items?: string[]
  numbering?: string
  metadata?: any
}

export default function UniversalContentFormatter({ 
  content, 
  title = '',
  category = 'artikel',
  author = 'Tim Melek Hukum',
  publishedAt = new Date().toISOString(),
  contentType = 'article',
  metadata = {}
}: UniversalContentFormatterProps) {
  
  // Universal content formatting for all content types
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
    
    // Different parsing logic based on content type
    if (contentType === 'template' || contentType === 'legal-document') {
      return parseTemplateContent(cleanContent)
    } else {
      return parseArticleContent(cleanContent)
    }
  }

  // Parse template/legal document content
  const parseTemplateContent = (content: string): FormattedSection[] => {
    const sections: FormattedSection[] = []
    const lines = content.split('\n').filter(line => line.trim())
    
    let articleCounter = 0
    let subArticleCounter = 0
    let currentParagraph = ''
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      
      if (trimmed.length < 3) return
      
      // Detect PASAL (main articles)
      if (isPasalHeading(trimmed)) {
        // Save current paragraph if exists
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim(),
            numbering: subArticleCounter > 0 ? `${subArticleCounter}.` : ''
          })
          currentParagraph = ''
        }
        
        articleCounter++
        subArticleCounter = 0
        
        sections.push({
          type: 'legal-article',
          content: cleanPasalContent(trimmed),
          level: 1,
          numbering: `PASAL ${romanNumeral(articleCounter)}`
        })
        return
      }
      
      // Detect sub-headings
      if (isSubHeading(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim(),
            numbering: subArticleCounter > 0 ? `${subArticleCounter}.` : ''
          })
          currentParagraph = ''
        }
        
        sections.push({
          type: 'heading',
          content: trimmed,
          level: 2
        })
        return
      }
      
      // Detect numbered content (1., 2., a., b., etc.)
      if (isNumberedLine(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim(),
            numbering: subArticleCounter > 0 ? `${subArticleCounter}.` : ''
          })
          currentParagraph = ''
        }
        
        const listItems = extractConsecutiveListItems(lines, index)
        if (listItems.length > 0) {
          sections.push({
            type: 'list',
            content: '',
            items: listItems
          })
        }
        return
      }
      
      // Regular content - accumulate into paragraphs
      if (trimmed.length > 10) {
        if (currentParagraph && !currentParagraph.endsWith('.') && !currentParagraph.endsWith(':')) {
          currentParagraph += ' ' + trimmed
        } else {
          if (currentParagraph.trim()) {
            subArticleCounter++
            sections.push({
              type: 'paragraph',
              content: currentParagraph.trim(),
              numbering: `${subArticleCounter}.`
            })
          }
          currentParagraph = trimmed
        }
      }
    })
    
    // Add final paragraph
    if (currentParagraph.trim()) {
      subArticleCounter++
      sections.push({
        type: 'paragraph',
        content: currentParagraph.trim(),
        numbering: `${subArticleCounter}.`
      })
    }

    return sections
  }

  // Parse regular article content  
  const parseArticleContent = (content: string): FormattedSection[] => {
    const sections: FormattedSection[] = []
    const paragraphs = content.split(/\n\s*\n|\r\n\s*\r\n/).filter(p => p.trim())
    
    let sectionCounter = 0
    
    paragraphs.forEach((paragraph, index) => {
      const trimmed = paragraph.trim()
      
      if (trimmed.length < 10) return
      
      // Check for major headings
      if (isMajorHeading(trimmed)) {
        sectionCounter++
        sections.push({
          type: 'heading',
          content: cleanHeading(trimmed),
          level: 1,
          numbering: `${sectionCounter}.`
        })
        return
      }
      
      // Check for sub headings
      if (isSubHeading(trimmed)) {
        sections.push({
          type: 'heading',
          content: trimmed,
          level: 2
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
      
      // Regular paragraph
      sections.push({
        type: 'paragraph',
        content: trimmed
      })
    })

    return sections
  }

  // Helper functions for content detection
  const isPasalHeading = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      lowerText.includes('pasal') ||
      /^pasal\s*[ivx\d]+/i.test(text) ||
      lowerText.includes('bab ') ||
      lowerText.includes('bagian ')
    )
  }

  const cleanPasalContent = (text: string): string => {
    return text.replace(/^(PASAL|BAB|BAGIAN)\s*[IVX\d]*\.?\s*/i, '').trim()
  }

  const isNumberedLine = (text: string): boolean => {
    return /^(\d+\.|[a-z]\.|[IVX]+\.|[\u2160-\u217F]\.|\([a-z]\)|\(\d+\))/.test(text.trim())
  }

  const extractConsecutiveListItems = (lines: string[], startIndex: number): string[] => {
    const items = []
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim()
      if (isNumberedLine(line)) {
        items.push(line.replace(/^(\d+\.|[a-z]\.|[IVX]+\.|\([a-z]\)|\(\d+\))/, '').trim())
      } else if (line.length > 5) {
        break
      }
    }
    return items
  }

  const isMajorHeading = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      /^[A-Z\s]{5,}$/.test(text) ||
      lowerText.includes('pendahuluan') ||
      lowerText.includes('latar belakang') ||
      lowerText.includes('kesimpulan') ||
      (text.length < 80 && text.endsWith(':') && text.split(' ').length < 8)
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
    return /^(\d+\.\s|\([a-z]\)\s|\([0-9]+\)\s|[a-z]\.\s|[IVX]+\.\s)/m.test(text)
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
  const readingTime = metadata.readingTime || calculateReadingTime(content)

  return (
    <article className="max-w-4xl mx-auto bg-white">
      {/* Universal Content Header */}
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
          <div className={`text-xs px-2 py-1 rounded ${
            contentType === 'template' ? 'bg-green-100 text-green-800' :
            contentType === 'legal-document' ? 'bg-red-100 text-red-800' :
            contentType === 'guide' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {contentType === 'template' ? 'Template' : 
             contentType === 'legal-document' ? 'Dokumen Hukum' :
             contentType === 'guide' ? 'Panduan' : 'Artikel'}
          </div>
          {metadata.downloadable && (
            <div className="flex items-center gap-1 text-green-600">
              <Download className="w-4 h-4" />
              <span>Dapat diunduh</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Universal Content Body */}
      <div className="space-y-6 md:space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="content-section"
          >
            {/* Legal Article Headers (PASAL) */}
            {section.type === 'legal-article' && (
              <div className="mb-8 mt-12 text-center">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  <span className="block text-red-600 mb-2 text-lg tracking-wide">
                    {section.numbering}
                  </span>
                  <span className="uppercase tracking-wide">
                    {section.content}
                  </span>
                </h2>
              </div>
            )}

            {/* Regular Headings */}
            {section.type === 'heading' && (
              <div className={`${section.level === 1 ? 'mb-6 mt-8' : 'mb-4 mt-6'}`}>
                <h2 className={`font-bold text-gray-900 ${
                  section.level === 1 
                    ? 'text-xl md:text-2xl' 
                    : 'text-lg md:text-xl'
                }`}>
                  {section.numbering && (
                    <span className="text-blue-600 mr-3">
                      {section.numbering}
                    </span>
                  )}
                  <span className={section.level === 1 ? 'uppercase tracking-wide' : ''}>
                    {section.content}
                  </span>
                </h2>
              </div>
            )}

            {/* Paragraphs */}
            {section.type === 'paragraph' && (
              <div className="mb-5">
                <p className="text-gray-800 leading-relaxed text-base md:text-lg text-justify">
                  {section.numbering && (
                    <span className="font-semibold text-gray-900 mr-2">
                      {section.numbering}
                    </span>
                  )}
                  <span className="inline" style={{ 
                    textIndent: section.numbering ? '0' : '1.5em',
                    display: section.numbering ? 'inline' : 'block'
                  }}>
                    {section.content}
                  </span>
                </p>
              </div>
            )}

            {/* Lists */}
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
                      {contentType === 'template' ? 'Informasi Template' : 'Referensi Hukum'}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {contentType === 'template' 
                        ? 'Template ini telah disesuaikan dengan peraturan perundang-undangan Indonesia terkini.'
                        : 'Artikel ini disusun berdasarkan peraturan perundang-undangan yang berlaku. Untuk konsultasi lebih lanjut, hubungi ahli hukum berlisensi.'
                      }
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Universal Content Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 pt-8 border-t-2 border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <Scale className="w-4 h-4" />
            <span>
              {contentType === 'template' 
                ? 'Template telah direview oleh tim ahli hukum Melek Hukum ID'
                : 'Konten ini telah direview oleh tim ahli hukum Melek Hukum ID'
              }
            </span>
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