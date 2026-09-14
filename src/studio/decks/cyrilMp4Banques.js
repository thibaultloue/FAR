import { createStudioDeck } from "../createStudioDeck.js";
import { applyBankConfig } from "./cyrilMp4Banques.config.js";
import { ASSETS, SOURCE_LINE_SHORT, SOURCES } from "./cyrilMp4Banques.assets.js";

const YT_AFRICA = "https://www.youtube.com/watch?v=bVk4i_PYxug";
const YT_STEAM = "https://www.youtube.com/watch?v=HlEZiqQNOGg";
const YT_HOTELS = "https://www.youtube.com/watch?v=ZKlLgxLz_qI&t=255";
const YT_DEBLOCK = "https://www.youtube.com/watch?v=nCDJo4w-Z8U";
const YT_SHOPIFY = "https://www.youtube.com/watch?v=myElp75-ZIc&t=96";
const YT_ADOPTE = "https://www.youtube.com/watch?v=lIoROwhuoBM";

function coverKicker(cfg) {
  if (cfg.bankName) return `${cfg.bankName} × Cyril · FAR`;
  return "Partenariats bancaires · FAR";
}

const CASE_SOURCE_LAPORTE = "Dossier Cyril × Banques V4, d’après La Porte. Résultat historique ; date de mesure non précisée.";

/** Cas Deblock — conservé pour personnalisation / bascule future, hors slide par défaut. */
export function deblockCase() {
  return {
    id: "deblock",
    partner: "Deblock",
    chain: "CYRILmp4",
    format: "Ambassadorat",
    year: "2024",
    kicker: "CYRILmp4 × Deblock · Ambassadorat · 2024",
    title: "Deblock, une référence sectorielle.",
    context: "Ambassadorat publié par La Porte : contenus et carte dédiée. À confirmer avant citation commerciale.",
    filmTitle: "Vidéo de référence citée pour l’ambassadorat Deblock",
    thumb: { src: ASSETS.deblockVideo.src, alt: ASSETS.deblockVideo.alt },
    href: YT_DEBLOCK,
    mechanics: [
      { n: "01", label: "L’angle", body: "Une prise de parole autour d’un acteur financier." },
      { n: "02", label: "Le format", body: "Ambassadorat : contenus et carte dédiée." },
      { n: "03", label: "Le prolongement", body: "Statut actuel, engagements et pertinence : à confirmer avant envoi." },
    ],
    resultValue: "3,5 M+",
    resultUnit: "vues cumulées publiées par La Porte",
    source: CASE_SOURCE_LAPORTE,
    resultLabel: "vues cumulées · publication La Porte",
    photo: { src: ASSETS.deblockVideo.src, alt: ASSETS.deblockVideo.alt },
    hrefLabel: "Vidéo de référence",
    detail:
      "La Porte publie plus de 3,5 M de vues cumulées pour cet ambassadorat 2024. Statut actuel, engagements sectoriels et pertinence auprès du destinataire : à confirmer avant citation commerciale. Deblock est un acteur financier, pas une banque.",
  };
}

export function odooCase() {
  return {
    id: "odoo",
    partner: "Odoo",
    chain: "CYRILmp4",
    format: "Vidéo dédiée",
    year: "2023",
    kicker: "CYRILmp4 × Odoo · Vidéo dédiée · 2023",
    title: "Un service qui fait partie de l’expérience.",
    context: "Tester des hôtels insolites, dans une vidéo de Cyril.",
    filmTitle: "J’ai testé les hôtels les plus BIZARRES du monde.",
    thumb: { src: ASSETS.hotels.src, alt: ASSETS.hotels.alt },
    href: YT_HOTELS,
    mechanics: [
      { n: "01", label: "Le contenu", body: "Tester des hôtels insolites, dans une vidéo de Cyril." },
      { n: "02", label: "La place d’Odoo", body: "Créer un site de notation associé à l’expérience." },
      { n: "03", label: "Le prolongement", body: "Permettre à la communauté d’interagir sur le site." },
    ],
    resultValue: "1,4 M+",
    resultUnit: "vues de la vidéo",
    source: CASE_SOURCE_LAPORTE,
  };
}

