import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { sites } from "@/data/sites";
import { products } from "@/data/products";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow, MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Gallery } from "@/components/ui/Gallery";
import { HeroScroll } from "@/components/ui/HeroScroll";
import { HeroCanvas } from "@/components/HeroCanvas";
import { Laptop, Phone } from "@/components/DeviceFrame";
import { Backdrop } from "@/components/Backdrop";
import { SiteCard } from "@/components/SiteCard";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Websites and mobile apps, built in Houston` },
  description:
    "We build websites and mobile apps for businesses, from $99. Fixed prices, progress you can see every week, and you own everything we make.",
};

/** The three steps a first-time visitor needs — the five-phase version lives on /process. */
const steps = [
  { index: "01", title: "Tell us what you need.", body: "A short form, a call, a fixed price." },
  { index: "02", title: "We build it.", body: "You see progress every week on a live link." },
  { index: "03", title: "It goes live.", body: "We keep it running." },
];

function bySlug(slug: string) {
  const found = sites.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown site: ${slug}`);
  return found;
}

const host = (url: string) => new URL(url).host.replace(/^www\./, "");

/** The hero shows our own product, Fixorata, on both devices. */
function heroProduct() {
  const found = products.find((p) => p.slug === "fixorata");
  if (!found?.screen || !found.screenMobile) throw new Error("Fixorata needs desktop and mobile captures");
  return { ...found, screen: found.screen, screenMobile: found.screenMobile };
}

