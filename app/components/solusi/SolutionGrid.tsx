'use client'

import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface SolutionItem {
  title: string
  description: string
  href: string
  // Additional properties for different types of solutions
  downloadCount?: number
  rating?: number
  viewCount?: number
  difficulty?: string
  memberCount?: number
  responseRate?: number
  lawyerCount?: number
  satisfaction?: number
  participantCount?: number
  upcomingEvents?: number
}

export interface SolutionGroup {
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  stats?: {
    totalDownloads?: number
    monthlyGrowth?: number
    totalReaders?: number
    avgReadTime?: string
    totalKonsultasi?: number
    responTime?: string
  }
  items: SolutionItem[]
}

// Batik-inspired patterns untuk background
const BatikPattern = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 400 400">
    <defs>
      <pattern id="batik-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <circle cx="50" cy="50" r="20" fill={color} />
        <path d="M25 25 L75 75 M75 25 L25 75" stroke={color} strokeWidth="2" />
        <rect x="40" y="40" width="20" height="20" fill="none" stroke={color} strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern)" />
  </svg>
)

export default function SolutionGrid({ groups }: { groups: SolutionGroup[] }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      const rect = event.currentTarget.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    }
  }

  return (
    <div className="space-y-8 relative">
      {groups.map((group, index) => {
        const Icon = group.icon
        const rotateX = useTransform(mouseY, [0, 300], [10, -10])
        const rotateY = useTransform(mouseX, [0, 300], [-10, 10])
        
        return (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              delay: index * 0.15,
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96] // Wayang-inspired easing
            }}
            onMouseMove={handleMouseMove}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            className="relative"
          >
            <motion.div
              style={!isMobile ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              } : {}}
              className={`${group.bgColor} rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden`}
            >
              <BatikPattern color={group.color} />
              
              {/* 3D floating ornament */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 opacity-10"
              >
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <path
                    d="M30 5 L40 20 L55 20 L42.5 32.5 L47.5 47.5 L30 37.5 L12.5 47.5 L17.5 32.5 L5 20 L20 20 Z"
                    fill={group.color}
                  />
                </svg>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 mb-6"
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div 
                  className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {group.category}
                </h3>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-4">
                {group.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={!isMobile ? { 
                      scale: 1.05,
                      z: 50,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                    } : {}}
                    transition={{ 
                      delay: index * 0.1 + itemIndex * 0.05,
                      type: "spring",
                      stiffness: 300
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Link 
                      href={item.href} 
                      className="group block bg-white rounded-lg p-4 hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden"
                    >
                      {/* Gunungan-inspired decorative element */}
                      <div className="absolute -right-8 -top-8 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                        <svg viewBox="0 0 100 100">
                          <path
                            d="M50 10 Q60 30 70 50 Q60 70 50 90 Q40 70 30 50 Q40 30 50 10"
                            fill={group.color}
                          />
                        </svg>
                      </div>
                      
                      <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors relative z-10">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3 relative z-10">
                        {item.description}
                      </p>
                      <motion.div 
                        className="flex items-center gap-1 text-sm font-medium text-primary relative z-10"
                        whileHover={{ x: 5 }}
                      >
                        Selengkapnya
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
