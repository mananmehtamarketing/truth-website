"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import SplitText from "@/components/ui/SplitText";

const SEVEN_ROOMS_URL =
  "https://www.sevenrooms.com/explore/truth/reservations/create/search/";

// Reusable inline link styled to match the page palette.
function FaqLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="text-truth-gold underline-offset-4 hover:text-truth-bone hover:underline"
    >
      {children}
    </a>
  );
}

const items: { q: string; a: ReactNode }[] = [
  {
    q: "What are your opening hours?",
    a: "Thursday, Friday & Saturday: 6pm – 3:30am (last entry 2:30am).",
  },
  {
    q: "Are you open on bank holidays?",
    a: "Yes, we are open on most bank holidays with extended hours. Follow our Instagram for any holiday-specific updates.",
  },
  {
    q: "Do I need to book in advance?",
    a: "We recommend booking for parties larger than 6 guests. For parties of less than 6 guests, you do not need to make a reservation, you are more than welcome to walk in and our host will find you a table.",
  },
  {
    q: "How can I make a reservation?",
    a: (
      <>
        You can make a booking{" "}
        <FaqLink href={SEVEN_ROOMS_URL} external>
          here
        </FaqLink>
        , email{" "}
        <FaqLink href="mailto:bookings@truth.com">bookings@truth.com</FaqLink>,
        or DM us on Instagram. We confirm within 24 hours.
      </>
    ),
  },
  {
    q: "Can I hire the venue for a private event?",
    a: (
      <>
        Yes. We host private events in{" "}
        <FaqLink href="/private-room">The Horus Room</FaqLink>,{" "}
        <FaqLink href="/private-room">The Obelisk Room</FaqLink>, or full venue
        hire for up to 150 guests. See the{" "}
        <FaqLink href="/private-room">Private Events page</FaqLink> or contact{" "}
        <FaqLink href="mailto:events@truth.com">events@truth.com</FaqLink>.
      </>
    ),
  },
  {
    q: "Where are your toilets located?",
    a: "Through the corridor on the right of the bar.",
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
    a: (
      <>
        Yes. Live music every Saturday from 9pm – 11pm. DJs play Thursday,
        Friday and Saturday from 11pm until 3:30am. See the{" "}
        <FaqLink href="/live-music">Live Music & DJ page</FaqLink> for the full
        lineup.
      </>
    ),
  },
  {
    q: "Is there a dress code?",
    a: "Smart casual at minimum. Truth is a stage — dress with intent. No sportswear, beachwear, caps or hats.",
  },
  {
    q: "Do you take card or cash?",
    a: "We accept all major cards and contactless payments. Please note we do not take American Express. Cash is accepted as well.",
  },
  {
    q: "Where are you located?",
    a: (
      <>
        2 Victoria Terrace, Leamington Spa, CV31 3AB. We are the door to the
        left of The Terrace Restaurant.{" "}
        <FaqLink
          href="https://www.google.com/maps/search/?api=1&query=2+Victoria+Terrace+Leamington+Spa+CV31+3AB"
          external
        >
          Open in Google Maps
        </FaqLink>
        .
      </>
    ),
  },
  {
    q: "Is there nearby parking?",
    a: "Yes, there's public parking which is free after 6pm down towards the police station. Alternatively, there is paid parking during the day and I'd recommend Bath Place Car Park at the back of Majestic Wine just down the road if you're struggling to find a space.",
  },
  {
    q: "Are you near the train station?",
    a: "Yes, we're about a 5-10 minute walk from Leamington Spa Station.",
  },
  {
    q: "Do you run cocktail or wine masterclasses?",
    a: (
      <>
        Yes. Our exclusive cocktail masterclasses are perfect for parties and
        private events. Guests craft three signature cocktails of their own
        with our mixologists. See the{" "}
        <FaqLink href="/private-room">Private Events page</FaqLink> to enquire.
      </>
    ),
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
              <FaqRow
                key={it.q}
                q={it.q}
                a={it.a}
                index={i}
                last={i === items.length - 1}
              />
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
  a: ReactNode;
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
