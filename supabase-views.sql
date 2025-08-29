-- SQL Views untuk Like dan Comment Analytics
-- Jalankan setelah supabase-migrations.sql

-- ===========================================
-- VIEW: Article Statistics Summary
-- ===========================================
CREATE OR REPLACE VIEW article_stats AS
SELECT 
    a.id,
    a.slug,
    a.title,
    a.category,
    a.published_at,
    a.view_count,
    a.like_count,
    a.comment_count,
    -- Real-time counts dari tabel relasi
    COALESCE(likes.total_likes, 0) as actual_likes,
    COALESCE(comments.total_comments, 0) as actual_comments,
    COALESCE(approved_comments.approved_comments, 0) as approved_comments,
    COALESCE(views.unique_views, 0) as unique_views,
    COALESCE(bookmarks.total_bookmarks, 0) as total_bookmarks,
    -- Engagement metrics
    CASE 
        WHEN a.view_count > 0 THEN 
            ROUND((COALESCE(likes.total_likes, 0) + COALESCE(approved_comments.approved_comments, 0)) * 100.0 / a.view_count, 2)
        ELSE 0 
    END as engagement_rate,
    -- Popularity score (weighted)
    (
        a.view_count * 1.0 + 
        COALESCE(likes.total_likes, 0) * 5.0 + 
        COALESCE(approved_comments.approved_comments, 0) * 10.0 +
        COALESCE(bookmarks.total_bookmarks, 0) * 3.0
    ) as popularity_score
FROM articles a
LEFT JOIN (
    SELECT article_id, COUNT(*) as total_likes
    FROM article_likes
    GROUP BY article_id
) likes ON a.id = likes.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as total_comments
    FROM article_comments
    GROUP BY article_id
) comments ON a.id = comments.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as approved_comments
    FROM article_comments
    WHERE status = 'approved'
    GROUP BY article_id
) approved_comments ON a.id = approved_comments.article_id
LEFT JOIN (
    SELECT article_id, COUNT(DISTINCT user_identifier) as unique_views
    FROM article_views
    GROUP BY article_id
) views ON a.id = views.article_id
LEFT JOIN (
    SELECT article_id, COUNT(*) as total_bookmarks
    FROM article_bookmarks
    GROUP BY article_id
) bookmarks ON a.id = bookmarks.article_id;

-- ===========================================
-- VIEW: User Interaction Summary
-- ===========================================
CREATE OR REPLACE VIEW user_interactions AS
SELECT 
    user_identifier,
    -- Like statistics
    COALESCE(likes.total_likes, 0) as total_likes,
    COALESCE(likes.recent_likes, 0) as likes_last_7_days,
    -- Comment statistics
    COALESCE(comments.total_comments, 0) as total_comments,
    COALESCE(comments.approved_comments, 0) as approved_comments,
    COALESCE(comments.pending_comments, 0) as pending_comments,
    COALESCE(comments.recent_comments, 0) as comments_last_7_days,
    -- Bookmark statistics
    COALESCE(bookmarks.total_bookmarks, 0) as total_bookmarks,
    COALESCE(bookmarks.recent_bookmarks, 0) as bookmarks_last_7_days,
    -- Activity metrics
    GREATEST(
        COALESCE(likes.last_like_date, '1970-01-01'::date),
        COALESCE(comments.last_comment_date, '1970-01-01'::date),
        COALESCE(bookmarks.last_bookmark_date, '1970-01-01'::date)
    ) as last_activity_date,
    -- Engagement level
    CASE 
        WHEN COALESCE(likes.total_likes, 0) + COALESCE(comments.approved_comments, 0) + COALESCE(bookmarks.total_bookmarks, 0) >= 50 THEN 'Very Active'
        WHEN COALESCE(likes.total_likes, 0) + COALESCE(comments.approved_comments, 0) + COALESCE(bookmarks.total_bookmarks, 0) >= 20 THEN 'Active'
        WHEN COALESCE(likes.total_likes, 0) + COALESCE(comments.approved_comments, 0) + COALESCE(bookmarks.total_bookmarks, 0) >= 5 THEN 'Moderate'
        ELSE 'Low'
    END as engagement_level
