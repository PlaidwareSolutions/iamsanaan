import { Check } from "lucide-react";
import { engagementModels } from "@/data/pricing";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "How to hire us" — the buying models, not the service list.
 * Each card answers: is this the shape of relationship I need?
 */
export function EngagementCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-3">
      {engagementModels.map((model, i) => (
        <Reveal
          key={model.slug}
          delay={i * 0.08}
          className="group flex flex-col bg-tone p-7 transition-colors duration-500 hover:bg-tone-2 md:p-9"
        >
          <MonoLabel>{`Model ${String(i + 1).padStart(2, "0")}`}</MonoLabel>
          <h3 className="mt-4 text-xl font-medium md:text-2xl">{model.name}</h3>
          <p className="mt-2 font-display text-3xl text-accent md:text-4xl">{model.anchor}</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-mute">{model.anchorNote}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-mute">{model.summary}</p>

          <div className="mt-7 border-t border-line pt-5">
            <MonoLabel>Best when</MonoLabel>
            <ul className="mt-3 space-y-2.5">
              {model.bestWhen.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-snug">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {detailed && (
            <p className="mt-6 border-t border-line pt-4 font-mono text-[12px] leading-relaxed text-mute">
              {model.mechanics}
            </p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
