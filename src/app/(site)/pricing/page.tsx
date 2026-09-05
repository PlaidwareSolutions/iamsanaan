import type { Metadata } from "next";
import { X } from "lucide-react";
import { site } from "@/lib/site";
import { notAFit } from "@/data/pricing";
import { getFaqs } from "@/data/faqs";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { EngagementCards } from "@/components/sections/EngagementCards";
import { PricingMatrix } from "@/components/sections/PricingMatrix";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Published minimums, three engagement models, and transparent growth retainer tiers. Projects from $99; retainers from $99/mo.",
};

const typicals = [
  { label: "Marketing site", range: "$99 – $2,000", note: "1–4 weeks" },
  { label: "Web application", range: "$2,000 – $10,000", note: "4–10 weeks" },
  { label: "Mobile app MVP", range: "$2,500 – $10,000+", note: "6–12 weeks" },
  { label: "Growth retainer", range: "$99 – $999 /mo", note: "3-month initial term" },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Every engagement starts at <span className="text-gradient">$99</span>.
          </>
        }
        intro="We publish this because vague pricing wastes your time and ours. If those numbers work, everything below explains exactly what they buy. If they don’t — no hard feelings, and this page just saved you a discovery call."
      />

      {/* Typical ranges */}
      <Section tone="gray" pad="tight">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {typicals.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.06} className="tile p-6 md:p-7">
              <MonoLabel>{t.label}</MonoLabel>
              <p className="mt-2 text-[24px] font-semibold tracking-[-0.02em] md:text-[28px]">{t.range}</p>
              <p className="mt-1 text-[12px] text-mute">{t.note}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section
        tone="paper"
        eyebrow="Engagement models"
        title="First pick the relationship. Then the scope."
        lede="Three ways to buy — each with its own mechanics, spelled out before you commit to anything."
      >
        <EngagementCards detailed />
        <div className="tile mt-4 p-7 md:p-9">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <MonoLabel className="text-accent">For agencies</MonoLabel>
              <p className="mt-2 text-[21px] font-semibold tracking-[-0.01em]">White-label overflow, under NDA.</p>
              <p className="mt-2 max-w-[64ch] text-[15px] leading-[1.47] text-mute">
                Senior design and engineering capacity for agencies protecting a deadline or a
                reputation. Your client never sees our name; your margin stays yours. Same pricing,
                20% partner discount on retainers.
              </p>
            </div>
            <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
              <Button href="/contact" variant="ghost">
                Ask about partnership
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Growth retainer matrix */}
      <Section
        tone="gray"
        eyebrow="Growth retainers"
        title="Retainers priced like software."
        lede="Defined deliverables per tier, a live dashboard, and terms designed to be easy to leave — so staying means the numbers work."
      >
        <PricingMatrix />
      </Section>

      {/* Friction as filter */}
      <Section tone="ink" eyebrow="When we’re not the right call" title="We’d rather lose the deal than the plot.">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-[44ch] text-[17px] leading-[1.47] text-mute">
              Premium work has preconditions. If any of these describe your situation, we’re
              genuinely not your best option — and we’ll say so on the first call too.
            </p>
          </div>
          <ul className="space-y-6 lg:col-span-6 lg:col-start-7">
            {notAFit.map((item, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="flex gap-5 border-t border-line pt-6">
                <X aria-hidden className="mt-1 size-4 shrink-0 text-link" />
                <p className="text-[17px] leading-[1.47] text-mute">
                  <span className="text-fg">{item.split(".")[0]}.</span>
                  {item.substring(item.indexOf(".") + 1)}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Money FAQ + CTA */}
      <Section tone="paper" eyebrow="Money questions" title="Asked on almost every first call.">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Button href="/contact" size="lg">
              Get a fixed quote
            </Button>
            <p className="mt-4 text-[12px] text-mute">
              Two-week discovery → written scope &amp; fixed price · reply within {site.anchors.responseTime}
            </p>
          </div>
          <div className="lg:col-span-7">
            <Accordion items={getFaqs(["budget", "overrun", "retainer-lock", "small-budget"])} />
          </div>
        </div>
      </Section>
    </>
  );
}
