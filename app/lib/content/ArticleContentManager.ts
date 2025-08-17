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

export class ArticleContentManager {
  
  /**
   * Convert plain text article to structured format for database storage
   */
  static parseArticleToStructured(plainTextContent: string): StructuredArticleContent {
    const sections: ArticleSection[] = []
    const lines = plainTextContent.split('\n').filter(line => line.trim())
    
    let currentParagraph = ''
    
    lines.forEach((line, index) => {
      const trimmed = line.trim()
      
      if (trimmed.length < 3) return
      
      // Detect major headings (ALL CAPS)
      if (this.isMajorHeading(trimmed)) {
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
      if (this.isSubHeading(trimmed)) {
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
      if (this.isNumberedList(trimmed)) {
        if (currentParagraph.trim()) {
          sections.push({
            type: 'paragraph',
            content: currentParagraph.trim()
          })
          currentParagraph = ''
        }
        
        // Collect consecutive list items
        const listItems = this.extractListItems(lines, index)
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
      if (this.isQuote(trimmed)) {
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
      if (this.isConclusion(trimmed)) {
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
    const readingTime = Math.ceil(wordCount / 200) // Average reading speed: 200 WPM
    
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
  
  /**
   * Convert structured content back to plain text for editing
   */
  static structuredToPlainText(structured: StructuredArticleContent): string {
    return structured.sections.map(section => {
      switch (section.type) {
        case 'heading':
          if (section.level === 1) {
            return section.content.toUpperCase()
          } else {
            return section.content + ':'
          }
        case 'paragraph':
          return section.content
        case 'list':
          return section.items?.map((item, index) => `${index + 1}. ${item}`).join('\n') || ''
        case 'quote':
          return `"${section.content}"`
        case 'conclusion':
          return section.content
        default:
          return section.content
      }
    }).join('\n\n')
  }
  
  /**
   * Helper methods for content detection
   */
  private static isMajorHeading(text: string): boolean {
    return /^[A-Z\s]{5,}$/.test(text) && !text.includes(':')
  }
  
  private static isSubHeading(text: string): boolean {
    return text.endsWith(':') && text.length < 100 && text.split(' ').length < 8
  }
  
  private static isNumberedList(text: string): boolean {
    return /^(\d+\.|[a-z]\.)/.test(text)
  }
  
  private static isQuote(text: string): boolean {
    return (text.startsWith('"') && text.endsWith('"')) ||
           (text.startsWith('"') && text.endsWith('"'))
  }
  
  private static isConclusion(text: string): boolean {
    const lowerText = text.toLowerCase()
    return lowerText.includes('dengan demikian') ||
           lowerText.includes('oleh karena itu') ||
           lowerText.includes('kesimpulan')
  }
  
  private static extractListItems(lines: string[], startIndex: number): string[] {
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
}

/**
 * Database operations for structured content
 */
export class SupabaseArticleManager {
  
  /**
   * Save article with structured content to Supabase
   */
  static async saveArticle(articleData: {
    title: string
    slug: string
    plainContent: string
    excerpt?: string
    category: string
    author: string
    featured_image?: string
    seo_title?: string
    seo_description?: string
    keywords?: string[]
  }) {
    // Parse plain content to structured format
    const structuredContent = ArticleContentManager.parseArticleToStructured(articleData.plainContent)
    
    // Prepare data for database
    const dbData = {
      ...articleData,
      content: JSON.stringify(structuredContent), // Store as JSON
      content_type: 'structured', // Flag to indicate structured content
      word_count: structuredContent.metadata.wordCount,
      reading_time: structuredContent.metadata.readingTime,
      published_at: new Date().toISOString(),
      status: 'published'
    }
    
    return dbData
  }
  
  /**
   * Retrieve and parse structured content from Supabase
   */
  static parseStoredContent(storedContent: string): StructuredArticleContent | null {
    try {
      // Try to parse as JSON (structured content)
      const parsed = JSON.parse(storedContent)
      if (parsed.sections && parsed.metadata) {
        return parsed as StructuredArticleContent
      }
    } catch (error) {
      // If JSON parsing fails, treat as plain text
      console.warn('Content is not structured JSON, parsing as plain text')
    }
    
    // Fallback: parse plain text to structured
    return ArticleContentManager.parseArticleToStructured(storedContent)
  }
}

export default ArticleContentManager