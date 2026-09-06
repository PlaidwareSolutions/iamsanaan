import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  } = {};
  try {
    body = await req.json();
  } catch {
    /* tolerate empty/broken bodies */
  }

  const h = req.headers;

  // Country only. No city, no coordinates, no raw IP, no per-person link
  // code — this dashboard is aggregate by design and stores nothing finer.
  const record = {
    t: new Date().toISOString(),
    event: body.event ?? "unknown",
    visitId: body.visitId ?? null,
    server: {
      country: pick(h, "cf-ipcountry", "x-vercel-ip-country"),
    },
  };

  try {
    const dir = path.join(process.cwd(), ".data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "events.ndjson"), JSON.stringify(record) + "\n");
  } catch {
    /* storage failure must not surface to the visitor */
  }

  return new Response(null, { status: 204 });
}
