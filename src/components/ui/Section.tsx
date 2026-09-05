import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./MonoLabel";

type SectionProps = {
  tone?: "ink" | "paper" | "gray";
  /** Optional header block: eyebrow above a display headline, with a lede beneath. */
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  containerClassName?: string;
  /** vertical rhythm: default = full section, tight = compact band, none = caller controls */
  pad?: "default" | "tight" | "none";
  children: React.ReactNode;
};

/** A full-bleed tile in the page stack, in the apple.com rhythm. */
export function Section({
  tone = "paper",
  eyebrow,
  title,
  lede,
  align = "left",
  id,
  className,
  containerClassName,
  pad = "default",
  children,
}: SectionProps) {
  const hasHeader = eyebrow || title || lede;
  return (
    <section
      id={id}
      className={cn(
        tone === "ink" && "tone-ink",
        tone === "paper" && "tone-paper",
        tone === "gray" && "tone-gray",
        pad === "default" && "py-20 md:py-28 lg:py-36",
        pad === "tight" && "py-12 md:py-16",
        className,
      )}
    >
      <Container className={containerClassName}>
        {hasHeader && (
          <header
            className={cn(
              "mb-12 md:mb-16",
              align === "center" ? "mx-auto max-w-[820px] text-center" : "max-w-[900px]",
            )}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="headline mt-2 text-[36px] sm:text-[44px] md:text-[56px]">{title}</h2>
            )}
            {lede && (
              <p
                className={cn(
                  "mt-5 max-w-[62ch] text-[19px] leading-[1.4] text-mute md:text-[21px]",
                  align === "center" && "mx-auto",
                )}
              >
                {lede}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
