// Template System Exports
// This file provides easy access to all template-related functionality

import { TemplateItem } from '@/types/solusi'

interface WordExportOptions {
  includePageBreaks: boolean
  includeHeaders: boolean
  includeFooters: boolean
  pageSize: 'A4' | 'Letter'
  margins: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export function formatTemplateForWord(
  content: string,
  options: WordExportOptions = {
    includePageBreaks: true,
    includeHeaders: true,
    includeFooters: true,
    pageSize: 'A4',
    margins: { top: 1, bottom: 1, left: 1, right: 1 }
  }
): string {
  // Build RTF header (page size A4 and margins ~1 inch default already set below)
  const header = `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Times New Roman;}{\\f1 Arial;}}{\\colortbl;}
\\paperw11906\\paperh16838\\margl1440\\margr1440\\margt1440\\margb1440\\viewkind4\\uc1`;

  const lines = content.split('\n')
  const rtfParts: string[] = []

  // Company header (once)
  rtfParts.push(
    `\\pard\\qc\\f0\\fs32\\b PT. MELEK HUKUM INDONESIA\\b0\\par`,
    `\\pard\\qc\\f0\\fs22\\i [LOGO PERUSAHAAN]\\i0\\par`,
    `\\pard\\qc\\f0\\fs24 Jl. Sudirman No. 123, Jakarta Pusat 12190\\par`,
    `\\pard\\qc\\f0\\fs20\\i Telp: (021) 1234-5678 | Fax: (021) 1234-5679 | Email: info@melekhukum.id | Website: www.melekhukum.id\\i0\\par`,
    `\\pard\\qc\\f0\\fs24 _____________________________________________________________________________\\par`
  )

  const pushPageBreak = () => {
    if (options.includePageBreaks) {
      rtfParts.push('\\page\\par')
    }
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      rtfParts.push('\\pard\\qj\\f0\\fs24\\par')
      continue
    }

    const lower = line.toLowerCase()

    // Page break markers
    if (lower.includes('[page break]')) {
      pushPageBreak()
      continue
    }

    // Skip other bracketed formatting notes
    if (line.startsWith('[') && !lower.includes('[page break]')) {
      continue
    }

    // Main title
    if (/^(SURAT|PERJANJIAN)/i.test(line)) {
      rtfParts.push(`\\pard\\qc\\f0\\fs32\\b ${line.toUpperCase()}\\b0\\par`)
      continue
    }

    // Document number
    if (/^(NOMOR|Nomor)/.test(line)) {
      rtfParts.push(`\\pard\\qc\\f0\\fs24\\b ${line}\\b0\\par`)
      continue
    }

    // Section title PASAL X
    if (/^PASAL\s+\d+/.test(line)) {
      rtfParts.push(`\\pard\\qc\\f1\\fs28\\b ${line}\\b0\\par`)
      continue
    }

    // Lettered list (a., b., ...)
    if (/^[a-z]\./.test(line)) {
      rtfParts.push(`\\pard\\li720\\qj\\f0\\fs24 ${line}\\par`)
      continue
    }

    // Dash list (- item)
    if (/^-\s+/.test(line)) {
      const text = line.replace(/^-\s+/, '– ')
      rtfParts.push(`\\pard\\li720\\qj\\f0\\fs24 ${text}\\par`)
      continue
    }

    // Regular paragraph
    rtfParts.push(`\\pard\\qj\\f0\\fs24 ${line}\\par`)
  }

  const footer = `}`
  return header + rtfParts.join('') + footer
}

export function createWordDocument(
  template: TemplateItem,
  content: string,
  options?: WordExportOptions
): Blob {
  const formattedContent = formatTemplateForWord(content, options)
  const rtfContent = formattedContent
  const blob = new Blob([rtfContent], { type: 'application/rtf' })
  return blob
}

export function downloadTemplate(
  template: TemplateItem,
  content: string,
  options?: WordExportOptions
): void {
  const blob = createWordDocument(template, content, options)
  
  // Create download link
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${template.title.replace(/[^a-zA-Z0-9]/g, '_')}.rtf`
  
  // Trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  URL.revokeObjectURL(url)
}

// Export main template data
export * from './templates/index'

// Export template components
export { default as TemplateDetail } from './TemplateDetail'

// Export individual templates
export {
  SURAT_PERJANJIAN_SEWA_RUMAH_TEMPLATE,
  SURAT_PERJANJIAN_SEWA_RUMAH_CONTENT,
  SURAT_PERJANJIAN_SEWA_RUMAH_GUIDE,
  SURAT_PERJANJIAN_SEWA_RUMAH_REFERENCES
} from './templates/surat-perjanjian-sewa-rumah'

export {
  SURAT_PERJANJIAN_JUAL_BELI_TEMPLATE,
  SURAT_PERJANJIAN_JUAL_BELI_CONTENT,
  SURAT_PERJANJIAN_JUAL_BELI_GUIDE,
  SURAT_PERJANJIAN_JUAL_BELI_REFERENCES
} from './templates/surat-perjanjian-jual-beli'

// Export template registry
export {
  TEMPLATE_REGISTRY,
  getTemplateData
} from './templates'

// Export types
export type { TemplateItem } from '@/types/solusi' 