# MailIntel

**`Claude Haiku 4.5 + Sonnet 4.6`** · **`~$0.04/run`** · **`No build tools`** · **`Vanilla HTML/JS`**

SMB owners spend 4+ hours a week switching between dashboards that never tell them what to do next. MailIntel runs 5 AI agents against your Shopify data and returns two ready-to-launch campaigns — across Email, Instagram, and TikTok — in 90 seconds, for $0.04.

---

## The Problem in One Screenshot

![Welcome Dashboard](docs/screenshots/01-welcome-dashboard.png)

Your store data is all there — revenue, orders, product velocity, low-stock alerts — but no dashboard tells you *what to do about it*. MailIntel does.

---

## How It Works

1. **You ask one question** — *"Give me a business health check and growth strategy for this week."*
2. **Five agents run in sequence** — Orchestrator plans → Signal Analyst reads your store data → Strategist finds the angle → Activation writes the copy → Critic quality-checks everything before it reaches you
3. **Two campaign cards appear** — Email + Instagram + TikTok copy, grounded in the specific signal that triggered them
4. **You edit, approve, and launch** — one click per platform, on your schedule

---

## The 5 Agents

| Agent | Model | Role | Input → Output |
|-------|-------|------|----------------|
| **Orchestrator** | Haiku 4.5 | Parses your query, sets focus + priority | Query → `{ focus, priority, context }` |
| **Signal Analyst** | Haiku 4.5 | Reads store data, finds one Win + one Opportunity | Store data → `{ win, opportunity, confidence }` |
| **Strategist** | Sonnet 4.6 | Explains the *why*, proposes 2 Next Best Actions | Signals → `{ actions[2] }` |
| **Activation** | Sonnet 4.6 | Writes Email + Instagram + TikTok copy in one batch | Action → `{ email, instagram, tiktok }` |
| **Critic** | Haiku 4.5 | Scores copy 1–10, rewrites if needed — gates every card | Draft → `{ approved, score, revised_copy }` |

---

## Screenshots

**Agents running — live trace panel**

![Agents Running](docs/screenshots/03-agents-running.png)

Every agent call streams into the Intelligence Trace panel in real time. You see what was sent, what came back, and what it cost.

---

**Results — Signal Analyst + Strategist cards**

![Results Overview](docs/screenshots/04-results-overview.png)

The Analyst surfaces what's winning and what's stalling. The Strategist explains why and proposes the two actions worth taking this week.

---

**Campaign card — Email (side-by-side editor)**

![Campaign Email](docs/screenshots/05-campaign-email.png)

Left: AI-generated copy (subject, preview text, body, CTA) — always editable, live-synced to the preview. Right: rendered email client preview that updates as you type.

---

**Campaign card — Instagram**

![Campaign Instagram](docs/screenshots/06-campaign-instagram.png)

Full Instagram dark-mode post mock with caption, hashtags, and best-time recommendation. A/B variant generates an alternative caption with one click.

---

**Campaign card — TikTok**

![Campaign TikTok](docs/screenshots/07-campaign-tiktok.png)

Vertical video card (9:16) with hook, script, and hashtags. A/B variant generates an alternative hook line.

---

**Intelligence Trace — every decision visible**

![Trace Panel](docs/screenshots/08-trace-panel.png)

Each log line is colour-coded by agent. `→` shows what was sent. `←` shows what came back. Toggle visibility with the 🔬 icon.

---

## Key Capabilities

- **Side-by-side email editor** — AI copy on the left, rendered preview on the right, live-synced as you type
- **A/B variant generator** — alternative subject line, caption, or hook via a focused 120-token Claude call (~$0.001)
- **Critic quality score** — every card shows a 1–10 score; copies that score below 8 are auto-revised before reaching you
- **Audience selector** — target All contacts · Repeat buyers · Lapsed 30d · New this week; contact count and estimated revenue update live
- **Schedule toggle** — Now · Best time ✨ (AI-recommended per platform) · Custom datetime
- **Full Intelligence Trace** — every agent call, every response, every token cost, in real time

