import React from 'react'
import { Metadata } from 'next'
import ArticleTemplateComponent from '@/app/components/article/templates/ArticleTemplate'
import { perceraianArticle } from '@/app/components/article/templates/sampleArticles'

export const metadata: Metadata = {
  title: `${perceraianArticle.title} | Melek Hukum ID`,
  description: perceraianArticle.summary,
  keywords: perceraianArticle.tags.join(', '),
  openGraph: {
    title: perceraianArticle.title,
    description: perceraianArticle.summary,
    type: 'article',
    publishedTime: perceraianArticle.publishedAt,
    authors: [perceraianArticle.author]
  }
}

export default function PerceraianArticlePage() {
  return <ArticleTemplateComponent article={perceraianArticle} />
}