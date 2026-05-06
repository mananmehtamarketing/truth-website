"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const SEVEN_ROOMS_URL =
  "https://www.sevenrooms.com/explore/truth/reservations/create/search/";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Home Page", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Book Now", href: SEVEN_ROOMS_URL, external: true },
  { label: "Private Events", href: "/private-room" },
  { label: "FAQ's", href: "/faqs" },
  { label: "Live Music & DJ", href: "/live-music" },
  { label: "Contact", href: "/contact" },
  { label: "Terms & Conditions", href: "/" },
];

const hours = [
  ["Thursday", "6pm – 3:30am"],
  ["Friday", "6pm – 3:30am"],
  ["Saturday", "6pm – 3:30am"],
];

const emails = ["info@truth.com", "bookings@truth.com", "careers@truth.com"];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full px-3 pb-8 pt-4 md:px-8 md:pb-16 md:pt-6"
    >
      <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[36px] bg-truth-black ring-1 ring-truth-gold/15 md:rounded-[61px]">
        {/* Right hero photo */}
        <div className="relative grid grid-cols-1 md:grid-cols-[1.4fr_1fr]">
          <div className="relative px-6 py-10 md:px-16 md:py-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9 }}
              className="font-display text-[28px] leading-tight text-truth-bone sm:text-[34px] md:text-[56px] xl:text-[69px]"
            >
              Where the Night Reveals
              <br />
              What Lies Beneath
            </motion.h3>

            <div className="mt-8 grid grid-cols-2 gap-6 md:mt-10 md:grid-cols-3 md:gap-10">
              {/* nav */}
              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="space-y-1.5 font-body text-[14px] text-truth-bone/85 sm:text-[15px] md:space-y-2 md:text-[18px]"
              >
                {navLinks.map((l) => (
                  <motion.li
                    key={l.label}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 },
                    }}
                  >
                    <a
                      href={l.href}
                      className="hover:text-truth-gold"
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTAs — stacked on mobile, full column on desktop */}
              <div className="flex flex-col items-start gap-3 md:gap-4">
                <MagneticButton className="!w-full !px-4 !py-2.5 !text-[14px] sm:!w-auto sm:!px-8 sm:!py-3 sm:!text-[16px]" ariaLabel="Event Team">
                  Event Team
                </MagneticButton>
                <MagneticButton className="!w-full !px-4 !py-2.5 !text-[14px] sm:!w-auto sm:!px-8 sm:!py-3 sm:!text-[16px]" ariaLabel="Menu">
                  Menu
                </MagneticButton>
                <MagneticButton className="!w-full !px-4 !py-2.5 !text-[14px] sm:!w-auto sm:!px-8 sm:!py-3 sm:!text-[16px]" ariaLabel="Brochure">
                  Brochure
                </MagneticButton>
              </div>

              {/* Hours + Location + Map — right-aligned on desktop */}
              <div className="col-span-2 md:col-span-1 md:text-right md:space-y-8">
                <div>
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.3em] text-truth-bone/90 md:text-[14px]">
                    Hours
                  </p>
                  <ul className="mt-2 space-y-0.5 font-body text-[13px] text-truth-bone/85 md:mt-3 md:space-y-1 md:text-[16px]">
                    {hours.map(([d, h]) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col md:flex-row md:justify-end md:gap-4"
                      >
                        <span className="text-truth-bone/70">{d}</span>
                        <span>{h}</span>
                      </motion.li>
                    ))}
                    <li className="pt-1 text-truth-bone/60 italic md:text-[14px]">
                      Last entry 2:30am
                    </li>
                  </ul>
                </div>

                <div className="mt-6 md:mt-0">
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.3em] text-truth-bone/90 md:text-[14px]">
                    Location
                  </p>
                  <p className="mt-2 font-body text-[14px] text-truth-bone/85 md:text-[16px]">
                    2 Victoria Terrace,
                    <br />
                    Leamington Spa, CV31 3AB
                    <br />
                    <span className="text-truth-bone/65 italic">
                      Below The Terrace Restaurant
                    </span>
                  </p>
                </div>

                <div className="mt-6 md:mt-0 md:flex md:justify-end">
                  <motion.a
                    href="https://www.google.com/maps/search/?api=1&query=2+Victoria+Terrace+Leamington+Spa+CV31+3AB"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="relative block aspect-[365/200] w-full max-w-[365px] overflow-hidden rounded-[10px] ring-1 ring-truth-gold/30"
                  >
                    <iframe
                      title="Truth Leamington Spa map"
                      src="https://www.google.com/maps?q=2+Victoria+Terrace,+Leamington+Spa,+CV31+3AB&output=embed"
                      className="absolute inset-0 h-full w-full grayscale-[40%] contrast-110"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 font-body text-[12px] tracking-widest text-truth-bone/80 uppercase">
                      Open in Google Maps
                    </div>
                  </motion.a>
                </div>

                <div className="mt-6 md:mt-0">
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.3em] text-truth-bone/90 md:text-[14px]">
                    Connect
                  </p>
                  <ul className="mt-2 space-y-0.5 font-body text-[13px] text-truth-bone/85 md:mt-3 md:space-y-1 md:text-[16px]">
                    {emails.map((e) => (
                      <li key={e}>
                        <a href={`mailto:${e}`} className="break-all hover:text-truth-gold">
                          {e}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* socials */}
            <div className="mt-10 flex items-center gap-5">
              {["instagram", "whatsapp", "x", "facebook"].map((s, i) => (
                <motion.a
                  key={s}
                  href="#"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.05 * i }}
                  whileHover={{ y: -3 }}
                  aria-label={s}
                  className="grid h-12 w-12 place-items-center rounded-full ring-1 ring-truth-gold/40 text-truth-bone hover:text-truth-gold hover:ring-truth-gold"
                >
                  <SocialIcon name={s} />
                </motion.a>
              ))}
            </div>

            <p className="mt-12 font-body text-[12px] tracking-[0.3em] uppercase text-truth-bone/40">
              © {new Date().getFullYear()} Truth Leamington Spa. All rights reserved.
            </p>
          </div>

          {/* photo column */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="relative hidden md:block"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/6.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-truth-black/0 to-truth-black" />
            <div className="absolute inset-0 bg-gradient-to-t from-truth-black via-transparent to-truth-black" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "instagram")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  if (name === "whatsapp")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21l1.7-5.1A8.5 8.5 0 1 0 8 18.7L3 21z" />
        <path d="M8.5 9c.3 1.3 1.2 2.7 2.4 3.8 1.2 1.1 2.6 1.9 3.9 2.1l1.6-1.5-2.4-1-1.4 1c-.6-.4-1.4-1.1-1.9-1.7-.5-.5-1-1.3-1.4-1.9l1-1.4-1-2.4L7.8 7" />
      </svg>
    );
  if (name === "x")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 3h3l-7.5 8.6L22 21h-6.6l-5.2-6.4L4.3 21H1.3l8-9.2L1 3h6.7l4.7 5.9L18 3z" />
      </svg>
    );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.4-2 2-2h2V2h-3.2C11 2 9.5 3.5 9.5 6v4H6v4h3.5v8H13z" />
    </svg>
  );
}
