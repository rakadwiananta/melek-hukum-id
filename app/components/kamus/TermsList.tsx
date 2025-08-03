'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Filter,
  Info,
  ExternalLink,
  Share2
} from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { InContentAd } from '@/app/components/ads/AdPlacements'

interface LegalTerm {
  id: string
  term: string
  definition: string
  category: string
  relatedTerms?: string[]
  examples?: string[]
  source?: string
  updatedAt: string
  viewCount: number
}

// Mock data - replace with Supabase query
const mockTerms: LegalTerm[] = [
  {
    id: '1',
    term: 'Korupsi',
    definition: 'Tindakan melawan hukum dengan menyalahgunakan kewenangan, kesempatan, atau sarana yang ada untuk memperkaya diri sendiri, orang lain, atau korporasi yang dapat merugikan keuangan negara atau perekonomian negara.',
    category: 'anti-korupsi',
    relatedTerms: ['Gratifikasi', 'Suap', 'Penggelapan'],
    examples: [
      'Menerima hadiah dari rekanan proyek pemerintah',
      'Menggunakan anggaran dinas untuk kepentingan pribadi',
      'Menerima komisi dari vendor tanpa sepengetahuan instansi'
    ],
    source: 'UU No. 31 Tahun 1999 jo. UU No. 20 Tahun 2001',
    updatedAt: '2024-01-20',
    viewCount: 3250
  },
  {
    id: '2',
    term: 'Gratifikasi',
    definition: 'Pemberian dalam arti luas berupa uang, barang, rabat, komisi, pinjaman tanpa bunga, tiket perjalanan, fasilitas penginapan, perjalanan wisata, pengobatan cuma-cuma, dan fasilitas lainnya.',
    category: 'anti-korupsi',
    relatedTerms: ['Korupsi', 'Suap'],
    examples: [
      'Menerima parsel lebaran dari vendor',
      'Mendapat tiket liburan dari kontraktor',
      'Menerima diskon khusus dari supplier'
    ],
    source: 'Penjelasan Pasal 12B UU Tipikor',
    updatedAt: '2024-01-18',
    viewCount: 2100
  },
  {
    id: '3',
    term: 'Praperadilan',
    definition: 'Wewenang pengadilan negeri untuk memeriksa dan memutus tentang sah atau tidaknya suatu penangkapan, penahanan, penghentian penyidikan, atau penghentian penuntutan.',
    category: 'pidana',
    relatedTerms: ['Habeas Corpus', 'Penahanan', 'Penyidikan'],
    examples: [
      'Mengajukan praperadilan atas penetapan tersangka',
      'Meminta pembatalan penahanan yang tidak sah',
      'Menggugat penghentian penyidikan tanpa alasan jelas'
    ],
    source: 'Pasal 77-83 KUHAP',
    updatedAt: '2024-01-15',
    viewCount: 1850
  },
  {
    id: '4',
    term: 'Wanprestasi',
    definition: 'Kelalaian atau kegagalan dalam memenuhi kewajiban yang telah disepakati dalam suatu perjanjian, baik karena tidak melaksanakan, terlambat melaksanakan, atau melaksanakan tetapi tidak sesuai perjanjian.',
    category: 'perdata',
    relatedTerms: ['Ingkar Janji', 'Ganti Rugi', 'Somasi'],
    examples: [
      'Tidak membayar cicilan sesuai jadwal',
      'Terlambat menyerahkan barang pesanan',
      'Kualitas barang tidak sesuai kontrak'
    ],
    source: 'Pasal 1238-1252 KUHPerdata',
    updatedAt: '2024-01-12',
    viewCount: 2780
  },
  {
    id: '5',
    term: 'Somasi',
    definition: 'Teguran atau peringatan tertulis dari kreditur kepada debitur yang lalai memenuhi kewajibannya, yang merupakan syarat sebelum mengajukan gugatan wanprestasi ke pengadilan.',
    category: 'perdata',
    relatedTerms: ['Wanprestasi', 'Gugatan', 'Teguran'],
    examples: [
      'Surat peringatan pembayaran hutang',
      'Teguran untuk menyelesaikan pekerjaan',
      'Peringatan sebelum pemutusan kontrak'
    ],
    source: 'Pasal 1238 KUHPerdata',
    updatedAt: '2024-01-10',
    viewCount: 3100
  },
  {
    id: '6',
    term: 'Legal Standing',
    definition: 'Hak atau kedudukan hukum seseorang atau badan hukum untuk mengajukan gugatan atau permohonan ke pengadilan karena memiliki kepentingan langsung terhadap suatu perkara.',
    category: 'tata-negara',
    relatedTerms: ['Gugatan', 'Pemohon', 'Kepentingan Hukum'],
    examples: [
      'Warga negara menggugat UU yang merugikan hak konstitusionalnya',
      'LSM lingkungan menggugat perusahaan pencemar',
      'Konsumen menggugat produsen atas produk cacat'
    ],
    source: 'Yurisprudensi Mahkamah Konstitusi',
    updatedAt: '2024-01-08',
    viewCount: 1560
  },
  {
    id: '7',
    term: 'Judicial Review',
    definition: 'Hak menguji atau peninjauan kembali oleh lembaga peradilan terhadap produk hukum yang dikeluarkan oleh lembaga eksekutif maupun legislatif untuk menilai kesesuaiannya dengan peraturan yang lebih tinggi.',
    category: 'tata-negara',
    relatedTerms: ['Uji Materi', 'Mahkamah Konstitusi', 'Mahkamah Agung'],
    examples: [
      'Uji materi UU terhadap UUD 1945 di MK',
      'Uji materi Perda terhadap UU di MA',
      'Pengujian Perpres yang bertentangan dengan UU'
    ],
    source: 'UU No. 24 Tahun 2003 tentang MK',
    updatedAt: '2024-01-05',
    viewCount: 2200
  },
  {
    id: '8',
    term: 'Pembuktian Terbalik',
    definition: 'Sistem pembuktian di mana terdakwa/tersangka wajib membuktikan bahwa harta kekayaannya diperoleh secara sah dan bukan hasil tindak pidana korupsi.',
    category: 'anti-korupsi',
    relatedTerms: ['Korupsi', 'Pembuktian', 'TPPU'],
    examples: [
      'PNS membuktikan asal-usul kekayaannya',
      'Pejabat menjelaskan sumber dana pembelian aset',
      'Tersangka korupsi membuktikan harta warisan'
    ],
    source: 'Pasal 37 UU Tipikor',
    updatedAt: '2024-01-22',
    viewCount: 1890
  }
]

