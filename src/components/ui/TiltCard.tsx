"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  /** Maximum rotation angle in degrees */
  max?: number;
}>;

export default function TiltCard({ children, className = "", max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useTransform(py, [0, 1], [max, -max]);
  const ry = useTransform(px, [0, 1], [-max, max]);
  const sx = useSpring(rx, { stiffness: 180, damping: 16 });
  const sy = useSpring(ry, { stiffness: 180, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 900 }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
