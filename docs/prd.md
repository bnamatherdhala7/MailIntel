# MailIntel — Product Requirements Document

**Version:** 1.2 · **Date:** April 2026 · **Status:** MVP Complete

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

### 2.2 The Competitive Landscape

The market breaks into four categories of tool. Each solves a piece of the problem. None connects all the pieces.

| Capability | Klaviyo | Omnisend | Triple Whale | Shopify Magic | Jasper / Copy.ai | ChatGPT / Claude.ai | Agency Retainer | **MailIntel** |
|---|---|---|---|---|---|---|---|---|
| Reads live Shopify signals | Partial | Partial | ✓ | Limited | ✗ | ✗ | ✓ | **✓** |
| Detects what to act on | ✗ | ✗ | ✓ (Q&A only) | ✗ | ✗ | ✗ | ✓ | **✓ (automatic)** |
| Explains the strategic why | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | **✓** |
| Writes copy grounded in signals | ✗ | ✗ | ✗ | ✗ | ✓ (generic) | ✓ (generic) | ✓ | **✓ (signal-grounded)** |
| Email + Instagram + TikTok in one run | ✗ | ✗ | ✗ | ✗ | Manual per channel | Manual per channel | ✓ | **✓** |
| Live market trend awareness | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Sometimes | **✓ (Brave Search)** |
| Quality gate before copy reaches user | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ (human) | **✓ (Critic agent)** |
| Zero prompt engineering required | ✗ | ✗ | Partial | ✓ | ✗ | ✗ | ✓ | **✓** |
| Time to launchable campaign | Days | Days | N/A | N/A | 10–30 min | 5–15 min | 48 hours | **90 seconds** |
| Cost | $20–$700/mo | $15–$300/mo | $50–$300/mo | Included | $39–$125/mo | $20/mo | $3K–10K/mo | **$0.04/run** |

The critical gap: every tool to the left is either **data-only** (reads signals, doesn't act) or **copy-only** (writes words, doesn't know why). The gap between insight and action has never had a product in it — until now.

---

### 2.3 Competitor Profiles

#### Klaviyo — The Dominant Email Platform

Klaviyo is the default email and SMS tool for serious Shopify merchants. Its deep Shopify integration, advanced segmentation engine, and automation flows make it genuinely powerful for execution. It knows who your customers are, when they last bought, and what they responded to.

**Where it stops:** Klaviyo assumes you already know what to send. It provides no signal detection, no strategic reasoning, and no cross-channel copy generation. A merchant still needs to notice that Canvas Totes are trending up and stock is low, decide that warrants an urgency email, write the copy, and set up the flow. Klaviyo delivers the email; it does nothing to decide that the email should exist. Its "AI" features as of 2025 are limited to subject line A/B testing — there is no generative copy, no multi-agent reasoning, and no market trend awareness.

**Pricing:** $20–$700/month based on contact list size. Cost scales with your audience, not your output quality.

**Relationship to MailIntel:** Complementary at v2 (MailIntel generates the strategy and copy; Klaviyo executes the send). Competitive at the insight layer — merchants who rely heavily on Klaviyo flows believe they have solved the automation problem. They haven't solved the discovery problem.

---

#### Triple Whale (Moby AI) — The Analytics Intelligence Layer

Triple Whale is an analytics and attribution platform built specifically for Shopify. Its Moby AI layer lets merchants ask natural-language questions about their store performance — "What drove revenue last week?" "Which products are underperforming?" — and get structured, data-backed answers. For merchants who find Shopify Analytics insufficient and GA4 overwhelming, it's a meaningful step forward.

**Where it stops:** Triple Whale identifies what happened and why. It does not tell you what to do about it, and it cannot act. Moby will tell you that Canvas Totes have the highest velocity this week — it will not write the urgency email, draft the Instagram caption, or produce the TikTok hook. The gap between its output (insight) and a launched campaign is identical to the gap before it existed.

