# Sanaan — Build Notes & Decisions

Working notes for the autonomous build. The competitive research this build interprets lives in
`docs/research-competitive-analysis.md`.

## Brand

- **Sanaan** — digital product & growth studio. Name derived from the project folder (`iamsanaan`).
  All identity facts (name, email, phone, anchors, socials) live in `src/lib/site.ts` — rename there.
- Fictional demonstration brand: clients (Veyra Freight, Pulseline, Ember & Oak), team members
  (except the founder name), metrics, and testimonials are illustrative content.

## Design direction — "Editorial Terminal"

- Editorial print (warm paper, Fraunces serif display, hairline rules) × terminal precision
  (near-black ink, JetBrains Mono metadata, index-numbered sections).
- One accent: signal orange `#FF4D00`. No gradients/blobs/glassmorphism. Radius ≤ 4px.
- Tone system: `.tone-ink` / `.tone-paper` set CSS vars consumed by `bg-tone`, `text-fg`,
  `text-mute`, `border-line` utilities (see `globals.css`) — components are tone-agnostic.
- Imagery: zero stock photos. Case "screenshots" are coded UI vignettes
  (`src/components/vignettes/`), scaled proportionally via container queries (`cqw` + em).
  Team portraits are seeded geometric marks (`TeamMark`), stated honestly on the page.

## Research → feature mapping (highlights)

- P0: engagement model cards (Alkali) → home §07 + /pricing; financial anchoring (Alkali) →
  /pricing hero, footer, contact; process mapping (Simublade) → /process + home strip;
  metric-first case cards (Plego) → `CaseStudyRow`; tech stack visualizer (Plego/Clickysoft) →
  home §05 tabs, each tech linking to shipped work.
- P1: non-agency guarantees split (Connective) → /about; SaaS retainer matrix (Zara) →
  /pricing + growth service; before/after slider (2POINT) → Ember & Oak case; objection FAQs at
  conversion points (Alkali) → every page's closing section; post-launch SLA table (AppMaisters)
  → /process; white-label partnership (Alkali) → /pricing panel.
- Deliberately cut: industry landing pages, a-la-carte checkout, dedicated Labs page, sticky
  audit bar, blog (empty-shell risk / premium register).

## Technical

- Next.js 16 App Router, TS, Tailwind v4, `motion`, lucide-react. All content in typed data
  modules under `src/data/` — copy edits never touch layout code.
- Contact form (`ContactForm`) is a 4-step qualification flow; submission is simulated
  client-side and says so. Budget band "under $15k" triggers an honest not-a-fit note (friction
  as filter, research §17).
- Known trap fixed: the fixed header's `backdrop-filter` created a containing block that swallowed
  the fixed mobile overlay — the overlay now renders as a sibling of `<header>`.

## QA

- Playwright sweep (scratchpad `shoot.mjs`): all routes × 1440/768/390, full-page screenshots,
  horizontal-overflow + console-error checks. Interactive audit covers form flow + validation,
  pricing toggle, slider keyboard/drag, stack tabs, nav tab order.
- Dev/prod server for QA runs on port **3105** (3000 is occupied by another local app).
