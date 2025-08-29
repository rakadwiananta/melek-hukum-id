# 🗄️ SQL Views & Functions Usage Guide
Panduan lengkap penggunaan Views dan Functions untuk sistem Like, Comment, dan Save

## 📋 Daftar Views dan Functions

### 🔍 Views (Read-Only)
1. **`article_stats`** - Statistik lengkap artikel
2. **`user_interactions`** - Ringkasan aktivitas user
3. **`comment_details`** - Detail komentar dengan info artikel
4. **`daily_activity`** - Aktivitas harian agregat
5. **`top_articles_by_category`** - Artikel terpopuler per kategori
6. **`comment_moderation_queue`** - Antrian moderasi komentar

### ⚙️ Functions (Callable)
1. **`get_article_engagement(article_id)`** - Metrics engagement artikel
2. **`get_user_activity(user_identifier)`** - Aktivitas user spesifik
3. **`get_trending_articles(days, limit)`** - Artikel trending

---

## 📊 Penggunaan Views

### 1. Article Stats View
**Mendapatkan statistik artikel lengkap**

```sql
-- Statistik artikel spesifik
SELECT * FROM article_stats 
WHERE id = 'your-article-id';

-- Top 10 artikel berdasarkan popularity score
SELECT id, title, popularity_score, engagement_rate, actual_likes, approved_comments
FROM article_stats 
ORDER BY popularity_score DESC 
LIMIT 10;

-- Artikel dengan engagement rate tertinggi
SELECT id, title, engagement_rate, view_count, actual_likes, approved_comments
FROM article_stats 
WHERE view_count > 100
ORDER BY engagement_rate DESC 
LIMIT 20;

-- Statistik per kategori
SELECT 
    category,
    COUNT(*) as total_articles,
    AVG(popularity_score) as avg_popularity,
    AVG(engagement_rate) as avg_engagement,
    SUM(actual_likes) as total_likes,
    SUM(approved_comments) as total_comments
FROM article_stats 
GROUP BY category 
ORDER BY avg_popularity DESC;
```

### 2. User Interactions View
**Analisis aktivitas pengguna**

```sql
-- User paling aktif
SELECT user_identifier, total_likes, total_comments, total_bookmarks, engagement_level
FROM user_interactions 
ORDER BY (total_likes + approved_comments + total_bookmarks) DESC 
LIMIT 50;

-- Distribusi level engagement
SELECT 
    engagement_level,
    COUNT(*) as user_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_interactions), 2) as percentage
FROM user_interactions 
GROUP BY engagement_level 
ORDER BY user_count DESC;

-- User yang aktif dalam 7 hari terakhir
SELECT user_identifier, engagement_level, last_activity_date
FROM user_interactions 
WHERE last_activity_date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY last_activity_date DESC;

-- User dengan banyak komentar yang disetujui
SELECT user_identifier, total_comments, approved_comments, 
       ROUND(approved_comments * 100.0 / NULLIF(total_comments, 0), 2) as approval_rate
FROM user_interactions 
WHERE total_comments > 0
ORDER BY approved_comments DESC;
```

### 3. Comment Details View
**Analisis komentar mendalam**

```sql
-- Komentar terpanjang yang disetujui
SELECT article_title, author_name, content_length, word_count, created_at
FROM comment_details 
WHERE status = 'approved'
ORDER BY content_length DESC 
LIMIT 20;

-- Komentar berdasarkan kategori artikel
SELECT 
    article_category,
    COUNT(*) as total_comments,
    COUNT(*) FILTER (WHERE status = 'approved') as approved_comments,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_comments,
    AVG(word_count) as avg_word_count
FROM comment_details 
GROUP BY article_category 
ORDER BY total_comments DESC;

-- Aktivitas komentar per jam
SELECT 
    EXTRACT(HOUR FROM created_at) as hour_of_day,
    COUNT(*) as comment_count
FROM comment_details 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour_of_day;
```

### 4. Daily Activity View
**Tren aktivitas harian**

