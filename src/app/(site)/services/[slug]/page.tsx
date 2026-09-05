import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { getFaqs } from "@/data/faqs";
import { PageHeader } from "@/components/PageHeader";
import { LocalNav } from "@/components/ui/LocalNav";
import { Section } from "@/components/ui/Section";
import { MonoLabel, Tag } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { VignetteBoard } from "@/components/vignettes/VignetteBoard";
import { PricingMatrix } from "@/components/sections/PricingMatrix";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: service.name, description: service.metaDescription };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const anchors = [
    { label: "What this covers", href: "#covers" },
    { label: "How it runs", href: "#runs" },
    ...(service.slug === "growth" ? [{ label: "Retainers", href: "#retainers" }] : []),
    { label: "Working together", href: "#working" },
  ];

  return (
    <>
      <LocalNav title={service.name} href={`/services/${service.slug}`} links={anchors} />
      <PageHeader
        compact
        eyebrow={`Services · ${service.group}`}
        title={service.heroTitle}
        intro={service.heroBody}
        meta={
          <div className="flex flex-wrap justify-center gap-2">
            {service.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        }
      />

      {/* What we build */}
      <Section id="covers" tone="gray" className="scroll-mt-[100px]" eyebrow="What this covers" title="Built like a product, not a brochure.">
        <div className="grid gap-4 md:grid-cols-2">
          {service.capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 2) * 0.08} className="tile p-8 md:p-9">
              <MonoLabel className="text-accent">{String(i + 1).padStart(2, "0")}</MonoLabel>
              <h2 className="mt-3 text-[21px] font-semibold tracking-[-0.01em] md:text-[24px]">{cap.title}</h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.47] text-mute">{cap.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it runs */}
      <Section id="runs" tone="ink" className="scroll-mt-[100px]" eyebrow="How it runs" title="The same discipline, tuned to this work.">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ol className="space-y-8">
              {service.approach.map((step, i) => (
                <Reveal as="li" key={step.step} delay={i * 0.06} className="flex gap-6">
                  <span className="text-[12px] font-semibold text-link">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[17px] font-semibold">{step.step}</h3>
                    <p className="mt-1.5 max-w-[48ch] text-[15px] leading-[1.47] text-mute">{step.detail}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-6">
            <VignetteBoard />
            <p className="mt-4 text-center text-[12px] text-mute">
              The delivery board, mid-sprint — what every client sees on Fridays
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Growth retainers matrix, only on the growth page */}
      {service.slug === "growth" && (
        <Section
          id="retainers"
          tone="gray"
          className="scroll-mt-[100px]"
          eyebrow="Retainers"
          title="Priced like software, because it runs like software."
          lede="Transparent tiers, defined deliverables, no surprise line items."
        >
          <PricingMatrix />
        </Section>
      )}

      {/* Engagement fit + contextual objections */}
      <Section id="working" tone="paper" className="scroll-mt-[100px]" eyebrow="Working together">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MonoLabel>Typical engagement</MonoLabel>
            <p className="headline mt-3 text-[32px] md:text-[40px]">
              {service.engagementFit.model}, <span className="text-gradient">{service.engagementFit.anchor}</span>
            </p>
            <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.47] text-mute">{service.engagementFit.note}</p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Start a project
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Accordion items={getFaqs(service.faqIds)} />
          </div>
        </div>
      </Section>
    </>
  );
}
