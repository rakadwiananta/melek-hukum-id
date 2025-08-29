'use client'

import { useState, useEffect, useRef } from 'react'

interface ImageOptimizationConfig {
  enableWebP: boolean
  enableAVIF: boolean
  enableBlurPlaceholder: boolean
  enableProgressiveJPEG: boolean
  enableSrcSet: boolean
  enableLazyLoading: boolean
  quality: number
  compressionLevel: number
  maxWidth: number
  maxHeight: number
}

interface OptimizedImageData {
  src: string
  srcSet: string
  placeholder: string
  format: string
  dimensions: { width: number; height: number }
  size: number
}

class AdvancedImageOptimizer {
  private config: ImageOptimizationConfig = {
    enableWebP: true,
    enableAVIF: true,
    enableBlurPlaceholder: true,
    enableProgressiveJPEG: true,
    enableSrcSet: true,
    enableLazyLoading: true,
    quality: 85,
    compressionLevel: 80,
    maxWidth: 1920,
    maxHeight: 1080
  }

  private imageCache = new Map<string, OptimizedImageData>()
  private compressionWorker: Worker | null = null

  constructor(config?: Partial<ImageOptimizationConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
    this.initializeWorker()
  }

  private initializeWorker() {
    if (typeof window === 'undefined' || !window.Worker) return

    // Create Web Worker for image processing
    const workerScript = `
      self.onmessage = function(e) {
        const { imageData, config } = e.data
        
        // Simulate image compression
        const compressedSize = Math.floor(imageData.size * (config.compressionLevel / 100))
        
        self.postMessage({
          success: true,
          compressedSize,
          format: config.enableAVIF ? 'avif' : config.enableWebP ? 'webp' : 'jpeg'
        })
      }
    `

    const blob = new Blob([workerScript], { type: 'application/javascript' })
    this.compressionWorker = new Worker(URL.createObjectURL(blob))
  }

  // Generate optimized image URLs with Next.js Image optimization
  generateOptimizedUrl(src: string, width: number, quality: number = this.config.quality): string {
    if (!src) return ''
    
    // Handle external URLs
    if (src.startsWith('http')) {
      return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
    }
    
    // Handle internal URLs
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
  }

  // Generate responsive srcSet
  generateSrcSet(src: string, sizes: number[] = [640, 768, 1024, 1280, 1920]): string {
    if (!this.config.enableSrcSet || !src) return ''
    
    return sizes
      .map(size => `${this.generateOptimizedUrl(src, size)} ${size}w`)
      .join(', ')
  }

