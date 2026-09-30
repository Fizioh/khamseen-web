"use client";

import { motion } from "framer-motion";
import { lifecycleStages } from "@/data/topology";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { LifecycleStage } from "@/types/runtime";

interface LifecycleRailProps {
  activeStage?: LifecycleStage;
  compact?: boolean;
  emphasizeCurrent?: boolean;
}

export function LifecycleRail({
  activeStage = "DELEGATE",
  compact,
  emphasizeCurrent,
}: LifecycleRailProps) {
  const reduced = usePrefersReducedMotion();
  const activeIndex = lifecycleStages.indexOf(activeStage);

  return (
    <div
      className={`flex ${compact ? "flex-wrap gap-1" : "gap-0.5 overflow-x-auto pb-1"} font-mono text-[9px] tracking-wide md:text-[10px]`}
      aria-label="Task lifecycle"
    >
      {lifecycleStages.map((stage, i) => {
        const active = i <= activeIndex;
        const current = i === activeIndex;
        const pulse =
          !reduced &&
          active &&
          (!emphasizeCurrent || current) &&
          (emphasizeCurrent ? current : true);
        return (
          <div key={stage} className="flex items-center shrink-0">
            <motion.span
              layout={emphasizeCurrent && !reduced}
              className={`rounded border px-1.5 py-0.5 ${
                current && emphasizeCurrent
                  ? "border-accent text-accent bg-accent/10"
                  : active
                    ? "border-accent/50 text-accent"
                    : "border-border text-muted/60"
              }`}
              animate={pulse ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 2, repeat: Infinity, delay: emphasizeCurrent ? 0 : i * 0.15 }
              }
            >
              {stage}
            </motion.span>
            {i < lifecycleStages.length - 1 && (
              <span className="mx-0.5 text-muted/40" aria-hidden>
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
