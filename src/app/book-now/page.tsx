"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/sections/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";

export default function BookNowPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Reserve Your Night"
        title="book now"
        subtitle="Tell us when you're coming. We'll save you a place at the bar."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[680px]">
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <Field label="Full Name" name="name" type="text" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Field label="Date" name="date" type="date" />
                <Field label="Time" name="time" type="time" />
                <Field label="Party Size" name="size" type="number" />
              </div>
              <Field label="Special Requests (optional)" name="notes" type="textarea" />
              <div className="pt-4">
                <button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[17px] border border-truth-gold/70 bg-transparent px-8 py-5 font-body text-[18px] tracking-wide text-truth-bone transition-colors hover:text-truth-black"
                >
                  <span className="relative z-10">Send Reservation Request</span>
                  <span className="absolute inset-0 -translate-x-full bg-truth-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </button>
              </div>
              <p className="text-center font-body text-[12px] tracking-[0.25em] uppercase text-truth-bone/40">
                We'll confirm by email within 24 hours
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-md border border-truth-gold/30 bg-truth-gold/5 p-10 text-center"
            >
              <h2 className="font-display text-[42px] text-truth-gold">
                The night awaits.
              </h2>
              <p className="mt-4 font-body text-[18px] text-truth-bone/85">
                We've received your request. A confirmation will land in your inbox shortly.
              </p>
              <div className="mt-8 flex justify-center">
                <MagneticButton href="/">Back to Home</MagneticButton>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  if (type === "textarea") {
    return (
      <label className="block">
        <span className="mb-2 block font-body text-[12px] tracking-[0.3em] uppercase text-truth-bone/65">
          {label}
        </span>
        <textarea
          name={name}
          rows={4}
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
        required={type !== "tel" && name !== "notes"}
        min={type === "number" ? 1 : undefined}
        className="w-full border-b border-truth-gold/30 bg-transparent py-3 font-body text-[18px] text-truth-bone placeholder:text-truth-bone/30 focus:border-truth-gold focus:outline-none"
        style={{ colorScheme: "dark" }}
      />
    </label>
  );
}
