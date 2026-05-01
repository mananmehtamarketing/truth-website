"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 40;
const FRAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/images/book-seq/frame-${n}.webp`;
});

// Animation duration for one open or one close
const PLAY_MS = 1200;

/**
 * Intersection-driven book animation.
 *
 * - Section enters viewport (≥30% visible): play frames 0 → 39 over PLAY_MS
 * - Section leaves viewport (<10% visible): play frames currentFrame → 0 over PLAY_MS
 * - Re-enters: replay forward
 *
 * No scroll-position dependency — works identically on every page,
 * regardless of section position or page length.
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
  const lastIdx = useRef(0);
  const animRef = useRef<number | null>(null);
  const startTime = useRef(0);
  const fromIdx = useRef(0);
  const toIdx = useRef(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all 40 frames
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

  // Show frame helper
  const showFrame = (idx: number) => {
    const clamped = Math.min(TOTAL_FRAMES - 1, Math.max(0, idx));
    if (clamped !== lastIdx.current && imgRef.current) {
      imgRef.current.src = FRAMES[clamped];
      lastIdx.current = clamped;
    }
  };

  // Animate from current frame to target frame over PLAY_MS
  const animateTo = (target: number) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    fromIdx.current = lastIdx.current;
    toIdx.current = target;
    startTime.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime.current;
      const t = Math.min(1, elapsed / PLAY_MS);
      // ease in-out cubic for natural motion
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const cur = Math.round(
        fromIdx.current + (toIdx.current - fromIdx.current) * eased
      );
      showFrame(cur);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        animRef.current = null;
      }
    };
    animRef.current = requestAnimationFrame(tick);
  };

  // IntersectionObserver — drive forward / reverse based on visibility
  useEffect(() => {
    if (!loaded) return;
    const node = targetRef.current;
    if (!node) return;

    let isOpen = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.3 && !isOpen) {
            isOpen = true;
            animateTo(TOTAL_FRAMES - 1);
          } else if (e.intersectionRatio < 0.1 && isOpen) {
            isOpen = false;
            animateTo(0);
          }
        }
      },
      { threshold: [0, 0.1, 0.3, 0.6, 0.9] }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [loaded, targetRef]);

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
