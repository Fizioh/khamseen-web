"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function SiteHeader() {
  const reduced = usePrefersReducedMotion();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#" className="font-mono text-sm tracking-[0.2em] text-foreground">
          KHAMSEEN
        </a>
        <div className="hidden items-center gap-4 font-mono text-[10px] tracking-widest text-muted sm:flex">
          <span>SYS v0.1</span>
          <span className="h-3 w-px bg-border" aria-hidden />
          <span className="inline-flex items-center gap-1.5 text-signal-ok">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-signal-ok"
              animate={reduced ? {} : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            ORCHESTRATOR ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}
