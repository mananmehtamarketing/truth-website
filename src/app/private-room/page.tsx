"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import OrnateCard from "@/components/ui/OrnateCard";

const rooms = [
  {
    title: "The Horus Room",
    body: "Welcome to Truth: an electric underground cocktail bar and nightclub. Step below the surface and you'll find a space created for those who crave more than the ordinary.",
    image: "/images/private-room/9.png",
    video: undefined as string | undefined,
  },
  {
    title: "The Obelisk Room",
    body: "Command the night from The Obelisk Room. Perfect for milestone birthdays, intimate celebrations, or exclusive gatherings, this room offers a setting where every detail is meticulously crafted. Raise your glass to unforgettable nights with bespoke cocktails, and let our team deliver a seamless, elevated experience worthy of the occasion.",
    image: "/images/private-room/10.png",
    video: undefined as string | undefined,
  },
  {
    title: "Cocktail Masterclasses",
    body: "Elevate your night with our exclusive cocktail masterclasses, perfect for parties and private events. Guided by our expert mixologists, you and your guests will learn the art of mixology while crafting three signature cocktails of your own. An intimate, interactive and unforgettable way to celebrate, tailored to bring the energy of Truth to your private occasion.",
    image: "/images/private-room/11.png",
    video: undefined as string | undefined,
  },
];

export default function PrivateRoomPage() {
  return (
    <>
      {/* Split hero: bold display title left, cocktail image right */}
      <section className="relative w-full overflow-hidden px-5 pt-28 pb-12 md:px-10 md:pt-40 md:pb-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-left"
          >
            <SplitText
              as="h1"
              text="An Exclusive Space"
              by="word"
              stagger={0.07}
              duration={0.9}
              delay={0.2}
              className="font-display text-truth-bone text-[34px] leading-[1.05] sm:text-[42px] md:text-[60px] xl:text-[78px]"
            />
            <SplitText
              as="h1"
              text="for Your Celebration"
              by="word"
              stagger={0.07}
              duration={0.9}
              delay={0.55}
              className="font-display text-truth-bone text-[34px] leading-[1.05] sm:text-[42px] md:text-[60px] xl:text-[78px]"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mx-auto mt-6 max-w-[560px] font-body text-[15px] leading-relaxed text-truth-bone/80 md:mx-0 md:mt-8 md:text-[17px]"
            >
              Choose from two intimate private lounges or have exclusive hire of the
              entire venue. Whether it's an elegant gathering with close friends or a
              high-energy celebration for up to 150 guests, our dedicated events team
              delivers flawless service, bespoke cocktails, and an atmosphere charged
              with style and sophistication. At Truth, every detail is designed to
              make your night unforgettable.
            </motion.p>
          </motion.div>

          {/* Hero asset — desktop static PNG, mobile cocktail-fill video full bleed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            // Mobile: break out of parent px padding so the video runs edge-to-edge.
            // Desktop: contained, max-w with side margins.
            className="relative -mx-5 aspect-[9/16] w-screen md:mx-auto md:aspect-[3/4] md:w-full md:max-w-[520px]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_50%_60%,_rgba(201,169,107,0.18),_rgba(0,0,0,0)_60%)]"
            />
            {/* Mobile: luxury beverage pour video — Veo watermark cropped */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/images/private-room/8.png"
              className="relative z-10 block h-full w-full object-cover md:hidden"
            >
              <source src="/videos/luxury-beverage-clean.mp4" type="video/mp4" />
            </video>
            {/* Soft top + bottom fade so the video kisses the dark page on mobile */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-truth-black to-transparent md:hidden"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-truth-black to-transparent md:hidden"
            />

            {/* Desktop: static gloved-hands PNG */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/private-room/8.png"
              alt="Bartender pouring tonic into a cocktail"
              className="relative z-10 hidden h-full w-full object-contain md:block"
            />
          </motion.div>
        </div>
      </section>

      {/* Three ornate room cards */}
      <div className="space-y-12 px-6 pb-32 md:space-y-16 md:px-10">
        {rooms.map((r, i) => (
          <OrnateCard key={r.title} bgImage={r.image} bgVideo={r.video} index={i}>
            <h2 className="font-display text-[22px] uppercase tracking-[0.16em] text-truth-bone sm:text-[26px] md:text-[36px] md:tracking-[0.18em]">
              {r.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[640px] font-body text-[13px] leading-relaxed text-truth-bone/85 sm:text-[14px] md:mt-5 md:text-[17px]">
              {r.body}
            </p>
            <div className="mt-7 flex justify-center">
              <MagneticButton href="/book-now" ariaLabel={`Book ${r.title}`}>
                Book Now
              </MagneticButton>
            </div>
          </OrnateCard>
        ))}
      </div>
    </>
  );
}
