"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

/** Objection-handling accordion, hairline rows, chevron that turns. */
export function Accordion({ items, className }: { items: Faq[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const headerId = `${baseId}-h-${item.id}`;
        const panelId = `${baseId}-p-${item.id}`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-link md:py-6"
              >
                <span className="text-[17px] font-semibold tracking-[-0.01em] md:text-[19px]">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-mute transition-transform duration-300 ease-(--ease-swift)",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-(--ease-swift)",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[64ch] pb-6 text-[17px] leading-[1.47] text-mute">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
