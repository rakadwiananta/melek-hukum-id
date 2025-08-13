import { MetadataRoute } from 'next'
import { supabase, supabaseAdmin } from '@/app/lib/supabase'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bicarahukum.my.id'

const staticPaths: string[] = [
  '/',
  '/anti-korupsi',
  '/artikel',
  '/cookies',
  '/disclaimer',
  '/kamus-hukum',
  '/kamus-hukum/faq',
  '/kamus-hukum/hak-tersangka',
  '/kamus-hukum/kategori/anti-korupsi',
  '/kamus-hukum/kategori/anti-korupsi/istilah',
  '/kamus-hukum/kategori/pidana',
  '/kamus-hukum/kategori/pidana/istilah',
  '/kamus-hukum/kategori/tata-negara',
  '/kamus-hukum/kategori/tata-negara/istilah',
  '/kamus-hukum/kuhp',
  '/kerjasama',
  '/komunitas',
  '/kontak',
  '/panduan',
  '/panduan/balik-nama-kendaraan',
  '/panduan/cerai-gugat-cerai-talak',
  '/panduan/gugatan-sederhana',
  '/panduan/jual-beli-tanah',
  '/panduan/mengurus-dokumen-hilang',
  '/panduan/phk-dan-pesangon',
  '/panduan/prosedur-pelaporan',
  '/panduan/somasi-dan-teguran',
  '/panduan/surat-kuasa',
  '/panduan/warisan-dan-hibah',
  '/payment-error',
  '/payment-success',
  '/privacy',
  '/regulasi',
  '/regulasi/kasus',
  '/solusi',
  '/solusi/template',
  '/tentang',
  '/terms',
  '/tim',
  '/tools/kalkulator-denda',
  '/tools/kuis-korupsi',
]

const templateIds = [
  'surat-perjanjian-sewa-rumah',
  'surat-perjanjian-jual-beli',
  'surat-perjanjian-kerja-pkwtt',
  'surat-kuasa-hukum',
  'surat-pernyataan-kehilangan',
]

async function fetchArticleSlugs(): Promise<{ slug: string; updated_at?: string | null }[]> {
  const client = supabaseAdmin || supabase
  if (!client) return []

  const { data, error } = await client
    .from('articles')
    .select('slug, updated_at')
    .eq('is_published', true)
    .limit(2000)

  if (error || !data) return []
  return data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const articleSlugs = await fetchArticleSlugs()

  const urls: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      priority: path === '/' ? 1 : 0.7,
    })),
    ...templateIds.map((id) => ({
      url: `${BASE_URL}/solusi/template/${id}/`,
      lastModified: now,
      priority: 0.6,
    })),
    ...articleSlugs.map((a) => ({
      url: `${BASE_URL}/artikel/${a.slug}/`,
      lastModified: a.updated_at || now,
      priority: 0.8,
    })),
  ]

  return urls
}