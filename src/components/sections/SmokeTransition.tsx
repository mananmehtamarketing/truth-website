"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SmokeCanvas from "@/components/ui/SmokeCanvas";

/**
 * Cinematic transition band: real dust texture parallaxes across,
 * scroll-velocity-reactive smoke canvas behind, fade vignettes top/bottom.
 */
export default function SmokeTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const xDust = useTransform(scrollYProgress, [0, 1], ["-12%", "10%"]);
  const opacityDust = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0.6, 0.6, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-truth-black"
    >
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <SmokeCanvas density={1} hue="rgba(216, 199, 163," speed={1.1} />
      </motion.div>

      {/* Real dust texture sliding across */}
      <motion.div
        style={{ x: xDust, opacity: opacityDust }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dust.png"
          alt=""
          aria-hidden
          className="mx-auto h-auto w-[90%] max-w-[1400px] mix-blend-screen"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-truth-black via-transparent to-truth-black" />
    </section>
  );
}
