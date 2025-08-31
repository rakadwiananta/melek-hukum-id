// Global polyfills for browser-only APIs in SSR
// Fix for 'self is not defined' error in Supabase/WebSocket

// Ensure self is defined in all environments
if (typeof self === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    (globalThis as any).self = globalThis;
  } else if (typeof global !== 'undefined') {
    (global as any).self = global;
  } else if (typeof window !== 'undefined') {
    (window as any).self = window;
  }
}

// Ensure self is available in all contexts
if (typeof globalThis !== 'undefined') {
  (globalThis as any).self = globalThis;
}

if (typeof global !== 'undefined') {
  (global as any).self = global;
}

if (typeof window !== 'undefined') {
  (window as any).self = window;
}

// Additional browser API polyfills
if (typeof globalThis !== 'undefined') {
  if (typeof (globalThis as any).window === 'undefined') {
    (globalThis as any).window = globalThis;
  }
  if (typeof (globalThis as any).document === 'undefined') {
    (globalThis as any).document = {
      createElement: () => ({}),
      getElementsByTagName: () => [],
      head: { appendChild: () => {} },
      body: { appendChild: () => {} }
    };
  }
  if (typeof (globalThis as any).navigator === 'undefined') {
    (globalThis as any).navigator = {
      userAgent: 'Node.js'
    };
  }
  if (typeof (globalThis as any).location === 'undefined') {
    (globalThis as any).location = {
      href: 'https://wacanahukum.com',
      origin: 'https://wacanahukum.com',
      protocol: 'https:',
      host: 'wacanahukum.com',
      hostname: 'wacanahukum.com',
      pathname: '/',
      search: '',
      hash: ''
    };
  }
}

export {};
