'use client'

import { Scale, FileText, Calendar, Gavel, AlertCircle, Info, Download, ArrowRight, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react'
import Link from 'next/link'



export default function GugatanSederhanaPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Batik Pattern CSS */}
      <style jsx>{`
        .batik-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='30' r='2'/%3E%3Ccircle cx='30' cy='10' r='2'/%3E%3C/g%3E%3C/svg%3E");
        }
        .wayang-shadow {
          box-shadow: 0 4px 20px rgba(139, 69, 19, 0.15), 0 2px 8px rgba(139, 69, 19, 0.1);
        }
      `}</style>

      {/* Hero Section dengan Motif Nusantara */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-orange-600 text-white">
        <div className="absolute inset-0 batik-pattern opacity-20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 sm:p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg transform hover:scale-105 transition-transform">
                  <Scale className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
                  Gugatan Sederhana
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-red-100 mb-8 leading-relaxed">
                Penyelesaian sengketa perdata dengan prosedur cepat, biaya ringan, dan proses sederhana sesuai Perma No. 4 Tahun 2019
              </p>
              
              {/* Statistik Terbaru */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
                  <p className="text-2xl sm:text-3xl font-bold">87%</p>
                  <p className="text-xs sm:text-sm text-red-100">Tingkat Penyelesaian</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20">
                  <p className="text-2xl sm:text-3xl font-bold">21 Hari</p>
                  <p className="text-xs sm:text-sm text-red-100">Rata-rata Waktu</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/20 col-span-2 sm:col-span-1">
                  <p className="text-2xl sm:text-3xl font-bold">45,892</p>
                  <p className="text-xs sm:text-sm text-red-100">Perkara di 2024</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="hidden lg:block w-72 h-72 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Info Cards dengan Desain Nusantara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 -mt-6 sm:-mt-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-red-100 hover:border-red-300 transition-all hover:transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
                <Gavel className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Nilai Gugatan</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-1">Max Rp 500 Juta</p>
            <p className="text-xs sm:text-sm text-gray-600">Sesuai Perma No. 4/2019</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📊 98% perkara di bawah Rp 200 juta</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-green-100 hover:border-green-300 transition-all hover:transform hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Waktu Penyelesaian</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">Max 25 Hari</p>
            <p className="text-xs sm:text-sm text-gray-600">Sejak pendaftaran</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">⚡ 73% selesai &lt; 20 hari</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-blue-100 hover:border-blue-300 transition-all hover:transform hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base">Persidangan</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">Max 5x</p>
            <p className="text-xs sm:text-sm text-gray-600">Termasuk mediasi</p>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">📈 Rata-rata 3x sidang</p>
            </div>
          </div>
        </div>

        {/* Statistik Pengadilan Negeri */}
        <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 wayang-shadow border-2 border-amber-300">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Data Statistik Gugatan Sederhana 2024
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Perkara</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">45,892</p>
              <p className="text-xs text-green-600 mt-1">↑ 23% dari 2023</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Wanprestasi</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">67%</p>
              <p className="text-xs text-gray-500 mt-1">30,748 perkara</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">PMH</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-700">33%</p>
              <p className="text-xs text-gray-500 mt-1">15,144 perkara</p>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-5 shadow-md">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Mediasi Berhasil</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">41%</p>
              <p className="text-xs text-gray-500 mt-1">18,816 perkara</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-4 italic">*Sumber: Direktorat Jenderal Badan Peradilan Umum MA RI, Update November 2024</p>
        </div>

        {/* Syarat Section dengan Ornamen Nusantara */}
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 wayang-shadow border-2 border-orange-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            Syarat Gugatan Sederhana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Jenis Perkara:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700 text-sm sm:text-base">Wanprestasi (cidera janji)</span>
                    <p className="text-xs text-gray-500 mt-1">Contoh: Hutang piutang, jual beli, sewa menyewa</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700 text-sm sm:text-base">Perbuatan Melawan Hukum (PMH)</span>
                    <p className="text-xs text-gray-500 mt-1">Contoh: Kerusakan properti, kerugian bisnis</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Persyaratan:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700 text-sm sm:text-base">Para pihak dalam satu wilayah hukum PN</span>
                    <p className="text-xs text-gray-500 mt-1">Penggugat & tergugat di wilayah yang sama</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-gray-700 text-sm sm:text-base">Bukti surat harus lengkap</span>
                    <p className="text-xs text-gray-500 mt-1">Kwitansi, perjanjian, bukti transfer, dll</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps Section dengan Animasi Nusantara */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Langkah-Langkah Pengajuan</h2>
        
        <div className="space-y-4 sm:space-y-6">
          {[
            {
              number: 1,
              title: 'Verifikasi Kelengkapan',
              description: 'Pastikan perkara memenuhi syarat nilai maksimal Rp 500 juta dan jenis sengketa (wanprestasi/PMH)',
              icon: FileText,
              color: 'red',
              tips: 'Download form gugatan sederhana di website PN setempat',
              stats: '95% gugatan diterima jika dokumen lengkap'
            },
            {
              number: 2,
              title: 'Siapkan Berkas',
              description: 'Dokumen yang dibutuhkan:',
              list: ['KTP asli dan fotokopi', 'Surat gugatan rangkap 3', 'Bukti-bukti (kwitansi, perjanjian, dll)', 'Daftar saksi (bila ada)'],
              icon: FileText,
              color: 'orange',
              stats: 'Waktu persiapan: 1-3 hari'
            },
            {
              number: 3,
              title: 'Pendaftaran Perkara',
              description: 'Daftarkan perkara ke Pengadilan Negeri domisili tergugat',
              icon: Gavel,
              color: 'yellow',
              tips: 'Biaya perkara rata-rata Rp 237.000 - Rp 467.000 (tergantung PN)',
              stats: '82% dapat nomor perkara di hari yang sama'
            },
            {
              number: 4,
              title: 'Proses Persidangan',
              description: 'Ikuti mediasi dan agenda persidangan sesuai penetapan hakim',
              icon: Calendar,
              color: 'green',
              tips: 'Hadir tepat waktu, bawa dokumen asli',
              stats: 'Sidang pertama: 3-7 hari setelah pendaftaran'
            },
            {
              number: 5,
              title: 'Putusan & Eksekusi',
              description: 'Terima putusan dan ajukan eksekusi bila diperlukan',
              icon: Scale,
              color: 'blue',
              tips: 'Putusan dapat diajukan keberatan dalam 7 hari',
              stats: '76% putusan dijalankan secara sukarela'
            }
          ].map((step, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl wayang-shadow p-5 sm:p-6 border-2 border-gray-100 hover:border-orange-300 transition-all hover:transform hover:scale-[1.02]">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg transform group-hover:rotate-3 transition-transform`}>
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-3 text-sm sm:text-base">{step.description}</p>
                    
                    {step.list && (
                      <ul className="space-y-2 mb-3">
                        {step.list.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {step.tips && (
                        <div className={`bg-gradient-to-br from-${step.color}-50 to-${step.color}-100 rounded-lg p-3 border border-${step.color}-200`}>
                          <p className={`text-xs sm:text-sm text-${step.color}-800`}>
                            <strong>💡 Tips:</strong> {step.tips}
                          </p>
                        </div>
                      )}
                      
                      {step.stats && (
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
                          <p className="text-xs sm:text-sm text-gray-700">
                            <strong>📊 Data:</strong> {step.stats}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Biaya Perkara per Wilayah */}
        <div className="mt-8 sm:mt-10 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 sm:p-8 wayang-shadow border-2 border-indigo-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Estimasi Biaya Perkara per Wilayah</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { wilayah: 'Jakarta', biaya: 'Rp 237.000 - 387.000' },
              { wilayah: 'Jawa Barat', biaya: 'Rp 250.000 - 400.000' },
              { wilayah: 'Jawa Tengah', biaya: 'Rp 200.000 - 350.000' },
              { wilayah: 'Jawa Timur', biaya: 'Rp 225.000 - 375.000' },
              { wilayah: 'Sumatera', biaya: 'Rp 275.000 - 425.000' },
              { wilayah: 'Kalimantan', biaya: 'Rp 300.000 - 450.000' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 shadow-md">
                <p className="text-xs sm:text-sm font-semibold text-gray-700">{item.wilayah}</p>
                <p className="text-sm sm:text-base font-bold text-indigo-600">{item.biaya}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-4 italic">*Biaya dapat berbeda per PN, termasuk PNBP dan materai</p>
        </div>

        {/* Warning Box dengan Desain Tradisional */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-5 sm:p-6 border-2 border-red-300 wayang-shadow">
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-2 text-sm sm:text-base">Perhatian Penting!</h3>
              <ul className="space-y-2 text-red-700 text-xs sm:text-sm">
                <li>• Cek Perma No. 4 Tahun 2019 tentang Gugatan Sederhana untuk ketentuan lengkap</li>
                <li>• Konsultasikan dengan POSBAKUM di PN setempat untuk bantuan hukum gratis</li>
                <li>• Pastikan alamat tergugat benar untuk menghindari penundaan</li>
                <li>• Siapkan bukti-bukti dalam bentuk asli dan fotokopi</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link 
            href="/template/gugatan-sederhana"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all wayang-shadow text-sm sm:text-base"
          >
            <Download className="h-5 w-5" />
            Download Template Gugatan Sederhana
          </Link>
          <p className="text-xs text-gray-600 mt-3">Format sesuai standar Pengadilan Negeri Indonesia</p>
        </div>
      </div>
    </article>
  )
}
