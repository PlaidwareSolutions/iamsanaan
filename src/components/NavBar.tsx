"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { MonoLabel } from "./ui/MonoLabel";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on route change (adjust-state-during-render pattern)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape + outside click close the services dropdown
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  const build = services.filter((s) => s.group === "Build");
  const grow = services.filter((s) => s.group === "Grow");

  return (
    <>
    <header
      className={cn(
        "tone-ink fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-(--ease-swift)",
        scrolled || menuOpen
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ backgroundColor: scrolled || menuOpen ? undefined : "transparent" }}
    >
      <Container className="flex h-16 items-center justify-between md:h-18">
        <Link
          href="/"
          className="font-display text-[22px] font-medium tracking-tight text-fg transition-colors hover:text-accent"
          aria-label={`${site.name} — home`}
        >
          {site.wordmark}
          <span className="text-accent">®</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 text-[15px] transition-colors duration-300 hover:text-accent",
                pathname.startsWith("/services") ? "text-fg" : "text-mute",
              )}
            >
              Services
              <ChevronDown
                aria-hidden
                className={cn(
                  "size-3.5 transition-transform duration-300",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>

            {/* Self-qualifying dropdown: Build vs Grow */}
            <div
              className={cn(
                "absolute top-full left-1/2 w-[520px] -translate-x-1/2 pt-5 transition-all duration-300 ease-(--ease-swift)",
                servicesOpen
                  ? "pointer-events-auto visible translate-y-0 opacity-100"
                  : "pointer-events-none invisible -translate-y-1 opacity-0",
              )}
            >
              <div className="tone-ink grid grid-cols-2 border border-line bg-ink-2 shadow-[0_24px_80px_rgb(0_0_0/0.5)]">
                <div className="border-r border-line p-6">
                  <MonoLabel className="text-accent">Build</MonoLabel>
                  <ul className="mt-4 space-y-1">
                    {build.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group block py-2"
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="block text-[15px] font-medium text-fg transition-colors group-hover:text-accent">
                            {s.navLabel}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-mute">
                            {s.outcome}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col p-6">
                  <MonoLabel className="text-accent">Grow</MonoLabel>
                  <ul className="mt-4 space-y-1">
                    {grow.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group block py-2"
                          onClick={() => setServicesOpen(false)}
                        >
                          <span className="block text-[15px] font-medium text-fg transition-colors group-hover:text-accent">
                            {s.navLabel}
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-mute">
                            {s.outcome}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="u-link mt-auto self-start pt-4 font-mono text-[11px] tracking-[0.18em] text-mute uppercase hover:text-fg"
                  >
                    All services →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[15px] transition-colors duration-300 hover:text-accent",
                pathname.startsWith(link.href) ? "text-fg" : "text-mute",
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="ml-2 inline-flex h-10 items-center bg-accent px-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-bone"
          >
            Start a project
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={cn(
                "absolute left-0 block h-[1.5px] w-6 bg-bone transition-all duration-300 ease-(--ease-swift)",
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-[1.5px] w-6 bg-bone transition-all duration-300 ease-(--ease-swift)",
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
              )}
            />
          </span>
        </button>
      </Container>

      </header>

      {/* Mobile full-screen menu — flat list, no nesting (outside <header>: its
          backdrop-filter would otherwise become the containing block for fixed) */}
      <div
        className={cn(
          "tone-ink fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-ink transition-all duration-400 ease-(--ease-swift) lg:hidden",
          menuOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <Container className="flex flex-1 flex-col pt-6 pb-10">
          <nav aria-label="Mobile" className="flex flex-col">
            {[
              { label: "Services", href: "/services" },
              ...navLinks,
              { label: "Contact", href: "/contact" },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-baseline justify-between border-b border-line py-5 transition-all duration-500 ease-(--ease-swift)",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms" }}
              >
                <span className="font-display text-3xl text-fg">{link.label}</span>
                <span className="font-mono text-[11px] text-mute">0{i + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <MonoLabel>Direct</MonoLabel>
            <a href={`mailto:${site.email}`} className="mt-3 block text-lg text-fg">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="mt-1 block text-lg text-mute">
              {site.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 flex h-13 w-full items-center justify-center bg-accent text-base font-medium text-ink"
            >
              Start a project
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