export function shopifyCase() {
  return {
    id: "shopify",
    partner: "Shopify",
    chain: "CYRILmp4",
    format: "Intégration",
    year: "2024",
    kicker: "CYRILmp4 × Shopify · Intégration · 2024",
    title: "L’entrepreneuriat, dans un format de divertissement.",
    context: "Une intégration pour présenter la plateforme, dans un contenu consacré aux restaurants de youtubeurs.",
    filmTitle: "La vérité sur les restaurants de youtubeurs français.",
    thumb: { src: ASSETS.shopifyVideo.src, alt: ASSETS.shopifyVideo.alt },
    href: YT_SHOPIFY,
    mechanics: [
      { n: "01", label: "Le contenu", body: "Découvrir les restaurants lancés par des créateurs." },
      { n: "02", label: "La place de Shopify", body: "Une intégration pour présenter sa plateforme." },
      { n: "03", label: "Le prolongement", body: "Une invitation à créer son propre site avec Shopify." },
    ],
    resultValue: "1,3 M+",
    resultUnit: "vues de la vidéo",
    source: CASE_SOURCE_LAPORTE,
  };
}

export function adopteCase() {
  return {
    id: "adopte",
    partner: "Adopte",
    chain: "CYRILmp4",
    format: "Opération premium",
    year: null,
    kicker: "CYRILmp4 × Adopte · Opération premium",
    title: "Adopte, une expérience à deux.",
    context: "Un contenu autour des restaurants de stars, avec Le Grand JD en invité.",
    filmTitle: "La vérité sur les restaurants de Stars (ft. LE GRAND JD).",
    thumb: { src: ASSETS.adopte.src, alt: ASSETS.adopte.alt },
    href: YT_ADOPTE,
    guest: "Avec Le Grand JD",
    mechanics: [
      { n: "01", label: "L’angle", body: "Un rendez-vous dans les restaurants de stars." },
      { n: "02", label: "Le format", body: "Une expérience portée par Cyril et Le Grand JD, associée à Adopte." },
      { n: "03", label: "L’appel à l’action", body: "Mention de collaboration commerciale Adopte et code CYRILMP4." },
    ],
    excerptKicker: "Extrait du deck Le Grand JD × FAR, p. 8",
    excerpt: "Collaboration commerciale Adopte. Pour rencontrer de belles personnes sur Adopte : code CYRILMP4.",
    resultValue: "905 k",
    resultUnit: "vues de la vidéo",
    source: "Le Grand JD × FAR · V2, p. 8. Miniature du repository ; date de mesure non précisée.",
  };
}

function secondCase(cfg) {
  if (cfg.sectorCase === "adopte") return adopteCase();
  if (cfg.sectorCase === "deblock") return deblockCase();
  return shopifyCase();
}

function caseSlide(item) {
  return {
    id: item.id === "odoo" ? "cas-odoo" : "cas-deux",
    layout: "brandCase",
    kicker: item.kicker,
    title: item.title,
    context: item.context,
    filmTitle: item.filmTitle,
    chain: item.chain,
    guest: item.guest,
    thumb: item.thumb,
    href: item.href,
    mechanics: item.mechanics,
    excerpt: item.excerpt,
    excerptKicker: item.excerptKicker,
    resultValue: item.resultValue,
    resultUnit: item.resultUnit,
    source: item.source,
    partner: item.partner,
  };
}

function bankRows(cfg) {
  const featuredId = cfg.objective?.id || null;
  const rows = [
    {
      id: "presence",
      cells: [
        "Faire connaître votre marque.",
        "Deux chaînes YouTube aux univers identifiés.",
        "Des prises de parole dans les contenus qui correspondent à votre marque.",
      ],
    },
    {
      id: "proximity",
      cells: [
        "Faire comprendre un service.",
        "Des expériences filmées et des intégrations documentées.",
        "Un usage montré lorsque le service joue un rôle réel dans le projet.",
      ],
    },
    {
      id: "offer",
      cells: [
        "Incarner l’entrepreneuriat.",
        "Le parcours de fondateur et les activités de La Porte.",
        "Des contenus autour du lancement et du développement d’une activité.",
      ],
    },
  ];
  return rows.map((row) => ({ ...row, featured: featuredId === row.id }));
}

