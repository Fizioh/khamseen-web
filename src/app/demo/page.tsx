import { PageIntro } from "@/components/layout/PageIntro";
import { SiteShell } from "@/components/layout/SiteShell";
import { ExecutionFlow } from "@/components/execution/ExecutionFlow";
import { CtaButton } from "@/components/design-system/CtaButton";

export const metadata = {
  title: "Live trace — Khamseen",
  description: "Task KHA-142 — delegation, review, remediation, approval.",
};

export default function DemoPage() {
  return (
    <SiteShell>
      <PageIntro
        label="Demo"
        title="Live execution trace"
        description="Representative run #1842 — watch the standard lifecycle from delegate through independent QA to Human Authority approval."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 md:px-6">
        <ExecutionFlow />
        <div className="mt-12 flex flex-wrap gap-3">
          <CtaButton href="/platform">EXPLORE PLATFORM →</CtaButton>
          <CtaButton href="/#waitlist" variant="secondary">
            JOIN WAITLIST
          </CtaButton>
        </div>
      </div>
    </SiteShell>
  );
}
