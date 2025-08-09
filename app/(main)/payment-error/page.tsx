import { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react'
import RetryButton from './retry-button'

export const metadata: Metadata = {
  title: 'Pembayaran Gagal | Melek Hukum ID',
  description: 'Pembayaran Anda tidak dapat diproses. Silakan coba lagi atau hubungi support kami.',
}

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pembayaran Gagal
        </h1>
        <p className="text-gray-600 mb-8">
          Maaf, pembayaran Anda tidak dapat diproses. Silakan coba lagi atau hubungi support kami.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-red-900 mb-2">Kemungkinan Penyebab</h3>
          <div className="text-sm text-red-700 space-y-1">
            <p>• Saldo tidak mencukupi</p>
            <p>• Kartu kredit/débit ditolak</p>
            <p>• Koneksi internet terputus</p>
            <p>• Timeout transaksi</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <RetryButton />
          
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          
          <Link
            href="/kontak"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Hubungi Support
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Jika masalah berlanjut, silakan hubungi tim support kami untuk bantuan lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  )
} 