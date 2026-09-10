import { createStudioDeck } from "./createStudioDeck.js";
import { cyrilMp4BanquesDeck } from "./decks/cyrilMp4Banques.js";

const decks = {};

const STUDIO_ALIASES = {
  banques: "cyril-mp4-banques",
  cyrilbanques: "cyril-mp4-banques",
  "cyrilmp4-banques": "cyril-mp4-banques",
  cyrilmp4banques: "cyril-mp4-banques",
  mp4banques: "cyril-mp4-banques",
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
  return resolved ? decks[resolved] : null;
}

export function listStudioDecks() {
  return Object.values(decks);
}

export { createStudioDeck };

registerStudioDeck(cyrilMp4BanquesDeck);

if (import.meta.env.DEV) {
  const { galleryDeck } = await import("./galleryDeck.js");
  registerStudioDeck(galleryDeck);
}
