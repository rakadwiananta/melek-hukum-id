// Koleksi gambar fallback berdasarkan kategori
export const fallbackImages = {
  'anti-korupsi': '/timbangkan.jpg',
  'regulasi': '/fallback-hukum.jpg', 
  'solusi': '/timbangkan.jpg',
  'hukum-pidana': '/fallback-hukum.jpg',
  'hukum-perdata': '/fallback-hukum.jpg',
  'hukum-tata-negara': '/illustrations/National_emblem_of_Indonesia_Garuda_Pancasila.svg.webp',
  'default': '/timbangkan.jpg'
} as const

// Fungsi untuk mendapatkan gambar fallback berdasarkan kategori
export function getFallbackImage(category?: string): string {
  if (!category) return fallbackImages.default
  
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-')
  return fallbackImages[categoryKey as keyof typeof fallbackImages] || fallbackImages.default
}

// Fungsi untuk memvalidasi URL gambar tanpa fallback
export function validateAndFixImageUrl(imageUrl: string, category?: string): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return '' // Kembalikan string kosong jika tidak ada gambar
  }

  const cleanUrl = imageUrl.trim()
  
  // Cek jika URL adalah path lokal yang valid
  if (cleanUrl.startsWith('/')) {
    return cleanUrl
  }
  
  // Cek jika URL eksternal valid
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    // Blokir domain yang diketahui bermasalah
    const problematicDomains = ['i.ibb.co.com']
    const isProblemmatic = problematicDomains.some(domain => cleanUrl.includes(domain))
    
    if (isProblemmatic) {
      return '' // Kembalikan string kosong untuk URL bermasalah
    }
    
    return cleanUrl
  }
  
  // Jika bukan URL valid, anggap sebagai path lokal
  return `/${cleanUrl}`
}