**Pricing:** ~$50–$300/month depending on plan tier and store volume.

**Relationship to MailIntel:** MailIntel lives in the space between Triple Whale's insight and Klaviyo's execution. If Triple Whale is the "what happened", MailIntel is the "what to do now." They are theoretically stackable, but MailIntel makes Triple Whale redundant for SMBs who just need actionable weekly intelligence, not deep attribution modelling.

---

#### Shopify Magic — The Platform-Native Risk

Shopify Magic is Shopify's built-in AI layer, embedded throughout the admin experience. It generates product descriptions, rewrites email draft text, and creates variant images. Its tight integration — no setup, no API key, no workflow — gives it a distribution advantage no third-party tool can match.

**Where it stops:** Shopify Magic is task-level, not system-level. It helps you write a product description when you're on the product page. It doesn't know that the product in question is trending up 34% while stock is critically low, that lapsed customers bought it six months ago, and that market trends are pointing toward eco-canvas products this spring. It has no cross-signal reasoning, no strategy layer, and no multi-channel output. Each AI interaction is isolated — there is no memory, no pipeline, no Critic gate.

**Pricing:** Included with Shopify plan (no additional charge).

**Relationship to MailIntel:** The platform risk. Shopify could, in theory, build what MailIntel does — it has the data, the distribution, and the budget. The counter-argument: Shopify's AI roadmap is product-management tooling (descriptions, images, admin summaries), not marketing intelligence. And the five-agent sequential reasoning pipeline is a non-trivial engineering investment that sits outside Shopify's core commerce competency. The window exists.

---

#### Jasper / Copy.ai — The AI Copywriting Tools

Jasper and Copy.ai are general-purpose AI writing platforms with templates and brand voice training for marketing teams. They produce high-quality copy across email, social, ad creative, and long-form content. For teams that know what they want to write, they significantly reduce production time.

**Where they stop:** Both require the human to provide the strategy. You must tell Jasper that Canvas Totes are trending before it can help you write about them. There is no Shopify integration, no signal detection, no Strategist reasoning about which signal warrants action. The blank page problem — the strategic blank page that precedes the copywriting blank page — is left entirely to the user. Additionally, running Email + Instagram + TikTok copy through these tools means three separate prompt sessions with three separate quality checks.

**Pricing:** Jasper: $39–$125/month. Copy.ai: $49–$499/month depending on team size.

**Relationship to MailIntel:** MailIntel is what these tools would be if they could read your store. The copy quality is comparable; the fundamental difference is that MailIntel's copy is causally connected to a specific signal — and that signal is surfaced automatically, not provided by the user.

---

#### Omnisend — The Ecommerce Automation Platform

Omnisend sits between entry-level email tools and the complexity of Klaviyo. It supports email, SMS, push notifications, and WhatsApp through workflow automation and pre-built templates designed specifically for ecommerce events: abandoned cart, welcome series, post-purchase follow-up. Its Shopify integration is solid, and its pricing is accessible for early-stage merchants.

**Where it stops:** Omnisend's automation is entirely rules-based. It fires when a defined trigger occurs — cart abandoned, product viewed, purchase completed. It has no model for discovering opportunistic campaigns: "Canvas Totes are trending up, stock is low, and lapsed customers who bought eco products 6 months ago haven't been messaged — launch an urgency campaign." No rule can be written for that because the merchant doesn't know the pattern exists. Omnisend's limited AI features (subject line suggestions, basic copy assist as of 2025) are additive, not transformative.

**Pricing:** Free tier up to 500 contacts; $15–$300+/month depending on list size and SMS volume.

**Relationship to MailIntel:** Omnisend and MailIntel serve the same merchant size but solve different problems. Omnisend handles always-on triggered flows. MailIntel handles opportunistic signal-driven campaigns. A mature merchant uses both — Omnisend for automation, MailIntel for intelligence.

