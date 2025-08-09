import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pembayaran Berhasil | Melek Hukum ID',
  description: 'Pembayaran Anda telah berhasil diproses. Terima kasih telah menggunakan layanan kami.',
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-gray-600 mb-8">
          Terima kasih telah melakukan pembayaran. Transaksi Anda telah berhasil diproses.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-gray-900 mb-2">Detail Transaksi</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Status: <span className="text-green-600 font-medium">Berhasil</span></p>
            <p>Waktu: {new Date().toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          
          <Link
            href="/solusi"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Lihat Solusi Lainnya
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Jika Anda memiliki pertanyaan, silakan hubungi tim support kami.
          </p>
        </div>
      </div>
    </div>
  )
} 