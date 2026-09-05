"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type BiodataPhoto = { src: string; alt: string };

const iconButton =
  "inline-flex size-10 items-center justify-center rounded-full border border-(color:--bio-rule) text-(color:--bio-ink) transition-colors hover:border-(color:--bio-brass) hover:text-(color:--bio-brass) disabled:opacity-40";

/**
 * "View photos" button that opens a lightbox: one large photo at a time,
 * previous/next (buttons or arrow keys), and a thumbnail strip. Photos come
 * from public/bio-data/photos at build time; with none, the dialog says so.
 */
export function BiodataPhotos({ photos }: { photos: BiodataPhoto[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const current = photos[index];

  const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex items-center gap-2 border border-(color:--bio-brass) px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-(color:--bio-brass) uppercase transition-colors hover:bg-(--bio-brass) hover:text-white print:hidden"
      >
        <Images aria-hidden className="size-4" />
        View photos
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
        onKeyDown={(e) => {
          if (count < 2) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[calc(100%-24px)] max-w-[680px] border-[3px] border-double border-(color:--bio-brass) bg-(--bio-paper) text-(color:--bio-ink) shadow-[0_20px_60px_rgb(0_0_0/0.35)] backdrop:bg-[rgb(21_48_46/0.7)]"
      >
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-[9px] font-semibold tracking-[0.25em] text-(color:--bio-brass) uppercase">
              Photos{count > 0 && ` · ${index + 1} / ${count}`}
            </p>
            <form method="dialog">
              <button className={iconButton} aria-label="Close photos">
                <X aria-hidden className="size-4" />
              </button>
            </form>
          </div>

          {count === 0 ? (
            <p className="py-16 text-center font-(family-name:--font-cormorant) text-xl text-(color:--bio-ink-soft)">
              Photos will be added soon.
            </p>
          ) : (
            <figure>
              <div className="relative h-[min(65vh,720px)] w-full bg-[#E8E6E0]">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(min-width: 680px) 640px, 100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={count < 2}
                  className={iconButton}
                  aria-label="Previous photo"
                >
                  <ChevronLeft aria-hidden className="size-4" />
                </button>
                <span className="truncate text-[11px] tracking-[0.06em] text-(color:--bio-mute)">
                  {current.alt}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={count < 2}
                  className={iconButton}
                  aria-label="Next photo"
                >
                  <ChevronRight aria-hidden className="size-4" />
                </button>
              </figcaption>
              {count > 1 && (
                <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {photos.map((photo, i) => (
                    <li key={photo.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Show photo ${i + 1}`}
                        aria-current={i === index}
                        className={cn(
                          "relative block size-14 overflow-hidden border transition-colors",
                          i === index
                            ? "border-(color:--bio-brass)"
                            : "border-(color:--bio-rule) hover:border-(color:--bio-ink)",
                        )}
                      >
                        <Image src={photo.src} alt="" fill sizes="56px" className="object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </figure>
          )}
        </div>
      </dialog>
    </>
  );
}
