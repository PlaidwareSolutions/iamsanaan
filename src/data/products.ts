/**
 * The real product portfolio — vertical SaaS built and operated in-house,
 * running on the Plaidware platform (plaidware.com). Taglines and pricing
 * are quoted from the live product catalog.
 */
export type Product = {
  slug: string;
  name: string;
  vertical: string;
  tagline: string;
  description: string;
  pricing: string;
  url: string;
  /** Live capture of the product's own homepage, used as the card ground. */
  screen?: string;
};

export const products: Product[] = [
  {
    slug: "buildorata",
    name: "Buildorata",
    vertical: "Construction",
    tagline: "Construction management for small crews.",
    description:
      "Project and crew management sized for small construction outfits — the jobs, the people, and the compliance paperwork in one place instead of a truck-cab notebook.",
    pricing: "from $199/mo · $2,500 onboarding",
    url: "https://buildorata.com/",
    screen: "/products/buildorata.jpg",
  },
  {
    slug: "fixorata",
    name: "Fixorata",
    vertical: "Repair shops",
    tagline: "Run the counter, the bench, and the books.",
    description:
      "Operations software for repair shops: front-counter intake, workshop tracking, and bookkeeping working as one system.",
    pricing: "from $149/mo · $1,500 onboarding",
    url: "https://fixorata.com/",
    screen: "/products/fixorata.jpg",
  },
  {
    slug: "drivorata",
    name: "Drivorata",
    vertical: "Driving schools",
    tagline: "Scheduling and student management for driving schools.",
    description:
      "Lesson scheduling and student administration for driving schools — instructors, vehicles, and student progress without the spreadsheet shuffle.",
    pricing: "from $129/mo · $1,200 onboarding",
    url: "https://drivorata.com/",
    screen: "/products/drivorata.jpg",
  },
  {
    slug: "rentorata",
    name: "Rentorata",
    vertical: "Property management",
    tagline: "Property management without the paperwork.",
    description:
      "Streamlined property administration for landlords and managers, down to resident billing — the recurring work of rentals, automated.",
    pricing: "from $229/mo per property · $1,800 onboarding",
    url: "https://rentorata.com/",
  },
  {
    slug: "proporata",
    name: "PropOrata",
    vertical: "HOA governance",
    tagline: "HOA management that boards actually like.",
    description:
      "Governance tooling for homeowners associations — board management and compliance for communities up to and beyond 100 units.",
    pricing: "from $149/mo · $5,000 onboarding",
    url: "https://proporata.com/",
    screen: "/products/proporata.jpg",
  },
];

/** The operating layer behind every product — quoted from the platform page. */
export const platformServices = [
  { name: "Onboarding", detail: "Rapid deployment from proposal to launch" },
  { name: "Provisioning", detail: "Domain, DNS, and hosting managed" },
  { name: "Access & roles", detail: "Unified team authentication with permissions" },
  { name: "Monitoring", detail: "Uptime tracking, KPI dashboards, SEO audits" },
  { name: "Billing", detail: "One consolidated invoice" },
  { name: "Automations", detail: "Routine tasks on a schedule, not a to-do list" },
];

export const platformName = "Plaidware";
export const platformUrl = "https://plaidware.com";
export const platformTagline = "One control plane for every product we run.";
