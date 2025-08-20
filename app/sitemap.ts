import { MetadataRoute } from 'next'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

interface SitemapEntry {
  url: string
  lastModified: Date | string
  changeFrequency?: ChangeFrequency
  priority?: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    // Base URL configuration
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bicarahukum.my.id'
    
    // Get current date in proper format
    const now = new Date()
    // Format: YYYY-MM-DD (simpler format for better GSC compatibility)
    const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    
    // Define all pages with proper structure
    const pages: SitemapEntry[] = [
      // ============ MAIN PAGES ============
      {
        url: baseUrl,  // Homepage without trailing slash
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/kamus-hukum`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/artikel`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/anti-korupsi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/solusi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/regulasi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/panduan`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      
      // ============ ABOUT & CONTACT PAGES ============
      {
        url: `${baseUrl}/tentang`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/tim`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/kontak`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/konsultasi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kerjasama`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      
      // ============ LEGAL PAGES (Required for AdSense) ============
      {
        url: `${baseUrl}/privacy`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/disclaimer`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/cookies`,
        lastModified: currentDate,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      
      // ============ TOOLS PAGES ============
      {
        url: `${baseUrl}/tools/kuis-korupsi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/tools/kalkulator-denda`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      
      // ============ CATEGORY PAGES ============
      {
        url: `${baseUrl}/kamus-hukum/kategori/pidana`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kamus-hukum/kategori/perdata`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kamus-hukum/kategori/tata-negara`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kamus-hukum/kategori/anti-korupsi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kamus-hukum/kategori/administrasi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/kamus-hukum/kategori/internasional`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      
      // ============ ARTICLE CATEGORIES ============
      {
        url: `${baseUrl}/artikel/kategori/berita`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/artikel/kategori/opini`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/artikel/kategori/analisis`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/artikel/kategori/edukasi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      
      // ============ TAG PAGES ============
      {
        url: `${baseUrl}/tags/korupsi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/tags/pidana`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/tags/perdata`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/tags/hukum-bisnis`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      
      // ============ SEARCH & ARCHIVE PAGES ============
      {
        url: `${baseUrl}/search`,
        lastModified: currentDate,
        changeFrequency: 'always',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/arsip`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/sitemap-page`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.3,
      },
    ]
    
    // Filter out any undefined or null values and ensure proper format
    const validPages = pages.filter(page => page && page.url)
    
    // Sort by priority (highest first) for better crawling
    validPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))
    
    // Log success for debugging
    console.log(`✅ Sitemap generated successfully with ${validPages.length} URLs`)
    
    return validPages
    
  } catch (error) {
    // Enhanced error handling
    console.error('❌ Error generating sitemap:', error)
    
    // Return minimal valid sitemap on error
    const fallbackUrl = 'https://bicarahukum.my.id'
    const fallbackDate = new Date().toISOString().split('T')[0]
    
    return [
      {
        url: fallbackUrl,
        lastModified: fallbackDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${fallbackUrl}/kamus-hukum`,
        lastModified: fallbackDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${fallbackUrl}/artikel`,
        lastModified: fallbackDate,
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${fallbackUrl}/tentang`,
        lastModified: fallbackDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${fallbackUrl}/kontak`,
        lastModified: fallbackDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]
  }
}

// Export additional metadata for Next.js
export const runtime = 'nodejs'
export const revalidate = 3600 // Revalidate every hour (3600 seconds)
