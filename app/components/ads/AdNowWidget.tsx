'use client'

import { useEffect } from 'react'

interface AdNowWidgetProps {
  widgetId?: string
  className?: string
  columns?: number
  rows?: number
  mobileColumns?: number
  mobileRows?: number
  mobileFontSize?: number
  desktopFontSize?: number
}

export default function AdNowWidget({ 
  widgetId = 'your-adnow-widget-id',
  className = '',
  columns = 3,
  rows = 2,
  mobileColumns = 1,
  mobileRows = 4,
  mobileFontSize = 14,
  desktopFontSize = 16
}: AdNowWidgetProps) {
  useEffect(() => {
    // Load AdNow script if not already loaded
    if (typeof window !== 'undefined' && !window.adnowLoaded) {
      const script = document.createElement('script')
      script.src = '//www.adnow.com/ads/adnow.js'
      script.async = true
      script.onload = () => {
        window.adnowLoaded = true
      }
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className={`adnow-widget ${className}`}>
      {/* Desktop AdNow Widget */}
      <div 
        id={`adnow-${widgetId}-desktop`}
        data-adnow-widget={`${widgetId}-desktop`}
        className="hidden md:block"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '10px',
          padding: '10px'
        }}
      >
        {/* Desktop widget will be populated by AdNow script */}
      </div>

      {/* Mobile AdNow Widget */}
      <div 
        id={`adnow-${widgetId}-mobile`}
        data-adnow-widget={`${widgetId}-mobile`}
        className="block md:hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${mobileColumns}, 1fr)`,
          gridTemplateRows: `repeat(${mobileRows}, 1fr)`,
          gap: '8px',
          padding: '8px'
        }}
      >
        {/* Mobile widget will be populated by AdNow script */}
      </div>
      
      {/* AdNow Script Integration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.adnow) {
              window.adnow.queue = window.adnow.queue || [];
              
              // Desktop configuration
              window.adnow.queue.push({
                element: 'adnow-${widgetId}-desktop',
                params: {
                  columns: ${columns},
                  rows: ${rows},
                  padding: 10,
                  logo: 'none',
                  pictureShape: 'rectangle80',
                  textPosition: 'below',
                  alignment: 'left',
                  font: 'Arial',
                  fontSize: ${desktopFontSize},
                  fontColor: '#333333',
                  border: 'none',
                  allowMobile: false,
                  allowDesktop: true,
                  allowAnimations: true
                }
              });
              
              // Mobile configuration
              window.adnow.queue.push({
                element: 'adnow-${widgetId}-mobile',
                params: {
                  columns: ${mobileColumns},
                  rows: ${mobileRows},
                  padding: 8,
                  logo: 'none',
                  pictureShape: 'rectangle80',
                  textPosition: 'below',
                  alignment: 'left',
                  font: 'Arial',
                  fontSize: ${mobileFontSize},
                  fontColor: '#333333',
                  border: 'none',
                  allowMobile: true,
                  allowDesktop: false,
                  allowAnimations: false
                }
              });
            }
          `
        }}
      />
    </div>
  )
}

// Specific AdNow placements
export const AdNowInContent = ({ className }: { className?: string }) => (
  <div className={`my-8 flex justify-center no-print ${className}`}>
    <AdNowWidget 
      widgetId="in-content"
      columns={2}
      rows={2}
      mobileColumns={1}
      mobileRows={3}
      desktopFontSize={16}
      mobileFontSize={14}
      className="max-w-[600px] mx-auto"
    />
  </div>
)

export const AdNowSidebar = ({ className }: { className?: string }) => (
  <aside className={`hidden lg:block sticky top-20 no-print ${className}`}>
    <AdNowWidget 
      widgetId="sidebar"
      columns={1}
      rows={4}
      className="max-w-[300px]"
    />
  </aside>
)

export const AdNowFooter = ({ className }: { className?: string }) => (
  <div className={`mt-12 mb-8 no-print ${className}`}>
    <AdNowWidget 
      widgetId="footer"
      columns={3}
      rows={2}
      mobileColumns={1}
      mobileRows={4}
      desktopFontSize={16}
      mobileFontSize={14}
      className="max-w-[900px] mx-auto"
    />
  </div>
)

// Type declarations
declare global {
  interface Window {
    adnowLoaded?: boolean
    adnow?: {
      queue: Array<{
        element: string
        params: Record<string, any>
      }>
    }
  }
}