'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'

// Dynamic imports for home page components with optimized loading
const SpectacularHero = dynamic(() => import('@/app/components/home/SpectacularHero'), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-pulse" />,
})

const CategoryGrid = dynamic(() => import('@/app/components/home/CategoryGrid'), {
  ssr: true,
  loading: () => <div className="py-16 bg-white animate-pulse" />,
})

// Optimized lazy loading with shorter delays
const ArticleShowcase = dynamic(() => import('@/app/components/home/ArticleShowcase'), {
  ssr: true,
  loading: () => <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse" />,
})

const ArticleCarousel = dynamic(() => import('@/app/components/home/ArticleCarousel'), {
  ssr: true,
  loading: () => <div className="py-16 bg-white animate-pulse" />,
})

const ArticleMasonry = dynamic(() => import('@/app/components/home/ArticleMasonry'), {
  ssr: true,
  loading: () => <div className="py-16 bg-gray-50 animate-pulse" />,
})

const Newsletter = dynamic(() => import('@/app/components/home/Newsletter'), {
  ssr: true,
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

// Optimized lazy loading wrapper component
function LazyComponent({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Use intersection observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => setShouldLoad(true), delay)
            return () => clearTimeout(timer)
          }
        })
      },
      { threshold: 0.1 }
    )

    const element = document.createElement('div')
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  if (!shouldLoad) {
    return <div className="py-16 bg-gray-50 animate-pulse" />
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
      
      {/* Non-critical components - optimized loading */}
      <Suspense fallback={<div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse" />}>
        <ArticleShowcase />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-white animate-pulse" />}>
        <ArticleCarousel />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-gray-50 animate-pulse" />}>
        <ArticleMasonry />
      </Suspense>
      
      <Suspense fallback={<div className="py-16 bg-gray-900 animate-pulse" />}>
        <Newsletter />
      </Suspense>
    </>
  )
}