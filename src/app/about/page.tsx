import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import OurStory from "@/components/sections/OurStory";
import SmokeTransition from "@/components/sections/SmokeTransition";

export const metadata: Metadata = {
  title: "About — Truth",
  description:
    "About Truth: an underground cocktail bar and nightclub in London.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The Story"
        title="about us"
        subtitle="We built Truth for the ones who want the night to mean something."
      />
      <OurStory />
      <section className="relative px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 md:grid-cols-3">
          <Pillar
            n="01"
            title="Craft"
            body="Every drink is a small piece of architecture. Built ingredient by ingredient, balanced and felt before it's poured."
          />
          <Pillar
            n="02"
            title="Atmosphere"
            body="Low light. Warm gold. Shadow that hides what doesn't matter and reveals what does."
          />
          <Pillar
            n="03"
            title="People"
            body="A team that knows your name by the second visit and your drink by the third."
          />
        </div>
      </section>
      <SmokeTransition />
    </>
  );
}

function Pillar({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="relative">
      <p className="font-display text-[60px] leading-none text-truth-gold/35">
        {n}
      </p>
      <h3 className="mt-3 font-display text-[28px] text-truth-bone">{title}</h3>
      <p className="mt-3 font-body text-[16px] leading-relaxed text-truth-bone/75">
        {body}
      </p>
    </div>
  );
}
