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

// Fungsi untuk memvalidasi URL gambar - hanya ganti yang bermasalah
export function validateAndFixImageUrl(imageUrl: string, category?: string): string {
  // Jika tidak ada gambar, gunakan fallback
  if (!imageUrl || imageUrl.trim() === '') {
    return getFallbackImage(category)
  }

  const cleanUrl = imageUrl.trim()
  
  // Jika URL eksternal, kembalikan apa adanya (semua domain diizinkan)
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl
  }
  
  // Jika path lokal, kembalikan apa adanya
  if (cleanUrl.startsWith('/')) {
    return cleanUrl
  }
  
  // Jika ada content tapi bukan URL/path, anggap sebagai path lokal
  if (cleanUrl.length > 0) {
    return `/${cleanUrl}`
  }
  
  // Fallback terakhir
  return getFallbackImage(category)
}