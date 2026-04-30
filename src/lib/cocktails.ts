export type Cocktail = {
  name: string;
  ingredients: string[];
  image: string;
  description?: string;
};

/**
 * Cocktail menu. The Figma uses the same hero photo across all 9 cards
 * (THE DELUSIONIST). Names + ingredients are placeholder; swap when the
 * real menu copy is ready.
 */
const HERO = "/images/menu/menu-bg.png";

export const cocktails: Cocktail[] = [
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
  {
    name: "The Delusionist",
    ingredients: ["Mezcal", "Tequila", "Cointreau", "Dill", "Jalapeño", "Maple", "Citrus", "Chlorophyll"],
    image: HERO,
  },
];
