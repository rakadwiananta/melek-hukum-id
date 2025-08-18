// Test Supabase Connection dan Debugging
// Jalankan dengan: node test_supabase_connection.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('=== SUPABASE CONNECTION TEST ===');
console.log('Supabase URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'NOT SET');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ SUPABASE CONFIGURATION MISSING!');
  console.log('Please check your .env.local file and make sure you have:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n=== TESTING SUPABASE CONNECTION ===');
    
    // Test 1: Basic connection
    console.log('1. Testing basic connection...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('articles')
      .select('count', { count: 'exact', head: true });
    
    if (healthError) {
      console.error('❌ Connection failed:', healthError.message);
      return false;
    }
    
    console.log('✅ Connection successful');
    console.log(`   Total articles in database: ${healthCheck}`);
    
    // Test 2: Check table structure
    console.log('\n2. Checking table structure...');
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', { table_name: 'articles' })
      .single();
    
    if (tableError) {
      console.log('⚠️  Could not get table info (this is normal if RPC function doesn\'t exist)');
    }
    
    // Test 3: Get sample articles
    console.log('\n3. Fetching sample articles...');
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('id, title, slug, status, published_at')
      .limit(5);
    
    if (articlesError) {
      console.error('❌ Failed to fetch articles:', articlesError.message);
      return false;
    }
    
    if (articles && articles.length > 0) {
      console.log('✅ Articles found:');
      articles.forEach(article => {
        console.log(`   - ${article.title} (${article.slug}) [${article.status}]`);
      });
    } else {
      console.log('⚠️  No articles found in database');
    }
    
    // Test 4: Test specific slug from the screenshot
    console.log('\n4. Testing specific article slug...');
    const testSlugs = [
      'viral-kenaikan-pbb-250-oleh-bupati-sudewo-analisis-hukum-dan-hak-anda',
      'memahami-hak-dan-kewajiban-warga-negara-indonesia',
      'prosedur-penyelesaian-sengketa-perdata-di-pengadilan'
    ];
    
    for (const slug of testSlugs) {
      const { data: article, error: slugError } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (slugError) {
        console.log(`   ❌ Article with slug "${slug}" not found`);
      } else {
        console.log(`   ✅ Found article: "${article.title}"`);
      }
    }
    
    // Test 5: Check RLS policies
    console.log('\n5. Testing Row Level Security...');
    const { data: publicAccess, error: rlsError } = await supabase
      .from('articles')
      .select('id, title')
      .eq('status', 'published')
      .limit(1);
    
    if (rlsError) {
      console.error('❌ RLS blocking access:', rlsError.message);
      console.log('   This might be the cause of "Article not found" errors');
    } else {
      console.log('✅ RLS policies allow public access');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    return false;
  }
}

