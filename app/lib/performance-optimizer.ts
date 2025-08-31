'use client'

import { useState, useEffect } from 'react'

// Performance Optimization System
interface PerformanceConfig {
  enableCriticalCSS: boolean
  enableResourceHints: boolean
  enablePrefetch: boolean
  enablePreload: boolean
  enableFontOptimization: boolean
  enableImageOptimization: boolean
  enableJSOptimization: boolean
  lazyLoadOffset: number
  priorityImageCount: number
}

interface WebVitalsMetrics {
  FCP?: number // First Contentful Paint
  LCP?: number // Largest Contentful Paint
  CLS?: number // Cumulative Layout Shift
  FID?: number // First Input Delay
  INP?: number // Interaction to Next Paint
  TTFB?: number // Time to First Byte
}

class PerformanceOptimizer {
  private config: PerformanceConfig = {
    enableCriticalCSS: true,
    enableResourceHints: true,
    enablePrefetch: true,
    enablePreload: true,
    enableFontOptimization: true,
    enableImageOptimization: true,
    enableJSOptimization: true,
    lazyLoadOffset: 100,
    priorityImageCount: 3
  }

  private metrics: WebVitalsMetrics = {}
  private observer: PerformanceObserver | null = null

  constructor(config?: Partial<PerformanceConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }
    this.initialize()
  }

  private initialize() {
    if (typeof window === 'undefined') return

    // Initialize Web Vitals monitoring
    this.initializeWebVitals()
    
    // Apply optimizations
    this.applyCriticalResourceOptimization()
    this.applyImageOptimization()
    this.applyJavaScriptOptimization()
    this.applyFontOptimization()
    this.setupResourceOptimization()
  }

  private initializeWebVitals() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.handlePerformanceEntry(entry)
        }
      })

      // Observe different performance entry types
      try {
        this.observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift', 'largest-contentful-paint'] })
      } catch (e) {
        console.warn('Performance Observer not fully supported:', e)
      }
    }

    // Monitor FID and INP
    this.monitorInputDelay()
  }

  private handlePerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.metrics.FCP = entry.startTime
        }
        break
      case 'largest-contentful-paint':
        this.metrics.LCP = (entry as any).startTime
        break
      case 'layout-shift':
        if (!(entry as any).hadRecentInput) {
          this.metrics.CLS = (this.metrics.CLS || 0) + (entry as any).value
        }
        break
      case 'navigation':
        this.metrics.TTFB = (entry as PerformanceNavigationTiming).responseStart
        break
    }
  }

  private monitorInputDelay() {
    let firstInputDelay: number | null = null

    const handleFirstInput = (event: Event) => {
      if (firstInputDelay !== null) return

      const entry = performance.getEntriesByType('event')[0] as any
      if (entry && entry.processingStart && entry.startTime) {
        firstInputDelay = entry.processingStart - entry.startTime
        this.metrics.FID = firstInputDelay
      }

      // Remove listener after first input
      window.removeEventListener('click', handleFirstInput, true)
      window.removeEventListener('keydown', handleFirstInput, true)
    }

    window.addEventListener('click', handleFirstInput, true)
    window.addEventListener('keydown', handleFirstInput, true)
  }

  private applyCriticalResourceOptimization() {
    if (!this.config.enableCriticalCSS) return

    // Preload critical fonts
    this.preloadCriticalFonts()
    
    // Preload critical images
    this.preloadCriticalImages()
    
    // Optimize critical render path
    this.optimizeCriticalRenderPath()
  }

  private preloadCriticalFonts() {
    const criticalFonts = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-latin.woff2'
    ]

    criticalFonts.forEach(font => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = font
      document.head.appendChild(link)
    })
  }

  private preloadCriticalImages() {
    // Preload hero images and above-the-fold content
    const criticalImages = [
      '/timbangkan.jpg',
      '/illustrations/blog-kejaksaan.jpeg'
    ]

    criticalImages.forEach(imageSrc => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageSrc
      document.head.appendChild(link)
    })
  }

  private optimizeCriticalRenderPath() {
    // Defer non-critical CSS
    const deferCSS = (href: string) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = href
      link.onload = () => {
        link.rel = 'stylesheet'
      }
      document.head.appendChild(link)
    }

    // Example: defer non-critical stylesheets
    // deferCSS('/css/non-critical.css')
  }

  private applyImageOptimization() {
    if (!this.config.enableImageOptimization) return

    // Implement native lazy loading for images
    const images = document.querySelectorAll('img[data-src]')
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          }
        })
      }, {
        rootMargin: `${this.config.lazyLoadOffset}px`
      })

      images.forEach(img => imageObserver.observe(img))
    }
  }

  private applyJavaScriptOptimization() {
    if (!this.config.enableJSOptimization) return

    // Defer non-critical JavaScript
    this.deferNonCriticalJS()
    
    // Implement request idle callback for non-critical operations
    this.scheduleNonCriticalWork()
  }

  private deferNonCriticalJS() {
    // Move non-critical scripts to load after page is interactive
    const nonCriticalScripts = document.querySelectorAll('script[data-defer]')
    
    const loadDeferredScripts = () => {
      nonCriticalScripts.forEach(script => {
        const newScript = document.createElement('script')
        newScript.src = script.getAttribute('data-src') || ''
        newScript.async = true
        document.body.appendChild(newScript)
      })
    }

    // Load after page is fully loaded
    if (document.readyState === 'complete') {
      loadDeferredScripts()
    } else {
      window.addEventListener('load', loadDeferredScripts)
    }
  }

  private scheduleNonCriticalWork() {
    // Use requestIdleCallback for non-critical operations
    const runWhenIdle = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(callback)
      } else {
        setTimeout(callback, 0)
      }
    }

    // Schedule analytics, tracking, and other non-critical features
    runWhenIdle(() => {
      // Initialize analytics
      this.initializeAnalytics()
    })

    runWhenIdle(() => {
      // Initialize non-critical features
      this.initializeNonCriticalFeatures()
    })
  }

  private initializeAnalytics() {
    // Delayed analytics initialization
    console.log('Analytics initialized after idle')
  }

  private initializeNonCriticalFeatures() {
    // Initialize features that don't affect initial page load
    console.log('Non-critical features initialized')
  }

  private applyFontOptimization() {
    if (!this.config.enableFontOptimization) return

    // Add font-display: swap to critical fonts
    const style = document.createElement('style')
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100 900;
        font-display: swap;
        src: url('/fonts/inter-var.woff2') format('woff2');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
      }
    `
    document.head.appendChild(style)
  }

  private setupResourceOptimization() {
    // DNS prefetch for external domains
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdn.jsdelivr.net',
      'pagead2.googlesyndication.com',
      'googleads.g.doubleclick.net',
      'tpc.googlesyndication.com'
    ]

    externalDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = `//${domain}`
      document.head.appendChild(link)
    })

    // Preconnect to critical external resources
    const criticalDomains = [
      'fonts.gstatic.com',
      'fonts.googleapis.com'
    ]

    criticalDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = `//${domain}`
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
    
    // Font loading optimization
    this.optimizeFontLoading()
  }
  
  private optimizeFontLoading() {
    // Check if fonts are already loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded')
        document.documentElement.classList.remove('fonts-loading')
      })
    }
    
    // Fallback for browsers that don't support Font Loading API
    if (!document.fonts) {
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded')
        document.documentElement.classList.remove('fonts-loading')
      }, 3000) // 3 second fallback
    }
    
    // Add loading class initially
    document.documentElement.classList.add('fonts-loading')
  }

  // Public methods for performance monitoring
  getMetrics(): WebVitalsMetrics {
    return { ...this.metrics }
  }

  getPerformanceScore(): number {
    const { FCP, LCP, CLS, FID } = this.metrics

    let score = 100

    // FCP scoring (target: < 1.8s)
    if (FCP) {
      if (FCP > 3000) score -= 25
      else if (FCP > 1800) score -= 15
      else if (FCP > 1000) score -= 5
    }

    // LCP scoring (target: < 2.5s)
    if (LCP) {
      if (LCP > 4000) score -= 30
      else if (LCP > 2500) score -= 20
      else if (LCP > 1500) score -= 10
    }

    // CLS scoring (target: < 0.1)
    if (CLS !== undefined) {
      if (CLS > 0.25) score -= 25
      else if (CLS > 0.1) score -= 15
      else if (CLS > 0.05) score -= 5
    }

    // FID scoring (target: < 100ms)
    if (FID) {
      if (FID > 300) score -= 20
      else if (FID > 100) score -= 10
      else if (FID > 50) score -= 5
    }

    return Math.max(0, score)
  }

  // Performance optimization suggestions
  getOptimizationSuggestions(): string[] {
    const suggestions: string[] = []
    const { FCP, LCP, CLS, FID } = this.metrics

    if (FCP && FCP > 1800) {
      suggestions.push('Optimize First Contentful Paint - consider reducing render-blocking resources')
    }

    if (LCP && LCP > 2500) {
      suggestions.push('Optimize Largest Contentful Paint - optimize images and critical resources')
    }

    if (CLS !== undefined && CLS > 0.1) {
      suggestions.push('Reduce Cumulative Layout Shift - set dimensions for images and ads')
    }

    if (FID && FID > 100) {
      suggestions.push('Improve First Input Delay - optimize JavaScript execution')
    }

    return suggestions
  }

  // Cleanup
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
  }
}

// Singleton instance
export const performanceOptimizer = new PerformanceOptimizer()

// React hook for performance monitoring
export function usePerformanceMonitoring() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({})
  const [score, setScore] = useState<number>(0)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentMetrics = performanceOptimizer.getMetrics()
      const currentScore = performanceOptimizer.getPerformanceScore()
      const currentSuggestions = performanceOptimizer.getOptimizationSuggestions()

      setMetrics(currentMetrics)
      setScore(currentScore)
      setSuggestions(currentSuggestions)
    }, 1000)

    return () => {
      clearInterval(interval)
      performanceOptimizer.destroy()
    }
  }, [])

  return {
    metrics,
    score,
    suggestions,
    optimizer: performanceOptimizer
  }
}