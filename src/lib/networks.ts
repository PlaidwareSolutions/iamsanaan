import { mkdir, readFile, writeFile } from "node:fs/promises";
import { isIP } from "node:net";
import path from "node:path";
import { eventsFile } from "@/lib/visits";

/**
 * Network (ISP or company) names for visitor IPs, from ipinfo.io. Server-only.
 *
 * Looked up when the dashboard renders, never while recording a visit, so
 * tracking cannot slow down or lose events if the service is slow or down.
 * Answers are cached in ip-networks.json beside the event log, so each IP is
 * looked up once; the event log itself is never touched.
 *
 * Without IPINFO_TOKEN the free, unauthenticated tier is used (daily limit);
 * a free ipinfo.io token in IPINFO_TOKEN raises it.
 */

type Cache = Record<string, { org: string | null; at: string }>;

/** Most new IPs looked up per dashboard load; the rest follow on later loads. */
const MAX_LOOKUPS = 40;

const cacheFile = () => path.join(path.dirname(eventsFile()), "ip-networks.json");

async function readCache(): Promise<Cache> {
  try {
    const parsed: unknown = JSON.parse(await readFile(cacheFile(), "utf8"));
    return parsed && typeof parsed === "object" ? (parsed as Cache) : {};
  } catch {
    return {};
  }
}

/**
 * "Comcast Cable Communications, LLC" for an IP, null when it has none
 * (private or unknown), undefined when the lookup failed and should be
 * retried on a later load.
 */
async function lookup(ip: string): Promise<string | null | undefined> {
  try {
    const token = process.env.IPINFO_TOKEN?.trim();
    const url = `https://ipinfo.io/${encodeURIComponent(ip)}/json${token ? `?token=${encodeURIComponent(token)}` : ""}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(2500), cache: "no-store" });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { org?: unknown; bogon?: unknown };
    if (data.bogon) return null;
    if (typeof data.org !== "string") return null;
    return data.org.replace(/^AS\d+\s+/, "").trim() || null;
  } catch {
    return undefined;
  }
}

/** Network name per IP for the given IPs, looking up and caching any not yet known. */
export async function networkNames(ips: Iterable<string>): Promise<Map<string, string | null>> {
  const cache = await readCache();
  const missing = [...new Set(ips)].filter((ip) => isIP(ip) && !(ip in cache)).slice(0, MAX_LOOKUPS);

  if (missing.length > 0) {
    const found = await Promise.all(missing.map(lookup));
    let changed = false;
    missing.forEach((ip, i) => {
      const org = found[i];
      if (org !== undefined) {
        cache[ip] = { org, at: new Date().toISOString() };
        changed = true;
      }
    });
    if (changed) {
      try {
        await mkdir(path.dirname(cacheFile()), { recursive: true });
        await writeFile(cacheFile(), JSON.stringify(cache));
      } catch {
        /* a cache write failure only means looking up again next time */
      }
    }
  }

  return new Map(Object.entries(cache).map(([ip, v]) => [ip, v.org]));
}
