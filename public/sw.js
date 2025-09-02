// Minimal no-op service worker to avoid interfering with network requests.
self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  // Pass through everything to the network/browser cache without custom handling
  // Avoid transforming responses to prevent "Failed to convert value to 'Response'" errors
})

