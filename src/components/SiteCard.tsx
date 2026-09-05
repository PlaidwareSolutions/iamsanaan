import { ChevronRight } from "lucide-react";
import type { Site } from "@/data/sites";
import { MonoLabel } from "./ui/MonoLabel";
import { Laptop } from "./DeviceFrame";

/** Compact gallery tile for a shipped website: its live capture in a laptop, then the name. One link. */
export function SiteCard({ site }: { site: Site }) {
  const host = new URL(site.url).host.replace(/^www\./, "");
  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <div className="tile p-6 transition-[transform,box-shadow] duration-500 ease-(--ease-swift) group-hover:-translate-y-1 group-hover:shadow-tile sm:p-8">
        <Laptop
          src={site.screens.desktop}
          alt={`${site.name} website on a laptop`}
          sizes="(min-width: 640px) 560px, 88vw"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 px-1">
        <div>
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] transition-colors group-hover:text-link">
            {site.name}
          </h3>
          <MonoLabel className="mt-1 block">
            {site.vertical} · {site.location}
          </MonoLabel>
        </div>
        <span className="inline-flex shrink-0 items-center gap-0.5 text-[14px] text-link group-hover:underline">
          {host}
          <ChevronRight aria-hidden className="size-3.5" />
        </span>
      </div>
    </a>
  );
}
