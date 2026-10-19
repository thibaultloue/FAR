import { createStudioDeck } from "../createStudioDeck.js";
import { asset } from "../asset.js";
import { LOGOS, PHOTOS } from "./fgcBpPremierRestoV2.assets.js";

if (typeof window !== "undefined") {
  Object.values(PHOTOS).forEach((photo) => {
    const img = new Image();
    img.src = asset(photo.src);
  });
  Object.values(LOGOS).forEach((logo) => {
    const img = new Image();
    img.src = asset(logo.src);
  });
}

export function buildFgcBpPremierRestoV2Deck() {
  return createStudioDeck({
    id: "fgc-bp-premier-resto-v2",
    title: "50 apprentis se battent pour devenir chef",
    exportName: "FGC_Banque_Populaire_50_Apprentis_V2",
    theme: "ivory",
    themeOverrides: { accent: "#0057B8" },
    readerChrome: "auto",
    slides: [
      { id: "presentation", layout: "fgcCoverV2", title: "Présentation" },
      { id: "contexte", layout: "fgcContextV2", title: "Contexte" },
      { id: "concept", layout: "fgcConceptV2", title: "Concept" },
      { id: "casting", layout: "fgcCastingV2", title: "Le casting" },
      { id: "introduction", layout: "fgcIntroV2", title: "Introduction" },
      { id: "epreuve-01", layout: "fgcChallenge1V2", title: "Épreuve 1" },
      { id: "epreuve-02", layout: "fgcChallenge2V2", title: "Épreuve 2" },
      { id: "epreuve-03", layout: "fgcEnigmaV2", title: "Épreuve 3" },
      { id: "epreuve-03-alt", layout: "fgcEnigmaAltV2", title: "Épreuve 3 alternative" },
      { id: "epreuve-04", layout: "fgcSignatureV2", title: "Épreuve 4" },
      { id: "finale", layout: "fgcFinaleV2", title: "La finale" },
      { id: "jury-dotation", layout: "fgcJuryV2", title: "Le jury & la dotation" },
      { id: "deroule", layout: "fgcRunV2", title: "Déroulé" },
      { id: "budget", layout: "fgcBudgetV2", title: "Budget" },
      { id: "next-steps", layout: "fgcNextV2", title: "Next steps" },
    ],
  });
}

export const fgcBpPremierRestoV2Deck = buildFgcBpPremierRestoV2Deck();
