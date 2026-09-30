import { SiteShell } from "@/components/layout/SiteShell";
import { HomeExplore } from "@/components/sections/HomeExplore";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductPillars, TrustStrip, WaitlistCta } from "@/components/sections/ProductShowcase";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <TrustStrip />
      <ProductPillars />
      <HomeExplore />
      <WaitlistCta />
    </SiteShell>
  );
}
