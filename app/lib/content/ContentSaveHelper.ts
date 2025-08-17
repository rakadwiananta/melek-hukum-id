import { ArticleContentManager, SupabaseArticleManager } from './ArticleContentManager'

/**
 * Helper utility untuk menyimpan artikel ke Supabase dengan formatting yang benar
 */
export class ContentSaveHelper {
  
  /**
   * Konversi dan simpan artikel dari plain text ke Supabase
   * 
   * @param articleData - Data artikel yang akan disimpan
   * @returns Data yang siap disimpan ke Supabase
   */
  static async prepareArticleForSave(articleData: {
    title: string
    plainContent: string
    category: string
    author?: string
    excerpt?: string
    featured_image?: string
    seo_title?: string
    seo_description?: string
    keywords?: string[]
  }) {
    // Generate slug dari title
    const slug = this.generateSlug(articleData.title)
    
    // Prepare data untuk SupabaseArticleManager
    const preparedData = await SupabaseArticleManager.saveArticle({
      ...articleData,
      slug,
      author: articleData.author || 'Tim Melek Hukum ID'
    })
    
    return {
      ...preparedData,
      // Return both plain content dan structured content untuk fleksibilitas
      plain_content: articleData.plainContent,
      structured_preview: this.getStructuredPreview(articleData.plainContent)
    }
  }
  
  /**
   * Generate slug dari title
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }
  
  /**
   * Get preview dari structured content untuk debugging
   */
  private static getStructuredPreview(plainContent: string) {
    const structured = ArticleContentManager.parseArticleToStructured(plainContent)
    
    return {
      sectionCount: structured.sections.length,
      wordCount: structured.metadata.wordCount,
      readingTime: structured.metadata.readingTime,
      hasLists: structured.sections.some(s => s.type === 'list'),
      hasQuotes: structured.sections.some(s => s.type === 'quote'),
      hasConclusions: structured.sections.some(s => s.type === 'conclusion'),
      headings: structured.sections
        .filter(s => s.type === 'heading')
        .map(s => ({ level: s.level, content: s.content }))
    }
  }
  
  /**
   * Konversi data untuk insertions ke Supabase
   */
  static formatForSupabaseInsert(preparedData: any) {
    return {
      title: preparedData.title,
      slug: preparedData.slug,
      content: preparedData.content, // This is the JSON structured content
      content_type: 'structured',
      excerpt: preparedData.excerpt,
      category: preparedData.category,
      author: preparedData.author,
      featured_image: preparedData.featured_image,
      seo_title: preparedData.seo_title || preparedData.title,
      seo_description: preparedData.seo_description || preparedData.excerpt,
      keywords: preparedData.keywords || [],
      word_count: preparedData.word_count,
      reading_time: preparedData.reading_time,
      status: 'published',
      published_at: new Date().toISOString()
    }
  }
}

/**
 * Contoh penggunaan untuk menyimpan artikel UMKM
 */
export const UMKM_ARTICLE_EXAMPLE = {
  title: "UMKM Naik Kelas: Membedah Untung Rugi Mendirikan PT Perorangan",
  plainContent: `Era ekonomi digital telah membuka peluang emas bagi pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) untuk mengembangkan bisnis mereka. Salah satu langkah strategis yang semakin populer adalah transformasi dari usaha perorangan menjadi Perseroan Terbatas Perorangan (PT Perorangan). Kebijakan ini, yang diatur dalam Peraturan Pemerintah Nomor 8 Tahun 2021, memberikan jembatan bagi UMKM untuk naik kelas dengan tetap mempertahankan fleksibilitas operasional.

PT Perorangan hadir sebagai solusi inovatif yang memungkinkan pengusaha individu menikmati keuntungan struktur korporasi tanpa kehilangan kendali penuh atas bisnis mereka. Namun, seperti setiap keputusan bisnis strategis, mendirikan PT Perorangan memiliki konsekuensi hukum, finansial, dan operasional yang perlu dipahami secara mendalam.

KEUNTUNGAN MENDIRIKAN PT PERORANGAN

Perlindungan Hukum yang Kuat

PT Perorangan memberikan pemisahan yang jelas antara kekayaan pribadi dan kekayaan perusahaan. Hal ini berarti jika terjadi masalah hukum atau utang bisnis, aset pribadi pemilik terlindungi dari tuntutan kreditor. Perlindungan ini sangat krusial, terutama bagi bisnis yang beroperasi dalam industri berisiko tinggi atau melibatkan transaksi besar.

Selain itu, PT Perorangan memiliki status badan hukum yang sah, sehingga dapat melakukan kontrak, mengajukan pinjaman bank, dan berpartisipasi dalam tender pemerintah dengan kredibilitas yang lebih tinggi dibandingkan usaha perorangan biasa.

Akses Permodalan yang Lebih Luas

Lembaga keuangan umumnya lebih percaya kepada badan hukum daripada usaha perorangan. Dengan status PT Perorangan, pengusaha dapat mengakses berbagai skema pembiayaan, termasuk:

1. Kredit investasi dengan bunga kompetitif
2. Program pembiayaan khusus UMKM dari bank-bank BUMN
3. Skema peer-to-peer lending untuk fintech
4. Kemudahan dalam mengajukan Letter of Credit (L/C) untuk ekspor-impor

Dengan demikian PT Perorangan menawarkan jalan tengah yang menarik bagi UMKM yang ingin naik kelas tanpa kehilangan kontrol atas bisnis mereka. Keuntungan berupa perlindungan hukum, akses permodalan yang lebih baik, dan kredibilitas yang meningkat dapat menjadi katalis pertumbuhan bisnis yang signifikan.

"Transformasi UMKM menjadi PT Perorangan bukan sekadar perubahan struktur hukum, tetapi juga evolusi mindset bisnis menuju profesionalisme yang berkelanjutan."

Oleh karena itu bagi pengusaha yang sedang mempertimbangkan opsi ini, sangat disarankan untuk berkonsultasi dengan notaris dan konsultan hukum bisnis untuk mendapatkan panduan yang sesuai dengan kondisi spesifik bisnis masing-masing.`,
  category: "solusi",
  author: "Tim Hukum Bisnis Melek Hukum ID",
  excerpt: "Panduan lengkap tentang keuntungan dan risiko transformasi UMKM menjadi PT Perorangan, termasuk aspek hukum, finansial, dan operasional yang perlu dipertimbangkan.",
  seo_title: "UMKM Naik Kelas: Panduan Lengkap Mendirikan PT Perorangan",
  seo_description: "Pelajari untung rugi mendirikan PT Perorangan untuk UMKM. Panduan lengkap aspek hukum, finansial, dan strategis transformasi bisnis.",
  keywords: ["PT Perorangan", "UMKM", "Perseroan Terbatas", "Hukum Bisnis", "Transformasi Bisnis", "Perlindungan Hukum", "Modal Usaha"]
}

export default ContentSaveHelper