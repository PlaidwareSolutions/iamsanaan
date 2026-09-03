export type Service = {
  slug: "web" | "mobile" | "growth";
  group: "Build" | "Grow";
  index: string;
  name: string;
  navLabel: string;
  outcome: string;
  heroTitle: string;
  heroBody: string;
  tags: string[];
  capabilities: { title: string; body: string }[];
  approach: { step: string; detail: string }[];
  engagementFit: {
    model: string;
    anchor: string;
    note: string;
  };
  caseStudySlugs: string[];
  faqIds: string[];
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "web",
    group: "Build",
    index: "01",
    name: "Web Platforms",
    navLabel: "Web Platforms",
    outcome: "Marketing sites and web applications that turn traffic into pipeline.",
    heroTitle: "Web platforms built like products, not brochures.",
    heroBody:
      "Your website is the one salesperson every buyer meets. We design and engineer marketing sites, customer portals, and full web applications that load fast, read clearly, and move visitors toward a decision — then we prove it with numbers.",
    tags: ["Next.js", "React", "TypeScript", "Headless CMS", "E-commerce", "Design systems"],
    capabilities: [
      {
        title: "Marketing sites & rebrands",
        body: "Positioning, copy structure, and design executed as one system — built to convert, not to win design awards that nobody remembers.",
      },
      {
        title: "Web applications & portals",
        body: "Customer dashboards, internal tools, and operational platforms. Real state management, real auth flows, real data models.",
      },
      {
        title: "E-commerce",
        body: "Headless storefronts where product discovery is fast and checkout friction is engineered out, measured in conversion rate.",
      },
      {
        title: "Design systems",
        body: "Tokenized component libraries your team can extend without calling us — documented, typed, and tested.",
      },
    ],
    approach: [
      { step: "Audit & architecture", detail: "We map your buyer journeys and technical constraints before a single pixel." },
      { step: "Design in systems", detail: "Pages assemble from a tokenized component library, not one-off layouts." },
      { step: "Engineer for speed", detail: "Sub-second loads, stable layouts, accessibility as a default — the site is the proof." },
      { step: "Measure & iterate", detail: "Analytics wired to conversions from day one, with a 30-day post-launch tuning window." },
    ],
    engagementFit: {
      model: "Usually fixed-scope",
      anchor: "from $25,000",
      note: "Typical marketing site: 8–12 weeks. Web applications: scoped after discovery.",
    },
    caseStudySlugs: ["veyra-freight", "ember-and-oak"],
    faqIds: ["ownership", "stack", "timeline"],
    metaDescription:
      "Marketing sites, web applications, and e-commerce platforms engineered for speed and conversion. Fixed-scope builds from $25,000.",
  },
  {
    slug: "mobile",
    group: "Build",
    index: "02",
    name: "Mobile Apps",
    navLabel: "Mobile Apps",
    outcome: "iOS and Android products people keep on their home screen.",
    heroTitle: "Mobile apps that earn a place on the home screen.",
    heroBody:
      "Most apps are deleted within a week. The ones that survive are fast, obvious, and respectful of attention. We design and ship native and cross-platform apps with the retention mechanics — onboarding, notifications, offline behavior — treated as first-class features.",
    tags: ["Swift", "Kotlin", "React Native", "Flutter", "App Store Ops", "Push & Retention"],
    capabilities: [
      {
        title: "Consumer apps",
        body: "Onboarding that converts, interfaces that feel native to each platform, and retention loops designed before the first screen.",
      },
      {
        title: "B2B & field apps",
        body: "Offline-first tools for teams that work where connectivity doesn't — sync engines, device APIs, ruggedized UX.",
      },
      {
        title: "Companion apps",
        body: "Mobile extensions of existing platforms that share one design language and one API surface with your web product.",
      },
      {
        title: "Launch & store operations",
        body: "App Store and Play submission, review survival, phased rollouts, crash monitoring, and release trains that don't stall.",
      },
    ],
    approach: [
      { step: "Prototype in week one", detail: "A tappable prototype in your hand before any long-term commitment." },
      { step: "Native where it matters", detail: "We choose native or cross-platform per product, not per our convenience." },
      { step: "Retention by design", detail: "Onboarding, empty states, and notification strategy designed as features, not afterthoughts." },
      { step: "Ship, then stabilize", detail: "Phased rollout with crash and performance budgets enforced in CI." },
    ],
    engagementFit: {
      model: "Fixed-scope or embedded team",
      anchor: "from $40,000",
      note: "MVP to store in 12–16 weeks. Ongoing releases via embedded team.",
    },
    caseStudySlugs: ["pulseline"],
    faqIds: ["ownership", "team", "support"],
    metaDescription:
      "Native iOS, Android, and cross-platform apps with retention engineered in. MVP to app store in 12–16 weeks, from $40,000.",
  },
  {
    slug: "growth",
    group: "Grow",
    index: "03",
    name: "Growth & SEO",
    navLabel: "Growth & SEO",
    outcome: "Compounding acquisition, measured in revenue — not impressions.",
    heroTitle: "Growth engineering, measured in pipeline.",
    heroBody:
      "We don't sell impressions, likes, or activity reports. We run technical SEO, paid acquisition, and conversion optimization as one system with one scoreboard: qualified pipeline. Every retainer ships with a dashboard you can read in thirty seconds.",
    tags: ["Technical SEO", "Content Strategy", "Paid Search & Social", "CRO", "Analytics", "Attribution"],
    capabilities: [
      {
        title: "Technical & content SEO",
        body: "Site architecture, page speed, and content mapped to buyer intent — the compounding channel most agencies only report on.",
      },
      {
        title: "Paid acquisition",
        body: "Google, Meta, and LinkedIn managed against cost-per-qualified-lead, with creative testing on a weekly cycle.",
      },
      {
        title: "Conversion optimization",
        body: "Structured experiments on landing pages, forms, and pricing flows. We change what the data says to change.",
      },
      {
        title: "Analytics & attribution",
        body: "Clean event tracking, honest attribution, and a single dashboard tying spend to revenue. No vanity metrics.",
      },
    ],
    approach: [
      { step: "Baseline audit", detail: "Two-week teardown of your funnel, tracking, and channel economics before any spend." },
      { step: "One scoreboard", detail: "We agree on the metric that matters — usually qualified pipeline — and report against it." },
      { step: "Weekly cycles", detail: "Experiments ship weekly. Winners scale, losers die fast, everything is logged." },
      { step: "Compound & hand over", detail: "Playbooks documented as we go. Fire us anytime; keep everything." },
    ],
    engagementFit: {
      model: "Monthly retainer",
      anchor: "from $4,500/mo",
      note: "Three-month initial term, month-to-month after. No long lock-ins.",
    },
    caseStudySlugs: ["ember-and-oak"],
    faqIds: ["retainer-lock", "reporting", "budget"],
    metaDescription:
      "Technical SEO, paid acquisition, and conversion optimization run as one system, measured in qualified pipeline. Retainers from $4,500/mo.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
