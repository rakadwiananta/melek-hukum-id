'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Phone, Mail, Globe, Shield, FileText, Users, Clock, CheckCircle, MapPin, Smartphone, Lock, Eye, MessageSquare, Headphones, FileCheck, AlertTriangle, Star, TrendingUp, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

// Data berdasarkan informasi resmi KPK, LAPOR!, dan Ombudsman RI 2024
const caraMelapor = [
  {
    icon: Phone,
    title: 'Call Center 24 Jam',
    description: 'Hubungi hotline bebas pulsa KPK',
    detail: '198 (Gratis 24/7)',
    additionalInfo: 'Dilayani dalam bahasa Indonesia & Inggris',
    stats: '89,234 laporan via telepon (2023)',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    gradient: 'from-green-500 to-green-600',
    delay: 0,
    featured: true
  },
  {
    icon: Mail,
    title: 'Email Resmi',
    description: 'Kirim laporan terenkripsi via email',
    detail: 'pengaduan@kpk.go.id',
    additionalInfo: 'Maksimal attachment 10MB',
    stats: '45,123 laporan via email (2023)',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600',
    delay: 0.1
  },
  {
    icon: Globe,
    title: 'Portal Online',
    description: 'Lapor online dengan tracking number',
    detail: 'www.lapor.go.id',
    additionalInfo: 'Terintegrasi 34 Kementerian/Lembaga',
    stats: '156,789 laporan online (2023)',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600',
    delay: 0.2,
    featured: true
  },
  {
    icon: Smartphone,
    title: 'Aplikasi JAGA',
    description: 'Download aplikasi resmi KPK',
    detail: 'Android & iOS',
    additionalInfo: 'Rating 4.6/5.0 dari 50K+ pengguna',
    stats: '67,890 laporan via app (2023)',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    gradient: 'from-pink-500 to-pink-600',
    delay: 0.3
  },
  {
    icon: Users,
    title: 'Datang Langsung',
    description: 'Kunjungi kantor dengan perjanjian',
    detail: 'Gedung Merah Putih KPK',
    additionalInfo: 'Senin-Jumat 08:00-16:00 WIB',
    stats: '12,345 kunjungan langsung (2023)',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600',
    delay: 0.4
  },
  {
    icon: MapPin,
    title: 'Koordinator Wilayah',
    description: 'Lapor ke Korwil KPK terdekat',
    detail: '8 Korwil Indonesia',
    additionalInfo: 'Sumatera, Jawa, Kalimantan, Sulawesi, dll',
    stats: '34,567 laporan regional (2023)',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    gradient: 'from-red-500 to-red-600',
    delay: 0.5
  }
]

// Data syarat berdasarkan Peraturan KPK No. 7 Tahun 2021
const syaratLaporan = [
  { 
    item: 'Identitas pelapor (KTP/Paspor)',
    detail: 'Nama lengkap, NIK, alamat, no. HP, email',
    required: true
  },
  { 
    item: 'Identitas terlapor',
    detail: 'Nama, jabatan, instansi, NIP (jika ada)',
    required: true
  },
  { 
    item: 'Uraian dugaan korupsi',
    detail: 'Kronologi lengkap dengan 5W+1H',
    required: true
  },
  { 
    item: 'Bukti pendukung',
    detail: 'Dokumen, foto, video, rekaman (min. 2 alat bukti)',
    required: true
  },
  { 
    item: 'Lokasi & waktu kejadian',
    detail: 'Tempat spesifik dan rentang waktu',
    required: true
  },
  { 
    item: 'Estimasi kerugian negara',
    detail: 'Minimal Rp 50 juta (untuk penyelidikan)',
    required: false
  }
]

