"use client";

import { useState } from "react";
import { stackCategories } from "@/data/stack";
import { cn } from "@/lib/utils";

/**
 * Interactive capability grid: pick a category, and every technology row
 * says why it earned its place in the stack — authority without paragraphs.
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
          {category.items.map((tech) => (
            <li
              key={tech.name}
              className="group grid gap-1 border-b border-line py-5 transition-colors duration-300 sm:grid-cols-12 sm:items-baseline sm:gap-4"
            >
              <span className="text-lg font-medium transition-colors duration-300 group-hover:text-accent sm:col-span-4">
                {tech.name}
              </span>
              <span className="text-sm leading-snug text-mute sm:col-span-8">{tech.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
