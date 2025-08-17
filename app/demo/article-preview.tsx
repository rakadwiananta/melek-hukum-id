'use client'

import { useState } from 'react'
import UniversalContentFormatter from '@/app/components/article/display/UniversalContentFormatter'
import { motion } from 'framer-motion'
import { FileText, Download, Share2, BookOpen } from 'lucide-react'

// Content artikel yang sudah dibuat
const articleContent = `Era ekonomi digital telah membuka peluang emas bagi pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) untuk mengembangkan bisnis mereka. Salah satu langkah strategis yang semakin populer adalah transformasi dari usaha perorangan menjadi Perseroan Terbatas Perorangan (PT Perorangan). Kebijakan ini, yang diatur dalam Peraturan Pemerintah Nomor 8 Tahun 2021, memberikan jembatan bagi UMKM untuk naik kelas dengan tetap mempertahankan fleksibilitas operasional.

PT Perorangan hadir sebagai solusi inovatif yang memungkinkan pengusaha individu menikmati keuntungan struktur korporasi tanpa kehilangan kendali penuh atas bisnis mereka. Namun, seperti setiap keputusan bisnis strategis, mendirikan PT Perorangan memiliki konsekuensi hukum, finansial, dan operasional yang perlu dipahami secara mendalam.

KEUNTUNGAN MENDIRIKAN PT PERORANGAN

Perlindungan Hukum yang Kuat:
PT Perorangan memberikan pemisahan yang jelas antara kekayaan pribadi dan kekayaan perusahaan. Hal ini berarti jika terjadi masalah hukum atau utang bisnis, aset pribadi pemilik terlindungi dari tuntutan kreditor. Perlindungan ini sangat krusial, terutama bagi bisnis yang beroperasi dalam industri berisiko tinggi atau melibatkan transaksi besar.

Selain itu, PT Perorangan memiliki status badan hukum yang sah, sehingga dapat melakukan kontrak, mengajukan pinjaman bank, dan berpartisipasi dalam tender pemerintah dengan kredibilitas yang lebih tinggi dibandingkan usaha perorangan biasa.

Akses Permodalan yang Lebih Luas:
Lembaga keuangan umumnya lebih percaya kepada badan hukum daripada usaha perorangan. Dengan status PT Perorangan, pengusaha dapat mengakses berbagai skema pembiayaan, termasuk:

1. Kredit investasi dengan bunga kompetitif
2. Program pembiayaan khusus UMKM dari bank-bank BUMN  
3. Skema peer-to-peer lending untuk fintech
4. Kemudahan dalam mengajukan Letter of Credit (L/C) untuk ekspor-impor

Fleksibilitas Operasional:
Berbeda dengan PT konvensional yang memerlukan minimal dua pemegang saham, PT Perorangan dapat dimiliki sepenuhnya oleh satu orang. Struktur ini memungkinkan pengambilan keputusan yang cepat tanpa perlu konsultasi dengan pemegang saham lain, sambil tetap menikmati manfaat struktur korporasi.

PT Perorangan juga dapat dengan mudah bertransformasi menjadi PT biasa ketika bisnis berkembang dan memerlukan investor atau mitra strategis.

KERUGIAN DAN TANTANGAN PT PERORANGAN

Beban Administrasi yang Meningkat:
Sebagai badan hukum, PT Perorangan memiliki kewajiban administrasi yang lebih kompleks dibandingkan usaha perorangan. Kewajiban ini meliputi:

a. Penyusunan laporan keuangan tahunan
b. Penyelenggaraan Rapat Umum Pemegang Saham (RUPS) tahunan
c. Penyampaian laporan kegiatan perusahaan kepada Menteri
d. Pemeliharaan buku daftar pemegang saham dan direksi

Beban Biaya Operasional:
Pendirian dan operasional PT Perorangan memerlukan biaya yang tidak sedikit. Biaya-biaya yang harus dipertimbangkan antara lain:

1. Biaya pendirian dan pendaftaran (sekitar Rp 2-5 juta)
2. Biaya notaris untuk akta pendirian
3. Biaya konsultan hukum dan akuntansi
4. Biaya operasional rutin seperti pajak dan audit

Keterbatasan Modal Awal:
PT Perorangan mensyaratkan modal disetor minimal Rp 50 juta. Bagi sebagian UMKM, nominal ini mungkin cukup besar dan dapat mengganggu cash flow operasional. Selain itu, modal ini harus benar-benar disetor, tidak dapat berupa modal pinjaman atau utang.

PERTIMBANGAN STRATEGIS SEBELUM MENDIRIKAN PT PERORANGAN

Analisis Skala Bisnis:
Sebelum memutuskan transformasi, pengusaha perlu mengevaluasi apakah skala bisnis mereka sudah mencapai titik di mana manfaat PT Perorangan lebih besar daripada biayanya. Bisnis dengan omzet di bawah Rp 500 juta per tahun mungkin belum memerlukan struktur PT Perorangan.

Proyeksi Pertumbuhan:
PT Perorangan paling cocok untuk bisnis yang memiliki proyeksi pertumbuhan jangka menengah hingga panjang. Jika bisnis berencana ekspansi, mencari investor, atau go public dalam 5-10 tahun ke depan, transformasi menjadi PT Perorangan dapat menjadi langkah strategis yang tepat.

Kesiapan Manajemen:
Mengelola PT Perorangan memerlukan disiplin administrasi dan pemahaman yang baik tentang tata kelola perusahaan. Pengusaha harus siap menginvestasikan waktu dan sumber daya untuk memastikan compliance terhadap regulasi yang berlaku.

Dengan demikian PT Perorangan menawarkan jalan tengah yang menarik bagi UMKM yang ingin naik kelas tanpa kehilangan kontrol atas bisnis mereka. Keuntungan berupa perlindungan hukum, akses permodalan yang lebih baik, dan kredibilitas yang meningkat dapat menjadi katalis pertumbuhan bisnis yang signifikan.

Namun, keputusan untuk mendirikan PT Perorangan tidak boleh diambil secara impulsif. Pengusaha perlu melakukan analisis menyeluruh terhadap kondisi bisnis, proyeksi pertumbuhan, dan kesiapan organisasi. Dengan persiapan yang matang dan dukungan konsultan profesional, transformasi menjadi PT Perorangan dapat menjadi langkah strategis yang membawa UMKM menuju level yang lebih tinggi dalam ekosistem bisnis Indonesia.

"Transformasi UMKM menjadi PT Perorangan bukan hanya soal perubahan struktur, tetapi juga mindset bisnis yang lebih profesional dan terstruktur."

Oleh karena itu bagi pengusaha yang sedang mempertimbangkan opsi ini, disarankan untuk berkonsultasi dengan notaris dan konsultan hukum bisnis untuk mendapatkan panduan yang sesuai dengan kondisi spesifik bisnis masing-masing.`

