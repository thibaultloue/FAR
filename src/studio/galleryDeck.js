import { createStudioDeck } from "./createStudioDeck.js";

/** Données d’exemple pour le diagramme — une seule source, totaux dérivés. */
export const GALLERY_BUDGET = {
  unit: "k€",
  items: [
    { id: "prod", label: "Production", value: 72, note: "Tournage, post-prod, droits d’image. Périmètre France, 6 mois." },
    { id: "media", label: "Amplification", value: 48, note: "Paid social autour des pièces organiques, pas un plan média séparé." },
    { id: "talent", label: "Talent & équipe", value: 36, note: "Créateur, production FAR, coordination marque." },
    { id: "make", label: "Produit / décor", value: 24, note: "Objets, cuisine, logistique de tournage." },
  ],
  arbitration:
    "La production reste le premier poste : sans pièce regardable, l’amplification n’a rien à pousser. L’achat média est un filet, pas le concept.",
};

const COVER = {
  kicker: "Galerie FAR Studio",
  title: "Le deck comme objet éditorial.",
  context: "Une slide, un cadre 16:9, une idée lisible sans voix off.",
  photo: {
    src: "/garmin-cyril-photo.png",
    alt: "CYRILmp4 en terrain, photographie existante du site FAR",
    focus: "center 25%",
    credit: "Photo déjà publiée sur far.thibaultloue.com",
  },
  logos: [],
  source: "Exemple de composition · galerie de développement",
};

export const galleryDeck = createStudioDeck({
  id: "studiogallery",
  title: "FAR Studio · galerie",
  theme: "ivory",
  slides: [
    {
      id: "cover",
      layout: "cover",
      theme: "ivory",
      ...COVER,
    },
    {
      id: "cover-ink",
      layout: "cover",
      theme: "ink",
      ...COVER,
      title: "Le deck comme objet éditorial.",
      kicker: "Même composition · thème encre",
    },
    {
      id: "concept",
      layout: "concept",
      kicker: "Concept de campagne",
      title: "L’envers du drop.",
      hook: "Une semaine dans la préparation réelle d’un drop Lockd, filmée avec Le Bouseuh.",
      body: "On voit les arbitrages de gamme, le stress de la mise en ligne, le regard du créateur-fondateur. Shopify n’est pas un logo en bas d’écran : c’est l’outil avec lequel on fabrique le drop. Cette slide est un exemple de mise en page, reprise d’un pitch FAR déjà rédigé.",
      photo: {
        src: "/bouseuh-lockd.png",
        alt: "Le Bouseuh, univers Lockd",
        focus: "center center",
      },
      source: "Pitch Activation Shopify × Le Bouseuh × Lockd · exemple de composition",
    },
    {
      id: "case",
      layout: "case",
      kicker: "Cas",
      title: "Rendre une marque légitime dans un format déjà prévu.",
      context: "Un format food existe, l’audience est là, la marque n’a pas encore de rôle éditorial.",
      response: "On cherche l’angle qui place le produit au centre du récit, plutôt qu’une insertion collée après coup. L’exemple visuel est Emma × FastGoodCuisine, déjà cité dans le deck Grand JD.",
      result: "Aucun chiffre de campagne n’est inventé ici. La slide montre la structure : contexte, réponse, résultat, enseignement.",
      lesson: "Le cas ne vaut que s’il aide à décider le prochain brief, pas s’il décore la page.",
      photo: {
        src: "/grandjd/emma-integration.jpg",
        alt: "Intégration Emma dans un format FastGoodCuisine",
        focus: "center center",
      },
      logo: { src: "/fgc.webp", alt: "FastGoodCuisine" },
      source: "Structure d’exemple · visuel Grand JD × FAR",
    },
    {
      id: "creator",
      layout: "creator",
      kicker: "Créateur",
      title: "FastGoodCuisine, média food et entrepreneur.",
      body: "Charles Gilles-Compagnon tient la plus grosse chaîne food française, avec des formats de tests, hacks et dégustations. Les chiffres ci-dessous sont datés. Ils ne sont pas des moyennes d’engagement inventées.",
      photo: {
        src: "/fgc.webp",
        alt: "FastGoodCuisine",
        focus: "center 20%",
      },
      metrics: [
        { value: "8,7M", label: "YouTube", asOf: "août 2026", detail: "Abonnés YouTube, sources publiques août 2026 (SocialCounts / Inside Créateurs)." },
        { value: "2,4M", label: "Instagram", asOf: "2026", detail: "Followers Instagram, ordre de grandeur 2026." },
        { value: "2,6M", label: "TikTok", asOf: "sept. 2026", detail: "Followers TikTok relevés sur le profil public @fastgoodcuisine." },
      ],
      source: "Sources publiques datées · pas de métrique inventée",
    },
    {
      id: "budget",
      layout: "budget",
      chart: "bars",
      uid: "gallery-budget",
      kicker: "Budget",
      title: "Répartition d’une activation de 6 mois.",
      unit: GALLERY_BUDGET.unit,
      items: GALLERY_BUDGET.items,
      arbitration: GALLERY_BUDGET.arbitration,
      note: "Cliquez une barre pour le détail. Les montants sont fictifs, saisis une seule fois, totaux calculés.",
      source: "Données fictives de démonstration · galerie Studio",
    },
    {
      id: "social",
      layout: "social",
      kicker: "Social",
      title: "Les vrais formats, plus grands que la coque.",
      body: "Story 9:16, post 4:5, vignette YouTube 16:9. Le cadre du deck reste 16:9 ; seuls les médias internes gardent leur ratio.",
      formats: [
        { kind: "story", src: "/toinelag-cover.png", alt: "Story Toinelag", label: "Story 9:16" },
        { kind: "post", src: "/grandjd/jd-portrait.jpg", alt: "Portrait Le Grand JD", label: "Post 4:5" },
        { kind: "youtube", src: "/garmin-cyril-thumb-1.png", alt: "Vignette CYRILmp4 × Garmin", label: "YouTube 16:9" },
      ],
      source: "Assets déjà présents dans public/ · exemple de composition",
    },
    {
      id: "close",
      layout: "closing",
      kicker: "Conclusion",
      title: "Créer le prochain deck sur cette base, pas en copiant un ancien fichier.",
      action: "Partir du starter Studio, habiller le thème, garder les arguments lisibles.",
      source: "far-studio-v1",
    },
  ],
});
