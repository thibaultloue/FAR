/**
 * Contrôles hors navigateur : totaux budget, ids stables.
 * node src/studio/assert.js
 */
import { GALLERY_BUDGET } from "./galleryDeck.js";
import { sumValues } from "./math.js";
import { createStudioDeck } from "./createStudioDeck.js";
import { buildCyrilMp4BanquesDeck, deblockCase, adopteCase } from "./decks/cyrilMp4Banques.js";
import { buildToinelagBouyguesKidsWatchDeck } from "./decks/toinelagBouyguesKidsWatch.js";

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
  "parcours",
  "mp4",
  "studio",
  "social",
  "group",
  "cas-odoo",
  "cas-deux",
  "interest",
  "collaborer",
  "close",
];
if (banks.id !== "cyril-mp4-banques" || banks.slides.length !== 11) {
  console.error("deck banques: 11 slides attendues", banks.slides.length);
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
  "audience plus jeune",
  "communauté ultra-engagée",
  "cible idéale",
  "conversion garantie",
  "Trois façons de collaborer",
  "905 k personnes exposées",
  "1,3 M de personnes exposées",
  "vues de l’intégration",
  "7 M de personnes touchées",
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
if (!blob.includes("CYRILstudio") || !blob.includes("100 M+") || !blob.includes("600 k+") || !blob.includes("250+")) {
  console.error("deck banques: page CYRILstudio incomplète");
  process.exit(1);
}
if (!blob.includes("1 000+") || !blob.includes("Les docu-vlogs")) {
  console.error("deck banques: page CYRILmp4 incomplète (3e métrique / familles)");
  process.exit(1);
}
if (!blob.includes("Cinq projets en action") || !blob.includes("FAR by La Porte")) {
  console.error("deck banques: page La Porte incomplète");
  process.exit(1);
}
if (blob.includes("Deblock")) {
  console.error("deck banques: Deblock ne doit pas apparaître dans le parcours par défaut");
  process.exit(1);
}
if (blob.includes("garmin-cyril-photo") || blob.includes("#C9A24B")) {
  console.error("deck banques: visuel montagne ou accent moutarde encore présents");
  process.exit(1);
}
if (blob.includes("Adopte") || blob.includes("905 k")) {
  console.error("deck banques: Adopte ne doit pas apparaître dans le parcours par défaut");
  process.exit(1);
}
if (banks.slides.some((s) => s.id === "audiences")) {
  console.error("deck banques: slide audiences absente d’analytics, ne pas l’afficher");
  process.exit(1);
}
const odooSlide = banks.slides.find((s) => s.id === "cas-odoo");
const shopSlide = banks.slides.find((s) => s.id === "cas-deux");
if (!odooSlide?.href || !shopSlide?.href) {
  console.error("deck banques: liens vidéo Odoo / Shopify manquants");
  process.exit(1);
}
if (odooSlide.layout !== "brandCase" || shopSlide.partner !== "Shopify") {
  console.error("deck banques: cas par défaut Odoo + Shopify attendus");
  process.exit(1);
}
const group = banks.slides.find((s) => s.id === "group");
if (!group?.ventures || group.ventures.length !== 5) {
  console.error("deck banques: 5 activités La Porte attendues");
  process.exit(1);
}
if (JSON.stringify(group.ventures).includes("garmin-cyril-photo")) {
  console.error("deck banques: photo montagne sur La Porte");
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
if (!JSON.stringify(named.slides.find((s) => s.id === "cas-deux")).includes("Deblock")) {
  console.error("personnalisation: Deblock attendu quand sectorCase=deblock");
  process.exit(1);
}
if (JSON.stringify(named.slides.find((s) => s.id === "cas-deux")).includes("Shopify")) {
  console.error("personnalisation: Shopify ne doit pas cohabiter avec Deblock");
  process.exit(1);
}

const adopte = buildCyrilMp4BanquesDeck({ sectorCase: "adopte" });
const adopteTwo = adopte.slides.find((s) => s.id === "cas-deux");
if (!JSON.stringify(adopteTwo).includes("Adopte") || !String(adopteTwo.resultValue).includes("905 k")) {
  console.error("variante: Adopte attendu quand sectorCase=adopte");
  process.exit(1);
}
if (JSON.stringify(adopteTwo).includes("Shopify") || JSON.stringify(adopteTwo).includes("1,3 M+")) {
  console.error("variante: Shopify ne doit pas cohabiter avec Adopte");
  process.exit(1);
}
if (adopte.slides.length !== 11) {
  console.error("variante Adopte: ne pas ajouter de slide, 11 attendues", adopte.slides.length);
  process.exit(1);
}
if (!adopteCase()?.href || !String(adopteCase().href).includes("lIoROwhuoBM")) {
  console.error("variante: lien YouTube Adopte manquant ou non vérifié");
  process.exit(1);
}

const kids = buildToinelagBouyguesKidsWatchDeck();
const kidsIds = ["cover", "creator", "proof", "idea", "rundown", "product", "device", "close"];
if (kids.id !== "toinelag-bouygues-kids-watch" || kids.slides.length !== 8) {
  console.error("deck kids watch: 8 slides attendues", kids.slides.length);
  process.exit(1);
}
if (kids.slides.map((s) => s.id).join() !== kidsIds.join()) {
  console.error("deck kids watch: ids inattendus", kids.slides.map((s) => s.id));
  process.exit(1);
}
if (kids.readerChrome !== "auto") {
  console.error("deck kids watch: readerChrome auto attendu");
  process.exit(1);
}
const kidsBlob = JSON.stringify(kids);
for (const forbidden of [
  "8,3 M",
  "8.3 M",
  "co-visionnage",
  "Electra",
  "White Desert",
  "Père Noël",
  "hologramme",
  "garantie de trafic",
  "60 % de parents",
  "#0E8C74",
  "7,2 M",
]) {
  if (kidsBlob.includes(forbidden)) {
    console.error("deck kids watch: formulation ou visuel interdit", forbidden);
    process.exit(1);
  }
}
for (const required of [
  "8,7 M",
  "7,1 M",
  "3,2 M",
  "1,97 M",
  "872 M",
  "7–15 ans",
  "≈ 60 %",
  "dès 9 ans",
  "Thibault Loué",
  "thibault.loue@far-agence.com",
  "TCL Kids Watch MT46",
  "Les pièces secrètes, un format signature.",
  "Prêts pour une aventure avant Noël.",
  "J'ai Construit une Pièce Secrète dans mon Canapé !",
  "Je Construis une Pièce Secrète dans un Trampoline Park",
  "Je CONSTRUIS une PIÈCE SECRÈTE dans Steal a Brainrot",
  "Se qui veule que toinelag fasse une pièce secrète dans le studio de unchained",
]) {
  if (!kidsBlob.includes(required)) {
    console.error("deck kids watch: mention manquante", required);
    process.exit(1);
  }
}

const photoSrcs = [];
function collectPhotos(node) {
  if (!node || typeof node !== "object") return;
  if (typeof node.src === "string" && /\.(jpg|jpeg|png|webp)$/i.test(node.src)) {
    const src = node.src;
    const skip = /logo|packshot|avatar/i.test(src);
    if (!skip) photoSrcs.push(src);
  }
  for (const v of Object.values(node)) collectPhotos(v);
}
collectPhotos(kids.slides);
const photoDup = photoSrcs.filter((s, i) => photoSrcs.indexOf(s) !== i);
if (photoDup.length) {
  console.error("deck kids watch: photo répétée entre slides", [...new Set(photoDup)]);
  process.exit(1);
}

console.log("studio assert ok", { budget: total, slides: deck.slides.length, banques: banks.slides.length, kids: kids.slides.length });
