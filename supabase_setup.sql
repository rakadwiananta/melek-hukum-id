-- =====================================================
-- SUPABASE DATABASE SETUP UNTUK MELEK HUKUM ID
-- =====================================================

-- 1. Buat tabel articles jika belum ada
CREATE TABLE IF NOT EXISTS articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100),
    featured_image TEXT,
    author VARCHAR(100) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- SEO fields
    seo_title VARCHAR(255),
    seo_description TEXT,
    keywords TEXT[], -- Array of keywords
    
    -- Stats
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    
    -- Curation flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_editor_pick BOOLEAN DEFAULT FALSE,
    featured_rank INTEGER,
    editor_pick_rank INTEGER,
    featured_at TIMESTAMP WITH TIME ZONE,
    editor_pick_at TIMESTAMP WITH TIME ZONE,
    
    -- Latest curation
    is_latest BOOLEAN DEFAULT FALSE,
    latest_rank INTEGER,
    latest_at TIMESTAMP WITH TIME ZONE,
    
    -- Tags (jika diperlukan sebagai array)
    tags TEXT[]
);

-- 2. Buat tabel comments jika belum ada
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_approved BOOLEAN DEFAULT FALSE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE -- untuk nested comments
);

-- 3. Buat indeks untuk performa
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_is_editor_pick ON articles(is_editor_pick);
CREATE INDEX IF NOT EXISTS idx_articles_is_latest ON articles(is_latest);
CREATE INDEX IF NOT EXISTS idx_articles_view_count ON articles(view_count);
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);

-- 4. Buat trigger untuk update updated_at
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

CREATE TRIGGER update_comments_updated_at 
    BEFORE UPDATE ON comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 6. Buat policy untuk akses publik ke artikel yang dipublish
CREATE POLICY IF NOT EXISTS "Articles are viewable by everyone" 
ON articles FOR SELECT 
USING (status = 'published');

-- Policy untuk comments yang diapprove
CREATE POLICY IF NOT EXISTS "Approved comments are viewable by everyone" 
ON comments FOR SELECT 
USING (is_approved = true);

-- Policy untuk insert comments (tanpa auth, tapi perlu approval)
CREATE POLICY IF NOT EXISTS "Anyone can insert comments" 
ON comments FOR INSERT 
WITH CHECK (true);

-- 7. Insert data contoh jika tabel kosong
INSERT INTO articles (
    title, 
    slug, 
    content, 
    excerpt, 
    category, 
    featured_image, 
    author, 
    published_at,
    status,
    seo_title,
    seo_description,
    keywords,
    tags,
    is_featured,
    is_latest
) 
SELECT 
    'Memahami Hak dan Kewajiban Warga Negara Indonesia',
    'memahami-hak-dan-kewajiban-warga-negara-indonesia',
    '<h2>Pendahuluan</h2><p>Sebagai warga negara Indonesia, kita memiliki hak dan kewajiban yang diatur dalam Undang-Undang Dasar 1945 dan peraturan perundang-undangan lainnya.</p><h2>Hak-Hak Warga Negara</h2><p>Setiap warga negara Indonesia memiliki hak yang sama di hadapan hukum dan pemerintahan, termasuk hak untuk mendapatkan perlindungan hukum, hak untuk berpartisipasi dalam pemerintahan, dan hak untuk mendapatkan pendidikan.</p><h2>Kewajiban Warga Negara</h2><p>Di sisi lain, setiap warga negara juga memiliki kewajiban untuk mematuhi hukum, membayar pajak, dan berpartisipasi dalam pembangunan nasional.</p><h2>Kesimpulan</h2><p>Memahami hak dan kewajiban sebagai warga negara adalah fondasi penting dalam membangun masyarakat yang adil dan sejahtera.</p>',
    'Artikel ini membahas tentang hak dan kewajiban warga negara Indonesia berdasarkan UUD 1945 dan peraturan perundang-undangan yang berlaku.',
    'Hukum Tata Negara',
    '/images/hak-kewajiban-warga-negara.jpg',
    'Admin Melek Hukum',
    NOW() - INTERVAL '1 day',
    'published',
    'Hak dan Kewajiban Warga Negara Indonesia - Panduan Lengkap',
    'Pelajari hak dan kewajiban warga negara Indonesia berdasarkan UUD 1945. Panduan lengkap tentang hukum tata negara untuk masyarakat.',
    ARRAY['hak warga negara', 'kewajiban warga negara', 'UUD 1945', 'hukum tata negara'],
    ARRAY['hukum', 'tata negara', 'warga negara', 'UUD 1945'],
    true,
    true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'memahami-hak-dan-kewajiban-warga-negara-indonesia');

