'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Download, Users, BookOpen, ArrowRight } from 'lucide-react'
import { cn } from '@/app/lib/utils'

const solutions = [
  {
    category: 'Dokumen Hukum',
    icon: FileText,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    items: [
      {
        title: 'Surat Pernyataan',
        description: 'Template surat pernyataan untuk berbagai keperluan',
        href: '/solusi/template/surat-pernyataan'
      },
      {
        title: 'Surat Kuasa',
        description: 'Format surat kuasa yang sah secara hukum',
        href: '/solusi/template/surat-kuasa'
      },
      {
        title: 'Perjanjian Kerja',
        description: 'Contoh perjanjian kerja sesuai UU Ketenagakerjaan',
        href: '/solusi/template/perjanjian-kerja'
      }
    ]
  },
  {
    category: 'Panduan Praktis',
    icon: BookOpen,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    items: [
      {
        title: 'Mengurus Dokumen Hilang',
        description: 'Langkah-langkah mengurus dokumen penting yang hilang',
        href: '/solusi/panduan/dokumen-hilang'
      },
      {
        title: 'Pelaporan ke Polisi',
        description: 'Cara membuat laporan polisi yang efektif',
        href: '/solusi/panduan/laporan-polisi'
      },
      {
        title: 'Gugatan Sederhana',
        description: 'Panduan mengajukan gugatan sederhana di pengadilan',
        href: '/solusi/panduan/gugatan-sederhana'
      }
    ]
  },
  {
    category: 'Konsultasi',
    icon: Users,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    items: [
      {
        title: 'Forum Diskusi',
        description: 'Diskusi masalah hukum dengan komunitas',
        href: '/forum'
      },
      {
        title: 'Tanya Ahli',
        description: 'Konsultasi dengan praktisi hukum',
        href: '/konsultasi'
      },
      {
        title: 'Webinar Hukum',
        description: 'Ikuti webinar edukasi hukum gratis',
        href: '/webinar'
      }
    ]
  }
]

export default function SolutionCards() {
  return (
    <div className="space-y-8">
      {solutions.map((solution, index) => {
        const Icon = solution.icon
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`${solution.bgColor} rounded-2xl p-6 md:p-8`}
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 ${solution.color} rounded-xl flex items-center justify-center`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">{solution.category}</h3>
            </div>

            {/* Items Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {solution.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className="group bg-white rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    Selengkapnya
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-8 text-center"
      >
        <Download className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">
          Download E-Book Gratis
        </h3>
        <p className="mb-6 text-white/90">
          Kumpulan panduan hukum praktis dalam format e-book
        </p>
        <Link
          href="/download/ebook"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          Download Sekarang
          <Download className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  )
}
