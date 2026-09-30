import type { ExecutionStep } from "@/types/runtime";

export const demoTask = {
  id: "KHA-142",
  title: "Ship authentication middleware",
};

export const executionSteps: ExecutionStep[] = [
  {
    id: "s1",
    agentId: "nadir",
    lines: ["TASK #KHA-142", "Ship authentication middleware", "└─ delegates → KHEPRI"],
    state: "done",
    delayMs: 0,
  },
  {
    id: "s2",
    agentId: "khepri",
    lines: [
      "KHEPRI",
      "├─ implementation ✓",
      "├─ tests ✓",
      "└─ commit `84fa21`",
    ],
    state: "done",
    delayMs: 800,
  },
  {
    id: "s3",
    agentId: "aegis",
    lines: ["AEGIS", "├─ independent review", "└─ issue detected ⚠"],
    state: "warn",
    delayMs: 1600,
  },
  {
    id: "s4",
    agentId: "khepri",
    lines: ["KHEPRI", "└─ remediation ✓"],
    state: "done",
    delayMs: 2400,
  },
  {
    id: "s5",
    agentId: "aegis",
    lines: ["AEGIS", "└─ PASS ✓"],
    state: "done",
    delayMs: 3200,
  },
  {
    id: "s6",
    agentId: "human",
    lines: ["HUMAN AUTHORITY", "└─ APPROVE"],
    state: "active",
    delayMs: 4000,
  },
];
