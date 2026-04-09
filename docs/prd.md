# MailIntel — Product Requirements Document

**Version:** 1.0 · **Date:** April 2026 · **Status:** MVP Complete

> Transforming the marketing stack from a "Service Provider" to a "Business Partner" through an AI-driven Intelligence Layer.

---

## 1. The Problem

### 1.1 Data Rich, Insight Poor

A typical Shopify store owner wakes up to five open tabs:

- Shopify Analytics — revenue trends
- Klaviyo — open rates and unsubscribes
- Meta Ads Manager — ROAS
- An inventory spreadsheet — reorder flags
- Google Analytics — traffic sources

**None of these talk to each other. None say what to do next.**

The Canvas Tote is trending up 34%, only 12 left in stock, and reorder risk is 4 days out. No email goes out. The Eco-Pins are collecting dust — 340 units, slowing sales, strong upsell angle with the Tote. No campaign gets written. The opportunity expires.

This isn't a data problem. It's a *synthesis* problem.

### 1.2 The 10-Tab Problem

SMB owners spend **4+ hours/week** context-switching between dashboards to piece together a picture of their business health. The cost isn't just time — it's the cognitive load of reconciling TikTok engagement with Shopify sales with email open rates, across tools that share no common language.

The result: paralysis. Campaigns never launched. Revenue left on the table.

**Signal → Action latency for the average SMB: 7 days. Often infinity.**

### 1.3 The Blank Page Problem

When metrics decline, merchants face two failures simultaneously: they don't know *what* the signal means, and they don't know *what to say* about it. The copywriting blank page compounds the analytical blank page. Most owners give up at step one.

### 1.4 The McKinsey Gap

Enterprise brands close this gap with growth teams, data analysts, and agency copywriters. A 10-person Shopify store has none of these.

The synthesis layer that turns data into action has historically cost **$3,000–$10,000/month in agency retainers** or an $80K/year marketing hire. For SMBs, this isn't a bad deal — it's an impossible one.

MailIntel delivers the same capability for **$0.04**.

---

## 2. Market Context

### 2.1 Why SMBs, Why Now

- **33 million** SMBs globally; 2M+ on Shopify, 90% under 10 employees
- AI tool adoption among SMBs reached **35% in 2025** (up from 11% in 2023)
- The bottleneck has shifted from "can I build a store" to "can I market it intelligently"
- Multi-channel complexity is increasing: Instagram Reels, TikTok Shop, email, SMS — merchants need cross-channel strategy, not single-channel tools

### 2.2 The Incumbent Gap

| Capability | Shopify Analytics | Klaviyo | ChatGPT / Claude.ai | Agency Retainer | **MailIntel** |
|---|---|---|---|---|---|
| Reads your store data | ✓ | Partial | ✗ | ✓ | ✓ |
| Identifies what to act on | ✗ | ✗ | ✗ | ✓ | ✓ |
| Explains the why | ✗ | ✗ | ✗ | ✓ | ✓ |
| Writes campaign copy | ✗ | Templates only | ✓ (generic) | ✓ | ✓ (signal-grounded) |
| Cross-channel (Email+Social) | ✗ | Email only | ✗ | ✓ | ✓ |
| Time to action | — | Days | Minutes (with prompting) | 48 hours | **90 seconds** |
| Cost | Included | $20–$700/mo | $20/mo | $3K–10K/mo | **$0.04/run** |

The key insight: existing AI tools write copy on demand, but they lack the **strategic reasoning** to know *what to write and why*. The gap is not copy quality — it's copy *causality*. MailIntel's campaigns are generated because a specific signal triggered them, and that signal is baked into the copy.

### 2.3 The Timing Unlock

Three shifts in 2025–2026 made this viable:

1. **Claude's JSON reliability** — agents can now be trusted to output structured, parseable responses consistently. 18 months ago, multi-agent JSON pipelines broke constantly.
2. **Haiku's cost/speed ratio** — at $1/$5 per million tokens, routing and analysis agents cost fractions of a cent. A 5-agent loop costs ~$0.04.
3. **Direct browser API access** — Anthropic's `dangerous-direct-browser-access` header makes zero-backend demos possible. A founder can ship and test without infrastructure.

The technology finally matches the problem.

---

## 3. The Solution

### 3.1 One Question. 90 Seconds. Ready-to-Launch Campaigns.

The entire experience is a single loop:

```
Ask → Agents Run → Campaign Cards Appear → Edit → Launch
```

