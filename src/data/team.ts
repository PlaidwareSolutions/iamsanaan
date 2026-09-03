export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  /** hue rotation used by the duotone portrait mark */
  seed: number;
};

export const team: TeamMember[] = [
  {
    name: "Sanaan Nawaz",
    role: "Founder & Principal",
    bio: "Sets the bar and answers for it. Eighteen years across product engineering and brand — still reviews every launch personally.",
    initials: "SN",
    seed: 0,
  },
  {
    name: "Mara Ellison",
    role: "Design Director",
    bio: "Owns the pixels and the reasons behind them. Previously led design systems at two venture-backed platforms.",
    initials: "ME",
    seed: 1,
  },
  {
    name: "Deniz Aksoy",
    role: "Engineering Lead",
    bio: "Writes the code clients inherit gladly. Obsessive about performance budgets and boring, dependable architecture.",
    initials: "DA",
    seed: 2,
  },
  {
    name: "Priya Raghavan",
    role: "Mobile Lead",
    bio: "Swift and Kotlin, natively. Shipped consumer apps with a combined 40M installs before joining Sanaan.",
    initials: "PR",
    seed: 3,
  },
  {
    name: "Jonah Reyes",
    role: "Growth Lead",
    bio: "Treats marketing like engineering: hypotheses, experiments, logs. Allergic to vanity metrics.",
    initials: "JR",
    seed: 4,
  },
  {
    name: "Ana Kovač",
    role: "Delivery Lead",
    bio: "The reason launches are boring. Runs every project's cadence, demos, and the promise that Fridays mean progress.",
    initials: "AK",
    seed: 5,
  },
];

export const values = [
  { word: "Candor", detail: "We tell you the uncomfortable thing in week one, not week ten." },
  { word: "Craft", detail: "The staging build is the sales pitch. Nothing ships that we wouldn't sign." },
  { word: "Ownership", detail: "Your accounts, your code, your data. Leaving us should be easy — so staying means something." },
  { word: "Cadence", detail: "Every Friday, something you can click. Momentum is a deliverable." },
];

export const guarantees = {
  playbook: [
    "Quote low, invoice high",
    "Senior pitch, junior delivery",
    "Silence between invoices",
    "Hostage hosting and mystery stacks",
    "Reports designed to be unreadable",
  ],
  promises: [
    "Fixed quotes that only move when scope does — in writing, first",
    "The team you meet is the team that ships",
    "A reply within one business day, every time",
    "Your accounts, your code, your keys, from day one",
    "One dashboard, readable in thirty seconds",
  ],
};
