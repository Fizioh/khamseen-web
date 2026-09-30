"use client";

import { useEffect, useState } from "react";
import { LifecycleRail } from "@/components/graph/LifecycleRail";
import { useActiveLifecycleStage } from "@/hooks/useActiveLifecycleStage";

export function ScrollLifecycleBar() {
  const stage = useActiveLifecycleStage("IMPLEMENT");
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setHeroVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: "-56px 0px -55% 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (heroVisible) return null;

  return (
    <div
      className="sticky top-[49px] z-40 border-b border-border/60 bg-background/85 backdrop-blur-md"
      aria-live="polite"
      aria-label={`Lifecycle stage ${stage}`}
    >
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-2 md:px-6">
        <LifecycleRail activeStage={stage} compact emphasizeCurrent />
      </div>
    </div>
  );
}
