import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CocktailCard from "@/components/ui/CocktailCard";
import { cocktails } from "@/lib/cocktails";

export const metadata: Metadata = {
  title: "Menu — Truth",
  description:
    "The Truth cocktail menu: signature drinks crafted by our bartenders. Mezcal, gin, smoked spirits, and more.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="The Truth Cellar"
        title="Menu"
        subtitle="Cocktails crafted in shadow and gold. Each glass a small ritual, each ingredient chosen with intent."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {cocktails.map((c, i) => (
            <CocktailCard key={c.name} c={c} index={i} />
          ))}
        </div>

        <div className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-4">
          <a
            href="/menu/full-menu"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-[17px] border border-truth-gold/70 bg-transparent px-10 py-4 font-body text-[16px] tracking-[0.18em] uppercase text-truth-bone transition-colors hover:text-truth-black md:text-[17px]"
          >
            <span className="relative z-10">View Full Menu</span>
            <span className="absolute inset-0 -translate-x-full bg-truth-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </a>
          <p className="text-center font-body text-[12px] tracking-[0.25em] uppercase text-truth-bone/40">
            Full menu coming soon
          </p>
        </div>

        <p className="mx-auto mt-20 max-w-xl text-center font-body text-[14px] tracking-[0.2em] uppercase text-truth-bone/50">
          A new menu is poured every season. Last update, Spring 2026.
        </p>
      </section>
    </>
  );
}
