"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Book + animated eye iris.
 *
 * The base image has the iris (gold ball) painted over with surrounding
 * stone color. We overlay a real golden iris on top that scales Y based
 * on scroll progress, simulating the eye opening/closing.
 *
 * Iris position (% of image size): cx 50%, cy 35.83%, r 8.33% of image width.
 *
 * Mapping with t = 1 - |progress - 0.5| * 2:
 *  - progress 0   (entering): t=0  → scaleY=0  → eye CLOSED
 *  - progress 0.5 (centered): t=1  → scaleY=1  → eye OPEN
 *  - progress 1   (leaving):  t=0  → scaleY=0  → eye CLOSED
 */
export default function BookScrubber({
  targetRef,
  className = "",
  style,
}: {
  targetRef: React.RefObject<HTMLElement>;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // t goes 0 → 1 → 0 across the section
  const t = useTransform(scrollYProgress, (p) =>
    Math.max(0, 1 - Math.abs(p - 0.5) * 2)
  );

  // Eye opens vertically (scaleY) and slightly horizontally for natural feel
  const irisScaleY = t;
  const irisScaleX = useTransform(t, (v) => 0.85 + v * 0.15);
  // Iris drops slightly when closing, rises when opening — adds organic bob
  const irisDy = useTransform(t, (v) => `${(1 - v) * 4}%`);

  return (
    <div className={`relative h-full w-full ${className}`} style={style}>
      {/* Base book image with iris erased */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/book-keyframes/book-base.webp"
        alt="Eye of Horus carved book"
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Animated iris layer — positioned over where the iris was */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden
      >
        <defs>
          <radialGradient id="irisGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d999" />
            <stop offset="55%" stopColor="#c9a96b" />
            <stop offset="100%" stopColor="#7a5a26" />
          </radialGradient>
          <radialGradient id="irisGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,210,140,0.65)" />
            <stop offset="100%" stopColor="rgba(255,210,140,0)" />
          </radialGradient>
        </defs>

        {/* Soft glow that breathes with the iris */}
        <motion.circle
          cx="50"
          cy="35.83"
          r="11"
          fill="url(#irisGlow)"
          style={{ scaleY: irisScaleY, originY: 0.36, originX: 0.5 } as any}
        />

        {/* The iris itself — a gold ball that scales Y to mimic eyelid */}
        <motion.g
          style={{
            scaleY: irisScaleY,
            scaleX: irisScaleX,
            translateY: irisDy,
            originX: "50%",
            originY: "35.83%",
          } as any}
        >
          <circle cx="50" cy="35.83" r="4.5" fill="url(#irisGold)" />
          {/* Inner highlight on iris */}
          <circle cx="48.8" cy="34.6" r="1.4" fill="#fff8e7" opacity="0.55" />
        </motion.g>
      </svg>
    </div>
  );
}
