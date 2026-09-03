import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { phases } from "@/data/process";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Compact horizontal process timeline for the homepage —
 * proof of operational maturity, linking to the full /process page.
 */
export function ProcessStrip() {
  return (
    <div>
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
        <ol className="flex min-w-[900px] border-t border-line lg:min-w-0">
          {phases.map((phase, i) => (
            <Reveal
              as="li"
              key={phase.index}
              delay={i * 0.07}
              className="group relative flex-1 border-r border-line py-8 pr-6 pl-0 last:border-r-0 [&:not(:first-child)]:pl-6"
            >
              <span className="absolute top-0 left-0 h-px w-0 bg-accent transition-all duration-700 ease-(--ease-swift) group-hover:w-full" />
              <MonoLabel className="text-accent">{phase.index}</MonoLabel>
              <h3 className="mt-3 text-xl font-medium">{phase.name}</h3>
              <MonoLabel className="mt-1 block">{phase.window}</MonoLabel>
              <p className="mt-4 text-sm leading-relaxed text-mute">{phase.youSee}</p>
            </Reveal>
          ))}
        </ol>
      </div>
      <Link
        href="/process"
        className="group mt-8 inline-flex items-center gap-2 font-medium transition-colors duration-300 hover:text-accent"
      >
        See the full process
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
