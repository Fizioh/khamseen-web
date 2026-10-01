import { SiteShell } from "@/components/layout/SiteShell";
import { HomeExplore } from "@/components/sections/HomeExplore";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductPillars, TrustStrip } from "@/components/sections/ProductShowcase";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <TrustStrip />
      <ProductPillars />
      <HomeExplore />
    </SiteShell>
  );
}
