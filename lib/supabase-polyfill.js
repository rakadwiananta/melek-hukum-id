// Special polyfill for Supabase to handle 'self is not defined' error
// This file is loaded before any Supabase imports

// Immediately define self in all environments
if (typeof self === 'undefined') {
  if (typeof globalThis !== 'undefined') {
    globalThis.self = globalThis;
  } else if (typeof global !== 'undefined') {
    global.self = global;
  } else if (typeof window !== 'undefined') {
    window.self = window;
  }
}

// Force set self in all contexts
if (typeof globalThis !== 'undefined') {
  globalThis.self = globalThis;
}

if (typeof global !== 'undefined') {
  global.self = global;
}

if (typeof window !== 'undefined') {
  window.self = window;
}

// Mock WebSocket if needed
if (typeof WebSocket === 'undefined') {
  global.WebSocket = class MockWebSocket {
    constructor() {
      this.readyState = 3; // CLOSED
    }
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  };
}

// Ensure self is available
if (typeof self === 'undefined') {
  console.warn('self is still undefined after polyfill');
}

// Export empty object to satisfy module requirements
module.exports = {};