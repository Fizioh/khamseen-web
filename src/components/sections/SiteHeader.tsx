export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#" className="font-mono text-sm tracking-[0.2em] text-foreground">
          KHAMSEEN
        </a>
        <div className="hidden items-center gap-4 font-mono text-[10px] tracking-widest text-muted sm:flex">
          <span>SYS v0.1</span>
          <span className="h-3 w-px bg-border" aria-hidden />
          <span className="text-signal-ok">ORCHESTRATOR ONLINE</span>
        </div>
      </div>
    </header>
  );
}
