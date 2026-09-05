import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/MonoLabel";
import { Reveal } from "./ui/Reveal";

/** Internal-page opener: centered eyebrow, display headline, measured intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  meta,
  tone = "paper",
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  meta?: React.ReactNode;
  tone?: "paper" | "ink" | "gray";
  /** Tighter top padding for pages that open with a LocalNav. */
  compact?: boolean;
}) {
  return (
    <div className={cn(`tone-${tone}`, compact ? "pt-16 pb-16 md:pt-24 md:pb-24" : "pt-32 pb-16 md:pt-44 md:pb-24")}>
      <Container narrow className="text-center">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="headline mx-auto mt-3 max-w-[16ch] text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px]">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[62ch] text-[19px] leading-[1.4] text-mute md:text-[24px]">
              {intro}
            </p>
          </Reveal>
        )}
        {meta && (
          <Reveal delay={0.22} className="mt-8 flex justify-center">
            {meta}
          </Reveal>
        )}
      </Container>
    </div>
  );
}
