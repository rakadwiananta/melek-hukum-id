import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface WayangModelProps {
  scale?: number
  position?: [number, number, number]
}

export default function WayangModel({ scale = 1, position = [0, 0, 0] }: WayangModelProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Wayang Body */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.2, 1.5, 8]} />
        <meshStandardMaterial 
          color="#8B4513" 
          metalness={0.1} 
          roughness={0.8}
        />
      </mesh>
      
      {/* Wayang Head */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color="#DEB887" 
          metalness={0.1} 
          roughness={0.6}
        />
      </mesh>
      
      {/* Wayang Arms */}
      <mesh position={[-0.4, 0.3, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.08, 0.06, 0.8, 6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.08, 0.06, 0.8, 6]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Wayang Crown/Hat */}
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.3, 0.4, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Decorative Elements */}
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshStandardMaterial 
          color="#DC143C" 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}