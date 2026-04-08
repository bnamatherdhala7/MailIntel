# MailIntel — Agent Architecture

> Five specialised agents. One sequential pipeline. Every decision visible in the trace panel.

---

## Pipeline Overview

```
User Query
    │
    ▼
┌─────────────────┐
│   ORCHESTRATOR  │  Haiku 4.5 — "What should we focus on?"
│   (Planner)     │  Input: raw user text
│                 │  Output: { focus, priority, context }
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SIGNAL ANALYST  │  Haiku 4.5 — "What's the data saying?"
│ (Intelligence)  │  Input: Shopify data + orchestrator context
│                 │  Output: { win, opportunity, confidence }
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   STRATEGIST    │  Sonnet 4.6 — "What should we do about it?"
│   (Narrative)   │  Input: win + opportunity signals
│                 │  Output: { actions[2] } — each with trigger + rationale
└────────┬────────┘
         │
    ┌────┴────┐
    │ action1 │  action2  (parallel conceptually; sequential in v1)
    └────┬────┘
         │
         ▼
┌─────────────────┐
│   ACTIVATION    │  Sonnet 4.6 — "Write the campaigns"
│   (Copy Engine) │  Input: single strategy action
│                 │  Output: { email, instagram, tiktok } — all 3 in one call
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     CRITIC      │  Haiku 4.5 — "Is this good enough to show?"
│   (Guardrail)   │  Input: full Activation output (all 3 platforms)
│                 │  Output: { approved, score, issues, revised_copy }
└────────┬────────┘
         │
         ▼
   Campaign Card
   (rendered in UI)
```

---

## Agent Specifications

### 1 — Orchestrator
| Property | Value |
|----------|-------|
| Model | `claude-haiku-4-5` |
| Role | Planner + Router |
| Input | User's natural language query |
| Output | `{ focus, priority, context }` |
| Max tokens | 1000 |

The Orchestrator is the entry point. It parses intent and translates a vague user question into a structured directive for the Analyst. It does not touch data — it only shapes the frame.

**Why Haiku?** Routing and intent parsing requires speed and low cost, not deep reasoning. Haiku handles this in ~0.5s.

