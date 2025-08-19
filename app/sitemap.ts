import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  now.setHours(12, 0, 0, 0) // Set to noon to avoid timezone issues
  
  return [
    // Main Pages
    {
      url: 'https://bicarahukum.my.id',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://bicarahukum.my.id/kamus-hukum',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://bicarahukum.my.id/artikel',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://bicarahukum.my.id/anti-korupsi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bicarahukum.my.id/solusi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bicarahukum.my.id/regulasi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bicarahukum.my.id/panduan',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    
    // Legal & About Pages (Important for AdSense)
    {
      url: 'https://bicarahukum.my.id/tentang',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://bicarahukum.my.id/kontak',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://bicarahukum.my.id/privacy',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://bicarahukum.my.id/terms',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://bicarahukum.my.id/disclaimer',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: 'https://bicarahukum.my.id/cookies',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    
    // Tools Pages
    {
      url: 'https://bicarahukum.my.id/tools/kuis-korupsi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://bicarahukum.my.id/tools/kalkulator-denda',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    
    // Category Pages
    {
      url: 'https://bicarahukum.my.id/kamus-hukum/kategori/pidana',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bicarahukum.my.id/kamus-hukum/kategori/perdata',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bicarahukum.my.id/kamus-hukum/kategori/tata-negara',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bicarahukum.my.id/kamus-hukum/kategori/anti-korupsi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    
    // Additional Pages
    {
      url: 'https://bicarahukum.my.id/konsultasi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://bicarahukum.my.id/tim',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://bicarahukum.my.id/kerjasama',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}