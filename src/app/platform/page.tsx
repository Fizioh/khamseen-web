import { PageIntro } from "@/components/layout/PageIntro";
import { ScrollLifecycleBar } from "@/components/layout/ScrollLifecycleBar";
import { SiteShell } from "@/components/layout/SiteShell";
import { NarrativeSections } from "@/components/sections/NarrativeSections";
import {
  AutonomyLadder,
  ModuleSnippetBlock,
  OpsControlRoom,
} from "@/components/sections/ProductShowcase";

export const metadata = {
  title: "Platform — Khamseen",
  description: "OS kernel, control room, sub-modules, and lifecycle narrative.",
};

export default function PlatformPage() {
  return (
    <SiteShell>
      <PageIntro
        label="Platform"
        title="Agent operating system"
        description="Shared lifecycle kernel, pluggable sub-modules, and the semantics you operate in production — illustrated with mock runtime data until M2 API wiring."
      />
      <OpsControlRoom />
      <AutonomyLadder />
      <ModuleSnippetBlock />
      <ScrollLifecycleBar />
      <NarrativeSections />
    </SiteShell>
  );
}
