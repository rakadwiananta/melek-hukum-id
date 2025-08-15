// Service Worker untuk Image Caching
const CACHE_NAME = 'melek-hukum-images-v1'
const IMAGE_CACHE_NAME = 'melek-hukum-images-cache-v1'

// URLs yang akan di-cache
const STATIC_CACHE_URLS = [
  '/timbangkan.jpg',
  '/illustrations/blog-kejaksaan.jpeg',
  '/illustrations/makna-pembukaan-uud-1945-lengka-20210907100613.jpg'
]

// Install event - cache static images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_CACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - handle image requests
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // Only handle image requests
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    
    event.respondWith(handleImageRequest(request))
  }
})

async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE_NAME)
  const cachedResponse = await cache.match(request)

  // Return cached version if available
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    // Fetch from network
    const networkResponse = await fetch(request)
    
    // Only cache successful responses
    if (networkResponse.ok) {
      // Clone response before caching
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Image fetch failed:', error)
    
    // Return fallback image for failed requests
    const fallbackCache = await caches.open(CACHE_NAME)
    const fallbackResponse = await fallbackCache.match('/timbangkan.jpg')
    
    return fallbackResponse || new Response('', { status: 404 })
  }
}

// Background sync for preloading images
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRELOAD_IMAGES') {
    const imageUrls = event.data.urls
    preloadImages(imageUrls)
  }
})

async function preloadImages(urls) {
  const cache = await caches.open(IMAGE_CACHE_NAME)
  
  const preloadPromises = urls.map(async (url) => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        await cache.put(url, response)
      }
    } catch (error) {
      console.log('Preload failed for:', url, error)
    }
  })
  
  await Promise.allSettled(preloadPromises)
}