/**
 * Websites we designed, built, and shipped for real businesses — listed with
 * the product suite because we treat a client site the way we treat a product:
 * launched, measured, and maintained. Screens are captures of the live sites;
 * every bullet describes something you can click on there today.
 */
export type Site = {
  slug: string;
  name: string;
  vertical: string;
  location: string;
  url: string;
  summary: string;
  /** What the site does — observable on the live site, not projected. */
  built: string[];
  stack: string[];
  screens: { desktop: string; mobile: string };
};

export const sites: Site[] = [
  {
    slug: "cactus-boxing",
    name: "Cactus Boxing Gym",
    vertical: "Boxing gym",
    location: "Houston, TX",
    url: "https://www.cactusboxing.com/",
    summary:
      "A beginner-friendly boxing gym in Gulfton needed a site that takes a nervous first-timer from curious to booked. Every page ends at the free-trial form.",
    built: [
      "Programs, weekly schedule, pricing, and coach profiles",
      "Free-trial booking as the single call to action on every page",
      "Neighborhood pages for Bellaire, Meyerland, Sharpstown, and West University",
      "Learn-to-box guides and a boxing glossary for search traffic",
    ],
    stack: ["Next.js", "React", "TypeScript"],
    screens: {
      desktop: "/sites/cactus-boxing-desktop.jpg",
      mobile: "/sites/cactus-boxing-mobile.jpg",
    },
  },
  {
    slug: "ok-cellular",
    name: "OK Cellular",
    vertical: "Device repair & retail",
    location: "Humble, TX",
    url: "https://okcellularrepairs.com/",
    summary:
      "A walk-in shop that repairs phones, tablets, laptops, and consoles, sells refurbished devices, and activates prepaid carriers — and needs to rank for every one of those.",
    built: [
      "Searchable repair catalog with published prices per device and service",
      "Book-a-repair and mail-in flows, plus a sell-your-phone intake",
      "Dedicated landing pages for each device model and repair service",
      "Inventory storefront with Stripe checkout and ad conversion tracking",
    ],
    stack: ["React", "Vite", "TypeScript", "Stripe"],
    screens: {
      desktop: "/sites/ok-cellular-desktop.jpg",
      mobile: "/sites/ok-cellular-mobile.jpg",
    },
  },
  {
    slug: "all-ages-driving-school",
    name: "All Ages Driving School",
    vertical: "Driver education",
    location: "Pasadena · Cypress · Sugar Land, TX",
    url: "https://allagesdrivingschool.com/",
    summary:
      "A TDLR-certified driving school with three Texas locations, teaching teens and adults. The site is the front door to enrollment — and the school runs on Drivorata, our driving-school product.",
    built: [
      "Teen and adult programs, online courses, and road-test booking",
      "Package catalog with online enrollment",
      "A page per location and a Texas licensing requirements guide",
      "Student testimonials and a staff login into Drivorata",
    ],
    stack: ["React", "Vite", "TypeScript", "Drivorata"],
    screens: {
      desktop: "/sites/all-ages-driving-school-desktop.jpg",
      mobile: "/sites/all-ages-driving-school-mobile.jpg",
    },
  },
  {
    slug: "exact-point-repairs",
    name: "ExactPoint Appliance & HVAC",
    vertical: "Appliance repair & HVAC",
    location: "Greater Houston, TX",
    url: "https://exactpointrepairs.com/",
    summary:
      "A licensed, insured appliance-repair and HVAC company serving homes and businesses across Greater Houston. The site turns a dead fridge or a failed AC into a booked service call.",
    built: [
      "Service pages for twelve appliance and HVAC repair types, refrigerators to heating",
      "Book-service flow and click-to-call, with the waived diagnostic fee stated up front",
      "Service-area pages across Greater Houston and a gallery of real jobs",
      "Warranty and service policy pages, plus a team sign-in",
    ],
    stack: ["Next.js", "React", "TypeScript"],
    screens: {
      desktop: "/sites/exact-point-repairs-desktop.jpg",
      mobile: "/sites/exact-point-repairs-mobile.jpg",
    },
  },
];
