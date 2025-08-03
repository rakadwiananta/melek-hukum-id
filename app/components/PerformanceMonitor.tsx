'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime)
          // Send to analytics if needed
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: PerformanceEntry) => {
          const fidEntry = entry as PerformanceEventTiming
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
          // Send to analytics if needed
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: PerformanceEntry) => {
          const clsEntry = entry as any
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value
            console.log('CLS:', clsValue)
            // Send to analytics if needed
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return null
}
