'use client'

import { useState } from 'react'
import { Cookie, Shield, Settings, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
  purpose: string
  duration: string
  type: 'necessary' | 'functional' | 'analytics' | 'marketing'
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    title: 'Cookie Penting',
    description: 'Cookie yang diperlukan untuk fungsi dasar website',
    required: true,
    icon: <Shield className="w-5 h-5" />,
    cookies: [
      {
        name: 'session_id',
        purpose: 'Menyimpan informasi sesi pengguna',
        duration: '1 jam',
        type: 'necessary'
      },
      {
        name: 'csrf_token',
        purpose: 'Perlindungan keamanan form',
        duration: '1 hari',
        type: 'necessary'
      }
    ]
  },
  {
    id: 'functional',
    title: 'Cookie Fungsional',
    description: 'Cookie untuk meningkatkan pengalaman pengguna',
    required: false,
    icon: <Settings className="w-5 h-5" />,
    cookies: [
      {
        name: 'theme_preference',
        purpose: 'Menyimpan preferensi tema',
        duration: '30 hari',
        type: 'functional'
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Cookie Analitik',
    description: 'Cookie untuk menganalisis penggunaan website',
    required: false,
    icon: <Info className="w-5 h-5" />,
    cookies: [
      {
        name: 'ga_tracking',
        purpose: 'Google Analytics tracking',
        duration: '2 tahun',
        type: 'analytics'
      }
    ]
  }
]

export default function CookiesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [cookieSettings, setCookieSettings] = useState<Record<string, boolean>>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const updateCookieSetting = (categoryId: string, enabled: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [categoryId]: enabled
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-brown-600 via-amber-600 to-red-600 text-white py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            <defs>
              <pattern id="cookie-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cookie-pattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Cookie className="h-10 w-10 text-white" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Kebijakan Cookie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Informasi tentang penggunaan cookie di website Melek Hukum ID
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Apa itu Cookie?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Cookie adalah file kecil yang disimpan di perangkat Anda ketika mengunjungi website kami. 
            Cookie membantu kami menyediakan layanan yang lebih baik dan pengalaman yang lebih personal.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Kami menggunakan berbagai jenis cookie untuk tujuan yang berbeda. Anda dapat mengatur preferensi 
            cookie Anda di bawah ini.
          </p>
        </motion.div>

        {/* Cookie Categories */}
        <div className="space-y-4">
          {cookieCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-brown-500 flex items-center justify-center text-white">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cookieSettings[category.id]}
                        onChange={(e) => updateCookieSetting(category.id, e.target.checked)}
                        disabled={category.required}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedCategory === category.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-4">Detail Cookie:</h4>
                        <div className="space-y-4">
                          {category.cookies.map((cookie) => (
                            <div key={cookie.name} className="bg-gray-50 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Nama:</span>
                                  <p className="text-sm text-gray-900">{cookie.name}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Tujuan:</span>
                                  <p className="text-sm text-gray-900">{cookie.purpose}</p>
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700">Durasi:</span>
                                  <p className="text-sm text-gray-900">{cookie.duration}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-brown-600 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            Simpan Preferensi
          </button>
          <button className="px-8 py-3 border-2 border-brown-600 text-brown-600 rounded-xl font-semibold hover:bg-brown-600 hover:text-white transition-all duration-300">
            Terima Semua
          </button>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-amber-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Tambahan</h3>
          <div className="space-y-4 text-gray-700">
            <p>
              Anda dapat mengubah pengaturan cookie kapan saja melalui browser Anda. Namun, menonaktifkan 
              beberapa cookie dapat mempengaruhi fungsionalitas website.
            </p>
            <p>
              Untuk informasi lebih lanjut tentang bagaimana kami menggunakan data Anda, silakan baca 
              <a href="/privacy" className="text-brown-600 hover:underline font-medium"> Kebijakan Privasi</a> kami.
            </p>
            <p>
              Jika Anda memiliki pertanyaan tentang penggunaan cookie, silakan hubungi kami di 
              <a href="/kontak" className="text-brown-600 hover:underline font-medium"> halaman kontak</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
