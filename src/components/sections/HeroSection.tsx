"use client";

import { useState } from "react";
import { AgentGraph } from "@/components/graph/AgentGraph";
import { LifecycleRail } from "@/components/graph/LifecycleRail";
import { MobileTimeline } from "@/components/graph/MobileTimeline";
import { AgentInspector } from "@/components/inspector/AgentInspector";
import { CtaButton } from "@/components/design-system/CtaButton";
import { SystemPanel } from "@/components/design-system/SystemPanel";
import { agentMap } from "@/data/agents";
import type { Agent } from "@/types/runtime";

export function HeroSection() {
  const [selected, setSelected] = useState<Agent | null>(agentMap.khepri);

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-24" aria-labelledby="hero-title">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
              Agent operating system
            </p>
            <h1 id="hero-title" className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">
              Khamseen
            </h1>
            <p className="mt-4 text-lg text-foreground/90 md:text-xl">
              One human. Fifty agents. One operating system.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              Build, delegate, review and operate autonomous AI teams.
            </p>
            <div className="mt-8">
              <CtaButton href="#narrative">ENTER THE SYSTEM →</CtaButton>
            </div>
            <div className="mt-8 hidden md:block">
              <LifecycleRail activeStage="IMPLEMENT" />
            </div>
          </div>

          <div className="space-y-4">
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
            <MobileTimeline />
            <AgentInspector agent={selected} />
          </div>
        </div>
      </div>
    </section>
  );
}