---

## Chat Interface

MailIntel now includes a full conversational layer that separates quick store questions from campaign generation:

- **Ask anything** — *"Where did the revenue come from?" "Who are my best customers?" "Which products are low on stock?"* — Haiku answers directly from live store data in ~1 second for ~$0.00015
- **Create campaigns** — When you say "create campaigns" or "launch an email", the intent detector routes to the 5-agent pipeline with a confirm step first
- **Campaign CTA** — When a chat answer surfaces an opportunity (low stock, lapsed customers), a "Create campaigns →" button appears inline

Intent detection is keyword-based: `campaign`, `create`, `launch`, `email`, `instagram`, `tiktok`, `generate`, `promote` → agent loop. Everything else → Haiku chat answer.

---

## Live Shopify Integration

MailIntel connects to the Shopify Admin REST API (`2026-01`) through a local CORS proxy built into `dev-server.js`. The browser cannot call the Shopify Admin API directly (CORS), so all requests route through `/shopify-proxy?path=...`.

```bash
# Add Shopify credentials to .env
SHOPIFY_SHOP_URL=https://your-store.myshopify.com
SHOPIFY_ADMIN_API_KEY=shpat_...
```

`dev-server.js` injects both as globals at serve time (`__DEV_SHOPIFY_URL__`, `__DEV_SHOPIFY_TOKEN__`), auto-switches the app to Live mode, and populates the metrics bar + header chips from real data on load.

---

## MCP Integration — Local Shopify Server

`shopify-mcp.js` is a local stdio MCP server that wraps the Shopify Admin API with 6 tools:

| Tool | What it returns | Token-efficient default |
|------|----------------|------------------------|
| `get_shop_info` | Store name, currency, plan | `fields: "name,currency"` |
| `get_products` | Product list | `limit: 10, fields: "title,variants.inventory"` |
| `get_orders` | Order list | `limit: 10, created_at_min: 7d ago` |
| `get_customers` | Customer list | `limit: 20, fields: "name,orders_count,created_at"` |
| `get_inventory` | Product + variant + stock | `limit: 20, fields: "product,inventory"` |
| `get_sales_summary` | Aggregated revenue + count | Server-side aggregation — no raw order list |

The MCP server is registered in `.mcp.json` (gitignored) and picked up automatically by Claude Code via `enableAllProjectMcpServers: true`.

---

## MCP Token Optimization

Every MCP tool response carries a **token tax** — the cost of transmitting raw API data through the context window. We eliminated ~90% of this cost through four techniques:

### 1. Aggregated endpoints over raw lists

```
❌ get_orders (limit: 250)  →  ~14,000 tokens (full order objects)
✅ get_sales_summary        →  ~60 tokens    (revenue + count only)

Reduction: 99.6%
```

`get_sales_summary` does the arithmetic server-side in `shopify-mcp.js` and returns 5 fields. Never ask Claude to sum a list of 250 orders.

### 2. Fields filtering on every call

```javascript
// shopify-mcp.js — pick() helper filters before returning
pick(product, ['title', 'variants.inventory_quantity'])

❌ Full product object  →  ~800 tokens each
✅ Filtered (2 fields)  →  ~40 tokens each

Reduction: 95%
```

Every tool accepts a `fields` parameter. Passing `fields: "title,inventory"` vs nothing is the difference between 800 and 40 tokens per product.

### 3. Time-scoped queries

```
❌ orders.json (all-time)           →  250+ results, thousands of tokens
✅ orders.json?created_at_min=7d   →  13 results, ~400 tokens
```

Every order/customer query defaults to the last 7 days. Never fetch all-time data for a weekly report.

### 4. Compressed context for agent calls

Agents receive plain-text summaries, not raw JSON:

