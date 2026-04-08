// dev-server.js — MailIntel local dev server
// Reads ANTHROPIC_API_KEY from .env and injects it into index.html at serve time.
// Usage: node dev-server.js
// The key is NEVER written back to any file — only held in memory while the server runs.

const http = require('http');
const fs   = require('fs');
const path = require('path');

// ── Load .env ──────────────────────────────────────────────────────
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const [k, ...rest] = line.split('=');
      if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
    }
  } catch (_) {}
}
loadEnv();

const PORT    = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';

if (!API_KEY) {
  console.warn('⚠  ANTHROPIC_API_KEY not found in .env — the key overlay will show on load.');
}

// ── Mime types ─────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

// ── Server ─────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // Only serve index.html for the root path
  const filePath = req.url === '/' || req.url === '/index.html'
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, req.url.split('?')[0]);

  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    // Inject the API key into index.html
    if (filePath.endsWith('index.html') && API_KEY) {
      const injected = `<script>var __DEV_API_KEY__ = ${JSON.stringify(API_KEY)};</script>\n`;
      const html = data.toString().replace('<script>', injected + '<script>');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n  MailIntel dev server running\n`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  API key: ${API_KEY ? API_KEY.slice(0, 18) + '…  (from .env)' : 'NOT FOUND'}\n`);
});