---

### 2.4 The Positioning Argument

The gap in this market is not a missing feature — it's a missing **layer**. Every tool above operates in one of three zones:

```
ZONE 1 — DATA         ZONE 2 — STRATEGY       ZONE 3 — EXECUTION
─────────────────     ───────────────────      ─────────────────────
Shopify Analytics     [ EMPTY ]                Klaviyo
Triple Whale                                   Omnisend
Shopify Magic                                  Jasper / Copy.ai
(partial insight)                              ChatGPT / Claude.ai
```

**MailIntel occupies Zone 2 and bridges into both Zone 1 and Zone 3.** It reads the data, reasons about what it means, and produces execution-ready output — in a single 90-second loop.

The incumbents cannot easily move into Zone 2:
- **Klaviyo and Omnisend** would need to build a reasoning layer on top of their execution infrastructure — a non-trivial investment with unclear monetisation inside a subscription pricing model
- **Triple Whale** would need to build an execution layer, which requires direct integrations with email providers and social APIs they currently have no incentive to build
- **Shopify Magic** is constrained by Shopify's roadmap prioritisation and its task-level product philosophy
- **Jasper / Copy.ai** would need commerce data integrations that are outside their horizontal product scope

The window to own Zone 2 is open.

---

### 2.5 The Timing Unlock

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

### 3.5 The Critic Loop — Sequential Reasoning by Design

The Critic agent is the only way to deliver professional-grade copy at volume without human review of every output. It uses a **5-step sequential reasoning chain** (powered by the `@modelcontextprotocol/server-sequential-thinking` MCP) before producing its final JSON score:

```
STEP 1 — TONE CHECK
  Is the language warm and direct? Flag jargon ("synergy", "leverage", "game-changer").

STEP 2 — NAMING VIOLATIONS CHECK
  Scan for banned phrases: "based on your data", "your customers", "Mailchimp", "newsletter".
  Any match → score cannot exceed 6.

STEP 3 — ACCURACY CHECK
  Does the copy directly reference the product, trend, or urgency that triggered this action?
  Generic copy scores maximum 7.

STEP 4 — CONCIERGE QUALITY CHECK
  Would a trusted advisor who knows this store have written this?
  Specific product names + real signals + concrete CTAs score higher.

STEP 5 — FINAL OUTPUT
  {"approved": true, "score": 9, "issues": [], "revised_copy": null}
```

Score ≥ 8 and no violations → approved as-is. Score < 8 → the Critic returns a `revised_copy` in the same JSON structure, and the card renders the revised version. The user always sees the best version.

**Sequential reasoning prevents the most common LLM failure mode in copy evaluation: skipping checks when the copy "looks good"**. By forcing explicit reasoning through each criterion before committing to a score, the Critic catches subtle violations that a direct scoring call misses.

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

### 3.8 MCP Integration — Three Connected Servers

MailIntel registers three MCP servers in `.mcp.json` (gitignored). Two serve the runtime app directly via proxy; one serves Claude Code during development.

#### 3.8.1 Shopify MCP (`shopify-mcp.js`)

Local stdio server implementing the MCP protocol and exposing 6 Shopify Admin REST tools to Claude Code. Useful for development-time queries, prompt testing against real data, and ad-hoc store analysis without writing code.

| Tool | Returns | Token default |
|------|---------|--------------|
| `get_shop_info` | Name, currency, plan | `fields: "name,currency"` |
| `get_products` | Product list | `limit: 10, fields: "title,variants"` |
| `get_orders` | Order list | `limit: 10, created_at_min: 7d` |
| `get_customers` | Customer list | `limit: 20, fields: "name,orders_count"` |
| `get_inventory` | Product + variant + stock | `limit: 20` |
| `get_sales_summary` | Revenue + order count (aggregated) | Server-side aggregation — no raw list |

#### 3.8.2 Brave Search MCP (`@modelcontextprotocol/server-brave-search`)

