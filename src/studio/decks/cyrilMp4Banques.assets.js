/**
 * Manifeste public des assets et sources du deck CYRILmp4 × Banques.
 * Aucune note privée ici.
 */
export const CONSULTED_ON = "11 sept. 2026";

export const SOURCES = {
  laporteProfile: {
    label: "Profil officiel La Porte CYRILmp4",
    url: "https://www.groupe-laporte.com/la-porte-cyrilmp4",
  },
  groupe: {
    label: "Groupe La Porte",
    url: "https://www.groupe-laporte.com/groupe-la-porte",
  },
  farPage: {
    label: "FAR by La Porte",
    url: "https://www.groupe-laporte.com/far-by-la-porte",
  },
  production: {
    label: "La Porte Production",
    url: "https://www.groupe-laporte.com/la-porte-production",
  },
  activites: {
    label: "Présentation des activités",
    url: "https://www.groupe-laporte.com/",
  },
  academie: {
    label: "La Porte Académie",
    url: "https://www.groupe-laporte.com/la-porte-academie",
  },
  beta: {
    label: "La Porte Beta",
    url: "https://www.groupe-laporte.com/la-porte-beta",
  },
  youtube: {
    label: "Chaîne YouTube CYRILmp4",
    url: "https://www.youtube.com/@CYRILmp4",
  },
};

/** Source courte pour slides commerciales — pas de commentaire de fabrication. */
export const SOURCE_LINE_SHORT = "Repères publiés par La Porte · Date de mesure non précisée.";

export const SOURCE_LINE = `${SOURCES.laporteProfile.label}, consulté le ${CONSULTED_ON}. Chiffres de présentation, pas un export analytics. La date de consultation n'est pas une date de mesure.`;

export const ASSETS = {
  cover: {
    src: "/garmin-cyril-photo.png",
    alt: "Cyril en situation d'exploration, photographie déjà publiée sur far.thibaultloue.com",
    focus: "center 22%",
    credit: "FAR · photographie déjà publiée",
    usage: "Couverture et conclusion",
  },
  portrait: {
    src: "/havas/cyril-portrait.jpg",
    alt: "Portrait de Cyril Soudant / CYRILmp4",
    focus: "center 18%",
    credit: "FAR · portrait roster",
    usage: "Slide présentation",
  },
  shooting: {
    src: "/garmin-cyril-thumb-2.png",
    alt: "Cyril en tournage, détail déjà publié sur le site FAR",
    focus: "center 30%",
    usage: "Contrepoint de tournage",
  },
  terrain: {
    src: "/garmin-cyril-thumb-1.png",
    alt: "Cyril sur le terrain, photographie déjà publiée sur le site FAR",
    focus: "center 35%",
    usage: "Mise en situation",
  },
  production: {
    src: "/garmin-cyril-thumb-3.png",
    alt: "Cyril en production, photographie déjà publiée sur le site FAR",
    focus: "center 40%",
    usage: "Visuel production",
  },
  africa: {
    src: "/cyril-mp4-banques/yt-bVk4i_PYxug.jpg",
    alt: "Miniature YouTube : 2€ dans la ville la moins chère d'Afrique",
    href: "https://www.youtube.com/watch?v=bVk4i_PYxug",
    usage: "Aperçu de la vidéo liée",
  },
  train: {
    src: "/cyril-mp4-banques/yt-70I94z_2toM.jpg",
    alt: "Miniature YouTube : 24H sur le train le plus dangereux du monde",
    href: "https://www.youtube.com/watch?v=70I94z_2toM",
    usage: "Aperçu de la vidéo liée",
  },
  wildlife: {
    src: "/cyril-mp4-banques/yt-T6A36ypJXI8.jpg",
    alt: "Miniature YouTube : 300 heures sur les traces d'animaux sauvages en Namibie",
    href: "https://www.youtube.com/watch?v=T6A36ypJXI8",
    usage: "Aperçu de la vidéo documentaire 2022",
  },
  hotels: {
    src: "/cyril-mp4-banques/yt-ZKlLgxLz_qI.jpg",
    alt: "Miniature YouTube : J'ai testé les hôtels les plus bizarres du monde",
    href: "https://www.youtube.com/watch?v=ZKlLgxLz_qI",
    usage: "Cas Odoo",
  },
  deblockVideo: {
    src: "/cyril-mp4-banques/yt-nCDJo4w-Z8U.jpg",
    alt: "Miniature YouTube d'une vidéo CYRILmp4 citée comme référence de l'ambassadorat Deblock",
    href: "https://www.youtube.com/watch?v=nCDJo4w-Z8U",
    usage: "Référence visuelle Deblock (données de travail)",
  },
  shopifyVideo: {
    src: "/cyril-mp4-banques/yt-myElp75-ZIc.jpg",
    alt: "Miniature YouTube de l'intégration Shopify 2024",
    href: "https://www.youtube.com/watch?v=myElp75-ZIc",
    usage: "Cas Shopify",
  },
  shopifyLogo: {
    src: "/shopify-logo.png",
    alt: "Shopify",
    usage: "Logo partenaire historique",
  },
};
