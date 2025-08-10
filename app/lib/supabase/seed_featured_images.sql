-- Perbaikan gambar artikel: set featured_image ke aset yang tersedia di /public
-- Jalankan skrip ini di Supabase SQL Editor (Project -> SQL -> New Query), lalu Execute

-- 1) Fallback universal untuk baris tanpa gambar atau gambar 404 (/images/articles/*)
UPDATE articles
SET featured_image = '/timbangkan.jpg'
WHERE (featured_image IS NULL OR featured_image = '' OR featured_image LIKE '/images/articles/%');

-- 2) Mapping yang lebih relevan berdasarkan judul (opsional)
--    Jika setelah fallback Anda ingin mengganti dengan ilustrasi yang lebih cocok, jalankan blok di bawah.
--    Catatan: hanya menimpa baris yang masih menggunakan '/timbangkan.jpg'.

-- Korupsi / Anti-Korupsi
UPDATE articles
SET featured_image = '/illustrations/blog-kejaksaan.jpeg'
WHERE featured_image = '/timbangkan.jpg' AND title ILIKE '%korupsi%';

-- Konsumen / Perlindungan Konsumen
UPDATE articles
SET featured_image = '/illustrations/hero-layer-2.svg'
WHERE featured_image = '/timbangkan.jpg' AND (title ILIKE '%konsumen%' OR title ILIKE '%perdagangan%' OR title ILIKE '%transaksi online%');

-- UU ITE
UPDATE articles
SET featured_image = '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg'
WHERE featured_image = '/timbangkan.jpg' AND (title ILIKE '%UU ITE%' OR title ILIKE '%ITE%');

-- 3) Pastikan hanya artikel published yang tampil (opsional)
-- UPDATE articles SET status = 'published' WHERE status IS DISTINCT FROM 'published' AND published_at IS NOT NULL; 