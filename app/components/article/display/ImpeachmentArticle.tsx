'use client'

import { motion } from 'framer-motion'
import { Scale, Gavel, Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react'

export default function ImpeachmentArticle() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Scale className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Mekanisme Pemakzulan Presiden di Indonesia
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pemahaman komprehensif tentang proses impeachment dalam sistem ketatanegaraan Indonesia
        </p>
      </motion.header>

      {/* Introduction */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Pentingnya Memahami Mekanisme Pemakzulan</h3>
              <p className="text-blue-800">
                Mekanisme Pemakzulan Presiden di Indonesia merupakan proses demokratis yang kerap disebut ketika suhu 
                politik memanas. Namun pemberhentian Presiden atau Wakil Presiden di tengah masa jabatan tidak bisa 
                dilakukan hanya karena mosi tidak percaya.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="prose prose-lg max-w-none"
      >
        {/* Section 1: Dasar Hukum */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">Dasar Hukum dan Prosedur</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            UUD 1945 menetapkan prosedur yang ketat dan melibatkan tiga lembaga tinggi negara: DPR, Mahkamah 
            Konstitusi, dan MPR. Berikut tahapan utamanya sesuai UUD 1945, khususnya Pasal 7A dan 7B:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Tahapan Proses Pemakzulan:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Tahap politik di DPR</strong> - Usul pemberhentian harus didukung sekurang-kurangnya dua pertiga anggota DPR yang hadir dalam rapat paripurna, dengan syarat rapat dihadiri sekurang-kurangnya dua pertiga dari jumlah anggota DPR.</li>
              <li><strong>Pemeriksaan hukum di Mahkamah Konstitusi</strong> - Usul dari DPR wajib diajukan ke Mahkamah Konstitusi untuk diuji.</li>
              <li><strong>Keputusan final di MPR</strong> - Jika Mahkamah Konstitusi menyatakan unsur pelanggaran terpenuhi, MPR menyelenggarakan sidang untuk mengambil keputusan.</li>
            </ol>
          </div>
        </section>

        {/* Section 2: Peran DPR */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">1. Tahap Politik di DPR</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            DPR menyusun dan menyampaikan dugaan pelanggaran sebagai dasar usul pemberhentian. Proses ini mencakup:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Syarat Kuorum</h4>
              <p className="text-blue-800 text-sm">
                Rapat dihadiri sekurang-kurangnya dua pertiga dari jumlah anggota DPR
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Syarat Persetujuan</h4>
              <p className="text-green-800 text-sm">
                Usul harus disetujui sekurang-kurangnya dua pertiga anggota yang hadir
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Peran Mahkamah Konstitusi */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Gavel className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">2. Pemeriksaan Hukum di Mahkamah Konstitusi</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Usul dari DPR wajib diajukan ke Mahkamah Konstitusi untuk diuji. Mahkamah Konstitusi memeriksa, 
            mengadili, dan memutus apakah Presiden atau Wakil Presiden melakukan pelanggaran sebagaimana 
            dimaksud Pasal 7A UUD 1945.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-yellow-900 mb-3">Kriteria Pelanggaran yang Dapat Diproses:</h4>
            <ul className="list-disc list-inside space-y-1 text-yellow-800">
              <li>Pengkhianatan terhadap negara</li>
              <li>Korupsi</li>
              <li>Penyuapan</li>
              <li>Tindak pidana berat lainnya</li>
              <li>Perbuatan tercela</li>
              <li>Tidak lagi memenuhi syarat sebagai Presiden atau Wakil Presiden</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Peran MPR */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900 m-0">3. Keputusan Final di MPR</h2>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            Jika Mahkamah Konstitusi menyatakan unsur pelanggaran terpenuhi, MPR menyelenggarakan sidang 
            untuk mengambil keputusan. Sidang MPR sah jika dihadiri sekurang-kurangnya tiga perempat dari 
            jumlah anggota MPR.
          </p>

          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
            <h4 className="font-semibold text-red-900 mb-3">Syarat Pemberhentian:</h4>
            <p className="text-red-800">
              Keputusan pemberhentian sah jika disetujui sekurang-kurangnya dua pertiga dari anggota yang hadir. 
              Jika tidak tercapai, Presiden atau Wakil Presiden tetap menjabat.
            </p>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Kesimpulan</h3>
            <p className="text-gray-700 leading-relaxed">
              Melihat alur yang berlapis dan syarat kuorum yang sangat tinggi, pemakzulan jelas dirancang 
              sebagai mekanisme ultimum remedium untuk menjaga konstitusi, bukan sebagai alat politik sesaat. 
              Proses ini memastikan bahwa pemberhentian Presiden atau Wakil Presiden hanya dapat dilakukan 
              melalui prosedur yang demokratis, transparan, dan konstitusional.
            </p>
          </div>
        </section>
      </motion.article>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Pelajari Lebih Lanjut
        </h3>
        <p className="text-gray-600 mb-4">
          Tingkatkan pemahaman Anda tentang sistem ketatanegaraan Indonesia
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/kamus/tata-negara"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Kamus Tata Negara
          </a>
          <a
            href="/tools/kuis-korupsi"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kuis Anti-Korupsi
          </a>
        </div>
      </motion.div>
    </div>
  )
}