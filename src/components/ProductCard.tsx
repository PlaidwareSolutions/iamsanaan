import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";
import { MonoLabel } from "./ui/MonoLabel";

/** Gallery tile for one product: its live homepage on top, name and tagline beneath, the whole card a link. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group tile flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-500 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-tile"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-control">
        {product.screen ? (
          <Image
            src={product.screen}
            alt=""
            fill
            sizes="(min-width: 640px) 372px, 85vw"
            className="object-cover object-top transition-transform duration-700 ease-(--ease-swift) group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[28px] font-semibold text-mute/60">
            {product.name}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <MonoLabel>{product.vertical}</MonoLabel>
        <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] transition-colors group-hover:text-link">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[15px] leading-[1.47] text-mute">{product.tagline}</p>
        <p className="mt-auto pt-5 text-[12px] text-mute">
          <span className="text-accent">Live</span> · {product.pricing}
        </p>
        <span className="mt-3 inline-flex items-center gap-0.5 text-[14px] text-link group-hover:underline">
          Visit site
          <ChevronRight aria-hidden className="size-3.5" />
        </span>
      </div>
    </a>
  );
}
