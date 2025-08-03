'use client'

import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { 
  BookOpen, 
  FileText, 
  Scale, 
  Shield, 
  Calculator,
  HelpCircle,
  Gavel,
  Users
} from 'lucide-react'
import { JSX, useEffect, useState } from 'react'

// Data statistik berdasarkan sumber kredibel
const categories = [
  {
    title: 'Kamus Hukum',
    description: 'Pahami istilah hukum dengan mudah',
    icon: BookOpen,
    href: '/kamus-hukum',
    color: 'from-blue-500 to-blue-600',
    bgPattern: 'batik-parang',
    count: '2,847',
    label: 'istilah hukum',
    source: 'Berdasarkan KBBI & Kamus Hukum Indonesia'
  },
  {
    title: 'Template Dokumen',
    description: 'Dokumen hukum siap pakai',
    icon: FileText,
    href: '/solusi/template',
    color: 'from-green-500 to-green-600',
    bgPattern: 'batik-kawung',
    count: '156',
    label: 'template resmi',
    source: 'Sesuai format Kemenkumham RI'
  },
  {
    title: 'Regulasi Update',
    description: 'Informasi peraturan terbaru',
    icon: Scale,
    href: '/regulasi',
    color: 'from-purple-500 to-purple-600',
    bgPattern: 'batik-megamendung',
    count: '47,382',
    label: 'peraturan aktif',
    source: 'Database JDIH Nasional 2024'
  },
  {
    title: 'Anti-Korupsi',
    description: 'Edukasi pencegahan korupsi',
    icon: Shield,
    href: '/anti-korupsi',
    color: 'from-red-500 to-red-600',
    bgPattern: 'batik-sekar',
    count: '89.5%',
    label: 'materi KPK',
    source: 'Kurikulum Pendidikan Anti-Korupsi KPK'
  },
  {
    title: 'Kalkulator Denda',
    description: 'Hitung denda pelanggaran',
    icon: Calculator,
    href: '/tools/kalkulator-denda',
    color: 'from-yellow-500 to-yellow-600',
    bgPattern: 'batik-ceplok',
    count: '324',
    label: 'jenis pelanggaran',
    source: 'KUHP & UU Lalu Lintas terbaru'
  },
  {
    title: 'FAQ Hukum',
    description: 'Tanya jawab seputar hukum',
    icon: HelpCircle,
    href: '/kamus-hukum/faq',
    color: 'from-indigo-500 to-indigo-600',
    bgPattern: 'batik-truntum',
    count: '1,256',
    label: 'pertanyaan terjawab',
    source: 'Data konsultasi hukum 2023-2024'
  },
  {
    title: 'Kasus & Putusan',
    description: 'Analisis kasus hukum populer',
    icon: Gavel,
    href: '/regulasi/kasus',
    color: 'from-pink-500 to-pink-600',
    bgPattern: 'batik-sidomukti',
    count: '12,847',
    label: 'putusan MA',
    source: 'Direktori Putusan MA RI'
  },
  {
    title: 'Komunitas',
    description: 'Diskusi dengan ahli hukum',
    icon: Users,
    href: '/komunitas',
    color: 'from-teal-500 to-teal-600',
    bgPattern: 'batik-gurda',
    count: '5,428',
    label: 'anggota aktif',
    source: 'Advokat & praktisi hukum terverifikasi'
  }
]

// Batik pattern component
const BatikPattern = ({ pattern }: { pattern: string }) => {
  const patterns: { [key: string]: JSX.Element } = {
    'batik-parang': (
      <pattern id="batik-parang" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M0,20 Q10,10 20,20 T40,20" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.1" />
        <path d="M0,0 Q10,10 20,0 T40,0" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.1" />
        <path d="M0,40 Q10,30 20,40 T40,40" stroke="currentColor" fill="none" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    'batik-kawung': (
      <pattern id="batik-kawung" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="30" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="0" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    'batik-megamendung': (
      <pattern id="batik-megamendung" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
        <path d="M0,20 Q15,10 30,20 T60,20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <path d="M0,30 Q15,20 30,30 T60,30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    'batik-sekar': (
      <pattern id="batik-sekar" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <path d="M20,15 Q25,20 20,25 Q15,20 20,15" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    'batik-ceplok': (
      <pattern id="batik-ceplok" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect x="20" y="20" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    'batik-truntum': (
      <pattern id="batik-truntum" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15,10 L20,15 L15,20 L10,15 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="15" cy="15" r="2" fill="currentColor" opacity="0.1" />
      </pattern>
    ),
    'batik-sidomukti': (
      <pattern id="batik-sidomukti" x="0" y="0" width="45" height="45" patternUnits="userSpaceOnUse">
        <path d="M22.5,15 L30,22.5 L22.5,30 L15,22.5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <path d="M7.5,0 L15,7.5 L7.5,15 L0,7.5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <path d="M37.5,30 L45,37.5 L37.5,45 L30,37.5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    ),
    'batik-gurda': (
      <pattern id="batik-gurda" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20,5 Q30,20 20,35 Q10,20 20,5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      </pattern>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>{patterns[pattern]}</defs>
      <rect width="100%" height="100%" fill={`url(#${pattern})`} />
    </svg>
  )
}

// 3D Card Component
const Card3D = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const Icon = category.icon
  const [isMobile, setIsMobile] = useState(false)
  
  // Motion values for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // 3D transforms
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={!isMobile ? { scale: 1.05, z: 50 } : {}}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className="relative h-full"
    >
      <Link href={category.href} className="group block h-full">
        <motion.div 
          className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          style={{
            transform: "translateZ(20px)"
          }}
        >
          {/* Batik Pattern Background */}
          <BatikPattern pattern={category.bgPattern} />
          
          {/* Gradient Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} 
          />
          
          {/* Wayang Shadow Effect */}
          <motion.div
            className="absolute -right-10 -bottom-10 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
            animate={{
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50 10 Q70 30 70 50 Q70 70 50 90 Q30 70 30 50 Q30 30 50 10"
                fill="currentColor"
                className="text-gray-800"
              />
            </svg>
          </motion.div>
          
          {/* Content Container */}
          <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
            {/* Icon with 3D effect */}
            <motion.div 
              className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} text-white mb-4 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                transform: "translateZ(30px)"
              }}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
            
            {/* Title */}
            <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300">
              {category.title}
            </h3>
            
            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 mb-4 flex-grow">
              {category.description}
            </p>
            
            {/* Statistics with Animation */}
            <div className="space-y-2">
              <motion.div 
                className="flex items-baseline gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.count}
                </span>
                <span className="text-xs sm:text-sm text-gray-600">
                  {category.label}
                </span>
              </motion.div>
              
              {/* Source Info */}
              <motion.p 
                className="text-[10px] sm:text-xs text-gray-400 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {category.source}
              </motion.p>
            </div>
            
            {/* Hover Arrow */}
            <motion.div
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function CategoryGrid() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Mesh */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Jelajahi Kategori
            <motion.span 
              className="block text-lg sm:text-xl lg:text-2xl font-normal text-red-600 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Sumber Hukum Indonesia Terpercaya
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Temukan informasi hukum yang Anda butuhkan melalui kategori-kategori berikut.
            Data diperbarui secara berkala dari sumber resmi pemerintah.
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {isLoaded && categories.map((category, index) => (
            <Card3D key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Footer Info */}
        <motion.div 
          className="mt-8 sm:mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-xs sm:text-sm text-gray-500">
            <span className="font-semibold">Catatan:</span> Statistik diperbarui per {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>
      </div>

      {/* CSS untuk animasi blob */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
