import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import ArticleSchema from '@/app/components/seo/ArticleSchema'
import ArticleContent from '@/app/components/article/display/ArticleContent'
import ReadingProgress from '@/app/components/article/meta/ReadingProgress'

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const { data: article } = await supabase
    ?.from('articles')
    ?.select('*')
    ?.eq('slug', slug)
    ?.single() || { data: null }

  if (!article) return {}

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    keywords: article.keywords?.join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featured_image],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: article } = await supabase
    ?.from('articles')
    ?.select('*')
    ?.eq('slug', slug)
    ?.single() || { data: null }

  if (!article) notFound()

  return (
    <>
      <ArticleSchema article={article} />
      <ReadingProgress />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ArticleContent article={article} />
      </div>
    </>
  )
}