Provides live web search for market trend signals. In the runtime app, Brave Search is accessed via `/brave-proxy` in `dev-server.js` (which handles gzip decompression and CORS). The MCP registration makes the same capability available to Claude Code for research tasks during development.

**Runtime usage pattern:**
```
1 search query constructed from: winning product + current month + "trend ecommerce"
1 Brave Search call → 4 results → compressed to bullet list (~200 tokens)
Same bullet list reused across:
  → Strategist prompt   (shapes strategy rationale)
  → Activation prompt   (makes copy timely and specific)
  → Market Context strip on each campaign card (user-visible)
```

Zero additional API calls. One search, three surfaces.

**Market Context strip** — a collapsible teal section on every campaign card showing the Brave Search bullets that shaped the copy. Gives merchants visibility into what external signal drove the campaign angle, increasing trust and launch confidence.

#### 3.8.3 Sequential Thinking MCP (`@modelcontextprotocol/server-sequential-thinking`)

Forces multi-step reasoning in the Critic agent before committing to a score. Rather than a direct "score this copy" prompt, the Critic is structured as a 5-step chain (see §3.5). The sequential-thinking MCP server makes this pattern available to Claude Code for any complex evaluation task during development.

**Why this matters architecturally:** The most common LLM failure mode in copy evaluation is skipping checks when copy "looks plausible". Sequential reasoning makes each criterion a mandatory step — you cannot reach STEP 5 without having explicitly worked through STEPS 1–4.

All three servers are registered in `.mcp.json` (gitignored). Activated via `enableAllProjectMcpServers: true` in Claude Code settings.

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

### 4.3 Pain Hierarchy — Why We Built in This Order

The three problems in Section 1 are not equally acute. A PM who treats them as equal builds the wrong thing first.

| Pain | Who feels it most | Frequency | Severity | v1 priority |
|---|---|---|---|---|
| **Synthesis paralysis** — too many dashboards, no one tells you what matters | Solo founders, 1–5 person teams | Weekly | High — decisions get delayed or skipped entirely | **P0** |
| **The blank page** — no idea what to write when they do decide to act | All merchants | Every campaign | Medium — workarounds exist (ChatGPT, templates) | **P0** |
| **The McKinsey gap** — no strategist to connect signals to opportunities | Growing merchants, $100K+ revenue | Monthly | High — wrong campaigns launched, real opportunities missed | **P0** |

**Why all three are P0:** They compound. A tool that identifies signals but can't write copy leaves the merchant at the blank page. A tool that writes copy without reading signals produces generic campaigns that underperform. The value is entirely in the complete loop — synthesis → strategy → execution — and the loop breaks if any piece is missing. This is why v1 ships all five agents together, not as a phased rollout.

**What we deliberately deprioritised:**
- Real-time push notifications ("alert me when stock drops below 10 units") — high value, but requires webhooks, persistent backend, and session state. Would have doubled scope without improving the core 90-second loop. Moved to v3.
- Mobile layout — the primary use case is weekly desktop review sessions. Mobile is a v2 consideration after the desktop loop is validated.
- Multi-store management — an agency feature that requires per-store context isolation. Delivering it in v1 would have delayed the core product for a minority user segment.

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

### 7.1 North Star Metric

**Incremental Revenue per User (ARPU)**

> Our goal is to prove that a MailIntel user generates 15–20% more revenue than a standard user by identifying "hidden" opportunities — like $15,000 in open draft orders — and acting on them within 90 seconds.

This is the single metric that transforms MailIntel from a productivity feature into a profit-centre argument for leadership.

---

### 7.2 Feature-Level KPIs — Engine Performance

These metrics prove the multi-agent system is working efficiently.

