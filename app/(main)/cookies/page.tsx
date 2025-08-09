'use client'

import { useState } from 'react'
import PageHeader from '@/app/components/ui/PageHeader'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import dynamic from 'next/dynamic'
import TrustedStats, { StatItem } from '@/app/components/stats/TrustedStats'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'
import { Cookie, Shield, Settings, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NusantaraCanvas = dynamic(() => import('@/app/components/nusantara/NusantaraCanvas'), { ssr: false })

interface CookieCategory {
  id: string
  title: string
  description: string
  cookies: CookieDetail[]
  required: boolean
  icon: React.ReactNode
}

interface CookieDetail {
  name: string
  provider: string
  purpose: string
  expiry: string
  type: string
}

export default function CookiesPage() {
  const reduced = usePrefersReducedMotion()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: true,
    functional: true,
    marketing: false
  })

  const stats: StatItem[] = [
    { 
      label: 'Pengguna menerima semua cookie', 
      value: '68%', 
      sourceLabel: 'Analytics Internal Q3 2024', 
      sourceUrl: '#',
      ariaDescription: 'Persentase pengguna yang menerima semua jenis cookie'
    },
    {
      label: 'Pengguna kustomisasi preferensi',
      value: '32%',
      sourceLabel: 'Analytics Internal Q3 2024',
      sourceUrl: '#',
      ariaDescription: 'Persentase pengguna yang mengatur preferensi cookie secara manual'
    }
  ]

  const cookieCategories: CookieCategory[] = [
    {
      id: 'necessary',
      title: 'Cookie Esensial',
      description: 'Cookie yang diperlukan untuk fungsi dasar website. Tidak dapat dinonaktifkan.',
      required: true,
      icon: <Shield className="w-5 h-5" />,
      cookies: [
        {
          name: 'sessionId',
          provider: 'Melek Hukum ID',
          purpose: 'Menyimpan sesi pengguna untuk navigasi antar halaman',
          expiry: 'Saat browser ditutup',
          type: 'Session'
        },
        {
          name: 'cookieConsent',
          provider: 'Melek Hukum ID',
          purpose: 'Menyimpan preferensi cookie pengguna',
          expiry: '1 tahun',
          type: 'Persistent'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Cookie Analitik',
      description: 'Membantu kami memahami bagaimana pengunjung menggunakan website.',
      required: false,
      icon: <Info className="w-5 h-5" />,
      cookies: [
        {
          name: '_ga',
          provider: 'Google Analytics',
          purpose: 'Membedakan pengguna unik dengan ID acak',
          expiry: '2 tahun',
          type: 'Persistent'
        },
        {
          name: '_gid',
          provider: 'Google Analytics',
          purpose: 'Membedakan pengguna unik per hari',
          expiry: '24 jam',
          type: 'Persistent'
        }
      ]
    },
    {
      id: 'functional',
      title: 'Cookie Fungsional',
      description: 'Meningkatkan fungsionalitas website dengan menyimpan preferensi.',
      required: false,
      icon: <Settings className="w-5 h-5" />,
      cookies: [
        {
          name: 'language',
          provider: 'Melek Hukum ID',
          purpose: 'Menyimpan preferensi bahasa',
          expiry: '1 tahun',
          type: 'Persistent'
        },
        {
          name: 'theme',
          provider: 'Melek Hukum ID',
          purpose: 'Menyimpan preferensi tema (terang/gelap)',
          expiry: '1 tahun',
          type: 'Persistent'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Cookie Marketing',
      description: 'Cookie untuk menampilkan konten yang relevan dengan minat Anda.',
      required: false,
      icon: <Cookie className="w-5 h-5" />,
      cookies: [
        {
          name: 'fbp',
          provider: 'Facebook',
          purpose: 'Melacak dan menampilkan iklan relevan',
          expiry: '3 bulan',
          type: 'Persistent'
        }
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const handlePreferenceChange = (category: string, value: boolean) => {
    setCookiePreferences(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const savePreferences = () => {
    // Implementasi simpan preferensi
    console.log('Preferensi disimpan:', cookiePreferences)
    // Show toast notification
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <PatternBackground />
      <div className="relative z-10">
        <PageHeader 
          title="Kebijakan Cookie" 
          description="Kami menggunakan cookie untuk meningkatkan pengalaman Anda di website ini"
          breadcrumb={[{ label: 'Tentang', href: '/tentang' }, { label: 'Kebijakan Cookie' }]} 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NusantaraCanvas height={180} reducedMotion={reduced} className="mb-6" />
          
          {/* Penjelasan Umum */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Apa itu Cookie?</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi website. 
                Cookie membantu website mengingat informasi tentang kunjungan Anda, seperti preferensi 
                bahasa dan pengaturan lainnya.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Kami menggunakan cookie untuk:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                <li>Memastikan website berfungsi dengan baik</li>
                <li>Menganalisis cara pengunjung menggunakan website</li>
                <li>Menyimpan preferensi Anda</li>
                <li>Menampilkan konten yang relevan</li>
              </ul>
            </div>
          </motion.div>

          {/* Cookie Manager */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Kelola Preferensi Cookie</h2>
            
            <div className="space-y-4">
              {cookieCategories.map((category) => (
                <div key={category.id} className="border rounded-lg">
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-primary">{category.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{category.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {category.required ? (
                          <span className="text-sm text-gray-500">Wajib</span>
                        ) : (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={cookiePreferences[category.id as keyof typeof cookiePreferences]}
                              onChange={(e) => handlePreferenceChange(category.id, e.target.checked)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        )}
                        {expandedCategory === category.id ? 
                          <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        }
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedCategory === category.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-t">
                                <th className="text-left py-2 font-medium text-gray-700">Nama</th>
                                <th className="text-left py-2 font-medium text-gray-700">Provider</th>
                                <th className="text-left py-2 font-medium text-gray-700">Tujuan</th>
                                <th className="text-left py-2 font-medium text-gray-700">Masa Berlaku</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.cookies.map((cookie, idx) => (
                                <tr key={idx} className="border-t">
                                  <td className="py-2 text-gray-600">{cookie.name}</td>
                                  <td className="py-2 text-gray-600">{cookie.provider}</td>
                                  <td className="py-2 text-gray-600">{cookie.purpose}</td>
                                  <td className="py-2 text-gray-600">{cookie.expiry}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setCookiePreferences({
                  necessary: true,
                  analytics: false,
                  functional: false,
                  marketing: false
                })}
              >
                Tolak Semua
              </button>
              <button 
                className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                onClick={savePreferences}
              >
                Simpan Preferensi
              </button>
            </div>
          </motion.div>

          {/* Cara Mengatur Cookie di Browser */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cara Mengatur Cookie di Browser</h2>
            <p className="text-gray-700 mb-4">
              Anda juga dapat mengatur cookie melalui pengaturan browser:
            </p>
            <div className="space-y-3">
              {[
                { browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Firefox', url: 'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences' },
                { browser: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac' },
                { browser: 'Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-168dab11-0753-043d-7c16-ede5947fc64d' }
              ].map((item) => (
                <a
                  key={item.browser}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">{item.browser}</span>
                  <span className="text-sm text-primary">Pelajari lebih lanjut →</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Statistik */}
          <div className="mt-8">
            <TrustedStats
              title="Statistik Penggunaan Cookie"
              description="Data penggunaan cookie berdasarkan preferensi pengguna"
              stats={stats}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
