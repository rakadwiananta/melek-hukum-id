'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  FileText, 
  BookOpen, 
  AlertCircle, 
  CheckCircle, 
  Copy,
  Eye,
  EyeOff,
  FileDown
} from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { downloadTemplate } from './export'

interface TemplateGuide {
  title: string
  steps: {
    step: number
    title: string
    description: string
    fields: string[]
  }[]
  notes: string[]
}

interface TemplateReferences {
  legalBasis: string[]
  requirements: string[]
  importantNotes: string[]
}

interface TemplateDetailProps {
  template: {
    id: string
    title: string
    description: string
    category: string
    fileType: 'docx' | 'pdf'
    downloadCount: number
    fileSize: string
    updatedAt: string
  }
  content: string
  guide: TemplateGuide
  references: TemplateReferences
  onDownload: (template: any) => void
}

export default function TemplateDetail({
  template,
  content,
  guide,
  references,
  onDownload
}: TemplateDetailProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'guide' | 'references'>('content')
  const [showContent, setShowContent] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You can add toast notification here
  }

  const handleDownload = async (template: any) => {
    setIsDownloading(true)
    try {
      // Track download dengan Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        ;(window as any).gtag('event', 'download', {
          event_category: 'Template',
          event_label: template.title,
          value: template.downloadCount
        })
      }
      
      // Use the new structured download function
      downloadTemplate(template, content, {
        includePageBreaks: true,
        includeHeaders: true,
        includeFooters: true,
        pageSize: 'A4',
        margins: { top: 1, bottom: 1, left: 1, right: 1 }
      })
      
      // Call the original onDownload for any additional tracking
      onDownload(template)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-gray-200 pb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{template.title}</h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{template.description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">{template.fileType.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{template.fileSize}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{template.downloadCount.toLocaleString('id-ID')} downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Updated: {new Date(template.updatedAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <motion.button
              onClick={() => handleDownload(template)}
              disabled={isDownloading}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isDownloading ? 1 : 1.05 }}
              whileTap={{ scale: isDownloading ? 1 : 0.95 }}
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Menyiapkan...
                </>
              ) : (
                <>
                  <Download className="h-6 w-6" />
                  Download Template
                </>
              )}
            </motion.button>
            
            <div className="text-xs text-gray-500 text-center">
              Format Word (.rtf) dengan struktur halaman yang rapi
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="flex border-b-2 border-gray-200 mb-8">
        {[
          { id: 'content', label: 'Konten Template', icon: FileText },
          { id: 'guide', label: 'Panduan Pengisian', icon: BookOpen },
          { id: 'references', label: 'Referensi Hukum', icon: AlertCircle }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-3 px-8 py-4 border-b-2 font-semibold transition-all duration-300",
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="min-h-[600px]"
        >
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Konten Template</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowContent(!showContent)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {showContent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showContent ? 'Sembunyikan' : 'Tampilkan'}
                  </button>
                  <button
                    onClick={() => copyToClipboard(content)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Salin
                  </button>
                </div>
              </div>
              
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-8 font-mono text-sm whitespace-pre-wrap leading-relaxed"
                >
                  {content}
                </motion.div>
              )}
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3 text-lg">Catatan Penting</h4>
                    <ul className="text-blue-800 space-y-2 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Template ini sesuai dengan peraturan perundang-undangan Indonesia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Ganti semua placeholder [TEXT] dengan informasi yang sesuai</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Pastikan semua informasi diisi dengan benar dan lengkap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Simpan salinan template untuk kedua belah pihak</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Dokumen akan terbuka dengan struktur halaman yang rapi di Word</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{guide.title}</h3>
              
              <div className="space-y-6">
                {guide.steps.map((step) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">{step.title}</h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                        <div className="space-y-3">
                          {step.fields.map((field, index) => (
                            <div key={index} className="flex items-start gap-3 text-sm">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 leading-relaxed">{field}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-yellow-900 mb-3 text-lg">Catatan Penting</h4>
                <ul className="text-yellow-800 space-y-2 leading-relaxed">
                  {guide.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Referensi Hukum</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-bold text-gray-900 flex items-center gap-3 text-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                    Dasar Hukum
                  </h4>
                  <div className="space-y-3">
                    {references.legalBasis.map((basis, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{basis}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-gray-900 flex items-center gap-3 text-lg">
                    <AlertCircle className="h-6 w-6 text-orange-500" />
                    Dokumen yang Diperlukan
                  </h4>
                  <div className="space-y-3">
                    {references.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3 text-sm">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="font-semibold text-red-900 mb-3 text-lg">Catatan Penting</h4>
                <ul className="text-red-800 space-y-2 leading-relaxed">
                  {references.importantNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 