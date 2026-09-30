import { PageIntro } from "@/components/layout/PageIntro";
import { SiteShell } from "@/components/layout/SiteShell";
import { IntegrationsSection } from "@/components/sections/ContentBlocks";

export const metadata = {
  title: "Integrations — Khamseen",
  description: "Slack, WhatsApp, webhooks, MCP — channel adapters into the kernel.",
};

export default function IntegrationsPage() {
  return (
    <SiteShell>
      <PageIntro
        label="Integrations"
        title="Channels & interconnections"
        description="Adapters normalize chat, mail, and HTTP into kernel events. Human gates and QA apply on every surface — no shortcut around the graph."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6">
        <IntegrationsSection />
      </div>
    </SiteShell>
  );
}
