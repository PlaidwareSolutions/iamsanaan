import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import type { Site } from "@/data/sites";
import { cn } from "@/lib/utils";
import { MonoLabel, Tag } from "./ui/MonoLabel";

/**
 * A shipped website: the live desktop capture in a rounded frame with the
 * live mobile capture overlapping it, beside its story. The whole card is
 * one link to the site.
 */
export function SiteShowcase({
  site,
  flip = false,
  priority = false,
}: {
  site: Site;
  flip?: boolean;
  priority?: boolean;
}) {
  const host = new URL(site.url).host.replace(/^www\./, "");

  return (
    <article>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid items-center gap-12 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-8 lg:grid-cols-12 lg:gap-16"
      >
        {/* Screens */}
        <div className={cn("relative lg:col-span-7", flip && "lg:order-2")}>
          <div className="overflow-hidden rounded-card border border-line bg-tone-2 shadow-card transition-transform duration-500 ease-(--ease-swift) group-hover:-translate-y-1">
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
              </span>
              <span className="truncate text-[12px] text-mute">{host}</span>
            </div>
            <Image
              src={site.screens.desktop}
              alt={`${site.name} homepage on desktop`}
              width={1440}
              height={900}
              sizes="(min-width: 1024px) 58vw, 100vw"
              priority={priority}
              className="block w-full"
            />
          </div>
          <div
            className={cn(
              "absolute -bottom-8 w-[26%] max-w-[200px] overflow-hidden rounded-[14px] border border-line bg-tone-2 shadow-tile transition-transform duration-500 ease-(--ease-swift) group-hover:-translate-y-2",
              flip ? "left-4 sm:left-8" : "right-4 sm:right-8",
            )}
          >
            <Image
              src={site.screens.mobile}
              alt={`${site.name} homepage on a phone`}
              width={780}
              height={1688}
              sizes="(min-width: 1024px) 15vw, 26vw"
              className="block w-full"
            />
          </div>
        </div>

        {/* Story */}
        <div className={cn("pt-6 lg:col-span-5 lg:pt-0", flip && "lg:order-1")}>
          <MonoLabel>
            {site.vertical} · {site.location}
          </MonoLabel>
          <h3 className="mt-3 text-[28px] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-link md:text-[32px]">
            {site.name}
          </h3>
          <p className="mt-3 max-w-[46ch] text-[17px] leading-[1.47] text-mute">{site.summary}</p>
          <ul className="mt-6 space-y-2.5">
            {site.built.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-snug">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-0.5 text-[17px] text-link group-hover:underline">
            Visit {host}
            <ChevronRight aria-hidden className="size-4" />
          </span>
        </div>
      </a>
    </article>
  );
}
