-- Supabase Database Schema for Article Management
-- Run this SQL in your Supabase SQL Editor

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'hukum-perdata', 'hukum-pidana', 'hukum-bisnis', 
    'hukum-keluarga', 'hukum-tata-negara', 'anti-korupsi', 'panduan-praktis'
  )),
  subcategory VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  author VARCHAR(255) NOT NULL DEFAULT 'Tim Ahli Hukum Melek Hukum ID',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  read_time VARCHAR(20) NOT NULL DEFAULT '10 menit',
  difficulty VARCHAR(20) DEFAULT 'pemula' CHECK (difficulty IN ('pemula', 'menengah', 'lanjutan')),
  summary TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  disclaimer TEXT,
  cta_title VARCHAR(255),
  cta_description TEXT,
  cta_button_text VARCHAR(100),
  cta_button_link VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create article_sections table
CREATE TABLE IF NOT EXISTS article_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  section_order INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  content_type VARCHAR(20) DEFAULT 'paragraph' CHECK (content_type IN (
    'paragraph', 'numbered-list', 'bullet-list', 'quote', 
    'warning', 'info', 'success', 'code', 'table'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create article_subsections table
CREATE TABLE IF NOT EXISTS article_subsections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES article_sections(id) ON DELETE CASCADE,
  subsection_order INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  content_type VARCHAR(20) DEFAULT 'paragraph' CHECK (content_type IN (
    'paragraph', 'numbered-list', 'bullet-list', 'quote', 
    'warning', 'info', 'success'
  )),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create article_sources table
CREATE TABLE IF NOT EXISTS article_sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  source_type VARCHAR(30) DEFAULT 'undang-undang' CHECK (source_type IN (
    'undang-undang', 'peraturan-pemerintah', 'peraturan-menteri', 
    'putusan-pengadilan', 'jurnal', 'buku', 'website'
  )),
  url TEXT,
  year INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create related_articles table (many-to-many)
CREATE TABLE IF NOT EXISTS related_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  related_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, related_article_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_article_sections_article_id ON article_sections(article_id);
CREATE INDEX IF NOT EXISTS idx_article_sections_order ON article_sections(section_order);
CREATE INDEX IF NOT EXISTS idx_article_subsections_section_id ON article_subsections(section_id);
CREATE INDEX IF NOT EXISTS idx_article_sources_article_id ON article_sources(article_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON articles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create RLS (Row Level Security) policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_subsections ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE related_articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published articles
CREATE POLICY "Allow public read access to published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to sections of published articles" ON article_sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = article_sections.article_id 
      AND articles.status = 'published'
    )
  );

CREATE POLICY "Allow public read access to subsections of published articles" ON article_subsections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM articles 
      JOIN article_sections ON articles.id = article_sections.article_id
      WHERE article_sections.id = article_subsections.section_id 
      AND articles.status = 'published'
    )
  );

CREATE POLICY "Allow public read access to sources of published articles" ON article_sources
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = article_sources.article_id 
      AND articles.status = 'published'
    )
  );

CREATE POLICY "Allow public read access to related articles" ON related_articles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM articles 
      WHERE articles.id = related_articles.article_id 
      AND articles.status = 'published'
    )
  );

-- Insert sample categories for reference
INSERT INTO articles (title, slug, category, summary, meta_description, keywords, status) VALUES
('Panduan Mengurus Perceraian di Pengadilan Agama', 'panduan-perceraian-pengadilan-agama', 'hukum-keluarga', 'Panduan lengkap mengurus perceraian di pengadilan agama termasuk syarat, prosedur, dan biaya', 'Cara mengurus perceraian di pengadilan agama, syarat dokumen, biaya, dan prosedur lengkap', ARRAY['perceraian', 'pengadilan agama', 'hukum keluarga'], 'published'),
('Cara Mendirikan PT (Perseroan Terbatas)', 'cara-mendirikan-pt-perseroan-terbatas', 'hukum-bisnis', 'Panduan lengkap mendirikan PT termasuk syarat, modal, prosedur, dan biaya pendirian', 'Cara mendirikan PT, syarat pendirian perseroan terbatas, modal minimal, prosedur dan biaya', ARRAY['PT', 'perseroan terbatas', 'hukum bisnis', 'pendirian perusahaan'], 'published'),
('Hak Tersangka dalam Proses Penyidikan', 'hak-tersangka-proses-penyidikan', 'hukum-pidana', 'Mengenal hak-hak tersangka dalam proses penyidikan polisi berdasarkan KUHAP', 'Hak tersangka dalam penyidikan polisi, KUHAP, hak diam, hak didampingi pengacara', ARRAY['hak tersangka', 'penyidikan', 'KUHAP', 'hukum pidana'], 'published')
ON CONFLICT (slug) DO NOTHING;