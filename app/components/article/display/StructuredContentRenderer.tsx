'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, FileText, Info, CheckCircle, Quote, Scale } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { calculateReadingTime } from '@/app/lib/utils'
import DisclaimerBox from '@/app/components/article/meta/DisclaimerBox'

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
          content: trimmed,
          level: 2
        })
        return
      }
      
      // Detect lists
      if (isListItem(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        // Collect list items
        const listItems = [trimmed]
        let i = index + 1
        while (i < lines.length && isListItem(lines[i].trim())) {
          listItems.push(lines[i].trim())
          i++
        }
        
        sections.push({
          type: 'list',
          content: 'List',
          items: listItems
        })
        
        // Skip processed lines
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
          content: trimmed.replace(/^["']|["']$/g, '')
        })
        return
      }
      
      // Regular paragraph content
      currentParagraph += (currentParagraph ? ' ' : '') + trimmed
    })
    
    // Add final paragraph
    if (currentParagraph.trim()) {
      sections.push({
        type: 'paragraph',
        content: currentParagraph.trim()
      })
    }
    
    // Calculate reading time in minutes
    const wordsPerMinute = 200
    const words = plainTextContent.trim().split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)
    
    return {
      sections,
      metadata: {
        wordCount: plainTextContent.split(' ').length,
        readingTime: readingTime,
        lastUpdated: new Date().toISOString(),
        contentType: 'article'
      }
    }
  }

  const isMajorHeading = (text: string): boolean => {
    return text.length > 3 && text === text.toUpperCase() && !text.includes('.')
  }

  const isSubHeading = (text: string): boolean => {
    return text.endsWith(':') && text.length > 5
  }

  const isListItem = (text: string): boolean => {
    return /^[-•*]\s/.test(text) || /^\d+\.\s/.test(text)
  }

  const isQuote = (text: string): boolean => {
    return (text.startsWith('"') && text.endsWith('"')) || 
           (text.startsWith("'") && text.endsWith("'"))
  }

  // Process content and add lazy loading to images
  const processContentWithLazyLoading = (content: string): string => {
    return content.replace(
      /<img([^>]*)>/gi,
      '<img$1 loading="lazy" decoding="async">'
    )
  }

  // Parse content
  const structuredContent = parseStoredContent(content)
  
  if (!structuredContent) {
    // Fallback: render as plain HTML with lazy loading
    return (
      <div className="prose prose-lg max-w-none">
        <DisclaimerBox variant="legal" className="mb-8" />
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ 
            __html: processContentWithLazyLoading(content) 
          }} 
        />
      </div>
    )
  }

  return (
    <div className="prose prose-lg max-w-none">
      {/* Legal Disclaimer */}
      <DisclaimerBox variant="legal" className="mb-8" />
      
      {/* Structured Content */}
      <div className="article-content space-y-8">
        {structuredContent.sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {section.type === 'heading' && (
              <div className={`${section.level === 1 ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900 mb-4`}>
                {section.content}
              </div>
            )}
            
            {section.type === 'paragraph' && (
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: processContentWithLazyLoading(section.content) 
                }}
              />
            )}
            
            {section.type === 'list' && section.items && (
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="leading-relaxed">
                    {item.replace(/^[-•*]\s/, '').replace(/^\d+\.\s/, '')}
                  </li>
                ))}
              </ul>
            )}
            
            {section.type === 'quote' && (
              <blockquote className="border-l-4 border-amber-500 pl-6 py-4 bg-amber-50 rounded-r-lg">
                <p className="text-lg italic text-gray-700">"{section.content}"</p>
              </blockquote>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Article Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 p-6 bg-gray-50 rounded-xl"
      >
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {structuredContent.metadata.readingTime} menit baca
            </span>
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {structuredContent.metadata.wordCount} kata
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Konten Hukum</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}