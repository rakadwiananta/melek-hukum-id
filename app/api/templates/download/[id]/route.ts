import { NextRequest, NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { SURAT_PERJANJIAN_SEWA_RUMAH_TEMPLATE, SURAT_PERJANJIAN_SEWA_RUMAH_CONTENT } from '@/app/components/solusi/template/templates/surat-perjanjian-sewa-rumah'
import { SURAT_PERJANJIAN_JUAL_BELI_TEMPLATE, SURAT_PERJANJIAN_JUAL_BELI_CONTENT } from '@/app/components/solusi/template/templates/surat-perjanjian-jual-beli'
import { SURAT_PERJANJIAN_KERJA_PKWTT_TEMPLATE, SURAT_PERJANJIAN_KERJA_PKWTT_CONTENT } from '@/app/components/solusi/template/templates/surat-perjanjian-kerja-pkwtt'
import { SURAT_PERNYATAAN_KEHILANGAN_TEMPLATE, SURAT_PERNYATAAN_KEHILANGAN_CONTENT } from '@/app/components/solusi/template/templates/surat-pernyataan-kehilangan'
import { SURAT_KUASA_HUKUM_TEMPLATE, SURAT_KUASA_HUKUM_CONTENT } from '@/app/components/solusi/template/templates/surat-kuasa-hukum'

const TEMPLATES = {
  'surat-perjanjian-sewa-rumah': {
    template: SURAT_PERJANJIAN_SEWA_RUMAH_TEMPLATE,
    content: SURAT_PERJANJIAN_SEWA_RUMAH_CONTENT
  },
  'surat-perjanjian-jual-beli': {
    template: SURAT_PERJANJIAN_JUAL_BELI_TEMPLATE,
    content: SURAT_PERJANJIAN_JUAL_BELI_CONTENT
  },
  'surat-perjanjian-kerja-pkwtt': {
    template: SURAT_PERJANJIAN_KERJA_PKWTT_TEMPLATE,
    content: SURAT_PERJANJIAN_KERJA_PKWTT_CONTENT
  },
  'surat-pernyataan-kehilangan': {
    template: SURAT_PERNYATAAN_KEHILANGAN_TEMPLATE,
    content: SURAT_PERNYATAAN_KEHILANGAN_CONTENT
  },
  'surat-kuasa-hukum': {
    template: SURAT_KUASA_HUKUM_TEMPLATE,
    content: SURAT_KUASA_HUKUM_CONTENT
  }
}

// Function to convert plain text to DOCX format with proper formatting
function convertTextToDocx(content: string): Document {
  const lines = content.split('\n')
  const children: any[] = []

  // Add company header with proper formatting
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "PT. MELEK HUKUM INDONESIA",
          font: "Times New Roman",
          size: 32, // 16pt
          bold: true
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 900, after: 300 }
    })
  )

  // Add logo placeholder
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "[LOGO PERUSAHAAN]",
          font: "Times New Roman",
          size: 22, // 11pt
          italics: true
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 300 }
    })
  )

  // Add address (company details) without repeating company name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Jl. Sudirman No. 123, Jakarta Pusat 12190",
          font: "Times New Roman",
          size: 24 // 12pt
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 150, after: 150 }
    })
  )

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Telp: (021) 1234-5678 | Fax: (021) 1234-5679 | Email: info@melekhukum.id | Website: www.melekhukum.id",
          font: "Times New Roman",
          size: 20, // 10pt
          italics: true
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 150, after: 450 }
    })
  )

  // Add separator line
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "_____________________________________________________________________________",
          font: "Times New Roman",
          size: 24 // 12pt
        })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 600 }
    })
  )

  // State untuk kontrol page break antar PASAL
  let pasalCount = 0
  let lastInsertedBreak = false
  let prevBlank = false
  let afterPageBreak = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()

    // Kompres baris kosong berturut-turut dan hindari setelah page break
    if (!trimmedLine) {
      if (prevBlank || afterPageBreak) {
        continue
      }
      children.push(new Paragraph({ spacing: { before: 90, after: 90 } }))
      prevBlank = true
      lastInsertedBreak = false
      continue
    } else {
      prevBlank = false
    }

    // Skip formatting instructions
    if (trimmedLine.match(/^\[/)) {
      // Page Break handled separately below
      if (trimmedLine.toLowerCase().includes('page break')) {
        children.push(new Paragraph({ pageBreakBefore: true }))
        lastInsertedBreak = true
        afterPageBreak = true
      }
      continue
    }
    afterPageBreak = false

    // Handle main document title (PERJANJIAN KERJA, dsb)
    if (trimmedLine.match(/^(SURAT|PERJANJIAN)/i)) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmedLine.toUpperCase(),
              font: 'Times New Roman',
              size: 32,
              bold: true
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 240 }
        })
      )
      lastInsertedBreak = false
      continue
    }
    // Handle document number
    else if (trimmedLine.startsWith('Nomor:') || trimmedLine.startsWith('NOMOR')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmedLine,
              font: 'Times New Roman',
              size: 24,
              bold: true
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 180, after: 180 }
        })
      )
      lastInsertedBreak = false
    }
    // Handle page breaks
    else if (trimmedLine.toLowerCase().includes('[page break]')) {
      children.push(new Paragraph({ pageBreakBefore: true }))
      lastInsertedBreak = true
      afterPageBreak = true
    }
    // Handle section headers (PASAL 1, dll.)
    else if (trimmedLine.startsWith('PASAL') && !trimmedLine.includes('[')) {
      const shouldBreak = pasalCount > 0 && !lastInsertedBreak
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmedLine,
              font: 'Arial',
              size: 28,
              bold: true
            })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 420, after: 210 },
          pageBreakBefore: shouldBreak
        })
      )
      pasalCount += 1
      lastInsertedBreak = false
    }
    // Handle subsection headers (1.1 TEXT ...)
    else if (trimmedLine.match(/^\d+\.\d+\s+[A-Z]/) && !trimmedLine.includes('[')) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmedLine,
              font: 'Times New Roman',
              size: 24,
              bold: true
            })
          ],
          spacing: { before: 150, after: 75 },
          alignment: AlignmentType.JUSTIFIED
        })
      )
      lastInsertedBreak = false
    }
    // Handle numbered lists (1.1, 1.2, dll.)
    else if (trimmedLine.match(/^\d+\.\d+\s+/) && !trimmedLine.includes('[')) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24 }) ],
          spacing: { before: 90, after: 90 }
        })
      )
      lastInsertedBreak = false
    }
    // Handle garis strip khusus -> center
    else if (/^-{5,}/.test(trimmedLine)) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 22 }) ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 120 }
        })
      )
    }
    // Handle dash lists (- item)
    else if (/^\-\s+/.test(trimmedLine)) {
      const text = trimmedLine.replace(/^\-\s+/, '– ')
      children.push(
        new Paragraph({
          children: [ new TextRun({ text, font: 'Times New Roman', size: 24 }) ],
          spacing: { before: 90, after: 90 },
          indent: { left: 1080 }
        })
      )
      lastInsertedBreak = false
    }
    // Handle lettered lists (a., b., etc.)
    else if (trimmedLine.match(/^[a-z]\.[\s\S]*/)) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24 }) ],
          spacing: { before: 90, after: 90 },
          indent: { left: 1080 }
        })
      )
      lastInsertedBreak = false
    }
    // Handle signature sections
    else if (trimmedLine.includes('PIHAK PERTAMA') || trimmedLine.includes('PIHAK KEDUA')) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24, bold: true }) ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 720, after: 240 },
          keepNext: true
        })
      )
      lastInsertedBreak = false
    }
    // Handle meterai sections
    else if (trimmedLine.includes('Meterai')) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24 }) ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 210, after: 210 },
          keepNext: true
        })
      )
      lastInsertedBreak = false
    }
    // Handle signature lines
    else if (trimmedLine.includes('_______________________________')) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24 }) ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 210, after: 180 },
          keepLines: true,
          keepNext: true
        })
      )
      lastInsertedBreak = false
    }
    // Handle witness sections
    else if (trimmedLine.includes('Saksi-saksi:')) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Arial', size: 28, bold: true }) ],
          spacing: { before: 420, after: 210 },
          keepNext: true
        })
      )
      lastInsertedBreak = false
    }
    // Handle "Tanda tangan:" label
    else if (/Tanda tangan:/i.test(trimmedLine)) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24 }) ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 210, after: 120 },
          keepNext: true
        })
      )
      lastInsertedBreak = false
    }
    // Handle regular paragraphs
    else if (!trimmedLine.includes('[')) {
      children.push(
        new Paragraph({
          children: [ new TextRun({ text: trimmedLine, font: 'Times New Roman', size: 24 }) ],
          spacing: { before: 120, after: 120 },
          alignment: AlignmentType.JUSTIFIED
        })
      )
      lastInsertedBreak = false
    }
  }

  return new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1701,
            bottom: 1701,
            left: 2268,
            right: 1417
          },
          size: {
            width: 11906,
            height: 16838
          }
        }
      },
      children: children
    }]
  })
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: templateId } = await context.params
    const templateData = TEMPLATES[templateId as keyof typeof TEMPLATES]

    if (!templateData) {
      return NextResponse.json(
        { error: 'Template tidak ditemukan' },
        { status: 404 }
      )
    }

    const { template, content } = templateData

    // Generate file content based on template type
    let fileContent: Buffer | string = ''
    let fileName = ''
    let contentType = ''

    if (template.fileType === 'docx') {
      // Generate actual DOCX file
      const doc = convertTextToDocx(content)
      fileContent = await Packer.toBuffer(doc)
      fileName = `${template.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx`
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    } else if (template.fileType === 'pdf') {
      // For PDF, we'll return a text file that can be converted
      // In a real implementation, you'd use a library like puppeteer to generate actual PDF
      fileContent = content
      fileName = `${template.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`
      contentType = 'text/plain'
    }

    // Create response with proper headers
    let responseBody: BodyInit
    
    if (fileContent instanceof Buffer) {
      responseBody = new Blob([new Uint8Array(fileContent)], { type: contentType })
    } else {
      responseBody = new Blob([fileContent as string], { type: contentType })
    }
    
    const response = new NextResponse(responseBody, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache',
        'X-Template-ID': template.id,
        'X-Template-Title': template.title
      }
    })

    return response
  } catch (error) {
    console.error('Error generating template download:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengunduh template' },
      { status: 500 }
    )
  }
} 