import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  readEvents,
  isSite,
  isBio,
  overall,
  perDay,
  perCountry,
  topPages,
  firstDayKey,
  dailySeries,
  bioFunnel,
  peopleSince,
  uniquePeople,
  peoplePerDay,
  perCity,
  citiesSince,
  visitorNumbers,
  visitors,
  ipOwners,
  returning,
  stamp,
  type Visitor,
  type CountRow,
  type FunnelStep,
  type SeriesDay,
  type TrackEvent,
} from "@/lib/visits";
import { networkNames } from "@/lib/networks";
import { Expandable } from "./Expandable";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visits",
  robots: { index: false, follow: false },
};

/** The daily charts show at most this many days; every total stays all-time. */
const CHART_DAYS = 90;
/** Days covered by the small trend bars under each website number. */
const SPARK_DAYS = 14;
/** Rows shown before "Show all": bar lists (pages, countries) and the activity table. */
const LIST_ROWS = 5;
const TABLE_ROWS = 7;
const NO_CITIES = "No cities yet. They are recorded once Cloudflare's visitor location headers are on.";

const SITE = { accent: "#4a9eff", light: "#8cc2ff", dark: "#2d6cb0", tagBg: "#12243a" };
const BIO = { accent: "#e0a43a", light: "#f0c06a", tagBg: "#33260f" };
const MUTED = "#8a897f";
const EMPTY_BAR = "#2a2a30";

