'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Clock, Eye, Tag, ArrowRight, Loader2, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/app/lib/utils'
import { FilterState } from '@/app/components/article/meta/CategoryFilter'
import { infiniteArticleLoader, type InfiniteLoadingOptions, type LoadMoreResult } from '@/app/lib/infinite-articles'
import { EnhancedArticleCardImage } from '@/app/components/ui/AdvancedArticleImage'
import { useArticleImagePreloader } from '@/app/hooks/useServiceWorker'
import type { Article as DbArticle } from '@/app/lib/supabase'

interface InfiniteArticleListProps {
  category?: string
  searchQuery?: string
  filters?: FilterState
  showHeader?: boolean
  headerTitle?: string
  autoLoadAll?: boolean
  maxArticles?: number
  batchSize?: number
  variant?: 'list' | 'grid' | 'masonry'
}

export default function InfiniteArticleList({
  category,
  searchQuery = '',
  filters = {
    category: null,
    author: null,
    sortBy: 'newest',
    dateRange: 'all'
  },
  showHeader = false,
  headerTitle = 'Semua Artikel',
  autoLoadAll = false,
  maxArticles = 1000,
  batchSize = 20,
  variant = 'list'
}: InfiniteArticleListProps) {
  const [loadResult, setLoadResult] = useState<LoadMoreResult>({
    articles: [],
    hasMore: true,
    totalLoaded: 0
  })
  const [loading, setLoading] = useState(false)
  const [autoLoading, setAutoLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const sentinelRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const { preloadArticleImages } = useArticleImagePreloader()

  const loadingOptions: InfiniteLoadingOptions = {
    category: category || filters.category,
    author: filters.author,
    searchQuery,
    sortBy: filters.sortBy as any,
    featuredOnly: false,
    editorPickOnly: false,
    latestOnly: false,
    batchSize,
    maxTotal: maxArticles
  }

  const loadMore = useCallback(async (isInitial = false) => {
    if (loading || (!loadResult.hasMore && !isInitial)) return

    setLoading(true)
    setError(null)

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    try {
      const result = await infiniteArticleLoader.loadMore(
        loadingOptions,
        isInitial ? undefined : loadResult.nextCursor
      )

      // Preload images for new articles
      const newArticles = result.articles.slice(loadResult.totalLoaded)
      if (newArticles.length > 0) {
        preloadArticleImages(newArticles)
      }

      setLoadResult(result)
      
      console.log(`Loaded ${result.totalLoaded} of ${result.totalAvailable} articles`)
      
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error loading articles:', error)
        setError('Gagal memuat artikel. Silakan coba lagi.')
      }
    } finally {
      setLoading(false)
    }
  }, [loadResult.hasMore, loadResult.nextCursor, loadResult.totalLoaded, loading, loadingOptions, preloadArticleImages])

  // Auto-load all articles if enabled
  const performAutoLoadAll = useCallback(async () => {
    if (!autoLoadAll || autoLoading || !loadResult.hasMore) return

    setAutoLoading(true)
    let currentResult = loadResult

    try {
      while (currentResult.hasMore && currentResult.totalLoaded < maxArticles) {
        const result = await infiniteArticleLoader.loadMore(
          loadingOptions,
          currentResult.nextCursor
        )

        // Preload images in batches
        const newArticles = result.articles.slice(currentResult.totalLoaded)
        if (newArticles.length > 0) {
          preloadArticleImages(newArticles)
        }

        setLoadResult(result)
        currentResult = result

        // Add delay to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    } catch (error) {
      console.error('Error auto-loading articles:', error)
    } finally {
      setAutoLoading(false)
    }
  }, [autoLoadAll, autoLoading, loadResult, maxArticles, loadingOptions, preloadArticleImages])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || autoLoadAll) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadResult.hasMore && !loading) {
          loadMore()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [loadMore, loadResult.hasMore, loading, autoLoadAll])

  // Initial load
  useEffect(() => {
    loadMore(true)
  }, [category, searchQuery, filters])

  // Auto-load all effect
  useEffect(() => {
    if (autoLoadAll && loadResult.articles.length > 0) {
      const timer = setTimeout(performAutoLoadAll, 1000)
      return () => clearTimeout(timer)
    }
  }, [autoLoadAll, loadResult.articles.length, performAutoLoadAll])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const renderArticleItem = (article: DbArticle, index: number) => {
    const key = `${article.id}-${index}`
    
    if (variant === 'grid') {
      return (
        <div key={key} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
          <div className="relative h-48 overflow-hidden">
            <EnhancedArticleCardImage
              src={article.featured_image}
              alt={article.title}
              category={article.category}
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              index={index}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              {article.category && (
                <span className="inline-flex items-center px-3 py-1 bg-red-600/90 text-white text-xs font-semibold rounded-full backdrop-blur">
                  <Tag className="h-3 w-3 mr-1" />
                  {article.category}
                </span>
              )}
            </div>
          </div>
          
          <div className="p-6">
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-700 transition-colors">
                {article.title}
              </h3>
            </Link>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <time dateTime={article.published_at} className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(article.published_at)}
                </time>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.view_count?.toLocaleString('id-ID')}
                </span>
              </div>
              <Link
                href={`/artikel/${article.slug}`}
                className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                Baca
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )
    }

    // Default list view
    return (
      <div key={key} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
            <div className="relative w-24 h-24">
              <EnhancedArticleCardImage
                src={article.featured_image}
                alt={article.title}
                category={article.category}
                className="object-cover"
                index={index}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {article.category && (
                <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                  <Tag className="h-3 w-3 mr-1" />
                  {article.category}
                </span>
              )}
              <time dateTime={article.published_at} className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(article.published_at)}
              </time>
            </div>
            
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="font-semibold text-lg mb-2 hover:text-red-700 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{article.author}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {article.view_count?.toLocaleString('id-ID')}
                </span>
              </div>
              
              <Link
                href={`/artikel/${article.slug}`}
                className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Baca Artikel
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading && loadResult.articles.length === 0) {
    return (
      <div className="space-y-6">
        {showHeader && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">{headerTitle}</h2>
          </div>
        )}
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-red-600 mx-auto mb-4" />
            <p className="text-gray-600">Memuat artikel...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <BarChart3 className="h-12 w-12 mx-auto mb-2" />
          <p className="font-semibold">{error}</p>
        </div>
        <button
          onClick={() => loadMore(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  if (loadResult.articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-semibold">Tidak ada artikel yang ditemukan</p>
          <p className="text-sm mt-2">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{headerTitle}</h2>
          <div className="text-sm text-gray-600">
            Menampilkan {loadResult.totalLoaded} dari {loadResult.totalAvailable || '...'} artikel
            {autoLoading && (
              <span className="ml-2 text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin inline" /> Auto loading...
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className={
        variant === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {loadResult.articles.map((article, index) => renderArticleItem(article, index))}
      </div>
      
      {/* Loading Sentinel */}
      {!autoLoadAll && (
        <div ref={sentinelRef} className="py-8">
          {loading && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-red-600 mr-2" />
              <span className="text-gray-600">Memuat lebih banyak...</span>
            </div>
          )}
          
          {!loadResult.hasMore && loadResult.articles.length > 0 && (
            <div className="text-center text-gray-500">
              <p className="font-medium">Semua artikel telah dimuat</p>
              <p className="text-sm mt-1">
                Total: {loadResult.totalLoaded} artikel
              </p>
            </div>
          )}
        </div>
      )}

      {/* Manual Load More Button */}
      {!autoLoadAll && loadResult.hasMore && !loading && (
        <div className="text-center pt-4">
          <button
            onClick={() => loadMore()}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Muat Lebih Banyak
          </button>
        </div>
      )}

      {/* Auto Load All Toggle */}
      {!autoLoadAll && loadResult.hasMore && (
        <div className="text-center pt-4 border-t">
          <button
            onClick={() => setAutoLoading(true)}
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Muat Semua Artikel Sekaligus ({loadResult.totalAvailable || '...'} total)
          </button>
        </div>
      )}
    </div>
  )
}