// Minimal polyfill for 'self' global - only set if not already defined
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  try {
    global.self = global;
  } catch (e) {
    // Ignore errors
  }
}