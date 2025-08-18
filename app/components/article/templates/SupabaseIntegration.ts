// Supabase Integration for Article Management
// This file provides functions to interact with Supabase for article CRUD operations

import { createClient } from '@supabase/supabase-js'
import { FullArticle, ArticleMetadata, ArticleSection, ArticleSource } from './ArticleTemplate'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types for Supabase
export interface DatabaseArticle {
  id: string
  title: string
  subtitle?: string
  slug: string
  category: string
  subcategory?: string
  tags: string[]
  author: string
  published_at: string
  updated_at?: string
  read_time: string
  difficulty: string
  summary: string
  meta_description: string
  keywords: string[]
  featured: boolean
  status: string
  view_count: number
  like_count: number
  share_count: number
  disclaimer?: string
  cta_title?: string
  cta_description?: string
  cta_button_text?: string
  cta_button_link?: string
  created_at: string
}

export interface DatabaseSection {
  id: string
  article_id: string
  section_order: number
  title: string
  content: string
  content_type: string
}

export interface DatabaseSubsection {
  id: string
  section_id: string
  subsection_order: number
  title: string
  content: string
  content_type: string
}

export interface DatabaseSource {
  id: string
  article_id: string
  title: string
  source_type: string
  url?: string
  year?: number
  description?: string
}

// Article CRUD Operations

/**
 * Create a new article in Supabase
 */
export async function createArticle(article: FullArticle): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // Insert article metadata
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .insert({
        title: article.metadata.title,
        subtitle: article.metadata.subtitle,
        slug: article.metadata.slug,
        category: article.metadata.category,
        subcategory: article.metadata.subcategory,
        tags: article.metadata.tags,
        author: article.metadata.author,
        published_at: article.metadata.publishedAt,
        read_time: article.metadata.readTime,
        difficulty: article.metadata.difficulty,
        summary: article.metadata.summary,
        meta_description: article.metadata.metaDescription,
        keywords: article.metadata.keywords,
        featured: article.metadata.featured,
        status: article.metadata.status,
        disclaimer: article.disclaimer,
        cta_title: article.callToAction?.title,
        cta_description: article.callToAction?.description,
        cta_button_text: article.callToAction?.buttonText,
        cta_button_link: article.callToAction?.buttonLink
      })
      .select()
      .single()

    if (articleError) throw articleError

    const articleId = articleData.id

    // Insert sections
    for (const section of article.sections) {
      const { data: sectionData, error: sectionError } = await supabase
        .from('article_sections')
        .insert({
          article_id: articleId,
          section_order: section.order,
          title: section.title,
          content: section.content,
          content_type: section.contentType
        })
        .select()
        .single()

      if (sectionError) throw sectionError

      // Insert subsections if any
      if (section.subsections && section.subsections.length > 0) {
        for (const subsection of section.subsections) {
          const { error: subsectionError } = await supabase
            .from('article_subsections')
            .insert({
              section_id: sectionData.id,
              subsection_order: subsection.order,
              title: subsection.title,
              content: subsection.content,
              content_type: subsection.contentType
            })

          if (subsectionError) throw subsectionError
        }
      }
    }

    // Insert sources
    for (const source of article.sources) {
      const { error: sourceError } = await supabase
        .from('article_sources')
        .insert({
          article_id: articleId,
          title: source.title,
          source_type: source.type,
          url: source.url,
          year: source.year,
          description: source.description
        })

      if (sourceError) throw sourceError
    }

    return { success: true, data: articleData }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Get article by slug with all related data
 */
