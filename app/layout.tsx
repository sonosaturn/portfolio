import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import "./globals.css";

// Single reversible flag: false removes the ambient background entirely.
const SHOW_BACKGROUND = true;

const plexSans = IBM_Plex_Sans({ weight: ["400", "500", "600", "700"], variable: "--font-plex-sans", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ weight: ["400", "500", "600"], variable: "--font-plex-mono", subsets: ["latin"] });

const description = `${site.role}, ${site.tagline}. Progetti e interessi di ${site.name}, in chiaro.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: ["Lorenzo", "portfolio", "CS student", "AI", "context engineering", "Sapienza"],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${plexSans.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {SHOW_BACKGROUND && <Background />}
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
