import { ScrollLifecycleBar } from "@/components/layout/ScrollLifecycleBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { NarrativeSections } from "@/components/sections/NarrativeSections";
import {
  AutonomyLadder,
  ModuleSnippetBlock,
  OpsControlRoom,
  ProductPillars,
  TrustStrip,
  WaitlistCta,
} from "@/components/sections/ProductShowcase";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <ProductPillars />
        <OpsControlRoom />
        <AutonomyLadder />
        <ModuleSnippetBlock />
        <ScrollLifecycleBar />
        <NarrativeSections />
        <WaitlistCta />
      </main>
      <SiteFooter />
    </>
  );
}