export async function getArticleBySlug(slug: string): Promise<{ success: boolean; data?: FullArticle; error?: string }> {
  try {
    // Get article metadata
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (articleError) throw articleError

    // Get sections with subsections
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('article_sections')
      .select(`
        *,
        article_subsections(*)
      `)
      .eq('article_id', articleData.id)
      .order('section_order')

    if (sectionsError) throw sectionsError

    // Get sources
    const { data: sourcesData, error: sourcesError } = await supabase
      .from('article_sources')
      .select('*')
      .eq('article_id', articleData.id)

    if (sourcesError) throw sourcesError

    // Transform data to FullArticle format
    const fullArticle: FullArticle = {
      metadata: {
        id: articleData.id,
        title: articleData.title,
        subtitle: articleData.subtitle,
        slug: articleData.slug,
        category: articleData.category,
        subcategory: articleData.subcategory,
        tags: articleData.tags,
        author: articleData.author,
        publishedAt: articleData.published_at,
        updatedAt: articleData.updated_at,
        readTime: articleData.read_time,
        difficulty: articleData.difficulty,
        summary: articleData.summary,
        metaDescription: articleData.meta_description,
        keywords: articleData.keywords,
        featured: articleData.featured,
        status: articleData.status,
        viewCount: articleData.view_count,
        likeCount: articleData.like_count,
        shareCount: articleData.share_count
      },
      sections: sectionsData.map(section => ({
        id: section.id,
        order: section.section_order,
        title: section.title,
        content: section.content,
        type: section.content_type as any,
        contentType: section.content_type,
        subsections: section.article_subsections?.map((sub: any) => ({
          id: sub.id,
          order: sub.subsection_order,
          title: sub.title,
          content: sub.content,
          type: sub.content_type as any,
          contentType: sub.content_type
        })) || []
      })),
      sources: sourcesData.map(source => ({
        id: source.id,
        title: source.title,
        type: source.source_type,
        url: source.url,
        year: source.year,
        description: source.description
      })),
      disclaimer: articleData.disclaimer,
      callToAction: articleData.cta_title ? {
        title: articleData.cta_title,
        description: articleData.cta_description,
        buttonText: articleData.cta_button_text,
        buttonLink: articleData.cta_button_link
      } : undefined
    }

    return { success: true, data: fullArticle }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Get articles by category with pagination
 */
export async function getArticlesByCategory(
  category: string, 
  page: number = 1, 
  limit: number = 10
): Promise<{ success: boolean; data?: ArticleMetadata[]; total?: number; error?: string }> {
  try {
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    const articles: ArticleMetadata[] = data.map(article => ({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      slug: article.slug,
      category: article.category,
      subcategory: article.subcategory,
      tags: article.tags,
      author: article.author,
      publishedAt: article.published_at,
      updatedAt: article.updated_at,
      readTime: article.read_time,
      difficulty: article.difficulty,
      summary: article.summary,
      metaDescription: article.meta_description,
      keywords: article.keywords,
      featured: article.featured,
      status: article.status,
      viewCount: article.view_count,
      likeCount: article.like_count,
      shareCount: article.share_count
    }))

    return { success: true, data: articles, total: count || 0 }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Search articles by keyword
 */
export async function searchArticles(
  query: string,
  category?: string,
  page: number = 1,
  limit: number = 10
): Promise<{ success: boolean; data?: ArticleMetadata[]; total?: number; error?: string }> {
  try {
    const offset = (page - 1) * limit
    
    let queryBuilder = supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%,keywords.cs.{${query}}`)

    if (category) {
      queryBuilder = queryBuilder.eq('category', category)
    }

    const { data, error, count } = await queryBuilder
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    const articles: ArticleMetadata[] = data.map(article => ({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      slug: article.slug,
      category: article.category,
      subcategory: article.subcategory,
      tags: article.tags,
      author: article.author,
      publishedAt: article.published_at,
      updatedAt: article.updated_at,
      readTime: article.read_time,
      difficulty: article.difficulty,
      summary: article.summary,
      metaDescription: article.meta_description,
      keywords: article.keywords,
      featured: article.featured,
      status: article.status,
      viewCount: article.view_count,
      likeCount: article.like_count,
      shareCount: article.share_count
    }))

    return { success: true, data: articles, total: count || 0 }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Update article view count
 */
export async function incrementViewCount(articleId: string): Promise<void> {
  await supabase.rpc('increment_view_count', { article_id: articleId })
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(limit: number = 5): Promise<{ success: boolean; data?: ArticleMetadata[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    const articles: ArticleMetadata[] = data.map(article => ({
      id: article.id,
      title: article.title,
      subtitle: article.subtitle,
      slug: article.slug,
      category: article.category,
      subcategory: article.subcategory,
      tags: article.tags,
      author: article.author,
      publishedAt: article.published_at,
      updatedAt: article.updated_at,
      readTime: article.read_time,
      difficulty: article.difficulty,
      summary: article.summary,
      metaDescription: article.meta_description,
      keywords: article.keywords,
      featured: article.featured,
      status: article.status,
      viewCount: article.view_count,
      likeCount: article.like_count,
      shareCount: article.share_count
    }))

    return { success: true, data: articles }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * Get article statistics
 */
export async function getArticleStats(): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('category, status')
      .eq('status', 'published')

    if (error) throw error

    const stats = {
      total: data.length,
      byCategory: data.reduce((acc: any, article: any) => {
        acc[article.category] = (acc[article.category] || 0) + 1
        return acc
      }, {}),
      lastUpdated: new Date().toISOString()
    }

    return { success: true, data: stats }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Utility Functions for AI

/**
 * Generate article slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100) // Limit length
}

/**
 * Validate article data before saving
 */
export function validateArticle(article: FullArticle): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate metadata
  if (!article.metadata.title || article.metadata.title.length < 10) {
    errors.push('Title must be at least 10 characters')
  }
  if (!article.metadata.slug || article.metadata.slug.length < 5) {
    errors.push('Slug must be at least 5 characters')
  }
  if (!article.metadata.summary || article.metadata.summary.length < 100) {
    errors.push('Summary must be at least 100 characters')
  }
  if (!article.metadata.category) {
    errors.push('Category is required')
  }
  if (!article.metadata.tags || article.metadata.tags.length < 3) {
    errors.push('At least 3 tags are required')
  }

  // Validate sections
  if (!article.sections || article.sections.length < 3) {
    errors.push('At least 3 sections are required')
  }

  article.sections.forEach((section, index) => {
    if (!section.title || section.title.length < 5) {
      errors.push(`Section ${index + 1}: Title must be at least 5 characters`)
    }
    if (!section.content || section.content.length < 50) {
      errors.push(`Section ${index + 1}: Content must be at least 50 characters`)
    }
  })

  // Validate sources
  if (!article.sources || article.sources.length < 2) {
    errors.push('At least 2 sources are required')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Generate SEO-friendly meta description
 */
export function generateMetaDescription(title: string, summary: string): string {
  const maxLength = 160
  let description = summary.substring(0, maxLength - 20)
  
  // Find the last complete sentence
  const lastSentence = description.lastIndexOf('.')
  if (lastSentence > 100) {
    description = description.substring(0, lastSentence + 1)
  }
  
  return description.trim()
}

/**
 * Extract keywords from content
 */
export function extractKeywords(title: string, content: string): string[] {
  const commonWords = ['dan', 'atau', 'yang', 'dengan', 'untuk', 'dalam', 'pada', 'dari', 'ke', 'di', 'adalah', 'akan', 'dapat', 'harus', 'jika', 'karena', 'sehingga', 'tetapi', 'namun', 'oleh', 'atas', 'bagi', 'terhadap', 'menurut', 'berdasarkan']
  
  const text = (title + ' ' + content).toLowerCase()
  const words = text.match(/\b[a-z]{4,}\b/g) || []
  
  const wordCount = words.reduce((acc: any, word) => {
    if (!commonWords.includes(word)) {
      acc[word] = (acc[word] || 0) + 1
    }
    return acc
  }, {})
  
  return Object.entries(wordCount)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 10)
    .map(([word]) => word) as string[]
}

// AI Helper Functions

/**
 * Generate article structure for AI
 */
export function generateAIPrompt(topic: string, category: string): string {
  return `
Buat artikel hukum Indonesia dengan topik: "${topic}"
Kategori: ${category}

Gunakan struktur JSON berikut:

{
  "metadata": {
    "title": "[Judul menarik max 80 karakter]",
    "subtitle": "[Subjudul opsional]",
    "slug": "${generateSlug(topic)}",
    "category": "${category}",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "author": "Tim Ahli Hukum Melek Hukum ID",
    "publishedAt": "${new Date().toISOString()}",
    "readTime": "[estimasi menit]",
    "difficulty": "pemula|menengah|lanjutan",
    "summary": "[Ringkasan 150-200 kata]",
    "metaDescription": "[Meta description 150-160 karakter]",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "featured": false,
    "status": "published"
  },
  "sections": [
    {
      "id": "pendahuluan",
      "order": 1,
      "title": "Pendahuluan",
      "content": "[Konten paragraf pembuka]",
      "contentType": "paragraph"
    },
    {
      "id": "dasar-hukum", 
      "order": 2,
      "title": "Dasar Hukum",
      "content": "[Item 1]\\n[Item 2]\\n[Item 3]",
      "contentType": "numbered-list"
    }
    // ... tambahkan section lainnya
  ],
  "sources": [
    {
      "id": "source1",
      "title": "UU No. X Tahun YYYY tentang [Judul]",
      "type": "undang-undang",
      "year": YYYY
    }
    // ... tambahkan sumber lainnya
  ],
  "disclaimer": "Artikel ini bersifat informatif dan edukatif. Untuk kasus spesifik, disarankan berkonsultasi dengan ahli hukum yang kompeten."
}

PENTING:
- Gunakan informasi hukum yang akurat dan terkini (2024/2025)
- Berikan contoh konkret dan relevan
- Hindari memberikan nasihat hukum langsung
- Sertakan estimasi biaya dan waktu yang realistis
- Gunakan bahasa yang mudah dipahami masyarakat awam
- Minimum 1500 kata total content
  `
}

export default {
  createArticle,
  getArticleBySlug,
  getArticlesByCategory,
  searchArticles,
  incrementViewCount,
  getFeaturedArticles,
  getArticleStats,
  validateArticle,
  generateMetaDescription,
  extractKeywords,
  generateAIPrompt,
  generateSlug
}