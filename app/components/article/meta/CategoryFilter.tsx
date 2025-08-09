'use client'

import { useState, useEffect } from 'react'
import { Filter, Calendar, Tag, User, TrendingUp, X } from 'lucide-react'
import { cn } from '@/app/lib/utils'

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

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      category: null,
      author: null,
      sortBy: 'newest',
      dateRange: 'all'
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  const sortOptions = [
    { value: 'newest', label: 'Terbaru', icon: Calendar },
    { value: 'oldest', label: 'Terlama', icon: Calendar },
    { value: 'popular', label: 'Populer', icon: TrendingUp },
    { value: 'trending', label: 'Trending', icon: TrendingUp }
  ]

  const dateRangeOptions = [
    { value: 'all', label: 'Semua' },
    { value: 'today', label: 'Hari Ini' },
    { value: 'week', label: 'Minggu Ini' },
    { value: 'month', label: 'Bulan Ini' },
    { value: 'year', label: 'Tahun Ini' }
  ]

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300",
          "bg-white border-2 hover:shadow-lg transform hover:scale-105",
          isOpen ? "border-red-600 shadow-lg" : "border-gray-300"
        )}
      >
        <Filter className="h-5 w-5" />
        <span>Filter</span>
        {activeFiltersCount > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div className="absolute top-full mt-4 right-0 w-full md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in-down">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Filter Artikel</h3>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-6 space-y-6">
            {/* Sort By */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Urutkan
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilter('sortBy', option.value)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300",
                      filters.sortBy === option.value
                        ? "bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                  >
                    <option.icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Periode
              </label>
              <div className="flex flex-wrap gap-2">
                {dateRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFilter('dateRange', option.value)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      filters.dateRange === option.value
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            {categories.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Kategori
                </label>
                <select
                  value={filters.category || ''}
                  onChange={(e) => updateFilter('category', e.target.value || null)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Author */}
            {authors.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Penulis
                </label>
                <select
                  value={filters.author || ''}
                  onChange={(e) => updateFilter('author', e.target.value || null)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
                >
                  <option value="">Semua Penulis</option>
                  {authors.map((author) => (
                    <option key={author} value={author}>
                      {author}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
