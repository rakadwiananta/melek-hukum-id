'use client'

import { useEffect } from 'react'

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Don't load analytics in development or if no ID is provided
  if (process.env.NODE_ENV === 'development' || !GA_MEASUREMENT_ID) {
    return null
  }

  useEffect(() => {
    // Load analytics only after user interaction to avoid blocking initial load
    let loaded = false
    
    const loadAnalytics = () => {
      if (loaded) return
      loaded = true
      
      // Create and load gtag script
      const script = document.createElement('script')
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script.async = true
      document.head.appendChild(script)
      
      script.onload = () => {
        // Initialize gtag
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) { window.dataLayer.push(args) }
        
        gtag('js', new Date())
        gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          // Minimize data collection
          custom_map: {},
          send_page_view: false
        })
        
        // Track page view manually
        gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href
        })
      }
    }

    // Load on first user interaction
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
    const handleInteraction = () => {
      loadAnalytics()
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction, { passive: true } as any)
      })
    }

    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { passive: true } as any)
    })

    // Fallback: load after 5 seconds if no interaction
    const fallbackTimeout = setTimeout(loadAnalytics, 5000)

    return () => {
      clearTimeout(fallbackTimeout)
      events.forEach(event => {
        document.removeEventListener(event, handleInteraction, { passive: true } as any)
      })
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
