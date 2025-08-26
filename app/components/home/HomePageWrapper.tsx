'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for home page components
const SpectacularHero = dynamic(() => import('@/app/components/home/SpectacularHero'), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-pulse" />,
})

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

const CategoryGrid = dynamic(() => import('@/app/components/home/CategoryGrid'), {
  ssr: true,
  loading: () => <div className="py-16 bg-white animate-pulse" />,
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

export default function HomePageWrapper() {
  return (
    <>
      {/* Header Ad */}
      <HeaderBannerAd />
      
      {/* Hero Section */}
      <SpectacularHero />
      
      {/* Mobile Ad */}
      <MobileAd className="mt-8" />
      
      {/* Category Grid */}
      <CategoryGrid />
      
      {/* Article Showcase */}
      <ArticleShowcase />
      
      {/* Article Carousel */}
      <ArticleCarousel />
      
      {/* Article Masonry */}
      <ArticleMasonry />
      
      {/* Newsletter */}
      <Newsletter />
    </>
  )
}