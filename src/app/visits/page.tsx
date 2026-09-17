import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  readEvents,
  isSite,
  isBio,
  overall,
  perDay,
  perCountry,
  perDevice,
  topPages,
  stamp,
  type CountRow,
  type DayRow,
} from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visits",
  robots: { index: false, follow: false },
};

/**
 * Private, consolidated visit dashboard. Reachable only with ?key= matching
 * the VISITS_KEY env var; otherwise it 404s. Two clearly separated sections:
 * the marketing site (iamsanaan.com) and the private bio-data page. Aggregate
 * only — country level at most, never a single person.
 */
export default async function VisitsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const expected = process.env.VISITS_KEY;
  if (!expected || key !== expected) notFound();

  const events = await readEvents();
  const site = events.filter(isSite);
  const bio = events.filter(isBio);

  const siteTotals = overall(site);
  const bioTotals = overall(bio);

  return (
    <main
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      className="min-h-svh bg-[#0c0c0d] px-4 py-8 text-[13px] text-[#d6d3ca] sm:px-8"
    >
      <div className="mx-auto max-w-[860px]">
        <h1 className="text-[18px] font-semibold text-white">iamsanaan · visits</h1>
        <p className="mt-1 text-[#7a7970]">
          All time, updated {stamp(new Date().toISOString())} (America/Chicago). Aggregate only.
        </p>

        {/* ── Marketing site ── */}
        <Section accent="#4a9eff" tag="iamsanaan.com" title="Website" subtitle="Every marketing page">
          <div className="flex flex-wrap gap-8 border-y border-[#26262a] py-5">
            <Stat label="Page views" value={siteTotals.visits} />
            <Stat label="Unique visitors" value={siteTotals.unique} />
            <Stat label="On computer" value={siteTotals.desktop} />
            <Stat label="On mobile" value={siteTotals.mobile} />
          </div>
          <CountTable heading="Top pages" col="Page" rows={topPages(site)} />
          <DayTable rows={perDay(site)} columns={["visits", "unique", "desktop", "mobile"]} />
          <CountTable heading="By device" col="Device" rows={perDevice(site)} />
          <CountTable heading="By country" col="Country" rows={perCountry(site)} />
        </Section>

        {/* ── Bio-data page ── */}
        <Section accent="#c6a15b" tag="iamsanaan.com/bio-data" title="Bio-data page" subtitle="Private, direct-link only">
          <div className="flex flex-wrap gap-8 border-y border-[#26262a] py-5">
            <Stat label="Visits" value={bioTotals.visits} />
            <Stat label="Unique visitors" value={bioTotals.unique} />
            <Stat label="On computer" value={bioTotals.desktop} />
            <Stat label="On mobile" value={bioTotals.mobile} />
            <Stat label="“No” attempts" value={bioTotals.no} />
            <Stat label="“Yes”" value={bioTotals.yes} />
            <Stat label="Photos opened" value={bioTotals.photos} />
          </div>
          <DayTable
            rows={perDay(bio)}
            columns={["visits", "unique", "desktop", "mobile", "no", "yes", "photos"]}
          />
          <CountTable heading="By device" col="Device" rows={perDevice(bio)} />
          <CountTable heading="By country" col="Country" rows={perCountry(bio)} />
        </Section>
      </div>
    </main>
  );
}

function Section({
  accent,
  tag,
  title,
  subtitle,
  children,
}: {
  accent: string;
  tag: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-l-2 pl-4" style={{ borderColor: accent }}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-[16px] font-semibold text-white">{title}</h2>
        <span className="rounded px-2 py-0.5 text-[11px]" style={{ backgroundColor: `${accent}22`, color: accent }}>
          {tag}
        </span>
        <span className="text-[#7a7970]">{subtitle}</span>
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-[22px] font-semibold text-white">{value}</p>
      <p className="text-[#7a7970]">{label}</p>
    </div>
  );
}

const th = "px-3 py-2 text-left font-semibold text-[#9a988f]";
const td = "px-3 py-2";

const DAY_HEADS: Record<string, string> = {
  visits: "Visits",
  unique: "Unique",
  desktop: "Computer",
  mobile: "Mobile",
  no: "“No”",
  yes: "“Yes”",
  photos: "Photos",
};

function DayTable({ rows, columns }: { rows: DayRow[]; columns: (keyof DayRow)[] }) {
  return (
    <>
      <h3 className="mt-6 text-[13px] font-semibold text-[#c9c6bd]">By day</h3>
      <div className="mt-2 overflow-x-auto rounded border border-[#26262a]">
        <table className="w-full border-collapse">
          <thead className="bg-[#141417]">
            <tr>
              <th className={th}>Date</th>
              {columns.map((c) => (
                <th key={c} className={th}>
                  {DAY_HEADS[c]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.date} className="border-t border-[#26262a]">
                <td className={`${td} font-semibold text-white`}>{r.date}</td>
                {columns.map((c) => (
                  <td key={c} className={td}>
                    {r[c] as number}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={`${td} text-[#7a7970]`} colSpan={columns.length + 1}>
                  No visits recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function CountTable({ heading, col, rows }: { heading: string; col: string; rows: CountRow[] }) {
  return (
    <>
      <h3 className="mt-6 text-[13px] font-semibold text-[#c9c6bd]">{heading}</h3>
      <div className="mt-2 overflow-x-auto rounded border border-[#26262a]">
        <table className="w-full border-collapse">
          <thead className="bg-[#141417]">
            <tr>
              <th className={th}>{col}</th>
              <th className={th}>Visits</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-[#26262a]">
                <td className={`${td} font-semibold text-white`}>{r.label}</td>
                <td className={td}>{r.visits}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className={`${td} text-[#7a7970]`} colSpan={2}>
                  No visits recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
