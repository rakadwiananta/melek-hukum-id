'use client'

import dynamic from 'next/dynamic'

const SpectacularHero = dynamic(() => import('@/app/components/home/SpectacularHero'), { ssr: false })
const ArticleShowcase = dynamic(() => import('@/app/components/home/ArticleShowcase'))
const ArticleCarousel = dynamic(() => import('@/app/components/home/ArticleCarousel'))
const ArticleMasonry = dynamic(() => import('@/app/components/home/ArticleMasonry'))
const CategoryGrid = dynamic(() => import('@/app/components/home/CategoryGrid'))
const Newsletter = dynamic(() => import('@/app/components/home/Newsletter'))
const HeaderBannerAd = dynamic(() => import('@/app/components/ads/AdPlacements').then(m => m.HeaderBannerAd), { ssr: false })
const MobileAd = dynamic(() => import('@/app/components/ads/AdPlacements').then(m => m.MobileAd), { ssr: false })

export default function HomeClient() {
  return (
    <>
      <HeaderBannerAd />
      <SpectacularHero />
      <MobileAd className="mt-8" />
      <CategoryGrid />
      <ArticleShowcase />
      <ArticleCarousel />
      <ArticleMasonry />
      <Newsletter />
    </>
  )
}