/**
 * Personnalisation CYRILmp4 × Banques.
 *
 * La version générique laisse bankName et bankLogo à null.
 * Renseigner un destinataire fait évoluer l'intérêt (pont mis en avant) et le contact.
 *
 * Usage :
 *   import { buildCyrilMp4BanquesDeck } from "./cyrilMp4Banques.js";
 *   buildCyrilMp4BanquesDeck({ bankName: "…", objective: "proximity", sectorCase: "deblock" });
 *
 * sectorCase :
 *   - "shopify" (défaut V2) → Odoo + Shopify
 *   - "deblock" → Deblock + Odoo (après validation FAR)
 */
export const OBJECTIVES = {
  presence: {
    id: "presence",
    title: "Faire connaître votre marque",
    body: "Associer votre banque à ses contenus et à ses prises de parole.",
  },
  proximity: {
    id: "proximity",
    title: "Montrer l’utilité de vos services",
    body: "Voyages, paiements, organisation de projets : des usages à travailler à partir de votre offre.",
  },
  offer: {
    id: "offer",
    title: "Incarner l’entrepreneuriat",
    body: "S’appuyer sur son expérience pour parler de création d’activité, de développement et de transmission.",
  },
};

export const DEFAULT_CONFIG = {
  bankName: null,
  bankLogo: null,
  objective: null,
  accent: "#C9A24B",
  sectorCase: "shopify",
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
