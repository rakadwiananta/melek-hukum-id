# Panduan Perbaikan Masalah Rendering Gambar Artikel

## Masalah yang Ditemukan

Gambar artikel dari Supabase terkadang tidak terender secara konsisten karena beberapa faktor:

### 1. **Logika Fallback yang Tidak Konsisten**
- Setiap komponen memiliki implementasi `getImage()` yang berbeda
- Tidak ada penanganan error yang uniform
- Path validation yang tidak akurat untuk URL Supabase

### 2. **Tidak Ada Error Handling**
- Komponen tidak menangani kasus ketika gambar gagal dimuat
- Tidak ada retry mechanism
- Tidak ada loading state yang proper

### 3. **Masalah Performa**
- Gambar tidak di-preload dengan benar
- Tidak ada optimasi untuk different screen sizes
- Cache strategy yang tidak optimal

## Solusi yang Diimplementasi

### 1. **Utilitas Terpusat (`/app/lib/image-utils.ts`)**

```typescript
// Fungsi utama untuk mendapatkan URL gambar yang valid
export function getValidImageUrl(config: ImageConfig): string

// Fallback images berdasarkan kategori
export const FALLBACK_IMAGES = {
  'anti-korupsi': '/illustrations/blog-kejaksaan.jpeg',
  'regulasi': '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg',
  'solusi': '/timbangkan.jpg',
  // ...
}

// Validasi URL gambar
export async function validateImageUrl(url: string): Promise<boolean>

// Hook untuk menangani state gambar
export function useImageState(initialSrc: string)

// Preload gambar untuk performa
export function preloadImage(src: string): Promise<void>
```

### 2. **Komponen ArticleImage yang Robust (`/app/components/ui/ArticleImage.tsx`)**

```typescript
// Komponen utama dengan error handling lengkap
export default function ArticleImage(props: ArticleImageProps)

// Khusus untuk hero/featured images
export function ArticleHeroImage(props: HeroImageProps)

// Khusus untuk thumbnail/card images  
export function ArticleCardImage(props: CardImageProps)
```

**Fitur utama:**
- ✅ **Automatic fallback** berdasarkan kategori artikel
- ✅ **Retry mechanism** (maksimal 2x retry dengan fallback berbeda)
- ✅ **Loading skeleton** dengan animasi
- ✅ **Error state** dengan placeholder yang informatif
- ✅ **Performance optimization** (lazy loading, priority loading)
- ✅ **Responsive images** dengan sizes yang optimal

### 3. **Implementasi di Komponen Existing**

Komponen yang sudah diperbaiki:
- ✅ `ArticleCard.tsx`
- ✅ `ArticleHero.tsx` 
- ✅ `ArticleFeatured.tsx`

## Cara Menggunakan

### 1. **Untuk Gambar Hero/Featured**
```typescript
import { ArticleHeroImage } from '@/app/components/ui/ArticleImage'

<ArticleHeroImage
  src={article.featured_image}
  alt={article.title}
  category={article.category}
  className="object-cover"
/>
```

### 2. **Untuk Gambar Card/Thumbnail**
```typescript
import { ArticleCardImage } from '@/app/components/ui/ArticleImage'

<ArticleCardImage
  src={article.featured_image}
  alt={article.title}
  category={article.category}
  className="object-cover"
  priority={shouldEagerLoad}
/>
```

### 3. **Untuk Gambar Custom**
```typescript
import ArticleImage from '@/app/components/ui/ArticleImage'

<ArticleImage
  src={imageSrc}
  alt="Description"
  width={400}
  height={300}
  category="solusi"
  priority={true}
  onLoad={() => console.log('Image loaded')}
  onError={() => console.log('Image failed')}
/>
```

## Penjelasan Teknis

### 1. **Algoritma Fallback**
```
1. Cek apakah src tersedia dan valid
2. Jika tidak, gunakan fallback berdasarkan kategori
3. Jika gagal retry dengan FALLBACK_IMAGES[category]
4. Jika masih gagal, gunakan FALLBACK_IMAGES.default
5. Jika tetap gagal, tampilkan error placeholder
```

### 2. **Performance Optimizations**
- **Priority loading** untuk gambar hero (LCP improvement)
- **Lazy loading** untuk gambar di bawah fold
- **Responsive images** dengan sizes attribute yang optimal
- **Preloading** untuk gambar penting

