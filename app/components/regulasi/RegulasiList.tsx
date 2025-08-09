'use client'

import { useState, useMemo, useEffect } from 'react'
import { Regulasi } from '../../lib/data'
import RegulasiCard from './RegulasiCard'
import { Search, Filter, X, ChevronLeft, ChevronRight, LayoutGrid, List, SortAsc, SortDesc } from 'lucide-react'

interface RegulasiListProps {
  dataRegulasi: Regulasi[]
}

export default function RegulasiList({ dataRegulasi }: RegulasiListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedKategori, setSelectedKategori] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(8)
      } else {
        setItemsPerPage(9)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(dataRegulasi.map(r => r.kategori)))
    return ['all', ...uniqueCategories.sort()]
  }, [dataRegulasi])

  const statuses = ['all', 'Berlaku', 'Dicabut', 'Diubah']

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = dataRegulasi.filter(regulasi => {
      const matchesSearch = searchTerm === '' || 
        regulasi.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        regulasi.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        regulasi.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        regulasi.kategori.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesKategori = selectedKategori === 'all' || regulasi.kategori === selectedKategori
      const matchesStatus = selectedStatus === 'all' || regulasi.status === selectedStatus

      return matchesSearch && matchesKategori && matchesStatus
    })

    // Sort by year
    filtered.sort((a, b) => {
      const yearA = parseInt(a.tahun)
      const yearB = parseInt(b.tahun)
      return sortOrder === 'asc' ? yearA - yearB : yearB - yearA
    })

    return filtered
  }, [dataRegulasi, searchTerm, selectedKategori, selectedStatus, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedKategori, selectedStatus, sortOrder])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedKategori('all')
    setSelectedStatus('all')
    setSortOrder('desc')
  }

  const hasActiveFilters = searchTerm !== '' || selectedKategori !== 'all' || selectedStatus !== 'all'

  return (
    <div className="animate-fade-in-up animation-delay-700">
      {/* Search and Filter Section */}
      <div className="mb-6 sm:mb-8 space-y-4">
        {/* Search Bar with Advanced Features */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-600 transition-colors" />
            <input
              type="text"
              placeholder="Cari peraturan berdasarkan judul, nomor, deskripsi, atau kategori..."
              className="w-full pl-12 pr-12 py-3 sm:py-4 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-amber-200/50 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200/50 transition-all text-sm sm:text-base shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex sm:hidden justify-center">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 text-gray-700"
          >
            <Filter className="w-4 h-4" />
            <span>Filter & Sortir</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Filter Controls */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} sm:block space-y-4`}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg max-w-4xl mx-auto">
            {/* Category Filter */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs text-gray-600 mb-1 font-medium">Kategori</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-200/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all text-sm"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
              >
                <option value="all">Semua Kategori</option>
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs text-gray-600 mb-1 font-medium">Status</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-200/50 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'Semua Status' : status}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs text-gray-600 mb-1 font-medium">Urutkan</label>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-400 transition-all text-sm"
              >
                {sortOrder === 'desc' ? (
                  <>
                    <SortDesc className="w-4 h-4" />
                    <span>Terbaru</span>
                  </>
                ) : (
                  <>
                    <SortAsc className="w-4 h-4" />
                    <span>Terlama</span>
                  </>
                )}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs text-gray-600 mb-1 font-medium">Tampilan</label>
              <div className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-amber-200/50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-amber-100'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-amber-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center space-y-2">
          <p className="text-gray-600 text-sm sm:text-base">
            Menampilkan <span className="font-bold text-amber-700">{paginatedData.length}</span> dari{' '}
            <span className="font-bold text-amber-700">{filteredAndSortedData.length}</span> peraturan
            {hasActiveFilters && (
              <span className="text-gray-500"> (difilter dari {dataRegulasi.length} total)</span>
            )}
          </p>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' 
          : 'space-y-4 max-w-4xl mx-auto'
        }
      `}>
        {paginatedData.map((regulasi, index) => (
          <div
            key={regulasi.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <RegulasiCard regulasi={regulasi} viewMode={viewMode} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-12 sm:py-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
            <Search className="w-10 h-10 text-amber-600" />
          </div>
          <p className="text-gray-500 text-lg mb-2">Tidak ada peraturan yang ditemukan</p>
          <p className="text-gray-400 text-sm mb-4">Coba ubah filter atau kata kunci pencarian</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
            >
              Reset Filter
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-all ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-400 text-gray-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-200/50 hover:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