| KPI | Definition | Target | Current (v1) |
|---|---|---|---|
| **Time-to-Activation (TTA)** | Time from business signal detection to "Ready-to-Send" campaign card | < 2 minutes | ~90 seconds |
| **Agent Success Rate (ASR)** | % of runs where the Critic approves copy on the first pass | > 80% | ~90% in testing |
| **Inference Efficiency (Cost/Action)** | Average Anthropic API cost per generated campaign | < $0.05 | ~$0.022 |
| **Insight-to-campaign latency** | Time from query submission to campaign card render | < 60 seconds | ~90 seconds (API-dependent) |
| **Campaign launch rate** | % of surfaced cards that the user approves and schedules | > 50% | Not yet measured |

**Diagnostic value:** If ASR drops, it signals that the Activation agent's system prompts need tuning — not that the system is broken. Tracking it separately from TTA isolates where the quality regression is.

---

### 7.3 Strategic Business KPIs — Revenue Impact

These metrics prove MailIntel drives the core business and matter to leadership.

| KPI | Definition | Why It Matters |
|---|---|---|
| **GMV Contribution** | Actual dollar value of sales generated through MailIntel-suggested campaigns | Transforms MailIntel from an "expense" line to a measurable profit centre — the key argument for premium pricing |
| **Feature-Led Retention (Stickiness)** | Churn rate of users who have activated MailIntel vs. those who haven't | Users who rely on AI to surface revenue opportunities are significantly harder to churn — this is the defensibility moat |
| **Campaign Frequency Lift** | Increase in quality campaigns sent per month per user | Many SMBs send 1 email/month due to lack of strategy. MailIntel targets 4+ context-aware sends — each grounded in a live signal |

---

### 7.4 Legacy vs. Agentic — KPI Comparison

| Metric | Traditional Automation | MailIntel (Agentic) |
|---|---|---|
| User effort | High — setting up logic gates, segments, templates | Low — reviewing and approving AI-generated campaigns |
| Optimisation loop | Manual A/B testing (days to significance) | Self-optimising via Critic agent (pre-publish revision) |
| Insight type | Descriptive — *what happened* | Prescriptive — *what to do now* |
| Primary success goal | Open rates, click rates | Revenue recovery (GMV) |
| Signal → action latency | 7 days (average SMB) | 90 seconds |

---

### 7.5 Counter-Metric (Negative Signal)

**Campaign Fatigue:** Monitor whether increased AI-generated send frequency causes an increase in unsubscribe rates.

**Planned v2 mitigation:** The Orchestrator agent will track segment recency — it will not propose an action targeting the same segment within a 48-hour window. This prevents the system from optimising for frequency at the expense of relationship quality. Requires persistent session history (out of scope for v1; targeted for v2).

Surfacing this counter-metric in reporting demonstrates that MailIntel optimises for long-term merchant revenue, not vanity engagement numbers.

---

## 8. Pricing Strategy & Business Model

### 8.1 The Core Trade-Off: Per-Run vs Subscription

The raw API cost per run is ~$0.022. Charging per-run is honest but creates two problems: it makes merchants hesitate before each run ("is this worth it?"), and $0.022 is not a monetisable price point without a margin layer. The right model is **subscription with included runs** — removes hesitation, scales predictably, and creates habit.

### 8.2 Proposed Tier Structure

| Tier | Price | Runs/month | Target user |
|---|---|---|---|
| **Starter** | $29/mo | 20 runs | Solo merchants, 1–2 campaigns/week |
| **Growth** | $49/mo | 50 runs | Active merchants, daily chat + weekly campaigns |
| **Agency** | $299/mo | Unlimited (5 stores) | Fractional CMOs, Shopify agencies |

**Free tier:** First 3 full runs free, no credit card required. Creates the habit loop before the paywall — merchants experience the value (90-second campaign) before committing.

### 8.3 Unit Economics

| Tier | Price | API cost/user/month | Gross margin |
|---|---|---|---|
| Starter (20 runs) | $29 | ~$0.44 | ~98.5% |
| Growth (50 runs) | $49 | ~$1.10 | ~97.8% |
| Agency (unlimited, 5 stores avg 30 runs each) | $299 | ~$3.30 | ~98.9% |

