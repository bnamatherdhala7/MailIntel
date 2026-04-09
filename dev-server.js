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
const BRAVE_KEY     = process.env.BRAVE_SEARCH_API_KEY || '';

if (!API_KEY)    console.warn('⚠  ANTHROPIC_API_KEY not found in .env');
if (!SHOPIFY_URL) console.warn('⚠  SHOPIFY_SHOP_URL not found in .env');
if (!BRAVE_KEY)  console.warn('⚠  BRAVE_SEARCH_API_KEY not found in .env');

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

// ── Brave Search proxy — called by browser as /brave-proxy?q=... ───
function braveProxy(req, res) {
  const parsed = url.parse(req.url, true);
  const q      = parsed.query.q || '';
  const count  = parsed.query.count || '5';
  const bravePath = `/res/v1/web/search?q=${encodeURIComponent(q)}&count=${count}&search_lang=en&freshness=pw`;

  const options = {
    hostname: 'api.search.brave.com',
    path:     bravePath,
    method:   'GET',
    headers:  {
      'Accept':               'application/json',
      'Accept-Encoding':      'gzip',
      'X-Subscription-Token': BRAVE_KEY
    }
  };

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  const proxyReq = https.request(options, proxyRes => {
    // Brave may return gzip — collect raw buffer then decompress
    const chunks = [];
    proxyRes.on('data', chunk => chunks.push(chunk));
    proxyRes.on('end', () => {
      const buf = Buffer.concat(chunks);
      const encoding = proxyRes.headers['content-encoding'];
      const decompress = encoding === 'gzip'
        ? require('zlib').gunzip
        : encoding === 'deflate'
        ? require('zlib').inflate
        : null;

      if (decompress) {
        decompress(buf, (err, decoded) => {
          if (err) { res.writeHead(500); res.end(JSON.stringify({ error: err.message })); return; }
          res.writeHead(proxyRes.statusCode);
          res.end(decoded);
        });
      } else {
        res.writeHead(proxyRes.statusCode);
        res.end(buf);
      }
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

  // Route: Brave Search proxy
  if (req.url.startsWith('/brave-proxy')) {
    return braveProxy(req, res);
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
var __DEV_BRAVE_KEY__     = ${JSON.stringify(BRAVE_KEY)};
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
  console.log(`  API key:      ${API_KEY   ? API_KEY.slice(0, 18)   + '…' : 'NOT FOUND'}`);
  console.log(`  Shopify:      ${SHOPIFY_URL || 'NOT FOUND'}`);
  console.log(`  Brave Search: ${BRAVE_KEY  ? BRAVE_KEY.slice(0, 12) + '…' : 'NOT FOUND'}`);
  console.log(`  Proxies:`);
  console.log(`    /shopify-proxy?path=shop.json`);
  console.log(`    /brave-proxy?q=canvas+tote+trend\n`);
});
