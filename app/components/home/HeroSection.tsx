'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Search, BookOpen, Shield, FileText, Scale } from 'lucide-react'
import { useRouter } from 'next/navigation'

const features = [
  {
    icon: BookOpen,
    title: 'Kamus Hukum',
    description: 'Istilah hukum dalam bahasa sederhana',
    href: '/kamus-hukum',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: FileText,
    title: 'Template Dokumen',
    description: 'Dokumen hukum siap pakai',
    href: '/solusi/template',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Shield,
    title: 'Anti Korupsi',
    description: 'Edukasi pencegahan korupsi',
    href: '/anti-korupsi',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Scale,
    title: 'Regulasi Terbaru',
    description: 'Update peraturan terkini',
    href: '/regulasi',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
]

export default function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="px-4 mx-auto max-w-7xl py-12 md:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Pahami Hukum Indonesia dengan
              <span className="text-primary"> Mudah & Praktis</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. 
              Dapatkan informasi hukum terpercaya, template dokumen, dan panduan praktis.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-lg">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari informasi hukum..."
                  className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Cari
                </button>
              </div>
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kamus-hukum"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Mulai Belajar
              </Link>
              <Link
                href="/tools/kuis-korupsi"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Shield className="h-5 w-5" />
                Test Anti-Korupsi
              </Link>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <Image
              src="/illustrations/hero-illustration.svg"
              alt="Melek Hukum ID"
              width={600}
              height={400}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Link
                key={index}
                href={feature.href}
                className="group p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-3`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