### 3. **Error Handling Flow**
```
Loading → Image Load Attempt → Success/Error
                ↓
         Error → Retry with fallback → Success/Error
                ↓
         Error → Retry with default → Success/Error
                ↓
         Error → Show error placeholder
```

## Manfaat Solusi

### 1. **Konsistensi**
- ✅ Semua komponen menggunakan logic yang sama
- ✅ Fallback behavior yang predictable
- ✅ Error handling yang uniform

### 2. **Performa**
- ✅ Faster loading dengan priority optimization
- ✅ Better UX dengan loading skeleton
- ✅ Reduced layout shift

### 3. **Developer Experience**
- ✅ API yang simple dan konsisten
- ✅ TypeScript support lengkap
- ✅ Dokumentasi yang clear

### 4. **User Experience**
- ✅ Tidak ada broken images
- ✅ Loading states yang informatif
- ✅ Graceful degradation

## Migration Guide

### Langkah 1: Replace Image imports
```typescript
// Before
import Image from 'next/image'

// After
import { ArticleCardImage, ArticleHeroImage } from '@/app/components/ui/ArticleImage'
```

### Langkah 2: Replace getImage() functions
```typescript
// Before
const getImage = (src?: string) => {
  const s = (src || '').trim()
  if (!s || s.includes('/images/articles/')) return '/timbangkan.jpg'
  return s
}

// After
// Tidak perlu lagi - handled by ArticleImage component
```

### Langkah 3: Update Image usage
```typescript
// Before
<Image 
  src={getImage(article.featured_image)} 
  alt={article.title}
  fill
/>

// After
<ArticleCardImage
  src={article.featured_image}
  alt={article.title}
  category={article.category}
/>
```

## Testing

### Test Cases yang Perlu Dicek:
1. ✅ **Valid Supabase URL** - should render correctly
2. ✅ **Invalid/broken URL** - should fallback gracefully
3. ✅ **Empty src** - should use category fallback
4. ✅ **Network error** - should retry and fallback
5. ✅ **Large images** - should load with skeleton
6. ✅ **Mobile responsiveness** - should use correct sizes

### Monitoring:
- Monitor console untuk error messages
- Check Network tab untuk failed requests
- Verify loading performance dengan Lighthouse

## Troubleshooting

### Jika gambar masih tidak muncul:

1. **Check Supabase Storage**
   ```bash
   # Verify bucket exists and is public
   # Check RLS policies
   ```

2. **Check Image URLs**
   ```typescript
   console.log('Image URL:', getValidImageUrl({ src: article.featured_image, category: article.category }))
   ```

3. **Check Network**
   ```bash
   # Test URL accessibility
   curl -I "https://your-supabase-url.com/storage/v1/object/public/bucket/image.jpg"
   ```

4. **Check Console Errors**
   - Look for CORS errors
   - Check for 404/403 responses
   - Verify fallback logic execution

## Best Practices

### 1. **Always provide category**
```typescript
<ArticleCardImage
  src={article.featured_image}
  alt={article.title}
  category={article.category} // ← Important!
/>
```

### 2. **Use appropriate variant**
- `ArticleHeroImage` untuk hero sections
- `ArticleCardImage` untuk cards/thumbnails
- `ArticleImage` untuk custom cases

### 3. **Optimize loading**
```typescript
// Priority untuk above-the-fold content
<ArticleHeroImage priority={true} />

// Lazy loading untuk below-the-fold
<ArticleCardImage priority={false} />
```

### 4. **Handle errors gracefully**
```typescript
<ArticleImage
  onError={() => {
    // Optional: track error untuk monitoring
    console.warn('Image failed to load:', src)
  }}
/>
```

## Monitoring & Analytics

Tambahkan tracking untuk monitoring:

```typescript
// Track image loading performance
const handleImageLoad = () => {
  analytics.track('image_loaded', {
    src: currentSrc,
    category: article.category,
    loadTime: Date.now() - startTime
  })
}

// Track image errors
const handleImageError = () => {
  analytics.track('image_error', {
    src: originalSrc,
    category: article.category,
    errorCount: retryCount
  })
}
```

---

**Dengan implementasi ini, masalah rendering gambar artikel dari Supabase yang tidak konsisten seharusnya sudah teratasi dengan baik.**