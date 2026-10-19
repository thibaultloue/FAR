import { createStudioDeck } from "../createStudioDeck.js";
import {
  ASSETS,
  CONTACT,
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
        title: "Une pièce secrète.\n2 enfants à guider.",
        context: "Une vidéo dédiée autour de la Kids Watch Bouygues Telecom.",
        photo: ASSETS.escalier,
        logos: [ASSETS.logoBouygues],
      },
      {
        id: "creator",
        layout: "creatorScale",
        kicker: "Le créateur",
        title: "Toinelag voit les choses en grand.",
        body: "Missions, cache-cache, grandes constructions et divertissement familial :\nun territoire déjà suivi sur grand écran.",
        photo: ASSETS.portrait,
        metrics: [
          { group: "power", value: "1,97 M", label: "abonnés YouTube" },
          { group: "power", value: "879 M", label: "vues cumulées" },
          { group: "audience", value: "7–15 ans", label: "cœur d’audience" },
          { group: "audience", value: "≈ 60 %", label: "consommation sur TV" },
        ],
        insight: "Les enfants regardent les vidéos avec leur parent, ce qui crée de vrais moments de famille.",
      },
      {
        id: "proof",
        layout: "youtubeProof",
        theme: "ink",
        title: "Les pièces secrètes, un format signature.",
        definition:
          "Toinelag construit une pièce cachée dans un lieu du quotidien : un canapé, un trampoline park, un escalier. Il s’y installe, et en fait une mission à suivre. C’est son format signature : un cache-cache grandeur nature, déjà vu à plusieurs millions de vues, dont une collaboration commerciale en 2026.",
        subtitle: "Trois références, le même jeu.",
        featured: {
          id: "canape",
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
            note: "Collaboration Vinted",
            thumb: ASSETS.brainrot,
            href: YT.brainrot,
          },
        ],
        message: "Un format déjà installé, spectaculaire, et naturellement compatible avec une marque.",
      },
      {
        id: "rundown",
        layout: "gameBoard",
        kicker: "Concept",
        title: "Toinelag les guide.\nEux seuls peuvent trouver la pièce.",
        photo: ASSETS.watchWrist,
        rule: "Toinelag a caché une pièce secrète. 2 enfants la cherchent sur place. Il les guide à distance, uniquement avec la Kids Watch.",
        beats: [
          {
            id: "build",
            n: "01",
            label: "Toinelag",
            title: "Toinelag cache une pièce secrète.",
            body: "Comme à son habitude, il a construit une pièce secrète, flambant neuve, dont rêvent les enfants : télévision, mini-frigo rempli, friandises, jouets, lumières. Les couleurs Bouygues colorent la pièce.",
          },
          {
            id: "seek",
            n: "02",
            label: "2 enfants",
            title: "Les enfants cherchent, il les guide à distance.",
            body: "Les 2 enfants explorent le lieu ensemble. Toinelag les suit depuis un poste de contrôle et leur donne les indications au fur et à mesure. Fausse piste, code à trouver, porte bloquée : chaque rebondissement se joue en direct, jusqu’à la pièce.",
          },
          {
            id: "link",
            n: "03",
            label: "Kids Watch",
            title: "La Kids Watch porte toute la mission.",
            body: "Appel, visio, messages vocaux : les fonctions de la montre sont utilisées nativement dans le jeu. Toinelag appelle pour lancer, voit ce qu’ils voient, envoie un vocal pour débloquer. Du premier pas jusqu’à l’ouverture, tout passe par la Kids Watch.",
          },
        ],
      },
      {
        id: "device",
        layout: "deviceArch",
        kicker: "Intégration marque",
        title: "Bouygues tient un vrai rôle dans la mission.",
        cards: [
          {
            title: "Vidéo YouTube dédiée",
            body: "1 film sur la chaîne principale. La Kids Watch y structure le récit : Toinelag guide les 2 enfants par appel, visio et messages vocaux.",
          },
          {
            title: "Relais social",
            body: "Les moments montre se déclinent en extraits et formats courts, sur les canaux concertés avec Bouygues Telecom. La conversation prolonge l’usage vu dans la vidéo.",
          },
          {
            title: "Activation terrain",
            body: "Boutique ou démonstration familiale, à activer selon le plan Bouygues Telecom. Un relais hors YouTube, pour faire essayer le produit.",
          },
        ],
        benefit: "La vidéo installe le produit. Les relais prolongent l’usage.",
      },
      {
        id: "product",
        layout: "brandBenefits",
        kicker: "Bénéfices",
        title: "Pourquoi cette idée est intéressante pour Bouygues Telecom",
        lead: "Parler aux enfants, et à ceux qui décident avec eux, dans un format qu’ils regardent déjà.",
        items: [
          {
            title: "Un concept immédiat",
            body: "1 pièce secrète, 2 enfants, 1 montre. Rien à expliquer.",
          },
          {
            title: "Un format déjà installé",
            body: "Les pièces secrètes sont un format signature, déjà vu à plusieurs millions de vues.",
          },
          {
            title: "Le produit en usage",
            body: "Appel, visio, vocal : la Kids Watch rend la mission possible.",
          },
          {
            title: "Une double lecture",
            body: "Enfant : aventure et autonomie. Parent : contact utile, sans web ni réseaux sociaux.",
          },
        ],
      },
      {
        id: "close",
        layout: "closeTimeline",
        kicker: "Timeline",
        title: "Une sortie début / mi-décembre.",
        steps: [
          { when: "Mi-octobre", bullets: ["Valider le concept, le périmètre et l’intégration produit."] },
          { when: "Fin octobre", bullets: ["Écriture, lieu, casting enfants, sécurité, storyboard."] },
          { when: "Novembre", bullets: ["Tournage, montage et déclinaisons social."] },
          { when: "Début / mi-décembre", bullets: ["Mise en ligne de la vidéo."] },
        ],
        org: CONTACT.org,
        contactName: CONTACT.name,
        contactDetail: CONTACT.detail,
        contactHref: CONTACT.href,
      },
    ],
  });
}

export const toinelagBouyguesKidsWatchDeck = buildToinelagBouyguesKidsWatchDeck();
