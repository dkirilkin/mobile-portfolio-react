"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.9,
} as const;

const tags = {
  div: motion.div,
  article: motion.article,
  li: motion.li,
  section: motion.section,
  header: motion.header,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
} as const;

type RevealTag = keyof typeof tags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Задержка для staggered-каскада: index * 0.07 */
  delay?: number;
  /** Смещение по Y при входе, px */
  y?: number;
  as?: RevealTag;
};

/**
 * Scroll-reveal с spring-физикой. При prefers-reduced-motion
 * рендерится статично, без анимации.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = tags[as];

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ ...spring, delay }}
    >
      {children}
    </Tag>
  );
}
