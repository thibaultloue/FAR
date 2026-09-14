import { createStudioDeck } from "../createStudioDeck.js";
import { applyBankConfig } from "./cyrilMp4Banques.config.js";
import { ASSETS, SOURCE_LINE_SHORT, SOURCES } from "./cyrilMp4Banques.assets.js";

const YT_AFRICA = "https://www.youtube.com/watch?v=bVk4i_PYxug";
const YT_TRAIN = "https://www.youtube.com/watch?v=70I94z_2toM";
const YT_WILDLIFE = "https://www.youtube.com/watch?v=T6A36ypJXI8";
const YT_HOTELS = "https://www.youtube.com/watch?v=ZKlLgxLz_qI";
const YT_DEBLOCK = "https://www.youtube.com/watch?v=nCDJo4w-Z8U";
const YT_SHOPIFY = "https://www.youtube.com/watch?v=myElp75-ZIc";

function coverKicker(cfg) {
  if (cfg.bankName) return `${cfg.bankName} × CYRILmp4 · FAR`;
  return "Partenariats bancaires · FAR";
}

/** Cas Deblock — conservé pour personnalisation / bascule future, hors slide par défaut. */
export function deblockCase() {
  return {
    partner: "Deblock",
    year: "2024",
    idea: "Ambassadorat : contenus et carte dédiée.",
    resultValue: "3,5 M+",
    resultLabel: "vues cumulées · publication La Porte",
    photo: { src: ASSETS.deblockVideo.src, alt: ASSETS.deblockVideo.alt, focus: "center 35%" },
    href: YT_DEBLOCK,
    hrefLabel: "Vidéo de référence",
    detail:
      "La Porte publie plus de 3,5 M de vues cumulées pour cet ambassadorat 2024. Statut actuel, engagements sectoriels et pertinence auprès du destinataire : à confirmer avant citation commerciale. Deblock est un acteur financier, pas une banque.",
  };
}

function odooCase() {
  return {
    partner: "Odoo",
    year: "2023",
    idea: "Une vidéo dédiée autour d’hôtels insolites et d’un site de notation créé pour le contenu.",
    resultValue: "1,4 M+",
    resultLabel: "vues · publication La Porte",
    photo: { src: ASSETS.hotels.src, alt: ASSETS.hotels.alt, focus: "center 40%" },
    href: YT_HOTELS,
    hrefLabel: "Voir la vidéo",
    detail: "Résultat publié par La Porte pour cette vidéo dédiée 2023. Vues de la réalisation, pas des clients acquis.",
  };
}

function shopifyCase() {
  return {
    partner: "Shopify",
    year: "2024",
    idea: "Une intégration de la plateforme dans une vidéo de Cyril.",
    resultValue: "1,3 M+",
    resultLabel: "vues · publication La Porte",
    photo: { src: ASSETS.shopifyVideo.src, alt: ASSETS.shopifyVideo.alt, focus: "center 40%" },
    href: YT_SHOPIFY,
    hrefLabel: "Voir la vidéo",
    detail: "Résultat publié par La Porte pour cette intégration 2024.",
  };
}

function bankBridges(cfg) {
  const featuredId = cfg.objective?.id || null;
  const rows = [
    {
      id: "presence",
      from: "Une communauté de plusieurs millions",
      to: "Faire connaître votre marque",
      body: "Associer votre banque à ses contenus et à ses prises de parole.",
    },
    {
      id: "proximity",
      from: "Des voyages et des expériences réelles",
      to: "Montrer l’utilité de vos services",
      body: "Voyages, paiements, organisation de projets : des usages à travailler à partir de votre offre.",
    },
    {
      id: "offer",
      from: "Un parcours de fondateur",
      to: "Incarner l’entrepreneuriat",
      body: "S’appuyer sur son expérience pour parler de création d’activité, de développement et de transmission.",
    },
  ];
  return rows.map((row) => ({ ...row, featured: featuredId === row.id }));
}

