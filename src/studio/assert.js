/**
 * Contrôles hors navigateur : totaux budget, ids stables.
 * node src/studio/assert.js
 */
import { GALLERY_BUDGET } from "./galleryDeck.js";
import { sumValues } from "./math.js";
import { createStudioDeck } from "./createStudioDeck.js";
import { buildCyrilMp4BanquesDeck, deblockCase } from "./decks/cyrilMp4Banques.js";

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

const banks = buildCyrilMp4BanquesDeck();
const expectedIds = [
  "cover",
  "creator",
  "figures",
  "repertoire",
  "ecosystem",
  "group",
  "interest",
  "preuves",
  "collaborer",
  "close",
];
if (banks.id !== "cyril-mp4-banques" || banks.slides.length !== 10) {
  console.error("deck banques: 10 slides attendues", banks.slides.length);
  process.exit(1);
}
if (banks.slides.map((s) => s.id).join() !== expectedIds.join()) {
  console.error("deck banques: ids inattendus", banks.slides.map((s) => s.id));
  process.exit(1);
}
if (banks.readerChrome !== "auto") {
  console.error("deck banques: readerChrome auto attendu");
  process.exit(1);
}
const blob = JSON.stringify(banks);
for (const forbidden of [
  "8,5M",
  "8.5M",
  "personnes touchées cumul",
  "libre de toute exclusivité",
  "impact garanti",
  "Gold / Silver",
  "Sans export analytics",
  "Ce n'est pas un avis juridique",
  "Aucun résultat garanti",
  "Prenez part à la prochaine aventure",
]) {
  if (blob.includes(forbidden)) {
    console.error("deck banques: formulation interdite", forbidden);
    process.exit(1);
  }
}
if (!blob.includes("1,4 M+") || !blob.includes("1,3 M+")) {
  console.error("deck banques: résultats Odoo / Shopify manquants");
  process.exit(1);
}
if (blob.includes("Deblock")) {
  console.error("deck banques: Deblock ne doit pas apparaître dans la V2 par défaut");
  process.exit(1);
}
const db = deblockCase();
if (!db?.resultValue || !String(db.resultValue).includes("3,5")) {
  console.error("deck banques: cas Deblock manquant dans les données de travail");
  process.exit(1);
}
const genericLogos = banks.slides[0].logos || [];
if (genericLogos.length) {
  console.error("deck banques: logo banque présent en version générique");
  process.exit(1);
}

const named = buildCyrilMp4BanquesDeck({ bankName: "Banque Exemple", objective: "proximity", sectorCase: "deblock" });
if (!named.title.includes("Banque Exemple")) {
  console.error("personnalisation: titre inchangé");
  process.exit(1);
}
if (!JSON.stringify(named.slides.find((s) => s.id === "preuves")).includes("Deblock")) {
  console.error("personnalisation: Deblock attendu quand sectorCase=deblock");
  process.exit(1);
}
if (JSON.stringify(named.slides.find((s) => s.id === "preuves")).includes("Shopify")) {
  console.error("personnalisation: Shopify ne doit pas cohabiter avec Deblock");
  process.exit(1);
}

console.log("studio assert ok", { budget: total, slides: deck.slides.length, banques: banks.slides.length });
