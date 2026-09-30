import type { Edge } from "@/types/runtime";

export const topologyEdges: Edge[] = [
  { id: "e-human-nadir", from: "human", to: "nadir", label: "authorize" },
  { id: "e-nadir-khepri", from: "nadir", to: "khepri", label: "delegate" },
  { id: "e-nadir-aegis", from: "nadir", to: "aegis", label: "verify" },
  { id: "e-khepri-aegis", from: "khepri", to: "aegis", label: "handoff" },
  { id: "e-aegis-human", from: "aegis", to: "human", label: "approve" },
  { id: "e-nadir-sentinel", from: "nadir", to: "sentinel", label: "scan" },
  { id: "e-nadir-pulse", from: "nadir", to: "pulse", label: "observe" },
  { id: "e-nadir-merchant", from: "nadir", to: "merchant", label: "module" },
];

export const lifecycleStages = [
  "REQUEST",
  "PLAN",
  "DELEGATE",
  "IMPLEMENT",
  "REVIEW",
  "REMEDIATE",
  "QA",
  "HUMAN_APPROVAL",
  "DONE",
] as const;
