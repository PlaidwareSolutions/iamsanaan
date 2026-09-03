export type Faq = {
  id: string;
  question: string;
  answer: string;
};

/** Objection-handling FAQ — the questions buyers are silently asking. */
export const faqs: Faq[] = [
  {
    id: "ownership",
    question: "Who owns the code and the accounts?",
    answer:
      "You do. Everything — code, designs, content, analytics, ad accounts — lives in accounts you own from day one, with full IP assignment on final payment. No proprietary platform, no hostage hosting, no exit fee. If we part ways, you lose nothing but us.",
  },
  {
    id: "team",
    question: "Who actually does the work?",
    answer:
      "The people you meet in the first call. We're a senior in-house team — no offshore handoff, no account-manager buffer, no bait-and-switch after the pitch. Every project has a named design lead and engineering lead you can message directly.",
  },
  {
    id: "budget",
    question: "What does this actually cost?",
    answer:
      "Projects start at $15,000 and growth retainers at $4,500/month — we publish this because vague pricing wastes everyone's time. Most web platforms land between $25k–$90k and mobile apps between $40k–$150k. Discovery produces a fixed quote before you commit to a build.",
  },
  {
    id: "timeline",
    question: "How long will it take, really?",
    answer:
      "Typical marketing sites ship in 8–12 weeks, platforms and apps in 12–16. We commit to dates at the end of discovery and we've missed two launch dates since 2017 — both moved by the client. You'll see a staging build every week, so you never have to take our word for progress.",
  },
  {
    id: "overrun",
    question: "What happens if the project runs over?",
    answer:
      "Fixed-scope means fixed: if we underestimate, that's our cost, not yours. The price only changes when the scope does, and scope changes are quoted in writing before we build them — never discovered on an invoice.",
  },
  {
    id: "stack",
    question: "Will we be locked into your technology?",
    answer:
      "No. We build on boring, widely-hired technology — React, Next.js, Swift, Kotlin, PostgreSQL — and write documentation assuming someone else will maintain it someday. Several clients have taken projects fully in-house; that's a feature of our work, not a failure of the relationship.",
  },
  {
    id: "support",
    question: "What happens after launch?",
    answer:
      "Software needs care after launch, so we plan for it instead of disappearing. Every project includes a 60-day warranty. After that, support retainers carry defined response times — P1 issues answered within 4 business hours by the engineers who built your product.",
  },
  {
    id: "retainer-lock",
    question: "Are we locked into a long retainer contract?",
    answer:
      "Three months initially — enough time for the work to show up in the numbers — then month-to-month with 30 days' notice. Every account, dashboard, and playbook is yours, so leaving is genuinely easy. Retention through results is the only kind we're interested in.",
  },
  {
    id: "reporting",
    question: "How do we know the growth work is working?",
    answer:
      "One live dashboard tying spend to qualified pipeline, readable in thirty seconds, plus a monthly memo in plain English. We report the metric your CFO cares about, and if a channel isn't earning its budget, we'll be the first to say so.",
  },
  {
    id: "small-budget",
    question: "We're not at $15k yet. Should we still talk?",
    answer:
      "Probably not yet — and we'd rather say that here than after a discovery call. When budget is the constraint, a strong template well-executed beats a thin custom build. Come back when the business is ready; we'll still be here.",
  },
];

export function getFaqs(ids: string[]) {
  return ids.map((id) => faqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}
