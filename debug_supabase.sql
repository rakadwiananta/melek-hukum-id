-- =====================================================
-- DEBUGGING QUERIES UNTUK MASALAH ARTIKEL TIDAK DITEMUKAN
-- =====================================================

-- 1. Cek apakah tabel articles ada dan strukturnya benar
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns 
WHERE table_name = 'articles' 
ORDER BY ordinal_position;

-- 2. Cek total artikel dalam database
SELECT 
    status,
    COUNT(*) as total
FROM articles 
GROUP BY status;

-- 3. Cek artikel yang published
SELECT 
    id,
    title, 
    slug, 
    status,
    published_at,
    created_at
FROM articles 
WHERE status = 'published' 
ORDER BY published_at DESC 
LIMIT 10;

-- 4. Cek apakah ada artikel dengan slug tertentu (ganti 'test-slug' dengan slug yang bermasalah)
SELECT 
    id,
    title,
    slug,
    status,
    published_at,
    content IS NOT NULL as has_content,
    LENGTH(content) as content_length
FROM articles 
WHERE slug = 'test-slug';

-- 5. Cek Row Level Security policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'articles';

-- 6. Test query yang sama seperti di aplikasi
SELECT 
    id,
    title,
    slug,
    content,
    excerpt,
    category,
    featured_image,
    author,
    published_at,
    updated_at,
    seo_title,
    seo_description,
    keywords,
    view_count,
    like_count,
    comment_count,
    is_featured,
    is_editor_pick,
    featured_rank,
    editor_pick_rank,
    featured_at,
    editor_pick_at,
    is_latest,
    latest_rank,
    latest_at,
    tags
FROM articles 
WHERE slug = 'test-slug' AND status = 'published';

-- 7. Cek apakah ada masalah dengan encoding atau karakter khusus
SELECT 
    slug,
    LENGTH(slug) as slug_length,
    ASCII(LEFT(slug, 1)) as first_char_ascii,
    slug LIKE '%-%' as has_dash,
    slug ~ '^[a-z0-9-]+$' as valid_slug_format
FROM articles 
LIMIT 10;

-- 8. Cek indeks yang ada
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'articles';

-- 9. Test performance query untuk artikel
EXPLAIN ANALYZE 
SELECT * FROM articles 
WHERE slug = 'test-slug' AND status = 'published';

-- 10. Cek apakah ada artikel yang tidak memiliki slug atau slug duplikat
SELECT 
    slug,
    COUNT(*) as count
FROM articles 
GROUP BY slug 
HAVING COUNT(*) > 1;

-- 11. Cek artikel dengan slug null atau kosong
SELECT 
    id,
    title,
    slug,
    status
FROM articles 
WHERE slug IS NULL OR slug = '' OR TRIM(slug) = '';

-- =====================================================
-- QUERIES UNTUK PERBAIKAN DATA
-- =====================================================

-- 12. Update artikel yang tidak memiliki status
UPDATE articles 
SET status = 'published' 
WHERE status IS NULL OR status = '';

-- 13. Update artikel yang tidak memiliki published_at
UPDATE articles 
SET published_at = created_at 
WHERE published_at IS NULL AND status = 'published';

-- 14. Generate slug untuk artikel yang tidak memiliki slug
UPDATE articles 
SET slug = LOWER(
    REGEXP_REPLACE(
        REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
    )
)
WHERE slug IS NULL OR slug = '';

-- 15. Update view_count, like_count, comment_count jika NULL
UPDATE articles 
SET 
    view_count = COALESCE(view_count, 0),
    like_count = COALESCE(like_count, 0),
    comment_count = COALESCE(comment_count, 0)
WHERE view_count IS NULL OR like_count IS NULL OR comment_count IS NULL;

-- =====================================================
-- TESTING SPECIFIC SLUGS (untuk debugging)
-- =====================================================

-- Test dengan slug yang mungkin bermasalah dari URL screenshot
-- Ganti dengan slug sebenarnya dari URL yang bermasalah
SELECT 
    'Testing specific slug' as test_name,
    EXISTS(
        SELECT 1 FROM articles 
        WHERE slug = 'viral-kenaikan-pbb-250-oleh-bupati-sudewo-analisis-hukum-dan-hak-anda' 
        AND status = 'published'
    ) as article_exists;

-- Cari artikel dengan kata kunci dari URL
SELECT 
    id,
    title,
    slug,
    status,
    published_at
FROM articles 
WHERE 
    (title ILIKE '%pbb%' OR title ILIKE '%bupati%' OR title ILIKE '%sudewo%')
    AND status = 'published'
ORDER BY published_at DESC;

-- =====================================================
-- FINAL VERIFICATION
-- =====================================================

-- Verifikasi bahwa semuanya berjalan dengan baik
SELECT 
    'Database Status' as check_name,
    (SELECT COUNT(*) FROM articles WHERE status = 'published') as published_articles,
    (SELECT COUNT(*) FROM articles WHERE slug IS NOT NULL AND slug != '') as articles_with_slug,
    (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'articles') as rls_policies
;