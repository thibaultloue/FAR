/**
 * Personnalisation CYRILmp4 × Banques.
 *
 * La version générique laisse bankName et bankLogo à null.
 * Renseigner un destinataire fait évoluer l'intérêt (pont mis en avant) et le contact.
 *
 * Usage :
 *   import { buildCyrilMp4BanquesDeck } from "./cyrilMp4Banques.js";
 *   buildCyrilMp4BanquesDeck({ bankName: "…", objective: "proximity", sectorCase: "adopte" });
 *
 * sectorCase :
 *   - "shopify" (défaut) → Odoo + Shopify
 *   - "adopte" → Odoo + Adopte (variante, pas une slide supplémentaire)
 *   - "deblock" → Odoo + Deblock (après validation FAR)
 *
 * Bascule privée en session : sessionStorage.far_cyril_cases = "adopte" | "deblock"
 */
export const OBJECTIVES = {
  presence: {
    id: "presence",
    title: "Voyage & mobilité",
    body: "Avec CYRILmp4, faire découvrir un service dans une expérience où il a une utilité réelle.",
  },
  proximity: {
    id: "proximity",
    title: "Culture gaming",
    body: "Avec CYRILstudio, associer la marque à un univers éditorial identifié et à un rendez-vous choisi avec Cyril.",
  },
  offer: {
    id: "offer",
    title: "Entrepreneuriat",
    body: "Avec son expérience de fondateur, raconter ce que signifie lancer un produit, développer une activité ou transmettre un savoir-faire.",
  },
};

export const DEFAULT_CONFIG = {
  bankName: null,
  bankLogo: null,
  objective: null,
  accent: null,
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
