import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Site } from "@/data/sites";
import { cn } from "@/lib/utils";
import { MonoLabel, Tag } from "./ui/MonoLabel";

/**
 * A shipped website: the live desktop capture in a hairline browser frame with
 * the live mobile capture overlapping it, on the same asymmetric 7/5 grid the
 * rest of the site uses. Nothing here is a mockup — both screens are the real
 * homepage, and the entire card is one link to it.
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
          <div className="border border-line bg-tone-2 transition-transform duration-500 ease-(--ease-swift) group-hover:-translate-y-1">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
                <span className="size-2 rounded-full bg-line-strong" />
              </span>
              <span className="truncate font-mono text-[11px] tracking-[0.06em] text-mute">{host}</span>
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

          {/* Phone, overlapping the bottom edge of the frame */}
          <div
            className={cn(
              "absolute -bottom-8 w-[26%] max-w-[200px] border border-line bg-tone-2 shadow-[0_28px_60px_-24px_rgb(0_0_0/0.65)] transition-transform duration-500 ease-(--ease-swift) group-hover:-translate-y-2",
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

        {/* Meta */}
        <div className={cn("pt-6 lg:col-span-5 lg:pt-0", flip && "lg:order-1")}>
          <MonoLabel>
            {site.vertical} · {site.location}
          </MonoLabel>
          <h3 className="headline mt-4 text-3xl transition-colors duration-300 group-hover:text-accent md:text-4xl">
            {site.name}
          </h3>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-mute">{site.summary}</p>
          <ul className="mt-6 space-y-2.5">
            {site.built.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-snug">
                <span aria-hidden className="font-mono text-accent">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-2 font-medium text-fg transition-colors duration-300 group-hover:text-accent">
            Visit {host}
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 ease-(--ease-swift) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </a>
    </article>
  );
}