FROM (
    SELECT DISTINCT user_identifier FROM (
        SELECT user_identifier FROM article_likes
        UNION
        SELECT user_identifier FROM article_comments
        UNION
        SELECT user_identifier FROM article_bookmarks
    ) all_users
) users
LEFT JOIN (
    SELECT 
        user_identifier,
        COUNT(*) as total_likes,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as recent_likes,
        MAX(created_at::date) as last_like_date
    FROM article_likes
    GROUP BY user_identifier
) likes ON users.user_identifier = likes.user_identifier
LEFT JOIN (
    SELECT 
        user_identifier,
        COUNT(*) as total_comments,
        COUNT(*) FILTER (WHERE status = 'approved') as approved_comments,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_comments,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as recent_comments,
        MAX(created_at::date) as last_comment_date
    FROM article_comments
    GROUP BY user_identifier
) comments ON users.user_identifier = comments.user_identifier
LEFT JOIN (
    SELECT 
        user_identifier,
        COUNT(*) as total_bookmarks,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as recent_bookmarks,
        MAX(created_at::date) as last_bookmark_date
    FROM article_bookmarks
    GROUP BY user_identifier
) bookmarks ON users.user_identifier = bookmarks.user_identifier;

-- ===========================================
-- VIEW: Comment Details with Article Info
-- ===========================================
CREATE OR REPLACE VIEW comment_details AS
SELECT 
    c.id,
    c.article_id,
    a.title as article_title,
    a.slug as article_slug,
    a.category as article_category,
    c.content,
    c.author_name,
    c.author_email,
    c.user_identifier,
    c.status,
    c.created_at,
    c.updated_at,
    -- Comment metrics
    LENGTH(c.content) as content_length,
    ARRAY_LENGTH(STRING_TO_ARRAY(c.content, ' '), 1) as word_count,
    -- Time since creation
    EXTRACT(EPOCH FROM (NOW() - c.created_at))/3600 as hours_since_created,
    -- Moderation priority (higher = needs attention)
    CASE 
        WHEN c.status = 'pending' AND c.created_at < NOW() - INTERVAL '24 hours' THEN 10
        WHEN c.status = 'pending' AND c.created_at < NOW() - INTERVAL '12 hours' THEN 8
        WHEN c.status = 'pending' AND c.created_at < NOW() - INTERVAL '6 hours' THEN 6
        WHEN c.status = 'pending' THEN 4
        WHEN c.status = 'approved' THEN 2
        ELSE 1
    END as moderation_priority
FROM article_comments c
JOIN articles a ON c.article_id = a.id;

-- ===========================================
-- VIEW: Daily Activity Summary
-- ===========================================
CREATE OR REPLACE VIEW daily_activity AS
SELECT 
    activity_date,
    SUM(new_likes) as total_likes,
    SUM(new_comments) as total_comments,
    SUM(new_bookmarks) as total_bookmarks,
    SUM(new_views) as total_views,
    COUNT(DISTINCT CASE WHEN new_likes > 0 THEN user_identifier END) as active_likers,
    COUNT(DISTINCT CASE WHEN new_comments > 0 THEN user_identifier END) as active_commenters,
    COUNT(DISTINCT CASE WHEN new_bookmarks > 0 THEN user_identifier END) as active_bookmarkers
FROM (
    SELECT 
        created_at::date as activity_date,
        user_identifier,
        COUNT(*) as new_likes,
        0 as new_comments,
        0 as new_bookmarks,
        0 as new_views
    FROM article_likes
    GROUP BY created_at::date, user_identifier
    
    UNION ALL
    
    SELECT 
        created_at::date as activity_date,
        user_identifier,
        0 as new_likes,
        COUNT(*) as new_comments,
        0 as new_bookmarks,
        0 as new_views
    FROM article_comments
    GROUP BY created_at::date, user_identifier
    
    UNION ALL
    
    SELECT 
        created_at::date as activity_date,
        user_identifier,
        0 as new_likes,
        0 as new_comments,
        COUNT(*) as new_bookmarks,
        0 as new_views
    FROM article_bookmarks
    GROUP BY created_at::date, user_identifier
    
    UNION ALL
    
    SELECT 
        created_at::date as activity_date,
        user_identifier,
        0 as new_likes,
        0 as new_comments,
        0 as new_bookmarks,
        COUNT(*) as new_views
    FROM article_views
    GROUP BY created_at::date, user_identifier
) daily_stats
GROUP BY activity_date
ORDER BY activity_date DESC;

