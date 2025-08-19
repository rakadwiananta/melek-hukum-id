'use client'

import React from 'react'
import { KategoriBisnis } from '@/app/components/kamus'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kategori Hukum Bisnis - Kamus Hukum Indonesia',
  description: 'Kumpulan istilah hukum bisnis dan perdagangan Indonesia. Pelajari terminologi hukum perusahaan, kontrak bisnis, dan regulasi perdagangan.',
  keywords: 'hukum bisnis, istilah perusahaan, kontrak bisnis, hukum perdagangan, korporasi',
}

export default function KategoriBisnisPage() {
  return <KategoriBisnis />
}
