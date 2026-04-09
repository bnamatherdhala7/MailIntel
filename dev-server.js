// dev-server.js — MailIntel local dev server
// Reads keys from .env, injects them into index.html, and proxies Shopify Admin API calls
// (browser cannot call Shopify Admin API directly due to CORS).

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

// ── Load .env ──────────────────────────────────────────────────────
function loadEnv() {
  try {
    const lines = fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n');
    for (const line of lines) {
      const [k, ...rest] = line.split('=');
      if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
    }
  } catch (_) {}
}
loadEnv();

const PORT          = process.env.PORT || 3000;
const API_KEY       = process.env.ANTHROPIC_API_KEY || '';
const SHOPIFY_URL   = (process.env.SHOPIFY_SHOP_URL || '').replace(/\/$/, '');
const SHOPIFY_TOKEN = process.env.SHOPIFY_ADMIN_API_KEY || '';
const SHOPIFY_HOST  = SHOPIFY_URL.replace('https://', '');

if (!API_KEY)    console.warn('⚠  ANTHROPIC_API_KEY not found in .env');
if (!SHOPIFY_URL) console.warn('⚠  SHOPIFY_SHOP_URL not found in .env');

const MIME = {
  '.html': 'text/html', '.css': 'text/css',
  '.js': 'application/javascript', '.json': 'application/json',
  '.png': 'image/png', '.ico': 'image/x-icon',
};

// ── Shopify proxy — called by browser as /shopify-proxy?path=... ────
function shopifyProxy(req, res) {
  const parsed   = url.parse(req.url, true);
  const apiPath  = parsed.query.path;    // e.g. "shop.json" or "orders.json?limit=10"
  const shopPath = `/admin/api/2026-01/${apiPath}`;

  const options = {
    hostname: SHOPIFY_HOST,
    path:     shopPath,
    method:   'GET',
    headers:  { 'X-Shopify-Access-Token': SHOPIFY_TOKEN, 'Content-Type': 'application/json' }
  };

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const proxyReq = https.request(options, proxyRes => {
    let body = '';
    proxyRes.on('data', chunk => body += chunk);
    proxyRes.on('end', () => {
      res.writeHead(proxyRes.statusCode);
      res.end(body);
    });
  });

  proxyReq.on('error', e => {
    res.writeHead(500);
    res.end(JSON.stringify({ error: e.message }));
  });

  proxyReq.end();
}

// ── Static file server ─────────────────────────────────────────────
const server = http.createServer((req, res) => {
  // Route: Shopify proxy
  if (req.url.startsWith('/shopify-proxy')) {
    return shopifyProxy(req, res);
  }

  const filePath = req.url === '/' || req.url === '/index.html'
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, req.url.split('?')[0]);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }

    if (filePath.endsWith('index.html')) {
      const injected = `<script>
var __DEV_API_KEY__       = ${JSON.stringify(API_KEY)};
var __DEV_SHOPIFY_URL__   = ${JSON.stringify(SHOPIFY_URL)};
var __DEV_SHOPIFY_TOKEN__ = ${JSON.stringify(SHOPIFY_TOKEN)};
</script>\n`;
      const html = data.toString().replace('<script>', injected + '<script>');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'text/plain' });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n  MailIntel dev server running`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  API key:      ${API_KEY ? API_KEY.slice(0, 18) + '…' : 'NOT FOUND'}`);
  console.log(`  Shopify:      ${SHOPIFY_URL || 'NOT FOUND'}`);
  console.log(`  Proxy:        http://localhost:${PORT}/shopify-proxy?path=shop.json\n`);
});
