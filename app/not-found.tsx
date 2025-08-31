'use client'

import Link from 'next/link'
import ClientOnly from '@/app/components/ui/ClientOnly'

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <ClientOnly fallback={
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin telah dipindahkan.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Kembali ke Beranda
          </Link>
          
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Halaman Sebelumnya
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Jika Anda yakin ini adalah kesalahan, silakan hubungi kami di{' '}
            <Link href="/kontak" className="text-red-600 hover:text-red-700 underline">
              halaman kontak
            </Link>
          </p>
        </div>
      </div>
    </div>
    </ClientOnly>
  )
}