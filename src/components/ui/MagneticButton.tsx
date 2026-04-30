"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

type Props = React.PropsWithChildren<{
  href?: string;
  className?: string;
  onClick?: () => void;
  strength?: number;
  ariaLabel?: string;
}>;

export default function MagneticButton({
  children,
  href,
  className = "",
  onClick,
  strength = 0.35,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex cursor-pointer select-none items-center justify-center rounded-[17px] border border-truth-bone/80 px-10 py-3 font-body text-[18px] tracking-wide text-truth-bone transition-colors hover:border-truth-gold hover:text-truth-gold ${className}`}
      onClick={onClick}
      role={!href ? "button" : undefined}
      aria-label={ariaLabel}
    >
      <span className="absolute inset-0 -z-10 rounded-[17px] bg-gradient-to-r from-truth-gold/0 via-truth-gold/15 to-truth-gold/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-0 -z-10 rounded-[17px] ring-1 ring-truth-gold/0 transition group-hover:ring-truth-gold/40 group-hover:[box-shadow:0_0_24px_rgba(201,169,107,0.45)]" />
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex" aria-label={ariaLabel}>
        {Inner}
      </a>
    );
  }
  return Inner;
}
