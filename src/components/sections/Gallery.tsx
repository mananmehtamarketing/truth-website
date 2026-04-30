"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TiltCard from "@/components/ui/TiltCard";

const tiles = [
  { src: "/images/3.png", alt: "Signature cocktail on red leather" },
  { src: "/images/4.png", alt: "Private lounge corner" },
  { src: "/images/5.png", alt: "Bar interior glow" },
];

export default function Gallery() {
  return (
    <section className="relative pt-24 pb-10 md:pt-32 md:pb-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 md:grid-cols-3 md:gap-8">
        {tiles.map((t, i) => (
          <Tile key={t.src} src={t.src} alt={t.alt} index={i} />
        ))}
      </div>
    </section>
  );
}

function Tile({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.18]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["-4%", "6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[392/506] w-full"
    >
      <TiltCard className="h-full w-full">
        <div className="grain relative h-full w-full overflow-hidden rounded-[2px] ring-1 ring-truth-gold/15 hover:ring-truth-gold/50 transition">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${src}')`, scale, y: yImg }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <div
            className="pointer-events-none absolute -inset-[1px] opacity-0 transition-opacity duration-500 hover:opacity-100"
            style={{
              boxShadow: "0 0 80px 12px rgba(201,169,107,0.25) inset",
            }}
          />
          <span className="sr-only">{alt}</span>
        </div>
      </TiltCard>
    </motion.div>
  );
}
