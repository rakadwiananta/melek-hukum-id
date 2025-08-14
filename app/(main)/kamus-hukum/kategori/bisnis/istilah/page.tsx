import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import IstilahBisnisComponent from '@/app/components/istilahbiniscomponent';

export const metadata: Metadata = {
  title: 'Istilah Hukum Bisnis - Kamus Lengkap | Bicara Hukum',
  description: 'Jelajahi 295+ istilah hukum bisnis Indonesia lengkap dengan definisi, contoh praktis, dan dasar hukum. Fitur pencarian dan filter kategori untuk pembelajaran yang efektif.',
  keywords: [
    'istilah hukum bisnis',
    'kamus hukum bisnis',
    'definisi hukum bisnis',
    'terminologi bisnis Indonesia',
    'hukum korporasi',
    'hukum perusahaan',
    'kontrak bisnis',
    'compliance',
    'corporate governance'
  ],
  openGraph: {
    title: 'Istilah Hukum Bisnis - Kamus Lengkap',
    description: 'Jelajahi 295+ istilah hukum bisnis Indonesia dengan definisi lengkap dan contoh praktis',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/images/kamus-hukum-bisnis-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Kamus Hukum Bisnis Indonesia'
      }
    ]
  },
  alternates: {
    canonical: 'https://bicarahukum.my.id/kamus-hukum/kategori/bisnis/istilah/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

// Loading component for Suspense
function DictionaryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50">
      {/* Loading Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kamus Hukum Bisnis
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Memuat istilah-istilah hukum bisnis...
            </p>
          </div>
        </div>
      </div>

      {/* Loading Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BusinessTermsPage() {
  return (
    <>
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ArrowRight className="h-4 w-4" />
            <Link href="/kamus-hukum" className="hover:text-blue-600 transition-colors">
              Kamus Hukum
            </Link>
            <ArrowRight className="h-4 w-4" />
            <Link href="/kamus-hukum/kategori/bisnis" className="hover:text-blue-600 transition-colors">
              Kategori Bisnis
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Istilah</span>
          </nav>
        </div>
      </div>

      {/* Main Dictionary Component */}
      <Suspense fallback={<DictionaryLoading />}>
        <IstilahBisnisComponent />
      </Suspense>

      {/* Footer Information */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tentang Kamus Hukum Bisnis
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kamus hukum bisnis ini disusun untuk membantu praktisi bisnis, mahasiswa hukum, 
                dan masyarakat umum memahami terminologi hukum bisnis Indonesia dengan lebih baik.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Fitur Kamus
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex items-center">
                  <Search className="h-4 w-4 mr-2 text-blue-500" />
                  Pencarian real-time
                </li>
                <li className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                  Filter berdasarkan kategori
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-purple-500" />
                  Export data (CSV/JSON)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sumber Hukum
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Semua definisi dan dasar hukum merujuk pada peraturan perundang-undangan 
                Indonesia yang berlaku, termasuk UU PT, KUH Perdata, dan peraturan OJK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate static params for better SEO (optional)
export function generateStaticParams() {
  return [
    { slug: 'istilah' }
  ];
}