import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artikel Hukum - Melek Hukum ID',
  description: 'Temukan artikel hukum terbaru dan informatif untuk meningkatkan pemahaman hukum Anda.',
}

export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 