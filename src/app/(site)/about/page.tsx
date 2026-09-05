import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { site } from "@/lib/site";
import { team, values, guarantees } from "@/data/team";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ScrollText } from "@/components/ui/ScrollText";
import { TeamMark } from "@/components/TeamMark";

export const metadata: Metadata = {
  title: "About",
  description:
    "Six senior people, one standard, operating since 2017. The team, the guarantees, and the culture behind Sanaan.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Small on purpose. Senior on principle."
        intro={`Sanaan has been six to eight people since ${site.founded} — by choice. Every project gets principals, not a pyramid. We grew up watching agencies scale into the very thing their pitch decks warned about, and decided the interesting problem was staying good instead of getting big.`}
      />

      {/* Story */}
      <Section tone="paper" containerClassName="max-w-[1036px]">
        <ScrollText
          as="h2"
          className="headline text-[32px] md:text-[44px]"
          text="We started as two engineers fixing the aftermath of other people’s launches. Nine years later, the work is the same — we just get there before the damage now."
        />
        <Reveal delay={0.1} className="mt-10 grid gap-8 text-[17px] leading-[1.47] text-mute md:grid-cols-2">
          <p>
            The studio runs on a simple loop: take on fewer projects than we could, staff them with
            people who’ve shipped before, and publish the prices so the wrong clients filter
            themselves out. It’s not a growth strategy. It’s a quality strategy that happens to grow.
          </p>
          <p>
            Based in Houston, working everywhere. About half our clients have never met us in
            person; all of them can name the people building their product.
          </p>
        </Reveal>
      </Section>

      {/* Team */}
      <Section tone="gray" eyebrow="The team" title="Six people. Every one of them ships.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 3) * 0.06}>
              <div className="tile h-full p-5 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile md:p-7">
                <TeamMark member={member} />
                <h2 className="mt-5 text-[19px] font-semibold tracking-[-0.01em]">{member.name}</h2>
                <MonoLabel className="mt-1 block text-accent">{member.role}</MonoLabel>
                <p className="mt-3 text-[15px] leading-[1.47] text-mute">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-mute">
          Initials, not stock photos — you’ll meet the real faces on the first call.
        </p>
      </Section>

      {/* Non-agency guarantees */}
      <Section
        tone="ink"
        eyebrow="The non-agency clause"
        title="Everything clients fear about agencies, in writing — with the opposite promised."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="tile p-8 md:p-10">
            <MonoLabel>The agency playbook</MonoLabel>
            <ul className="mt-6 space-y-4">
              {guarantees.playbook.map((item) => (
                <li key={item} className="flex gap-4 text-[17px] text-mute">
                  <X aria-hidden className="mt-1 size-4 shrink-0 text-mute/60" />
                  <s className="decoration-mute/40">{item}</s>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="tile p-8 md:p-10">
            <MonoLabel className="text-link">Our guarantees</MonoLabel>
            <ul className="mt-6 space-y-4">
              {guarantees.promises.map((item) => (
                <li key={item} className="flex gap-4 text-[17px]">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-link" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="mt-6 max-w-[70ch] text-[12px] leading-relaxed text-mute">
          These aren’t values-poster aspirations — they’re contract language. Every statement above
          appears in our master services agreement.
        </p>
      </Section>

      {/* Values */}
      <Section tone="paper" eyebrow="How we behave" title="Four words we hire and fire by.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.word} delay={i * 0.05}>
              <div className="tile flex h-full flex-col justify-between gap-10 p-7 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile">
                <p className="text-[28px] font-semibold tracking-[-0.02em]">{value.word}</p>
                <p className="text-[15px] leading-[1.47] text-mute">{value.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <MonoLabel className="text-accent">Our own products</MonoLabel>
            <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.47] text-mute">
              Between client work, we build for ourselves: Buildorata, Fixorata, Drivorata,
              Rentorata, and PropOrata — five vertical SaaS products operated in-house on our
              Plaidware platform. Running software we have to answer for every month is the
              discipline your project inherits.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
            <Button href="/products" variant="ghost" size="lg">
              See the products
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
