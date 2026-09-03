import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "text";
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-300 ease-(--ease-swift) focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-accent text-ink hover:bg-fg hover:text-tone active:translate-y-px",
  ghost:
    "border border-line-strong text-fg hover:border-accent hover:text-accent active:translate-y-px",
  text: "text-fg p-0 hover:text-accent",
};

const sizes = {
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-base",
};

export function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
}: ButtonProps) {
  const cls = cn(base, variants[variant], variant !== "text" && sizes[size], className);
  const content = (
    <>
      {children}
      {variant === "text" && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-(--ease-swift) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}
