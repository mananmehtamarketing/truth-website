"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmokeCanvas from "@/components/ui/SmokeCanvas";

/**
 * Loader: full-screen animated open with the Opt 1 spark video,
 * surrounded by drifting amber smoke so the rectangular video edge
 * blends seamlessly into the page.
 */
const PLAY_RATE = 1.6;
const CEILING_MS = 3500;

export default function Loader() {
  const [show, setShow] = useState(true);
  const fired = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const finish = () => {
      if (fired.current) return;
      fired.current = true;
      setShow(false);
      window.dispatchEvent(new CustomEvent("site:loaded"));
    };

    const ceiling = setTimeout(finish, CEILING_MS);

    const v = videoRef.current;
    if (v) {
      v.playbackRate = PLAY_RATE;
      const onEnded = () => finish();
      const onPlay = () => {
        v.playbackRate = PLAY_RATE;
      };
      v.addEventListener("ended", onEnded);
      v.addEventListener("play", onPlay);
      return () => {
        clearTimeout(ceiling);
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
          {/* Drifting smoke behind everything — softens the video's rectangle edge */}
          <div className="pointer-events-none absolute inset-0">
            <SmokeCanvas
              density={1.1}
              hue="rgba(220, 130, 60,"
              speed={0.9}
              velocityReactive={false}
            />
          </div>

          {/* Subtle amber radial glow so the spark feels embedded in atmosphere */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,140,60,0.18) 0%, rgba(0,0,0,0) 55%)",
            }}
          />

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
              // 'lighten' drops the dark pixels of the video against
              // the page bg so the spark glows without a visible box.
              style={{ mixBlendMode: "lighten" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative z-10 font-display text-truth-bone/85 text-[20px] md:text-[24px]"
          >
            TRUTH
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
