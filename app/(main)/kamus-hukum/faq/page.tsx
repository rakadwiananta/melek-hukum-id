'use client'

import React, { useEffect, useRef, useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'

/**
 * FAQ Page with Nusantara 3D header, batik overlay, and credible statistics (World Bank).
 * - Attempts to fetch internal /api/faq/count for "pertanyaan terjawab" (integrasikan backend Anda).
 * - Always fetches World Bank indicators for Internet usage and population (credible public source).
 */

/* -------------------- Helper: World Bank hook -------------------- */
function useWorldBankIndonesiaStats() {
  const [internetPercent, setInternetPercent] = useState<number | null>(null)
  const [internetYear, setInternetYear] = useState<number | null>(null)
  const [population, setPopulation] = useState<number | null>(null)
  const [populationYear, setPopulationYear] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchIndicator(countryCode: string, indicator: string): Promise<any> {
      const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?format=json&per_page=500`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      return json
    }

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const internetData = await fetchIndicator('IDN', 'IT.NET.USER.ZS')
        const popData = await fetchIndicator('IDN', 'SP.POP.TOTL')

        if (!mounted) return

        const internetArray = Array.isArray(internetData) && Array.isArray(internetData[1]) ? internetData[1] : []
        const popArray = Array.isArray(popData) && Array.isArray(popData[1]) ? popData[1] : []

        const internetEntry = internetArray.find((e: any) => e && e.value !== null)
        const popEntry = popArray.find((e: any) => e && e.value !== null)

        setInternetPercent(internetEntry ? Number(internetEntry.value) : null)
        setInternetYear(internetEntry ? Number(internetEntry.date) : null)
        setPopulation(popEntry ? Math.round(Number(popEntry.value)) : null)
        setPopulationYear(popEntry ? Number(popEntry.date) : null)
      } catch (err) {
        console.error('World Bank fetch error:', err)
        setError('Gagal memuat statistik eksternal (World Bank).')
        setInternetPercent(null)
        setInternetYear(null)
        setPopulation(null)
        setPopulationYear(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  return { internetPercent, internetYear, population, populationYear, loading, error }
}

/* -------------------- Wayang-like lightweight 3D scene -------------------- */
function WayangScene({ scale = 1.0 }: { scale?: number }) {
  const group = useRef<THREE.Group | null>(null)
  const clock = useRef(new THREE.Clock())
  const pointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    function onMove(e: MouseEvent) {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    function onTouch(e: TouchEvent) {
      if (e.touches && e.touches[0]) {
        pointer.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
        pointer.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  useFrame(() => {
    const t = clock.current.getElapsedTime()
    const bob = Math.sin(t * 1.1) * 0.02 * scale
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.25) * 0.06 + pointer.current.x * 0.05
      group.current.rotation.x = pointer.current.y * 0.03
      group.current.position.y = bob
    }
  })

  // simple materials
  const wood = new THREE.MeshStandardMaterial({ color: '#7c4a2e', roughness: 0.7, metalness: 0.05 })
  const skin = new THREE.MeshStandardMaterial({ color: '#f1d7be', roughness: 0.6 })
  const gold = new THREE.MeshStandardMaterial({ color: '#E6B12C', roughness: 0.18, metalness: 0.9 })
  const cloth = new THREE.MeshStandardMaterial({ color: '#8b2f61', roughness: 0.65 })

  // Lathe profile for silhouette
  const profile = [
    new THREE.Vector2(0.0, -0.9),
    new THREE.Vector2(0.18, -0.78),
    new THREE.Vector2(0.34, -0.5),
    new THREE.Vector2(0.38, -0.15),
    new THREE.Vector2(0.34, 0.2),
    new THREE.Vector2(0.22, 0.45),
    new THREE.Vector2(0.12, 0.65),
    new THREE.Vector2(0.05, 0.75)
  ]

  return (
    <group ref={group} scale={scale}>
      <Center>
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <latheGeometry args={[profile, 48]} />
          <meshStandardMaterial attach="material" color={wood.color} roughness={wood.roughness} metalness={wood.metalness} />
        </mesh>

        <mesh position={[0, 0.72, 0.06]} castShadow>
          <sphereGeometry args={[0.12, 32, 16]} />
          <meshStandardMaterial color={skin.color} roughness={skin.roughness} />
        </mesh>

        <mesh position={[0, 0.56, 0.06]} castShadow>
          <torusGeometry args={[0.17, 0.03, 16, 64]} />
          <meshStandardMaterial color={gold.color} roughness={gold.roughness} metalness={gold.metalness} />
        </mesh>

        <mesh position={[-0.45, 0.12, 0.02]} rotation={[0, 0, -0.45]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
          <meshStandardMaterial color={wood.color} roughness={wood.roughness} metalness={wood.metalness} />
        </mesh>

        <mesh position={[0.45, 0.12, 0.02]} rotation={[0, 0, 0.45]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
          <meshStandardMaterial color={wood.color} roughness={wood.roughness} metalness={wood.metalness} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
          <planeGeometry args={[2.0, 1.0, 1, 1]} />
          <shadowMaterial transparent opacity={0.28} />
        </mesh>
      </Center>
    </group>
  )
}

/* -------------------- Batik SVG background -------------------- */
function BatikOverlay() {
  return (
    <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full pointer-events-none opacity-7">
      <defs>
        <pattern id="batik" width="140" height="140" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
          <rect width="140" height="140" fill="rgba(255,250,245,0.02)" />
          <path d="M18 70 C36 36, 104 36, 122 70 C104 104, 36 104, 18 70 Z" fill="rgba(124,74,46,0.03)" />
          <path d="M70 18 C54 36, 54 104, 70 122 C86 104, 86 36, 70 18 Z" fill="rgba(124,74,46,0.02)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik)" />
    </svg>
  )
}

/* -------------------- Main page component -------------------- */
export default function FaqKamusPage() {
  // Attempt to fetch internal FAQ answered count (integrate backend if available)
  const [faqCount, setFaqCount] = useState<number | null>(null)
  const [faqLoading, setFaqLoading] = useState<boolean>(true)
  const [faqError, setFaqError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadFaqCount() {
      setFaqLoading(true)
      try {
        const res = await fetch('/api/faq/count')
        if (!res.ok) {
          // if backend not available, just skip silently and show fallback
          throw new Error(`HTTP ${res.status}`)
        }
        const json = await res.json()
        if (!mounted) return
        // expecting { count: number }
        setFaqCount(typeof json.count === 'number' ? json.count : null)
      } catch (err) {
        console.info('FAQ count endpoint not available or error:', err)
        if (mounted) {
          setFaqError('Data internal tidak tersedia')
          setFaqCount(null)
        }
      } finally {
        if (mounted) setFaqLoading(false)
      }
    }
    loadFaqCount()
    return () => { mounted = false }
  }, [])

  const { internetPercent, internetYear, population, populationYear, loading: statsLoading, error: statsError } = useWorldBankIndonesiaStats()

  function formatNumber(num: number | null | undefined) {
    if (num === null || num === undefined) return '-'
    return num.toLocaleString('id-ID')
  }

  function estimatedInternetUsers() {
    if (internetPercent === null || population === null) return '-'
    const users = Math.round((internetPercent / 100) * population)
    return users.toLocaleString('id-ID')
  }

  // responsive header height
  const canvasHeight = typeof window !== 'undefined' ? Math.max(160, Math.min(340, Math.floor(window.innerHeight * 0.28))) : 220
  const pixelRatio = typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio || 1) : 1

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50 relative overflow-hidden">
      <BatikOverlay />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Header area with 3D */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">FAQ Hukum</h1>
              <p className="text-sm md:text-base text-gray-600">Tanya jawab singkat & praktis seputar hukum</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-brown-700 to-amber-600">
            <div className="absolute inset-0">
              <Canvas
                shadows
                camera={{ position: [0, 0, 3.4], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={pixelRatio}
                style={{ width: '100%', height: canvasHeight }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight intensity={0.8} position={[4, 6, 3]} />
                <pointLight position={[-4, -2, -3]} intensity={0.15} />
                <WayangScene scale={0.95} />
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.9} />
              </Canvas>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h2 className="text-lg md:text-2xl font-extrabold">Jawaban Cepat & Terpercaya</h2>
              <p className="text-sm md:text-base text-white/85 mt-1 max-w-2xl">Pilih topik, baca ringkasan, atau ajukan pertanyaan kepada ahli.</p>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FAQ answered */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {faqLoading ? '—' : (faqCount !== null ? formatNumber(faqCount) : '—')}
              </div>
              <div className="text-sm text-gray-600">pertanyaan terjawab</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              {faqError ? (
                <>
                  Data internal tidak tersedia. Hubungkan endpoint /api/faq/count untuk angka resmi.
                </>
              ) : (
                <>Data operasional platform</>
              )}
            </div>
            <div className="mt-3 text-xs">
              <a href="/solusi/#faq" className="text-amber-600 underline">Lihat daftar FAQ</a>
            </div>
          </div>

          {/* Internet Access stats */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {statsLoading ? '—' : (internetPercent !== null ? `${internetPercent.toFixed(1)}%` : '—')}
              </div>
              <div className="text-sm text-gray-600">akses internet</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Sumber: World Bank (IT.NET.USER.ZS). Tahun: {internetYear ?? '-'}
            </div>
            <div className="mt-3 text-xs">Perkiraan pengguna: {statsLoading ? '—' : estimatedInternetUsers()}</div>
            <div className="mt-3 text-xs">
              <a href="https://data.worldbank.org/indicator/IT.NET.USER.ZS" target="_blank" rel="noreferrer" className="text-amber-600 underline">Lihat sumber World Bank</a>
            </div>
          </div>

          {/* Population */}
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">
                {statsLoading ? '—' : (population !== null ? formatNumber(population) : '—')}
              </div>
              <div className="text-sm text-gray-600">populasi</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">Sumber: World Bank (SP.POP.TOTL). Tahun: {populationYear ?? '-'}</div>
            <div className="mt-3 text-xs">
              <a href="https://data.worldbank.org/indicator/SP.POP.TOTL" target="_blank" rel="noreferrer" className="text-amber-600 underline">Lihat sumber World Bank</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