  // Generate blur placeholder
  generateBlurPlaceholder(src: string, category?: string): string {
    if (!this.config.enableBlurPlaceholder) return ''
    
    // Category-based color schemes
    const colorSchemes = {
      'anti-korupsi': '#dc2626',
      'regulasi': '#2563eb',
      'solusi': '#059669',
      'default': '#6b7280'
    }
    
    const color = colorSchemes[category as keyof typeof colorSchemes] || colorSchemes.default
    
    // Generate SVG blur placeholder
    const svg = `
      <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
          </linearGradient>
        </defs>
        <rect width="40" height="30" fill="url(#grad)" />
      </svg>
    `
    
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  // Get optimal image format based on browser support
  getOptimalFormat(): 'avif' | 'webp' | 'jpeg' {
    if (typeof window === 'undefined') return 'jpeg'
    
    // Check AVIF support
    if (this.config.enableAVIF && this.supportsFormat('avif')) {
      return 'avif'
    }
    
    // Check WebP support
    if (this.config.enableWebP && this.supportsFormat('webp')) {
      return 'webp'
    }
    
    return 'jpeg'
  }

  private supportsFormat(format: string): boolean {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    
    try {
      return canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0
    } catch {
      return false
    }
  }

  // Progressive loading with intersection observer
  setupProgressiveLoading(element: HTMLImageElement, src: string, options: {
    rootMargin?: string
    threshold?: number
    priority?: boolean
  } = {}) {
    if (!this.config.enableLazyLoading || options.priority) {
      element.src = src
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          
          // Progressive loading: low quality -> high quality
          this.loadProgressively(img, src)
          observer.unobserve(img)
        }
      })
    }, {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.1
    })

    observer.observe(element)
  }

  private async loadProgressively(img: HTMLImageElement, src: string) {
    // Step 1: Show blur placeholder
    if (this.config.enableBlurPlaceholder && img.dataset.placeholder) {
      img.src = img.dataset.placeholder
      img.style.filter = 'blur(10px)'
      img.style.transition = 'filter 0.3s ease'
    }

    // Step 2: Load low quality version
    const lowQualitySrc = this.generateOptimizedUrl(src, 40, 20)
    await this.loadImage(lowQualitySrc)
    img.src = lowQualitySrc
    img.style.filter = 'blur(5px)'

    // Step 3: Load high quality version
    const highQualitySrc = this.generateOptimizedUrl(src, 800, this.config.quality)
    await this.loadImage(highQualitySrc)
    img.src = highQualitySrc
    img.style.filter = 'none'
  }

  private loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }

  // Optimize image data
  async optimizeImageData(imageData: ImageData): Promise<OptimizedImageData> {
    return new Promise((resolve) => {
      if (!this.compressionWorker) {
        resolve({
          src: '',
          srcSet: '',
          placeholder: '',
          format: 'jpeg',
          dimensions: { width: 0, height: 0 },
          size: 0
        })
        return
      }

      this.compressionWorker.onmessage = (e) => {
        const { compressedSize, format } = e.data
        resolve({
          src: '',
          srcSet: '',
          placeholder: '',
          format,
          dimensions: { width: imageData.width, height: imageData.height },
          size: compressedSize
        })
      }

      this.compressionWorker.postMessage({
        imageData: {
          width: imageData.width,
          height: imageData.height,
          size: imageData.data.length
        },
        config: this.config
      })
    })
  }

  // Generate responsive image component props
  generateImageProps(src: string, alt: string, options: {
    priority?: boolean
    category?: string
    sizes?: string
    quality?: number
    width?: number
    height?: number
  } = {}) {
    const {
      priority = false,
      category,
      sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      quality = this.config.quality,
      width,
      height
    } = options

    const optimizedSrc = this.generateOptimizedUrl(src, width || 800, quality)
    const srcSet = this.generateSrcSet(src)
    const placeholder = this.generateBlurPlaceholder(src, category)

    return {
      src: optimizedSrc,
      srcSet,
      alt,
      sizes,
      placeholder: this.config.enableBlurPlaceholder ? 'blur' : 'empty',
      blurDataURL: placeholder,
      priority,
      quality,
      loading: priority ? 'eager' : 'lazy',
      ...(width && { width }),
      ...(height && { height })
    }
  }

  // Preload critical images
  preloadCriticalImages(images: string[]) {
    images.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = this.generateOptimizedUrl(src, 800)
      
      // Add responsive preload hints
      if (this.config.enableSrcSet) {
        link.setAttribute('imagesrcset', this.generateSrcSet(src))
        link.setAttribute('imagesizes', '(max-width: 768px) 100vw, 50vw')
      }
      
      document.head.appendChild(link)
    })
  }

  // Get performance metrics
  getMetrics() {
    return {
      cacheSize: this.imageCache.size,
      optimizedImages: Array.from(this.imageCache.values()),
      averageCompressionRatio: this.calculateAverageCompression(),
      supportedFormats: {
        avif: this.supportsFormat('avif'),
        webp: this.supportsFormat('webp')
      }
    }
  }

  private calculateAverageCompression(): number {
    const images = Array.from(this.imageCache.values())
    if (images.length === 0) return 0
    
    const totalCompression = images.reduce((sum, img) => sum + (img.size || 0), 0)
    return totalCompression / images.length
  }

  // Cleanup
  destroy() {
    if (this.compressionWorker) {
      this.compressionWorker.terminate()
      this.compressionWorker = null
    }
    this.imageCache.clear()
  }
}

// Singleton instance
export const advancedImageOptimizer = new AdvancedImageOptimizer()

// React hook for advanced image optimization
export function useAdvancedImageOptimization() {
  const [metrics, setMetrics] = useState({
    cacheSize: 0,
    optimizedImages: [] as OptimizedImageData[],
    averageCompressionRatio: 0,
    supportedFormats: { avif: false, webp: false }
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(advancedImageOptimizer.getMetrics())
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return {
    metrics,
    generateImageProps: advancedImageOptimizer.generateImageProps.bind(advancedImageOptimizer),
    preloadCriticalImages: advancedImageOptimizer.preloadCriticalImages.bind(advancedImageOptimizer),
    optimizer: advancedImageOptimizer
  }
}

// Utility function untuk generate responsive breakpoints
export function generateResponsiveBreakpoints(baseWidth: number): number[] {
  const breakpoints = []
  let width = 320 // Start from mobile
  
  while (width <= baseWidth * 2) {
    breakpoints.push(width)
    width = Math.ceil(width * 1.5)
  }
  
  return breakpoints
}

// Utility untuk calculate optimal image dimensions
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  
  let width = originalWidth
  let height = originalHeight
  
  // Scale down if too large
  if (width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }
  
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}