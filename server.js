// Polyfills for server-side rendering
if (typeof global !== 'undefined') {
  // Polyfill for 'self' global
  if (typeof global.self === 'undefined') {
    global.self = global
  }
  
  // Polyfill for 'window' global
  if (typeof global.window === 'undefined') {
    global.window = global
  }
  
  // Polyfill for 'document' global
  if (typeof global.document === 'undefined') {
    global.document = {
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
    global.navigator = {
      userAgent: 'Node.js',
      share: undefined,
      clipboard: undefined,
      serviceWorker: undefined,
    }
  }
  
  // Polyfill for 'location' global
  if (typeof global.location === 'undefined') {
    global.location = {
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
    }
  }
  
  // Polyfill for 'requestIdleCallback' if not available
  if (typeof global.requestIdleCallback === 'undefined') {
    global.requestIdleCallback = (callback) => {
      return setTimeout(() => callback({ didTimeout: false }), 1)
    }
  }
  
  // Polyfill for 'cancelIdleCallback' if not available
  if (typeof global.cancelIdleCallback === 'undefined') {
    global.cancelIdleCallback = (id) => {
      clearTimeout(id)
    }
  }
}

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})