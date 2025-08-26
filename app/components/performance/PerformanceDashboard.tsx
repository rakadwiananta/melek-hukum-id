'use client'

import { useEffect, useState } from 'react'

interface WebVitals {
  FCP: number | null
  LCP: number | null
  CLS: number | null
  FID: number | null
  TTFB: number | null
}

export default function PerformanceDashboard() {
  const [webVitals, setWebVitals] = useState<WebVitals>({
    FCP: null,
    LCP: null,
    CLS: null,
    FID: null,
    TTFB: null,
  })

  useEffect(() => {
    // Only run in production and when performance monitoring is enabled
    if (process.env.NODE_ENV !== 'production') return

    // Basic performance monitoring without web-vitals
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor long tasks
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry)
          }
        }
      })
      
      observer.observe({ entryTypes: ['longtask'] })

      // Monitor layout shifts
      const layoutObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ((entry as any).value > 0.1) {
            console.warn('Layout shift detected:', entry)
          }
        }
      })
      
      layoutObserver.observe({ entryTypes: ['layout-shift'] })

      // Monitor largest contentful paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          setWebVitals(prev => ({
            ...prev,
            LCP: lastEntry.startTime
          }))
        }
      })
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // Monitor first contentful paint
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setWebVitals(prev => ({
              ...prev,
              FCP: entry.startTime
            }))
          }
        }
      })
      
      paintObserver.observe({ entryTypes: ['paint'] })

      // Monitor first input delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInputEntry = entry as PerformanceEventTiming
          if (firstInputEntry.processingStart) {
            setWebVitals(prev => ({
              ...prev,
              FID: firstInputEntry.processingStart - firstInputEntry.startTime
            }))
          }
        }
      })
      
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Monitor time to first byte
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart
        setWebVitals(prev => ({
          ...prev,
          TTFB: ttfb
        }))
      }

      return () => {
        observer.disconnect()
        layoutObserver.disconnect()
        lcpObserver.disconnect()
        paintObserver.disconnect()
        fidObserver.disconnect()
      }
    }
  }, [])

  // Don't render anything in production
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Performance Dashboard</h3>
      <div className="space-y-1">
        <div>FCP: {webVitals.FCP ? `${webVitals.FCP.toFixed(2)}s` : 'Loading...'}</div>
        <div>LCP: {webVitals.LCP ? `${webVitals.LCP.toFixed(2)}s` : 'Loading...'}</div>
        <div>CLS: {webVitals.CLS ? webVitals.CLS.toFixed(3) : 'Loading...'}</div>
        <div>FID: {webVitals.FID ? `${webVitals.FID.toFixed(2)}ms` : 'Loading...'}</div>
        <div>TTFB: {webVitals.TTFB ? `${webVitals.TTFB.toFixed(2)}ms` : 'Loading...'}</div>
      </div>
    </div>
  )
}