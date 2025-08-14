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
 * Model 3D procedural wayang kulit khas Nusantara yang realistis dan detail.
 * Menggunakan geometri kompleks untuk menciptakan tampilan wayang yang autentik.
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
  const segments = isLow ? 24 : 64

  // Body shape yang lebih detail untuk wayang
  const bodyPoints = useMemo(() => {
    return [
      new THREE.Vector2(0.0, -0.5),
      new THREE.Vector2(0.08, -0.48),
      new THREE.Vector2(0.14, -0.42),
      new THREE.Vector2(0.18, -0.35),
      new THREE.Vector2(0.22, -0.25),
      new THREE.Vector2(0.24, -0.15),
      new THREE.Vector2(0.26, -0.05),
      new THREE.Vector2(0.25, 0.05),
      new THREE.Vector2(0.23, 0.15),
      new THREE.Vector2(0.20, 0.25),
      new THREE.Vector2(0.16, 0.32),
      new THREE.Vector2(0.10, 0.38),
      new THREE.Vector2(0.04, 0.42),
      new THREE.Vector2(0.0, 0.44)
    ]
  }, [])

  // Arm shape untuk lengan wayang
  const armShape = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.bezierCurveTo(0.15, 0.02, 0.25, 0.05, 0.35, 0.08)
    shape.bezierCurveTo(0.38, 0.09, 0.40, 0.08, 0.42, 0.06)
    shape.lineTo(0.42, -0.06)
    shape.bezierCurveTo(0.40, -0.08, 0.38, -0.09, 0.35, -0.08)
    shape.bezierCurveTo(0.25, -0.05, 0.15, -0.02, 0, 0)
    return shape
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
    const bob = Math.sin(t * 1.2) * 0.025 * scale
    const sway = Math.sin(t * 0.25) * 0.02
    const breathe = Math.sin(t * 2) * 0.005 + 1

    if (!groupRef.current) return

    const currentRx = groupRef.current.rotation.x
    const currentRy = groupRef.current.rotation.y
    const desiredRx = targetRef.current.rx + sway * 0.5
    const desiredRy = targetRef.current.ry + sway

    const lerpFactor = Math.min(0.15, 6 * delta)

    groupRef.current.rotation.x = THREE.MathUtils.lerp(currentRx, desiredRx, lerpFactor)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(currentRy, desiredRy, lerpFactor)

    const currentY = groupRef.current.position.y
    groupRef.current.position.y = THREE.MathUtils.lerp(currentY, bob, lerpFactor)
    
    // Subtle breathing animation
    groupRef.current.scale.x = scale * breathe
    groupRef.current.scale.z = scale * breathe
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
      {/* Main Body - More detailed lathe geometry */}
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <latheGeometry args={[bodyPoints, segments]} />
        <meshStandardMaterial 
          color="#8B4513" 
          metalness={0.1} 
          roughness={0.8}
          emissive="#4A2511"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Body Ornaments - Batik patterns */}
      <mesh position={[0, -0.1, 0.01]}>
        <latheGeometry args={[bodyPoints.map(p => new THREE.Vector2(p.x * 0.98, p.y)), segments]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.6} 
          roughness={0.3}
          emissive="#FFD700"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Head - More realistic shape */}
      <group position={[0, 0.44, 0.05]}>
        {/* Face */}
        <mesh>
          <sphereGeometry args={[0.09, isLow ? 16 : 32, isLow ? 12 : 24]} />
          <meshStandardMaterial 
            color="#F4E4C1" 
            metalness={0.05} 
            roughness={0.7}
          />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[-0.03, 0.01, 0.08]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.03, 0.01, 0.08]}>
          <sphereGeometry args={[0.008, 8, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, -0.01, 0.09]}>
          <coneGeometry args={[0.01, 0.02, 4]} />
          <meshStandardMaterial color="#E8D4B0" />
        </mesh>
      </group>

      {/* Crown/Jamang - More detailed */}
      <group position={[0, 0.58, 0.05]}>
        {/* Base crown */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.14, 0.035, isLow ? 12 : 24, isLow ? 32 : 64]} />
          <meshStandardMaterial 
            color="#FFD700" 
            metalness={0.95} 
            roughness={0.1}
            emissive="#FFA500"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Crown ornaments - Ceplok pattern */}
        {new Array(8).fill(null).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 0.14
          const z = Math.sin(angle) * 0.03
          return (
            <group key={i}>
              <mesh position={[x, 0.06, z]} rotation={[0, angle, 0]}>
                <coneGeometry args={[0.025, 0.08, isLow ? 8 : 16]} />
                <meshStandardMaterial 
                  color="#FFD700" 
                  metalness={0.9} 
                  roughness={0.15}
                  emissive="#FFA500"
                  emissiveIntensity={0.15}
                />
              </mesh>
              {/* Jewel on top */}
              <mesh position={[x, 0.1, z]}>
                <octahedronGeometry args={[0.015, 0]} />
                <meshStandardMaterial 
                  color="#FF1493" 
                  metalness={0.95} 
                  roughness={0.05}
                  emissive="#FF69B4"
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          )
        })}
        
        {/* Center jewel */}
        <mesh position={[0, 0.12, 0]}>
          <octahedronGeometry args={[0.025, 0]} />
          <meshStandardMaterial 
            color="#00CED1" 
            metalness={0.98} 
            roughness={0.02}
            emissive="#00FFFF"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Sumping (Ear ornaments) */}
      <mesh position={[-0.12, 0.42, 0.05]}>
        <torusGeometry args={[0.02, 0.008, 8, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.12, 0.42, 0.05]}>
        <torusGeometry args={[0.02, 0.008, 8, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Arms - Using ExtrudeGeometry for more realistic shape */}
      <mesh position={[-0.15, 0.05, 0.02]} rotation={[0, 0, 0.3]}>
        <extrudeGeometry args={[armShape, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 3 }]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0.15, 0.05, 0.02]} rotation={[0, Math.PI, -0.3]}>
        <extrudeGeometry args={[armShape, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 3 }]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Hands with fingers */}
      <group position={[-0.42, 0.08, 0.02]}>
        {[0, 0.015, 0.03, 0.045].map((offset, i) => (
          <mesh key={i} position={[-0.02, -offset * 0.5, offset * 0.3]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.04, 0.008, 0.006]} />
            <meshStandardMaterial color="#F4E4C1" />
          </mesh>
        ))}
      </group>
      <group position={[0.42, 0.08, 0.02]}>
        {[0, 0.015, 0.03, 0.045].map((offset, i) => (
          <mesh key={i} position={[0.02, -offset * 0.5, offset * 0.3]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.04, 0.008, 0.006]} />
            <meshStandardMaterial color="#F4E4C1" />
          </mesh>
        ))}
      </group>

      {/* Keris (Traditional weapon) */}
      <mesh position={[0.35, -0.15, 0.08]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.01, 0.25, 0.02]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#E5E5E5"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Keris handle */}
      <mesh position={[0.35, -0.28, 0.08]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.02, 0.04, 0.025]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Kain/Sarong detail */}
      <mesh position={[0, -0.35, 0.02]}>
        <cylinderGeometry args={[0.2, 0.24, 0.25, segments, 1, true]} />
        <meshStandardMaterial 
          color="#8B0000" 
          metalness={0.2} 
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Batik pattern on sarong */}
      <mesh position={[0, -0.35, 0.025]}>
        <cylinderGeometry args={[0.21, 0.25, 0.25, segments, 1, true]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.4} 
          roughness={0.4}
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Shadow plane with gradient */}
      <mesh position={[0, -0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.8, isLow ? 24 : 48]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.15} />
      </mesh>
    </group>
  )
}