/**
 * Private, consolidated visit dashboard. Reachable only with ?key= matching
 * the VISITS_KEY env var; otherwise it 404s. Two clearly separated sections,
 * the marketing site (iamsanaan.com) and the private bio-data page, stacked
 * on one page. Totals are all-time; the daily charts cover the last
 * CHART_DAYS days. Visitors appear as per-browser numbers with approximate
 * location, IP and network name; nothing names anyone. This page only reads
 * the event log, never writes it (network names are cached in a separate
 * file, see lib/networks.ts).
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

  // One shared day axis so both charts line up on the same dates.
  const first = firstDayKey(events);
  const series = first ? { site: dailySeries(site, first), bio: dailySeries(bio, first) } : null;
  const siteDays = series?.site.slice(-CHART_DAYS) ?? [];
  const bioDays = series?.bio.slice(-CHART_DAYS) ?? [];
  const since = series?.site[0]?.date;

  const siteViews = site.filter((e) => e.event === "view");
  const isHome = (p: string | null | undefined) => (p ?? "/") === "/";
  const homeViews = siteViews.filter((e) => isHome(e.page)).length;
  const spark = siteDays.slice(-SPARK_DAYS);
  const sparkHome = sparkBy(site, spark, (p) => isHome(p));
  const sparkOther = sparkBy(site, spark, (p) => !isHome(p));

  // People (per browser) are only known for events recorded since people
  // tracking began; every other number stays all-time.
  const peopleFrom = peopleSince(events);
  const cityFrom = citiesSince(events);
  const numbers = visitorNumbers(events);
  // Network names are looked up (and cached) only for IPs tied to a visitor.
  const owners = ipOwners(events, numbers);
  const net = { owners, names: await networkNames(owners.keys()) };
  const sitePeopleByDay = peoplePerDay(site);
  const peopleNote = (n: number) =>
    peopleFrom ? `${n} ${n === 1 ? "person" : "people"} since ${peopleFrom}` : undefined;

  return (
    <main
      style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
      className="min-h-svh bg-[#0c0c0d] px-4 pt-10 pb-16 text-[13px] text-[#d6d3ca] sm:px-8"
    >
      <div className="mx-auto flex max-w-[1040px] flex-col gap-10">
        <header>
          <h1 className="text-[20px] font-semibold text-white">iamsanaan · visits</h1>
          <p className="mt-1.5" style={{ color: MUTED }}>
            All time{since ? ` (since ${since})` : ""} · updated {stamp(new Date().toISOString())} (America/Chicago)
          </p>
          <p className="mt-1" style={{ color: MUTED }}>
            Sessions reset when a tab closes; people are counted per browser
            {peopleFrom ? `, since ${peopleFrom}` : " from the next visit on"}.
          </p>
        </header>

        {/* ── Marketing site ── */}
        <section aria-label="Website" className="flex flex-col gap-4">
          <SectionHead
            title="Website"
            tag="iamsanaan.com"
            subtitle="Every marketing page"
            accent={SITE.accent}
            tagBg={SITE.tagBg}
            tagColor={SITE.light}
          />
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            <Kpi label="Page views" value={siteTotals.visits} spark={spark.map((d) => d.visits)} />
            <Kpi label="Unique sessions" value={siteTotals.unique} spark={spark.map((d) => d.unique)} />
            <Kpi
              label="Unique people"
              value={peopleFrom ? uniquePeople(site, "view") : "—"}
              spark={spark.map((d) => sitePeopleByDay.get(d.date) ?? 0)}
              sparkNote={peopleFrom ? `Since ${peopleFrom}` : "Starts with the next visit"}
            />
            <Kpi label="Homepage views" value={homeViews} spark={sparkHome} />
            <Kpi label="Other pages" value={siteTotals.visits - homeViews} spark={sparkOther} />
          </div>
          <Card>
            <ChartHead title="Page views per day" days={siteDays} max={peak(siteDays)}>
              <Legend color={SITE.light} label="Unique sessions" />
              <Legend color={SITE.dark} label="Repeat views" />
            </ChartHead>
            <DayChart days={siteDays} height={220} kind="site" />
          </Card>
          <div className="flex flex-wrap gap-4">
            <Card className="min-w-0 flex-[1_1_380px]">
              <CardTitle>Top pages</CardTitle>
              <BarList rows={topPages(site)} color={SITE.accent} noun="pages" />
            </Card>
            <Card className="min-w-0 flex-[1_1_380px]">
              <CardTitle>Countries</CardTitle>
              <BarList rows={withCountryNames(perCountry(site))} color={SITE.accent} noun="countries" />
            </Card>
          </div>
          <Card>
            <CitiesHead since={cityFrom} />
            <BarList rows={perCity(site)} color={SITE.accent} noun="cities" empty={NO_CITIES} />
          </Card>
          <PeopleCard list={visitors(site, numbers, net)} peopleFrom={peopleFrom} kind="site" color={SITE.accent} />
        </section>

        {/* ── Bio-data page ── */}
        <section aria-label="Bio-data page" className="flex flex-col gap-4">
          <SectionHead
            title="Bio-data page"
            tag="iamsanaan.com/bio-data"
            subtitle="Private, direct-link only"
            accent={BIO.accent}
            tagBg={BIO.tagBg}
            tagColor={BIO.light}
          />
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
            <Kpi label="Visits" value={bioTotals.visits} />
            <Kpi label="Unique sessions" value={bioTotals.unique} />
            <Kpi
              label="Unique people"
              value={peopleFrom ? uniquePeople(bio, "view") : "—"}
              note={peopleFrom ? `Since ${peopleFrom}` : "Starts with the next visit"}
            />
            <Kpi label="“No” attempts" value={bioTotals.no} note={peopleNote(uniquePeople(bio, "no_attempt"))} />
            <Kpi label="“Yes”" value={bioTotals.yes} note={peopleNote(uniquePeople(bio, "yes"))} />
            <Kpi label="Photos opened" value={bioTotals.photos} note={peopleNote(uniquePeople(bio, "photos_open"))} />
          </div>
          <Card>
            <div className="flex flex-wrap justify-between gap-2">
              <CardTitle>What visitors did</CardTitle>
              <span className="text-[12px]" style={{ color: MUTED }}>
                Bars: share of sessions, all time
              </span>
            </div>
            <Funnel steps={bioFunnel(bio)} peopleFrom={peopleFrom} />
          </Card>
          <div className="flex flex-wrap gap-4">
            <Card className="min-w-0 flex-[2_1_420px]">
              <ChartHead title="Visits per day" days={bioDays} max={peak(bioDays)} />
              <DayChart days={bioDays} height={140} kind="bio" />
            </Card>
            <Card className="min-w-0 flex-[1_1_260px]">
              <CardTitle>Countries</CardTitle>
              <BarList rows={withCountryNames(perCountry(bio))} color={BIO.accent} noun="countries" stacked />
            </Card>
          </div>
          <Card>
            <CitiesHead since={cityFrom} />
            <BarList rows={perCity(bio)} color={BIO.accent} noun="cities" empty={NO_CITIES} />
          </Card>
          <Card>
            <CardTitle>Days with activity</CardTitle>
            <ActivityTable bio={bio} />
          </Card>
          <PeopleCard list={visitors(bio, numbers, net)} peopleFrom={peopleFrom} kind="bio" color={BIO.accent} />
        </section>
      </div>
    </main>
  );
}

/* ───────────────────────── data shaping ───────────────────────── */

function peak(days: SeriesDay[]): number {
  return Math.max(0, ...days.map((d) => d.visits));
}

