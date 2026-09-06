"use client";

/**
 * Minimal client tracker for /bio-data. Sends only an event name and a
 * random per-tab visit id (so repeat events in one visit aren't
 * double-counted). Country is derived server-side from the request. No
 * device, location, or fingerprint data is collected — the dashboard is
 * aggregate by design.
 */

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

export function track(event: string): void {
  try {
    const body = JSON.stringify({ event, visitId: visitId() });
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
