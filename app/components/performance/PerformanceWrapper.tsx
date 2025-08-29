'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for performance components
const GoogleAnalytics = dynamic(() => import('@/app/components/analytics/GoogleAnalytics').then(mod => ({ default: mod.GoogleAnalytics })), {
  ssr: false,
  loading: () => null,
})

const PerformanceDashboard = dynamic(() => import('@/app/components/performance/PerformanceDashboard'), {
  ssr: false,
  loading: () => null,
})

const CriticalCSSInjector = dynamic(() => import('@/app/components/performance/CriticalCSSInjector'), {
  ssr: false,
  loading: () => null,
})

export default function PerformanceWrapper() {
  return (
    <>
      <GoogleAnalytics />
      <PerformanceDashboard />
      <CriticalCSSInjector />
    </>
  )
}