```sql
-- Aktivitas 30 hari terakhir
SELECT activity_date, total_likes, total_comments, total_bookmarks, total_views
FROM daily_activity 
WHERE activity_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY activity_date DESC;

-- Rata-rata aktivitas per hari dalam seminggu
SELECT 
    EXTRACT(DOW FROM activity_date) as day_of_week,
    CASE EXTRACT(DOW FROM activity_date)
        WHEN 0 THEN 'Minggu'
        WHEN 1 THEN 'Senin'
        WHEN 2 THEN 'Selasa'
        WHEN 3 THEN 'Rabu'
        WHEN 4 THEN 'Kamis'
        WHEN 5 THEN 'Jumat'
        WHEN 6 THEN 'Sabtu'
    END as day_name,
    AVG(total_likes) as avg_likes,
    AVG(total_comments) as avg_comments,
    AVG(total_bookmarks) as avg_bookmarks
FROM daily_activity 
WHERE activity_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY EXTRACT(DOW FROM activity_date)
ORDER BY day_of_week;

-- Hari dengan aktivitas tertinggi
SELECT activity_date, 
       (total_likes + total_comments + total_bookmarks) as total_activity
FROM daily_activity 
ORDER BY total_activity DESC 
LIMIT 10;
```

### 5. Top Articles by Category View
**Ranking artikel per kategori**

```sql
-- Top 5 artikel per kategori
SELECT category, title, popularity_score, engagement_rate, rank_in_category
FROM top_articles_by_category 
WHERE rank_in_category <= 5
ORDER BY category, rank_in_category;

-- Artikel yang masuk top 10 overall tapi bukan #1 di kategorinya
SELECT category, title, overall_rank, rank_in_category
FROM top_articles_by_category 
WHERE overall_rank <= 10 AND rank_in_category > 1
ORDER BY overall_rank;

-- Kategori dengan artikel terpopuler
SELECT 
    category,
    MAX(popularity_score) as max_popularity,
    AVG(popularity_score) as avg_popularity,
    COUNT(*) as total_articles
FROM top_articles_by_category 
GROUP BY category 
ORDER BY max_popularity DESC;
```

### 6. Comment Moderation Queue View
**Manajemen moderasi komentar**

```sql
-- Komentar yang perlu perhatian segera
SELECT id, article_title, author_name, spam_indicator, moderation_priority, 
       hours_since_created
FROM comment_moderation_queue 
WHERE moderation_priority >= 8
ORDER BY moderation_priority DESC, created_at ASC;

-- Komentar dengan indikator spam
SELECT spam_indicator, COUNT(*) as count
FROM comment_moderation_queue 
GROUP BY spam_indicator 
ORDER BY count DESC;

-- User dengan banyak komentar pending
SELECT 
    user_identifier,
    COUNT(*) as pending_comments,
    user_total_comments,
    user_approved_comments,
    user_engagement_level
FROM comment_moderation_queue 
GROUP BY user_identifier, user_total_comments, user_approved_comments, user_engagement_level
HAVING COUNT(*) > 3
ORDER BY pending_comments DESC;
```

---

## ⚙️ Penggunaan Functions

### 1. get_article_engagement Function
**Mendapatkan metrics engagement artikel**

```sql
-- Engagement artikel spesifik
SELECT * FROM get_article_engagement('your-article-id');

-- Batch check multiple articles
SELECT * FROM get_article_engagement('article-1')
UNION ALL
SELECT * FROM get_article_engagement('article-2')
UNION ALL
SELECT * FROM get_article_engagement('article-3');

-- Menggunakan dalam query kompleks
WITH article_list AS (
    SELECT id FROM articles WHERE category = 'hukum-pidana' LIMIT 10
)
SELECT a.id, e.*
FROM article_list a
CROSS JOIN LATERAL get_article_engagement(a.id) e;
```

### 2. get_user_activity Function
**Analisis aktivitas user spesifik**

```sql
-- Aktivitas user tertentu
SELECT * FROM get_user_activity('192.168.1.100');

-- Batch check multiple users
SELECT * FROM get_user_activity('user-1')
UNION ALL
SELECT * FROM get_user_activity('user-2');

-- User dengan aktivitas tinggi
WITH active_users AS (
    SELECT DISTINCT user_identifier 
    FROM article_likes 
    WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
)
SELECT u.user_identifier, a.*
FROM active_users u
CROSS JOIN LATERAL get_user_activity(u.user_identifier) a
WHERE a.engagement_level IN ('Active', 'Very Active');
```

### 3. get_trending_articles Function
**Artikel yang sedang trending**

