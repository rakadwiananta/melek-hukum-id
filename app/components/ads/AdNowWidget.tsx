'use client'

import { useEffect } from 'react'

interface AdNowWidgetProps {
  widgetId?: string
  className?: string
  columns?: number
  rows?: number
}

export default function AdNowWidget({ 
  widgetId = 'your-adnow-widget-id',
  className = '',
  columns = 3,
  rows = 2
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
      {/* AdNow Widget Container */}
      <div 
        id={`adnow-${widgetId}`}
        data-adnow-widget={widgetId}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '10px',
          padding: '10px'
        }}
      >
        {/* Widget will be populated by AdNow script */}
      </div>
      
      {/* AdNow Script Integration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.adnow) {
              window.adnow.queue = window.adnow.queue || [];
              window.adnow.queue.push({
                element: 'adnow-${widgetId}',
                params: {
                  columns: ${columns},
                  rows: ${rows},
                  padding: 10,
                  logo: 'none',
                  pictureShape: 'rectangle80',
                  textPosition: 'below',
                  alignment: 'left',
                  font: 'Arial',
                  fontSize: 16,
                  fontColor: '#333333',
                  border: 'none',
                  allowMobile: true,
                  allowDesktop: true,
                  allowAnimations: true
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