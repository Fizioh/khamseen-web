"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/design-system/CtaButton";
import { githubLinks } from "@/config/site-links";
import { SystemPanel } from "@/components/design-system/SystemPanel";
import {
  autonomyLevels,
  moduleSnippet,
  opsMetrics,
  opsRunRows,
  productPillars,
  streamLines,
  trustItems,
} from "@/data/product-showcase";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, motionTransition } from "@/motion/presets";

function StreamLog({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? streamLines.length : 0);

  useEffect(() => {
    if (!active || reduced) {
      setCount(streamLines.length);
      return;
    }
    setCount(0);
    const timers = streamLines.map((_, i) =>
      window.setTimeout(() => setCount(i + 1), 400 + i * 550),
    );
    return () => timers.forEach(clearTimeout);
  }, [active, reduced]);

  return (
    <div className="mt-4 rounded border border-border/80 bg-background/60 p-3 font-mono text-[11px] leading-relaxed">
      {streamLines.slice(0, count).map((line) => (
        <motion.div
          key={line}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-foreground/80"
        >
          <span className="text-signal-active">{">"}</span> {line}
        </motion.div>
      ))}
      {active && !reduced && count < streamLines.length && (
        <span className="inline-block h-3 w-1.5 animate-pulse bg-accent/70" aria-hidden />
      )}
    </div>
  );
}

export function ProductPillars() {
  return (
    <section className="border-b border-border/60 py-12 md:py-14" aria-label="Product pillars">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
        {productPillars.map((p) => (
          <a key={p.id} href={p.href} className="group block h-full">
            <SystemPanel className="h-full p-4 transition-colors group-hover:border-accent/40">
              <p className="font-mono text-xs text-accent">{p.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{p.summary}</p>
            </SystemPanel>
          </a>
        ))}
      </div>
    </section>
  );
}

export function OpsControlRoom() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      ref={ref}
      id="control-room"
      className="py-14 md:py-20"
      aria-labelledby="control-room-title"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={reduced ? false : "hidden"}
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={motionTransition(reduced)}
        >
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
            Control room
          </p>
          <h2 id="control-room-title" className="mt-2 text-2xl font-medium md:text-3xl">
            Operate runs like production — before API wiring
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Preview of M2 Control Center — all numbers and rows are illustrative until the API is
            live. No customer metrics implied.
          </p>
        </motion.div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {opsMetrics.map((m) => (
            <SystemPanel key={m.label} className="px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{m.label}</p>
              <p className="mt-1 text-xl font-medium">{m.value}</p>
              <p className="mt-1 text-xs text-muted">{m.delta}</p>
            </SystemPanel>
          ))}
        </div>
        <SystemPanel className="mt-6 overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="px-4 py-3 font-normal">Task</th>
                <th className="px-4 py-3 font-normal">Agent</th>
                <th className="px-4 py-3 font-normal">Stage</th>
                <th className="px-4 py-3 font-normal">Eval</th>
                <th className="px-4 py-3 font-normal">Cost</th>
              </tr>
            </thead>
            <tbody>
              {opsRunRows.map((row) => (
                <tr key={row.id} className="border-b border-border/50 last:border-0">
                  <td className="px-4 py-3 text-foreground/90">{row.task}</td>
                  <td className="px-4 py-3">{row.agent}</td>
                  <td className="px-4 py-3 text-signal-active">{row.stage}</td>
                  <td className="px-4 py-3">{row.eval}</td>
                  <td className="px-4 py-3">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <StreamLog active={inView} />
        </SystemPanel>
      </div>
    </section>
  );
}

export function AutonomyLadder() {
  return (
    <section className="border-y border-border/60 bg-surface/30 py-14 md:py-20" id="autonomy">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
          Maturity model
        </p>
        <h2 className="mt-2 text-2xl font-medium md:text-3xl">
          Autonomy levels map to the same kernel
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          From assisted requests to governed autopilot — one lifecycle, stricter gates as level
          increases.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {autonomyLevels.map((l) => (
            <SystemPanel key={l.level} className="flex h-full flex-col p-4">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-accent">{l.level}</span>
                <span className="text-sm font-medium">{l.name}</span>
              </div>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{l.summary}</p>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-foreground/75">
                {l.lifecycle}
              </p>
            </SystemPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ModuleSnippetBlock() {
  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2 lg:items-center md:px-6">
        <div>
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">Builder</p>
          <h2 className="mt-2 text-xl font-medium md:text-2xl">Mount a sub-module on the kernel</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Declarative boundary: roster template, skills, data scope, and which kernel gates apply.
            Orchestration stays shared.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaButton href={githubLinks.os} target="_blank" rel="noopener noreferrer">
              OPEN ON GITHUB →
            </CtaButton>
            <CtaButton href="/platform#roadmap" variant="secondary">
              ROADMAP
            </CtaButton>
          </div>
        </div>
        <SystemPanel className="overflow-x-auto p-4">
          <pre className="font-mono text-[11px] leading-relaxed text-foreground/85 whitespace-pre">
            {moduleSnippet}
          </pre>
        </SystemPanel>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section
      className="border-b border-border/60 py-6"
      aria-label="Trust and policy defaults"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-4 px-4 md:px-6">
        {trustItems.map((t) => (
          <div key={t.label} className="min-w-[140px]">
            <p className="font-mono text-[10px] tracking-wide text-foreground/90">{t.label}</p>
            <p className="text-[11px] text-muted">{t.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
