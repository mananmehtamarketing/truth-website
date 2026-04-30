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
        title="menu"
        subtitle="Cocktails crafted in shadow and gold. Each glass a small ritual, each ingredient chosen with intent."
      />

      <section className="relative px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {cocktails.map((c, i) => (
            <CocktailCard key={c.name} c={c} index={i} />
          ))}
        </div>

        <p className="mx-auto mt-20 max-w-xl text-center font-body text-[14px] tracking-[0.2em] uppercase text-truth-bone/50">
          A new menu is poured every season. Last update, Spring 2026.
        </p>
      </section>
    </>
  );
}