export function buildCyrilMp4BanquesDeck(overrides = {}) {
  const cfg = applyBankConfig(overrides);
  const bank = cfg.bankName;
  const contactHref = cfg.contactDetail?.includes("@") ? `mailto:${cfg.contactDetail}` : undefined;

  return createStudioDeck({
    id: "cyril-mp4-banques",
    title: bank ? `CYRILmp4 × ${bank}` : "CYRILmp4 × Banques",
    exportName: bank ? `CYRILmp4_x_${bank.replace(/\s+/g, "_")}` : "CYRILmp4_x_Banques",
    theme: "ivory",
    themeOverrides: cfg.accent ? { accent: cfg.accent } : undefined,
    readerChrome: "auto",
    slides: [
      {
        id: "cover",
        layout: "portraitCover",
        kicker: coverKicker(cfg),
        title: "CYRIL",
        channels: "CYRILmp4 / CYRILstudio",
        hook: "Créateur. Entrepreneur.",
        photo: ASSETS.founder,
        logos: cfg.bankLogo ? [{ src: cfg.bankLogo, alt: bank || "Banque" }] : [],
        source: "FAR",
      },
      {
        id: "parcours",
        layout: "editorialPath",
        kicker: "Le parcours",
        title: "Des vidéos. Des projets. Des entreprises.",
        body: "Cyril a développé deux chaînes YouTube et fondé le Groupe La Porte. Un parcours qui relie création de contenus et développement d’activités. Aujourd’hui, fondateur et président du Groupe La Porte.",
        photo: ASSETS.grandRex,
        markers: [
          { id: "2010", label: "2010", body: "Ses débuts sur YouTube." },
          { id: "2020", label: "2020", body: "La Porte Production." },
          { id: "2025", label: "2025", body: "FAR by La Porte." },
        ],
        source: `${SOURCES.groupe.label} · histoire et présentation.`,
      },
      {
        id: "mp4",
        layout: "channelSpread",
        kicker: "YouTube / 01",
        title: "CYRILmp4",
        subtitle: "Voyager. Explorer. Raconter.",
        metrics: [
          { value: "5 M+", label: "abonnés sur CYRILmp4" },
          { value: "1 Md+", label: "vues cumulées de la chaîne" },
          { value: "1 000+", label: "vidéos publiées" },
        ],
        families: [
          { n: "01", label: "Les docu-vlogs", body: "Une expérience vécue, racontée en immersion." },
          { n: "02", label: "Les chroniques", body: "Un sujet exploré avec son regard et son humour." },
          { n: "03", label: "Le divertissement", body: "Des découvertes et des expériences face caméra." },
        ],
        example: {
          src: ASSETS.africa.src,
          alt: ASSETS.africa.alt,
          title: "2 € dans la ville la moins chère d’Afrique",
          year: "2025",
          result: "1,6 M+ vues publiées par La Porte",
          href: YT_AFRICA,
          detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). Vues publiées par La Porte. Exemple historique, pas une moyenne de la chaîne.",
        },
        source: SOURCE_LINE_SHORT,
      },
      {
        id: "studio",
        layout: "channelSpread",
        theme: "ink",
        variant: "ink",
        kicker: "YouTube / 02",
        title: "CYRILstudio",
        subtitle: "Le jeu vidéo, sous toutes ses formes.",
        variant: "studio",
        metrics: [
          { value: "1 M+", label: "abonnés Studio" },
          { value: "100 M+", label: "vues cumulées" },
          { value: "250+", label: "vidéos publiées" },
        ],
        families: [
          { n: "01", label: "Tests", verb: "Tester.", body: "Prendre le jeu en main." },
          { n: "02", label: "Découvertes", verb: "Explorer.", body: "Découvrir d’autres univers de jeu." },
          { n: "03", label: "Avis", verb: "Partager.", body: "Donner son point de vue." },
          { n: "04", label: "Compilations", verb: "Sélectionner.", body: "Réunir des jeux et des moments." },
        ],
        example: {
          src: ASSETS.steam.src,
          alt: ASSETS.steam.alt,
          title: "J’ai acheté les jeux Steam les plus chers",
          year: "2024",
          result: "600 k+ vues publiées",
          href: YT_STEAM,
          detail: "Titre et chaîne vérifiés via YouTube (CYRILstudio). Vues publiées par La Porte.",
        },
        source: SOURCE_LINE_SHORT,
      },
      {
        id: "social",
        layout: "socialBeyond",
        kicker: "L’écosystème",
        title: "La relation continue au-delà de YouTube.",
        photo: ASSETS.experience,
        instagram: {
          value: "1,3 M+",
          label: "abonnés · chiffre publié sur le profil La Porte CYRILmp4",
          body: "Les projets et leurs coulisses.",
        },
        channels: [
          { id: "x", title: "X", body: "Les annonces et les échanges." },
          { id: "discord", title: "Discord", body: "Les rendez-vous de la communauté." },
          { id: "linkedin", title: "LinkedIn", body: "Le parcours d’entrepreneur." },
        ],
        note: "Des points de contact à choisir selon le partenariat, sans additionner leurs audiences.",
        source: `${SOURCES.laporteProfile.label}. Chiffre Instagram sans date de mesure précisée.`,
      },
      {
        id: "group",
        layout: "groupPortfolio",
        kicker: "Groupe La Porte",
        title: "Un entrepreneur. Cinq projets en action.",
        subtitle: "Cyril Soudant, fondateur et président du Groupe La Porte.",
        ventures: [
          {
            id: "chains",
            title: "La Porte CYRILmp4",
            body: "Création de contenus et développement de ses chaînes.",
            names: ["CYRILmp4", "CYRILstudio"],
          },
          {
            id: "production",
            title: "La Porte Production",
            body: "Production audiovisuelle. Documentaires, clips et formats web.",
            photo: ASSETS.shooting,
          },
          {
            id: "academy",
            title: "La Porte Académie",
            body: "Formation. « Devenir vidéaste », avec Cyril.",
            photo: ASSETS.academy,
          },
          {
            id: "beta",
            title: "La Porte Beta / Tryhard",
            body: "Développement de produits. Une marque de périphériques gaming.",
            photo: ASSETS.tryhard,
            fit: "contain",
          },
          {
            id: "far",
            title: "FAR by La Porte",
            body: "Accompagnement et développement des créateurs.",
            logo: "/far-logo.png",
          },
        ],
        tagline: "Créer des contenus. Produire. Former. Développer des produits. Accompagner des créateurs.",
        source: `${SOURCES.groupe.label} et présentations de ses activités.`,
      },
      caseSlide(odooCase()),
      caseSlide(secondCase(cfg)),
      {
        id: "interest",
        layout: "openBridges",
        kicker: "La proposition FAR",
        title: bank ? `Faire de ${bank} un partenaire de ses projets.` : "Faire de votre banque un partenaire de ses projets.",
        columns: ["Votre enjeu", "L’appui concret", "Ce que nous proposons"],
        rows: bankRows(cfg),
        note: "Territoires proposés, à sélectionner selon votre marque, votre offre et vos publics.",
        source: "Proposition stratégique FAR",
      },
      {
        id: "collaborer",
        layout: "partnershipArc",
        theme: "ink",
        kicker: "Construire ensemble",
        title: "Un premier projet pour donner le ton.",
        lead: "Une relation pour aller plus loin.",
        body: "Partir d’un objectif de votre banque et d’un projet de Cyril. Choisir ensuite le format et les points de contact pertinents.",
        moments: [
          {
            id: "temps-fort",
            kicker: "01 / Le point de départ",
            title: "Une idée commune.",
            body: "Un sujet qui compte pour Cyril et une place claire pour la banque.",
          },
          {
            id: "rendez-vous",
            kicker: "02 / L’expression",
            title: "Le bon format. La bonne chaîne.",
            body: "Intégration ou vidéo co-conçue, sur MP4 ou Studio selon le sujet.",
          },
          {
            id: "prolongements",
            kicker: "03 / La continuité",
            title: "Des prolongements choisis.",
            body: "Des contenus sociaux et des rendez-vous à construire dans la durée.",
          },
        ],
        signature: "FAR coordonne le cadrage, la conception et le suivi du partenariat.",
        source: "Proposition de collaboration. Formats, disponibilité, droits et calendrier à définir ensemble.",
      },
      {
        id: "close",
        layout: "typeClose",
        kicker: "Cyril × partenariats bancaires",
        title: "Votre banque.",
        title2: "Ses prochains projets.",
        lead: "Échangeons sur ce que nous pourrions construire ensemble.",
        channels: "CYRILmp4 / CYRILstudio",
        org: "FAR · Créateurs & partenariats",
        contactName: cfg.contactName || "Thibault Loué",
        contactDetail: cfg.contactDetail || "thibault.loue@far-agence.com",
        contactHref,
      },
    ],
  });
}

export const cyrilMp4BanquesDeck = buildCyrilMp4BanquesDeck();
