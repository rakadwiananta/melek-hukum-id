'use client'

import React, { useEffect, useState } from 'react'
import { HelpCircle, Users, Globe, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * FAQ Page with lightweight animations and credible statistics (World Bank).
 */

/* -------------------- Helper: World Bank hook -------------------- */
function useWorldBankIndonesiaStats() {
  const [internetPercent, setInternetPercent] = useState<number | null>(null)
  const [internetYear, setInternetYear] = useState<number | null>(null)
  const [population, setPopulation] = useState<number | null>(null)
  const [populationYear, setPopulationYear] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchIndicator(countryCode: string, indicator: string): Promise<any> {
      const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&per_page=500`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json
    }

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const internetData = await fetchIndicator('IDN', 'IT.NET.USER.ZS')
        const popData = await fetchIndicator('IDN', 'SP.POP.TOTL')

        if (!mounted) return

        const internetArray = Array.isArray(internetData) && Array.isArray(internetData[1]) ? internetData[1] : []
        const popArray = Array.isArray(popData) && Array.isArray(popData[1]) ? popData[1] : []

        const internetEntry = internetArray.find((e: any) => e && e.value !== null)
        const popEntry = popArray.find((e: any) => e && e.value !== null)

        if (internetEntry) {
          setInternetPercent(Math.round(internetEntry.value * 10) / 10)
          setInternetYear(internetEntry.date)
        }

        if (popEntry) {
          setPopulation(Math.round(popEntry.value))
          setPopulationYear(popEntry.date)
        }
      } catch (err) {
        console.error('World Bank API error:', err)
        if (mounted) {
          setError('Failed to load statistics')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  return { internetPercent, internetYear, population, populationYear, loading, error }
}

// Lightweight animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 800 600" className="animate-pulse">
          <defs>
            <pattern id="faq-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-pattern)" />
        </svg>
      </div>
      
      <div className="absolute top-10 left-10 animate-bounce">
        <HelpCircle className="h-16 w-16 text-amber-500 opacity-20" />
      </div>
      <div className="absolute top-20 right-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <BookOpen className="h-12 w-12 text-brown-500 opacity-20" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
        <Globe className="h-14 w-14 text-amber-600 opacity-20" />
      </div>
    </div>
  )
}

// Statistics component
function StatisticsSection() {
  const { internetPercent, internetYear, population, populationYear, loading, error } = useWorldBankIndonesiaStats()

  const stats = [
    {
      icon: Users,
      label: 'Populasi Indonesia',
      value: loading ? 'Memuat...' : error ? 'N/A' : population ? `${Math.round(population / 1000000)}M` : 'N/A',
      subtitle: populationYear ? `Data ${populationYear}` : 'World Bank',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      label: 'Pengguna Internet',
      value: loading ? 'Memuat...' : error ? 'N/A' : internetPercent ? `${internetPercent}%` : 'N/A',
      subtitle: internetYear ? `Data ${internetYear}` : 'World Bank',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BookOpen,
      label: 'Pertanyaan Terjawab',
      value: '150+',
      subtitle: 'FAQ Database',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: HelpCircle,
      label: 'Kategori Hukum',
      value: '25+',
      subtitle: 'Bidang Hukum',
      color: 'from-red-500 to-red-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
        >
          <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
            <stat.icon className="h-8 w-8 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
          <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
          <div className="text-xs text-gray-500">{stat.subtitle}</div>
        </motion.div>
      ))}
    </div>
  )
}

// FAQ data
const faqData = [
  {
    question: "Apa itu Kamus Hukum?",
    answer: "Kamus Hukum adalah kumpulan istilah-istilah hukum yang disusun secara alfabetis dengan penjelasan yang mudah dipahami. Ini membantu masyarakat memahami terminologi hukum yang sering digunakan dalam dokumen legal, peraturan, dan proses hukum."
  },
  {
    question: "Bagaimana cara menggunakan fitur pencarian?",
    answer: "Anda dapat menggunakan kotak pencarian di halaman utama untuk mencari istilah hukum tertentu. Sistem akan menampilkan hasil yang relevan beserta definisi dan contoh penggunaannya. Anda juga dapat menggunakan filter kategori untuk mempersempit pencarian."
  },
  {
    question: "Apakah definisi dalam kamus ini dapat dijadikan referensi hukum?",
    answer: "Definisi dalam kamus ini disusun berdasarkan sumber-sumber hukum yang terpercaya, namun untuk keperluan legal formal, disarankan untuk merujuk langsung pada peraturan perundang-undangan yang berlaku atau berkonsultasi dengan ahli hukum."
  },
  {
    question: "Seberapa sering kamus ini diperbarui?",
    answer: "Kamus hukum ini diperbarui secara berkala sesuai dengan perkembangan hukum di Indonesia. Tim kami memantau perubahan regulasi dan menambahkan istilah-istilah baru yang relevan dengan praktik hukum terkini."
  },
  {
    question: "Bisakah saya berkontribusi menambahkan istilah hukum?",
    answer: "Ya, kami menerima kontribusi dari pengguna. Anda dapat mengirimkan saran istilah hukum baru atau perbaikan definisi melalui halaman kontak kami. Setiap kontribusi akan direview oleh tim ahli sebelum dipublikasikan."
  }
]

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-brown-600 via-amber-600 to-red-600 text-white py-16 md:py-24 overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            FAQ Kamus Hukum
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            Pertanyaan yang Sering Diajukan tentang Kamus Hukum Indonesia
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Statistics */}
        <StatisticsSection />

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <HelpCircle 
                      className={`h-5 w-5 text-amber-600 transition-transform duration-200 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
