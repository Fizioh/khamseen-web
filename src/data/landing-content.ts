export const systemMetrics = [
  { label: "Agents in graph", value: "50+", detail: "role-scoped, not prompt personas" },
  { label: "Approval gates", value: "8", detail: "lifecycle stages before DONE" },
  { label: "Reviewer separation", value: "required", detail: "implementer ≠ verifier" },
  { label: "Runtime context", value: "isolated", detail: "worktrees · budgets · tools" },
];

export const principles = [
  {
    id: "p1",
    title: "Graph over thread",
    body: "Work routes through a topology with explicit handoffs. Delegation is structured, not a longer chat log.",
  },
  {
    id: "p2",
    title: "Evidence over vibes",
    body: "QA agents, tests, and security scans produce pass/fail signals. Humans approve outcomes backed by artifacts.",
  },
  {
    id: "p3",
    title: "Policy over prompts",
    body: "Capabilities, scopes, and budgets are enforced at runtime — not renegotiated in every message.",
  },
  {
    id: "p4",
    title: "Human at the root",
    body: "Production deploys, spend overrides, and policy exceptions escalate to Human Authority — by design.",
  },
  {
    id: "p5",
    title: "Kernel + sub-modules",
    body: "Khamseen is the OS layer: fixed lifecycle and gates. Sub-modules plug in workloads — any shape — without forking orchestration.",
  },
];

export const executionPrimitives = [
  {
    name: "Isolated execution",
    desc: "Each run gets bounded context, tools, and filesystem scope.",
  },
  { name: "Worktrees", desc: "Parallel implementers without cross-contaminating branches." },
  { name: "Tools & MCP", desc: "Agents call approved integrations — auditable, rate-limited." },
  { name: "Agent Skills", desc: "Packaged playbooks the control plane can assign by role." },
  { name: "Capabilities", desc: "Fine-grained allow lists (e.g. git.commit, review.independent)." },
  { name: "Context boundaries", desc: "Token and memory limits per agent class." },
  { name: "Tasks", desc: "Durable units of work with IDs, owners, and lifecycle stage." },
  { name: "Runs", desc: "Time-bounded executions with cost, state, and trace export." },
];

export const delegateExample = {
  outcome: "Complete a scoped deliverable under org policy (example run #1842)",
  constraints: ["No production deploy", "Independent QA before close", "Budget cap enforced"],
  routing: ["Chief of Staff plans graph", "Implementer executes", "Reviewer verifies", "Human approves outcome"],
};

export const osKernelLifecycle =
  "REQUEST → PLAN → DELEGATE → IMPLEMENT → REVIEW → REMEDIATE → QA → HUMAN_APPROVAL → DONE";

export const subModuleDefines = [
  {
    label: "Agent roster",
    detail: "Roles, hierarchy, and handoffs inside the module — mounted on the shared graph.",
  },
  {
    label: "Skills & tools",
    detail: "Packaged capabilities and MCP integrations allowed for this module only.",
  },
  {
    label: "Data scope",
    detail: "Stores, APIs, and retention boundaries — isolated from other modules by default.",
  },
  {
    label: "Policy overlays",
    detail: "Optional extra gates (e.g. compliance checks) before kernel stages advance.",
  },
];

export const subModuleExamples = [
  {
    name: "Module you define",
    detail: "Any vertical or internal function — same kernel, your agents and skills.",
  },
  {
    name: "Second module",
    detail: "Runs in parallel: separate scope, separate budgets, shared Human Authority root.",
  },
  {
    name: "Experimental module",
    detail: "Quarantined skills and tools; cannot reach production paths without promotion.",
  },
  {
    name: "Tenant module",
    detail: "Multi-tenant installs: per-tenant roster and data fence on one control plane.",
  },
];

export const vsChatRows = [
  { axis: "Structure", chat: "Linear transcript", khamseen: "Organization graph + roles" },
  { axis: "Verification", chat: "Model self-check", khamseen: "Independent reviewer agents" },
  { axis: "Permissions", chat: "Implicit in prompt", khamseen: "Capabilities & scopes enforced" },
  { axis: "Cost", chat: "Opaque session", khamseen: "Per-run metering & caps" },
  { axis: "Production", chat: "Manual discipline", khamseen: "Human Authority gates" },
];

export const faqItems = [
  {
    q: "Is Khamseen a chat wrapper?",
    a: "No. It is an agent operating system: delegation, lifecycle, permissions, and review are first-class — the UI reflects runtime state, not conversation history alone.",
  },
  {
    q: "Who approves production changes?",
    a: "Human Authority. Agents propose and implement; gated stages (QA, security, budget) must clear before you authorize deploy or merge.",
  },
  {
    q: "What is a sub-module?",
    a: "A pluggable package on the OS: your agent roster, skills, tools, and data scope. The kernel owns lifecycle stages, delegation, audit, and Human Authority — unchanged across modules.",
  },
  {
    q: "Do I pick from a fixed list of domains?",
    a: "No. You create sub-modules for whatever workloads you need. Examples on this page are placeholders — the product is the kernel plus composable modules, not a vertical catalog.",
  },
  {
    q: "Can several modules run at once?",
    a: "Yes. Each module keeps its own graph slice, budgets, and evidence trails. One orchestration semantics; many isolated workloads under the same root policy.",
  },
  {
    q: "Slack or WhatsApp instead of a dashboard?",
    a: "Channels are ingress/egress adapters. You can approve, delegate, or receive alerts in chat — but transitions still flow through the kernel graph, not ad-hoc bot logic.",
  },
  {
    q: "Why an OS instead of LangGraph, CrewAI, or chat?",
    a: "Frameworks orchestrate steps inside an app. Khamseen is the organizational layer: fixed lifecycle, Human Authority, sub-modules, integrations, and ops surfaces (metering, eval, audit) meant to run many workloads under one policy root.",
  },
];

export const integrationIntro =
  "Humans and systems meet the OS through adapters — Slack, WhatsApp, email, webhooks, MCP, and your own APIs. Same lifecycle; different surfaces.";

export const roadmapTeaser = [
  { phase: "M1", status: "live", label: "Landing · graph · execution narrative" },
  { phase: "M2", status: "next", label: "Docs & read-only Control Center (API-backed)" },
  { phase: "M3", status: "planned", label: "Module SDK · scaffolding · registry" },
];
