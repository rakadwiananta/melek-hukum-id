'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search,
  Filter,
  BookOpen,
  Building,
  Crown,
  Users,
  Flag,
  Globe,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  Scale,
  Sparkles,
  Target,
  Info,
  Star,
  Download,
  Share2,
  Eye,
  TrendingUp,
  Clock,
  BarChart3,
  Landmark,
  Gavel,
  ScrollText,
  Building2,
  X
} from 'lucide-react';
import { istilahTataNegaraData } from './IstilahTataNegara';

// Vote dan Map icons
const Vote = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Map = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
  </svg>
);

// Mobile-friendly Card Component
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// Mobile Optimized Quick Navigation
const QuickNavigationIstilah = () => {
  const categories = istilahTataNegaraData.metadata.categories;
  const [showAll, setShowAll] = useState(false);
  const displayCategories = showAll ? categories : categories.slice(0, 6);
  
  return (
    <section className="py-4 md:py-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
            Navigasi Cepat - Istilah Tata Negara
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
            Akses langsung ke berbagai kategori istilah hukum tata negara
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {displayCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.a
                key={category.id}
                href={`#${category.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                whileTap={{ scale: 0.95 }}
                className="group"
              >
                <Card3D>
                  <div className="bg-white p-2 md:p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 text-center">
                    <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm mx-auto mb-1.5 md:mb-2 w-fit">
                      <Icon className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                    <h3 className="font-bold text-xs text-gray-900 mb-0.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {category.name}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </Card3D>
              </motion.a>
            );
          })}
        </div>

        {/* Show More/Less Button for Mobile */}
        {categories.length > 6 && (
          <div className="text-center mt-3 md:hidden">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat ${categories.length - 6} Kategori Lainnya`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Mobile Optimized Statistics Dashboard
const StatisticsDashboard = ({ filteredCount, totalCount }: { filteredCount: number; totalCount: number }) => {
  const stats = istilahTataNegaraData.getStatistics();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg md:rounded-xl p-4 md:p-6 text-white mb-4 md:mb-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div>
          <div className="text-xl md:text-3xl font-bold">{filteredCount}</div>
          <div className="text-xs md:text-sm opacity-90">Hasil Pencarian</div>
        </div>
        <div>
          <div className="text-xl md:text-3xl font-bold">{totalCount}</div>
          <div className="text-xs md:text-sm opacity-90">Total Istilah</div>
        </div>
        <div className="hidden md:block">
          <div className="text-xl md:text-3xl font-bold">{stats.termsWithExamples}</div>
          <div className="text-xs md:text-sm opacity-90">Dengan Contoh</div>
        </div>
        <div className="hidden md:block">
          <div className="text-xl md:text-3xl font-bold">{stats.trendingTerms}</div>
          <div className="text-xs md:text-sm opacity-90">Trending</div>
        </div>
      </div>
    </motion.div>
  );
};

interface TermCardProps {
  term: {
    term: string
    englishTerm?: string
    definition: string
    category: string
    legalBasis: string
    example?: string
    relatedTerms?: string[]
    trending?: boolean
    additionalNotes?: string
  }
  index: number
}

// Mobile Optimized Term Card
const TermCard = ({ term, index }: TermCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 1000) + 100);

  const handleView = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setViewCount(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.2 }}
    >
      <Card3D>
        <div className="bg-white rounded-lg md:rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200">
          <div className="p-4 md:p-6">
            <div className="flex items-start justify-between mb-2 md:mb-3">
              <div className="flex-1">
                <h3 className="text-base md:text-xl font-semibold text-blue-600 mb-0.5 md:mb-1">
                  {term.term}
                </h3>
                {term.englishTerm && (
                  <p className="text-xs md:text-sm text-gray-500 italic">{term.englishTerm}</p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 md:gap-2 ml-2">
                {term.trending && (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="px-1.5 py-0.5 md:px-2 md:py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full flex items-center gap-0.5 md:gap-1"
                  >
                    <TrendingUp className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    <span className="hidden sm:inline">Trending</span>
                  </motion.span>
                )}
                <span className="px-2 py-0.5 md:px-3 md:py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {term.category}
                </span>
              </div>
            </div>

            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
              {term.definition}
            </p>

            {/* Quick Info - Mobile Optimized */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
              <span className="flex items-center gap-1">
                <Eye className="h-2.5 w-2.5 md:h-3 md:w-3" />
                {viewCount} views
              </span>
              <span className="flex items-center gap-1">
                <Scale className="h-2.5 w-2.5 md:h-3 md:w-3" />
                <span className="truncate max-w-[150px] sm:max-w-none">{term.legalBasis}</span>
              </span>
            </div>

            {/* Expand/Collapse Button */}
            <motion.button
              onClick={handleView}
              className="flex items-center gap-1 md:gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm"
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
              {isExpanded ? <ChevronUp className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />}
            </motion.button>

            {/* Expanded Content - Mobile Optimized */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200"
                >
                  {term.example && (
                    <div className="mb-3 md:mb-4">
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-1.5 md:mb-2">Contoh:</h4>
                      <div className="bg-blue-50 p-3 md:p-4 rounded-lg border-l-4 border-blue-400">
                        <p className="text-xs md:text-sm text-blue-800">{term.example}</p>
                      </div>
                    </div>
                  )}

                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className="mb-3 md:mb-4">
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-1.5 md:mb-2">Istilah Terkait:</h4>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {term.relatedTerms.map((related: string, idx: number) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
                          >
                            {related}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {term.additionalNotes && (
                    <div className="mb-3 md:mb-4">
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-1.5 md:mb-2">Catatan Tambahan:</h4>
                      <p className="text-xs md:text-sm text-gray-600 bg-gray-50 p-2.5 md:p-3 rounded-lg">
                        {term.additionalNotes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons - Mobile Optimized */}
                  <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                      Bagikan
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 text-gray-700 rounded-lg text-xs md:text-sm hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Download</span>
                      <span className="sm:hidden">PDF</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card3D>
    </motion.div>
  );
};

// Mobile Filter Modal
const MobileFilterModal = ({ 
  isOpen, 
  onClose, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  showStats,
  onStatsToggle,
  categories 
}: any) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filter & Pengaturan</h3>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
          >
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name} {category.id !== 'all' && `(${category.count})`}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urutkan
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
          >
            <option value="alphabetical">A-Z</option>
            <option value="trending">Trending</option>
            <option value="category">Kategori</option>
          </select>
        </div>

        {/* Stats Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Tampilkan Statistik</span>
          <button
            onClick={() => onStatsToggle(!showStats)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showStats ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showStats ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const IstilahTataNegaraComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [showStats, setShowStats] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: BookOpen },
    ...istilahTataNegaraData.metadata.categories
  ];

  const filteredTerms = useMemo(() => {
    let terms = istilahTataNegaraData.getTermsByCategory(selectedCategory);
    
    if (searchQuery) {
      terms = istilahTataNegaraData.searchTerms(searchQuery);
    }
    
    // Sorting
    switch (sortBy) {
      case 'alphabetical':
        terms.sort((a, b) => a.term.localeCompare(b.term));
        break;
      case 'trending':
        terms.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
        break;
      case 'category':
        terms.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }
    
    return terms;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
      {/* Quick Navigation */}
      <QuickNavigationIstilah />

      {/* Search and Filter Section - Mobile Optimized */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 mt-4 md:mt-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari istilah tata negara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Kategori
              </label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} {category.id !== 'all' && `(${(category as any).count})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutkan
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option value="alphabetical">Urutkan A-Z</option>
                <option value="trending">Trending</option>
                <option value="category">Kategori</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileFilter(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
            >
              <Filter className="h-4 w-4" />
              Filter & Pengaturan
            </button>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-600">
            <span>
              Ditemukan <span className="font-semibold text-gray-900">{filteredTerms.length}</span> istilah
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500" />
              <span>Database terpercaya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilter && (
          <MobileFilterModal
            isOpen={showMobileFilter}
            onClose={() => setShowMobileFilter(false)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showStats={showStats}
            onStatsToggle={setShowStats}
            categories={categories}
          />
        )}
      </AnimatePresence>

      {/* Statistics Dashboard */}
      {showStats && (
        <StatisticsDashboard 
          filteredCount={filteredTerms.length} 
          totalCount={istilahTataNegaraData.terms.length}
        />
      )}

      {/* Terms List */}
      <div className="grid gap-3 md:gap-6">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term, index) => (
            <TermCard key={term.id} term={term} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 md:py-12"
          >
            <Info className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
              Tidak ada istilah ditemukan
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Coba ubah kata kunci pencarian atau pilih kategori yang berbeda
            </p>
          </motion.div>
        )}
      </div>

      {/* Export Options - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 md:mt-8 bg-gray-100 rounded-lg md:rounded-xl p-4 md:p-6"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Export Data</h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => istilahTataNegaraData.exportToJSON()}
            className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium"
          >
            <Download className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
            Export JSON
          </button>
          <button
            onClick={() => istilahTataNegaraData.exportToCSV()}
            className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs md:text-sm font-medium"
          >
            <Download className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
            Export CSV
          </button>
        </div>
      </motion.div>

      {/* Navigation Footer - Mobile Optimized */}
      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
        <Link
          href="/kamus-hukum/kategori/tata-negara"
          className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs md:text-sm font-medium"
        >
          ← Kembali ke Kategori Tata Negara
        </Link>
        
        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
            Update: {istilahTataNegaraData.metadata.lastUpdated}
          </span>
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3 md:h-4 md:w-4" />
            {istilahTataNegaraData.metadata.total} istilah
          </span>
        </div>
      </div>
    </div>
  );
};

export default IstilahTataNegaraComponent;
