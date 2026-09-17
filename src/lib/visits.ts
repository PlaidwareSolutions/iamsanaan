import { readFile } from "node:fs/promises";
import path from "node:path";

/** One captured event, as written by /api/track. Server-only. */
export type TrackEvent = {
  t: string;
  event: string;
  visitId: string | null;
  scope?: string | null;
  page?: string | null;
  server: { country: string | null; device?: string | null };
};

/** Time zone the dashboard groups and prints days in (Houston). */
export const TZ = "America/Chicago";

export async function readEvents(): Promise<TrackEvent[]> {
  try {
    const file = path.join(process.cwd(), ".data", "events.ndjson");
    const raw = await readFile(file, "utf8");
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

export type Totals = {
  visits: number;
  unique: number;
  no: number;
  yes: number;
  photos: number;
  desktop: number;
  mobile: number;
};

/** Device class of a view, normalised. Events written before device tracking
 * existed have none, so they fall into "unknown" rather than skewing either side. */
export function deviceOf(e: TrackEvent): "desktop" | "mobile" | "unknown" {
  const d = e.server?.device;
  return d === "desktop" || d === "mobile" ? d : "unknown";
}

/** All-time counts across the given events. */
export function overall(events: TrackEvent[]): Totals {
  const views = events.filter((e) => e.event === "view");
  return {
    visits: views.length,
    unique: new Set(views.map((e) => e.visitId)).size,
    no: events.filter((e) => e.event === "no_attempt").length,
    yes: events.filter((e) => e.event === "yes").length,
    photos: events.filter((e) => e.event === "photos_open").length,
    desktop: views.filter((e) => deviceOf(e) === "desktop").length,
    mobile: views.filter((e) => deviceOf(e) === "mobile").length,
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
      desktop: v.views.filter((e) => deviceOf(e) === "desktop").length,
      mobile: v.views.filter((e) => deviceOf(e) === "mobile").length,
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

/** Views per device class, most first. Desktop vs mobile only. */
export function perDevice(events: TrackEvent[]): CountRow[] {
  const map = new Map<string, number>();
  for (const e of events.filter((e) => e.event === "view")) {
    const d = deviceOf(e);
    map.set(d, (map.get(d) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([label, visits]) => ({ label, visits }));
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
