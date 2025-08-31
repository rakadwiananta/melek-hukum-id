'use client'

import { useEffect, useState } from 'react'

interface SSRWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function SSRWrapper({ children, fallback = null }: SSRWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}