"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const items = [
  { label: "Menu", href: "/menu" },
  { label: "Private Rooms", href: "/private-room" },
  { label: "FAQ's", href: "/faqs" },
];

export default function Categories() {
  return (
    <section id="menu" className="relative hidden pt-2 pb-16 md:block md:pt-4 md:pb-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 md:grid-cols-3 md:gap-8">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            className="flex justify-center"
          >
            <MagneticButton
              href={it.href}
              className="!w-[260px] !px-12 !py-5 !text-[20px] md:!text-[24px]"
              ariaLabel={it.label}
            >
              <span className="block text-center">{it.label}</span>
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
