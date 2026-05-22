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
      <Hl t={t} s={{ fontSize: 38, marginBottom: 20, ...titleS }}>{title}</Hl>
    </motion.div>
  );

  const Slide = ({ children }) => (
    <motion.div initial="h" animate="v" variants={stg(0.05)} style={slideRoot}>
      {children}
    </motion.div>
  );

  const Lb = ({ t, children, s }) => (
    <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.d, marginBottom: 10, textTransform: "uppercase", ...s }}>
      {children}
    </div>
  );

  const ExList = ({ t, items }) => (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
      {items.map((line, i) => (
        <div
          key={line}
          style={{
            ...sa,
            fontSize: 14,
            color: t.cardT,
            lineHeight: 1.5,
            padding: "11px 0",
            borderBottom: i < items.length - 1 ? `1px solid ${t.brd}` : "none",
            ...ex,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );

  const IntegrationCol = ({ t, title, body, examples, accent }) => (
    <Wc
      t={t}
      s={{
        padding: "24px 26px",
        marginTop: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderTop: `4px solid ${accent ? t.a : t.brd}`,
        boxSizing: "border-box",
      }}
    >
      <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.a, marginBottom: 12, lineHeight: 1.2 }}>{title}</div>
      <div style={{ ...sa, fontSize: 15, color: t.cardT, lineHeight: 1.58, marginBottom: 4 }}>{body}</div>
      <Lb t={t} s={{ marginTop: 16, marginBottom: 0 }}>Exemples</Lb>
      <ExList t={t} items={examples} />
    </Wc>
  );

  const tensions = [
    "Peut-on transformer un snack en vraie recette ?",
    "Une recette TikTok peut-elle battre une recette Marmiton ?",
    "Un Airfryer change-t-il vraiment le game ?",
    "Le fait maison peut-il battre la livraison ?",
    "Que peut-on cuisiner avec un panier imposé ?",
  ];

  const productExamples = [
    "KitKat, Pringles, sauces, aides culinaires",
    "Airfryer, four, machine à café, robot cuisine",
    "Frigo, plaques, accessoires cuisine",
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
            <Wc t={t} s={{ padding: "22px 26px", marginBottom: 18, marginTop: 0 }}>
              <Lb t={t}>Mécanique d&apos;émission</Lb>
              <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.58 }}>
                Le format doit avoir une vraie mécanique d&apos;émission : une idée forte, une contrainte, une expérience, des réactions, un verdict.
              </div>
            </Wc>
          </motion.div>
          <motion.div
            variants={fu(6)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 20,
              alignItems: "stretch",
              padding: "20px 24px",
              borderRadius: t.cR || 14,
              background: t.card,
              border: `1px solid ${t.brd}`,
            }}
          >
            <div style={{ ...sa, fontSize: 15.5, fontWeight: 600, color: t.cardT, lineHeight: 1.55, display: "flex", alignItems: "center" }}>
              La cuisine devient le moteur du divertissement.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...se,
                fontSize: 32,
                fontWeight: 800,
                color: t.a,
                lineHeight: 1,
                padding: "0 4px",
              }}
              aria-hidden
            >
              →
            </div>
            <div style={{ ...sa, fontSize: 15.5, fontWeight: 600, color: t.cardT, lineHeight: 1.55, display: "flex", alignItems: "center" }}>
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
            <div
              style={{
                padding: "18px 22px",
                borderRadius: t.cR || 14,
                background: `${t.a}12`,
                border: `1px solid ${t.a}35`,
                marginBottom: 18,
              }}
            >
              <Lb t={t} s={{ color: t.a, marginBottom: 8 }}>Territoire principal</Lb>
              <div style={{ ...sa, fontSize: 16, fontWeight: 600, color: t.c, lineHeight: 1.55 }}>
                Les expériences food : hacks improbables, recettes virales poussées à l&apos;extrême, détournements de produits du quotidien, tests d&apos;appareils, duels Marmiton vs Internet, défis panier, budget, temps ou livraison.
              </div>
            </div>
          </motion.div>
          <motion.div variants={fu(6)} style={{ marginBottom: 16 }}>
            <Lb t={t}>Exemples de tensions éditoriales</Lb>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px 48px" }}>
              {tensions.map((line) => (
                <div key={line} style={{ ...sa, fontSize: 15.5, color: t.c, lineHeight: 1.5, ...ex }}>
                  {line}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fu(8)}>
            <Th t={t} s={{ marginTop: 0, marginBottom: 0, padding: "22px 28px", fontSize: 16, lineHeight: 1.55 }}>
              Le programme doit privilégier les situations, les réactions et les résultats inattendus. Pas une logique tuto. Une logique d&apos;expérience.
            </Th>
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
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.58, marginBottom: 18 }}>
              Créer une plateforme de format déclinable en plusieurs épisodes, capable d&apos;accueillir différents territoires food et différents partenaires commerciaux.
            </Sh>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
            <motion.div variants={fu(8)}>
              <Wc t={t} s={{ padding: "24px 26px", marginTop: 0, height: "100%", borderTop: `4px solid ${t.a}` }}>
                <Lb t={t}>Saison · 4 à 5 épisodes</Lb>
                <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.58 }}>
                  Chacun autonome, mais relié par une même mécanique : une idée food, une contrainte, un test, un verdict.
                </div>
              </Wc>
            </motion.div>
            <motion.div variants={fu(8)}>
              <Wc t={t} s={{ padding: "24px 26px", marginTop: 0, height: "100%" }}>
                <Lb t={t}>YouTube & déclinaisons</Lb>
                <div style={{ ...sa, fontSize: 15.5, color: t.cardT, lineHeight: 1.58, marginBottom: 14 }}>
                  Le format long vit sur YouTube. Chaque épisode génère des clips courts : hook, fail, dégustation, avant/après, réaction, verdict.
                </div>
                <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.5, paddingTop: 14, borderTop: `1px solid ${t.brd}` }}>
                  On peut également envisager une mécanique avec un invité.
                </div>
              </Wc>
            </motion.div>
          </div>
        </Slide>
      ),
    },

    {
      title: "Principe d'intégration",
      r: (t) => (
        <Slide>
          <SlideHead t={t} title="6. Principe d'intégration" />
          <motion.div variants={fu(5)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.58, marginBottom: 18 }}>
              Le format doit permettre l&apos;intégration naturelle de partenaires food, électroménager, grande distribution et livraison à domicile.
            </Sh>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
            <motion.div variants={fu(8)}>
              <IntegrationCol
                t={t}
                accent
                title="Intégration produit"
                body="Ingrédients, produits alimentaires, snacks, accessoires ou appareils cuisine."
                examples={productExamples}
              />
            </motion.div>
            <motion.div variants={fu(8)}>
              <IntegrationCol
                t={t}
                title="Intégration scénario"
                body="La marque devient un élément structurant de l&apos;épisode : point de départ du hack, contrainte du défi, outil de l&apos;expérience ou révélateur du résultat."
                examples={scenarioExamples}
              />
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
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
