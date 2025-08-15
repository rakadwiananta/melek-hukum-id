'use client'

import React, { useState, useEffect } from 'react'
import ArticleList from '@/app/components/article/display/ArticleList'
import ArticleFilter, { FilterState } from '@/app/components/article/meta/CategoryFilter'
import PopularArticles from '@/app/components/article/display/PopularArticles'
import ArticleStats from '@/app/components/article/meta/ArticleStats'
import ArticleNewsletter from '@/app/components/article/meta/ArticleNewsletter'
import { Search, Filter, Scale, Gavel, FileText, Users, BookOpen, Award } from 'lucide-react'
import { motion } from 'framer-motion'

// Simplified Statistics Component
function Statistics() {
  const stats = [
    { icon: FileText, label: 'Total Artikel', value: '13', color: 'text-blue-600' },
    { icon: Users, label: 'Total Views', value: '6.953', color: 'text-green-600' },
    { icon: Award, label: 'Total Likes', value: '399', color: 'text-red-600' },
    { icon: BookOpen, label: 'Rata-rata Views', value: '535', color: 'text-purple-600' }
  ]

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    console.log('Filters changed:', newFilters)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="bg-gradient-to-r from-brown-600 to-amber-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4">
                <Scale className="h-16 w-16" />
              </div>
              <div className="absolute top-4 right-4">
                <Gavel className="h-16 w-16" />
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <FileText className="h-20 w-20" />
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                Artikel Hukum Indonesia
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
              >
                Temukan artikel hukum terbaru, referensi resmi, dan analisis perundang-undangan dengan gaya Nusantara.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative flex-1 max-w-md"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cari artikel hukum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brown-600 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Filter className="h-5 w-5" />
                <span className="font-medium">Filter Lanjutan</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <Statistics />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Articles Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ArticleList
                searchQuery={searchQuery}
                filters={filters}
                limit={13}
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="sticky top-8 space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <ArticleStats />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <PopularArticles limit={5} />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-amber-100 to-brown-100 rounded-xl shadow-lg border border-amber-200 p-6"
              >
                <ArticleNewsletter />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
