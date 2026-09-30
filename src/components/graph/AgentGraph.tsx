"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { GraphCanvas, useGraphStyle } from "@/components/graph/GraphCanvas";
import { AgentNodeShape } from "@/components/graph/AgentNodeShape";
import {
  curvedEdgePath,
  quadraticControl,
  quadraticPoint,
  regularPolygonPath,
  stateAccent,
  tierNodeStyle,
  trimEdgeEndpoints,
} from "@/components/graph/graph-visual";
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

function AgentGraphSvg({
  variant = "full",
  selectedId,
  onSelect,
  pulseEdgeIds = [],
  highlightAgentIds = [],
  edgesActive = true,
}: Omit<AgentGraphProps, "className">) {
  const reduced = usePrefersReducedMotion();
  const { edgeActive, edgeGlow, nodeGlow, edgeArrow } = useGraphStyle();
  const [internalSelected, setInternalSelected] = useState<string | null>("khepri");
  const [hoverId, setHoverId] = useState<string | null>(null);
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
    <>
      {edges.map((edge) => {
        const from = agentMap[edge.from];
        const to = agentMap[edge.to];
        const r1 = nodeRadius(from.tier);
        const r2 = nodeRadius(to.tier);
        const rawX1 = from.x * w;
        const rawY1 = from.y * h;
        const rawX2 = to.x * w;
        const rawY2 = to.y * h;
        const { x1, y1, x2, y2 } = trimEdgeEndpoints(rawX1, rawY1, rawX2, rawY2, r1, r2);
        const path = curvedEdgePath(x1, y1, x2, y2);
        const ctrl = quadraticControl(x1, y1, x2, y2);
        const mid = quadraticPoint(x1, y1, ctrl.cx, ctrl.cy, x2, y2, 0.72);
        const pulsing = pulseEdgeIds.includes(edge.id);
        const lit = pulsing && edgesActive;
        return (
          <g key={edge.id}>
            <path
              d={path}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <path
              d={path}
              fill="none"
              stroke={lit ? `url(#${edgeActive})` : "rgba(255,255,255,0.14)"}
              strokeWidth={lit ? 1.4 : 1}
              strokeLinecap="round"
              strokeDasharray={lit ? undefined : "3 5"}
              filter={lit ? `url(#${edgeGlow})` : undefined}
              markerEnd={`url(#${edgeArrow})`}
            />
            {!lit && (
              <circle
                cx={mid.x}
                cy={mid.y}
                r={1.2}
                fill="rgba(255,255,255,0.12)"
                pointerEvents="none"
              />
            )}
            {edge.label && (
              <text
                x={(x1 + x2) / 2}
                y={(y1 + y2) / 2 - 6}
                textAnchor="middle"
                className="fill-muted font-mono text-[7px] tracking-wide pointer-events-none select-none opacity-70"
              >
                {edge.label}
              </text>
            )}
            {lit && !reduced && (
              <motion.circle
                r="2.5"
                fill="#c8dce8"
                filter={`url(#${edgeGlow})`}
                initial={{ cx: x1, cy: y1 }}
                animate={{ cx: [x1, x2], cy: [y1, y2] }}
                transition={{
                  duration: 2,
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
        const hovered = hoverId === agent.id;
        const highlighted = highlightAgentIds.includes(agent.id);
        const accent = stateAccent(agent.runtime.state);
        const tier = tierNodeStyle(agent.tier);
        const focus = selected || hovered || highlighted;

        return (
          <g key={agent.id}>
            {(highlighted || selected) && !reduced && edgesActive && (
              <motion.circle
                cx={cx}
                cy={cy}
                fill="none"
                stroke={accent}
                strokeWidth="1"
                opacity={0.45}
                animate={{
                  r: [r + 8, r + 14, r + 8],
                  opacity: [0.15, 0.5, 0.15],
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
            )}
            {agent.tier === "human" ? (
              <path
                d={regularPolygonPath(cx, cy, r + 8, 6, -90)}
                fill="none"
                stroke={focus ? accent : "rgba(255,255,255,0.04)"}
                strokeWidth={focus ? 1 : 0.75}
                opacity={focus ? 0.9 : 0.5}
                pointerEvents="none"
              />
            ) : (
              <circle
                cx={cx}
                cy={cy}
                r={r + 6}
                fill="none"
                stroke={focus ? accent : "rgba(255,255,255,0.04)"}
                strokeWidth={focus ? 1 : 0.75}
                opacity={focus ? 0.9 : 0.5}
                pointerEvents="none"
              />
            )}
            <AgentNodeShape
              agent={agent}
              cx={cx}
              cy={cy}
              r={r}
              fill={tier.fillOuter}
              stroke={focus ? accent : tier.ring}
              strokeWidth={selected ? 1.75 : 1}
              filter={focus ? `url(#${nodeGlow})` : undefined}
              onClick={() => select(agent.id)}
              onMouseEnter={() => setHoverId(agent.id)}
              onMouseLeave={() => setHoverId(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(agent.id);
                }
              }}
            />
            <circle cx={cx} cy={cy} r={r - 4} fill={tier.fillInner} pointerEvents="none" />
            <circle
              cx={cx}
              cy={cy}
              r={3}
              fill={accent}
              opacity={agent.runtime.state === "IDLE" ? 0.35 : 0.95}
              pointerEvents="none"
            />
            <rect
              x={cx - 42}
              y={cy - r - 22}
              width={84}
              height={14}
              rx={2}
              fill="rgba(7,7,8,0.85)"
              stroke="rgba(255,255,255,0.06)"
              pointerEvents="none"
            />
            <text
              x={cx}
              y={cy - r - 12}
              textAnchor="middle"
              className={`font-mono text-[8px] tracking-wider pointer-events-none select-none ${
                focus ? "fill-foreground" : "fill-foreground/75"
              }`}
            >
              {agent.codename}
            </text>
            {selected && (
              <foreignObject x={cx - 40} y={cy + r + 6} width="80" height="22">
                <div className="flex justify-center">
                  <StateBadge state={agent.runtime.state} />
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </>
  );
}

export function AgentGraph(props: AgentGraphProps) {
  const { className = "", variant = "full", ...rest } = props;
  return (
    <GraphCanvas
      width={560}
      height={420}
      ariaLabel="Agent orchestration topology"
      className={className}
    >
      <AgentGraphSvg variant={variant} {...rest} />
    </GraphCanvas>
  );
}
