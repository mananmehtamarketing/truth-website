"use client";

import PageHero from "@/components/sections/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";

export default function DrinkPackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Events"
        title="drink packages"
        subtitle="Curated drink packages for your private celebration."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-body text-[16px] leading-relaxed text-truth-bone/85 md:text-[18px]">
            Our drink package menu is being finalised and will be live shortly.
            In the meantime, please get in touch with our events team and we
            will share the latest options tailored to your celebration.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <MagneticButton
              href="mailto:events@truth.com?subject=Drink%20Packages%20Enquiry"
              ariaLabel="Email Events Team"
            >
              Email Events Team
            </MagneticButton>
            <MagneticButton href="/private-room" ariaLabel="Back to Private Events">
              Back to Private Events
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
