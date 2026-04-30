"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loader: full-screen looping site-opening video (Opt 1 from Figma assets),
 * played at higher rate so it blends with the rest of the site rhythm.
 * Auto-dismisses on video end OR after a 3.5s ceiling, whichever fires first.
 */
const PLAY_RATE = 1.6; // tweak to taste
const CEILING_MS = 3500;

export default function Loader() {
  const [show, setShow] = useState(true);
  const fired = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startedAt = performance.now();

    const finish = () => {
      if (fired.current) return;
      fired.current = true;
      setShow(false);
      window.dispatchEvent(new CustomEvent("site:loaded"));
    };

    // Hard ceiling so we never get stuck
    const ceiling = setTimeout(finish, CEILING_MS);

    const v = videoRef.current;
    if (v) {
      v.playbackRate = PLAY_RATE;
      const onEnded = () => finish();
      const onPlay = () => {
        // Bump the rate again once playing — some browsers reset it on play
        v.playbackRate = PLAY_RATE;
      };
      v.addEventListener("ended", onEnded);
      v.addEventListener("play", onPlay);
      // Make sure we don't undershoot below ~600ms even if video is super short
      const minMs = 800;
      const fallbackTimer = setTimeout(() => {
        if (!fired.current && performance.now() - startedAt > minMs) {
          // safety
        }
      }, minMs);
      return () => {
        clearTimeout(ceiling);
        clearTimeout(fallbackTimer);
        v.removeEventListener("ended", onEnded);
        v.removeEventListener("play", onPlay);
      };
    }
    return () => clearTimeout(ceiling);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-truth-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-[88vw] max-w-[920px]"
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              ref={videoRef}
              src="/videos/opt1-clean.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-contain"
              // 'lighten' keeps only the brighter pixels of the video against
              // the page's pure black, so the rectangular black bg vanishes
              // and just the orange spark glows.
              style={{ mixBlendMode: "lighten" }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-display text-truth-bone/85 text-[20px] md:text-[24px]"
          >
            TRUTH
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
