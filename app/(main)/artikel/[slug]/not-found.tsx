import Link from 'next/link'
import { ArrowLeft, Search, BookOpen } from 'lucide-react'

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mb-8">
            Artikel yang Anda cari mungkin sudah dipindahkan atau belum tersedia. 
            Mari jelajahi artikel lainnya yang tersedia.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
          >
            <Search className="w-4 h-4" />
            Jelajahi Semua Artikel
          </Link>
          
          <div className="text-sm text-gray-500">atau</div>
          
          <Link
            href="/panduan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Lihat Panduan Hukum
          </Link>
        </div>

        {/* Artikel Populer */}
        <div className="mt-12 text-left">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Artikel Populer:</h2>
          <div className="space-y-3">
            <Link 
              href="/artikel/cara-mengurus-perceraian-2024"
              className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900 text-sm">Panduan Mengurus Perceraian</h3>
              <p className="text-xs text-gray-600 mt-1">Prosedur lengkap di Pengadilan Agama</p>
            </Link>
            
            <Link 
              href="/artikel/cara-mendirikan-pt-2024"
              className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900 text-sm">Cara Mendirikan PT</h3>
              <p className="text-xs text-gray-600 mt-1">Syarat, modal, dan prosedur lengkap</p>
            </Link>
            
            <Link 
              href="/panduan/jual-beli-tanah"
              className="block p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-gray-900 text-sm">Jual Beli Tanah Aman</h3>
              <p className="text-xs text-gray-600 mt-1">Tips menghindari penipuan properti</p>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}