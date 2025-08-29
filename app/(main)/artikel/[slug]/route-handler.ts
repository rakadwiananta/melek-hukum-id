// Route handler untuk redirect artikel Supabase ke artikel existing
export const articleRedirectMap: Record<string, string> = {
  // Artikel dari Supabase ke artikel existing
  'panduan-perceraian-indonesia-2024': '/artikel/cara-mengurus-perceraian-2024',
  'cara-mendirikan-pt-perseroan-terbatas-2024': '/artikel/cara-mendirikan-pt-2024',
  'hak-tersangka-proses-penyidikan-kuhap-2024': '/panduan/prosedur-pelaporan',
  'prosedur-jual-beli-tanah-aman-sah-2024': '/panduan/jual-beli-tanah',
  'panduan-warisan-hibah-hukum-waris-islam-kuhperdata': '/panduan/warisan-dan-hibah',
  'cara-mengurus-dokumen-hilang-ktp-sim-stnk-paspor-2024': '/panduan/mengurus-dokumen-hilang',
  'panduan-anti-korupsi-umkm-tata-kelola-bisnis-bersih': '/anti-korupsi',
  'cara-balik-nama-kendaraan-bpkb-stnk-panduan-2024': '/panduan/balik-nama-kendaraan',
  'prosedur-perceraian-pengadilan-agama-cerai-gugat-talak': '/panduan/cerai-gugat-cerai-talak',
  
  // Mapping artikel lainnya
  'gugatan-sederhana': '/panduan/gugatan-sederhana',
  'surat-kuasa': '/panduan/surat-kuasa',
  'phk-dan-pesangon': '/panduan/phk-dan-pesangon',
  'somasi-dan-teguran': '/panduan/somasi-dan-teguran',
  'laporan-kpk': '/artikel/laporan-kpk'
}

export function getRedirectPath(slug: string): string | null {
  return articleRedirectMap[slug] || null
}