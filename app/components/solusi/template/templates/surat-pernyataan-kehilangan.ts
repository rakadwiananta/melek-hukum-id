import type { TemplateItem } from '@/types/solusi'

export const SURAT_PERNYATAAN_KEHILANGAN_TEMPLATE: TemplateItem = {
  id: 'surat-pernyataan-kehilangan',
  title: 'Surat Pernyataan Kehilangan',
  description: 'Template surat pernyataan kehilangan dokumen penting',
  category: 'Pernyataan',
  fileType: 'docx',
  downloadCount: 12543,
  fileSize: '45 KB',
  updatedAt: '2025-08-08'
}

export const SURAT_PERNYATAAN_KEHILANGAN_CONTENT = `
SURAT PERNYATAAN KEHILANGAN

Yang bertanda tangan di bawah ini:

Nama                    : [NAMA LENGKAP]
Tempat/Tanggal Lahir    : [TEMPAT], [TANGGAL LAHIR]
Jenis Kelamin           : [L/P]
Pekerjaan               : [PEKERJAAN]
Alamat                  : [ALAMAT LENGKAP]
No. KTP                 : [NOMOR KTP]
No. HP                  : [NOMOR HP]

Dengan ini menyatakan dengan sesungguhnya bahwa:

1. Saya telah kehilangan [JENIS DOKUMEN] dengan data sebagai berikut:
   - Jenis Dokumen       : [KTP/SIM/STNK/Paspor/dll]
   - Nomor Dokumen       : [NOMOR DOKUMEN]
   - Atas Nama           : [NAMA DI DOKUMEN]
   - Tanggal Terbit      : [TANGGAL TERBIT]
   - Masa Berlaku        : [MASA BERLAKU]
   - Instansi Penerbit   : [INSTANSI]

2. Dokumen tersebut hilang pada:
   - Hari/Tanggal        : [HARI], [TANGGAL]
   - Waktu (perkiraan)   : Pukul [JAM]
   - Lokasi              : [LOKASI KEHILANGAN]
   - Kronologi           : [JELASKAN KRONOLOGI SINGKAT]

3. Saya telah berusaha mencari dokumen tersebut namun tidak berhasil menemukannya.

4. Dokumen tersebut benar-benar milik saya dan tidak dipindahtangankan kepada orang lain.

5. Surat pernyataan ini saya buat untuk keperluan [KEPERLUAN PEMBUATAN SURAT].

6. Apabila dikemudian hari dokumen tersebut ditemukan, saya bersedia menyerahkannya kepada pihak yang berwenang.

7. Apabila pernyataan ini tidak benar, saya bersedia dituntut sesuai hukum yang berlaku.

Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun.

[KOTA], [TANGGAL]

Mengetahui,                        Yang menyatakan,
RT/RW                              
                                   Meterai
                                   10.000

[NAMA & TANDA TANGAN RT/RW]        [NAMA LENGKAP]
                                   [TANDA TANGAN & CAP JEMPOL]
`

export const SURAT_PERNYATAAN_KEHILANGAN_GUIDE = {
  title: 'Panduan Pengisian',
  steps: [
    { step: 1, title: 'Identitas', description: 'Isi identitas lengkap pembuat pernyataan.', fields: ['NAMA LENGKAP','TEMPAT','TANGGAL LAHIR','ALAMAT LENGKAP','NOMOR KTP','NOMOR HP'] },
    { step: 2, title: 'Data Dokumen', description: 'Isi detail dokumen yang hilang.', fields: ['JENIS DOKUMEN','NOMOR DOKUMEN','NAMA DI DOKUMEN','TANGGAL TERBIT','MASA BERLAKU','INSTANSI'] },
    { step: 3, title: 'Kejadian', description: 'Isi waktu, lokasi, dan kronologi.', fields: ['HARI','TANGGAL','JAM','LOKASI KEHILANGAN','KRONOLOGI'] }
  ],
  notes: ['Gunakan data yang benar dan lengkap.']
}

export const SURAT_PERNYATAAN_KEHILANGAN_REFERENCES = {
  legalBasis: ['KUHPerdata terkait pernyataan dan alat bukti'],
  requirements: ['Fotokopi KTP', 'Bukti pendukung (jika ada)'],
  importantNotes: ['Cantumkan meterai asli.']
} 