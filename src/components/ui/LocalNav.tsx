import Link from "next/link";
import { Button } from "./Button";

/**
 * apple.com's product "local nav": a 52px sticky strip with the page title,
 * section anchors, and the page's one blue call to action. Rendered above
 * the hero. On desktop the global nav scrolls away and this sticks at the
 * top; on mobile the global nav stays fixed, so this sticks beneath it.
 */
export function LocalNav({
  title,
  href = "#",
  links = [],
  cta = { label: "Start a project", href: "/contact" },
}: {
  title: string;
  href?: string;
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
}) {
  return (
    <div className="glass sticky top-12 z-40 mt-12 border-b border-black/10 bg-[rgb(251_251_253/0.8)] text-[#1d1d1f] lg:top-0">
      <div className="mx-auto flex h-[52px] max-w-[1024px] items-center justify-between px-5 sm:px-8">
        <Link href={href} className="text-[19px] font-semibold tracking-[-0.01em] md:text-[21px]">
          {title}
        </Link>
        <div className="flex items-center gap-7">
          <ul className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[12px] text-black/80 transition-colors hover:text-black">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={cta.href} size="sm">
            {cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
