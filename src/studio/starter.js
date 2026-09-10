/**
 * Starter — copier ce fichier vers src/decks/<id>.js
 * puis l’enregistrer dans src/studio/registry.js.
 *
 * Le contenu ci-dessous est un gabarit vide de structure, pas un deck client.
 */
import { createStudioDeck } from "./createStudioDeck.js";

export function buildStarterDeck() {
  return createStudioDeck({
    id: "nouveau-deck",
    title: "Marque × Créateur",
    theme: "ivory",
    themeOverrides: {
      /* accent: "#0E8C74" */
    },
    slides: [
      {
        id: "cover",
        layout: "cover",
        kicker: "Collaboration",
        title: "Une phrase d’intention.",
        context: "Deux lignes de contexte, pas plus.",
        photo: { src: "/chemin.jpg", alt: "Sujet", focus: "center 20%", credit: "Crédit" },
        logos: [{ src: "/logo-partenaire.png", alt: "Partenaire" }],
      },
      {
        id: "insight",
        layout: "insight",
        title: "Le constat qui justifie la reco.",
        body: "Paragraphe rédigé, compréhensible sans voix off.",
        proofs: ["Preuve 1", "Preuve 2"],
        consequence: "Donc on recommande…",
        photo: { src: "/chemin.jpg", alt: "Preuve visuelle" },
        source: "Source datée",
      },
      {
        id: "concept",
        layout: "concept",
        title: "Nom du concept",
        hook: "Accroche.",
        body: "Ce que l’on voit réellement à l’écran.",
        photo: { src: "/chemin.jpg", alt: "Mise en situation" },
      },
      {
        id: "creator",
        layout: "creator",
        title: "Le créateur",
        body: "Univers, rôle dans l’opération, données datées.",
        photo: { src: "/portrait.jpg", alt: "Portrait" },
        metrics: [{ value: "—", label: "YouTube", asOf: "date", detail: "Source" }],
        source: "Chiffres fournis / datés",
      },
      {
        id: "case",
        layout: "case",
        title: "Cas",
        context: "Point de départ",
        response: "Ce qui a été fait",
        result: "Résultat documenté",
        lesson: "Enseignement utile ici",
        photo: { src: "/cas.jpg", alt: "Campagne" },
        logo: { src: "/marque.png", alt: "Marque" },
        source: "Source du résultat",
      },
      {
        id: "mechanic",
        layout: "mechanic",
        kind: "timeline",
        title: "Déploiement",
        steps: [
          { id: "a", when: "S1", title: "Étape", body: "Dépendance utile." },
        ],
      },
      {
        id: "budget",
        layout: "budget",
        chart: "bars",
        title: "Répartition",
        unit: "k€",
        items: [
          { id: "prod", label: "Production", value: 0, note: "Périmètre" },
        ],
        arbitration: "Pourquoi cet arbitrage.",
        source: "Une seule source de données",
      },
      {
        id: "social",
        layout: "social",
        title: "Déclinaisons",
        body: "Le contenu reste plus grand que la coque.",
        formats: [
          { kind: "story", src: "/story.jpg", alt: "Story 9:16", label: "Story 9:16" },
          { kind: "post", src: "/post.jpg", alt: "Post 4:5", label: "Post 4:5" },
          { kind: "youtube", src: "/thumb.jpg", alt: "Vignette 16:9", label: "YouTube 16:9" },
        ],
      },
      {
        id: "close",
        layout: "closing",
        title: "La prochaine décision.",
        action: "Qui fait quoi, pour quand.",
      },
    ],
  });
}
