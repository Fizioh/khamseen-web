import type { Transition, Variants } from "framer-motion";

export const motionTransition = (reduced: boolean): Transition =>
  reduced ? { duration: 0 } : { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
