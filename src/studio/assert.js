/**
 * Contrôles hors navigateur : totaux budget, ids stables.
 * node src/studio/assert.js
 */
import { GALLERY_BUDGET } from "./galleryDeck.js";
import { sumValues } from "./math.js";
import { createStudioDeck } from "./createStudioDeck.js";

const total = sumValues(GALLERY_BUDGET.items);
if (total !== 180) {
  console.error("Budget galerie: attendu 180, obtenu", total);
  process.exit(1);
}

try {
  createStudioDeck({ id: "x", title: "x", slides: [{ id: "a", layout: "cover" }, { id: "a", layout: "cover" }] });
  console.error("ids dupliqués non détectés");
  process.exit(1);
} catch {
  /* attendu */
}

const deck = createStudioDeck({
  id: "ok",
  title: "ok",
  slides: [{ id: "cover", layout: "cover" }, { id: "close", layout: "closing" }],
});
if (deck.engine !== "studio" || deck.slides[1].id !== "close") {
  console.error("starter deck invalide");
  process.exit(1);
}

console.log("studio assert ok", { budget: total, slides: deck.slides.length });
