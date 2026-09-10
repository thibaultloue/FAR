import { createStudioDeck } from "./createStudioDeck.js";

const decks = {};

export function registerStudioDeck(deck) {
  decks[deck.id] = deck;
  return deck;
}

export function getStudioDeck(id) {
  return decks[id] || null;
}

export function listStudioDecks() {
  return Object.values(decks);
}

export { createStudioDeck };

if (import.meta.env.DEV) {
  const { galleryDeck } = await import("./galleryDeck.js");
  registerStudioDeck(galleryDeck);
}
