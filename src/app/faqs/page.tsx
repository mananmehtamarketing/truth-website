"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SplitText from "@/components/ui/SplitText";

const items = [
  {
    q: "What are your opening hours?",
    a: "Mon-Thurs 4pm-2am, Fri 3pm-2am, Sat 3pm-3am, Sun 3pm-12am.",
  },
  {
    q: "Are you open on bank holidays?",
    a: "Yes, we are open on most bank holidays with extended hours. Follow our Instagram for any holiday-specific updates.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Reservations are recommended on Friday and Saturday nights. Walk-ins are welcome subject to capacity.",
  },
  {
    q: "How can I make a reservation?",
    a: "Use the Book Now link on this site, email bookings@truth.com, or DM us on Instagram. We confirm within 24 hours.",
  },
  {
    q: "Can I hire the venue for a private event?",
    a: "Yes. We host private events in The Horus Room, The Obelisk Room, or full venue hire for up to 150 guests. See the Private Room page or contact bookings@truth.com.",
  },
  {
    q: "Where are your toilets located?",
    a: "Through the corridor on the right of the bar. Accessible facilities are available on the same level.",
  },
  {
    q: "Do you serve food?",
    a: "Yes, we offer a small plates menu designed to pair with our cocktails. Available throughout the evening.",
  },
  {
    q: "Do you cater to dietary requirements?",
    a: "We have vegetarian, vegan, and gluten-free options. Allergens disclosed on request — please tell your server.",
  },
  {
    q: "Do you have live music or DJs?",
    a: "Yes. Live music every Friday and Saturday from 9pm-11pm, flowing into DJ sets until 3:30am. See the Live Music & DJ page for the full lineup.",
  },
  {
    q: "Is there a dress code?",
    a: "Smart casual at minimum. Truth is a stage — dress with intent. No sportswear or beachwear.",
  },
  {
    q: "Do you take card or cash?",
    a: "We accept all major cards, UPI, and contactless payments. Cash is accepted as well.",
  },
  {
    q: "Where are you located?",
    a: "203, Konyvita, Andheri East, Mumbai, Maharashtra 400093. Tap the map on the homepage for directions.",
  },
  {
    q: "Is there nearby parking?",
    a: "Valet is available on Friday and Saturday evenings. Public parking is steps away on the main road.",
  },
  {
    q: "Are you near the train station?",
    a: "We are a short ride from Andheri station. Most ride-hailing apps drop you directly at our entrance.",
  },
  {
    q: "Do you run cocktail or wine masterclasses?",
    a: "Yes. Our exclusive cocktail masterclasses are perfect for parties and private events. Guests craft three signature cocktails of their own with our mixologists. See the Private Room page to book.",
  },
];

export default function FaqsPage() {
  return (
    <>
      {/* Hero with bar shelf photo backdrop */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/faq/faq-bg.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-truth-black/60 via-truth-black/40 to-truth-black" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-20 text-center">
          <SplitText
            as="h1"
            text="FAQ's"
            by="char"
            stagger={0.06}
            duration={0.9}
            delay={0.3}
            className="font-display text-truth-bone text-[54px] leading-[1] sm:text-[80px] md:text-[120px] xl:text-[150px]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-4 font-body text-[16px] tracking-[0.32em] uppercase text-truth-bone/75"
          >
            Frequently Asked Questions
          </motion.p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="relative px-6 pb-32 pt-12 md:px-10 md:pb-40">
        <div className="mx-auto max-w-[920px]">
          <ul className="border-y border-truth-bone/15">
            {items.map((it, i) => (
              <FaqRow key={it.q} {...it} index={i} last={i === items.length - 1} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function FaqRow({
  q,
  a,
  index,
  last,
}: {
  q: string;
  a: string;
  index: number;
  last: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li className={last ? "" : "border-b border-truth-bone/15"}>
      <motion.button
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.04 }}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-center md:py-7"
        aria-expanded={open}
      >
        <span aria-hidden className="w-9 shrink-0" />
        <span className="flex-1 text-center font-body text-[15px] leading-tight text-truth-bone sm:text-[17px] md:text-[22px]">
          {q}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center text-truth-bone transition-transform duration-500 ${
            open ? "rotate-45 text-truth-gold" : ""
          }`}
          aria-hidden
        >
          <svg width="22" height="22" viewBox="0 0 22 22">
            <path
              d="M11 2 V 20 M 2 11 H 20"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mx-auto max-w-[680px] pb-6 text-center font-body text-[15px] leading-relaxed text-truth-bone/80 md:text-[17px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
