import { Metadata } from 'next'

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

export default function SolusiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}