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

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Vanilla HTML + CSS + JS | Zero setup, deploy anywhere — no build step |
| AI | Claude Sonnet 4.6 + Haiku 4.5 | Sonnet for reasoning, Haiku for routing + critique |
| Data | Mock Shopify data (or real Shopify Admin API) | Same JSON shape — agents are mode-agnostic |
| Fonts | Syne + JetBrains Mono + DM Sans | Display / trace / body hierarchy |
| Dev server | `dev-server.js` (Node built-in `http`) | Reads `.env`, injects API key at serve time |

---

## Getting Started

```bash
git clone https://github.com/bnamatherdhala7/MailIntel.git
cd MailIntel

# Add your Anthropic API key
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env

# Start dev server — reads key from .env, never writes it to disk
node dev-server.js
```

Open [http://localhost:3000](http://localhost:3000). The key is injected into `sessionStorage` at page load and cleared when the tab closes.

---

## Cost

| Scenario | Cost |
|----------|------|
| Single full run (5 agents, 2 campaign cards) | ~$0.04 |
| 300 runs/month | ~$12/month |
| A/B variant call | ~$0.001 |

*Sonnet 4.6 at $3/$15 per M tokens · Haiku 4.5 at $1/$5 per M tokens*

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
