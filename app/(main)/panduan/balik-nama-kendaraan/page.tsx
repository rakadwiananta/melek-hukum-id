import { Metadata } from 'next'
import { Car, FileText, Calendar, CheckCircle, AlertTriangle } from 'lucide-react'
import ExistingArticleWrapper from '@/app/components/article/templates/ExistingArticleWrapper'

export const metadata: Metadata = {
  title: 'Balik Nama Kendaraan - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Prosedur lengkap balik nama BPKB dan STNK kendaraan bermotor: dokumen, cek fisik, biaya, dan estimasi waktu. Panduan praktis 2024.',
  keywords: ['balik nama kendaraan', 'BPKB', 'STNK', 'Samsat', 'cek fisik', 'prosedur balik nama'],
}

export default function BalikNamaKendaraanPage() {
  return (
    <ExistingArticleWrapper
      title="Balik Nama Kendaraan - Panduan Lengkap"
      category="Panduan Praktis"
      readTime="8 menit"
      author="Tim Ahli Hukum Melek Hukum ID"
      publishedAt="2024-12-15T10:00:00Z"
      tags={['balik-nama', 'kendaraan', 'BPKB', 'STNK', 'Samsat', 'cek-fisik']}
      summary="Panduan balik nama STNK dan BPKB: syarat dokumen, cek fisik, pembayaran, dan waktu pengurusan. Termasuk tips praktis dan estimasi biaya."
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Car className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Balik Nama Kendaraan</h1>
          </div>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl">
            Panduan balik nama STNK dan BPKB: syarat dokumen, cek fisik, pembayaran, dan waktu pengurusan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 -mt-8 mb-12">
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-emerald-100">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-gray-900">Dokumen</h3>
            </div>
            <p className="text-sm text-gray-600">KTP, BPKB, STNK, kuitansi jual beli, hasil cek fisik</p>
          </div>
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-emerald-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-gray-900">Estimasi Waktu</h3>
            </div>
            <p className="text-sm text-gray-600">1–3 hari kerja</p>
          </div>
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-emerald-100">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-gray-900">Cek Fisik</h3>
            </div>
            <p className="text-sm text-gray-600">Wajib dilakukan di Samsat</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Langkah-Langkah</h2>
        <ol className="space-y-4">
          {[
            'Lakukan cek fisik kendaraan di Samsat dan minta hasilnya',
            'Lengkapi berkas: KTP, BPKB, STNK, kuitansi jual beli bermaterai',
            'Isi formulir balik nama dan bayar biaya administrasi',
            'Terima STNK dan BPKB baru sesuai jadwal',
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
            <p className="text-sm text-emerald-800">Pastikan rangka dan mesin sesuai dokumen untuk menghindari kendala hukum.</p>
          </div>
        </div>
      </div>
    </ExistingArticleWrapper>
  )
} 