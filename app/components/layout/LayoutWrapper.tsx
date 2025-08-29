'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for layout components
const Header = dynamic(() => import('@/app/components/layout/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white shadow-sm border-b animate-pulse" />,
})

const Footer = dynamic(() => import('@/app/components/layout/Footer'), {
  ssr: true,
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
})

const Toaster = dynamic(() => import('@/app/components/ui/Toaster').then(mod => ({ default: mod.Toaster })), {
  ssr: false,
  loading: () => null,
})

const ToastProvider = dynamic(() => import('@/app/components/ui/use-toast').then(mod => ({ default: mod.ToastProvider })), {
  ssr: false,
  loading: () => null,
})

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </ToastProvider>
  )
}