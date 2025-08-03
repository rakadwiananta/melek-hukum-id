-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles table
CREATE TABLE articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('kamus-hukum', 'solusi', 'regulasi', 'anti-korupsi')),
  featured_image VARCHAR(500),
  author VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- SEO fields
  seo_title VARCHAR(255),
  seo_description TEXT,
  keywords TEXT[],
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_status ON articles(status);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  source VARCHAR(50)
);

-- User interactions
CREATE TABLE user_interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN ('view', 'like', 'share', 'comment')),
  user_ip INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  ip_address INET
);

-- Search queries for analytics
CREATE TABLE search_queries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  user_ip INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Functions for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Articles are viewable by everyone" ON articles
FOR SELECT USING (status = 'published');

CREATE POLICY "Comments are viewable by everyone" ON comments
FOR SELECT USING (status = 'approved');
