"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { MonoLabel } from "./ui/MonoLabel";

/** Footer conversion band — suppressed on /contact, where the form already is. */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div className="flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-24">
      <div>
        <MonoLabel>Next step</MonoLabel>
        <p className="headline mt-4 max-w-[16ch] text-4xl md:text-6xl">
          Tell us what needs to exist.
        </p>
      </div>
      <div className="flex flex-col items-start gap-4">
        <Link
          href="/contact"
          className="inline-flex h-13 items-center bg-accent px-8 text-base font-medium text-ink transition-colors duration-300 hover:bg-bone"
        >
          Start a project
        </Link>
        <p className="font-mono text-[12px] text-mute">
          Engagements start at {site.anchors.projectMinimum} · reply within {site.anchors.responseTime}
        </p>
      </div>
    </div>
  );
}
