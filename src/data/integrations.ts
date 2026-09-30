export type IntegrationChannel = {
  id: string;
  label: string;
  subtitle: string;
  ingress: string;
  egress: string;
  angle: number;
};

export const integrationHubLabel = "CONTROL PLANE";

export const integrationChannels: IntegrationChannel[] = [
  {
    id: "slack",
    label: "Slack",
    subtitle: "workspace",
    ingress: "slash · mention · thread reply",
    egress: "run updates · approval cards · alerts",
    angle: -90,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    subtitle: "Business API",
    ingress: "human commands · approve / reject",
    egress: "gate prompts · digest · escalation",
    angle: -35,
  },
  {
    id: "email",
    label: "Email",
    subtitle: "SMTP / inbound",
    ingress: "structured replies · RFC gates",
    egress: "audit trail · approval links",
    angle: 20,
  },
  {
    id: "webhook",
    label: "Webhooks",
    subtitle: "HTTP",
    ingress: "signed events · idempotent",
    egress: "stage transitions · callbacks",
    angle: 75,
  },
  {
    id: "github",
    label: "GitHub",
    subtitle: "VCS",
    ingress: "PR · review · checks",
    egress: "status · merge gate · comments",
    angle: 130,
  },
  {
    id: "linear",
    label: "Linear",
    subtitle: "issues",
    ingress: "ticket · state sync",
    egress: "lifecycle mirror · assign agent",
    angle: 180,
  },
  {
    id: "mcp",
    label: "MCP / Tools",
    subtitle: "agent runtime",
    ingress: "tool calls · skills",
    egress: "scoped credentials · rate limits",
    angle: 225,
  },
  {
    id: "calendar",
    label: "Calendar",
    subtitle: "schedule",
    ingress: "office hours · SLA windows",
    egress: "human gate reminders",
    angle: 270,
  },
];

export const integrationScenarios = [
  {
    id: "i1",
    title: "Approve from chat",
    steps: [
      "Run reaches HUMAN_APPROVAL",
      "WhatsApp delivers signed prompt to Human Authority",
      "Approve → kernel advances → Slack notifies #ops",
    ],
  },
  {
    id: "i2",
    title: "Ticket-driven delegate",
    steps: [
      "Linear issue moves to DELEGATE",
      "Chief of Staff mounts sub-module graph",
      "Evidence links posted back to issue + GitHub PR",
    ],
  },
  {
    id: "i3",
    title: "Webhook boundary",
    steps: [
      "External system emits webhook (verified)",
      "Mapped to REQUEST → PLAN — never bypasses QA",
      "Outbound webhook fires only after DONE or explicit gate",
    ],
  },
];