**Priority field:** `"win"` (find what's working) | `"opportunity"` (find what to fix) | `"both"` (default health check).

---

### 2 — Signal Analyst
| Property | Value |
|----------|-------|
| Model | `claude-haiku-4-5` |
| Role | Commerce Intelligence Reader |
| Input | Full `MOCK_SHOPIFY_DATA` JSON + Orchestrator context |
| Output | `{ win, opportunity, confidence, signals_checked }` |
| Max tokens | 1000 |

The Analyst is handed the raw Shopify payload and finds exactly one Win and one Opportunity. It is constrained to specific output fields to prevent hallucination drift.

**Confidence scoring:** `High` only if 2+ data points corroborate. A product trending up by revenue AND velocity AND low stock = High. A single metric alone = Medium.

**Data mode toggle:** The app supports Live Mode (real Shopify Admin API) and Mock Mode (local `MOCK_SHOPIFY_DATA`). Both modes return the same JSON shape so all downstream agents are mode-agnostic.

---

### 3 — Strategist
| Property | Value |
|----------|-------|
| Model | `claude-sonnet-4-6` |
| Role | Narrative Engine |
| Input | Analyst output (win + opportunity) |
| Output | `{ actions[2] }` — each with trigger, rationale, external_trend, urgency |
| Max tokens | 1000 |

The Strategist is the reasoning engine. It connects the Analyst's raw signals to real-world timing (seasonal trends, search intent) and proposes exactly two Next Best Actions.

**Why Sonnet?** The Strategist must synthesise signals, apply external context, and write advisory-quality rationale. This is the highest-reasoning step — Sonnet's extended context and deeper reasoning justify the cost.

**Action types:** `"email"` for retention/conversion campaigns; `"social"` for Instagram + TikTok awareness plays. The Strategist always produces one of each.

---

### 4 — Activation
| Property | Value |
|----------|-------|
| Model | `claude-sonnet-4-6` |
| Role | Omnichannel Copy Engine |
| Input | Single strategy action + Analyst signals |
| Output | `{ email, instagram, tiktok }` — all three in one JSON |
| Max tokens | 1000 |

The Activation agent is called once per action (twice total). It produces ready-to-send copy for all three platforms simultaneously in a single JSON object.

**Why one call for all three?** Cross-platform coherence. The email body, Instagram caption, and TikTok hook should share voice and urgency. Generating them in separate calls risks tone drift.

**Platform output contracts:**
- `email`: subject (≤8 words), preview_text (≤12 words), body (3 paragraphs), cta (≤4 words)
- `instagram`: caption (≤150 chars), hashtags, hook (5 words), best_time
- `tiktok`: hook (≤8 words), script (2–3 sentences), hashtags, best_time

---

### 5 — Critic
| Property | Value |
|----------|-------|
| Model | `claude-haiku-4-5` |
| Role | Trust + Quality Guardrail |
| Input | Full Activation output for one action |
| Output | `{ approved, score, issues, revised_copy }` |
| Max tokens | 1000 |

The Critic runs as a gate before any campaign card renders. It checks four things: tone violations, naming violations (Mailchimp, "based on your data"), accuracy (does copy match the signal?), and concierge quality.

**Score thresholds:**
- 8–10 → `✓ APPROVED` (green) — rendered as-is
- 6–7 → `~ REVISED` (amber) — `revised_copy` is shown instead of original
- 0–5 → `✗ FLAGGED` (red) — card shows with warning

**Auto-revision:** If `approved: false`, the Critic returns a fully corrected `revised_copy` in the same JSON structure as the Activation output. The UI uses `revised_copy` automatically when present.

---

## Data Flow Diagram

```
sessionStorage['mi_api_key']
         │
         ▼
callAgent(agentName, messages[])
         │
         ├── POST https://api.anthropic.com/v1/messages
         │   Headers: x-api-key, anthropic-version, anthropic-dangerous-direct-browser-access
         │
         ├── response.content[0].text → parseJ() → strips markdown fences → JSON.parse()
         │
         └── updateCost(inputTokens, outputTokens)
                  └── _totalCost += (in/1M * 0.25) + (out/1M * 1.25)  [Haiku]
                       or       += (in/1M * 3)    + (out/1M * 15)     [Sonnet]
```

---

## State Machine

The app cycles through these UI states:

```
IDLE ──(user submits query)──► RUNNING
  ▲                               │
  │                           5 agents execute sequentially
  │                               │
  └──(dismiss all cards)──── DONE (cards visible)
```

**Agent stepper states per pill:**
- `pending` — grey outline, not yet started
- `active` — agent colour + CSS pulse animation
- `done` — filled with `✓` checkmark

---

## A/B Variant Generation

A separate, lightweight Claude call runs when the user clicks "⚡ A/B variant":

```javascript
callAgent('COPY', [
  { role: 'user', content: `Generate ONE alternative [subject line | caption | hook] 
    for this [platform] campaign. Return only the alternative text, no explanation.
    Original: "${currentText}"` }
], 120)  // max_tokens: 120 — tight cap to prevent runaway
```

The variant appears in a teal strip below the preview. "Use this variant" swaps it into the live preview without a full re-render.

---

## Cost Architecture

| Agent | Model | Typical input tokens | Typical output tokens | Cost per run |
|-------|-------|---------------------|----------------------|--------------|
| Orchestrator | Haiku 4.5 | ~200 | ~80 | ~$0.0007 |
| Signal Analyst | Haiku 4.5 | ~600 | ~150 | ~$0.0014 |
| Strategist | Sonnet 4.6 | ~400 | ~200 | ~$0.0042 |
| Activation ×2 | Sonnet 4.6 | ~500 | ~400 | ~$0.018 |
| Critic ×2 | Haiku 4.5 | ~700 | ~200 | ~$0.003 |
| **Total** | | | | **~$0.027** |

Actual cost shown live in the header, colour-coded:
- `< $0.02` → white
- `$0.02–0.05` → `#FFE01B` (brand yellow)
- `$0.05–0.10` → `#F59E0B` (amber)
- `> $0.10` → `#EF4444` (red)

---

## Shopify Integration

### Mock Mode (default)
`MOCK_SHOPIFY_DATA` in `mock-data.js` — a static object with the exact shape of the Shopify Admin REST API response. No network calls. Safe for demos, development, and cost testing.

### Live Mode
`fetchShopify()` hits `https://{store}.myshopify.com/admin/api/2026-01/products.json` and `orders/count.json`. Returns the same JSON shape as mock data so all agents are mode-agnostic.

Toggle via the mode pill in the header (top-right). Live mode requires a Shopify access token stored in `sessionStorage['shopify_token']`.

---

## Security Notes

- API key lives in `sessionStorage` only — wiped on tab close, never written to disk or localStorage
- Direct browser API calls use Anthropic's `anthropic-dangerous-direct-browser-access` header — intended for demos; production deployments should proxy through a backend
- No user data is persisted between sessions
- All Shopify tokens should be scoped to read-only Admin API access
