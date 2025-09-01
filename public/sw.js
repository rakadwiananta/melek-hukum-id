const CACHE_NAME = 'wacana-hukum-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/images/logo.svg',
  '/images/hero-bg.jpg',
  '/images/placeholder.jpg'
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/api\/articles/,
  /\/api\/categories/,
  /\/api\/search/
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      })
      .then(() => {
        console.log('Static resources cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static resources:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Force HTTPS for all requests
  if (url.protocol === 'http:' && url.hostname !== 'localhost') {
    const httpsUrl = request.url.replace('http:', 'https:');
    event.respondWith(fetch(httpsUrl));
    return;
  }
  
  // Handle different types of requests
  if (request.destination === 'document') {
    // HTML pages - network first, then cache
    event.respondWith(handleDocumentRequest(request));
  } else if (request.destination === 'image') {
    // Images - cache first, then network
    event.respondWith(handleImageRequest(request));
  } else if (request.destination === 'script' || request.destination === 'style') {
    // CSS/JS - cache first, then network
    event.respondWith(handleStaticRequest(request));
  } else if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    // API requests - network first with cache fallback
    event.respondWith(handleAPIRequest(request));
  } else {
    // Default - network first
    event.respondWith(handleDefaultRequest(request));
  }
});

// Handle document requests (HTML pages)
async function handleDocumentRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for document, trying cache:', error);
  }
  
  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fallback to offline page
  return caches.match('/offline.html');
}

// Handle image requests
async function handleImageRequest(request) {
  // Check cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for image:', error);
  }
  
  // Return placeholder image
  return caches.match('/images/placeholder.jpg');
}

// Handle static requests (CSS, JS)
async function handleStaticRequest(request) {
  // Check cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for static resource:', error);
  }
  
  return new Response('', { status: 404 });
}

// Handle API requests
async function handleAPIRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache with short TTL (30 minutes)
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      
      // Set cache expiration
      setTimeout(() => {
        cache.delete(request);
      }, 30 * 60 * 1000); // 30 minutes
      
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for API, trying cache:', error);
  }
  
  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  return new Response(JSON.stringify({ error: 'Service unavailable' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Handle default requests
async function handleDefaultRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log('Network failed for default request:', error);
    return new Response('', { status: 404 });
  }
}

// Message event - handle communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'FORCE_REFRESH') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        return self.clients.matchAll();
      }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'RELOAD_PAGE' });
        });
      })
    );
  }
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Perform background sync tasks
    console.log('Performing background sync...');
    
    // Example: sync offline data
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      await syncOfflineData(offlineData);
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function getOfflineData() {
  // Implementation for getting offline data
  return [];
}

async function syncOfflineData(data) {
  // Implementation for syncing offline data
  console.log('Syncing offline data:', data);
}

// Push notification
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon-32x32.png',
      badge: '/favicon-16x16.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Lihat',
          icon: '/favicon-16x16.png'
        },
        {
          action: 'close',
          title: 'Tutup',
          icon: '/favicon-16x16.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});