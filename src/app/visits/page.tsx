import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readEvents, overall, perDay, perCountry, stamp } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visits",
  robots: { index: false, follow: false },
};

/**
 * Private, consolidated visit dashboard. Reachable only with ?key= matching
 * the VISITS_KEY env var; otherwise it 404s. Shows all-time aggregate counts
 * plus per-day and per-country breakdowns — country level only, never a
 * single person, never a location finer than country.
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
  const totals = overall(events);
  const days = perDay(events);
  const countries = perCountry(events);

  const th = "px-3 py-2 text-left font-semibold text-[#9a988f]";
  const td = "px-3 py-2";

  return (
    <main
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      className="min-h-svh bg-[#0c0c0d] px-4 py-8 text-[13px] text-[#d6d3ca] sm:px-8"
    >
      <div className="mx-auto max-w-[820px]">
        <h1 className="text-[18px] font-semibold text-white">iamsanaan · visits</h1>
        <p className="mt-1 text-[#7a7970]">
          All time, updated {stamp(new Date().toISOString())} (America/Chicago). Aggregate only.
        </p>

        <div className="mt-6 flex flex-wrap gap-8 border-y border-[#26262a] py-5">
          <Stat label="Visits" value={totals.visits} />
          <Stat label="Unique" value={totals.unique} />
          <Stat label="“No” attempts" value={totals.no} />
          <Stat label="“Yes”" value={totals.yes} />
          <Stat label="Photos opened" value={totals.photos} />
        </div>

        <h2 className="mt-8 text-[15px] font-semibold text-white">By day</h2>
        <div className="mt-3 overflow-x-auto rounded border border-[#26262a]">
          <table className="w-full border-collapse">
            <thead className="bg-[#141417]">
              <tr>
                <th className={th}>Date</th>
                <th className={th}>Visits</th>
                <th className={th}>Unique</th>
                <th className={th}>“No”</th>
                <th className={th}>“Yes”</th>
                <th className={th}>Photos</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.date} className="border-t border-[#26262a]">
                  <td className={`${td} font-semibold text-white`}>{d.date}</td>
                  <td className={td}>{d.visits}</td>
                  <td className={td}>{d.unique}</td>
                  <td className={td}>{d.no}</td>
                  <td className={td}>{d.yes}</td>
                  <td className={td}>{d.photos}</td>
                </tr>
              ))}
              {days.length === 0 && (
                <tr>
                  <td className={`${td} text-[#7a7970]`} colSpan={6}>
                    No visits recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="mt-8 text-[15px] font-semibold text-white">By country</h2>
        <div className="mt-3 overflow-x-auto rounded border border-[#26262a]">
          <table className="w-full border-collapse">
            <thead className="bg-[#141417]">
              <tr>
                <th className={th}>Country</th>
                <th className={th}>Visits</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.country} className="border-t border-[#26262a]">
                  <td className={`${td} font-semibold text-white`}>{c.country}</td>
                  <td className={td}>{c.visits}</td>
                </tr>
              ))}
              {countries.length === 0 && (
                <tr>
                  <td className={`${td} text-[#7a7970]`} colSpan={2}>
                    No visits recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
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
