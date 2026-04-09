# CLAUDE.md — MailIntel
> The authoritative spec. Read this entire file before touching any code.

---

## What Is MailIntel

A single-page demo app (one HTML file, no build tools) that acts as a **Central Brain for SMB commerce**. It ingests Shopify signals, runs 5 AI agents in sequence, and surfaces ready-to-approve campaigns across Email, Instagram, and TikTok.

**Demo scenario:** User asks for a business health check. 5 agents run in ~90 seconds. 2 campaign cards appear. User edits, schedules, and launches with one click.

**Stack:** Vanilla HTML + CSS + JS · Anthropic API (raw fetch) · Google Fonts CDN  
**Model:** `claude-sonnet-4-6` · Max 1000 tokens per agent call  
**Cost per demo run:** ~$0.04

---

## Hard Rules

| # | Rule |
|---|------|
| 1 | NEVER say "Mailchimp" — anywhere: UI, logs, prompts, variable names |
| 2 | NEVER say "based on your data" — say "We've identified a growth opportunity" |
| 3 | NEVER execute an action without an explicit user approval click |
| 4 | NEVER hardcode data outside of `mock-data.js` |
| 5 | NEVER surface a campaign card that hasn't passed the Critic agent |
| 6 | NEVER use Inter, Roboto, Arial, or system fonts — use Syne + JetBrains Mono + DM Sans only |
| 7 | ALWAYS update the cost counter after every Claude API response |
| 8 | ALWAYS show agent badge colour from `AGENT_THEMES` on every trace line and card |
| 9 | The product is always called **MailIntel** — never "the app", "the tool", or "the system" |

---

## File Structure

```
mailintel/
├── CLAUDE.md           ← this file (spec + WAT)
├── index.html          ← entire app (single file)
├── mock-data.js        ← MOCK_SHOPIFY_DATA + AUDIENCE_SEGMENTS
├── agent-prompts.js    ← all 5 system prompts
├── design-tokens.md    ← colours, fonts, component specs
└── .env                ← ANTHROPIC_API_KEY only
```

> **Single-file rule:** All runtime code lives in `index.html`. The `.js` and `.md` files are reference specs — copy from them into `index.html`, do not import them.

---

## Workflows

The app has one primary workflow: the **Intelligence Loop**.

### Intelligence Loop

```
User query
    │
    ▼
[Orchestrator] ── plans focus + priority ──────────────────────┐
    │                                                           │
    ▼                                                           │
[Signal Analyst] ── reads Shopify data, finds Win + Opportunity │
    │                                                           │
    ▼                                                           │
[Strategist] ── proposes 2 Next Best Actions                   │
    │                                                           │
    ▼  (runs once per action)                                  │
[Activation] ── writes Email + Instagram + TikTok copy         │
    │                                                           │
    ▼                                                           │
[Critic] ── scores copy, approves or revises                   │
    │                                                           │
    ▼                                                           │
Campaign Card rendered in feed ◄───────────────────────────────┘
```

**FSM states:** `IDLE → INGESTING → ANALYZING → STRATEGIZING → AWAITING_APPROVAL → ORCHESTRATING → REVIEWING → ACTIVATING → DONE`

### Data Mode

| Mode | Source | Toggle |
|------|--------|--------|
| `mock` | `MOCK_SHOPIFY_DATA` in `mock-data.js` | "MOCK DATA" pill in header |
| `live` | Shopify Admin REST API (`2026-01`) | "LIVE SHOPIFY" pill — shows domain + token inputs |

---

## Actions

Actions are things users can trigger. Every action requires explicit user input — no auto-execution.

### Run Intelligence Loop
- **Trigger:** Click "Run" button or press Enter in query input
- **Input:** Free-text query (pre-filled with demo query)
- **Output:** Agent narrative cards + campaign cards in feed

### Approve / Launch Campaign
- **Trigger:** Click "Launch campaign" button on a campaign card
- **Options:** Now · Best time (AI-recommended) · Custom datetime
- **Mock mode:** Animate success only — no real API call
- **Live mode:** POST to Zapier webhook or email API

### Edit Copy
- **Trigger:** Click "✏ Edit copy" on campaign card
- **Behaviour:** Reveals textarea for the active platform tab; live-updates the rendered preview on close

### Generate A/B Variant
- **Trigger:** Click "⚡ A/B variant" on campaign card
- **Behaviour:** Calls Claude with a single focused prompt (subject line / caption / hook only), shows variant in teal strip, "Use this variant" swaps it into the live preview

### Select Audience (Email only)
- **Options:** All contacts · Repeat buyers · Lapsed 30d · New this week
- **Behaviour:** Live-updates audience count + estimated revenue on the card

### Dismiss Campaign Card
- **Trigger:** Click "✕" on card header
- **Behaviour:** Slide-out animation, card removed

---

## Tools

### Agent Themes (source of truth)

```javascript
const AGENT_THEMES = {
  ORCHESTRATOR: { name: 'Orchestrator',   color: '#FFE01B', text: '#241C15' },
  ANALYST:      { name: 'Signal Analyst', color: '#007C89', text: '#FFFFFF' },
  STRATEGY:     { name: 'Strategist',     color: '#EF5F33', text: '#FFFFFF' },
  COPY:         { name: 'Activation',     color: '#00A650', text: '#FFFFFF' },
  CRITIC:       { name: 'Critic',         color: '#E47386', text: '#FFFFFF' },
};
```

### Agent Responsibilities

