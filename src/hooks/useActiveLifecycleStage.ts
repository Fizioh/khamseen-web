"use client";

import { useEffect, useState } from "react";
import type { LifecycleStage } from "@/types/runtime";

export function useActiveLifecycleStage(fallback: LifecycleStage) {
  const [stage, setStage] = useState<LifecycleStage>(fallback);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-lifecycle-stage]");
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top) return;
        const next = top.target.getAttribute("data-lifecycle-stage") as LifecycleStage | null;
        if (next) setStage(next);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return stage;
}