export default function Home() {
  const hero = heroProduct();
  const web = bySlug("cactus-boxing");
  const mobile = bySlug("exact-point-repairs");
  const backdrop = bySlug("all-ages-driving-school");

  return (
    <>
      {/* 01 — Hero: one sentence, then the work itself on a laptop and a phone */}
      <section className="tone-ink relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroCanvas className="absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0)_0%,rgb(0_0_0/0.55)_80%)]" />
        </div>
        <Container className="relative pt-32 pb-20 text-center md:pt-40 md:pb-28">
          <HeroScroll>
            <Reveal>
              <Eyebrow>Houston, TX</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="headline mx-auto mt-4 max-w-[18ch] text-[44px] sm:text-[64px] md:text-[80px]">
                We build <span className="text-gradient">websites and mobile apps.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-[40ch] text-[19px] leading-[1.4] text-mute md:text-[24px]">
                Clean, fast, and made to bring you customers.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Button href="/contact" size="lg">
                Start a project
              </Button>
              <Button href="#work" variant="text" size="lg">
                See our work
              </Button>
            </Reveal>
          </HeroScroll>

          {/* The devices sit outside HeroScroll so they stay put while the copy recedes */}
          <Reveal delay={0.3} className="relative mx-auto mt-14 w-full max-w-[880px] md:mt-20">
            <Laptop
              src={hero.screen}
              alt={`${hero.name} on a laptop`}
              priority
              sizes="(min-width: 1024px) 880px, 92vw"
            />
            <div className="absolute -right-[2%] -bottom-[4%] w-[26%] sm:-right-[6%] sm:w-[24%]">
              <Phone
                src={hero.screenMobile}
                alt={`${hero.name} on a phone`}
                priority
                sizes="(min-width: 1024px) 210px, 26vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-14 text-[14px] text-mute md:mt-16">
              <a href={hero.url} target="_blank" rel="noopener noreferrer" className="u-link">
                {hero.name}
              </a>{" "}
              — our software for {hero.vertical.toLowerCase()}. Built and run by us.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 02 — What we build */}
      <Section id="build" tone="paper" align="center" title="What we build." className="scroll-mt-[60px]">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <Link
              href="/services/web"
              className="group tile flex h-full flex-col overflow-hidden p-8 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile md:p-10"
            >
              <h3 className="flex items-center gap-1 text-[28px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-link">
                Websites
                <ChevronRight
                  aria-hidden
                  className="size-5 text-mute transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </h3>
              <p className="mt-3 max-w-[34ch] text-[17px] leading-[1.47] text-mute">
                Fast and clear, so people call, book, or buy.
              </p>
              <div className="relative mt-8 aspect-[16/11] overflow-hidden">
                <Laptop
                  src={web.screens.desktop}
                  alt={`${web.name} website on a laptop`}
                  sizes="(min-width: 768px) 44vw, 90vw"
                  className="absolute inset-x-0 top-0"
                />
              </div>
              <MonoLabel className="mt-4 block">{host(web.url)}</MonoLabel>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <Link
              href="/services/mobile"
              className="group tile flex h-full flex-col overflow-hidden p-8 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile md:p-10"
            >
              <h3 className="flex items-center gap-1 text-[28px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-link">
                Mobile apps
                <ChevronRight
                  aria-hidden
                  className="size-5 text-mute transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </h3>
              <p className="mt-3 max-w-[34ch] text-[17px] leading-[1.47] text-mute">
                For iPhone and Android. Every site we build works on a phone, too.
              </p>
              <div className="relative mt-8 aspect-[16/11] overflow-hidden">
                <Phone
                  src={mobile.screens.mobile}
                  alt={`${mobile.name} website on a phone`}
                  sizes="(min-width: 768px) 260px, 50vw"
                  className="absolute top-0 left-1/2 w-[52%] max-w-[260px] -translate-x-1/2"
                />
              </div>
              <MonoLabel className="mt-4 block">{host(mobile.url)}</MonoLabel>
            </Link>
          </Reveal>
        </div>

        <p className="mt-10 text-center text-[17px] text-mute">
          <Link href="/services/growth" className="u-link">
            And the marketing to get them found.
          </Link>
        </p>
      </Section>

      {/* 03 — Our work */}
      <Section id="work" tone="gray" title="Our work." className="scroll-mt-[60px]">
        <Eyebrow as="h3">Websites for clients</Eyebrow>
        <Gallery label="Websites for clients" className="mt-6" itemClassName="w-[min(560px,88vw)]">
          {sites.map((s) => (
            <SiteCard key={s.slug} site={s} />
          ))}
        </Gallery>

        <Eyebrow as="h3" className="mt-16 md:mt-20">
          Products we run
        </Eyebrow>
        <Gallery label="Products we run" className="mt-6" itemClassName="w-[min(372px,85vw)]">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </Gallery>
        <div className="mt-2">
          <Button href="/products" variant="text" size="lg">
            All products
          </Button>
        </div>
      </Section>

      {/* 04 — How it works, over a blurred capture */}
      <section id="how" className="tone-ink relative scroll-mt-[60px] overflow-hidden py-20 md:py-28 lg:py-36">
        <Backdrop src={backdrop.screens.desktop} />
        <Container className="relative">
          <header className="mb-12 max-w-[900px] md:mb-16">
            <h2 className="headline text-[36px] sm:text-[44px] md:text-[56px]">How it works.</h2>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal
                key={step.index}
                delay={i * 0.08}
                className="rounded-tile border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md md:p-10"
              >
                <p className="text-gradient text-[40px] leading-none font-semibold tracking-[-0.03em]">
                  {step.index}
                </p>
                <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.47] text-white/70">{step.body}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/process" variant="text" size="lg">
              Full process
            </Button>
          </div>
        </Container>
      </section>

      {/* 05 — Pricing */}
      <Section
        id="pricing"
        tone="paper"
        align="center"
        containerClassName="max-w-[1036px]"
        className="scroll-mt-[60px]"
      >
        <Reveal className="text-center">
          <p className="headline text-gradient text-[72px] leading-none md:text-[120px]">
            From {site.anchors.projectMinimum}.
          </p>
          <p className="mx-auto mt-6 max-w-[36ch] text-[19px] leading-[1.4] text-mute md:text-[21px]">
            Fixed price up front. You own everything we make.
          </p>
          <div className="mt-6">
            <Button href="/pricing" variant="text" size="lg">
              See pricing
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* 06 — Contact: the global FooterCta that follows every page */}
    </>
  );
}
