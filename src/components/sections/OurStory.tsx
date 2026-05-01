"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitText from "@/components/ui/SplitText";
import SmokeCanvas from "@/components/ui/SmokeCanvas";
import BookScrubber from "@/components/ui/BookScrubber";

export default function OurStory() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ySlab = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["6%", "-2%"]);
  const slabScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);
  const smokeOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.9, 0.9, 0]
  );

  return (
    <section
      ref={ref}
      id="story"
      className="relative w-full overflow-hidden py-20 md:py-48"
    >
      {/* Smoke background — fades in/out with scroll, soft edges so it
          blends seamlessly into the dark page above and below */}
      <motion.div
        style={{ opacity: smokeOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <SmokeCanvas density={0.7} hue="rgba(216, 199, 163," speed={1} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dust.png"
          alt=""
          className="absolute inset-x-0 top-1/2 mx-auto h-auto w-[110%] max-w-none -translate-y-1/2 mix-blend-screen opacity-40"
        />
        {/* Generous top/bottom fades — 35% of section each — so the smoke
            tapers all the way to pure black before meeting neighboring sections */}
        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-truth-black via-truth-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-truth-black via-truth-black/60 to-transparent" />
        {/* Side fades for extra atmospheric falloff on wide screens */}
        <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-truth-black/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-truth-black/80 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
        {/* Book — PNG/WebP frame scrubber tied to scroll. Works on every device. */}
        <motion.div
          style={{ y: ySlab, scale: slabScale }}
          className="relative aspect-[404/606] w-[95%] max-w-[460px] mx-auto md:w-full"
        >
          <BookScrubber
            targetRef={ref}
            style={{
              filter:
                "drop-shadow(0 18px 36px rgba(201,169,107,0.45)) drop-shadow(0 0 80px rgba(201,169,107,0.18))",
            }}
          />
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
