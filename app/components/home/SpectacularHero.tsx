'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function SpectacularHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const yReverse = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Premium Background Design */}
      <div className="absolute inset-0">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="min-h-screen flex items-center py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-sm font-medium text-red-700">Platform Hukum #1 di Indonesia</span>
              </motion.div>

              {/* Heading */}
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block">Pahami Hukum</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                  Indonesia
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-700 mt-2">
                  dengan Mudah
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Platform edukasi hukum terlengkap untuk masyarakat Indonesia. 
                Akses ribuan informasi hukum, template dokumen, dan panduan praktis anti-korupsi.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  href="/kamus-hukum"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:bg-gray-800"
                >
                  <span className="relative z-10">Mulai Belajar</span>
                  <svg 
                    className="relative z-10 w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link 
                  href="/tools/kuis-korupsi"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
                >
                  <svg 
                    className="w-5 h-5 mr-2 text-red-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Test Anti-Korupsi</span>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { value: '500+', label: 'Istilah Hukum' },
                  { value: '50+', label: 'Template' },
                  { value: '10K+', label: 'Pengguna' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.div 
                      className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Visual Design */}
            <motion.div
              className="relative order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative mx-auto w-full max-w-lg">
                {/* Animated Background Circles */}
                <motion.div
                  style={{ y: yReverse }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="absolute w-72 h-72 bg-gradient-to-br from-red-100 to-pink-100 rounded-full opacity-40 blur-3xl" />
                </motion.div>

                {/* Central Justice Scale Design */}
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Modern SVG Design */}
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background Circle */}
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="180"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      opacity="0.1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DC2626" />
                        <stop offset="100%" stopColor="#F87171" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#DC2626" />
                        <stop offset="50%" stopColor="#DC2626" />
                        <stop offset="50%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                    </defs>

                    {/* Center Shield */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <rect
                        x="170"
                        y="150"
                        width="60"
                        height="80"
                        rx="5"
                        fill="url(#gradient2)"
                        stroke="#374151"
                        strokeWidth="3"
                      />
                      
                      {/* Star Symbol */}
                      <path
                        d="M200 170 L205 180 L215 180 L207 187 L211 197 L200 190 L189 197 L193 187 L185 180 L195 180 Z"
                        fill="#FCD34D"
                      />
                    </motion.g>

                    {/* Balance Scale */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {/* Central Pillar */}
                      <rect x="198" y="100" width="4" height="150" fill="#374151" />
                      
                      {/* Horizontal Beam */}
                      <motion.rect 
                        x="120" 
                        y="98" 
                        width="160" 
                        height="4" 
                        fill="#374151"
                        animate={{ rotate: [-2, 2, -2] }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ transformOrigin: '200px 100px' }}
                      />
                      
                      {/* Left Scale */}
                      <motion.g
                        animate={{ y: [0, -5, 0] }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <line x1="140" y1="100" x2="140" y2="120" stroke="#374151" strokeWidth="2" />
                        <circle cx="140" cy="130" r="20" fill="#DC2626" stroke="#374151" strokeWidth="2" />
                        <text x="140" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">A</text>
                      </motion.g>
                      
                      {/* Right Scale */}
                      <motion.g
                        animate={{ y: [0, 5, 0] }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                      >
                        <line x1="260" y1="100" x2="260" y2="120" stroke="#374151" strokeWidth="2" />
                        <circle cx="260" cy="130" r="20" fill="#FFFFFF" stroke="#374151" strokeWidth="2" />
                        <text x="260" y="135" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">B</text>
                      </motion.g>
                    </motion.g>

                    {/* Decorative Elements */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      transition={{ delay: 1 }}
                    >
                      {/* Light Rays */}
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <motion.line
                          key={i}
                          x1="200"
                          y1="200"
                          x2={200 + 180 * Math.cos(angle * Math.PI / 180)}
                          y2={200 + 180 * Math.sin(angle * Math.PI / 180)}
                          stroke="#FCD34D"
                          strokeWidth="1"
                          opacity="0.2"
                          animate={{ 
                            opacity: [0.1, 0.3, 0.1],
                            strokeWidth: [0.5, 1.5, 0.5]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.g>

                    {/* Text */}
                    <motion.text
                      x="200"
                      y="320"
                      textAnchor="middle"
                      className="text-lg font-bold fill-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      KEADILAN UNTUK SEMUA
                    </motion.text>
                  </svg>
                </motion.div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-br from-red-400 to-pink-400 rounded-full"
                      style={{
                        left: `${20 + (i * 15) % 60}%`,
                        top: `${10 + (i * 20) % 80}%`,
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS untuk animasi blob */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
