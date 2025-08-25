import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer - Melek Hukum ID',
  description: 'Penting untuk dibaca sebelum menggunakan layanan kami. Disclaimer lengkap tentang penggunaan platform Melek Hukum ID.',
  keywords: 'disclaimer hukum, ketentuan penggunaan, melek hukum, informasi hukum',
  openGraph: {
    title: 'Disclaimer - Melek Hukum ID',
    description: 'Penting untuk dibaca sebelum menggunakan layanan kami. Disclaimer lengkap tentang penggunaan platform Melek Hukum ID.',
    type: 'website',
    url: 'https://bicarahukum.my.id/disclaimer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}