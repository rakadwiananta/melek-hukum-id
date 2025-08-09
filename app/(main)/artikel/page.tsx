'use client'

import { useState } from 'react'
import ArticleList from '@/app/components/article/display/ArticleList'
import ArticleFilter, { FilterState } from '@/app/components/article/meta/CategoryFilter'
import PopularArticles from '@/app/components/article/display/PopularArticles'
import ArticleStats from '@/app/components/article/meta/ArticleStats'
import ArticleNewsletter from '@/app/components/article/meta/ArticleNewsletter'
import { Search, Filter } from 'lucide-react'

export default function ArtikelPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    author: null,
    sortBy: 'newest',
    dateRange: 'all'
  })

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    // Handle filter change logic here
    console.log('Filters changed:', newFilters)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Artikel Hukum
        </h1>
        <p className="text-lg text-gray-600">
          Temukan artikel hukum terbaru dan informatif untuk meningkatkan pemahaman hukum Anda.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari artikel..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Article Filter */}
          <ArticleFilter 
            categories={['Hukum Pidana', 'Hukum Perdata', 'Hukum Administrasi', 'Hukum Dagang']}
            authors={['Tim Melek Hukum', 'Advokat Senior', 'Dosen Hukum']}
            onFilterChange={handleFilterChange}
          />

          {/* Article List */}
          <ArticleList 
            limit={12}
            showLoadMore={true}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <ArticleStats />
            <PopularArticles limit={5} />
            <ArticleNewsletter />
          </div>
        </div>
      </div>
    </div>
  )
} 