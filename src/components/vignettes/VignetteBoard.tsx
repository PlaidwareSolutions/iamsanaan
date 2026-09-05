import { cn } from "@/lib/utils";

const columns = [
  {
    title: "This week",
    cards: [
      { label: "Quote engine — margin floors", tag: "ENG", accent: false },
      { label: "Empty states, load board", tag: "DESIGN", accent: false },
      { label: "Carrier scorecard API", tag: "ENG", accent: false },
      { label: "Sprint review notes → client", tag: "DELIVERY", accent: false },
    ],
  },
  {
    title: "In review",
    cards: [
      { label: "Dispatch table keyboard nav", tag: "A11Y", accent: true },
      { label: "Lane analytics queries", tag: "ENG", accent: false },
      { label: "Exception queue microcopy", tag: "CONTENT", accent: false },
    ],
  },
  {
    title: "Shipped Fri",
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
 * Coded UI vignette — the studio's own delivery board mid-sprint. Shows how
 * work runs (cadence, demos, budgets). em-based sizing; decorative.
 */
export function VignetteBoard({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("@container w-full select-none", className)}>
      <div
        className="relative flex w-full flex-col overflow-hidden rounded-card border border-white/10 bg-[#1d1d1f] text-[#f5f5f7] shadow-[0_30px_80px_rgb(0_0_0/0.35)]"
        style={{ fontSize: "1.28cqw", aspectRatio: "16/10" }}
      >
        {/* App chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black px-[1.6em] py-[1em]">
          <span className="text-[0.85em] font-semibold text-[#86868b]">sanaan / delivery · sprint 06</span>
          <span className="flex items-center gap-[0.6em] text-[0.75em] text-[#86868b]">
            <i className="size-[0.6em] rounded-full bg-[#30d158]" />
            Friday demo · 3:00 PM CT
          </span>
        </div>

        {/* Board */}
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[1.2em] p-[1.6em]">
          {columns.map((col) => (
            <div key={col.title} className="flex min-h-0 flex-col">
              <p className="flex items-center justify-between text-[0.75em] font-semibold text-[#86868b]">
                {col.title}
                <span>{col.cards.length}</span>
              </p>
              <div className="mt-[0.8em] flex flex-1 flex-col gap-[0.7em]">
                {col.cards.map((card) => (
                  <div
                    key={card.label}
                    className={cn(
                      "rounded-[0.8em] border p-[1em]",
                      card.accent ? "border-[#2997ff]/60 bg-[#2997ff]/10" : "border-white/10 bg-[#2d2d2f]",
                    )}
                  >
                    <p className={cn("text-[0.88em] leading-snug", "done" in card && card.done && "text-[#86868b]")}>
                      {"done" in card && card.done && <span className="mr-[0.4em] text-[#30d158]">✓</span>}
                      {card.label}
                    </p>
                    <p
                      className={cn(
                        "mt-[0.6em] inline-block rounded-full border px-[0.7em] py-[0.15em] text-[0.65em] font-medium",
                        card.accent ? "border-[#2997ff]/50 text-[#2997ff]" : "border-white/15 text-[#86868b]",
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
        <div className="flex items-center justify-between border-t border-white/10 bg-black px-[1.6em] py-[0.9em] text-[0.72em]">
          <span className="text-[#86868b]">Perf budget — LCP</span>
          <span className="mx-[1.2em] h-[0.5em] flex-1 overflow-hidden rounded-full bg-[#2d2d2f]">
            <i className="block h-full w-[42%] rounded-full bg-[#30d158]" />
          </span>
          <span className="text-[#30d158]">1.1s / 2.5s ✓</span>
        </div>
      </div>
    </div>
  );
}
