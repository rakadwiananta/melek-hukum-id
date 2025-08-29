'use client'

import { useEffect } from 'react'

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Don't load analytics in development or if no ID is provided
  if (process.env.NODE_ENV === 'development' || !GA_MEASUREMENT_ID) {
    return null
  }

  useEffect(() => {
    let loaded = false
    let timeoutId: NodeJS.Timeout
    
    const loadAnalytics = () => {
      if (loaded || typeof window === 'undefined') return
      loaded = true
      
      // Use requestIdleCallback for better mobile performance
      const loadWhenIdle = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(callback, { timeout: 2000 })
        } else {
          setTimeout(callback, 100)
        }
      }
      
      loadWhenIdle(() => {
        // Create minimal gtag implementation
        const script = document.createElement('script')
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
        script.async = true
        script.defer = true
        
        // Add error handling
        script.onerror = () => {
          console.warn('Google Analytics failed to load')
        }
        
        script.onload = () => {
          // Minimal gtag setup
          window.dataLayer = window.dataLayer || []
          function gtag(...args: any[]) { 
            window.dataLayer.push(args) 
          }
          
          // Minimal configuration for better performance
          gtag('js', new Date())
          gtag('config', GA_MEASUREMENT_ID, {
            // Minimize data collection for better performance
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            send_page_view: true,
            // Mobile optimizations
            transport_type: 'beacon',
            custom_map: {},
            // Reduce frequency of hits
            sample_rate: 50, // Only track 50% of users for better performance
          })
        }
        
        // Only append if not already loaded
        if (!document.querySelector(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)) {
          document.head.appendChild(script)
        }
      })
    }

    // More aggressive loading strategy for mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    
    if (isMobile) {
      // For mobile: Load only after significant user interaction or longer delay
      const mobileEvents = ['touchstart', 'scroll']
      let interactionCount = 0
      
      const handleMobileInteraction = () => {
        interactionCount++
        if (interactionCount >= 2) { // Require at least 2 interactions on mobile
          loadAnalytics()
          mobileEvents.forEach(event => {
            document.removeEventListener(event, handleMobileInteraction, { passive: true } as any)
          })
        }
      }

      mobileEvents.forEach(event => {
        document.addEventListener(event, handleMobileInteraction, { passive: true } as any)
      })

      // Fallback: load after 10 seconds on mobile (longer delay)
      timeoutId = setTimeout(loadAnalytics, 10000)
      
      return () => {
        clearTimeout(timeoutId)
        mobileEvents.forEach(event => {
          document.removeEventListener(event, handleMobileInteraction, { passive: true } as any)
        })
      }
    } else {
      // For desktop: Original behavior but optimized
      const desktopEvents = ['mousedown', 'keydown']
      const handleDesktopInteraction = () => {
        loadAnalytics()
        desktopEvents.forEach(event => {
          document.removeEventListener(event, handleDesktopInteraction, { passive: true } as any)
        })
      }

      desktopEvents.forEach(event => {
        document.addEventListener(event, handleDesktopInteraction, { passive: true } as any)
      })

      // Fallback: load after 5 seconds on desktop
      timeoutId = setTimeout(loadAnalytics, 5000)

      return () => {
        clearTimeout(timeoutId)
        desktopEvents.forEach(event => {
          document.removeEventListener(event, handleDesktopInteraction, { passive: true } as any)
        })
      }
    }
  }, [GA_MEASUREMENT_ID])

  return null
}

// Extend window type for gtag
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}
