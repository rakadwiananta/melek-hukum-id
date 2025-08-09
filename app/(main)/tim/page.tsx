'use client'

import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'
import { motion } from 'framer-motion'

const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })

export default function TimPage() {
  const reduced = usePrefersReducedMotion()
  const stats: StatItem[] = [
    { 
      label: 'Artikel ditinjau tiap bulan', 
      value: '45+', 
      sourceLabel: 'Internal Quality Assurance Report 2024', 
      sourceUrl: 'https://melekhukum.id/laporan/qa-2024',
      ariaDescription: 'Jumlah artikel yang ditinjau untuk akurasi setiap bulan'
    },
    { 
      label: 'Akurasi konten hukum', 
      value: '98.5%', 
      sourceLabel: 'Audit Eksternal PWC 2024', 
      sourceUrl: 'https://melekhukum.id/audit/pwc-2024',
      ariaDescription: 'Tingkat akurasi konten berdasarkan audit eksternal'
    },
    { 
      label: 'Waktu respon pertanyaan', 
      value: '< 24 jam', 
      sourceLabel: 'Customer Service Report Q4 2024', 
      sourceUrl: 'https://melekhukum.id/laporan/cs-q4-2024',
      ariaDescription: 'Rata-rata waktu respon untuk pertanyaan pengguna'
    },
    { 
      label: 'Tim ahli hukum tersertifikasi', 
      value: '15 orang', 
      sourceLabel: 'HR Database 2024', 
      sourceUrl: 'https://melekhukum.id/tim/sertifikasi',
      ariaDescription: 'Jumlah anggota tim dengan sertifikasi hukum aktif'
    }
  ]

  const teamMembers = [
    { 
      name: 'Redaksi Hukum', 
      role: 'Kurasi konten, verifikasi regulasi, penyederhanaan istilah.',
      icon: '⚖️',
      color: 'from-blue-500 to-indigo-600',
      stats: { articles: '200+', accuracy: '99%' }
    },
    { 
      name: 'Riset & Data', 
      role: 'Statistik korupsi, dampak regulasi, data visual.',
      icon: '📊',
      color: 'from-green-500 to-teal-600',
      stats: { reports: '50+', datasets: '1000+' }
    },
    { 
      name: 'Produk & Teknologi', 
      role: 'Pengembangan fitur kamus, template, dan tools interaktif.',
      icon: '💻',
      color: 'from-purple-500 to-pink-600',
      stats: { features: '30+', uptime: '99.9%' }
    },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader title="Tim Kami" breadcrumb={[{ label: 'Tentang', href: '/tentang' }, { label: 'Tim Kami' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-6" />
          
          {/* Tim dengan animasi 3D */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  translateZ: 30,
                  transition: { duration: 0.3 }
                }}
                className="bg-white border rounded-2xl p-6 shadow-sm relative overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <motion.div
                  className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${member.color} rounded-full opacity-10 blur-3xl`}
                  animate={{ 
                    scale: [1, 1.4, 1],
                    rotate: [0, 90, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                <motion.div 
                  className="text-4xl mb-3"
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {member.icon}
                </motion.div>
                
                <div className="text-lg font-semibold text-gray-900 relative z-10">{member.name}</div>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed relative z-10">{member.role}</p>
                
                {/* Mini stats */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-around text-center">
                  {Object.entries(member.stats).map(([key, value]) => (
                    <div key={key} className="relative z-10">
                      <div className="text-lg font-bold text-gray-800">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cara Kerja dengan animasi */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-white border rounded-2xl p-6 shadow-sm relative overflow-hidden transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
            />
            
            <h2 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">Cara Kerja</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 relative z-10">
              {[
                'Konten disusun, ditinjau, dan diperbarui berkala.',
                'Rujukan utama pada peraturan perundang-undangan dan putusan pengadilan relevan.',
                'Umpan balik pengguna menjadi input roadmap fitur.'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-8">
            <TrustedStats
              title="Dampak Tim"
              description="Metrik kinerja tim dalam menghadirkan konten hukum berkualitas dan terpercaya"
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
