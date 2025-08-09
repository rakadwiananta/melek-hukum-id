'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, AlertTriangle, Shield, ExternalLink, BookOpen, Users } from 'lucide-react'
import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'

const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })

interface DisclaimerSection {
  icon: React.ReactNode
  title: string
  content: string
  highlight?: boolean
}

export default function DisclaimerPage() {
  const reduced = usePrefersReducedMotion()
  const [activeTab, setActiveTab] = useState<'general' | 'specific'>('general')
  
  const stats: StatItem[] = [
    { 
      label: 'Artikel direview', 
      value: '100%', 
      sourceLabel: 'Tim Editorial', 
      sourceUrl: '#' 
    },
    { 
      label: 'Update regulasi per bulan', 
      value: '50+', 
      sourceLabel: 'Database Internal', 
      sourceUrl: '#' 
    },
    { 
      label: 'Konsultan hukum partner', 
      value: '15', 
      sourceLabel: 'Direktori Mitra', 
      sourceUrl: '#' 
    }
  ]

  const generalSections: DisclaimerSection[] = [
    {
      icon: <Info className="w-5 h-5" />,
      title: 'Sifat Informasi',
      content: 'Seluruh konten di Melek Hukum ID bersifat informatif dan edukatif. Informasi yang disajikan tidak dapat dianggap sebagai nasihat hukum profesional yang mengikat.',
      highlight: true
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: 'Ketepatan dan Pembaruan',
      content: 'Meskipun kami berupaya keras menjaga akurasi dan kemutakhiran informasi, perubahan regulasi dapat terjadi sewaktu-waktu. Selalu rujuk ke sumber resmi untuk kepastian hukum.'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Tidak Ada Hubungan Klien',
      content: 'Penggunaan platform ini tidak menciptakan hubungan klien-pengacara antara pengguna dan Melek Hukum ID atau kontributor konten kami.'
    },
    {
      icon: <ExternalLink className="w-5 h-5" />,
      title: 'Tautan Pihak Ketiga',
      content: 'Tautan eksternal disediakan untuk kemudahan referensi. Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs pihak ketiga.'
    }
  ]

  const specificCases = [
    {
      title: 'Kasus Pidana',
      warning: 'Untuk kasus pidana, segera konsultasikan dengan advokat. Waktu sangat krusial dalam proses hukum pidana.',
      icon: '⚖️'
    },
    {
      title: 'Sengketa Perdata',
      warning: 'Dokumen template kami hanya sebagai referensi awal. Setiap kasus memiliki keunikan yang memerlukan penyesuaian.',
      icon: '📋'
    },
    {
      title: 'Hukum Keluarga',
      warning: 'Masalah perceraian, waris, dan adopsi sangat sensitif. Pendampingan profesional sangat direkomendasikan.',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      title: 'Hukum Bisnis',
      warning: 'Kontrak bisnis memerlukan review menyeluruh. Kesalahan kecil dapat berakibat besar pada bisnis Anda.',
      icon: '💼'
    }
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader 
          title="Disclaimer" 
          description="Penting untuk dibaca sebelum menggunakan layanan kami"
          breadcrumb={[
            { label: 'Tentang', href: '/tentang' }, 
            { label: 'Disclaimer' }
          ]} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-8" />
          
          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-900 mb-2">
                  Perhatian Penting
                </h2>
                <p className="text-red-800 leading-relaxed">
                  Melek Hukum ID adalah platform edukasi, bukan pengganti konsultasi hukum profesional. 
                  Untuk masalah hukum spesifik yang Anda hadapi, sangat disarankan untuk berkonsultasi 
                  dengan advokat atau konsultan hukum berlisensi.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'general', label: 'Disclaimer Umum', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'specific', label: 'Kasus Spesifik', icon: <Users className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'general' | 'specific')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'general' ? (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid gap-4 md:grid-cols-2"
              >
                {generalSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-sm border p-6 ${
                      section.highlight ? 'border-primary/20 bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        section.highlight ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{section.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="specific"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid gap-4"
              >
                {specificCases.map((kasus, index) => (
                  <motion.div
                    key={kasus.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{kasus.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{kasus.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{kasus.warning}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Professional Help CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Butuh Bantuan Hukum Profesional?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Kami bekerja sama dengan jaringan advokat dan konsultan hukum terpercaya di seluruh Indonesia
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/direktori-advokat"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Cari Advokat
              </a>
              <a
                href="/konsultasi"
                className="px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                Konsultasi Online
              </a>
            </div>
          </motion.div>

          {/* Statistics */}
          <div className="mt-12">
            <TrustedStats
              title="Kredibilitas Platform"
              description="Komitmen kami untuk menyediakan informasi hukum yang akurat"
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
