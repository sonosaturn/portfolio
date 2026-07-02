"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { GitHubIcon, MailIcon, MenuIcon, CloseIcon } from "./icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-fg transition-colors hover:text-accent"
          onClick={() => setOpen(false)}
        >
          lorenzo<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 sm:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={`text-sm transition-colors ${
                isActive(pathname, item.href) ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-border" aria-hidden />
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-fg"
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-fg"
          >
            <MailIcon className="h-[18px] w-[18px]" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          className="text-fg sm:hidden"
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="border-t border-border px-6 py-4 sm:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`block py-2 text-base transition-colors ${
                    isActive(pathname, item.href) ? "text-accent" : "text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-5 border-t border-border pt-4 text-muted">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fg">
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-fg">
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
