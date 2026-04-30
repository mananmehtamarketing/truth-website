"use client";

import { motion } from "framer-motion";

/**
 * Egyptian / art-deco ornate gold-frame card with notched corners.
 * Accepts either a still image OR a looping video as the background.
 */
type Props = React.PropsWithChildren<{
  bgImage: string;
  bgVideo?: string;
  index?: number;
  className?: string;
}>;

export default function OrnateCard({
  bgImage,
  bgVideo,
  children,
  index = 0,
  className = "",
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      {/* Full-width photo / video backdrop */}
      <div className="relative aspect-[3/4] w-full sm:aspect-[16/9] md:aspect-[16/7]">
        {bgVideo ? (
          <video
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-black/55" />

        {/* Ornate gold-frame card centered over the photo */}
        <div className="absolute inset-0 grid place-items-center px-6">
          <div className="relative w-full max-w-[820px]">
            <Frame />
            <div className="relative z-10 px-8 py-10 text-center md:px-16 md:py-14">
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Frame() {
  return (
    <svg
      viewBox="0 0 820 360"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full text-truth-gold/85"
      aria-hidden
    >
      <path
        d="
          M 30 8
          Q 30 2 36 2
          L 80 2
          Q 92 2 92 14
          L 92 22
          L 728 22
          L 728 14
          Q 728 2 740 2
          L 784 2
          Q 790 2 790 8
          L 790 32
          Q 790 44 778 44
          L 772 44
          L 772 316
          L 778 316
          Q 790 316 790 328
          L 790 352
          Q 790 358 784 358
          L 740 358
          Q 728 358 728 346
          L 728 338
          L 92 338
          L 92 346
          Q 92 358 80 358
          L 36 358
          Q 30 358 30 352
          L 30 328
          Q 30 316 42 316
          L 48 316
          L 48 44
          L 42 44
          Q 30 44 30 32
          Z
        "
        fill="rgba(0,0,0,0.45)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
