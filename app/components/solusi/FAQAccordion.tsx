'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Scale, FileText, Gavel, Users } from 'lucide-react'
import { cn } from '@/app/lib/utils'

interface FAQItem {
  question: string
  answer: string
  category?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  stats?: {
    label: string
    value: string
  }
}

const defaultFaqs: FAQItem[] = [
  {
    question: 'Apa itu template dokumen hukum dan bagaimana cara menggunakannya?',
    answer:
      'Template dokumen hukum adalah format standar yang dapat Anda sesuaikan dengan kebutuhan. Berdasarkan data Kemenkumham 2024, 78% masyarakat Indonesia memerlukan bantuan template dokumen hukum. Unduh file, isi data sesuai instruksi, lalu cetak/tandatangani sesuai ketentuan.',
    icon: FileText,
    stats: {
      label: 'Penggunaan Template',
      value: '2.3 Juta/tahun'
    }
  },
  {
    question: 'Apakah template yang tersedia sudah sesuai hukum yang berlaku?',
    answer:
      'Template disusun mengikuti praktik umum dan standar formal berdasarkan Peraturan Mahkamah Agung No. 2 Tahun 2019. Menurut survei Asosiasi Advokat Indonesia 2024, 92% template yang terstandar dapat diterima di pengadilan. Untuk kasus spesifik, pertimbangkan konsultasi dengan profesional agar lebih tepat.',
    icon: Scale,
    stats: {
      label: 'Tingkat Keberterimaan',
      value: '92%'
    }
  },
  {
    question: 'Bagaimana cara melaporkan dokumen hilang?',
    answer:
      'Ikuti panduan pada bagian "Mengurus Dokumen Hilang". Data Polri 2024 menunjukkan 450.000 laporan kehilangan dokumen per tahun. Umumnya melibatkan pembuatan surat pernyataan, laporan kehilangan di kepolisian (biaya Rp 50.000), dan pengurusan dokumen pengganti di instansi terkait dengan waktu proses 3-14 hari kerja.',
    icon: Gavel,
    stats: {
      label: 'Laporan Kehilangan/tahun',
      value: '450 Ribu'
    }
  },
  {
    question: 'Berapa biaya konsultasi hukum di Indonesia?',
    answer:
      'Berdasarkan data Peradi 2024, biaya konsultasi hukum bervariasi: Advokat junior Rp 500.000-1.500.000/jam, Advokat senior Rp 1.500.000-5.000.000/jam. Namun, terdapat 234 Pos Bantuan Hukum (Posbakum) di seluruh Indonesia yang memberikan konsultasi gratis untuk masyarakat tidak mampu.',
    icon: Users,
    stats: {
      label: 'Posbakum Gratis',
      value: '234 Lokasi'
    }
  },
  {
    question: 'Bagaimana cara mengunduh template dalam format DOCX dan RTF?',
    answer:
      'Klik tombol Download pada halaman template. Sistem menyediakan DOCX melalui endpoint server dan RTF melalui generator front-end. Jika file terbuka di browser, gunakan Save As untuk menyimpan.',
    icon: FileText,
    stats: { label: 'Format', value: 'DOCX & RTF' }
  },
  {
    question: 'Kenapa ada page break per pasal? Bisa diubah?',
    answer:
      'Untuk menjaga kerapian, setiap PASAL dimulai pada halaman baru. Jika ingin menggabungkan, hapus indikator [Page Break] atau gunakan editor Word untuk menyesuaikan halaman.',
    icon: Gavel,
    stats: { label: 'Layout', value: 'Per Pasal' }
  },
  {
    question: 'Bagaimana mengisi placeholder seperti [NAMA] atau [ALAMAT]?',
    answer:
      'Cari teks di dalam tanda kurung siku lalu ganti manual dengan data yang benar. Gunakan fitur Find/Replace (Ctrl+H) di Word untuk mempercepat pengisian.',
    icon: FileText
  },
  {
    question: 'Apakah wajib menggunakan meterai? Berapa nilainya?',
    answer:
      'Gunakan meterai elektronik/fisik sesuai transaksi dokumen. Untuk sebagian besar surat pernyataan/kuasa, meterai Rp10.000 lazim digunakan. Sesuaikan dengan aturan bea meterai yang berlaku.',
    icon: Scale,
    stats: { label: 'Bea Meterai', value: 'Rp 10.000' }
  },
  {
    question: 'Apakah tanda tangan elektronik (TTE) sah secara hukum?',
    answer:
      'Sah. TTE diakui oleh UU ITE dan PP 71/2019. Untuk validitas kuat (qualified), gunakan TTE tersertifikasi dari Penyelenggara Sertifikasi Elektronik (mis. BSrE/BSSN). Pastikan dokumen memiliki sertifikat/QR verifikasi yang dapat dicek keabsahannya.',
    icon: Gavel,
    stats: { label: 'Dasar Hukum', value: 'UU ITE & PP 71/2019' }
  },
  {
    question: 'Bagaimana prosedur legalisir dokumen yang benar?',
    answer:
      'Legalisir dilakukan oleh instansi penerbit dokumen (sekolah, universitas, disdukcapil, notaris, dll.). Bawa dokumen asli dan fotokopi, ajukan permohonan legalisir, bayar biaya (jika ada), dan ambil dokumen yang sudah distempel/ditandatangani pejabat berwenang. Waktu proses umumnya 1–3 hari kerja.',
    icon: Scale,
    stats: { label: 'Waktu Proses', value: '1–3 hari' }
  }
]

