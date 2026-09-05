import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

/** The agency shell. Routes outside the (site) group — e.g. /bio-data — opt out by not using it. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <NavBar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
