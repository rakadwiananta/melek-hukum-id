import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    ...options,
  }).format(new Date(date))
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export function generateExcerpt(content: string, length: number = 160) {
  const plainText = content.replace(/<[^>]*>/g, '')
  return truncate(plainText, length)
}

export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} menit baca`
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat('id-ID').format(num)
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getImageUrl(path: string) {
  if (path.startsWith('http')) return path
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  // If no environment variable is set, return relative path
  if (!siteUrl) {
    return path
  }
  
  // Validate the site URL
  try {
    new URL(siteUrl)
    return `${siteUrl}${path}`
  } catch (error) {
    console.warn('Invalid NEXT_PUBLIC_SITE_URL:', siteUrl, 'Using relative path')
    return path
  }
}

export function shareUrl(platform: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin', url: string, title?: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title || '')

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  window.open(shareUrls[platform], '_blank', 'width=600,height=400')
}
