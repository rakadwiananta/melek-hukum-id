'use client'

import { useState, useEffect } from 'react'
import { Filter, Calendar, Tag, User, TrendingUp, X, ChevronDown } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface ArticleFilterProps {
  categories: string[]
  authors: string[]
  onFilterChange: (filters: FilterState) => void
  className?: string
}

export interface FilterState {
  category: string | null
  author: string | null
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending'
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year'
}

export default function ArticleFilter({ 
  categories, 
  authors, 
  onFilterChange,
  className = '' 
}: ArticleFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    author: null,
    sortBy: 'newest',
    dateRange: 'all'
  })
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    // Count active filters
    let count = 0
    if (filters.category) count++
    if (filters.author) count++
    if (filters.sortBy !== 'newest') count++
    if (filters.dateRange !== 'all') count++
    setActiveFiltersCount(count)
  }, [filters])

  const updateFilter = (key: keyof FilterState, value: string | null) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: null,
      author: null,
      sortBy: 'newest' as const,
      dateRange: 'all' as const
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const sortOptions = [
    { value: 'newest', label: 'Terbaru', icon: Calendar },
    { value: 'oldest', label: 'Terlama', icon: Calendar },
    { value: 'popular', label: 'Populer', icon: TrendingUp },
    { value: 'trending', label: 'Trending', icon: TrendingUp }
  ]

  const dateRangeOptions = [
    { value: 'all', label: 'Semua Waktu' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: 'Minggu Ini' },
    { value: 'month', label: 'Bulan Ini' },
    { value: 'year', label: 'Tahun Ini' }
  ]

  return (
    <div className={cn('mb-8', className)}>
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Filter & Sortir</h2>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-amber-700 bg-amber-100 rounded-full">
              {activeFiltersCount} filter aktif
            </span>
          )}
        </div>
        
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          <Filter className="h-5 w-5" />
          <span className="font-medium">
            {isOpen ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          </span>
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          )} />
        </motion.button>
      </div>

      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Filter aktif:</span>
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                <Tag className="h-3 w-3" />
                {filters.category}
                <button 
                  onClick={() => updateFilter('category', null)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.author && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                <User className="h-3 w-3" />
                {filters.author}
                <button 
                  onClick={() => updateFilter('author', null)}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.sortBy !== 'newest' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                <TrendingUp className="h-3 w-3" />
                {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
                <button 
                  onClick={() => updateFilter('sortBy', 'newest')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full">
                <Calendar className="h-3 w-3" />
                {dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label}
                <button 
                  onClick={() => updateFilter('dateRange', 'all')}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Hapus Semua
            </button>
          </div>
        </motion.div>
      )}

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Categories */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Kategori</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter('category', null)}
                      className={cn(
                        'w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200',
                        !filters.category
                          ? 'bg-blue-100 text-blue-900 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      )}
                    >
                      Semua Kategori
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => updateFilter('category', category)}
                        className={cn(
                          'w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200',
                          filters.category === category
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Authors */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">Penulis</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter('author', null)}
                      className={cn(
                        'w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200',
                        !filters.author
                          ? 'bg-green-100 text-green-900 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      )}
                    >
                      Semua Penulis
                    </button>
                    {authors.map((author) => (
                      <button
                        key={author}
                        onClick={() => updateFilter('author', author)}
                        className={cn(
                          'w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 text-sm',
                          filters.author === author
                            ? 'bg-green-100 text-green-900 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        {author}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Urutkan</h3>
                  </div>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFilter('sortBy', option.value)}
                        className={cn(
                          'w-full flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200',
                          filters.sortBy === option.value
                            ? 'bg-purple-100 text-purple-900 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        <option.icon className="h-4 w-4" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-gray-900">Periode</h3>
                  </div>
                  <div className="space-y-2">
                    {dateRangeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateFilter('dateRange', option.value)}
                        className={cn(
                          'w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200',
                          filters.dateRange === option.value
                            ? 'bg-orange-100 text-orange-900 font-medium'
                            : 'hover:bg-gray-50 text-gray-700'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-6 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                  Hapus Semua Filter
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
