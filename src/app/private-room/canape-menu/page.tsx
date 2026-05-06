"use client";

import PageHero from "@/components/sections/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CanapeMenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Private Events"
        title="canapé menu"
        subtitle="Buffet & canapé menu — same as The Terrace."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-body text-[16px] leading-relaxed text-truth-bone/85 md:text-[18px]">
            Our canapé and buffet menu is being finalised and will be live
            shortly. The selection mirrors what is on offer at The Terrace
            Restaurant above. Please contact our events team for the latest
            menu and pricing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
            <MagneticButton
              href="mailto:events@truth.com?subject=Canap%C3%A9%20Menu%20Enquiry"
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
