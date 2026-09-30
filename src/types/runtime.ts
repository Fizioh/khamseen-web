export type RuntimeState =
  | "IDLE"
  | "RUNNING"
  | "REVIEWING"
  | "BLOCKED"
  | "RETRYING"
  | "HUMAN_REQUIRED"
  | "COMPLETED";

export type LifecycleStage =
  | "REQUEST"
  | "PLAN"
  | "DELEGATE"
  | "IMPLEMENT"
  | "REVIEW"
  | "REMEDIATE"
  | "QA"
  | "HUMAN_APPROVAL"
  | "DONE";

export interface Capability {
  id: string;
  label: string;
}

export interface PermissionScope {
  label: string;
  value: string;
}

export interface AgentRuntime {
  state: RuntimeState;
  runId: string;
  costUsd: number;
  context: string;
}

export interface Agent {
  id: string;
  codename: string;
  role: string;
  capabilities: Capability[];
  permissions: PermissionScope[];
  runtime: AgentRuntime;
  x: number;
  y: number;
  tier: "human" | "chief" | "specialist" | "worker";
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface Transition {
  id: string;
  from: LifecycleStage;
  to: LifecycleStage;
}

export interface Task {
  id: string;
  title: string;
  stage: LifecycleStage;
}

export interface Run {
  id: string;
  taskId: string;
  agentId: string;
  state: RuntimeState;
}

export interface ApprovalGate {
  id: string;
  label: string;
  required: boolean;
}

export interface ExecutionStep {
  id: string;
  agentId: string;
  lines: string[];
  state?: "pending" | "active" | "done" | "warn";
  delayMs: number;
}
