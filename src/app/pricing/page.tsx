import type { Metadata } from "next";
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
    "Published minimums, three engagement models, and transparent growth retainer tiers. Projects from $15,000; retainers from $4,500/mo.",
};

const typicals = [
  { label: "Marketing site", range: "$25k – $60k", note: "8–12 weeks" },
  { label: "Web application", range: "$50k – $150k", note: "12–20 weeks" },
  { label: "Mobile app MVP", range: "$40k – $150k", note: "12–16 weeks" },
  { label: "Growth retainer", range: "$4.5k – $14k /mo", note: "3-month initial term" },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Projects start at <span className="text-accent">$15,000</span>. Retainers at{" "}
            <span className="text-accent">$4,500</span> a month.
          </>
        }
        intro="We publish this because vague pricing wastes your time and ours. If those numbers work, everything below explains exactly what they buy. If they don't — no hard feelings, and this page just saved you a discovery call."
      />

      {/* Typical ranges */}
      <Section tone="ink" pad="tight" seam={false} className="border-y border-line">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {typicals.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.06}>
              <MonoLabel>{t.label}</MonoLabel>
              <p className="mt-2 font-display text-2xl tracking-tight md:text-3xl">{t.range}</p>
              <p className="mt-1 font-mono text-[11px] text-mute">{t.note}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section tone="paper" index="01" eyebrow="Engagement models" seam={false}>
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-3xl md:col-span-7 md:text-4xl">
            First pick the relationship. Then the scope.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Three ways to buy — each with its own mechanics, spelled out before you commit to
            anything.
          </p>
        </div>
        <EngagementCards detailed />
        <div className="mt-10 border border-line bg-tone-2 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <MonoLabel className="text-accent">For agencies</MonoLabel>
              <p className="mt-2 text-lg font-medium">White-label overflow, under NDA.</p>
              <p className="mt-2 max-w-[64ch] text-[15px] text-mute">
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
      <Section tone="paper" index="02" eyebrow="Growth retainers" className="pt-0 md:pt-0 lg:pt-0">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-3xl md:col-span-7 md:text-4xl">
            Retainers priced like software.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Defined deliverables per tier, a live dashboard, and terms designed to be easy to leave
            — so staying means the numbers work.
          </p>
        </div>
        <PricingMatrix />
      </Section>

      {/* Friction as filter */}
      <Section tone="ink" index="03" eyebrow="When we're not the right call">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="headline text-3xl md:text-4xl">We&apos;d rather lose the deal than the plot.</h2>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-mute">
              Premium work has preconditions. If any of these describe your situation, we&apos;re
              genuinely not your best option — and we&apos;ll say so on the first call too.
            </p>
          </div>
          <ul className="space-y-6 lg:col-span-6 lg:col-start-7">
            {notAFit.map((item, i) => (
              <Reveal as="li" key={i} delay={i * 0.06} className="flex gap-5 border-t border-line pt-6">
                <span aria-hidden className="font-mono text-[13px] text-accent">
                  ✕
                </span>
                <p className="leading-relaxed text-mute">
                  <span className="text-fg">{item.split(".")[0]}.</span>
                  {item.substring(item.indexOf(".") + 1)}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Money FAQ + CTA */}
      <Section tone="paper" index="04" eyebrow="Money questions">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="headline text-3xl md:text-4xl">Asked on almost every first call.</h2>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Get a fixed quote
              </Button>
              <p className="mt-4 font-mono text-[12px] text-mute">
                Two-week discovery → written scope &amp; fixed price · reply within{" "}
                {site.anchors.responseTime}
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Accordion items={getFaqs(["budget", "overrun", "retainer-lock", "small-budget"])} />
          </div>
        </div>
      </Section>
    </>
  );
}
