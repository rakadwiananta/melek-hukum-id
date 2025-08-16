import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  now.setHours(12, 0, 0, 0) // Set to noon to avoid timezone issues
  
  return [
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
      url: 'https://bicarahukum.my.id/panduan',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]
}