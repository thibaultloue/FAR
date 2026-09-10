/**
 * Personnalisation CYRILmp4 × Banques.
 *
 * La version générique laisse bankName et bankLogo à null.
 * Renseigner un destinataire fait évoluer l'opportunité, le rôle, le périmètre
 * et le contact. Ne pas inventer l'objectif d'une enseigne.
 *
 * Usage :
 *   import { buildCyrilMp4BanquesDeck } from "./cyrilMp4Banques.js";
 *   buildCyrilMp4BanquesDeck({ bankName: "…", objective: "proximity", projectTitle: "…" });
 */
export const OBJECTIVES = {
  presence: {
    id: "presence",
    title: "Présence à l'esprit",
    body: "Rendre la marque reconnaissable dans un contenu choisi.",
  },
  proximity: {
    id: "proximity",
    title: "Proximité",
    body: "L'associer à un projet et à une expérience compréhensibles.",
  },
  offer: {
    id: "offer",
    title: "Intérêt pour une offre",
    body: "Proposer une suite pertinente lorsque le produit et l'audience le permettent.",
  },
};

export const DEFAULT_CONFIG = {
  bankName: null,
  bankLogo: null,
  objective: null,
  audienceNote: null,
  accent: "#C9A24B",
  projectTitle: null,
  projectHook: null,
  partnerRole: null,
  sectorCase: "deblock",
  perimeterNote: null,
  calendarNote: null,
  contactName: "Thibault Loué",
  contactDetail: "thibault.loue@far-agence.com",
};

export function applyBankConfig(overrides = {}) {
  const cfg = { ...DEFAULT_CONFIG, ...overrides };
  const objective = cfg.objective && OBJECTIVES[cfg.objective] ? OBJECTIVES[cfg.objective] : null;
  return {
    ...cfg,
    objective,
    personalized: Boolean(cfg.bankName),
  };
}
