# design-tokens.md — MailIntel
> The Cavendish Protocol — High contrast, bold, functional.

---

## Colour Tokens

| Token | Role | Hex |
|-------|------|-----|
| `--brand` | Cavendish Yellow — primary accent | `#FFE01B` |
| `--brand-dark` | Obsidian Black — header bg | `#241C15` |
| `--teal` | Signal Analyst agent | `#007C89` |
| `--orange` | Strategist agent | `#EF5F33` |
| `--green` | Activation agent + success | `#00A650` |
| `--pink` | Critic agent | `#E47386` |
| `--obsidian` | Trace panel background | `#0D0F0F` |
| `--surface` | Main content background | `#F7F5F0` |
| `--card` | Card background | `#FFFFFF` |
| `--border` | Subtle borders | `rgba(0,0,0,0.08)` |
| `--text` | Primary text | `#1A1A1A` |
| `--muted` | Secondary text | `#6B6860` |

### Agent Badge Colours

| Agent | Background | Text |
|-------|-----------|------|
| Orchestrator | `#FFE01B` | `#241C15` |
| Signal Analyst | `#007C89` | `#FFFFFF` |
| Strategist | `#EF5F33` | `#FFFFFF` |
| Activation | `#00A650` | `#FFFFFF` |
| Critic | `#E47386` | `#FFFFFF` |

---

## Typography

| Role | Font | Weight | Size | Notes |
|------|------|--------|------|-------|
| Headings / wordmark | Syne | 800 | 20px | `letter-spacing: -0.03em` |
| UI labels / buttons | Syne | 600–700 | 13–17px | |
| Body / cards | DM Sans | 300–500 | 13–15px | `line-height: 1.65` |
| Monospace / trace / cost | JetBrains Mono | 400–500 | 10–13px | `letter-spacing: 0.03–0.1em` |

**Google Fonts CDN:**
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## Layout Zones

```
┌──────────────────────────────────────────────────────┐
│  ZONE 1 — Header (56px fixed top)                    │
│  MailIntel wordmark · Cost counter · Mode toggle     │
└──────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────┐
│ ZONE 2        │ ZONE 3 — Workflow Feed (70%)          │
│ Trace Panel   │  Command input + Run button           │
│ (30% width)   │  Agent Progress Stepper               │
│               │  Narrative cards (Analyst, Strategist)│
│ Background:   │  Campaign cards (per action)          │
│ #0D0F0F       │                                       │
│ Font: Mono    │                                       │
│ 11px          │                                       │
└───────────────┴──────────────────────────────────────┘
```

### Zone 1 — Header
- Height: `56px`, fixed top
- Background: `--brand-dark`
- Wordmark: Syne 800, `--brand`, 20px
- Tagline "Central Brain": DM Sans 300, white 40% opacity, 12px
- Cost counter: JetBrains Mono 500, 13px (colour-coded)
- LIVE dot: 7px, `#4ADE80`, `animation: blink 1.2s ease-in-out infinite`
- Mode pill: top-right, monospace, 10px

### Zone 2 — Trace Panel
- Width: 30%, max 340px
- Background: `#0D0F0F`
- Header: "INTELLIGENCE TRACE" — Syne 600, 10px, `letter-spacing: 0.12em`, `--brand`
- Log lines: JetBrains Mono 11px, `rgba(74,222,128,0.8)` (terminal green)
- Format: `[AgentName]  → action` / `[AgentName]  ← result`
- Agent name in its theme colour
- Lines stream in with 30ms stagger, auto-scroll

### Zone 3 — Workflow Feed
- Background: `--surface`
- Command input: Syne 16px, full-width, `--brand` focus border
- Run button: `--brand` bg, `--brand-dark` text, Syne 600
- Agent Stepper: 5 pills, active = agent colour + pulse, done = `✓` + filled, pending = outlined grey

---

## Campaign Card Anatomy

```
┌─────────────────────────────────────────────────────┐
│ [⚡ CAMPAIGN badge]  Campaign title    Rationale  [✕]│
├─────────────────────────────────────────────────────┤
│ CRITIC SCORE  ████████░░  8/10  [✓ APPROVED]        │
├─────────────────────────────────────────────────────┤
│ [✉ Email] [📸 Instagram] [🎵 TikTok]                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Platform-rendered preview (email client / IG / TT) │
│  + Audience selector (email only)                   │
│  + Character counter on edit textarea               │
│                                                     │
├─────────────────────────────────────────────────────┤
│ SEND: [Now] [Best time ✨] [Custom]  → AI note      │
├─────────────────────────────────────────────────────┤
│ [✏ Edit copy]  [⚡ A/B variant]  [🚀 Launch]        │
└─────────────────────────────────────────────────────┘
```

### Card Rules
- `border-left: 3px solid var(--green)`
- Animation: `translateY(14px) → 0 + opacity 0 → 1` on entry
- Dismiss: slide right + collapse height
- Launch button shows platform name after launch (e.g. "✅ Launched on Instagram!")
- A/B variant strip: teal bg, `rgba(0,124,137,0.05)`, "Use this variant" swaps live preview

---

## Critic Score Colour Scale

| Score | Bar colour | Verdict badge |
|-------|-----------|---------------|
| 8–10 | `#00A650` green | `✓ APPROVED` on `#DCFCE7` |
| 6–7 | `#F59E0B` amber | `~ REVISED` on `#FEF3C7` |
| 0–5 | `#EF4444` red | `✗ FLAGGED` on `#FEE2E2` |
