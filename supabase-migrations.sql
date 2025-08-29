-- Migration script for article interactions
-- Run this in your Supabase SQL editor

-- Create article_likes table
CREATE TABLE IF NOT EXISTS article_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id TEXT NOT NULL,
    user_identifier TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, user_identifier)
);

-- Create article_bookmarks table
CREATE TABLE IF NOT EXISTS article_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id TEXT NOT NULL,
    user_identifier TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, user_identifier)
);

-- Create article_comments table
CREATE TABLE IF NOT EXISTS article_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    user_identifier TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create article_views table for analytics
CREATE TABLE IF NOT EXISTS article_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id TEXT NOT NULL,
    user_identifier TEXT NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_article_likes_article_id ON article_likes(article_id);
CREATE INDEX IF NOT EXISTS idx_article_likes_user_identifier ON article_likes(user_identifier);
CREATE INDEX IF NOT EXISTS idx_article_bookmarks_article_id ON article_bookmarks(article_id);
CREATE INDEX IF NOT EXISTS idx_article_bookmarks_user_identifier ON article_bookmarks(user_identifier);
CREATE INDEX IF NOT EXISTS idx_article_comments_article_id ON article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_status ON article_comments(status);
CREATE INDEX IF NOT EXISTS idx_article_comments_created_at ON article_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_created_at ON article_views(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to likes" ON article_likes FOR SELECT USING (true);
CREATE POLICY "Allow public insert to likes" ON article_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete own likes" ON article_likes FOR DELETE USING (true);

CREATE POLICY "Allow public read access to bookmarks" ON article_bookmarks FOR SELECT USING (true);
CREATE POLICY "Allow public insert to bookmarks" ON article_bookmarks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete own bookmarks" ON article_bookmarks FOR DELETE USING (true);

CREATE POLICY "Allow public read approved comments" ON article_comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Allow public insert comments" ON article_comments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to views" ON article_views FOR INSERT WITH CHECK (true);

-- Add comment count and like count columns to articles table if they don't exist
ALTER TABLE articles ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0;

-- Create function to update comment count
CREATE OR REPLACE FUNCTION update_article_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE articles 
        SET comment_count = (
            SELECT COUNT(*) 
            FROM article_comments 
            WHERE article_id = NEW.article_id AND status = 'approved'
        )
        WHERE id = NEW.article_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE articles 
        SET comment_count = (
            SELECT COUNT(*) 
            FROM article_comments 
            WHERE article_id = NEW.article_id AND status = 'approved'
        )
        WHERE id = NEW.article_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE articles 
        SET comment_count = (
            SELECT COUNT(*) 
            FROM article_comments 
            WHERE article_id = OLD.article_id AND status = 'approved'
        )
        WHERE id = OLD.article_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update comment count
DROP TRIGGER IF EXISTS trigger_update_comment_count ON article_comments;
CREATE TRIGGER trigger_update_comment_count
    AFTER INSERT OR UPDATE OR DELETE ON article_comments
    FOR EACH ROW EXECUTE FUNCTION update_article_comment_count();

-- Create function to update like count
CREATE OR REPLACE FUNCTION update_article_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE articles 
        SET like_count = (
            SELECT COUNT(*) 
            FROM article_likes 
            WHERE article_id = NEW.article_id
        )
        WHERE id = NEW.article_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE articles 
        SET like_count = (
            SELECT COUNT(*) 
            FROM article_likes 
            WHERE article_id = OLD.article_id
        )
        WHERE id = OLD.article_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update like count
DROP TRIGGER IF EXISTS trigger_update_like_count ON article_likes;
CREATE TRIGGER trigger_update_like_count
    AFTER INSERT OR DELETE ON article_likes
    FOR EACH ROW EXECUTE FUNCTION update_article_like_count();