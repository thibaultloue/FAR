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

export const PHOTOS = {
  concept: {
    src: `${ASSET_BASE}/v18-concept-comptoir.png`,
    alt: "Remise d’un plat au comptoir",
    position: "48% 42%",
  },
  popsHero: {
    src: `${ASSET_BASE}/pops-hero.jpg`,
    alt: "Canette Pop’s saveur pêche",
    position: "62% 45%",
  },
  halle: {
    src: `${ASSET_BASE}/halle-trista-le.jpg`,
    alt: "Halle food couverte, référence de lieu",
    position: "52% 42%",
  },
};

export const POPS_CANS = [
  { src: `${ASSET_BASE}/pops-can-peche.png`, alt: "Pop’s pêche" },
  { src: `${ASSET_BASE}/pops-can-grenade.png`, alt: "Pop’s grenade" },
  { src: `${ASSET_BASE}/pops-can-fraise.png`, alt: "Pop’s fraise" },
  { src: `${ASSET_BASE}/pops-can-dragon.png`, alt: "Pop’s fruit du dragon" },
];

/** Profils recherchés. Ce ne sont pas les candidats retenus. */
export const PEOPLE = {
  cook: {
    src: `${ASSET_BASE}/v18-candidat-01.png`,
    alt: "Personne en veste de cuisine, profil recherché",
    position: "50% 18%",
  },
  reconversion: {
    src: `${ASSET_BASE}/v18-candidat-02.png`,
    alt: "Personne derrière un comptoir, profil recherché",
    position: "50% 16%",
  },
  family: {
    src: `${ASSET_BASE}/v18-candidat-03.png`,
    alt: "Personne en tablier, profil recherché",
    position: "50% 20%",
  },
};

/** Parrains : références de profil, pas des personnes retenues. */
export const PARRAINS = {
  chef: {
    src: `${ASSET_BASE}/service-louis-hansel.jpg`,
    alt: "Cuisine professionnelle, référence de profil parrain chef",
    position: "48% 28%",
  },
  entrepreneur: {
    src: `${ASSET_BASE}/echange-conseil.jpeg`,
    alt: "Échange autour d’un projet food, référence de profil parrain entrepreneur",
    position: "42% 35%",
  },
  mentor: {
    src: `${ASSET_BASE}/cuisine-service.jpg`,
    alt: "Brigade en cuisine, référence de profil mentor terrain",
    position: "55% 30%",
  },
};
