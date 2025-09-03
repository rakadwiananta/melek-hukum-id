import { Metadata } from 'next'
import { Heart, Gavel, Calendar, FileText, Users, AlertTriangle, CheckCircle, Clock, CreditCard, Scale, Download, Info, ArrowRight, Shield, Briefcase } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prosedur Perceraian - Panduan Lengkap 2024 | Melek Hukum ID',
  description: 'Panduan lengkap cerai gugat dan cerai talak di Pengadilan Agama/Negeri: syarat, alur persidangan, dokumen, biaya, dan estimasi waktu proses.',
  keywords: ['cerai gugat', 'cerai talak', 'pengadilan agama', 'pengadilan negeri', 'perceraian', 'mediasi', 'hukum keluarga', 'hak asuh anak', 'nafkah', 'harta gono-gini'],
}

// Data statistik perceraian 2024
const divorceStatistics = {
  totalCases2024: 516980,
  averageProcessingDays: 120,
  mediationSuccessRate: 18.5,
  ceraiGugat: 70.3,
  ceraiTalak: 29.7,
}

// Jenis-jenis perceraian
const divorceTypes = [
  {
    id: 'cerai-gugat',
    name: 'Cerai Gugat',
    description: 'Gugatan perceraian yang diajukan oleh istri kepada suami',
    icon: FileText,
    color: 'rose',
    percentage: 70.3,
    court: 'Pengadilan Agama (Muslim) / Pengadilan Negeri (Non-Muslim)',
    grounds: [
      'Suami meninggalkan istri selama 2 tahun berturut-turut',
      'Suami melakukan kekerasan atau penganiayaan',
      'Suami mabuk, judi, atau perbuatan tercela lainnya',
      'Suami tidak memberi nafkah selama 3 bulan',
      'Suami cacat badan atau penyakit yang tidak dapat disembuhkan',
      'Perselisihan terus-menerus yang tidak dapat didamaikan',
    ]
  },
  {
    id: 'cerai-talak',
    name: 'Cerai Talak',
    description: 'Permohonan cerai yang diajukan oleh suami kepada istri',
    icon: Gavel,
    color: 'blue',
    percentage: 29.7,
    court: 'Pengadilan Agama (khusus Muslim)',
    grounds: [
      'Istri berbuat zina',
      'Istri pemabuk/penjudi yang sulit disembuhkan',
      'Istri meninggalkan suami tanpa izin',
      'Istri melakukan penganiayaan terhadap suami',
      'Istri murtad',
      'Perselisihan dan pertengkaran terus-menerus',
    ]
  }
]

// Tahapan persidangan
const courtStages = [
  {
    stage: 'Pendaftaran',
    duration: '1-3 hari',
    description: 'Mendaftarkan gugatan/permohonan di kepaniteraan',
    documents: ['Surat gugatan/permohonan', 'KTP', 'Buku nikah', 'KK'],
  },
  {
    stage: 'Pemanggilan',
    duration: '14 hari',
    description: 'Pengadilan memanggil para pihak untuk sidang pertama',
    documents: ['Relaas panggilan sidang'],
  },
  {
    stage: 'Sidang I - Mediasi',
    duration: '30 hari',
    description: 'Upaya damai wajib melalui mediator bersertifikat',
    documents: ['Surat kuasa (jika pakai pengacara)', 'Resume perkara'],
  },
  {
    stage: 'Sidang II-V - Pembuktian',
    duration: '30-60 hari',
    description: 'Pembacaan gugatan, jawaban, replik, duplik, dan pembuktian',
    documents: ['Bukti surat', 'Daftar saksi', 'Alat bukti lainnya'],
  },
  {
    stage: 'Putusan',
    duration: '14 hari',
    description: 'Pembacaan putusan oleh majelis hakim',
    documents: ['Salinan putusan'],
  },
  {
    stage: 'Banding (Opsional)',
    duration: '14 hari untuk mengajukan',
    description: 'Upaya hukum ke Pengadilan Tinggi jika tidak puas',
    documents: ['Akta banding', 'Memori banding'],
  },
]

