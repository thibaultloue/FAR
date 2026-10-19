import { createStudioDeck } from "../createStudioDeck.js";

export function buildFgcPicardDeck() {
  return createStudioDeck({
    id: "fgc-picard",
    title: "Créer ensemble une glace gourmande",
    exportName: "Picard_x_FastGoodCuisine",
    theme: "ivory",
    themeOverrides: { accent: "#174783" },
    readerChrome: "auto",
    slides: [
      { id: "cover", layout: "fgcPicardCover", title: "Picard × FastGoodCuisine" },
      { id: "createur", layout: "fgcPicardCreator", title: "FastGoodCuisine" },
      { id: "produit", layout: "fgcPicardProduct", title: "Le produit" },
      { id: "distribution", layout: "fgcPicardDistribution", title: "La distribution" },
      { id: "amplification", layout: "fgcPicardAmplification", title: "L’amplification" },
      { id: "next-steps", layout: "fgcPicardNext", title: "Next steps" },
    ],
  });
}

export const fgcPicardDeck = buildFgcPicardDeck();
