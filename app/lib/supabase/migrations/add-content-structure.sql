-- Migration: Add structured content support to articles table
-- Date: 2024-12-XX
-- Description: Add columns to support structured content storage and metadata

-- Add new columns for structured content
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS content_type VARCHAR(20) DEFAULT 'plain' CHECK (content_type IN ('plain', 'structured')),
ADD COLUMN IF NOT EXISTS word_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS reading_time INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS content_metadata JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_content_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_content_type ON articles(content_type);
CREATE INDEX IF NOT EXISTS idx_articles_word_count ON articles(word_count);
CREATE INDEX IF NOT EXISTS idx_articles_reading_time ON articles(reading_time);

-- Create function to update content metadata automatically
CREATE OR REPLACE FUNCTION update_article_content_metadata()
RETURNS TRIGGER AS $$
BEGIN
  -- Update last_content_update timestamp when content changes
  IF OLD.content IS DISTINCT FROM NEW.content THEN
    NEW.last_content_update = NOW();
    
    -- If content_type is 'structured', parse metadata from JSON
    IF NEW.content_type = 'structured' THEN
      BEGIN
        -- Try to extract metadata from structured content JSON
        SELECT 
          COALESCE((NEW.content::jsonb -> 'metadata' ->> 'wordCount')::integer, 0),
          COALESCE((NEW.content::jsonb -> 'metadata' ->> 'readingTime')::integer, 0)
        INTO NEW.word_count, NEW.reading_time;
      EXCEPTION WHEN OTHERS THEN
        -- If JSON parsing fails, keep existing values or set defaults
        NEW.word_count = COALESCE(NEW.word_count, 0);
        NEW.reading_time = COALESCE(NEW.reading_time, 0);
      END;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update content metadata
DROP TRIGGER IF EXISTS trigger_update_article_content_metadata ON articles;
CREATE TRIGGER trigger_update_article_content_metadata
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_article_content_metadata();

-- Create view for articles with parsed content metadata
CREATE OR REPLACE VIEW articles_with_metadata AS
SELECT 
  a.*,
  CASE 
    WHEN a.content_type = 'structured' THEN
      (a.content::jsonb -> 'metadata' ->> 'contentType')
    ELSE 
      'article'
  END as detected_content_type,
  CASE 
    WHEN a.content_type = 'structured' THEN
      jsonb_array_length(a.content::jsonb -> 'sections')
    ELSE 
      NULL
  END as section_count
FROM articles a
WHERE a.status = 'published';

-- Add comment to explain the new structure
COMMENT ON COLUMN articles.content_type IS 'Type of content storage: plain (traditional text) or structured (JSON with sections)';
COMMENT ON COLUMN articles.word_count IS 'Automatically calculated word count from content';
COMMENT ON COLUMN articles.reading_time IS 'Estimated reading time in minutes';
COMMENT ON COLUMN articles.content_metadata IS 'Additional metadata for content processing';
COMMENT ON COLUMN articles.last_content_update IS 'Timestamp of last content modification';

-- Create function to convert plain text articles to structured format
CREATE OR REPLACE FUNCTION convert_article_to_structured(article_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_content TEXT;
  structured_content JSONB;
BEGIN
  -- Get current plain text content
  SELECT content INTO current_content 
  FROM articles 
  WHERE id = article_id AND content_type = 'plain';
  
  IF NOT FOUND THEN
    RAISE NOTICE 'Article not found or already structured';
    RETURN FALSE;
  END IF;
  
  -- Note: The actual conversion logic would be handled by the application
  -- This function serves as a placeholder for batch conversion operations
  
  RAISE NOTICE 'Article % ready for structured conversion', article_id;
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create function to get article content in the preferred format
CREATE OR REPLACE FUNCTION get_formatted_article_content(article_slug VARCHAR)
RETURNS TABLE(
  id UUID,
  title VARCHAR,
  content TEXT,
  content_type VARCHAR,
  word_count INTEGER,
  reading_time INTEGER,
  author VARCHAR,
  published_at TIMESTAMP WITH TIME ZONE,
  category VARCHAR,
  featured_image VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.content,
    a.content_type,
    COALESCE(a.word_count, 0) as word_count,
    COALESCE(a.reading_time, 0) as reading_time,
    a.author,
    a.published_at,
    a.category,
    a.featured_image
  FROM articles a
  WHERE a.slug = article_slug 
    AND a.status = 'published'
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions (adjust schema/role as needed)
-- GRANT SELECT, UPDATE ON articles TO your_app_role;
-- GRANT SELECT ON articles_with_metadata TO your_app_role;
-- GRANT EXECUTE ON FUNCTION get_formatted_article_content(VARCHAR) TO your_app_role;