The economics are exceptional because the cost driver is API tokens, not human labour. Heavy usage is still profitable.

### 8.4 ARPU Ceiling & Market Sizing

- 2M+ Shopify merchants globally
- 35% AI tool adoption (2025) → ~700,000 AI-open merchants
- Conservative 2% MailIntel penetration at scale → 14,000 paying users
- Blended ARPU at $45/month → **$630K ARR** at 2% penetration
- Agency tier upside: 500 agencies at $299/month → **$1.8M ARR incremental**

The more defensible business model argument: MailIntel is not priced as a tool — it's priced as a percentage of the revenue it helps recover. A single $4,000 draft order converted pays for 137 months of the Growth plan. The ROI argument sells itself.

### 8.5 What We Don't Do

- No per-seat pricing — SMBs are single-user; seats add friction without value
- No usage overage charges — anxiety-inducing and destroys the "just run it" habit
- No annual-only pricing at launch — removes the low-commitment entry point needed for PLG

---

## 9. Assumptions & Risk Register

Every assumption below is something that must be true for MailIntel to succeed. If any turns out to be wrong, the response is noted.

| # | Assumption | What happens if it's wrong | Mitigation |
|---|---|---|---|
| **A1** | Merchants will trust AI-generated copy enough to launch it | Approval rate stays <20%; product feels like a novelty | Critic transparency (score + reasoning visible), edit-before-launch always available, Intelligence Trace shows the full reasoning chain |
| **A2** | The 90-second loop creates a weekly habit | Merchants run once, don't return; churn after free trial | Chat interface creates daily touchpoints (store Q&A at ~$0.00015/answer) even when campaigns aren't needed — builds habit independent of campaign generation |
| **A3** | Shopify API access is stable and sufficient for signal extraction | API terms change, rate limits tighten, or Shopify acquires a direct competitor | Read-only scopes minimise risk; MCP architecture makes data sources swappable; Shopify has structural incentive to support partner ecosystem |
| **A4** | Claude's output quality and pricing remain viable at $0.04/run | Model price increase >3× breaks the cost thesis | Multi-model routing already in place (Haiku for routing/critique, Sonnet for strategy/copy); architecture is model-agnostic — could swap providers |
| **A5** | SMBs will pay $29–$49/month for AI marketing intelligence | Price sensitivity kills conversion; merchants stay on free tier | Comparable to Canva Pro ($13/mo) and Jasper ($39/mo), which SMBs already pay; value framing is revenue recovered, not cost incurred — one converted $500 order pays for a year |
| **A6** | Critic agent quality gate is calibrated correctly | Critic too lenient → bad copy reaches users and erodes trust; Critic too strict → good copy gets revised and loop takes longer | Current ~90% first-pass approval rate needs ground truth comparison; plan to A/B test Critic strictness across cohorts in v2 |
| **A7** | Brave Search trend data materially improves campaign quality | Trend bullets are generic or irrelevant; adds latency without quality lift | Compressed to ~200 tokens before agent use; Strategist + Activation both evaluate relevance; feature is toggleable if latency-to-quality ratio is poor |

**Kill risks** — scenarios that would require fundamental strategy rethinking:

| Risk | Likelihood | Response |
|---|---|---|
| Anthropic raises API pricing by >5× | Low (2026 timeline) | Evaluate fine-tuned open-source model; cost thesis still works at 3× increase |
| Shopify builds this natively (Shopify Magic v3) | Medium (12–24 month horizon) | Accelerate v2 Klaviyo integration; moat shifts from data access to cross-channel execution quality |
| SMB AI fatigue — merchants distrust AI-generated marketing | Low-Medium | Lean harder into transparency (Trace panel) and human-in-the-loop gates; never auto-launch |

