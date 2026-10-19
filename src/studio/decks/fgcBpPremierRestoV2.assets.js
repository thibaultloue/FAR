/** Photos inspectées. Les crédits restent dans les notes, hors slide. */

export const ASSET_BASE = "/decks/fgc-bp-premier-resto/assets";

export const CHARLES_FOOD = {
  src: `${ASSET_BASE}/charles-food.jpg`,
  alt: "Charles avec un burger",
};

export const LOGOS = {
  bp: {
    src: `${ASSET_BASE}/logo-banque-populaire.svg`,
    alt: "Banque Populaire",
  },
  bpWhite: {
    src: `${ASSET_BASE}/logo-banque-populaire-white.svg`,
    alt: "Banque Populaire",
  },
};

const APPRENTIS = `${ASSET_BASE}/apprentis`;

export const PHOTOS = {
  cover: {
    src: `${APPRENTIS}/plateau-50-candidats.png`,
    alt: "Chef au premier plan, candidats en cuisine derrière lui",
    position: "46% 42%",
  },
  intro: {
    src: `${APPRENTIS}/plateau-50-candidats.png`,
    alt: "Charles face caméra, candidats en cuisine derrière lui",
    position: "34% 40%",
  },
  casting: {
    src: `${APPRENTIS}/casting-brigade.jpeg`,
    alt: "Brigade d’apprentis en tenue blanche",
    position: "50% 32%",
  },
  epreuve1: {
    src: `${APPRENTIS}/epreuve-01-blancs-en-neige.jpeg`,
    alt: "Candidats retournant un cul-de-poule de blancs en neige",
    position: "50% 42%",
  },
  epreuve2: {
    src: `${APPRENTIS}/epreuve-02-fastfood-gastro.jpeg`,
    alt: "Équipes au travail sur un plat",
    position: "50% 45%",
  },
  epreuve3v1: {
    src: `${APPRENTIS}/epreuve-03-variante-client.jpeg`,
    alt: "Client attablé, variante d’observation",
    position: "50% 40%",
  },
  epreuve4: {
    src: `${APPRENTIS}/epreuve-04-plat-signature.jpeg`,
    alt: "Plat dressé en cuisine",
    position: "50% 46%",
  },
  finale: {
    src: `${APPRENTIS}/finale-food-corners.jpeg`,
    alt: "Quatre food corners installés côte à côte",
    position: "62% 48%",
  },
  popsHero: {
    src: `${ASSET_BASE}/pops-hero.jpg`,
    alt: "Canette Pop’s saveur pêche",
    position: "62% 45%",
  },
};

export const POPS_CANS = [
  { src: `${ASSET_BASE}/pops-can-peche.png`, alt: "Pop’s pêche" },
  { src: `${ASSET_BASE}/pops-can-grenade.png`, alt: "Pop’s grenade" },
  { src: `${ASSET_BASE}/pops-can-fraise.png`, alt: "Pop’s fraise" },
  { src: `${ASSET_BASE}/pops-can-dragon.png`, alt: "Pop’s fruit du dragon" },
];

