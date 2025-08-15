// Lightweight placeholder component
interface NusantaraCanvasProps {
  height?: number
  reducedMotion?: boolean
  className?: string
}

export default function NusantaraCanvas({ height = 200, className = '' }: NusantaraCanvasProps) {
  return (
    <div 
      className={`bg-gradient-to-r from-amber-100 to-brown-100 rounded-lg ${className}`}
      style={{ height: `${height}px` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-amber-600 opacity-30">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
      </div>
    </div>
  )
}