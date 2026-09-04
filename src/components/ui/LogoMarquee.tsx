import { clients } from "@/data/clients";
import { cn } from "@/lib/utils";

/** Greyscale scrolling roster of client wordmarks. Duplicated track for a seamless loop. */
export function LogoMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn("marquee relative overflow-hidden", className)}
      role="img"
      aria-label={`Products we build and operate: ${clients.map((c) => c.name).join(", ")}`}
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex items-center">
            {clients.map((client) => (
              <li
                key={`${dup}-${client.name}`}
                className="px-8 font-display text-xl whitespace-nowrap text-mute opacity-80 transition-opacity hover:opacity-100 md:px-12 md:text-2xl"
              >
                {client.mark}
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-tone to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-tone to-transparent md:w-32" />
    </div>
  );
}
