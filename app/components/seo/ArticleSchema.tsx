import Script from 'next/script'

interface ArticleSchemaProps {
  article: {
    title: string
    excerpt: string
    content: string
    author: string
    published_at: string
    updated_at: string
    featured_image?: string
    keywords?: string[]
  }
}

export default function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.published_at,
    dateModified: article.updated_at,
    image: article.featured_image,
    keywords: article.keywords?.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'Melek Hukum ID',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': typeof window !== 'undefined' ? window.location.href : '',
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
