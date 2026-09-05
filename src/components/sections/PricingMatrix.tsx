"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { growthTiers, tierRows } from "@/data/pricing";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/utils";

function price(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

/** Retainer comparison: a segmented billing toggle, a rounded matrix on desktop, stacked tiles on mobile. */
export function PricingMatrix() {
  const [billing, setBilling] = useState<"monthly" | "quarterly">("monthly");
  const quarterly = billing === "quarterly";

  return (
    <div>
      <div className="mb-10">
        <Segmented
          label="Billing"
          value={billing}
          onChange={setBilling}
          options={[
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly · save 10%", value: "quarterly" },
          ]}
        />
      </div>

      {/* Desktop matrix */}
      <div className="tile hidden overflow-hidden lg:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[28%] p-7 align-bottom">
                <MonoLabel>Growth retainers</MonoLabel>
              </th>
              {growthTiers.map((tier) => (
                <th
                  key={tier.name}
                  scope="col"
                  className={cn("w-[24%] p-7 align-bottom", tier.highlight && "bg-tone")}
                >
                  {tier.highlight && <MonoLabel className="text-accent">Most engaged</MonoLabel>}
                  <p className="mt-2 text-[21px] font-semibold tracking-[-0.01em]">{tier.name}</p>
                  <p className="mt-2 text-[32px] font-semibold tracking-[-0.02em]">
                    {price(quarterly ? tier.quarterlyMonthly : tier.monthly)}
                    <span className="text-[14px] font-normal text-mute">/mo</span>
                  </p>
                  <p className="mt-3 text-[13px] leading-snug font-normal text-mute">{tier.blurb}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tierRows.map((row) => (
              <tr key={row} className="border-b border-line last:border-b-0">
                <th scope="row" className="p-7 text-[15px] font-normal text-mute">
                  {row}
                </th>
                {growthTiers.map((tier) => {
                  const val = tier.features[row];
                  return (
                    <td key={tier.name} className={cn("p-7 text-[15px]", tier.highlight && "bg-tone")}>
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
              <td className="p-7" />
              {growthTiers.map((tier) => (
                <td key={tier.name} className={cn("p-7", tier.highlight && "bg-tone")}>
                  <Button href="/contact" variant={tier.highlight ? "primary" : "ghost"}>
                    Start with {tier.name}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked tiles */}
      <div className="space-y-4 lg:hidden">
        {growthTiers.map((tier) => (
          <div key={tier.name} className={cn("tile p-6", tier.highlight && "ring-2 ring-accent")}>
            {tier.highlight && <MonoLabel className="text-accent">Most engaged</MonoLabel>}
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <p className="text-[21px] font-semibold">{tier.name}</p>
              <p className="text-[28px] font-semibold tracking-[-0.02em]">
                {price(quarterly ? tier.quarterlyMonthly : tier.monthly)}
                <span className="text-[14px] font-normal text-mute">/mo</span>
              </p>
            </div>
            <p className="mt-2 text-[15px] text-mute">{tier.blurb}</p>
            <ul className="mt-5 space-y-3 border-t border-line pt-5">
              {tierRows.map((row) => {
                const val = tier.features[row];
                if (val === false) return null;
                return (
                  <li key={row} className="flex items-baseline justify-between gap-4 text-[15px]">
                    <span className="text-mute">{row}</span>
                    <span className="text-right">{val === true ? "Included" : val}</span>
                  </li>
                );
              })}
            </ul>
            <Button href="/contact" variant={tier.highlight ? "primary" : "ghost"} className="mt-6 w-full">
              Start with {tier.name}
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-[70ch] text-[12px] leading-relaxed text-mute">
        All retainers: 3-month initial term, then month-to-month · you own every account and
        playbook · ad spend billed directly to your cards, never marked up.
      </p>
    </div>
  );
}
