"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const links = [
  { label: "BOOK NOW", href: "/book-now" },
  { label: "PRIVATE EVENTS", href: "/private-room" },
  { label: "MENU", href: "/menu" },
];
const linksRight = [
  { label: "LIVE MUSIC & DJ", href: "/live-music" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lenis:scroll" as any, onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lenis:scroll" as any, onScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-truth-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        {/* Mobile: hamburger */}
        <button
          aria-label="Open menu"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="block h-[2px] w-7 bg-truth-bone" />
          <span className="mt-[6px] block h-[2px] w-7 bg-truth-bone" />
          <span className="mt-[6px] block h-[2px] w-5 bg-truth-bone" />
        </button>

        <nav className="hidden flex-1 items-center justify-between font-body text-[14px] uppercase tracking-[0.18em] text-truth-bone md:flex">
          <ul className="flex flex-1 items-center justify-end gap-10">
            {links.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </ul>
          <Crest />
          <ul className="flex flex-1 items-center justify-start gap-10">
            {linksRight.map((l) => (
              <NavLink key={l.label} {...l} />
            ))}
          </ul>
        </nav>

        {/* Mobile centered crest */}
        <div className="md:hidden">
          <Crest small />
        </div>
        <div className="md:hidden" aria-hidden style={{ width: 24 }} />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-truth-black/95 px-8 text-center font-display text-3xl text-truth-bone"
          >
            <button
              aria-label="Close menu"
              className="absolute right-6 top-6 text-truth-gold"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            {[...links, ...linksRight].map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.05 * i } }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-truth-gold"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group relative inline-block py-2 hover:text-truth-gold"
      >
        <span>{label}</span>
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-truth-gold transition-transform duration-500 group-hover:scale-x-100" />
      </Link>
    </li>
  );
}

function Crest({ small = false }: { small?: boolean }) {
  // Real Figma crest, scaled up. Drop /public/images/logo-crest.png (or .gif/.webm)
  // when you're ready and it'll auto-replace if named identically.
  return (
    <Link
      href="/"
      aria-label="Truth home"
      className={`group mx-8 flex items-center justify-center ${
        small ? "scale-90" : ""
      }`}
    >
      <span
        className="block transition-transform duration-500 group-hover:rotate-[6deg]"
        style={{
          filter: "drop-shadow(0 0 18px rgba(201,169,107,0.5))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-crest.svg"
          alt="Truth"
          width={small ? 64 : 104}
          height={small ? 64 : 104}
          className={`block ${
            small ? "h-[64px] w-[64px]" : "h-[88px] w-[88px] md:h-[104px] md:w-[104px]"
          }`}
          style={{ aspectRatio: "1 / 1", objectFit: "contain" }}
        />
      </span>
    </Link>
  );
}