export default function ProsedurPerceraianPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {/* Hero Section dengan Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-5 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
              <Heart className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
            Panduan Lengkap Perceraian di Indonesia
          </h1>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto text-center">
            Informasi komprehensif tentang cerai gugat dan cerai talak: prosedur, syarat, biaya, 
            dan hak-hak yang perlu Anda ketahui
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 -mt-10 mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-rose-100">
            <p className="text-sm text-gray-600 mb-2">Total Kasus 2024</p>
            <p className="text-2xl font-bold text-rose-600">
              {divorceStatistics.totalCases2024.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
            <p className="text-sm text-gray-600 mb-2">Rata-rata Proses</p>
            <p className="text-2xl font-bold text-blue-600">
              {divorceStatistics.averageProcessingDays} hari
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
            <p className="text-sm text-gray-600 mb-2">Berhasil Mediasi</p>
            <p className="text-2xl font-bold text-green-600">
              {divorceStatistics.mediationSuccessRate}%
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
            <p className="text-sm text-gray-600 mb-2">Cerai Gugat</p>
            <p className="text-2xl font-bold text-purple-600">
              {divorceStatistics.ceraiGugat}%
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-100">
            <p className="text-sm text-gray-600 mb-2">Cerai Talak</p>
            <p className="text-2xl font-bold text-orange-600">
              {divorceStatistics.ceraiTalak}%
            </p>
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-3xl p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Perhatian Penting!</h3>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Perceraian hanya dapat dilakukan di depan sidang Pengadilan setelah upaya perdamaian gagal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Mediasi adalah tahap WAJIB yang tidak boleh dilewati (kecuali kasus KDRT)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>Gunakan layanan Posbakum untuk bantuan hukum gratis jika tidak mampu bayar advokat</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jenis Perceraian */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Jenis-Jenis Perceraian</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {divorceTypes.map((type) => (
              <div key={type.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-rose-300 transition-all">
                <div className={`bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <type.icon className="h-8 w-8" />
                      <h3 className="text-2xl font-bold">{type.name}</h3>
                    </div>
                    <span className="text-3xl font-bold">{type.percentage}%</span>
                  </div>
                  <p className="text-rose-100">{type.description}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Diajukan di:</h4>
                    <p className="text-sm text-gray-600">{type.court}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Alasan yang dapat digunakan:</h4>
                    <ul className="space-y-2">
                      {type.grounds.map((ground, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-rose-500 font-bold">{idx + 1}.</span>
                          <span>{ground}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dokumen yang Diperlukan */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Dokumen yang Diperlukan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Dokumen Wajib
              </h3>
              <ul className="space-y-3">
                {[
                  'Surat Gugatan/Permohonan (rangkap 5)',
                  'Fotokopi KTP Penggugat & Tergugat',
                  'Fotokopi Buku Nikah/Akta Nikah (legalisir)',
                  'Fotokopi Kartu Keluarga',
                  'Fotokopi Akta Kelahiran Anak (jika ada)',
                  'Surat Keterangan Penghasilan (untuk nafkah)',
                  'NPWP (jika terkait harta bersama)',
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-indigo-600" />
                Dokumen Pendukung (Jika Ada)
              </h3>
              <ul className="space-y-3">
                {[
                  'Bukti kepemilikan harta bersama',
                  'Rekening koran/tabungan',
                  'Sertifikat tanah/rumah',
                  'BPKB kendaraan',
                  'Visum et repertum (kasus KDRT)',
                  'Surat keterangan dari RT/RW',
                  'Bukti perselingkuhan (foto, chat, dll)',
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 shadow">
                    <ArrowRight className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tahapan Persidangan */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Tahapan Persidangan</h2>
          <div className="space-y-6">
            {courtStages.map((stage, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-rose-500">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{stage.stage}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        <Clock className="inline h-4 w-4 mr-1" />
                        {stage.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{stage.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.documents.map((doc, docIdx) => (
                        <span key={docIdx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Biaya Perceraian */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-10 mb-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-green-600" />
            Estimasi Biaya Perceraian
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Pengadilan Agama</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Pendaftaran</span>
                  <span className="font-semibold">Rp 30.000 - 50.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Biaya Proses</span>
                  <span className="font-semibold">Rp 150.000 - 200.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Panggilan Sidang</span>
                  <span className="font-semibold">Rp 510.000 - 810.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Pemberitahuan Putusan</span>
                  <span className="font-semibold">Rp 100.000 - 150.000</span>
                </li>
                <li className="flex justify-between items-center py-2 font-bold text-green-700">
                  <span>Total Estimasi</span>
                  <span>Rp 790.000 - 1.210.000</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Pengadilan Negeri</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Pendaftaran</span>
                  <span className="font-semibold">Rp 50.000 - 75.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Biaya Proses</span>
                  <span className="font-semibold">Rp 200.000 - 300.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Panggilan Sidang</span>
                  <span className="font-semibold">Rp 600.000 - 1.000.000</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Pemberitahuan Putusan</span>
                  <span className="font-semibold">Rp 150.000 - 200.000</span>
                </li>
                <li className="flex justify-between items-center py-2 font-bold text-green-700">
                  <span>Total Estimasi</span>
                  <span>Rp 1.000.000 - 1.575.000</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-100 rounded-xl border border-yellow-300">
            <p className="text-sm text-yellow-800">
              <strong>Catatan:</strong> Biaya dapat berbeda di setiap daerah. Untuk tidak mampu, bisa mengajukan prodeo (bebas biaya) dengan melampirkan SKTM.
            </p>
          </div>
        </div>

        {/* Hak-Hak Pasca Perceraian */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border-2 border-purple-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Scale className="h-8 w-8 text-purple-600" />
            Hak-Hak Pasca Perceraian
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-purple-800 mb-4">Hak Istri</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Nafkah iddah (3 bulan)</li>
                <li>• Mut'ah (pemberian suami)</li>
                <li>• Nafkah madhiyah (hutang nafkah)</li>
                <li>• 50% harta gono-gini</li>
                <li>• Hak asuh anak (umumnya &lt; 12 tahun)</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-blue-800 mb-4">Hak Anak</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Nafkah hingga dewasa/mandiri</li>
                <li>• Biaya pendidikan</li>
                <li>• Biaya kesehatan</li>
                <li>• Tempat tinggal layak</li>
                <li>• Kasih sayang kedua orang tua</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-green-800 mb-4">Harta Bersama</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Dibagi 50:50 (umumnya)</li>
                <li>• Harta bawaan tetap milik masing-masing</li>
                <li>• Hutang bersama ditanggung bersama</li>
                <li>• Harta warisan tidak termasuk</li>
                <li>• Bisa diatur dalam perjanjian</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 mb-12 text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Info className="h-8 w-8" />
            Tips Menghadapi Proses Perceraian
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">Sebelum Persidangan</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>✓ Konsultasi dengan pengacara atau Posbakum</li>
                <li>✓ Siapkan bukti-bukti yang kuat</li>
                <li>✓ Dokumentasikan semua aset dan hutang</li>
                <li>✓ Pertimbangkan dampak pada anak</li>
                <li>✓ Siapkan mental dan emosional</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-4">Selama Persidangan</h3>
              <ul className="space-y-2 text-indigo-100">
                <li>✓ Hadir tepat waktu di setiap sidang</li>
                <li>✓ Berpakaian sopan dan rapi</li>
                <li>✓ Bicara jujur dan tidak emosional</li>
                <li>✓ Hormati proses pengadilan</li>
                <li>✓ Fokus pada fakta, bukan emosi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Apakah bisa cerai tanpa ke pengadilan?',
                a: 'Tidak bisa. Menurut UU Perkawinan, perceraian hanya sah jika dilakukan di depan sidang pengadilan.',
              },
              {
                q: 'Berapa lama proses perceraian?',
                a: 'Rata-rata 3-6 bulan untuk perkara biasa. Bisa lebih cepat (2-3 bulan) jika tidak ada sengketa, atau lebih lama jika ada upaya hukum banding/kasasi.',
              },
              {
                q: 'Apakah harus pakai pengacara?',
                a: 'Tidak wajib. Anda bisa mengurus sendiri atau menggunakan bantuan Posbakum (gratis) di pengadilan.',
              },
              {
                q: 'Bagaimana jika pasangan tidak hadir di sidang?',
                a: 'Sidang tetap dapat dilanjutkan. Setelah 2x panggilan sah tidak hadir, dapat diputus verstek (tanpa kehadiran tergugat).',
              },
              {
                q: 'Apakah bisa rujuk setelah cerai?',
                a: 'Untuk cerai talak (Muslim): bisa rujuk dalam masa iddah. Setelah itu harus nikah ulang. Untuk lainnya: harus menikah ulang.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Download */}
        <div className="text-center bg-gradient-to-r from-rose-100 to-pink-100 rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Butuh Template Surat Gugatan?</h3>
          <p className="text-gray-700 mb-6">Download template surat gugatan cerai dan panduan lengkap pengisian</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/template/gugatan-sederhana"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Download className="h-5 w-5" />
              Download Template Gugatan
            </Link>
            <a 
              href="https://peradi.or.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rose-600 font-semibold rounded-2xl border-2 border-rose-600 hover:bg-rose-50 transition-all"
            >
              <Users className="h-5 w-5" />
              Konsultasi dengan PERADI
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
