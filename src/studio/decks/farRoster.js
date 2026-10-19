import { createStudioDeck } from "../createStudioDeck.js";

const SLIDES = [
  ["cover", "farRosterCover", "FAR by La Porte"],
  ["agence", "farRosterAgency", "L’agence"],
  ["roster", "farRosterIndex", "Nos créateurs"],
  ["fgc", "farRosterFgc", "FastGoodCuisine"],
  ["cyrilmp4", "farRosterCyril", "CYRILmp4"],
  ["cyrilstudio", "farRosterStudio", "CYRILstudio"],
  ["toinelag", "farRosterToinelag", "Toinelag"],
  ["toinelag-plus", "farRosterToinelagPlus", "Toinelag Gaming / +"],
  ["routin", "farRosterRoutin", "Le Routin"],
  ["bek1ng", "farRosterBek", "Bek1ng"],
  ["teeqzy", "farRosterTeeqzy", "Teeqzy"],
  ["merci", "farRosterClose", "Merci"],
];

export function buildFarRosterDeck() {
  return createStudioDeck({
    id: "far-roster",
    title: "Faire grandir les univers créateurs",
    exportName: "FAR_Agence_Roster",
    theme: "ivory",
    themeOverrides: { accent: "#E6A100" },
    readerChrome: "auto",
    slides: SLIDES.map(([id, layout, title]) => ({ id, layout, title })),
  });
}

export const farRosterDeck = buildFarRosterDeck();
