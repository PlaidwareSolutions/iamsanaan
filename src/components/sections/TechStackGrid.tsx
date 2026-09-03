"use client";

import { useState } from "react";
import Link from "next/link";
import { stackCategories } from "@/data/stack";
import { caseStudies } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

/**
 * Interactive capability proof: pick a category, and every technology row
 * names the shipped work it appears in — authority without paragraphs.
 */
export function TechStackGrid() {
  const [active, setActive] = useState(stackCategories[0].id);
  const category = stackCategories.find((c) => c.id === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Category tabs */}
      <div
        role="tablist"
        aria-label="Technology categories"
        className="no-scrollbar flex gap-2 overflow-x-auto lg:col-span-3 lg:flex-col lg:gap-0 lg:overflow-visible"
      >
        {stackCategories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={active === cat.id}
            onClick={() => setActive(cat.id)}
            className={cn(
              "shrink-0 border px-4 py-2.5 text-left font-mono text-[12px] tracking-[0.14em] uppercase transition-all duration-300 lg:border-x-0 lg:border-t-0 lg:border-b lg:px-0 lg:py-4 lg:text-[13px]",
              active === cat.id
                ? "border-accent text-accent lg:border-line lg:text-accent"
                : "border-line text-mute hover:text-fg lg:border-line",
            )}
          >
            {cat.label}
            <span className="ml-2 text-mute">({cat.items.length})</span>
          </button>
        ))}
      </div>

      {/* Tech rows */}
      <div className="lg:col-span-9">
        <ul className="border-t border-line">
          {category.items.map((tech) => {
            const linked = tech.caseStudySlugs
              .map((slug) => caseStudies.find((c) => c.slug === slug))
              .filter((c): c is NonNullable<typeof c> => Boolean(c));
            return (
              <li
                key={tech.name}
                className="group grid gap-1 border-b border-line py-5 transition-colors duration-300 sm:grid-cols-12 sm:items-baseline sm:gap-4"
              >
                <span className="text-lg font-medium transition-colors duration-300 group-hover:text-accent sm:col-span-3">
                  {tech.name}
                </span>
                <span className="text-sm leading-snug text-mute sm:col-span-5">{tech.note}</span>
                <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 sm:col-span-4 sm:mt-0 sm:justify-end">
                  {linked.length > 0 ? (
                    linked.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/work/${c.slug}`}
                        className="u-link font-mono text-[11px] tracking-[0.1em] text-mute uppercase transition-colors hover:text-fg"
                      >
                        {c.client} ↗
                      </Link>
                    ))
                  ) : (
                    <span className="font-mono text-[11px] tracking-[0.1em] text-mute/60 uppercase">
                      client work under NDA
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