| Agent | Model | Does | Never does |
|-------|-------|------|------------|
| Orchestrator | haiku-4-5 | Parses query, sets focus + priority for Analyst | Fetches data |
| Signal Analyst | haiku-4-5 | Reads Shopify data, finds Win + Opportunity | Makes recommendations |
| Strategist | sonnet-4-6 | Cross-references signals, proposes 2 Next Best Actions | Writes copy |
| Activation | sonnet-4-6 | Writes Email + Instagram + TikTok copy per action | Interprets data |
| Critic | haiku-4-5 | Scores and approves/revises Activation output | Approves its own work |

> See `agent-prompts.js` for full system prompts.

### callAgent(key, query, ctx)

```javascript
async function callAgent(agentKey, userMessage, context) {
  // 1. addTrace(agentKey, '→', 'Processing...')
  // 2. POST to https://api.anthropic.com/v1/messages
  //    - model: 'claude-sonnet-4-6'
  //    - max_tokens: 1000
  //    - system: AGENT_PROMPTS[agentKey]
  //    - messages: [{ role: 'user', content: buildPrompt(agentKey, userMessage, context) }]
  // 3. updateCost(usage.input_tokens, usage.output_tokens)
  // 4. addTrace(agentKey, '←', text.slice(0, 120))
  // 5. return text
}
```

Required header: `'anthropic-dangerous-direct-browser-access': 'true'`

### Cost Tracking

```javascript
const COST_PER_M = { input: 3.00, output: 15.00 }; // claude-sonnet-4-6

function updateCost(inputTokens, outputTokens) {
  sessionCost += (inputTokens / 1_000_000 * COST_PER_M.input)
               + (outputTokens / 1_000_000 * COST_PER_M.output);
  // Color: <$0.10 → brand yellow | <$0.50 → #FF9900 | >$0.50 → #FF4444
}
```

### API Key Storage

- Stored in `sessionStorage` only — key: `mi_api_key`
- Never `localStorage` — must not persist across browser sessions
- Overlay shown on first load if no key present

### Character Limits

| Platform | Limit |
|----------|-------|
| Email body | 2000 chars |
| Instagram caption | 2200 chars |
| TikTok script | 2200 chars |

### Audience Segments (Email)

| Key | Label | Count |
|-----|-------|-------|
| `all` | All contacts | 254 |
| `repeat` | Repeat buyers | 142 |
| `lapsed` | Lapsed 30d | 89 |
| `new` | New this week | 23 |

> See `mock-data.js` for full segment definitions.

---

## MCP Efficiency Rules

When calling any MCP tool (Shopify or otherwise), follow these rules to minimize token usage on tool responses:

### Tool Call Protocol

1. **Use `get_sales_summary` instead of `get_orders`** when you only need revenue/count totals — it returns ~5 fields vs. 250 full order objects
2. **Always pass `fields`** — e.g. `fields: "title,inventory"` instead of receiving full product objects
3. **Always set `limit`** — default to 10 for exploration, only go higher when a count is specifically needed
4. **Scope with `created_at_min`** — never fetch all-time data; default to last 7 days for orders
5. **One tool call per intent** — don't call `get_products` AND `get_inventory` for the same question; `get_inventory` already contains product+variant+stock

### Preferred Call Patterns

| Need | Use | Fields | Limit |
|------|-----|--------|-------|
| Revenue this week | `get_sales_summary` | `order_count,total_revenue` | — |
| Low-stock alert | `get_inventory` | `product,inventory` | 20 |
| Top products | `get_products` | `title,variants.inventory` | 10 |
| New customers | `get_customers` | `name,orders_count,created_at` | 20 |
| Store currency/name | `get_shop_info` | `name,currency` | — |

### What NOT to Do

- Never call `get_orders` with `limit: 250` to compute revenue — use `get_sales_summary`
- Never call `get_products` without `fields` when you only need inventory
- Never call more than 2 MCP tools per turn unless explicitly required

---

## Claude Skills

Three project-level skills are registered and should be invoked for these tasks:

### `/frontend-build`
Use when building or redesigning any UI in this project. Encodes the full Cavendish design system (colours, fonts, shadows, spacing, component patterns, micro-interactions). Invoke with a description of what to build or redesign.

```
/frontend-build redesign the campaign card layout
/frontend-build add a new onboarding overlay
```

### `/github-push`
Use when committing and pushing changes to GitHub. Handles secrets scanning, `.gitignore` hygiene, selective staging (never stages `.env`), structured commit messages, and push protection. Always invoke this instead of running raw git commands.

```
/github-push "Add side-by-side email editor"
/github-push
```

### `/competitor-research`
Use when evaluating new features or UX changes against the market. Researches 4–6 competitors in a category, produces a feature matrix, identifies UX patterns worth adopting, and defines the positioning gap. Save output to `docs/competitive-analysis.md`.

```
/competitor-research email marketing tools for SMBs
/competitor-research AI commerce intelligence tools
```

---

## Running Locally

```bash
node dev-server.js
# open http://localhost:3000
```

`dev-server.js` reads `.env`, injects the API key as `__DEV_API_KEY__` at serve time, and stores it in `sessionStorage`. Key is cleared when the tab closes — never persists to disk.

No npm install. No build step. One HTML file.

---

## Out of Scope (post-demo)

- Real email sending (mock success only for now)
- Real Instagram / TikTok posting
- User authentication
- Multi-store support
- Persistent session history
- Mobile layout optimisation

---

*MailIntel MVP — April 2026 · ~$0.04/run · one afternoon to build*
