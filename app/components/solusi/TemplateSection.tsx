'use client'

import { useState } from 'react'
import { Download, FileText, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/app/lib/utils'

interface Template {
  id: string
  title: string
  description: string
  category: string
  fileType: 'docx' | 'pdf'
  downloadCount: number
  fileSize: string
  updatedAt: string
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Surat Pernyataan Kehilangan',
    description: 'Template surat pernyataan kehilangan untuk keperluan pembuatan dokumen pengganti',
    category: 'Pernyataan',
    fileType: 'docx',
    downloadCount: 1250,
    fileSize: '45 KB',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Surat Kuasa Umum',
    description: 'Template surat kuasa untuk memberikan wewenang kepada pihak lain',
    category: 'Kuasa',
    fileType: 'docx',
    downloadCount: 890,
    fileSize: '52 KB',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Surat Perjanjian Sewa Rumah',
    description: 'Template perjanjian sewa menyewa rumah/properti lengkap dengan pasal-pasal',
    category: 'Perjanjian',
    fileType: 'pdf',
    downloadCount: 2100,
    fileSize: '120 KB',
    updatedAt: '2024-01-20'
  },
  {
    id: '4',
    title: 'Surat Permohonan Keringanan',
    description: 'Template surat permohonan keringanan biaya/denda/tagihan',
    category: 'Permohonan',
    fileType: 'docx',
    downloadCount: 560,
    fileSize: '38 KB',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    title: 'Surat Somasi',
    description: 'Template surat somasi/peringatan untuk penyelesaian masalah',
    category: 'Somasi',
    fileType: 'pdf',
    downloadCount: 450,
    fileSize: '85 KB',
    updatedAt: '2024-01-12'
  },
  {
    id: '6',
    title: 'Surat Perjanjian Kerja',
    description: 'Template kontrak kerja standar sesuai UU Ketenagakerjaan',
    category: 'Perjanjian',
    fileType: 'docx',
    downloadCount: 3200,
    fileSize: '150 KB',
    updatedAt: '2024-01-22'
  }
]

const categories = ['Semua', 'Pernyataan', 'Kuasa', 'Perjanjian', 'Permohonan', 'Somasi']

export default function TemplateSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [showFilter, setShowFilter] = useState(false)

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const handleDownload = (template: Template) => {
    // Track download
    if (window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'Template',
        event_label: template.title,
      })
    }
    
    // Simulate download (replace with actual download logic)
    const link = document.createElement('a')
    link.href = `/api/templates/download/${template.id}`
    link.download = `${template.title}.${template.fileType}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Template Dokumen Hukum</h2>
        <p className="text-muted-foreground">
          Download template dokumen hukum siap pakai. Semua template sudah sesuai dengan format standar.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari template..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors sm:hidden"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        {/* Category Filter */}
        <div className={cn(
          "flex flex-wrap gap-2",
          !showFilter && "hidden sm:flex"
        )}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{template.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Format</span>
                <span className="font-medium uppercase">{template.fileType}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ukuran</span>
                <span className="font-medium">{template.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Diunduh</span>
                <span className="font-medium">{template.downloadCount}x</span>
              </div>
            </div>

            <button
              onClick={() => handleDownload(template)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Template
            </button>
          </motion.div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-muted-foreground">Tidak ada template yang ditemukan</p>
        </div>
      )}
    </section>
  )
}
