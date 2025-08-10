import React, { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

type WayangModelProps = {
  scale?: number
  pointerIntensity?: number
}

/**
 * WayangModel.tsx
 *
 * Model 3D procedural wayang khas Nusantara yang ringan, mobile-friendly, dan responsif terhadap pointer (parallax).
 * Tidak membutuhkan file eksternal. Eksport default WayangModel untuk digunakan di Canvas.
 */

function useIsLowDetail(): boolean {
  const [isLow, setIsLow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const small = window.innerWidth <= 720
    const saveData = (navigator as any).connection ? Boolean((navigator as any).connection.saveData) : false
    return small || saveData
  })

  useEffect(() => {
    function onResize() {
      setIsLow(window.innerWidth <= 720)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return isLow
}

export default function WayangModel(props: WayangModelProps): React.JSX.Element {
  const { scale = 1.0, pointerIntensity = 0.08 } = props || {}
  const groupRef = useRef<THREE.Group | null>(null)
  const targetRef = useRef({ rx: 0, ry: 0 })
  const clockRef = useRef(new THREE.Clock())
  const isLow = useIsLowDetail()
  const segments = isLow ? 16 : 48

  const lathePoints = useMemo(() => {
    return [
      new THREE.Vector2(0.0, -0.45),
      new THREE.Vector2(0.12, -0.36),
      new THREE.Vector2(0.24, -0.14),
      new THREE.Vector2(0.28, 0.04),
      new THREE.Vector2(0.22, 0.22),
      new THREE.Vector2(0.12, 0.36),
      new THREE.Vector2(0.02, 0.44)
    ]
  }, [])

  function handlePointerMove(ev: any) {
    if (typeof window === 'undefined') return
    let nx = 0
    let ny = 0
    if (ev.clientX !== undefined && ev.clientY !== undefined) {
      nx = (ev.clientX / window.innerWidth) * 2 - 1
      ny = (ev.clientY / window.innerHeight) * 2 - 1
    } else if (ev.unprojectedPoint) {
      nx = ev.unprojectedPoint.x
      ny = ev.unprojectedPoint.y
    }
    targetRef.current.ry = nx * pointerIntensity
    targetRef.current.rx = ny * pointerIntensity * -1
  }

  function handlePointerLeave() {
    targetRef.current.ry = 0
    targetRef.current.rx = 0
  }

  useFrame((state, delta) => {
    const t = clockRef.current.getElapsedTime()
    const bob = Math.sin(t * 1.2) * 0.03 * scale
    const sway = Math.sin(t * 0.25) * 0.03

    if (!groupRef.current) return

    const currentRx = groupRef.current.rotation.x
    const currentRy = groupRef.current.rotation.y
    const desiredRx = targetRef.current.rx + sway * 0.6
    const desiredRy = targetRef.current.ry + sway

    const lerpFactor = Math.min(0.2, 8 * delta)

    groupRef.current.rotation.x = THREE.MathUtils.lerp(currentRx, desiredRx, lerpFactor)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(currentRy, desiredRy, lerpFactor)

    const currentY = groupRef.current.position.y
    groupRef.current.position.y = THREE.MathUtils.lerp(currentY, bob, lerpFactor)
  })

  return (
    <group
      ref={groupRef}
      scale={[scale, scale, scale]}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      dispose={null}
      renderOrder={1}
      frustumCulled={false}
    >
      {/* Body - Lathe geometry */}
      <mesh castShadow receiveShadow position={[0, -0.08, 0]}>
        <latheGeometry args={[lathePoints, segments]} />
        <meshStandardMaterial color="#7c4a2e" metalness={0.05} roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.42, 0.045]}>
        <sphereGeometry args={[0.085, isLow ? 12 : 32, isLow ? 8 : 16]} />
        <meshStandardMaterial color="#f2d6b7" metalness={0.02} roughness={0.65} />
      </mesh>

      {/* Crown */}
      <mesh position={[0, 0.56, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.03, isLow ? 8 : 16, isLow ? 24 : 64]} />
        <meshStandardMaterial color="#E6B12C" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Crown spikes */}
      <group position={[0, 0.64, 0.045]}>
        {new Array(6).fill(null).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          const x = Math.cos(angle) * 0.12
          const z = Math.sin(angle) * 0.02
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]} scale={[0.5, 0.5, 0.5]}>
              <coneGeometry args={[0.03, 0.06, isLow ? 6 : 12]} />
              <meshStandardMaterial color="#E6B12C" metalness={0.85} roughness={0.2} />
            </mesh>
          )
        })}
      </group>

      {/* Ornament kiri kanan */}
      <mesh position={[-0.26, 0.12, 0.03]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[0.16, 0.02, 0.006]} />
        <meshStandardMaterial color="#8B2F61" metalness={0.08} roughness={0.6} />
      </mesh>

      <mesh position={[0.26, 0.12, 0.03]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[0.16, 0.02, 0.006]} />
        <meshStandardMaterial color="#8B2F61" metalness={0.08} roughness={0.6} />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.28, 0.02, 0.02]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.18, 0.02, 0.02]} />
        <meshStandardMaterial color="#7c4a2e" />
      </mesh>
      <mesh position={[0.28, 0.02, 0.02]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.18, 0.02, 0.02]} />
        <meshStandardMaterial color="#7c4a2e" />
      </mesh>

      {/* Base soft shadow */}
      <mesh position={[0, -0.56, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.65, isLow ? 16 : 32]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}
