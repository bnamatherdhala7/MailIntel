# MailIntel — Director Demo Script

**Audience:** Director / VP · **Time:** 8–10 minutes · **Mode:** Live (LIVE SHOPIFY)

---

## Before You Start

- Dev server running: `node dev-server.js` → http://localhost:3000
- Header shows **LIVE SHOPIFY** (green pill) — vendant-2.myshopify.com
- Store has ~13 orders / ~$900 revenue / 3 low-stock products ready to trigger signals
- Have the Intelligence Trace panel closed (open it on cue)

---

## Act 1 — The Problem (60 seconds)

**Say:**
> "A typical Shopify merchant wakes up to five open tabs — Shopify Analytics, Klaviyo, Meta Ads, an inventory spreadsheet, Google Analytics. None of them talk to each other. None say what to do next.
>
> The Matcha Latte Kit is trending, only 6 left in stock, and 30-day lapsed customers haven't been messaged. No email goes out. The window closes. That's the problem MailIntel solves."

**Point to:** The metrics bar — Revenue, Low Stock (3), Customers · 30d

**Highlight:** The low stock alerts at the bottom of the welcome card — "only 6 left", "only 4 left" — these are the signals no existing tool acts on automatically.

---

## Act 2 — One Question (30 seconds)

**Action:** Click the suggested prompt **"Create campaigns for this week"** (or type it)

**Say:**
> "One question. That's it. No configuration, no segment setup, no template selection. MailIntel figures out the rest."

**Action:** Click **Send** → Orchestrator runs → confirm card appears

**Say:**
> "The Orchestrator parsed the intent and planned the focus. Before spending any real compute, it shows me what it's about to do and asks me to confirm. Human always in the loop."

**Action:** Click **Run all agents**

---

## Act 3 — The Pipeline (2 minutes)

**Point to the stepper bar at the bottom as each agent lights up.**

**Orchestrator ✓ → Signal Analyst running...**

> "Signal Analyst is reading the live Shopify data right now — orders, inventory, customer segments. It's looking for one Win and one Opportunity."

**Signal Analyst ✓ → Strategist running...**

> "Strategist takes those signals and pulls live web trends from Brave Search. It's not just reading your store — it's cross-referencing what's happening in the market *today*."

**Strategist ✓ → Activation running...**

> "Activation writes the actual campaign copy — Email, Instagram, TikTok — in one pass, grounded in the specific signal and the live trend. Not a template."

**Activation ✓ → Critic running...**

> "Critic is the quality gate. It runs a 5-step reasoning chain — tone, accuracy, naming, concierge quality — before scoring the copy. Nothing below an 8 reaches me."

**All done →**

> "90 seconds. Two campaigns. Let me show you what came out."

---

## Act 4 — The Cards (3 minutes)

### Signal Analyst Card
**Point to:**
- **WIN chip** — "Matcha Latte Kit — 5 sold · 6 units left" → *This is the signal. High velocity, low stock. Act now.*
- **OPP chip** — *The growth opportunity the tool identified automatically*

### Strategist Card
**Point to:**
- The two **Next Best Actions** with trigger rationale
- The **trend citations** — click one (`bloomberg.com ↗` or similar)

> "These aren't made up. These are real Brave Search results from today. The copy is grounded in what's actually trending, not a six-month-old template."

### Campaign Card — Email Tab
**Point to:**
- Subject line, preview text, body, CTA — all specific to the Matcha Kit signal
- **Side-by-side editor** — "Sarah can edit the left side, preview updates live on the right"
- **Critic score** (top right) — "This copy scored a 9. If it scored below 8, the Critic rewrote it before it reached her."
- **Audience selector** — click "Lapsed 30d" → count + estimated revenue updates

> "She picks her audience, schedules it, and launches. The whole thing — from question to launchable campaign — took 90 seconds."

### Campaign Card — Instagram Tab
**Click Instagram tab**

> "Same signal, same trend data, rewritten for Instagram. Caption, hashtags, best time to post. One agent call — three platforms."

### Market Context Strip
**Click the teal "Market Context" strip to expand**

> "This is the live web data that shaped the copy — real sources, real URLs. Sarah can see exactly why the campaign angle was chosen before she sends it."

---

## Act 5 — The Intelligence Trace (1 minute)

**Click the 🔬 trace icon (top right)**

> "Every agent call is logged here in real time — what was sent, what came back, what it cost. Full transparency into the reasoning. This is what separates MailIntel from a black box."

**Point to:**
- Colour-coded lines per agent
- Token cost per call
- **Total cost counter** (top right of header)

> "This entire run — Orchestrator, Analyst, Strategist, two Activation calls, two Critic calls — cost $0.08. A comparable agency brief costs $500 and takes 48 hours."

---

## Act 6 — The So What (60 seconds)

> "33 million small businesses are paying for Klaviyo, Shopify, Meta Ads — tools that are excellent at their one job. But nobody connects them. Nobody says 'your Matcha Kit is about to sell out, here's the urgency email, here's the Instagram caption, the lapsed segment is 89 people, launch Tuesday at 7pm.'
>
> MailIntel does that. For $0.08. In 90 seconds."

**Key numbers to leave them with:**

| | |
|---|---|
| Cost per full campaign run | ~$0.022–$0.08 |
| Equivalent agency retainer | $3,000–$10,000/month |
| Time to launchable campaign | 90 seconds |
| Gross margin at $29/mo | ~98.5% |
| Agents in the pipeline | 5 |
| Quality gate pass rate | ~90% first-pass |

---

## Anticipated Questions

**"What stops Klaviyo from building this?"**
> "Klaviyo executes sends. Building a reasoning layer requires a fundamentally different product architecture — and it would cannibalize the 'you need an expert to set this up' positioning that justifies their $700/month enterprise tier."

**"What about Shopify Magic?"**
> "Shopify Magic is task-level — product descriptions, email drafts in the admin. It has no cross-signal reasoning, no multi-channel output, no quality gate. It helps you write a subject line. MailIntel decides that the email should exist."

**"How is this different from ChatGPT?"**
> "ChatGPT requires you to bring the strategy. You have to tell it your Matcha Kit is trending, your stock is low, your lapsed segment is 89 people. MailIntel reads all of that itself and comes to you with the brief already written."

**"What's v2?"**
> "Real Klaviyo send (not mock), Shopify OAuth for production merchant onboarding, session persistence. The loop is proven — v2 connects it to real infrastructure."

---

## Demo Cheat Sheet

| Moment | What to say | What to click |
|---|---|---|
| Welcome screen | "Five open tabs. None say what to do." | Point to metrics bar + low-stock alerts |
| Confirm card | "Human always in the loop." | Click Run all agents |
| Stepper | Name each agent as it lights up | Point to stepper |
| Analyst card | "WIN chip = act now signal" | Point to product + metric chip |
| Strategist citations | "Live web data, not templates" | Click a source link |
| Email card | "90 seconds, one question" | Switch audience to Lapsed 30d |
| Trace panel | "Full transparency, $0.08 total" | Open trace, point to cost counter |

---

*Keep it under 10 minutes. Stop at the campaign card if time is short — that's the moment.*
