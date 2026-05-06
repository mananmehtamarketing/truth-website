"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/ui/SplitText";
import SmokeCanvas from "@/components/ui/SmokeCanvas";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yHead = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    let timeout: any;
    const onLoaded = () => setReady(true);
    window.addEventListener("site:loaded" as any, onLoaded);
    timeout = setTimeout(() => setReady(true), 3500);
    return () => {
      window.removeEventListener("site:loaded" as any, onLoaded);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-truth-black"
    >
      {/* Parallax background photo */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 -z-10 [filter:contrast(1.05)_saturate(0.95)]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/1.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_30%,_rgba(0,0,0,0.85)_100%)]" />
      </motion.div>

      <SmokeCanvas className="opacity-70" density={0.6} hue="rgba(180, 130, 80," />

      {/* Neon "COCKTAILS" stack — top-right desktop, smaller and tucked on mobile */}
      <div className="pointer-events-none absolute right-3 top-[12%] flex flex-col gap-1 sm:right-6 sm:top-[16%] md:right-14 md:top-[20%] md:gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: "easeOut" }}
            className="font-display text-[18px] tracking-[0.18em] text-truth-neon sm:text-[24px] md:text-[38px] md:tracking-[0.22em]"
            style={{
              textShadow:
                "0 0 6px #ff2d2d, 0 0 18px #ff2d2d, 0 0 36px rgba(255,45,45,0.8)",
            }}
          >
            <span className="animate-flicker">COCKTAILS</span>
          </motion.span>
        ))}
      </div>

      {/* Headline */}
      <motion.div
        style={{ y: yHead, opacity }}
        className="relative z-10 flex h-full w-full items-center justify-center px-5 text-center"
      >
        <div className="max-w-[1100px] pt-16 sm:pt-0">
          {ready && (
            <>
              <SplitText
                as="h1"
                text="Where the Night Reveals"
                by="word"
                stagger={0.09}
                duration={1}
                delay={0.15}
                className="font-display text-truth-bone text-[34px] leading-[1.05] sm:text-[52px] md:text-[88px] xl:text-[120px]"
              />
              <SplitText
                as="h1"
                text="What Lies Beneath"
                by="word"
                stagger={0.09}
                duration={1}
                delay={0.7}
                className="font-display text-truth-bone text-[34px] leading-[1.05] sm:text-[52px] md:text-[88px] xl:text-[120px]"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mx-auto mt-5 max-w-md font-body text-[11px] tracking-[0.28em] text-truth-bone/70 sm:text-[13px] md:text-[15px] md:tracking-[0.3em]"
              >
                UNDERGROUND COCKTAIL BAR & NIGHTCLUB  •  LEAMINGTON SPA
              </motion.p>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.9, duration: 0.6 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-truth-bone/60"
      >
        <div className="flex flex-col items-center gap-2 font-body text-[10px] tracking-[0.4em] uppercase md:text-[11px]">
          <span>Scroll</span>
          <span
            aria-hidden
            className="block h-8 w-px bg-gradient-to-b from-truth-gold to-transparent animate-scrollHint md:h-10"
          />
        </div>
      </motion.div>
    </section>
  );
}
