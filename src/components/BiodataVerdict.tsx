"use client";

import { useRef, useState } from "react";
import type { Biodata } from "@/data/biodata";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const button =
  "rounded-[3px] px-[30px] py-3 text-sm font-semibold tracking-[0.04em] text-white transition-transform duration-100 active:scale-[0.96]";

/**
 * "Did you like the profile?" — Yes opens a certificate; No slips away to a
 * random spot inside the dashed box whenever a pointer approaches it, and
 * again if it's somehow activated. Hidden in print.
 */
export function BiodataVerdict({ question, hint, certificate }: Biodata["verdict"]) {
  const boxRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastNoAt = useRef(0);
  const [spot, setSpot] = useState<{ left: number; top: number } | null>(null);
  const [line, setLine] = useState(certificate.lines[0]);

  const dodge = () => {
    const box = boxRef.current;
    const btn = noRef.current;
    if (!box || !btn) return;
    const pad = 14;
    const maxLeft = Math.max(box.clientWidth - btn.offsetWidth - pad * 2, 0);
    const maxTop = Math.max(box.clientHeight - btn.offsetHeight - pad * 2, 0);
    setSpot({ left: pad + Math.random() * maxLeft, top: pad + Math.random() * maxTop });
    // Count each attempt at "No", throttled so one continuous chase isn't dozens.
    const now = Date.now();
    if (now - lastNoAt.current > 400) {
      lastNoAt.current = now;
      track("no_attempt");
    }
  };

  const celebrate = () => {
    track("yes");
    setLine(certificate.lines[Math.floor(Math.random() * certificate.lines.length)]);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div
        ref={boxRef}
        className="relative mt-[26px] min-h-[240px] overflow-hidden border border-dashed border-(color:--bio-brass) px-[18px] pt-[26px] pb-[34px] text-center print:hidden"
      >
        <h3 className="mb-[22px] font-(family-name:--font-cormorant) text-[22px] font-semibold">
          {question}
        </h3>
        <div className="flex h-[70px] items-center justify-center gap-5">
          <button type="button" onClick={celebrate} className={cn(button, "bg-(--bio-ink)")}>
            Yes
          </button>
          <button
            ref={noRef}
            type="button"
            onPointerEnter={dodge}
            onClick={dodge}
            style={spot ? { position: "absolute", left: spot.left, top: spot.top } : undefined}
            className={cn(button, "bg-[#B3413E]")}
          >
            No
          </button>
        </div>
        <p className="mt-4 text-[10.5px] text-(color:--bio-mute) italic">{hint}</p>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto w-[calc(100%-40px)] max-w-[480px] border-[3px] border-double border-(color:--bio-brass) bg-(--bio-paper) text-(color:--bio-ink) shadow-[0_20px_60px_rgb(0_0_0/0.35)] backdrop:bg-[rgb(21_48_46/0.55)]"
      >
        <div className="p-[40px_34px] text-center">
          <p className="mb-2.5 text-[9px] tracking-[0.25em] text-(color:--bio-brass) uppercase">
            {certificate.kicker}
          </p>
          <p className="mb-3.5 font-(family-name:--font-cormorant) text-[30px] leading-[1.15] font-semibold">
            {certificate.title}
          </p>
          <p className="mb-[22px] font-(family-name:--font-cormorant) text-base leading-[1.6] text-(color:--bio-ink-soft)">
            {line}
          </p>
          <p className="border-t border-(color:--bio-rule) pt-3.5 text-[9px] tracking-[0.15em] text-(color:--bio-mute) uppercase">
            {certificate.sign}
          </p>
          <form method="dialog">
            <button className="mt-[22px] rounded-[3px] bg-(--bio-ink) px-[26px] py-2.5 text-xs tracking-[0.05em] text-white">
              Close
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
