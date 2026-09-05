"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** iOS-style segmented control: gray track, a white pill that slides between options. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("inline-flex rounded-full bg-control p-1", className)}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-[14px] font-medium whitespace-nowrap transition-colors duration-300",
              active ? "text-fg" : "text-mute hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={`segment-${label}`}
                aria-hidden
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }}
                className="absolute inset-0 rounded-full bg-tone shadow-[0_2px_8px_rgb(0_0_0/0.12)]"
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
