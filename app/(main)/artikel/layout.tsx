import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Artikel Hukum Indonesia | Melek Hukum ID',
  description: 'Kumpulan artikel hukum terbaru, analisis perundang-undangan, dan referensi hukum Indonesia yang komprehensif dan mudah dipahami.',
  keywords: 'artikel hukum, hukum indonesia, perundang-undangan, analisis hukum, referensi hukum, melek hukum',
  openGraph: {
    title: 'Artikel Hukum Indonesia | Melek Hukum ID',
    description: 'Temukan artikel hukum terbaru dan analisis perundang-undangan Indonesia',
    type: 'website',
    images: [
      {
        url: '/og-artikel.jpg',
        width: 1200,
        height: 630,
        alt: 'Artikel Hukum Indonesia'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artikel Hukum Indonesia | Melek Hukum ID',
    description: 'Temukan artikel hukum terbaru dan analisis perundang-undangan Indonesia'
  }
}

// Simple loading component without animations
function ArticleLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-brown-600 to-amber-600 rounded-2xl p-8 md:p-12 text-white mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Artikel Hukum Indonesia</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Memuat artikel hukum terbaru...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50">
      <Suspense fallback={<ArticleLoading />}>
        {children}
      </Suspense>
    </div>
  )
}
