"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import type { Metric } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

/** Animated numeral that counts up when scrolled into view. */
export function MetricStat({
  metric,
  className,
  valueClassName,
  labelClassName,
}: {
  metric: Metric;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(
    metric.countTo !== undefined ? formatValue(0, metric) : metric.value,
  );

  useEffect(() => {
    if (metric.countTo === undefined || reduced) {
      const raf = requestAnimationFrame(() => setDisplay(metric.value));
      return () => cancelAnimationFrame(raf);
    }
    if (!inView) return;

    const target = metric.countTo;
    const duration = 1200;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out-expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(formatValue(target * eased, metric));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, metric, reduced]);

  return (
    <div ref={ref} className={cn(className)}>
      <div
        className={cn(
          "font-display text-5xl leading-none font-[450] tracking-tight md:text-6xl",
          valueClassName,
        )}
      >
        {display}
      </div>
      <p className={cn("mt-3 max-w-[24ch] text-sm leading-snug text-mute", labelClassName)}>
        {metric.label}
      </p>
    </div>
  );
}

function formatValue(n: number, metric: Metric) {
  const decimals = metric.decimals ?? 0;
  const num = n.toFixed(decimals);
  return `${metric.prefix ?? ""}${num}${metric.suffix ?? ""}`;
}