No dashboards. No prompt engineering. No context-switching. One question unlocks the full intelligence pipeline.

### 3.2 The 5-Agent Reasoning Loop

MailIntel uses a sequential 5-agent architecture rather than a monolithic AI call. Each agent has a single job, a constrained output schema, and a specific model matched to the complexity of its task.

```
User Query
    │
    ▼
[Orchestrator]     Haiku 4.5   — Routes the query; sets focus + priority
    │
    ▼
[Signal Analyst]   Haiku 4.5   — Reads store data; finds Win + Opportunity
    │
    ▼
[Strategist]       Sonnet 4.6  — Explains the why; proposes 2 Next Best Actions
    │
    ▼  (once per action)
[Activation]       Sonnet 4.6  — Writes Email + Instagram + TikTok copy in one batch
    │
    ▼
[Critic]           Haiku 4.5   — Scores copy 1–10; approves or rewrites
    │
    ▼
Campaign Card (rendered, gated by Critic approval)
```

Every agent outputs JSON only. The `parseJ()` function strips markdown fences and parses — no fragile string extraction.

### 3.3 Model-Aware Routing

The 3-agent / 2-agent model split is a deliberate cost and quality decision:

| Task | Model | Why |
|---|---|---|
| Routing, data reading, critique | Haiku 4.5 | Speed (<1s), structured output, low reasoning overhead |
| Strategic narrative, campaign copy | Sonnet 4.6 | Deep reasoning, cross-signal synthesis, tone quality |

**Result:** 40% cost reduction vs. running all 5 agents on Sonnet, with equivalent output quality on structured tasks.

### 3.4 Human-in-the-Loop Approval Gates

MailIntel never executes an action without explicit user approval. Two gates are enforced:

1. **Concept selection** — campaign cards appear but nothing is sent; the user decides which to act on
2. **Activation approval** — the Launch button is always a deliberate click; no auto-scheduling ever fires

This is a product principle, not a technical limitation. Trust in AI-led commerce requires that humans stay in the loop on every consequential action.

### 3.5 The Critic Loop — Reliability by Design

The Critic agent is the only way to deliver professional-grade copy at volume without human review of every output. It checks:

1. **Tone violations** — corporate, spammy, or jargon-heavy language
2. **Naming violations** — banned phrases ("based on your data", "your customers", "Mailchimp")
3. **Accuracy** — does the copy match the signal that triggered it?
4. **Concierge quality** — does it sound like a trusted advisor?

Score ≥ 8 and no violations → approved as-is. Score < 8 → the Critic returns a `revised_copy` in the same JSON structure, and the card renders the revised version. The user always sees the best version.

**No campaign card renders without passing the Critic.**

### 3.6 Chat Interface — Conversational Store Intelligence

The v1.1 update adds a conversational layer that separates two distinct user intents:

**1. Quick store questions** — routed to Haiku with a compressed store summary. Answers in ~1 second. Cost: ~$0.00015. Examples:
- "Where did the revenue come from this week?"
- "Which products are low on stock?"
- "Who are my best customers?"

**2. Campaign generation** — detected by intent keywords (`campaign`, `create`, `launch`, `email`, `instagram`, `tiktok`, `generate`, `promote`, `draft`). Routes to the Orchestrator → confirm card → full 5-agent loop.

This two-tier architecture means the product is useful for daily store monitoring at near-zero cost, not just weekly campaign generation. It also lowers the activation barrier: merchants can explore their data conversationally before committing to a full agent run.

**Store data is cached on first load.** Chat answers reuse `cachedStoreData` without re-fetching. The first load populates the cache; all subsequent questions and agent runs use it — eliminating redundant Shopify API calls within a session.

### 3.7 Live Shopify Integration

`fetchShopify()` calls five Shopify Admin REST endpoints in parallel, then normalises the response into the same JSON shape as `MOCK_SHOPIFY_DATA`. Agents are mode-agnostic — they receive identical context regardless of data source.

```
Parallel fetch:
  shop.json                             → store name, currency
  orders.json?created_at_min=7d         → this week's orders
  orders.json?created_at_min=14d&max=7d → prior week (for % change)
  products.json?limit=50                → inventory + velocity
  customers.json?created_at_min=30d     → segment counts
```

A CORS proxy in `dev-server.js` (`/shopify-proxy?path=...`) forwards all requests server-side. The Shopify Admin API does not support browser direct access.

