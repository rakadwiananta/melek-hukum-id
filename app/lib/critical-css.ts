// Critical CSS System untuk optimasi performa
export const criticalCSS = `
/* Critical Path CSS - Inline untuk above-the-fold content */
/* Reset dan base styles */
*,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}
body{margin:0;line-height:inherit}

/* Layout critical styles */
.min-h-screen{min-height:100vh}
.max-w-7xl{max-width:80rem}
.mx-auto{margin-left:auto;margin-right:auto}
.px-4{padding-left:1rem;padding-right:1rem}
.py-8{padding-top:2rem;padding-bottom:2rem}

/* Flexbox critical */
.flex{display:flex}
.justify-between{justify-content:space-between}
.items-center{align-items:center}
.space-x-8>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-right:calc(2rem * var(--tw-space-x-reverse));margin-left:calc(2rem * calc(1 - var(--tw-space-x-reverse)))}

/* Typography critical */
.text-xl{font-size:1.25rem;line-height:1.75rem}
.font-bold{font-weight:700}
.text-gray-900{--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))}
.text-gray-700{--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity))}

/* Header critical styles */
.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}
.shadow-sm{--tw-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}
.border-b{border-bottom-width:1px}
.h-16{height:4rem}
.h-8{height:2rem}
.w-auto{width:auto}
.mr-2{margin-right:0.5rem}

/* Navigation critical */
.hidden{display:none}
.md\\:flex{display:flex}
.px-3{padding-left:0.75rem;padding-right:0.75rem}
.py-2{padding-top:0.5rem;padding-bottom:0.5rem}
.rounded-md{border-radius:0.375rem}
.text-sm{font-size:0.875rem;line-height:1.25rem}
.font-medium{font-weight:500}
.transition-colors{transition-property:color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}

/* Hover states */
.hover\\:text-gray-900:hover{--tw-text-opacity:1;color:rgb(17 24 39 / var(--tw-text-opacity))}

/* Background gradients untuk hero */
.bg-gradient-to-b{background-image:linear-gradient(to bottom, var(--tw-gradient-stops))}
.from-amber-50{--tw-gradient-from:#fffbeb var(--tw-gradient-from-position);--tw-gradient-to:rgb(255 251 235 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}
.via-white{--tw-gradient-to:rgb(255 255 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), #fff var(--tw-gradient-via-position), var(--tw-gradient-to)}
.to-brown-50{--tw-gradient-to:#fdf8f6 var(--tw-gradient-to-position)}

/* Layout untuk hero section */
.mb-12{margin-bottom:3rem}
.relative{position:relative}
.h-56{height:14rem}
.md\\:h-72{height:18rem}
.lg\\:h-80{height:20rem}
.rounded-2xl{border-radius:1rem}
.overflow-hidden{overflow:hidden}
.bg-gradient-to-r{background-image:linear-gradient(to right, var(--tw-gradient-stops))}
.from-brown-600{--tw-gradient-from:#92400e var(--tw-gradient-from-position);--tw-gradient-to:rgb(146 64 14 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to)}
.to-amber-600{--tw-gradient-to:#d97706 var(--tw-gradient-to-position)}

/* Position absolute untuk overlay */
.absolute{position:absolute}
.inset-0{inset:0px}
.bottom-0{bottom:0px}
.left-0{left:0px}
.p-6{padding:1.5rem}
.md\\:p-8{padding:2rem}
.text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}
.text-2xl{font-size:1.5rem;line-height:2rem}
.md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}
.mb-2{margin-bottom:0.5rem}

/* Responsive text */
.md\\:text-base{font-size:1rem;line-height:1.5rem}
.text-white\\/90{color:rgb(255 255 255 / 0.9)}
.max-w-xl{max-width:36rem}

/* Grid critical */
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1, minmax(0, 1fr))}
.lg\\:grid-cols-4{grid-template-columns:repeat(4, minmax(0, 1fr))}
.gap-8{gap:2rem}
.lg\\:col-span-3{grid-column:span 3 / span 3}

/* Loading states critical */
.animate-pulse{animation:pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

/* Button critical styles */
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.py-3{padding-top:0.75rem;padding-bottom:0.75rem}
.bg-red-600{--tw-bg-opacity:1;background-color:rgb(220 38 38 / var(--tw-bg-opacity))}
.hover\\:bg-red-700:hover{--tw-bg-opacity:1;background-color:rgb(185 28 28 / var(--tw-bg-opacity))}
.rounded-lg{border-radius:0.5rem}

/* Z-index critical */
.relative{position:relative}
.z-10{z-index:10}
.z-50{z-index:50}

@media (min-width: 768px) {
  .md\\:flex{display:flex}
  .md\\:h-72{height:18rem}
  .md\\:p-8{padding:2rem}
  .md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}
  .md\\:text-base{font-size:1rem;line-height:1.5rem}
}

@media (min-width: 1024px) {
  .lg\\:h-80{height:20rem}
  .lg\\:grid-cols-4{grid-template-columns:repeat(4, minmax(0, 1fr))}
  .lg\\:col-span-3{grid-column:span 3 / span 3}
}
`

// Function untuk inject critical CSS
export function injectCriticalCSS() {
  if (typeof document === 'undefined') return

  const existingStyle = document.getElementById('critical-css')
  if (existingStyle) return // Already injected

  const style = document.createElement('style')
  style.id = 'critical-css'
  style.textContent = criticalCSS
  document.head.insertBefore(style, document.head.firstChild)
}

// Function untuk load non-critical CSS dengan defer
export function loadNonCriticalCSS() {
  if (typeof document === 'undefined') return

  const nonCriticalCSS: string[] = [
    // Add your non-critical CSS files here
    // '/css/animations.css',
    // '/css/components.css'
  ]

  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    link.onload = () => {
      link.rel = 'stylesheet'
    }
    document.head.appendChild(link)

    // Fallback untuk browser yang tidak support preload
    const noscript = document.createElement('noscript')
    const fallbackLink = document.createElement('link')
    fallbackLink.rel = 'stylesheet'
    fallbackLink.href = href
    noscript.appendChild(fallbackLink)
    document.head.appendChild(noscript)
  })
}

// Extract critical CSS dari komponen above-the-fold
export const extractAboveFoldCSS = () => {
  return {
    layout: `
      .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
      .header { height: 4rem; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .hero { height: 20rem; background: linear-gradient(135deg, #92400e, #d97706); border-radius: 1rem; }
    `,
    typography: `
      .title { font-size: 2.25rem; font-weight: 700; line-height: 1.2; color: white; }
      .subtitle { font-size: 1rem; color: rgba(255,255,255,0.9); line-height: 1.5; }
      .nav-link { font-size: 0.875rem; font-weight: 500; color: #374151; }
    `,
    components: `
      .btn-primary { 
        background: #dc2626; 
        color: white; 
        padding: 0.75rem 1.5rem; 
        border-radius: 0.5rem; 
        font-weight: 500;
        transition: background-color 0.15s ease;
      }
      .btn-primary:hover { background: #b91c1c; }
    `
  }
}