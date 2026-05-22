import { motion } from "framer-motion";

/** Marmiton × FastGoodCuisine - brief créatif FAR (DA T1, PDF-safe). */
export function createSFGCMarmiton(P) {
  const { Tg, Hl, Sh, Th, FarLogo, Wc, Ar, Pl, se, sa, mo, pu } = P;

  const stg = (d = 0.08) => ({ h: {}, v: { transition: { staggerChildren: d } } });
  const fu = (y = 14) => ({ h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.35 } } });

  const MarmitonMark = ({ size = "md" }) => {
    const fs = size === "lg" ? 28 : 22;
    return (
      <div
        style={{
          ...se,
          fontSize: fs,
          fontWeight: 800,
          color: "#FF6F00",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          padding: size === "lg" ? "10px 18px" : "8px 14px",
          borderRadius: 10,
          background: "rgba(255,111,0,.1)",
          border: "1px solid rgba(255,111,0,.25)",
        }}
      >
        Marmiton
      </div>
    );
  };

  const PartnerLogos = ({ t, fgcSize = 78 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
      <FarLogo size={80} variant={t.lv} />
      <div style={{ width: 1, height: 36, background: t.brd }} />
      <img
        src={pu("/fgc.webp")}
        alt="FastGoodCuisine"
        style={{ width: fgcSize, height: "auto", borderRadius: 12, border: `1px solid ${t.brd}` }}
      />
      <div style={{ width: 1, height: 36, background: t.brd }} />
      <MarmitonMark size="lg" />
    </div>
  );

  const tensions = [
    "Peut-on transformer un snack en vraie recette ?",
    "Une recette TikTok peut-elle battre une recette Marmiton ?",
    "Un Airfryer change-t-il vraiment le game ?",
    "Le fait maison peut-il battre la livraison ?",
    "Que peut-on cuisiner avec un panier imposé ?",
  ];

  const SlideHead = ({ t, tag, title, titleS }) => (
    <>
      <motion.div variants={fu(10)}>
        <Tg t={t}>{tag}</Tg>
      </motion.div>
      <motion.div variants={fu(12)}>
        <Hl t={t} s={titleS}>
          {title}
        </Hl>
      </motion.div>
    </>
  );

  const Lb = ({ t, children }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.d, marginBottom: 10, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  return [
    {
      title: "Marmiton × FastGoodCuisine",
      r: (t) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "65vh",
            textAlign: "center",
          }}
        >
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} style={{ marginBottom: 32 }}>
            <PartnerLogos t={t} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={{ ...mo, fontSize: 12, fontWeight: 600, letterSpacing: 3, padding: "8px 16px", background: t.pill, borderRadius: 6, marginBottom: 18 }}
          >
            BRIEF CRÉATIF · FAR
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.5 }}>
            <Hl t={t} s={{ fontSize: 40, textAlign: "center", maxWidth: 920, margin: "0 auto 16px" }}>
              Marmiton × FastGoodCuisine
            </Hl>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32, duration: 0.45 }}>
            <div style={{ ...sa, fontSize: 18, color: t.m, lineHeight: 1.55, maxWidth: 640, margin: "0 auto" }}>
              Brief créatif à destination de l&apos;équipe FastGoodCuisine
            </div>
          </motion.div>
        </div>
      ),
    },

    {
      title: "Ambition du projet",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="01 · AMBITION" title="Créer un format food entertainment incarné par FastGoodCuisine." titleS={{ fontSize: 34 }} />
          <Sh t={t} s={{ fontSize: 17, marginBottom: 22, maxWidth: 960 }}>
            Pensé pour YouTube et naturellement déclinable sur les réseaux sociaux et l&apos;écosystème Marmiton.
          </Sh>
          <Wc t={t} s={{ padding: "26px 28px" }}>
            <Lb t={t}>POUR MARMITON</Lb>
            <div style={{ ...sa, fontSize: 16, color: t.cardT, lineHeight: 1.65 }}>
              Sortir d&apos;une perception trop fonctionnelle, parfois vieillissante, pour réinstaller la marque dans une{" "}
              <span style={{ fontWeight: 700, color: t.a }}>food culture plus actuelle, plus incarnée, plus décalée, plus social-first</span>.
            </div>
          </Wc>
        </motion.div>
      ),
    },

    {
      title: "Enjeu créatif",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="02 · ENJEU CRÉATIF"
            title="Une vraie mécanique d'émission, pas un placement plaqué."
            titleS={{ fontSize: 32, maxWidth: 900 }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 8 }}>
            <Wc t={t} s={{ padding: 22, marginTop: 0 }}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: t.d, marginBottom: 12 }}>CE QUE CE N&apos;EST PAS</div>
              <Ar
                t={t}
                sm
                items={[
                  "Une vidéo recette classique",
                  "Un test produit",
                  "Un placement sponsor plaqué",
                ]}
              />
            </Wc>
            <Wc t={t} s={{ padding: 22, marginTop: 0, border: `2px solid ${t.a}`, background: `${t.a}12` }}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: t.a, marginBottom: 12 }}>CE QUE C&apos;EST</div>
              <Ar
                t={t}
                sm
                w
                items={[
                  "Une idée forte, une contrainte, une expérience",
                  "Des réactions, un verdict",
                  "La cuisine comme moteur du divertissement",
                ]}
              />
            </Wc>
          </div>
          <Th t={t} s={{ marginTop: 20, fontSize: 16, padding: "22px 26px" }}>
            Le produit, la recette ou l&apos;appareil devient le <strong>déclencheur</strong> de l&apos;épisode.
          </Th>
        </motion.div>
      ),
    },

    {
      title: "Univers éditorial",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="03 · UNIVERS" title="Les expériences food comme territoire principal." titleS={{ fontSize: 34 }} />
          <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.55, marginBottom: 16, maxWidth: 920 }}>
            Hacks improbables, recettes virales poussées à l&apos;extrême, détournements de produits du quotidien, tests d&apos;appareils, duels Marmiton vs Internet, défis panier, budget, temps ou livraison.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {[
              "Hacks improbables",
              "Recettes virales",
              "Tests d'appareils",
              "Marmiton vs Internet",
              "Défis panier",
              "Budget / temps / livraison",
            ].map((label) => (
              <Pl key={label} t={t} s={{ fontSize: 12, padding: "8px 14px", borderRadius: 999 }}>
                {label}
              </Pl>
            ))}
          </div>
          <Lb t={t}>EXEMPLES DE TENSIONS ÉDITORIALES</Lb>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {tensions.map((line, i) => (
              <motion.div
                key={i}
                variants={fu(10)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: t.card,
                  border: `1px solid ${t.brd}`,
                  ...sa,
                  fontSize: 13,
                  fontWeight: 600,
                  color: t.c,
                  lineHeight: 1.45,
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>
          <div style={{ ...sa, fontSize: 15, fontWeight: 700, color: t.a, marginTop: 18, lineHeight: 1.5 }}>
            Pas une logique tuto. Une logique d&apos;expérience : situations, réactions et résultats inattendus.
          </div>
        </motion.div>
      ),
    },

    {
      title: "Format",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="04 · FORMAT" title="Une plateforme déclinable en plusieurs épisodes." titleS={{ fontSize: 34 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 16, marginTop: 8 }}>
            <Wc t={t} s={{ padding: 24 }}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: t.a, marginBottom: 10 }}>SAISON</div>
              <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6, marginBottom: 16 }}>
                4 à 5 épisodes autonomes, reliés par une même mécanique : une idée food, une contrainte, un test, un verdict.
              </div>
              <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: t.a, marginBottom: 10 }}>MÉCANIQUE</div>
              <Ar t={t} sm items={["Idée food", "Contrainte", "Test", "Verdict", "Invité possible"]} />
            </Wc>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Wc t={t} s={{ padding: 20, flex: 1 }}>
                <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.a, marginBottom: 8 }}>YouTube long</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.55 }}>Le format long vit sur YouTube.</div>
              </Wc>
              <Wc t={t} s={{ padding: 20, flex: 1 }}>
                <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.c, marginBottom: 8 }}>Clips courts</div>
                <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>
                  Hook, fail, dégustation, avant/après, réaction, verdict.
                </div>
              </Wc>
            </div>
          </div>
        </motion.div>
      ),
    },

    {
      title: "Intégration des marques",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="05 · MARQUES" title="Intégration naturelle des partenaires food." titleS={{ fontSize: 32 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Wc t={t} s={{ padding: 22 }}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: t.a, marginBottom: 10 }}>INTÉGRATION PRODUIT</div>
              <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.55, marginBottom: 12 }}>
                Ingrédients, produits alimentaires, snacks, accessoires ou appareils cuisine.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["KitKat", "Pringles", "Sauces", "Airfryer", "Four", "Robot", "Frigo"].map((x) => (
                  <Pl key={x} t={t} s={{ fontSize: 11, padding: "6px 12px" }}>
                    {x}
                  </Pl>
                ))}
              </div>
            </Wc>
            <Wc t={t} s={{ padding: 22, border: `2px solid ${t.a}`, background: `${t.a}10` }}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: t.a, marginBottom: 10 }}>INTÉGRATION SCÉNARIO</div>
              <Ar
                t={t}
                sm
                w
                items={[
                  "La marque food devient l'ingrédient à détourner",
                  "L'appareil devient l'outil obligatoire du test",
                  "L'enseigne fournit le panier ou la contrainte budget",
                  "La livraison devient le point de comparaison face au fait maison",
                ]}
              />
            </Wc>
          </div>
          <Th t={t} s={{ marginTop: 16, fontSize: 15, padding: "20px 24px" }}>
            La marque doit servir la mécanique, pas l&apos;interrompre. La bonne intégration donne l&apos;impression que l&apos;épisode fonctionne mieux grâce à elle.
          </Th>
          <div style={{ ...sa, fontSize: 12, color: t.d, marginTop: 10, lineHeight: 1.45 }}>
            Familles cibles : food, électroménager, grande distribution, livraison à domicile.
          </div>
        </motion.div>
      ),
    },

    {
      title: "Références",
      r: (t, back) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="ANNEXE" title="Références de format." titleS={{ fontSize: 36 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
            <Wc t={t} s={{ padding: 26 }}>
              <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginBottom: 12 }}>Les Recettes Pompettes</div>
              <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6 }}>
                La cuisine comme cadre de show. La recette structure, mais l&apos;intérêt vient de l&apos;incarnation, des accidents et des moments inattendus.
              </div>
            </Wc>
            <Wc t={t} s={{ padding: 26 }}>
              <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginBottom: 12 }}>Hot Ones</div>
              <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6 }}>
                Une règle simple, une montée en tension, des réactions sincères. Un rituel immédiatement identifiable.
              </div>
            </Wc>
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            {back && (
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
            )}
          </div>
        </motion.div>
      ),
    },
  ];
}