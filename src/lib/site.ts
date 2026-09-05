/**
 * Single source of truth for brand identity and hard business facts.
 * Rename the studio or change anchors here — nothing else needs touching.
 */
export const site = {
  name: "Sanaan",
  wordmark: "sanaan",
  legalName: "Sanaan Digital Studio LLC",
  tagline: "We build websites and mobile apps.",
  description:
    "Sanaan builds websites and mobile apps for businesses in Houston and beyond. Fixed prices, progress you can see every week, and you own everything we make.",
  url: "https://iamsanaan.com",
  email: "sanaan7788@gmail.com",
  phone: "+1 (346) 244-0364",
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
