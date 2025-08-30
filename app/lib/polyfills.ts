// Polyfills for server-side rendering
if (typeof global !== 'undefined') {
  // Polyfill for 'self' global
  if (typeof global.self === 'undefined') {
    (global as any).self = global
  }
  
  // Polyfill for 'window' global
  if (typeof global.window === 'undefined') {
    (global as any).window = global
  }
  
  // Polyfill for 'document' global
  if (typeof global.document === 'undefined') {
    (global as any).document = {
      createElement: () => ({}),
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      head: { appendChild: () => {}, insertBefore: () => {} },
      body: { appendChild: () => {}, removeChild: () => {} },
      readyState: 'complete',
    }
  }
  
  // Polyfill for 'navigator' global
  if (typeof global.navigator === 'undefined') {
    (global as any).navigator = {
      userAgent: 'Node.js',
      share: undefined,
      clipboard: undefined,
      serviceWorker: undefined,
    }
  }
  
  // Polyfill for 'location' global
  if (typeof global.location === 'undefined') {
    (global as any).location = {
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
    }
  }
  
  // Polyfill for 'requestIdleCallback' if not available
  if (typeof global.requestIdleCallback === 'undefined') {
    (global as any).requestIdleCallback = (callback: Function) => {
      return setTimeout(() => callback({ didTimeout: false }), 1)
    }
  }
  
  // Polyfill for 'cancelIdleCallback' if not available
  if (typeof global.cancelIdleCallback === 'undefined') {
    (global as any).cancelIdleCallback = (id: number) => {
      clearTimeout(id)
    }
  }
}

export {}