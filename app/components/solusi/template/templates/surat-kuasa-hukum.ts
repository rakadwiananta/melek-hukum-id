import type { TemplateItem } from '@/types/solusi'

export const SURAT_KUASA_HUKUM_TEMPLATE: TemplateItem = {
  id: 'surat-kuasa-hukum',
  title: 'Surat Kuasa Hukum',
  description: 'Template surat kuasa hukum untuk berbagai keperluan',
  category: 'Kuasa',
  fileType: 'docx',
  downloadCount: 8902,
  fileSize: '52 KB',
  updatedAt: '2025-08-08'
}

export const SURAT_KUASA_HUKUM_CONTENT = `
SURAT KUASA
NOMOR: [NOMOR SURAT]

Yang bertanda tangan di bawah ini:

PEMBERI KUASA:
Nama                    : [NAMA PEMBERI KUASA]
Tempat/Tanggal Lahir    : [TEMPAT], [TANGGAL]
Pekerjaan               : [PEKERJAAN]
Alamat                  : [ALAMAT LENGKAP]
No. KTP                 : [NOMOR KTP]

Dengan ini memberikan kuasa kepada:

PENERIMA KUASA:
Nama                    : [NAMA PENERIMA KUASA]
Tempat/Tanggal Lahir    : [TEMPAT], [TANGGAL]
Pekerjaan               : [PEKERJAAN]
Alamat                  : [ALAMAT LENGKAP]
No. KTP                 : [NOMOR KTP]

------------------------ KHUSUS -----------------------

Untuk dan atas nama Pemberi Kuasa melakukan:

1. [URAIAN TINDAKAN YANG DIKUASAKAN]
2. [URAIAN TINDAKAN YANG DIKUASAKAN]
3. [URAIAN TINDAKAN YANG DIKUASAKAN]
4. Menandatangani dokumen-dokumen yang diperlukan
5. Melakukan segala tindakan yang dianggap perlu

Sehubungan dengan: [KEPERLUAN PEMBERIAN KUASA]

Di: [INSTANSI/TEMPAT PELAKSANAAN KUASA]

Surat kuasa ini berlaku sejak tanggal [TANGGAL MULAI] sampai dengan [TANGGAL BERAKHIR/selesainya urusan dimaksud].

Demikian surat kuasa ini dibuat untuk dipergunakan sebagaimana mestinya.

[KOTA], [TANGGAL]

PENERIMA KUASA                     PEMBERI KUASA

                                   Meterai
                                   10.000

[NAMA PENERIMA KUASA]              [NAMA PEMBERI KUASA]
`

export const SURAT_KUASA_HUKUM_GUIDE = {
  title: 'Panduan Pengisian',
  steps: [
    { step: 1, title: 'Pemberi Kuasa', description: 'Isi data pemberi kuasa.', fields: ['NAMA PEMBERI KUASA','ALAMAT','NOMOR KTP'] },
    { step: 2, title: 'Penerima Kuasa', description: 'Isi data penerima kuasa.', fields: ['NAMA PENERIMA KUASA','ALAMAT','NOMOR KTP'] },
    { step: 3, title: 'Ruang Lingkup', description: 'Isi tindakan yang dikuasakan dan masa berlakunya.', fields: ['URAIAN TINDAKAN','TANGGAL MULAI','TANGGAL BERAKHIR'] }
  ],
  notes: ['Gunakan bahasa yang jelas dan spesifik.']
}

export const SURAT_KUASA_HUKUM_REFERENCES = {
  legalBasis: ['KUHPerdata tentang Pemberian Kuasa (Pasal 1792 dst.)'],
  requirements: ['Fotokopi KTP para pihak'],
  importantNotes: ['Tempel meterai sesuai ketentuan.']
} 