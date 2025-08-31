// Minimal Next.js custom server for Plesk/cPanel Node.js hosting
// Uses PORT provided by the hosting panel, falls back to 3000

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Optimize for shared hosting
process.env.NODE_OPTIONS = '--max-old-space-size=512';
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(port, '0.0.0.0', (err) => {
    if (err) throw err
    console.log(`> Next.js server ready on http://0.0.0.0:${port} [mode=${dev ? 'dev' : 'prod'}]`)
  })
})
