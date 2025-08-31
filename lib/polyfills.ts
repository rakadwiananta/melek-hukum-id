// Global polyfills for browser-only APIs in SSR
if (typeof globalThis !== 'undefined') {
  if (typeof (globalThis as any).self === 'undefined') {
    (globalThis as any).self = globalThis;
  }
  if (typeof (globalThis as any).window === 'undefined') {
    (globalThis as any).window = globalThis;
  }
}

// Node.js environment
if (typeof global !== 'undefined') {
  if (typeof (global as any).self === 'undefined') {
    (global as any).self = global;
  }
  if (typeof (global as any).window === 'undefined') {
    (global as any).window = global;
  }
}

export {};
