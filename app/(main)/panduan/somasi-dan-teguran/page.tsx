import { Metadata } from 'next'
import { FileText, Megaphone, Mail, AlertTriangle, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Membuat Somasi yang Benar - Panduan Lengkap',
  description:
    'Cara membuat surat somasi/teguran yang sah secara hukum: struktur, contoh, dan strategi pengiriman.',
}

export default function SomasiPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Megaphone className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Membuat Somasi yang Benar</h1>
          </div>
          <p className="text-lg md:text-xl text-fuchsia-100 max-w-2xl">
            Struktur somasi, contoh kalimat, dan strategi pengiriman agar efektif secara hukum.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Struktur Surat Somasi</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Identitas pengirim & penerima',
            'Dasar peristiwa dan hubungan hukum',
            'Kewajiban yang dilanggar',
            'Tuntutan yang diminta',
            'Batas waktu pemenuhan',
            'Peringatan konsekuensi hukum',
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-800">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-violet-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-violet-600" />
            <p className="text-sm text-violet-800">
              Kirim somasi melalui jasa kurir tercatat/email resmi dengan bukti pengiriman dan baca. Simpan semua bukti komunikasi.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
} 