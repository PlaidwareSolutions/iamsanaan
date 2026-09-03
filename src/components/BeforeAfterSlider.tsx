"use client";

import { useCallback, useRef, useState } from "react";
import { VignetteCommerce, VignetteCommerceOld } from "./vignettes/VignetteCommerce";
import { cn } from "@/lib/utils";

/**
 * Drag-to-compare: the legacy storefront vs the rebuild.
 * Pointer-driven with a keyboard-operable handle (arrow keys, Home/End).
 */
export function BeforeAfterSlider({ className }: { className?: string }) {
  const [pos, setPos] = useState(58);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(97, Math.max(3, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") setPos((p) => Math.max(3, p - step));
    else if (e.key === "ArrowRight") setPos((p) => Math.min(97, p + step));
    else if (e.key === "Home") setPos(3);
    else if (e.key === "End") setPos(97);
    else return;
    e.preventDefault();
  };

  return (
    <div className={cn("select-none", className)}>
      <div
        ref={ref}
        className="relative w-full cursor-ew-resize touch-none overflow-hidden"
        style={{ aspectRatio: "16/10" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Before (base layer) */}
        <div className="absolute inset-0">
          <VignetteCommerceOld className="h-full" />
        </div>

        {/* After (clipped on top) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <VignetteCommerce />
        </div>

        {/* Divider + handle */}
        <div className="absolute inset-y-0 z-10 w-0.5 bg-accent" style={{ left: `${pos}%` }} />
        <button
          type="button"
          role="slider"
          aria-label="Reveal the redesigned storefront"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% of the new design shown`}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          className="absolute top-1/2 z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-accent text-ink shadow-[0_8px_24px_rgb(0_0_0/0.4)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-bone"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden className="font-mono text-[13px] font-bold tracking-tighter">
            ◂▸
          </span>
        </button>

        {/* Labels: the clipped "after" layer occupies the left side, the legacy site the right */}
        <span className="absolute top-3 left-3 z-10 bg-accent px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
          2025 — rebuild
        </span>
        <span className="absolute top-3 right-3 z-10 bg-ink/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-bone uppercase">
          2023 — template
        </span>
      </div>
      <p className="mt-4 font-mono text-[11px] tracking-[0.08em] text-mute uppercase">
        Drag to compare · same brand, twelve months apart
      </p>
    </div>
  );
}
