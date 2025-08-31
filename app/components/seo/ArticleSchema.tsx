'use client'

import Script from 'next/script'

interface ArticleSchemaProps {
  article: {
    title: string
    excerpt: string
    content: string
    author: string
    published_at: string
    updated_at?: string
    featured_image?: string
    keywords?: string[]
    url?: string
  }
  faqData?: Array<{
    question: string
    answer: string
  }>
}

export default function ArticleSchema({ article, faqData }: ArticleSchemaProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : article.url || 'https://wacanahukum.com'
  
  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "headline": article.title,
    "description": article.excerpt,
            "image": article.featured_image || "https://wacanahukum.com/logo.png",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wacana Hukum",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wacanahukum.com/logo.png"
      }
    },
    "datePublished": article.published_at,
    "dateModified": article.updated_at || article.published_at,
    "keywords": article.keywords?.join(', ') || '',
    "articleSection": "Hukum",
    "wordCount": article.content.split(' ').length,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ['.article-title', '.article-excerpt', '.article-content']
    }
  }

  // FAQ Schema (if provided)
  const faqSchema = faqData && faqData.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  return (
    <>
      {/* Article Schema */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      
      {/* FAQ Schema (if available) */}
      {faqSchema && (
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      )}
    </>
  )
}
