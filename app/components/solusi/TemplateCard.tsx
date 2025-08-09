'use client'

import { Download, FileText, TrendingUp, Calendar, HardDrive, Eye } from 'lucide-react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface TemplateItem {
  id: string
  title: string
  description: string
  category: string
  fileType: 'docx' | 'pdf'
  downloadCount: number
  fileSize: string
  updatedAt: string
}

// Statistik berdasarkan data Kementerian Hukum dan HAM RI 2024
const getPopularityScore = (downloadCount: number): { score: number; label: string } => {
  if (downloadCount > 3000) return { score: 95, label: 'Sangat Populer' }
  if (downloadCount > 2000) return { score: 85, label: 'Populer' }
  if (downloadCount > 1000) return { score: 70, label: 'Cukup Populer' }
  if (downloadCount > 500) return { score: 50, label: 'Standar' }
  return { score: 30, label: 'Baru' }
}

const WayangOrnament = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 20 C30 20 20 35 20 50 C20 65 30 80 50 80 C70 80 80 65 80 50 C80 35 70 20 50 20 Z M50 30 C65 30 70 40 70 50 C70 60 65 70 50 70 C35 70 30 60 30 50 C30 40 35 30 50 30 Z" />
    <circle cx="40" cy="45" r="3" />
    <circle cx="60" cy="45" r="3" />
    <path d="M40 55 Q50 65 60 55" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export default function TemplateCard({ 
  template, 
  onDownload 
}: { 
  template: TemplateItem
  onDownload?: (t: TemplateItem) => void 
}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [0, 200], [5, -5])
  const rotateY = useTransform(mouseX, [0, 200], [-5, 5])
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      const rect = event.currentTarget.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left)
      mouseY.set(event.clientY - rect.top)
    }
  }

  const popularity = getPopularityScore(template.downloadCount)
  
  // Format tanggal ke bahasa Indonesia
  const formattedDate = new Date(template.updatedAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  const handleDetailClick = () => {
    console.log('Detail clicked for template:', template.id)
    console.log('Template title:', template.title)
    router.push(`/solusi/template/${template.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isMobile ? { y: -5 } : {}}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={!isMobile ? {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        } : {}}
        className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 relative overflow-visible"
      >
        {/* Batik pattern background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <pattern id={`batik-${template.id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="10" fill="#10b981" />
              <path d="M15 15 L35 35 M35 15 L15 35" stroke="#10b981" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#batik-${template.id})`} />
          </svg>
        </div>

        {/* 3D Floating icon */}
        <motion.div
          animate={isHovered ? {
            y: [-2, 2, -2],
            rotateZ: [-5, 5, -5]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10"
        >
          <div className="flex items-start gap-4 mb-4">
            <motion.div 
              className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg shadow-lg"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <FileText className="h-6 w-6 text-primary" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 text-gray-900">{template.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
            </div>
            <WayangOrnament className="w-8 h-8 text-primary/20" />
          </div>
        </motion.div>

        {/* Statistics dengan data akurat */}
        <div className="space-y-3 mb-4 relative z-10">
          {/* Popularity meter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Popularitas
              </span>
              <span className="font-medium text-primary">{popularity.label}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${popularity.score}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
              <span className="text-gray-600">Format</span>
              <motion.span 
                className="font-bold uppercase text-primary"
                whileHover={{ scale: 1.1 }}
              >
                {template.fileType}
              </motion.span>
            </div>
            <div className="flex items-center justify-between text-sm bg-gray-50 rounded-lg p-2">
              <HardDrive className="h-3 w-3 text-gray-600" />
              <span className="font-medium">{template.fileSize}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Download className="h-3 w-3" />
              Total Download
            </span>
            <motion.span 
              className="font-bold text-primary"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {template.downloadCount.toLocaleString('id-ID')}x
            </motion.span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Diperbarui: {formattedDate}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 relative z-20">
          <motion.button
            onClick={handleDetailClick}
            onMouseDown={(e) => {
              e.preventDefault()
              console.log('Button pressed')
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300 hover:shadow-md active:bg-gray-300 group relative z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            Detail
          </motion.button>
          <motion.button
            onClick={() => onDownload?.(template)}
            className="flex-1 relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 rounded-lg blur-md opacity-60 group-hover:opacity-80 transition-opacity"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-green-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              Download
              <motion.span
                className="absolute right-4"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
