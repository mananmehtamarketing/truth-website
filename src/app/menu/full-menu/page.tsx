"use client";

import PageHero from "@/components/sections/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FullMenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Truth"
        title="Full Menu"
        subtitle="The complete cocktail and drinks menu, in full."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-body text-[16px] leading-relaxed text-truth-bone/85 md:text-[18px]">
            The complete menu is being finalised and will be live shortly.
            In the meantime, please reach out and our team will share the
            current line-up.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <MagneticButton
              href="mailto:info@truth.com?subject=Full%20Menu%20Request"
              ariaLabel="Email for menu"
            >
              Email Us
            </MagneticButton>
            <MagneticButton href="/menu" ariaLabel="Back to Menu">
              Back to Menu
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
