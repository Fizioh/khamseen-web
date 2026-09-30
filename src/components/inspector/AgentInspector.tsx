"use client";

import { AnimatePresence, motion } from "framer-motion";
import { StateBadge } from "@/components/design-system/StateBadge";
import { SystemPanel } from "@/components/design-system/SystemPanel";
import { useLiveAgentCost } from "@/hooks/useLiveAgentCost";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { inspectorSwap, motionTransition } from "@/motion/presets";
import type { Agent } from "@/types/runtime";

interface AgentInspectorProps {
  agent: Agent | null;
}

export function AgentInspector({ agent }: AgentInspectorProps) {
  const reduced = usePrefersReducedMotion();
  const liveCost = useLiveAgentCost(agent);

  return (
    <SystemPanel className="overflow-hidden p-4 font-mono text-xs" role="region" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {!agent ? (
          <motion.div
            key="empty"
            variants={inspectorSwap}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransition(reduced)}
          >
            <p className="text-[10px] tracking-widest uppercase text-muted">Inspector</p>
            <p className="mt-2 text-foreground/70">Select an agent node</p>
          </motion.div>
        ) : (
          <motion.div
            key={agent.id}
            variants={inspectorSwap}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={motionTransition(reduced)}
          >
            <p className="text-sm font-medium tracking-wide text-foreground">{agent.codename}</p>
            <p className="mt-0.5 text-muted">{agent.role}</p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="mb-1.5 text-[10px] tracking-widest text-muted uppercase">
                  Capabilities
                </p>
                <ul className="space-y-1 text-foreground/80">
                  {agent.capabilities.map((c) => (
                    <li key={c.id}>· {c.label}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] tracking-widest text-muted uppercase">
                  Permissions
                </p>
                <ul className="space-y-1 text-foreground/80">
                  {agent.permissions.map((p) => (
                    <li key={p.label}>
                      {p.label}: {p.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-[10px] tracking-widest text-muted uppercase">Runtime</p>
                <ul className="space-y-1 text-foreground/80">
                  <li className="flex items-center gap-2">
                    State:{" "}
                    <motion.span
                      key={agent.runtime.state}
                      initial={reduced ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={motionTransition(reduced)}
                    >
                      <StateBadge state={agent.runtime.state} />
                    </motion.span>
                  </li>
                  <li>Run: {agent.runtime.runId}</li>
                  <li>
                    Cost:{" "}
                    <motion.span
                      key={Math.floor(liveCost * 10)}
                      initial={reduced ? false : { opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      ${liveCost.toFixed(2)}
                    </motion.span>
                  </li>
                  <li>Context: {agent.runtime.context}</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SystemPanel>
  );
}
