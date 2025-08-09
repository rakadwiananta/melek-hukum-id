'use client'

import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'
import { motion } from 'framer-motion'
import { useState } from 'react'

const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })

export default function KontakPage() {
  const reduced = usePrefersReducedMotion()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const stats: StatItem[] = [
    { 
      label: 'Rata-rata respons email', 
      value: '< 24 jam', 
      sourceLabel: 'SLA Internal 2024', 
      sourceUrl: 'https://melekhukum.id/sla/2024',
      ariaDescription: 'Waktu rata-rata untuk merespons email dari pengguna'
    },
    { 
      label: 'Tingkat kepuasan layanan', 
      value: '4.8/5.0', 
      sourceLabel: 'Survey Pengguna Q4 2024', 
      sourceUrl: 'https://melekhukum.id/survey/q4-2024',
      ariaDescription: 'Rating kepuasan pengguna terhadap layanan customer service'
    },
    { 
      label: 'Pertanyaan terjawab', 
      value: '15,000+', 
      sourceLabel: 'Customer Service Report 2024', 
      sourceUrl: 'https://melekhukum.id/laporan/cs-2024',
      ariaDescription: 'Total pertanyaan yang telah dijawab sepanjang tahun 2024'
    }
  ]

  const socialMedia = [
    { name: 'Facebook', handle: '@melekhukumid', icon: '📘', color: 'from-blue-500 to-blue-600' },
    { name: 'Instagram', handle: '@melekhukumid', icon: '📷', color: 'from-pink-500 to-purple-600' },
    { name: 'Twitter/X', handle: '@melekhukumid', icon: '🐦', color: 'from-sky-400 to-sky-600' },
    { name: 'YouTube', handle: '@melekhukumid', icon: '📺', color: 'from-red-500 to-red-600' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulasi submit
    setTimeout(() => {
      alert('Pesan terkirim! Kami akan merespons dalam 24 jam.')
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader title="Kontak" breadcrumb={[{ label: 'Tentang', href: '/tentang' }, { label: 'Kontak' }]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-6" />
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Info Kontak dengan animasi 3D */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border p-6 transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.h2 
                className="text-xl font-semibold text-gray-900 mb-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Hubungi Kami
              </motion.h2>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Email: 
                  <motion.a 
                    href="mailto:support@melekhukum.id" 
                    className="font-medium text-gray-700 hover:text-primary underline decoration-dotted underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-md ml-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    support@melekhukum.id
                  </motion.a>
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Sosial</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialMedia.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotateY: 10,
                      translateZ: 20
                    }}
                    className="relative overflow-hidden rounded-lg p-3 bg-gray-50 hover:bg-white border hover:shadow-md transition-all duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${social.color} rounded-full opacity-10 blur-2xl`}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                    <div className="flex items-center gap-2 relative z-10">
                      <span className="text-2xl">{social.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{social.name}</div>
                        <div className="text-xs text-gray-600">{social.handle}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Kontak dengan animasi 3D */}
            <motion.div 
              initial={{ opacity: 0, x: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-sm border p-6 transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  className="w-full border rounded-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200" 
                  placeholder="Nama" 
                  aria-label="Nama"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <motion.input 
                  whileFocus={{ scale: 1.02 }}
                  className="w-full border rounded-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200" 
                  placeholder="Email" 
                  type="email"
                  aria-label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <motion.textarea 
                  whileFocus={{ scale: 1.02 }}
                  className="w-full border rounded-lg px-4 py-3 h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-200 resize-none" 
                  placeholder="Pesan" 
                  aria-label="Pesan"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
                <motion.button 
                  type="submit" 
                  className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </motion.button>
              </form>
            </motion.div>
          </div>

          <div className="mt-8">
            <TrustedStats
              title="Kinerja Layanan"
              description="Statistik layanan customer service kami untuk memberikan pengalaman terbaik"
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
