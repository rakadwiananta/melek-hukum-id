// Polyfill for 'self' global that doesn't interfere with webpack
if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
  // Use a getter to avoid polluting the global scope
  Object.defineProperty(global, 'self', {
    get: function() {
      return global;
    },
    enumerable: false,
    configurable: true,
  });
}