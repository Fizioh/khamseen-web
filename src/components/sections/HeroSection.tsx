"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { AgentGraph } from "@/components/graph/AgentGraph";
import { MobileTimeline } from "@/components/graph/MobileTimeline";
import { HeroAgentCarousel } from "@/components/inspector/HeroAgentCarousel";
import { CtaButton } from "@/components/design-system/CtaButton";
import { githubLinks } from "@/config/site-links";
import { agentMap } from "@/data/agents";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { heroItem, heroPanel, heroStagger, motionTransition } from "@/motion/presets";
import type { Agent } from "@/types/runtime";

export function HeroSection() {
  const [selected, setSelected] = useState<Agent | null>(agentMap.khepri);
  const [graphSelectionEpoch, setGraphSelectionEpoch] = useState(0);
  const reduced = usePrefersReducedMotion();

  const selectFromGraph = (agent: Agent | null) => {
    setSelected(agent);
    setGraphSelectionEpoch((n) => n + 1);
  };

  return (
    <section
      id="hero"
      className="relative border-b border-border/50 pb-16 pt-24 md:pb-20 md:pt-28"
      aria-labelledby="hero-title"
      data-lifecycle-stage="IMPLEMENT"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={heroStagger}
            className="flex min-w-0 flex-col"
          >
            <motion.p
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase"
            >
              Agent operating system
            </motion.p>
            <motion.h1
              id="hero-title"
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="mt-4 text-4xl font-medium tracking-tight md:text-5xl"
            >
              Khamseen
            </motion.h1>
            <motion.p
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="mt-4 text-lg text-foreground/90 md:text-xl"
            >
              One human. Fifty agents. One operating system.
            </motion.p>
            <motion.p
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:text-base"
            >
              Control plane for agent organizations — delegate, verify, and approve on a shared
              lifecycle kernel. Sub-modules and chat adapters plug in; gates stay the same.
            </motion.p>
            <motion.div
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="mt-8 flex flex-wrap gap-3"
            >
              <CtaButton
                href={githubLinks.os}
                target="_blank"
                rel="noopener noreferrer"
              >
                OPEN ON GITHUB →
              </CtaButton>
              <CtaButton href="/demo" variant="secondary">
                VIEW LIVE TRACE →
              </CtaButton>
            </motion.div>
            <motion.p
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="mt-4 font-mono text-[10px] tracking-wide text-muted"
            >
              <Link href="/#waitlist" className="text-foreground/70 underline-offset-2 hover:text-accent hover:underline">
                Join waitlist
              </Link>
              {" · "}
              experimental alpha on{" "}
              <a
                href={githubLinks.os}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 underline-offset-2 hover:text-accent hover:underline"
              >
                khamseen-os
              </a>
            </motion.p>
            <motion.div
              variants={heroPanel}
              transition={{ ...motionTransition(reduced), delay: 0.35 }}
              className="mt-8 hidden min-w-0 lg:block"
            >
              <HeroAgentCarousel
                selected={selected}
                onSelect={setSelected}
                graphSelectionEpoch={graphSelectionEpoch}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="min-w-0 space-y-3"
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={heroStagger}
          >
            <motion.div variants={heroPanel} transition={{ ...motionTransition(reduced), delay: 0.2 }}>
              <div className="hidden md:block">
                <div className="mb-2 flex items-center justify-between gap-2 font-mono text-[10px] text-muted">
                  <span>TOPOLOGY / RUN #1842</span>
                  <span className="shrink-0 text-signal-active">DELEGATE → IMPLEMENT</span>
                </div>
                <AgentGraph
                  variant="compact"
                  selectedId={selected === null ? null : selected.id}
                  onSelect={selectFromGraph}
                  pulseEdgeIds={["e-nadir-khepri", "e-khepri-aegis"]}
                />
              </div>
            </motion.div>
            <motion.div variants={heroPanel} transition={{ ...motionTransition(reduced), delay: 0.32 }}>
              <MobileTimeline />
            </motion.div>
            <motion.div
              variants={heroPanel}
              transition={{ ...motionTransition(reduced), delay: 0.42 }}
              className="lg:hidden"
            >
              <HeroAgentCarousel
                selected={selected}
                onSelect={setSelected}
                graphSelectionEpoch={graphSelectionEpoch}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
