-- =====================================================
-- RPC FUNCTIONS untuk Article View Tracking
-- Jalankan SQL ini di Supabase SQL Editor setelah migrations
-- =====================================================

-- ===========================================
-- Function untuk increment article views
-- ===========================================
CREATE OR REPLACE FUNCTION increment_article_views(
    article_id_param UUID,
    viewer_ip TEXT DEFAULT 'anonymous',
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
RETURNS JSON AS $$
DECLARE
    existing_view_count INTEGER;
    new_view_count INTEGER;
    result JSON;
    article_exists BOOLEAN;
BEGIN
    -- Check if article exists
    SELECT EXISTS(SELECT 1 FROM articles WHERE id = article_id_param) INTO article_exists;
    
    IF NOT article_exists THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Article not found',
            'new_view_count', 0
        );
    END IF;
    
    -- Check if this IP has already viewed this article in the last hour
    -- (Reduced from daily to hourly for better real-time testing)
    IF NOT EXISTS (
        SELECT 1 FROM article_views 
        WHERE article_id = article_id_param 
        AND user_identifier = viewer_ip 
        AND created_at >= (NOW() - INTERVAL '1 hour')
    ) THEN
        -- Insert new view record
        INSERT INTO article_views (article_id, user_identifier, created_at)
        VALUES (article_id_param, viewer_ip, viewed_at);
        
        -- Manually increment view count in articles table
        UPDATE articles 
        SET view_count = COALESCE(view_count, 0) + 1,
            updated_at = NOW()
        WHERE id = article_id_param;
        
        -- Get updated view count
        SELECT COALESCE(view_count, 0) INTO new_view_count
        FROM articles 
        WHERE id = article_id_param;
        
        -- Return success with new count
        result := json_build_object(
            'success', true,
            'new_view_count', new_view_count,
            'message', 'View recorded successfully'
        );
    ELSE
        -- Get current view count (view sudah ada dalam 1 jam terakhir)
        SELECT COALESCE(view_count, 0) INTO new_view_count
        FROM articles 
        WHERE id = article_id_param;
        
        -- Return success but no increment
        result := json_build_object(
            'success', true,
            'new_view_count', new_view_count,
            'message', 'View already recorded in the last hour'
        );
    END IF;
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        -- Return error
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM,
            'new_view_count', 0
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================
-- Alternative function dengan increment langsung (tanpa duplicate check)
-- ===========================================
CREATE OR REPLACE FUNCTION increment_article_views_simple(
    article_id_param UUID,
    viewer_ip TEXT DEFAULT 'anonymous'
)
RETURNS JSON AS $$
DECLARE
    new_view_count INTEGER;
    result JSON;
    article_exists BOOLEAN;
BEGIN
    -- Check if article exists
    SELECT EXISTS(SELECT 1 FROM articles WHERE id = article_id_param) INTO article_exists;
    
    IF NOT article_exists THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Article not found',
            'new_view_count', 0
        );
    END IF;
    
    -- Insert new view record
    INSERT INTO article_views (article_id, user_identifier, created_at)
    VALUES (article_id_param, viewer_ip, NOW());
    
    -- Manually increment view count in articles table
    UPDATE articles 
    SET view_count = COALESCE(view_count, 0) + 1,
        updated_at = NOW()
    WHERE id = article_id_param;
    
    -- Get updated view count
    SELECT COALESCE(view_count, 0) INTO new_view_count
    FROM articles 
    WHERE id = article_id_param;
    
    -- Return success with new count
    result := json_build_object(
        'success', true,
        'new_view_count', new_view_count,
        'message', 'View recorded successfully'
    );
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        -- Return error
        RETURN json_build_object(
            'success', false,
            'error', SQLERRM,
            'new_view_count', 0
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================
-- Function untuk mendapatkan article stats real-time
-- ===========================================
CREATE OR REPLACE FUNCTION get_article_stats(article_id_param UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'id', a.id,
        'title', a.title,
        'view_count', COALESCE(a.view_count, 0),
        'like_count', COALESCE(a.like_count, 0),
        'comment_count', COALESCE(a.comment_count, 0),
        'unique_views', COALESCE(views.unique_views, 0),
        'total_likes', COALESCE(likes.total_likes, 0),
        'approved_comments', COALESCE(comments.approved_comments, 0)
    ) INTO result
    FROM articles a
    LEFT JOIN (
        SELECT article_id, COUNT(DISTINCT user_identifier) as unique_views
        FROM article_views
        WHERE article_id = article_id_param
        GROUP BY article_id
    ) views ON a.id = views.article_id
    LEFT JOIN (
        SELECT article_id, COUNT(*) as total_likes
        FROM article_likes
        WHERE article_id = article_id_param
        GROUP BY article_id
    ) likes ON a.id = likes.article_id
    LEFT JOIN (
        SELECT article_id, COUNT(*) as approved_comments
        FROM article_comments
        WHERE article_id = article_id_param AND status = 'approved'
        GROUP BY article_id
    ) comments ON a.id = comments.article_id
    WHERE a.id = article_id_param;
    
    RETURN COALESCE(result, json_build_object('error', 'Article not found'));
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================
-- Grant permissions
-- ===========================================
GRANT EXECUTE ON FUNCTION increment_article_views(UUID, TEXT, TIMESTAMP WITH TIME ZONE) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_article_views_simple(UUID, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_article_stats(UUID) TO anon, authenticated;