# MailIntel — Product Requirements Document

**Version:** 3.0 · **Date:** April 2026 · **Status:** MVP Complete · **Author:** Bharat Namatherdhala

---

## Executive Summary

**In one sentence:** MailIntel turns a Shopify merchant's raw store data into two ready-to-launch campaigns — across Email, Instagram, and TikTok — in 90 seconds, for $0.022.

**The gap we close:** Analytics tools (Shopify, Triple Whale) tell you what happened. Execution tools (Klaviyo, Omnisend) send campaigns. Nothing in between says *what to do this week* and *here's the copy to do it*. MailIntel owns that middle layer.

**Where we are:** Fully functional v1 — live Shopify, real Brave Search trends, 5-agent AI pipeline, conversational Q&A layer. Cost: ~$0.022/run, 98.5% gross margin.

**Ask from this review:** Alignment on v2 scope (OAuth, Klaviyo send, session persistence) before transitioning from demo to production.

---

## 1. The User — Meet Sarah

**Sarah Chen, 34. Runs [Bloom & Thread](https://), a $220K/year Shopify store selling eco-home accessories. Team of 2.**

Sarah is not the target user because she's average. She's the target because she's *representative of the decision-making bottleneck:*

| | |
|---|---|
| **Tools she pays for** | Shopify, Klaviyo ($79/mo), Canva, Meta Ads Manager |
| **How often she opens Klaviyo** | 1–2× per month |
| **Last time she launched a campaign** | 6 weeks ago |
| **Why** | "I open it, stare at the blank email editor, and close it. I know I should be emailing more but I don't know what to say." |
| **What she actually does instead** | Posts on Instagram when she remembers. $0 ROAS attribution. |
| **Revenue she's leaving on the table** | ~$15K/month in lapsed customers who haven't heard from her |

**Sarah's Jobs-to-be-Done:**

1. **Functional:** Know which product to promote this week, without opening 4 tabs
2. **Emotional:** Feel like a professional marketer even though she has no marketing background
3. **Social:** Show consistent, polished brand presence across email and social without a content team

**What she is NOT:**
- Not a data analyst (Triple Whale is overwhelming)
- Not a marketer (Klaviyo flows take her a weekend to set up)
- Not a developer (Shopify customisation requires a contractor)

**The insight this persona unlocks:** Sarah's problem is not that she lacks information. Shopify tells her everything. Her problem is that she lacks *synthesis* — someone or something that reads all of it and tells her what to do. MailIntel is that synthesis layer.

---

## 2. The Problem

### The Compound Failure

Three problems compound, and each one makes the others worse:

| Pain | Frequency | Severity | Why It Compounds |
|---|---|---|---|
| **Dashboard paralysis** — 5 tools, no unified view of what matters this week | Weekly | High | Without a clear signal, Sarah can't pick a campaign angle |
| **The blank page** — she knows she needs to write copy, but doesn't know where to start | Every campaign attempt | High | Paralysis at step 1 makes step 2 irrelevant |
| **The McKinsey gap** — no strategist to connect signals to opportunities | Monthly | Critical | Enterprise brands have a $80K growth marketer for this. Sarah doesn't. |

**All three are P0.** Fix only one and the product breaks. A tool that surfaces signals but can't write copy leaves Sarah at the blank page. A tool that writes copy without reading signals produces generic campaigns that underperform and erode her trust. The value is entirely in the complete loop.

**Signal → action latency for the average SMB: 7 days. Often infinity.**

---

## 3. Why This Solution — Decisions and Alternatives Considered

Every major architecture decision had real alternatives. Here's how we chose.

---

### Decision 1: Multi-Agent Pipeline vs. Single AI Call

**The question:** Should one AI call do everything (orchestrate + analyse + write copy), or should we chain specialised agents?

| Option | Pros | Cons | Why We Rejected |
|---|---|---|---|
| **Single monolithic call** | Simple, fast, cheap | One failure breaks everything; no quality gate; generic output with no clear reasoning trace | No way to insert a quality check before copy reaches the user |
| **Two-stage (analyse + write)** | Cleaner separation | Still no quality gate; strategy and activation conflated | Activation quality is unpredictable without a Critic |
| **✓ Five-agent sequential pipeline** | Specialised reasoning per task; Critic quality gate; clear trace; model-matched cost | More complex; 90-second latency | Chosen — only architecture where we can guarantee copy quality before it reaches Sarah |

**Why the Critic agent is non-negotiable:** Without a quality gate, we're shipping a "suggest things and hope" product. The Critic is what makes MailIntel feel like a trusted advisor rather than a dice roll. Every campaign card is approved before Sarah sees it.

---

### Decision 2: Model Routing — All Sonnet vs. Haiku/Sonnet Mix

**The question:** Run all five agents on Sonnet 4.6 (best quality) or route by task complexity?

| Option | Cost/Run | Latency | Quality Impact | Why We Rejected |
|---|---|---|---|---|
| **All Sonnet 4.6** | ~$0.084 | ~90s | Overkill on routing + critique tasks | 4× cost premium with no quality gain on structured JSON tasks |
| **All Haiku 4.5** | ~$0.006 | ~30s | Strategy + copy quality drops significantly | Strategy rationale and campaign copy degrade — the output Sarah judges most |
| **✓ Haiku for routing/critique, Sonnet for strategy/copy** | ~$0.022 | ~90s | Full quality where it matters | Chosen — 74% cost reduction, identical output quality |

**The routing logic:** Orchestrator (parses intent) + Analyst (reads data) + Critic (structured scoring) = Haiku. Strategist (cross-signal reasoning) + Activation (campaign copy) = Sonnet. Model complexity matches task complexity.

---

### Decision 3: Human-in-the-Loop — Automated vs. Approval-Gated

**The question:** Should MailIntel automatically send approved campaigns, or require Sarah to click Launch?

| Option | Pros | Cons | Why We Rejected |
|---|---|---|---|
| **Fully automated** (Critic approves → send) | Zero friction | Sarah never sees what's being sent; one bad run destroys trust permanently | No AI system should send to customers without human review in v1 |
| **Approve once, auto-send recurring** | Builds on trust over time | Requires persistent session history and user-configurable rules (v3 scope) | Not viable in v1 — no persistence layer |
| **✓ Always-a-click** (cards appear, Sarah launches) | Full transparency; trust-building | More clicks | Chosen — trust in AI-led commerce requires humans in the loop on every consequential action |

**The two gates in code, not just UI:**
1. Confirm before running — Orchestrator parses intent, confirm card appears, Sonnet tokens only spend after Sarah approves
2. Launch is always deliberate — card appears, nothing sends until Sarah clicks

---

### Decision 4: UX Interaction Model — Dashboard vs. Chat-First vs. Command

**The question:** What should Sarah's daily interaction with MailIntel look like?

| Option | Pros | Cons | Why We Rejected |
|---|---|---|---|
| **Dashboard** (metrics + action buttons) | Familiar, scannable | Still requires Sarah to figure out what to do; we become another tab | Replaces the wrong thing — analytics tools are already good |
| **Chat-only** | Low friction, feels modern | Ambiguous — chat is flexible but campaigns have structure | Campaigns need structured output (cards with editable fields, platform tabs) |
| **✓ Chat + campaign card hybrid** | Chat for quick Q&A (~$0.00015), campaign cards for structured output | Two interaction modes to learn | Chosen — matches two distinct intents: daily monitoring (chat) vs. weekly campaign generation (cards) |

**The two-tier architecture creates two habit loops:**
- **Daily:** "What's my revenue looking like?" → Haiku answers in 1 second → Sarah checks MailIntel every morning
- **Weekly:** "Create campaigns" → 90-second loop → two ready-to-launch cards

---

### Decision 5: Data Integration — Mock Only vs. Live Shopify vs. MCP-First

**The question:** How should MailIntel access store data?

| Option | Pros | Cons | Why We Rejected |
|---|---|---|---|
| **Mock data only (demo mode)** | Zero infrastructure; validate the loop immediately | Can't prove value with real merchant data | Demo-valid but not production-valid — accepted for v1 |
| **Direct Shopify API calls from browser** | Simple | CORS blocks Shopify Admin API in the browser entirely | Not possible |
| **Backend service with Shopify webhooks** | Real-time data, event-driven | Doubles infrastructure scope; premature before loop is validated | Accepted for v3 |
| **✓ Local proxy + MCP stdio server** | Full Shopify access, no backend required, zero CORS | Dev-only architecture (not production) | Chosen for v1 — validates live data integration without infrastructure investment |

**The MCP token optimisation:** Raw Shopify API returns ~1,200 tokens per agent call. With fields filtering, `get_sales_summary` instead of `get_orders`, and plain-text agent context, we're at ~150 tokens. **87% reduction** before the agent even reads it.

---

### Decision 6: Pricing Model — Per-Run vs. Subscription vs. Platform Fee

**The question:** How do we charge Sarah?

| Option | Pros | Cons | Why We Rejected |
|---|---|---|---|
| **Per-run ($0.10–$0.50/run)** | Honest; directly tied to value | Creates hesitation ("is this worth running?"); destroys the habit loop | Friction at every run kills frequency — which kills retention |
| **Revenue share (% of GMV attributed)** | Aligns incentives perfectly | Attribution is hard; SMBs resist sharing revenue data; complex billing | Attribution layer doesn't exist until v2 |
| **Platform integration fee** | High ARPU; bundled into tools Sarah already pays | Requires platform partnership deals; 18–24 month sales cycle | Not viable at v1 |
| **✓ Subscription with included runs** | Removes per-run anxiety; predictable; matches SMB expectations | Some Sarah's will over-use; some will under-use | Chosen — removes hesitation, enables the weekly habit, captures value without friction |

**Tiers:**

| Tier | Price | Runs/mo | Target |
|---|---|---|---|
| Starter | $29/mo | 20 | Solo merchants, 1–2 campaigns/week |
| Growth | $49/mo | 50 | Active merchants, daily chat + weekly campaigns |
| Agency | $299/mo | Unlimited (5 stores) | Fractional CMOs, Shopify agencies |

**Free entry:** 3 full runs free, no card required. Sarah experiences the 90-second campaign before seeing a paywall. Creates the habit loop before the conversion ask.

---

## 4. Competitive Positioning

The market breaks into three zones. Every incumbent is stuck in one.

```
ZONE 1 — DATA              ZONE 2 — STRATEGY       ZONE 3 — EXECUTION
──────────────────         ───────────────────      ─────────────────────
Shopify Analytics          [  EMPTY  ]              Klaviyo
Triple Whale                                        Omnisend
Shopify Magic                                       Jasper / Copy.ai
(what happened)            (what to do now)         (execute what you decided)
```

**MailIntel owns Zone 2 and bridges into both Zone 1 and Zone 3.**

Why incumbents can't easily move into Zone 2:

| Competitor | Why They're Stuck |
|---|---|
| **Klaviyo** | Would need a reasoning layer on top of execution infrastructure; unclear monetisation inside list-based pricing |
| **Triple Whale** | Would need an execution layer (email/social APIs) outside their analytics-first product philosophy |
| **Shopify Magic** | Constrained to admin task-level tooling (product descriptions, not marketing intelligence) |
| **Jasper / Copy.ai** | Require the human to provide strategy — they're generation tools, not intelligence tools |

**The window to own Zone 2 is open. The Shopify Magic risk is real but 12–24 months out.**

---

## 5. The 5-Agent Pipeline

```
User Query
    │
    ▼
[Orchestrator]     Haiku 4.5   — Parses intent; sets focus + priority
    │
    ▼
[Signal Analyst]   Haiku 4.5   — Reads store data; surfaces Win + Opportunity
    │                             Output: product + metric chip + one insight sentence
    ▼
[Strategist]       Sonnet 4.6  — Proposes 2 Next Best Actions with 2 trend citations each
    │                             (linked to live Brave Search source URLs)
    ▼  (once per action)
[Activation]       Sonnet 4.6  — Writes Email + Instagram + TikTok copy in one batch
    │
    ▼
[Critic]           Haiku 4.5   — Scores copy 1–10 via 4-step sequential reasoning
                                  Rewrites if score < 8. No card appears without approval.
```

**Critic's 4-step reasoning chain (prevents skipping):**
```
CHECK 1 — TONE         Warm and direct? Flag jargon.
CHECK 2 — NAMING       "based on your data", "Mailchimp" → auto-cap at 6
CHECK 3 — ACCURACY     Does copy name the specific product, metric, and urgency?
CHECK 4 — CONCIERGE    Would a trusted advisor who knows this store write this?
```

---

## 6. Success Metrics

### North Star
> **Incremental revenue per user** — prove that a MailIntel user generates 15–20% more Shopify revenue than a comparable non-user by surfacing and acting on hidden opportunities within 90 seconds.

### Feature KPIs

| KPI | Target | v1 Baseline |
|---|---|---|
| Time-to-Activation (query → ready card) | < 2 min | ~90 sec |
| Agent Success Rate (Critic first-pass approval) | > 80% | ~90% (testing) |
| Cost per campaign | < $0.05 | ~$0.022 |
| Campaign Launch Rate (cards surfaced → launched) | > 50% | not yet measured |

### Strategic KPIs

| KPI | Why It Matters |
|---|---|
| GMV Contribution | Transforms MailIntel from "an expense" to a measurable profit centre |
| Feature-Led Retention | Users who rely on AI to surface revenue opportunities are harder to churn |
| Campaign Frequency Lift | SMBs average 1 email/month; target is 4+ grounded sends |

### Counter-Metric
Monitor unsubscribe rate lift from increased AI-generated send frequency. v2 mitigation: Orchestrator enforces a 48-hour recency window per segment.

---

## 7. Roadmap — What, Why, and Why Now

### Prioritisation Framework

Three questions govern every scoping decision:

1. **Does this validate the core loop?** The 5-agent reasoning chain is the IP. Everything that validates it ships first. Everything that depends on it ships second.
2. **Does removing this break the experience?** If yes, it's P0. If no, it's v2+.
3. **Does this require infrastructure we don't have yet?** If yes, defer until we do.

---

### v1 — Demo-Complete ✓

**Goal:** Prove the loop works. Validate agent quality with real data. Build the trust model.

**What's in:**
- Mock Shopify data + all 5 agents
- Email + Instagram + TikTok campaign cards
- Critic scoring, A/B variants, audience selector, schedule toggle
- Side-by-side email editor with live preview
- Intelligence Trace panel (real-time, per-agent colour)
- Campaigns-ready sticky banner + section divider
- Live Shopify integration via CORS proxy + MCP stdio server
- Chat interface — structured headline + stat chip responses
- Brave Search trend integration + clickable citations on Strategist + Market Context strip
- Token optimisation (74% cost reduction vs. naive baseline)

**Why this scope:** Every feature above is required to demonstrate the full loop. Nothing is decorative. The constraint was: does removing this break the demo? If yes, it stays.

**What got cut and why:**

| Cut | Why | Returns |
|---|---|---|
| Real email send (Klaviyo) | Risk: bad AI copy sent to real customers before Critic is calibrated | v2 |
| OAuth Shopify auth | Premature — dev proxy is sufficient for demo | v2 |
| Session persistence | No auth layer yet; not needed for a stateless demo | v2 |
| Mobile layout | Desktop-first use case (weekly review session) | v2 |
| Multi-store support | Requires per-store context isolation — different data model | v3 |
| TikTok for Business API | API access is restricted and application-gated | v3 |
| Inventory webhooks | Requires persistent backend service | v3 |

---

### v2 — Production-Ready

**Goal:** Go from "impressive demo" to "thing Sarah pays for and uses every week."

**Why these, in this order:**

| Feature | Why v2, not later |
|---|---|
| Shopify OAuth (read-only scopes) | Required to deploy to real merchants — dev proxy can't scale |
| Klaviyo send integration | The loop is incomplete without a real send. But send only after Critic accuracy is validated. |
| Backend Anthropic proxy | Browser-direct API key is demo-only; production requires server-side key management |
| Session persistence | Needed for campaign history, Orchestrator recency window, and agency multi-store |
| Critic calibration study | Blind human review vs. Critic scores — required before trusting Critic in production |
| Meta Graph API (Instagram scheduling) | High-demand feature from Sarah-type users; completes the cross-channel promise |

**What stays out of v2:**
- TikTok for Business API (still restricted)
- Proactive push alerts (requires persistent backend + webhook event handling — v3)
- White-label agency dashboard (requires multi-tenant data model)

---

### v3 — Growth

**Goal:** Expand beyond solo merchants. Build the moat through network effects and ecosystem depth.

| Feature | Strategic Rationale |
|---|---|
| TikTok for Business API | Completes the three-platform loop Sarah expects |
| Webhook-triggered proactive alerts | Shifts from pull (Sarah asks) to push (MailIntel notices first) |
| White-label agency dashboard | 5–20 store management; per-client brand voice; separate reporting |
| Canva MCP for creative assets | Closes the copy → creative gap; campaigns include image + copy in one run |
| Aggregate trend signals (B2B data) | At 10K+ stores, anonymised signals are commercially valuable — open question |

---

## 8. Risks & Open Questions

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sarah doesn't trust AI copy enough to launch | Medium | Critical | Critic transparency (score + reasoning visible); edit always available; Intelligence Trace shows full reasoning chain |
| 90-second loop doesn't create weekly habit | Medium | High | Chat interface creates daily touchpoints at ~$0.00015/answer — habit independent of campaign generation |
| Anthropic API price increases > 3× | Low | High | Multi-model routing in place; architecture is model-agnostic — can swap providers |
| Shopify builds this natively (Magic v3) | Medium (12–24 month horizon) | Critical | Accelerate Klaviyo integration; moat shifts to cross-channel execution quality Shopify won't prioritise |
| SMB AI fatigue — merchants distrust AI-generated marketing | Low-Medium | Medium | Lean into transparency (Trace panel) and human-in-the-loop gates; never auto-launch |
| Critic too lenient — bad copy reaches Sarah | Medium | High | Blind human review study in v2; A/B test Critic strictness thresholds |

### Open Questions

**Q1 — Proactive vs. On-demand**
Should MailIntel proactively surface signals (stock dropping, lapsed segment growing) on Monday morning? Or is pull-based (Sarah asks) safer for trust? Risk: unsolicited AI output feels intrusive. Requires persistent history — v3 question.

**Q2 — Critic Calibration**
Critic approves ~90% of first-pass copies. Is Activation excellent, or Critic too lenient? We have no human baseline. Blind review study needed before production send.

**Q3 — The Data Flywheel**
At 10K+ stores, aggregate anonymised signals become commercially valuable. Is there a B2B data licensing play, or does even hinting at aggregate data use destroy individual merchant trust?

**Q4 — Agency Tier Minimum Viable Feature Set**
Agencies need per-store brand voice, per-client history, and separate reporting. What's the minimum set, and at what store count does the current single-store architecture break?

**Q5 — Query UX Ceiling**
Freeform input is deliberate — zero cognitive load. But sophisticated merchants may want to constrain agents ("focus only on lapsed customers"). Where's the line between useful control and UX complexity that breaks the promise?

---

## Appendix A — The 3 Timing Unlocks

Three shifts in 2025–2026 made this viable now, not 18 months ago:

1. **Claude's JSON reliability** — multi-agent JSON pipelines were brittle until mid-2025. Agents can now be trusted to output structured, parseable responses at scale.
2. **Haiku's cost/speed ratio** — at $1/$5 per million tokens, routing and analysis agents cost fractions of a cent. The 5-agent loop costs ~$0.022 total.
3. **Direct browser API access** — Anthropic's direct-browser header makes zero-backend demos viable. Sarah can experience the product in 90 seconds from a URL.

**The technology finally matches the problem.**

---

## Appendix B — Technical Architecture (Summary)

**Stack:** Vanilla HTML + CSS + JS · No build tools · Single `index.html` · Node.js dev server

| Decision | Choice | Rationale |
|---|---|---|
| Single-file | All runtime code in `index.html` | Zero deployment complexity; demo-anywhere |
| Agent output | JSON only, parsed by `parseJ()` | Eliminates markdown fencing failures |
| Agent context | Plain-text summaries (~150 tokens) | vs. raw JSON (~1,200 tokens); 87% reduction |
| API key storage | `sessionStorage` only | Cleared on tab close; never persists |
| Shopify access | `/shopify-proxy` in dev-server.js | Browser CORS blocks Shopify Admin API directly |
| Revenue queries | `get_sales_summary` (not `get_orders`) | 60 tokens vs. 14,000 tokens; 99.6% reduction |

**Cost optimisation:**

| Version | Input Tokens/Run | Cost/Run |
|---|---|---|
| Naive (all Sonnet, raw JSON) | ~28,000 | ~$0.084 |
| Model routing + compressed context | ~8,400 | ~$0.025 |
| + Session cache | ~7,200 | **~$0.022** |
| **Total reduction** | **74%** | **74%** |

---

*MailIntel v3.0 PRD — April 2026 · Sarah shouldn't need an agency. She needs MailIntel.*
