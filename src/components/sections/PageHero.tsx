"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

/**
 * Reusable lightweight hero for inner pages.
 * Big display title, optional eyebrow, subtle smoke vignette.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden px-6 pt-32 pb-12 md:pt-40 md:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,107,0.08)_0%,_rgba(0,0,0,0)_60%)]" />
      </div>
      <div className="relative z-10 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 font-body text-[12px] tracking-[0.5em] text-truth-gold uppercase md:text-[14px]"
          >
            {eyebrow}
          </motion.p>
        )}
        <SplitText
          as="h1"
          text={title}
          by="char"
          stagger={0.04}
          duration={0.9}
          delay={0.2}
          className="font-display text-truth-bone text-[56px] leading-[1] md:text-[110px] xl:text-[148px]"
        />
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mx-auto mt-8 max-w-xl font-body text-[16px] text-truth-bone/75 md:text-[18px]"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
