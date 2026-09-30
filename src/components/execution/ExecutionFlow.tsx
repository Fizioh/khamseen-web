"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { demoTask } from "@/data/execution-demo";
import { useExecutionSimulation } from "@/hooks/useExecutionSimulation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { fadeUp, motionTransition } from "@/motion/presets";
import { SystemPanel } from "@/components/design-system/SystemPanel";

export function ExecutionFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const { steps } = useExecutionSimulation(inView);
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref}>
    <SystemPanel className="overflow-hidden p-4 md:p-6">
      <div className="mb-4 font-mono text-xs text-muted">
        <span className="text-accent">TASK #{demoTask.id}</span>
        <span className="mx-2 text-border">|</span>
        {demoTask.title}
      </div>
      <div className="space-y-3 font-mono text-xs leading-relaxed md:text-sm">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={motionTransition(reduced)}
            className={
              step.state === "warn"
                ? "text-signal-warn"
                : step.state === "active"
                  ? "text-accent"
                  : "text-foreground/85"
            }
          >
            {step.lines.map((line, li) => (
              <div key={`${step.id}-${li}`} className={li === 0 ? "font-medium" : ""}>
                {line}
              </div>
            ))}
            {i < steps.length - 1 && (
              <div className="mt-2 h-px w-full max-w-xs bg-border/60" aria-hidden />
            )}
          </motion.div>
        ))}
      </div>
    </SystemPanel>
    </div>
  );
}
