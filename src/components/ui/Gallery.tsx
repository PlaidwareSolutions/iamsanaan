"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal snap gallery with apple.com paddles: cards bleed to the right
 * edge, scroll one card per press, and the paddles disable at either end.
 */
export function Gallery({
  children,
  label,
  itemClassName,
  className,
}: {
  children: React.ReactNode;
  label: string;
  itemClassName?: string;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: "smooth" });
  };

  const paddle =
    "inline-flex size-9 items-center justify-center rounded-full bg-control text-fg transition-colors duration-100 hover:bg-control-hover disabled:opacity-40 disabled:hover:bg-control";

  return (
    <div className={className}>
      <ul
        ref={ref}
        aria-label={label}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-2 sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:-mx-14 lg:scroll-pl-14 lg:px-14"
      >
        {Children.map(children, (child, i) => (
          <li key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={() => step(-1)} disabled={edge.start} className={paddle} aria-label="Previous">
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <button type="button" onClick={() => step(1)} disabled={edge.end} className={paddle} aria-label="Next">
          <ChevronRight aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
