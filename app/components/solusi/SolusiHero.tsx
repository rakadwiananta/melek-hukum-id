'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { Search, FileText, BookOpen, Users, ArrowRight, Scale, Shield } from 'lucide-react'

export default function SolusiHero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const controls = useAnimation()

  useEffect(() => {
    // Wayang-inspired floating animation
    controls.start({
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  }, [controls])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}&scope=solusi`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-amber-50 to-white">
      {/* Multi-layer Batik Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23dc2626' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23f59e0b' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='10' stroke='%23dc2626' stroke-width='0.5'/%3E%3Cpath d='M50 20 L80 50 L50 80 L20 50 Z' stroke='%23f59e0b' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Garuda Pancasila inspired background element */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 md:w-[600px] md:h-[600px]"
        animate={controls}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="garudaGrad">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <g fill="url(#garudaGrad)">
            <path d="M100 30 Q70 50 60 80 Q70 110 100 140 Q130 110 140 80 Q130 50 100 30" />
            <circle cx="100" cy="80" r="15" opacity="0.2" />
            <path d="M85 75 L100 60 L115 75 L100 90 Z" opacity="0.3" />
          </g>
        </svg>
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge dengan ornamen tradisional */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-amber-100 text-red-800 rounded-full text-sm font-medium mb-6 shadow-md"
            >
              <Shield className="w-4 h-4" />
              <span>Portal Hukum Terpercaya</span>
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-amber-600">
                <path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z" fill="currentColor" />
              </svg>
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-900">
              Solusi Hukum
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
                Indonesia Terpadu
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Akses ribuan template dokumen legal, panduan praktis, dan layanan konsultasi hukum 
              <span className="font-semibold text-red-700"> untuk membantu menyelesaikan permasalahan hukum Anda</span>.
            </p>

            {/* Search Form dengan efek 3D */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative group">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  style={{
                    transform: 'perspective(1000px) rotateX(1deg)',
                  }}
                >
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari template surat, panduan hukum, atau informasi lainnya..."
                    className="w-full pl-14 pr-32 md:pr-36 py-4 md:py-5 text-base md:text-lg focus:outline-none"
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-6 md:px-8 py-3 md:py-3.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Cari
                  </motion.button>
                </div>
              </div>
            </form>

            {/* Quick Links dengan animasi */}
            <div className="flex flex-wrap gap-3 mb-8">
              <QuickLink href="#popular" icon={FileText} label="Template Populer" />
              <QuickLink href="#templates" icon={BookOpen} label="Panduan Lengkap" />
              <QuickLink href="#faq" icon={Users} label="Tanya Jawab" />
            </div>

            {/* Feature highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 md:gap-6"
            >
              <FeatureCard icon="📜" label="Template Gratis" value="500+" />
              <FeatureCard icon="📚" label="Panduan Hukum" value="100+" />
              <FeatureCard icon="🤝" label="Konsultasi" value="24/7" />
            </motion.div>
          </motion.div>

          {/* 3D Cards Grid dengan efek perspektif */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[500px]" style={{ perspective: '1000px' }}>
              <motion.div 
                className="absolute inset-0"
                animate={{
                  rotateY: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateY(-5deg) rotateX(5deg)',
                }}
              >
                <div className="grid grid-cols-2 gap-6 h-full">
                  <HeroCard3D 
                    icon={FileText} 
                    title="Template Legal" 
                    desc="Dokumen siap pakai" 
                    href="#templates"
                    delay={0.4}
                    gradient="from-red-500 to-red-600"
                    pattern="batik-parang"
                  />
                  <HeroCard3D 
                    icon={BookOpen} 
                    title="Panduan Praktis" 
                    desc="Langkah demi langkah" 
                    href="#popular"
                    delay={0.5}
                    gradient="from-amber-500 to-amber-600"
                    pattern="batik-kawung"
                  />
                  <HeroCard3D 
                    icon={Users} 
                    title="Forum Diskusi" 
                    desc="Tanya ahli hukum" 
                    href="/forum"
                    delay={0.6}
                    gradient="from-green-500 to-green-600"
                    pattern="batik-ceplok"
                  />
                  <HeroCard3D 
                    icon={Scale} 
                    title="Info Hukum" 
                    desc="Update terkini" 
                    href="/info"
                    delay={0.7}
                    gradient="from-blue-500 to-blue-600"
                    pattern="batik-sido"
                  />
                </div>
              </motion.div>

              {/* Floating ornaments */}
              <motion.div 
                className="absolute -bottom-10 -right-10 w-32 h-32"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity }}
              >
                <div className="w-full h-full bg-gradient-to-br from-red-400/20 to-amber-400/20 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function QuickLink({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all group"
      >
        <motion.div
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-4 w-4 text-red-600" />
        </motion.div>
        <span className="font-medium text-gray-700 group-hover:text-red-700 transition-colors">{label}</span>
      </Link>
    </motion.div>
  )
}

function FeatureCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <motion.div 
      className="text-center p-4 bg-white/80 backdrop-blur rounded-xl shadow-md"
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
    >
      <motion.div 
        className="text-3xl mb-2"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <div className="text-2xl font-bold text-red-700">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  )
}

function HeroCard3D({ 
  icon: Icon, 
  title, 
  desc, 
  href, 
  delay,
  gradient,
  pattern
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  desc: string; 
  href: string;
  delay: number;
  gradient: string;
  pattern: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: -10,
        z: 50,
        transition: { type: "spring", stiffness: 300 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Link href={href} className="block h-full">
        <div className="relative h-full rounded-2xl bg-white border-2 border-gray-100 overflow-hidden group hover:border-transparent transition-all duration-300"
          style={{
            transform: 'translateZ(0)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          }}
        >
          {/* Batik pattern overlay */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <BatikPatternCard type={pattern} />
          </div>
          
          {/* Content */}
          <div className="relative p-6 h-full flex flex-col">
            <motion.div 
              className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} w-min mb-4 shadow-lg`}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
              style={{
                transform: 'translateZ(20px)',
              }}
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600 text-sm flex-1">
              {desc}
            </p>
            
            <div className="mt-4 flex items-center text-sm font-medium text-gray-500 group-hover:text-red-600 transition-colors">
              <span>Jelajahi</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-1 h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* 3D shadow layer */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"
            style={{
              transform: 'translateZ(-30px) translateX(4px) translateY(4px)',
              zIndex: -1,
              opacity: 0.3
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}

function BatikPatternCard({ type }: { type: string }) {
  const patterns: Record<string, string> = {
    'batik-parang': 'M0 0 L20 20 M10 0 L30 20 M20 0 L40 20',
    'batik-kawung': 'M10 10 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
    'batik-ceplok': 'M10 10 L20 20 M20 10 L10 20 M15 5 L15 25 M5 15 L25 15',
    'batik-sido': 'M10 5 Q15 10 10 15 Q5 10 10 5'
  }

  return (
    <svg className="w-full h-full">
      <pattern id={type} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d={patterns[type] || patterns['batik-parang']} stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#${type})`} />
    </svg>
  )
}
