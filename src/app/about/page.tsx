import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import OurStory from "@/components/sections/OurStory";

export const metadata: Metadata = {
  title: "About — Truth",
  description:
    "About Truth: an electric underground cocktail bar and nightclub in Leamington Spa.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="The Story" title="About Us" />

      {/* Welcome / intro paragraph — replaces the previous one-line subtitle */}
      <section className="relative px-6 pb-12 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[860px] text-center">
          <p className="font-body text-[16px] leading-[1.7] text-truth-bone/85 md:text-[20px] md:leading-[1.65]">
            Welcome to Truth: an electric underground cocktail bar and
            nightclub. Step below the surface and you&apos;ll find a space
            created for those who crave more than the ordinary.
          </p>
          <p className="mt-6 font-body text-[16px] leading-[1.7] text-truth-bone/85 md:text-[20px] md:leading-[1.65]">
            Whether you come to be seen, to disappear, or to discover
            something unexpected, Truth offers more than a night out. It&apos;s
            a revelation. This is Truth.
          </p>
        </div>
      </section>

      <OurStory />

      {/* Pillars: Craft, People, Atmosphere — no numbers */}
      <section className="relative px-6 pb-32 md:px-10 md:pb-40">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 md:grid-cols-3">
          <Pillar
            title="Craft"
            body="At the bar, our mixologists create each cocktail with precision and imagination, balancing timeless classics with bold, original creations designed to surprise and delight."
          />
          <Pillar
            title="People"
            body="Bartenders that listen to what you want and deliver every time. At the table, our team delivers refined service as they bring care, attention, and finesse to every moment, ensuring your night feels truly exceptional."
          />
          <Pillar
            title="Atmosphere"
            body="Low light. Warm gold. Shadow that hides what doesn't matter and reveals what does. Revel in a carefully curated line up of outstanding live music and up and coming DJs that keep the energy high until late."
          />
        </div>
      </section>
    </>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative">
      <h3 className="font-display text-[28px] text-truth-bone md:text-[32px]">
        {title}
      </h3>
      <span className="mt-3 block h-px w-12 bg-truth-gold/60" />
      <p className="mt-4 font-body text-[16px] leading-relaxed text-truth-bone/80 md:text-[17px]">
        {body}
      </p>
    </div>
  );
}
