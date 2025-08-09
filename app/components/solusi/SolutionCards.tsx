'use client'

import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { FileText, Download, Users, BookOpen, TrendingUp, Award, Clock, Shield } from 'lucide-react'
import SolutionGrid, { type SolutionGroup } from '@/app/components/solusi/SolutionGrid'
import { useEffect } from 'react'

const groups: SolutionGroup[] = [
  {
    category: 'Template Dokumen Hukum',
    icon: FileText,
    color: 'bg-gradient-to-br from-red-500 to-red-600',
    bgColor: 'bg-gradient-to-br from-red-50 to-amber-50',
    items: [
      {
        title: 'Surat Pernyataan',
        description: 'Template resmi untuk berbagai jenis surat pernyataan sesuai format standar',
        href: '/solusi/template/surat-pernyataan',
      },
      {
        title: 'Surat Kuasa',
        description: 'Format baku surat kuasa sesuai KUHPerdata untuk berbagai keperluan',
        href: '/solusi/template/surat-kuasa',
      },
      {
        title: 'Perjanjian Kerja',
        description: 'Template kontrak kerja sesuai UU Ketenagakerjaan yang berlaku',
        href: '/solusi/template/perjanjian-kerja',
      }
    ]
  },
  {
    category: 'Panduan Hukum Praktis',
    icon: BookOpen,
    color: 'bg-gradient-to-br from-amber-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-yellow-50',
    items: [
      {
        title: 'Mengurus Dokumen Hilang',
        description: 'Panduan lengkap prosedur pelaporan dan pengurusan dokumen pengganti',
        href: '/solusi/panduan/dokumen-hilang',
      },
      {
        title: 'Prosedur Pelaporan',
        description: 'Langkah-langkah membuat laporan ke kepolisian sesuai SOP',
        href: '/solusi/panduan/laporan-polisi',
      },
      {
        title: 'Gugatan Sederhana',
        description: 'Panduan mengajukan gugatan sederhana sesuai Perma terbaru',
        href: '/solusi/panduan/gugatan-sederhana',
      }
    ]
  },
  {
    category: 'Layanan Bantuan Hukum',
    icon: Users,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    items: [
      {
        title: 'Forum Diskusi',
        description: 'Komunitas diskusi hukum dengan moderasi profesional',
        href: '/forum',
      },
      {
        title: 'Konsultasi Online',
        description: 'Layanan konsultasi dengan praktisi hukum berpengalaman',
        href: '/konsultasi',
      },
      {
        title: 'Webinar Edukasi',
        description: 'Program edukasi hukum berkala untuk masyarakat umum',
        href: '/webinar',
      }
    ]
  }
]

