"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motionTransition } from "@/motion/presets";

interface CtaButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function CtaButton({ href = "#narrative", onClick, children }: CtaButtonProps) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion.a;

  return (
    <Comp
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/5 px-5 py-2.5 font-mono text-sm tracking-wide text-accent transition-colors hover:border-accent/60 hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      whileHover={reduced ? undefined : { x: 2 }}
      transition={motionTransition(reduced)}
    >
      {children}
    </Comp>
  );
}
