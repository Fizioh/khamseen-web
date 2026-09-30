"use client";

import { StateBadge } from "@/components/design-system/StateBadge";
import { SystemPanel } from "@/components/design-system/SystemPanel";
import type { Agent } from "@/types/runtime";

interface AgentInspectorProps {
  agent: Agent | null;
}

export function AgentInspector({ agent }: AgentInspectorProps) {
  if (!agent) {
    return (
      <SystemPanel className="p-4 font-mono text-xs text-muted">
        <p className="text-[10px] tracking-widest uppercase">Inspector</p>
        <p className="mt-2 text-foreground/70">Select an agent node</p>
      </SystemPanel>
    );
  }

  return (
    <SystemPanel className="p-4 font-mono text-xs" role="region" aria-live="polite">
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
              State: <StateBadge state={agent.runtime.state} />
            </li>
            <li>Run: {agent.runtime.runId}</li>
            <li>Cost: ${agent.runtime.costUsd.toFixed(2)}</li>
            <li>Context: {agent.runtime.context}</li>
          </ul>
        </div>
      </div>
    </SystemPanel>
  );
}