```
❌ Full fetchShopify() JSON  →  ~1,200 tokens per agent call
✅ Compressed shopSummary   →  ~150 tokens per agent call

Example:
  Store: Vendant
  Revenue 7d: $1,048 (13 orders, AOV $80.62)
  Top products: Canvas Tote Natural [sold:4, inv:8] | Eco Pin Set [sold:2, inv:338]
  Alerts: Canvas Tote (CT-NAT-001) — only 8 left
  Segments: repeat=0 lapsed=15 new=15
```

### Before / After — Full Run Cost

| Version | Tokens (input) | Cost/run |
|---------|---------------|----------|
| v1 — all Sonnet, raw JSON context | ~28,000 | ~$0.084 |
| v2 — model routing + compressed context | ~8,400 | ~$0.025 |
| v2 + cached store data (no re-fetch) | ~7,200 | ~$0.022 |

**~74% cost reduction** with no change to output quality.

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Vanilla HTML + CSS + JS | Zero setup, deploy anywhere — no build step |
| AI | Claude Sonnet 4.6 + Haiku 4.5 | Sonnet for reasoning, Haiku for routing + critique |
| Commerce data | Shopify Admin REST API `2026-01` | Live orders, products, customers, inventory |
| MCP | Local stdio server (`shopify-mcp.js`) | 6 tools with fields filtering + aggregation |
| CORS proxy | `dev-server.js` `/shopify-proxy` | Browser can't call Shopify Admin API directly |
| Fonts | Syne + JetBrains Mono + DM Sans | Display / trace / body hierarchy |
| Dev server | `dev-server.js` (Node built-in `http`) | Reads `.env`, injects keys at serve time |

---

## Getting Started

```bash
git clone https://github.com/bnamatherdhala7/MailIntel.git
cd MailIntel

# Create .env with your keys (never committed — gitignored)
cat > .env <<EOF
ANTHROPIC_API_KEY=sk-ant-...
SHOPIFY_SHOP_URL=https://your-store.myshopify.com
SHOPIFY_ADMIN_API_KEY=shpat_...
EOF

# Start dev server — reads .env, injects keys, proxies Shopify API
node dev-server.js
```

Open [http://localhost:3000](http://localhost:3000). API keys are injected into `sessionStorage` at page load and cleared when the tab closes — never written to disk.

**Optional: seed your store with sample data**
```bash
node seed-shopify.js
# Creates 8 products, 12 customers, 13 orders spread over 7 days
```

---

## Cost

| Scenario | Cost |
|----------|------|
| Chat answer (Haiku, store Q&A) | ~$0.00015 |
| Full run — 5 agents, 2 campaign cards | ~$0.022 |
| 300 full runs/month | ~$6.60/month |
| A/B variant call | ~$0.001 |

*Sonnet 4.6: $3/$15 per M tokens · Haiku 4.5: $1/$5 per M tokens*  
*Token optimization (fields filtering + compressed context + model routing) reduces cost ~74% vs naive implementation.*

---

## Docs

- [`CLAUDE.md`](CLAUDE.md) — Build spec: Workflows, Actions, Tools (the authoritative source)
- [`docs/prd.md`](docs/prd.md) — Full product requirements: problem analysis, architecture decisions, roadmap
- [`docs/architecture.md`](docs/architecture.md) — Agent pipeline deep dive, data flow, cost breakdown
- [`docs/product.md`](docs/product.md) — Market context, user personas, value proposition
- [`agent-prompts.js`](agent-prompts.js) — All 5 system prompts
- [`mock-data.js`](mock-data.js) — Mock Shopify data + audience segments
- [`design-tokens.md`](design-tokens.md) — Colour tokens, typography, component specs

---

## Out of Scope (v1)

- Real email sending (mock success animation only)
- Real Instagram / TikTok posting
- User authentication
- Multi-store support
- Persistent session history

---

*Built for the 33 million small businesses that are drowning in dashboards and starving for decisions.*
