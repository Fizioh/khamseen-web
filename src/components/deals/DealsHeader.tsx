import Link from "next/link";

export function DealsHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/deals"
          className="shrink-0 font-mono text-sm tracking-[0.18em] text-foreground"
        >
          KHAMSEEN DEALS
        </Link>
        <nav
          className="flex items-center gap-1 font-mono text-[10px] tracking-wide"
          aria-label="Navigation deals"
        >
          <a
            href="#offres-heading"
            className="rounded px-2.5 py-1.5 text-muted transition-colors hover:text-foreground"
          >
            OFFRES
          </a>
          <a
            href="#selection"
            className="hidden rounded px-2.5 py-1.5 text-muted transition-colors hover:text-foreground sm:inline"
          >
            MÉTHODE
          </a>
          <Link
            href="/"
            className="ml-1 rounded border border-accent/30 bg-accent/5 px-2.5 py-1.5 text-accent hover:border-accent/60 hover:bg-accent/10"
          >
            KHAMSEEN →
          </Link>
        </nav>
      </div>
    </header>
  );
}
