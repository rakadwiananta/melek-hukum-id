// Global polyfills for browser-only APIs in SSR
// Fix for 'self is not defined' error
if (typeof globalThis !== 'undefined') {
  if (typeof (globalThis as any).self === 'undefined') {
    (globalThis as any).self = globalThis;
  }
  // Also set self directly on globalThis
  (globalThis as any).self = globalThis;
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

// Node.js environment
if (typeof global !== 'undefined') {
  if (typeof (global as any).self === 'undefined') {
    (global as any).self = global;
  }
  // Also set self directly on global
  (global as any).self = global;
  if (typeof (global as any).window === 'undefined') {
    (global as any).window = global;
  }
  if (typeof (global as any).document === 'undefined') {
    (global as any).document = {
      createElement: () => ({}),
      getElementsByTagName: () => [],
      head: { appendChild: () => {} },
      body: { appendChild: () => {} }
    };
  }
  if (typeof (global as any).navigator === 'undefined') {
    (global as any).navigator = {
      userAgent: 'Node.js'
    };
  }
  if (typeof (global as any).location === 'undefined') {
    (global as any).location = {
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
