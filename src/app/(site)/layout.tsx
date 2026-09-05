import { SiteChrome } from "@/components/SiteChrome";

/** Every agency route shares the nav + footer shell; routes outside this group don't. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
