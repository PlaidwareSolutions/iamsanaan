import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { phases, sprint } from "@/data/process";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Gallery } from "@/components/ui/Gallery";
import { ScrollText } from "@/components/ui/ScrollText";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Five phases, weekly demos, a staging URL that improves every Friday, and support SLAs after launch. How Sanaan runs projects.",
};

const slas = [
  { severity: "P1 — Production down", response: "4 business hours", resolution: "Same day" },
  { severity: "P2 — Feature broken", response: "1 business day", resolution: "Within 3 days" },
  { severity: "P3 — Cosmetic / minor", response: "2 business days", resolution: "Next release" },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="A factory floor you can walk."
        intro="Software projects fail in the dark. Ours run in the open: five phases, weekly demos, a staging URL that gets better every Friday, and a support plan that outlives the launch party. This page is the actual operating manual, not marketing."
      />

      {/* Phases */}
      <Section tone="gray" eyebrow="The five phases" title="From first call to launch, in the open.">
        <div className="space-y-4">
          {phases.map((phase) => (
            <Reveal key={phase.index}>
              <article className="tile grid gap-8 p-8 md:p-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <p className="text-gradient text-[56px] leading-none font-semibold tracking-[-0.03em] md:text-[72px]">
                    {phase.index}
                  </p>
                  <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.02em]">{phase.name}</h2>
                  <MonoLabel className="mt-1 block">{phase.window}</MonoLabel>
                </div>
                <div className="lg:col-span-4">
                  <p className="text-[17px] leading-[1.47] text-mute">{phase.summary}</p>
                  <div className="mt-6 rounded-card bg-tone p-5">
                    <MonoLabel>What you’ll see</MonoLabel>
                    <p className="mt-1.5 text-[15px] leading-[1.47]">{phase.youSee}</p>
                  </div>
                </div>
                <div className="lg:col-span-3 lg:col-start-10">
                  <MonoLabel>Deliverables</MonoLabel>
                  <ul className="mt-4 space-y-2.5">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex gap-3 text-[15px]">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Design sprint */}
      <Section
        tone="paper"
        eyebrow="Inside the design phase"
        title="One week from question to tested prototype."
        lede="Design runs on a five-day sprint cycle. Here’s one week, hour by honest hour."
      >
        <Gallery label="The design sprint, day by day" itemClassName="w-[min(300px,78vw)]">
          {sprint.map((day) => (
            <div key={day.day} className="tile flex h-full min-h-[260px] flex-col bg-tone-2 p-7">
              <MonoLabel className="text-accent">{day.day}</MonoLabel>
              <p className="mt-3 text-[21px] font-semibold tracking-[-0.01em]">{day.name}</p>
              <p className="mt-3 text-[15px] leading-[1.47] text-mute">{day.detail}</p>
            </div>
          ))}
        </Gallery>
      </Section>

      {/* Post-launch support */}
      <Section tone="gray" eyebrow="After launch" title="Software needs care. We say so upfront.">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-[46ch] text-[17px] leading-[1.47] text-mute">
              Every engagement includes a 60-day warranty — anything we built that breaks, we fix,
              free, fast. After that, support runs on a retainer with response times we put in
              writing. The engineers who built your product answer the tickets; there is no
              “support tier” of strangers.
            </p>
            <p className="mt-6 text-[12px] text-mute">
              Support retainers from $49/mo · included in all growth retainers
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="tile overflow-hidden">
              <div className="grid grid-cols-3 gap-4 border-b border-line bg-tone p-5">
                <MonoLabel as="h3">Severity</MonoLabel>
                <MonoLabel as="h3">First response</MonoLabel>
                <MonoLabel as="h3">Target resolution</MonoLabel>
              </div>
              {slas.map((sla) => (
                <div key={sla.severity} className="grid grid-cols-3 gap-4 border-b border-line p-5 last:border-b-0">
                  <p className="text-[15px] font-semibold">{sla.severity}</p>
                  <p className="text-[15px] text-link">{sla.response}</p>
                  <p className="text-[15px] text-mute">{sla.resolution}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-mute">
              Measured from your message, not from when we “triage” it. Misses are credited without
              being asked.
            </p>
          </div>
        </div>
      </Section>

      {/* Who does the work */}
      <Section tone="paper" containerClassName="max-w-[1036px]">
        <ScrollText
          as="h2"
          className="headline text-[32px] md:text-[44px] lg:text-[48px]"
          text="The team you meet in the first call is the team that ships. No handoff to a delivery office, no rotating cast, no offshore bait-and-switch."
        />
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href="/contact" size="lg">
            Start a project
          </Button>
          <p className="text-[17px] text-mute">
            Six senior people, one standard.{" "}
            <Link href="/about" className="u-link">
              Meet them
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
