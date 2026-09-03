import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { MonoLabel } from "./MonoLabel";

type SectionProps = {
  tone?: "ink" | "paper";
  /** mono index label, e.g. "01" — rendered with the eyebrow as a section seam */
  index?: string;
  eyebrow?: string;
  id?: string;
  className?: string;
  containerClassName?: string;
  /** vertical rhythm: default = full section, tight = compact band */
  pad?: "default" | "tight" | "none";
  seam?: boolean;
  children: React.ReactNode;
};

export function Section({
  tone = "ink",
  index,
  eyebrow,
  id,
  className,
  containerClassName,
  pad = "default",
  seam = true,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        tone === "ink" ? "tone-ink" : "tone-paper",
        pad === "default" && "py-24 md:py-32 lg:py-40",
        pad === "tight" && "py-14 md:py-20",
        className,
      )}
    >
      <Container className={containerClassName}>
        {(index || eyebrow) && (
          <div
            className={cn(
              "mb-12 flex items-baseline gap-4 md:mb-16",
              seam && "border-t border-line pt-5",
            )}
          >
            {index && <MonoLabel className="text-accent">{index}</MonoLabel>}
            {eyebrow && <MonoLabel>{eyebrow}</MonoLabel>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
