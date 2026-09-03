import { cn } from "@/lib/utils";

const columns = [
  {
    title: "THIS WEEK",
    cards: [
      { label: "Quote engine — margin floors", tag: "ENG", accent: false },
      { label: "Empty states, load board", tag: "DESIGN", accent: false },
      { label: "Carrier scorecard API", tag: "ENG", accent: false },
      { label: "Sprint review notes → client", tag: "DELIVERY", accent: false },
    ],
  },
  {
    title: "IN REVIEW",
    cards: [
      { label: "Dispatch table keyboard nav", tag: "A11Y", accent: true },
      { label: "Lane analytics queries", tag: "ENG", accent: false },
      { label: "Exception queue microcopy", tag: "CONTENT", accent: false },
    ],
  },
  {
    title: "SHIPPED FRI",
    cards: [
      { label: "Staging deploy #24", tag: "1.1s LCP", accent: false, done: true },
      { label: "Quote flow usability test ×5", tag: "RESEARCH", accent: false, done: true },
      { label: "Design tokens v3", tag: "SYSTEM", accent: false, done: true },
      { label: "Accessibility fixes (12)", tag: "A11Y", accent: false, done: true },
      { label: "Demo recording → client", tag: "DELIVERY", accent: false, done: true },
    ],
  },
];

/**
 * Coded UI vignette — the studio's own delivery board mid-sprint.
 * Shows how work runs (cadence, demos, budgets) rather than repeating
 * portfolio shots. em-based sizing; decorative.
 */
export function VignetteBoard({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("@container w-full select-none", className)}>
      <div
        className="relative flex w-full flex-col overflow-hidden border border-[#26262a] bg-[#101013] text-[#d6d3ca] shadow-[0_30px_80px_rgb(0_0_0/0.45)]"
        style={{ fontSize: "1.28cqw", aspectRatio: "16/10" }}
      >
        {/* App chrome */}
        <div className="flex items-center justify-between border-b border-[#232327] bg-[#0b0b0d] px-[1.6em] py-[1em]">
          <span className="font-mono text-[0.85em] tracking-[0.12em] text-[#9a988f]">
            sanaan / delivery · sprint 06
          </span>
          <span className="flex items-center gap-[0.6em] font-mono text-[0.75em] text-[#6f6e67]">
            <i className="size-[0.6em] rounded-full bg-[#7fb069]" />
            FRIDAY DEMO · 3:00 PM CT
          </span>
        </div>

        {/* Board */}
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[1.2em] p-[1.6em]">
          {columns.map((col) => (
            <div key={col.title} className="flex min-h-0 flex-col">
              <p className="flex items-center justify-between font-mono text-[0.75em] tracking-[0.14em] text-[#6f6e67]">
                {col.title}
                <span>{col.cards.length}</span>
              </p>
              <div className="mt-[0.8em] flex flex-1 flex-col gap-[0.7em]">
                {col.cards.map((card) => (
                  <div
                    key={card.label}
                    className={cn(
                      "border p-[1em]",
                      card.accent
                        ? "border-[#ff4d00]/50 bg-[#ff4d00]/8"
                        : "border-[#232327] bg-[#141417]",
                    )}
                  >
                    <p className={cn("text-[0.88em] leading-snug", "done" in card && card.done && "text-[#8a897f]")}>
                      {"done" in card && card.done && <span className="mr-[0.4em] text-[#7fb069]">✓</span>}
                      {card.label}
                    </p>
                    <p
                      className={cn(
                        "mt-[0.6em] inline-block border px-[0.6em] py-[0.15em] font-mono text-[0.65em] tracking-[0.1em]",
                        card.accent
                          ? "border-[#ff4d00]/40 text-[#ff8a5c]"
                          : "border-[#2a2a2e] text-[#6f6e67]",
                      )}
                    >
                      {card.tag}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Budget bar */}
        <div className="flex items-center justify-between border-t border-[#232327] bg-[#0b0b0d] px-[1.6em] py-[0.9em] font-mono text-[0.72em]">
          <span className="text-[#6f6e67]">PERF BUDGET — LCP</span>
          <span className="mx-[1.2em] h-[0.5em] flex-1 overflow-hidden rounded-full bg-[#1e1e22]">
            <i className="block h-full w-[42%] bg-[#7fb069]" />
          </span>
          <span className="text-[#7fb069]">1.1s / 2.5s ✓</span>
        </div>
      </div>
    </div>
  );
}
