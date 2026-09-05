import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** primary: blue pill · ghost: gray pill · text: blue link with a chevron */
  variant?: "primary" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const base =
  "group inline-flex items-center justify-center font-normal transition-colors duration-300 ease-(--ease-swift) focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "rounded-full bg-accent text-white hover:bg-accent-hover",
  ghost: "rounded-full bg-control text-fg hover:bg-control-hover",
  text: "gap-0.5 text-link hover:underline underline-offset-4",
};

const sizes = {
  sm: "h-7 px-3 text-[12px]",
  md: "h-9 px-4 text-[14px]",
  lg: "h-11 px-[22px] text-[17px]",
};

const textSizes = {
  sm: "text-[12px]",
  md: "text-[14px]",
  lg: "text-[17px]",
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
  const cls = cn(
    base,
    variants[variant],
    variant === "text" ? textSizes[size] : sizes[size],
    className,
  );
  const content = (
    <>
      {children}
      {variant === "text" && <ChevronRight aria-hidden className="size-[1em] translate-y-px" />}
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