export default function SolutionCards() {
  const controls = useAnimation()

  useEffect(() => {
    const animateWayang = async () => {
      await controls.start({
        rotate: [0, 5, -5, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      })
    }
    animateWayang()
  }, [controls])

  return (
    <div className="space-y-12">
      {/* Enhanced Solution Grid with 3D effects */}
      <div className="relative">
        {/* Wayang Kulit decoration */}
        <motion.div 
          className="absolute -top-8 right-0 w-32 h-32 opacity-10"
          animate={controls}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="wayangGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c2d12" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>
            </defs>
            <path d="M50 10 Q30 30 20 50 Q30 70 50 90 Q70 70 80 50 Q70 30 50 10" fill="url(#wayangGrad)" />
            <circle cx="50" cy="50" r="8" fill="#f59e0b" />
            <path d="M40 40 Q50 35 60 40 M40 60 Q50 65 60 60" stroke="#431407" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>

        <SolutionGrid groups={groups} />
      </div>

      {/* Information Banner with Megamendung Pattern */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 50%, #dc2626 100%)',
          transform: 'perspective(1000px) rotateX(2deg)',
        }}
      >
        {/* Megamendung cloud pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 400 200" className="w-full h-full">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="white" opacity="0.3" />
            <path d="M0,120 Q100,70 200,120 T400,120 L400,200 L0,200 Z" fill="white" opacity="0.2" />
            <path d="M0,140 Q100,90 200,140 T400,140 L400,200 L0,200 Z" fill="white" opacity="0.1" />
          </svg>
        </div>

        <div className="relative z-10 text-white">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <StatCard icon={Download} value="Ribuan" label="Template Tersedia" />
            <StatCard icon={Award} value="Gratis" label="Akses Penuh" />
            <StatCard icon={Clock} value="24/7" label="Dapat Diakses" />
            <StatCard icon={Shield} value="Aman" label="& Terpercaya" />
          </div>

          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Panduan Hukum Lengkap Indonesia
            </h3>
            <p className="mb-6 text-white/90 max-w-2xl mx-auto">
              Kumpulan lengkap template dokumen, panduan praktis, dan informasi hukum yang dapat membantu menyelesaikan permasalahan hukum Anda
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/panduan"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-red-600 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-xl"
              >
                <BookOpen className="h-5 w-5" />
                Jelajahi Panduan Lengkap
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 3D floating badges dengan motif Indonesia */}
        <motion.div 
          className="absolute -top-6 -left-6 w-24 h-24"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-50" />
            <div className="relative bg-yellow-400 rounded-full w-full h-full flex items-center justify-center shadow-lg">
              <span className="text-yellow-900 font-bold text-xs">GRATIS</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -bottom-6 -right-6 w-28 h-28"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50" />
            <div className="relative bg-green-400 rounded-full w-full h-full flex items-center justify-center shadow-lg">
              <span className="text-green-900 font-bold text-xs">TERPERCAYA</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Trust Indicators dengan ornamen Nusantara */}
      <div className="grid md:grid-cols-3 gap-6">
        <TrustCard 
          title="Template Terverifikasi"
          description="Semua template dokumen telah disesuaikan dengan format standar yang berlaku"
          icon="📜"
          pattern="batik"
        />
        <TrustCard 
          title="Panduan Terkini"
          description="Informasi dan panduan selalu diperbarui mengikuti peraturan terbaru"
          icon="📚"
          pattern="songket"
        />
        <TrustCard 
          title="Akses Selamanya"
          description="Komitmen kami menyediakan akses informasi hukum untuk semua"
          icon="🤝"
          pattern="tenun"
        />
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <motion.div 
      className="text-center"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="mx-auto mb-3 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="h-8 w-8 text-white" />
      </motion.div>
      <div className="text-3xl md:text-4xl font-bold mb-1">{value}</div>
      <div className="text-sm md:text-base opacity-90">{label}</div>
    </motion.div>
  )
}

function TrustCard({ title, description, icon, pattern }: { 
  title: string; 
  description: string; 
  icon: string;
  pattern: 'batik' | 'songket' | 'tenun';
}) {
  const patterns = {
    batik: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3Cpath d='M10 10 L30 30 M30 10 L10 30' stroke='%23dc2626' stroke-opacity='0.05' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
    songket: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.03'%3E%3Crect x='10' y='10' width='20' height='20'/%3E%3Cpath d='M0 20 L40 20 M20 0 L20 40' stroke='%23f59e0b' stroke-opacity='0.05' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
    tenun: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2316a34a' fill-opacity='0.03'%3E%3Cpath d='M0 20 Q10 10 20 20 T40 20 M0 0 Q10 10 20 0 T40 0 M0 40 Q10 30 20 40 T40 40' stroke='%2316a34a' stroke-opacity='0.05' stroke-width='1' fill='none'/%3E%3C/g%3E%3C/svg%3E")`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all overflow-hidden"
      style={{
        backgroundImage: patterns[pattern],
        backgroundSize: '40px 40px',
        transform: 'perspective(1000px) rotateX(1deg)',
      }}
    >
      <motion.div 
        className="text-4xl mb-4"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <h4 className="font-bold text-lg mb-2 text-gray-800">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
      
      {/* 3D shadow effect */}
      <div 
        className="absolute -bottom-2 -right-2 w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl -z-10"
        style={{
          transform: 'translateZ(-10px)',
          filter: 'blur(8px)',
          opacity: 0.3
        }}
      />
    </motion.div>
  )
}
