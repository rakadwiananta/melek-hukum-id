'use client'

import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeaderBannerAd, InContentAd } from '@/app/components/ads/AdPlacements'

export const metadata: Metadata = {
  title: 'Solusi Masalah Hukum Indonesia - Panduan Praktis & Template Dokumen | Portal Hukum Nusantara',
  description: 'Platform hukum terlengkap di Indonesia. Akses 500+ template dokumen legal, panduan hukum praktis, dan konsultasi dengan 10.000+ advokat tersertifikasi. Gratis dan terpercaya.',
  keywords: 'hukum indonesia, template dokumen legal, konsultasi hukum terjangkau, advokat indonesia, bantuan hukum',
  openGraph: {
    title: 'Portal Hukum Nusantara - Solusi Hukum Terpercaya',
    description: 'Akses ribuan template dokumen dan konsultasi hukum terjangkau',
    images: ['/og-image-solusi.jpg']
  }
}

// Lazy load components for better performance
const SolusiHero = dynamic(() => import('@/app/components/solusi/SolusiHero'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
})

const TemplateSection = dynamic(() => import('@/app/components/solusi/TemplateSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
})

const PanduanSection = dynamic(() => import('@/app/components/solusi/PanduanSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
})

const FAQAccordion = dynamic(() => import('@/app/components/solusi/FAQAccordion'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
})

const Newsletter = dynamic(() => import('@/app/components/home/Newsletter'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
})

export default function SolusiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeaderBannerAd />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SolusiHero />
        
        <InContentAd />
        
        <TemplateSection />
        
        <PanduanSection />
        
        <FAQAccordion />
        
        <Newsletter />
        
        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-to-r from-primary via-red-600 to-pink-600 rounded-3xl text-white shadow-2xl mt-16">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Mulai Konsultasi Hukum Anda Sekarang
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Dapatkan solusi hukum yang tepat dan terpercaya untuk masalah Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/konsultasi"
                className="px-8 py-4 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
              >
                Konsultasi Hukum
              </Link>
              <Link 
                href="/solusi/template"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-center"
              >
                Lihat Template
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}