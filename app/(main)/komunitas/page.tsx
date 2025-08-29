'use client'

import React, { useEffect, useState } from 'react'
import { Users, Globe, MessageCircle, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Komunitas Page - Lightweight version without Three.js
 */

/* World Bank statistics hook */
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
      return res.json()
    }

    async function load() {
      setLoading(true)
      try {
        const internetData = await fetchIndicator('IDN', 'IT.NET.USER.ZS')
        const popData = await fetchIndicator('IDN', 'SP.POP.TOTL')

        if (!mounted) return

        const internetArray = Array.isArray(internetData) && Array.isArray(internetData[1]) ? internetData[1] : []
        const popArray = Array.isArray(popData) && Array.isArray(popData[1]) ? popData[1] : []

        const internetEntry = internetArray.find((e: any) => e && e.value !== null)
        const popEntry = popArray.find((e: any) => e && e.value !== null)

        setInternetPercent(internetEntry ? Number(internetEntry.value) : null)
        setInternetYear(internetEntry ? Number(internetEntry.date) : null)
        setPopulation(popEntry ? Math.round(Number(popEntry.value)) : null)
        setPopulationYear(popEntry ? Number(popEntry.date) : null)
      } catch (err) {
        console.error(err)
        setError('Gagal memuat statistik eksternal')
        setInternetPercent(null)
        setPopulation(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return { internetPercent, internetYear, population, populationYear, loading, error }
}

// Lightweight animated background
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 800 600" className="animate-pulse">
          <defs>
            <pattern id="community-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
              <circle cx="60" cy="60" r="20" fill="currentColor" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#community-pattern)" />
        </svg>
      </div>
      
      <div className="absolute top-20 left-16 animate-bounce">
        <Users className="h-20 w-20 text-amber-500 opacity-20" />
      </div>
      <div className="absolute top-32 right-20 animate-pulse" style={{ animationDelay: '1s' }}>
        <MessageCircle className="h-16 w-16 text-brown-500 opacity-20" />
      </div>
      <div className="absolute bottom-24 left-1/3 animate-bounce" style={{ animationDelay: '2s' }}>
        <Heart className="h-18 w-18 text-amber-600 opacity-20" />
      </div>
    </div>
  )
}

// Statistics component
function CommunityStats() {
  const { internetPercent, internetYear, population, populationYear, loading, error } = useWorldBankIndonesiaStats()

  const stats = [
    {
      icon: Users,
      label: 'Anggota Komunitas',
      value: '2.5K+',
      subtitle: 'Aktif Bulanan',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Globe,
      label: 'Pengguna Internet ID',
      value: loading ? 'Loading...' : error ? 'N/A' : internetPercent ? `${internetPercent.toFixed(1)}%` : 'N/A',
      subtitle: internetYear ? `Data ${internetYear}` : 'World Bank',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MessageCircle,
      label: 'Diskusi Aktif',
      value: '150+',
      subtitle: 'Thread Bulan Ini',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Heart,
      label: 'Bantuan Diberikan',
      value: '500+',
      subtitle: 'Kasus Terselesaikan',
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

export default function KomunitasPage() {
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
            Komunitas Hukum Indonesia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
          >
            Bergabunglah dengan komunitas profesional hukum dan masyarakat yang peduli keadilan
          </motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Statistics */}
        <CommunityStats />

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Forum Diskusi</h3>
            <p className="text-gray-600 leading-relaxed">
              Diskusikan kasus hukum, berbagi pengalaman, dan dapatkan masukan dari praktisi hukum berpengalaman.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Panduan Hukum</h3>
            <p className="text-gray-600 leading-relaxed">
              Dapatkan konsultasi hukum dasar dengan tarif terjangkau dari para ahli dan praktisi hukum di komunitas kami.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Bantuan Hukum</h3>
            <p className="text-gray-600 leading-relaxed">
              Program bantuan hukum untuk masyarakat kurang mampu dengan dukungan dari advokat relawan.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-amber-100 to-brown-100 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bergabung dengan Komunitas
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Jadilah bagian dari komunitas hukum Indonesia yang peduli keadilan dan penegakan hukum yang berintegritas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-brown-600 to-amber-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                Daftar Sekarang
              </button>
              <button className="px-8 py-4 border-2 border-brown-600 text-brown-600 rounded-2xl font-semibold hover:bg-brown-600 hover:text-white transition-all duration-300">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