interface TermsListProps {
  category?: string
  searchQuery?: string
}

export default function TermsList({ category, searchQuery }: TermsListProps) {
  const [terms, setTerms] = useState<LegalTerm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedTerms, setExpandedTerms] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'alphabetical' | 'popular' | 'recent'>('alphabetical')
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchTerms = async () => {
      setIsLoading(true)
      
      // In real implementation, fetch from Supabase
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setTerms(mockTerms)
      setIsLoading(false)
    }

    fetchTerms()
  }, [category, searchQuery])

  // Filter and sort terms
  const filteredAndSortedTerms = useMemo(() => {
    let filtered = terms

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(term => term.category === category)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(term => 
        term.term.toLowerCase().includes(query) ||
        term.definition.toLowerCase().includes(query) ||
        term.relatedTerms?.some(rt => rt.toLowerCase().includes(query))
      )
    }

    // Sort terms
    const sorted = [...filtered]
    switch (sortBy) {
      case 'alphabetical':
        sorted.sort((a, b) => a.term.localeCompare(b.term, 'id'))
        break
      case 'popular':
        sorted.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'recent':
        sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        break
    }

    return sorted
  }, [terms, category, searchQuery, sortBy])

  const toggleExpanded = (termId: string) => {
    setExpandedTerms(prev =>
      prev.includes(termId)
        ? prev.filter(id => id !== termId)
        : [...prev, termId]
    )
  }

  const handleShare = (term: LegalTerm) => {
    if (typeof window === 'undefined') return
    
    if (navigator.share) {
      navigator.share({
        title: `${term.term} - Melek Hukum ID`,
        text: term.definition,
        url: `${window.location.origin}/kamus-hukum/${term.id}`
      })
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(`${window.location.origin}/kamus-hukum/${term.id}`)
      // Show toast notification
    }
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'pidana': 'Hukum Pidana',
      'perdata': 'Hukum Perdata',
      'tata-negara': 'Tata Negara',
      'anti-korupsi': 'Anti-Korupsi'
    }
    return labels[cat] || cat
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Filter and Sort Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>{filteredAndSortedTerms.length} istilah ditemukan</span>
        </div>

        <div className="flex gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="alphabetical">A-Z</option>
            <option value="popular">Terpopuler</option>
            <option value="recent">Terbaru</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden sm:hidden"
          >
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Kategori</label>
                <select className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="all">Semua Kategori</option>
                  <option value="pidana">Hukum Pidana</option>
                  <option value="perdata">Hukum Perdata</option>
                  <option value="tata-negara">Tata Negara</option>
                  <option value="anti-korupsi">Anti-Korupsi</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms List */}
      <div className="space-y-4">
        {filteredAndSortedTerms.map((term, index) => {
          const isExpanded = expandedTerms.includes(term.id)
          
          // Insert ad after every 5 terms
          const showAd = (index + 1) % 5 === 0 && index !== filteredAndSortedTerms.length - 1

          return (
            <motion.div
              key={term.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{term.term}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <div className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            term.category === 'pidana' && "bg-red-100 text-red-700",
                            term.category === 'perdata' && "bg-blue-100 text-blue-700",
                            term.category === 'tata-negara' && "bg-purple-100 text-purple-700",
                            term.category === 'anti-korupsi' && "bg-orange-100 text-orange-700"
                          )}>
                            {getCategoryLabel(term.category)}
                          </div>
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {term.viewCount.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShare(term)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleExpanded(term.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Definition */}
                  <p className={cn(
                    "text-gray-700 leading-relaxed",
                    !isExpanded && "line-clamp-3"
                  )}>
                    {term.definition}
                  </p>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4 overflow-hidden"
                      >
                        {/* Examples */}
                        {term.examples && term.examples.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Info className="h-4 w-4 text-primary" />
                              Contoh:
                            </h4>
                            <ul className="space-y-1 ml-6">
                              {term.examples.map((example, idx) => (
                                <li key={idx} className="text-sm text-gray-600 list-disc">
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Related Terms */}
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Istilah Terkait:</h4>
                            <div className="flex flex-wrap gap-2">
                              {term.relatedTerms.map((related, idx) => (
                                <a
                                  key={idx}
                                  href={`/kamus-hukum?search=${encodeURIComponent(related)}`}
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                                >
                                  {related}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Source */}
                        {term.source && (
                          <div className="pt-3 border-t">
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <ExternalLink className="h-3 w-3" />
                              Sumber: <span className="font-medium">{term.source}</span>
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Ad placement */}
              {showAd && <InContentAd className="my-6" />}
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedTerms.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Tidak ada istilah ditemukan</h3>
          <p className="text-muted-foreground">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </div>
      )}

      {/* Load More Button */}
      {filteredAndSortedTerms.length > 0 && (
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  )
}
