'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Users } from 'lucide-react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'

/**
 * Komunitas Page
 * - 3D header Nusantara
 * - Statistik World Bank for internet access shown as context for community reach
 * - Tries to load /api/community/active for authoritative member counts (integrasikan backend)
 */

/* Reuse hook for World Bank */
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

/* Lightweight Nusantara 3D object (stylized mask / wayang) */
function NusantaraFigure({ scale = 1.0 }: { scale?: number }) {
  const ref = useRef<THREE.Group | null>(null)
  const clock = useRef(new THREE.Clock())

  useFrame(() => {
    const t = clock.current.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.25) * 0.06
      ref.current.position.y = Math.sin(t * 1.1) * 0.02
    }
  })

  return (
    <group ref={ref} scale={scale}>
      <Center>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.8, 0.9, 0.06]} />
          <meshStandardMaterial color="#6b3f26" roughness={0.7} />
        </mesh>

        <mesh position={[0, 0.48, 0.04]}>
          <sphereGeometry args={[0.14, 24, 12]} />
          <meshStandardMaterial color="#f1d7be" roughness={0.6} />
        </mesh>

        <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.8, 32]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.12} />
        </mesh>
      </Center>
    </group>
  )
}

/* Batik overlay */
function BatikOverlay() {
  return (
    <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-6" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="batik2" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
          <rect width="160" height="160" fill="rgba(250,245,240,0.02)" />
          <path d="M20 80 C40 40, 120 40, 140 80 C120 120, 40 120, 20 80 Z" fill="rgba(124,74,46,0.03)"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#batik2)" />
    </svg>
  )
}

export default function KomunitasPage() {
  const [members, setMembers] = useState<number | null>(null)
  const [membersLoading, setMembersLoading] = useState<boolean>(true)
  const [membersError, setMembersError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function loadMembers() {
      setMembersLoading(true)
      try {
        const res = await fetch('/api/community/active')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!mounted) return
        setMembers(typeof json.active === 'number' ? json.active : null)
      } catch (err) {
        console.info('Community API not available:', err)
        if (mounted) {
          setMembersError('Data internal tidak tersedia')
          setMembers(null)
        }
      } finally {
        if (mounted) setMembersLoading(false)
      }
    }
    loadMembers()
    return () => { mounted = false }
  }, [])

  const { internetPercent, internetYear, population, populationYear, loading: statsLoading, error: statsError } = useWorldBankIndonesiaStats()
  const pixelRatio = typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio || 1) : 1
  const canvasHeight = typeof window !== 'undefined' ? Math.max(140, Math.min(300, Math.floor(window.innerHeight * 0.24))) : 200

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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Komunitas</h1>
              <p className="text-sm md:text-base text-gray-600">Diskusi & berbagi dengan praktisi hukum</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-green-700 to-emerald-500">
            <div className="absolute inset-0">
              <Canvas
                camera={{ position: [0, 0, 3.2], fov: 44 }}
                gl={{ antialias: true, alpha: true }}
                dpr={pixelRatio}
                style={{ width: '100%', height: canvasHeight }}
              >
                <hemisphereLight intensity={0.6} />
                <directionalLight intensity={0.8} position={[4, 6, 3]} />
                <NusantaraFigure scale={0.95} />
                <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.9} />
              </Canvas>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h2 className="text-lg md:text-2xl font-extrabold">Bergabung dengan Komunitas</h2>
              <p className="text-sm md:text-base text-white/90 mt-1 max-w-2xl">Temukan diskusi, tanyakan kasus, dan perluas jaringan profesional.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{membersLoading ? '—' : (members !== null ? formatNumber(members) : '—')}</div>
              <div className="text-sm text-gray-600">anggota aktif</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              {membersError ? 'Data internal tidak tersedia. Integrasikan /api/community/active untuk angka resmi.' : 'Angka operasi platform'}
            </div>
            <div className="mt-3">
              <a href="/komunitas" className="text-amber-600 underline">Gabung sekarang</a>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-extrabold text-gray-900 tracking-tight">{statsLoading ? '—' : (internetPercent !== null ? `${internetPercent.toFixed(1)}%` : '—')}</div>
              <div className="text-sm text-gray-600">akses internet</div>
            </div>
            <div className="mt-3 text-xs text-gray-500">Sumber: World Bank — IT.NET.USER.ZS ({internetYear ?? '-'})</div>
            <div className="mt-3 text-xs">
              <a href="https://data.worldbank.org/indicator/IT.NET.USER.ZS" target="_blank" rel="noreferrer" className="text-amber-600 underline">Lihat data World Bank</a>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-2">Estimasi jangkauan potensial</div>
            <div className="text-2xl font-extrabold text-gray-900">
              {statsLoading || population === null || internetPercent === null ? '—' : Math.round((internetPercent / 100) * population).toLocaleString('id-ID')}
            </div>
            <div className="mt-3 text-xs text-gray-500">Perkiraan jumlah pengguna internet di Indonesia (World Bank)</div>
          </div>
        </div>
      </div>
    </section>
  )
}
