'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Gavel } from 'lucide-react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'

/**
 * Kasus & Putusan Page
 * - 3D header with Nusantara motif
 * - Shows World Bank stats as contextual data
 * - Tries to fetch official court decision counts from internal endpoint /api/court/decisions_count
 * - Provides clear references to Mahkamah Agung for authoritative court data
 */

/* World Bank hook (same as previous pages) */
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
      return res.json()
    }

    async function load() {
      setLoading(true)
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
        console.error(err)
        setError('Gagal memuat statistik eksternal')
        setInternetPercent(null)
        setPopulation(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  return { internetPercent, internetYear, population, populationYear, loading, error }
}

/* Simple 3D emblem representing scales/gavel silhouette with Nusantara feel */
function GavelEmblem({ scale = 1.0 }: { scale?: number }) {
  const ref = useRef<THREE.Group | null>(null)
  const clock = useRef(new THREE.Clock())

  useFrame(() => {
    const t = clock.current.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.2) * 0.05
      ref.current.position.y = Math.sin(t * 0.9) * 0.02
    }
  })

  return (
    <group ref={ref} scale={scale}>
      <Center>
        {/* base plate */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.04, 32]} />
          <meshStandardMaterial color="#3b3b3b" roughness={0.6} />
        </mesh>

        {/* gavel handle */}
        <mesh position={[0.18, -0.05, 0.05]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.6, 0.07, 0.07]} />
          <meshStandardMaterial color="#7c4a2e" roughness={0.6} />
        </mesh>

        {/* gavel head */}
        <mesh position={[0.45, -0.05, 0.05]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.18, 0.12, 0.12]} />
          <meshStandardMaterial color="#8b5e3c" roughness={0.5} />
        </mesh>

        {/* decorative motif circle behind */}
        <mesh position={[0, 0.35, -0.03]}>
          <torusGeometry args={[0.6, 0.03, 16, 64]} />
          <meshStandardMaterial color="#E6B12C" metalness={0.9} roughness={0.18} />
        </mesh>
      </Center>
    </group>
  )
}

/* Batik background */
function BatikOverlay() {
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-6" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="batik3" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <rect width="160" height="160" fill="rgba(250,245,240,0.02)" />
          <path d="M20 80 C40 40, 120 40, 140 80 C120 120, 40 120, 20 80 Z" fill="rgba(124,74,46,0.03)"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik3)" />
    </svg>
  )
}

export default function RegulasiKasusPage() {
  const [decisions, setDecisions] = useState<number | null>(null)
  const [decisionsLoading, setDecisionsLoading] = useState<boolean>(true)
  const [decisionsError, setDecisionsError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadDecisions() {
      setDecisionsLoading(true)
      try {
        const res = await fetch('/api/court/decisions_count')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!mounted) return
        setDecisions(typeof json.count === 'number' ? json.count : null)
      } catch (err) {
        console.info('Court decisions endpoint not available:', err)
        if (mounted) {
          setDecisionsError('Data resmi Mahkamah Agung tidak terhubung')
          setDecisions(null)
        }
      } finally {
        if (mounted) setDecisionsLoading(false)
      }
    }
    loadDecisions()
    return () => { mounted = false }
  }, [])

  const { internetPercent, internetYear, population, populationYear, loading: statsLoading, error: statsError } = useWorldBankIndonesiaStats()
  const pixelRatio = typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio || 1) : 1
  const canvasHeight = typeof window !== 'undefined' ? Math.max(160, Math.min(320, Math.floor(window.innerHeight * 0.26))) : 220

  function formatNumber(v: number | null | undefined) {
    if (v === null || v === undefined) return '-'
    return v.toLocaleString('id-ID')
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50 relative overflow-hidden">
      <BatikOverlay />

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center shadow">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Kasus & Putusan</h1>
              <p className="text-sm md:text-base text-gray-600">Analisis & direktori putusan resmi</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-rose-700 to-pink-600">
            <div className="absolute inset-0">
              <Canvas
                camera={{ position: [0, 0, 3.4], fov: 44 }}
                gl={{ antialias: true, alpha: true }}
                dpr={pixelRatio}
                style={{ width: '100%', height: canvasHeight }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight intensity={0.9} position={[5, 6, 4]} />
                <GavelEmblem scale={0.95} />
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.9} />
              </Canvas>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h2 className="text-lg md:text-2xl font-extrabold">Putusan Resmi & Analisis</h2>
              <p className="text-sm md:text-base text-white/90 mt-1 max-w-2xl">Direktori putusan Mahkamah Agung & kajian yuridis Nusantara.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{decisionsLoading ? '—' : (decisions !== null ? formatNumber(decisions) : '—')}</div>
              <div className="text-sm text-gray-600">putusan MA</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              {decisionsError ? (
                <>
                  Hubungkan endpoint backend ke sumber resmi Mahkamah Agung (https://www.mahkamahagung.go.id) untuk angka otentik.
                </>
              ) : (
                <>Direktori putusan resmi (internal)</>
              )}
            </div>
            <div className="mt-3">
              <a href="https://www.mahkamahagung.go.id" target="_blank" rel="noreferrer" className="text-amber-600 underline">Situs Mahkamah Agung</a>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{statsLoading ? '—' : (internetPercent !== null ? `${internetPercent.toFixed(1)}%` : '—')}</div>
              <div className="text-sm text-gray-600">akses internet</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">Sumber: World Bank — IT.NET.USER.ZS ({internetYear ?? '-'})</div>
            <div className="mt-3 text-xs">
              <a href="https://data.worldbank.org/indicator/IT.NET.USER.ZS" target="_blank" rel="noreferrer" className="text-amber-600 underline">Lihat World Bank</a>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1">Populasi (World Bank)</div>
            <div className="text-3xl font-extrabold text-gray-900">{statsLoading ? '—' : (population !== null ? formatNumber(population) : '—')}</div>
            <div className="mt-3 text-xs text-gray-500">Tahun: {populationYear ?? '-'}</div>
            <div className="mt-3">
              <a href="https://data.worldbank.org/indicator/SP.POP.TOTL" target="_blank" rel="noreferrer" className="text-amber-600 underline">Sumber World Bank</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
