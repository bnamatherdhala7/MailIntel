#!/usr/bin/env node
/**
 * shopify-mcp.js — Local MCP server for Shopify Admin REST API
 * Exposes store data tools to Claude via stdio MCP protocol.
 * Usage: node shopify-mcp.js --shop-url <url> --admin-api-key <token>
 *
 * Token efficiency: every tool supports a `fields` param — pass a comma-separated
 * list to receive only those keys. Default fields are minimal by design.
 */

const args = process.argv.slice(2);
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };

const SHOP_URL = (getArg('--shop-url') || process.env.SHOPIFY_SHOP_URL || '').replace(/\/$/, '');
const API_KEY  = getArg('--admin-api-key') || process.env.SHOPIFY_ADMIN_API_KEY || '';
const API_VER  = '2026-01';

if (!SHOP_URL || !API_KEY) {
  process.stderr.write('Error: --shop-url and --admin-api-key are required\n');
  process.exit(1);
}

async function shopify(path, params = {}) {
  const url = new URL(`${SHOP_URL}/admin/api/${API_VER}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), {
    headers: { 'X-Shopify-Access-Token': API_KEY, 'Content-Type': 'application/json' }
  });
  if (!res.ok) throw new Error(`Shopify API error ${res.status}: ${await res.text()}`);
  return res.json();
}

// Pick only requested fields from an object (supports dot notation for one level: "variants.price")
function pick(obj, fields) {
  if (!fields || fields.length === 0) return obj;
  const result = {};
  for (const f of fields) {
    if (f.includes('.')) {
      const [parent, child] = f.split('.');
      if (obj[parent] !== undefined) {
        if (!result[parent]) result[parent] = Array.isArray(obj[parent]) ? [] : {};
        if (Array.isArray(obj[parent])) {
          result[parent] = obj[parent].map(item => ({ [child]: item[child] }));
        } else {
          result[parent][child] = obj[parent][child];
        }
      }
    } else if (obj[f] !== undefined) {
      result[f] = obj[f];
    }
  }
  return result;
}

function parseFields(input) {
  if (!input?.fields) return null;
  return input.fields.split(',').map(f => f.trim()).filter(Boolean);
}

// ── Tool definitions ──────────────────────────────────────────────────────────

const FIELDS_PARAM = {
  type: 'string',
  description: 'Comma-separated fields to return (e.g. "title,inventory"). Omit for defaults. Use to minimize token usage.'
};

const TOOLS = [
  {
    name: 'get_shop_info',
    description: 'Store info: name, currency, plan, timezone. Cheap call — use once per session.',
    inputSchema: { type: 'object', properties: { fields: FIELDS_PARAM }, required: [] }
  },
  {
    name: 'get_products',
    description: 'Products with title, inventory, price. Default: top 10, minimal fields. Use fields param to reduce payload.',
    inputSchema: {
      type: 'object',
      properties: {
        limit:  { type: 'number', description: 'Max results (default 10, max 250)' },
        status: { type: 'string', description: 'active | draft | archived' },
        fields: FIELDS_PARAM
      },
      required: []
    }
  },
  {
    name: 'get_orders',
    description: 'Recent orders. Default: last 10, paid status. Use created_at_min to scope to a time window and reduce tokens.',
    inputSchema: {
      type: 'object',
      properties: {
        limit:            { type: 'number', description: 'Max results (default 10, max 250)' },
        status:           { type: 'string', description: 'open | closed | cancelled | any' },
        financial_status: { type: 'string', description: 'paid | pending | refunded | any' },
        created_at_min:   { type: 'string', description: 'ISO 8601 — scope to recent period to reduce payload' },
        fields:           FIELDS_PARAM
      },
      required: []
    }
  },
  {
    name: 'get_customers',
    description: 'Customers with spend and order count. Default: 20 most recent. Avoid large limits — use date scoping instead.',
    inputSchema: {
      type: 'object',
      properties: {
        limit:          { type: 'number', description: 'Max results (default 20)' },
        created_at_min: { type: 'string', description: 'ISO 8601 date filter' },
        fields:         FIELDS_PARAM
      },
      required: []
    }
  },
  {
    name: 'get_inventory',
    description: 'All variants sorted by stock level (ascending). Use for low-stock alerts. Returns: product, variant, sku, inventory, price.',
    inputSchema: {
      type: 'object',
      properties: {
        limit:  { type: 'number', description: 'Max products to scan (default 50)' },
        fields: FIELDS_PARAM
      },
      required: []
    }
  },
  {
    name: 'get_sales_summary',
    description: 'Aggregated revenue + order count for a date range. Prefer this over get_orders when you only need totals — much smaller payload.',
    inputSchema: {
      type: 'object',
      properties: {
        created_at_min: { type: 'string', description: 'Start date ISO 8601' },
        created_at_max: { type: 'string', description: 'End date ISO 8601' },
        fields:         FIELDS_PARAM
      },
      required: []
    }
  }
];

// ── Tool handlers ─────────────────────────────────────────────────────────────

async function handle(name, input) {
  const fields = parseFields(input);

  switch (name) {
    case 'get_shop_info': {
      const { shop } = await shopify('shop.json');
      const full = { name: shop.name, domain: shop.domain, email: shop.email,
                     plan: shop.plan_name, currency: shop.currency, timezone: shop.iana_timezone };
      return fields ? pick(full, fields) : full;
    }

    case 'get_products': {
      const params = { limit: input.limit || 10 };
      if (input.status) params.status = input.status;
      const { products } = await shopify('products.json', params);
      return products.map(p => {
        const full = {
          id: p.id, title: p.title, status: p.status,
          variants: p.variants.map(v => ({
            title: v.title, price: v.price, sku: v.sku, inventory: v.inventory_quantity
          }))
        };
        return fields ? pick(full, fields) : full;
      });
    }

    case 'get_orders': {
      const params = { limit: input.limit || 10, status: input.status || 'any' };
      if (input.financial_status) params.financial_status = input.financial_status;
      if (input.created_at_min)   params.created_at_min   = input.created_at_min;
      const { orders } = await shopify('orders.json', params);
      return orders.map(o => {
        const full = {
          id: o.id, name: o.name, created_at: o.created_at,
          total_price: o.total_price, financial_status: o.financial_status,
          fulfillment_status: o.fulfillment_status,
          customer: o.customer ? `${o.customer.first_name} ${o.customer.last_name}` : null,
          line_items: o.line_items.map(li => ({ title: li.title, qty: li.quantity, price: li.price }))
        };
        return fields ? pick(full, fields) : full;
      });
    }

    case 'get_customers': {
      const params = { limit: input.limit || 20 };
      if (input.created_at_min) params.created_at_min = input.created_at_min;
      const { customers } = await shopify('customers.json', params);
      return customers.map(c => {
        const full = {
          id: c.id, name: `${c.first_name} ${c.last_name}`, email: c.email,
          orders_count: c.orders_count, total_spent: c.total_spent, tags: c.tags
        };
        return fields ? pick(full, fields) : full;
      });
    }

    case 'get_inventory': {
      const { products } = await shopify('products.json', { limit: input.limit || 50 });
      const rows = products.flatMap(p =>
        p.variants.map(v => ({
          product: p.title, sku: v.sku || '—',
          inventory: v.inventory_quantity || 0, price: v.price
        }))
      ).sort((a, b) => a.inventory - b.inventory);
      return fields ? rows.map(r => pick(r, fields)) : rows;
    }

    case 'get_sales_summary': {
      const params = { limit: 250, status: 'any', financial_status: 'paid' };
      if (input.created_at_min) params.created_at_min = input.created_at_min;
      if (input.created_at_max) params.created_at_max = input.created_at_max;
      const { orders } = await shopify('orders.json', params);
      const revenue = orders.reduce((s, o) => s + parseFloat(o.total_price), 0);
      const full = {
        order_count: orders.length,
        total_revenue: revenue.toFixed(2),
        avg_order_value: orders.length ? (revenue / orders.length).toFixed(2) : '0.00',
        currency: orders[0]?.currency || 'USD',
        period: { from: input.created_at_min || 'all', to: input.created_at_max || 'now' }
      };
      return fields ? pick(full, fields) : full;
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ── MCP stdio protocol ────────────────────────────────────────────────────────

function send(obj) { process.stdout.write(JSON.stringify(obj) + '\n'); }
function respond(id, result) { send({ jsonrpc: '2.0', id, result }); }
function error(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

let buf = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  buf += chunk;
  const lines = buf.split('\n');
  buf = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    dispatch(msg);
  }
});

async function dispatch(msg) {
  const { id, method, params } = msg;

  if (method === 'initialize') {
    respond(id, {
      protocolVersion: '2024-11-05',
      serverInfo: { name: 'shopify-mcp', version: '1.1.0' },
      capabilities: { tools: {} }
    });
    return;
  }

  if (method === 'notifications/initialized') return;

  if (method === 'tools/list') {
    respond(id, { tools: TOOLS });
    return;
  }

  if (method === 'tools/call') {
    try {
      const result = await handle(params.name, params.arguments || {});
      respond(id, { content: [{ type: 'text', text: JSON.stringify(result) }] });
    } catch (e) {
      error(id, -32000, e.message);
    }
    return;
  }

  if (id !== undefined) error(id, -32601, `Method not found: ${method}`);
}
