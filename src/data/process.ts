export type Phase = {
  index: string;
  name: string;
  window: string;
  summary: string;
  deliverables: string[];
  youSee: string;
};

export const phases: Phase[] = [
  {
    index: "01",
    name: "Discover",
    window: "Weeks 1–2",
    summary:
      "We learn your business before touching your product. Stakeholder interviews, analytics teardown, competitive review, and technical audit — compressed into two weeks, ending in a scoped plan with a fixed price.",
    deliverables: ["Discovery brief", "Scope & fixed quote", "Technical architecture memo", "Success metrics"],
    youSee: "A written plan you could hand to any competent team — including one that isn't us.",
  },
  {
    index: "02",
    name: "Design",
    window: "Weeks 2–5",
    summary:
      "Design runs as a five-day sprint cycle: map, sketch, decide, prototype, test. You see clickable work every Friday, not a big reveal at the end. The design system is built in parallel so engineering never waits.",
    deliverables: ["Clickable prototypes", "Design system & tokens", "Copy deck", "Usability test notes"],
    youSee: "A prototype in your hands by the end of the first design week.",
  },
  {
    index: "03",
    name: "Build",
    window: "Weeks 4–10",
    summary:
      "Engineering overlaps design by design. Weekly staging deploys you can click, a shared issue board you can read, and demos every Friday. No black-box months — you watch the product assemble.",
    deliverables: ["Weekly staging builds", "Friday demos", "Test coverage on critical paths", "Performance budgets in CI"],
    youSee: "A staging URL that gets visibly better every week.",
  },
  {
    index: "04",
    name: "Launch",
    window: "Weeks 10–12",
    summary:
      "Launch is a checklist, not a ceremony: performance passes, accessibility review, analytics verification, redirect maps, rollback plan. We ship in the morning, watch the dashboards, and stay on call.",
    deliverables: ["Launch checklist & rollback plan", "Analytics verification", "SEO/redirect map", "Handover docs & training"],
    youSee: "A boring launch day. That's the point.",
  },
  {
    index: "05",
    name: "Support",
    window: "Ongoing",
    summary:
      "Software needs care after launch — we say so upfront instead of disappearing. Every project includes a 60-day warranty; after that, support runs on a transparent retainer with defined response times.",
    deliverables: ["60-day warranty on all work", "P1 response within 4 business hours", "Monthly health report", "Roadmap reviews quarterly"],
    youSee: "A named engineer answering — the same people who built it.",
  },
];

export const sprint = [
  { day: "Mon", name: "Map", detail: "Frame the problem, pick the target journey." },
  { day: "Tue", name: "Sketch", detail: "Competing solutions on paper, not opinions in meetings." },
  { day: "Wed", name: "Decide", detail: "One direction chosen, storyboarded screen by screen." },
  { day: "Thu", name: "Prototype", detail: "A realistic clickable prototype by end of day." },
  { day: "Fri", name: "Test", detail: "Five users, recorded sessions, decisions from evidence." },
];
