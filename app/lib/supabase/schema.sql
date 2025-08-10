-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
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
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- Feature flags for curated selections
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_editor_pick BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS featured_rank INTEGER,
  ADD COLUMN IF NOT EXISTS editor_pick_rank INTEGER,
  ADD COLUMN IF NOT EXISTS featured_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS editor_pick_at TIMESTAMP WITH TIME ZONE;

-- Helpful partial indexes for fast filtering/sorting curated content
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles (published_at DESC)
  WHERE is_featured = true AND status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_is_editor_pick ON articles (published_at DESC)
  WHERE is_editor_pick = true AND status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_featured_rank ON articles (featured_rank NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_articles_editor_pick_rank ON articles (editor_pick_rank NULLS LAST);

-- Latest curated flags (manual control for newly uploaded articles section)
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS is_latest BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS latest_rank INTEGER,
  ADD COLUMN IF NOT EXISTS latest_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_articles_is_latest ON articles (published_at DESC)
  WHERE is_latest = true AND status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_latest_rank ON articles (latest_rank NULLS LAST);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  ip_address INET,
  source VARCHAR(50)
);

-- User interactions
CREATE TABLE IF NOT EXISTS user_interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  interaction_type VARCHAR(20) NOT NULL CHECK (interaction_type IN ('view', 'like', 'share', 'comment')),
  user_ip INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments
CREATE TABLE IF NOT EXISTS comments (
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
CREATE TABLE IF NOT EXISTS search_queries (
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
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Articles are viewable by everyone" ON articles;
CREATE POLICY "Articles are viewable by everyone" ON articles
FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;
CREATE POLICY "Comments are viewable by everyone" ON comments
FOR SELECT USING (status = 'approved');

-- Ensure Indonesian text search configuration exists (fallback to simple if missing)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_ts_config WHERE cfgname = 'indonesian'
  ) THEN
    CREATE TEXT SEARCH CONFIGURATION indonesian ( COPY = simple );
  END IF;
END
$$;

-- Full-Text Search (FTS) setup for articles
-- Kolom TSVECTOR untuk pencarian cepat
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Backfill nilai awal search_vector
UPDATE articles
SET search_vector = to_tsvector('indonesian',
  coalesce(title, '') || ' ' || coalesce(content, '') || ' ' || coalesce(excerpt, '')
);

-- Indeks GIN untuk FTS
CREATE INDEX IF NOT EXISTS idx_articles_search_vector
  ON articles USING GIN (search_vector);

-- Trigger untuk menjaga search_vector selalu up-to-date
CREATE OR REPLACE FUNCTION articles_search_vector_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('indonesian',
    coalesce(NEW.title, '') || ' ' || coalesce(NEW.content, '') || ' ' || coalesce(NEW.excerpt, '')
  );
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tsv_articles ON articles;
CREATE TRIGGER tsv_articles
BEFORE INSERT OR UPDATE ON articles
FOR EACH ROW EXECUTE FUNCTION articles_search_vector_trigger();

-- Regulations table to store external legal documents (e.g., JDIH links)
CREATE TABLE IF NOT EXISTS regulations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul VARCHAR(500) NOT NULL,
  nomor VARCHAR(100),
  tahun VARCHAR(4),
  kategori VARCHAR(100),
  deskripsi TEXT,
  tanggal_ditetapkan DATE,
  tanggal_diundangkan DATE,
  sumber VARCHAR(255),
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published','draft','archived')),
  external_url TEXT,
  download_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for regulations
CREATE INDEX IF NOT EXISTS idx_regulations_status ON regulations(status);
CREATE INDEX IF NOT EXISTS idx_regulations_kategori ON regulations(kategori);
CREATE INDEX IF NOT EXISTS idx_regulations_tahun ON regulations(tahun);
CREATE INDEX IF NOT EXISTS idx_regulations_nomor ON regulations(nomor);
CREATE UNIQUE INDEX IF NOT EXISTS uq_regulations_external_url ON regulations(external_url);

-- RLS for regulations
ALTER TABLE regulations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Regulations are viewable by everyone" ON regulations;
CREATE POLICY "Regulations are viewable by everyone" ON regulations
  FOR SELECT USING (status = 'published');

-- Trigger to keep updated_at in sync for regulations
DROP TRIGGER IF EXISTS update_regulations_updated_at ON regulations;
CREATE TRIGGER update_regulations_updated_at BEFORE UPDATE ON regulations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- External curated resources (articles/kamus/solusi/berita)
CREATE TABLE IF NOT EXISTS external_resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  category VARCHAR(30) NOT NULL CHECK (category IN ('artikel','kamus','solusi','regulasi','berita')),
  excerpt TEXT,
  tags TEXT[],
  source_name VARCHAR(150),
  source_domain VARCHAR(150),
  external_url TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('published','draft','archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for external_resources
CREATE UNIQUE INDEX IF NOT EXISTS uq_external_resources_url ON external_resources(external_url);
CREATE INDEX IF NOT EXISTS idx_external_resources_status ON external_resources(status);
CREATE INDEX IF NOT EXISTS idx_external_resources_category ON external_resources(category);
CREATE INDEX IF NOT EXISTS idx_external_resources_published_at ON external_resources(published_at DESC);

-- RLS for external_resources
ALTER TABLE external_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "External resources are viewable by everyone" ON external_resources;
CREATE POLICY "External resources are viewable by everyone" ON external_resources
  FOR SELECT USING (status = 'published');

-- Trigger to keep updated_at in sync for external_resources
DROP TRIGGER IF EXISTS update_external_resources_updated_at ON external_resources;
CREATE TRIGGER update_external_resources_updated_at BEFORE UPDATE ON external_resources
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
