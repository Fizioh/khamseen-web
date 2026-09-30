"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { motionTransition } from "@/motion/presets";

interface CtaButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
}

export function CtaButton({
  href = "#narrative",
  onClick,
  children,
  variant = "primary",
  target,
  rel,
}: CtaButtonProps) {
  const reduced = usePrefersReducedMotion();
  const Comp = motion.a;
  const styles =
    variant === "primary"
      ? "border-accent/30 bg-accent/5 text-accent hover:border-accent/60 hover:bg-accent/10 focus-visible:outline-accent"
      : "border-border bg-transparent text-foreground/85 hover:border-accent/40 hover:text-accent focus-visible:outline-foreground";

  return (
    <Comp
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`group inline-flex items-center gap-2 rounded border px-5 py-2.5 font-mono text-sm tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles}`}
      whileHover={reduced ? undefined : { x: 2 }}
      transition={motionTransition(reduced)}
    >
      {children}
    </Comp>
  );
}
