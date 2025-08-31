// Global polyfills for browser-only APIs in SSR
// Fix for 'self is not defined' error in Supabase/WebSocket

// Simple and direct polyfill for 'self'
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

export {};
