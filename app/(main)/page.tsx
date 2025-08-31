import { Metadata } from 'next'
import HomePageWrapper from '@/app/components/home/HomePageWrapper'

export const metadata: Metadata = {
  title: 'Wacana Hukum - Portal Hukum Indonesia Terpercaya',
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. Pelajari hukum dengan mudah, praktis, dan gratis.',
}

export default function HomePage() {
  return <HomePageWrapper />
}
