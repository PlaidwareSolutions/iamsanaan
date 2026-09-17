"use client";

/**
 * Minimal client tracker. Sends an event name, a random per-tab visit id
 * (so repeat events in one visit aren't double-counted), a scope that keeps
 * the marketing site and the bio-data page separate, and for site views the
 * page path. Country and a coarse device class (computer vs mobile) are
 * derived server-side from the request headers. No precise location, raw
 * user-agent, or fingerprint is stored — the dashboard is aggregate by design.
 */

export type Scope = "site" | "bio";

function visitId(): string {
  try {
    const key = "bv";
    let v = sessionStorage.getItem(key);
    if (!v) {
      v = crypto.randomUUID?.() ?? String(Math.random()).slice(2);
      sessionStorage.setItem(key, v);
    }
    return v;
  } catch {
    return "nostore";
  }
}

export function track(event: string, scope: Scope, page?: string): void {
  try {
    const body = JSON.stringify({ event, visitId: visitId(), scope, page: page ?? null });
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
