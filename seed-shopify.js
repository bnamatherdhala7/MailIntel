#!/usr/bin/env node
/**
 * seed-shopify.js — Populate Vendant store with realistic sample data
 * Creates: 8 products, 15 orders, 12 customers
 * Run: node seed-shopify.js
 */

const https = require('https');
const path  = require('path');
const fs    = require('fs');

// Load .env
const lines = fs.readFileSync(path.join(__dirname, '.env'), 'utf8').split('\n');
for (const line of lines) {
  const [k, ...rest] = line.split('=');
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim();
}

const SHOP  = (process.env.SHOPIFY_SHOP_URL || '').replace('https://', '').replace(/\/$/, '');
const TOKEN = process.env.SHOPIFY_ADMIN_API_KEY || '';
const VER   = '2026-01';

if (!SHOP || !TOKEN) { console.error('Missing SHOPIFY_SHOP_URL or SHOPIFY_ADMIN_API_KEY in .env'); process.exit(1); }

function api(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: SHOP,
      path: `/admin/api/${VER}/${endpoint}`,
      method,
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let buf = '';
      res.on('data', c => buf += c);
      res.on('end', () => {
        if (res.statusCode >= 400) return reject(new Error(`${res.statusCode}: ${buf.slice(0, 200)}`));
        resolve(JSON.parse(buf));
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Sample data ───────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    title: 'Canvas Tote — Natural',
    vendor: 'Vendant', product_type: 'Bags',
    body_html: 'Hand-stitched 12oz canvas. Perfect for market days.',
    tags: 'bags, bestseller, sustainable',
    variants: [{ price: '34.00', sku: 'CT-NAT-001', inventory_quantity: 12, inventory_management: 'shopify' }],
    status: 'active'
  },
  {
    title: 'Eco Pin Set — Wildflower',
    vendor: 'Vendant', product_type: 'Accessories',
    body_html: 'Set of 4 enamel pins. Recycled metal backing.',
    tags: 'pins, accessories, eco',
    variants: [{ price: '18.00', sku: 'EP-WLD-001', inventory_quantity: 340, inventory_management: 'shopify' }],
    status: 'active'
  },
  {
    title: 'Linen Bucket Hat — Sage',
    vendor: 'Vendant', product_type: 'Hats',
    body_html: '100% stonewashed linen. One size fits most.',
    tags: 'hats, summer, linen',
    variants: [
      { option1: 'S/M', price: '42.00', sku: 'BH-SGE-SM', inventory_quantity: 7, inventory_management: 'shopify' },
      { option1: 'L/XL', price: '42.00', sku: 'BH-SGE-LX', inventory_quantity: 3, inventory_management: 'shopify' },
    ],
    options: [{ name: 'Size', values: ['S/M', 'L/XL'] }],
    status: 'active'
  },
  {
    title: 'Beeswax Candle — Cedar & Smoke',
    vendor: 'Vendant', product_type: 'Home',
    body_html: '8oz hand-poured beeswax. 45-hour burn time.',
    tags: 'candles, home, gifting',
    variants: [{ price: '28.00', sku: 'BC-CED-001', inventory_quantity: 54, inventory_management: 'shopify' }],
    status: 'active'
  },
  {
    title: 'Recycled Wool Scarf — Oatmeal',
    vendor: 'Vendant', product_type: 'Accessories',
    body_html: 'Woven from 80% recycled wool. Extra wide, 70" length.',
    tags: 'scarves, winter, wool, sustainable',
    variants: [{ price: '68.00', sku: 'WS-OAT-001', inventory_quantity: 19, inventory_management: 'shopify' }],
    status: 'active'
  },
  {
    title: 'Ceramic Mug — Speckled Clay',
    vendor: 'Vendant', product_type: 'Home',
    body_html: 'Handthrown stoneware. Microwave and dishwasher safe.',
    tags: 'mugs, home, gifting, ceramics',
    variants: [{ price: '38.00', sku: 'CM-SPK-001', inventory_quantity: 5, inventory_management: 'shopify' }],
    status: 'active'
  },
  {
    title: 'Seed Paper Notebook — A5',
    vendor: 'Vendant', product_type: 'Stationery',
    body_html: 'Plantable cover embedded with wildflower seeds. 96 pages.',
    tags: 'stationery, notebooks, eco, gifting',
    variants: [{ price: '22.00', sku: 'NB-A5-001', inventory_quantity: 88, inventory_management: 'shopify' }],
    status: 'active'
  },
  {
    title: 'Canvas Tote — Forest',
    vendor: 'Vendant', product_type: 'Bags',
    body_html: 'Same sturdy canvas as our Natural — in deep forest green.',
    tags: 'bags, sustainable',
    variants: [{ price: '34.00', sku: 'CT-FOR-001', inventory_quantity: 4, inventory_management: 'shopify' }],
    status: 'active'
  },
];

const CUSTOMERS = [
  { first_name: 'Maya',    last_name: 'Chen',      email: 'maya.chen@example.com',      phone: '+12025550101' },
  { first_name: 'James',   last_name: 'Okafor',    email: 'james.okafor@example.com',   phone: '+13105550102' },
  { first_name: 'Sara',    last_name: 'Lindqvist', email: 'sara.lindqvist@example.com', phone: '+14155550103' },
  { first_name: 'Priya',   last_name: 'Nair',      email: 'priya.nair@example.com',     phone: '+17185550104' },
  { first_name: 'Carlos',  last_name: 'Rivera',    email: 'carlos.rivera@example.com',  phone: '+13055550105' },
  { first_name: 'Hannah',  last_name: 'Brooks',    email: 'hannah.brooks@example.com',  phone: '+16175550106' },
  { first_name: 'Ethan',   last_name: 'Wu',        email: 'ethan.wu@example.com',       phone: '+17735550107' },
  { first_name: 'Amara',   last_name: 'Diallo',    email: 'amara.diallo@example.com',   phone: '+12125550108' },
  { first_name: 'Leo',     last_name: 'Fischer',   email: 'leo.fischer@example.com',    phone: '+14085550109' },
  { first_name: 'Zoe',     last_name: 'Patel',     email: 'zoe.patel@example.com',      phone: '+18025550110' },
  { first_name: 'Marcus',  last_name: 'Thompson',  email: 'marcus.t@example.com',       phone: '+16465550111' },
  { first_name: 'Lily',    last_name: 'Kim',       email: 'lily.kim@example.com',       phone: '+13235550112' },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n  Seeding Vendant store (${SHOP})\n`);

  // 1. Create products
  console.log('  Creating products...');
  const createdProducts = [];
  for (const p of PRODUCTS) {
    try {
      const res = await api('POST', 'products.json', { product: p });
      const prod = res.product;
      createdProducts.push(prod);
      console.log(`    ✓ ${prod.title} (${prod.variants.length} variant(s))`);
      await sleep(300); // Shopify rate limit: 2 req/s
    } catch (e) {
      console.error(`    ✗ ${p.title}: ${e.message}`);
    }
  }

  // 2. Create customers
  console.log('\n  Creating customers...');
  const createdCustomers = [];
  for (const c of CUSTOMERS) {
    try {
      const res = await api('POST', 'customers.json', {
        customer: { ...c, verified_email: true, send_email_welcome: false }
      });
      createdCustomers.push(res.customer);
      console.log(`    ✓ ${c.first_name} ${c.last_name}`);
      await sleep(300);
    } catch (e) {
      console.error(`    ✗ ${c.first_name}: ${e.message}`);
    }
  }

  // 3. Create orders — spread over last 7 days
  if (createdProducts.length === 0 || createdCustomers.length === 0) {
    console.log('\n  Skipping orders — no products or customers created.');
    return;
  }

  console.log('\n  Creating orders...');
  const orderTemplates = [
    { items: [0, 1], qty: [1, 2], daysAgo: 1 },   // Canvas Tote + Eco Pins
    { items: [3, 6], qty: [1, 1], daysAgo: 1 },   // Candle + Notebook
    { items: [0],    qty: [2],    daysAgo: 2 },   // 2x Canvas Tote
    { items: [4, 5], qty: [1, 1], daysAgo: 2 },   // Scarf + Mug
    { items: [1, 6], qty: [1, 1], daysAgo: 2 },   // Pins + Notebook
    { items: [2],    qty: [1],    daysAgo: 3 },   // Bucket Hat
    { items: [7, 1], qty: [1, 3], daysAgo: 3 },   // Forest Tote + Pins
    { items: [3],    qty: [2],    daysAgo: 4 },   // 2x Candle
    { items: [0, 4], qty: [1, 1], daysAgo: 4 },   // Tote + Scarf
    { items: [5, 6], qty: [1, 2], daysAgo: 5 },   // Mug + 2x Notebook
    { items: [2, 3], qty: [1, 1], daysAgo: 5 },   // Hat + Candle
    { items: [1, 5], qty: [2, 1], daysAgo: 6 },   // 2x Pins + Mug
    { items: [0, 7], qty: [1, 1], daysAgo: 6 },   // Natural + Forest Tote
    { items: [4],    qty: [1],    daysAgo: 7 },   // Scarf
    { items: [0, 3, 6], qty: [1,1,1], daysAgo: 7 }, // Tote + Candle + Notebook
  ];

  let orderCount = 0;
  for (const tmpl of orderTemplates) {
    const customer = createdCustomers[orderCount % createdCustomers.length];
    const lineItems = tmpl.items
      .map((pi, idx) => {
        const prod = createdProducts[pi % createdProducts.length];
        if (!prod) return null;
        const variant = prod.variants[0];
        return { variant_id: variant.id, quantity: tmpl.qty[idx] || 1 };
      })
      .filter(Boolean);

    if (lineItems.length === 0) continue;

    const createdAt = new Date(Date.now() - tmpl.daysAgo * 864e5).toISOString();
    try {
      const res = await api('POST', 'orders.json', {
        order: {
          line_items: lineItems,
          customer: { id: customer.id },
          financial_status: 'paid',
          fulfillment_status: null,
          created_at: createdAt,
          send_receipt: false,
          send_fulfillment_receipt: false,
        }
      });
      const o = res.order;
      console.log(`    ✓ Order ${o.name} — $${o.total_price} (${tmpl.daysAgo}d ago)`);
      orderCount++;
      await sleep(400);
    } catch (e) {
      console.error(`    ✗ Order ${orderCount}: ${e.message}`);
    }
  }

  console.log(`\n  Done! Created ${createdProducts.length} products, ${createdCustomers.length} customers, ${orderCount} orders.`);
  console.log(`  Restart dev-server.js and reload — your store will show real revenue and velocity data.\n`);
}

run().catch(e => { console.error(e); process.exit(1); });
