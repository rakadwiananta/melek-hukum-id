'use client'


import { useParams } from 'next/navigation'
import TemplateDetail from '@/app/components/solusi/template/TemplateDetail'
import {
  SURAT_PERJANJIAN_SEWA_RUMAH_TEMPLATE,
  SURAT_PERJANJIAN_SEWA_RUMAH_CONTENT,
  SURAT_PERJANJIAN_SEWA_RUMAH_GUIDE,
  SURAT_PERJANJIAN_SEWA_RUMAH_REFERENCES
} from '@/app/components/solusi/template/templates/surat-perjanjian-sewa-rumah'

import {
  SURAT_PERJANJIAN_JUAL_BELI_TEMPLATE,
  SURAT_PERJANJIAN_JUAL_BELI_CONTENT,
  SURAT_PERJANJIAN_JUAL_BELI_GUIDE,
  SURAT_PERJANJIAN_JUAL_BELI_REFERENCES
} from '@/app/components/solusi/template/templates/surat-perjanjian-jual-beli'

import {
  SURAT_PERJANJIAN_KERJA_PKWTT_TEMPLATE,
  SURAT_PERJANJIAN_KERJA_PKWTT_CONTENT,
  SURAT_PERJANJIAN_KERJA_PKWTT_GUIDE,
  SURAT_PERJANJIAN_KERJA_PKWTT_REFERENCES
} from '@/app/components/solusi/template/templates/surat-perjanjian-kerja-pkwtt'

import {
  SURAT_KUASA_HUKUM_TEMPLATE,
  SURAT_KUASA_HUKUM_CONTENT,
  SURAT_KUASA_HUKUM_GUIDE,
  SURAT_KUASA_HUKUM_REFERENCES
} from '@/app/components/solusi/template/templates/surat-kuasa-hukum'

import {
  SURAT_PERNYATAAN_KEHILANGAN_TEMPLATE,
  SURAT_PERNYATAAN_KEHILANGAN_CONTENT,
  SURAT_PERNYATAAN_KEHILANGAN_GUIDE,
  SURAT_PERNYATAAN_KEHILANGAN_REFERENCES
} from '@/app/components/solusi/template/templates/surat-pernyataan-kehilangan'

// Import template data
const TEMPLATES = {
  'surat-perjanjian-sewa-rumah': {
    template: SURAT_PERJANJIAN_SEWA_RUMAH_TEMPLATE,
    content: SURAT_PERJANJIAN_SEWA_RUMAH_CONTENT,
    guide: SURAT_PERJANJIAN_SEWA_RUMAH_GUIDE,
    references: SURAT_PERJANJIAN_SEWA_RUMAH_REFERENCES
  },
  'surat-perjanjian-jual-beli': {
    template: SURAT_PERJANJIAN_JUAL_BELI_TEMPLATE,
    content: SURAT_PERJANJIAN_JUAL_BELI_CONTENT,
    guide: SURAT_PERJANJIAN_JUAL_BELI_GUIDE,
    references: SURAT_PERJANJIAN_JUAL_BELI_REFERENCES
  },
  'surat-perjanjian-kerja-pkwtt': {
    template: SURAT_PERJANJIAN_KERJA_PKWTT_TEMPLATE,
    content: SURAT_PERJANJIAN_KERJA_PKWTT_CONTENT,
    guide: SURAT_PERJANJIAN_KERJA_PKWTT_GUIDE,
    references: SURAT_PERJANJIAN_KERJA_PKWTT_REFERENCES
  },
  'surat-kuasa-hukum': {
    template: SURAT_KUASA_HUKUM_TEMPLATE,
    content: SURAT_KUASA_HUKUM_CONTENT,
    guide: SURAT_KUASA_HUKUM_GUIDE,
    references: SURAT_KUASA_HUKUM_REFERENCES
  },
  'surat-pernyataan-kehilangan': {
    template: SURAT_PERNYATAAN_KEHILANGAN_TEMPLATE,
    content: SURAT_PERNYATAAN_KEHILANGAN_CONTENT,
    guide: SURAT_PERNYATAAN_KEHILANGAN_GUIDE,
    references: SURAT_PERNYATAAN_KEHILANGAN_REFERENCES
  }
}

export default function TemplateDetailPage() {
  const params = useParams()
  const templateId = params.id as string
  const templateData = TEMPLATES[templateId as keyof typeof TEMPLATES]

  const handleDownload = (template: any) => {
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

  if (!templateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Template Tidak Ditemukan</h1>
          <p className="text-gray-600 leading-relaxed mb-6">Template yang Anda cari tidak tersedia atau telah dipindahkan.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Professional Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <a href="/solusi" className="hover:text-primary transition-colors">Solusi</a>
            <span>/</span>
            <a href="/solusi/template" className="hover:text-primary transition-colors">Template</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{templateData.template.title}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{templateData.template.title}</h1>
              <p className="text-gray-600 mt-1">{templateData.template.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <TemplateDetail
          template={templateData.template}
          content={templateData.content}
          guide={templateData.guide}
          references={templateData.references}
          onDownload={handleDownload}
        />
      </div>

      {/* Professional Footer Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tentang Template</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Template ini telah disusun sesuai dengan peraturan perundang-undangan 
                yang berlaku di Indonesia dan dapat digunakan sebagai referensi.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Panduan Penggunaan</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Baca panduan pengisian dengan teliti</li>
                <li>• Sesuaikan dengan kebutuhan Anda</li>
                <li>• Konsultasikan dengan ahli hukum jika diperlukan</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Dukungan</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jika Anda memerlukan bantuan atau memiliki pertanyaan, 
                silakan hubungi tim kami melalui email atau chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 