-- Insert artikel contoh kedua
INSERT INTO articles (
    title, 
    slug, 
    content, 
    excerpt, 
    category, 
    featured_image, 
    author, 
    published_at,
    status,
    seo_title,
    seo_description,
    keywords,
    tags,
    is_editor_pick
) 
SELECT 
    'Prosedur Penyelesaian Sengketa Perdata di Pengadilan',
    'prosedur-penyelesaian-sengketa-perdata-di-pengadilan',
    '<h2>Pengertian Sengketa Perdata</h2><p>Sengketa perdata adalah konflik kepentingan antara pihak-pihak yang berkaitan dengan hak dan kewajiban dalam hubungan hukum perdata.</p><h2>Tahapan Penyelesaian</h2><p>Proses penyelesaian sengketa perdata di pengadilan meliputi tahap pendaftaran gugatan, pemeriksaan persiapan, pemeriksaan pokok perkara, dan putusan.</p><h2>Mediasi</h2><p>Sebelum masuk ke pemeriksaan pokok perkara, hakim wajib menempuh upaya mediasi untuk mencari penyelesaian damai.</p><h2>Kesimpulan</h2><p>Memahami prosedur ini penting agar masyarakat dapat mengakses keadilan dengan benar dan efektif.</p>',
    'Panduan lengkap tentang prosedur penyelesaian sengketa perdata di pengadilan, mulai dari pendaftaran hingga putusan.',
    'Hukum Perdata',
    '/images/sengketa-perdata.jpg',
    'Tim Hukum',
    NOW() - INTERVAL '2 days',
    'published',
    'Prosedur Sengketa Perdata di Pengadilan - Panduan Lengkap',
    'Pelajari prosedur lengkap penyelesaian sengketa perdata di pengadilan. Panduan praktis untuk mengakses keadilan.',
    ARRAY['sengketa perdata', 'pengadilan', 'mediasi', 'gugatan'],
    ARRAY['hukum perdata', 'pengadilan', 'mediasi', 'gugatan'],
    true
WHERE NOT EXISTS (SELECT 1 FROM articles WHERE slug = 'prosedur-penyelesaian-sengketa-perdata-di-pengadilan');

-- 8. Buat view untuk artikel yang sering diakses
CREATE OR REPLACE VIEW popular_articles AS
SELECT 
    id, title, slug, excerpt, category, featured_image, 
    author, published_at, view_count, like_count
FROM articles 
WHERE status = 'published' 
ORDER BY view_count DESC, published_at DESC;

-- 9. Buat function untuk update view count
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE articles 
    SET view_count = view_count + 1,
        updated_at = NOW()
    WHERE id = article_id AND status = 'published';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Buat function untuk search artikel
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT, limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
    id UUID,
    title VARCHAR(255),
    slug VARCHAR(255),
    excerpt TEXT,
    category VARCHAR(100),
    featured_image TEXT,
    author VARCHAR(100),
    published_at TIMESTAMP WITH TIME ZONE,
    view_count INTEGER,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id, a.title, a.slug, a.excerpt, a.category, 
        a.featured_image, a.author, a.published_at, a.view_count,
        ts_rank(
            to_tsvector('indonesian', a.title || ' ' || a.excerpt || ' ' || COALESCE(array_to_string(a.tags, ' '), '')), 
            plainto_tsquery('indonesian', search_query)
        ) as rank
    FROM articles a
    WHERE 
        a.status = 'published' AND
        (
            to_tsvector('indonesian', a.title || ' ' || a.excerpt || ' ' || COALESCE(array_to_string(a.tags, ' '), '')) 
            @@ plainto_tsquery('indonesian', search_query)
        )
    ORDER BY rank DESC, a.published_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- 11. Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON articles TO anon, authenticated;
GRANT SELECT ON comments TO anon, authenticated;
GRANT INSERT ON comments TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_view_count(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION search_articles(TEXT, INTEGER) TO anon, authenticated;

-- =====================================================
-- QUERY UNTUK DEBUGGING DAN TESTING
-- =====================================================

-- Cek apakah ada artikel
-- SELECT COUNT(*) as total_articles FROM articles;

-- Cek artikel berdasarkan slug tertentu
-- SELECT * FROM articles WHERE slug = 'your-article-slug' AND status = 'published';

-- Cek artikel terbaru
-- SELECT title, slug, published_at, status FROM articles ORDER BY published_at DESC LIMIT 5;

-- Test search function
-- SELECT * FROM search_articles('hukum perdata', 5);