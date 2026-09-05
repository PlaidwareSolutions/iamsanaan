import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { products, platformName, platformUrl } from "@/data/products";
import { FooterCta } from "./FooterCta";

const companyLinks = [
  { label: "Products", href: "/products" },
  { label: "Process", href: "/process" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const link = "text-[12px] text-black/72 transition-colors hover:text-black hover:underline underline-offset-2";
const heading = "text-[12px] font-semibold text-[#1d1d1f]";

/** apple.com footer: gray ground, 12px directory columns, hairlines, legal line. */
export function Footer() {
  return (
    <>
      <FooterCta />
      <footer className="tone-gray text-[#6e6e73]">
        <div className="mx-auto max-w-[1024px] px-5 py-6 sm:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-black/10 py-8 md:grid-cols-4">
            <div>
              <h2 className={heading}>Services</h2>
              <ul className="mt-2.5 space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={link}>
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className={link}>
                    All services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={heading}>Company</h2>
              <ul className="mt-2.5 space-y-2">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={heading}>Our products</h2>
              <ul className="mt-2.5 space-y-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={link}>
                      {p.name}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={platformUrl} target="_blank" rel="noopener noreferrer" className={link}>
                    {platformName} platform
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className={heading}>Contact</h2>
              <ul className="mt-2.5 space-y-2">
                <li>
                  <a href={`mailto:${site.email}`} className={link}>
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className={link}>
                    {site.phone}
                  </a>
                </li>
                <li className="text-[12px] text-black/72">{site.address}</li>
              </ul>
            </div>
          </div>

          <p className="border-b border-black/10 py-4 text-[12px]">
            {site.description}{" "}
            <Link href="/contact" className="text-link hover:underline">
              Start a project
            </Link>
            .
          </p>

          <div className="flex flex-col gap-3 py-4 text-[12px] md:flex-row md:items-center md:justify-between">
            <p>
              Copyright © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center">
              {site.socials.map((s, i) => (
                <li key={s.label} className="flex items-center">
                  {i > 0 && <span aria-hidden className="mx-2.5 h-3 w-px bg-black/20" />}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/72 transition-colors hover:text-black hover:underline underline-offset-2"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
