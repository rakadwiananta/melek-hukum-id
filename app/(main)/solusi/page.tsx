import { Metadata } from 'next'
import { Users, Globe } from 'lucide-react'
import SolutionCards from '@/app/components/solusi/SolutionCards'
import TemplateSection from '@/app/components/solusi/TemplateSection'
import SolusiHero from '@/app/components/solusi/SolusiHero'
import FAQAccordion from '@/app/components/solusi/FAQAccordion'
import StatisticsSection from '@/app/components/solusi/StatisticsSection'
import { HeaderBannerAd, InContentAd } from '@/app/components/ads/AdPlacements'

export const metadata: Metadata = {
  title: 'Solusi Masalah Hukum Indonesia - Panduan Praktis & Template Dokumen | Portal Hukum Nusantara',
  description: 'Platform hukum terlengkap di Indonesia. Akses 500+ template dokumen legal, panduan hukum praktis, dan konsultasi dengan 10.000+ advokat tersertifikasi. Gratis dan terpercaya.',
  keywords: 'hukum indonesia, template dokumen legal, konsultasi hukum gratis, advokat indonesia, bantuan hukum',
  openGraph: {
    title: 'Portal Hukum Nusantara - Solusi Hukum Terpercaya',
    description: 'Akses ribuan template dokumen dan konsultasi hukum gratis',
    images: ['/og-image-solusi.jpg']
  }
}

export default function SolusiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/20 to-red-50/20">
      <HeaderBannerAd />

      <SolusiHero />

      {/* Professional Background Pattern */}
      <div 
        className="fixed inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23991b1b' fill-opacity='0.08'%3E%3Cpath d='M50 30c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20zm0 35c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z'/%3E%3Cpath d='M50 45c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        {/* Statistics Section with Enhanced Spacing */}
        <section className="mb-16 md:mb-20">
          <StatisticsSection />
        </section>

        {/* Popular Solutions with Professional Layout */}
        <section id="popular" className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-sm font-medium text-red-700 mb-6">
              <Users className="h-4 w-4" />
              Solusi Terpopuler
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-700 to-amber-700 bg-clip-text text-transparent">
                Solusi Hukum Populer
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dipercaya oleh 2.3 juta pengguna di seluruh Indonesia dengan tingkat kepuasan 98%
            </p>
          </div>
          <SolutionCards />
        </section>

        <InContentAd />

        {/* Template Documents with Enhanced Structure */}
        <section id="templates" className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700 mb-6">
              <Globe className="h-4 w-4" />
              Template Terverifikasi
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-700 to-amber-700 bg-clip-text text-transparent">
                Template Dokumen Legal Gratis
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              500+ template terverifikasi sesuai peraturan terbaru dengan panduan lengkap
            </p>
          </div>
          <TemplateSection />
        </section>

        {/* FAQ with Professional Styling */}
        <section id="faq" className="mb-16 md:mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700 mb-6">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ Terlengkap
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-700 to-amber-700 bg-clip-text text-transparent">
                Pertanyaan Umum Seputar Hukum
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Berdasarkan 10.000+ pertanyaan dari masyarakat Indonesia dengan jawaban terverifikasi
            </p>
          </div>
          <FAQAccordion />
        </section>

        {/* Trust Indicators with Enhanced Design */}
        <section className="mb-16 md:mb-20">
          <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                Dipercaya Institusi Hukum Indonesia
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">
                {[
                  { value: '45K+', label: 'Advokat Terdaftar' },
                  { value: '234', label: 'Posbakum Aktif' },
                  { value: '842', label: 'Pengadilan' },
                  { value: '98%', label: 'Kepuasan Pengguna' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{item.value}</div>
                    <div className="text-sm md:text-base opacity-90">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Mulai Konsultasi Hukum Anda Sekarang
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Dapatkan solusi hukum yang tepat dan terpercaya untuk masalah Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Konsultasi Gratis
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Lihat Template
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
