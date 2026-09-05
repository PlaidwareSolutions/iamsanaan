import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { Container } from "./ui/Container";
import { MonoLabel } from "./ui/MonoLabel";
import { FooterCta } from "./FooterCta";

const companyLinks = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="tone-ink border-t border-line">
      <Container>
        <FooterCta />

        {/* Sitemap */}
        <div className="grid grid-cols-2 gap-10 border-t border-line py-14 md:grid-cols-3">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-xl text-fg">
              {site.wordmark}
              <span className="text-accent">®</span>
            </Link>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-mute">
              A digital product &amp; growth studio. Web platforms, mobile apps, and the growth
              engines behind them.
            </p>
          </div>

          <div>
            <MonoLabel as="h2">Services</MonoLabel>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-mute transition-colors hover:text-fg">
                    {s.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm text-mute transition-colors hover:text-fg">
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <MonoLabel as="h2">Company</MonoLabel>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-mute transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <MonoLabel as="h2">Direct</MonoLabel>
              <a href={`mailto:${site.email}`} className="mt-4 block text-sm text-mute transition-colors hover:text-fg">
                {site.email}
              </a>
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                className="mt-2 block text-sm text-mute transition-colors hover:text-fg"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Legal line */}
        <div className="flex flex-col gap-3 border-t border-line py-6 font-mono text-[11px] tracking-[0.06em] text-mute md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName} · {site.address}
          </p>
          <div className="flex gap-6">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
