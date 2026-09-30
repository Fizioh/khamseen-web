"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Agent } from "@/types/runtime";

export function useLiveAgentCost(agent: Agent | null) {
  const reduced = usePrefersReducedMotion();
  const base = agent?.runtime.costUsd ?? 0;
  const [cost, setCost] = useState(base);

  useEffect(() => {
    setCost(agent?.runtime.costUsd ?? 0);
  }, [agent?.id, agent?.runtime.costUsd]);

  useEffect(() => {
    if (!agent) return;
    const ticking =
      agent.runtime.state === "RUNNING" || agent.runtime.state === "REVIEWING";
    if (reduced || !ticking) return;
    const timer = window.setInterval(() => {
      setCost((c) => Math.round((c + 0.01) * 100) / 100);
    }, 1400);
    return () => window.clearInterval(timer);
  }, [agent, reduced]);

  return cost;
}