### 3.8 MCP Integration — Local Shopify Server

`shopify-mcp.js` implements the MCP stdio protocol, exposing 6 Shopify tools to Claude Code. This enables Claude Code itself to query the store during development — useful for debugging, testing prompts with real data, and running ad-hoc queries without writing code.

| Tool | Returns | Token default |
|------|---------|--------------|
| `get_shop_info` | Name, currency, plan | `fields: "name,currency"` |
| `get_products` | Product list | `limit: 10, fields: "title,variants"` |
| `get_orders` | Order list | `limit: 10, created_at_min: 7d` |
| `get_customers` | Customer list | `limit: 20, fields: "name,orders_count"` |
| `get_inventory` | Product + variant + stock | `limit: 20` |
| `get_sales_summary` | Revenue + order count (aggregated) | No pagination — server aggregates |

Registered in `.mcp.json` (gitignored). Activated via `enableAllProjectMcpServers: true` in Claude Code settings.

### 3.9 MCP Token Optimization — The Token Tax Protocol

Every MCP tool response carries a **token tax**: the cost of transmitting raw API data through the LLM context window. Unoptimised, a single `get_orders` call with `limit: 250` returns ~14,000 tokens of JSON that Claude must process before it can answer a simple revenue question. We reduced this by ~90% through four techniques:

#### Technique 1 — Aggregated endpoints over raw lists

The most impactful single change. For revenue queries, `get_sales_summary` returns 5 fields computed server-side vs 250 full order objects.

| Call | Tokens | Cost |
|------|--------|------|
| `get_orders?limit=250` | ~14,000 | ~$0.042 |
| `get_sales_summary` | ~60 | ~$0.00018 |
| **Reduction** | **99.6%** | |

Rule: never ask an LLM to sum a list. Do the arithmetic in the tool and return the answer.

#### Technique 2 — Server-side fields filtering

Every tool in `shopify-mcp.js` accepts a `fields` parameter. A `pick()` helper filters the Shopify response before returning it:

```javascript
// pick(obj, ['title', 'variants.inventory_quantity'])
// Strips all fields not in the list — including nested objects

❌ Full product object  →  ~800 tokens
✅ pick(product, ['title','variants.inventory_quantity'])  →  ~40 tokens
Reduction: 95%
```

Default field sets are defined per tool so callers get safe defaults without thinking about it.

#### Technique 3 — Time-scoped queries by default

Every order and customer query defaults to a 7-day window via `created_at_min`. Fetching all-time data is never the right answer for a weekly intelligence report.

```
❌ orders.json           → all orders ever → unpredictable token count
✅ orders.json?created_at_min=7d → this week only → bounded token count
```

#### Technique 4 — Compressed agent context

Agents receive plain-text summaries, not raw JSON objects. The `shopSummary` string passed to each agent is ~150 tokens. The equivalent raw `fetchShopify()` JSON is ~1,200 tokens.

```
Store: Vendant
Revenue 7d: $1,048 (13 orders, AOV $80.62)
Top products: Canvas Tote Natural [sold:4, inv:8] | Eco Pin Set [sold:2, inv:338]
Alerts: Canvas Tote (CT-NAT-001) — only 8 left
Segments: repeat=0 lapsed=15 new=15
```

87% reduction per agent call. Across 5 agents, this saves ~5,250 tokens per run.

#### Combined impact

| Version | Architecture | Input tokens/run | Cost/run |
|---------|-------------|-----------------|----------|
| Naive | All Sonnet, raw JSON to every agent | ~28,000 | ~$0.084 |
| Optimised | Model routing + compressed context | ~8,400 | ~$0.025 |
| + Cache | No re-fetch on same session | ~7,200 | ~$0.022 |
| **Total reduction** | | **74%** | **74%** |

These techniques apply to any MCP integration, not just Shopify. The general rule: **minimise what crosses the context boundary**. The LLM should receive the answer to a sub-question, not the raw data to compute it from.

### 3.10 Full Transparency — The Intelligence Trace

The Trace panel streams every agent call, every response, and every token cost in real time. This is not a debug tool — it's the **primary trust mechanism**. When merchants see the reasoning chain that produced their campaign, they're more willing to launch it.

Every log line is colour-coded by agent. `→` shows what was sent. `←` shows what came back (truncated to 120 chars for readability). Auto-scrolls. Collapsible for clean review mode.

---

## 4. Target Users

### 4.1 Primary — Solo Shopify Merchant

