'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'

// Dynamic imports for home page components with more aggressive lazy loading
const SpectacularHero = dynamic(() => import('@/app/components/home/SpectacularHero'), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-pulse" />,
})

const CategoryGrid = dynamic(() => import('@/app/components/home/CategoryGrid'), {
  ssr: true,
  loading: () => <div className="py-16 bg-white animate-pulse" />,
})

// Lazy load non-critical components with longer delays
const ArticleShowcase = dynamic(() => import('@/app/components/home/ArticleShowcase'), {
  ssr: false,
  loading: () => <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse" />,
})

const ArticleCarousel = dynamic(() => import('@/app/components/home/ArticleCarousel'), {
  ssr: false,
  loading: () => <div className="py-16 bg-white animate-pulse" />,
})

const ArticleMasonry = dynamic(() => import('@/app/components/home/ArticleMasonry'), {
  ssr: false,
  loading: () => <div className="py-16 bg-gray-50 animate-pulse" />,
})

const Newsletter = dynamic(() => import('@/app/components/home/Newsletter'), {
  ssr: false,
  loading: () => <div className="py-16 bg-gray-900 animate-pulse" />,
})

const HeaderBannerAd = dynamic(() => import('@/app/components/ads/AdPlacements').then(mod => ({ default: mod.HeaderBannerAd })), {
  ssr: false,
  loading: () => null,
})

const MobileAd = dynamic(() => import('@/app/components/ads/AdPlacements').then(mod => ({ default: mod.MobileAd })), {
  ssr: false,
  loading: () => null,
})

// Lazy loading wrapper component
function LazyComponent({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!shouldLoad) {
    return null
  }

  return <>{children}</>
}

export default function HomePageWrapper() {
  return (
    <>
      {/* Critical components - load immediately */}
      <HeaderBannerAd />
      <SpectacularHero />
      <MobileAd className="mt-8" />
      <CategoryGrid />
      
      {/* Non-critical components - lazy load with delays */}
      <Suspense fallback={<div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse" />}>
        <LazyComponent delay={1000}>
          <ArticleShowcase />
        </LazyComponent>
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-white animate-pulse" />}>
        <LazyComponent delay={2000}>
          <ArticleCarousel />
        </LazyComponent>
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-gray-50 animate-pulse" />}>
        <LazyComponent delay={3000}>
          <ArticleMasonry />
        </LazyComponent>
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-gray-900 animate-pulse" />}>
        <LazyComponent delay={4000}>
          <Newsletter />
        </LazyComponent>
      </Suspense>
    </>
  )
}