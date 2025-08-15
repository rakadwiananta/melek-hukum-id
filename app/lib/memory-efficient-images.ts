'use client'

import { useEffect, useRef } from 'react'

interface ImageNode {
  id: string
  src: string
  element?: HTMLImageElement
  isLoaded: boolean
  isVisible: boolean
  lastSeen: number
  priority: number
  retryCount: number
}

interface MemoryConfig {
  maxCachedImages: number
  maxRetries: number
  unloadAfterMs: number
  priorityThreshold: number
  batchSize: number
}

class MemoryEfficientImageManager {
  private imageNodes = new Map<string, ImageNode>()
  private intersectionObserver: IntersectionObserver | null = null
  private cleanupInterval: NodeJS.Timeout | null = null
  private loadingQueue: string[] = []
  private isProcessingQueue = false

  private config: MemoryConfig = {
    maxCachedImages: 100,
    maxRetries: 3,
    unloadAfterMs: 5 * 60 * 1000, // 5 minutes
    priorityThreshold: 0.1,
    batchSize: 5
  }

  constructor(config?: Partial<MemoryConfig>) {
    if (config) {
      this.config = { ...this.config, ...config }
    }

    this.setupIntersectionObserver()
    this.startCleanupInterval()
  }

  private setupIntersectionObserver() {
    if (typeof window === 'undefined') return

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const imageId = entry.target.getAttribute('data-image-id')
          if (!imageId) return

          const node = this.imageNodes.get(imageId)
          if (!node) return

          const wasVisible = node.isVisible
          node.isVisible = entry.isIntersecting
          node.lastSeen = Date.now()

          // Priority boost for visible images
          if (entry.isIntersecting) {
            node.priority = Math.max(node.priority, 0.8)
            if (!wasVisible) {
              this.queueImageLoad(imageId)
            }
          } else {
            // Reduce priority for non-visible images
            node.priority = Math.max(node.priority * 0.9, 0.1)
          }
        })
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '50px'
      }
    )
  }

  private startCleanupInterval() {
    this.cleanupInterval = setInterval(() => {
      this.cleanupMemory()
    }, 30000) // Cleanup every 30 seconds
  }

  cleanupMemory() {
    const now = Date.now()
    const imagesToUnload: string[] = []

    // Find images to unload
    this.imageNodes.forEach((node, id) => {
      const timeSinceLastSeen = now - node.lastSeen
      const shouldUnload = 
        !node.isVisible &&
        timeSinceLastSeen > this.config.unloadAfterMs &&
        node.priority < this.config.priorityThreshold

      if (shouldUnload) {
        imagesToUnload.push(id)
      }
    })

    // Sort by priority (unload lowest priority first)
    imagesToUnload.sort((a, b) => {
      const nodeA = this.imageNodes.get(a)!
      const nodeB = this.imageNodes.get(b)!
      return nodeA.priority - nodeB.priority
    })

    // Unload excess images
    const excessCount = this.imageNodes.size - this.config.maxCachedImages
    const toUnload = Math.max(excessCount, 0) + imagesToUnload.length

    for (let i = 0; i < Math.min(toUnload, imagesToUnload.length); i++) {
      this.unloadImage(imagesToUnload[i])
    }

    if (this.imageNodes.size > this.config.maxCachedImages) {
      console.log(`Memory cleanup: ${toUnload} images unloaded. Cache size: ${this.imageNodes.size}`)
    }
  }

  private unloadImage(imageId: string) {
    const node = this.imageNodes.get(imageId)
    if (!node) return

    // Remove from DOM if needed
    if (node.element) {
      node.element.src = ''
      node.element.onload = null
      node.element.onerror = null
      node.element = undefined
    }

    node.isLoaded = false
    node.priority = Math.max(node.priority * 0.5, 0.1)
  }

  private queueImageLoad(imageId: string) {
    if (this.loadingQueue.includes(imageId)) return
    
    this.loadingQueue.push(imageId)
    this.processLoadingQueue()
  }

  private async processLoadingQueue() {
    if (this.isProcessingQueue) return
    this.isProcessingQueue = true

    while (this.loadingQueue.length > 0) {
      const batch = this.loadingQueue.splice(0, this.config.batchSize)
      const loadPromises = batch.map(imageId => this.loadImageNode(imageId))
      
      await Promise.allSettled(loadPromises)
      
      // Small delay between batches to prevent overwhelming
      if (this.loadingQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    this.isProcessingQueue = false
  }

  private async loadImageNode(imageId: string): Promise<void> {
    const node = this.imageNodes.get(imageId)
    if (!node || node.isLoaded) return

    return new Promise((resolve) => {
      const img = new Image()
      
      img.onload = () => {
        node.isLoaded = true
        node.element = img
        node.retryCount = 0
        node.priority = Math.min(node.priority + 0.2, 1)
        resolve()
      }

      img.onerror = () => {
        node.retryCount++
        node.priority = Math.max(node.priority - 0.1, 0.1)
        
        if (node.retryCount < this.config.maxRetries) {
          // Retry with exponential backoff
          setTimeout(() => {
            this.queueImageLoad(imageId)
          }, Math.pow(2, node.retryCount) * 1000)
        }
        resolve()
      }

      img.src = node.src
    })
  }

  registerImage(imageId: string, src: string, element?: HTMLElement): void {
    if (!src || this.imageNodes.has(imageId)) return

    const node: ImageNode = {
      id: imageId,
      src,
      isLoaded: false,
      isVisible: false,
      lastSeen: Date.now(),
      priority: 0.5,
      retryCount: 0
    }

    this.imageNodes.set(imageId, node)

    // Observe element for visibility
    if (element && this.intersectionObserver) {
      element.setAttribute('data-image-id', imageId)
      this.intersectionObserver.observe(element)
    }

    // Queue for loading if high priority
    if (node.priority > this.config.priorityThreshold) {
      this.queueImageLoad(imageId)
    }
  }

  unregisterImage(imageId: string, element?: HTMLElement): void {
    const node = this.imageNodes.get(imageId)
    if (!node) return

    // Stop observing
    if (element && this.intersectionObserver) {
      this.intersectionObserver.unobserve(element)
    }

    this.unloadImage(imageId)
    this.imageNodes.delete(imageId)
  }

  getImageStatus(imageId: string): { isLoaded: boolean; isVisible: boolean; priority: number } | null {
    const node = this.imageNodes.get(imageId)
    if (!node) return null

    return {
      isLoaded: node.isLoaded,
      isVisible: node.isVisible,
      priority: node.priority
    }
  }

  setPriority(imageId: string, priority: number): void {
    const node = this.imageNodes.get(imageId)
    if (!node) return

    node.priority = Math.max(0, Math.min(1, priority))
    
    if (priority > this.config.priorityThreshold && !node.isLoaded) {
      this.queueImageLoad(imageId)
    }
  }

  async preloadImages(imageIds: string[]): Promise<void> {
    const loadPromises = imageIds.map(async (imageId) => {
      const node = this.imageNodes.get(imageId)
      if (node && !node.isLoaded) {
        node.priority = Math.max(node.priority, 0.8)
        return this.loadImageNode(imageId)
      }
    })

    await Promise.allSettled(loadPromises)
  }

  getStats(): {
    total: number
    loaded: number
    visible: number
    queueSize: number
    memoryUsage: string
  } {
    let loaded = 0
    let visible = 0

    this.imageNodes.forEach((node) => {
      if (node.isLoaded) loaded++
      if (node.isVisible) visible++
    })

    const memoryUsageBytes = this.imageNodes.size * 1000 // Rough estimate
    const memoryUsage = memoryUsageBytes > 1024 * 1024 
      ? `${(memoryUsageBytes / (1024 * 1024)).toFixed(1)}MB`
      : `${(memoryUsageBytes / 1024).toFixed(1)}KB`

    return {
      total: this.imageNodes.size,
      loaded,
      visible,
      queueSize: this.loadingQueue.length,
      memoryUsage
    }
  }

  destroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver = null
    }

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }

    // Cleanup all images
    const imageIds = Array.from(this.imageNodes.keys())
    imageIds.forEach(imageId => {
      this.unloadImage(imageId)
    })

    this.imageNodes.clear()
    this.loadingQueue = []
  }
}

// Singleton instance
export const memoryEfficientImageManager = new MemoryEfficientImageManager()

// React hook for using the image manager
export function useMemoryEfficientImage(imageId: string, src: string) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !src) return

    memoryEfficientImageManager.registerImage(imageId, src, element)

    return () => {
      memoryEfficientImageManager.unregisterImage(imageId, element)
    }
  }, [imageId, src])

  const status = memoryEfficientImageManager.getImageStatus(imageId)

  return {
    elementRef,
    isLoaded: status?.isLoaded || false,
    isVisible: status?.isVisible || false,
    priority: status?.priority || 0,
    setPriority: (priority: number) => memoryEfficientImageManager.setPriority(imageId, priority)
  }
}

// React hook for batch operations
export function useImageBatchManager() {
  return {
    preloadImages: (imageIds: string[]) => memoryEfficientImageManager.preloadImages(imageIds),
    getStats: () => memoryEfficientImageManager.getStats(),
    cleanup: () => memoryEfficientImageManager.cleanupMemory()
  }
}