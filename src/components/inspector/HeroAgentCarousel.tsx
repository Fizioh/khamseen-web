"use client";

import { useCallback, useEffect, useState } from "react";
import { AgentInspector } from "@/components/inspector/AgentInspector";
import { agentMap } from "@/data/agents";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Agent } from "@/types/runtime";

const CAROUSEL_ORDER = ["khepri", "nadir", "aegis", "human", "sentinel", "pulse"] as const;

const ROTATE_MS = 4800;
const PAUSE_AFTER_PICK_MS = 12000;

interface HeroAgentCarouselProps {
  selected: Agent | null;
  onSelect: (agent: Agent | null) => void;
  graphSelectionEpoch?: number;
}

export function HeroAgentCarousel({
  selected,
  onSelect,
  graphSelectionEpoch = 0,
}: HeroAgentCarouselProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);

  const pick = useCallback(
    (nextIndex: number, fromUser: boolean) => {
      const id = CAROUSEL_ORDER[nextIndex];
      if (!id) return;
      setIndex(nextIndex);
      onSelect(agentMap[id]);
      if (fromUser) setPausedUntil(Date.now() + PAUSE_AFTER_PICK_MS);
    },
    [onSelect],
  );

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setIndex((i) => {
        const next = (i + 1) % CAROUSEL_ORDER.length;
        const agentId = CAROUSEL_ORDER[next];
        onSelect(agentMap[agentId]);
        return next;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduced, pausedUntil, onSelect]);

  useEffect(() => {
    if (graphSelectionEpoch > 0) {
      setPausedUntil(Date.now() + PAUSE_AFTER_PICK_MS);
    }
  }, [graphSelectionEpoch]);

  useEffect(() => {
    if (!selected) return;
    const i = CAROUSEL_ORDER.indexOf(selected.id as (typeof CAROUSEL_ORDER)[number]);
    if (i >= 0 && i !== index) setIndex(i);
  }, [selected, index]);

  return (
    <div className="space-y-2">
      <div
        className="flex items-center justify-between gap-2 font-mono text-[10px] text-muted"
        aria-label="Agent carousel"
      >
        <span className="tracking-widest uppercase">Inspector</span>
        <span className="text-foreground/60">
          {index + 1}/{CAROUSEL_ORDER.length}
        </span>
      </div>
      <div
        className="flex gap-1 overflow-x-auto pb-1 scrollbar-none"
        role="tablist"
        aria-label="Agents in carousel"
      >
        {CAROUSEL_ORDER.map((id, i) => {
          const agent = agentMap[id];
          const active = selected?.id === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => pick(i, true)}
              className={`shrink-0 rounded border px-2 py-1 font-mono text-[9px] tracking-wide transition-colors ${
                active
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-accent/30 hover:text-foreground/80"
              }`}
            >
              {agent.codename.split(" ")[0]}
            </button>
          );
        })}
      </div>
      <AgentInspector agent={selected} />
    </div>
  );
}