```sql
-- Trending 7 hari terakhir
SELECT * FROM get_trending_articles(7, 10);

-- Trending 24 jam terakhir
SELECT * FROM get_trending_articles(1, 5);

-- Trending bulanan
SELECT * FROM get_trending_articles(30, 20);

-- Trending dengan filter kategori (dalam aplikasi)
-- Function mengembalikan semua, filter di aplikasi atau buat function terpisah
SELECT * FROM get_trending_articles(7, 50)
WHERE category = 'hukum-perdata';
```

---

## 🚀 Query Optimasi dan Best Practices

### Performance Tips

```sql
-- 1. Gunakan index yang sudah dibuat
EXPLAIN ANALYZE SELECT * FROM article_stats WHERE category = 'hukum-pidana';

-- 2. Limit results untuk UI pagination
SELECT * FROM daily_activity 
ORDER BY activity_date DESC 
LIMIT 30 OFFSET 0;

-- 3. Gunakan aggregate functions untuk summary
SELECT 
    COUNT(*) as total_articles,
    SUM(actual_likes) as total_likes,
    AVG(engagement_rate) as avg_engagement
FROM article_stats;

-- 4. Filter dengan WHERE sebelum JOIN
SELECT a.*, s.popularity_score
FROM articles a
JOIN article_stats s ON a.id = s.id
WHERE a.published_at >= CURRENT_DATE - INTERVAL '30 days'
AND s.popularity_score > 100;
```

### Monitoring Queries

```sql
-- 1. Artikel dengan engagement mendadak naik
WITH recent_stats AS (
    SELECT article_id, COUNT(*) as recent_activity
    FROM (
        SELECT article_id FROM article_likes WHERE created_at >= CURRENT_DATE - INTERVAL '1 day'
        UNION ALL
        SELECT article_id FROM article_comments WHERE created_at >= CURRENT_DATE - INTERVAL '1 day'
        UNION ALL
        SELECT article_id FROM article_bookmarks WHERE created_at >= CURRENT_DATE - INTERVAL '1 day'
    ) combined
    GROUP BY article_id
    HAVING COUNT(*) > 10
)
SELECT a.title, r.recent_activity, s.popularity_score
FROM recent_stats r
JOIN articles a ON r.article_id = a.id
JOIN article_stats s ON a.id = s.id
ORDER BY r.recent_activity DESC;

-- 2. Health check - inkonsistensi data
SELECT 
    a.id,
    a.title,
    a.like_count as stored_likes,
    s.actual_likes as calculated_likes,
    ABS(a.like_count - s.actual_likes) as difference
FROM articles a
JOIN article_stats s ON a.id = s.id
WHERE ABS(a.like_count - s.actual_likes) > 0
ORDER BY difference DESC;
```

### Reporting Queries

```sql
-- 1. Weekly Report
SELECT 
    DATE_TRUNC('week', activity_date) as week_start,
    SUM(total_likes) as weekly_likes,
    SUM(total_comments) as weekly_comments,
    SUM(total_bookmarks) as weekly_bookmarks,
    AVG(active_likers) as avg_daily_active_users
FROM daily_activity 
WHERE activity_date >= CURRENT_DATE - INTERVAL '8 weeks'
GROUP BY DATE_TRUNC('week', activity_date)
ORDER BY week_start DESC;

-- 2. Category Performance Report
SELECT 
    category,
    COUNT(*) as article_count,
    SUM(view_count) as total_views,
    SUM(actual_likes) as total_likes,
    SUM(approved_comments) as total_comments,
    AVG(engagement_rate) as avg_engagement,
    MAX(popularity_score) as best_article_score
FROM article_stats 
WHERE category IS NOT NULL
GROUP BY category
ORDER BY total_views DESC;
```

---

## 🔧 Maintenance dan Troubleshooting

### Refresh Materialized Views (jika diperlukan)
```sql
-- Jika ada materialized views, refresh secara manual
-- REFRESH MATERIALIZED VIEW view_name;

-- Check view dependencies
SELECT 
    schemaname,
    viewname,
    definition 
FROM pg_views 
WHERE schemaname = 'public';
```

### Monitoring Performance
```sql
-- Check slow queries
SELECT 
    query,
    mean_time,
    calls,
    total_time
FROM pg_stat_statements 
WHERE query LIKE '%article_stats%'
ORDER BY mean_time DESC;

-- Index usage
SELECT 
    indexrelname,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE schemaname = 'public';
```

Semua views dan functions ini dirancang untuk memberikan performa optimal dan kemudahan dalam menganalisis data interaksi artikel pada sistem Melek Hukum ID.