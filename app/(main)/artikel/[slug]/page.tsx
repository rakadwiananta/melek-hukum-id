import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
// import { supabase } from '@/app/lib/supabase'
import { articleRedirectMap } from './route-handler'
import ArticleSchema from '@/app/components/seo/ArticleSchema'
import ArticleContent from '@/app/components/article/display/ArticleContent'
import ReadingProgress from '@/app/components/article/meta/ReadingProgress'
import DisclaimerBox from '@/app/components/article/meta/DisclaimerBox'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import RealTimeArticleView from '@/app/components/article/meta/RealTimeArticleView'

export const revalidate = 60

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
  
  // Return minimal metadata for now
  return {
    title: 'Artikel - Wacana Hukum',
    description: 'Portal hukum Indonesia terpercaya dengan artikel, regulasi, dan solusi hukum terkini.',
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Generate static params untuk ISR
export async function generateStaticParams() {
  // Return empty array for now
  return []
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  // Check if this slug should be redirected to existing article
  const redirectPath = articleRedirectMap[slug]
  if (redirectPath) {
    redirect(redirectPath)
  }
  
  let article: Article | null = null
  
  // Coba ambil dari Supabase terlebih dahulu
  // if (supabase) {
  //   const { data, error } = await supabase
  //     .from('articles')
  //     .select(`
  //       *,
  //       comments(count)
  //     `)
  //     .eq('slug', slug)
  //     .eq('status', 'published')
  //     .single()
    
  //   if (!error && data) {
  //     article = data as unknown as Article
      
  //     // Update view count
  //     await supabase
  //       .from('articles')
  //       .update({ view_count: ((data.view_count as number) || 0) + 1 })
  //       .eq('id', data.id as string)
  //   }
  // }
  
  // Jika tidak ada data, gunakan data dummy untuk sementara
  if (!article) {
    article = {
      id: 'dummy',
      slug: slug,
      title: 'Artikel Hukum',
      excerpt: 'Artikel hukum yang sedang dalam pengembangan.',
      content: '<h2>Artikel Hukum</h2><p>Artikel ini sedang dalam pengembangan.</p>',
      featured_image: '/timbangkan.jpg',
      author: 'Tim Wacana Hukum',
      category: 'Hukum',
      tags: ['hukum'],
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      reading_time: 2,
      view_count: 0,
      like_count: 0,
      comment_count: 0,
      status: 'published'
    } as Article
  }

  // Get related articles
  let relatedArticles: Article[] = []
  // if (supabase) {
  //   const { data } = await supabase
  //     .from('articles')
  //     .select('*')
  //     .eq('category', article.category)
  //     .neq('id', article.id)
  //     .eq('status', 'published')
  //     .limit(3)
    
  //   if (data) {
  //     relatedArticles = data as unknown as Article[]
  //   }
  // }

  // Extract FAQ data from content if available
  const extractFAQData = (content: string) => {
    const faqMatches = content.match(/<h[2-3][^>]*>([^<]+)<\/h[2-3]>/g)
    if (faqMatches && faqMatches.length > 0) {
      return faqMatches.slice(0, 5).map((match, index) => ({
        question: match.replace(/<[^>]+>/g, ''),
        answer: `Jawaban untuk pertanyaan ${index + 1} dapat ditemukan dalam artikel ini.`
      }))
    }
    return undefined
  }

  const faqData = extractFAQData(article.content)

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
          keywords: article.keywords,
          url: `https://wacanahukum.com/artikel/${slug}`
        }}
        faqData={faqData}
      />
      <ReadingProgress />
      
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
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-amber-500 bg-gradient-to-r from-amber-400 to-brown-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm md:text-lg">
                          {article.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{article.author}</p>
                        <p className="text-xs sm:text-sm text-gray-600">Penulis Melek Hukum ID</p>
                      </div>
                    </div>
                    
                    {/* Real-time Views - Full width on mobile */}
                    <div className="w-full">
                      <RealTimeArticleView 
                        articleId={article.id}
                        initialViewCount={article.view_count}
                        initialLikeCount={article.like_count}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Legal Disclaimer */}
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <DisclaimerBox variant="legal" />
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
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${article.title} - ${article.excerpt}`)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://wacanahukum.com'}/artikel/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Share on Twitter
                    </a>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${article.excerpt} ${(process.env.NEXT_PUBLIC_SITE_URL || 'https://wacanahukum.com')}/artikel/${slug}`)}`}
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
                        <div className="relative w-full h-48">
                          <Image
                            src={relatedArticle.featured_image || '/timbangkan.jpg'}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover"
                            loading="lazy"
                            decoding="async"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
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

