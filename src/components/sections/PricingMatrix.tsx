"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { growthTiers, tierRows } from "@/data/pricing";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function price(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

/**
 * SaaS-style retainer matrix: desktop comparison grid, stacked cards on mobile,
 * with a monthly/quarterly billing toggle.
 */
export function PricingMatrix() {
  const [quarterly, setQuarterly] = useState(false);

  return (
    <div>
      {/* Billing toggle */}
      <div className="mb-10 flex items-center gap-1 border border-line p-1 w-fit">
        {[
          { label: "Monthly", value: false },
          { label: "Quarterly · save 10%", value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            onClick={() => setQuarterly(opt.value)}
            aria-pressed={quarterly === opt.value}
            className={cn(
              "px-4 py-2 font-mono text-[12px] tracking-[0.08em] uppercase transition-colors duration-300",
              quarterly === opt.value ? "bg-accent text-ink" : "text-mute hover:text-fg",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Desktop matrix */}
      <div className="hidden overflow-hidden border border-line lg:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[28%] p-6 align-bottom">
                <MonoLabel>Growth retainers</MonoLabel>
              </th>
              {growthTiers.map((tier) => (
                <th
                  key={tier.name}
                  scope="col"
                  className={cn("w-[24%] p-6 align-bottom", tier.highlight && "bg-tone-2")}
                >
                  {tier.highlight && <MonoLabel className="text-accent">Most engaged</MonoLabel>}
                  <p className="mt-2 text-xl font-medium">{tier.name}</p>
                  <p className="mt-2 font-display text-3xl">
                    {price(quarterly ? tier.quarterlyMonthly : tier.monthly)}
                    <span className="font-sans text-sm text-mute">/mo</span>
                  </p>
                  <p className="mt-3 text-[13px] leading-snug font-normal text-mute">{tier.blurb}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tierRows.map((row) => (
              <tr key={row} className="border-b border-line last:border-b-0">
                <th scope="row" className="p-6 text-[15px] font-normal text-mute">
                  {row}
                </th>
                {growthTiers.map((tier) => {
                  const val = tier.features[row];
                  return (
                    <td key={tier.name} className={cn("p-6 text-[15px]", tier.highlight && "bg-tone-2")}>
                      {val === false ? (
                        <Minus aria-label="Not included" className="size-4 text-mute/50" />
                      ) : val === true ? (
                        <Check aria-label="Included" className="size-4 text-accent" />
                      ) : (
                        val
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="p-6" />
              {growthTiers.map((tier) => (
                <td key={tier.name} className={cn("p-6", tier.highlight && "bg-tone-2")}>
                  <Button href="/contact" variant={tier.highlight ? "primary" : "ghost"}>
                    Start with {tier.name}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-6 lg:hidden">
        {growthTiers.map((tier) => (
          <div
            key={tier.name}
            className={cn("border border-line p-6", tier.highlight && "border-accent bg-tone-2")}
          >
            {tier.highlight && <MonoLabel className="text-accent">Most engaged</MonoLabel>}
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <p className="text-xl font-medium">{tier.name}</p>
              <p className="font-display text-2xl">
                {price(quarterly ? tier.quarterlyMonthly : tier.monthly)}
                <span className="font-sans text-sm text-mute">/mo</span>
              </p>
            </div>
            <p className="mt-2 text-sm text-mute">{tier.blurb}</p>
            <ul className="mt-5 space-y-3 border-t border-line pt-5">
              {tierRows.map((row) => {
                const val = tier.features[row];
                if (val === false) return null;
                return (
                  <li key={row} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-mute">{row}</span>
                    <span className="text-right">{val === true ? "Included" : val}</span>
                  </li>
                );
              })}
            </ul>
            <Button
              href="/contact"
              variant={tier.highlight ? "primary" : "ghost"}
              className="mt-6 w-full"
            >
              Start with {tier.name}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-[70ch] font-mono text-[12px] leading-relaxed text-mute">
        All retainers: 3-month initial term, then month-to-month · you own every account and
        playbook · ad spend billed directly to your cards, never marked up.
      </p>
    </div>
  );
}
