import { createStudioDeck } from "../createStudioDeck.js";
import { applyBankConfig } from "./cyrilMp4Banques.config.js";
import { ASSETS, SOURCE_LINE, SOURCES } from "./cyrilMp4Banques.assets.js";

const YT_AFRICA = "https://www.youtube.com/watch?v=bVk4i_PYxug";
const YT_TRAIN = "https://www.youtube.com/watch?v=70I94z_2toM";
const YT_HOTELS = "https://www.youtube.com/watch?v=ZKlLgxLz_qI";
const YT_DEBLOCK = "https://www.youtube.com/watch?v=nCDJo4w-Z8U";
const YT_SHOPIFY = "https://www.youtube.com/watch?v=myElp75-ZIc";

function coverKicker(cfg) {
  if (cfg.bankName) return `${cfg.bankName} × CYRILmp4 · FAR`;
  return "Partenariats bancaires · FAR";
}

function opportunityLinks(cfg) {
  const featuredId = cfg.objective?.id || null;
  const base = [
    {
      id: "presence",
      title: "Présence à l'esprit",
      body: "Rendre la marque reconnaissable dans un contenu choisi.",
    },
    {
      id: "proximity",
      title: "Proximité",
      body: "L'associer à un projet et à une expérience compréhensibles.",
    },
    {
      id: "offer",
      title: "Intérêt pour une offre",
      body: "Proposer une suite pertinente lorsque le produit et l'audience le permettent.",
    },
  ];
  return base.map((link) => ({ ...link, featured: featuredId === link.id }));
}

function deblockCase() {
  return {
    partner: "Deblock",
    year: "2024",
    idea: "Ambassadorat : contenus et carte dédiée pour donner de la notoriété à une offre financière. Deblock est un acteur financier, pas une banque.",
    resultValue: "+3,5 M",
    resultLabel: "vues cumulées · publication La Porte",
    photo: { src: ASSETS.deblockVideo.src, alt: ASSETS.deblockVideo.alt, focus: "center 35%" },
    href: YT_DEBLOCK,
    hrefLabel: "Vidéo de référence",
    detail:
      "La Porte publie « +3,5M vues cumulées » pour cet ambassadorat 2024. Périmètre : vues cumulées telles que présentées sur le profil officiel, pas des personnes uniques, pas des clients acquis. Le lien YouTube est une référence de contenu, pas la preuve de l'étendue des droits. Statut actuel, exclusivités et autorisation de citation : à vérifier avant tout envoi commercial. Aucune disponibilité contractuelle n'est affirmée ici.",
  };
}

function odooCase() {
  return {
    partner: "Odoo",
    year: "2023",
    idea: "Vidéo dédiée : tester des hôtels insolites et créer un site de notation, pour que le produit trouve une fonction dans l'histoire.",
    resultValue: "+1,4 M",
    resultLabel: "vues · publication La Porte",
    photo: { src: ASSETS.hotels.src, alt: ASSETS.hotels.alt, focus: "center 40%" },
    href: YT_HOTELS,
    hrefLabel: "Voir la vidéo",
    detail:
      "La Porte publie « +1,4M vues » pour cette vidéo dédiée 2023. Périmètre : vues de cette réalisation telles que présentées sur le profil officiel. Le concept place l'outil dans le récit (notation des hôtels), plutôt qu'une présence collée après coup.",
  };
}

function shopifyCase() {
  return {
    partner: "Shopify",
    year: "2024",
    idea: "Intégration dans une vidéo dont le sujet partageait les valeurs de la marque.",
    resultValue: "+1,3 M",
    resultLabel: "vues · publication La Porte",
    photo: { src: ASSETS.shopifyVideo.src, alt: ASSETS.shopifyVideo.alt, focus: "center 40%" },
    href: YT_SHOPIFY,
    hrefLabel: "Voir la vidéo",
    detail:
      "La Porte publie « +1,3M vues » pour cette intégration 2024. Cas documenté CYRILmp4, distinct d'une collaboration financière.",
  };
}