/** Per-day site page views whose path passes `test`, over the same days, for the trend bars. */
function sparkBy(site: TrackEvent[], days: SeriesDay[], test: (page: string | null | undefined) => boolean): number[] {
  if (days.length === 0) return [];
  const views = site.filter((e) => e.event === "view" && test(e.page));
  return dailySeries(views, days[0].key)
    .slice(0, days.length)
    .map((d) => d.visits);
}

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();

/** "US" -> "US · United States". Anything that is not a region code stays as is. */
function withCountryNames(rows: CountRow[]): CountRow[] {
  return rows.map((r) => {
    if (!/^[A-Z]{2}$/.test(r.label)) return r;
    let name: string | undefined;
    try {
      name = regionNames?.of(r.label);
    } catch {
      name = undefined;
    }
    return name && name !== r.label ? { ...r, label: `${r.label} · ${name}` } : r;
  });
}

/* ───────────────────────── building blocks ───────────────────────── */

function SectionHead({
  title,
  tag,
  subtitle,
  accent,
  tagBg,
  tagColor,
}: {
  title: string;
  tag: string;
  subtitle: string;
  accent: string;
  tagBg: string;
  tagColor: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b-2 pb-3" style={{ borderColor: accent }}>
      <h2 className="text-[17px] font-semibold text-white">{title}</h2>
      <span className="rounded-md px-2 py-0.5 text-[11px]" style={{ backgroundColor: tagBg, color: tagColor }}>
        {tag}
      </span>
      <span style={{ color: MUTED }}>{subtitle}</span>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 rounded-xl border border-[#26262a] bg-[#131315] p-5 ${className}`}>{children}</div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[14px] font-semibold text-white">{children}</h3>;
}

function Kpi({
  label,
  value,
  spark,
  sparkNote = `Last ${SPARK_DAYS} days`,
  note,
}: {
  label: string;
  value: number | string;
  spark?: number[];
  sparkNote?: string;
  note?: string;
}) {
  const max = spark ? Math.max(1, ...spark) : 1;
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-[#26262a] bg-[#131315] px-5 py-4">
      <span className="text-[12px]" style={{ color: MUTED }}>
        {label}
      </span>
      <span className="text-[28px] leading-tight font-semibold text-white">{value}</span>
      {spark && (
        <>
          <div aria-hidden="true" className="flex h-7 items-end gap-0.5">
            {spark.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-[1px]"
                style={{
                  height: v ? `${Math.round((v / max) * 100)}%` : "2px",
                  backgroundColor: v ? SITE.accent : EMPTY_BAR,
                }}
              />
            ))}
          </div>
          <span className="text-[11px]" style={{ color: MUTED }}>
            {sparkNote}
          </span>
        </>
      )}
      {note && (
        <span className="text-[11px]" style={{ color: MUTED }}>
          {note}
        </span>
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="inline-block size-2.5 rounded-sm" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function ChartHead({
  title,
  days,
  max,
  children,
}: {
  title: string;
  days: SeriesDay[];
  max: number;
  children?: React.ReactNode;
}) {
  const span = days.length > 0 ? `${days[0].date} – ${days[days.length - 1].date}` : "";
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <CardTitle>{title}</CardTitle>
      <div className="flex flex-wrap gap-4 text-[12px]" style={{ color: MUTED }}>
        {children}
        {days.length > 0 && <span>Peak {max}/day</span>}
        {span && <span>{span}</span>}
      </div>
    </div>
  );
}

/**
 * Daily bars. Website bars split into unique visitors (light, bottom) and
 * repeat views (dark, top); bio bars are a single series. Hover a bar for
 * that day's exact numbers.
 */
function DayChart({ days, height, kind }: { days: SeriesDay[]; height: number; kind: "site" | "bio" }) {
  if (days.length === 0) {
    return <p style={{ color: MUTED }}>No visits recorded yet.</p>;
  }
  const max = Math.max(1, peak(days));
  const gap = days.length > 45 ? 2 : 3;
  const labelEvery = days.length > 60 ? 14 : 7;
  const last = days.length - 1;
  const summary = `Bar chart of ${kind === "site" ? "daily page views" : "daily bio-data visits"}, ${days[0].date} to ${days[last].date}, peak ${peak(days)} per day`;

  return (
    <div>
      <div role="img" aria-label={summary} className="flex items-end border-b border-[#3a3a40]" style={{ height, gap }}>
        {days.map((d) => {
          const tip =
            kind === "site"
              ? `${d.date}: ${d.visits} views, ${d.unique} sessions`
              : `${d.date}: ${d.visits} visits, ${d.no} “No”, ${d.yes} “Yes”, ${d.photos} photos`;
          if (!d.visits) {
            return <div key={d.key} title={tip} className="min-w-0 flex-1" style={{ height: 2, backgroundColor: EMPTY_BAR }} />;
          }
          return (
            <div
              key={d.key}
              title={tip}
              className="flex min-w-0 flex-1 flex-col justify-end overflow-hidden rounded-t-[3px]"
              style={{
                height: `${Math.round((d.visits / max) * 100)}%`,
                backgroundColor: kind === "site" ? SITE.dark : BIO.accent,
              }}
            >
              {kind === "site" && (
                <div style={{ height: `${Math.round((d.unique / d.visits) * 100)}%`, backgroundColor: SITE.light }} />
              )}
            </div>
          );
        })}
      </div>
      <div aria-hidden="true" className="mt-2 flex text-[10px]" style={{ gap, color: MUTED }}>
        {days.map((d, i) => (
          <span key={d.key} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">
            {(last - i) % labelEvery === 0 ? d.label : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function BarList({
  rows,
  color,
  noun,
  stacked = false,
  empty = "No visits recorded yet.",
}: {
  rows: CountRow[];
  color: string;
  noun: string;
  stacked?: boolean;
  empty?: string;
}) {
  if (rows.length === 0) {
    return <p style={{ color: MUTED }}>{empty}</p>;
  }
  const max = Math.max(1, ...rows.map((r) => r.visits));
  return (
    <Expandable
      kind="list"
      initial={LIST_ROWS}
      noun={noun}
      className="flex flex-col gap-2.5"
      rows={rows.map((r) => {
        const bar = (
          <div className="h-2.5 overflow-hidden rounded-full bg-[#1d1d22]">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(3, Math.round((r.visits / max) * 100))}%`, backgroundColor: color }}
            />
          </div>
        );
        return stacked ? (
          <li key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5">
            <span className="truncate text-white">{r.label}</span>
            <span className="text-right">{r.visits}</span>
            <div className="col-span-2">{bar}</div>
          </li>
        ) : (
          <li
            key={r.label}
            className="grid min-h-[26px] grid-cols-[minmax(0,150px)_minmax(0,1fr)_40px] items-center gap-3"
          >
            <span className="truncate text-white" title={r.label}>
              {r.label}
            </span>
            {bar}
            <span className="text-right">{r.visits}</span>
          </li>
        );
      })}
    />
  );
}

function CitiesHead({ since }: { since: string | null }) {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <CardTitle>Top cities</CardTitle>
      <span className="text-[12px]" style={{ color: MUTED }}>
        Approximate, from IP{since ? ` · since ${since}` : ""}
      </span>
    </div>
  );
}

/**
 * Returning people for one section: how many came back on another day, how
 * often, and a per-visitor list. A visitor is a random per-browser code
 * with its approximate location, IP and network.
 */
function PeopleCard({
  list,
  peopleFrom,
  kind,
  color,
}: {
  list: Visitor[];
  peopleFrom: string | null;
  kind: "site" | "bio";
  color: string;
}) {
  const r = returning(list);
  return (
    <Card>
      <div className="flex flex-wrap justify-between gap-2">
        <CardTitle>Returning people</CardTitle>
        <span className="text-[12px]" style={{ color: MUTED }}>
          {peopleFrom ? `Per browser · since ${peopleFrom}` : "Per browser · starts with the next visit"}
        </span>
      </div>
      {list.length === 0 ? (
        <p style={{ color: MUTED }}>No people recorded yet.</p>
      ) : (
        <>
          <p>
            <span className="text-[22px] font-semibold text-white">{r.returning}</span>{" "}
            of {r.people} {r.people === 1 ? "person" : "people"} came back on another day
          </p>
          <div className="max-w-[560px]">
            <BarList rows={r.buckets} color={color} noun="groups" />
          </div>
          <h4 className="mt-2 text-[13px] font-semibold text-white">Visitors, most days first</h4>
          <VisitorTable list={list} kind={kind} />
        </>
      )}
    </Card>
  );
}

function VisitorTable({ list, kind }: { list: Visitor[]; kind: "site" | "bio" }) {
  const bio = kind === "bio";
  return (
    <Expandable
      kind="table"
      initial={TABLE_ROWS}
      noun="visitors"
      className={`w-full border-collapse ${bio ? "min-w-[1280px]" : "min-w-[1100px]"}`}
      head={
        <thead className="bg-[#161618]" style={{ color: MUTED }}>
          <tr>
            <th className={th}>Visitor</th>
            <th className={th}>Location</th>
            <th className={th}>IP</th>
            <th className={th}>Network</th>
            <th className={th}>Same network as</th>
            <th className={th}>Days</th>
            <th className={th}>Sessions</th>
            <th className={th}>{bio ? "Visits" : "Views"}</th>
            {bio && <th className={th}>Photos</th>}
            {bio && <th className={th}>“No”</th>}
            {bio && <th className={th}>“Yes”</th>}
            <th className={th}>First seen</th>
            <th className={th}>Last seen</th>
          </tr>
        </thead>
      }
      rows={list.map((v) => (
        <tr key={v.number} className="border-t border-[#26262a]">
          <td className={`${td} whitespace-nowrap text-white`}>Visitor {v.number}</td>
          <td className={td}>{v.location}</td>
          <td className={`${td} whitespace-nowrap`}>
            {v.ip ?? "—"}
            {v.ipCount > 1 && (
              <span className="ml-1.5 text-[11px]" style={{ color: MUTED }} title="Distinct IPs this visitor used">
                +{v.ipCount - 1} more
              </span>
            )}
          </td>
          <td className={td}>{v.network ?? "—"}</td>
          <td className={td}>{v.sharedWith.length ? v.sharedWith.map((n) => `Visitor ${n}`).join(", ") : "—"}</td>
          <td className={`${td} text-white`}>{v.days}</td>
          <td className={td}>{v.sessions}</td>
          <td className={td}>{v.views}</td>
          {bio && <td className={td}>{v.photos}</td>}
          {bio && <td className={td}>{v.no}</td>}
          {bio && <td className={td}>{v.yes}</td>}
          <td className={td}>{v.firstSeen}</td>
          <td className={`${td} whitespace-nowrap`}>{v.lastSeen}</td>
        </tr>
      ))}
    />
  );
}

function Funnel({ steps, peopleFrom }: { steps: FunnelStep[]; peopleFrom: string | null }) {
  const base = steps[0]?.visitors ?? 0;
  const cols = "grid grid-cols-[minmax(0,150px)_minmax(0,1fr)_96px_72px] items-center gap-3";
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px]">
        <div className={`${cols} pb-1 text-[11px]`} style={{ color: MUTED }}>
          <span />
          <span />
          <span className="text-right">Sessions</span>
          <span className="text-right" title={peopleFrom ? `Since ${peopleFrom}` : undefined}>
            People{peopleFrom ? "*" : ""}
          </span>
        </div>
        <ul className="flex flex-col gap-2">
          {steps.map((s) => {
            const pct = base ? Math.min(100, Math.round((s.visitors / base) * 100)) : 0;
            return (
              <li key={s.label} className={`${cols} min-h-8`}>
                <span className="text-white">{s.label}</span>
                <div className="h-[18px] overflow-hidden rounded bg-[#1d1d22]">
                  <div className="h-full rounded" style={{ width: `${Math.max(2, pct)}%`, backgroundColor: BIO.accent }} />
                </div>
                <span className="text-right">
                  {s.visitors} · {pct}%
                </span>
                <span className="text-right text-white">{peopleFrom ? s.people : "—"}</span>
              </li>
            );
          })}
        </ul>
        {peopleFrom && (
          <p className="mt-2 text-[11px]" style={{ color: MUTED }}>
            * People since {peopleFrom}, when per-browser counting began.
          </p>
        )}
      </div>
    </div>
  );
}

const th = "px-3 py-2 text-left font-medium";
const td = "px-3 py-2";

/** Every day the bio-data page saw activity, newest first — the full per-day detail. */
function ActivityTable({ bio }: { bio: TrackEvent[] }) {
  const rows = perDay(bio);
  const people = peoplePerDay(bio);
  if (rows.length === 0) {
    return <p style={{ color: MUTED }}>No visits recorded yet.</p>;
  }
  return (
    <Expandable
      kind="table"
      initial={TABLE_ROWS}
      noun="days"
      className="w-full min-w-[600px] border-collapse"
      head={
        <thead className="bg-[#161618]" style={{ color: MUTED }}>
          <tr>
            <th className={th}>Date</th>
            <th className={th}>Visits</th>
            <th className={th}>Sessions</th>
            <th className={th}>People</th>
            <th className={th}>“No”</th>
            <th className={th}>“Yes”</th>
            <th className={th}>Photos</th>
          </tr>
        </thead>
      }
      rows={rows.map((r) => (
        <tr key={r.date} className="border-t border-[#26262a]">
          <td className={`${td} text-white`}>{r.date}</td>
          <td className={td}>{r.visits}</td>
          <td className={td}>{r.unique}</td>
          <td className={td}>{people.get(r.date) ?? "—"}</td>
          <td className={td}>{r.no}</td>
          <td className={td}>{r.yes}</td>
          <td className={td}>{r.photos}</td>
        </tr>
      ))}
    />
  );
}
