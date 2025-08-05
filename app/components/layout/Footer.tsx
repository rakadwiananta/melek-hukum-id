import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from '../ui/NewsletterForm'

const footerLinks = [
  {
    title: 'Konten',
    links: [
      { label: 'Kamus Hukum', href: '/kamus-hukum' },
      { label: 'Solusi Praktis', href: '/solusi' },
      { label: 'Regulasi', href: '/regulasi' },
      { label: 'Anti-Korupsi', href: '/anti-korupsi' },
    ],
  },
  {
    title: 'Sumber Daya',
    links: [
      { label: 'Template Dokumen', href: '/solusi/template' },
      { label: 'Kalkulator Denda', href: '/tools/kalkulator-denda' },
      { label: 'Kuis Korupsi', href: '/tools/kuis-korupsi' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Tentang',
    links: [
      { label: 'Tentang Kami', href: '/tentang' },
      { label: 'Tim Kami', href: '/tim' },
      { label: 'Kontak', href: '/kontak' },
      { label: 'Kerjasama', href: '/kerjasama' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Kebijakan Privasi', href: '/privacy' },
      { label: 'Syarat & Ketentuan', href: '/terms' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t no-print">
      {/* Newsletter Section */}
      <div className="bg-primary text-white">
        <div className="px-4 mx-auto max-w-7xl py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Tetap Update dengan Newsletter Kami
            </h3>
            <p className="text-white/90">
              Dapatkan info terbaru seputar hukum dan anti-korupsi
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-4 mx-auto max-w-7xl py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/timbangkan.jpg"
                alt="Melek Hukum ID"
                width={32}
                height={32}
              />
              <span className="font-bold">Melek Hukum ID</span>
            </Link>
            <p className="text-sm text-gray-600">
              Platform edukasi hukum dan anti-korupsi untuk masyarakat Indonesia
            </p>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} Melek Hukum ID. Hak cipta dilindungi.
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com/melekhukumid"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/melekhukumid"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/melekhukumid"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@melekhukumid"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
