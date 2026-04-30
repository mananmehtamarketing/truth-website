"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Splits by word (default) or character */
  by?: "word" | "char";
  once?: boolean;
};

export default function SplitText({
  text,
  as = "p",
  className = "",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  by = "word",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.3 });
  const Tag = as as any;

  const tokens =
    by === "word"
      ? text.split(/(\s+)/)
      : Array.from(text);

  const variants: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: {
        delay: delay + i * stagger,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok))
          return (
            <span key={i} aria-hidden>
              {tok}
            </span>
          );
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            aria-hidden
          >
            <motion.span
              className="inline-block will-change-transform"
              custom={i}
              variants={variants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
            >
              {tok}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
