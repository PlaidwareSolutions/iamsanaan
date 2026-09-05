import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A full-bleed capture, blurred and darkened, behind a black section.
 * The parent must be `relative overflow-hidden`: the blur is scaled past
 * the edges so no light fringe shows, and that overflow must be clipped.
 */
export function Backdrop({ src, className }: { src: string; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 720px, 100vw"
        quality={40}
        className="scale-110 object-cover object-center blur-xl"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />
    </div>
  );
}
