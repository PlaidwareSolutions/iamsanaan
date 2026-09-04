export type EngagementModel = {
  slug: string;
  name: string;
  anchor: string;
  anchorNote: string;
  summary: string;
  bestWhen: string[];
  mechanics: string;
};

export const engagementModels: EngagementModel[] = [
  {
    slug: "fixed-scope",
    name: "Fixed-scope project",
    anchor: "from $99",
    anchorNote: "priced after a 2-week discovery",
    summary:
      "A defined product, a fixed price, a committed timeline. Discovery sets the scope; the quote doesn't move unless the scope does — and scope changes are priced in writing before we build them.",
    bestWhen: [
      "You need a website, platform, or app shipped by a date",
      "You want cost certainty before committing",
      "You have a decision-maker who can attend a weekly demo",
    ],
    mechanics: "50% to schedule, milestones thereafter. 60-day warranty included.",
  },
  {
    slug: "embedded-team",
    name: "Embedded team",
    anchor: "from $2,000/mo",
    anchorNote: "dedicated senior capacity, monthly",
    summary:
      "A senior designer-engineer pod that joins your standups, your Slack, and your roadmap. You direct priorities sprint by sprint; we bring the product discipline. The team you meet is the team that ships.",
    bestWhen: [
      "You have ongoing product work, not a single project",
      "Your roadmap shifts too fast for fixed scopes",
      "You want senior capacity without six months of hiring",
    ],
    mechanics: "Monthly, 30-day notice to wind down. Minimum 3-month initial term.",
  },
  {
    slug: "growth-retainer",
    name: "Growth retainer",
    anchor: "from $99/mo",
    anchorNote: "SEO, paid, and CRO as one system",
    summary:
      "Continuous acquisition work measured against one scoreboard: qualified pipeline. Weekly experiment cycles, monthly strategy reviews, and a live dashboard tying spend to revenue.",
    bestWhen: [
      "Your product is solid but acquisition is rented or flat",
      "You want one accountable partner across SEO, paid, and CRO",
      "You'll judge the work on revenue, not activity reports",
    ],
    mechanics: "3-month initial term, then month-to-month. You keep every account and playbook.",
  },
];

export type Tier = {
  name: string;
  monthly: number;
  quarterlyMonthly: number;
  blurb: string;
  highlight?: boolean;
  features: Record<string, string | boolean>;
};

/** Row order for the growth retainer matrix */
export const tierRows = [
  "Technical SEO & site health",
  "Content production",
  "Paid media management",
  "CRO experiments",
  "Reporting",
  "Strategy reviews",
] as const;

export const growthTiers: Tier[] = [
  {
    name: "Foundation",
    monthly: 99,
    quarterlyMonthly: 89,
    blurb: "Owned-channel groundwork for teams starting to take search seriously.",
    features: {
      "Technical SEO & site health": "Full audit + monthly fixes",
      "Content production": "2 pieces / month",
      "Paid media management": false,
      "CRO experiments": false,
      Reporting: "Live dashboard",
      "Strategy reviews": "Monthly",
    },
  },
  {
    name: "Traction",
    monthly: 499,
    quarterlyMonthly: 449,
    blurb: "The full acquisition system for companies ready to compound.",
    highlight: true,
    features: {
      "Technical SEO & site health": "Continuous",
      "Content production": "4 pieces / month",
      "Paid media management": "Up to $5k/mo spend",
      "CRO experiments": "2 tests / month",
      Reporting: "Live dashboard + monthly memo",
      "Strategy reviews": "Bi-weekly",
    },
  },
  {
    name: "Scale",
    monthly: 999,
    quarterlyMonthly: 899,
    blurb: "A dedicated growth pod operating like an in-house team.",
    features: {
      "Technical SEO & site health": "Continuous",
      "Content production": "8+ pieces / month",
      "Paid media management": "Unlimited spend",
      "CRO experiments": "Weekly test cadence",
      Reporting: "Custom + exec reviews",
      "Strategy reviews": "Weekly",
    },
  },
];

export const notAFit = [
  "You need it in two weeks. Good work has a floor; ours is measured in weeks of thinking, not days of production.",
  "Your budget is under $99. At that level a free site builder is honestly the right call — and we'll say so rather than take the money.",
  "You want an execution arm with no questions asked. We push back — that's most of what you're paying for.",
];
