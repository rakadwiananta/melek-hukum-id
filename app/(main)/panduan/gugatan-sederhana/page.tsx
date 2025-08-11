import { Metadata } from 'next'
import { Scale, FileText, Calendar, Gavel, AlertCircle, Info, Download, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gugatan Sederhana - Panduan Lengkap Small Claims Court',
  description:
    'Panduan lengkap mengajukan gugatan sederhana (small claims court) sesuai Perma No. 4 Tahun 2019. Syarat, prosedur, dan biaya gugatan sederhana.',
}

export default function GugatanSederhanaPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-pattern-batik opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
              <Scale className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              Gugatan Sederhana
            </h1>
          </div>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl">
            Penyelesaian sengketa perdata dengan prosedur cepat, biaya ringan, dan proses sederhana sesuai Perma No. 4 Tahun 2019
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 -mt-8 mb-12">
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gavel className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900">Nilai Gugatan</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-1">Max Rp 500 Juta</p>
            <p className="text-sm text-gray-600">Sesuai Perma No. 4/2019</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">Waktu Penyelesaian</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-1">Max 25 Hari</p>
            <p className="text-sm text-gray-600">Sejak pendaftaran</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-wayang p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Persidangan</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-1">Max 5x</p>
            <p className="text-sm text-gray-600">Termasuk mediasi</p>
          </div>
        </div>

        {/* Syarat Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-10 shadow-batik border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="h-6 w-6 text-amber-600" />
            Syarat Gugatan Sederhana
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-2">Jenis Perkara:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Wanprestasi (cidera janji)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Perbuatan Melawan Hukum (PMH)</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-2">Persyaratan:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Para pihak dalam satu wilayah hukum PN</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Bukti surat harus lengkap</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Langkah-Langkah Pengajuan</h2>
        
        <div className="space-y-6">
          {[
            {
              number: 1,
              title: 'Verifikasi Kelengkapan',
              description: 'Pastikan perkara memenuhi syarat nilai maksimal Rp 500 juta dan jenis sengketa (wanprestasi/PMH)',
              icon: FileText,
              color: 'blue',
              tips: 'Download form gugatan sederhana di website PN setempat'
            },
            {
              number: 2,
              title: 'Siapkan Berkas',
              description: 'Dokumen yang dibutuhkan:',
              list: ['KTP asli dan fotokopi', 'Surat gugatan rangkap 3', 'Bukti-bukti (kwitansi, perjanjian, dll)', 'Daftar saksi (bila ada)'],
              icon: FileText,
              color: 'purple'
            },
            {
              number: 3,
              title: 'Pendaftaran Perkara',
              description: 'Daftarkan perkara ke Pengadilan Negeri domisili tergugat',
              icon: Gavel,
              color: 'green',
              tips: 'Biaya perkara sekitar Rp 200.000 - Rp 500.000'
            },
            {
              number: 4,
              title: 'Proses Persidangan',
              description: 'Ikuti mediasi dan agenda persidangan sesuai penetapan hakim',
              icon: Calendar,
              color: 'orange',
              tips: 'Hadir tepat waktu, bawa dokumen asli'
            },
            {
              number: 5,
              title: 'Putusan & Eksekusi',
              description: 'Terima putusan dan ajukan eksekusi bila diperlukan',
              icon: Scale,
              color: 'red',
              tips: 'Putusan dapat diajukan keberatan dalam 7 hari'
            }
          ].map((step, index) => (
            <div key={index}>
              <div className="bg-white rounded-2xl shadow-wayang p-6 border border-gray-100 hover:shadow-batik transition-all">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg wayang-bounce`}>
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    
                    {step.list && (
                      <ul className="space-y-2 mb-3">
                        {step.list.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {step.tips && (
                      <div className={`bg-${step.color}-50 rounded-lg p-3 border border-${step.color}-200`}>
                        <p className={`text-sm text-${step.color}-800`}>
                          <strong>Tips:</strong> {step.tips}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Box */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200 shadow-wayang">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Perhatian!</h3>
              <p className="text-red-700">
                Cek Perma No. 4 Tahun 2019 tentang Gugatan Sederhana untuk ketentuan lengkap. 
                Konsultasikan dengan POSBAKUM di PN setempat untuk bantuan hukum gratis.
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-10 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all shadow-batik">
            <Download className="h-5 w-5" />
            Download Template Gugatan Sederhana
          </button>
        </div>
      </div>
    </article>
  )
}
