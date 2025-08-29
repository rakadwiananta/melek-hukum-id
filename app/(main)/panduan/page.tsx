'use client'

import Link from 'next/link'
import { BookOpen, Search, Clock, TrendingUp, Star, FileText, Users, Shield, Home, Car, Briefcase, Heart, ChevronRight, Filter, Calendar } from 'lucide-react'
import { useState } from 'react'

// Kategori panduan
const categories = [
  { id: 'all', name: 'Semua', icon: BookOpen },
  { id: 'dokumen', name: 'Dokumen', icon: FileText },
  { id: 'perdata', name: 'Perdata', icon: Users },
  { id: 'pidana', name: 'Pidana', icon: Shield },
  { id: 'properti', name: 'Properti', icon: Home },
  { id: 'kendaraan', name: 'Kendaraan', icon: Car },
  { id: 'ketenagakerjaan', name: 'Ketenagakerjaan', icon: Briefcase },
  { id: 'keluarga', name: 'Keluarga', icon: Heart },
]

// Data panduan yang diperluas
const guides: Array<{
  slug: string
  title: string
  description: string
  category: string
  readTime: number
  difficulty: 'mudah' | 'sedang' | 'sulit'
  popular?: boolean
  updated?: string
}> = [
  {
    slug: 'mengurus-dokumen-hilang',
    title: 'Mengurus Dokumen Hilang',
    description: 'Panduan lengkap prosedur pelaporan dan pengurusan dokumen pengganti (KTP, SIM, STNK, KK, Paspor)',
    category: 'dokumen',
    readTime: 10,
    difficulty: 'mudah',
    popular: true,
    updated: '2024-01-15',
  },
  {
    slug: 'prosedur-pelaporan',
    title: 'Prosedur Pelaporan ke Polisi',
    description: 'Langkah-langkah membuat laporan ke kepolisian sesuai SOP',
    category: 'pidana',
    readTime: 8,
    difficulty: 'mudah',
    popular: true,
  },
  {
    slug: 'gugatan-sederhana',
    title: 'Gugatan Sederhana',
    description: 'Panduan mengajukan gugatan sederhana (small claims court) sesuai Perma terbaru',
    category: 'perdata',
    readTime: 15,
    difficulty: 'sedang',
  },
  {
    slug: 'cerai-gugat-cerai-talak',
    title: 'Prosedur Perceraian',
    description: 'Panduan lengkap cerai gugat dan cerai talak di Pengadilan Agama/Negeri',
    category: 'keluarga',
    readTime: 20,
    difficulty: 'sedang',
    popular: true,
  },
  {
    slug: 'jual-beli-tanah',
    title: 'Jual Beli Tanah dan Properti',
    description: 'Prosedur aman jual beli tanah, cek sertifikat, dan balik nama',
    category: 'properti',
    readTime: 25,
    difficulty: 'sulit',
  },
  {
    slug: 'somasi-dan-teguran',
    title: 'Membuat Somasi yang Benar',
    description: 'Cara membuat surat somasi/teguran yang sah secara hukum',
    category: 'perdata',
    readTime: 12,
    difficulty: 'mudah',
  },
  {
    slug: 'phk-dan-pesangon',
    title: 'PHK dan Hak Pesangon',
    description: 'Hak-hak pekerja saat PHK dan cara menghitung pesangon',
    category: 'ketenagakerjaan',
    readTime: 18,
    difficulty: 'sedang',
  },
  {
    slug: 'balik-nama-kendaraan',
    title: 'Balik Nama Kendaraan',
    description: 'Prosedur lengkap balik nama BPKB dan STNK kendaraan bermotor',
    category: 'kendaraan',
    readTime: 15,
    difficulty: 'mudah',
  },
  {
    slug: 'warisan-dan-hibah',
    title: 'Pembagian Warisan & Hibah',
    description: 'Panduan hukum waris Islam, BW, dan prosedur hibah',
    category: 'keluarga',
    readTime: 30,
    difficulty: 'sulit',
  },
  {
    slug: 'surat-kuasa',
    title: 'Membuat Surat Kuasa',
    description: 'Panduan membuat surat kuasa umum dan khusus yang sah',
    category: 'dokumen',
    readTime: 10,
    difficulty: 'mudah',
  },
]

// Component untuk badge difficulty
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    mudah: 'bg-green-100 text-green-700',
    sedang: 'bg-yellow-100 text-yellow-700',
    sulit: 'bg-red-100 text-red-700',
  }
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[difficulty as keyof typeof colors]}`}>
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </span>
  )
}

export default function PanduanPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter guides berdasarkan kategori dan search
  const filteredGuides = guides.filter(guide => {
    const matchCategory = selectedCategory === 'all' || guide.category === selectedCategory
    const matchSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  // Popular guides
  const popularGuides = guides.filter(g => g.popular).slice(0, 3)

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 md:p-12 relative overflow-hidden mb-10 shadow-wayang">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-batik-pattern rounded-full" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-wayang-pattern rounded-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg gunungan-float">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Panduan Hukum Praktis</h1>
                <p className="text-gray-700 mt-1">Solusi praktis untuk berbagai permasalahan hukum sehari-hari</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari panduan yang Anda butuhkan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Popular Guides Section */}
        {!searchQuery && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Panduan Populer</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {popularGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/panduan/${guide.slug}`}
                  className="group bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Star className="h-5 w-5 text-orange-500" />
                    <DifficultyBadge difficulty={guide.difficulty} />
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{guide.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readTime} menit
                    </span>
                    {guide.updated && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Update: {new Date(guide.updated).toLocaleDateString('id-ID')}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filter Kategori</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <article
              key={guide.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-6 relative group"
            >
              {/* Category Icon */}
              <div className="absolute -right-3 -top-3 w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform">
                {categories.find(c => c.id === guide.category)?.icon && (
                  <div className="text-primary">
                    {(() => {
                      const Icon = categories.find(c => c.id === guide.category)?.icon!
                      return <Icon className="h-5 w-5" />
                    })()}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h2>
                </div>
                
                <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                  {guide.description}
                </p>

                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-3">
                    <DifficultyBadge difficulty={guide.difficulty} />
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readTime} menit
                    </span>
                  </div>
                  
                  <Link
                    href={`/panduan/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all"
                  >
                    Baca <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada panduan ditemukan</h3>
            <p className="text-gray-600">Coba gunakan kata kunci lain atau pilih kategori yang berbeda</p>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Butuh Bantuan Lebih Lanjut?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Konsultasi Online</h4>
              <p className="text-sm text-gray-600 mb-3">Tanya jawab langsung dengan konsultan hukum berpengalaman</p>
              <a href="https://peradi.or.id" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm hover:underline">
                Mulai Konsultasi →
              </a>
            </div>
            <div className="bg-white rounded-xl p-5 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-2">Template Dokumen</h4>
              <p className="text-sm text-gray-600 mb-3">Download template surat dan dokumen hukum siap pakai</p>
              <Link href="/template" className="text-blue-600 font-medium text-sm hover:underline">
                Lihat Template →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
