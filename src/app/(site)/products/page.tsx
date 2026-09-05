import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { products, platformServices, platformTagline, platformUrl } from "@/data/products";
import { sites } from "@/data/sites";
import { PageHeader } from "@/components/PageHeader";
import { LocalNav } from "@/components/ui/LocalNav";
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
      <LocalNav
        title="Products"
        href="/products"
        links={[
          { label: "The suite", href: "#suite" },
          { label: "Websites", href: "#sites" },
          { label: "Platform", href: "#platform" },
        ]}
      />
      <PageHeader
        compact
        eyebrow="Products"
        title="Software we build, run, and answer for."
        intro="Most agencies talk about product thinking. We operate five of our own — vertical SaaS for construction crews, repair shops, driving schools, landlords, and HOA boards, all running on our Plaidware platform. Nothing keeps a team honest like software it has to answer for every month."
      />

      {/* The suite */}
      <Section id="suite" tone="gray" className="scroll-mt-[100px]" eyebrow="The suite" title="Five products. One operating layer." align="center">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 0.06}>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tone-ink group relative flex h-full min-h-[26rem] flex-col overflow-hidden rounded-tile bg-tone p-7 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile md:p-8"
              >
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
                    <Tag className="bg-black/60 text-white backdrop-blur-sm">{product.vertical}</Tag>
                    <ChevronRight
                      aria-hidden
                      className="size-5 shrink-0 text-mute transition-transform duration-300 ease-(--ease-swift) group-hover:translate-x-0.5 group-hover:text-link"
                    />
                  </div>
                  <div className="mt-auto pt-28">
                    <h2 className="text-[28px] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-link">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-[17px] font-medium">{product.tagline}</p>
                    <p className="mt-3 text-[15px] leading-[1.47] text-mute">{product.description}</p>
                    <p className="mt-6 border-t border-line pt-4 text-[12px] text-mute">
                      <span className="text-link">Live</span> · {product.pricing}
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}

          {/* The platform cell */}
          <Reveal delay={0.12}>
            <div className="tile flex h-full min-h-[26rem] flex-col p-7 md:p-8">
              <MonoLabel className="text-accent">The platform</MonoLabel>
              <h2 className="mt-6 text-[28px] font-semibold tracking-[-0.02em]">Plaidware</h2>
              <p className="mt-2 text-[17px] font-medium">{platformTagline}</p>
              <p className="mt-3 text-[15px] leading-[1.47] text-mute">
                Every product above ships on one operating layer — shared auth, billing, monitoring,
                and automations — so a two-person business gets infrastructure a two-hundred-person
                business would recognize.
              </p>
              <a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-0.5 self-start pt-6 text-[17px] text-link hover:underline"
              >
                plaidware.com
                <ChevronRight aria-hidden className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Shipped websites — live captures, linked out */}
      <Section
        id="sites"
        tone="paper"
        className="scroll-mt-[100px]"
        eyebrow="Websites we’ve shipped"
        title="Live sites for real businesses."
        lede="Designed, built, and launched by us. Every screen below is captured from the live site — click through and check."
      >
        <div className="space-y-28 md:space-y-36">
          {sites.map((s, i) => (
            <Reveal key={s.slug}>
              <SiteShowcase site={s} flip={i % 2 === 1} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Control plane */}
      <Section
        id="platform"
        tone="gray"
        className="scroll-mt-[100px]"
        eyebrow="One control plane"
        title="Built once, operated for everyone."
        lede="The unglamorous layer that keeps five products dependable — and that your project inherits on day one."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformServices.map((svc, i) => (
            <Reveal key={svc.name} delay={i * 0.05} className="tile p-7 md:p-8">
              <MonoLabel className="text-accent">{String(i + 1).padStart(2, "0")}</MonoLabel>
              <p className="mt-3 text-[21px] font-semibold tracking-[-0.01em]">{svc.name}</p>
              <p className="mt-2 text-[15px] leading-[1.47] text-mute">{svc.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Why it matters */}
      <Section tone="paper" align="center" containerClassName="max-w-[1036px]">
        <Reveal>
          <h2 className="headline text-[32px] md:text-[44px]">
            An agency that operates its own products debugs at 7 a.m. on a Saturday. That
            discipline — uptime, billing, support, retention — is what your project is actually buying.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <p className="mx-auto max-w-[52ch] text-[17px] leading-[1.47] text-mute">
            Run a business in a vertical we haven’t built for yet? That’s usually where the next
            product starts.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Talk to us about it
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