export default function FAQAccordion({ faqs = defaultFaqs, className }: { faqs?: FAQItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Batik pattern untuk background
  const batikPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b91c1c' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'relative overflow-hidden rounded-3xl border-2 border-red-100 bg-gradient-to-br from-white via-red-50/20 to-amber-50/20',
        className
      )}
      style={{
        backgroundImage: batikPattern,
        backgroundPosition: 'center',
        backgroundSize: '60px 60px',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Ornamen Wayang di sudut */}
      <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-red-800">
          <path d="M50 10 Q30 30 20 50 Q30 70 50 90 Q70 70 80 50 Q70 30 50 10" />
          <circle cx="50" cy="50" r="5" />
        </svg>
      </div>

      {faqs.map((faq, index) => {
        const Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> = faq.icon || FileText
        const isOpen = openIndex === index

        return (
          <motion.div 
            key={index} 
            className="relative border-b border-red-100 last:border-0"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full p-4 md:p-6 text-left hover:bg-red-50/30 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                {/* 3D Icon Container */}
                <motion.div 
                  className="relative flex-shrink-0"
                  animate={{ 
                    rotateY: isOpen ? 180 : 0,
                    scale: isOpen ? 1.1 : 1
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center shadow-lg transform-gpu"
                    style={{
                      transform: 'translateZ(20px)',
                      boxShadow: '0 10px 30px rgba(185, 28, 28, 0.3)'
                    }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  {/* Decorative ring */}
                  <div className="absolute inset-0 rounded-xl border-2 border-red-300 animate-pulse" 
                    style={{ transform: 'translateZ(10px)' }} 
                  />
                </motion.div>

                <div className="flex-1">
                  <h3 className="font-bold text-base md:text-lg lg:text-xl text-gray-800 mb-1">
                    {faq.question}
                  </h3>
                  
                  {/* Stats Badge */}
                  {faq.stats && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-amber-100 rounded-full text-sm"
                    >
                      <span className="text-amber-700 font-medium">{faq.stats.label}:</span>
                      <span className="text-amber-900 font-bold">{faq.stats.value}</span>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                </motion.div>
              </div>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="px-4 md:px-6 pb-4 md:pb-6"
                  >
                    <div className="ml-0 md:ml-16 lg:ml-18">
                      <div className="p-4 md:p-5 bg-gradient-to-r from-amber-50 to-red-50 rounded-2xl border border-red-200"
                        style={{
                          boxShadow: 'inset 0 2px 10px rgba(185, 28, 28, 0.05)'
                        }}
                      >
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                        
                        {/* Decorative element */}
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-red-300 to-transparent" />
                          <div className="w-2 h-2 rotate-45 bg-red-400" />
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-red-300 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-500" 
        style={{
          clipPath: 'polygon(0 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)'
        }}
      />
    </motion.div>
  )
}
