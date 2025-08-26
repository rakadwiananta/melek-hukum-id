'use client'

import { useEffect } from 'react'

export default function CriticalCSSInjector() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Inject critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      .antialiased {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      .bg-white {
        background-color: #ffffff;
      }
      
      .text-gray-900 {
        color: #111827;
      }
      
      .min-h-screen {
        min-height: 100vh;
      }
      
      .flex {
        display: flex;
      }
      
      .flex-col {
        flex-direction: column;
      }
      
      .flex-1 {
        flex: 1 1 0%;
      }
      
      .bg-gradient-to-b {
        background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
      }
      
      .from-slate-50 {
        --tw-gradient-from: #f8fafc;
        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(248, 250, 252, 0));
      }
      
      .to-white {
        --tw-gradient-to: #ffffff;
      }
      
      .relative {
        position: relative;
      }
      
      .overflow-hidden {
        overflow: hidden;
      }
      
      .container {
        width: 100%;
      }
      
      .mx-auto {
        margin-left: auto;
        margin-right: auto;
      }
      
      .px-4 {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      
      .max-w-7xl {
        max-width: 80rem;
      }
      
      .grid {
        display: grid;
      }
      
      .grid-cols-1 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
      
      .gap-12 {
        gap: 3rem;
      }
      
      .items-center {
        align-items: center;
      }
      
      .w-full {
        width: 100%;
      }
      
      .text-4xl {
        font-size: 2.25rem;
        line-height: 2.5rem;
      }
      
      .font-bold {
        font-weight: 700;
      }
      
      .text-gray-900 {
        color: #111827;
      }
      
      .mb-6 {
        margin-bottom: 1.5rem;
      }
      
      .leading-\[1\.1\] {
        line-height: 1.1;
      }
      
      .block {
        display: block;
      }
      
      .text-transparent {
        color: transparent;
      }
      
      .bg-clip-text {
        background-clip: text;
      }
      
      .bg-gradient-to-r {
        background-image: linear-gradient(to right, var(--tw-gradient-stops));
      }
      
      .from-red-600 {
        --tw-gradient-from: #dc2626;
        --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(220, 38, 38, 0));
      }
      
      .to-rose-600 {
        --tw-gradient-to: #e11d48;
      }
      
      .text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      
      .text-gray-700 {
        color: #374151;
      }
      
      .mt-2 {
        margin-top: 0.5rem;
      }
      
      .text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
      }
      
      .text-gray-600 {
        color: #4b5563;
      }
      
      .mb-8 {
        margin-bottom: 2rem;
      }
      
      .leading-relaxed {
        line-height: 1.625;
      }
      
      .max-w-xl {
        max-width: 36rem;
      }
      
      .flex-col {
        flex-direction: column;
      }
      
      .sm\\:flex-row {
        flex-direction: row;
      }
      
      .gap-4 {
        gap: 1rem;
      }
      
      .mb-12 {
        margin-bottom: 3rem;
      }
      
      .inline-flex {
        display: inline-flex;
      }
      
      .items-center {
        align-items: center;
      }
      
      .justify-center {
        justify-content: center;
      }
      
      .px-8 {
        padding-left: 2rem;
        padding-right: 2rem;
      }
      
      .py-4 {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      
      .bg-gray-900 {
        background-color: #111827;
      }
      
      .text-white {
        color: #ffffff;
      }
      
      .rounded-xl {
        border-radius: 0.75rem;
      }
      
      .font-semibold {
        font-weight: 600;
      }
      
      .overflow-hidden {
        overflow: hidden;
      }
      
      .transition-all {
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      
      .duration-300 {
        transition-duration: 300ms;
      }
      
      .hover\\:bg-gray-800:hover {
        background-color: #1f2937;
      }
      
      .relative {
        position: relative;
      }
      
      .z-10 {
        z-index: 10;
      }
      
      .w-5 {
        width: 1.25rem;
      }
      
      .h-5 {
        height: 1.25rem;
      }
      
      .ml-2 {
        margin-left: 0.5rem;
      }
      
      .transition-transform {
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
      }
      
      .group:hover .group-hover\\:translate-x-1 {
        transform: translateX(0.25rem);
      }
      
      .border-2 {
        border-width: 2px;
      }
      
      .border-gray-200 {
        border-color: #e5e7eb;
      }
      
      .hover\\:border-gray-300:hover {
        border-color: #d1d5db;
      }
      
      .hover\\:shadow-lg:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      
      .mr-2 {
        margin-right: 0.5rem;
      }
      
      .text-red-600 {
        color: #dc2626;
      }
      
      .grid {
        display: grid;
      }
      
      .grid-cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      
      .gap-8 {
        gap: 2rem;
      }
      
      .text-center {
        text-align: center;
      }
      
      .text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      
      .lg\\:text-4xl {
        font-size: 2.25rem;
        line-height: 2.5rem;
      }
      
      .mb-1 {
        margin-bottom: 0.25rem;
      }
      
      .text-sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      
      /* Responsive breakpoints */
      @media (min-width: 640px) {
        .sm\\:text-5xl {
          font-size: 3rem;
          line-height: 1;
        }
        
        .sm\\:text-4xl {
          font-size: 2.25rem;
          line-height: 2.5rem;
        }
        
        .sm\\:flex-row {
          flex-direction: row;
        }
      }
      
      @media (min-width: 1024px) {
        .lg\\:grid-cols-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        
        .lg\\:gap-20 {
          gap: 5rem;
        }
        
        .lg\\:text-6xl {
          font-size: 3.75rem;
          line-height: 1;
        }
        
        .lg\\:text-5xl {
          font-size: 3rem;
          line-height: 1;
        }
        
        .lg\\:text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
      }
      
      @media (min-width: 1280px) {
        .xl\\:text-7xl {
          font-size: 4.5rem;
          line-height: 1;
        }
        
        .xl\\:text-6xl {
          font-size: 3.75rem;
          line-height: 1;
        }
      }
    `

    // Create style element and inject critical CSS
    const style = document.createElement('style')
    style.id = 'critical-css'
    style.textContent = criticalCSS
    document.head.appendChild(style)

    // Remove the style element after the main CSS is loaded
    const removeCriticalCSS = () => {
      const criticalStyle = document.getElementById('critical-css')
      if (criticalStyle) {
        criticalStyle.remove()
      }
    }

    // Remove critical CSS after a delay to ensure main CSS is loaded
    setTimeout(removeCriticalCSS, 3000)

    return () => {
      const criticalStyle = document.getElementById('critical-css')
      if (criticalStyle) {
        criticalStyle.remove()
      }
    }
  }, [])

  return null
}