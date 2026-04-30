"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import type { Cocktail } from "@/lib/cocktails";

/**
 * Cocktail card with Egyptian/art-deco corner notches, hover zoom
 * on the photo, and a gold-lit frame on hover.
 */
export default function CocktailCard({
  c,
  index,
}: {
  c: Cocktail;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.1 + Math.floor(index / 3) * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <TiltCard max={5}>
        <div className="group relative aspect-[3/4] w-full overflow-hidden bg-[#0d0808] ring-1 ring-truth-gold/20 transition-shadow duration-500 hover:ring-truth-gold/70 hover:[box-shadow:0_0_60px_-10px_rgba(201,169,107,0.6)]">
          {/* Background photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            style={{ backgroundImage: `url('${c.image}')` }}
          />
          {/* Dark overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

          {/* Decorative corner ornaments */}
          <CornerOrnament className="left-0 top-0" />
          <CornerOrnament className="right-0 top-0 [transform:scaleX(-1)]" />
          <CornerOrnament className="bottom-0 left-0 [transform:scaleY(-1)]" />
          <CornerOrnament className="bottom-0 right-0 [transform:scale(-1,-1)]" />

          {/* Title + ingredients */}
          <div className="relative z-10 flex h-full flex-col justify-start p-6">
            <h3 className="font-display text-[28px] uppercase leading-tight text-truth-gold md:text-[34px]">
              {c.name}
            </h3>
            <p className="mt-3 font-body text-[11px] uppercase tracking-[0.16em] text-truth-bone/85 md:text-[12px]">
              {c.ingredients.map((i, idx) => (
                <span key={idx}>
                  {i}
                  {idx < c.ingredients.length - 1 && (
                    <span className="mx-1.5 text-truth-gold/60">|</span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Gold scan line on hover */}
          <span
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(115deg, rgba(201,169,107,0) 30%, rgba(201,169,107,0.18) 50%, rgba(201,169,107,0) 70%)",
            }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-10 w-10 ${className}`}
    >
      <svg viewBox="0 0 40 40" className="text-truth-gold/70">
        <path
          d="M2 18 L 2 2 L 18 2 M 2 14 L 14 2 M 6 2 L 2 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
