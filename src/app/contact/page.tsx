"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import PageHero from "@/components/sections/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";

const emails = [
  { label: "General", value: "info@truth.com" },
  { label: "Bookings", value: "bookings@truth.com" },
  { label: "Careers", value: "careers@truth.com" },
];

const hours = [
  ["Mon-Thurs", "4pm – 2am"],
  ["Friday", "3pm – 2am"],
  ["Saturday", "3pm – 3am"],
  ["Sunday", "3pm – 12am"],
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Reach Out"
        title="contact"
        subtitle="Tell us when you're coming, or tell us what you need."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* Left: details */}
          <div className="space-y-10">
            <Block title="Connect">
              <ul className="space-y-3">
                {emails.map((e) => (
                  <li key={e.value}>
                    <p className="font-body text-[12px] tracking-[0.3em] uppercase text-truth-bone/50">
                      {e.label}
                    </p>
                    <a
                      href={`mailto:${e.value}`}
                      className="font-body text-[18px] text-truth-bone hover:text-truth-gold"
                    >
                      {e.value}
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Hours">
              <ul className="space-y-2">
                {hours.map(([d, h]) => (
                  <li key={d} className="flex justify-between gap-6 font-body text-[16px] text-truth-bone/85">
                    <span className="text-truth-bone/65">{d}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Location">
              <p className="font-body text-[16px] text-truth-bone/85">
                London, United Kingdom
              </p>
              <a
                href="https://maps.google.com/?q=Truth+Cocktail+Bar+London"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block font-body text-[14px] tracking-[0.2em] uppercase text-truth-gold hover:text-truth-bone"
              >
                Open in Google Maps →
              </a>
            </Block>
          </div>

          {/* Right: form */}
          <div>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-6"
              >
                <Field label="Your Name" name="name" type="text" />
                <Field label="Email" name="email" type="email" />
                <Field label="Subject" name="subject" type="text" />
                <Field label="Message" name="message" type="textarea" />
                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[17px] border border-truth-gold/70 bg-transparent px-8 py-5 font-body text-[18px] tracking-wide text-truth-bone transition-colors hover:text-truth-black"
                >
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 -translate-x-full bg-truth-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="rounded-md border border-truth-gold/30 bg-truth-gold/5 p-10 text-center"
              >
                <h2 className="font-display text-[36px] text-truth-gold">Received.</h2>
                <p className="mt-3 font-body text-[16px] text-truth-bone/85">
                  We'll be in touch shortly.
                </p>
                <div className="mt-8 flex justify-center">
                  <MagneticButton href="/">Back to Home</MagneticButton>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-body text-[14px] font-bold uppercase tracking-[0.3em] text-truth-bone/70">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  if (type === "textarea") {
    return (
      <label className="block">
        <span className="mb-2 block font-body text-[12px] tracking-[0.3em] uppercase text-truth-bone/65">
          {label}
        </span>
        <textarea
          name={name}
          rows={5}
          required
          className="w-full resize-none border-b border-truth-gold/30 bg-transparent py-3 font-body text-[18px] text-truth-bone placeholder:text-truth-bone/30 focus:border-truth-gold focus:outline-none"
        />
      </label>
    );
  }
  return (
    <label className="block">
      <span className="mb-2 block font-body text-[12px] tracking-[0.3em] uppercase text-truth-bone/65">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required
        className="w-full border-b border-truth-gold/30 bg-transparent py-3 font-body text-[18px] text-truth-bone placeholder:text-truth-bone/30 focus:border-truth-gold focus:outline-none"
        style={{ colorScheme: "dark" }}
      />
    </label>
  );
}
