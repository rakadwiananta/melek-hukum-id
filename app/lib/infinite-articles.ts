import { supabase } from '@/app/lib/supabase'
import type { Article as DbArticle } from '@/app/lib/supabase'

export interface InfiniteLoadingOptions {
  category?: string | null
  author?: string | null
  searchQuery?: string
  sortBy?: 'newest' | 'oldest' | 'popular' | 'trending'
  featuredOnly?: boolean
  editorPickOnly?: boolean
  latestOnly?: boolean
  batchSize?: number
  maxTotal?: number
}

export interface LoadMoreResult {
  articles: DbArticle[]
  hasMore: boolean
  nextCursor?: string
  totalLoaded: number
  totalAvailable?: number
}

class InfiniteArticleLoader {
  private cache = new Map<string, DbArticle[]>()
  private cursors = new Map<string, string>()
  private totalCounts = new Map<string, number>()

  private getCacheKey(options: InfiniteLoadingOptions): string {
    return JSON.stringify({
      category: options.category,
      author: options.author,
      searchQuery: options.searchQuery,
      sortBy: options.sortBy,
      featuredOnly: options.featuredOnly,
      editorPickOnly: options.editorPickOnly,
      latestOnly: options.latestOnly
    })
  }

  async getTotalCount(options: InfiniteLoadingOptions): Promise<number> {
    const cacheKey = this.getCacheKey(options)
    
    if (this.totalCounts.has(cacheKey)) {
      return this.totalCounts.get(cacheKey)!
    }

    if (!supabase) return 0

    let query = supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })

    // Apply same filters as main query
    if (options.category) query = query.eq('category', options.category)
    if (options.author) query = query.eq('author', options.author)
    if (options.searchQuery) {
      const s = options.searchQuery
      query = query.or(`title.ilike.%${s}%,excerpt.ilike.%${s}%,author.ilike.%${s}%`)
    }

    query = query.eq('status', 'published').not('published_at', 'is', null)

    if (options.featuredOnly) query = query.eq('is_featured', true)
    if (options.editorPickOnly) query = query.eq('is_editor_pick', true)
    if (options.latestOnly) query = query.eq('is_latest', true)

    const { count, error } = await query

    if (error) {
      console.error('Error getting total count:', error)
      return 0
    }

    const total = count || 0
    this.totalCounts.set(cacheKey, total)
    return total
  }

  async loadMore(options: InfiniteLoadingOptions, cursor?: string): Promise<LoadMoreResult> {
    const {
      batchSize = 20,
      maxTotal = 1000, // Prevent memory issues
      sortBy = 'newest'
    } = options

    const cacheKey = this.getCacheKey(options)
    
    if (!supabase) {
      return {
        articles: [],
        hasMore: false,
        totalLoaded: 0
      }
    }

    // Get current cache
    const cachedArticles = this.cache.get(cacheKey) || []
    const currentCursor = cursor || this.cursors.get(cacheKey)

    // Check if we've hit the max limit
    if (cachedArticles.length >= maxTotal) {
      return {
        articles: cachedArticles,
        hasMore: false,
        totalLoaded: cachedArticles.length,
        totalAvailable: await this.getTotalCount(options)
      }
    }

    let query = supabase
      .from('articles')
      .select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author, status, is_featured, is_editor_pick, featured_rank, editor_pick_rank, featured_at, editor_pick_at, is_latest, latest_rank, latest_at')

    // Apply filters
    if (options.category) query = query.eq('category', options.category)
    if (options.author) query = query.eq('author', options.author)
    if (options.searchQuery) {
      const s = options.searchQuery
      query = query.or(`title.ilike.%${s}%,excerpt.ilike.%${s}%,author.ilike.%${s}%`)
    }

    query = query.eq('status', 'published').not('published_at', 'is', null)

    if (options.featuredOnly) query = query.eq('is_featured', true)
    if (options.editorPickOnly) query = query.eq('is_editor_pick', true)
    if (options.latestOnly) query = query.eq('is_latest', true)

    // Apply sorting
    switch (sortBy) {
      case 'oldest':
        query = query.order('published_at', { ascending: true })
        break
      case 'popular':
      case 'trending':
        query = query.order('view_count', { ascending: false })
        break
      default:
        query = query.order('published_at', { ascending: false })
    }

    // Handle cursor-based pagination
    if (currentCursor) {
      if (sortBy === 'oldest') {
        query = query.gt('published_at', currentCursor)
      } else if (sortBy === 'popular' || sortBy === 'trending') {
        query = query.lt('view_count', parseInt(currentCursor))
      } else {
        query = query.lt('published_at', currentCursor)
      }
    }

    query = query.limit(batchSize)

    const { data, error } = await query

    if (error) {
      console.error('Error loading more articles:', error)
      return {
        articles: cachedArticles,
        hasMore: false,
        totalLoaded: cachedArticles.length
      }
    }

    const newArticles = (data as unknown as DbArticle[]) || []
    const allArticles = [...cachedArticles, ...newArticles]

    // Update cache
    this.cache.set(cacheKey, allArticles)

    // Set next cursor
    let nextCursor: string | undefined
    if (newArticles.length === batchSize && newArticles.length > 0) {
      const lastArticle = newArticles[newArticles.length - 1]
      if (sortBy === 'oldest') {
        nextCursor = lastArticle.published_at
      } else if (sortBy === 'popular' || sortBy === 'trending') {
        nextCursor = lastArticle.view_count?.toString()
      } else {
        nextCursor = lastArticle.published_at
      }
      if (nextCursor) {
        this.cursors.set(cacheKey, nextCursor)
      }
    }

    const hasMore = newArticles.length === batchSize && allArticles.length < maxTotal
    const totalAvailable = await this.getTotalCount(options)

    return {
      articles: allArticles,
      hasMore,
      nextCursor,
      totalLoaded: allArticles.length,
      totalAvailable
    }
  }

  clearCache(options?: InfiniteLoadingOptions) {
    if (options) {
      const cacheKey = this.getCacheKey(options)
      this.cache.delete(cacheKey)
      this.cursors.delete(cacheKey)
      this.totalCounts.delete(cacheKey)
    } else {
      this.cache.clear()
      this.cursors.clear()
      this.totalCounts.clear()
    }
  }

  getFromCache(options: InfiniteLoadingOptions): DbArticle[] {
    const cacheKey = this.getCacheKey(options)
    return this.cache.get(cacheKey) || []
  }
}

// Singleton instance
export const infiniteArticleLoader = new InfiniteArticleLoader()

// Hook untuk infinite loading
export function useInfiniteArticles(options: InfiniteLoadingOptions) {
  return {
    loadMore: (cursor?: string) => infiniteArticleLoader.loadMore(options, cursor),
    getTotalCount: () => infiniteArticleLoader.getTotalCount(options),
    clearCache: () => infiniteArticleLoader.clearCache(options),
    getFromCache: () => infiniteArticleLoader.getFromCache(options)
  }
}