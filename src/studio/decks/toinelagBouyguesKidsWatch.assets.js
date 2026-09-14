/**
 * Manifeste public — Toinelag × Bouygues Telecom · Kids Watch · V3.
 * Aucune note privée ici. Chiffres : sources-data-v3.json.
 */
import data from "./sources-data-v3.json" with { type: "json" };

export const CONSULTED_ON = data.consultedOn;

export const SOURCES = {
  noxChannel: {
    id: "S1",
    label: "NoxInfluencer · chaîne",
    url: data.channel.source.url,
    note: data.channel.source.note,
  },
  youtubeCanape: {
    id: "S2",
    label: "YouTube · Canapé",
    url: data.videos[0].url,
    note: "Compteur public YouTube indexé consulté le 14/09/2026 : 8,7 M de vues. NoxInfluencer affiche 8,73 M à la même date. Pas un export Studio.",
  },
  youtubeTrampoline: {
    id: "S3",
    label: "YouTube · Trampoline Park",
    url: data.videos[1].url,
    note: "YouTube indexé : 7,1 M de vues. L’ancien 7,2 M provenant d’un portfolio non daté n’est pas conservé.",
  },
  youtubeBrainrot: {
    id: "S4",
    label: "YouTube · Steal a Brainrot",
    url: data.videos[2].url,
    note: "NoxInfluencer 3,17 M au 14/09/2026, affiché 3,2 M. SocialRama documente 1,4 M au 6 mai 2026 (J+6) et le partenariat Vinted — relevé historique, pas le total récent.",
  },
  commentStairs: {
    id: "S5",
    label: "Commentaire indexé · escalier",
    url: data.comment.videoUrl,
    note: data.comment.origin,
  },
  kidsWatch: {
    id: "S6",
    label: "Bouygues Telecom · Kids Watch",
    url: data.product.page.url,
    note: "Page consultée le 14/09/2026. Appels, messages vocaux, visio ; contacts autorisés ; sans accès web/réseaux sociaux ; dès 9 ans.",
  },
  farPage: {
    id: "S7",
    label: "FAR by La Porte",
    url: "https://www.groupe-laporte.com/far-by-la-porte",
    note: "Source de présentation et d’images, pas de chiffre contemporain d’audience de cette opération.",
  },
  farBrief: {
    id: "S8",
    label: "Brief FAR",
    url: data.audienceFar.source.url,
    note: "Cœur 7–15 ans, environ 60 % de consommation sur TV. Période, définition exacte et export natif non fournis.",
  },
  socialrama: {
    id: "S9",
    label: "SocialRama",
    url: data.socialrama.url,
    note: data.socialrama.note,
  },
};

export const SOURCE_CHANNEL = "Chaîne principale : repères publics, sept. 2026 · Audience et TV : données communiquées par FAR.";
export const SOURCE_PROOF = `YouTube · NoxInfluencer · SocialRama. Consultées le ${CONSULTED_ON}. Fenêtres de mesure différentes.`;
export const SOURCE_PRODUCT = `Bouygues Telecom, page Kids Watch, consultée le ${CONSULTED_ON}.`;

const BASE = "/toinelag-bouygues-kids-watch";

export const ASSETS = {
  logoBouygues: {
    src: `${BASE}/logo-bouygues-telecom.png`,
    alt: "Bouygues Telecom",
    height: 72,
    keepColor: true,
  },
  packshot: {
    src: `${BASE}/packshot-mt46-black.png`,
    alt: "Kids Watch TCL MT46, vue trois-quarts, modèle noir",
    fit: "contain",
  },
  productCall: {
    src: `${BASE}/kids-watch-appel.webp`,
    alt: "Kids Watch en appel vidéo, visuel officiel Bouygues Telecom — écran réel, pas une simulation Toinelag",
    fit: "contain",
    credit: "Bouygues Telecom · visuel officiel",
  },
  portrait: {
    src: `${BASE}/portrait-toinelag.png`,
    alt: "Portrait de Toinelag",
    focus: "center 18%",
    credit: "FAR",
  },
  trampoline: {
    src: `${BASE}/thumb-trampoline.jpg`,
    alt: "Miniature YouTube : Je Construis une Pièce Secrète dans un Trampoline Park",
  },
  canape: {
    src: `${BASE}/thumb-canape.jpg`,
    alt: "Miniature YouTube : J'ai Construit une Pièce Secrète dans mon Canapé !",
  },
  brainrot: {
    src: `${BASE}/thumb-brainrot.jpg`,
    alt: "Miniature YouTube : Je CONSTRUIS une PIÈCE SECRÈTE dans Steal a Brainrot",
  },
  escalier: {
    src: `${BASE}/still-escalier.jpg`,
    alt: "Toinelag dans une pièce secrète sous un escalier",
    focus: "center 48%",
    credit: "Référence éditoriale · Escalier — pas un tournage Bouygues",
  },
};

export const VIDEOS = data.videos;
export const COMMENT = data.comment;
export const CHANNEL = data.channel;

export const CONTACT = {
  org: "FAR",
  name: "Thibault Loué",
  detail: "thibault.loue@far-agence.com",
  href: "mailto:thibault.loue@far-agence.com",
};
