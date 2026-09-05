import { cn } from "@/lib/utils";

/** Small caption label — 12px semibold, secondary color (apple.com footnote weight). */
export function MonoLabel({
  className,
  children,
  as: Tag = "span",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "span" | "p" | "div" | "h2" | "h3";
}) {
  return <Tag className={cn("text-[12px] font-semibold text-mute", className)}>{children}</Tag>;
}

/** Section eyebrow — the 21px semibold line that sits above a headline. */
export function Eyebrow({
  className,
  children,
  as: Tag = "p",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "span" | "p" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("text-[17px] font-semibold tracking-[-0.01em] text-mute md:text-[21px]", className)}>
      {children}
    </Tag>
  );
}

/** Pill chip. */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-control px-3 py-1 text-[12px] font-medium text-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}
