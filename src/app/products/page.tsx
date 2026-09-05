import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products, platformServices, platformTagline, platformUrl } from "@/data/products";
import { sites } from "@/data/sites";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel, Tag } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SiteShowcase } from "@/components/SiteShowcase";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Five vertical SaaS products — Buildorata, Fixorata, Drivorata, Rentorata, and PropOrata — built and operated in-house on the Plaidware platform, plus the websites we've shipped for Houston-area businesses.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Software we build, run, and answer for."
        intro="Most agencies talk about product thinking. We operate five of our own — vertical SaaS for construction crews, repair shops, driving schools, landlords, and HOA boards, all running on our Plaidware platform. Nothing keeps a team honest like software it has to answer for every month."
      />

      {/* Product grid */}
      <Section tone="paper" index="01" eyebrow="The suite" seam={false}>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 0.06} className="bg-tone">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tone-ink group relative flex h-full min-h-[26rem] flex-col overflow-hidden bg-tone p-7 md:p-9"
              >
                {/* The product's own homepage, captured live, fills the top of the
                    card and fades into the ink the copy sits on */}
                {product.screen && (
                  <div aria-hidden className="absolute inset-x-0 top-0 h-[46%]">
                    <Image
                      src={product.screen}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-(--ease-swift) group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/45 via-50% to-ink" />
                  </div>
                )}

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <Tag className="bg-ink/70 backdrop-blur-sm">{product.vertical}</Tag>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-mute transition-all duration-300 ease-(--ease-swift) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <div className="mt-auto pt-28">
                    <h2 className="headline text-3xl transition-colors duration-300 group-hover:text-accent">
                      {product.name}
                    </h2>
                    <p className="mt-2 font-medium">{product.tagline}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-mute">{product.description}</p>
                    <p className="mt-6 border-t border-line pt-4 font-mono text-[12px] text-mute">
                      <span className="text-accent">Live</span> · {product.pricing}
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}

          {/* The platform cell */}
          <Reveal delay={0.12} className="tone-ink bg-tone-2">
            <div className="flex h-full flex-col p-7 md:p-9">
              <MonoLabel className="text-accent">The platform</MonoLabel>
              <h2 className="headline mt-6 text-3xl">Plaidware</h2>
              <p className="mt-2 font-medium">{platformTagline}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">
                Every product above ships on one operating layer — shared auth, billing,
                monitoring, and automations — so a two-person business gets infrastructure a
                two-hundred-person business would recognize.
              </p>
              <a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link mt-auto self-start pt-4 font-mono text-[12px] tracking-[0.1em] text-fg uppercase"
              >
                plaidware.com ↗
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Shipped websites — live captures, linked out */}
      <Section tone="paper" index="02" eyebrow="Websites we've shipped">
        <div className="mb-16 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-3xl md:col-span-7 md:text-4xl">
            Live sites for real businesses.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            Designed, built, and launched by us. Every screen below is captured from the live
            site — click through and check.
          </p>
        </div>
        <div className="space-y-28 md:space-y-36">
          {sites.map((s, i) => (
            <Reveal key={s.slug}>
              <SiteShowcase site={s} flip={i % 2 === 1} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Control plane */}
      <Section tone="ink" index="03" eyebrow="One control plane">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-3xl md:col-span-7 md:text-4xl">
            Built once, operated for everyone.
          </h2>
          <p className="text-mute md:col-span-4 md:col-start-9">
            The unglamorous layer that keeps five products dependable — and that your project
            inherits on day one.
          </p>
        </div>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {platformServices.map((svc, i) => (
            <Reveal key={svc.name} delay={i * 0.05} className="bg-tone">
              <div className="h-full p-6 transition-colors duration-500 hover:bg-tone-2 md:p-7">
                <MonoLabel className="text-accent">{String(i + 1).padStart(2, "0")}</MonoLabel>
                <p className="mt-3 text-lg font-medium">{svc.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">{svc.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why it matters for clients + CTA */}
      <Section tone="paper" index="04" eyebrow="Why this matters to you">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="headline text-3xl leading-[1.15] md:text-4xl">
              An agency that operates its own products debugs at 7 a.m. on a Saturday. That
              discipline — uptime, billing, support, retention — is what your project is
              actually buying.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end gap-6 lg:col-span-3 lg:col-start-10">
            <p className="text-mute">
              Run a business in a vertical we haven&apos;t built for yet? That&apos;s usually
              where the next product starts.
            </p>
            <div>
              <Button href="/contact">Talk to us about it</Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
