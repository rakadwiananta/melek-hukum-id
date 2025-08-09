'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, FileText, Gavel, Info } from 'lucide-react'
import { useEffect, useState } from 'react'
import React from 'react'

interface StatisticsSectionProps {
  className?: string
}

export default function StatisticsSection({ className }: StatisticsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const statItems = [
    {
      icon: Users,
      label: 'Pengguna Aktif',
      value: 'Ribuan',
      description: 'Masyarakat telah terbantu',
      color: 'from-red-500 to-red-600',
      pattern: 'batik-parang'
    },
    {
      icon: FileText,
      label: 'Template Dokumen',
      value: '500+',
      description: 'Siap digunakan',
      color: 'from-amber-500 to-amber-600',
      pattern: 'batik-kawung'
    },
    {
      icon: Gavel,
      label: 'Panduan Hukum',
      value: '100+',
      description: 'Tersedia gratis',
      color: 'from-green-500 to-green-600',
      pattern: 'batik-ceplok'
    },
    {
      icon: TrendingUp,
      label: 'Update Rutin',
      value: 'Bulanan',
      description: 'Konten terbaru',
      color: 'from-blue-500 to-blue-600',
      pattern: 'batik-sido'
    }
  ]

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className={cn("mb-16 relative", className || "")}
    >
      {/* Traditional Indonesian pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <pattern id="batik-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <g fill="#dc2626">
              <circle cx="50" cy="50" r="20" opacity="0.1" />
              <path d="M25 25 Q50 15 75 25 Q85 50 75 75 Q50 85 25 75 Q15 50 25 25" opacity="0.05" />
              <rect x="40" y="40" width="20" height="20" rx="5" opacity="0.08" />
            </g>
          </pattern>
          <rect width="100%" height="100%" fill="url(#batik-bg)" />
        </svg>
      </div>

      <div className="text-center mb-10 relative z-10">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-red-700 to-amber-700 bg-clip-text text-transparent">
            Portal Hukum Indonesia
          </span>
        </motion.h2>
        <motion.p 
          className="text-gray-600"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Menyediakan akses informasi hukum untuk semua
        </motion.p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              z: 50,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="relative"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Batik Pattern Overlay */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <BatikPattern type={stat.pattern} />
              </div>

              {/* 3D Icon Container */}
              <motion.div 
                className={`relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                style={{
                  transform: 'translateZ(20px)',
                }}
              >
                <stat.icon className="w-7 h-7 text-white" />
                
                {/* Icon Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    background: `radial-gradient(circle, ${stat.color.includes('red') ? 'rgba(220,38,38,0.3)' : 
                      stat.color.includes('amber') ? 'rgba(245,158,11,0.3)' :
                      stat.color.includes('green') ? 'rgba(34,197,94,0.3)' :
                      'rgba(59,130,246,0.3)'} 0%, transparent 70%)`,
                    filter: 'blur(10px)'
                  }}
                />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.1 + 0.3
                  }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm font-medium text-gray-700 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>

              {/* 3D Shadow Effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"
                style={{
                  transform: 'translateZ(-20px) translateX(4px) translateY(4px)',
                  zIndex: -1,
                  opacity: 0.3
                }}
              />

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className={`absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br ${stat.color} transform rotate-45`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info dengan ornamen tradisional */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 relative"
      >
        <div className="relative p-4 bg-gradient-to-r from-amber-50 to-red-50 rounded-xl border border-amber-200">
          {/* Gunungan ornament */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M20 0 L30 20 L10 20 Z" fill="#f59e0b" opacity="0.8" />
              <path d="M20 5 L25 20 L15 20 Z" fill="#dc2626" opacity="0.6" />
            </svg>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-amber-800">
            <Info className="h-4 w-4 flex-shrink-0" />
            <p>
              <strong>Catatan:</strong> Platform ini menyediakan template dan panduan umum. 
              Untuk kasus spesifik, disarankan berkonsultasi dengan praktisi hukum.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}

// Batik Pattern Components
function BatikPattern({ type }: { type: string }) {
  const patterns: Record<string, React.ReactElement> = {
    'batik-parang': (
      <g>
        <path d="M0 0 L20 20 M10 0 L30 20 M20 0 L40 20" stroke="#dc2626" strokeWidth="0.5" opacity="0.3" />
        <path d="M0 10 L10 20 M0 20 L20 40 M10 20 L30 40" stroke="#dc2626" strokeWidth="0.5" opacity="0.3" />
      </g>
    ),
    'batik-kawung': (
      <g>
        <circle cx="10" cy="10" r="8" fill="#f59e0b" opacity="0.1" />
        <circle cx="30" cy="10" r="8" fill="#f59e0b" opacity="0.1" />
        <circle cx="10" cy="30" r="8" fill="#f59e0b" opacity="0.1" />
        <circle cx="30" cy="30" r="8" fill="#f59e0b" opacity="0.1" />
      </g>
    ),
    'batik-ceplok': (
      <g>
        <rect x="5" y="5" width="10" height="10" fill="#22c55e" opacity="0.1" transform="rotate(45 10 10)" />
        <rect x="25" y="5" width="10" height="10" fill="#22c55e" opacity="0.1" transform="rotate(45 30 10)" />
        <rect x="5" y="25" width="10" height="10" fill="#22c55e" opacity="0.1" transform="rotate(45 10 30)" />
        <rect x="25" y="25" width="10" height="10" fill="#22c55e" opacity="0.1" transform="rotate(45 30 30)" />
      </g>
    ),
    'batik-sido': (
      <g>
        <path d="M10 5 Q20 10 10 15 Q0 10 10 5" fill="#3b82f6" opacity="0.1" />
        <path d="M30 5 Q40 10 30 15 Q20 10 30 5" fill="#3b82f6" opacity="0.1" />
        <path d="M10 25 Q20 30 10 35 Q0 30 10 25" fill="#3b82f6" opacity="0.1" />
        <path d="M30 25 Q40 30 30 35 Q20 30 30 25" fill="#3b82f6" opacity="0.1" />
      </g>
    )
  }

  return (
    <svg className="w-full h-full">
      <pattern id={type} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        {patterns[type] || patterns['batik-parang']}
      </pattern>
      <rect width="100%" height="100%" fill={`url(#${type})`} />
    </svg>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
