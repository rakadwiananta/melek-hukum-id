// Lightweight placeholder component
export default function PatternBackground() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 800 600">
        <defs>
          <pattern id="simple-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#simple-pattern)" />
      </svg>
    </div>
  )
}