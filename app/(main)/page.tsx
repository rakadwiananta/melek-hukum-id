import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Melek Hukum ID - Platform Edukasi Hukum Indonesia',
  description: 'Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia. Pelajari hukum dengan mudah, praktis, dan gratis.',
}

export default function HomePage() {
  return <HomeClient />
}
