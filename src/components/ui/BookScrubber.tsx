"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const TOTAL_FRAMES = 40;
const FRAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/images/book-frames/frame-${n}.webp`;
});

/**
 * Book PNG-frame scrubber. Tied to scroll progress through its
 * containing section. Plays forward as section enters viewport,
 * reverses as it exits. Driven by per-frame swap of <img src>.
 *
 * Mapping: frameIndex = round((1 - |progress - 0.5| * 2) * (N-1))
 *  - progress 0   → frame 0 (closed)
 *  - progress 0.5 → frame N-1 (fully open)
 *  - progress 1   → frame 0 (closed)
 *
 * The targetRef is the section we tie the scroll progress to.
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
  const lastIndex = useRef(-1);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Preload all frames so swap is instant
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === FRAMES.length && !cancelled) {
          setLoaded(true);
        }
      };
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Drive the visible frame from scroll progress
  useEffect(() => {
    if (!loaded) return;

    let raf = 0;
    const tick = () => {
      const p = scrollYProgress.get();
      const t = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
      const idx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(t * (TOTAL_FRAMES - 1)))
      );
      if (idx !== lastIndex.current && imgRef.current) {
        imgRef.current.src = FRAMES[idx];
        lastIndex.current = idx;
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
