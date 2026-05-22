import { motion } from "framer-motion";

/** Marmiton × FastGoodCuisine - brief créatif FAR (DA T1, texte document). */
export function createSFGCMarmiton(P) {
  const { Sh, FarLogo, se, sa, mo, pu } = P;

  const stg = (d = 0.05) => ({ h: {}, v: { transition: { staggerChildren: d } } });
  const fu = (y = 8) => ({ h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.28 } } });

  const H1 = ({ t, children }) => (
    <motion.div variants={fu(6)} style={{ ...se, fontSize: 30, fontWeight: 800, lineHeight: 1.15, color: t.c, marginBottom: 22, letterSpacing: "-0.02em" }}>
      {children}
    </motion.div>
  );

  const Para = ({ t, children, s }) => (
    <motion.div variants={fu(4)}>
      <Sh t={t} s={{ fontSize: 17, lineHeight: 1.68, marginBottom: 16, maxWidth: 940, color: t.c, fontWeight: 400, ...s }}>
        {children}
      </Sh>
    </motion.div>
  );

  const Sub = ({ t, children }) => (
    <motion.div variants={fu(4)} style={{ ...se, fontSize: 18, fontWeight: 700, color: t.c, margin: "20px 0 10px", maxWidth: 940 }}>
      {children}
    </motion.div>
  );

  const Doc = ({ t, children }) => (
    <motion.div initial="h" animate="v" variants={stg(0.04)} style={{ maxWidth: 960, paddingRight: 24 }}>
      {children}
    </motion.div>
  );

  return [
    {
      title: "Marmiton × FastGoodCuisine",
      r: (t) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "62vh", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 28 }}>
            <FarLogo size={88} variant={t.lv} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div style={{ ...se, fontSize: 40, fontWeight: 800, lineHeight: 1.1, color: t.c, marginBottom: 14 }}>Marmiton × FastGoodCuisine</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
            <div style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, color: t.d }}>Brief créatif - FAR</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 36 }}>
            <img src={pu("/fgc.webp")} alt="FastGoodCuisine" style={{ width: 56, height: "auto", borderRadius: 8 }} />
            <span style={{ ...se, fontSize: 22, fontWeight: 800, color: "#FF6F00" }}>Marmiton</span>
          </motion.div>
        </div>
      ),
    },

    {
      title: "Ambition du projet",
      r: (t) => (
        <Doc t={t}>
          <H1 t={t}>1. Ambition du projet</H1>
          <Para t={t}>
            Créer un format food entertainment incarné par FastGoodCuisine, pensé pour YouTube et naturellement déclinable sur les réseaux sociaux et l&apos;écosystème Marmiton.
          </Para>
          <Para t={t} s={{ marginBottom: 0 }}>
            Pour Marmiton, l&apos;enjeu est aussi d&apos;image : sortir d&apos;une perception trop fonctionnelle, parfois vieillissante, pour réinstaller la marque dans une food culture plus actuelle, plus incarnée, plus décalée, plus social-first.
          </Para>
        </Doc>
      ),
    },

    {
      title: "Enjeu créatif",
      r: (t) => (
        <Doc t={t}>
          <H1 t={t}>2. Enjeu créatif</H1>
          <Para t={t}>
            Développer un concept qui ne ressemble ni à une vidéo recette classique, ni à un test produit, ni à un placement sponsor plaqué.
          </Para>
          <Para t={t}>
            Le format doit avoir une vraie mécanique d&apos;émission : une idée forte, une contrainte, une expérience, des réactions, un verdict.
          </Para>
          <Para t={t}>La cuisine devient le moteur du divertissement.</Para>
          <Para t={t} s={{ marginBottom: 0 }}>
            Le produit, la recette ou l&apos;appareil devient le déclencheur de l&apos;épisode.
          </Para>
        </Doc>
      ),
    },

    {
      title: "Univers éditorial envisagé",
      r: (t) => (
        <Doc t={t}>
          <H1 t={t}>3. Univers éditorial envisagé</H1>
          <Para t={t}>
            <strong style={{ fontWeight: 700 }}>Territoire principal : les expériences food.</strong>
          </Para>
          <Para t={t}>
            Le format peut explorer des hacks improbables, des recettes virales poussées à l&apos;extrême, des détournements de produits du quotidien, des tests d&apos;appareils, des duels Marmiton vs Internet, des défis panier, budget, temps ou livraison.
          </Para>
          <Sub t={t}>Exemples de tensions éditoriales :</Sub>
          <Para t={t} s={{ marginBottom: 10 }}>Peut-on transformer un snack en vraie recette ?</Para>
          <Para t={t} s={{ marginBottom: 10 }}>Une recette TikTok peut-elle battre une recette Marmiton ?</Para>
          <Para t={t} s={{ marginBottom: 10 }}>Un Airfryer change-t-il vraiment le game ?</Para>
          <Para t={t} s={{ marginBottom: 10 }}>Le fait maison peut-il battre la livraison ?</Para>
          <Para t={t} s={{ marginBottom: 16 }}>Que peut-on cuisiner avec un panier imposé ?</Para>
          <Para t={t} s={{ marginBottom: 0 }}>
            Le programme doit privilégier les situations, les réactions et les résultats inattendus. Pas une logique tuto. Une logique d&apos;expérience.
          </Para>
        </Doc>
      ),
    },

    {
      title: "Format",
      r: (t) => (
        <Doc t={t}>
          <H1 t={t}>4. Format</H1>
          <Para t={t}>
            Créer une plateforme de format déclinable en plusieurs épisodes, capable d&apos;accueillir différents territoires food et différents partenaires commerciaux.
          </Para>
          <Para t={t}>
            La saison peut s&apos;articuler autour de 4 à 5 épisodes, chacun autonome, mais relié par une même mécanique : une idée food, une contrainte, un test, un verdict.
          </Para>
          <Para t={t}>
            Le format long doit vivre sur YouTube. Chaque épisode doit aussi générer des clips courts : hook, fail, dégustation, avant/après, réaction, verdict.
          </Para>
          <Para t={t} s={{ marginBottom: 0 }}>
            On peut également envisager une mécanique avec un invité.
          </Para>
        </Doc>
      ),
    },

    {
      title: "Intégration des marques",
      r: (t) => (
        <Doc t={t}>
          <H1 t={t}>5. Intégration des marques</H1>
          <Para t={t}>
            Le format doit permettre l&apos;intégration naturelle de partenaires food, électroménager, grande distribution et livraison à domicile.
          </Para>
          <Para t={t}>
            <strong style={{ fontWeight: 700 }}>Deux niveaux principaux.</strong>
          </Para>
          <Sub t={t}>Intégration produit :</Sub>
          <Para t={t} s={{ marginBottom: 0 }}>
            Ingrédients, produits alimentaires, snacks, accessoires ou appareils cuisine. Exemples : KitKat, Pringles, sauces, aides culinaires, Airfryer, four, four à pizza électrique, machine à café, robot cuisine, frigo, plaques.
          </Para>
        </Doc>
      ),
    },

    {
      title: "Intégration scénario",
      r: (t) => (
        <Doc t={t}>
          <H1 t={t}>5. Intégration des marques (suite)</H1>
          <Sub t={t}>Intégration scénario :</Sub>
          <Para t={t}>
            La marque devient un élément structurant de l&apos;épisode. Elle peut être le point de départ du hack, la contrainte du défi, l&apos;outil qui permet l&apos;expérience ou le révélateur du résultat final.
          </Para>
          <Sub t={t}>Exemples :</Sub>
          <Para t={t}>Une marque food devient l&apos;ingrédient à détourner.</Para>
          <Para t={t}>Un appareil devient l&apos;outil obligatoire du test.</Para>
          <Para t={t}>Une enseigne fournit le panier ou la contrainte budget.</Para>
          <Para t={t}>Un service de livraison devient le point de comparaison face au fait maison.</Para>
          <Para t={t} s={{ marginBottom: 0 }}>
            La marque doit servir la mécanique, pas l&apos;interrompre. La bonne intégration donne l&apos;impression que l&apos;épisode fonctionne mieux grâce à elle.
          </Para>
        </Doc>
      ),
    },

    {
      title: "Références",
      r: (t, back) => (
        <Doc t={t}>
          <H1 t={t}>Annexe - Références</H1>
          <Sub t={t}>Les Recettes Pompettes</Sub>
          <Para t={t}>
            La cuisine comme cadre de show. La recette structure, mais l&apos;intérêt vient de l&apos;incarnation, des accidents et des moments inattendus.
          </Para>
          <Sub t={t}>Hot Ones</Sub>
          <Para t={t} s={{ marginBottom: 0 }}>
            Une règle simple, une montée en tension, des réactions sincères. Un rituel immédiatement identifiable.
          </Para>
          {back && (
            <motion.div variants={fu(6)} style={{ marginTop: 32 }}>
              <button
                type="button"
                onClick={back}
                style={{
                  background: t.nav,
                  color: t.navT,
                  ...sa,
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "12px 32px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ← Retour à l&apos;accueil
              </button>
            </motion.div>
          )}
        </Doc>
      ),
    },
  ];
}