**Profile:**
- 1–5 person operation, $10K–$500K annual Shopify revenue
- Has Klaviyo or an email tool but uses it 2x/month, not weekly
- No dedicated marketing hire
- Spends 5+ hours/week on "marketing stuff" that doesn't move the needle
- Has tried ChatGPT for copy — helps but requires constant prompt writing

**Jobs to be done:**
- Know what's worth promoting this week without pulling 4 reports
- Have campaign copy that connects to what's actually trending in their store
- Look consistent on Email, Instagram, and TikTok without a content team

**Willingness to pay:** $29–$99/month

### 4.2 Secondary — Shopify Agency / Fractional CMO

**Profile:**
- Manages 5–20 Shopify stores for clients
- Currently produces weekly marketing recommendations via spreadsheets + Klaviyo + manual copy review
- 3-hour weekly process per client

**Value prop:** MailIntel compresses client reporting and campaign generation from 3 hours to 90 seconds.

**Willingness to pay:** $299–$999/month (multi-store access)

---

## 5. Functional Requirements

### 5.1 Intelligence Loop

- **Trigger:** User submits a free-text query (enter key or Run button)
- **Agents:** 5 run in sequence; Activation and Critic run once per action (2 cycles total)
- **FSM states:** `IDLE → RUNNING → DONE`
- **Error handling:** Any agent failure shows an error card in the feed; UI resets to IDLE
- **Concurrency:** Agents run sequentially, not in parallel (dependency chain)

### 5.2 Campaign Cards

Every card must include:
- Campaign title + rationale (from Strategist)
- Critic score bar (1–10, colour-coded, verdict badge)
- Platform tabs: Email · Instagram · TikTok (pill-style, dark active state)
- Platform-specific preview and editable copy
- Audience selector (email only)
- Schedule toggle (Now · Best time · Custom)
- Edit + A/B variant + Launch action bar
- Dismiss (slide-out animation, height collapse)

### 5.3 Email Editor

- Side-by-side layout: AI copy panel (left, 42% width) + rendered preview (right)
- Copy panel shows subject, preview text, body (always-editable textarea), CTA chip, audience selector + stats
- Body textarea edits sync live to both the copy panel display and the rendered preview
- Character limit: 2,000 chars with colour-coded counter (yellow at 90%, red over limit)
- A/B variant: generates alternative subject line via 120-token Claude call

### 5.4 Social Previews

- Instagram: dark-mode post mock with avatar, gradient image placeholder, caption, hashtags, action icons — accurate to real Instagram UI
- TikTok: 9:16 vertical card with gradient bg, hook text overlaid, script, hashtags, sidebar icons (Like/Comment/Share) — accurate to real TikTok UI

### 5.5 Trace Panel

- Right side, 300px default width, collapsible to 0 via toggle
- Per-agent colour coding from `AGENT_THEMES` (source of truth)
- `→` (sent) and `←` (received) notation per line
- 30ms stagger on line entry animation; auto-scroll on new lines
- Persist content across the full run; clear on new run

### 5.6 Cost Counter

- Updates after every API call (input tokens + output tokens)
- Colour thresholds: `< $0.02` white → `< $0.05` brand yellow → `< $0.10` amber → `≥ $0.10` red
- Displayed in header at all times — never hidden

### 5.7 Data Modes

| Mode | Source | Shape |
|---|---|---|
| Mock (default) | `MOCK_SHOPIFY_DATA` in `mock-data.js` | `{ store_name, summary, top_products, alerts, customer_segments }` |
| Live | Shopify Admin REST API `2026-01` | Same shape (normalised by `fetchShopify()`) |

Agents are mode-agnostic — they receive identical JSON regardless of source.

---

## 6. Non-Functional Requirements

