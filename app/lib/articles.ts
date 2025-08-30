import { supabase } from '@/app/lib/supabase'
import type { Article as DbArticle } from '@/app/lib/supabase'

export type SortBy = 'newest' | 'oldest' | 'popular' | 'trending'

export interface GetArticlesOptions {
  category?: string | null
  author?: string | null
  limit?: number
  page?: number
  searchQuery?: string
  sortBy?: SortBy
  featuredOnly?: boolean
  editorPickOnly?: boolean
  latestOnly?: boolean
}

function applyClientSideFilters(data: DbArticle[], opts: GetArticlesOptions): DbArticle[] {
  let result = [...data]

  if (opts.category) {
    result = result.filter((a) => a.category === opts.category)
  }

  if (opts.author) {
    result = result.filter((a) => a.author === opts.author)
  }

  if (opts.searchQuery) {
    const q = opts.searchQuery.toLowerCase()
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
    )
  }

  if (opts.sortBy) {
    switch (opts.sortBy) {
      case 'newest':
        result.sort(
          (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        )
        break
      case 'oldest':
        result.sort(
          (a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
        )
        break
      case 'popular':
      case 'trending':
        result.sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
        break
    }
  }

  return result
}

export async function getArticles(options: GetArticlesOptions = {}): Promise<DbArticle[]> {
  const { limit = 10, page = 0 } = options

  if (!supabase) {
    return []
  }

  let query = supabase
    .from('articles')
    .select('id, title, slug, excerpt, featured_image, published_at, view_count, category, author, status, is_featured, is_editor_pick, featured_rank, editor_pick_rank, featured_at, editor_pick_at, is_latest, latest_rank, latest_at')

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

  if (options.sortBy) {
    switch (options.sortBy) {
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
  } else {
    // Default order: curated rank then recency
    if (options.featuredOnly) {
      query = query.order('featured_rank', { ascending: true, nullsFirst: false })
                   .order('featured_at', { ascending: false, nullsFirst: false })
                   .order('view_count', { ascending: false, nullsFirst: false })
                   .order('published_at', { ascending: false })
    } else if (options.editorPickOnly) {
      query = query.order('editor_pick_rank', { ascending: true, nullsFirst: false })
                   .order('editor_pick_at', { ascending: false, nullsFirst: false })
                   .order('published_at', { ascending: false })
    } else if (options.latestOnly) {
      query = query.order('latest_rank', { ascending: true, nullsFirst: false })
                   .order('latest_at', { ascending: false, nullsFirst: false })
                   .order('published_at', { ascending: false })
    } else {
      query = query.order('published_at', { ascending: false })
    }
  }

  const start = page * limit
  const end = start + limit - 1
  query = query.range(start, end)

  const { data, error } = await query

  if (error || !data || (Array.isArray(data) && data.length === 0)) {
    return []
  }

  return data as unknown as DbArticle[]
}

export async function getArticleBySlug(slug: string): Promise<DbArticle | null> {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    return null
  }

  return (data as unknown as DbArticle) || null
}

export async function getRelatedArticles(
  category: string,
  excludeId: string,
  limit: number = 3
): Promise<DbArticle[]> {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .neq('id', excludeId)
    .eq('status', 'published')
    .limit(limit)

  if (error || !data) {
    return []
  }

  return data as unknown as DbArticle[]
}

export interface CategorizedArticles {
  featured: DbArticle[]
  editorPick: DbArticle[]
  latest: DbArticle[]
}

export async function getCategorizedArticles(
  { featuredLimit = 6, editorPickLimit = 6, latestLimit = 12 }: { featuredLimit?: number; editorPickLimit?: number; latestLimit?: number }
): Promise<CategorizedArticles> {
  // Ambil unggulan
  const featured = await getArticles({ featuredOnly: true, limit: featuredLimit })

  // Ambil pilihan, excl. unggulan
  let picks = await getArticles({ editorPickOnly: true, limit: editorPickLimit + featured.length })
  const featuredIds = new Set(featured.map(a => a.id))
  picks = picks.filter(a => !featuredIds.has(a.id)).slice(0, editorPickLimit)

  // Ambil latest kurasi manual terlebih dahulu, excl. unggulan+pilihan
  let latest = await getArticles({ latestOnly: true, limit: latestLimit + featured.length + picks.length })
  const excluded = new Set<string>()
  featured.forEach(a => excluded.add(a.id))
  picks.forEach(a => excluded.add(a.id))
  latest = latest.filter(a => !excluded.has(a.id)).slice(0, latestLimit)

  // Fallback ke newest jika latest kurasi kosong setelah exclude
  if (latest.length === 0) {
    let newest = await getArticles({ sortBy: 'newest', limit: latestLimit + featured.length + picks.length })
    newest = newest.filter(a => !excluded.has(a.id)).slice(0, latestLimit)
    latest = newest
  }

  return { featured, editorPick: picks, latest }
} 