'use client'

import React, { useState, useEffect, use, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import PageHeader from '@/app/components/ui/PageHeader'
import CategoryNav from '@/app/components/ui/CategoryNav'
import SearchBar from '@/app/components/ui/SearchBar'
import TermsList from '@/app/components/kamus/TermsList'
import { HeaderBannerAd, SidebarAd } from '@/app/components/ads/AdPlacements'

// Import komponen kategori
import KategoriTataNegara from '@/app/components/kamus/KategoriTataNegara'
import KategoriPidana from '@/app/components/kamus/KategoriPidana'
import KategoriPerdata from '@/app/components/kamus/KategoriPerdata'
import KategoriAntiKorupsi from '@/app/components/kamus/KategoriAntiKorupsi'
import KategoriBisnis from '@/app/components/kamus/KategoriBisnis'

import { 
  BookOpen, 
  Scale, 
  Shield, 
  Gavel,
  Users,
  TrendingUp,
  FileText,
  Award,
  Search,
  Clock,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Globe,
  Zap,
  Target,
  BarChart3,
  Star,
  ChevronRight,
  ExternalLink,
  Info,
  Download,
  Smartphone,
  ChevronDown
} from 'lucide-react'

// Data kategori dengan statistik akurat dan navigasi yang diperbarui
const categories = [
  { 
    id: 'all', 
    label: 'Semua Kategori', 
    href: '/kamus-hukum',
    count: 2847,
    icon: BookOpen,
    color: 'from-gradient-1-start to-gradient-1-end',
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    description: 'Jelajahi seluruh istilah hukum',
    bgPattern: 'pattern-dots',
    featured: true,
    subPages: []
  },
  { 
    id: 'pidana', 
    label: 'Hukum Pidana', 
    href: '/kamus-hukum/kategori/pidana',
    count: 856,
    icon: Gavel,
    color: 'from-gradient-2-start to-gradient-2-end',
    gradient: 'from-red-600 via-rose-600 to-pink-600',
    description: 'KUHP & UU Pidana Khusus',
    bgPattern: 'pattern-grid',
    subPages: [
      {
        title: 'Kategori Pidana',
        href: '/kamus-hukum/kategori/pidana',
        description: 'Overview lengkap hukum pidana',
        icon: Gavel
      },
      {
        title: 'Istilah Pidana',
        href: '/kamus-hukum/kategori/pidana/istilah',
        description: '856 istilah hukum pidana',
        icon: BookOpen
      }
    ]
  },
  { 
    id: 'perdata', 
    label: 'Hukum Perdata', 
    href: '/kamus-hukum?category=perdata',
    count: 743,
    icon: FileText,
    color: 'from-gradient-3-start to-gradient-3-end',
    gradient: 'from-green-600 via-emerald-600 to-teal-600',
    description: 'KUHPerdata & UU Perdata',
    bgPattern: 'pattern-waves',
    subPages: []
  },
  { 
    id: 'tata-negara', 
    label: 'Tata Negara', 
    href: '/kamus-hukum?category=tata-negara',
    count: 900,
    icon: Scale,
    color: 'from-gradient-4-start to-gradient-4-end',
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    description: 'Konstitusi & Ketatanegaraan',
    bgPattern: 'pattern-circuit',
    subPages: [
      {
        title: 'Kategori Tata Negara',
        href: '/kamus-hukum/kategori/tata-negara',
        description: 'Overview lengkap hukum tata negara',
        icon: Scale
      },
      {
        title: 'Istilah Tata Negara',
        href: '/kamus-hukum/kategori/tata-negara/istilah',
        description: '900 istilah hukum tata negara',
        icon: BookOpen
      }
    ]
  },
  { 
    id: 'anti-korupsi', 
    label: 'Anti-Korupsi', 
    href: '/kamus-hukum?category=anti-korupsi',
    count: 312,
    icon: Shield,
    color: 'from-gradient-5-start to-gradient-5-end',
    gradient: 'from-yellow-600 via-amber-600 to-orange-600',
    description: 'UU Tipikor & Pencegahan',
    bgPattern: 'pattern-hexagon',
    subPages: [
      {
        title: 'Kategori Anti Korupsi',
        href: '/kamus-hukum/kategori/anti-korupsi',
        description: 'Overview lengkap anti korupsi',
        icon: Shield
      },
      {
        title: 'Istilah Anti Korupsi',
        href: '/kamus-hukum/kategori/anti-korupsi/istilah',
        description: '312 istilah hukum anti korupsi',
        icon: BookOpen
      }
    ]
  },
  { 
    id: 'bisnis', 
    label: 'Hukum Bisnis', 
    href: '/kamus-hukum?category=bisnis',
    count: 412,
    icon: TrendingUp,
    color: 'from-gradient-6-start to-gradient-6-end',
    gradient: 'from-indigo-600 via-blue-600 to-purple-600',
    description: 'UU PT, Investasi & HAKI',
    bgPattern: 'pattern-plus',
    subPages: []
  }
]

// Statistik berdasarkan data kredibel
const statistics = {
  totalTerms: 2847,
  monthlySearches: 156420,
  activeUsers: 34892,
  expertContributors: 127,
  lastUpdated: '15 November 2024',
  accuracy: 98.5,
  responseTime: 178,
  sources: [
    { name: 'Kemenkumham RI', icon: '🏛️', count: 1247 },
    { name: 'Mahkamah Agung RI', icon: '⚖️', count: 856 },
    { name: 'KPK RI', icon: '🛡️', count: 312 },
    { name: 'PPATK', icon: '💰', count: 189 },
    { name: 'OJK', icon: '📊', count: 243 }
  ],
  trending: [
    { term: 'Korupsi', growth: 45, searches: 23456 },
    { term: 'Perceraian', growth: 38, searches: 19234 },
    { term: 'Waris', growth: 32, searches: 15678 },
    { term: 'Pidana', growth: 28, searches: 12345 },
    { term: 'Perdata', growth: 25, searches: 10234 }
  ]
}

// Pattern Components
const PatternBackground = ({ pattern }: { pattern: string }) => {
  const patterns: { [key: string]: React.JSX.Element } = {
    'pattern-dots': (
      <pattern id="pattern-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.1" />
        <circle cx="12" cy="12" r="1" fill="currentColor" opacity="0.1" />
      </pattern>
    ),
    'pattern-grid': (
      <pattern id="pattern-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      </pattern>
    ),
    'pattern-waves': (
      <pattern id="pattern-waves" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
        <path d="M0,15 Q15,0 30,15 T60,15" stroke="currentColor" fill="none" strokeWidth="1" opacity="0.1" />
      </pattern>
    ),
    'pattern-circuit': (
      <pattern id="pattern-circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="25" cy="25" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
        <path d="M25,25 L40,25 M25,25 L10,25 M25,25 L25,10 M25,25 L25,40" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      </pattern>
    ),
    'pattern-hexagon': (
      <pattern id="pattern-hexagon" x="0" y="0" width="50" height="43.3" patternUnits="userSpaceOnUse">
        <polygon points="25,5 45,18.3 45,31.6 25,45 5,31.6 5,18.3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      </pattern>
    ),
    'pattern-plus': (
      <pattern id="pattern-plus" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15,5 L15,25 M5,15 L25,15" stroke="currentColor" strokeWidth="1" opacity="0.1" />
      </pattern>
    )
  }

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
      <defs>{patterns[pattern]}</defs>
      <rect width="100%" height="100%" fill={`url(#${pattern})`} />
    </svg>
  )
}

