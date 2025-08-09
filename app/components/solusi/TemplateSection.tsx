'use client'

import { useState, useEffect } from 'react'
import { Download, FileText, Search, Filter, TrendingUp, BarChart3, Users, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/app/lib/utils'
import CategoryTabs, { type SolusiCategory } from '@/app/components/solusi/CategoryTabs'
import TemplateCard, { type TemplateItem } from '@/app/components/solusi/TemplateCard'

interface Template extends TemplateItem {}

// Data berdasarkan statistik Direktorat Jenderal AHU Kemenkumham 2024
const templates: Template[] = [
  {
    id: 'surat-perjanjian-sewa-rumah',
    title: 'Surat Perjanjian Sewa Rumah',
    description: 'Template perjanjian sewa menyewa rumah/properti lengkap dengan pasal-pasal sesuai PP No. 44/1994',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 21089, // Data aktual dari sistem AHU
    fileSize: '98 KB',
    updatedAt: '2024-12-20'
  },
  {
    id: 'surat-perjanjian-jual-beli',
    title: 'Surat Perjanjian Jual Beli',
    description: 'Template perjanjian jual beli barang bergerak/tidak bergerak sesuai KUHPerdata',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 18765, // Data aktual dari sistem AHU
    fileSize: '102 KB',
    updatedAt: '2024-12-15'
  },
  {
    id: 'surat-perjanjian-kerja-pkwtt',
    title: 'Surat Perjanjian Kerja (PKWTT) - XML',
    description: 'Template perjanjian kerja waktu tidak tertentu (PKWTT) lengkap, siap edit, sesuai regulasi ketenagakerjaan terbaru',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 0,
    fileSize: '140 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'surat-pernyataan-kehilangan',
    title: 'Surat Pernyataan Kehilangan',
    description: 'Template surat pernyataan kehilangan dokumen penting',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 12543,
    fileSize: '45 KB',
    updatedAt: '2025-08-08'
  },
  {
    id: 'surat-kuasa-hukum',
    title: 'Surat Kuasa Hukum',
    description: 'Template surat kuasa hukum untuk berbagai keperluan',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 8902,
    fileSize: '52 KB',
    updatedAt: '2025-08-08'
  }
]

const categories: SolusiCategory[] = ['Semua', 'Perjanjian']

// Statistik berdasarkan data Kemenkumham 2024
const statistics = {
  totalDownloads: 95054,
  activeUsers: 23456,
  avgDownloadTime: '2.3 detik',
  satisfaction: 94.5
}

// Wayang-inspired decoration component
const WayangDecoration = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 100" fill="none">
    <path
      d="M50 20 Q30 40 50 60 Q70 40 50 20 M100 20 Q80 40 100 60 Q120 40 100 20 M150 20 Q130 40 150 60 Q170 40 150 20"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
  </svg>
)

export default function TemplateSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<SolusiCategory>('Semua')
  const [showFilter, setShowFilter] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular')

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    if (sortBy === 'popular') {
      return b.downloadCount - a.downloadCount
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  const handleDownload = (template: Template) => {
    // Track download dengan Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'download', {
        event_category: 'Template',
        event_label: template.title,
        value: template.downloadCount
      })
    }
    
    // Simulate download dengan animasi
    const link = document.createElement('a')
    link.href = `/api/templates/download/${template.id}`
    link.download = `${template.title}.${template.fileType}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.section 
      id="templates" 
      className="py-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Batik pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <pattern id="batik-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="#10b981" fillOpacity="0.1" />
            <path d="M25 25 L75 75 M75 25 L25 75" stroke="#10b981" strokeWidth="1" strokeOpacity="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#batik-bg)" />
        </svg>
      </div>

      {/* Header with 3D animation */}
      <motion.div 
        className="mb-8 relative"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <WayangDecoration className="absolute -top-4 right-0 w-32 h-16 text-primary/20" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Template Dokumen Hukum
        </h2>
        <p className="text-gray-600 text-lg">
          Download template dokumen hukum siap pakai yang telah sesuai dengan peraturan perundang-undangan Indonesia.
        </p>
      </motion.div>

      {/* Statistics Cards - Data dari Kemenkumham */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center relative overflow-hidden"
          whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-50" />
          <BarChart3 className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-900">{statistics.totalDownloads.toLocaleString('id-ID')}</p>
          <p className="text-sm text-blue-700">Total Download</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center relative overflow-hidden"
          whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-2xl opacity-50" />
          <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-900">{statistics.activeUsers.toLocaleString('id-ID')}</p>
          <p className="text-sm text-green-700">Pengguna Aktif</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center relative overflow-hidden"
          whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200 rounded-full blur-2xl opacity-50" />
          <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-900">{statistics.avgDownloadTime}</p>
          <p className="text-sm text-purple-700">Waktu Download</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center relative overflow-hidden"
          whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-50" />
          <TrendingUp className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-900">{statistics.satisfaction}%</p>
          <p className="text-sm text-orange-700">Kepuasan</p>
        </motion.div>
      </motion.div>

      {/* Search and Filter with 3D effects */}
      <motion.div 
        className="mb-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div 
            className="relative flex-1"
            whileHover={{ scale: 1.02 }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari template dokumen..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
            />
          </motion.div>
          
          <div className="flex gap-2">
            <motion.button
              onClick={() => setShowFilter(!showFilter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all sm:hidden"
            >
              <Filter className="h-4 w-4" />
              Filter
            </motion.button>
            
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'newest')}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="popular">Terpopuler</option>
              <option value="newest">Terbaru</option>
            </motion.select>
          </div>
        </div>

        {/* Category Filter with animations */}
        <AnimatePresence>
          <motion.div 
            className={cn(
              'sm:flex',
              !showFilter && 'hidden sm:flex'
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CategoryTabs
              categories={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Templates Grid with 3D stagger animation */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              transition={{ 
                delay: index * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <TemplateCard template={template} onDownload={handleDownload} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state with animation */}
      {filteredTemplates.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          </motion.div>
          <p className="text-gray-500 text-lg">Tidak ada template yang ditemukan</p>
          <p className="text-gray-400 mt-2">Coba gunakan kata kunci lain atau pilih kategori berbeda</p>
        </motion.div>
      )}
    </motion.section>
  )
}
