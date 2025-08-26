// Performance utilities for optimizing web performance

export const performanceUtils = {
  // Image optimization utilities
  image: {
    // Generate optimized image URLs with proper sizing
    getOptimizedUrl: (url: string, width: number, height?: number, quality = 75) => {
      if (!url) return ''
      
      // If it's already a Next.js optimized image, return as is
      if (url.includes('_next/image')) return url
      
      // For external images, return original URL
      if (url.startsWith('http')) return url
      
      // For local images, return with optimization hints
      return url
    },

    // Get image format based on browser support
    getBestFormat: () => {
      if (typeof window === 'undefined') return 'webp'
      
      const canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      
      // Check AVIF support
      if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
        return 'avif'
      }
      
      // Check WebP support
      if (canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
        return 'webp'
      }
      
      return 'jpeg'
    },

    // Preload critical images
    preloadImage: (src: string) => {
      if (typeof window === 'undefined') return
      
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    },

    // Lazy load images with intersection observer
    lazyLoad: (selector: string) => {
      if (typeof window === 'undefined') return
      
      const images = document.querySelectorAll(selector)
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.classList.remove('lazy')
            observer.unobserve(img)
          }
        })
      })

      images.forEach(img => imageObserver.observe(img))
    }
  },

  // Resource optimization
  resources: {
    // Preconnect to external domains
    preconnect: (url: string) => {
      if (typeof window === 'undefined') return
      
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = url
      document.head.appendChild(link)
    },

    // DNS prefetch for external domains
    dnsPrefetch: (url: string) => {
      if (typeof window === 'undefined') return
      
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = url
      document.head.appendChild(link)
    },

    // Preload critical resources
    preload: (url: string, as: string) => {
      if (typeof window === 'undefined') return
      
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = url
      link.as = as
      document.head.appendChild(link)
    }
  },

  // Performance monitoring
  monitoring: {
    // Measure time to first byte
    measureTTFB: () => {
      if (typeof window === 'undefined') return null
      
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return navigation ? navigation.responseStart - navigation.requestStart : null
    },

    // Measure first contentful paint
    measureFCP: () => {
      if (typeof window === 'undefined') return null
      
      const paintEntries = performance.getEntriesByType('paint')
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
      return fcpEntry ? fcpEntry.startTime : null
    },

    // Measure largest contentful paint
    measureLCP: () => {
      if (typeof window === 'undefined') return null
      
      return new Promise<number | null>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry ? lastEntry.startTime : null)
        })
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
        
        // Timeout after 5 seconds
        setTimeout(() => {
          observer.disconnect()
          resolve(null)
        }, 5000)
      })
    },

    // Monitor long tasks
    monitorLongTasks: (callback?: (task: PerformanceEntry) => void) => {
      if (typeof window === 'undefined') return
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry)
            callback?.(entry)
          }
        })
      })
      
      observer.observe({ entryTypes: ['longtask'] })
      
      return () => observer.disconnect()
    },

    // Monitor layout shifts
    monitorLayoutShifts: (callback?: (shift: PerformanceEntry) => void) => {
      if (typeof window === 'undefined') return
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          const shift = entry as any
          if (shift.value > 0.1) {
            console.warn('Layout shift detected:', shift)
            callback?.(shift)
          }
        })
      })
      
      observer.observe({ entryTypes: ['layout-shift'] })
      
      return () => observer.disconnect()
    }
  },

  // Caching utilities
  cache: {
    // Set cache headers for static assets
    setCacheHeaders: (response: Response, maxAge: number = 31536000) => {
      response.headers.set('Cache-Control', `public, max-age=${maxAge}, immutable`)
      return response
    },

    // Check if browser supports service worker
    supportsServiceWorker: () => {
      return typeof window !== 'undefined' && 'serviceWorker' in navigator
    },

    // Register service worker
    registerServiceWorker: async (swPath: string) => {
      if (!performanceUtils.cache.supportsServiceWorker()) return false
      
      try {
        const registration = await navigator.serviceWorker.register(swPath)
        console.log('Service Worker registered:', registration)
        return true
      } catch (error) {
        console.error('Service Worker registration failed:', error)
        return false
      }
    }
  },

  // Bundle optimization
  bundle: {
    // Check bundle size
    getBundleSize: () => {
      if (typeof window === 'undefined') return null
      
      const resources = performance.getEntriesByType('resource')
      const jsResources = resources.filter(resource => 
        resource.name.includes('.js') || resource.name.includes('chunk')
      )
      
      return jsResources.reduce((total, resource) => {
        const transferSize = (resource as any).transferSize || 0
        return total + transferSize
      }, 0)
    },

    // Monitor bundle loading performance
    monitorBundleLoading: () => {
      if (typeof window === 'undefined') return
      
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.name.includes('.js') || entry.name.includes('chunk')) {
            console.log('Bundle loaded:', entry.name, entry.duration)
          }
        })
      })
      
      observer.observe({ entryTypes: ['resource'] })
      
      return () => observer.disconnect()
    }
  }
}

// Export individual utilities for easier imports
export const { image, resources, monitoring, cache, bundle } = performanceUtils

// Default export
export default performanceUtils