async function insertTestArticle() {
  console.log('\n=== INSERTING TEST ARTICLE ===');
  
  const testArticle = {
    title: 'Viral: Kenaikan PBB 250% oleh Bupati Sudewo - Analisis Hukum dan Hak Anda',
    slug: 'viral-kenaikan-pbb-250-oleh-bupati-sudewo-analisis-hukum-dan-hak-anda',
    content: `
      <h2>Pendahuluan</h2>
      <p>Baru-baru ini viral di media sosial tentang kenaikan Pajak Bumi dan Bangunan (PBB) hingga 250% yang diberlakukan oleh salah satu Bupati. Kebijakan ini menuai pro dan kontra dari masyarakat.</p>
      
      <h2>Analisis Hukum</h2>
      <p>Dari segi hukum, penetapan tarif PBB memang merupakan kewenangan pemerintah daerah berdasarkan UU No. 28 Tahun 2009 tentang Pajak Daerah dan Retribusi Daerah. Namun, kenaikan yang signifikan ini perlu dikaji lebih lanjut.</p>
      
      <h2>Dasar Hukum Penetapan PBB</h2>
      <p>PBB diatur dalam beberapa peraturan perundang-undangan:</p>
      <ul>
        <li>UU No. 12 Tahun 1985 tentang Pajak Bumi dan Bangunan</li>
        <li>UU No. 28 Tahun 2009 tentang Pajak Daerah dan Retribusi Daerah</li>
        <li>Peraturan Daerah setempat</li>
      </ul>
      
      <h2>Hak Wajib Pajak</h2>
      <p>Sebagai wajib pajak, Anda memiliki hak-hak sebagai berikut:</p>
      <ul>
        <li>Hak untuk mengetahui dasar perhitungan pajak</li>
        <li>Hak mengajukan keberatan atas penetapan pajak</li>
        <li>Hak mendapat pelayanan yang baik</li>
        <li>Hak atas kerahasiaan data</li>
      </ul>
      
      <h2>Langkah yang Dapat Diambil</h2>
      <p>Jika merasa penetapan PBB tidak sesuai, wajib pajak dapat:</p>
      <ol>
        <li>Mengajukan keberatan ke Bupati/Walikota</li>
        <li>Mengajukan banding ke Pengadilan Pajak</li>
        <li>Melaporkan ke DPRD setempat</li>
      </ol>
      
      <h2>Kesimpulan</h2>
      <p>Kenaikan PBB yang signifikan memang dapat menimbulkan keresahan masyarakat. Namun, sebagai warga negara yang baik, kita perlu memahami hak dan kewajiban kita serta mekanisme hukum yang tersedia untuk menyelesaikan permasalahan ini.</p>
    `,
    excerpt: 'Analisis hukum tentang viral kenaikan PBB 250% dan hak-hak wajib pajak dalam menghadapi kebijakan tersebut. Ketahui langkah hukum yang dapat diambil.',
    category: 'Hukum Pajak',
    featured_image: '/images/pbb-kenaikan.jpg',
    author: 'Tim Hukum Melek Hukum ID',
    status: 'published',
    seo_title: 'Kenaikan PBB 250% - Analisis Hukum dan Hak Wajib Pajak',
    seo_description: 'Analisis mendalam tentang viral kenaikan PBB 250% oleh Bupati. Pelajari hak-hak wajib pajak dan langkah hukum yang dapat diambil.',
    keywords: ['PBB', 'pajak daerah', 'hak wajib pajak', 'keberatan pajak', 'hukum pajak'],
    tags: ['pajak', 'PBB', 'hukum', 'wajib pajak', 'pemerintah daerah'],
    view_count: 0,
    like_count: 0,
    comment_count: 0,
    is_featured: true,
    is_latest: true
  };
  
  try {
    // Check if article already exists
    const { data: existing } = await supabase
      .from('articles')
      .select('id')
      .eq('slug', testArticle.slug)
      .single();
    
    if (existing) {
      console.log('✅ Test article already exists');
      return true;
    }
    
    // Insert new article
    const { data, error } = await supabase
      .from('articles')
      .insert(testArticle)
      .select()
      .single();
    
    if (error) {
      console.error('❌ Failed to insert test article:', error.message);
      return false;
    }
    
    console.log('✅ Test article inserted successfully');
    console.log(`   Article ID: ${data.id}`);
    console.log(`   URL: /artikel/${data.slug}`);
    
    return true;
    
  } catch (error) {
    console.error('❌ Unexpected error inserting article:', error.message);
    return false;
  }
}

async function main() {
  console.log('Starting Supabase diagnostics...\n');
  
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    console.log('\n=== RECOMMENDATIONS ===');
    console.log('✅ Supabase connection is working');
    
    // Try to insert test article if none found
    const { data: articleCount } = await supabase
      .from('articles')
      .select('count', { count: 'exact', head: true });
    
    if (articleCount === 0) {
      console.log('📝 No articles found. Inserting test article...');
      await insertTestArticle();
    }
    
    console.log('\n📋 Next steps:');
    console.log('1. Make sure your .env.local file has correct Supabase credentials');
    console.log('2. Run the SQL setup script in Supabase dashboard');
    console.log('3. Insert some test articles using the provided SQL');
    console.log('4. Test the article URLs in your browser');
    
  } else {
    console.log('\n=== TROUBLESHOOTING ===');
    console.log('❌ Connection issues detected');
    console.log('\n📋 Steps to fix:');
    console.log('1. Check your .env.local file exists and has correct values');
    console.log('2. Verify Supabase project is active');
    console.log('3. Check Supabase dashboard for any issues');
    console.log('4. Ensure RLS policies allow public access to articles');
  }
  
  console.log('\n=== DEBUGGING COMPLETE ===');
}

// Run the test
main().catch(console.error);