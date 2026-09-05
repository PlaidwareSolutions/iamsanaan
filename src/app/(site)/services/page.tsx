import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { services } from "@/data/services";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel, Tag } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web platforms, mobile apps, and growth engineering — three disciplines, one standard. Engagements from $99.",
};

const groups = [
  {
    key: "Build" as const,
    lede: "Products engineered to ship and to last — the platforms your business runs on.",
  },
  {
    key: "Grow" as const,
    lede: "The acquisition system behind what we build — measured in pipeline, not impressions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Deliberately narrow. Deliberately deep."
        intro="We do three things, and we do them with senior people from the first call to the last deploy. If you need something outside these lines, we’ll tell you — and point you to someone better suited."
      />

      {groups.map((group, gi) => (
        <Section key={group.key} tone={gi === 0 ? "gray" : "paper"} eyebrow={group.key} title={group.lede}>
          <div className="grid gap-4 lg:grid-cols-2">
            {services
              .filter((s) => s.group === group.key)
              .map((service) => (
                <Reveal key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group tile flex h-full flex-col p-8 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile md:p-10"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <MonoLabel>{service.index}</MonoLabel>
                        <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-link md:text-[32px]">
                          {service.name}
                        </h2>
                      </div>
                      <ChevronRight
                        aria-hidden
                        className="mt-3 size-5 shrink-0 text-mute transition-transform duration-300 ease-(--ease-swift) group-hover:translate-x-0.5 group-hover:text-link"
                      />
                    </div>
                    <p className="mt-4 max-w-[50ch] text-[17px] leading-[1.47] text-mute">{service.outcome}</p>

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

                    <p className="mt-auto border-t border-line pt-5 text-[12px] text-mute">
                      <span className="text-fg">{service.engagementFit.model}</span> ·{" "}
                      <span className="text-link">{service.engagementFit.anchor}</span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            {group.key === "Grow" && (
              <Reveal delay={0.08}>
                <div className="tile flex h-full flex-col p-8 md:p-10">
                  <MonoLabel className="text-accent">Transparent tiers</MonoLabel>
                  <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] md:text-[32px]">
                    Retainers priced like software.
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.47] text-mute">
                    Foundation, Traction, and Scale — defined deliverables per tier, monthly or
                    quarterly billing, and terms designed to be easy to leave. From $99/mo.
                  </p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6 text-[15px] text-mute">
                    <li>
                      Foundation — <span className="text-fg">$99/mo</span> · owned-channel groundwork
                    </li>
                    <li>
                      Traction — <span className="text-fg">$499/mo</span> · the full acquisition system
                    </li>
                    <li>
                      Scale — <span className="text-fg">$999/mo</span> · a dedicated growth pod
                    </li>
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
    </>
  );
}
