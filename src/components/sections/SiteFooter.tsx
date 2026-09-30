import Link from "next/link";
import { githubLinks } from "@/config/site-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="font-mono text-xs tracking-wide text-foreground">Khamseen</p>
            <p className="text-xs leading-relaxed text-muted">
              Agent operating system — shared kernel, pluggable sub-modules. Illustrative demo
              data; control plane in private beta (M2).
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-wide text-muted"
            aria-label="Footer"
          >
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/platform" className="hover:text-foreground">
              Platform
            </Link>
            <Link href="/platform#control-room" className="hover:text-foreground">
              Control room
            </Link>
            <Link href="/integrations" className="hover:text-foreground">
              Integrations
            </Link>
            <Link href="/demo" className="hover:text-foreground">
              Live trace
            </Link>
            <Link href="/platform#faq" className="hover:text-foreground">
              FAQ
            </Link>
            <Link href="/#waitlist" className="hover:text-foreground">
              Waitlist
            </Link>
            <a
              href={githubLinks.os}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub · khamseen-os
            </a>
            <a
              href={githubLinks.web}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub · khamseen-web
            </a>
          </nav>
        </div>
        <p className="mt-8 font-mono text-[10px] text-muted/80">
          Mock runtime data · M1 landing · API control center planned M2
        </p>
      </div>
    </footer>
  );
}
