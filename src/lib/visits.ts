import { readFile } from "node:fs/promises";
import path from "node:path";

/** One captured event, as written by /api/track. Server-only. */
export type TrackEvent = {
  t: string;
  event: string;
  visitId: string | null;
  /** Per-browser id; only on events recorded after people tracking began. */
  personId?: string | null;
  scope?: string | null;
  page?: string | null;
  /** IP-derived location. region/city/postal only on events recorded after they were enabled. */
  server: { country: string | null; region?: string | null; city?: string | null; postal?: string | null };
};

/** Time zone the dashboard groups and prints days in (Houston). */
export const TZ = "America/Chicago";

/**
 * Absolute path of the event log.
 *
 * Production runs on Railway, where each deploy gets a fresh container and an
 * empty filesystem — anything written under the working directory is lost on
 * the next deploy. Setting VISITS_DIR to a mounted volume (e.g. /data) keeps
 * the log across deploys. Unset, it falls back to .data in the working
 * directory, which is what local development wants.
 *
 * Both the writer (/api/track) and the reader (the dashboard) resolve the path
 * through here, so they cannot disagree about where the data is.
 */
export function eventsFile(): string {
  const dir = process.env.VISITS_DIR?.trim() || path.join(process.cwd(), ".data");
  return path.join(dir, "events.ndjson");
}

export async function readEvents(): Promise<TrackEvent[]> {
  try {
    const raw = await readFile(eventsFile(), "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as TrackEvent;
        } catch {
          return null;
        }
      })
      .filter((e): e is TrackEvent => e !== null);
  } catch {
    return [];
  }
}

/** Events with no scope are legacy bio-data events (only that existed before). */
export const isSite = (e: TrackEvent) => e.scope === "site";
export const isBio = (e: TrackEvent) => e.scope !== "site";

/** Sortable YYYY-MM-DD day key for an ISO timestamp, in the dashboard tz. */
function dayKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

/** "YYYY-MM-DD" -> "MM/DD/YYYY". */
function toDisplayDate(key: string): string {
  const [y, m, d] = key.split("-");
  return `${m}/${d}/${y}`;
}

/** "MM/DD/YYYY, HH:MM" in the dashboard tz. */
export function stamp(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export type Totals = { visits: number; unique: number; no: number; yes: number; photos: number };

/** All-time counts across the given events. */
export function overall(events: TrackEvent[]): Totals {
  const views = events.filter((e) => e.event === "view");
  return {
    visits: views.length,
    unique: new Set(views.map((e) => e.visitId)).size,
    no: events.filter((e) => e.event === "no_attempt").length,
    yes: events.filter((e) => e.event === "yes").length,
    photos: events.filter((e) => e.event === "photos_open").length,
  };
}

export type DayRow = { date: string } & Totals;

/** Aggregate counts per day, newest first. Dates as MM/DD/YYYY. */
export function perDay(events: TrackEvent[]): DayRow[] {
  const map = new Map<string, { views: TrackEvent[]; no: number; yes: number; photos: number }>();
  for (const e of events) {
    const key = dayKey(e.t);
    const row = map.get(key) ?? { views: [], no: 0, yes: 0, photos: 0 };
    if (e.event === "view") row.views.push(e);
    if (e.event === "no_attempt") row.no += 1;
    if (e.event === "yes") row.yes += 1;
    if (e.event === "photos_open") row.photos += 1;
    map.set(key, row);
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, v]) => ({
      date: toDisplayDate(key),
      visits: v.views.length,
      unique: new Set(v.views.map((e) => e.visitId)).size,
      no: v.no,
      yes: v.yes,
      photos: v.photos,
    }));
}

export type CountRow = { label: string; visits: number };

/** Visits per country, most first. Country only — no city or coordinates. */
export function perCountry(events: TrackEvent[]): CountRow[] {
  const map = new Map<string, number>();
  for (const e of events.filter((e) => e.event === "view")) {
    const c = e.server?.country ?? "unknown";
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([label, visits]) => ({ label, visits }));
}

