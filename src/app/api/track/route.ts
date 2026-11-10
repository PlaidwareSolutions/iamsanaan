import { appendFile, mkdir } from "node:fs/promises";
import { isIP } from "node:net";
import path from "node:path";
import { eventsFile } from "@/lib/visits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** A random UUID, or the digits-only fallback when randomUUID is missing. */
const PERSON_ID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|\d{6,20})$/i;

/**
 * The visitor's IP: Cloudflare's CF-Connecting-IP, else the first
 * X-Forwarded-For hop. Null unless it parses as an IPv4/IPv6 address.
 */
function clientIp(h: Headers): string | null {
  const raw = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0];
  const ip = raw?.trim();
  return ip && isIP(ip) ? ip : null;
}

/** Trimmed, length-capped header value; null when empty. */
function clean(v: string | null): string | null {
  const s = v?.trim().slice(0, 80);
  return s ? s : null;
}

/** First present header value among the given names. */
function pick(h: Headers, ...names: string[]): string | null {
  for (const n of names) {
    const v = h.get(n);
    if (v) return v;
  }
  return null;
}

/**
 * Receives a tracking event, enriches it with what the request itself
 * reveals (IP, geo, user-agent), and appends it to .data/events.ndjson.
 * Geo headers are populated by Cloudflare in production; on localhost the
 * IP is loopback, so those fields stay null unless the caller supplies them.
 */
export async function POST(req: Request) {
  let body: {
    event?: string;
    visitId?: string | null;
    personId?: string | null;
    scope?: string | null;
    page?: string | null;
  } = {};
  try {
    body = await req.json();
  } catch {
    /* tolerate empty/broken bodies */
  }

  const h = req.headers;

  // Location is approximate and IP-derived: country, region, city, postal
  // code, plus the IP itself. No coordinates, no per-person link code.
  // personId is the tracker's random per-browser code (see lib/track.ts),
  // kept only when it has that shape, so nothing else can be smuggled in.
  const record = {
    t: new Date().toISOString(),
    event: body.event ?? "unknown",
    visitId: body.visitId ?? null,
    personId: typeof body.personId === "string" && PERSON_ID.test(body.personId) ? body.personId : null,
    // "site" = marketing pages, "bio" = the bio-data page. Kept separate so
    // the dashboard never conflates the two.
    scope: body.scope === "site" ? "site" : "bio",
    // Only stored for site views, so top-pages works. Bio is a single page.
    page: body.scope === "site" && typeof body.page === "string" ? body.page : null,
    server: {
      country: pick(h, "cf-ipcountry", "x-vercel-ip-country"),
      // Approximate, IP-based, from Cloudflare's "Add visitor location
      // headers" managed transform. Null when that is off or unknown.
      region: clean(pick(h, "cf-region-code", "cf-region")),
      city: clean(pick(h, "cf-ipcity")),
      postal: clean(pick(h, "cf-postal-code")),
      // The visitor's IP as Cloudflare saw it. Stored so the private
      // dashboard can show it, name its network and spot shared networks.
      ip: clientIp(h),
    },
  };

  try {
    const file = eventsFile();
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, JSON.stringify(record) + "\n");
  } catch {
    /* storage failure must not surface to the visitor */
  }

  return new Response(null, { status: 204 });
}
