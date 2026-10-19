import { createStudioDeck } from "../createStudioDeck.js";
import { asset } from "../asset.js";
import { CHARLES_FOOD, LOGOS, PARRAINS, PEOPLE, PHOTOS } from "./fgcBpPremierResto.assets.js";

if (typeof window !== "undefined") {
  [CHARLES_FOOD, ...Object.values(PHOTOS), ...Object.values(PEOPLE), ...Object.values(PARRAINS)].forEach((photo) => {
    const img = new Image();
    img.src = asset(photo.src);
  });
  Object.values(LOGOS).forEach((logo) => {
    const img = new Image();
    img.src = asset(logo.src);
  });
}

export function buildFgcBpPremierRestoDeck() {
  return createStudioDeck({
    id: "fgc-bp-premier-resto",
    title: "J’aide 3 inconnus à ouvrir leur premier resto",
    exportName: "FGC_Banque_Populaire_1er_resto",
    theme: "ivory",
    themeOverrides: { accent: "#0057B8" },
    readerChrome: "auto",
    slides: [
      { id: "presentation", layout: "fgcCover", title: "Présentation" },
      { id: "contexte", layout: "fgcContext", title: "Contexte" },
      { id: "concept", layout: "fgcConcept", title: "Concept" },
      { id: "candidats", layout: "fgcCasting", title: "Candidats" },
      { id: "parrains", layout: "fgcParrains", title: "Les Parrains" },
      { id: "lieu", layout: "fgcLieu", title: "Le lieu" },
      { id: "deroule", layout: "fgcRun", title: "Déroulé" },
      { id: "imprevu", layout: "fgcImprevu", title: "L’imprévu" },
      { id: "deliberation", layout: "fgcDelib", title: "Délibération" },
      { id: "budget", layout: "fgcBudget", title: "Budget" },
      { id: "pops", layout: "fgcPops", title: "Pop’s" },
      { id: "nextsteps", layout: "fgcNext", title: "Next steps" },
    ],
  });
}

export const fgcBpPremierRestoDeck = buildFgcBpPremierRestoDeck();