export function buildCyrilMp4BanquesDeck(overrides = {}) {
  const cfg = applyBankConfig(overrides);
  const bank = cfg.bankName;
  const cases = cfg.sectorCase === "shopify" ? [shopifyCase(), odooCase()] : [deblockCase(), odooCase()];
  const projectTitle = cfg.projectTitle || "J'ai retrouvé un lieu à partir d'une seule photo.";
  const projectHook = cfg.projectHook || "Cyril part d'une photographie dont le lieu reste à retrouver. Il prépare l'itinéraire, mène l'enquête sur place et avance grâce aux rencontres.";
  const partnerRole =
    cfg.partnerRole ||
    (bank
      ? `${bank} apparaît comme partenaire identifié du voyage et de sa préparation. Un service de mobilité ou de paiement peut trouver sa place s'il correspond réellement à l'offre.`
      : "Partenaire identifié du voyage et de sa préparation. Un service de mobilité ou de paiement peut trouver sa place s'il correspond réellement à l'offre de la banque.");
  const perimeter =
    cfg.perimeterNote ||
    "Périmètre indicatif d'un pilote à discuter : 1 vidéo principale, 2 extraits verticaux conçus comme contenus courts, 1 séquence de Stories. Les plateformes, volumes et droits se négocient.";
  const contact =
    cfg.contactName && cfg.contactDetail
      ? `${cfg.contactName} · ${cfg.contactDetail}`
      : cfg.contactName || cfg.contactDetail || null;

  return createStudioDeck({
    id: "cyril-mp4-banques",
    title: bank ? `CYRILmp4 × ${bank}` : "CYRILmp4 × Banques",
    exportName: bank ? `CYRILmp4_x_${bank.replace(/\s+/g, "_")}` : "CYRILmp4_x_Banques",
    theme: "ivory",
    themeOverrides: { accent: cfg.accent || "#C9A24B" },
    slides: [
      {
        id: "cover",
        layout: "cover",
        kicker: coverKicker(cfg),
        title: "CYRILmp4",
        hook: "Prenez part à la prochaine aventure.",
        photo: ASSETS.cover,
        logos: cfg.bankLogo ? [{ src: cfg.bankLogo, alt: bank || "Banque" }] : [],
        source: "FAR · CYRILmp4",
      },
      {
        id: "creator",
        layout: "creator",
        kicker: "Le créateur",
        title: "Il va voir pour de vrai.",
        body: "Cyril transforme une curiosité en expérience filmée. Il découvre des lieux, rencontre des personnes et raconte ce qu'il vit avec un regard accessible et une place pour l'humour. Son public suit autant une histoire que la personne qui la traverse.",
        photo: ASSETS.portrait,
        detail: ASSETS.shooting,
        points: [
          { label: "Exploration", body: "Donner accès à des lieux et des expériences." },
          { label: "Récit", body: "Une question, des découvertes, une progression." },
          { label: "Incarnation", body: "Une manière personnelle de faire vivre le sujet." },
        ],
        source: "Lecture éditoriale des contenus CYRILmp4. Ces trois repères ne sont pas des citations de Cyril.",
      },
      {
        id: "repertoire",
        layout: "repertoire",
        kicker: "Le répertoire",
        title: "Des histoires qu'on a envie de suivre jusqu'au bout.",
        videos: [
          {
            id: "africa",
            title: "2€ dans la ville la moins chère d'Afrique !",
            year: "2025",
            kind: "Immersion",
            role: "Un docu-vlog d'exploration : arriver, comprendre un lieu, le raconter de l'intérieur.",
            src: ASSETS.africa.src,
            alt: ASSETS.africa.alt,
            href: YT_AFRICA,
            detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). Le profil La Porte date ce docu-vlog de 2025 et publie +1,6 M de vues pour cette pièce. Les vues ne mesurent pas la rétention de toute la chaîne.",
          },
          {
            id: "train",
            title: "24H SUR LE TRAIN LE PLUS DANGEREUX DU MONDE !",
            year: "2023",
            kind: "Immersion",
            role: "Une traversée filmée du Sahara à bord d'un train hors norme. Le film montre l'immersion, pas un modèle de prise de risque à reproduire.",
            src: ASSETS.train.src,
            alt: ASSETS.train.alt,
            href: YT_TRAIN,
            detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). La page FAR date le film de 2023 et publie +1,5 M de vues. Référence d'immersion, pas un brief de danger à copier.",
          },
          {
            id: "hotels",
            title: "J'ai testé les hôtels les plus BIZARRES du monde",
            year: "2023",
            kind: "Découverte",
            role: "Une enquête de terrain dans des lieux insolites, avec une progression qui donne envie d'aller au bout.",
            src: ASSETS.hotels.src,
            alt: ASSETS.hotels.alt,
            href: YT_HOTELS,
            detail: "Titre et chaîne vérifiés via YouTube (CYRILmp4). Cette vidéo est aussi le support de la collaboration Odoo documentée en 2023. Ici elle illustre le format. Le résultat commercial est sur la slide preuves.",
          },
        ],
        source: `Titres exacts YouTube CYRILmp4. Miniatures officielles des vidéos liées. ${SOURCE_LINE}`,
      },
      {
        id: "audience",
        layout: "creator",
        kicker: "L'audience",
        title: "Qui regarde Cyril ?",
        body:
          cfg.audienceNote ||
          "Les abonnés indiquent la taille d'une communauté. Le choix d'un partenariat se construit aussi avec les audiences réellement touchées et les performances des formats retenus. Sans export analytics, cette slide reste un ordre de grandeur public, insuffisant à lui seul pour une décision média.",
        photo: {
          src: ASSETS.africa.src,
          alt: "Photogramme d'un contenu CYRILmp4, miniature YouTube de la vidéo 2025",
          focus: "center 30%",
        },
        metrics: [
          {
            value: "+5 M",
            label: "YouTube CYRILmp4",
            asOf: "présentation La Porte",
            detail: `Abonnés, chaîne @CYRILmp4 uniquement. ${SOURCE_LINE} Ne pas fusionner avec CYRILstudio (+1 M d'abonnés, chaîne distincte).`,
          },
          {
            value: "+1 Md",
            label: "Vues YouTube MP4",
            asOf: "présentation La Porte",
            detail: `Vues de la chaîne CYRILmp4 telles que publiées. ${SOURCE_LINE} Ne pas confondre avec « +1,5 milliard de vues sur toutes les plateformes ».`,
          },
          {
            value: "+1,3 M",
            label: "Instagram @cyrilmp4",
            asOf: "présentation La Porte",
            detail: `Compteur Instagram séparé. ${SOURCE_LINE} YouTube et Instagram ne s'additionnent pas en « personnes touchées ».`,
          },
        ],
        source: SOURCE_LINE,
      },
      {
        id: "preuves",
        layout: "cases",
        kicker: "Les preuves",
        title: "Les marques ont déjà pris part à ses projets.",
        lead: "Une présence de marque peut prendre la forme d'un dispositif suivi ou d'un rôle directement intégré au concept.",
        cases,
        source: `${SOURCES.laporteProfile.label} · ${SOURCES.laporteProfile.url} · consulté le 10 sept. 2026. Résultats historiques, pas une prévision de campagne.`,
      },
      {
        id: "interet",
        layout: "opportunity",
        kicker: bank ? `Intérêt pour ${bank}` : "L'intérêt",
        title: bank ? `${bank} peut faire partie du départ.` : "Votre banque peut faire partie du départ.",
        body: "Voyager, apprendre, mener un projet à terme : ce sont des moments dans lesquels une banque peut trouver une place concrète. Avec Cyril, cette association se raconte au fil d'une expérience, depuis sa préparation jusqu'à ce qu'elle permet de vivre. Ce sont des objectifs, pas des résultats promis. Cyril n'est pas conseiller financier.",
        links: opportunityLinks(cfg),
        flow: [
          { id: "projet", kicker: "01", label: "Projet", body: "Une aventure à préparer.", detail: "Un sujet qui se tient sans la marque, puis un rôle qui a du sens pour elle." },
          { id: "aventure", kicker: "02", label: "Aventure vécue", body: "Le film que l'on suit.", detail: "Cyril traverse l'expérience et la raconte. La banque n'anime pas un tutoriel." },
          {
            id: "role",
            kicker: "03",
            label: bank ? `Rôle de ${bank}` : "Rôle de la banque",
            body: "Présence, soutien, service utile.",
            detail: "Soutenir la production et, lorsque c'est pertinent, mettre en scène un service réellement utile et validé. Aucun crédit à souscrire pour vivre un rêve.",
          },
        ],
        photo: ASSETS.cover,
        source: "Objectifs de communication à travailler. Aucune garantie d'acquisition, de préférence ou de comptes ouverts.",
      },
      {
        id: "collaborer",
        layout: "paths",
        kicker: "Collaborer",
        title: "3 façons d'entrer dans l'aventure.",
        paths: [
          {
            id: "integration",
            title: "Intégration contextuelle",
            kicker: "01",
            body: "La marque rejoint un contenu MP4 dont le sujet lui correspond. Une prise de parole identifiée et préparée avec Cyril.",
            photo: { src: ASSETS.africa.src, alt: ASSETS.africa.alt, focus: "center 40%" },
          },
          {
            id: "dediee",
            featured: true,
            title: "Vidéo dédiée co-conçue",
            kicker: "À privilégier",
            body: "Le concept est développé autour d'une aventure et d'un rôle précis pour le partenaire. La banque intervient au moment où sa présence a du sens.",
            photo: { src: ASSETS.hotels.src, alt: ASSETS.hotels.alt, focus: "center 42%" },
          },
          {
            id: "duree",
            title: "Partenariat dans la durée",
            kicker: "03",
            body: "Plusieurs projets reliés par une même relation de marque. Le rythme, les droits et l'éventuelle exclusivité se définissent ensemble, après vérification des engagements existants.",
            photo: { src: ASSETS.terrain.src, alt: ASSETS.terrain.alt, focus: "center 30%" },
          },
        ],
        source: "Options de discussion, pas des engagements déjà disponibles. Aucun tarif ni volume annuel n'est fixé ici.",
      },
      {
        id: "piste",
        layout: "pilot",
        kicker: "Exemple de concept à développer",
        title: projectTitle,
        hook: projectHook,
        body: "La promesse du film : découvrir où cette image a été prise et ce qu'il y a autour. Cette piste ouvre la discussion. Elle ne remplace pas un projet du calendrier MP4 s'il est plus pertinent.",
        role: partnerRole,
        photo: ASSETS.indice,
        thumb: {
          src: ASSETS.indice.src,
          alt: "Aperçu de miniature YouTube, texte à écrire avec le partenaire",
          caption: "Miniature d'exemple. Titre, lieu et tournage restent à écrire. Rien n'est confirmé.",
        },
        plans: [
          { id: "image", title: "L'image et les indices", body: "Installer la question qui donne envie de regarder." },
          { id: "enquete", title: "L'enquête", body: "Choix de trajet, rencontres, progression vers le lieu." },
          { id: "decouverte", title: "La découverte", body: "Révéler l'endroit et l'expérience vécue pour y arriver." },
        ],
        source: "Proposition originale FAR. Photo-indice : Yair Haklai, Wikimedia Commons, CC BY-SA 4.0. Ce n'est pas un cliché de Cyril ni le lieu d'un tournage prévu.",
      },
      {
        id: "dispositif",
        layout: "device",
        kicker: "Le dispositif",
        title: "Une aventure, plusieurs points de rencontre.",
        youtube: {
          src: ASSETS.africa.src,
          alt: "Maquette 16:9 à partir d'une miniature CYRILmp4 réelle",
          label: "Vidéo YouTube CYRILmp4 · 16:9. Le film porte le récit.",
        },
        verticals: [
          { src: ASSETS.africa.src, alt: "Maquette d'extrait vertical 9:16", focus: "center 20%", label: "Extrait vertical · 9:16" },
          { src: ASSETS.train.src, alt: "Maquette d'extrait vertical 9:16", focus: "center 25%", label: "Stories · 9:16" },
        ],
        partnerZone: {
          kicker: bank || "Partenaire",
          title: bank ? `Page ${bank}` : "Page de la banque",
          body: "Informations utiles et prochaine action, lorsque l'offre le justifie. Uniquement si cette page est pertinente.",
        },
        flow: [
          { id: "yt", kicker: "01", label: "YouTube MP4", body: "Le récit.", detail: "Une vidéo principale pour raconter l'expérience." },
          { id: "social", kicker: "02", label: "Extraits sociaux", body: "Donner envie.", detail: "Deux extraits verticaux conçus comme contenus courts, plus une séquence de Stories." },
          { id: "relais", kicker: "03", label: "Relais partenaire", body: "Prolonger.", detail: "Réutilisations par la marque uniquement selon les droits négociés." },
          {
            id: "page",
            kicker: "04",
            label: bank ? `Page ${bank}` : "Page banque",
            body: "Si utile.",
            detail: "Une page dédiée seulement si elle apporte une information ou une action réelle.",
          },
        ],
        perimeter,
        source: "Maquette de formats. Aucun like, commentaire ou compteur de vues n'est simulé. TikTok, X et CYRILstudio ne sont pas ajoutés par défaut.",
      },
      {
        id: "cadre",
        layout: "framework",
        kicker: "Le cadre",
        title: "Une collaboration préparée de bout en bout.",
        uid: "cyril-banques-cadre",
        steps: [
          { id: "obj", when: "01", title: "Objectif", body: "Ce que l'on cherche à faire ensemble." },
          { id: "concept", when: "02", title: "Concept", body: "L'aventure et le rôle du partenaire." },
          { id: "messages", when: "03", title: "Messages", body: "Promesses produit validées par la banque." },
          { id: "prod", when: "04", title: "Production", body: "Récit et réalisation portés par Cyril et l'équipe." },
          { id: "diff", when: "05", title: "Diffusion", body: "YouTube, extraits, relais négociés." },
          { id: "bilan", when: "06", title: "Bilan", body: cfg.calendarNote || "Audience, visionnage, et actions mesurées par la banque si le dispositif est raccordé." },
        ],
        photo: ASSETS.production,
        roles: [
          { who: "FAR", body: "Coordonne la relation, le périmètre et le calendrier." },
          { who: "Cyril", body: "Porte le récit et la réalisation, avec l'équipe créative retenue." },
          { who: bank || "Banque", body: "Valide ses promesses produit et le cadre de communication." },
        ],
        pricing: "Production, rémunération, droits, déclinaisons et amplification. Séparer la création de l'achat média. Aucun ROI ni nombre de comptes ouverts n'est garanti.",
        source: "Méthode de travail proposée. Pas un contrat, pas un avis juridique.",
      },
      {
        id: "close",
        layout: "closing",
        kicker: "FAR × CYRILmp4",
        title: "Quelle sera notre première aventure ?",
        action: "Choisir un objectif, un projet et un périmètre de collaboration.",
        contact,
        photo: ASSETS.cover,
        source: "FAR",
      },
    ],
  });
}

export const cyrilMp4BanquesDeck = buildCyrilMp4BanquesDeck();
