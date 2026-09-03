import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel, Tag } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web platforms, mobile apps, and growth engineering — three disciplines, one standard. Engagements from $15,000.",
};

const groups = [
  {
    key: "Build" as const,
    label: "Build",
    lede: "Products engineered to ship and to last — the platforms your business runs on.",
  },
  {
    key: "Grow" as const,
    label: "Grow",
    lede: "The acquisition system behind what we build — measured in pipeline, not impressions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Deliberately narrow. Deliberately deep."
        intro="We do three things, and we do them with senior people from the first call to the last deploy. If you need something outside these lines, we'll tell you — and point you to someone better suited."
      />

      {groups.map((group, gi) => (
        <Section
          key={group.key}
          tone={gi === 0 ? "paper" : "paper"}
          index={`0${gi + 1}`}
          eyebrow={group.label}
          pad="default"
          className={gi === 1 ? "pt-0 md:pt-0 lg:pt-0" : undefined}
        >
          <p className="mb-12 max-w-[48ch] text-lg text-mute">{group.lede}</p>
          <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
            {services
              .filter((s) => s.group === group.key)
              .map((service) => (
                <Reveal key={service.slug} className="bg-tone">
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-tone-2 md:p-10"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <MonoLabel className="text-accent">{service.index}</MonoLabel>
                        <h2 className="headline mt-3 text-3xl transition-colors duration-300 group-hover:text-accent md:text-4xl">
                          {service.name}
                        </h2>
                      </div>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-2 size-6 shrink-0 text-mute transition-all duration-300 ease-(--ease-swift) group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                      />
                    </div>
                    <p className="mt-4 max-w-[50ch] leading-relaxed text-mute">{service.outcome}</p>

                    <ul className="mt-8 space-y-3 border-t border-line pt-6">
                      {service.capabilities.map((cap) => (
                        <li key={cap.title} className="text-[15px]">
                          {cap.title}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {service.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>

                    <p className="mt-auto border-t border-line pt-5 font-mono text-[12px] text-mute">
                      <span className="text-fg">{service.engagementFit.model}</span> ·{" "}
                      <span className="text-accent">{service.engagementFit.anchor}</span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            {group.key === "Grow" && (
              <Reveal delay={0.08} className="bg-tone-2">
                <div className="flex h-full flex-col p-8 md:p-10">
                  <MonoLabel className="text-accent">Transparent tiers</MonoLabel>
                  <h2 className="headline mt-3 text-3xl md:text-4xl">
                    Retainers priced like software.
                  </h2>
                  <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">
                    Foundation, Traction, and Scale — defined deliverables per tier, monthly or
                    quarterly billing, and terms designed to be easy to leave. From $4,500/mo.
                  </p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[15px] text-mute">
                    <li>Foundation — <span className="text-fg">$4,500/mo</span> · owned-channel groundwork</li>
                    <li>Traction — <span className="text-fg">$8,000/mo</span> · the full acquisition system</li>
                    <li>Scale — <span className="text-fg">$14,000/mo</span> · a dedicated growth pod</li>
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href="/pricing" variant="ghost">
                      Compare the tiers
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Section>
      ))}

      <Section tone="ink" pad="tight" seam={false}>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="headline text-3xl md:text-4xl">Not sure which shape fits?</h2>
            <p className="mt-3 max-w-[46ch] text-mute">
              Send us the problem, not a spec. We&apos;ll tell you what we&apos;d build — and what
              we wouldn&apos;t — within {site.anchors.responseTime}.
            </p>
          </div>
          <Button href="/contact" size="lg">
            Start a project
          </Button>
        </div>
      </Section>
    </>
  );
}
