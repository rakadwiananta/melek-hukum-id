import { Metadata } from 'next'
import { Heart, Gavel, Calendar, FileText, Users, AlertTriangle, CheckCircle } from 'lucide-react'
import ExistingArticleWrapper from '@/app/components/article/templates/ExistingArticleWrapper'

export const metadata: Metadata = {
  title: 'Prosedur Perceraian - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Panduan lengkap cerai gugat dan cerai talak di Pengadilan Agama/Negeri: syarat, alur persidangan, dokumen, dan estimasi waktu.',
  keywords: ['cerai gugat', 'cerai talak', 'pengadilan agama', 'perceraian', 'mediasi', 'hukum keluarga'],
}

export default function ProsedurPerceraianPage() {
  return (
    <ExistingArticleWrapper
      title="Prosedur Perceraian - Panduan Lengkap"
      category="Hukum Keluarga"
      readTime="15 menit"
      author="Dr. Ahmad Fauzi, S.H.I., M.H."
      publishedAt="2024-12-13T11:00:00Z"
      tags={['cerai-gugat', 'cerai-talak', 'pengadilan-agama', 'mediasi', 'perceraian']}
      summary="Panduan praktis cerai gugat dan cerai talak: syarat, alur persidangan, biaya, dan tips menghadapi proses di pengadilan."
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Heart className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Prosedur Perceraian</h1>
          </div>
          <p className="text-lg md:text-xl text-rose-100 max-w-2xl">
            Panduan praktis cerai gugat dan cerai talak: syarat, alur, biaya, dan tips menghadapi persidangan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 -mt-8 mb-12">
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-rose-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-rose-600" />
              <h3 className="font-bold text-gray-900">Estimasi Waktu</h3>
            </div>
            <p className="text-sm text-gray-600">3–6 bulan (tergantung perkara)</p>
          </div>
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-rose-100">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-rose-600" />
              <h3 className="font-bold text-gray-900">Kewenangan</h3>
            </div>
            <p className="text-sm text-gray-600">PA untuk Muslim, PN untuk Non-Muslim</p>
          </div>
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-rose-100">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-rose-600" />
              <h3 className="font-bold text-gray-900">Dokumen Utama</h3>
            </div>
            <p className="text-sm text-gray-600">Buku Nikah/Akta Nikah, KTP, KK, akta anak (jika ada)</p>
          </div>
        </div>

        {/* Langkah-langkah */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Langkah-Langkah</h2>
        <ol className="space-y-4">
          {[
            {
              title: 'Persiapan Berkas',
              desc: 'Siapkan buku nikah/akta nikah, KTP, KK, dan bukti-bukti pendukung (chat, foto, surat pernyataan).',
            },
            {
              title: 'Daftar Perkara',
              desc: 'Daftarkan cerai gugat/talak ke pengadilan berwenang (domisili tergugat/pemohon sesuai ketentuan).',
            },
            {
              title: 'Mediasi',
              desc: 'Wajib mediasi. Jika gagal, perkara dilanjutkan ke pembuktian.',
            },
            {
              title: 'Pembuktian',
              desc: 'Ajukan bukti surat dan saksi. Pastikan fakta relevan dengan dalil gugatan.',
            },
            {
              title: 'Putusan',
              desc: 'Hakim membacakan putusan. Urus salinan/akta cerai setelah berkekuatan hukum tetap.',
            },
          ].map((step, idx) => (
            <li key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-wayang">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center font-bold">
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

        {/* Catatan Penting */}
        <div className="mt-10 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-rose-800 mb-1">Perhatian</h3>
              <ul className="list-disc ml-5 text-sm text-rose-800 space-y-1">
                <li>Perkara hak asuh, nafkah, harta bersama dibahas dalam satu paket gugatan.</li>
                <li>Gunakan bantuan Posbakum bila membutuhkan pendampingan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ExistingArticleWrapper>
  )
} 