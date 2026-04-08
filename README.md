# MailIntel — Central Brain for SMB Commerce

> **5 AI agents. One question. 90 seconds. 3 ready-to-launch campaigns.**

MailIntel transforms fragmented Shopify commerce signals into plain-English intelligence and omnichannel campaign activations — powered by Claude AI running in a visible, auditable loop.

![MailIntel Demo](docs/screenshots/demo-overview.png)

---

## The Problem It Solves

Small and medium businesses drown in data but starve for action. A Shopify store owner gets weekly revenue numbers, product trends, inventory alerts, and customer segment reports — all in separate dashboards, none connected, none telling them **what to do next**.

The result: paralysis. Opportunities missed. Campaigns never launched. Revenue left on the table.

**MailIntel closes the gap between signal and action.**

---

## What It Does

One question unlocks the full intelligence loop:

> *"Give me a business health check and growth strategy for this week."*

In 90 seconds, MailIntel:

1. **Reads your Shopify signals** — revenue, product velocity, inventory risk, customer segments
2. **Identifies what's winning** — e.g. Canvas Totes up 34%, low stock, reorder risk
3. **Finds the opportunity** — e.g. Eco-Pins declining but strong upsell angle with Totes
4. **Proposes 2 Next Best Actions** — each grounded in a real commerce signal + external trend
5. **Writes full campaign copy** — Email, Instagram, TikTok — all three, ready to send
6. **Quality-checks everything** — a Critic agent scores and revises before anything surfaces
7. **Lets you edit, A/B test, and launch** — with one click, per platform, on your schedule

---

## The 5 Agents

| Agent | Model | Role |
|-------|-------|------|
| **Orchestrator** | Haiku 4.5 | Parses your query, sets focus + priority |
| **Signal Analyst** | Haiku 4.5 | Reads Shopify data, finds Win + Opportunity |
| **Strategist** | Sonnet 4.6 | Cross-references signals, proposes Next Best Actions |
| **Activation** | Sonnet 4.6 | Writes Email + Instagram + TikTok copy per action |
| **Critic** | Haiku 4.5 | Scores copy 1–10, approves or revises before it reaches you |

Every agent runs in a visible **Intelligence Trace** panel — you see every tool call, every response, in real time.

---

## Key Features

### 🧠 Multi-Agent Intelligence Loop
Five Claude agents run in sequence, each specialised. The Orchestrator routes, the Analyst reads data, the Strategist thinks, the Activation agent writes, the Critic gatekeeps.

### 📊 Shopify Commerce Dashboard
Live mock data (or real Shopify Admin API) shows revenue, orders, AOV, product trends with velocity arrows, and inventory alerts — right on the welcome screen.

### 📋 Campaign Cards with Platform Tabs
Every recommended action generates a campaign card with three platform tabs:
- **✉ Email** — rendered email client preview with subject, body, CTA
- **📸 Instagram** — full IG post mock with caption, hashtags, avatar
- **🎵 TikTok** — vertical video card with hook, script, hashtags

### ✏️ Inline Editing
Edit copy directly on the card. Live preview updates when you close the editor. Character counters with colour-coded warnings (yellow at 90%, red over limit).

### ⚡ A/B Variant Generator
One click generates an alternative subject line / caption / hook via a focused Claude call. Accept it with "Use this variant" to swap the live preview.

### 👥 Audience Selector
Email campaigns let you target: All contacts · Repeat buyers · Lapsed 30d · New this week. Selecting a segment live-updates audience count and estimated revenue.

### 🔮 Critic Score
Every campaign card shows the Critic agent's quality score (1–10) with a colour-coded verdict bar: ✓ Approved / ~ Revised / ✗ Flagged.

### 🗓 Schedule Toggle
Launch Now · Best Time (AI-recommended) · Custom datetime — per platform, per card.

### 💰 Live Cost Counter
Running total in the header, colour-coded: yellow → amber → red as spend climbs. Entire demo costs ~$0.04.

---

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | Vanilla HTML + CSS + JS | Zero setup, instant demo, deploy anywhere |
| AI | Anthropic Claude (Sonnet 4.6 + Haiku 4.5) | Best-in-class reasoning + speed/cost balance |
| Data | Shopify Admin REST API (`2026-01`) | Direct commerce signal ingestion |
| Fonts | Google Fonts CDN | Syne + JetBrains Mono + DM Sans |
| Hosting | Vercel / any static host | `npx vercel --prod` |

No npm install. No build step. One HTML file.

---

## Getting Started

```bash
# Clone
git clone https://github.com/bnamatherdhala7/MailIntel.git
cd MailIntel

# Serve locally
npx serve . -l 3000

# Open
open http://localhost:3000
```

On first load, enter your [Anthropic API key](https://console.anthropic.com). It's stored in `sessionStorage` only — never written to disk.

---

## Cost

| Scenario | Cost |
|----------|------|
| Single demo run (5 agents) | ~$0.04 |
| 300 runs/month | ~$12/month |
| Model | `claude-sonnet-4-6` at $3/$15 per M tokens |

---

## Docs

- [`CLAUDE.md`](CLAUDE.md) — Build spec: Workflows, Actions, Tools
- [`docs/architecture.md`](docs/architecture.md) — Agent architecture deep dive
- [`docs/product.md`](docs/product.md) — Product vision and market context
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

*Built in one afternoon. Costs $4.80/month at 300 runs. Closes the gap between data and action.*
