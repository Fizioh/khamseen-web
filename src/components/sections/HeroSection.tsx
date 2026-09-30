"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AgentGraph } from "@/components/graph/AgentGraph";
import { LifecycleRail } from "@/components/graph/LifecycleRail";
import { MobileTimeline } from "@/components/graph/MobileTimeline";
import { AgentInspector } from "@/components/inspector/AgentInspector";
import { CtaButton } from "@/components/design-system/CtaButton";
import { SystemPanel } from "@/components/design-system/SystemPanel";
import { agentMap } from "@/data/agents";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { heroItem, heroPanel, heroStagger, motionTransition } from "@/motion/presets";
import type { Agent } from "@/types/runtime";

export function HeroSection() {
  const [selected, setSelected] = useState<Agent | null>(agentMap.khepri);
  const reduced = usePrefersReducedMotion();

  return (
    <section
      className="relative pt-28 pb-16 md:pt-32 md:pb-24"
      aria-labelledby="hero-title"
      data-lifecycle-stage="IMPLEMENT"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <motion.div
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={heroStagger}
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
              <CtaButton href="#demo">VIEW LIVE TRACE →</CtaButton>
              <CtaButton href="#waitlist" variant="secondary">
                JOIN WAITLIST
              </CtaButton>
            </motion.div>
            <motion.div
              variants={heroItem}
              transition={motionTransition(reduced)}
              className="mt-8 hidden md:block"
            >
              <LifecycleRail activeStage="IMPLEMENT" emphasizeCurrent />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={heroStagger}
          >
            <motion.div variants={heroPanel} transition={{ ...motionTransition(reduced), delay: 0.25 }}>
              <SystemPanel className="hidden p-3 md:block lg:p-4">
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-muted">
                  <span>TOPOLOGY / RUN #1842</span>
                  <span className="text-signal-active">DELEGATE → IMPLEMENT</span>
                </div>
                <div className="hidden md:block">
                  <AgentGraph
                    variant="compact"
                    selectedId={selected === null ? null : selected.id}
                    onSelect={setSelected}
                    pulseEdgeIds={["e-nadir-khepri", "e-khepri-aegis"]}
                  />
                </div>
              </SystemPanel>
            </motion.div>
            <motion.div variants={heroPanel} transition={{ ...motionTransition(reduced), delay: 0.38 }}>
              <MobileTimeline />
            </motion.div>
            <motion.div variants={heroPanel} transition={{ ...motionTransition(reduced), delay: 0.48 }}>
              <AgentInspector agent={selected} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
