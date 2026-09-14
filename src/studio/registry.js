import { createStudioDeck } from "./createStudioDeck.js";
import { cyrilMp4BanquesDeck, buildCyrilMp4BanquesDeck } from "./decks/cyrilMp4Banques.js";
import { toinelagBouyguesKidsWatchDeck } from "./decks/toinelagBouyguesKidsWatch.js";

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

if (import.meta.env.DEV) {
  const { galleryDeck } = await import("./galleryDeck.js");
  registerStudioDeck(galleryDeck);
}