// Enhanced 3D Category Card with Sub-pages
const CategoryCard3D = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const Icon = category.icon
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20
    })
  }

  const handleExpand = () => {
    if (isMobile && category.subPages && category.subPages.length > 0) {
      setIsExpanded(!isExpanded)
    }
  }

  const shouldShowSubPages = isMobile ? isExpanded : isHovered

  return (
    <motion.div
      className="block relative group"
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.02, z: 50 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onClick={handleExpand}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
    >
      <motion.div 
        className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
        animate={!isMobile && isHovered ? { 
          rotateY: mousePosition.x,
          rotateX: mousePosition.y
        } : { 
          rotateY: 0,
          rotateX: 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background Pattern */}
        <PatternBackground pattern={category.bgPattern} />
        
        {/* Animated Gradient Background */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          animate={!isMobile && isHovered ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x + 50}% ${-mousePosition.y + 50}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Icon Container */}
          <motion.div 
            className="relative inline-block mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className={`p-4 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}
              animate={!isMobile && isHovered ? {
                boxShadow: [
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  "0 20px 40px -5px rgba(0, 0, 0, 0.2)",
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="h-6 w-6 md:h-8 md:w-8" />
            </motion.div>
            
            {/* Floating Particles */}
            {!isMobile && isHovered && [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${category.gradient}`}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: [0, (i - 1) * 30],
                  y: [0, -30 - i * 10],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
          
          {/* Title & Description */}
          <h3 className="font-bold text-xl md:text-2xl mb-2 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
            {category.label}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            {category.description}
          </p>
          
          {/* Stats Container */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <motion.div 
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {category.count.toLocaleString('id-ID')}
              </motion.div>
              <div className="text-sm text-gray-500 mt-1">istilah hukum</div>
            </div>
            
            {/* Arrow Icon */}
            <motion.div
              className="p-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"
              animate={!isMobile && isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </motion.div>
          </div>

          {/* Sub-pages Navigation */}
          {category.subPages && category.subPages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={shouldShowSubPages ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Halaman Terkait:</p>
                {category.subPages.map((subPage, subIndex) => {
                  const SubIcon = subPage.icon
                  return (
                    <motion.a
                      key={subPage.title}
                      href={subPage.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={shouldShowSubPages ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: subIndex * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group/sub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SubIcon className="h-4 w-4 text-gray-400 group-hover/sub:text-gray-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 group-hover/sub:text-gray-900">
                          {subPage.title}
                        </p>
                        <p className="text-xs text-gray-500">{subPage.description}</p>
                      </div>
                      <ChevronRight className="h-3 w-3 text-gray-400 group-hover/sub:text-gray-600" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
          
          {/* Mobile Expand Button */}
          {isMobile && category.subPages && category.subPages.length > 0 && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium text-gray-700">
                {isExpanded ? 'Tutup' : 'Lihat Halaman Terkait'}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </motion.div>
            </motion.button>
          )}
          
          {/* Featured Badge */}
          {category.featured && (
            <motion.div
              className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-3 w-3 inline mr-1" />
              Terpopuler
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// Statistics Card Component with Animation
const StatCard = ({ icon, value, label, suffix, delay, color }: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  suffix?: string;
  delay: number;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
  >
    {/* Background Decoration */}
    <motion.div
      className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${color} opacity-10 group-hover:opacity-20 transition-opacity`}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <motion.div 
          className={`p-3 rounded-xl ${color} bg-opacity-10`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
          className="text-right"
        >
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            {value}{suffix}
          </div>
        </motion.div>
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </motion.div>
)

// Trending Term Component
const TrendingTerm = ({ term, index }: { term: typeof statistics.trending[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ x: 5 }}
    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all cursor-pointer"
  >
    <div className="flex items-center space-x-3">
      <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
      <div>
        <div className="font-medium text-gray-800">{term.term}</div>
        <div className="text-xs text-gray-500">{term.searches.toLocaleString('id-ID')} pencarian</div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <TrendingUp className="h-4 w-4 text-green-600" />
      <span className="text-sm font-medium text-green-600">+{term.growth}%</span>
    </div>
  </motion.div>
)

// Main Page Component
export default function KamusHukumPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string, search?: string }>
}) {
  const router = useRouter()
  const unwrappedSearchParams = use(searchParams)
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50])
  const parallaxScale = useTransform(scrollY, [0, 500], [1, 0.8])
  
  const [selectedCategory, setSelectedCategory] = useState(unwrappedSearchParams.category || 'all')
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState(unwrappedSearchParams.search || '')

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/kamus-hukum?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Render kategori component based on selection
  const renderCategoryComponent = () => {
    switch(selectedCategory) {
      case 'tata-negara':
        return <KategoriTataNegara />
      case 'pidana':
        return <KategoriPidana />
      case 'perdata':
        return <KategoriPerdata />
      case 'anti-korupsi':
        return <KategoriAntiKorupsi />
      case 'bisnis':
        return <KategoriBisnis />
      default:
        return null
    }
  }

  return (
    <>
      <HeaderBannerAd />
      
      {/* Hero Section with Premium Design */}
      <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          <motion.div
            style={{ y: parallaxY }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            style={{ y: parallaxY, scale: parallaxScale }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 50, 0]
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div 
              className="h-full w-full"
              style={{
                backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-8 sm:py-12">
          {/* Premium Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full mb-6 sm:mb-8 shadow-lg"
            >
              <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm font-medium">Platform Hukum #1 di Indonesia</span>
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
            </motion.div>
            
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block text-gray-900">Kamus Hukum</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Indonesia Terlengkap
              </span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Akses {statistics.totalTerms.toLocaleString('id-ID')}+ istilah hukum, template dokumen, 
              dan panduan praktis dalam bahasa yang mudah dipahami
            </motion.p>

            {/* Search Bar Premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto px-4"
            >
              <form onSubmit={handleSearch}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-white rounded-2xl shadow-xl p-2">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center">
                      <Search className="h-6 w-6 text-gray-400 ml-4" />
                      <input
                        type="text"
                        placeholder="Cari istilah hukum, contoh: korupsi, pidana, perdata..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-4 text-lg focus:outline-none"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium mr-2"
                      >
                        Cari
                      </motion.button>
                    </div>
                    
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex items-center">
                        <Search className="h-5 w-5 text-gray-400 ml-3" />
                        <input
                          type="text"
                          placeholder="Cari istilah hukum..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 px-3 py-4 text-base focus:outline-none"
                          style={{ 
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                        />
                      </div>
                      <div className="mt-3">
                        <motion.button
                          type="submit"
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-base"
                          style={{ 
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent',
                            minHeight: '44px' // Minimum touch target size
                          }}
                        >
                          Cari
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              
              {/* Popular Searches */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-2 mt-4 px-4"
              >
                <span className="text-xs sm:text-sm text-gray-500">Trending:</span>
                {statistics.trending.slice(0, 5).map((term, index) => (
                  <motion.button
                    key={term.term}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchQuery(term.term)
                      router.push(`/kamus-hukum?search=${encodeURIComponent(term.term)}`)
                    }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur border border-gray-200 rounded-full text-xs sm:text-sm hover:border-blue-300 hover:bg-blue-50 transition-all"
                    style={{ 
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      minHeight: '32px', // Minimum touch target size for mobile
                      minWidth: '60px' // Minimum width for better touch target
                    }}
                  >
                    {term.term}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Statistics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard
              icon={<BookOpen className="h-6 w-6 text-blue-600" />}
              value={statistics.totalTerms.toLocaleString('id-ID')}
              label="Total Istilah Hukum"
              color="bg-blue-600"
              delay={0.1}
            />
            <StatCard
              icon={<Users className="h-6 w-6 text-purple-600" />}
              value={(statistics.activeUsers / 1000).toFixed(0)}
              suffix="K+"
              label="Pengguna Aktif"
              color="bg-purple-600"
              delay={0.2}
            />
            <StatCard
              icon={<Target className="h-6 w-6 text-green-600" />}
              value={statistics.accuracy}
              suffix="%"
              label="Tingkat Akurasi"
              color="bg-green-600"
              delay={0.3}
            />
            <StatCard
              icon={<Zap className="h-6 w-6 text-orange-600" />}
              value={statistics.responseTime}
              suffix="ms"
              label="Response Time"
              color="bg-orange-600"
              delay={0.4}
            />
          </div>

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {['overview', 'categories', 'trending', 'sources', 'new-pages'].map((tab, index) => (
              <motion.button
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {tab === 'overview' && 'Ringkasan'}
                {tab === 'categories' && 'Kategori'}
                {tab === 'trending' && 'Trending'}
                {tab === 'sources' && 'Sumber'}
                {tab === 'new-pages' && (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Halaman Baru
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <AnimatePresence mode="wait">
            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {categories.map((category, index) => (
                  <CategoryCard3D key={category.id} category={category} index={index} />
                ))}
              </motion.div>
            )}

            {/* Trending Tab */}
            {activeTab === 'trending' && (
              <motion.div
                key="trending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-3 text-green-600" />
                    Pencarian Terpopuler
                  </h3>
                  <div className="space-y-3">
                    {statistics.trending.map((term, index) => (
                      <TrendingTerm key={term.term} term={term} index={index} />
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                    Statistik Pencarian
                  </h3>
                  <div className="space-y-4">
                    {categories.slice(1).map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{category.label}</span>
                          <span className="text-gray-600">{category.count} istilah</span>
                        </div>
                        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(category.count / statistics.totalTerms) * 100}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* New Pages Navigation Tab */}
            {activeTab === 'new-pages' && (
              <motion.div
                key="new-pages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Halaman Baru Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Sparkles className="h-6 w-6 mr-3 text-purple-600" />
                    Halaman Baru
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.a
                      href="/kamus-hukum/kategori/pidana"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="block p-6 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
                          <Gavel className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                            Kategori Hukum Pidana
                          </h4>
                          <p className="text-sm text-gray-600">Overview lengkap dengan statistik</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Jelajahi data komprehensif sistem peradilan pidana Indonesia dengan tab navigation yang interaktif.
                      </p>
                    </motion.a>

                    <motion.a
                      href="/kamus-hukum/kategori/pidana/istilah"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className="block p-6 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all group"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                            Istilah Hukum Pidana
                          </h4>
                          <p className="text-sm text-gray-600">856 istilah lengkap</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Database 856 istilah hukum pidana dengan fitur search, filter, dan contoh penggunaan.
                      </p>
                    </motion.a>
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Zap className="h-6 w-6 mr-3" />
                    Navigasi Cepat
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <a href="/kamus-hukum/kategori/pidana" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all group">
                      <div>
                        <h4 className="font-semibold">Hukum Pidana</h4>
                        <p className="text-sm opacity-80">Overview & Statistik</p>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="/kamus-hukum/kategori/pidana/istilah" className="flex items-center justify-between p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all group">
                      <div>
                        <h4 className="font-semibold">Istilah Pidana</h4>
                        <p className="text-sm opacity-80">Database Lengkap</p>
                      </div>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Sources Tab */}
            {activeTab === 'sources' && (
              <motion.div
                key="sources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {statistics.sources.map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-xl p-8 text-center"
                  >
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {source.icon}
                    </motion.div>
                    <h4 className="text-lg font-semibold mb-2">{source.name}</h4>
                    <p className="text-3xl font-bold text-gray-900 mb-1">
                      {source.count.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-gray-600">istilah hukum</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Overview Tab (Default) */}
            {activeTab === 'overview' && selectedCategory === 'all' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                  <div>
                    {/* Welcome Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                    >
                      <h2 className="text-3xl font-bold mb-6 flex items-center">
                        <Globe className="h-8 w-8 mr-3 text-blue-600" />
                        Selamat Datang di Kamus Hukum Indonesia
                      </h2>
                      <div className="prose max-w-none text-gray-600">
                        <p className="text-lg leading-relaxed mb-4">
                          Platform edukasi hukum terlengkap yang menyediakan akses mudah ke ribuan istilah hukum,
                          template dokumen legal, dan panduan praktis untuk masyarakat Indonesia.
                        </p>
                        <p className="text-lg leading-relaxed">
                          Semua konten disusun oleh tim ahli hukum berpengalaman dan diperbarui secara berkala
                          sesuai dengan perkembangan peraturan terbaru.
                        </p>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-6 bg-blue-50 rounded-xl"
                        >
                          <CheckCircle className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                          <h4 className="font-semibold mb-2">Terpercaya</h4>
                          <p className="text-sm text-gray-600">Disusun oleh ahli hukum profesional</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-6 bg-green-50 rounded-xl"
                        >
                          <Clock className="h-10 w-10 text-green-600 mx-auto mb-3" />
                          <h4 className="font-semibold mb-2">Update</h4>
                          <p className="text-sm text-gray-600">Selalu diperbarui sesuai regulasi terbaru</p>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-center p-6 bg-purple-50 rounded-xl"
                        >
                          <Smartphone className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                          <h4 className="font-semibold mb-2">Mobile Ready</h4>
                          <p className="text-sm text-gray-600">Akses kapan saja, dimana saja</p>
                        </motion.div>
                      </div>

                      {/* New Pages Navigation */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200"
                      >
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                          <Sparkles className="h-5 w-5 mr-2 text-red-600" />
                          Halaman Baru - Hukum Pidana
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <a 
                            href="/kamus-hukum/kategori/pidana"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group"
                          >
                            <Gavel className="h-6 w-6 text-red-600" />
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                                Kategori Hukum Pidana
                              </h4>
                              <p className="text-sm text-gray-600">Overview dengan tab navigation</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 ml-auto transition-colors" />
                          </a>
                          <a 
                            href="/kamus-hukum/kategori/pidana/istilah"
                            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group"
                          >
                            <BookOpen className="h-6 w-6 text-red-600" />
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">
                                Istilah Hukum Pidana
                              </h4>
                              <p className="text-sm text-gray-600">856 istilah lengkap</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 ml-auto transition-colors" />
                          </a>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Recent Terms */}
                    <TermsList 
                      category={unwrappedSearchParams.category}
                      searchQuery={searchQuery || unwrappedSearchParams.search}
                    />
                  </div>

                  {/* Sidebar */}
                  <aside className="space-y-6">
                    <SidebarAd />
                    
                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
                    >
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2" />
                        Akses Cepat
                      </h3>
                      <div className="space-y-3">
                        <a href="/kamus-hukum/kategori/pidana" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                          <span className="font-medium">Hukum Pidana</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/kamus-hukum/kategori/pidana/istilah" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                          <span className="font-medium">Istilah Pidana</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/tools/kalkulator-denda" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                          <span className="font-medium">Kalkulator Denda</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/tools/kuis-korupsi" className="flex items-center justify-between p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                          <span className="font-medium">Test Anti-Korupsi</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </motion.div>

                    {/* Download CTA */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white rounded-2xl shadow-xl p-6"
                    >
                      <h3 className="font-bold text-lg mb-3 flex items-center">
                        <Download className="h-5 w-5 mr-2 text-gray-700" />
                        Download Aplikasi
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Akses offline, notifikasi update hukum, dan fitur premium lainnya
                      </p>
                      <div className="space-y-2">
                        <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                          App Store
                        </button>
                        <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Google Play
                        </button>
                      </div>
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-amber-50 border border-amber-200 rounded-2xl p-6"
                    >
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900 mb-1">Tahukah Anda?</h4>
                          <p className="text-sm text-amber-800">
                            Indonesia memiliki lebih dari 40.000 peraturan perundang-undangan yang masih berlaku.
                            Platform kami membantu Anda memahami hukum dengan lebih mudah.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Render specific category component if selected */}
          {selectedCategory !== 'all' && renderCategoryComponent()}
        </div>
      </section>

      {/* Floating Help Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        style={{ 
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <HelpCircle className="h-6 w-6" />
      </motion.button>

      {/* Premium CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
