import { motion } from "framer-motion";

/** Marmiton × FastGoodCuisine — brief créatif FAR (DA T1, layout aligné decks FAR, PDF-safe). */
export function createSFGCMarmiton(P) {
  const { Hl, Sh, Th, Wc, FarLogo, se, sa, mo, pu } = P;

  const stg = (d = 0.06) => ({ h: {}, v: { transition: { staggerChildren: d } } });
  const fu = (y = 10) => ({ h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.32 } } });
  const slideRoot = { width: "100%" };
  const ex = { fontStyle: "italic" };

  const SlideHead = ({ t, title, titleS }) => (
    <motion.div variants={fu(10)}>
      <Hl t={t} s={{ fontSize: 38, marginBottom: 16, ...titleS }}>{title}</Hl>
    </motion.div>
  );

  const Slide = ({ children }) => (
    <motion.div initial="h" animate="v" variants={stg(0.05)} style={slideRoot}>
      {children}
    </motion.div>
  );

  const Lb = ({ t, children }) => (
    <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.d, marginBottom: 8, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  const tensions = [
    "Peut-on transformer un snack en vraie recette ?",
    "Une recette TikTok peut-elle battre une recette Marmiton ?",
    "Un Airfryer change-t-il vraiment le game ?",
    "Le fait maison peut-il battre la livraison ?",
    "Que peut-on cuisiner avec un panier imposé ?",
  ];

  const scenarioExamples = [
    "Une marque food devient l'ingrédient à détourner.",
    "Un appareil devient l'outil obligatoire du test.",
    "Une enseigne fournit le panier ou la contrainte budget.",
    "Un service de livraison devient le point de comparaison face au fait maison.",
  ];

  return [
    {
      title: "Marmiton × FastGoodCuisine",
      r: (t) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "65vh",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}
          >
            <FarLogo size={84} variant={t.lv} />
            <div style={{ width: 1, height: 40, background: t.brd }} />
            <img src={pu("/fgc.webp")} alt="FastGoodCuisine" style={{ width: 72, height: "auto", borderRadius: 10 }} />
            <div style={{ width: 1, height: 40, background: t.brd }} />
            <span style={{ ...se, fontSize: 24, fontWeight: 800, color: "#FF6F00" }}>Marmiton</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
            <div style={{ ...mo, fontSize: 12, fontWeight: 600, letterSpacing: 3, padding: "8px 16px", background: t.pill, borderRadius: 6, marginBottom: 20 }}>
              BRIEF CRÉATIF - FAR
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Hl t={t} s={{ fontSize: 44, textAlign: "center", maxWidth: 940, margin: "0 auto" }}>
              Marmiton × FastGoodCuisine
            </Hl>
          </motion.div>
        </div>
      ),
    },

    {
      title: "Ambition du projet",
      r: (t) => (
        <Slide>
          <SlideHead t={t} title="1. Ambition du projet" />
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>
              Créer un format food entertainment incarné par FastGoodCuisine, pensé pour YouTube et naturellement déclinable sur les réseaux sociaux et l&apos;écosystème Marmiton.
            </Sh>
          </motion.div>
          <motion.div variants={fu(6)}>
            <Th t={t} s={{ marginTop: 0, marginBottom: 0, padding: "22px 28px", fontSize: 16, lineHeight: 1.58 }}>
              Pour Marmiton, l&apos;enjeu est aussi d&apos;image : sortir d&apos;une perception trop fonctionnelle, parfois vieillissante, pour réinstaller la marque dans une food culture plus actuelle, plus incarnée, plus décalée, plus social-first.
            </Th>
          </motion.div>
        </Slide>
      ),
    },

    {
      title: "Enjeu créatif",
      r: (t) => (
        <Slide>
          <SlideHead t={t} title="2. Enjeu créatif" />
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.6, marginBottom: 18 }}>
              Développer un concept qui ne ressemble ni à une vidéo recette classique, ni à un test produit, ni à un placement sponsor plaqué.
            </Sh>
          </motion.div>
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "22px 26px", marginBottom: 20, marginTop: 0 }}>
              <Lb t={t}>Mécanique d&apos;émission</Lb>
              <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.58 }}>
                Le format doit avoir une vraie mécanique d&apos;émission : une idée forte, une contrainte, une expérience, des réactions, un verdict.
              </div>
            </Wc>
          </motion.div>
          <motion.div variants={fu(5)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, maxWidth: 720 }}>
            <div style={{ ...sa, fontSize: 16, fontWeight: 600, color: t.c, lineHeight: 1.55, textAlign: "center", width: "100%" }}>
              La cuisine devient le moteur du divertissement.
            </div>
            <div style={{ ...se, fontSize: 28, fontWeight: 800, color: t.a, lineHeight: 1 }} aria-hidden>
              ↓
            </div>
            <div style={{ ...sa, fontSize: 16, fontWeight: 600, color: t.c, lineHeight: 1.55, textAlign: "center", width: "100%" }}>
              Le produit, la recette ou l&apos;appareil devient le déclencheur de l&apos;épisode.
            </div>
          </motion.div>
        </Slide>
      ),
    },

    {
      title: "Univers éditorial envisagé",
      r: (t) => (
        <Slide>
          <SlideHead t={t} title="3. Univers éditorial envisagé" titleS={{ fontSize: 34 }} />
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.58, marginBottom: 14 }}>
              <strong style={{ fontWeight: 700, color: t.c }}>Territoire principal : les expériences food.</strong>
              {" "}
              Hacks improbables, recettes virales poussées à l&apos;extrême, détournements de produits du quotidien, tests d&apos;appareils, duels Marmiton vs Internet, défis panier, budget, temps ou livraison.
            </Sh>
          </motion.div>
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "18px 22px", marginTop: 0, marginBottom: 14, borderTop: `4px solid ${t.a}` }}>
              <Lb t={t}>Exemples de tensions éditoriales</Lb>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
                {tensions.map((line) => (
                  <div key={line} style={{ ...sa, fontSize: 14, fontWeight: 600, color: t.cardT, lineHeight: 1.42, ...ex }}>
                    {line}
                  </div>
                ))}
              </div>
            </Wc>
          </motion.div>
          <motion.div variants={fu(5)}>
            <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.55, paddingLeft: 16, borderLeft: `3px solid ${t.a}` }}>
              Le programme doit privilégier les situations, les réactions et les résultats inattendus. Pas une logique tuto. Une logique d&apos;expérience.
            </div>
          </motion.div>
        </Slide>
      ),
    },

    {
      title: "Format",
      r: (t) => (
        <Slide>
          <SlideHead t={t} title="4. Format" />
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.58, marginBottom: 16 }}>
              Créer une plateforme de format déclinable en plusieurs épisodes, capable d&apos;accueillir différents territoires food et différents partenaires commerciaux.
            </Sh>
          </motion.div>
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "20px 24px", marginTop: 0, marginBottom: 14 }}>
              <Lb t={t}>Saison · 4 à 5 épisodes</Lb>
              <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.55 }}>
                Chacun autonome, mais relié par une même mécanique : une idée food, une contrainte, un test, un verdict.
              </div>
            </Wc>
          </motion.div>
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.58, marginBottom: 10 }}>
              Le format long vit sur YouTube. Chaque épisode génère des clips courts : hook, fail, dégustation, avant/après, réaction, verdict.
            </Sh>
          </motion.div>
          <motion.div variants={fu(5)}>
            <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.5 }}>On peut également envisager une mécanique avec un invité.</div>
          </motion.div>
        </Slide>
      ),
    },

    {
      title: "Intégration des marques",
      r: (t) => (
        <Slide>
          <SlideHead t={t} title="5. Intégration des marques" />
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.58, marginBottom: 16 }}>
              Le format doit permettre l&apos;intégration naturelle de partenaires food, électroménager, grande distribution et livraison à domicile.
            </Sh>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
            <motion.div variants={fu(8)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Wc t={t} s={{ padding: "22px 24px", marginTop: 0, height: "100%", borderTop: `4px solid ${t.a}` }}>
                <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.a, marginBottom: 10 }}>Intégration produit</div>
                <div style={{ ...sa, fontSize: 14.5, color: t.cardT, lineHeight: 1.55 }}>
                  Ingrédients, produits alimentaires, snacks, accessoires ou appareils cuisine.
                </div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5, marginTop: 10, ...ex }}>
                  Exemples : KitKat, Pringles, sauces, aides culinaires, Airfryer, four, machine à café, robot cuisine, frigo, plaques.
                </div>
              </Wc>
            </motion.div>
            <motion.div variants={fu(8)} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Wc t={t} s={{ padding: "22px 24px", marginTop: 0, border: `2px solid ${t.a}` }}>
                <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.a, marginBottom: 10 }}>Intégration scénario</div>
                <div style={{ ...sa, fontSize: 14.5, color: t.cardT, lineHeight: 1.55 }}>
                  La marque devient un élément structurant de l&apos;épisode : point de départ du hack, contrainte du défi, outil de l&apos;expérience ou révélateur du résultat.
                </div>
              </Wc>
              <Lb t={t}>Exemples</Lb>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {scenarioExamples.map((line) => (
                  <div key={line} style={{ ...sa, fontSize: 14.5, color: t.c, lineHeight: 1.5, ...ex }}>
                    {line}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div variants={fu(6)} style={{ marginTop: 16 }}>
            <Th t={t} s={{ marginTop: 0, marginBottom: 0, padding: "20px 26px", fontSize: 15.5, lineHeight: 1.55 }}>
              La marque doit servir la mécanique, pas l&apos;interrompre. La bonne intégration donne l&apos;impression que l&apos;épisode fonctionne mieux grâce à elle.
            </Th>
          </motion.div>
        </Slide>
      ),
    },

    {
      title: "Références",
      r: (t, back) => (
        <Slide>
          <SlideHead t={t} title="Annexe · Références de format" titleS={{ fontSize: 34 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 4 }}>
            <motion.div variants={fu(8)}>
              <Wc t={t} s={{ padding: "24px 26px", height: "100%", marginTop: 0 }}>
                <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.a, marginBottom: 12 }}>Les Recettes Pompettes</div>
                <div style={{ ...sa, fontSize: 15, color: t.cardT, lineHeight: 1.58 }}>
                  La cuisine comme cadre de show. La recette structure, mais l&apos;intérêt vient de l&apos;incarnation, des accidents et des moments inattendus.
                </div>
              </Wc>
            </motion.div>
            <motion.div variants={fu(8)}>
              <Wc t={t} s={{ padding: "24px 26px", height: "100%", marginTop: 0 }}>
                <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.a, marginBottom: 12 }}>Hot Ones</div>
                <div style={{ ...sa, fontSize: 15, color: t.cardT, lineHeight: 1.58 }}>
                  Une règle simple, une montée en tension, des réactions sincères. Un rituel immédiatement identifiable.
                </div>
              </Wc>
            </motion.div>
          </div>
          {back && (
            <motion.div variants={fu(6)} style={{ textAlign: "center", marginTop: 28 }}>
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
        </Slide>
      ),
    },
  ];
}
