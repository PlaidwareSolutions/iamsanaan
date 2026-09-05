import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond } from "next/font/google";
import { biodata } from "@/data/biodata";
import { BiodataVerdict } from "@/components/BiodataVerdict";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});
const amiri = Amiri({ subsets: ["arabic"], weight: "400", variable: "--font-amiri" });

/** Direct-link only: no navigation points here and robots are told to stay out. */
export const metadata: Metadata = {
  title: { absolute: `${biodata.name} — Biodata` },
  description: `Marriage biodata of ${biodata.name}.`,
  robots: { index: false, follow: false },
};

const palette =
  "[--bio-ink:#15302E] [--bio-ink-soft:#3E5754] [--bio-rule:#C9D3D1] [--bio-brass:#9A6E33] [--bio-paper:#FBFAF6] [--bio-mute:#8B9694] [--bio-label:#7E8D8B] [--bio-hair:#EDEAE2]";

const label = "text-[9px] font-semibold tracking-[0.09em] text-(color:--bio-label) uppercase";
const heading =
  "mb-2.5 border-b border-(color:--bio-ink) pb-[5px] text-[9px] font-semibold tracking-[0.2em] text-(color:--bio-brass) uppercase";

export default function BiodataPage() {
  return (
    <main
      className={cn(
        cormorant.variable,
        amiri.variable,
        palette,
        "min-h-svh bg-[#E8E6E0] px-3 py-6 font-sans text-(color:--bio-ink) antialiased print:bg-white print:p-0",
      )}
    >
      <article className="mx-auto w-[210mm] max-w-full bg-(--bio-paper) p-5 shadow-[0_2px_24px_rgb(0_0_0/0.14)] sm:p-[20mm_18mm_14mm] print:shadow-none">
        <p
          lang="ar"
          dir="rtl"
          className="mb-[18px] text-center font-(family-name:--font-amiri) text-2xl tracking-[0.5px] text-(color:--bio-brass)"
        >
          {biodata.bismillah}
        </p>

        <header className="border-t-2 border-b border-t-(color:--bio-ink) border-b-(color:--bio-rule) pt-4 pb-[18px]">
          <p className="mb-2 text-[9px] font-semibold tracking-[0.18em] text-(color:--bio-brass) uppercase">
            {biodata.kicker}
          </p>
          <h1 className="font-(family-name:--font-cormorant) text-3xl leading-[1.05] font-semibold tracking-[-0.3px] sm:text-[38px]">
            {biodata.name}
          </h1>
          <p className="mt-[9px] font-(family-name:--font-cormorant) text-[17px] leading-[1.45] text-(color:--bio-ink-soft)">
            {biodata.tagline}
          </p>
        </header>

        {biodata.sections.map((section) => (
          <section key={section.title} className="pt-5">
            <h2 className={heading}>{section.title}</h2>
            {"items" in section ? (
              <ul className="pl-0.5 text-[12px] leading-[1.9]">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="relative pl-[15px] before:absolute before:top-2 before:left-0 before:size-[5px] before:rotate-45 before:border before:border-(color:--bio-brass) before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <dl className="divide-y divide-(color:--bio-hair)">
                {section.rows.map((row) => (
                  <div
                    key={row.label}
                    className="grid py-[5px] text-[12px] leading-normal sm:grid-cols-[46mm_1fr] sm:gap-[6mm]"
                  >
                    <dt className={cn(label, "pt-0.5")}>{row.label}</dt>
                    <dd className={cn(row.emphasis && "font-semibold")}>
                      {row.value}
                      {(row.phone || row.note) && (
                        <span className="mt-px block text-[10.5px] font-normal text-(color:--bio-mute)">
                          {row.phone && (
                            <a href={`tel:${row.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">
                              {row.phone}
                            </a>
                          )}
                          {row.phone && row.note && " · "}
                          {row.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}

        <BiodataVerdict {...biodata.verdict} />

        <footer className="mt-[22px] flex justify-between border-t-2 border-(color:--bio-ink) pt-[9px] text-[9px] tracking-[0.1em] text-(color:--bio-mute) uppercase">
          <span>{biodata.footer.left}</span>
          <span>{biodata.footer.right}</span>
        </footer>
      </article>
    </main>
  );
}
