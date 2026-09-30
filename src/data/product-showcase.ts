export const productPillars = [
  {
    id: "delegate",
    title: "Delegate",
    summary: "Outcomes become tasks on the graph — chiefs route work without prompt chains.",
    href: "#delegate",
  },
  {
    id: "verify",
    title: "Verify",
    summary: "Independent reviewers, tests, and policy gates before anything advances.",
    href: "#verify",
  },
  {
    id: "approve",
    title: "Approve",
    summary: "Human Authority at meaningful gates — merge, deploy, spend, exceptions.",
    href: "#human-authority",
  },
  {
    id: "integrate",
    title: "Integrate",
    summary: "Slack, WhatsApp, webhooks, MCP — adapters into the same lifecycle kernel.",
    href: "#integrations",
  },
];

export const opsMetrics = [
  { label: "Active runs", value: "12", delta: "illustrative demo" },
  { label: "Eval pass rate", value: "96.4%", delta: "illustrative demo" },
  { label: "Spend / mo", value: "$842", delta: "illustrative demo" },
  { label: "Avg cost / run", value: "$0.38", delta: "illustrative demo" },
];

export const opsRunRows = [
  {
    id: "r1",
    task: "KHA-142 auth middleware",
    agent: "KHEPRI",
    stage: "REVIEW",
    eval: "94%",
    cost: "$0.41",
  },
  {
    id: "r2",
    task: "Module sync webhook",
    agent: "NADIR",
    stage: "DELEGATE",
    eval: "—",
    cost: "$0.12",
  },
  {
    id: "r3",
    task: "Independent QA pass",
    agent: "AEGIS",
    stage: "QA",
    eval: "PASS",
    cost: "$0.09",
  },
  {
    id: "r4",
    task: "Human merge approval",
    agent: "HUMAN",
    stage: "HUMAN_APPROVAL",
    eval: "pending",
    cost: "$0.00",
  },
];

export const streamLines = [
  "[run:1842] stage IMPLEMENT → REVIEW",
  "KHEPRI · handoff diff + test report",
  "AEGIS · review.independent started",
  "eval: 2/2 checks passed · 1 warn remediated",
  "awaiting HUMAN_APPROVAL · notify whatsapp+slack",
];

export const autonomyLevels = [
  {
    level: "L1",
    name: "Assisted",
    summary: "Human drives; agents draft inside scoped tools.",
    lifecycle: "REQUEST · PLAN",
  },
  {
    level: "L2",
    name: "Copilot",
    summary: "Chief of Staff delegates; human supervises the graph.",
    lifecycle: "DELEGATE · IMPLEMENT",
  },
  {
    level: "L3",
    name: "Governed autopilot",
    summary: "Runs complete loops; QA and policy gates enforced.",
    lifecycle: "REVIEW · REMEDIATE · QA",
  },
  {
    level: "L4",
    name: "Self-driving ops",
    summary: "Agents replan within policy; human only at authority gates.",
    lifecycle: "HUMAN_APPROVAL · DONE",
  },
];

export const trustItems = [
  { label: "Audit trail", detail: "Every stage transition logged" },
  { label: "Human-in-the-loop", detail: "Authority gates by design" },
  { label: "Isolated runs", detail: "Scoped context & tools" },
  { label: "No training on your data", detail: "Policy-first default" },
  { label: "Private beta", detail: "Control plane by invitation" },
];

export const moduleSnippet = `// sub-module manifest (illustrative)
export const module = {
  id: "your-module",
  chief: "nadir-template",
  skills: ["research.pack", "report.emit"],
  dataScope: "tenant-isolated",
  gates: ["kernel.qa", "kernel.human_approval"],
};`;
