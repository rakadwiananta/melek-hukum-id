import React from 'react'
import { Metadata } from 'next'
import ArticleTemplateComponent from '@/app/components/article/templates/ArticleTemplate'
import { mendirikanPTArticle } from '@/app/components/article/templates/sampleArticles'

export const metadata: Metadata = {
  title: `${mendirikanPTArticle.title} | Melek Hukum ID`,
  description: mendirikanPTArticle.summary,
  keywords: mendirikanPTArticle.tags.join(', '),
  openGraph: {
    title: mendirikanPTArticle.title,
    description: mendirikanPTArticle.summary,
    type: 'article',
    publishedTime: mendirikanPTArticle.publishedAt,
    authors: [mendirikanPTArticle.author]
  }
}

export default function MendirikanPTArticlePage() {
  return <ArticleTemplateComponent article={mendirikanPTArticle} />
}