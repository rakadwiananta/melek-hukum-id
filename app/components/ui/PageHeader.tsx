import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/app/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  breadcrumb?: Array<{ label: string; href?: string }>
}

export default function PageHeader({
  title,
  description,
  children,
  className,
  breadcrumb
}: PageHeaderProps) {
  return (
    <div className={cn('bg-gradient-to-r from-primary/10 to-secondary/10 py-8 md:py-12', className)}>
      <div className="container-padding mx-auto max-w-7xl">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span>/</span>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title & Description */}
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          )}
        </div>

        {/* Additional Content */}
        {children && (
          <div className="mt-6">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
