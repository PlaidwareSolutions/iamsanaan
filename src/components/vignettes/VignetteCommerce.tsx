import { cn } from "@/lib/utils";

/** Minimal cookware silhouette — top-view pan rendered as SVG. */
function Pan({ tone = "#2a2a2e", size = "58%" }: { tone?: string; size?: string }) {
  return (
    <svg viewBox="0 0 100 60" style={{ width: size }} className="mx-auto">
      <circle cx="38" cy="30" r="24" fill={tone} />
      <circle cx="38" cy="30" r="17" fill="none" stroke="#f3f1ea" strokeOpacity="0.25" strokeWidth="1.5" />
      <rect x="60" y="27" width="36" height="6" rx="3" fill={tone} />
    </svg>
  );
}

/**
 * Coded UI vignette — the rebuilt Ember & Oak storefront (the "after").
 * em-based sizing inside a container-query wrapper; decorative.
 */
export function VignetteCommerce({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("@container w-full select-none", className)}>
      <div
        className="relative flex w-full flex-col overflow-hidden border border-[#d8d4c8] bg-[#f6f4ee] text-[#1c1c1e] shadow-[0_30px_80px_rgb(0_0_0/0.25)]"
        style={{ fontSize: "1.05cqw", aspectRatio: "16/10" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-[1em] border-b border-[#e2ded2] bg-[#fbfaf6] px-[1.6em] py-[1em]">
          <span className="flex gap-[0.5em]">
            <i className="size-[0.7em] rounded-full bg-[#d8d4c8]" />
            <i className="size-[0.7em] rounded-full bg-[#d8d4c8]" />
            <i className="size-[0.7em] rounded-full bg-[#d8d4c8]" />
          </span>
          <span className="rounded-[0.3em] bg-[#efece3] px-[1.2em] py-[0.35em] font-mono text-[0.8em] text-[#8a8578]">
            emberandoak.com
          </span>
        </div>

        {/* Store nav */}
        <div className="flex items-center justify-between border-b border-[#e2ded2] px-[2em] py-[1.1em]">
          <span className="font-mono text-[1.05em] font-bold tracking-[0.18em]">EMBER&amp;OAK</span>
          <div className="flex items-center gap-[1.8em] text-[0.9em] text-[#5b584e]">
            <span>Cookware</span>
            <span>Care</span>
            <span>Guides</span>
            <span className="rounded-full bg-[#1c1c1e] px-[1.1em] py-[0.35em] text-[0.85em] text-[#f6f4ee]">
              Cart · 2
            </span>
          </div>
        </div>

        {/* Hero strip */}
        <div className="flex items-center justify-between border-b border-[#e2ded2] bg-[#efece3] px-[2em] py-[1.4em]">
          <div>
            <p className="font-display text-[1.7em] leading-tight">Carbon steel, seasoned for life.</p>
            <p className="mt-[0.3em] text-[0.85em] text-[#8a8578]">Free seasoning kit with every skillet — this week.</p>
          </div>
          <span className="bg-[#b64a1e] px-[1.4em] py-[0.6em] text-[0.85em] font-medium text-[#f6f4ee]">
            Shop the range
          </span>
        </div>

        {/* Product grid */}
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-[1.2em] px-[2em] py-[1.4em]">
          {[
            { name: "Skillet No. 10", price: "$89", note: "Bestseller", tone: "#26262a" },
            { name: "Skillet No. 12", price: "$109", note: "Restocked", tone: "#33332f" },
            { name: "Wok No. 14", price: "$129", note: "New", tone: "#2b2622" },
          ].map((p) => (
            <div key={p.name} className="group/card flex flex-col border border-[#e2ded2] bg-[#fbfaf6] p-[1.1em]">
              <div className="flex flex-1 items-center justify-center bg-[#efece3] py-[1.2em]">
                <Pan tone={p.tone} />
              </div>
              <div className="mt-[0.9em] flex shrink-0 items-center justify-between">
                <div>
                  <p className="text-[0.95em] font-medium">{p.name}</p>
                  <p className="mt-[0.1em] font-mono text-[0.7em] tracking-[0.1em] text-[#b64a1e] uppercase">
                    {p.note}
                  </p>
                </div>
                <span className="text-[0.95em]">{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The "before" storefront for the comparison slider — deliberately dated:
 * cramped, gradient-happy, competing CTAs, tiny type.
 */
export function VignetteCommerceOld({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("@container h-full w-full select-none", className)}>
      <div
        className="relative flex h-full w-full flex-col overflow-hidden border border-[#b9b5a8] bg-[#e8e4da] text-[#333]"
        style={{
          fontSize: "1.05cqw",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 12px, rgb(0 0 0 / 0.025) 12px 24px)",
        }}
      >
        {/* Old chrome */}
        <div className="flex items-center gap-[1em] border-b border-[#b9b5a8] bg-[#d5d1c5] px-[1.6em] py-[1em]">
          <span className="flex gap-[0.5em]">
            <i className="size-[0.7em] rounded-full bg-[#aaa69a]" />
            <i className="size-[0.7em] rounded-full bg-[#aaa69a]" />
            <i className="size-[0.7em] rounded-full bg-[#aaa69a]" />
          </span>
          <span className="rounded-[0.3em] bg-[#c8c4b8] px-[1.2em] py-[0.35em] font-mono text-[0.8em] text-[#77746a]">
            emberandoak-store.myshopify.com
          </span>
        </div>

        {/* Cluttered header */}
        <div className="border-b-[0.25em] border-[#8f4a2a] bg-gradient-to-b from-[#f5e9d0] to-[#e3cba0] px-[1.6em] py-[0.9em]">
          <div className="flex items-center justify-between">
            <span className="font-serif text-[1.3em] font-bold tracking-wide text-[#6b3a1e] italic">
              Ember &amp; Oak Cookware Co.
            </span>
            <span className="animate-pulse rounded-[0.3em] bg-[#c0392b] px-[1em] py-[0.4em] text-[0.75em] font-bold text-white uppercase">
              SALE! 20% OFF!!
            </span>
          </div>
          <div className="mt-[0.6em] flex gap-[0.4em] text-[0.7em]">
            {["Home", "Products", "About Us", "Blog", "FAQ", "Wholesale", "Contact", "Reviews"].map((t) => (
              <span key={t} className="border border-[#b9926a] bg-[#f0e2c8] px-[0.8em] py-[0.3em] text-[#6b4a2a]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dense content */}
        <div className="grid grid-cols-4 gap-[0.8em] p-[1.2em]">
          <div className="col-span-3 space-y-[0.7em]">
            <div className="border border-[#b9b5a8] bg-white p-[0.9em]">
              <p className="text-[0.95em] font-bold text-[#6b3a1e]">Welcome to our online store!!</p>
              <p className="mt-[0.4em] text-[0.72em] leading-relaxed text-[#666]">
                We are so happy you found us. Here at Ember &amp; Oak Cookware Company we believe in
                quality cookware for every home chef. Please browse our extensive catalog of products
                below. Don&apos;t forget to sign up for our newsletter for exclusive deals and offers…
              </p>
              <div className="mt-[0.6em] flex gap-[0.5em]">
                <span className="rounded-[0.3em] bg-gradient-to-b from-[#f39c12] to-[#c87f0a] px-[1em] py-[0.4em] text-[0.7em] font-bold text-white shadow">
                  SHOP NOW
                </span>
                <span className="rounded-[0.3em] bg-gradient-to-b from-[#27ae60] to-[#1e8449] px-[1em] py-[0.4em] text-[0.7em] font-bold text-white shadow">
                  NEWSLETTER
                </span>
                <span className="rounded-[0.3em] bg-gradient-to-b from-[#2980b9] to-[#1f618d] px-[1em] py-[0.4em] text-[0.7em] font-bold text-white shadow">
                  READ BLOG
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[0.5em]">
              {["Skillet 10in", "Skillet 12in", "Wok 14in", "Griddle XL"].map((p) => (
                <div key={p} className="border border-[#b9b5a8] bg-white p-[0.5em] text-center">
                  <div className="flex h-[3.5em] items-center justify-center bg-[#eee]">
                    <i className="size-[2.2em] rounded-full bg-[#555]" />
                  </div>
                  <p className="mt-[0.4em] text-[0.65em] font-bold text-[#2980b9] underline">{p}</p>
                  <p className="text-[0.65em] text-[#c0392b]">
                    <s className="text-[#999]">$99.99</s> $79.99!
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-[0.7em]">
            <div className="border border-[#b9b5a8] bg-[#fdf6e3] p-[0.7em]">
              <p className="text-[0.7em] font-bold text-[#6b3a1e] uppercase">Newsletter</p>
              <div className="mt-[0.4em] h-[1.4em] border border-[#999] bg-white" />
              <div className="mt-[0.4em] bg-[#c0392b] py-[0.35em] text-center text-[0.65em] font-bold text-white">
                SUBSCRIBE
              </div>
            </div>
            <div className="border border-[#b9b5a8] bg-white p-[0.7em]">
              <p className="text-[0.7em] font-bold text-[#6b3a1e] uppercase">Customer reviews</p>
              <p className="mt-[0.3em] text-[0.85em] text-[#f39c12]">★★★★★</p>
              <p className="text-[0.62em] text-[#666]">&quot;Great pan, slow website&quot; — Karen T.</p>
            </div>
            <div className="border border-[#b9b5a8] bg-[#fdf6e3] p-[0.7em] text-center">
              <p className="text-[0.62em] font-bold text-[#2980b9]">🔒 100% SECURE SITE</p>
              <p className="mt-[0.3em] text-[0.6em] text-[#666]">Visitors: 004,182</p>
            </div>
          </div>
        </div>

        {/* Cluttered footer — pinned to the frame bottom */}
        <div className="mt-auto border-t-[0.2em] border-[#8f4a2a] bg-[#d5cdb8] px-[1.2em] py-[0.8em]">
          <div className="flex flex-wrap gap-x-[1em] gap-y-[0.3em] text-[0.6em] text-[#2980b9] underline">
            {["Home", "About Us", "Shipping Info", "Returns Policy", "Privacy Policy", "Terms & Conditions", "Sitemap", "Links", "Affiliates"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="mt-[0.6em] flex items-center gap-[0.8em]">
            {["✓ MONEY BACK GUARANTEE", "★ BEST OF 2015 AWARD", "✉ JOIN 500+ SUBSCRIBERS"].map((t) => (
              <span key={t} className="border border-[#999] bg-white px-[0.6em] py-[0.3em] text-[0.55em] font-bold text-[#666]">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-[0.6em] text-[0.55em] text-[#77746a]">
            Copyright © 2015-2023 Ember &amp; Oak Cookware Company LLC. All Rights Reserved. Website best viewed in Internet Explorer 9 or above.
          </p>
        </div>
      </div>
    </div>
  );
}
