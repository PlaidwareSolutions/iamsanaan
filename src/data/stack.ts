export type Tech = {
  name: string;
  note: string;
};

export type StackCategory = {
  id: string;
  label: string;
  items: Tech[];
};

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", note: "Interface layer for every web build since 2019" },
      { name: "Next.js", note: "Our default for marketing sites and platforms" },
      { name: "TypeScript", note: "Non-negotiable. Types are documentation that can't rot" },
      { name: "Tailwind CSS", note: "Design tokens enforced in code" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", note: "API layer shared across web and mobile" },
      { name: "PostgreSQL", note: "The boring database that outlives trends" },
      { name: "GraphQL", note: "Where clients own complex data needs" },
      { name: "Redis", note: "Queues and caching for real-time workloads" },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [
      { name: "Swift", note: "Native iOS when precision matters" },
      { name: "Kotlin", note: "Native Android, same standard" },
      { name: "React Native", note: "Cross-platform when it's the right trade" },
      { name: "HealthKit", note: "Device and health integrations done properly" },
    ],
  },
  {
    id: "infra",
    label: "Cloud & Infra",
    items: [
      { name: "AWS", note: "Platforms with real operational load" },
      { name: "Vercel", note: "Edge deployment for content and commerce" },
      { name: "Docker", note: "Reproducible environments, no snowflakes" },
      { name: "GitHub Actions", note: "CI with performance budgets enforced" },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    items: [
      { name: "GA4 + BigQuery", note: "Event tracking wired to revenue" },
      { name: "Search Console", note: "Technical SEO monitored continuously" },
      { name: "Google & Meta Ads", note: "Managed against cost per qualified lead" },
      { name: "Klaviyo", note: "Lifecycle email tied to store data" },
    ],
  },
];
