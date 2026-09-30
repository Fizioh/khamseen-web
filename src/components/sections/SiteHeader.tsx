"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { mainNav } from "@/config/site-nav";
import { githubLinks } from "@/config/site-links";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function SiteHeader() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="shrink-0 font-mono text-sm tracking-[0.2em] text-foreground">
          KHAMSEEN
        </Link>
        <nav
          className="hidden items-center gap-1 font-mono text-[10px] tracking-wide md:flex"
          aria-label="Main"
        >
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-2.5 py-1.5 transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            );
          })}
          <Link
            href="/#waitlist"
            className="ml-2 rounded border border-accent/30 px-2.5 py-1.5 text-accent hover:bg-accent/10"
          >
            WAITLIST
          </Link>
          <a
            href={githubLinks.os}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded px-2.5 py-1.5 text-muted hover:text-foreground"
          >
            GITHUB
          </a>
        </nav>
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-muted">
          <nav className="flex gap-1 md:hidden" aria-label="Main mobile">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-2 py-1 text-[9px] text-muted hover:text-foreground"
              >
                {item.label.split(" ")[0]}
              </Link>
            ))}
            <a
              href={githubLinks.os}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-2 py-1 text-[9px] text-muted hover:text-foreground"
            >
              GH
            </a>
          </nav>
          <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
          <span className="hidden items-center gap-1.5 text-signal-ok sm:inline-flex">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok"
              animate={reduced ? {} : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}
