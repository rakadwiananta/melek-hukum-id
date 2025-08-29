'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, FileText, BarChart3, TrendingDown, 
  AlertTriangle, Users, Calendar, ArrowRight,
  Download, ExternalLink, Eye, Clock
} from 'lucide-react'
import Link from 'next/link'

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 15)
    setRotateY((centerX - x) / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      {children}
    </motion.div>
  )
}

// Data laporan KPK
const kpkReports = [
  {
    title: 'Laporan Tahunan KPK 2023',
    description: 'Laporan komprehensif kinerja KPK dalam pemberantasan korupsi sepanjang tahun 2023',
    date: '2024-01-15',
    type: 'Laporan Tahunan',
    size: '15.2 MB',
    pages: 245,
    highlights: [
      'Penanganan 156 kasus korupsi',
      'Pengembalian kerugian negara Rp 2.1 triliun',
      'Pencegahan korupsi di 89 instansi',
      'Edukasi anti-korupsi untuk 2.5 juta masyarakat'
    ]
  },
  {
    title: 'Laporan Semester I 2024',
    description: 'Capaian kinerja KPK dalam semester pertama tahun 2024',
    date: '2024-07-15',
    type: 'Laporan Berkala',
    size: '8.7 MB',
    pages: 128,
    highlights: [
      'Penindakan 78 kasus korupsi',
      'OTT terhadap 23 pejabat',
      'Pencegahan di 45 instansi',
      'Kerugian negara diselamatkan Rp 1.3 triliun'
    ]
  },
  {
    title: 'Indeks Persepsi Korupsi Indonesia 2023',
    description: 'Analisis mendalam tentang persepsi korupsi di Indonesia berdasarkan survei nasional',
    date: '2024-02-28',
    type: 'Laporan Khusus',
    size: '5.4 MB',
    pages: 89,
    highlights: [
      'Skor IPK Indonesia: 34/100',
      'Ranking 115 dari 180 negara',
      'Sektor terkorup: Kepolisian, Pengadilan',
      'Rekomendasi perbaikan sistem'
    ]
  }
]

export default function LaporanKPKPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Header Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Beranda
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <Link href="/artikel" className="hover:text-orange-600 transition-colors">
              Artikel
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-orange-600 font-medium">Laporan KPK</span>
          </motion.nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <Card3D delay={0.2}>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-2xl">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                </Card3D>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Laporan{' '}
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  KPK
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Akses laporan resmi Komisi Pemberantasan Korupsi (KPK) untuk memahami 
                perkembangan pemberantasan korupsi di Indonesia.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {kpkReports.map((report, index) => (
              <Card3D key={index} delay={index * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Report Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {report.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(report.date).toLocaleDateString('id-ID')}</span>
                            </div>
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                              {report.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {report.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {report.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{report.pages} halaman</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                      <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Download PDF
                      </button>
                      <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                        <Eye className="w-5 h-5" />
                        Baca Online
                      </button>
                      <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                        <ExternalLink className="w-5 h-5" />
                        Sumber Asli
                      </button>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-y border-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Statistik{' '}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Anti-Korupsi
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Kasus Ditangani 2023', value: '156', icon: Shield, color: 'from-red-500 to-red-600' },
              { label: 'Kerugian Diselamatkan', value: 'Rp 2.1T', icon: BarChart3, color: 'from-green-500 to-green-600' },
              { label: 'Tersangka Ditahan', value: '89', icon: Users, color: 'from-blue-500 to-blue-600' },
              { label: 'Instansi Dibina', value: '89', icon: FileText, color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card3D key={stat.label} delay={index * 0.1}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>

      {/* Related Links */}
      <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sumber{' '}
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Terkait
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Website Resmi KPK',
                description: 'Akses langsung ke website resmi Komisi Pemberantasan Korupsi',
                url: 'https://kpk.go.id',
                icon: ExternalLink
              },
              {
                title: 'Kamus Anti-Korupsi',
                description: 'Pelajari istilah-istilah dalam pemberantasan korupsi',
                url: '/kamus-hukum/kategori/anti-korupsi',
                icon: Shield
              },
              {
                title: 'Cara Melaporkan Korupsi',
                description: 'Panduan lengkap melaporkan tindak pidana korupsi',
                url: '/anti-korupsi',
                icon: AlertTriangle
              },
              {
                title: 'Konsultasi Anti-Korupsi',
                description: 'Konsultasi dengan ahli hukum pidana dan anti-korupsi',
                url: "/panduan",
                icon: Users
              }
            ].map((link, index) => {
              const IconComponent = link.icon
              return (
                <Card3D key={index} delay={index * 0.1}>
                  <Link href={link.url} className="group block">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                            {link.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {link.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}