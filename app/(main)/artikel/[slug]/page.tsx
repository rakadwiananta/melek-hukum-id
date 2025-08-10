import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import ArticleSchema from '@/app/components/seo/ArticleSchema'
import ArticleContent from '@/app/components/article/display/ArticleContent'
import ReadingProgress from '@/app/components/article/meta/ReadingProgress'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Interface untuk Article yang sesuai dengan data structure
interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  category: string
  tags?: string[]
  published_at: string
  updated_at: string
  reading_time?: number
  view_count: number
  like_count: number
  comment_count: number
  seo_title?: string
  seo_description?: string
  keywords?: string[]
  status?: string
}

// Interface untuk ArticleContent props
interface ArticleContentProps {
  article: {
    id: string
    title: string
    content: string
    author: string
    published_at: string
    featured_image?: string
    view_count: number
    like_count: number
    category?: string
    tags?: string[]
    excerpt?: string
    comment_count?: number
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  let article: Article | null = null
  
  // Coba ambil dari Supabase terlebih dahulu
  if (supabase) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (!error && data) {
      article = data
    }
  }
  
  // Jika tidak ada data, biarkan metadata minimal non-index

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Melek Hukum ID',
      description: 'Artikel yang Anda cari tidak ditemukan.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const publishedTime = new Date(article.published_at).toISOString()
  const modifiedTime = new Date(article.updated_at || article.published_at).toISOString()

  return {
    title: article.seo_title || `${article.title} - Melek Hukum ID`,
    description: article.seo_description || article.excerpt,
    keywords: article.keywords?.join(', ') || article.tags?.join(', ') || '',
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [article.author],
      images: [
        {
          url: article.featured_image,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      locale: 'id_ID',
      siteName: 'Melek Hukum ID',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featured_image],
      creator: '@melekhukumid',
    },
    alternates: {
      canonical: `https://melekhukum.id/artikel/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

// Generate static params untuk ISR
export async function generateStaticParams() {
  if (supabase) {
    const { data } = await supabase
      .from('articles')
      .select('slug')
      .eq('status', 'published')
      .limit(100)
    
    return data?.map((article) => ({
      slug: article.slug,
    })) || []
  }
  
  return []
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  let article: Article | null = null
  
  // Coba ambil dari Supabase terlebih dahulu
  if (supabase) {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        *,
        comments(count)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (!error && data) {
      article = data
      
      // Update view count
      await supabase
        .from('articles')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id)
    }
  }
  
  // Jika tidak ada data, 404

  if (!article) {
    notFound()
  }

  // Get related articles
  let relatedArticles: Article[] = []
  if (supabase) {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('category', article.category)
      .neq('id', article.id)
      .eq('status', 'published')
      .limit(3)
    
    if (data) {
      relatedArticles = data
    }
  }

  return (
    <>
      <ArticleSchema 
        article={{
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          author: article.author,
          published_at: article.published_at,
          updated_at: article.updated_at || article.published_at,
          featured_image: article.featured_image,
          keywords: article.keywords
        }} 
      />
      <ReadingProgress />
      
      {/* Structured Data */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            image: article.featured_image,
            datePublished: article.published_at,
            dateModified: article.updated_at || article.published_at,
            author: {
              '@type': 'Person',
              name: article.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Melek Hukum ID',
              logo: {
                '@type': 'ImageObject',
                url: 'https://melekhukum.id/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://melekhukum.id/artikel/${slug}`,
            },
            keywords: article.keywords?.join(', ') || article.tags?.join(', ') || '',
            articleSection: article.category,
            wordCount: article.content.split(' ').length,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['.article-title', '.article-excerpt', '.article-content'],
            },
          }),
        }}
      />
      
      {/* Mobile Optimized Container */}
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50">
        {/* Article Header */}
        <div className="relative h-64 bg-gradient-to-r from-amber-100 to-brown-100">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold article-title">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Article */}
            <article className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Article Header */}
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-brown-500 text-white text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(article.published_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {article.reading_time || Math.ceil(article.content.split(' ').length / 200)} menit baca
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 article-title">
                    {article.title}
                  </h1>
                  
                  <p className="text-lg md:text-xl text-gray-600 mb-6 article-excerpt">
                    {article.excerpt}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-amber-500 bg-gradient-to-r from-amber-400 to-brown-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {article.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{article.author}</p>
                      <p className="text-sm text-gray-600">Penulis Melek Hukum ID</p>
                    </div>
                  </div>
                </div>
                
                {/* Article Content */}
                <div className="p-6 md:p-8 article-content">
                  <ArticleContent 
                    article={{
                      id: article.id,
                      title: article.title,
                      content: article.content,
                      author: article.author,
                      published_at: article.published_at,
                      featured_image: article.featured_image,
                      view_count: article.view_count,
                      like_count: article.like_count,
                      category: article.category,
                      tags: article.tags,
                      excerpt: article.excerpt,
                      comment_count: article.comment_count
                    }} 
                  />
                </div>
                
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="p-6 md:p-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Share Buttons */}
                <div className="p-6 md:p-8 border-t border-gray-100">
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${article.title} - ${article.excerpt}`)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://melekhukum.id'}/artikel/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Share on Twitter
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${article.excerpt} ${(process.env.NEXT_PUBLIC_SITE_URL || 'https://melekhukum.id')}/artikel/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Share on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Artikel Terkait</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={`/artikel/${relatedArticle.slug}`}
                        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        <img
                          src={relatedArticle.featured_image}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {relatedArticle.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {relatedArticle.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Article Stats */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <h4 className="font-semibold mb-4">Statistik Artikel</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dilihat</span>
                      <span className="font-semibold">{article.view_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Suka</span>
                      <span className="font-semibold">{article.like_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Komentar</span>
                      <span className="font-semibold">{article.comment_count}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h4 className="font-semibold mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/artikel?tag=${encodeURIComponent(tag)}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

