'use client'

export default function PatternBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="nusantara-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="1" fill="#e5e7eb" />
            <path d="M25 25 L75 75 M75 25 L25 75" stroke="#f3f4f6" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nusantara-pattern)" opacity="0.5" />
      </svg>
    </div>
  )
}
