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
 * Edges of the book frame (where natural smoke lives) fade to transparent
 * via a radial mask so they blend into the dark page seamlessly.
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

  // Preload all frames so swap is instant once scrolling
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

  // Drive frame from scroll progress. Mobile uses a much steeper curve so
  // the book opens earlier (right when section is near top of viewport) and
  // stays open longer through the scroll, since mobile sections scroll past
  // very quickly and users miss the centered moment otherwise.
  useEffect(() => {
    if (!loaded) return;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    let raf = 0;
    const tick = () => {
      const p = scrollYProgress.get();
      // Mobile: amplify x8 — book hits fully-open across a wide middle band
      // Desktop: amplify x4 — already perfect there
      const mult = isMobile ? 8 : 4;
      const t = Math.max(0, Math.min(1, 1 - Math.abs(p - 0.5) * mult));
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

  // Radial mask: book stays opaque in the center, fades to transparent at edges
  // so the natural smoke / chroma-key residue at frame edges blends into the page.
  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "radial-gradient(ellipse 65% 70% at center, #000 55%, rgba(0,0,0,0.5) 80%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse 65% 70% at center, #000 55%, rgba(0,0,0,0.5) 80%, transparent 100%)",
  };

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      ref={imgRef}
      src={FRAMES[0]}
      alt="Eye of Horus carved book opening and closing"
      className={`block h-full w-full object-contain ${className}`}
      style={{ ...maskStyle, ...style }}
    />
  );
}
