import type { Metadata } from "next";
import Link from "next/link";
import { phases, sprint } from "@/data/process";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

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
      <Section tone="paper" index="01" eyebrow="The five phases" seam={false}>
        <div className="space-y-0">
          {phases.map((phase) => (
            <Reveal key={phase.index}>
              <article className="grid gap-8 border-t border-line py-14 md:py-16 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-6xl text-accent md:text-7xl">{phase.index}</span>
                    <div>
                      <h2 className="headline text-3xl md:text-4xl">{phase.name}</h2>
                      <MonoLabel className="mt-2 block">{phase.window}</MonoLabel>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <p className="leading-relaxed text-mute">{phase.summary}</p>
                  <div className="mt-6 border-l-2 border-accent pl-4">
                    <MonoLabel>What you&apos;ll see</MonoLabel>
                    <p className="mt-1.5 text-[15px]">{phase.youSee}</p>
                  </div>
                </div>
                <div className="lg:col-span-3 lg:col-start-10">
                  <MonoLabel>Deliverables</MonoLabel>
                  <ul className="mt-4 space-y-2.5">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex gap-3 text-sm">
                        <span aria-hidden className="mt-[7px] size-1.5 shrink-0 bg-accent" />
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
      <Section tone="ink" index="02" eyebrow="Inside the design phase">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-3xl md:col-span-7 md:text-4xl">
            One week from question to tested prototype.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Design runs on a five-day sprint cycle. Here&apos;s one week, hour by honest hour.
          </p>
        </div>
        <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          <ol className="grid min-w-[820px] grid-cols-5 gap-px border border-line bg-line lg:min-w-0">
            {sprint.map((day, i) => (
              <Reveal as="li" key={day.day} delay={i * 0.06} className="bg-tone">
                <div className="group h-full p-6 transition-colors duration-500 hover:bg-tone-2">
                  <MonoLabel className="text-accent">{day.day}</MonoLabel>
                  <p className="mt-3 text-xl font-medium">{day.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{day.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Post-launch support */}
      <Section tone="ink" index="03" eyebrow="After launch" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="headline text-3xl md:text-4xl">
              Software needs care. We say so upfront.
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-mute">
              Every engagement includes a 60-day warranty — anything we built that breaks, we fix,
              free, fast. After that, support runs on a retainer with response times we put in
              writing. The engineers who built your product answer the tickets; there is no
              &ldquo;support tier&rdquo; of strangers.
            </p>
            <p className="mt-6 font-mono text-[12px] text-mute">
              Support retainers from $49/mo · included in all growth retainers
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-line">
              <div className="grid grid-cols-3 gap-4 border-b border-line bg-tone-2 p-4">
                <MonoLabel as="h3">Severity</MonoLabel>
                <MonoLabel as="h3">First response</MonoLabel>
                <MonoLabel as="h3">Target resolution</MonoLabel>
              </div>
              {slas.map((sla) => (
                <div key={sla.severity} className="grid grid-cols-3 gap-4 border-b border-line p-4 last:border-b-0">
                  <p className="text-sm font-medium">{sla.severity}</p>
                  <p className="text-sm text-accent">{sla.response}</p>
                  <p className="text-sm text-mute">{sla.resolution}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[12px] leading-relaxed text-mute">
              Measured from your message, not from when we &ldquo;triage&rdquo; it. Misses are
              credited without being asked.
            </p>
          </div>
        </div>
      </Section>

      {/* Who does the work */}
      <Section tone="paper" index="04" eyebrow="Who does the work">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="headline text-3xl leading-[1.15] md:text-4xl">
              The team you meet in the first call is the team that ships. No handoff to a
              &ldquo;delivery office,&rdquo; no rotating cast, no offshore bait-and-switch.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end gap-6 lg:col-span-3 lg:col-start-10">
            <p className="text-mute">
              Six senior people, one standard.{" "}
              <Link href="/about" className="u-link text-fg">
                Meet them
              </Link>
              .
            </p>
            <div>
              <Button href="/contact">Start a project</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
