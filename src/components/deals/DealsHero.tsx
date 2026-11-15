"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function DealsHero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(122,158,196,0.14), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 20%, rgba(107,158,122,0.1), transparent 50%), linear-gradient(180deg, #0c0c0e 0%, #070708 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,232,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,234,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(180deg, black, transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-32">
        <motion.p
          className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Sélection quotidienne · France
        </motion.p>
        <motion.h1
          className="mt-4 max-w-4xl text-3xl font-medium tracking-tight text-foreground md:text-5xl md:leading-[1.08]"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.05 }}
        >
          Khamseen Deals, les meilleures promos high-tech, maison et jeux en
          France
        </motion.h1>
        <motion.p
          className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduced ? 0 : 0.12 }}
        >
          Une sélection courte d&apos;offres réellement intéressantes — prix
          vérifiés chaque jour sur les enseignes françaises.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.2 }}
        >
          <a
            href="#offres-heading"
            className="inline-flex items-center rounded border border-accent/30 bg-accent/5 px-4 py-2.5 font-mono text-xs tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            Voir les offres
          </a>
          <a
            href="#selection"
            className="inline-flex items-center rounded border border-border px-4 py-2.5 font-mono text-xs tracking-wide text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            Comment on sélectionne
          </a>
        </motion.div>
      </div>
    </section>
  );
}
