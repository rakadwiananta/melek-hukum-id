'use client'

import { useState, useRef, useEffect } from 'react'
import { Regulasi } from '../../lib/data'
import Badge from '../ui/Badge'
import { 
  ChevronDown, 
  Calendar, 
  FileText, 
  Building, 
  Clock, 
  Hash, 
  BookOpen,
  Scale,
  Download,
  Share2,
  Star,
  Eye
} from 'lucide-react'

interface RegulasiCardProps {
  regulasi: Regulasi
  viewMode?: 'grid' | 'list'
}

export default function RegulasiCard({ regulasi, viewMode = 'grid' }: RegulasiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [viewCount, setViewCount] = useState(Math.floor(Math.random() * 1000) + 100)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? contentRef.current.scrollHeight : 0)
    }
  }, [isExpanded])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Berlaku':
        return 'success'
      case 'Dicabut':
        return 'danger'
      case 'Diubah':
        return 'warning'
      default:
        return 'default'
    }
  }

  const handleView = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setViewCount(prev => prev + 1)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: regulasi.judul,
          text: `${regulasi.nomor} - ${regulasi.deskripsi}`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  if (viewMode === 'list') {
    return (
      <div 
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden border-2 border-amber-200/50 shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Top accent with animation */}
            <div className="h-1 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 animate-gradient-x"></div>
            
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 hover:text-amber-700 transition-colors">
                        {regulasi.judul}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4 text-amber-600" />
                          <span className="font-medium">{regulasi.nomor}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span>{regulasi.tahun}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">{viewCount} views</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {regulasi.deskripsi}
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className={`p-2 rounded-lg transition-all ${
                          isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-lg text-gray-400 hover:text-amber-600 transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">{regulasi.kategori}</Badge>
                      <Badge variant={getStatusVariant(regulasi.status)}>{regulasi.status}</Badge>
                    </div>
                    
                    <button
                      onClick={handleView}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-lg hover:from-amber-700 hover:to-red-700 transition-all text-sm font-medium"
                    >
                      <span>{isExpanded ? 'Sembunyikan' : 'Lihat Detail'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content */}
              <div 
                ref={contentRef}
                style={{ height: `${contentHeight}px` }}
                className="overflow-hidden transition-all duration-500 ease-in-out"
              >
                <div className="mt-4 pt-4 border-t border-amber-200/50">
                  <ExpandedContent regulasi={regulasi} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View (Enhanced)
  return (
    <div 
      className="group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative transform transition-all duration-500 
        ${isHovered ? '-translate-y-2 rotate-y-5 scale-105' : ''}
      `}>
        {/* 3D Shadow Effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-br from-amber-600/20 to-red-600/20 
          rounded-2xl blur-xl transition-all duration-500
          ${isHovered ? 'opacity-60 translate-y-4' : 'opacity-0'}
        `}></div>

        {/* Card Container with Wayang-inspired border */}
        <div className={`
          relative bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden 
          border-2 shadow-xl transition-all duration-300
          ${isHovered ? 'border-amber-400/70 shadow-2xl' : 'border-amber-200/50'}
        `}>
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id={`pattern-${regulasi.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-amber-800" />
                <path d="M 5 10 Q 10 5 15 10 Q 10 15 5 10" fill="currentColor" className="text-amber-600" opacity="0.3" />
              </pattern>
              <rect width="100" height="100" fill={`url(#pattern-${regulasi.id})`} />
            </svg>
          </div>

          {/* Animated top border */}
          <div className={`
            h-1.5 bg-gradient-to-r from-amber-600 via-red-600 to-amber-700 
            transition-all duration-1000
            ${isHovered ? 'animate-gradient-x' : ''}
          `}></div>

          {/* Card Content */}
          <div className="relative p-5 sm:p-6">
            {/* Header Section */}
            <div className="mb-4">
              {/* Title with hover effect */}
              <h3 className={`
                text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 
                transition-all duration-300
                ${isHovered ? 'text-amber-700 transform scale-105' : ''}
              `}>
                {regulasi.judul}
              </h3>
              
              {/* Metadata with icons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1 group/item">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 group-hover/item:animate-bounce" />
                  <span className="font-medium">{regulasi.nomor}</span>
                </div>
                <div className="flex items-center gap-1 group/item">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 group-hover/item:animate-bounce" />
                  <span>{regulasi.tahun}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{viewCount}</span>
                </div>
              </div>

              {/* Badges with animation */}
              <div className="flex flex-wrap gap-2 mb-3">
                <div className={`transform transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
                  <Badge variant="default">{regulasi.kategori}</Badge>
                </div>
                <div className={`transform transition-all duration-300 delay-75 ${isHovered ? 'scale-110' : ''}`}>
                  <Badge variant={getStatusVariant(regulasi.status)}>{regulasi.status}</Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">
              {regulasi.deskripsi}
            </p>

            {/* Source Info */}
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
              <Building className="w-3 h-3" />
              <span>Sumber: {regulasi.sumber || 'Kementerian Hukum dan HAM'}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`
                    p-2 rounded-lg transition-all transform
                    ${isFavorite 
                      ? 'text-yellow-500 bg-yellow-50 scale-110' 
                      : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                    }
                  `}
                >
                  <Star className={`w-4 h-4 ${isFavorite ? 'fill-current animate-pulse' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <button className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Button with 3D effect */}
            <button
              onClick={handleView}
              className={`
                w-full flex items-center justify-center gap-2 py-2.5 px-4 
                bg-gradient-to-r rounded-xl font-medium text-sm
                transform transition-all duration-300
                ${isHovered 
                  ? 'from-amber-700 to-red-700 shadow-lg scale-105' 
                  : 'from-amber-600 to-red-600 shadow-md'
                }
                text-white hover:shadow-xl
              `}
            >
              <span>{isExpanded ? 'Sembunyikan Detail' : 'Lihat Detail'}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Expandable Content with smooth animation */}
            <div 
              ref={contentRef}
              style={{ 
                height: `${contentHeight}px`,
                opacity: isExpanded ? 1 : 0
              }}
              className="overflow-hidden transition-all duration-500 ease-in-out"
            >
              <div className="mt-4 pt-4 border-t-2 border-amber-200/50">
                <ExpandedContent regulasi={regulasi} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Separated expanded content component for better organization
function ExpandedContent({ regulasi }: { regulasi: Regulasi }) {
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Date Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-amber-50/50 rounded-xl">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" />
          <div>
            <span className="text-xs text-gray-500">Tanggal Ditetapkan</span>
            <p className="text-sm font-medium text-gray-700">{regulasi.tanggalDitetapkan || '-'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-600" />
          <div>
            <span className="text-xs text-gray-500">Tanggal Diundangkan</span>
            <p className="text-sm font-medium text-gray-700">{regulasi.tanggalDiundangkan || '-'}</p>
          </div>
        </div>
      </div>
      
      {/* Isi Pasal with enhanced styling */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          Isi Pasal
        </h4>
        <div className="max-h-96 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {regulasi.isiPasal && regulasi.isiPasal.length > 0 ? (
            regulasi.isiPasal.map((pasal, index) => (
              <div 
                key={index} 
                className="group/pasal bg-gradient-to-br from-amber-50/80 to-orange-50/80 rounded-xl p-4 border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300 hover:shadow-md"
              >
                {pasal.bab && (
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-amber-700" />
                    <h5 className="font-bold text-amber-800 text-sm">{pasal.bab}</h5>
                  </div>
                )}
                <div className="space-y-2">
                  <p className="font-semibold text-gray-700 text-sm flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">§</span>
                    {pasal.pasal}
                  </p>
                  <p className="text-gray-600 whitespace-pre-line text-xs sm:text-sm leading-relaxed pl-6">
                    {pasal.bunyi}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">Tidak ada detail pasal tersedia</p>
          )}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-amber-200/30">
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all">
          <FileText className="w-3 h-3" />
          Lihat Dokumen Lengkap
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all">
          <Download className="w-3 h-3" />
          Unduh PDF
        </button>
      </div>
    </div>
  )
}
