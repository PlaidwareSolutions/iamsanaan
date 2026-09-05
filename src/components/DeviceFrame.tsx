import Image from "next/image";
import { cn } from "@/lib/utils";

type DeviceProps = {
  src: string;
  alt: string;
  /** next/image `sizes` — required so the optimizer never serves the 1440px original to a 300px frame. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Laptop: a thin graphite bezel around a 16:10 screen (the ratio of our
 * 1440×900 captures) over a slim base with a hinge lip. Pure CSS; every
 * dimension is in container-query units, so it scales with its width.
 */
export function Laptop({ src, alt, sizes, priority = false, className }: DeviceProps) {
  return (
    <div className={cn("@container w-full", className)}>
      {/* lid */}
      <div className="relative rounded-[2.4cqw] bg-[#1d1d1f] p-[2cqw] pb-[2.6cqw] shadow-tile ring-1 ring-white/10">
        <span
          aria-hidden
          className="absolute top-[0.65cqw] left-1/2 size-[0.7cqw] -translate-x-1/2 rounded-full bg-[#3a3a3c]"
        />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9cqw] bg-black">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </div>
      {/* base: a touch wider than the lid, hinge notch centered */}
      <div
        aria-hidden
        className="relative -mx-[3cqw] h-[2.2cqw] rounded-b-[1.4cqw] border-t border-white/10 bg-gradient-to-b from-[#2b2b2d] to-[#0f0f10]"
      >
        <span className="absolute top-0 left-1/2 h-[0.8cqw] w-[16cqw] -translate-x-1/2 rounded-b-[0.6cqw] bg-black/70" />
      </div>
    </div>
  );
}

/**
 * Phone: a rounded slab with a thin bezel and a dynamic-island pill. The
 * screen ratio equals our 780×1688 captures, so nothing is cropped.
 */
export function Phone({ src, alt, sizes, priority = false, className }: DeviceProps) {
  return (
    <div className={cn("@container w-full", className)}>
      <div className="relative rounded-[15cqw] bg-[#1d1d1f] p-[3.5cqw] shadow-tile ring-1 ring-white/10">
        <div className="relative aspect-[780/1688] overflow-hidden rounded-[11.5cqw] bg-black">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
          <span
            aria-hidden
            className="absolute top-[3cqw] left-1/2 h-[7cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}
