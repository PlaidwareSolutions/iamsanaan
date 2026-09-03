import { cn } from "@/lib/utils";

export function MonoLabel({
  className,
  children,
  as: Tag = "span",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "span" | "p" | "div" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-mute",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-mute",
        className,
      )}
    >
      {children}
    </span>
  );
}
