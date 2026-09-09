"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

/** Records a marketing-site page view on load and on every client navigation. */
export function SiteBeacon() {
  const pathname = usePathname();
  useEffect(() => {
    track("view", "site", pathname);
  }, [pathname]);
  return null;
}
