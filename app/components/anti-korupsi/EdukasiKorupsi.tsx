'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, AlertCircle, CircleDollarSign, Handshake, FileText, Gavel, TrendingUp, Shield, Info, ChevronDown, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

// Data berdasarkan UU No. 31 Tahun 1999 jo. UU No. 20 Tahun 2001 tentang Tipikor
const jenisKorupsi = [
  {
    icon: CircleDollarSign,
    title: 'Korupsi Keuangan Negara',
    definition: 'Setiap orang yang secara melawan hukum melakukan perbuatan memperkaya diri sendiri atau orang lain atau suatu korporasi yang dapat merugikan keuangan negara atau perekonomian negara.',
    legalBasis: 'Pasal 2 UU No. 31/1999',
    maxPenalty: '20 tahun penjara & denda Rp 1 miliar',
    contoh: [
      'Mark up anggaran proyek pemerintah',
      'Penggelapan dana bantuan sosial (Bansos)',
      'Manipulasi pajak dan retribusi',
      'Penyalahgunaan APBN/APBD'
    ],
    realCase: 'Kasus korupsi e-KTP merugikan negara Rp 2,3 triliun',
    color: 'from-red-600 to-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    icon: Handshake,
    title: 'Suap-Menyuap',
    definition: 'Memberi atau menjanjikan sesuatu kepada pegawai negeri atau penyelenggara negara dengan maksud supaya berbuat atau tidak berbuat sesuatu dalam jabatannya.',
    legalBasis: 'Pasal 5 & 6 UU No. 20/2001',
    maxPenalty: '5-20 tahun penjara & denda Rp 250 juta - Rp 1 miliar',
    contoh: [
      'Suap untuk memenangkan tender proyek',
      'Suap pengurusan izin usaha',
      'Suap untuk menghindari sanksi hukum',
      'Suap dalam proses peradilan'
    ],
    realCase: 'Kasus suap izin Meikarta sebesar Rp 13 miliar',
    color: 'from-orange-600 to-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    icon: FileText,
    title: 'Gratifikasi',
    definition: 'Pemberian dalam arti luas meliputi uang, barang, rabat, komisi, pinjaman tanpa bunga, tiket perjalanan, fasilitas penginapan, dan fasilitas lainnya.',
    legalBasis: 'Pasal 12B UU No. 20/2001',
    maxPenalty: '4-20 tahun penjara & denda Rp 200 juta - Rp 1 miliar',
    contoh: [
      'Hadiah dari rekanan proyek',
      'Fasilitas mewah dari pihak swasta',
      'Parsel lebaran yang berlebihan',
      'Sponsor perjalanan dinas fiktif'
    ],
    realCase: 'Kasus gratifikasi pejabat Ditjen Pajak senilai Rp 48 miliar',
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    icon: Gavel,
    title: 'Penyalahgunaan Wewenang',
    definition: 'Pegawai negeri atau penyelenggara negara yang dengan maksud menguntungkan diri sendiri atau orang lain secara melawan hukum menyalahgunakan kewenangan.',
    legalBasis: 'Pasal 3 UU No. 31/1999',
    maxPenalty: '20 tahun penjara & denda Rp 1 miliar',
    contoh: [
      'Pengaturan tender untuk kroni',
      'Nepotisme dalam rekrutmen pegawai',
      'Kolusi dalam pengadaan barang/jasa',
      'Markup harga dalam proyek pemerintah'
    ],
    realCase: 'Kasus korupsi alat kesehatan COVID-19 merugikan negara Rp 300 miliar',
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
]

// Data dampak korupsi berdasarkan riset dan laporan resmi
const dampakKorupsi = [
  {
    title: 'Kerugian Negara',
    value: 'Rp 68.9 Triliun',
    source: 'Total kerugian negara akibat korupsi 2018-2023 (KPK)',
    icon: TrendingUp,
    trend: 'up'
  },
  {
    title: 'Hambatan Pembangunan',
    value: '23%',
    source: 'Anggaran pembangunan yang tidak tepat sasaran (BPK 2023)',
    icon: AlertCircle,
    trend: 'down'
  },
  {
    title: 'Ketimpangan Sosial',
    value: '0.381',
    source: 'Indeks Gini Ratio Indonesia 2023 (BPS)',
    icon: Users,
    trend: 'stable'
  },
  {
    title: 'Kepercayaan Publik',
    value: '42%',
    source: 'Tingkat kepercayaan publik terhadap pemerintah (LSI 2023)',
    icon: Shield,
    trend: 'down'
  }
]

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
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
          scale: 1.02
        } : {
          rotateY: 0,
          rotateX: 0,
          scale: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Expandable Info Card
const ExpandableKorupsiCard = ({ jenis, index }: { 
  jenis: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    definition: string;
    legalBasis: string;
    maxPenalty: string;
    contoh: string[];
    realCase: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }; 
  index: number; 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <Card3D delay={index * 0.1}>
      <div className={`${jenis.bgColor} p-6 rounded-xl border-2 ${jenis.borderColor} relative overflow-hidden transition-all duration-300 ${
        isExpanded ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
      }`}>
        {/* 3D Background Pattern */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${jenis.color} opacity-5`}
          animate={{
            scale: isExpanded ? [1, 1.2, 1] : 1,
            rotate: isExpanded ? [0, 180, 360] : 0
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: index * 0.5
          }}
        />

        {/* Batik Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <pattern id={`batik-edukasi-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              {index % 2 === 0 ? (
                // Kawung Pattern
                <g>
                  <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="10" cy="10" r="4" fill="currentColor" opacity="0.5"/>
                </g>
              ) : (
                // Parang Pattern  
                <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              )}
            </pattern>
            <rect width="100" height="100" fill={`url(#batik-edukasi-${index})`} />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div 
              className="flex items-center"
              animate={{ 
                rotateZ: isExpanded ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              <jenis.icon className={`w-8 h-8 ${jenis.color.replace('from-', 'text-').replace(' to-red-700', '')} mr-3`} />
              <h4 className="text-lg md:text-xl font-bold text-gray-900">
                {jenis.title}
              </h4>
            </motion.div>
            
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </motion.button>
          </div>

          {/* Definition */}
          <p className="text-gray-700 mb-3 text-sm md:text-base">
            {jenis.definition}
          </p>

          {/* Legal Info */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full font-medium">
              {jenis.legalBasis}
            </span>
            <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full font-medium">
              Max: {jenis.maxPenalty}
            </span>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200">
                  {/* Examples */}
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Info className="w-4 h-4 mr-2" />
                      Contoh Kasus:
                    </h5>
                    <ul className="space-y-2">
                      {jenis.contoh.map((contoh: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start text-sm"
                        >
                          <span className="w-2 h-2 bg-gray-400 rounded-full mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{contoh}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Real Case */}
                  <motion.div 
                    className="bg-white/50 p-3 rounded-lg"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      💡 Kasus Nyata:
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {jenis.realCase}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card3D>
  )
}

export default function EdukasiKorupsi() {
  const [selectedDampak, setSelectedDampak] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Enhanced Batik Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="batik-mega-mendung" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
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
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-red-600"
                opacity="0.2"
                animate={!isMobile ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#batik-mega-mendung)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* 3D Icon */}
          <motion.div 
            className="flex justify-center mb-4"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="relative">
              <div className="bg-red-100 p-4 rounded-full relative z-10">
                <BookOpen className="w-12 h-12 text-red-600" />
              </div>
              {/* Shadow Effect */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-8 bg-black/10 blur-md rounded-full"
                animate={{ 
                  scaleX: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Edukasi Anti Korupsi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pahami jenis-jenis korupsi berdasarkan UU Tipikor dan dampaknya terhadap bangsa Indonesia
          </p>
        </motion.div>

        {/* Jenis Korupsi Section */}
        <div className="mb-16">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center"
          >
            <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
            Jenis-Jenis Tindak Pidana Korupsi
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jenisKorupsi.map((jenis, index) => (
              <ExpandableKorupsiCard key={index} jenis={jenis} index={index} />
            ))}
          </div>
        </div>

        {/* Dampak Korupsi Section with 3D Visualization */}
        <div className="mt-16">
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 flex items-center"
          >
            <TrendingUp className="w-8 h-8 text-red-600 mr-3" />
            Dampak Korupsi Terhadap Indonesia
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dampakKorupsi.map((dampak, index) => {
                const Icon = dampak.icon
                return (
                  <Card3D key={index} delay={index * 0.1}>
                    <motion.div
                      className={`bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200 cursor-pointer transition-all ${
                        selectedDampak === index ? 'ring-2 ring-red-500 shadow-xl' : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedDampak(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Icon className="w-8 h-8 text-red-600" />
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          dampak.trend === 'up' ? 'bg-red-100 text-red-600' :
                          dampak.trend === 'down' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {dampak.trend === 'up' ? '↑' : dampak.trend === 'down' ? '↓' : '→'}
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{dampak.title}</h4>
                      <p className="text-2xl font-bold text-red-600 mb-2">{dampak.value}</p>
                      <p className="text-xs text-gray-600">{dampak.source}</p>
                    </motion.div>
                  </Card3D>
                )
              })}
            </div>

            {/* 3D Visualization */}
            <Card3D>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200 h-full">
                <h4 className="text-xl font-bold text-gray-900 mb-6">
                  Mengapa Anti Korupsi Penting?
                </h4>
                
                {/* 3D Pancasila Shield */}
                <motion.div
                  className="relative mx-auto w-48 h-48 mb-6"
                  animate={{
                    rotateY: [0, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <motion.polygon
                      points="100,20 170,60 170,140 100,180 30,140 30,60"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="40"
                      fill="#DC2626"
                      opacity="0.2"
                      animate={{
                        r: [40, 50, 40]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity
                      }}
                    />
                    {/* Bintang Pancasila */}
                    <motion.path
                      d="M100,60 L110,85 L135,85 L115,100 L125,125 L100,110 L75,125 L85,100 L65,85 L90,85 Z"
                      fill="#FFD700"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 72, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity
                      }}
                      style={{ transformOrigin: "100px 100px" }}
                    />
                  </svg>
                </motion.div>

                <div className="space-y-3">
                  <p className="text-gray-700">
                    Korupsi merusak sendi-sendi kehidupan berbangsa dan bernegara:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Menghambat pembangunan infrastruktur vital',
                      'Menurunkan kualitas layanan publik',
                      'Meningkatkan kemiskinan dan ketimpangan',
                      'Merusak kepercayaan terhadap pemerintah'
                    ].map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start text-sm"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  className="mt-6 p-4 bg-white/80 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-sm font-semibold text-blue-800">
                    &ldquo;Korupsi adalah musuh bersama yang harus kita lawan untuk Indonesia yang lebih baik!&rdquo;
                  </p>
                </motion.div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  )
}
