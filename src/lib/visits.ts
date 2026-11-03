import { readFile } from "node:fs/promises";
import path from "node:path";

/** One captured event, as written by /api/track. Server-only. */
export type TrackEvent = {
  t: string;
  event: string;
  visitId: string | null;
  scope?: string | null;
  page?: string | null;
  server: { country: string | null };
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

export type FunnelStep = { label: string; visitors: number };

/** How many distinct visitors reached each step of the bio-data page. */
export function bioFunnel(events: TrackEvent[]): FunnelStep[] {
  const who = (event: string) => new Set(events.filter((e) => e.event === event).map((e) => e.visitId)).size;
  return [
    { label: "Opened the page", visitors: who("view") },
    { label: "Opened photos", visitors: who("photos_open") },
    { label: "Tried “No”", visitors: who("no_attempt") },
    { label: "Said “Yes”", visitors: who("yes") },
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
