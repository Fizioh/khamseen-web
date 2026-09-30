"use client";

import { agents } from "@/data/agents";
import { StateBadge } from "@/components/design-system/StateBadge";
import { SystemPanel } from "@/components/design-system/SystemPanel";

const order = ["human", "nadir", "khepri", "aegis"];

export function MobileTimeline() {
  const ordered = order.map((id) => agents.find((a) => a.id === id)!);

  return (
    <SystemPanel className="p-4 md:hidden">
      <p className="mb-3 font-mono text-[10px] tracking-widest text-muted uppercase">
        Execution timeline
      </p>
      <ol className="space-y-3">
        {ordered.map((agent, i) => (
          <li key={agent.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-[10px] font-mono">
                {i + 1}
              </span>
              {i < ordered.length - 1 && (
                <span className="mt-1 w-px flex-1 bg-border min-h-[12px]" aria-hidden />
              )}
            </div>
            <div className="pb-2 font-mono text-xs">
              <p className="font-medium">{agent.codename}</p>
              <p className="text-muted">{agent.role}</p>
              <div className="mt-1">
                <StateBadge state={agent.runtime.state} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </SystemPanel>
  );
}
