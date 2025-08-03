import Link from 'next/link'
import Image from 'next/image'
import { cn, formatDate, calculateReadingTime } from '@/app/lib/utils'
import { Clock, Calendar, ArrowRight } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  author: string
  published_at: string
  category: string
  view_count?: number
}

interface ArticleGridProps {
  articles: Article[]
  columns?: 1 | 2 | 3 | 4
  className?: string
  showImage?: boolean
  showExcerpt?: boolean
  showMeta?: boolean
}

export default function ArticleGrid({
  articles,
  columns = 3,
  className,
  showImage = true,
  showExcerpt = true,
  showMeta = true
}: ArticleGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Belum ada artikel.</p>
      </div>
    )
  }

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {articles.map((article) => (
        <article
          key={article.id}
          className="group bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Image */}
          {showImage && article.featured_image && (
            <Link href={`/artikel/${article.slug}`} className="block overflow-hidden rounded-t-lg">
              <div className="aspect-[16/9] relative">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </Link>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Category Badge */}
            <div className="mb-3">
              <Link
                href={`/${article.category}`}
                className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full hover:bg-primary/20 transition-colors"
              >
                {article.category.replace('-', ' ').toUpperCase()}
              </Link>
            </div>

            {/* Title */}
            <h3 className="mb-2">
              <Link
                href={`/artikel/${article.slug}`}
                className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors"
              >
                {article.title}
              </Link>
            </h3>

            {/* Excerpt */}
            {showExcerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>
            )}

            {/* Meta Info */}
            {showMeta && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(article.published_at, { dateStyle: 'medium' })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {calculateReadingTime(article.excerpt)}
                </span>
              </div>
            )}

            {/* Read More Link */}
            <Link
              href={`/artikel/${article.slug}`}
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:gap-2 transition-all"
            >
              Baca Selengkapnya
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}
