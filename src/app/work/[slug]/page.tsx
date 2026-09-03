import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { MonoLabel, Tag } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MetricStat } from "@/components/ui/MetricStat";
import { Vignette } from "@/components/vignettes/Vignette";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.client} — Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      {/* Opener */}
      <div className="tone-ink pt-32 pb-16 md:pt-44 md:pb-20">
        <Container>
          <Reveal>
            <MonoLabel>
              Case study · {study.industry} · {study.year}
            </MonoLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="headline mt-5 max-w-[22ch] text-4xl sm:text-5xl md:text-6xl">
              {study.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="font-display text-2xl">{study.client}</p>
            <div className="flex flex-wrap gap-2">
              {study.services.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <MonoLabel>{study.duration}</MonoLabel>
          </Reveal>
          <Reveal delay={0.24} className="mt-14">
            <Vignette id={study.vignette} className="mx-auto max-w-5xl" />
          </Reveal>
        </Container>
      </div>

      {/* Context + problem */}
      <Section tone="paper" index="01" eyebrow="The problem" seam={false}>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <MonoLabel>Client context</MonoLabel>
            <p className="mt-4 leading-relaxed text-mute">{study.context}</p>
            <div className="mt-8 border-t border-line pt-6">
              <MonoLabel>Stack</MonoLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {study.stack.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="headline text-2xl leading-[1.25] md:text-3xl">{study.problem}</p>
          </Reveal>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="paper" index="02" eyebrow="The approach" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-3">
          {study.approach.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="border-t border-line pt-6">
                <MonoLabel className="text-accent">{String(i + 1).padStart(2, "0")}</MonoLabel>
                <h2 className="mt-3 text-lg font-medium md:text-xl">{step.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-mute">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Solution */}
      <Section tone="ink" index="03" eyebrow="What shipped">
        <div className="grid gap-12 lg:grid-cols-12">
          {study.solution.map((block, i) => (
            <Reveal
              key={block.title}
              delay={i * 0.08}
              className={i === 0 ? "lg:col-span-5" : "lg:col-span-5 lg:col-start-8"}
            >
              <h2 className="headline text-2xl md:text-3xl">{block.title}</h2>
              <p className="mt-4 leading-relaxed text-mute">{block.body}</p>
            </Reveal>
          ))}
        </div>

        {study.hasBeforeAfter && (
          <Reveal className="mt-16">
            <BeforeAfterSlider className="mx-auto max-w-5xl" />
          </Reveal>
        )}
      </Section>

      {/* Outcomes */}
      <Section tone="ink" index="04" eyebrow="The outcome" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {study.metrics.map((m) => (
            <MetricStat key={m.label} metric={m} valueClassName="text-accent" />
          ))}
        </div>
      </Section>

      {/* Quote */}
      <Section tone="paper" pad="default" seam={false}>
        <figure className="mx-auto max-w-[52ch] text-center">
          <blockquote className="headline text-2xl leading-[1.25] md:text-3xl">
            &ldquo;{study.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-8">
            <p className="font-medium">{study.quote.author}</p>
            <MonoLabel className="mt-1 block">{study.quote.role}</MonoLabel>
          </figcaption>
        </figure>
      </Section>

      {/* Next case */}
      <div className="tone-ink border-t border-line">
        <Container className="grid gap-px md:grid-cols-2">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col justify-between gap-6 py-14 pr-8 transition-colors duration-500 md:border-r md:border-line"
          >
            <MonoLabel>Next case study</MonoLabel>
            <div>
              <p className="headline text-3xl transition-colors duration-300 group-hover:text-accent md:text-4xl">
                {next.client}
              </p>
              <p className="mt-2 max-w-[40ch] text-sm text-mute">{next.headline}</p>
            </div>
            <span className="inline-flex items-center gap-2 font-medium">
              Read it
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
          <div className="flex flex-col justify-between gap-6 py-14 md:pl-12">
            <MonoLabel>Your project</MonoLabel>
            <p className="headline max-w-[16ch] text-3xl md:text-4xl">
              What number do you need to move?
            </p>
            <div>
              <Button href="/contact">Start a project</Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
