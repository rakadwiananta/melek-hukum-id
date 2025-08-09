'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'

const aboutLinks = [
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Tim Kami', href: '/tim' },
  { label: 'Kontak', href: '/kontak' },
  { label: 'Kerjasama', href: '/kerjasama' },
]

const legalLinks = [
  { label: 'Kebijakan Privasi', href: '/privacy' },
  { label: 'Syarat & Ketentuan', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Cookie Policy', href: '/cookies' },
]

export default function TentangPage() {
  const reduced = usePrefersReducedMotion()
  const stats: StatItem[] = [
    { 
      label: 'Indeks Persepsi Korupsi Indonesia 2024', 
      value: '34/100', 
      sourceLabel: 'Transparency International', 
      sourceUrl: 'https://www.transparency.org/en/cpi/2024',
      ariaDescription: 'Skor Indonesia dalam Indeks Persepsi Korupsi tahun 2024'
    },
    { 
      label: 'Peringkat Indonesia di ASEAN', 
      value: 'Ke-5 dari 10', 
      sourceLabel: 'Transparency International', 
      sourceUrl: 'https://www.transparency.org/en/cpi/2024',
      ariaDescription: 'Peringkat Indonesia dalam hal persepsi korupsi di ASEAN'
    },
    { 
      label: 'Tingkat Literasi Hukum Masyarakat', 
      value: '32%', 
      sourceLabel: 'Kemenkumham RI 2023', 
      sourceUrl: 'https://www.kemenkumham.go.id/publikasi/litbang',
      ariaDescription: 'Persentase masyarakat yang memahami hak dan kewajiban hukum dasar'
    },
    { 
      label: 'Jumlah Peraturan Disederhanakan', 
      value: '3.140+', 
      sourceLabel: 'Kemenko Perekonomian RI', 
      sourceUrl: 'https://ekon.go.id/publikasi/detail/4637/pemerintah-sederhanakan-3140-peraturan',
      ariaDescription: 'Total peraturan yang telah disederhanakan melalui program reformasi regulasi'
    },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader
          title="Tentang Melek Hukum ID"
          description="Platform edukasi hukum dan anti-korupsi yang menyederhanakan bahasa hukum agar mudah dipahami masyarakat."
          breadcrumb={[{ label: 'Tentang' }]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-6" />

          {/* Ringkasan dengan animasi 3D */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-sm border p-6 mb-10 transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <p className="text-gray-700 leading-relaxed text-lg">
              Melek Hukum ID membantu masyarakat memahami hukum melalui artikel, kamus istilah, template dokumen,
              dan alat bantu interaktif. Kami juga menghadirkan konten anti-korupsi agar publik semakin sadar hak
              dan kewajiban hukum.
            </p>
          </motion.div>

          {/* Visi & Misi dengan efek 3D */}
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20, rotateY: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02, translateZ: 10 }}
              className="bg-white rounded-2xl shadow-sm border p-6 transform-gpu hover:shadow-lg transition-all duration-300"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <motion.div
                className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full opacity-10 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">Visi</h2>
              <p className="text-gray-700 relative z-10">Mewujudkan masyarakat Indonesia yang melek hukum, berintegritas, dan berdaya.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, rotateY: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02, translateZ: 10 }}
              className="bg-white rounded-2xl shadow-sm border p-6 transform-gpu hover:shadow-lg transition-all duration-300"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <motion.div
                className="absolute -top-3 -left-3 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full opacity-10 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-3 relative z-10">Misi</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 relative z-10">
                <li>Menyederhanakan bahasa hukum agar mudah dipahami.</li>
                <li>Menyediakan rujukan tepercaya.</li>
                <li>Menyajikan solusi praktis dan konten anti-korupsi.</li>
              </ul>
            </motion.div>
          </div>

          {/* Layanan utama dengan animasi 3D */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {[
              { title: 'Kamus Istilah', desc: 'Makna istilah hukum yang ringkas dan jelas.', icon: '📚', color: 'from-purple-500 to-purple-600' },
              { title: 'Solusi Praktis', desc: 'Panduan langkah demi langkah menghadapi masalah hukum umum.', icon: '💡', color: 'from-yellow-500 to-orange-500' },
              { title: 'Template Dokumen', desc: 'Dokumen siap pakai untuk kebutuhan dasar.', icon: '📄', color: 'from-green-500 to-emerald-500' },
              { title: 'Regulasi', desc: 'Akses cepat ke regulasi yang relevan.', icon: '⚖️', color: 'from-blue-500 to-cyan-500' },
              { title: 'Edukasi Anti-Korupsi', desc: 'Konten penguatan integritas di kehidupan sehari-hari.', icon: '🛡️', color: 'from-red-500 to-pink-500' },
              { title: 'Tools & Kalkulator', desc: 'Alat bantu interaktif untuk perhitungan dan cek kepatuhan.', icon: '🧮', color: 'from-indigo-500 to-purple-500' },
            ].map((s, index) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  translateZ: 20,
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                className="bg-white rounded-2xl shadow-sm border p-6 relative overflow-hidden transform-gpu hover:shadow-xl transition-all duration-300"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <motion.div
                  className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${s.color} rounded-full opacity-10 blur-2xl`}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-lg font-semibold text-gray-900 relative z-10">{s.title}</div>
                <p className="text-gray-700 mt-1 text-sm relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tautan cepat dengan efek 3D */}
          <div className="grid gap-6 md:grid-cols-2 mt-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border p-6 transform-gpu hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tentang</h3>
              <ul className="space-y-2">
                {aboutLinks.map((l) => (
                  <li key={l.href}>
                    <Link 
                      href={l.href} 
                      className="text-gray-700 hover:text-primary underline decoration-dotted underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-md inline-flex items-center gap-1 group"
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {l.label}
                      </motion.span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border p-6 transform-gpu hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02, rotateY: -2 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link 
                      href={l.href} 
                      className="text-gray-700 hover:text-primary underline decoration-dotted underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-md inline-flex items-center gap-1 group"
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {l.label === 'Cookie Policy' ? 'Kebijakan Cookie' : l.label}
                      </motion.span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Statistik Terkini */}
          <div className="mt-10">
            <TrustedStats
              title="Statistik Terkini"
              description="Data terbaru mengenai indeks korupsi, literasi hukum, dan reformasi regulasi di Indonesia"
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