---

## 10. Open Questions

These are the genuine unknowns that would change product decisions if answered differently. They are not open because we haven't thought about them — they are open because we need data.

**Q1 — Proactive vs. On-demand**
The current experience is pull-based: merchant asks, agents run. The highest-value version might be push: MailIntel detects a signal (stock dropping, lapsed segment growing) and proactively surfaces it on Monday morning. But unsolicited AI output could feel intrusive. Does proactive delivery increase launch rates or increase unsubscribes? We don't know yet.

**Q2 — Critic calibration**
The Critic approves ~90% of first-pass copies. Is this a sign that the Activation agent is excellent, or that the Critic is too lenient? We don't have ground truth data — no human reviewer has scored the same outputs for comparison. The right calibration requires a blind human review study in v2.

**Q3 — The data flywheel**
If MailIntel runs across 10,000 stores, the aggregate signal data (anonymised) becomes valuable: which categories are trending, which SMB sectors are underperforming, what campaigns convert in which seasons. Is there a B2B data licensing play? Or does even hinting at aggregate data use destroy the individual merchant trust that makes the product work?

**Q4 — Agency tier design**
Agencies managing 20 stores need per-store brand voice, per-client campaign history, and separate reporting views. None of this exists in v1. The question is not whether to build it — it's at what store count the current single-store architecture breaks down, and what the minimum viable agency feature set looks like without derailing the core SMB roadmap.

**Q5 — The right query UX**
The current input is deliberately freeform — one question, no configuration. As merchants become more sophisticated, they may want to constrain the agents: "focus only on lapsed customers this week, ignore inventory." But adding configuration options risks undermining the core promise of zero cognitive load. Where is the line between useful control and UX complexity that kills adoption?

---

## 11. Hard Constraints (Non-Negotiable)

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

## 12. Roadmap

### Prioritisation Rationale — Why This Order

The sequencing of v1 → v1.1 → v2 → v3 reflects three principles:

1. **Validate the loop before building the pipes.** The five-agent reasoning chain is the core IP. Proving it works with mock data costs $0 and takes one afternoon. Building live Shopify integration before the loop was validated would have been premature investment in infrastructure.

2. **Add live data only after the experience is right.** v1.1 adds live Shopify + chat because the v1 demo proved the loop. But live data only matters if the experience it powers is compelling — so the experience came first.

3. **Send-side integrations (Klaviyo, Meta) are v2, not v1.** A product that generates brilliant copy but can't actually send it is still a complete demo. A product that sends mediocre copy is a liability. Quality of output must be validated before connecting to real send infrastructure.

**What got cut from v1 and why:**

| Cut feature | Why cut | When it returns |
|---|---|---|
| Real email sending via Klaviyo | Risk: bad AI copy going to real customers before Critic is calibrated | v2, after Critic accuracy is validated |
| Real-time inventory webhooks | Requires persistent backend service — doubles infrastructure scope | v3 |
| User accounts + session persistence | No auth needed for a demo; premature investment in identity infrastructure | v2 |
| Mobile layout | Desktop-first use case (weekly review session); mobile adds design complexity without changing the core loop | v2 |
| Multi-store support | Requires per-store context isolation and a fundamentally different data model | v3 (Agency) |
| TikTok for Business API | API access is restricted and application-gated; not worth the dependency at demo stage | v3 |

---

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
- **Token optimisation** — fields filtering, `get_sales_summary`, compressed agent context, model routing → 74% cost reduction
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
- White-label for agencies (multi-store dashboard, client management)
- Canva MCP integration for live creative asset awareness

---

## 13. Out of Scope (v1)

- Real email sending (mock success animation only)
- Real Instagram or TikTok posting
- User authentication or accounts
- Multi-store support
- Persistent session history
- Mobile layout optimisation

---

*MailIntel MVP — April 2026 · ~$0.04/run · built to close the gap between data and action.*
