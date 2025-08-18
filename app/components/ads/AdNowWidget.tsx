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
  widgetId = '887874',
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
      // Initialize sc_adv_out array
      window.sc_adv_out = window.sc_adv_out || []
      
      // Push widget configuration
      window.sc_adv_out.push({
        id: parseInt(widgetId),
        domain: "n.nnowa.com",
      })
      
      // Load AdNow script
      const script = document.createElement('script')
      script.src = '//st-n.nnowa.com/js/a.js'
      script.async = true
      script.type = 'text/javascript'
      script.onload = () => {
        window.adnowLoaded = true
      }
      document.head.appendChild(script)
    }
  }, [widgetId])

  return (
    <div className={`adnow-widget ${className}`}>
      {/* AdNow Widget Container - Single container for both desktop and mobile */}
      <div 
        id={`SC_TBlock_${widgetId}`}
        className="adnow-container"
        style={{
          width: '100%',
          minHeight: '250px'
        }}
      >
        {/* Widget will be populated by AdNow script */}
      </div>
      
      {/* AdNow Script Integration */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // AdNow Widget Configuration
            (sc_adv_out = window.sc_adv_out || []).push({
              id: ${widgetId},
              domain: "n.nnowa.com",
            });
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
      widgetId="887874"
      className="max-w-[600px] mx-auto"
    />
  </div>
)

export const AdNowSidebar = ({ className }: { className?: string }) => (
  <aside className={`hidden lg:block sticky top-20 no-print ${className}`}>
    <AdNowWidget 
      widgetId="887874"
      className="max-w-[300px]"
    />
  </aside>
)

export const AdNowFooter = ({ className }: { className?: string }) => (
  <div className={`mt-12 mb-8 no-print ${className}`}>
    <AdNowWidget 
      widgetId="887874"
      className="max-w-[900px] mx-auto"
    />
  </div>
)

// Type declarations
declare global {
  interface Window {
    adnowLoaded?: boolean
    sc_adv_out?: Array<{
      id: number
      domain: string
    }>
  }
}