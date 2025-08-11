import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panduan Hukum Praktis - Melek Hukum ID',
  description:
    'Kumpulan panduan hukum praktis untuk masyarakat Indonesia: dokumen hilang, prosedur pelaporan, gugatan sederhana, dan berbagai panduan hukum lainnya.',
  keywords: ['panduan hukum', 'prosedur hukum', 'dokumen hilang', 'gugatan sederhana', 'hukum Indonesia'],
}

export default function PanduanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 