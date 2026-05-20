import { motion } from "framer-motion";

/** Deck positionnement — DA native T1 + animations riches (mount-based, PDF-safe). */
export function createSFarPositionnement(P) {
  const { Tg, Hl, Sh, Wc, G2, Cmp, Fn, Th, FarLogo, se, sa, mo, fi, sv } = P;

  const stg = (d = 0.08) => ({ h: {}, v: { transition: { staggerChildren: d } } });
  const fu = (y = 14) => ({ h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.35 } } });
  const fs = { h: { opacity: 0, scale: 0.96 }, v: { opacity: 1, scale: 1, transition: { duration: 0.45 } } };
  const fsc = { h: { opacity: 0, scale: 0.97 }, v: { opacity: 1, scale: 1, transition: { duration: 0.35 } } };
  const fl = { h: { opacity: 0, x: -16 }, v: { opacity: 1, x: 0, transition: { duration: 0.4 } } };
  const fr = { h: { opacity: 0, x: 20 }, v: { opacity: 1, x: 0, transition: { duration: 0.45 } } };
  const ft = (y = 24) => ({ h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.4 } } });

  const SlideHead = ({ t, tag, title, titleS }) => (
    <>
      <motion.div variants={fu(10)}>
        <Tg t={t}>{tag}</Tg>
      </motion.div>
      <motion.div variants={fu(12)}>
        <Hl t={t} s={titleS}>{title}</Hl>
      </motion.div>
    </>
  );

  const src = (t, urls, note) => (
    <motion.div variants={fu(8)}>
      <Fn t={t}>
        {note ? `${note} · ` : ""}
        Sources : {urls.map((u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")).join(" · ")}
      </Fn>
    </motion.div>
  );

  const PosMapping = ({ t }) => (
    <motion.div initial="h" animate="v" variants={stg(0.07)}>
      <motion.div variants={fu(8)} style={{ textAlign: "center", marginBottom: 10 }}>
        <span style={{ ...mo, fontSize: 10, color: t.d, letterSpacing: 2 }}>
          ACCÈS À L&apos;AUDIENCE → DÉVELOPPEMENT D&apos;UNIVERS
        </span>
      </motion.div>
      <motion.div
        variants={fs}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 10,
          minHeight: 240,
          borderRadius: 14,
          border: `1px solid ${t.brd}`,
          padding: 10,
          background: t.cardAlt,
        }}
      >
        {[
          { l: "Content / management", d: "Stratégie, production, management.", delay: 0.1 },
          { l: "Entertainment", d: "Grands talents, événements, licences.", delay: 0.2 },
          { l: "Plateformes", d: "Accès, volume, campagnes en quelques clics.", delay: 0.3 },
          { l: "Réseaux internationaux", d: "Storytelling, média, production, data.", delay: 0.35 },
        ].map((z, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: z.delay }}
            style={{
              padding: 14,
              borderRadius: 10,
              background: t.card,
              border: `1px solid ${t.brd}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ ...mo, fontSize: 10, fontWeight: 700, color: t.a, marginBottom: 6 }}>{z.l}</div>
            <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>{z.d}</div>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          style={{
            position: "absolute",
            inset: "22% 18%",
            borderRadius: 12,
            border: `2px solid ${t.a}`,
            background: "rgba(255,170,0,.12)",
            boxShadow: "0 0 48px rgba(255,170,0,.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a }}>FAR</div>
          <div style={{ ...sa, fontSize: 12, color: t.c, lineHeight: 1.5, marginTop: 8, maxWidth: 220 }}>
            Développement d&apos;univers par la création, la structure et la croissance.
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        style={{ ...mo, fontSize: 9, color: t.d, marginTop: 8, textAlign: "right" }}
      >
        Activation ponctuelle ↑ · construction long terme ↓
      </motion.div>
    </motion.div>
  );

  const PosTripod = ({ t }) => {
    const apex = { x: 200, y: 45 };
    const legs = [
      { x: 70, l: "Création" },
      { x: 200, l: "Structure" },
      { x: 330, l: "Croissance" },
    ];
    const cards = [
      { lb: "CRÉATION", d: "Ton, formats, communauté, imaginaire, exigence éditoriale." },
      { lb: "STRUCTURE", d: "Admin, juridique, fiscal, process, data, outils, priorisation." },
      { lb: "CROISSANCE", d: "Collaborations, ambassades, produits propriétaires, marques propres, actifs, acquisitions, opportunités business." },
    ];

    return (
      <motion.div initial="h" animate="v" variants={stg(0.1)}>
        <motion.div variants={fu(12)} style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <svg viewBox="0 0 400 200" style={{ width: "100%", maxWidth: 420, height: "auto" }}>
            {legs.map((p, i) => (
              <motion.line
                key={p.l}
                x1={apex.x}
                y1={apex.y}
                x2={p.x}
                y2={165}
                stroke={t.a}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              />
            ))}
            <motion.circle
              cx={apex.x}
              cy={apex.y - 5}
              r="32"
              fill={t.th}
              stroke={t.a}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              style={{ transformOrigin: `${apex.x}px ${apex.y - 5}px` }}
            />
            <text x={apex.x} y={apex.y - 8} textAnchor="middle" fill={t.thT} fontSize="11" fontWeight="700" fontFamily="Figtree,sans-serif">
              Univers créateur
            </text>
            {legs.map((p, i) => (
              <motion.g
                key={p.l}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.15, duration: 0.4 }}
              >
                <circle cx={p.x} cy="165" r="26" fill={t.card} stroke={t.brd} />
                <text x={p.x} y="169" textAnchor="middle" fill={t.a} fontSize="10" fontWeight="700" fontFamily="Figtree,sans-serif">
                  {p.l}
                </text>
              </motion.g>
            ))}
          </svg>
        </motion.div>
        <G2 s={{ marginTop: 4 }}>
          {cards.slice(0, 2).map((c) => (
            <Wc key={c.lb} t={t} s={{ padding: 18 }}>
              <Lb t={t}>{c.lb}</Lb>
              <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{c.d}</div>
            </Wc>
          ))}
        </G2>
        <motion.div variants={fu(16)} style={{ marginTop: 10 }}>
          <Wc t={t} s={{ padding: 18 }}>
            <Lb t={t}>{cards[2].lb}</Lb>
            <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{cards[2].d}</div>
          </Wc>
        </motion.div>
      </motion.div>
    );
  };

  const Lb = ({ t, children }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.d, marginBottom: 10, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  return [
    {
      title: "FAR by La Porte",
      r: (t) => (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 28 }}
          >
            <FarLogo size={100} variant={t.lv} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08, duration: 0.45 }}>
            <Tg t={t}>FAR BY LA PORTE</Tg>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }}>
            <Hl t={t} s={{ fontSize: 48, maxWidth: 900, margin: "0 auto 16px", textAlign: "center" }}>
              Faire grandir les univers créateurs.
            </Hl>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28, duration: 0.5 }}>
            <Sh t={t} s={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "center" }}>
              Une agence pensée pour accompagner les créateurs dans leur développement, et aider les marques à construire des projets justes avec eux.
            </Sh>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42, duration: 0.5 }}
            style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginTop: 20 }}
          >
            Qui veut aller loin, vient ici.
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.58, duration: 0.4 }}
            style={{ ...mo, fontSize: 11, color: t.d, marginTop: 32, letterSpacing: 2 }}
          >
            10 ANS D&apos;EXPÉRIENCE · +50 MARQUES · +100 CAMPAGNES
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }}>
            {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
          </motion.div>
        </div>
      ),
    },

    {
      title: "Manifesto",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <motion.div variants={fu(10)}>
            <Tg t={t}>MANIFESTO</Tg>
          </motion.div>
          <motion.div variants={fu(12)}>
            <Hl t={t} s={{ fontSize: 38, maxWidth: 920 }}>
              Un créateur n&apos;est pas un canal. C&apos;est un univers.
            </Hl>
          </motion.div>
          <motion.div variants={stg(0.05)} style={{ marginTop: 20, maxWidth: 820 }}>
            {[
              "Un univers a ses codes.",
              "Son rythme.",
              "Ses formats.",
              "Sa communauté.",
              "Ses limites.",
              "Ses ambitions.",
              "",
              "Pour aller loin, il ne lui suffit pas d'être visible.",
              "Il doit être compris, structuré, protégé et développé.",
              "",
              "C'est le rôle de FAR : donner aux univers créateurs le cadre, les opportunités et la sérénité nécessaires pour grandir sans se dénaturer.",
            ].map((line, i) =>
              line === "" ? null : (
                <motion.p
                  key={i}
                  variants={fu(12)}
                  style={{
                    ...sa,
                    fontSize: i < 6 ? 20 : i >= 11 ? 17 : 16,
                    fontWeight: i >= 11 ? 700 : 400,
                    color: i >= 11 ? t.c : t.m,
                    lineHeight: 1.55,
                    marginBottom: 4,
                    ...(i < 6 ? se : {}),
                    ...(i < 6 ? { fontSize: 22, fontWeight: 600, color: t.c } : {}),
                  }}
                >
                  {line}
                </motion.p>
              ),
            )}
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Mapping marché",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="BENCHMARK" title="FAR ne joue pas l'accès. FAR joue le développement." titleS={{ fontSize: 34 }} />
          <PosMapping t={t} />
          <motion.div variants={fu(10)}>
            <Th t={t} alt>
              FAR n&apos;est pas une agence d&apos;influence de plus. FAR développe ce qui fait aller les créateurs plus loin.
            </Th>
          </motion.div>
          {src(t, [
            "https://www.bump.fr/fr",
            "https://www.foll-ow.com/fr/",
            "https://www.weareera.com/fr/home",
            "https://my.webedia-creators.com/fr/",
            "https://www.nouvel-arc.com/",
          ])}
        </motion.div>
      ),
    },

    {
      title: "Modèle FAR",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="MODÈLE" title="Un univers créateur grandit sur trois appuis." titleS={{ fontSize: 34 }} />
          <PosTripod t={t} />
          <motion.div variants={fu(10)}>
            <Th t={t}>
              La structure n&apos;éteint pas la création. Elle lui donne de l&apos;espace.
            </Th>
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Piliers FAR",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="MÉTHODE" title="Les cinq mots FAR deviennent une méthode de décision." titleS={{ fontSize: 34 }} />
          <motion.div
            initial="h"
            animate="v"
            variants={stg(0.09)}
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginTop: 16 }}
          >
            {[
              { p: "Vision", q: "Est-ce que ça construit aujourd'hui en pensant à demain ?" },
              { p: "Sérénité", q: "Est-ce que le cadre est fluide, clair et sur-mesure ?" },
              { p: "Structure", q: "Est-ce que ça simplifie, automatise ou clarifie ?" },
              { p: "Ambition", q: "Est-ce que l'idée mérite plus qu'une simple prise de parole ?" },
              { p: "Opportunité", q: "Est-ce que ça fait émerger un projet durable ?" },
            ].map((x) => (
              <motion.div key={x.p} variants={fu(20)}>
                <Wc t={t} s={{ padding: 16, height: "100%" }}>
                  <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.a, marginBottom: 10 }}>{x.p}</div>
                  <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>{x.q}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fu(8)}>
            <Th t={t} alt>Chez FAR, les valeurs ne décorent pas le discours. Elles cadrent les décisions.</Th>
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Ce que FAR apporte",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="ACCOMPAGNEMENT" title="FAR accompagne ce qui fait vraiment grandir." titleS={{ fontSize: 32 }} />
          <motion.div
            initial="h"
            animate="v"
            variants={stg(0.12)}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}
          >
            {[
              { n: "01", t: "Clarifier", d: "Positionnement, valeurs, ambitions, ligne éditoriale, priorités." },
              { n: "02", t: "Structurer", d: "Administratif, juridique, fiscal, comptable, recrutement, process, outils, data." },
              { n: "03", t: "Développer", d: "Collaborations, ambassades, formats, produits propriétaires, marques propres, actifs." },
              { n: "04", t: "Protéger", d: "Cohérence éditoriale, image, droits, arbitrages, bonnes opportunités." },
            ].map((s) => (
              <motion.div key={s.n} variants={fl}>
                <Wc t={t} s={{ padding: 20 }}>
                  <div style={{ ...mo, fontSize: 11, fontWeight: 700, color: t.a }}>{s.n}</div>
                  <div style={{ ...sa, fontSize: 17, fontWeight: 800, color: t.c, margin: "8px 0" }}>{s.t}</div>
                  <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{s.d}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}
          >
            {[
              { w: "Talent", t: "grandir sans se disperser." },
              { w: "Marque", t: "trouver un rôle juste dans un univers clair." },
              { w: "Audience", t: "comprendre pourquoi le projet existe." },
            ].map((o) => (
              <div key={o.w} style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>
                <span style={{ fontWeight: 700, color: t.c }}>{o.w}</span> — {o.t}
              </div>
            ))}
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"], "PDF FAR — citations détaillées à verrouiller")}
        </motion.div>
      ),
    },

    {
      title: "Talents / univers",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="ROSTER" title="Les talents FAR sont des univers de développement." titleS={{ fontSize: 32 }} />
          <motion.div
            initial="h"
            animate="v"
            variants={stg(0.08)}
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10, marginTop: 14 }}
          >
            {[
              { n: "FastGoodCuisine", u: "Food entertainment", p: "Formats food, co-brandings, opérations marques food." },
              { n: "CYRILmp4", u: "Exploration, gaming", p: "Ambassades, formats longs, marques propres, projets annuels." },
              { n: "Toinelag", u: "Construction, jeux", p: "Concepts co-construits, jouets, retail, challenges." },
              { n: "Teeqzy", u: "Gaming communautaire", p: "Maps, formats gaming, activations qualifiées.", pdf: true },
              { n: "Bek1ng", u: "Performance gaming", p: "Coaching, contenus experts, co-branding.", pdf: true },
            ].map((c) => (
              <motion.div key={c.n} variants={ft(24)}>
                <Wc t={t} s={{ padding: 14, height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 6, alignItems: "flex-start" }}>
                    <div style={{ ...sa, fontSize: 13, fontWeight: 800, color: t.c }}>{c.n}</div>
                    {c.pdf && (
                      <span style={{ ...mo, fontSize: 8, fontWeight: 700, color: t.a, letterSpacing: 1 }}>PDF</span>
                    )}
                  </div>
                  <div style={{ ...mo, fontSize: 9, fontWeight: 700, color: t.a, marginTop: 8, letterSpacing: 1 }}>{c.u}</div>
                  <div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.4, marginTop: 8 }}>{c.p}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fu(8)}>
            <Th t={t}>FAR ne présente pas des profils. FAR développe des univers.</Th>
          </motion.div>
          {src(
            t,
            ["https://www.groupe-laporte.com/far-by-la-porte"],
            "Teeqzy & Bek1ng — à valider avec PDF FAR rechargé",
          )}
        </motion.div>
      ),
    },

    {
      title: "Grille d'opportunité",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="QUALIFICATION" title="Une bonne opportunité fait avancer l'univers." titleS={{ fontSize: 32 }} />
          <motion.div
            initial="h"
            animate="v"
            variants={stg(0.07)}
            style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginTop: 14 }}
          >
            {[
              { k: "Fidèle", d: "Elle respecte l'univers du créateur." },
              { k: "Fluide", d: "Elle s'intègre naturellement au contenu." },
              { k: "Structurante", d: "Elle renforce son développement." },
              { k: "Ambitieuse", d: "Elle peut ouvrir plus qu'une prise de parole." },
              { k: "Utile", d: "Valeur claire pour talent, marque et audience." },
            ].map((c) => (
              <motion.div key={c.k} variants={fsc}>
                <Wc t={t} s={{ padding: 14 }}>
                  <div style={{ ...sa, fontSize: 14, fontWeight: 800, color: t.a }}>{c.k}</div>
                  <div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.4, marginTop: 6 }}>{c.d}</div>
                </Wc>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fr}>
            <Wc t={t} s={{ padding: 22, marginTop: 14, background: t.a + "18", border: `1px solid ${t.a}40` }}>
              <Lb t={t}>L&apos;ENTORSE INTELLIGENTE</Lb>
              <div style={{ ...sa, fontSize: 14, color: t.c, lineHeight: 1.55 }}>
                FAR peut accepter une opportunité moins évidente si elle ouvre un vrai levier : revenu structurant, produit propriétaire, acquisition, marque stratégique, nouveau vertical ou accélération business. Le rôle de FAR : transformer l&apos;opportunité en projet légitime.
              </div>
            </Wc>
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Do / Don't",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="LANGAGE" title="Les bons réflexes FAR." titleS={{ fontSize: 34 }} />
          <motion.div variants={fu(12)}>
            <Cmp
              t={t}
              l="Do"
              lI={[
                "Parler d'univers créateur.",
                "Construire autour de la création.",
                "Chercher le rôle juste de la marque.",
                "Structurer sans rigidifier.",
                "Développer actifs, produits, formats ou marques propres.",
                "Protéger la cohérence éditoriale.",
                "Dire « partenaire de stratégie, de création et de visibilité ».",
                "Parler de développement serein et durable.",
              ]}
              r="Don't"
              rI={[
                "Parler de profil ou d'inventaire.",
                "Partir uniquement du brief marque.",
                "Plaquer une intégration sponsorisée.",
                "Ajouter de la complexité.",
                "Réduire le talent à son audience.",
                "Dire oui à tout.",
                "Dire « support de campagne ».",
                "Parler seulement de monétisation.",
              ]}
            />
          </motion.div>
          <motion.div variants={fu(8)}>
            <Th t={t} alt>
              FAR ne vend pas l&apos;accès aux créateurs. FAR construit ce qui les fait aller plus loin.
            </Th>
          </motion.div>
          {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
        </motion.div>
      ),
    },

    {
      title: "Fermeture",
      r: (t, back) => (
        <div style={{ textAlign: "center", padding: "28px 0" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 32 }}
          >
            <FarLogo size={96} variant={t.lv} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Hl t={t} s={{ fontSize: 44, textAlign: "center", color: t.a }}>
              Qui veut aller loin, vient ici.
            </Hl>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.45 }}>
            <Sh t={t} s={{ maxWidth: 700, margin: "20px auto", textAlign: "center" }}>
              FAR by La Porte accompagne les créateurs dans le développement de leur univers.
            </Sh>
          </motion.div>
          <motion.div
            initial="h"
            animate="v"
            variants={stg(0.08)}
            style={{ margin: "24px auto", maxWidth: 520 }}
          >
            {[
              "Plus de vision.",
              "Plus de structure.",
              "Plus de sérénité.",
              "Plus d'ambition.",
              "Plus d'opportunités.",
            ].map((p) => (
              <motion.div key={p} variants={fu(10)} style={{ ...se, fontSize: 20, fontWeight: 700, color: t.c, padding: "6px 0" }}>
                {p}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6, maxWidth: 680, margin: "0 auto" }}
          >
            Pour les talents, un cadre pour grandir sans se dénaturer. Pour les marques, créer avec des univers forts. Pour les audiences, des projets qui paraissent évidents.
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.5 }}>
            <Th t={t} s={{ marginTop: 28, maxWidth: 720, margin: "28px auto 0" }}>
              Plus qu&apos;une agence, FAR est un partenaire engagé aux côtés des créateurs et des marques.
            </Th>
          </motion.div>
          {back && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.4 }}>
              <button
                onClick={back}
                style={{
                  marginTop: 36,
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.4 }}>
            {src(t, ["https://www.groupe-laporte.com/far-by-la-porte"])}
          </motion.div>
        </div>
      ),
    },
  ];
}
