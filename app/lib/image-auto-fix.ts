'use client'

import { FALLBACK_IMAGES, validateImageUrl } from './image-utils'

interface ImageFixResult {
  success: boolean
  fixedSrc: string
  strategy: string
  fallbackLevel: number
}

interface ImageSource {
  url: string
  priority: number
  strategy: string
}

class ImageAutoFixer {
  private cache = new Map<string, ImageFixResult>()
  private retryAttempts = new Map<string, number>()
  private maxRetries = 3

  async fixImage(src: string, category?: string): Promise<ImageFixResult> {
    const cacheKey = `${src}_${category || 'default'}`
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Generate all possible sources with priority
    const sources = this.generateImageSources(src, category)
    
    // Try each source in order of priority
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i]
      
      try {
        const isValid = await this.validateImageWithRetry(source.url)
        
        if (isValid) {
          const result: ImageFixResult = {
            success: true,
            fixedSrc: source.url,
            strategy: source.strategy,
            fallbackLevel: i
          }
          
          // Cache successful result
          this.cache.set(cacheKey, result)
          return result
        }
      } catch (error) {
        console.warn(`Failed to validate image: ${source.url}`, error)
      }
    }

    // If all sources fail, return data URL fallback
    const dataUrlFallback = this.generateDataUrlFallback(category)
    const result: ImageFixResult = {
      success: false,
      fixedSrc: dataUrlFallback,
      strategy: 'data-url-fallback',
      fallbackLevel: sources.length
    }
    
    this.cache.set(cacheKey, result)
    return result
  }

  private generateImageSources(src: string, category?: string): ImageSource[] {
    const sources: ImageSource[] = []

    // Priority 0: Original source (if exists and looks valid)
    if (src?.trim() && this.isValidImageUrl(src.trim())) {
      sources.push({
        url: src.trim(),
        priority: 0,
        strategy: 'original'
      })
    }

    // Priority 1: Supabase public URL variations
    if (src?.includes('.supabase.')) {
      // Try with different Supabase URL formats
      const variations = this.generateSupabaseVariations(src)
      variations.forEach((url, index) => {
        sources.push({
          url,
          priority: 1 + index * 0.1,
          strategy: `supabase-variation-${index}`
        })
      })
    }

    // Priority 2: Category-specific fallbacks
    if (category && FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES]) {
      sources.push({
        url: FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES],
        priority: 2,
        strategy: 'category-fallback'
      })
    }

    // Priority 3: Default fallback
    sources.push({
      url: FALLBACK_IMAGES.default,
      priority: 3,
      strategy: 'default-fallback'
    })

    // Priority 4: Alternative fallbacks
    const alternatives = [
      '/illustrations/blog-kejaksaan.jpeg',
      '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg'
    ]
    
    alternatives.forEach((url, index) => {
      sources.push({
        url,
        priority: 4 + index * 0.1,
        strategy: `alternative-${index}`
      })
    })

    // Sort by priority
    return sources.sort((a, b) => a.priority - b.priority)
  }

  private generateSupabaseVariations(originalUrl: string): string[] {
    const variations: string[] = []
    
    try {
      const url = new URL(originalUrl)
      const pathSegments = url.pathname.split('/').filter(Boolean)
      
      // Common Supabase bucket configurations
      const bucketVariations = [
        'articles',
        'images',
        'uploads',
        'public',
        'storage'
      ]
      
      bucketVariations.forEach(bucket => {
        // Try different path structures
        variations.push(`${url.origin}/storage/v1/object/public/${bucket}/${pathSegments.slice(-1)[0]}`)
        variations.push(`${url.origin}/storage/v1/object/public/${bucket}/${pathSegments.slice(-2).join('/')}`)
      })
      
      // Try without version in path
      const baseUrl = url.origin
      const filename = pathSegments[pathSegments.length - 1]
      variations.push(`${baseUrl}/storage/object/public/articles/${filename}`)
      
    } catch (error) {
      console.warn('Failed to generate Supabase variations:', error)
    }
    
    return Array.from(new Set(variations)) // Remove duplicates
  }

  private isValidImageUrl(url: string): boolean {
    try {
      const validUrl = new URL(url, window.location.origin)
      return validUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i) !== null
    } catch {
      return false
    }
  }

  private async validateImageWithRetry(url: string): Promise<boolean> {
    const retryKey = url
    const currentAttempts = this.retryAttempts.get(retryKey) || 0
    
    if (currentAttempts >= this.maxRetries) {
      return false
    }

    try {
      const isValid = await validateImageUrl(url)
      
      if (isValid) {
        this.retryAttempts.delete(retryKey)
        return true
      } else {
        this.retryAttempts.set(retryKey, currentAttempts + 1)
        
        // Exponential backoff retry
        if (currentAttempts < this.maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, currentAttempts) * 1000))
          return this.validateImageWithRetry(url)
        }
        
        return false
      }
    } catch (error) {
      this.retryAttempts.set(retryKey, currentAttempts + 1)
      
      if (currentAttempts < this.maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, currentAttempts) * 1000))
        return this.validateImageWithRetry(url)
      }
      
      return false
    }
  }

  private generateDataUrlFallback(category?: string): string {
    const color = this.getCategoryColor(category)
    const title = this.getCategoryTitle(category)
    
    const svg = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
          </linearGradient>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="1" fill="${color}" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grad)" />
        <rect width="800" height="600" fill="url(#dots)" />
        
        <!-- Legal scales icon -->
        <g transform="translate(350, 200)" fill="white" opacity="0.6">
          <rect x="0" y="60" width="100" height="8" rx="4"/>
          <rect x="15" y="68" width="8" height="40" rx="4"/>
          <rect x="77" y="68" width="8" height="40" rx="4"/>
          <circle cx="50" cy="60" r="6"/>
          <rect x="47" y="30" width="6" height="30" rx="3"/>
          <polygon points="47,30 53,30 50,20" />
        </g>
        
        <text x="400" y="350" text-anchor="middle" fill="white" font-family="Arial" font-size="28" font-weight="bold">
          Melek Hukum ID
        </text>
        <text x="400" y="390" text-anchor="middle" fill="white" font-family="Arial" font-size="18" opacity="0.9">
          ${title}
        </text>
        <text x="400" y="450" text-anchor="middle" fill="white" font-family="Arial" font-size="14" opacity="0.7">
          Gambar tidak tersedia
        </text>
      </svg>
    `
    
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  private getCategoryColor(category?: string): string {
    const colors = {
      'anti-korupsi': '#dc2626',
      'regulasi': '#2563eb',
      'solusi': '#059669',
      'kamus-hukum': '#7c2d12',
      'hukum-pidana': '#7c2d12',
      'hukum-perdata': '#92400e',
      'hukum-tata-negara': '#1e40af',
      'default': '#6b7280'
    }
    return colors[category as keyof typeof colors] || colors.default
  }

  private getCategoryTitle(category?: string): string {
    const titles = {
      'anti-korupsi': 'Anti Korupsi',
      'regulasi': 'Regulasi Hukum',
      'solusi': 'Solusi Hukum',
      'kamus-hukum': 'Kamus Hukum',
      'hukum-pidana': 'Hukum Pidana',
      'hukum-perdata': 'Hukum Perdata',
      'hukum-tata-negara': 'Hukum Tata Negara',
      'default': 'Artikel Hukum'
    }
    return titles[category as keyof typeof titles] || titles.default
  }

  // Preload and fix multiple images
  async batchFixImages(images: Array<{ src: string; category?: string }>): Promise<ImageFixResult[]> {
    const fixPromises = images.map(({ src, category }) => this.fixImage(src, category))
    return Promise.all(fixPromises)
  }

  // Clear cache
  clearCache() {
    this.cache.clear()
    this.retryAttempts.clear()
  }

  // Get cache stats
  getCacheStats() {
    return {
      cacheSize: this.cache.size,
      retryAttempts: this.retryAttempts.size,
      successRate: this.calculateSuccessRate()
    }
  }

  private calculateSuccessRate(): number {
    if (this.cache.size === 0) return 0
    
    const successes = Array.from(this.cache.values()).filter(result => result.success).length
    return (successes / this.cache.size) * 100
  }
}

// Singleton instance
export const imageAutoFixer = new ImageAutoFixer()

// React hook for image auto-fixing
export function useImageAutoFix() {
  return {
    fixImage: imageAutoFixer.fixImage.bind(imageAutoFixer),
    batchFixImages: imageAutoFixer.batchFixImages.bind(imageAutoFixer),
    clearCache: imageAutoFixer.clearCache.bind(imageAutoFixer),
    getCacheStats: imageAutoFixer.getCacheStats.bind(imageAutoFixer)
  }
}