"use client";

import { useEffect, useState } from "react";
import { executionSteps } from "@/data/execution-demo";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useExecutionSimulation(active: boolean) {
  const reduced = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduced ? executionSteps.length : 0);

  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      return;
    }
    if (reduced) {
      setVisibleCount(executionSteps.length);
      return;
    }
    setVisibleCount(1);
    const timers = executionSteps.slice(1).map((step, index) =>
      window.setTimeout(() => {
        setVisibleCount(index + 2);
      }, step.delayMs),
    );
    return () => timers.forEach(clearTimeout);
  }, [active, reduced]);

  return { visibleCount, steps: executionSteps.slice(0, visibleCount) };
}
