import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  try {
    // Use current date in proper format for sitemap (not future dates)
    const now = new Date()
    const currentDate = now.toISOString()
    
    // Base URL from environment or fallback
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bicarahukum.my.id'
  
    return [
      // Main Pages
      {
        url: `${baseUrl}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1,
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
        priority: 0.8,
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
        priority: 0.7,
      },
      {
        url: `${baseUrl}/regulasi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/panduan`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      
      // Legal & About Pages (Important for AdSense)
      {
        url: `${baseUrl}/tentang`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/kontak`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/privacy`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/terms`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/disclaimer`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/cookies`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.4,
      },
      
      // Tools Pages
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
      
      // Category Pages
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
      
      // Additional Pages
      {
        url: `${baseUrl}/konsultasi`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.6,
      },
      {
        url: `${baseUrl}/tim`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/kerjasama`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return minimal sitemap if error occurs
    return [
      {
        url: 'https://bicarahukum.my.id',
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1,
      }
    ]
  }
}