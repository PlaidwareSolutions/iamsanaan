import type { Metadata } from "next";
import { caseStudies } from "@/data/caseStudies";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyRow } from "@/components/CaseStudyRow";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies with the numbers attached: logistics platforms, consumer mobile apps, e-commerce replatforms. Problem, approach, stack, outcome.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Every project ends in a number."
        intro="Three engagements, told the way we scope them: the problem, the approach, the stack, and the outcome the client's CFO cares about. Names and numbers shared with permission."
      />

      <Section tone="ink" seam={false} className="pt-0 md:pt-0 lg:pt-0">
        <div className="space-y-28 border-t border-line pt-20 md:space-y-40">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug}>
              <CaseStudyRow study={study} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" pad="tight" seam={false}>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="headline text-3xl md:text-4xl">Yours could be the fourth.</h2>
            <p className="mt-3 max-w-[46ch] text-mute">
              Tell us the number you need to move. We&apos;ll tell you honestly whether we can move
              it.
            </p>
          </div>
          <Button href="/contact" size="lg">
            Start a project
          </Button>
        </div>
      </Section>
    </>
  );
}
