import { createStudioDeck } from "./createStudioDeck.js";
import { cyrilMp4BanquesDeck, buildCyrilMp4BanquesDeck } from "./decks/cyrilMp4Banques.js";
import { toinelagBouyguesKidsWatchDeck } from "./decks/toinelagBouyguesKidsWatch.js";
import { toinelagSfrKidsWatchDeck } from "./decks/toinelagSfrKidsWatch.js";
import { cyrilMscYachtClubDeck } from "./decks/cyrilMscYachtClub.js";
import { fgcBpPremierRestoDeck } from "./decks/fgcBpPremierResto.js";
import { fgcBpPremierRestoV2Deck } from "./decks/fgcBpPremierRestoV2.js";
import { fgcPicardDeck } from "./decks/fgcPicard.js";
import { farRosterDeck } from "./decks/farRoster.js";

const decks = {};

const STUDIO_ALIASES = {
  banques: "cyril-mp4-banques",
  cyrilbanques: "cyril-mp4-banques",
  "cyrilmp4-banques": "cyril-mp4-banques",
  cyrilmp4banques: "cyril-mp4-banques",
  mp4banques: "cyril-mp4-banques",
  bouygues: "toinelag-bouygues-kids-watch",
  kidswatch: "toinelag-bouygues-kids-watch",
  "toinelag-bouygues": "toinelag-bouygues-kids-watch",
  toinelagbouygues: "toinelag-bouygues-kids-watch",
  sfr: "toinelag-sfr-kids-watch",
  "toinelag-sfr": "toinelag-sfr-kids-watch",
  toinelagsfr: "toinelag-sfr-kids-watch",
  kidswatchsfr: "toinelag-sfr-kids-watch",
  msc: "cyril-mp4-msc-yacht-club",
  yachtclub: "cyril-mp4-msc-yacht-club",
  cyrilmsc: "cyril-mp4-msc-yacht-club",
  fgcbp: "fgc-bp-premier-resto",
  "fgc-bp": "fgc-bp-premier-resto",
  premierresto: "fgc-bp-premier-resto",
  "banque-populaire": "fgc-bp-premier-resto",
  fgcbpv2: "fgc-bp-premier-resto-v2",
  "fgc-bp-v2": "fgc-bp-premier-resto-v2",
  "premierresto-v2": "fgc-bp-premier-resto-v2",
  "banque-populaire-v2": "fgc-bp-premier-resto-v2",
  fgcpicard: "fgc-picard",
  picard: "fgc-picard",
  farroster: "far-roster",
  roster: "far-roster",
  createurs: "far-roster",
};

export function registerStudioDeck(deck) {
  decks[deck.id] = deck;
  return deck;
}

export function resolveStudioDeckId(raw) {
  if (!raw) return null;
  const id = STUDIO_ALIASES[raw] || raw;
  return decks[id] ? id : null;
}

export function getStudioDeck(id) {
  const resolved = resolveStudioDeckId(id);
  if (!resolved) return null;
  if (resolved === "cyril-mp4-banques" && typeof sessionStorage !== "undefined") {
    const sc = sessionStorage.getItem("far_cyril_cases");
    if (sc === "adopte" || sc === "deblock") {
      return buildCyrilMp4BanquesDeck({ sectorCase: sc });
    }
  }
  return decks[resolved];
}

export function isStudioDeckId(id) {
  return Boolean(resolveStudioDeckId(id));
}

export function listStudioDecks() {
  return Object.values(decks);
}

export { createStudioDeck };

registerStudioDeck(cyrilMp4BanquesDeck);
registerStudioDeck(toinelagBouyguesKidsWatchDeck);
registerStudioDeck(toinelagSfrKidsWatchDeck);
registerStudioDeck(cyrilMscYachtClubDeck);
registerStudioDeck(fgcBpPremierRestoDeck);
registerStudioDeck(fgcBpPremierRestoV2Deck);
registerStudioDeck(fgcPicardDeck);
registerStudioDeck(farRosterDeck);

if (import.meta.env.DEV) {
  const { galleryDeck } = await import("./galleryDeck.js");
  registerStudioDeck(galleryDeck);
}
