'use client'

import React, { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Play, Video, BookOpen, Users, Clock, Eye,
  ThumbsUp, Share2, Download, Search, Filter,
  ArrowRight, Star, Calendar, Tag, Bookmark,
  Volume2, Settings, Maximize, ChevronRight,
  PlayCircle, Pause, SkipForward, SkipBack
} from 'lucide-react'
import Link from 'next/link'

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
  <svg 
    className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="batik-pattern-video" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <g transform="translate(50,50)">
          <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="0.3"/>
          <path d="M-15,-15 L15,15 M15,-15 L-15,15" stroke="currentColor" strokeWidth="0.2"/>
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#batik-pattern-video)" />
  </svg>
)

// 3D Card Component
const Card3D = ({ children, className = "", delay = 0 }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number 
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    setRotateX((y - centerY) / 15)
    setRotateY((centerX - x) / 15)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`perspective-1000 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
    >
      {children}
    </motion.div>
  )
}

// Video Categories
const videoCategories = [
  {
    id: 'hukum-perdata',
    name: 'Hukum Perdata',
    count: 45,
    color: 'from-green-500 to-emerald-600',
    icon: BookOpen,
    description: 'Video panduan tentang perkawinan, perceraian, waris, dan kontrak'
  },
  {
    id: 'hukum-pidana',
    name: 'Hukum Pidana',
    count: 32,
    color: 'from-red-500 to-rose-600',
    icon: Users,
    description: 'Panduan hukum pidana, hak tersangka, dan proses peradilan'
  },
  {
    id: 'hukum-bisnis',
    name: 'Hukum Bisnis',
    count: 28,
    color: 'from-blue-500 to-cyan-600',
    icon: Star,
    description: 'Pendirian PT, kontrak bisnis, dan compliance perusahaan'
  },
  {
    id: 'prosedur-hukum',
    name: 'Prosedur Hukum',
    count: 38,
    color: 'from-purple-500 to-violet-600',
    icon: Settings,
    description: 'Cara mengurus dokumen, gugatan, dan prosedur pengadilan'
  }
]

// Featured Videos
const featuredVideos = [
  {
    id: 1,
    title: 'Cara Mengurus Perceraian di Pengadilan Agama',
    description: 'Panduan lengkap proses perceraian mulai dari persyaratan hingga putusan pengadilan',
    duration: '15:42',
    views: '125K',
    category: 'Hukum Perdata',
    thumbnail: '/images/video-thumb-1.jpg',
    featured: true,
    rating: 4.8,
    publishedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Hak dan Kewajiban Suami Istri dalam Perkawinan',
    description: 'Memahami hak dan kewajiban suami istri berdasarkan UU Perkawinan dan KHI',
    duration: '12:30',
    views: '98K',
    category: 'Hukum Perdata',
    thumbnail: '/images/video-thumb-2.jpg',
    featured: true,
    rating: 4.9,
    publishedAt: '2024-01-10'
  },
  {
    id: 3,
    title: 'Pembagian Harta Waris dalam Islam',
    description: 'Cara menghitung dan membagi harta waris sesuai hukum Islam (faraidh)',
    duration: '18:25',
    views: '156K',
    category: 'Hukum Perdata',
    thumbnail: '/images/video-thumb-3.jpg',
    featured: true,
    rating: 4.7,
    publishedAt: '2024-01-05'
  }
]

// Popular Videos
const popularVideos = [
  {
    id: 4,
    title: 'Cara Mendirikan PT (Perseroan Terbatas)',
    description: 'Langkah-langkah lengkap mendirikan PT dari A sampai Z',
    duration: '22:15',
    views: '89K',
    category: 'Hukum Bisnis',
    thumbnail: '/images/video-thumb-4.jpg',
    rating: 4.6,
    publishedAt: '2024-01-20'
  },
  {
    id: 5,
    title: 'Hak Tersangka dalam Proses Penyidikan',
    description: 'Memahami hak-hak tersangka dan cara menghadapi proses penyidikan',
    duration: '16:30',
    views: '67K',
    category: 'Hukum Pidana',
    thumbnail: '/images/video-thumb-5.jpg',
    rating: 4.8,
    publishedAt: '2024-01-18'
  },
  {
    id: 6,
    title: 'Kontrak Kerja yang Sah dan Mengikat',
    description: 'Cara membuat kontrak kerja yang melindungi hak pekerja dan pengusaha',
    duration: '14:45',
    views: '112K',
    category: 'Hukum Bisnis',
    thumbnail: '/images/video-thumb-6.jpg',
    rating: 4.5,
    publishedAt: '2024-01-12'
  }
]

export default function VideoPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentVideo, setCurrentVideo] = useState(null)
  
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.9])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      <BatikPattern />

      {/* Header Section */}
      <motion.div 
        className="relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          >
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Beranda
            </Link>
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-purple-600 font-medium">Video Panduan</span>
          </motion.nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-center mb-6">
                <Card3D delay={0.2}>
                  <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-2xl">
                    <Video className="w-16 h-16 text-white" />
                  </div>
                </Card3D>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Video{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Panduan Hukum
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Pelajari hukum Indonesia melalui video panduan yang mudah dipahami. 
                Dari ahli hukum berpengalaman untuk masyarakat awam.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { label: 'Total Video', value: '143', icon: Video },
                  { label: 'Total Views', value: '2.5M', icon: Eye },
                  { label: 'Subscriber', value: '45K', icon: Users },
                  { label: 'Rating', value: '4.8/5', icon: Star }
                ].map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <Card3D key={stat.label} delay={0.3 + index * 0.1}>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <IconComponent className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    </Card3D>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Search Section */}
      <div className="relative z-10 py-8 bg-white/30 backdrop-blur-sm border-y border-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari video panduan hukum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            <button className="px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Video
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pilih kategori video sesuai kebutuhan hukum Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card3D key={category.id} delay={index * 0.1}>
                  <div 
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      selectedCategory === category.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 font-semibold">
                        {category.count} video
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </Card3D>
              )
            })}
          </div>
        </div>
      </div>

      {/* Featured Videos Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Unggulan
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Video panduan terpopuler dan paling bermanfaat
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredVideos.map((video, index) => (
              <Card3D key={video.id} delay={index * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-sm rounded">
                      {video.duration}
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                      Featured
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {video.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{video.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(video.publishedAt).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Videos Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Populer
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularVideos.map((video, index) => (
              <Card3D key={video.id} delay={index * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-purple-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {video.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{video.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </div>
                      <span>{new Date(video.publishedAt).toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/video?category=all"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Lihat Semua Video
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="relative z-10 py-16 bg-white/30 backdrop-blur-sm border-t border-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-12 text-white">
              <Video className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Jangan Lewatkan Video Terbaru
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Subscribe channel YouTube kami untuk mendapatkan video panduan hukum terbaru setiap minggunya
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.open('https://youtube.com/@melekhukumid', '_blank')}
                  className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-2xl hover:bg-gray-50 transition-colors flex items-center gap-2 justify-center"
                >
                  <PlayCircle className="w-5 h-5" />
                  Subscribe YouTube
                </button>
                <Link
                  href="/kontak"
                  className="px-8 py-4 bg-purple-700/30 backdrop-blur-sm text-white font-semibold rounded-2xl border border-purple-400/30 hover:bg-purple-700/40 transition-colors flex items-center gap-2 justify-center"
                >
                  <Download className="w-5 h-5" />
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              FAQ{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Video
              </span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Apakah video bisa didownload?",
                a: "Ya, beberapa video tersedia untuk download offline melalui aplikasi mobile kami."
              },
              {
                q: "Seberapa sering video baru dirilis?",
                a: "Kami merilis 2-3 video panduan baru setiap minggu dengan topik yang berbeda."
              },
              {
                q: "Apakah ada subtitle bahasa Indonesia?",
                a: "Ya, semua video dilengkapi dengan subtitle bahasa Indonesia untuk kemudahan pemahaman."
              },
              {
                q: "Bisakah request topik video?",
                a: "Tentu! Anda bisa request topik melalui kolom komentar atau menghubungi kami langsung."
              }
            ].map((faq, index) => (
              <Card3D key={index} delay={index * 0.1}>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}