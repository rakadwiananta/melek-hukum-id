// Minimal polyfill for 'self' global
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  global.self = global;
}