/** "YYYY-MM-DD" key one day after the given key. */
function nextDayKey(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10);
}

/** Day key of the earliest event, or null when there are none. */
export function firstDayKey(events: TrackEvent[]): string | null {
  let first: string | null = null;
  for (const e of events) {
    const k = dayKey(e.t);
    if (first === null || k < first) first = k;
  }
  return first;
}

export type SeriesDay = { key: string; label: string; date: string } & Totals;

/**
 * One entry per calendar day from `fromKey` through today, oldest first, with
 * empty days filled in as zeros. Feeds the bar charts; perDay() still lists
 * only the days that had activity.
 */
export function dailySeries(events: TrackEvent[], fromKey: string): SeriesDay[] {
  const byDay = new Map<string, TrackEvent[]>();
  for (const e of events) {
    const k = dayKey(e.t);
    const list = byDay.get(k);
    if (list) list.push(e);
    else byDay.set(k, [e]);
  }
  const today = dayKey(new Date().toISOString());
  const out: SeriesDay[] = [];
  for (let k = fromKey; k <= today; k = nextDayKey(k)) {
    const [, m, d] = k.split("-");
    out.push({ key: k, label: `${m}/${d}`, date: toDisplayDate(k), ...overall(byDay.get(k) ?? []) });
  }
  return out;
}

/* ── People ──
 * "Unique visitors" above counts sessions (visitId, per tab). People are
 * counted from personId (per browser), which only events recorded after
 * people tracking began carry. Older events are never rewritten, so people
 * counts always cover "since peopleSince()" and never all time.
 */

const hasPerson = (e: TrackEvent): e is TrackEvent & { personId: string } =>
  typeof e.personId === "string" && e.personId.length > 0;

/** Display date (MM/DD/YYYY) of the first event carrying a personId, or null. */
export function peopleSince(events: TrackEvent[]): string | null {
  let first: string | null = null;
  for (const e of events) if (hasPerson(e) && (first === null || e.t < first)) first = e.t;
  return first ? toDisplayDate(dayKey(first)) : null;
}

/** Distinct people who did `event` (any event when omitted). */
export function uniquePeople(events: TrackEvent[], event?: string): number {
  return new Set(events.filter((e) => hasPerson(e) && (!event || e.event === event)).map((e) => e.personId)).size;
}

/**
 * Distinct people who viewed, per display date. Days before people tracking
 * began are absent, so callers can show "—" rather than a misleading 0.
 */
export function peoplePerDay(events: TrackEvent[]): Map<string, number> {
  const sets = new Map<string, Set<string>>();
  for (const e of events) {
    if (!hasPerson(e) || e.event !== "view") continue;
    const k = toDisplayDate(dayKey(e.t));
    const set = sets.get(k) ?? new Set<string>();
    set.add(e.personId);
    sets.set(k, set);
  }
  return new Map([...sets].map(([k, s]) => [k, s.size]));
}

/** "Plano, TX" from an event's location; null without a city. */
function place(e: TrackEvent): string | null {
  const city = e.server?.city;
  if (!city) return null;
  const where = e.server?.region || e.server?.country;
  return where ? `${city}, ${where}` : city;
}

