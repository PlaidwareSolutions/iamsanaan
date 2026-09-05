"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

/** Final call to action: a black tile with one line and one button. Suppressed on /contact. */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <section className="tone-ink py-24 md:py-32">
      <Reveal className="mx-auto max-w-[820px] px-5 text-center">
        <h2 className="headline text-[36px] sm:text-[44px] md:text-[56px]">Tell us what you need.</h2>
        <p className="mx-auto mt-5 max-w-[48ch] text-[19px] leading-[1.4] text-mute md:text-[21px]">
          Four questions, two minutes, and a reply from a principal within {site.anchors.responseTime}.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button href="/contact" size="lg">
            Start a project
          </Button>
          <Button href={`mailto:${site.email}`} variant="text" size="lg">
            Or email us
          </Button>
        </div>
        <p className="mt-8 text-[12px] text-mute">
          From {site.anchors.projectMinimum} · you own everything we make
        </p>
      </Reveal>
    </section>
  );
}