-- ===========================================
-- VIEW: Top Articles by Category
-- ===========================================
CREATE OR REPLACE VIEW top_articles_by_category AS
SELECT 
    category,
    id,
    slug,
    title,
    view_count,
    like_count,
    comment_count,
    popularity_score,
    engagement_rate,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY popularity_score DESC) as rank_in_category,
    ROW_NUMBER() OVER (ORDER BY popularity_score DESC) as overall_rank
FROM article_stats
WHERE published_at IS NOT NULL;

-- ===========================================
-- VIEW: Comment Moderation Queue
-- ===========================================
CREATE OR REPLACE VIEW comment_moderation_queue AS
SELECT 
    cd.*,
    -- Spam indicators
    CASE 
        WHEN LENGTH(cd.content) < 10 THEN 'Too Short'
        WHEN cd.content ~* '(https?://|www\.)' THEN 'Contains URL'
        WHEN cd.content ~* '\b(spam|promo|iklan|jual|beli)\b' THEN 'Potential Spam'
        WHEN cd.word_count < 3 THEN 'Too Few Words'
        ELSE 'Clean'
    END as spam_indicator,
    -- User activity context
    ui.total_comments as user_total_comments,
    ui.approved_comments as user_approved_comments,
    ui.engagement_level as user_engagement_level,
    -- Article context
    ast.engagement_rate as article_engagement_rate,
    ast.total_comments as article_total_comments
FROM comment_details cd
LEFT JOIN user_interactions ui ON cd.user_identifier = ui.user_identifier
LEFT JOIN article_stats ast ON cd.article_id = ast.id
WHERE cd.status = 'pending'
ORDER BY cd.moderation_priority DESC, cd.created_at ASC;

-- ===========================================
-- FUNCTIONS: Helper Functions
-- ===========================================

