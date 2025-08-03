'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils'
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/app/components/ui/NavigationMenu'

const menuItems = [
  {
    title: 'Kamus Hukum',
    href: '/kamus-hukum',
    description: 'Istilah hukum dalam bahasa sederhana',
    children: [
      { title: 'Istilah Dasar', href: '/kamus-hukum/istilah-dasar' },
      { title: 'Konsep Anti-Korupsi', href: '/kamus-hukum/anti-korupsi' },
      { title: 'FAQ Hukum', href: '/kamus-hukum/faq' },
    ],
  },
  {
    title: 'Solusi',
    href: '/solusi',
    description: 'Panduan praktis masalah hukum',
    children: [
      { title: 'Panduan Praktis', href: '/solusi/panduan' },
      { title: 'Template Dokumen', href: '/solusi/template' },
      { title: 'Langkah Hukum', href: '/solusi/langkah' },
    ],
  },
  {
    title: 'Regulasi',
    href: '/regulasi',
    description: 'Update dan analisis regulasi terbaru',
    children: [
      { title: 'UU Terbaru', href: '/regulasi/uu-terbaru' },
      { title: 'Opini Ahli', href: '/regulasi/opini' },
      { title: 'Dampak Regulasi', href: '/regulasi/dampak' },
    ],
  },
  {
    title: 'Anti-Korupsi',
    href: '/anti-korupsi',
    description: 'Edukasi pencegahan korupsi',
    children: [
      { title: 'Edukasi', href: '/anti-korupsi/edukasi' },
      { title: 'Pencegahan', href: '/anti-korupsi/pencegahan' },
      { title: 'Integritas', href: '/anti-korupsi/integritas' },
    ],
  },
]

export default function DesktopNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuTrigger
              className={cn(
                pathname.startsWith(item.href) && 'bg-accent'
              )}
            >
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/10 to-primary/20 p-6 no-underline outline-none focus:shadow-md"
                      href={item.href}
                    >
                      <div className="mb-2 text-lg font-medium">
                        {item.title}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={child.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {child.title}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