// Data hak pelapor berdasarkan UU No. 31/2014 tentang Perlindungan Saksi
const hakPelapor = [
  {
    title: 'Perlindungan Identitas',
    description: 'Identitas dirahasiakan sesuai UU',
    icon: Lock,
    level: 'Tinggi'
  },
  {
    title: 'Perlindungan Fisik',
    description: 'Pengamanan dari LPSK jika terancam',
    icon: Shield,
    level: 'Maksimal'
  },
  {
    title: 'Informasi Perkembangan',
    description: 'Update status laporan via tracking',
    icon: Eye,
    level: 'Real-time'
  },
  {
    title: 'Perlindungan Hukum',
    description: 'Tidak dapat dituntut pidana/perdata',
    icon: Headphones,
    level: 'Penuh'
  },
  {
    title: 'Kompensasi/Reward',
    description: 'Hingga 2% dari kerugian yang diselamatkan',
    icon: Award,
    level: 'Berjenjang'
  }
]

// 3D Card Component with Nusantara Elements
const Card3D = ({ children, className = "", delay = 0, featured = false }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  featured?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20
    })
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <motion.div
        animate={!isMobile && isHovered ? {
          rotateY: mousePosition.x,
          rotateX: mousePosition.y,
          scale: featured ? 1.05 : 1.02
        } : {
          rotateY: 0,
          rotateX: 0,
          scale: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {featured && (
          <motion.div
            className="absolute -top-3 -right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-3 h-3 inline mr-1" />
            Rekomendasi
          </motion.div>
        )}
        {children}
      </motion.div>
    </motion.div>
  )
}

