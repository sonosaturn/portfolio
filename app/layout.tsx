import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lorenzo — Portfolio",
  description: "Studente CS. Progetti e interessi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
            <Link href="/" className="font-mono text-sm text-fg hover:text-accent transition-colors">
              lorenzo<span className="text-accent">.</span>
            </Link>
            <nav className="flex gap-6 text-sm text-muted">
              <Link href="/projects" className="hover:text-fg transition-colors">projects</Link>
              <Link href="/interests" className="hover:text-fg transition-colors">interests</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto max-w-3xl px-6 py-6 text-xs text-muted">
            © {new Date().getFullYear()} Lorenzo · built with Next.js
          </div>
        </footer>
      </body>
    </html>
  );
}
