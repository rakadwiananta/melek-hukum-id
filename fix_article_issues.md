# Panduan Perbaikan Masalah "Artikel Tidak Ditemukan"

## Analisis Masalah

Berdasarkan analisis kode, ada beberapa kemungkinan penyebab artikel tidak ditemukan:

### 1. **Masalah Konfigurasi Environment**
- File `.env.local` mungkin tidak ada atau konfigurasi Supabase salah
- Environment variables tidak ter-set dengan benar

### 2. **Masalah Database Schema**
- Tabel `articles` mungkin tidak ada atau struktur tidak sesuai
- Row Level Security (RLS) menghalangi akses data
- Data artikel tidak ada atau status bukan 'published'

### 3. **Masalah Query**
- Slug tidak cocok dengan yang ada di database
- Status artikel bukan 'published'
- Query gagal karena konfigurasi Supabase

## Langkah Perbaikan

### Step 1: Periksa Konfigurasi Environment

1. Buat file `.env.local` di root project dengan isi:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

2. Ganti nilai-nilai tersebut dengan konfigurasi Supabase yang benar dari dashboard Supabase Anda.

### Step 2: Setup Database

1. Buka Supabase Dashboard → SQL Editor
2. Jalankan script `supabase_setup.sql` yang telah dibuat
3. Script ini akan:
   - Membuat tabel `articles` dan `comments` dengan struktur yang benar
   - Membuat indeks untuk performa
   - Setup Row Level Security policies
   - Insert data contoh untuk testing

### Step 3: Debug Database

1. Jalankan queries dari `debug_supabase.sql` untuk:
   - Memverifikasi struktur tabel
   - Cek apakah ada data artikel
   - Test query yang sama seperti di aplikasi
   - Cek RLS policies

### Step 4: Verifikasi Data

Pastikan artikel yang ingin diakses:
- Ada di database dengan status 'published'
- Memiliki slug yang sesuai dengan URL
- Tidak ter-block oleh RLS policies

## Script SQL untuk Mengatasi Masalah

### Cek Artikel Berdasarkan Slug dari URL
```sql
-- Ganti 'slug-dari-url' dengan slug sebenarnya
SELECT * FROM articles 
WHERE slug = 'viral-kenaikan-pbb-250-oleh-bupati-sudewo-analisis-hukum-dan-hak-anda' 
AND status = 'published';
```

### Insert Artikel Contoh (jika database kosong)
```sql
INSERT INTO articles (
    title, 
    slug, 
    content, 
    excerpt, 
    category, 
    featured_image, 
    author, 
    status
) VALUES (
    'Viral: Kenaikan PBB 250% oleh Bupati Sudewo - Analisis Hukum dan Hak Anda',
    'viral-kenaikan-pbb-250-oleh-bupati-sudewo-analisis-hukum-dan-hak-anda',
    '<h2>Pendahuluan</h2><p>Baru-baru ini viral di media sosial tentang kenaikan Pajak Bumi dan Bangunan (PBB) hingga 250% yang diberlakukan oleh salah satu Bupati.</p><h2>Analisis Hukum</h2><p>Dari segi hukum, penetapan tarif PBB memang merupakan kewenangan pemerintah daerah berdasarkan UU No. 28 Tahun 2009 tentang Pajak Daerah dan Retribusi Daerah.</p><h2>Hak Wajib Pajak</h2><p>Sebagai wajib pajak, Anda memiliki hak untuk mengetahui dasar perhitungan dan dapat mengajukan keberatan jika merasa penetapan tidak sesuai.</p>',
    'Analisis hukum tentang viral kenaikan PBB 250% dan hak-hak wajib pajak dalam menghadapi kebijakan tersebut.',
    'Hukum Pajak',
    '/images/pbb-kenaikan.jpg',
    'Tim Hukum Melek Hukum ID',
    'published'
);
```

## Testing

Setelah menjalankan perbaikan, test dengan:

1. Buka browser dan akses artikel: `http://localhost:3000/artikel/slug-artikel`
2. Periksa console browser untuk error JavaScript
3. Periksa Network tab untuk melihat response dari Supabase
4. Jalankan query debug untuk memastikan data ada

## Troubleshooting Lanjutan

Jika masih bermasalah:

1. **Cek Supabase Dashboard**:
   - Pastikan project aktif
   - Cek Authentication settings
   - Verifikasi RLS policies

2. **Cek Next.js Console**:
   - Jalankan `npm run dev`
   - Lihat error messages di terminal

3. **Cek Browser Console**:
   - Buka Developer Tools
   - Lihat error di Console tab
   - Cek Network tab untuk failed requests

4. **Verifikasi Koneksi**:
   ```javascript
   // Test di browser console
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
   console.log('Supabase configured:', !!window.supabase)
   ```

## Monitoring dan Maintenance

1. **Setup Monitoring**:
   - Monitor error logs dari Supabase
   - Setup alerts untuk failed queries

2. **Regular Maintenance**:
   - Backup database secara berkala
   - Update RLS policies sesuai kebutuhan
   - Monitor performance queries

3. **Content Management**:
   - Pastikan artikel baru memiliki status 'published'
   - Verifikasi slug unik dan SEO-friendly
   - Maintain data consistency