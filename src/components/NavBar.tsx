"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { site } from "@/lib/site";
import { hasLocalNav } from "@/lib/localNav";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

const quickLinks = [
  { label: "All services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Start a project", href: "/contact" },
];

/**
 * apple.com global nav: a 48px frosted bar with 12px links, a Services
 * flyout that drops beneath it over a blurred curtain, and a full-screen
 * mobile menu whose links slide in one after another. On product-style
 * pages (see hasLocalNav) it is not fixed on desktop — the LocalNav is the
 * one sticky bar there, as on apple.com.
 */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  // Pages that open with a LocalNav: the global bar scrolls away on desktop and has no button.
  const local = hasLocalNav(pathname);

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

  // Close the mobile menu on Escape and when the viewport grows past lg
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = () => desktop.matches && setMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    desktop.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
    return () => {
      desktop.removeEventListener("change", onChange);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Escape + outside click close the flyout
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  // Hover only opens the flyout on devices that hover; touch toggles by tap.
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  const build = services.filter((s) => s.group === "Build");
  const grow = services.filter((s) => s.group === "Grow");
  const flyoutItem = () =>
    cn(
      "transition-all duration-400 ease-(--ease-swift)",
      servicesOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
    );

  return (
    <>
      {/* Curtain behind the flyout */}
      <div
        aria-hidden
        className={cn(
          "fixed inset-0 z-40 bg-black/15 backdrop-blur-[3px] transition-opacity duration-300 ease-(--ease-swift)",
          servicesOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <header
        ref={headerRef}
        className={cn("inset-x-0 top-0 z-50 text-[#1d1d1f]", local ? "fixed lg:absolute" : "fixed")}
        onMouseLeave={() => canHover() && setServicesOpen(false)}
      >
        <div className="glass border-b border-black/10 bg-[rgb(251_251_253/0.8)]">
          <nav
            aria-label="Primary"
            className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-5 sm:px-8"
          >
            <Link
              href="/"
              className="text-[17px] font-semibold tracking-[-0.02em] transition-opacity hover:opacity-70"
              aria-label={`${site.name} — home`}
            >
              {site.wordmark}
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-9 lg:flex">
              <li onMouseEnter={() => canHover() && setServicesOpen(true)}>
                <button
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1 text-[12px] transition-colors duration-300 hover:text-black",
                    pathname.startsWith("/services") || servicesOpen ? "text-black" : "text-black/80",
                  )}
                >
                  Services
                  <ChevronDown
                    aria-hidden
                    className={cn("size-3 transition-transform duration-300", servicesOpen && "rotate-180")}
                  />
                </button>
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[12px] transition-colors duration-300 hover:text-black",
                      pathname.startsWith(link.href) ? "text-black" : "text-black/80",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {!local && (
                <Button href="/contact" size="sm">
                  Start a project
                </Button>
              )}
              {/* Mobile toggle */}
              <button
                className="relative flex h-11 w-11 items-center justify-center lg:hidden"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="relative block h-3 w-[18px]">
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-[18px] bg-[#1d1d1f] transition-all duration-300 ease-(--ease-swift)",
                      menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 block h-px w-[18px] bg-[#1d1d1f] transition-all duration-300 ease-(--ease-swift)",
                      menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>

          {/* Services flyout */}
          <div
            aria-hidden={!servicesOpen}
            className={cn(
              "hidden overflow-hidden transition-[max-height,opacity,visibility] duration-300 ease-(--ease-swift) lg:block",
              servicesOpen ? "visible max-h-[440px] opacity-100" : "pointer-events-none invisible max-h-0 opacity-0",
            )}
          >
            <div className="mx-auto grid max-w-[1024px] grid-cols-12 gap-8 px-5 pt-10 pb-12 sm:px-8">
              {[
                { title: "Build", items: build },
                { title: "Grow", items: grow },
              ].map((group, gi) => (
                <div key={group.title} className="col-span-4">
                  <p className="text-[12px] text-black/56">{group.title}</p>
                  <ul className="mt-3 space-y-3">
                    {group.items.map((s, i) => (
                      <li
                        key={s.slug}
                        className={flyoutItem()}
                        style={{ transitionDelay: servicesOpen ? `${80 + (gi * 2 + i) * 45}ms` : "0ms" }}
                      >
                        <Link
                          href={`/services/${s.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="group block"
                        >
                          <span className="block text-[24px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-link">
                            {s.navLabel}
                          </span>
                          <span className="mt-0.5 block max-w-[30ch] text-[12px] leading-snug text-black/56">
                            {s.outcome}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-4 border-l border-black/10 pl-8">
                <p className="text-[12px] text-black/56">Quick links</p>
                <ul className="mt-3 space-y-2.5">
                  {quickLinks.map((l, i) => (
                    <li
                      key={l.href}
                      className={flyoutItem()}
                      style={{ transitionDelay: servicesOpen ? `${240 + i * 45}ms` : "0ms" }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setServicesOpen(false)}
                        className="inline-flex items-center gap-1 text-[14px] text-black/80 transition-colors hover:text-link"
                      >
                        {l.label}
                        <ChevronRight aria-hidden className="size-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu — a sibling of <header>, so its backdrop-filter can't trap it */}
      <div
        className={cn(
          "glass fixed inset-0 top-12 z-40 flex flex-col overflow-y-auto bg-[rgb(251_251_253/0.94)] text-[#1d1d1f] transition-opacity duration-300 ease-(--ease-swift) lg:hidden",
          menuOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-1 flex-col px-8 pt-6 pb-10">
          <nav aria-label="Mobile">
            <ul>
              {[{ label: "Services", href: "/services" }, ...navLinks, { label: "Contact", href: "/contact" }].map(
                (link, i) => (
                  <li
                    key={link.href}
                    className={cn(
                      "border-b border-black/10 transition-all duration-500 ease-(--ease-swift)",
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    )}
                    style={{ transitionDelay: menuOpen ? `${80 + i * 45}ms` : "0ms" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-[28px] font-semibold tracking-[-0.02em]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="mt-auto pt-10">
            <Button href="/contact" size="lg" className="w-full">
              Start a project
            </Button>
            <p className="mt-4 text-center text-[12px] text-black/56">
              <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
