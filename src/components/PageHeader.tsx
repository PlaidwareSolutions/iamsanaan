import { Container } from "./ui/Container";
import { MonoLabel } from "./ui/MonoLabel";
import { Reveal } from "./ui/Reveal";

/** Shared internal-page opener: mono eyebrow, display headline, measured intro. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  meta?: React.ReactNode;
}) {
  return (
    <div className="tone-ink pt-32 pb-16 md:pt-44 md:pb-24">
      <Container>
        <Reveal>
          <MonoLabel>{eyebrow}</MonoLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="headline mt-5 max-w-[16ch] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-mute md:text-xl">{intro}</p>
          </Reveal>
        )}
        {meta && <Reveal delay={0.22}>{meta}</Reveal>}
      </Container>
    </div>
  );
}
