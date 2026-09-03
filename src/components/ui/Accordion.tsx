"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

/** Objection-handling accordion. Hard questions, direct answers, keyboard-first. */
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
                className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-accent md:py-6"
              >
                <span className="text-base font-medium md:text-lg">{item.question}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-mute transition-transform duration-300 ease-(--ease-swift) group-hover:text-accent",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-(--ease-swift)",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 leading-relaxed text-mute">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
