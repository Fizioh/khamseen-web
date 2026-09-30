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
            <a href="#control-room" className="hover:text-foreground">
              Control room
            </a>
            <a href="#waitlist" className="hover:text-foreground">
              Waitlist
            </a>
            <a href="#control-plane" className="hover:text-foreground">
              Narrative
            </a>
            <a href="#integrations" className="hover:text-foreground">
              Integrations
            </a>
            <a href="#demo" className="hover:text-foreground">
              Execution trace
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
            <a href="#modules" className="hover:text-foreground">
              Sub-modules
            </a>
            <a href="#roadmap" className="hover:text-foreground">
              Roadmap
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
