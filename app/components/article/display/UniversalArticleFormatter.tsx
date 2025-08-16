'use client'

import { motion } from 'framer-motion'
import { BookOpen, Quote, List, AlertTriangle, CheckCircle, Info, Lightbulb, Scale, FileText, ExternalLink, Eye, Clock } from 'lucide-react'
import { calculateReadingTime } from '@/app/lib/utils'

interface UniversalArticleFormatterProps {
  content: string
  title?: string
  category?: string
}

export default function UniversalArticleFormatter({ 
  content, 
  title = '',
  category = 'artikel'
}: UniversalArticleFormatterProps) {
  
  // Clean and structure the content
  const formatContent = (rawContent: string) => {
    let cleanContent = rawContent
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Fix ampersands
      .replace(/&lt;/g, '<') // Fix less than
      .replace(/&gt;/g, '>') // Fix greater than
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()

    // Split into sentences and paragraphs
    const sentences = cleanContent.split(/(?<=[.!?])\s+/)
    const paragraphs: string[] = []
    let currentParagraph = ''
    let sentenceCount = 0

    sentences.forEach((sentence) => {
      if (sentence.trim()) {
        currentParagraph += (currentParagraph ? ' ' : '') + sentence.trim()
        sentenceCount++
        
        // Create paragraph after 3-5 sentences or at natural breaks
        if (sentenceCount >= 3 && (
          sentenceCount >= 5 || 
          sentence.includes(':') || 
          sentence.includes(';') ||
          sentence.toLowerCase().includes('pertama') ||
          sentence.toLowerCase().includes('kedua') ||
          sentence.toLowerCase().includes('ketiga') ||
          sentence.toLowerCase().includes('selanjutnya') ||
          sentence.toLowerCase().includes('oleh karena itu') ||
          sentence.toLowerCase().includes('dengan demikian') ||
          sentence.toLowerCase().includes('hal ini')
        )) {
          if (currentParagraph.length > 50) {
            paragraphs.push(currentParagraph)
            currentParagraph = ''
            sentenceCount = 0
          }
        }
      }
    })
    
    // Add remaining content as final paragraph
    if (currentParagraph.trim() && currentParagraph.length > 20) {
      paragraphs.push(currentParagraph)
    }

    return paragraphs.filter(p => p.length > 20) // Filter out very short paragraphs
  }

  // Detect and structure special content types
  const detectStructure = (paragraph: string, index: number) => {
    const para = paragraph.toLowerCase()
    
    // Detect headings
    if (
      para.includes('pengertian') ||
      para.includes('definisi') ||
      para.includes('dasar hukum') ||
      para.includes('prosedur') ||
      para.includes('tahapan') ||
      para.includes('syarat') ||
      para.includes('ketentuan') ||
      para.includes('sanksi') ||
      para.includes('cara') ||
      para.includes('langkah') ||
      (para.length < 100 && (para.includes('pasal') || para.includes('undang-undang')))
    ) {
      return 'heading'
    }

    // Detect lists/enumerations
    if (
      para.includes('pertama') ||
      para.includes('kedua') ||
      para.includes('ketiga') ||
      para.includes('1.') ||
      para.includes('2.') ||
      para.includes('a.') ||
      para.includes('b.') ||
      para.includes('meliputi:') ||
      para.includes('adalah:') ||
      para.includes('yaitu:')
    ) {
      return 'list'
    }

    // Detect important/warning content
    if (
      para.includes('penting') ||
      para.includes('perhatian') ||
      para.includes('dilarang') ||
      para.includes('wajib') ||
      para.includes('harus') ||
      para.includes('tidak boleh')
    ) {
      return 'important'
    }

    // Detect conclusion/summary
    if (
      para.includes('kesimpulan') ||
      para.includes('dengan demikian') ||
      para.includes('oleh karena itu') ||
      para.includes('pada akhirnya') ||
      para.includes('sebagai penutup')
    ) {
      return 'conclusion'
    }

    return 'normal'
  }

  // Extract key information for info boxes
  const getInfoBoxContent = (paragraph: string) => {
    const para = paragraph.toLowerCase()
    
    if (para.includes('korupsi')) {
      return {
        icon: Scale,
        title: 'Info Anti-Korupsi',
        type: 'warning',
        color: 'from-red-500 to-red-700'
      }
    }
    
    if (para.includes('pidana')) {
      return {
        icon: FileText,
        title: 'Info Hukum Pidana',
        type: 'info',
        color: 'from-blue-500 to-blue-700'
      }
    }
    
    if (para.includes('perdata')) {
      return {
        icon: CheckCircle,
        title: 'Info Hukum Perdata',
        type: 'success',
        color: 'from-green-500 to-green-700'
      }
    }
    
    if (para.includes('undang-undang') || para.includes('pasal') || para.includes('peraturan')) {
      return {
        icon: BookOpen,
        title: 'Dasar Hukum',
        type: 'info',
        color: 'from-purple-500 to-purple-700'
      }
    }

    return null
  }

  const formattedParagraphs = formatContent(content)
  const readingTime = calculateReadingTime(content)

  return (
    <article className="max-w-4xl mx-auto">
      {/* Reading Time & Stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4 text-sm text-gray-600"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{readingTime} menit baca</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>{formattedParagraphs.length} paragraf</span>
        </div>
      </motion.div>

      {/* Article Content */}
      <div className="space-y-8">
        {formattedParagraphs.map((paragraph, index) => {
          const structure = detectStructure(paragraph, index)
          const infoBox = getInfoBoxContent(paragraph)
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {structure === 'heading' ? (
                // Heading Style
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-amber-600 rounded-full"></div>
                    {paragraph}
                  </h2>
                </div>
              ) : structure === 'list' ? (
                // List Style
                <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                  <div className="flex items-start gap-3">
                    <List className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed m-0">{paragraph}</p>
                    </div>
                  </div>
                </div>
              ) : structure === 'important' ? (
                // Important/Warning Style
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-2">Penting untuk Diperhatikan</h4>
                      <p className="text-amber-800 leading-relaxed">{paragraph}</p>
                    </div>
                  </div>
                </div>
              ) : structure === 'conclusion' ? (
                // Conclusion Style
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-8 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-green-900 mb-3">Kesimpulan</h4>
                      <p className="text-green-800 leading-relaxed text-lg">{paragraph}</p>
                    </div>
                  </div>
                </div>
              ) : (
                // Normal Paragraph Style
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg mb-6 text-justify">
                    {paragraph}
                  </p>
                </div>
              )}

              {/* Dynamic Info Boxes */}
              {infoBox && index > 0 && index % 3 === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="my-8"
                >
                  <div className={`bg-gradient-to-br ${infoBox.color} rounded-2xl p-6 text-white relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 400 300">
                        <pattern id={`pattern-${index}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                          <circle cx="40" cy="40" r="20" fill="white" opacity="0.3"/>
                          <circle cx="40" cy="40" r="10" fill="white" opacity="0.5"/>
                        </pattern>
                        <rect width="400" height="300" fill={`url(#pattern-${index})`} />
                      </svg>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <infoBox.icon className="w-8 h-8" />
                        <h4 className="text-xl font-bold">{infoBox.title}</h4>
                      </div>
                      <p className="text-white/90 leading-relaxed">
                        Informasi tambahan terkait topik ini tersedia di bagian {category === 'kamus' ? 'Kamus Hukum' : 'Panduan Lengkap'} kami.
                      </p>
                      <div className="mt-4 flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <Lightbulb className="w-4 h-4" />
                          <span className="text-sm">Tips</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-sm">Detail</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quote Box */}
              {index === Math.floor(formattedParagraphs.length / 2) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="my-12"
                >
                  <blockquote className="bg-gradient-to-r from-gray-50 to-blue-50 border-l-4 border-blue-500 p-8 rounded-r-2xl">
                    <div className="flex items-start gap-4">
                      <Quote className="w-8 h-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xl italic text-gray-700 mb-3">
                          "Hukum tanpa keadilan adalah tirani, keadilan tanpa hukum adalah anarki."
                        </p>
                        <cite className="text-gray-600 font-semibold">— Pepatah Hukum</cite>
                      </div>
                    </div>
                  </blockquote>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 p-8 bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl border border-red-200"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Butuh Bantuan Lebih Lanjut?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Jangan ragu untuk mengeksplorasi sumber daya hukum lainnya atau berkonsultasi dengan ahli hukum untuk pemahaman yang lebih mendalam.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>Kamus Hukum</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FileText className="w-5 h-5" />
              <span>Template Dokumen</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Scale className="w-5 h-5" />
              <span>Konsultasi Hukum</span>
            </button>
          </div>
        </div>
      </motion.div>
    </article>
  )
}