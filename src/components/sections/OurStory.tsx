"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SplitText from "@/components/ui/SplitText";
import SmokeCanvas from "@/components/ui/SmokeCanvas";

export default function OurStory() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imgKey, setImgKey] = useState(0); // remount WebP on re-entry

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

  /**
   * Desktop video scrub: tie currentTime to scroll position so the
   * book OPENS as the section enters (progress 0 → 0.5) and CLOSES
   * as it leaves (progress 0.5 → 1).
   *
   * Formula: t = 1 - |progress - 0.5| * 2
   *  - progress 0   → t=0 (closed)
   *  - progress 0.5 → t=1 (open)
   *  - progress 1   → t=0 (closed)
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let raf = 0;
    let lastT = -1;
    const tick = () => {
      const p = scrollYProgress.get();
      const t = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
      if (v.duration && !Number.isNaN(v.duration)) {
        const targetTime = t * v.duration;
        // throttle to avoid setting identical times
        if (Math.abs(targetTime - lastT) > 0.02) {
          try {
            v.currentTime = targetTime;
            lastT = targetTime;
          } catch {}
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const onMeta = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    if (v.readyState >= 1) onMeta();
    else v.addEventListener("loadedmetadata", onMeta, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", onMeta);
    };
  }, [scrollYProgress]);

  /**
   * Mobile WebP: re-mount whenever the section ENTERS view, so the
   * looping animation restarts from the beginning. We also unmount
   * on exit so the WebP can replay on the next entry.
   */
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let inView = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.3) {
            if (!inView) {
              inView = true;
              setImgKey((k) => k + 1);
            }
          } else if (e.intersectionRatio < 0.05) {
            inView = false;
          }
        }
      },
      { threshold: [0, 0.05, 0.3, 0.6, 1] }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="story"
      className="relative w-full overflow-hidden py-20 md:py-48"
    >
      {/* Smoke background — fades in/out with scroll */}
      <motion.div
        style={{ opacity: smokeOpacity }}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <SmokeCanvas density={0.85} hue="rgba(216, 199, 163," speed={1} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dust.png"
          alt=""
          className="absolute inset-x-0 top-1/2 mx-auto h-auto w-[110%] max-w-none -translate-y-1/2 mix-blend-screen opacity-50"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-truth-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-truth-black to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <motion.div
          style={{ y: ySlab, scale: slabScale }}
          className="relative aspect-[404/606] w-[78%] max-w-[460px] mx-auto md:w-full"
        >
          {/* Mobile: animated WebP — restarts on each section entry */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={imgKey}
            src="/videos/book.webp"
            alt="Eye of Horus carved book"
            className="block h-full w-full object-contain md:hidden"
            style={{
              filter:
                "drop-shadow(0 14px 28px rgba(201,169,107,0.4)) drop-shadow(0 0 60px rgba(201,169,107,0.15))",
            }}
          />
          {/* Desktop: WebM/MP4 scrubbed by scroll progress */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="hidden h-full w-full object-contain md:block"
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
