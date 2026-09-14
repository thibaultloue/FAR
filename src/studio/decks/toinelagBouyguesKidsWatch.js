import { createStudioDeck } from "../createStudioDeck.js";
import {
  ASSETS,
  COMMENT,
  CONSULTED_ON,
  CONTACT,
  SOURCE_CHANNEL,
  SOURCES,
  VIDEOS,
} from "./toinelagBouyguesKidsWatch.assets.js";

const YT = {
  canape: VIDEOS[0].url,
  trampoline: VIDEOS[1].url,
  brainrot: VIDEOS[2].url,
};

export function buildToinelagBouyguesKidsWatchDeck() {
  return createStudioDeck({
    id: "toinelag-bouygues-kids-watch",
    title: "Toinelag × Bouygues Telecom",
    exportName: "Toinelag_x_Bouygues_Telecom_Kids_Watch",
    theme: "ivory",
    themeOverrides: {
      accent: "#009CCC",
    },
    readerChrome: "auto",
    slides: [
      {
        id: "cover",
        layout: "campaignCover",
        theme: "ink",
        kicker: "TOINELAG × BOUYGUES TELECOM",
        title: "Une pièce secrète.\nUne montre pour en sortir.",
        context: "Une vidéo dédiée autour de la Kids Watch.",
        tag: "Proposition de partenariat · Fin 2026 · FAR",
        photo: ASSETS.escalier,
        packshot: ASSETS.packshot,
        logos: [ASSETS.logoBouygues],
        photoCaption: "Référence éditoriale · Escalier — pas un tournage Bouygues.",
      },
      {
        id: "creator",
        layout: "creatorScale",
        kicker: "Le créateur",
        title: "Toinelag voit les choses en grand.",
        body: "Pièces secrètes, constructions et défis grandeur nature : un divertissement à suivre sur grand écran.",
        photo: ASSETS.portrait,
        metrics: [
          { group: "power", value: "1,97 M", label: "abonnés YouTube · chaîne principale" },
          { group: "power", value: "872 M", label: "vues cumulées · tous formats confondus" },
          { group: "audience", value: "7–15 ans", label: "cœur d’audience communiqué par FAR" },
          { group: "audience", value: "≈ 60 %", label: "consommation sur TV, communiquée par FAR" },
        ],
        conclusion: "Une opportunité de parler aux enfants et à leurs parents dans un même divertissement.",
        source: SOURCE_CHANNEL,
        sourceLinks: [
          { label: "NoxInfluencer", href: SOURCES.noxChannel.url },
          { label: "Brief FAR", href: SOURCES.farBrief.url },
        ],
      },
      {
        id: "proof",
        layout: "youtubeProof",
        theme: "ink",
        kicker: "Preuve éditoriale",
        title: "Les pièces secrètes, un format signature.",
        subtitle: "Des références à plusieurs millions de vues, dont une collaboration commerciale en 2026.",
        featured: {
          id: "canape",
          channel: "toinelag",
          title: "J'ai Construit une Pièce Secrète dans mon Canapé !",
          views: "8,7 M de vues",
          thumb: ASSETS.canape,
          href: YT.canape,
        },
        rail: [
          {
            id: "trampoline",
            title: "Je Construis une Pièce Secrète dans un Trampoline Park",
            views: "7,1 M de vues",
            thumb: ASSETS.trampoline,
            href: YT.trampoline,
          },
          {
            id: "brainrot",
            title: "Je CONSTRUIS une PIÈCE SECRÈTE dans Steal a Brainrot",
            views: "3,2 M de vues",
            note: "Collaboration Vinted, 2026",
            thumb: ASSETS.brainrot,
            href: YT.brainrot,
          },
        ],
        quote: {
          label: "Un spectateur propose déjà la prochaine cachette.",
          text: COMMENT.text,
          attr: "Extrait de commentaire public · vidéo de l’escalier",
        },
        source: `Consultées le ${CONSULTED_ON}. Fenêtres de mesure différentes.`,
        sourceLinks: [
          { label: "YouTube", href: YT.canape },
          { label: "NoxInfluencer", href: SOURCES.noxChannel.url },
          { label: "SocialRama", href: SOURCES.socialrama.url },
        ],
      },
      {
        id: "idea",
        layout: "formatProductFit",
        kicker: "Le fit",
        title: "Un format qu’ils aiment.\nUn objet qui y trouve sa place.",
        hook: "Sortir d’une pièce secrète en gardant le contact avec un complice, grâce à la Kids Watch.",
        format: {
          kicker: "Le format Toinelag",
          lines: [
            "Explorer un décor caché.",
            "Résoudre un défi avec un complice.",
            "Découvrir un passage inattendu.",
          ],
        },
        product: {
          kicker: "Le rôle du produit",
          lines: [
            "Communiquer sans smartphone côté Toinelag.",
            "Partager les indices à distance.",
            "Se coordonner pour avancer.",
          ],
        },
        equation: "Le format × le produit → la preuve par l’aventure",
        conclusion: "Le format crée l’envie.\nL’action rend le produit compréhensible.",
        readings: [
          { kicker: "Pour les enfants", body: "Un objet de mission dans un univers qu’ils connaissent." },
          { kicker: "Pour les parents", body: "Une démonstration concrète d’une alternative au premier smartphone." },
        ],
        targeting: "Kids Watch : dès 9 ans. Une proposition pertinente pour une partie du cœur d’audience et ses parents.",
      },
      {
        id: "rundown",
        layout: "gameBoard",
        kicker: "Le jeu",
        title: "Il voit les indices.\nSon complice a les réponses.",
        rule: "Un seul lien entre eux : la Kids Watch. Leur mission : trouver l’issue cachée.",
        steps: [
          {
            id: "cache",
            n: "01",
            title: "Trouver la cachette",
            channel: "Appel",
            body: "Le complice utilise son plan pour guider Toinelag vers le premier indice.",
          },
          {
            id: "symbols",
            n: "02",
            title: "Décoder les symboles",
            channel: "Visio",
            body: "Toinelag montre un motif. Le complice possède la légende pour le traduire.",
          },
          {
            id: "door",
            n: "03",
            title: "Ouvrir le passage",
            channel: "Message vocal",
            body: "Toinelag réécoute la séquence envoyée pour régler le mécanisme dans le bon ordre.",
          },
        ],
        accompliceNote: "Le plan distant reprend les trois zones. L’humain décode : la montre ne lit pas les symboles.",
        payoff: "Le dernier mécanisme révèle le passage caché. Le duo se retrouve.",
        schemaNote: "Schéma de principe · scénario et décor à développer avec le créateur.",
      },
      {
        id: "product",
        layout: "productAnnotate",
        kicker: "Le produit",
        title: "Une montre autonome.\nLe lien au poignet.",
        definition: "La Kids Watch est une montre connectée 4G dès 9 ans, encadrée par une application parentale.",
        product: ASSETS.productCall,
        game: [
          { title: "Autonome côté Toinelag.", body: "Il communique sans smartphone à proximité." },
          { title: "Appels et visio.", body: "Le duo peut se guider et partager ce qu’il voit." },
          { title: "Messages vocaux.", body: "Une instruction peut être transmise pour la suite de la mission." },
        ],
        parents: [
          { title: "Des contacts choisis.", body: "Le répertoire est défini dans l’application parentale." },
          { title: "Pas de web ni de réseaux sociaux.", body: "Les échanges restent centrés sur les contacts autorisés." },
          { title: "Des usages encadrés.", body: "Mode école et fonctions de localisation via l’application." },
        ],
        conclusion: "Un outil pour participer à l’aventure ; une façon de garder le lien avant le premier smartphone.",
        modelNote: "Modèle documenté : TCL Kids Watch MT46. Référence vendue à confirmer avec Bouygues.",
        source: `Consultée le ${CONSULTED_ON}.`,
        sourceLinks: [{ label: "Bouygues Telecom, page Kids Watch", href: SOURCES.kidsWatch.url }],
      },
      {
        id: "device",
        layout: "deviceArch",
        kicker: "Le dispositif",
        title: "Faire découvrir. Donner envie d’essayer.",
        core: {
          title: "1 vidéo YouTube dédiée",
          body: "Sur la chaîne principale de Toinelag.",
          role: "La Kids Watch intervient dans la résolution de l’aventure.",
        },
        branches: [
          {
            id: "clips",
            title: "Faire circuler l’idée",
            body: "Des extraits des moments de coopération, pour les canaux à convenir avec Bouygues.",
          },
          {
            id: "retail",
            title: "Faire essayer le produit",
            body: "Un mini-défi en boutique pilote : l’un voit un modèle, l’autre le reconstitue grâce à leurs échanges.",
          },
        ],
        benefit: "La vidéo crée l’intérêt. Les extraits rappellent l’usage. L’essai permet aux familles de comprendre l’objet.",
        note: "Périmètre, extraits et éventuelle présence en magasin à convenir. Aucun volume, droit, budget ou résultat n’est promis.",
      },
      {
        id: "close",
        layout: "closeTimeline",
        theme: "ink",
        kicker: "Next steps",
        title: "Prêts pour une aventure avant Noël.",
        window: "Objectif de diffusion : fin novembre / début décembre 2026.",
        steps: [
          {
            when: "Septembre · Alignement",
            bullets: [
              "Valider le concept, le périmètre et l’enveloppe.",
              "Confirmer le produit et la disponibilité du créateur.",
            ],
          },
          {
            when: "Octobre · Création et préparation",
            bullets: [
              "Écrire les épreuves et concevoir le décor.",
              "Tester la montre, les appels, la visio et les vocaux en conditions de tournage.",
            ],
          },
          {
            when: "Novembre · Production",
            bullets: [
              "Tourner puis monter la vidéo.",
              "Organiser les validations prévues avec Bouygues.",
            ],
          },
          {
            when: "Fin novembre / début décembre · Diffusion",
            bullets: [
              "Publier la vidéo.",
              "Activer les prolongements retenus.",
            ],
          },
        ],
        action: "le concept,\nle périmètre,\nle créneau.",
        org: CONTACT.org,
        contactName: CONTACT.name,
        contactDetail: CONTACT.detail,
        contactHref: CONTACT.href,
        disclaimer: "Calendrier indicatif, sous réserve des validations et disponibilités.",
      },
    ],
  });
}

export const toinelagBouyguesKidsWatchDeck = buildToinelagBouyguesKidsWatchDeck();
