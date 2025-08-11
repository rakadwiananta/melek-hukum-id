import { Metadata } from 'next'
import { FileSignature, FileText, User, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Membuat Surat Kuasa - Panduan Praktis',
  description:
    'Panduan membuat surat kuasa umum dan khusus yang sah: struktur, pihak, kewenangan, dan contoh singkat.',
}

export default function SuratKuasaPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <FileSignature className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Membuat Surat Kuasa</h1>
          </div>
          <p className="text-lg md:text-xl text-amber-100 max-w-2xl">
            Struktur dan contoh singkat surat kuasa yang memenuhi syarat sah menurut hukum.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Struktur Utama</h2>
        <ol className="space-y-4">
          {[
            'Identitas pemberi & penerima kuasa',
            'Kewenangan yang diberikan (spesifik dan jelas)',
            'Batas waktu dan tujuan kuasa',
            'Tanda tangan di atas materai',
          ].map((desc, idx) => (
            <li key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-800">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-amber-200">
          <p className="text-sm text-amber-800">
            Untuk kuasa litigasi, pastikan menyebut kewenangan beracara di pengadilan dan menerima upaya hukum.
          </p>
        </div>
      </div>
    </article>
  )
} 