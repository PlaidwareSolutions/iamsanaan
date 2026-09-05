/**
 * Personal marriage biodata served at /bio-data. Reachable only by direct
 * link: nothing on the site links to it and the page is marked noindex.
 * All content lives here — the page is just layout.
 */
export type BiodataRow = {
  label: string;
  value: string;
  /** Rendered as a tap-to-call link beneath the value. */
  phone?: string;
  /** Smaller line beneath the value (after the phone, if both). */
  note?: string;
  emphasis?: boolean;
};

export type BiodataSection =
  | { title: string; rows: BiodataRow[] }
  | { title: string; items: string[] };

export type Biodata = {
  bismillah: string;
  kicker: string;
  name: string;
  tagline: string;
  sections: BiodataSection[];
  footer: { left: string; right: string };
  verdict: {
    question: string;
    hint: string;
    certificate: { kicker: string; title: string; lines: string[]; sign: string };
  };
};

export const biodata: Biodata = {
  bismillah: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم",
  kicker: "Biodata for Marriage",
  name: "Syed Zahiruddin Sanaan",
  tagline:
    "Software Engineer, healthcare domain · Houston, Texas · Family from Tolichowki, Hyderabad",
  sections: [
    {
      title: "Personal",
      rows: [
        { label: "Date of Birth", value: "03 February 1999" },
        { label: "Height", value: "5′ 10″" },
        { label: "Complexion", value: "Wheatish" },
        { label: "Religion", value: "Islam (Sunni Muslim)" },
        { label: "Born and Raised", value: "Hyderabad, Telangana" },
        { label: "Current Residence", value: "Houston, Texas, USA" },
      ],
    },
    {
      title: "Profession & Education",
      rows: [
        { label: "Occupation", value: "Software Engineer — Healthcare Domain", emphasis: true },
        { label: "Immigration Status", value: "H-1B (USA)" },
        { label: "Post-Graduate", value: "M.S. Computer Science — Lamar University, Texas" },
        {
          label: "Graduate",
          value:
            "B.E. Information Technology — Muffakham Jah College of Engineering & Technology, Hyderabad",
        },
        { label: "Intermediate", value: "Hyderabad Institute of Excellence" },
        { label: "Schooling", value: "International School, Shaikpet" },
      ],
    },
    {
      title: "Family",
      rows: [
        { label: "Father", value: "Syed Sharifuddin — Private service, Hyderabad" },
        { label: "Mother", value: "Government service, Hyderabad" },
        { label: "Brother", value: "Pursuing B.E. (CSE), Hyderabad" },
        { label: "Paternal Grandfather", value: "Late Syed Zaheeruddin — Nayab Qazi" },
        {
          label: "Maternal Grandfather",
          value: "Late Mohd Khaja Moinuddin — Executive Officer, Agriculture Department",
        },
        { label: "Family Home", value: "Tolichowki, Hyderabad" },
      ],
    },
    {
      title: "Looking For",
      items: [
        "A well educated, practising Muslim girl who is family oriented",
        "Age less than 27 years",
      ],
    },
    {
      title: "Contact",
      rows: [
        {
          label: "Father",
          value: "Syed Sharifuddin",
          phone: "+91 94929 82123",
          note: "Tolichowki, Hyderabad",
        },
      ],
    },
  ],
  footer: { left: "Syed Zahiruddin Sanaan", right: "Hyderabad · Houston" },
  verdict: {
    question: "Did you like the profile?",
    hint: "(the “No” button has a mind of its own)",
    certificate: {
      kicker: "Certificate of Excellent Judgement",
      title: "Congratulations!",
      lines: [
        "You have officially selected the correct answer. Independent panels (consisting of Syed's mother) have confirmed this is the objectively right choice. Your taste is not in question.",
        "Verified: your judgement is impeccable, your standards are high, and clearly you know quality when you see it.",
        "This certificate confirms that you have exceptional taste, excellent instincts, and possibly psychic levels of insight.",
        "Officially recorded: one (1) correct decision made today. The bar has been set. Everyone else is just catching up.",
      ],
      sign: "Issued this day · Verified by Vibes",
    },
  },
};
