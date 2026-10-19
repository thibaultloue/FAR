/**
 * Paramètres proposés. Aucun statut ne passe à « confirmed »
 * tant que le GO, le lieu et la règle ne sont pas validés.
 * 1 000 € = ingrédients et emballages par candidat, pas le coût d'une portion.
 * Les enveloppes ne sont pas additionnées au cachet ni à la production.
 */

const euro = (value) =>
  `${new Intl.NumberFormat("fr-FR").format(value).replace(/\u202f/g, "\u00a0")}\u00a0€`;

export const concept = {
  candidates: 3,
  seedBudgetPerCandidate: { value: 1000, status: "proposed" },
  serviceHours: { from: "12:00", to: "16:00", hours: 4, status: "proposed" },
  advisorMinutesPerCandidate: { value: 5, status: "proposed" },
  prize: { value: 30000, status: "proposed" },
  talentFee: { value: 200000, status: "quoted_pending_final_go" },
  productionBudget: { value: 120000, status: "quoted_pending_scouting" },
  deliverables: { youtube: 1, stories: 2 },
  shootWindow: "Nov.–déc. 2026",
  publishWindow: "Janvier 2027",
};

export const envelopesTotal = concept.candidates * concept.seedBudgetPerCandidate.value;
export const collaborationTotal = concept.talentFee.value + concept.productionBudget.value;

if (envelopesTotal !== 3000) {
  throw new Error("FGC BP : 3 × 1 000 € doit faire 3 000 €");
}
if (collaborationTotal !== 320000) {
  throw new Error("FGC BP : 200 000 € + 120 000 € doit faire 320 000 €, hors dotation");
}
if (concept.seedBudgetPerCandidate.value !== 1000) {
  throw new Error("FGC BP : le budget ingrédients/emballages est de 1 000 € par candidat");
}

export const money = {
  seed: euro(concept.seedBudgetPerCandidate.value),
  prize: euro(concept.prize.value),
  talent: euro(concept.talentFee.value),
  production: euro(concept.productionBudget.value),
  presented: euro(collaborationTotal),
};
