/**
 * Single source of truth for brand identity and hard business facts.
 * Rename the studio or change anchors here — nothing else needs touching.
 */
export const site = {
  name: "Sanaan",
  wordmark: "sanaan",
  legalName: "Sanaan Digital Studio LLC",
  tagline: "Digital products that generate pipeline.",
  description:
    "Sanaan is a digital product and growth studio. We design and build web platforms, mobile apps, and the growth engines behind them — for companies that can't afford a miss.",
  url: "https://iamsanaan.com",
  email: "studio@iamsanaan.com",
  phone: "+1 (713) 555-0164",
  address: "2200 Post Oak Blvd, Suite 410, Houston, TX",
  founded: 2017,
  anchors: {
    projectMinimum: "$99",
    retainerMinimum: "$99/mo",
    responseTime: "one business day",
  },
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
} as const;
