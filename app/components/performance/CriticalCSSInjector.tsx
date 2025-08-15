'use client'

import { useEffect } from 'react'
import { injectCriticalCSS, loadNonCriticalCSS } from '@/app/lib/critical-css'
import { performanceOptimizer } from '@/app/lib/performance-optimizer'
import { advancedImageOptimizer } from '@/app/lib/advanced-image-optimizer'

export default function CriticalCSSInjector() {
  useEffect(() => {
    // Inject critical CSS immediately
    injectCriticalCSS()
    
    // Performance optimizer will auto-initialize
    
    // Preload critical images
    const criticalImages = [
      '/timbangkan.jpg',
      '/illustrations/blog-kejaksaan.jpeg',
      '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg'
    ]
    
    advancedImageOptimizer.preloadCriticalImages(criticalImages)
    
    // Load non-critical CSS after page load
    if (document.readyState === 'complete') {
      loadNonCriticalCSS()
    } else {
      window.addEventListener('load', loadNonCriticalCSS)
    }
    
    // Setup resource hints for external domains
    setupResourceHints()
    
    return () => {
      window.removeEventListener('load', loadNonCriticalCSS)
    }
  }, [])

  const setupResourceHints = () => {
    // DNS prefetch for external domains
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdn.jsdelivr.net'
    ]

    externalDomains.forEach(domain => {
      if (!document.querySelector(`link[href="//${domain}"][rel="dns-prefetch"]`)) {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = `//${domain}`
        document.head.appendChild(link)
      }
    })

    // Preconnect to critical external resources
    const criticalDomains = [
      'fonts.gstatic.com'
    ]

    criticalDomains.forEach(domain => {
      if (!document.querySelector(`link[href="//${domain}"][rel="preconnect"]`)) {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = `//${domain}`
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      }
    })
  }

  return null // This component doesn't render anything
}