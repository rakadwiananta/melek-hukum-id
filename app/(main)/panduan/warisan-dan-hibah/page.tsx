import { Metadata } from 'next'
import { Gift, Users, Scale, FileText, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pembagian Warisan & Hibah - Panduan Ringkas',
  description:
    'Panduan hukum waris Islam dan BW, serta prosedur hibah: syarat, dokumen, dan alur di pengadilan/PPAT.',
}

export default function WarisanHibahPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Gift className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Pembagian Warisan & Hibah</h1>
          </div>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl">
            Ketentuan pembagian warisan, penetapan ahli waris, dan tata cara hibah yang sah.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilihan Dasar Hukum</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            'Hukum Waris Islam (KHI): penetapan ahli waris di PA',
            'Hukum Perdata (BW): waris testamentair/ab intestato di PN',
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-800">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prosedur Singkat</h2>
        <ol className="space-y-4">
          {[
            'Kumpulkan dokumen: KTP KK, akta kelahiran/nikah, surat kematian, bukti kepemilikan',
            'Ajukan penetapan ahli waris (PA/PN) atau gunakan surat keterangan waris sesuai golongan',
            'Buat akta pembagian waris/hibah di PPAT (untuk tanah/bangunan)',
            'Urus balik nama sertifikat ke BPN bila ada peralihan hak',
          ].map((desc, idx) => (
            <li key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-800">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-purple-600" />
            <p className="text-sm text-purple-800">Perhatikan pajak (BPHTB) dan biaya notaris/PPAT pada proses hibah atau pembagian waris.</p>
          </div>
        </div>
      </div>
    </article>
  )
} 