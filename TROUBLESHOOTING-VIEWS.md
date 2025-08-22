# Troubleshooting: Supabase View Count Issues

## Masalah yang Ditemukan

View count tidak terdeteksi di Supabase karena beberapa kemungkinan:

1. **RPC Function Missing**: Function `increment_article_views` belum ada di database
2. **Environment Variables**: Supabase credentials belum dikonfigurasi
3. **Database Schema**: Tabel `article_views` atau trigger belum dibuat
4. **Permissions**: RPC function tidak memiliki permission yang tepat

## Langkah-langkah Perbaikan

### 1. Periksa Konfigurasi Environment Variables

Pastikan file `.env.local` memiliki:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Jalankan SQL Migrations

Jalankan SQL berikut di Supabase SQL Editor secara berurutan:

1. **supabase-migrations-updated.sql** - Membuat tabel dan trigger
2. **supabase-views.sql** - Membuat views untuk analytics
3. **supabase-rpc-functions.sql** - Membuat RPC functions (BARU)

### 3. Test Koneksi Supabase

Akses endpoint debug untuk test koneksi:

```bash
GET /api/debug/supabase-test
```

Response yang diharapkan:
```json
{
  "supabase_configured": true,
  "connection_test": { "success": true },
  "articles_test": { "success": true, "sample_articles": 3 },
  "rpc_functions_test": { "success": true },
  "view_increment_test": { "success": true }
}
```

### 4. Test Manual View Increment

```bash
POST /api/debug/supabase-test
Content-Type: application/json

{
  "articleId": "your-article-id",
  "action": "increment_view"
}
```

### 5. Periksa Database Schema

Pastikan tabel berikut ada di Supabase:

- `articles` - dengan kolom `view_count`, `like_count`, `comment_count`
- `article_views` - untuk tracking views
- `article_likes` - untuk tracking likes
- `article_comments` - untuk tracking comments

### 6. Periksa RPC Functions

Di Supabase Dashboard > Database > Functions, pastikan ada:

- `increment_article_views(UUID, TEXT, TIMESTAMP)`
- `increment_article_views_simple(UUID, TEXT)`
- `get_article_stats(UUID)`

## Testing Real-time Functionality

### Test di Browser

1. Buka artikel di browser
2. Buka Developer Tools > Network
3. Tunggu 3 detik (auto-increment delay)
4. Lihat request ke `/api/articles/[id]/view`
5. Periksa response success dan view_count

### Test Manual

```javascript
// Test di browser console
fetch('/api/articles/YOUR_ARTICLE_ID/view', {
  method: 'POST'
})
.then(r => r.json())
.then(console.log)
```

## Common Issues & Solutions

### Issue: "function increment_article_views does not exist"

**Solution**: Jalankan `supabase-rpc-functions.sql` di Supabase SQL Editor

### Issue: "permission denied for function"

**Solution**: Tambahkan grant permissions:
```sql
GRANT EXECUTE ON FUNCTION increment_article_views(UUID, TEXT, TIMESTAMP WITH TIME ZONE) TO anon, authenticated;
```

### Issue: "articles table not found"

**Solution**: Pastikan tabel articles sudah ada dan memiliki kolom yang tepat

### Issue: View count tidak update di UI

**Solution**: 
1. Periksa Supabase real-time subscriptions
2. Pastikan `useArticleViews` hook dipanggil dengan benar
3. Periksa console untuk error

## Monitoring & Debugging

### Check Supabase Logs

Di Supabase Dashboard > Logs, periksa:
- Database logs untuk error SQL
- API logs untuk request/response
- Real-time logs untuk subscriptions

### Check Browser Console

Periksa error di browser console:
- Network errors
- JavaScript errors
- Supabase client errors

### Check API Response

Pastikan API `/api/articles/[id]/view` mengembalikan:
```json
{
  "success": true,
  "view_count": 123,
  "message": "View count updated successfully"
}
```

## Performance Optimization

### Rate Limiting

RPC function `increment_article_views` sudah memiliki built-in rate limiting:
- 1 view per IP per artikel per hari
- Menggunakan `increment_article_views_simple` untuk testing

### Caching

View count di-cache di:
- Browser sessionStorage (prevent duplicate views)
- Supabase real-time subscriptions
- Component state management

## Next Steps

1. Jalankan debug endpoint untuk identifikasi masalah spesifik
2. Jalankan SQL migrations yang missing
3. Test view increment functionality
4. Monitor real-time updates
5. Verify UI updates correctly

Jika masih ada masalah, periksa:
- Supabase project settings
- Database permissions
- Environment variables
- Network connectivity