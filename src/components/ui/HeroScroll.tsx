"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Hero copy that recedes as you scroll away from it — fades, drops, and shrinks a touch. */
export function HeroScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);
  const y = useTransform(scrollY, [0, 480], [0, 80]);
  const scale = useTransform(scrollY, [0, 480], [1, 0.96]);

  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div data-hero-scroll style={{ opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
