// Koleksi gambar fallback berdasarkan kategori
export const fallbackImages = {
  'anti-korupsi': '/timbangkan.jpg',
  'regulasi': '/timbangkan.jpg', 
  'solusi': '/timbangkan.jpg',
  'hukum-pidana': '/timbangkan.jpg',
  'hukum-perdata': '/timbangkan.jpg',
  'hukum-tata-negara': '/timbangkan.jpg',
  'default': '/timbangkan.jpg'
} as const

// Fungsi untuk mendapatkan gambar fallback berdasarkan kategori
export function getFallbackImage(category?: string): string {
  if (!category) return fallbackImages.default
  
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-')
  return fallbackImages[categoryKey as keyof typeof fallbackImages] || fallbackImages.default
}

// Fungsi untuk memvalidasi URL gambar dengan fallback yang lebih pintar
export function validateAndFixImageUrl(imageUrl: string, category?: string): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return getFallbackImage(category) // Gunakan fallback jika benar-benar kosong
  }

  const cleanUrl = imageUrl.trim()
  
  // Cek jika URL adalah path lokal yang valid
  if (cleanUrl.startsWith('/')) {
    return cleanUrl
  }
  
  // Cek jika URL eksternal valid
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    // Blokir hanya domain yang benar-benar bermasalah
    const problematicDomains = ['i.ibb.co.com']
    const isProblemmatic = problematicDomains.some(domain => cleanUrl.includes(domain))
    
    if (isProblemmatic) {
      return getFallbackImage(category) // Gunakan fallback untuk URL bermasalah
    }
    
    return cleanUrl
  }
  
  // Jika bukan URL valid tapi ada content, anggap sebagai path lokal
  if (cleanUrl.length > 0) {
    return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`
  }
  
  // Fallback jika semua gagal
  return getFallbackImage(category)
}