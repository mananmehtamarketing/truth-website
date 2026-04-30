"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const FRAMES = [
  "/images/book-keyframes/frame-1.webp", // closed
  "/images/book-keyframes/frame-2.webp", // mid
  "/images/book-keyframes/frame-3.webp", // open
];

/**
 * Three-keyframe book animation tied to scroll.
 *
 * Mapping with t = 1 - |progress - 0.5| * 2:
 *  - progress 0   (entering)  → t=0   → frame 1 (closed)
 *  - progress 0.25            → t=0.5 → frame 2 (mid)
 *  - progress 0.5  (centered) → t=1   → frame 3 (open)
 *  - progress 0.75            → t=0.5 → frame 2 (mid)
 *  - progress 1   (leaving)   → t=0   → frame 1 (closed)
 *
 * Result: book opens as you scroll into the section, closes as you scroll past.
 * Reverses cleanly when scrolling back up.
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
  const lastIndex = useRef(-1);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Preload all 3 frames
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

  // Drive the active frame from scroll progress
  useEffect(() => {
    if (!loaded) return;
    let raf = 0;
    const tick = () => {
      const p = scrollYProgress.get();
      const t = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
      const idx = Math.min(2, Math.max(0, Math.round(t * 2)));
      if (idx !== lastIndex.current) {
        lastIndex.current = idx;
        setIndex(idx);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaded, scrollYProgress]);

  return (
    <div className={`relative h-full w-full ${className}`} style={style}>
      {FRAMES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden={i !== index}
          className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out"
          style={{ opacity: index === i ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
