import type * as THREE from 'three'
import type { ThreeToJSXElements } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeToJSXElements<typeof THREE> {}
  }
} 