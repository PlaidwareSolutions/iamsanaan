"use client";

/**
 * Minimal client tracker. Sends an event name, two random ids, a scope that
 * keeps the marketing site and the bio-data page separate, and for site views
 * the page path. Country is derived server-side. No device, precise location,
 * or fingerprint data is collected — the dashboard is aggregate by design.
 *
 * - visitId: per tab (sessionStorage), so repeat events in one visit aren't
 *   double-counted. Resets when the tab closes.
 * - personId: per browser (localStorage), so a person who comes back another
 *   day counts once. It is a random code with nothing personal in it; a new
 *   device, private window or cleared site data gets a new one.
 */

export type Scope = "site" | "bio";

function randomId(): string {
  return crypto.randomUUID?.() ?? String(Math.random()).slice(2);
}

function visitId(): string {
  try {
    const key = "bv";
    let v = sessionStorage.getItem(key);
    if (!v) {
      v = randomId();
      sessionStorage.setItem(key, v);
    }
    return v;
  } catch {
    return "nostore";
  }
}

/** Null when storage is blocked, so the dashboard never lumps such browsers together. */
function personId(): string | null {
  try {
    const key = "bp";
    let p = localStorage.getItem(key);
    if (!p) {
      p = randomId();
      localStorage.setItem(key, p);
    }
    return p;
  } catch {
    return null;
  }
}

export function track(event: string, scope: Scope, page?: string): void {
  try {
    const body = JSON.stringify({ event, visitId: visitId(), personId: personId(), scope, page: page ?? null });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/track", {
        method: "POST",
        body,
        keepalive: true,
        headers: { "content-type": "application/json" },
      });
    }
  } catch {
    /* never let tracking break the page */
  }
}
