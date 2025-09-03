import { Metadata } from 'next'
import { Briefcase, FileText, CheckCircle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PHK dan Hak Pesangon - Panduan Praktis',
  description:
    'Hak pekerja saat PHK dan cara menghitung pesangon: rumus, komponen uang pesangon, penghargaan masa kerja, dan penggantian hak.',
}

export default function PHKPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Briefcase className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">PHK dan Hak Pesangon</h1>
          </div>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
            Kenali komponen pesangon dan simulasi perhitungannya sesuai aturan ketenagakerjaan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Komponen Pesangon</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            'Uang Pesangon (UP)',
            'Uang Penghargaan Masa Kerja (UPMK)',
            'Uang Penggantian Hak (UPH)',
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-800">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Langkah Mengajukan Hak</h2>
        <ol className="space-y-4">
          {[
            'Minta surat PHK resmi beserta alasan dan tanggal efektif',
            'Cek PKB/PP/Perjanjian Kerja mengenai ketentuan pesangon',
            'Hitung estimasi hak: UP, UPMK, UPH',
            'Negosiasi bipartit; jika gagal, mediasi Disnaker',
            'Ajukan gugatan ke PHI bila tidak tercapai kesepakatan',
          ].map((desc, idx) => (
            <li key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-800">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border-2 border-emerald-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-emerald-600" />
            <p className="text-sm text-emerald-800">Simpan seluruh dokumen: kontrak kerja, slip gaji, surat PHK, bukti komunikasi.</p>
          </div>
        </div>
      </div>
    </article>
  )
} 