"use client"

import { cn } from '@/app/lib/utils'
import { motion } from 'framer-motion'
import { FileText, Shield, Handshake, FileSignature, Send, AlertTriangle, BookOpen, Users } from 'lucide-react'

export type SolusiCategory = 'Semua' | 'Pernyataan' | 'Kuasa' | 'Perjanjian' | 'Permohonan' | 'Somasi' | 'Panduan' | 'Konsultasi'

interface CategoryTabsProps {
  categories: SolusiCategory[]
  value: SolusiCategory
  onChange: (value: SolusiCategory) => void
  className?: string
}

const categoryConfig: Record<SolusiCategory, { 
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  color: string; 
  bgGradient: string;
  pattern?: string;
}> = {
  'Semua': { 
    icon: FileText, 
    color: 'text-gray-700', 
    bgGradient: 'from-gray-500 to-gray-600',
  },
  'Pernyataan': { 
    icon: Shield, 
    color: 'text-red-700', 
    bgGradient: 'from-red-500 to-red-600',
    pattern: 'kawung'
  },
  'Kuasa': { 
    icon: Handshake, 
    color: 'text-amber-700', 
    bgGradient: 'from-amber-500 to-amber-600',
    pattern: 'parang'
  },
  'Perjanjian': { 
    icon: FileSignature, 
    color: 'text-green-700', 
    bgGradient: 'from-green-500 to-green-600',
    pattern: 'lereng'
  },
  'Permohonan': { 
    icon: Send, 
    color: 'text-blue-700', 
    bgGradient: 'from-blue-500 to-blue-600',
    pattern: 'ceplok'
  },
  'Somasi': { 
    icon: AlertTriangle, 
    color: 'text-orange-700', 
    bgGradient: 'from-orange-500 to-orange-600',
    pattern: 'sido'
  },
  'Panduan': { 
    icon: BookOpen, 
    color: 'text-purple-700', 
    bgGradient: 'from-purple-500 to-purple-600',
    pattern: 'truntum'
  },
  'Konsultasi': { 
    icon: Users, 
    color: 'text-teal-700', 
    bgGradient: 'from-teal-500 to-teal-600',
    pattern: 'sekar'
  }
}

export default function CategoryTabs({ categories, value, onChange, className }: CategoryTabsProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Batik Kawung pattern background */}
      <div 
        className="absolute inset-0 opacity-5 rounded-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23991b1b' fill-opacity='0.3'%3E%3Ccircle cx='15' cy='15' r='10'/%3E%3Ccircle cx='45' cy='15' r='10'/%3E%3Ccircle cx='15' cy='45' r='10'/%3E%3Ccircle cx='45' cy='45' r='10'/%3E%3Cpath d='M30 0 L30 60 M0 30 L60 30' stroke='%23991b1b' stroke-opacity='0.1' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Tabs Container with 3D perspective */}
      <div className="relative flex flex-wrap gap-3 p-2 bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur rounded-2xl"
        style={{
          transform: 'perspective(1000px) rotateX(1deg)',
        }}
      >
        {categories.map((category, index) => {
          const config = categoryConfig[category]
          const Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> = config.icon
          const isActive = value === category

          return (
            <motion.button
              key={category}
              onClick={() => onChange(category)}
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                rotateY: 5,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'relative group flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                'shadow-sm hover:shadow-lg',
                isActive
                  ? 'text-white shadow-xl transform scale-105'
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              )}
              style={{
                background: isActive ? `linear-gradient(135deg, ${config.bgGradient.split(' ')[1]} 0%, ${config.bgGradient.split(' ')[3]} 100%)` : undefined,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 3D Background Layer */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    background: `linear-gradient(135deg, ${config.bgGradient.split(' ')[1]} 0%, ${config.bgGradient.split(' ')[3]} 100%)`,
                    transform: 'translateZ(-10px) scale(1.05)',
                    filter: 'blur(15px)',
                    opacity: 0.4
                  }}
                />
              )}

              {/* Icon with 3D rotation and glow effect */}
              <motion.div
                animate={{ 
                  rotateY: isActive ? [0, 360] : 0,
                  scale: isActive ? 1.2 : 1
                }}
                transition={{ 
                  rotateY: { duration: 0.8, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 500 }
                }}
                className="relative z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                      filter: 'blur(4px)'
                    }}
                  />
                )}
                <Icon className={cn(
                  'h-4 w-4 relative z-10',
                  isActive ? 'text-white' : (config.color as string)
                )} />
              </motion.div>

              {/* Label */}
              <span className="relative z-10">{category}</span>

              {/* Active Indicator - Ornamen Nusantara */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <svg width="40" height="4" viewBox="0 0 40 4">
                    <path d="M0 2 Q10 0 20 2 T40 2" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                </motion.div>
              )}

              {/* Hover Effect - Traditional Pattern Overlay */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 pointer-events-none"
                style={{
                  backgroundImage: config.pattern ? 
                    `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='3' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E")` :
                    undefined,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* 3D Shadow */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl"
                style={{
                  transform: 'translateZ(-15px) translateY(2px)',
                  opacity: isActive ? 0.3 : 0.1,
                  filter: 'blur(4px)'
                }}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Mobile Scroll Indicator dengan motif tradisional */}
      <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full pointer-events-none">
        <div className="relative w-full h-full bg-gradient-to-l from-white via-white/80 to-transparent">
          <motion.div
            className="absolute right-2 top-1/2 -translate-y-1/2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="20" height="40" viewBox="0 0 20 40">
              <path d="M5 15 L15 20 L5 25" stroke="#dc2626" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
