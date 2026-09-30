import { HeroSection } from "@/components/sections/HeroSection";
import { NarrativeSections } from "@/components/sections/NarrativeSections";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <NarrativeSections />
      </main>
      <SiteFooter />
    </>
  );
}
