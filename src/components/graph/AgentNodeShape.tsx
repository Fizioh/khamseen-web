"use client";

import { regularPolygonPath } from "@/components/graph/graph-visual";
import type { Agent } from "@/types/runtime";

interface AgentNodeShapeProps {
  agent: Agent;
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  filter?: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function AgentNodeShape({
  agent,
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth,
  filter,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
}: AgentNodeShapeProps) {
  const common = {
    fill,
    stroke,
    strokeWidth,
    filter,
    className: "cursor-pointer",
    tabIndex: 0,
    role: "button" as const,
    "aria-label": `${agent.codename}, ${agent.role}, state ${agent.runtime.state}`,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
  };

  if (agent.tier === "human") {
    return <path d={regularPolygonPath(cx, cy, r + 2, 6, -90)} {...common} />;
  }
  if (agent.tier === "chief") {
    return <path d={regularPolygonPath(cx, cy, r + 2, 8, -22.5)} {...common} />;
  }
  return <circle cx={cx} cy={cy} r={r + 2} {...common} />;
}
