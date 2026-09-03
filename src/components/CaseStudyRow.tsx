import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { cn } from "@/lib/utils";
import { Vignette } from "./vignettes/Vignette";
import { MonoLabel, Tag } from "./ui/MonoLabel";

/**
 * Metric-first case study row: coded UI vignette with a massive outcome
 * numeral overlapping it, asymmetric 7/5 grid, alternating direction.
 */
export function CaseStudyRow({ study, flip = false }: { study: CaseStudy; flip?: boolean }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      {/* Vignette + metric overlay */}
      <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
        <div className="border border-line bg-tone-2 p-5 pb-14 transition-transform duration-500 ease-(--ease-swift) group-hover:-translate-y-1 sm:p-8 sm:pb-16 md:p-10 md:pb-20">
          <Vignette id={study.vignette} />
        </div>
        <div
          className={cn(
            "absolute bottom-0 max-w-[80%] translate-y-6 bg-tone py-3 pr-6",
            flip ? "right-0 pl-6 text-right" : "left-0",
          )}
        >
          <p className="font-display text-6xl leading-none tracking-tight text-fg transition-colors duration-500 group-hover:text-accent sm:text-7xl md:text-8xl">
            {study.featuredMetric.value}
          </p>
          <MonoLabel className="mt-2 block">{study.featuredMetric.label}</MonoLabel>
        </div>
      </div>

      {/* Meta */}
      <div className={cn("pt-8 lg:col-span-5 lg:pt-0", flip && "lg:order-1")}>
        <MonoLabel>
          {study.industry} · {study.year}
        </MonoLabel>
        <h3 className="headline mt-4 text-3xl md:text-4xl">{study.client}</h3>
        <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">{study.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {study.services.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <span className="mt-8 inline-flex items-center gap-2 font-medium text-fg transition-colors duration-300 group-hover:text-accent">
          Read the case study
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-(--ease-swift) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
