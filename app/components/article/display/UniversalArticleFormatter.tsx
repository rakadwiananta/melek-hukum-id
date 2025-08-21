'use client'

import { motion } from 'framer-motion'
import { BookOpen, Quote, List, AlertTriangle, CheckCircle, Info, Lightbulb, Scale, FileText, ExternalLink, Eye, Clock } from 'lucide-react'
import { calculateReadingTime } from '@/app/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface UniversalArticleFormatterProps {
  content: string
  title?: string
  category?: string
}

interface DocumentSection {
  type: 'heading' | 'paragraph' | 'list' | 'numbered_list' | 'conclusion'
  content: string
  level?: number
  items?: string[]
}

export default function UniversalArticleFormatter({ 
  content, 
  title = '',
  category = 'artikel'
}: UniversalArticleFormatterProps) {
  const router = useRouter()
  
  // Clean and structure the content like MS Word document
  const formatContent = (rawContent: string): DocumentSection[] => {
    let cleanContent = rawContent
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Fix ampersands
      .replace(/&lt;/g, '<') // Fix less than
      .replace(/&gt;/g, '>') // Fix greater than
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    const sections: DocumentSection[] = []
    const sentences = cleanContent.split(/(?<=[.!?])\s+/)
    let currentParagraph = ''
    let sentenceCount = 0

    sentences.forEach((sentence, index) => {
      if (sentence.trim()) {
        const trimmedSentence = sentence.trim()
        
        // Check if this sentence should be a heading
        if (isHeading(trimmedSentence)) {
          // Save current paragraph if exists
          if (currentParagraph.trim() && currentParagraph.length > 30) {
            sections.push({
              type: 'paragraph',
              content: currentParagraph.trim()
            })
            currentParagraph = ''
            sentenceCount = 0
          }
          
          // Add heading
          sections.push({
            type: 'heading',
            content: trimmedSentence,
            level: getHeadingLevel(trimmedSentence)
          })
          return
        }
        
        // Check if this starts a numbered list
        if (isNumberedListItem(trimmedSentence)) {
          // Save current paragraph if exists
          if (currentParagraph.trim() && currentParagraph.length > 30) {
            sections.push({
              type: 'paragraph',
              content: currentParagraph.trim()
            })
            currentParagraph = ''
            sentenceCount = 0
          }
          
          // Collect list items
          const listItems = [trimmedSentence]
          let nextIndex = index + 1
          
          while (nextIndex < sentences.length && isNumberedListItem(sentences[nextIndex]?.trim())) {
            listItems.push(sentences[nextIndex].trim())
            nextIndex++
          }
          
          sections.push({
            type: 'numbered_list',
            content: '',
            items: listItems.map(item => cleanListItem(item))
          })
          return
        }
        
        // Check if this is conclusion
        if (isConclusion(trimmedSentence)) {
          // Save current paragraph if exists
          if (currentParagraph.trim() && currentParagraph.length > 30) {
            sections.push({
              type: 'paragraph',
              content: currentParagraph.trim()
            })
            currentParagraph = ''
            sentenceCount = 0
          }
          
          // Start conclusion paragraph
          currentParagraph = trimmedSentence
          sentenceCount = 1
          
          // Collect remaining sentences for conclusion
          let conclusionContent = trimmedSentence
          let nextIndex = index + 1
          while (nextIndex < sentences.length && !isHeading(sentences[nextIndex]?.trim())) {
            conclusionContent += ' ' + sentences[nextIndex].trim()
            nextIndex++
          }
          
          sections.push({
            type: 'conclusion',
            content: conclusionContent
          })
          return
        }
        
        // Regular paragraph content
        currentParagraph += (currentParagraph ? ' ' : '') + trimmedSentence
        sentenceCount++
        
        // Create paragraph after natural breaks
        if (sentenceCount >= 3 && (
          sentenceCount >= 5 || 
          trimmedSentence.includes(':') || 
          trimmedSentence.includes(';') ||
          trimmedSentence.toLowerCase().includes('oleh karena itu') ||
          trimmedSentence.toLowerCase().includes('dengan demikian') ||
          trimmedSentence.toLowerCase().includes('selanjutnya') ||
          trimmedSentence.toLowerCase().includes('hal ini penting')
        )) {
          if (currentParagraph.length > 100) {
            sections.push({
              type: 'paragraph',
              content: currentParagraph.trim()
            })
            currentParagraph = ''
            sentenceCount = 0
          }
        }
      }
    })
    
    // Add remaining content as final paragraph
    if (currentParagraph.trim() && currentParagraph.length > 30) {
      sections.push({
        type: 'paragraph',
        content: currentParagraph.trim()
      })
    }

    return sections
  }

  // Helper functions for document structure detection
  const isHeading = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      // Common heading patterns
      lowerText.includes('pengertian') ||
      lowerText.includes('definisi') ||
      lowerText.includes('dasar hukum') ||
      lowerText.includes('prosedur') ||
      lowerText.includes('tahapan') ||
      lowerText.includes('syarat') ||
      lowerText.includes('ketentuan') ||
      lowerText.includes('sanksi') ||
      lowerText.includes('mekanisme') ||
      lowerText.includes('cara') ||
      lowerText.includes('langkah') ||
      lowerText.includes('proses') ||
      // Short sentences that look like headings
      (text.length < 80 && (
        lowerText.includes('pasal') || 
        lowerText.includes('undang-undang') ||
        lowerText.includes('peraturan') ||
        text.endsWith(':')
      ))
    )
  }

  const getHeadingLevel = (text: string): number => {
    const lowerText = text.toLowerCase()
    if (lowerText.includes('pengertian') || lowerText.includes('definisi')) return 1
    if (lowerText.includes('dasar hukum')) return 1
    if (lowerText.includes('prosedur') || lowerText.includes('mekanisme')) return 1
    if (lowerText.includes('tahapan') || lowerText.includes('langkah')) return 2
    if (lowerText.includes('syarat') || lowerText.includes('ketentuan')) return 2
    return 2
  }

  const isNumberedListItem = (text: string): boolean => {
    const patterns = [
      /^(pertama|kedua|ketiga|keempat|kelima|keenam|ketujuh|kedelapan|kesembilan|kesepuluh)/i,
      /^\d+\./,
      /^[a-z]\./,
      /^[ivx]+\./i
    ]
    return patterns.some(pattern => pattern.test(text.trim()))
  }

  const cleanListItem = (text: string): string => {
    return text
      .replace(/^(pertama|kedua|ketiga|keempat|kelima|keenam|ketujuh|kedelapan|kesembilan|kesepuluh)[,\s:]*/i, '')
      .replace(/^\d+\.\s*/, '')
      .replace(/^[a-z]\.\s*/, '')
      .replace(/^[ivx]+\.\s*/i, '')
      .trim()
  }

  const isConclusion = (text: string): boolean => {
    const lowerText = text.toLowerCase()
    return (
      lowerText.includes('kesimpulan') ||
      lowerText.includes('dengan demikian') ||
      lowerText.includes('oleh karena itu') ||
      lowerText.includes('pada akhirnya') ||
      lowerText.includes('sebagai penutup') ||
      lowerText.includes('dapat disimpulkan')
    )
  }



  const documentSections = formatContent(content)
  const readingTime = calculateReadingTime(content)

  return (
    <article className="max-w-4xl mx-auto bg-white">
      {/* Document Header - MS Word Style */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-gray-300 pb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} menit baca</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{documentSections.length} bagian</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Format: Dokumen Formal
          </div>
        </div>
      </motion.div>

             {/* Document Content - MS Word Style */}
       <div className="space-y-6">
         {(() => {
           let headingCounter = { level1: 0, level2: 0 }
           
           return documentSections.map((section, index) => {
             let currentNumber = ''
             
             // Calculate section numbering
             if (section.type === 'heading') {
               if (section.level === 1) {
                 headingCounter.level1++
                 headingCounter.level2 = 0
                 currentNumber = `${headingCounter.level1}.`
               } else {
                 headingCounter.level2++
                 currentNumber = `${headingCounter.level1}.${headingCounter.level2}.`
               }
             }
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="document-section"
            >
              {section.type === 'heading' ? (
                // MS Word Style Heading
                <div className={`mb-6 ${section.level === 1 ? 'mt-8' : 'mt-6'}`}>
                  <h2 className={`font-bold text-gray-900 ${
                    section.level === 1 
                      ? 'text-2xl md:text-3xl mb-4' 
                      : 'text-xl md:text-2xl mb-3'
                  }`}>
                                         <span className="inline-flex items-center gap-3">
                       <span className="text-red-600 font-mono text-lg">
                         {currentNumber}
                       </span>
                       <span className="uppercase tracking-wide">{section.content}</span>
                     </span>
                  </h2>
                </div>
              ) : section.type === 'numbered_list' ? (
                // MS Word Style Numbered List
                <div className="my-6">
                  <ol className="space-y-3 pl-0">
                    {section.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-4 text-gray-700">
                        <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          {itemIndex + 1}
                        </span>
                        <div className="flex-1 leading-relaxed text-justify pr-4">
                          {item}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : section.type === 'conclusion' ? (
                // MS Word Style Conclusion
                <div className="my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-r-lg">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-7 h-7 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-blue-900 mb-3 uppercase tracking-wide">
                        KESIMPULAN
                      </h4>
                      <p className="text-blue-800 leading-relaxed text-lg text-justify">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // MS Word Style Regular Paragraph
                <div className="my-6">
                  <p className="text-gray-700 leading-relaxed text-lg text-justify indent-8 font-serif">
                    {section.content}
                  </p>
                </div>
              )}

              {/* Legal Reference Box - MS Word Style */}
              {(section.type === 'paragraph' && index > 0 && index % 4 === 0) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="my-8 p-6 bg-gray-50 border border-gray-300 rounded-lg"
                >
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 uppercase text-sm tracking-wider">
                        REFERENSI HUKUM
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Untuk informasi lebih lanjut, silakan merujuk pada {category === 'kamus' ? 'Kamus Hukum' : 'Panduan Lengkap'} atau berkonsultasi dengan ahli hukum berlisensi.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Legal Quote - MS Word Style */}
              {index === Math.floor(documentSections.length / 2) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="my-10 mx-8"
                >
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                    <blockquote className="pl-6 py-4 bg-blue-50 border border-blue-200 rounded-r-lg">
                      <p className="text-lg italic text-blue-900 mb-3 font-serif">
                        "Hukum adalah panglima tertinggi, bukan manusia."
                      </p>
                      <cite className="text-blue-700 font-semibold text-sm uppercase tracking-wide">
                        — Aristoteles
                      </cite>
                    </blockquote>
                  </div>
                </motion.div>
              )}
            </motion.div>
                       )
           })
         })()}
       </div>

      {/* Document Footer - MS Word Style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 pt-8 border-t border-gray-300"
      >
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide text-center">
            INFORMASI TAMBAHAN
          </h3>
          <p className="text-gray-700 mb-6 text-center leading-relaxed">
            Dokumen ini disusun berdasarkan peraturan perundang-undangan yang berlaku di Indonesia. 
            Untuk konsultasi lebih lanjut, silakan hubungi ahli hukum yang kompeten.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link 
              href="/kamus-hukum" 
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-300">Kamus Hukum</span>
            </Link>
            <Link 
              href="/solusi/template" 
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-green-400 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <FileText className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-700 group-hover:text-green-700 transition-colors duration-300">Template Dokumen</span>
            </Link>
            <Link 
              href="/kontak" 
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-red-400 hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <Scale className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold text-gray-700 group-hover:text-red-700 transition-colors duration-300">Panduan Hukum</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* MS Word Style CSS */}
      <style jsx>{`
        .document-section {
          line-height: 1.6;
          font-family: 'Times New Roman', serif;
        }
        
        .document-section h2 {
          page-break-after: avoid;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }
        
        .document-section p {
          margin-bottom: 1em;
          text-align: justify;
          font-size: 12pt;
          line-height: 1.5;
        }
        
        .document-section ol {
          margin: 1em 0;
          padding-left: 0;
        }
        
        .document-section li {
          margin-bottom: 0.5em;
          text-align: justify;
        }
        
        @media print {
          .document-section {
            font-size: 12pt;
            line-height: 1.5;
          }
          
          .document-section h2 {
            font-size: 14pt;
            font-weight: bold;
          }
          
          .document-section p {
            text-indent: 0.5in;
          }
        }
      `}</style>
    </article>
  )
}