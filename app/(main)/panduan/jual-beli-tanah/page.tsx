import { Metadata } from 'next'
import { Home, FileText, Shield, CheckCircle, MapPin, Calendar } from 'lucide-react'
import ExistingArticleWrapper from '@/app/components/article/templates/ExistingArticleWrapper'

export const metadata: Metadata = {
  title: 'Jual Beli Tanah dan Properti - Panduan Aman 2024 | Melek Hukum ID',
  description: 'Panduan aman jual beli tanah dan properti: cek sertifikat, AJB, balik nama, dan tips menghindari penipuan. Prosedur lengkap 2024.',
  keywords: ['jual beli tanah', 'AJB', 'PPAT', 'sertifikat tanah', 'BPN', 'properti'],
}

export default function JualBeliTanahPage() {
  return (
    <ExistingArticleWrapper
      title="Jual Beli Tanah dan Properti - Panduan Aman"
      category="Hukum Perdata"
      readTime="12 menit"
      author="Dr. Sari Permata, S.H., M.H."
      publishedAt="2024-12-14T09:00:00Z"
      tags={['jual-beli-tanah', 'AJB', 'PPAT', 'sertifikat', 'BPN', 'properti']}
      summary="Prosedur aman jual beli tanah: cek sertifikat, proses AJB di PPAT, pembayaran, dan balik nama ke BPN. Termasuk tips menghindari penipuan."
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Home className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Jual Beli Tanah dan Properti</h1>
          </div>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl">
            Prosedur aman: cek sertifikat, proses AJB di PPAT, pembayaran, dan balik nama ke BPN.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 -mt-8 mb-12">
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Cek Legalitas</h3>
            </div>
            <p className="text-sm text-gray-600">Sertifikat, status tanah, dan PBB</p>
          </div>
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Dokumen</h3>
            </div>
            <p className="text-sm text-gray-600">AJB, BPHTB, kuitansi, dan identitas</p>
          </div>
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">Estimasi Waktu</h3>
            </div>
            <p className="text-sm text-gray-600">2–4 minggu</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Langkah-Langkah</h2>
        <ol className="space-y-4">
          {[
            {
              title: 'Cek Sertifikat',
              desc: 'Cek keaslian dan status (hak milik/HGB), pastikan tidak sengketa/terblokir.',
            },
            { title: 'Negosiasi & DP', desc: 'Buat kesepakatan harga dan pembayaran bertahap bila perlu.' },
            {
              title: 'AJB di PPAT',
              desc: 'Tanda tangan Akta Jual Beli di hadapan PPAT dengan dokumen lengkap.',
            },
            { title: 'Pelunasan', desc: 'Bayar sesuai akad disertai kuitansi resmi.' },
            {
              title: 'Balik Nama di BPN',
              desc: 'Ajukan balik nama sertifikat ke BPN setelah AJB selesai dan bea terbayar.',
            },
          ].map((step, idx) => (
            <li key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <p className="text-sm text-blue-800">
            Tips: lakukan pengecekan sertifikat via layanan online BPN atau langsung ke kantor pertanahan.
          </p>
        </div>
      </div>
    </ExistingArticleWrapper>
  )
} 