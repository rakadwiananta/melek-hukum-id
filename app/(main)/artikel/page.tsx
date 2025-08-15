'use client'

import React, { useState, useEffect, useRef } from 'react'
import ArticleList from '@/app/components/article/display/ArticleList'
import InfiniteArticleList from '@/app/components/article/display/InfiniteArticleList'
import ArticleFilter, { FilterState } from '@/app/components/article/meta/CategoryFilter'
import PopularArticles from '@/app/components/article/display/PopularArticles'
import ArticleStats from '@/app/components/article/meta/ArticleStats'
import ArticleNewsletter from '@/app/components/article/meta/ArticleNewsletter'
import { Search, Filter, Scale, Gavel, FileText, Users } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls } from '@react-three/drei'

// ------------------------- Improved Wayang 3D Scene -------------------------
function WayangScene() {
  const groupRef = useRef<THREE.Group | null>(null)
  const leftArmRef = useRef<THREE.Mesh | null>(null)
  const rightArmRef = useRef<THREE.Mesh | null>(null)
  const clockRef = useRef(new THREE.Clock())

  // subtle hover / pointer parallax state
  const pointer = useRef({ x: 0, y: 0 })
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

  useFrame((state, delta) => {
    const t = clockRef.current.getElapsedTime()
    // gentle bobbing
    const bob = Math.sin(t * 1.0) * 0.03
    if (groupRef.current) {
      // base float
      groupRef.current.position.y = bob
      // slow rotation with pointer parallax
      const targetRotY = Math.sin(t * 0.25) * 0.06 + pointer.current.x * 0.06
      const targetRotX = pointer.current.y * 0.03
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08
    }

    // arms swing a bit
    if (leftArmRef.current && rightArmRef.current) {
      const armSwing = Math.sin(t * 1.8) * 0.25
      leftArmRef.current.rotation.z = -0.45 + armSwing * 0.25
      rightArmRef.current.rotation.z = 0.45 - armSwing * 0.25
    }
  })

  // Materials
  const woodMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#6b3f26'),
    roughness: 0.65,
    metalness: 0.05
  })

  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#eac9ad'),
    roughness: 0.6,
    metalness: 0.02
  })

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E6B12C'),
    roughness: 0.18,
    metalness: 0.95
  })

  const clothMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#7a2d45'),
    roughness: 0.6,
    metalness: 0.05
  })

  // Body silhouette: use LatheGeometry with a refined profile
  const bodyProfile = [
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
    <group ref={groupRef} dispose={null} scale={0.95}>
      <Center>
        {/* Body (lathe) */}
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <latheGeometry args={[bodyProfile, 64]} />
          <meshStandardMaterial attach="material" color={woodMaterial.color} roughness={woodMaterial.roughness} metalness={woodMaterial.metalness} />
        </mesh>

        {/* Decorative cloth / sarong band around lower body */}
        <mesh position={[0, 0.12, 0.12]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.34, 0.08, 16, 64]} />
          <meshStandardMaterial color={clothMaterial.color} roughness={clothMaterial.roughness} metalness={clothMaterial.metalness} />
        </mesh>

        {/* Head */}
        <group position={[0, 0.72, 0.06]}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.12, 32, 16]} />
            <meshStandardMaterial color={skinMaterial.color} roughness={skinMaterial.roughness} metalness={skinMaterial.metalness} />
          </mesh>

          {/* Eyes (simple dots) */}
          <mesh position={[-0.04, 0.02, 0.095]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshStandardMaterial color="#2b2b2b" />
          </mesh>
          <mesh position={[0.04, 0.02, 0.095]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshStandardMaterial color="#2b2b2b" />
          </mesh>

          {/* Tiny nose */}
          <mesh position={[0, -0.01, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.01, 0.02, 8]} />
            <meshStandardMaterial color={skinMaterial.color} />
          </mesh>

          {/* Crown: torus + small cones as spikes */}
          <mesh position={[0, 0.165, 0]}>
            <torusGeometry args={[0.18, 0.03, 16, 64]} />
            <meshStandardMaterial color={goldMaterial.color} roughness={goldMaterial.roughness} metalness={goldMaterial.metalness} />
          </mesh>

          {/* crown spikes */}
          <group position={[0, 0.22, 0]}>
            {[ -0.5, -0.15, 0.2, 0.5 ].map((xOffset, i) => (
              <mesh key={i} position={[xOffset * 0.18, 0, 0]} rotation={[0, 0, xOffset * 0.6]}>
                <coneGeometry args={[0.02, 0.06, 8]} />
                <meshStandardMaterial color={goldMaterial.color} roughness={goldMaterial.roughness} metalness={goldMaterial.metalness} />
              </mesh>
            ))}
          </group>
        </group>

        {/* Left Arm (thin rounded cylinder-like plank) */}
        <mesh ref={leftArmRef as any} position={[-0.45, 0.12, 0.02]} rotation={[0, 0, -0.45]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
          <meshStandardMaterial color={woodMaterial.color} roughness={woodMaterial.roughness} metalness={woodMaterial.metalness} />
        </mesh>

        {/* Right Arm */}
        <mesh ref={rightArmRef as any} position={[0.45, 0.12, 0.02]} rotation={[0, 0, 0.45]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.6, 12]} />
          <meshStandardMaterial color={woodMaterial.color} roughness={woodMaterial.roughness} metalness={woodMaterial.metalness} />
        </mesh>

        {/* Small ornament plate in front (like brooch) */}
        <mesh position={[0, 0.28, 0.14]}>
          <circleGeometry args={[0.06, 32]} />
          <meshStandardMaterial color="#c6862e" metalness={0.7} roughness={0.25} />
        </mesh>

        {/* Ground shadow (soft ellipse) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.94, 0]} receiveShadow>
          <planeGeometry args={[2.2, 1.0]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
      </Center>
    </group>
  )
}

// ------------------------- Batik Pattern Background -------------------------
function BatikPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-6">
      <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="batik-pattern-v2" width="160" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
            <rect width="160" height="160" fill="rgba(250,245,240,0.02)" />
            <path d="M20 80 C40 40, 120 40, 140 80 C120 120, 40 120, 20 80 Z" fill="rgba(124,74,46,0.03)"/>
            <path d="M80 20 C60 40, 60 120, 80 140 C100 120, 100 40, 80 20 Z" fill="rgba(124,74,46,0.02)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik-pattern-v2)" />
      </svg>
    </div>
  )
}

// ------------------------- Fake/Example Statistics (tetap sama) -------------------------
const indonesianLegalStats = {
  totalCases2024: 4789234,
  resolvedCases: 3892123,
  pendingCases: 897111,
  criminalCases: 1234567,
  civilCases: 2345678,
  administrativeCases: 456789,
  commercialCases: 752300,
  topCategories: [
    { name: 'Pidana', percentage: 35, color: '#DC2626' },
    { name: 'Perdata', percentage: 40, color: '#2563EB' },
    { name: 'Tata Usaha Negara', percentage: 15, color: '#16A34A' },
    { name: 'Niaga', percentage: 10, color: '#F59E0B' }
  ],
  monthlyTrend: [
    { month: 'Jan', cases: 398234 },
    { month: 'Feb', cases: 412345 },
    { month: 'Mar', cases: 425678 },
    { month: 'Apr', cases: 438901 },
    { month: 'Mei', cases: 445234 },
    { month: 'Jun', cases: 452567 }
  ]
}

// ------------------------- Statistics3D component (tetap serupa) -------------------------
function Statistics3D() {
  const [selectedStat, setSelectedStat] = useState(0)

  return (
    <div className="bg-gradient-to-br from-amber-50 to-brown-50 rounded-2xl p-6 mb-8 relative overflow-hidden">
      <BatikPattern />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-brown-800">
          Statistik Hukum Indonesia 2024
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Scale,
              label: 'Total Kasus',
              value: indonesianLegalStats.totalCases2024.toLocaleString('id-ID'),
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: Gavel,
              label: 'Kasus Selesai',
              value: indonesianLegalStats.resolvedCases.toLocaleString('id-ID'),
              color: 'from-green-500 to-green-600'
            },
            {
              icon: FileText,
              label: 'Kasus Pending',
              value: indonesianLegalStats.pendingCases.toLocaleString('id-ID'),
              color: 'from-yellow-500 to-yellow-600'
            },
            {
              icon: Users,
              label: 'Pengguna Aktif',
              value: '125,678',
              color: 'from-purple-500 to-purple-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStat(index)}
              className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl shadow-lg cursor-pointer transform-gpu transition-all duration-300`}
              style={{
                transformStyle: 'preserve-3d',
                transform: selectedStat === index ? 'rotateY(10deg)' : 'rotateY(0deg)'
              }}
            >
              <stat.icon className="w-8 h-8 text-white mb-3" />
              <p className="text-white/80 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-brown-800">
            Distribusi Kasus per Kategori
          </h3>
          <div className="space-y-3">
            {indonesianLegalStats.topCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: `${category.percentage}%` }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="relative"
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm font-semibold">{category.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: category.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ------------------------- Main Page Component -------------------------
export default function ArtikelPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    author: null,
    sortBy: 'newest',
    dateRange: 'all'
  })

  const [searchQuery, setSearchQuery] = useState('')
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 300], [0, -50])
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8])

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    console.log('Filters changed:', newFilters)
  }

  // Pixel ratio safe for mobile devices
  const pixelRatio = typeof window !== 'undefined' ? Math.min(2, window.devicePixelRatio || 1) : 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-brown-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced 3D Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-12 relative"
        >
          <div className="h-56 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-r from-brown-600 to-amber-600 relative">
            <Canvas shadows camera={{ position: [0, 0, 3.6], fov: 40 }} gl={{ antialias: true }} dpr={pixelRatio}>
              {/* Lighting */}
              <hemisphereLight args={[0xffffff, 0x444444, 0.6]} />
              <directionalLight
                castShadow
                intensity={0.9}
                position={[4, 6, 3]}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0005}
              />
              <pointLight position={[-4, 2, -3]} intensity={0.25} />
              {/* Wayang */}
              <WayangScene />
              {/* Soft controls - allow rotate by touch/drag, disable zoom for layout stability */}
              <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.9} />
            </Canvas>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-4xl font-bold mb-2"
              >
                Artikel Hukum Indonesia
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm md:text-base text-white/90 max-w-xl"
              >
                Temukan artikel hukum terbaru, referensi resmi, dan analisis perundang-undangan dengan gaya Nusantara.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative flex-1 max-w-md"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cari artikel hukum..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brown-600 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Filter className="h-5 w-5" />
                <span className="font-medium">Filter Lanjutan</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        <Statistics3D />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ArticleFilter
                categories={[
                  'Hukum Pidana',
                  'Hukum Perdata',
                  'Hukum Tata Negara',
                  'Hukum Administrasi',
                  'Hukum Dagang',
                  'Hukum Adat'
                ]}
                authors={[
                  'Prof. Dr. Jimly Asshiddiqie, S.H.',
                  'Prof. Dr. Satjipto Rahardjo, S.H.',
                  'Dr. Todung Mulya Lubis, S.H., LL.M.',
                  'Tim Melek Hukum'
                ]}
                onFilterChange={handleFilterChange}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ArticleList
                searchQuery={searchQuery}
                filters={filters}
                limit={13}
              />
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="sticky top-8 space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <ArticleStats />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <PopularArticles limit={5} />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-amber-100 to-brown-100 rounded-xl shadow-lg border border-amber-200 p-6"
              >
                <ArticleNewsletter />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
