# Domain Migration Troubleshooting Guide

## Masalah Styling dan Font Setelah Pergantian Domain

### Gejala Umum
- Font berubah atau tidak konsisten
- Styling CSS tidak dimuat dengan benar
- Layout bergeser atau tidak sesuai
- Resource (gambar, font, CSS) tidak dimuat

### Penyebab Utama

#### 1. Cache Browser
Browser menyimpan cache resource lama dari domain sebelumnya.

#### 2. Font Loading Issues
Font Inter dari Google Fonts mungkin tidak dimuat dengan benar.

#### 3. CSS Variable Problems
Variabel CSS untuk font tidak terdefinisi dengan benar.

#### 4. Resource Loading
DNS prefetch dan preconnect tidak bekerja dengan domain baru.

### Solusi Komprehensif

#### Langkah 1: Clear Cache dan Rebuild
```bash
# Jalankan script cache clearing
npm run clear-cache

# Atau manual:
rm -rf .next
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

#### Langkah 2: Browser Cache Clearing
1. **Chrome/Edge**: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
2. **Firefox**: `Ctrl + F5` (Windows) atau `Cmd + Shift + R` (Mac)
3. **Safari**: `Cmd + Option + R`

#### Langkah 3: Hard Refresh
- Buka Developer Tools (F12)
- Klik kanan pada tombol refresh
- Pilih "Empty Cache and Hard Reload"

#### Langkah 4: Check Environment Variables
Pastikan `NEXT_PUBLIC_SITE_URL` sudah diperbarui dengan domain baru:

```env
NEXT_PUBLIC_SITE_URL=https://your-new-domain.com
```

#### Langkah 5: Verify Font Loading
1. Buka Developer Tools
2. Tab Network
3. Filter by "Font"
4. Pastikan font Inter dimuat dari `fonts.googleapis.com`

### Perbaikan yang Telah Diterapkan

#### 1. Enhanced Font Configuration
```typescript
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
  preload: true,
  adjustFontFallback: true
})
```

#### 2. FontLoader Component
Component baru untuk menangani font loading states:
```typescript
// app/components/performance/FontLoader.tsx
// Menangani loading, loaded, dan error states
```

#### 3. CSS Variables dengan Fallbacks
```css
:root {
  --font-inter: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-sans: var(--font-inter);
}
```

#### 4. Performance Optimizer Updates
- DNS prefetch untuk domain baru
- Preconnect untuk Google Fonts
- Font loading optimization

#### 5. Tailwind Configuration
```typescript
fontFamily: {
  sans: [
    'var(--font-inter)',
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
  ],
}
```

### Testing Checklist

#### ✅ Font Loading
- [ ] Font Inter dimuat dengan benar
- [ ] Fallback fonts bekerja
- [ ] Tidak ada layout shift

#### ✅ CSS Variables
- [ ] `--font-inter` terdefinisi
- [ ] `--font-sans` menggunakan font yang benar
- [ ] Semua elemen menggunakan font yang konsisten

#### ✅ Performance
- [ ] Font loading tidak blocking
- [ ] DNS prefetch bekerja
- [ ] Preconnect berfungsi

#### ✅ Cross-browser
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### Debugging Commands

#### Check Font Loading
```javascript
// Di browser console
document.fonts.ready.then(() => {
  console.log('Fonts loaded:', document.fonts.size);
  document.fonts.forEach(font => console.log(font.family));
});
```

#### Check CSS Variables
```javascript
// Di browser console
getComputedStyle(document.documentElement).getPropertyValue('--font-inter');
getComputedStyle(document.documentElement).getPropertyValue('--font-sans');
```

#### Check Resource Loading
```javascript
// Di browser console
performance.getEntriesByType('resource')
  .filter(r => r.name.includes('font'))
  .forEach(r => console.log(r.name, r.duration));
```

### Emergency Fallback

Jika masalah masih berlanjut, gunakan fallback CSS:

```css
/* Tambahkan ke globals.css sebagai emergency fallback */
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}
```

### Monitoring

#### Performance Monitoring
- Gunakan Lighthouse untuk audit performance
- Monitor Core Web Vitals
- Check font loading metrics

#### Error Monitoring
- Monitor console errors
- Check network failures
- Track font loading failures

### Support

Jika masalah masih berlanjut:
1. Check browser console untuk errors
2. Verify network connectivity
3. Test dengan browser berbeda
4. Check CDN status (Google Fonts)
5. Verify DNS propagation

### Prevention

Untuk mencegah masalah serupa di masa depan:
1. Selalu test di staging environment
2. Use proper font loading strategies
3. Implement comprehensive fallbacks
4. Monitor performance metrics
5. Keep dependencies updated