"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Доля смещения курсора, передаваемая элементу (0–1) */
  strength?: number;
};

/**
 * Магнитный эффект: элемент тянется к курсору и возвращается
 * на пружине. Смещение — только через useMotionValue/useSpring,
 * без useState. При prefers-reduced-motion — статичный div.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (!element || event.pointerType === "touch") {
      return;
    }

    const rect = element.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);

    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
