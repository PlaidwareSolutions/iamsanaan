export type Metric = {
  value: string;
  label: string;
  /** numeric part for count-up animation; null renders static */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  serviceSlugs: ("web" | "mobile" | "growth")[];
  year: string;
  duration: string;
  vignette: "ops" | "fitness" | "commerce";
  headline: string;
  featuredMetric: Metric;
  summary: string;
  context: string;
  problem: string;
  approach: { title: string; body: string }[];
  stack: string[];
  solution: { title: string; body: string }[];
  metrics: Metric[];
  quote: { text: string; author: string; role: string };
  hasBeforeAfter?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "veyra-freight",
    client: "Veyra Freight",
    industry: "Logistics · B2B SaaS",
    services: ["Web platform", "Design system", "Analytics"],
    serviceSlugs: ["web"],
    year: "2025",
    duration: "14 weeks",
    vignette: "ops",
    headline: "An operations platform that gave a freight broker its week back.",
    featuredMetric: { value: "−78%", label: "manual reporting time", countTo: 78, prefix: "−", suffix: "%" },
    summary:
      "Veyra's dispatch team ran a $4M freight operation on spreadsheets and a legacy TMS. We built the web platform that replaced both.",
    context:
      "Veyra Freight is a family-run freight brokerage moving roughly 90 loads a week across the Gulf Coast. Their dispatchers juggled a decade-old transportation management system, four shared spreadsheets, and a quoting process that lived in one senior employee's head.",
    problem:
      "Quotes took hours, not minutes — and every Friday, two full-time staff assembled operational reports by hand. Leadership had no live view of margin per lane, and the fragility of the process was starting to cost contracts with larger shippers who expected API integrations and same-hour quotes.",
    approach: [
      {
        title: "Two weeks riding along with dispatch",
        body: "Before designing anything, we shadowed the dispatch floor and mapped every swivel-chair workflow — 23 distinct steps between a rate request and a confirmed load. The platform was scoped around eliminating the 14 that added no judgment, and speeding up the 9 that did.",
      },
      {
        title: "Quote engine first",
        body: "The senior broker's pricing intuition became an explicit rules engine with lane history, fuel surcharges, and margin floors. Dispatchers review and adjust rather than compute — quoting dropped from hours to minutes without removing human control.",
      },
      {
        title: "Reports that write themselves",
        body: "Every action in the platform emits a typed event. The Friday reporting ritual became a live dashboard: margin per lane, carrier scorecards, and exception queues, exportable for the clients who still want a PDF.",
      },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Node.js", "AWS", "Tailwind CSS"],
    solution: [
      {
        title: "One screen per job, not per system",
        body: "Dispatchers work a single load board with inline quoting, carrier assignment, and document capture. The legacy TMS still runs settlements behind an API seam — invisible to the team, replaceable later.",
      },
      {
        title: "A design system sized for growth",
        body: "Every table, form, and status pattern ships as a documented component. Veyra's in-house developer has since built two internal tools on the same system without us.",
      },
    ],
    metrics: [
      { value: "−78%", label: "time spent on manual reporting", countTo: 78, prefix: "−", suffix: "%" },
      { value: "11 min", label: "median quote turnaround, down from 3.5 hours", countTo: 11, suffix: " min" },
      { value: "$180k", label: "annualized operational savings", countTo: 180, prefix: "$", suffix: "k" },
      { value: "2", label: "regional contracts won on integration capability", countTo: 2 },
    ],
    quote: {
      text: "They didn't ship a website, they shipped our operating system. The Friday report meeting doesn't exist anymore — the dashboard is the meeting.",
      author: "Dana Whitfield",
      role: "COO, Veyra Freight",
    },
  },
  {
    slug: "pulseline",
    client: "Pulseline",
    industry: "Health & Fitness · Consumer",
    services: ["Mobile app", "Brand & UI", "Launch ops"],
    serviceSlugs: ["mobile"],
    year: "2025",
    duration: "16 weeks",
    vignette: "fitness",
    headline: "A training app built around streaks people actually keep.",
    featuredMetric: { value: "41%", label: "day-30 retention", countTo: 41, suffix: "%" },
    summary:
      "Pulseline came to us with a strength-training method and a spreadsheet of 4,000 waitlist emails. We shipped the iOS and Android app that turned it into a subscription business.",
    context:
      "Pulseline is a founder-led fitness brand with a cult following around a progressive-overload training method. The founder coached 60 clients over video calls and had a waitlist she couldn't serve. The product thesis: the method works because of accountability, not content volume.",
    problem:
      "Fitness apps live or die on week-four retention, and the category averages under 10%. A content-library app would have commoditized the method. The app had to reproduce the feeling of a coach noticing your work — without the founder personally watching 10,000 users.",
    approach: [
      {
        title: "Retention designed before screens",
        body: "We started with the notification and streak model, not the UI. Sessions log in under 20 seconds, streaks tolerate a missed day (rigid streaks kill comebacks), and the weekly recap reads like a coach's note, generated from actual training data.",
      },
      {
        title: "A tappable prototype in week one",
        body: "Twelve waitlist members used a Figma prototype for two weeks. Their confusion reshaped the session logger twice before a line of Swift was written — the cheapest redesigns we ever shipped.",
      },
      {
        title: "Native on both platforms",
        body: "Timer precision, HealthKit and Health Connect integration, and offline gym use pushed us native — Swift and Kotlin with a shared design system and a thin sync API.",
      },
    ],
    stack: ["Swift", "Kotlin", "HealthKit", "Node.js", "PostgreSQL", "RevenueCat"],
    solution: [
      {
        title: "The 20-second session log",
        body: "Logging a set is three taps with smart defaults from last session. Progressive overload suggestions appear inline — the method is embedded in the interaction, not explained in videos.",
      },
      {
        title: "Recaps that feel coached",
        body: "Sunday recaps summarize volume, progression, and streak health in the founder's voice, assembled from telemetry. Users screenshot and share them — the app's cheapest acquisition channel.",
      },
    ],
    metrics: [
      { value: "12k", label: "downloads in first six months", countTo: 12, suffix: "k" },
      { value: "41%", label: "day-30 retention (category avg. ~9%)", countTo: 41, suffix: "%" },
      { value: "4.8★", label: "App Store rating across 310 reviews", countTo: 4.8, suffix: "★", decimals: 1 },
      { value: "$9k", label: "monthly recurring revenue at month six", countTo: 9, prefix: "$", suffix: "k" },
    ],
    quote: {
      text: "I was terrified an app would flatten what makes my coaching work. Instead they built the noticing into the product. My retention numbers embarrass the category.",
      author: "Maya Okafor",
      role: "Founder, Pulseline",
    },
  },
  {
    slug: "ember-and-oak",
    client: "Ember & Oak",
    industry: "E-commerce · DTC",
    services: ["E-commerce replatform", "Growth retainer", "CRO"],
    serviceSlugs: ["web", "growth"],
    year: "2024–25",
    duration: "9-week build + ongoing",
    vignette: "commerce",
    headline: "A cookware brand rebuilt for search, speed, and second purchases.",
    featuredMetric: { value: "+212%", label: "organic revenue, year one", countTo: 212, prefix: "+", suffix: "%" },
    summary:
      "Ember & Oak's template storefront was invisible to search and slow on phones. We replatformed in nine weeks, then ran the growth retainer that tripled organic revenue.",
    context:
      "Ember & Oak makes carbon-steel cookware with a devoted chef following and a wholesale business that dwarfed its direct channel. The direct store ran on a heavily plugin-laden theme: 6-second mobile loads, no content strategy, and paid ads carrying 80% of revenue.",
    problem:
      "Every dollar of growth was rented. CAC had climbed 60% in two years while organic search — where buyers research 'carbon steel vs cast iron' every day — sent almost nothing. The brand had authority in kitchens and none in Google.",
    approach: [
      {
        title: "Replatform before optimizing",
        body: "No CRO program survives a 6-second load. We rebuilt on a headless storefront first — nine weeks, revenue-neutral cutover, every URL mapped and redirected.",
      },
      {
        title: "Content mapped to the research journey",
        body: "Buying guides, care guides, and comparison pages built around the questions chefs actually search — each one internally linked to the products it answers for.",
      },
      {
        title: "CRO as a weekly habit",
        body: "Post-launch, the retainer runs structured experiments: product page layouts, bundle framing, shipping thresholds. Winners roll out; every test is logged in a shared decision journal.",
      },
    ],
    stack: ["Next.js", "Shopify (headless)", "TypeScript", "Vercel", "GA4", "Klaviyo"],
    solution: [
      {
        title: "A storefront that loads before doubt does",
        body: "1.1-second mobile loads, product discovery in two taps, and a checkout stripped to essentials. The before/after below is the same brand, twelve months apart.",
      },
      {
        title: "Owned growth over rented growth",
        body: "Organic search now drives 47% of direct revenue. Paid spend didn't grow — its share of revenue simply shrank as owned channels compounded.",
      },
    ],
    metrics: [
      { value: "+212%", label: "organic revenue in year one", countTo: 212, prefix: "+", suffix: "%" },
      { value: "1.1s", label: "mobile load time, down from 5.8s", countTo: 1.1, suffix: "s", decimals: 1 },
      { value: "+64%", label: "conversion rate after replatform", countTo: 64, prefix: "+", suffix: "%" },
      { value: "47%", label: "of direct revenue now from organic search", countTo: 47, suffix: "%" },
    ],
    quote: {
      text: "We stopped renting our growth. The site finally matches the product — and the search numbers pay for the retainer several times over.",
      author: "Tom Ellery",
      role: "Co-founder, Ember & Oak",
    },
    hasBeforeAfter: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
