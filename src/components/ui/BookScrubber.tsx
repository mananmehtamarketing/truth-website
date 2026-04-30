"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const TOTAL_FRAMES = 40;
const FRAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/images/book-seq/frame-${n}.webp`;
});

/**
 * Book scroll scrubber — full 40-frame sequence from the source MP4.
 *
 * Mapping with t = 1 - |progress - 0.5| * 2:
 *  - section entering (progress 0)   → t=0  → frame 1   (book closed/flat)
 *  - section centered  (progress 0.5)→ t=1  → frame 40  (book fully open)
 *  - section leaving   (progress 1)  → t=0  → frame 1   (book closed/flat)
 *
 * Scroll up reverses the scrub. Smooth in both directions.
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
  const imgRef = useRef<HTMLImageElement>(null);
  const lastIdx = useRef(-1);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Preload all frames so swap is instant once scrolling starts
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        count += 1;
        if (count === FRAMES.length && !cancelled) setLoaded(true);
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Drive frame from scroll progress
  useEffect(() => {
    if (!loaded) return;
    let raf = 0;
    const tick = () => {
      const p = scrollYProgress.get();
      // Amplify the curve so the book opens/closes within a TIGHTER band.
      // Previously: t = 1 - |p-0.5|*2 (book opens across whole section)
      // Now: t = 1 - |p-0.5|*4 clamped (book stays closed near edges,
      //         opens rapidly in the middle 50% of the section)
      const t = Math.max(0, Math.min(1, 1 - Math.abs(p - 0.5) * 4));
      const idx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(t * (TOTAL_FRAMES - 1)))
      );
      if (idx !== lastIdx.current && imgRef.current) {
        imgRef.current.src = FRAMES[idx];
        lastIdx.current = idx;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaded, scrollYProgress]);

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      src={FRAMES[0]}
      alt="Eye of Horus carved book opening and closing"
      className={`block h-full w-full object-contain ${className}`}
      style={style}
    />
  );
}