-- Function to get article engagement metrics
CREATE OR REPLACE FUNCTION get_article_engagement(article_id_param TEXT)
RETURNS TABLE (
    article_id TEXT,
    title TEXT,
    total_likes BIGINT,
    total_comments BIGINT,
    total_bookmarks BIGINT,
    engagement_rate NUMERIC,
    popularity_score NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ast.id,
        ast.title,
        ast.actual_likes,
        ast.approved_comments,
        ast.total_bookmarks,
        ast.engagement_rate,
        ast.popularity_score
    FROM article_stats ast
    WHERE ast.id = article_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get user activity summary
CREATE OR REPLACE FUNCTION get_user_activity(user_id_param TEXT)
RETURNS TABLE (
    user_identifier TEXT,
    total_likes BIGINT,
    total_comments BIGINT,
    total_bookmarks BIGINT,
    engagement_level TEXT,
    last_activity_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ui.user_identifier,
        ui.total_likes,
        ui.total_comments,
        ui.total_bookmarks,
        ui.engagement_level,
        ui.last_activity_date
    FROM user_interactions ui
    WHERE ui.user_identifier = user_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get trending articles
CREATE OR REPLACE FUNCTION get_trending_articles(days_param INTEGER DEFAULT 7, limit_param INTEGER DEFAULT 10)
RETURNS TABLE (
    article_id TEXT,
    title TEXT,
    category TEXT,
    recent_likes BIGINT,
    recent_comments BIGINT,
    recent_bookmarks BIGINT,
    trend_score NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.title,
        a.category,
        COALESCE(likes.recent_likes, 0) as recent_likes,
        COALESCE(comments.recent_comments, 0) as recent_comments,
        COALESCE(bookmarks.recent_bookmarks, 0) as recent_bookmarks,
        (
            COALESCE(likes.recent_likes, 0) * 3.0 +
            COALESCE(comments.recent_comments, 0) * 5.0 +
            COALESCE(bookmarks.recent_bookmarks, 0) * 2.0
        ) as trend_score
    FROM articles a
    LEFT JOIN (
        SELECT article_id, COUNT(*) as recent_likes
        FROM article_likes
        WHERE created_at >= NOW() - INTERVAL '1 day' * days_param
        GROUP BY article_id
    ) likes ON a.id = likes.article_id
    LEFT JOIN (
        SELECT article_id, COUNT(*) as recent_comments
        FROM article_comments
        WHERE created_at >= NOW() - INTERVAL '1 day' * days_param
        AND status = 'approved'
        GROUP BY article_id
    ) comments ON a.id = comments.article_id
    LEFT JOIN (
        SELECT article_id, COUNT(*) as recent_bookmarks
        FROM article_bookmarks
        WHERE created_at >= NOW() - INTERVAL '1 day' * days_param
        GROUP BY article_id
    ) bookmarks ON a.id = bookmarks.article_id
    WHERE (
        COALESCE(likes.recent_likes, 0) +
        COALESCE(comments.recent_comments, 0) +
        COALESCE(bookmarks.recent_bookmarks, 0)
    ) > 0
    ORDER BY trend_score DESC
    LIMIT limit_param;
END;
$$ LANGUAGE plpgsql;

-- ===========================================
-- INDEXES for Better Performance
-- ===========================================

-- Indexes untuk views
CREATE INDEX IF NOT EXISTS idx_article_stats_popularity ON articles USING btree ((
    view_count * 1.0 + 
    like_count * 5.0 + 
    comment_count * 10.0
));

CREATE INDEX IF NOT EXISTS idx_article_stats_engagement ON articles USING btree ((
    CASE 
        WHEN view_count > 0 THEN (like_count + comment_count) * 100.0 / view_count
        ELSE 0 
    END
));

-- Indexes untuk date-based queries
CREATE INDEX IF NOT EXISTS idx_article_likes_date ON article_likes(created_at);
CREATE INDEX IF NOT EXISTS idx_article_comments_date ON article_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_article_bookmarks_date ON article_bookmarks(created_at);
CREATE INDEX IF NOT EXISTS idx_article_views_date ON article_views(created_at);

-- Composite indexes untuk user activity
CREATE INDEX IF NOT EXISTS idx_user_likes_activity ON article_likes(user_identifier, created_at);
CREATE INDEX IF NOT EXISTS idx_user_comments_activity ON article_comments(user_identifier, created_at, status);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_activity ON article_bookmarks(user_identifier, created_at);

-- ===========================================
-- PERMISSIONS
-- ===========================================

-- Grant permissions untuk views (sesuaikan dengan kebutuhan)
GRANT SELECT ON article_stats TO anon, authenticated;
GRANT SELECT ON user_interactions TO authenticated;
GRANT SELECT ON comment_details TO authenticated;
GRANT SELECT ON daily_activity TO authenticated;
GRANT SELECT ON top_articles_by_category TO anon, authenticated;
GRANT SELECT ON comment_moderation_queue TO authenticated;

-- Grant execute permissions untuk functions
GRANT EXECUTE ON FUNCTION get_article_engagement(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_user_activity(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_trending_articles(INTEGER, INTEGER) TO anon, authenticated;

-- ===========================================
-- EXAMPLE QUERIES
-- ===========================================

/*
-- Contoh penggunaan views dan functions:

-- 1. Mendapatkan statistik artikel
SELECT * FROM article_stats WHERE id = 'your-article-id';

-- 2. Mendapatkan artikel trending
SELECT * FROM get_trending_articles(7, 10);

-- 3. Mendapatkan queue moderasi komentar
SELECT * FROM comment_moderation_queue LIMIT 20;

-- 4. Mendapatkan aktivitas harian
SELECT * FROM daily_activity WHERE activity_date >= CURRENT_DATE - INTERVAL '30 days';

-- 5. Mendapatkan top artikel per kategori
SELECT * FROM top_articles_by_category WHERE rank_in_category <= 5;

-- 6. Mendapatkan user yang paling aktif
SELECT * FROM user_interactions ORDER BY 
    (total_likes + approved_comments + total_bookmarks) DESC LIMIT 10;

-- 7. Mendapatkan engagement metrics untuk artikel
SELECT * FROM get_article_engagement('your-article-id');
*/