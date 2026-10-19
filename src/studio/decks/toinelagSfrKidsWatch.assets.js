/**
 * Toinelag × SFR · Kids Watch Plus.
 * Chiffres créateur : mêmes sources que le deck Bouygues (sources-data-v3.json).
 * Produit : page SFR consultée le 08/10/2026.
 */
import { VIDEOS } from "./toinelagBouyguesKidsWatch.assets.js";

export { VIDEOS };

const BASE = "/toinelag-sfr-kids-watch";

export const ASSETS = {
  logoSfr: {
    src: `${BASE}/logo-sfr.png`,
    alt: "SFR",
    height: 72,
    keepColor: true,
    keepOnDark: true,
  },
  portrait: {
    src: `${BASE}/portrait-toinelag.png`,
    alt: "Portrait de Toinelag",
    focus: "center 18%",
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
  watchVisio: {
    src: `${BASE}/kids-watch-visio.jpg`,
    alt: "Kids Watch Plus en appel vidéo, visuel officiel HONOR",
    focus: "86% 58%",
  },
  escalier: {
    src: `${BASE}/still-escalier.jpg`,
    alt: "Toinelag dans une pièce secrète sous un escalier",
    focus: "center 48%",
  },
};

export const PRODUCT = {
  name: "Kids Watch Plus",
  model: "HONOR CHOICE Kids Watch Plus",
  offer: "Pack Kids Protégés",
  page: {
    url: "https://www.sfr.fr/honor-honorchoicekidswatchplus",
    consulted: "08/10/2026",
  },
  uses: ["appel audio", "appel vidéo", "messages"],
  frame: "Contacts autorisés. Sans internet ni réseaux sociaux. Géolocalisation en temps réel.",
};

export const CONTACT = {
  org: "FAR",
  name: "Thibault Loué",
  detail: "thibault.loue@far-agence.com",
  href: "mailto:thibault.loue@far-agence.com",
};
