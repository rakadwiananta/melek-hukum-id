'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils'
import { motion } from 'framer-motion'

interface Category {
  id: string
  label: string
  href: string
  count?: number
}

interface CategoryNavProps {
  categories: Category[]
  className?: string
  variant?: 'pills' | 'tabs' | 'list'
}

export default function CategoryNav({ 
  categories, 
  className,
  variant = 'pills' 
}: CategoryNavProps) {
  const pathname = usePathname()

  const navClasses = {
    pills: 'flex flex-wrap gap-2',
    tabs: 'flex gap-1 border-b',
    list: 'flex flex-col gap-1'
  }

  const itemClasses = {
    pills: (isActive: boolean) => cn(
      'px-4 py-2 rounded-full text-sm font-medium transition-all',
      'hover:bg-primary/10 hover:text-primary',
      isActive && 'bg-primary text-white hover:bg-primary hover:text-white'
    ),
    tabs: (isActive: boolean) => cn(
      'px-4 py-2 text-sm font-medium transition-all relative',
      'hover:text-primary',
      isActive && 'text-primary'
    ),
    list: (isActive: boolean) => cn(
      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
      'hover:bg-gray-100',
      isActive && 'bg-primary/10 text-primary'
    )
  }

  return (
    <nav className={cn(navClasses[variant], className)} aria-label="Categories">
      {categories.map((category) => {
        const isActive = pathname === category.href
        
        return (
          <Link
            key={category.id}
            href={category.href}
            className={itemClasses[variant](isActive)}
          >
            <span>{category.label}</span>
            {category.count !== undefined && (
              <span className="ml-2 text-xs opacity-60">
                ({category.count})
              </span>
            )}
            
            {/* Active indicator for tabs */}
            {variant === 'tabs' && isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
