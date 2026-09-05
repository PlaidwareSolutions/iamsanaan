import { cn } from "@/lib/utils";

/** Page gutter. `narrow` is the 980px reading measure apple.com uses for copy. */
export function Container({
  className,
  narrow = false,
  children,
}: {
  className?: string;
  narrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-14",
        narrow ? "max-w-[1036px]" : "max-w-[1440px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
