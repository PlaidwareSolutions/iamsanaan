export type Tech = {
  name: string;
  note: string;
  caseStudySlugs: string[];
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
      { name: "React", note: "Interface layer for every web build since 2019", caseStudySlugs: ["veyra-freight", "ember-and-oak"] },
      { name: "Next.js", note: "Our default for marketing sites and platforms", caseStudySlugs: ["veyra-freight", "ember-and-oak"] },
      { name: "TypeScript", note: "Non-negotiable. Types are documentation that can't rot", caseStudySlugs: ["veyra-freight", "ember-and-oak"] },
      { name: "Tailwind CSS", note: "Design tokens enforced in code", caseStudySlugs: ["veyra-freight"] },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", note: "API layer shared across web and mobile", caseStudySlugs: ["veyra-freight", "pulseline"] },
      { name: "PostgreSQL", note: "The boring database that outlives trends", caseStudySlugs: ["veyra-freight", "pulseline"] },
      { name: "GraphQL", note: "Where clients own complex data needs", caseStudySlugs: [] },
      { name: "Redis", note: "Queues and caching for real-time workloads", caseStudySlugs: ["veyra-freight"] },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: [
      { name: "Swift", note: "Native iOS when precision matters", caseStudySlugs: ["pulseline"] },
      { name: "Kotlin", note: "Native Android, same standard", caseStudySlugs: ["pulseline"] },
      { name: "React Native", note: "Cross-platform when it's the right trade", caseStudySlugs: [] },
      { name: "HealthKit", note: "Device and health integrations done properly", caseStudySlugs: ["pulseline"] },
    ],
  },
  {
    id: "infra",
    label: "Cloud & Infra",
    items: [
      { name: "AWS", note: "Platforms with real operational load", caseStudySlugs: ["veyra-freight"] },
      { name: "Vercel", note: "Edge deployment for content and commerce", caseStudySlugs: ["ember-and-oak"] },
      { name: "Docker", note: "Reproducible environments, no snowflakes", caseStudySlugs: ["veyra-freight"] },
      { name: "GitHub Actions", note: "CI with performance budgets enforced", caseStudySlugs: ["veyra-freight", "pulseline", "ember-and-oak"] },
    ],
  },
  {
    id: "growth",
    label: "Growth",
    items: [
      { name: "GA4 + BigQuery", note: "Event tracking wired to revenue", caseStudySlugs: ["ember-and-oak"] },
      { name: "Search Console", note: "Technical SEO monitored continuously", caseStudySlugs: ["ember-and-oak"] },
      { name: "Google & Meta Ads", note: "Managed against cost per qualified lead", caseStudySlugs: ["ember-and-oak"] },
      { name: "Klaviyo", note: "Lifecycle email tied to store data", caseStudySlugs: ["ember-and-oak"] },
    ],
  },
];
