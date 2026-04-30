"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Welcome() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const yImg = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, 0]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;

  return (
    <section ref={ref} id="book" className="relative w-full overflow-hidden">
      <div className="relative h-[80vh] min-h-[560px] w-full md:h-[110vh] md:min-h-[820px]">
        <motion.div
          style={{ scale, y: yImg, filter }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/2.png')" }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-truth-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-truth-black to-transparent" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
          <div className="max-w-[820px] text-center">
            <SplitText
              as="p"
              text="Welcome to Truth: an electric underground cocktail bar and nightclub. Step below the surface and you'll find a space created for those who crave more than the ordinary."
              by="word"
              stagger={0.025}
              duration={0.8}
              className="font-body text-truth-bone text-[15px] leading-[1.55] sm:text-[18px] md:text-[26px] md:leading-[1.5]"
            />
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-10 flex justify-center"
            >
              <MagneticButton href="/book-now" ariaLabel="Book Now">
                Book Now
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
