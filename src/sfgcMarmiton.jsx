import { motion } from "framer-motion";

/** Marmiton × FastGoodCuisine - brief créatif FAR (DA T1, texte + blocs équilibrés). */
export function createSFGCMarmiton(P) {
  const { Tg, Hl, Sh, Th, Wc, FarLogo, se, sa, mo, pu } = P;

  const stg = (d = 0.06) => ({ h: {}, v: { transition: { staggerChildren: d } } });
  const fu = (y = 10) => ({ h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.32 } } });

  const SlideHead = ({ t, tag, title, titleS }) => (
    <>
      <motion.div variants={fu(8)}>
        <Tg t={t}>{tag}</Tg>
      </motion.div>
      <motion.div variants={fu(10)}>
        <Hl t={t} s={{ fontSize: 34, marginBottom: 20, ...titleS }}>{title}</Hl>
      </motion.div>
    </>
  );

  const Para = ({ t, children, s }) => (
    <motion.div variants={fu(5)}>
      <Sh t={t} s={{ fontSize: 16.5, lineHeight: 1.65, marginBottom: 14, color: t.c, ...s }}>
        {children}
      </Sh>
    </motion.div>
  );

  const Lb = ({ t, children }) => (
    <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.d, marginBottom: 8, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  const slideFrame = { width: "100%", maxWidth: 980, margin: "0 auto" };

  const Slide = ({ children }) => (
    <motion.div initial="h" animate="v" variants={stg(0.05)} className="far-marmiton-slide" style={slideFrame}>
      {children}
    </motion.div>
  );

  const tensions = [
    "Peut-on transformer un snack en vraie recette ?",
    "Une recette TikTok peut-elle battre une recette Marmiton ?",
    "Un Airfryer change-t-il vraiment le game ?",
    "Le fait maison peut-il battre la livraison ?",
    "Que peut-on cuisiner avec un panier imposé ?",
  ];

  return [
    {
      title: "Marmiton × FastGoodCuisine",
      r: (t) => (
        <div className="far-marmiton-slide" style={{ ...slideFrame, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "62vh", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
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
            <Hl t={t} s={{ fontSize: 42, textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
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
          <SlideHead t={t} tag="1. Ambition du projet" title="Ambition du projet" titleS={{ fontSize: 34 }} />
          <Para t={t}>
            Créer un format food entertainment incarné par FastGoodCuisine, pensé pour YouTube et naturellement déclinable sur les réseaux sociaux et l&apos;écosystème Marmiton.
          </Para>
          <motion.div variants={fu(6)}>
            <Th t={t} s={{ marginTop: 4, marginBottom: 0, padding: "22px 26px", fontSize: 16, lineHeight: 1.62 }}>
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
          <SlideHead t={t} tag="2. Enjeu créatif" title="Enjeu créatif" titleS={{ fontSize: 34 }} />
          <Para t={t}>
            Développer un concept qui ne ressemble ni à une vidéo recette classique, ni à un test produit, ni à un placement sponsor plaqué.
          </Para>
          <Wc t={t} s={{ padding: "22px 26px", marginBottom: 16 }}>
            <Lb t={t}>Mécanique d&apos;émission</Lb>
            <div style={{ ...sa, fontSize: 16, color: t.cardT, lineHeight: 1.62 }}>
              Le format doit avoir une vraie mécanique d&apos;émission : une idée forte, une contrainte, une expérience, des réactions, un verdict.
            </div>
          </Wc>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <motion.div variants={fu(6)}>
              <Th t={t} alt s={{ marginTop: 0, marginBottom: 0, padding: "20px 22px", fontSize: 15.5, lineHeight: 1.55 }}>
                La cuisine devient le moteur du divertissement.
              </Th>
            </motion.div>
            <motion.div variants={fu(6)}>
              <Th t={t} s={{ marginTop: 0, marginBottom: 0, padding: "20px 22px", fontSize: 15.5, lineHeight: 1.55 }}>
                Le produit, la recette ou l&apos;appareil devient le déclencheur de l&apos;épisode.
              </Th>
            </motion.div>
          </div>
        </Slide>
      ),
    },

    {
      title: "Univers éditorial envisagé",
      r: (t) => (
        <Slide>
          <SlideHead t={t} tag="3. Univers éditorial envisagé" title="Univers éditorial envisagé" titleS={{ fontSize: 34 }} />
          <Para t={t}>
            <strong style={{ fontWeight: 700 }}>Territoire principal : les expériences food.</strong>
          </Para>
          <Para t={t}>
            Le format peut explorer des hacks improbables, des recettes virales poussées à l&apos;extrême, des détournements de produits du quotidien, des tests d&apos;appareils, des duels Marmiton vs Internet, des défis panier, budget, temps ou livraison.
          </Para>
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "20px 24px", borderTop: `4px solid ${t.a}`, marginBottom: 14 }}>
              <Lb t={t}>Exemples de tensions éditoriales</Lb>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {tensions.map((line) => (
                  <div key={line} style={{ ...sa, fontSize: 15, fontWeight: 600, color: t.cardT, lineHeight: 1.45 }}>
                    {line}
                  </div>
                ))}
              </div>
            </Wc>
          </motion.div>
          <Para t={t} s={{ marginBottom: 0, fontWeight: 600 }}>
            Le programme doit privilégier les situations, les réactions et les résultats inattendus. Pas une logique tuto. Une logique d&apos;expérience.
          </Para>
        </Slide>
      ),
    },

    {
      title: "Format",
      r: (t) => (
        <Slide>
          <SlideHead t={t} tag="4. Format" title="Format" titleS={{ fontSize: 34 }} />
          <Para t={t}>
            Créer une plateforme de format déclinable en plusieurs épisodes, capable d&apos;accueillir différents territoires food et différents partenaires commerciaux.
          </Para>
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "20px 24px", marginBottom: 14 }}>
              <Lb t={t}>Saison · 4 à 5 épisodes</Lb>
              <div style={{ ...sa, fontSize: 16, color: t.cardT, lineHeight: 1.6 }}>
                Chacun autonome, mais relié par une même mécanique : une idée food, une contrainte, un test, un verdict.
              </div>
            </Wc>
          </motion.div>
          <Para t={t}>
            Le format long doit vivre sur YouTube. Chaque épisode doit aussi générer des clips courts : hook, fail, dégustation, avant/après, réaction, verdict.
          </Para>
          <Para t={t} s={{ marginBottom: 0 }}>
            On peut également envisager une mécanique avec un invité.
          </Para>
        </Slide>
      ),
    },

    {
      title: "Intégration des marques",
      r: (t) => (
        <Slide>
          <SlideHead t={t} tag="5. Intégration des marques" title="Intégration des marques" titleS={{ fontSize: 34 }} />
          <Para t={t}>
            Le format doit permettre l&apos;intégration naturelle de partenaires food, électroménager, grande distribution et livraison à domicile.
          </Para>
          <motion.div variants={fu(6)}>
            <Th t={t} s={{ marginTop: 8, marginBottom: 14, padding: "18px 24px", fontSize: 16 }}>
              Deux niveaux principaux.
            </Th>
          </motion.div>
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "22px 26px", marginBottom: 0 }}>
              <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.a, marginBottom: 10 }}>Intégration produit</div>
              <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.62 }}>
                Ingrédients, produits alimentaires, snacks, accessoires ou appareils cuisine. Exemples : KitKat, Pringles, sauces, aides culinaires, Airfryer, four, four à pizza électrique, machine à café, robot cuisine, frigo, plaques.
              </div>
            </Wc>
          </motion.div>
        </Slide>
      ),
    },

    {
      title: "Intégration scénario",
      r: (t) => (
        <Slide>
          <SlideHead t={t} tag="5. Intégration des marques" title="Intégration scénario" titleS={{ fontSize: 34 }} />
          <motion.div variants={fu(6)}>
            <Wc t={t} s={{ padding: "22px 26px", marginBottom: 14, border: `2px solid ${t.a}` }}>
              <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.a, marginBottom: 10 }}>Intégration scénario</div>
              <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.62 }}>
                La marque devient un élément structurant de l&apos;épisode. Elle peut être le point de départ du hack, la contrainte du défi, l&apos;outil qui permet l&apos;expérience ou le révélateur du résultat final.
              </div>
            </Wc>
          </motion.div>
          <Lb t={t}>Exemples</Lb>
          <div style={{ ...sa, fontSize: 15.5, color: t.c, lineHeight: 1.65, marginBottom: 14 }}>
            Une marque food devient l&apos;ingrédient à détourner.
            <br />
            Un appareil devient l&apos;outil obligatoire du test.
            <br />
            Une enseigne fournit le panier ou la contrainte budget.
            <br />
            Un service de livraison devient le point de comparaison face au fait maison.
          </div>
          <motion.div variants={fu(6)}>
            <Th t={t} s={{ marginTop: 0, marginBottom: 0, padding: "20px 24px", fontSize: 15.5, lineHeight: 1.6 }}>
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
          <SlideHead t={t} tag="Annexe - Références" title="Références de format." titleS={{ fontSize: 34 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 4 }}>
            <motion.div variants={fu(8)}>
              <Wc t={t} s={{ padding: "24px 26px", height: "100%" }}>
                <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.a, marginBottom: 12 }}>Les Recettes Pompettes</div>
                <div style={{ ...sa, fontSize: 15, color: t.cardT, lineHeight: 1.62 }}>
                  La cuisine comme cadre de show. La recette structure, mais l&apos;intérêt vient de l&apos;incarnation, des accidents et des moments inattendus.
                </div>
              </Wc>
            </motion.div>
            <motion.div variants={fu(8)}>
              <Wc t={t} s={{ padding: "24px 26px", height: "100%" }}>
                <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.a, marginBottom: 12 }}>Hot Ones</div>
                <div style={{ ...sa, fontSize: 15, color: t.cardT, lineHeight: 1.62 }}>
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
