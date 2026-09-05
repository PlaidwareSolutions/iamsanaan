import { Check } from "lucide-react";
import { engagementModels } from "@/data/pricing";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";

/** "How to hire us" — the buying models as three lifting tiles. */
export function EngagementCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {engagementModels.map((model, i) => (
        <Reveal
          key={model.slug}
          delay={i * 0.08}
          className="tile flex flex-col p-8 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile md:p-9"
        >
          <MonoLabel>{`Model ${String(i + 1).padStart(2, "0")}`}</MonoLabel>
          <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.01em]">{model.name}</h3>
          <p className="text-gradient mt-2 text-[32px] font-semibold tracking-[-0.02em] md:text-[36px]">
            {model.anchor}
          </p>
          <p className="mt-1 text-[12px] text-mute">{model.anchorNote}</p>
          <p className="mt-5 text-[15px] leading-[1.47] text-mute">{model.summary}</p>

          <div className="mt-7 border-t border-line pt-5">
            <MonoLabel>Best when</MonoLabel>
            <ul className="mt-3 space-y-2.5">
              {model.bestWhen.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-snug">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {detailed && (
            <p className="mt-6 border-t border-line pt-4 text-[12px] leading-relaxed text-mute">
              {model.mechanics}
            </p>
          )}
        </Reveal>
      ))}
    </div>
  );
}
