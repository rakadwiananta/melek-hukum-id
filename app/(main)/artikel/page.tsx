'use client'

import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Search, Filter, Scale, Gavel, FileText, Users, BookOpen, Award, TrendingUp } from 'lucide-react'

// Lazy load heavy components
const ArticleList = lazy(() => import('@/app/components/article/display/ArticleList'))
const ArticleFilter = lazy(() => import('@/app/components/article/meta/CategoryFilter'))
const PopularArticles = lazy(() => import('@/app/components/article/display/PopularArticles'))
const ArticleStats = lazy(() => import('@/app/components/article/meta/ArticleStats'))
const ArticleNewsletter = lazy(() => import('@/app/components/article/meta/ArticleNewsletter'))

// Import types only
import type { FilterState } from '@/app/components/article/meta/CategoryFilter'

// Loading components
const ComponentLoader = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 rounded-lg h-8 mb-4"></div>
    <div className="space-y-2">
      <div className="bg-gray-200 rounded h-4"></div>
      <div className="bg-gray-200 rounded h-4 w-3/4"></div>
    </div>
  </div>
)

const ArticleLoader = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 md:flex-shrink-0">
            <div className="h-48 md:h-full w-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex-1 p-6 md:p-8">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded h-6 w-3/4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 rounded h-4 animate-pulse"></div>
                <div className="bg-gray-200 rounded h-4 w-5/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
)

// Lightweight Statistics Component with CSS animations
function Statistics() {
  const stats = [
    { icon: FileText, label: 'Total Artikel', value: '13', color: 'from-blue-500 to-blue-600' },
    { icon: TrendingUp, label: 'Total Views', value: '6.953', color: 'from-green-500 to-green-600' },
    { icon: Award, label: 'Total Likes', value: '399', color: 'from-red-500 to-red-600' },
    { icon: BookOpen, label: 'Rata-rata Views', value: '535', color: 'from-purple-500 to-purple-600' }
  ]

  return (
    <div className="mb-12">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Statistik Artikel</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Data terkini mengenai artikel hukum dan interaksi pengguna di platform kami
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 hover:border-gray-200">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Page Component
export default function ArtikelPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    author: null,
    sortBy: 'newest',
    dateRange: 'all'
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [componentsLoaded, setComponentsLoaded] = useState(false)

  // Load heavy components after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setComponentsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-brown-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brown-600 via-amber-600 to-red-600 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 opacity-10 animate-bounce">
            <Scale className="h-24 w-24 text-white transform rotate-12" />
          </div>
          <div className="absolute top-20 right-16 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
            <Gavel className="h-20 w-20 text-white transform -rotate-12" />
          </div>
          <div className="absolute bottom-10 left-1/3 opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>
            <FileText className="h-28 w-28 text-white transform rotate-6" />
          </div>
          <div className="absolute bottom-16 right-1/4 opacity-10 animate-pulse" style={{ animationDelay: '3s' }}>
            <Users className="h-22 w-22 text-white transform -rotate-6" />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Artikel Hukum Indonesia
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
              Temukan artikel hukum terbaru, referensi resmi, dan analisis perundang-undangan 
              dengan gaya Nusantara yang mudah dipahami
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search & Filter Section */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex-1 w-full lg:max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <input
                    type="text"
                    placeholder="Cari artikel hukum, regulasi, atau topik tertentu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-lg"
                  />
                </div>
              </div>

              <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brown-600 to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg whitespace-nowrap transform hover:scale-105">
                <Filter className="h-6 w-6" />
                <span>Filter Lanjutan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <Statistics />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Articles Section */}
          <div className="xl:col-span-8">
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Suspense fallback={<ComponentLoader />}>
                {componentsLoaded && (
                  <ArticleFilter
                    categories={[
                      'Hukum Pidana',
                      'Hukum Perdata',
                      'Hukum Tata Negara',
                      'Hukum Administrasi',
                      'Hukum Dagang',
                      'Hukum Adat'
                    ]}
                    authors={[
                      'Prof. Dr. Jimly Asshiddiqie, S.H.',
                      'Prof. Dr. Satjipto Rahardjo, S.H.',
                      'Dr. Todung Mulya Lubis, S.H., LL.M.',
                      'Tim Melek Hukum'
                    ]}
                    onFilterChange={handleFilterChange}
                  />
                )}
              </Suspense>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
              <Suspense fallback={<ArticleLoader />}>
                {componentsLoaded && (
                  <ArticleList
                    searchQuery={searchQuery}
                    filters={filters}
                    limit={13}
                  />
                )}
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-4">
            <div className="sticky top-8 space-y-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
              {/* Article Stats Card */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Statistik Artikel
                  </h3>
                </div>
                <div className="p-6">
                  <Suspense fallback={<ComponentLoader />}>
                    {componentsLoaded && <ArticleStats />}
                  </Suspense>
                </div>
              </div>

              {/* Popular Articles Card */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    Artikel Populer
                  </h3>
                </div>
                <div className="p-6">
                  <Suspense fallback={<ComponentLoader />}>
                    {componentsLoaded && <PopularArticles limit={5} />}
                  </Suspense>
                </div>
              </div>

              {/* Newsletter Card */}
              <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-brown-100 rounded-2xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-amber-500 to-brown-500 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Newsletter
                  </h3>
                </div>
                <div className="p-6">
                  <Suspense fallback={<ComponentLoader />}>
                    {componentsLoaded && <ArticleNewsletter />}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
