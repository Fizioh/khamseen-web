import type { Agent } from "@/types/runtime";

export const agents: Agent[] = [
  {
    id: "human",
    codename: "HUMAN AUTHORITY",
    role: "Approval & policy",
    capabilities: [
      { id: "approve.outcome", label: "approve.outcome" },
      { id: "policy.override", label: "policy.override" },
      { id: "budget.cap", label: "budget.cap" },
    ],
    permissions: [
      { label: "Production", value: "gated" },
      { label: "All modules", value: "scoped" },
    ],
    runtime: {
      state: "HUMAN_REQUIRED",
      runId: "#1842",
      costUsd: 0,
      context: "sovereign",
    },
    x: 0.5,
    y: 0.5,
    tier: "human",
  },
  {
    id: "nadir",
    codename: "NADIR",
    role: "Chief of Staff",
    capabilities: [
      { id: "delegate.task", label: "delegate.task" },
      { id: "plan.graph", label: "plan.graph" },
      { id: "escalate.human", label: "escalate.human" },
    ],
    permissions: [
      { label: "Repository", value: "scoped" },
      { label: "Production", value: "denied" },
    ],
    runtime: {
      state: "RUNNING",
      runId: "#1842",
      costUsd: 0.12,
      context: "isolated",
    },
    x: 0.5,
    y: 0.18,
    tier: "chief",
  },
  {
    id: "khepri",
    codename: "KHEPRI",
    role: "Engineering Agent",
    capabilities: [
      { id: "code.write", label: "code.write" },
      { id: "git.commit", label: "git.commit" },
      { id: "tests.execute", label: "tests.execute" },
      { id: "github.pr", label: "github.pr" },
    ],
    permissions: [
      { label: "Repository", value: "scoped" },
      { label: "Production", value: "denied" },
    ],
    runtime: {
      state: "REVIEWING",
      runId: "#1842",
      costUsd: 0.41,
      context: "isolated",
    },
    x: 0.22,
    y: 0.62,
    tier: "specialist",
  },
  {
    id: "aegis",
    codename: "AEGIS",
    role: "QA / Independent Review",
    capabilities: [
      { id: "review.independent", label: "review.independent" },
      { id: "tests.verify", label: "tests.verify" },
      { id: "policy.check", label: "policy.check" },
    ],
    permissions: [
      { label: "Write", value: "denied" },
      { label: "Read", value: "scoped" },
    ],
    runtime: {
      state: "RUNNING",
      runId: "#1842",
      costUsd: 0.18,
      context: "isolated",
    },
    x: 0.78,
    y: 0.62,
    tier: "specialist",
  },
  {
    id: "sentinel",
    codename: "SENTINEL",
    role: "Security",
    capabilities: [
      { id: "scan.deps", label: "scan.deps" },
      { id: "secrets.audit", label: "secrets.audit" },
    ],
    permissions: [
      { label: "Production", value: "denied" },
      { label: "Secrets", value: "read-only" },
    ],
    runtime: {
      state: "IDLE",
      runId: "—",
      costUsd: 0,
      context: "isolated",
    },
    x: 0.12,
    y: 0.38,
    tier: "specialist",
  },
  {
    id: "pulse",
    codename: "PULSE",
    role: "Monitoring",
    capabilities: [
      { id: "observe.runs", label: "observe.runs" },
      { id: "telemetry.emit", label: "telemetry.emit" },
    ],
    permissions: [
      { label: "Logs", value: "scoped" },
      { label: "Metrics", value: "scoped" },
    ],
    runtime: {
      state: "RUNNING",
      runId: "#1842",
      costUsd: 0.04,
      context: "shared-read",
    },
    x: 0.88,
    y: 0.38,
    tier: "specialist",
  },
  {
    id: "merchant",
    codename: "MERCHANT",
    role: "Sub-module worker",
    capabilities: [
      { id: "module.task", label: "module.task" },
      { id: "module.read", label: "module.read" },
    ],
    permissions: [
      { label: "Kernel", value: "read-only" },
      { label: "Module data", value: "scoped" },
    ],
    runtime: {
      state: "IDLE",
      runId: "—",
      costUsd: 0,
      context: "isolated",
    },
    x: 0.5,
    y: 0.82,
    tier: "worker",
  },
];

export const agentMap = Object.fromEntries(agents.map((a) => [a.id, a])) as Record<
  string,
  Agent
>;