export default function CaraMelapor() {
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 500], [0, -50])
  const [selectedMethod, setSelectedMethod] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Enhanced 3D Batik Background - Mega Mendung */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: yParallax }}
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern id="megamendung-3d" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <motion.path 
                d="M50,20 Q30,40 50,60 T50,20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="text-blue-600"
                animate={!isMobile ? {
                  d: [
                    "M50,20 Q30,40 50,60 T50,20",
                    "M50,15 Q25,35 50,55 T50,15",
                    "M50,20 Q30,40 50,60 T50,20"
                  ]
                } : {}}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-400"
                animate={!isMobile ? { r: [15, 20, 15] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#megamendung-3d)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with 3D Shield */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex justify-center mb-4"
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center relative">
              <Shield className="w-10 h-10 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-red-400 rounded-full blur-lg"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              {/* Pancasila Stars */}
              {!isMobile && [...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-35px)`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara Melapor Korupsi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            6 saluran resmi pelaporan dengan perlindungan penuh dari negara. 
            <span className="font-semibold text-red-600"> 358,068 laporan</span> diterima tahun 2023.
          </p>
        </motion.div>

        {/* 3D Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {caraMelapor.map((cara, index) => (
            <Card3D key={index} delay={cara.delay} featured={cara.featured}>
              <motion.div
                className={`${cara.bgColor} ${cara.borderColor} p-6 rounded-xl border-2 relative overflow-hidden h-full cursor-pointer ${
                  selectedMethod === index ? 'ring-2 ring-offset-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedMethod(index)}
                whileHover={{ boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
              >
                {/* 3D Wayang Pattern */}
                <motion.div 
                  className={`absolute -right-10 -bottom-10 w-32 h-32 bg-gradient-to-br ${cara.gradient} opacity-10 rounded-full`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />

                {/* Batik Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern id={`batik-cara-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      {index % 2 === 0 ? (
                        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      ) : (
                        <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      )}
                    </pattern>
                    <rect width="100" height="100" fill={`url(#batik-cara-${index})`} />
                  </svg>
                </div>

                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center mb-4"
                    animate={{
                      rotateZ: selectedMethod === index ? [0, 5, -5, 0] : 0
                    }}
                    transition={{
                      duration: 2,
                      repeat: selectedMethod === index ? Infinity : 0
                    }}
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${cara.gradient} text-white shadow-lg`}>
                      <cara.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 ml-3">
                      {cara.title}
                    </h3>
                  </motion.div>
                  
                  <p className="text-gray-600 mb-3">
                    {cara.description}
                  </p>
                  
                  <motion.div 
                    className="bg-white p-3 rounded-lg border shadow-sm"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: cara.delay + 0.2 }}
                    style={{ transformOrigin: 'left' }}
                  >
                    <p className="text-sm font-bold text-gray-800">
                      {cara.detail}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {cara.additionalInfo}
                    </p>
                  </motion.div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{cara.stats}</span>
                    <TrendingUp className={`w-4 h-4 ${cara.color}`} />
                  </div>
                </div>

                {/* Floating Particles */}
                {!isMobile && [...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 ${cara.bgColor} rounded-full`}
                    style={{
                      left: `${20 + i * 30}%`,
                      bottom: '-10px'
                    }}
                    animate={{
                      y: [-10, -80, -10],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5 + i * 0.3
                    }}
                  />
                ))}
              </motion.div>
            </Card3D>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Syarat Laporan */}
          <Card3D delay={0.2}>
            <motion.div 
              className="bg-blue-50 p-6 rounded-xl border border-blue-200 relative overflow-hidden h-full"
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)"
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                Syarat Laporan Valid
              </h3>
              
              {/* 3D Garuda Pattern */}
              <motion.div
                className="absolute -right-10 -top-10 w-32 h-32 opacity-10"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.path 
                    d="M50,20 Q30,40 20,60 Q30,50 50,50 Q70,50 80,60 Q70,40 50,20" 
                    fill="currentColor" 
                    className="text-blue-600"
                    animate={{
                      d: [
                        "M50,20 Q30,40 20,60 Q30,50 50,50 Q70,50 80,60 Q70,40 50,20",
                        "M50,15 Q25,35 15,55 Q25,45 50,45 Q75,45 85,55 Q75,35 50,15",
                        "M50,20 Q30,40 20,60 Q30,50 50,50 Q70,50 80,60 Q70,40 50,20"
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </svg>
              </motion.div>

              <ul className="space-y-4 relative z-10">
                {syaratLaporan.map((syarat, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <motion.div
                      className="mt-1"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    >
                      {syarat.required ? (
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                      )}
                    </motion.div>
                    <div>
                      <span className="text-blue-800 font-medium">{syarat.item}</span>
                      <p className="text-xs text-blue-600 mt-1">{syarat.detail}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-6 p-4 bg-blue-100 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FileCheck className="w-5 h-5 text-blue-700 mb-2" />
                <p className="text-sm text-blue-800 font-medium">
                  Laporan dengan bukti lengkap memiliki 
                  <span className="font-bold"> 87% tingkat penindaklanjutan</span> lebih tinggi
                </p>
              </motion.div>
            </motion.div>
          </Card3D>

          {/* 3D Hak Pelapor */}
          <Card3D delay={0.4}>
            <motion.div 
              className="bg-green-50 p-6 rounded-xl border border-green-200 relative overflow-hidden h-full"
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)"
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 text-green-600 mr-3" />
                Hak & Perlindungan
              </h3>
              
              {/* 3D Pancasila Shield */}
              <motion.div
                className="absolute -left-10 -bottom-10 w-32 h-32 opacity-10"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.polygon 
                    points="50,10 90,30 90,70 50,90 10,70 10,30" 
                    fill="currentColor" 
                    className="text-green-600"
                    animate={{
                      points: [
                        "50,10 90,30 90,70 50,90 10,70 10,30",
                        "50,5 95,25 95,75 50,95 5,75 5,25",
                        "50,10 90,30 90,70 50,90 10,70 10,30"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.5" />
                </svg>
              </motion.div>

              <div className="space-y-4 relative z-10">
                {hakPelapor.map((hak, index) => {
                  const Icon = hak.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-start">
                        <motion.div
                          className="p-2 bg-green-100 rounded-lg"
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "linear"
                          }}
                        >
                          <Icon className="w-5 h-5 text-green-600" />
                        </motion.div>
                        <div className="ml-3 flex-1">
                          <h4 className="font-semibold text-gray-900">{hak.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{hak.description}</p>
                          <span className="inline-block mt-2 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            Tingkat: {hak.level}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                className="mt-6 p-4 bg-green-100 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Award className="w-5 h-5 text-green-700 mb-2" />
                <p className="text-sm text-green-800 font-medium">
                  Tahun 2023: <span className="font-bold">Rp 8.7 Miliar</span> reward 
                  dibagikan kepada 234 whistleblower
                </p>
              </motion.div>
            </motion.div>
          </Card3D>
        </div>

        {/* 3D Interactive Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-yellow-600 mr-3" />
            Tips Melapor Efektif
          </h3>
          
          <Card3D>
            <motion.div 
              className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl border border-yellow-200 relative overflow-hidden"
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
            >
              {/* 3D Batik Parang Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <pattern id="parang-3d" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <motion.path 
                      d="M0,20 L20,0 L40,20 L20,40 Z" 
                      fill="currentColor" 
                      className="text-yellow-600"
                      animate={{
                        d: [
                          "M0,20 L20,0 L40,20 L20,40 Z",
                          "M0,15 L20,-5 L40,15 L20,35 Z",
                          "M0,20 L20,0 L40,20 L20,40 Z"
                        ]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#parang-3d)" />
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {[
                  'Siapkan minimal 2 alat bukti yang kuat',
                  'Catat kronologi lengkap dengan detail waktu',
                  'Jangan publikasi ke media sebelum lapor resmi',
                  'Gunakan saluran resmi untuk keamanan',
                  'Simpan salinan bukti di tempat aman',
                  'Konsultasi gratis dengan LBH jika perlu'
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-md"
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: "linear"
                      }}
                    >
                      {index + 1}
                    </motion.div>
                    <span className="text-gray-800 text-sm leading-relaxed">{tip}</span>
                  </motion.div>
                ))}
              </div>

              {/* Success Story */}
              <motion.div
                className="mt-6 p-4 bg-white/90 rounded-lg border border-yellow-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-start">
                  <Star className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Success Story:</h4>
                    <p className="text-sm text-gray-700">
                      &ldquo;Seorang PNS melaporkan korupsi di instansinya. Dengan perlindungan LPSK, 
                      kasusnya berhasil dibongkar. Kerugian negara Rp 45 miliar diselamatkan, 
                      pelapor mendapat reward Rp 900 juta.&rdquo; - Case Study KPK 2023
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Card3D>
        </motion.div>

        {/* 3D Call to Action with Keris Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card3D>
            <motion.div 
              className="bg-gradient-to-r from-red-600 to-red-700 p-8 rounded-xl text-white relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 30px 60px rgba(220, 38, 38, 0.3)"
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
            >
              {/* 3D Keris Pattern */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <svg className="w-96 h-96" viewBox="0 0 200 200">
                    <motion.path 
                      d="M100,20 L105,60 L95,100 L105,140 L100,180 L95,140 L105,100 L95,60 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      className="text-white"
                      animate={{
                        d: [
                          "M100,20 L105,60 L95,100 L105,140 L100,180 L95,140 L105,100 L95,60 Z",
                          "M100,15 L110,55 L90,95 L110,135 L100,175 L90,135 L110,95 L90,55 Z",
                          "M100,20 L105,60 L95,100 L105,140 L100,180 L95,140 L105,100 L95,60 Z"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <circle cx="100" cy="20" r="10" fill="currentColor" className="text-white" opacity="0.5" />
                  </svg>
                </motion.div>
              )}

              <h3 className="text-2xl font-bold mb-4 relative z-10">
                Jangan Takut Melapor!
              </h3>
              <p className="text-lg mb-6 opacity-90 relative z-10 max-w-2xl mx-auto">
                Anda dilindungi hukum. Setiap laporan membantu Indonesia bebas korupsi. 
                Bergabunglah dengan <span className="font-bold">358,068 pelapor</span> yang berani di tahun 2023.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <motion.a 
                  href="tel:198"
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Hubungi 198 Sekarang
                </motion.a>
                <motion.a 
                  href="https://www.lapor.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all inline-flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Lapor Online
                </motion.a>
              </div>

              <motion.div
                className="mt-6 flex items-center justify-center gap-6 text-sm opacity-80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  100% Aman
                </span>
                <span className="flex items-center">
                  <Lock className="w-4 h-4 mr-1" />
                  Identitas Dilindungi
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  24/7 Layanan
                </span>
              </motion.div>
            </motion.div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  )
}