function contactBlock(cfg) {
  const name = cfg.contactName || "Thibault Loué";
  const detail = cfg.contactDetail || "thibault.loue@far-agence.com";
  return `FAR\n${name}\n${detail}`;
}

export function buildCyrilMp4BanquesDeck(overrides = {}) {
  const cfg = applyBankConfig(overrides);
  const bank = cfg.bankName;
  // V2 : Odoo + Shopify par défaut. Deblock reste disponible via sectorCase: "deblock".
  const cases = cfg.sectorCase === "deblock" ? [deblockCase(), odooCase()] : [odooCase(), shopifyCase()];

  return createStudioDeck({
    id: "cyril-mp4-banques",
    title: bank ? `CYRILmp4 × ${bank}` : "CYRILmp4 × Banques",
    exportName: bank ? `CYRILmp4_x_${bank.replace(/\s+/g, "_")}` : "CYRILmp4_x_Banques",
    theme: "ivory",
    themeOverrides: { accent: cfg.accent || "#C9A24B" },
    readerChrome: "auto",
    slides: [
      {
        id: "cover",
        layout: "cover",
        kicker: coverKicker(cfg),
        title: "CYRILmp4",
        hook: "Créateur. Explorateur. Entrepreneur.",
        photo: ASSETS.cover,
        logos: cfg.bankLogo ? [{ src: cfg.bankLogo, alt: bank || "Banque" }] : [],
        source: "FAR · CYRILmp4",
      },
      {
        id: "creator",
        layout: "creator",
        kicker: "Présentation",
        title: "Cyril, créateur depuis 2010.",
        body: "Cyril s’est d’abord fait connaître sur YouTube avec le gaming. Il a depuis élargi son univers aux voyages, à l’exploration et aux expériences filmées. Il est également fondateur et président du Groupe La Porte.",
        photo: ASSETS.portrait,
        points: [
          { label: "Voyage", body: "Des départs filmés, des lieux découverts." },
          { label: "Exploration", body: "Aller voir pour de vrai, sur le terrain." },
          { label: "Divertissement", body: "Des récits accessibles, à suivre jusqu’au bout." },
        ],
        source: `${SOURCES.groupe.label} · ${SOURCES.laporteProfile.label}`,
      },
      {
        id: "figures",
        layout: "figures",
        variant: "contrast",
        kicker: "Chiffres clés",
        title: "Cyril en chiffres.",
        metrics: [
          { value: "5 M+", label: "Abonnés YouTube · CYRILmp4", asOf: "Repère publié par La Porte" },
          { value: "1 Md+", label: "Vues cumulées · YouTube CYRILmp4", asOf: "Repère publié par La Porte" },
          { value: "1,3 M+", label: "Abonnés Instagram · @cyrilmp4", asOf: "Repère publié par La Porte" },
        ],
        source: SOURCE_LINE_SHORT,
      },
      {
        id: "repertoire",
        layout: "repertoire",
        kicker: "Contenus",
        title: "Ses vidéos, leurs performances.",
        videos: [
          {
            id: "africa",
            title: "2€ dans la ville la moins chère d’Afrique !",
            year: "2025",
            kind: "Exploration",
            result: "1,6 M+ vues",
            role: "Résultat publié par La Porte",
            src: ASSETS.africa.src,
            alt: ASSETS.africa.alt,
            href: YT_AFRICA,
            detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). Vues publiées par La Porte. Exemple historique, pas une moyenne de la chaîne.",
          },
          {
            id: "train",
            title: "24h sur le train le plus dangereux du monde !",
            year: "2023",
            kind: "Immersion",
            result: "1,5 M+ vues",
            role: "Résultat publié par FAR",
            src: ASSETS.train.src,
            alt: ASSETS.train.alt,
            href: YT_TRAIN,
            detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). Résultat publié sur la page FAR by La Porte.",
          },
          {
            id: "wildlife",
            title: "300h sur les traces d’animaux sauvages",
            year: "2022",
            kind: "Documentaire",
            result: "1 M de vues",
            role: "Résultat publié par La Porte Production",
            src: ASSETS.wildlife.src,
            alt: ASSETS.wildlife.alt,
            href: YT_WILDLIFE,
            detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). Résultat publié par La Porte Production.",
          },
        ],
        source: "Sélection de contenus · Vues publiées par La Porte / FAR · Dates de mesure non précisées.",
      },
      {
        id: "ecosystem",
        layout: "ecosystem",
        kicker: "Écosystème",
        title: "Un écosystème éditorial complémentaire.",
        channels: [
          {
            id: "youtube",
            label: "YouTube",
            handle: "YouTube · CYRILmp4",
            title: "YouTube · CYRILmp4",
            body: "Les vidéos longues, les explorations et les expériences filmées.",
            photo: { src: ASSETS.africa.src, alt: ASSETS.africa.alt },
          },
          {
            id: "instagram",
            label: "Instagram",
            handle: "Instagram · @cyrilmp4",
            title: "Instagram · @cyrilmp4",
            body: "Le quotidien, les coulisses et les temps forts de ses projets.",
          },
          {
            id: "linkedin",
            label: "LinkedIn",
            handle: "LinkedIn · Cyril Soudant",
            title: "LinkedIn · Cyril Soudant",
            body: "Son parcours d’entrepreneur et ses réalisations professionnelles.",
          },
        ],
        source: SOURCES.laporteProfile.label,
      },
      {
        id: "group",
        layout: "group",
        kicker: "Entrepreneuriat",
        title: "Un créateur qui a construit un groupe.",
        body: "Cyril Soudant est fondateur et président du Groupe La Porte.",
        hub: "Groupe La Porte",
        branches: [
          { id: "cyrilmp4", name: "La Porte CYRILmp4", role: "Création de contenus." },
          { id: "production", name: "La Porte Production", role: "Production audiovisuelle." },
          {
            id: "academie",
            name: "La Porte Académie",
            role: "Formation aux métiers du web.",
            example: "Formation « Devenir vidéaste »",
          },
          {
            id: "beta",
            name: "La Porte Beta",
            role: "Développement de marques et de produits.",
            example: "Tryhard · périphériques gaming",
          },
          { id: "far", name: "FAR by La Porte", role: "Accompagnement de créateurs." },
        ],
        source: `${SOURCES.groupe.label} · ${SOURCES.activites.label}`,
      },
      {
        id: "interest",
        layout: "bridges",
        kicker: "Territoires de partenariat",
        title: bank ? `Ce que Cyril peut apporter à ${bank}.` : "Ce que Cyril peut apporter à votre banque.",
        bridges: bankBridges(cfg),
        source: "Proposition stratégique FAR",
      },
      {
        id: "preuves",
        layout: "cases",
        kicker: "Références",
        title: "Des collaborations déjà réalisées.",
        cases,
        source: "Résultats publiés par La Porte · Dates de mesure non précisées.",
      },
      {
        id: "collaborer",
        layout: "formats",
        kicker: "Collaboration",
        title: "Trois façons de collaborer.",
        formats: [
          {
            id: "integration",
            kicker: "01",
            title: "Intégration",
            body: "Une prise de parole de la banque dans un contenu de Cyril.",
          },
          {
            id: "cocreated",
            kicker: "02",
            title: "Vidéo co-conçue",
            body: "Un projet éditorial construit ensemble, avec une place définie pour la marque.",
          },
          {
            id: "duree",
            kicker: "03",
            title: "Partenariat dans la durée",
            body: "Plusieurs contenus reliés par une même collaboration.",
          },
        ],
        signature: "FAR accompagne la conception et le suivi du partenariat.",
      },
      {
        id: "close",
        layout: "closing",
        title: "Associons votre banque à ses prochains projets.",
        action: "Échangeons sur vos objectifs et les projets de Cyril.",
        contact: contactBlock(cfg),
        photo: ASSETS.cover,
        source: "FAR",
      },
    ],
  });
}

export const cyrilMp4BanquesDeck = buildCyrilMp4BanquesDeck();
