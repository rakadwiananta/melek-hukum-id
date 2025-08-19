'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, Building } from 'lucide-react'
import { istilahBisnis } from './IstilahBisnis'

export default function IstilahBisnisComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('semua')
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  // Filter istilah berdasarkan pencarian dan kategori
  const filteredTerms = useMemo(() => {
    let filtered = istilahBisnis

    if (searchTerm) {
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.englishTerm?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'semua') {
      filtered = filtered.filter(term => term.category === selectedCategory)
    }

    return filtered
  }, [searchTerm, selectedCategory])

  // Dapatkan kategori unik
  const categories = useMemo(() => {
    const cats = ['semua', ...Array.from(new Set(istilahBisnis.map(term => term.category)))]
    return cats
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
            <Building className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Istilah Hukum Bisnis
          </h1>
        </motion.div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Kumpulan lengkap istilah hukum bisnis dan perdagangan yang penting untuk dipahami
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari istilah hukum bisnis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="h-4 w-4" />
          <span>{filteredTerms.length} istilah ditemukan</span>
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredTerms.map((term, index) => (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {term.term}
                    </h3>
                    {term.englishTerm && (
                      <p className="text-sm text-gray-500 italic mb-2">
                        {term.englishTerm}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {term.category}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setExpandedTerm(expandedTerm === term.id.toString() ? null : term.id.toString())}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  {term.definition}
                </p>

                {expandedTerm === term.id.toString() && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100 pt-4 space-y-3"
                  >
                    {term.example && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Contoh:</h4>
                        <p className="text-gray-600 text-sm">{term.example}</p>
                      </div>
                    )}

                    {term.legalBasis && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Dasar Hukum:</h4>
                        <p className="text-gray-600 text-sm">{term.legalBasis}</p>
                      </div>
                    )}

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Istilah Terkait:</h4>
                        <div className="flex flex-wrap gap-2">
                          {term.relatedTerms.map((related, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-colors"
                              onClick={() => setSearchTerm(related)}
                            >
                              {related}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {term.additionalNotes && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Catatan Tambahan:</h4>
                        <p className="text-gray-600 text-sm">{term.additionalNotes}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada istilah ditemukan</h3>
          <p className="text-gray-600">
            Coba ubah kata kunci pencarian atau filter kategori Anda
          </p>
        </div>
      )}
    </div>
  )
}