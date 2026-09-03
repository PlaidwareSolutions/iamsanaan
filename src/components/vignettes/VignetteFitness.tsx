import { cn } from "@/lib/utils";

/**
 * Coded UI vignette — Pulseline training app: phone frame flanked by a
 * coach-recap card and store stats. em-based sizing; decorative.
 */
export function VignetteFitness({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("@container w-full select-none", className)}>
      <div
        className="flex w-full items-center justify-center gap-[3em]"
        style={{ fontSize: "1.6cqw" }}
      >
        {/* Sunday recap card */}
        <div className="w-[26%] -translate-y-[2em] rounded-[0.8em] border border-[#26262a] bg-[#131317] p-[1.3em] text-[#e8e5dc] shadow-[0_20px_60px_rgb(0_0_0/0.45)]">
          <p className="font-mono text-[0.7em] tracking-[0.16em] text-[#6f6e67]">SUNDAY RECAP · WK 14</p>
          <p className="mt-[0.8em] text-[1.05em] leading-snug font-medium">
            Best pressing week since January.
          </p>
          <div className="mt-[1.1em] space-y-[0.7em] border-t border-[#1e1e22] pt-[1em]">
            {[
              { k: "Volume", v: "24,300 lb", d: "+6%" },
              { k: "Progression", v: "3 lifts ↑", d: "" },
              { k: "Streak", v: "Protected", d: "" },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between text-[0.8em]">
                <span className="text-[#6f6e67]">{row.k}</span>
                <span>
                  {row.v} {row.d && <span className="text-[#7fb069]">{row.d}</span>}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-[1em] rounded-[0.4em] bg-[#ff4d00]/12 px-[0.8em] py-[0.55em] font-mono text-[0.62em] leading-relaxed text-[#ff8a5c]">
            Shared 2,140 times this week
          </p>
        </div>

        {/* Phone */}
        <div
          className="relative w-[38%] shrink-0 overflow-hidden rounded-[2.2em] border-[0.35em] border-[#2a2a2e] bg-[#0e0e11] text-[#e8e5dc] shadow-[0_30px_80px_rgb(0_0_0/0.5)]"
          style={{ aspectRatio: "9/19" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-[1.4em] pt-[1em] font-mono text-[0.7em] text-[#6f6e67]">
            <span>9:41</span>
            <span className="flex gap-[0.4em]">
              <i className="h-[0.6em] w-[1.1em] rounded-[0.15em] bg-[#3a3a40]" />
            </span>
          </div>

          {/* Header */}
          <div className="px-[1.4em] pt-[1.2em]">
            <p className="font-mono text-[0.7em] tracking-[0.16em] text-[#6f6e67]">WEEK 14 · PUSH DAY</p>
            <p className="mt-[0.3em] text-[1.5em] font-semibold">Evening, Maya</p>
          </div>

          {/* Streak ring */}
          <div className="mt-[1.2em] flex items-center justify-center">
            <div className="relative">
              <svg viewBox="0 0 120 120" className="w-[9em]">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#1e1e22" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#ff4d00"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="314"
                  strokeDashoffset="63"
                  transform="rotate(-90 60 60)"
                  className="transition-all duration-1000 ease-(--ease-swift) group-hover:[stroke-dashoffset:20]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[2em] leading-none font-bold">47</span>
                <span className="mt-[0.4em] font-mono text-[0.65em] tracking-[0.14em] text-[#6f6e67]">
                  DAY STREAK
                </span>
              </div>
            </div>
          </div>

          {/* Session rows */}
          <div className="mt-[1.4em] flex flex-col gap-[0.6em] px-[1.4em]">
            {[
              { name: "Bench press", detail: "4 × 6 · 185 lb", done: true },
              { name: "Incline DB press", detail: "3 × 8 · 65 lb", done: true },
              { name: "Overhead press", detail: "3 × 8 · 95 lb", done: false },
            ].map((set) => (
              <div
                key={set.name}
                className="flex items-center justify-between rounded-[0.6em] border border-[#1e1e22] bg-[#15151a] px-[1em] py-[0.8em]"
              >
                <div>
                  <p className="text-[0.95em] font-medium">{set.name}</p>
                  <p className="mt-[0.15em] font-mono text-[0.7em] text-[#6f6e67]">{set.detail}</p>
                </div>
                <i
                  className={cn(
                    "flex size-[1.4em] items-center justify-center rounded-full border text-[0.8em]",
                    set.done
                      ? "border-[#ff4d00] bg-[#ff4d00] text-[#0e0e11]"
                      : "border-[#3a3a40] text-transparent",
                  )}
                >
                  ✓
                </i>
              </div>
            ))}
          </div>

          {/* Suggestion chip */}
          <div className="mx-[1.4em] mt-[1em] rounded-[0.6em] bg-[#ff4d00]/12 px-[1em] py-[0.7em]">
            <p className="font-mono text-[0.68em] leading-relaxed text-[#ff8a5c]">
              COACH: +5 lb on bench next session — 3 clean weeks at 185.
            </p>
          </div>

          {/* Tab bar */}
          <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-[#1e1e22] bg-[#0b0b0d] px-[1em] py-[1em] font-mono text-[0.65em] text-[#6f6e67]">
            <span className="text-[#ff4d00]">TRAIN</span>
            <span>PROGRESS</span>
            <span>RECAP</span>
          </div>
        </div>

        {/* Store stats */}
        <div className="flex w-[22%] translate-y-[1.5em] flex-col gap-[1em]">
          {[
            { big: "4.8★", small: "App Store · 3,100 reviews" },
            { big: "124k", small: "downloads in 6 months" },
            { big: "<20s", small: "to log a session", accent: true },
          ].map((stat) => (
            <div
              key={stat.big}
              className={cn(
                "rounded-[0.8em] border p-[1.1em] shadow-[0_20px_60px_rgb(0_0_0/0.35)]",
                stat.accent
                  ? "border-[#ff4d00]/40 bg-[#ff4d00]/10 text-[#ff8a5c]"
                  : "border-[#26262a] bg-[#131317] text-[#e8e5dc]",
              )}
            >
              <p className="text-[1.5em] leading-none font-semibold">{stat.big}</p>
              <p className={cn("mt-[0.5em] font-mono text-[0.62em] leading-snug", stat.accent ? "text-[#ff8a5c]/80" : "text-[#6f6e67]")}>
                {stat.small}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
