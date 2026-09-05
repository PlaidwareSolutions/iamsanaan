import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { getFaqs } from "@/data/faqs";
import { outcomesLine } from "@/data/clients";
import { products } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { MonoLabel, Tag } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { HeroCanvas } from "@/components/HeroCanvas";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { EngagementCards } from "@/components/sections/EngagementCards";
import { ProcessStrip } from "@/components/sections/ProcessStrip";

const studioStats = [
  { value: "2017", label: "operating since — same principals, same standard" },
  { value: "60+", label: "products shipped to production" },
  { value: "94%", label: "of revenue from repeat clients and referrals" },
];

export default function Home() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="tone-ink relative flex min-h-svh items-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroCanvas className="absolute inset-0" />
          {/* keep the left text column clean */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        </div>

        <Container className="relative pt-32 pb-24 md:pt-36">
          <Reveal>
            <MonoLabel>
              Digital product &amp; growth studio — {site.address.split(",").slice(-2).join(",").trim()}
            </MonoLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="headline mt-6 max-w-[13ch] text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl">
              Digital products that generate{" "}
              <em className="text-accent not-italic md:italic">pipeline.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-mute md:text-xl">
              We design and build web platforms, mobile apps, and the growth engines behind them —
              for companies whose next launch can&apos;t afford to miss.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              Start a project
            </Button>
            <Button href="/products" variant="ghost" size="lg">
              See our products
            </Button>
          </Reveal>
          <Reveal delay={0.32}>
            <p className="mt-10 font-mono text-[12px] tracking-[0.06em] text-mute">
              Engagements from {site.anchors.projectMinimum} · MVPs in 6–12 weeks · you own everything
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 02 — Trust marquee */}
      <div className="tone-ink border-y border-line py-10 md:py-12">
        <LogoMarquee />
        <Container>
          <p className="mt-8 text-center font-mono text-[12px] tracking-[0.06em] text-mute">
            {outcomesLine}
          </p>
        </Container>
      </div>

      {/* 03 — Problem statement */}
      <Section tone="paper" index="01" eyebrow="The gap" pad="default" seam={false}>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-9">
            <p className="headline text-3xl leading-[1.15] sm:text-4xl md:text-5xl">
              Your business outgrew its digital presence. Buyers notice in the first five seconds —
              then they leave, quietly, and buy from someone who looks like they can deliver.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed text-mute">
              We close that gap. Not with a prettier brochure — with a product: engineered pages
              that load before doubt sets in, journeys that answer the questions buyers are silently
              asking, and measurement that ties every design decision to revenue.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* 04 — Capabilities */}
      <Section tone="paper" index="02" eyebrow="Capabilities" pad="default">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-4xl md:col-span-7 md:text-5xl">
            Three disciplines. One standard.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            We build, and we grow what we build. Nothing we wouldn&apos;t stake our own revenue on.
          </p>
        </div>

        <div className="border-t border-line">
          {services.map((service) => (
            <Reveal key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid items-baseline gap-3 border-b border-line py-8 transition-colors duration-500 hover:bg-tone-2 md:grid-cols-12 md:gap-6 md:py-10"
              >
                <div className="flex items-baseline gap-6 md:col-span-5">
                  <span className="font-mono text-[13px] text-accent">{service.index}</span>
                  <span className="headline text-3xl transition-colors duration-300 group-hover:text-accent md:text-4xl">
                    {service.name}
                  </span>
                </div>
                <p className="pl-12 text-[15px] leading-snug text-mute md:col-span-4 md:pl-0">
                  {service.outcome}
                </p>
                <div className="hidden flex-wrap justify-end gap-2 md:col-span-3 md:flex">
                  {service.tags.slice(0, 3).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button href="/services" variant="text">
            All services
          </Button>
        </div>
      </Section>

      {/* 05 — Our own products */}
      <Section tone="ink" index="03" eyebrow="Our own products">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-4xl md:col-span-7 md:text-5xl">
            We eat our own cooking.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Five vertical SaaS products, built and operated in-house on our Plaidware platform —
            live, billing, and answered for every month.
          </p>
        </div>

        <div className="border-t border-line">
          {products.map((product, i) => (
            <Reveal key={product.slug}>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid items-baseline gap-2 border-b border-line py-6 transition-colors duration-500 hover:bg-tone-2 md:grid-cols-12 md:gap-6 md:py-7"
              >
                <div className="flex items-baseline gap-6 md:col-span-4">
                  <span className="font-mono text-[13px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="headline text-2xl transition-colors duration-300 group-hover:text-accent md:text-3xl">
                    {product.name}
                  </span>
                </div>
                <p className="pl-12 text-[15px] leading-snug text-mute md:col-span-5 md:pl-0">
                  {product.tagline}
                </p>
                <div className="hidden justify-end md:col-span-3 md:flex">
                  <Tag>{product.vertical}</Tag>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button href="/products" variant="text">
            About the products
          </Button>
        </div>
      </Section>

      {/* 06 — Process strip */}
      <Section tone="paper" index="04" eyebrow="How we work">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-4xl md:col-span-7 md:text-5xl">
            A factory floor, not a black box.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Five phases, weekly demos, and a staging URL that gets better every Friday.
          </p>
        </div>
        <ProcessStrip />
      </Section>

      {/* 07 — Tech stack */}
      <Section tone="ink" index="05" eyebrow="Stack">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-4xl md:col-span-8 md:text-5xl">
            Boring technology, deliberately.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Chosen so you can hire for it, audit it, and inherit it.
          </p>
        </div>
        <TechStackGrid />
      </Section>

      {/* 08 — Studio stats */}
      <Section tone="paper" index="06" eyebrow="Working with us">
        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          {studioStats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.08}>
              <p className="font-display text-5xl tracking-tight">{stat.value}</p>
              <p className="mt-2 max-w-[28ch] text-sm text-mute">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 09 — Engagement models */}
      <Section tone="paper" index="07" eyebrow="How to hire us">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-4xl md:col-span-7 md:text-5xl">
            Three ways to buy. No mystery meat.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Pick the shape of the relationship first — the scope conversation gets easy after that.
          </p>
        </div>
        <EngagementCards />
        <p className="mt-8 font-mono text-[12px] leading-relaxed text-mute">
          Agencies: we also take senior overflow work, white-label, under NDA.{" "}
          <Link href="/pricing" className="u-link text-fg">
            Details on the pricing page
          </Link>
          .
        </p>
      </Section>

      {/* 10 — Objection FAQ + final CTA */}
      <Section tone="ink" index="08" eyebrow="Before you ask">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="headline text-4xl md:text-5xl">
              The questions you&apos;re actually asking.
            </h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-mute">
              Ownership, budgets, who really does the work. If we haven&apos;t answered yours,{" "}
              <a href={`mailto:${site.email}`} className="u-link text-fg">
                ask it directly
              </a>{" "}
              — you&apos;ll get a straight answer within {site.anchors.responseTime}.
            </p>
            <div className="mt-10 hidden lg:block">
              <Button href="/contact" size="lg">
                Start a project
              </Button>
              <p className="mt-4 font-mono text-[12px] text-mute">
                Engagements start at {site.anchors.projectMinimum}
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Accordion items={getFaqs(["ownership", "team", "budget", "timeline"])} />
            <div className="mt-10 lg:hidden">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Start a project
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
