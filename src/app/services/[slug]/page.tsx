import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/data/services";
import { getFaqs } from "@/data/faqs";
import { PageHeader } from "@/components/PageHeader";
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

  return (
    <>
      <PageHeader
        eyebrow={`Services / ${service.group}`}
        title={service.heroTitle}
        intro={service.heroBody}
        meta={
          <div className="mt-8 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        }
      />

      {/* What we build */}
      <Section tone="paper" index="01" eyebrow="What this covers" seam={false}>
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {service.capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 2) * 0.08}>
              <div className="border-t border-line pt-6">
                <MonoLabel className="text-accent">{String(i + 1).padStart(2, "0")}</MonoLabel>
                <h2 className="mt-3 text-xl font-medium md:text-2xl">{cap.title}</h2>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-mute">{cap.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Vignette + how this service runs */}
      <Section tone="ink" index="02" eyebrow="How it runs">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="headline text-3xl md:text-4xl">
              The same discipline, tuned to this work.
            </h2>
            <ol className="mt-10 space-y-8">
              {service.approach.map((step, i) => (
                <Reveal as="li" key={step.step} delay={i * 0.06} className="flex gap-6">
                  <span className="font-mono text-[13px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-medium">{step.step}</h3>
                    <p className="mt-1.5 max-w-[48ch] text-[15px] leading-relaxed text-mute">
                      {step.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="lg:col-span-6">
            <VignetteBoard />
            <p className="mt-4 text-center font-mono text-[11px] tracking-[0.1em] text-mute uppercase">
              The delivery board, mid-sprint — what every client sees on Fridays
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Growth retainers matrix, only on the growth page */}
      {service.slug === "growth" && (
        <Section tone="paper" index="03" eyebrow="Retainers">
          <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
            <h2 className="headline text-3xl md:col-span-7 md:text-4xl">
              Priced like software, because it runs like software.
            </h2>
            <p className="text-mute md:col-span-4 md:col-start-9">
              Transparent tiers, defined deliverables, no surprise line items.
            </p>
          </div>
          <PricingMatrix />
        </Section>
      )}

      {/* Engagement fit + contextual objections + CTA */}
      <Section tone="paper" index={service.slug === "growth" ? "04" : "03"} eyebrow="Working together">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <MonoLabel>Typical engagement</MonoLabel>
            <p className="headline mt-4 text-3xl md:text-4xl">
              {service.engagementFit.model},{" "}
              <span className="text-accent">{service.engagementFit.anchor}</span>
            </p>
            <p className="mt-5 max-w-[44ch] leading-relaxed text-mute">{service.engagementFit.note}</p>
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
