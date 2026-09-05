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

## Repricing (2026-09-03, user direction)

- All financial anchors rescaled: projects from $500 (was $15,000), growth retainers
  $199/$499/$999 (was $4,500/$8,000/$14,000), embedded team from $2,000/mo, support from
  $99/mo. Contact-form budget bands per user spec: <$99 / $500–$2,000 / $2,000–$10,000 / $10,000+.
- Timeline mentions that sat beside prices scaled with them (marketing site 2–4 wks, MVP 6–12 wks).

## Pricing coherence pass (2026-09-03, follow-up)

- Contact form now has five contiguous bands: <$99 / $99–$500 / $500–$2,000 /
  $2,000–$10,000 / $10,000+; the honest-note ($500 floor) shows for both sub-$500 bands.
- Fictional client-outcome metrics rescaled to match small-business positioning:
  Veyra $4M operation, 90 loads/wk, $180k savings; Pulseline 12k downloads, $9k MRR,
  310 reviews; trust line now "$6M+ in tracked revenue". Ember & Oak metrics were
  already relative (percentages/seconds). Vignette numerals updated to match.

## Floor moved to $99 (2026-09-03, user direction)

- Published minimum is now $99 across every anchor: projects from $99, growth retainers
  from $99/mo (Foundation tier $99/$89-quarterly), support from $49/mo. Pricing hero reads
  "Every engagement starts at $99." Honest-note in the form now triggers only for the
  "Under $99" band. Embedded team ($2,000/mo) and mobile MVP ($2,500) floors kept — they
  describe bigger engagement shapes, not the studio entry price.

## Real product portfolio integrated (2026-09-03)

- The user's actual products (from plaidware.com) are now first-class content: new `/products`
  page + homepage section "We eat our own cooking." Data in `src/data/products.ts` — five
  vertical SaaS products (Buildorata, Fixorata, Drivorata, Rentorata, PropOrata) with real
  taglines and real pricing quoted from the live catalog, linking out to plaidware.com.
- Trust marquee now shows the real product wordmarks (fictional client marks removed from it);
  its caption states the suite is built/operated in-house. About-page "lab" note rewritten to
  reference the real suite. Nav + footer link to /products.
- The three case studies (Veyra/Pulseline/Ember & Oak) remain as fictional demonstration
  work samples — swap with real client stories when available.

## 2026-09-05 — Visual system rebuilt on apple.com conventions

User-directed: "make iamsanaan.com follow apple.com UI and UX." Researched apple.com
directly (global nav 44px frosted at 80% white with `saturate(1.8) blur(20px)`, 12px links,
hover flyouts over a blurred curtain; 52px sticky local nav with a small blue pill; SF Pro
Display headlines 56–80px/600 with tight tracking; 17px body, 12px footnotes; #1d1d1f /
#6e6e73 / #f5f5f7 / pure black tiles; blue #0071e3 pills and #0066cc links; 28px-radius tiles;
snap galleries with 36px circular paddles; `cubic-bezier(0.4,0,0.6,1)` at 240–320ms;
scroll-driven word highlighting; reduced-motion respected).

Decisions:
- Dropped the "Editorial Terminal" system (Fraunces, JetBrains Mono, orange #FF4D00,
  hairline cell grids) for the neutral Apple palette with one blue. Fonts: `-apple-system`
  first (real SF on Apple devices), Inter elsewhere. Inter Tight is retained only because
  `/bio-data` opts into it; that page is untouched.
- Tone system kept and remapped (`tone-ink` = black, `tone-paper` = white, new
  `tone-gray` = #f5f5f7); `.tile` = 28px radius on the tone's secondary surface.
- New primitives: `Eyebrow`, `Segmented` (sliding-thumb control), `Gallery` (snap +
  paddles), `LocalNav`, `ScrollText` (word-by-word scroll reveal), `HeroScroll` (hero copy
  recedes on scroll), `TrustRow` (replaces the marquee — apple.com has none), `ProductCard`.
- Hero stays black with the node field, retinted white/blue; headline emphasis uses a
  gradient word, as apple.com does.
- The FooterCta is a black tile above an apple.com-style gray 12px directory footer; the
  per-page "not sure?" CTA bands were removed as redundant.
- Local-nav pages (`src/lib/localNav.ts`: /products, /services/[slug]) follow apple.com
  exactly: the global nav is `absolute` on desktop (scrolls away) and carries no button;
  the LocalNav is the single sticky bar with the single "Start a project" pill. On mobile
  the global bar stays fixed for the menu button and the LocalNav sticks beneath it.
