"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";

const events = [
  { name: "DJ Allen", date: "6th December 2025", image: "/images/live-music/14.png" },
  { name: "Selene", date: "12th December 2025", image: "/images/live-music/15.png" },
  { name: "DJ Allen", date: "14th December 2025", image: "/images/live-music/14.png" },
  { name: "Selene", date: "20th December 2025", image: "/images/live-music/15.png" },
  { name: "DJ Allen", date: "21st December 2025", image: "/images/live-music/14.png" },
  { name: "Selene", date: "27th December 2025", image: "/images/live-music/15.png" },
  { name: "DJ Allen", date: "28th December 2025", image: "/images/live-music/14.png" },
  { name: "Selene", date: "31st December 2025", image: "/images/live-music/15.png" },
  { name: "DJ Allen", date: "Every Thursday", image: "/images/live-music/14.png" },
];

export default function LiveMusicPage() {
  return (
    <>
      {/* Hero with crowd photo backdrop */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[70vh] md:min-h-[480px]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/live-music/13.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-truth-black/60 via-truth-black/30 to-truth-black" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-24 text-center">
          <SplitText
            as="h1"
            text="The Night Comes Alive"
            by="word"
            stagger={0.07}
            duration={0.9}
            delay={0.3}
            className="font-display text-truth-bone text-[34px] leading-[1.05] sm:text-[44px] md:text-[80px] xl:text-[100px]"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-6 max-w-[760px] font-body text-[14px] leading-relaxed text-truth-bone/85 md:mt-8 md:text-[18px]"
          >
            Every Friday and Saturday, enjoy live music from 9 PM to 11 PM, flowing
            seamlessly into DJ sets that carry the energy until 3:30 AM. Experience
            evenings of sophistication, rhythm, and excitement, and discover this
            month's curated line-up of performances and sets below.
          </motion.p>
        </div>
      </section>

      {/* 3x3 event grid */}
      <section className="relative px-6 pb-32 pt-12 md:px-10 md:pb-40">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {events.map((e, i) => (
            <EventCard key={`${e.name}-${i}`} event={e} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function EventCard({
  event,
  index,
}: {
  event: { name: string; date: string; image: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.08 + Math.floor(index / 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col items-center gap-5"
    >
      {/* Photo with hover scale */}
      <div className="relative aspect-square w-full overflow-hidden ring-1 ring-truth-gold/15 transition-shadow duration-500 group-hover:ring-truth-gold/60 group-hover:[box-shadow:0_0_60px_-10px_rgba(201,169,107,0.5)]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1100ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: `url('${event.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
      </div>

      {/* Pill caption */}
      <div className="w-full">
        <div className="flex flex-col items-center justify-center rounded-full border border-truth-bone/60 px-6 py-3 transition-colors duration-300 group-hover:border-truth-gold">
          <p className="font-body text-[14px] tracking-[0.3em] uppercase text-truth-bone group-hover:text-truth-gold">
            {event.name}
          </p>
          <p className="mt-1 font-body text-[12px] tracking-[0.25em] uppercase text-truth-bone/60">
            {event.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
