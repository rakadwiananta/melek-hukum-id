'use client'

import React from 'react'
import { BusinessLawDictionary } from './IstilahBisnis'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import NusantaraCanvas from '@/app/components/nusantara/NusantaraCanvas'
import WayangModel from '@/app/components/nusantara/WayangModel'
import { Canvas } from '@react-three/fiber'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'

export default function IstilahBisnisComponent() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50">
      {/* Decorative subtle pattern */}
      <PatternBackground />

      {/* Hero header with 3D Wayang and animated batik-like canvas banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <NusantaraCanvas height={220} reducedMotion={reduced} className="opacity-80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-700 via-rose-700 to-red-700 bg-clip-text text-transparent">
                Istilah Hukum Bisnis
              </h1>
              <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-prose">
                Jelajahi kamus istilah hukum bisnis dengan nuansa animasi Nusantara. Interaktif, ringan, dan nyaman
                untuk perangkat mobile.
              </p>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-500" />
            </div>

            {!reduced && (
              <div className="relative h-56 sm:h-64 md:h-56 lg:h-64">
                <div className="absolute inset-0 rounded-xl ring-1 ring-amber-200/60 shadow-[0_0_60px_-15px_rgba(234,179,8,0.45)]" />
                <Canvas camera={{ position: [0.8, 0.5, 1.6], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[2, 3, 2]} intensity={1} />
                  <group position={[0, -0.1, 0]}>
                    <WayangModel scale={1.2} pointerIntensity={0.1} />
                  </group>
                </Canvas>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main content: existing dictionary */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xl ring-1 ring-gray-200/70">
          {/* ...existing code... */}
          <BusinessLawDictionary />
          {/* ...existing code... */}
        </div>
      </main>
    </div>
  )
}