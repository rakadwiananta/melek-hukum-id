'use client'
import dynamic from 'next/dynamic'
import { cn } from '@/app/lib/utils'

// Dynamically import AdUnit with no SSR
const AdUnit = dynamic(() => import('./AdUnit'), { ssr: false })

const SLOT_HEADER = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER || ''
const SLOT_IN_CONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT || ''
const SLOT_SIDEBAR = process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || ''
const SLOT_MOBILE = process.env.NEXT_PUBLIC_ADSENSE_SLOT_MOBILE || ''

export const HeaderBannerAd = ({ className }: { className?: string }) => (
  <div className={cn('hidden lg:block mb-4 no-print', className)}>
    <div className="max-w-[728px] mx-auto">
      <AdUnit 
        slot={SLOT_HEADER}
        format="horizontal"
        style={{ minHeight: '90px' }}
      />
    </div>
  </div>
)

export const InContentAd = ({ className }: { className?: string }) => (
  <div className={cn('my-8 flex justify-center no-print', className)}>
    <div className="ad-container">
      <AdUnit 
        slot={SLOT_IN_CONTENT}
        format="rectangle"
        className="max-w-[336px]"
        style={{ minHeight: '280px' }}
      />
    </div>
  </div>
)

export const SidebarAd = ({ className }: { className?: string }) => (
  <aside className={cn('hidden xl:block sticky top-20 no-print', className)}>
    <div className="ad-container">
      <AdUnit 
        slot={SLOT_SIDEBAR}
        format="vertical"
        className="max-w-[300px]"
        style={{ minHeight: '600px' }}
      />
    </div>
  </aside>
)

export const MobileAd = ({ className }: { className?: string }) => (
  <div className={cn('lg:hidden my-6 no-print', className)}>
    <div className="ad-container">
      <AdUnit 
        slot={SLOT_MOBILE}
        format="auto"
        responsive={true}
        style={{ minHeight: '100px' }}
      />
    </div>
  </div>
)

// Smart ad component that shows different ads based on device
export const ResponsiveAd = ({ className }: { className?: string }) => (
  <>
    <div className="lg:hidden">
      <MobileAd className={className} />
    </div>
    <div className="hidden lg:block">
      <InContentAd className={className} />
    </div>
  </>
)
