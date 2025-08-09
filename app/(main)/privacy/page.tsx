'use client'

import { useState } from 'react'
import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'
import { Shield, Lock, Eye, FileText, Clock, Users, AlertCircle, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })

interface PrivacySection {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

export default function PrivacyPage() {
  const reduced = usePrefersReducedMotion()
  const [activeSection, setActiveSection] = useState<string>('overview')
  
  const stats: StatItem[] = [
    { 
      label: 'Waktu respons permintaan data', 
      value: '< 30 hari', 
      sourceLabel: 'SOP Internal', 
      sourceUrl: '#',
      ariaDescription: 'Waktu maksimal untuk merespons permintaan akses data pribadi'
    },
    {
      label: 'Kepatuhan penghapusan data',
      value: '100%',
      sourceLabel: 'Audit Internal 2024',
      sourceUrl: '#',
      ariaDescription: 'Tingkat kepatuhan terhadap permintaan penghapusan data'
    },
    {
      label: 'Insiden keamanan data',
      value: '0',
      sourceLabel: 'Laporan Keamanan 2024',
      sourceUrl: '#',
      ariaDescription: 'Jumlah insiden kebocoran data yang terjadi'
    }
  ]

  const sections: PrivacySection[] = [
    {
      id: 'overview',
      title: 'Ringkasan',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Kebijakan Privasi ini menjelaskan bagaimana Melek Hukum ID ("kami", "kita") 
            mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ("pengguna", "Anda") 
            saat menggunakan website kami.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Komitmen Kami:</strong> Kami berkomitmen melindungi privasi Anda sesuai dengan 
              Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan 
              peraturan terkait lainnya.
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Terakhir diperbarui: 9 Agustus 2025
          </p>
        </div>
      )
    },
    {
      id: 'data-collection',
      title: 'Data yang Dikumpulkan',
      icon: <Eye className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">1. Data yang Anda Berikan</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <div>
                  <strong>Informasi Kontak:</strong> Nama, alamat email (saat mendaftar newsletter atau menghubungi kami)
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <div>
                  <strong>Umpan Balik:</strong> Komentar, saran, atau pertanyaan yang Anda kirimkan
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <div>
                  <strong>Data Akun:</strong> Username dan password terenkripsi (jika fitur akun tersedia)
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">2. Data yang Dikumpulkan Otomatis</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <div>
                  <strong>Data Penggunaan:</strong> Halaman yang dikunjungi, durasi kunjungan, sumber traffic
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <div>
                  <strong>Data Teknis:</strong> Alamat IP (dianonimkan), jenis browser, sistem operasi
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <div>
                  <strong>Cookie:</strong> Sesuai dengan <Link href="/cookies" className="text-primary hover:underline">Kebijakan Cookie</Link> kami
                </div>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'data-usage',
      title: 'Penggunaan Data',
      icon: <Users className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">Kami menggunakan data Anda untuk:</p>
          <div className="space-y-3">
            {[
              {
                purpose: 'Menyediakan Layanan',
                details: 'Menampilkan konten yang relevan, menyimpan preferensi, dan meningkatkan pengalaman pengguna'
              },
              {
                purpose: 'Komunikasi',
                details: 'Mengirim newsletter (dengan persetujuan), merespons pertanyaan, dan memberikan update penting'
              },
              {
                purpose: 'Analisis & Peningkatan',
                details: 'Memahami cara pengguna berinteraksi dengan website untuk meningkatkan konten dan fitur'
              },
              {
                purpose: 'Keamanan',
                details: 'Mencegah spam, penipuan, dan aktivitas berbahaya lainnya'
              },
              {
                purpose: 'Kepatuhan Hukum',
                details: 'Memenuhi kewajiban hukum dan merespons permintaan pihak berwenang'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">{item.purpose}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'data-protection',
      title: 'Perlindungan Data',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            Kami menerapkan langkah-langkah keamanan teknis dan organisasional untuk melindungi data Anda:
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <Lock className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium text-gray-900 mb-2">Keamanan Teknis</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Enkripsi SSL/TLS untuk transmisi data</li>
                <li>• Enkripsi database untuk data sensitif</li>
                <li>• Firewall dan sistem deteksi intrusi</li>
                <li>• Backup data regular dan terenkripsi</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <Users className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-medium text-gray-900 mb-2">Keamanan Organisasional</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Akses terbatas berdasarkan kebutuhan</li>
                <li>• Training privasi untuk tim</li>
                <li>• NDA untuk semua personel</li>
                <li>• Audit keamanan berkala</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-sharing',
      title: 'Pembagian Data',
      icon: <AlertCircle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Kami <strong>tidak menjual</strong> data pribadi Anda. Data dapat dibagikan dalam situasi terbatas:
          </p>
          
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Penyedia Layanan</h4>
              <p className="text-sm text-gray-700">
                Pihak ketiga tepercaya yang membantu operasional (hosting, analytics) dengan perjanjian kerahasiaan ketat
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Kewajiban Hukum</h4>
              <p className="text-sm text-gray-700">
                Jika diwajibkan oleh hukum atau perintah pengadilan yang sah
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Dengan Persetujuan Anda</h4>
              <p className="text-sm text-gray-700">
                Untuk tujuan lain dengan persetujuan eksplisit Anda
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-retention',
      title: 'Penyimpanan Data',
      icon: <Clock className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Kami menyimpan data Anda sesuai dengan tujuan pengumpulan dan kewajiban hukum:
          </p>
          
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Jenis Data</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-900">Periode Penyimpanan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">Email Newsletter</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">Sampai berhenti berlangganan</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">Data Analytics</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">26 bulan</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">Log Server</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">90 hari</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">Data Komunikasi</td>
                <td className="border border-gray-200 px-4 py-2 text-sm text-gray-700">3 tahun atau sesuai kebutuhan</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'user-rights',
      title: 'Hak Anda',
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            Sesuai UU PDP, Anda memiliki hak-hak berikut terkait data pribadi Anda:
          </p>
          
          <div className="space-y-3">
            {[
              {
                right: 'Hak Akses',
                description: 'Meminta salinan data pribadi yang kami miliki tentang Anda'
              },
              {
                right: 'Hak Koreksi',
                description: 'Memperbaiki data yang tidak akurat atau melengkapi data yang tidak lengkap'
              },
              {
                right: 'Hak Penghapusan',
                description: 'Meminta penghapusan data pribadi dalam kondisi tertentu'
              },
              {
                right: 'Hak Pembatasan',
                description: 'Membatasi pemrosesan data pribadi dalam kondisi tertentu'
              },
              {
                right: 'Hak Portabilitas',
                description: 'Menerima data dalam format yang dapat dibaca mesin'
              },
              {
                right: 'Hak Keberatan',
                description: 'Menolak pemrosesan data untuk tujuan tertentu'
              },
              {
                right: 'Hak Mencabut Persetujuan',
                description: 'Menarik kembali persetujuan yang telah diberikan kapan saja'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900">{item.right}</h4>
                <p className="text-sm text-blue-800 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Untuk menggunakan hak-hak Anda, silakan hubungi kami di{' '}
              <a href="mailto:privacy@melekhukum.id" className="text-primary hover:underline">
                privacy@melekhukum.id
              </a>
            </p>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader 
          title="Kebijakan Privasi" 
          description="Transparansi dalam perlindungan data pribadi Anda"
          breadcrumb={[{ label: 'Tentang', href: '/tentang' }, { label: 'Kebijakan Privasi' }]} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-6" />
          
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Navigation Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-sm border p-4 sticky top-4">
                <h3 className="font-semibold text-gray-900 mb-4">Navigasi</h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className={activeSection === section.id ? 'text-white' : 'text-gray-400'}>
                        {section.icon}
                      </span>
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-6 pt-6 border-t">
                  <a
                    href="/privacy-policy.pdf"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Content Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                {sections.find(s => s.id === activeSection)?.content}
              </div>
              
              {/* Contact CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white"
              >
                <h3 className="text-xl font-semibold mb-2">Ada Pertanyaan?</h3>
                <p className="mb-4">
                  Tim privasi kami siap membantu menjawab pertanyaan Anda terkait perlindungan data pribadi.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:privacy@melekhukum.id"
                    className="inline-flex items-center justify-center px-5 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Hubungi Tim Privasi
                  </a>
                  <Link
                    href="/data-request"
                    className="inline-flex items-center justify-center px-5 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Ajukan Permintaan Data
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Statistics */}
          <div className="mt-8">
            <TrustedStats
              title="Komitmen Perlindungan Data"
              description="Metrik transparansi dan kepatuhan perlindungan data pribadi"
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