| Constraint | Requirement |
|---|---|
| File structure | All runtime code in `index.html`. Reference specs in `.js` and `.md` files — not imported |
| Build tooling | None. No npm, no bundler, no compilation step |
| API key storage | `sessionStorage` only — key `mi_api_key`. Never `localStorage`. Never disk |
| Shopify key storage | `sessionStorage` only — `mi_shopify_url`, `mi_shopify_token`. Injected by dev-server, cleared on tab close |
| Anthropic API calls | Direct browser fetch with `anthropic-dangerous-direct-browser-access: true` (demo only; production should proxy) |
| Shopify API calls | All calls route through `/shopify-proxy` in `dev-server.js` — browser cannot call Shopify Admin API directly (CORS) |
| MCP calls | Via stdio MCP server (`shopify-mcp.js`). Credentials passed as CLI args, never hardcoded. Config in `.mcp.json` (gitignored) |
| MCP token budget | Always pass `fields` on tool calls. Use `get_sales_summary` over `get_orders` for revenue. Default `limit: 10`. Default `created_at_min: 7d` on orders |
| Runtime dependencies | Zero npm packages at runtime. `puppeteer` and `dev-server.js` are dev-only |
| Agent output | JSON only, no markdown. Parsed by `parseJ()` which strips fences and extracts first `{...}` block |
| Agent context | Plain-text summaries only — never raw JSON objects. Max ~150 tokens per context block |
| Fonts | Syne + JetBrains Mono + DM Sans only. No Inter, Roboto, Arial, or system fonts |
| Secrets | `.env` and `.mcp.json` are gitignored. No API keys, tokens, or store URLs in any committed file |

---

## 7. Success Metrics

| Metric | Target | Current (v1 demo) |
|---|---|---|
| Time to insight | 70% reduction (5 hrs/week → ~5 min) | ~90 seconds |
| Insight-to-campaign latency | < 60 seconds | ~90 seconds (API-dependent) |
| Cost per full run | < $0.05 | ~$0.04 |
| Critic approval rate | > 80% on first pass | ~90% in testing |
| Campaign launch rate | > 50% of surfaced cards | Not yet measured |

---

## 8. Hard Constraints (Non-Negotiable)

These are product constraints enforced at the prompt, UI, and code level:

1. Never say "Mailchimp" — anywhere: UI, logs, prompts, variable names
2. Never say "based on your data" — say "We've identified a growth opportunity"
3. Never execute any action without explicit user approval click
4. Never hardcode store data outside of `mock-data.js`
5. Never surface a campaign card that hasn't passed the Critic agent
6. Never use Inter, Roboto, Arial, or system fonts — Syne + JetBrains Mono + DM Sans only
7. Always update the cost counter after every Claude API response
8. Always show agent badge colour from `AGENT_THEMES` on trace lines and cards
9. The product is always called MailIntel — never "the app", "the tool", or "the system"

---

## 9. Roadmap

### v1 — Demo-Complete
- Mock Shopify data with all 5 agents
- Email + Instagram + TikTok campaign cards
- Critic scoring, A/B variants, audience selector, schedule toggle
- Side-by-side email editor with live preview sync
- Intelligence Trace panel (collapsible, right side)
- Dev server with `.env` key injection
- Direct browser API (demo mode)

### v1.1 — Current
- **Chat interface** — conversational Q&A (Haiku) separated from campaign generation (5-agent loop)
- **Live Shopify integration** — real orders, products, customers via Admin REST API `2026-01`
- **CORS proxy** — `dev-server.js` `/shopify-proxy` endpoint forwards Shopify API calls server-side
- **MCP server** — `shopify-mcp.js` stdio MCP server with 6 tools, registered in `.mcp.json`
- **Token optimization** — fields filtering, `get_sales_summary`, compressed agent context, model routing → 74% cost reduction
- **Store data caching** — single fetch per session, reused across chat and agent calls
- **Live metrics bar + header chips** — revenue, orders, products, low-stock count populated from Shopify
- **Seed script** — `seed-shopify.js` populates a Shopify store with 8 products, 12 customers, 13 orders
- **Orchestrator confirm step** — intent detection routes to cheap Haiku confirmation before spending Sonnet tokens

### v2 — Production
- Real Shopify Admin API integration (OAuth flow, read-only scopes)
- Klaviyo integration — actual email send, not mock
- Meta Graph API — actual Instagram post scheduling
- Backend proxy for API key (replace direct browser access)
- Session persistence (campaigns saved between reloads)
- Multi-store support

### v3 — Growth
- TikTok for Business API integration
- Webhook-triggered intelligence: "alert me when inventory drops below threshold"
- Competitor trend awareness via web search tool
- White-label for agencies (multi-store dashboard, client management)
- Canva MCP integration for live creative asset awareness

---

## 10. Out of Scope (v1)

- Real email sending (mock success animation only)
- Real Instagram or TikTok posting
- User authentication or accounts
- Multi-store support
- Persistent session history
- Mobile layout optimisation

---

*MailIntel MVP — April 2026 · ~$0.04/run · built to close the gap between data and action.*
