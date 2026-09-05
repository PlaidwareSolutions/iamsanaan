import type { Metadata } from "next";
import { site } from "@/lib/site";
import { team, values, guarantees } from "@/data/team";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
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

      {/* Story + numbers */}
      <Section tone="paper" index="01" eyebrow="The short version" seam={false}>
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="headline text-2xl leading-[1.3] md:text-3xl">
              We started as two engineers fixing the aftermath of other people&apos;s launches.
              Nine years later, the work is the same — we just get there before the damage now.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-mute lg:col-span-5 lg:col-start-8">
            <p className="leading-relaxed">
              The studio runs on a simple loop: take on fewer projects than we could, staff them
              with people who&apos;ve shipped before, and publish the prices so the wrong clients
              filter themselves out. It&apos;s not a growth strategy. It&apos;s a quality strategy
              that happens to grow.
            </p>
            <p className="leading-relaxed">
              Based in Houston, working everywhere. About half our clients have never met us in
              person; all of them can name the people building their product.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Team */}
      <Section tone="paper" index="02" eyebrow="The team" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 3) * 0.06} className="bg-tone">
              <div className="group h-full p-5 transition-colors duration-500 hover:bg-tone-2 md:p-7">
                <div className="overflow-hidden">
                  <TeamMark member={member} />
                </div>
                <h2 className="mt-5 text-lg font-medium">{member.name}</h2>
                <MonoLabel className="mt-1 block text-accent">{member.role}</MonoLabel>
                <p className="mt-3 text-sm leading-relaxed text-mute">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[12px] text-mute">
          Portrait marks, not stock photos — you&apos;ll meet the real faces on the first call.
        </p>
      </Section>

      {/* Non-agency guarantees */}
      <Section tone="ink" index="03" eyebrow="The non-agency clause">
        <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="headline text-3xl md:col-span-8 md:text-5xl">
            Everything clients fear about agencies, in writing — with the opposite promised.
          </h2>
        </div>
        <div className="grid border border-line md:grid-cols-2">
          <div className="border-b border-line p-8 md:border-r md:border-b-0 md:p-10">
            <MonoLabel>The agency playbook</MonoLabel>
            <ul className="mt-6 space-y-4">
              {guarantees.playbook.map((item) => (
                <li key={item} className="flex gap-4 text-mute">
                  <span aria-hidden className="font-mono text-[13px] text-mute/60">
                    ✕
                  </span>
                  <s className="decoration-mute/40">{item}</s>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-tone-2 p-8 md:p-10">
            <MonoLabel className="text-accent">Our guarantees</MonoLabel>
            <ul className="mt-6 space-y-4">
              {guarantees.promises.map((item) => (
                <li key={item} className="flex gap-4">
                  <span aria-hidden className="font-mono text-[13px] text-accent">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 max-w-[70ch] font-mono text-[12px] leading-relaxed text-mute">
          These aren&apos;t values-poster aspirations — they&apos;re contract language. Every
          statement above appears in our master services agreement.
        </p>
      </Section>

      {/* Values */}
      <Section tone="paper" index="04" eyebrow="How we behave">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.word} delay={i * 0.05} className="bg-tone">
              <div className="group flex h-full flex-col justify-between gap-10 p-7 transition-colors duration-500 hover:bg-tone-2">
                <p className="headline text-3xl transition-colors duration-300 group-hover:text-accent">
                  {value.word}
                </p>
                <p className="text-sm leading-relaxed text-mute">{value.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Our own products — the real suite, not lab experiments */}
        <div className="mt-16 grid gap-8 border-t border-line pt-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <MonoLabel className="text-accent">Our own products</MonoLabel>
            <p className="mt-3 max-w-[62ch] leading-relaxed text-mute">
              Between client work, we build for ourselves: Buildorata, Fixorata, Drivorata,
              Rentorata, and PropOrata — five vertical SaaS products operated in-house on our
              Plaidware platform. Running software we have to answer for every month is the
              discipline your project inherits.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
            <Button href="/contact" size="lg">
              Work with us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
