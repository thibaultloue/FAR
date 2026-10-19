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
  shootWindow: "14 décembre 2026",
  publishWindow: "26 février 2027 (à confirmer)",
};

export const envelopesTotal = concept.candidates * concept.seedBudgetPerCandidate.value;
export const collaborationTotal = concept.talentFee.value + concept.productionBudget.value;

if (envelopesTotal !== 3000) {
  throw new Error("FGC BP V2 : 3 × 1 000 € doit faire 3 000 €");
}
if (collaborationTotal !== 320000) {
  throw new Error("FGC BP V2 : 200 000 € + 120 000 € doit faire 320 000 €, hors dotation");
}
if (concept.seedBudgetPerCandidate.value !== 1000) {
  throw new Error("FGC BP V2 : le budget ingrédients/emballages est de 1 000 € par candidat");
}

export const money = {
  seed: euro(concept.seedBudgetPerCandidate.value),
  prize: euro(concept.prize.value),
  talent: euro(concept.talentFee.value),
  production: euro(concept.productionBudget.value),
  presented: euro(collaborationTotal),
};

/** Une seule source pour les jauges affichées. Statut : proposition. */
export const progression = [50, 30, 15, 10, 4, 1];

export function stepTransition(index) {
  const from = progression[index];
  const to = progression[index + 1];
  if (from == null || to == null) {
    throw new Error("FGC BP V2 : transition hors parcours");
  }
  return `${from}\u00a0→\u00a0${to}`;
}

/** Les deux options d’épreuve 3 sont des slides successives. */
export const epreuve3Options = ["enigme", "client"];

if (progression.join() !== "50,30,15,10,4,1") {
  throw new Error("FGC BP V2 : le parcours proposé est 50 → 30 → 15 → 10 → 4 → 1");
}
if (concept.prize.value !== 30000) {
  throw new Error("FGC BP V2 : la dotation est de 30 000 €");
}
