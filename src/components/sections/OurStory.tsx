"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/ui/SplitText";
import SmokeCanvas from "@/components/ui/SmokeCanvas";

export default function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ySlab = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["6%", "-2%"]);
  const slabScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);
  // Smoke fades in as the section enters and out as it leaves
  const smokeOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.9, 0.9, 0]
  );

  /**
   * Play the book video exactly once, when the section is fully on screen.
   * Subsequent re-entries do not replay.
   */
  useEffect(() => {
    const v = videoRef.current;
    const node = ref.current;
    if (!v || !node) return;

    v.muted = true;
    v.loop = false;
    v.playsInline = true;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Threshold ≈ 0.85 means "section is mostly in view"
          if (e.isIntersecting && e.intersectionRatio >= 0.6 && !hasPlayed) {
            v.currentTime = 0;
            v.play().catch(() => {});
            setHasPlayed(true);
            io.disconnect();
          }
        }
      },
      { threshold: [0, 0.3, 0.6, 0.85, 1] }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [hasPlayed]);

  return (
    <section
      ref={ref}
      id="story"
      className="relative w-full overflow-hidden py-20 md:py-48"
    >
      {/* Smoke as the section's background — fades in/out with the scroll */}
      <motion.div
        style={{ opacity: smokeOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <SmokeCanvas density={0.85} hue="rgba(216, 199, 163," speed={1} />
        {/* Real dust drift over canvas particles */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dust.png"
          alt=""
          className="absolute inset-x-0 top-1/2 mx-auto h-auto w-[110%] max-w-none -translate-y-1/2 mix-blend-screen opacity-50"
        />
        {/* Soft top + bottom fade so it kisses neighboring sections */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-truth-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-truth-black to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
        {/* Book video — transparent WebM, drop-shadow follows the actual book shape */}
        <motion.div
          style={{ y: ySlab, scale: slabScale }}
          className="relative aspect-[404/606] w-[78%] max-w-[460px] mx-auto md:w-full"
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="block h-full w-full object-contain"
            style={{
              filter:
                "drop-shadow(0 18px 36px rgba(201,169,107,0.45)) drop-shadow(0 0 80px rgba(201,169,107,0.18))",
            }}
          >
            <source src="/videos/book.webm" type="video/webm" />
            <source src="/videos/book.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div style={{ y: yText }} className="relative">
          <SplitText
            as="h2"
            text="OUR STORY"
            by="char"
            stagger={0.04}
            duration={0.7}
            className="font-body text-truth-bone text-[24px] font-semibold tracking-[0.32em] md:text-[30px]"
          />
          <div className="mt-8 space-y-6 font-body text-[18px] leading-[1.65] text-truth-bone/85 md:text-[20px]">
            <Paragraph
              text={`Horus, the sky god, fought his uncle Seth in a cosmic battle for order against chaos. Seth tore Horus's eye to pieces, scattering it across the realm.`}
            />
            <Paragraph
              text={`But Thoth, the god of wisdom, restored it. Piece by piece, he made it whole again. And in that restoration, it became something more.`}
            />
            <Paragraph
              text={`A symbol of healing, wholeness and clarity regained.`}
              accent
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Paragraph({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <SplitText
      as="p"
      text={text}
      by="word"
      stagger={0.02}
      duration={0.8}
      className={accent ? "text-truth-gold" : ""}
    />
  );
}
