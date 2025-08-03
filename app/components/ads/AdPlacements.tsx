'use client'
import dynamic from 'next/dynamic'
import { cn } from '@/app/lib/utils'

// Dynamically import AdUnit with no SSR
const AdUnit = dynamic(() => import('./AdUnit'), { ssr: false })

export const HeaderBannerAd = ({ className }: { className?: string }) => (
  <div className={cn('hidden lg:block mb-4 no-print', className)}>
    <div className="max-w-[728px] mx-auto">
      <AdUnit 
        slot="1234567890" 
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
        slot="2345678901" 
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
        slot="3456789012" 
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
        slot="4567890123" 
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