/** Views per city, most first. Only events recorded since city tracking began. */
export function perCity(events: TrackEvent[]): CountRow[] {
  const map = new Map<string, number>();
  for (const e of events) {
    if (e.event !== "view") continue;
    const p = place(e);
    if (p) map.set(p, (map.get(p) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([label, visits]) => ({ label, visits }));
}

/** Display date of the first event carrying a city, or null. */
export function citiesSince(events: TrackEvent[]): string | null {
  let first: string | null = null;
  for (const e of events) if (e.server?.city && (first === null || e.t < first)) first = e.t;
  return first ? toDisplayDate(dayKey(first)) : null;
}

/**
 * Stable "Visitor N" numbers: people numbered in the order they were first
 * seen anywhere on the site, so a browser keeps its number across sections
 * and across days.
 */
export function visitorNumbers(events: TrackEvent[]): Map<string, number> {
  const first = new Map<string, string>();
  for (const e of events) {
    if (!hasPerson(e)) continue;
    const t = first.get(e.personId);
    if (t === undefined || e.t < t) first.set(e.personId, e.t);
  }
  return new Map([...first].sort((a, b) => a[1].localeCompare(b[1])).map(([id], i) => [id, i + 1]));
}

/** One anonymous browser's activity. No name, IP or device — only the random id's number. */
export type Visitor = {
  number: number;
  /** Latest known "City, Region" (or country), with postal code when known. */
  location: string;
  days: number;
  sessions: number;
  views: number;
  photos: number;
  no: number;
  yes: number;
  firstSeen: string;
  lastSeen: string;
};

/** Every person seen in these events, most days first, then most views, then most recent. */
export function visitors(events: TrackEvent[], numbers: Map<string, number>): Visitor[] {
  const by = new Map<string, TrackEvent[]>();
  for (const e of events) {
    if (!hasPerson(e)) continue;
    const list = by.get(e.personId);
    if (list) list.push(e);
    else by.set(e.personId, [e]);
  }
  const out: { v: Visitor; last: string }[] = [];
  for (const [id, list] of by) {
    list.sort((a, b) => a.t.localeCompare(b.t));
    const latest = [...list].reverse();
    const located = latest.find((e) => e.server?.city) ?? latest.find((e) => e.server?.country);
    const postal = latest.find((e) => e.server?.postal)?.server.postal;
    const where = located ? (place(located) ?? located.server.country ?? "") : "";
    const count = (event: string) => list.filter((e) => e.event === event).length;
    const last = list[list.length - 1].t;
    out.push({
      last,
      v: {
        number: numbers.get(id) ?? 0,
        location: [where, postal].filter(Boolean).join(" ") || "Unknown",
        days: new Set(list.map((e) => dayKey(e.t))).size,
        sessions: new Set(list.map((e) => e.visitId)).size,
        views: count("view"),
        photos: count("photos_open"),
        no: count("no_attempt"),
        yes: count("yes"),
        firstSeen: toDisplayDate(dayKey(list[0].t)),
        lastSeen: stamp(last),
      },
    });
  }
  return out
    .sort((a, b) => b.v.days - a.v.days || b.v.views - a.v.views || b.last.localeCompare(a.last))
    .map((r) => r.v);
}

/** How many people came back, and how often: 1 day, 2 days, 3–5 days, 6+ days. */
export function returning(list: Visitor[]): { people: number; returning: number; buckets: CountRow[] } {
  const bucket = (lo: number, hi: number) => list.filter((v) => v.days >= lo && v.days <= hi).length;
  return {
    people: list.length,
    returning: list.filter((v) => v.days >= 2).length,
    buckets: [
      { label: "1 day", visits: bucket(1, 1) },
      { label: "2 days", visits: bucket(2, 2) },
      { label: "3–5 days", visits: bucket(3, 5) },
      { label: "6+ days", visits: bucket(6, Infinity) },
    ],
  };
}

export type FunnelStep = { label: string; visitors: number; people: number };

/** How many distinct sessions, and distinct people, reached each step of the bio-data page. */
export function bioFunnel(events: TrackEvent[]): FunnelStep[] {
  const who = (event: string) => new Set(events.filter((e) => e.event === event).map((e) => e.visitId)).size;
  const step = (label: string, event: string) => ({ label, visitors: who(event), people: uniquePeople(events, event) });
  return [
    step("Opened the page", "view"),
    step("Opened photos", "photos_open"),
    step("Tried “No”", "no_attempt"),
    step("Said “Yes”", "yes"),
  ];
}

/** Page views per path, most first. Site only. */
export function topPages(events: TrackEvent[]): CountRow[] {
  const map = new Map<string, number>();
  for (const e of events.filter((e) => e.event === "view")) {
    const p = e.page ?? "/";
    map.set(p, (map.get(p) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([label, visits]) => ({ label, visits }));
}
