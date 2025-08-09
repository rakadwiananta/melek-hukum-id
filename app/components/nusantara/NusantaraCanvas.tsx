'use client'

import { useEffect, useRef } from 'react'

interface NusantaraCanvasProps {
  height?: number
  reducedMotion?: boolean
  className?: string
}

export default function NusantaraCanvas({ 
  height = 200, 
  reducedMotion = false,
  className = ''
}: NusantaraCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = height

    // Draw decorative pattern
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.05)')
      gradient.addColorStop(1, 'rgba(220, 38, 38, 0.02)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Decorative elements
      if (!reducedMotion) {
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 50 + 20,
            0,
            Math.PI * 2
          )
          ctx.strokeStyle = 'rgba(220, 38, 38, 0.1)'
          ctx.lineWidth = 2
          ctx.stroke()
        }
      }
    }

    drawPattern()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      drawPattern()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [height, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full rounded-xl ${className}`}
      style={{ height: `${height}px` }}
    />
  )
}
