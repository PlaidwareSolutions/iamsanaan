import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/** Inter stands in for SF Pro on non-Apple devices; Inter Tight is kept for /bio-data. */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital Product & Growth Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="tone-paper">{children}</body>
    </html>
  );
}
