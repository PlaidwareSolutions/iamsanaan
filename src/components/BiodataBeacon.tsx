"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires one "view" event when the biodata page mounts. */
export function BiodataBeacon() {
  useEffect(() => {
    track("view");
  }, []);
  return null;
}
