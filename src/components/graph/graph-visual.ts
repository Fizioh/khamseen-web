import type { Agent, RuntimeState } from "@/types/runtime";

export function curvedEdgePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend = 0.12,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export function stateAccent(state: RuntimeState): string {
  switch (state) {
    case "RUNNING":
      return "#7a9ec4";
    case "REVIEWING":
      return "#c4a24a";
    case "HUMAN_REQUIRED":
      return "#e8e8ea";
    case "COMPLETED":
      return "#6b9e7a";
    case "BLOCKED":
      return "#b85c5c";
    case "RETRYING":
      return "#c4a24a";
    default:
      return "#5a5a62";
  }
}

export function tierNodeStyle(tier: Agent["tier"]) {
  if (tier === "human") {
    return {
      fillInner: "#141416",
      fillOuter: "#0a0a0b",
      ring: "#e8e8ea",
    };
  }
  if (tier === "chief") {
    return {
      fillInner: "#121214",
      fillOuter: "#0c0c0e",
      ring: "#b8bcc4",
    };
  }
  if (tier === "worker") {
    return {
      fillInner: "#101012",
      fillOuter: "#0b0b0d",
      ring: "#6a6a72",
    };
  }
  return {
    fillInner: "#111113",
    fillOuter: "#0a0a0c",
    ring: "#909098",
  };
}

export function trimEdgeEndpoints(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  r1: number,
  r2: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: x1 + ux * (r1 + 2),
    y1: y1 + uy * (r1 + 2),
    x2: x2 - ux * (r2 + 2),
    y2: y2 - uy * (r2 + 2),
  };
}
