"use client";

import { LifecycleRail } from "@/components/graph/LifecycleRail";
import { useActiveLifecycleStage } from "@/hooks/useActiveLifecycleStage";

export function ScrollLifecycleBar() {
  const stage = useActiveLifecycleStage("PLAN");

  return (
    <div
      className="sticky top-[49px] z-40 border-b border-border/60 bg-background/90 backdrop-blur-md"
      aria-live="polite"
      aria-label={`Lifecycle stage ${stage}`}
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-2.5 md:px-6">
        <LifecycleRail activeStage={stage} compact emphasizeCurrent />
      </div>
    </div>
  );
}
