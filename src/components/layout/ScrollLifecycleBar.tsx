"use client";

import { LifecycleRail } from "@/components/graph/LifecycleRail";
import { useActiveLifecycleStage } from "@/hooks/useActiveLifecycleStage";

export function ScrollLifecycleBar() {
  const stage = useActiveLifecycleStage("IMPLEMENT");

  return (
    <div
      className="sticky top-[49px] z-40 hidden border-b border-border/60 bg-background/85 backdrop-blur-md md:block"
      aria-live="polite"
      aria-label={`Lifecycle stage ${stage}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-2 md:px-6">
        <LifecycleRail activeStage={stage} compact emphasizeCurrent />
      </div>
    </div>
  );
}
