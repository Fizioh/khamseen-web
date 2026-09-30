"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { agents, agentMap } from "@/data/agents";
import { topologyEdges } from "@/data/topology";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Agent } from "@/types/runtime";
import { StateBadge } from "@/components/design-system/StateBadge";

interface AgentGraphProps {
  variant?: "full" | "compact" | "minimal";
  selectedId?: string | null;
  onSelect?: (agent: Agent | null) => void;
  pulseEdgeIds?: string[];
  highlightAgentIds?: string[];
  edgesActive?: boolean;
  className?: string;
}

function nodeRadius(tier: Agent["tier"]) {
  if (tier === "human") return 28;
  if (tier === "chief") return 22;
  return 18;
}

export function AgentGraph({
  variant = "full",
  selectedId,
  onSelect,
  pulseEdgeIds = [],
  highlightAgentIds = [],
  edgesActive = true,
  className = "",
}: AgentGraphProps) {
  const reduced = usePrefersReducedMotion();
  const [internalSelected, setInternalSelected] = useState<string | null>("khepri");
  const isControlled = selectedId !== undefined;
  const activeId = isControlled ? selectedId : internalSelected;

  const visibleAgents = useMemo(() => {
    if (variant === "minimal") {
      return agents.filter((a) =>
        ["human", "nadir", "khepri", "aegis"].includes(a.id),
      );
    }
    if (variant === "compact") {
      return agents.filter((a) => a.id !== "merchant");
    }
    return agents;
  }, [variant]);

  const visibleIds = new Set(visibleAgents.map((a) => a.id));
  const edges = topologyEdges.filter(
    (e) => visibleIds.has(e.from) && visibleIds.has(e.to),
  );

  const select = useCallback(
    (id: string) => {
      const next = activeId === id ? null : id;
      if (onSelect) onSelect(next ? agentMap[id] : null);
      else setInternalSelected(next);
    },
    [activeId, onSelect],
  );

  const w = 560;
  const h = 420;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full max-h-[420px]"
        role="group"
        aria-label="Agent orchestration topology"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width={w} height={h} fill="url(#grid)" />

        {edges.map((edge) => {
          const from = agentMap[edge.from];
          const to = agentMap[edge.to];
          const x1 = from.x * w;
          const y1 = from.y * h;
          const x2 = to.x * w;
          const y2 = to.y * h;
          const pulsing = pulseEdgeIds.includes(edge.id);
          return (
            <g key={edge.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {pulsing && edgesActive && !reduced && (
                <motion.circle
                  r="3"
                  fill="rgba(232,232,232,0.9)"
                  initial={{ cx: x1, cy: y1 }}
                  animate={{ cx: [x1, x2], cy: [y1, y2] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </g>
          );
        })}

        {visibleAgents.map((agent) => {
          const cx = agent.x * w;
          const cy = agent.y * h;
          const r = nodeRadius(agent.tier);
          const selected = activeId === agent.id;
          const highlighted = highlightAgentIds.includes(agent.id);
          return (
            <g key={agent.id}>
              {highlighted && !reduced && edgesActive && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  fill="none"
                  stroke="rgba(232,232,232,0.35)"
                  strokeWidth="1"
                  animate={{
                    r: [r + 7, r + 10, r + 7],
                    opacity: [0.2, 0.75, 0.2],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              )}
              <motion.circle
                cx={cx}
                cy={cy}
                r={r + (selected ? 4 : 0)}
                fill="none"
                stroke={selected ? "rgba(232,232,232,0.5)" : "transparent"}
                strokeWidth="1"
                animate={
                  reduced
                    ? {}
                    : selected || highlighted
                      ? { opacity: [0.4, 0.9, 0.4] }
                      : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={agent.tier === "human" ? "#1a1a1a" : "#111111"}
                stroke={selected ? "#e8e8e8" : "rgba(255,255,255,0.2)"}
                strokeWidth={selected ? 1.5 : 1}
                className="cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={`${agent.codename}, ${agent.role}, state ${agent.runtime.state}`}
                onClick={() => select(agent.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(agent.id);
                  }
                }}
              />
              <text
                x={cx}
                y={cy - r - 8}
                textAnchor="middle"
                className="fill-foreground font-mono text-[9px] tracking-wider pointer-events-none select-none"
              >
                {agent.codename}
              </text>
              {selected && (
                <foreignObject x={cx - 36} y={cy + r + 4} width="72" height="20">
                  <div className="flex justify-center">
                    <StateBadge state={agent.runtime.state} />
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