export default function ArticlePreview() {
  const [viewMode, setViewMode] = useState<'article' | 'template'>('article')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Controls */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Demo: Article Formatting System
              </h1>
              <p className="text-gray-600">
                Menampilkan artikel "UMKM Naik Kelas" dengan UniversalContentFormatter
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('article')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'article' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Article Mode
                </button>
                <button
                  onClick={() => setViewMode('template')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'template' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Template Mode
                </button>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>1,247 kata</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>~6 menit baca</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>7 bagian utama</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Format: {viewMode === 'article' ? 'Artikel' : 'Template'}</span>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="p-8">
            <UniversalContentFormatter
              content={articleContent}
              title="UMKM Naik Kelas: Membedah Untung Rugi Mendirikan PT Perorangan"
              contentType={viewMode}
              author="Tim Hukum Bisnis Melek Hukum ID"
              category="hukum-bisnis"
              metadata={{
                readingTime: 6,
                wordCount: 1247,
                sectionCount: 7,
                downloadable: viewMode === 'template'
              }}
            />
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Formatting Features Demonstration
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div>✅ Professional typography hierarchy</div>
                <div>✅ Intelligent content detection</div>
                <div>✅ Responsive mobile formatting</div>
                <div>✅ Consistent numbering system</div>
                <div>✅ Auto-generated sections</div>
                <div>✅ Quote detection & styling</div>
                <div>✅ Content type switching</div>
                <div>✅ Legal document structure</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}