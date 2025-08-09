'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertCircle, FileText, Scale, ChevronDown, Check } from 'lucide-react'
import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'

interface TermSection {
  id: string
  title: string
  icon: React.ReactNode
  content: string | string[]
  important?: boolean
}

export default function TermsPage() {
  const reduced = usePrefersReducedMotion()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [acceptedSections, setAcceptedSections] = useState<string[]>([])

  const stats: StatItem[] = [
    { 
      label: 'Pengguna aktif bulanan', 
      value: '25.000+', 
      sourceLabel: 'Google Analytics', 
      sourceUrl: '#' 
    },
    { 
      label: 'Tingkat kepatuhan', 
      value: '99.5%', 
      sourceLabel: 'Audit Internal 2024', 
      sourceUrl: '#' 
    },
    { 
      label: 'Pembaruan S&K terakhir', 
      value: 'Jan 2025', 
      sourceLabel: 'Log Perubahan', 
      sourceUrl: '#' 
    }
  ]

  const sections: TermSection[] = [
    {
      id: 'usage',
      title: 'Penggunaan Layanan',
      icon: <Shield className="w-5 h-5" />,
      content: 'Layanan Melek Hukum ID dirancang untuk tujuan edukasi dan informasi hukum. Konten yang kami sediakan bukan merupakan nasihat hukum yang mengikat. Pengguna diharapkan menggunakan kebijaksanaan pribadi dan berkonsultasi dengan profesional hukum untuk kasus spesifik.',
      important: true
    },
    {
      id: 'restrictions',
      title: 'Larangan dan Pembatasan',
      icon: <AlertCircle className="w-5 h-5" />,
      content: [
        'Menyalin atau mendistribusikan konten tanpa atribusi yang jelas',
        'Menggunakan layanan untuk tindakan yang melanggar hukum',
        'Melakukan reverse engineering atau eksploitasi bug/fitur',
        'Mengganggu atau merugikan pengguna lain',
        'Menggunakan bot atau automated scripts tanpa izin'
      ]
    },
    {
      id: 'liability',
      title: 'Batasan Tanggung Jawab',
      icon: <Scale className="w-5 h-5" />,
      content: 'Melek Hukum ID tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang muncul dari penggunaan informasi pada platform ini. Meskipun kami berupaya menjaga akurasi, peraturan dan regulasi dapat berubah sewaktu-waktu tanpa pemberitahuan.',
      important: true
    },
    {
      id: 'changes',
      title: 'Perubahan Ketentuan',
      icon: <FileText className="w-5 h-5" />,
      content: 'Kami berhak memperbarui Syarat & Ketentuan ini kapan saja. Perubahan akan berlaku efektif segera setelah dipublikasikan. Pengguna disarankan untuk meninjau halaman ini secara berkala. Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan.'
    }
  ]

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  const toggleAccept = (id: string) => {
    setAcceptedSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const allAccepted = sections.every(s => acceptedSections.includes(s.id))

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader 
          title="Syarat & Ketentuan" 
          description="Ketentuan penggunaan layanan Melek Hukum ID"
          breadcrumb={[
            { label: 'Tentang', href: '/tentang' }, 
            { label: 'Syarat & Ketentuan' }
          ]} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-8" />
          
          {/* Last Updated Notice */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
          >
            <p className="text-sm text-blue-800">
              <strong>Terakhir diperbarui:</strong> 1 Januari 2025 | 
              <strong> Berlaku efektif:</strong> 1 Januari 2025
            </p>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-4 mb-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border overflow-hidden ${
                  section.important ? 'border-primary/20' : ''
                }`}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={expandedSection === section.id}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      section.important ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {section.title}
                      {section.important && (
                        <span className="ml-2 text-xs text-primary font-normal">(Penting)</span>
                      )}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: expandedSection === section.id ? 'auto' : 0,
                    opacity: expandedSection === section.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <div className="border-t pt-4">
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-2">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{section.content}</p>
                      )}
                      
                      {/* Accept Section */}
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => toggleAccept(section.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            acceptedSections.includes(section.id)
                              ? 'bg-green-50 border-green-300 text-green-700'
                              : 'bg-gray-50 border-gray-300 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            acceptedSections.includes(section.id)
                              ? 'border-green-600 bg-green-600'
                              : 'border-gray-400'
                          }`}>
                            {acceptedSections.includes(section.id) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-sm font-medium">
                            Saya memahami ketentuan ini
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Accept All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 text-center"
          >
            <p className="text-gray-700 mb-4">
              Dengan menggunakan layanan Melek Hukum ID, Anda menyetujui syarat dan ketentuan di atas.
            </p>
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                allAccepted
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
              disabled={allAccepted}
            >
              {allAccepted ? '✓ Semua Ketentuan Dipahami' : 'Saya Setuju dengan Semua Ketentuan'}
            </button>
          </motion.div>

          {/* Statistics */}
          <div className="mt-12">
            <TrustedStats
              title="Statistik Kepatuhan"
              description="Data transparansi penggunaan dan kepatuhan platform"
              stats={stats}
            />
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            <p>
              Pertanyaan tentang Syarat & Ketentuan? 
              <a href="/kontak" className="ml-1 text-primary hover:underline">
                Hubungi tim kami
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
