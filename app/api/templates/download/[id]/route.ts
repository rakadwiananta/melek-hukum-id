import { NextRequest, NextResponse } from 'next/server'

// Simple template generator without docx dependency
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    // Simple template content based on ID
    const templates: Record<string, string> = {
      'surat-kuasa': `SURAT KUASA

Yang bertanda tangan di bawah ini:
Nama         : [NAMA PEMBERI KUASA]
Alamat       : [ALAMAT LENGKAP]
NIK          : [NOMOR INDUK KEPENDUDUKAN]

Dengan ini memberikan kuasa kepada:
Nama         : [NAMA PENERIMA KUASA]
Alamat       : [ALAMAT LENGKAP]
NIK          : [NOMOR INDUK KEPENDUDUKAN]

Untuk melakukan:
[URAIAN TINDAKAN YANG DIKUASAKAN]

Demikian surat kuasa ini dibuat untuk dipergunakan sebagaimana mestinya.

[TEMPAT], [TANGGAL]

Pemberi Kuasa                 Penerima Kuasa


[NAMA PEMBERI KUASA]          [NAMA PENERIMA KUASA]`,

      'kontrak-kerja': `KONTRAK KERJA

PIHAK PERTAMA (PEMBERI KERJA):
Nama         : [NAMA PERUSAHAAN]
Alamat       : [ALAMAT PERUSAHAAN]
NPWP         : [NPWP PERUSAHAAN]

PIHAK KEDUA (PEKERJA):
Nama         : [NAMA PEKERJA]
Alamat       : [ALAMAT PEKERJA]
NIK          : [NIK PEKERJA]

PASAL 1 - JABATAN DAN TUGAS
Pihak Kedua ditempatkan pada jabatan: [JABATAN]
Dengan tugas dan tanggung jawab: [URAIAN TUGAS]

PASAL 2 - MASA KERJA
Kontrak ini berlaku selama: [DURASI KONTRAK]
Terhitung mulai: [TANGGAL MULAI]

PASAL 3 - GAJI DAN TUNJANGAN
Gaji pokok: Rp [JUMLAH GAJI]
Tunjangan: [URAIAN TUNJANGAN]

[TEMPAT], [TANGGAL]

Pihak Pertama                 Pihak Kedua


[NAMA PERUSAHAAN]             [NAMA PEKERJA]`,

      'surat-perjanjian': `SURAT PERJANJIAN

PIHAK PERTAMA:
Nama         : [NAMA PIHAK PERTAMA]
Alamat       : [ALAMAT PIHAK PERTAMA]
NIK/NPWP     : [IDENTITAS PIHAK PERTAMA]

PIHAK KEDUA:
Nama         : [NAMA PIHAK KEDUA]
Alamat       : [ALAMAT PIHAK KEDUA]
NIK/NPWP     : [IDENTITAS PIHAK KEDUA]

PASAL 1 - OBJEK PERJANJIAN
[URAIAN OBJEK PERJANJIAN]

PASAL 2 - HAK DAN KEWAJIBAN
Hak dan kewajiban masing-masing pihak:
[URAIAN HAK DAN KEWAJIBAN]

PASAL 3 - JANGKA WAKTU
Perjanjian ini berlaku selama: [JANGKA WAKTU]

[TEMPAT], [TANGGAL]

Pihak Pertama                 Pihak Kedua


[NAMA PIHAK PERTAMA]          [NAMA PIHAK KEDUA]`
    }

    const templateContent = templates[id] || 'Template tidak ditemukan'

    return new NextResponse(templateContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${id}.txt"`,
      },
    })
  } catch (error) {
    console.error('Template download error:', error)
    return NextResponse.json(
      { error: 'Gagal mengunduh template' },
      { status: 500 }
    )
  }
} 