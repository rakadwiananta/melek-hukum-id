import { Metadata } from 'next'
import PageHeader from '@/app/components/ui/PageHeader'
import SolutionCards from '@/app/components/solusi/SolutionCards'
import TemplateSection from '@/app/components/solusi/TemplateSection'
import { HeaderBannerAd, InContentAd } from '@/app/components/ads/AdPlacements'

export const metadata: Metadata = {
  title: 'Solusi Masalah Hukum - Panduan Praktis & Template Dokumen',
  description: 'Temukan solusi praktis untuk masalah hukum sehari-hari. Download template dokumen gratis dan ikuti panduan langkah demi langkah.',
}

export default function SolusiPage() {
  return (
    <>
      <HeaderBannerAd />
      
      <PageHeader
        title="Solusi Masalahmu"
        description="Panduan praktis dan template dokumen untuk menyelesaikan masalah hukum sehari-hari"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Solusi' },
        ]}
      />

      <div className="container-padding mx-auto max-w-7xl py-8">
        {/* Popular Solutions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Solusi Populer</h2>
          <SolutionCards />
        </section>

        <InContentAd />

        {/* Template Documents */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Template Dokumen Gratis</h2>
          <TemplateSection />
        </section>
      </div>
    </>
  )
}
