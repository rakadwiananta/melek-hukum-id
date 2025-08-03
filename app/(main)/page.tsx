import { Metadata } from 'next'
import SpectacularHero from '@/app/components/home/SpectacularHero'
import ArticleShowcase from '@/app/components/home/ArticleShowcase'
import ArticleCarousel from '@/app/components/home/ArticleCarousel'
import ArticleMasonry from '@/app/components/home/ArticleMasonry'
import CategoryGrid from '@/app/components/home/CategoryGrid'
import Newsletter from '@/app/components/home/Newsletter'
import { HeaderBannerAd, MobileAd } from '@/app/components/ads/AdPlacements'

export const metadata: Metadata = {
  title: 'Melek Hukum ID - Platform Edukasi Hukum Indonesia',
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. Pelajari hukum dengan mudah, praktis, dan gratis.',
}

export default function HomePage() {
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
