import { motion } from "framer-motion";

/** Deck positionnement — DA native T1 + animations mount-based (PDF-safe). */
export function createSFarPositionnement(P) {
  const { Tg, Hl, Sh, Th, FarLogo, se, sa, mo, fi, sv, pu } = P;

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

  const Lb = ({ t, children }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.d, marginBottom: 10, textTransform: "uppercase" }}>
      {children}
    </div>
  );

  const manifestoLines = [
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
    "C'est le rôle de FAR :",
    "donner aux univers créateurs le cadre, les opportunités et la sérénité nécessaires pour grandir sans se dénaturer.",
  ];

  const PosMapping = ({ t }) => {
    const zones = [
      { l: "Content / management", d: "Stratégie, production, management." },
      { l: "Entertainment", d: "Grands talents, YouTube, Twitch, événements, licences." },
      { l: "Plateformes", d: "Accès, volume, campagnes en quelques clics." },
      { l: "Réseaux internationaux", d: "Storytelling, média, production, data." },
    ];
    return (
      <motion.div initial="h" animate="v" variants={stg(0.06)} style={{ marginTop: 8 }}>
        <motion.div
          variants={fu(8)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 14,
            padding: "10px 0",
            borderBottom: `2px solid ${t.a}`,
          }}
        >
          <span style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.m }}>ACCÈS À L&apos;AUDIENCE</span>
          <span style={{ ...se, fontSize: 28, fontWeight: 800, color: t.a, lineHeight: 1 }}>→</span>
          <span style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.c }}>DÉVELOPPEMENT D&apos;UNIVERS</span>
        </motion.div>

        <motion.div variants={fs} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: 12, alignItems: "stretch" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 4px",
              borderRadius: 10,
              background: "rgba(0,0,0,.06)",
            }}
          >
            <span
              style={{
                ...mo,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 1.5,
                color: t.m,
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                textAlign: "center",
                lineHeight: 1.4,
              }}
            >
              ACTIVATION PONCTUELLE
              <br />
              <span style={{ color: t.a }}>↓</span>
              <br />
              CONSTRUCTION LONG TERME
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {zones.map((z, i) => (
              <motion.div
                key={z.l}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
                style={{
                  padding: "16px 18px",
                  borderRadius: 12,
                  background: "rgba(0,0,0,.07)",
                  border: `1px solid ${t.brd}`,
                }}
              >
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, color: t.a, marginBottom: 8, letterSpacing: 1 }}>{z.l}</div>
                <div style={{ ...sa, fontSize: 13, color: t.c, lineHeight: 1.5 }}>{z.d}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            marginTop: 14,
            padding: "22px 28px",
            borderRadius: 14,
            background: t.th,
            color: t.thT,
            textAlign: "center",
            border: `2px solid ${t.a}`,
          }}
        >
          <div style={{ ...se, fontSize: 28, fontWeight: 900, letterSpacing: "-0.02em" }}>FAR</div>
          <div style={{ ...sa, fontSize: 15, lineHeight: 1.55, marginTop: 10, maxWidth: 640, margin: "10px auto 0", opacity: 0.95 }}>
            Développement d&apos;univers créateurs par la création, la structure et la croissance.
          </div>
        </motion.div>

        <motion.p
          variants={fu(10)}
          style={{ ...sa, fontSize: 17, fontWeight: 600, color: t.c, lineHeight: 1.55, marginTop: 16 }}
        >
          FAR n&apos;est pas une agence d&apos;influence de plus.{" "}
          <span style={{ color: t.a, fontWeight: 800 }}>FAR développe ce qui fait aller les créateurs plus loin.</span>
        </motion.p>
      </motion.div>
    );
  };

  const PosTripod = ({ t }) => {
    const legs = [
      {
        id: "creation",
        title: "Création",
        desc: "L'ADN du créateur : ton, formats, communauté, imaginaire, exigence éditoriale.",
        footX: 95,
        footY: 200,
      },
      {
        id: "structure",
        title: "Structure",
        desc: "Le cadre qui permet d'aller plus loin : administratif, juridique, fiscal, comptable, recrutement, process, data, outils, priorisation.",
        footX: 280,
        footY: 200,
      },
      {
        id: "growth",
        title: "Croissance",
        desc: "Ce qui ouvre de nouveaux champs : collaborations, ambassades, produits propriétaires, marques propres, actifs, acquisitions, participations, opportunités business.",
        footX: 465,
        footY: 200,
      },
    ];
    const apex = { x: 280, y: 52 };

    return (
      <motion.div initial="h" animate="v" variants={stg(0.08)} style={{ marginTop: 8 }}>
        <motion.div variants={fs} style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <svg viewBox="0 0 560 220" style={{ width: "100%", maxWidth: 780, height: "auto", minHeight: 200 }} aria-label="Trépied univers créateur">
            {legs.map((leg, i) => (
              <motion.line
                key={leg.id}
                x1={apex.x}
                y1={apex.y}
                x2={leg.footX}
                y2={leg.footY}
                stroke={t.a}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.12 }}
              />
            ))}
            <motion.circle
              cx={apex.x}
              cy={apex.y}
              r="40"
              fill={t.th}
              stroke={t.a}
              strokeWidth="3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.05 }}
            />
            <text x={apex.x} y={apex.y - 5} textAnchor="middle" fill={t.thT} fontSize="12" fontWeight="800" fontFamily="Figtree,sans-serif">
              Univers créateur
            </text>
            {legs.map((leg, i) => (
              <motion.g key={`n-${leg.id}`} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 + i * 0.1, duration: 0.35 }}>
                <circle cx={leg.footX} cy={leg.footY} r="20" fill={t.card} stroke={t.a} strokeWidth="2" />
              </motion.g>
            ))}
          </svg>
        </motion.div>

        <motion.div
          initial="h"
          animate="v"
          variants={stg(0.1)}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 4 }}
        >
          {legs.map((leg) => (
            <motion.div key={leg.id} variants={fu(14)} style={{ padding: "0 8px", textAlign: "center" }}>
              <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.a, marginBottom: 10 }}>{leg.title}</div>
              <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.55 }}>{leg.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fu(8)}
          style={{ ...sa, fontSize: 17, fontWeight: 600, color: t.c, lineHeight: 1.55, marginTop: 12, textAlign: "center", maxWidth: 720, margin: "12px auto 0" }}
        >
          <span style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.d, display: "block", marginBottom: 14 }}>
            FAR — SYSTÈME QUI STABILISE L&apos;ENSEMBLE
          </span>
          La structure n&apos;éteint pas la création.{" "}
          <span style={{ color: t.a, fontWeight: 800 }}>Elle lui donne de l&apos;espace.</span>
        </motion.p>
      </motion.div>
    );
  };

  const PosDoDont = ({ t, dos, donts }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        style={{ padding: "28px 32px", borderRadius: 16, background: t.ex, color: t.exT }}
      >
        <div style={{ ...mo, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 20 }}>DO</div>
        {dos.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "9px 0", borderBottom: i < dos.length - 1 ? "1px solid rgba(128,128,128,.15)" : "none" }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 14,
                fontWeight: 800,
              }}
              aria-hidden
            >
              ✓
            </span>
            <span style={{ ...sa, fontSize: 14, lineHeight: 1.5 }}>{line}</span>
          </div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        style={{ padding: "28px 32px", borderRadius: 16, background: t.no, color: t.noT, border: `1px solid ${t.noBrd}` }}
      >
        <div style={{ ...mo, fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 20, opacity: 0.65 }}>DON&apos;T</div>
        {donts.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "9px 0", borderBottom: i < donts.length - 1 ? "1px solid rgba(128,128,128,.12)" : "none" }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "rgba(0,0,0,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 14,
                fontWeight: 800,
                color: t.m,
              }}
              aria-hidden
            >
              ✕
            </span>
            <span style={{ ...sa, fontSize: 14, lineHeight: 1.5, opacity: 0.9 }}>{line}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return [
    {
      title: "FAR by La Porte",
      r: (t) => (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ marginBottom: 28 }}>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42, duration: 0.5 }} style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginTop: 20 }}>
            Qui veut aller loin, vient ici.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58, duration: 0.4 }} style={{ ...mo, fontSize: 11, color: t.d, marginTop: 32, letterSpacing: 2 }}>
            10 ans d&apos;expérience · +50 marques · +100 campagnes
          </motion.div>
        </div>
      ),
    },

    {
      title: "Manifesto",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.05)} style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0, flex: 1 }}>
          <SlideHead
            t={t}
            tag="MANIFESTO"
            title="Un créateur n'est pas un canal. C'est un univers."
            titleS={{ fontSize: 34, maxWidth: 960 }}
          />
          <motion.div variants={stg(0.06)} style={{ marginTop: 8 }}>
            {manifestoLines.map((text, i) =>
              text === "" ? (
                <div key={i} style={{ height: 16 }} />
              ) : (
                <motion.p
                  key={i}
                  variants={fu(8)}
                  style={{
                    ...(i >= manifestoLines.length - 3
                      ? { ...se, fontSize: 20, fontWeight: 700, color: t.c, lineHeight: 1.45, marginTop: 4 }
                      : i < 6
                        ? { ...se, fontSize: 24, fontWeight: 700, color: t.c, lineHeight: 1.35 }
                        : { ...sa, fontSize: 17, color: t.m, lineHeight: 1.55 }),
                    margin: 0,
                  }}
                >
                  {text}
                </motion.p>
              ),
            )}
          </motion.div>
        </motion.div>
      ),
    },

    {
      title: "Mapping marché",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="BENCHMARK" title="FAR ne joue pas l'accès. FAR joue le développement." titleS={{ fontSize: 34 }} />
          <PosMapping t={t} />
        </motion.div>
      ),
    },

    {
      title: "Modèle FAR",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="MODÈLE" title="Un univers créateur grandit sur trois appuis." titleS={{ fontSize: 34 }} />
          <PosTripod t={t} />
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
            variants={stg(0.08)}
            style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}
          >
            {[
              { p: "Vision", q: "Est-ce que ça construit aujourd'hui en pensant à demain ?" },
              { p: "Sérénité", q: "Est-ce que le cadre est fluide, clair et sur-mesure ?" },
              { p: "Structure", q: "Est-ce que ça simplifie, automatise ou clarifie quelque chose ?" },
              { p: "Ambition", q: "Est-ce que l'idée mérite plus qu'une simple prise de parole ?" },
              { p: "Opportunité", q: "Est-ce que ça fait émerger un projet durable ?" },
            ].map((x, i) => (
              <motion.div
                key={x.p}
                variants={fu(18)}
                style={{
                  flex: "1 1 160px",
                  minWidth: 140,
                  padding: "20px 16px 18px",
                  borderTop: `3px solid ${t.a}`,
                }}
              >
                <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginBottom: 10, lineHeight: 1 }}>{x.p}</div>
                <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{x.q}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fu(8)} style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${t.brd}` }}>
            <div style={{ ...sa, fontSize: 18, fontWeight: 600, color: t.c, lineHeight: 1.5 }}>
              Chez FAR, les valeurs ne décorent pas le discours.{" "}
              <span style={{ color: t.a, fontWeight: 800 }}>Elles cadrent les décisions.</span>
            </div>
          </motion.div>
        </motion.div>
      ),
    },

    {
      title: "Ce que FAR apporte",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="ACCOMPAGNEMENT" title="FAR accompagne ce qui fait vraiment grandir." titleS={{ fontSize: 32 }} />

          <motion.div variants={fs} style={{ position: "relative", marginTop: 20, paddingTop: 8 }}>
            <div style={{ position: "absolute", top: 28, left: "8%", right: "8%", height: 3, background: t.brd, borderRadius: 2 }} />
            <motion.div
              initial="h"
              animate="v"
              variants={stg(0.1)}
              style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, position: "relative", zIndex: 1 }}
            >
              {[
                { n: "01", t: "Clarifier", d: "Positionnement, valeurs, ambitions, ligne éditoriale, priorités." },
                { n: "02", t: "Structurer", d: "Administratif, juridique, fiscal, comptable, recrutement, process, outils, data." },
                { n: "03", t: "Développer", d: "Collaborations, ambassades, formats, produits propriétaires, marques propres, actifs, acquisitions, participations." },
                { n: "04", t: "Protéger", d: "Cohérence éditoriale, image, droits, arbitrages, choix des bonnes opportunités." },
              ].map((s, i) => (
                <motion.div key={s.n} variants={fu(14)} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: t.th,
                      color: t.thT,
                      border: `3px solid ${t.a}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                      ...mo,
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ ...sa, fontSize: 16, fontWeight: 800, color: t.c, marginBottom: 8 }}>{s.t}</div>
                  <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>{s.d}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{ marginTop: 36 }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, borderTop: `1px solid ${t.brd}`, paddingTop: 20 }}>
              {[
                { w: "Talent", t: "grandir sans se disperser." },
                { w: "Marque", t: "trouver un rôle juste dans un univers clair." },
                { w: "Audience", t: "comprendre naturellement pourquoi le projet existe." },
              ].map((o) => (
                <div key={o.w} style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5 }}>
                  <span style={{ ...se, fontSize: 16, fontWeight: 700, color: t.c }}>{o.w}</span>
                  {" — "}
                  {o.t}
                </div>
              ))}
            </div>
          </motion.div>
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
            style={{ display: "flex", gap: 14, marginTop: 28 }}
          >
            {[
              {
                n: "FastGoodCuisine",
                u: "Food entertainment",
                p: "Formats food, tests, défis, co-brandings, produits, opérations avec marques food.",
                img: "/fgc.webp",
              },
              {
                n: "CYRILmp4",
                u: "Exploration, gaming, divertissement",
                p: "Ambassades, formats longs, aventures, gaming, marques propres, projets annuels.",
                img: "/cyrilmp4.webp",
              },
              {
                n: "Toinelag",
                u: "Construction, jeux, divertissement",
                p: "Concepts co-construits, produits, jouets, formats de challenge, collaborations marque.",
                img: "/toinelag.webp",
              },
              {
                n: "Teeqzy",
                u: "Fortnite, gaming communautaire",
                p: "Maps, espaces de jeu, formats gaming, communautés, activations qualifiées.",
                img: null,
                pdf: true,
              },
              {
                n: "Bek1ng",
                u: "Performance gaming, coaching, Call of Duty",
                p: "Coaching, contenus experts, co-branding expert, équipements, performance.",
                img: null,
                pdf: true,
              },
            ].map((c) => (
              <motion.div
                key={c.n}
                variants={ft(20)}
                style={{ flex: 1, background: t.card, borderRadius: 16, overflow: "hidden", border: `1px solid ${t.brd}`, padding: 14 }}
              >
                <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 12, background: t.cardAlt, marginBottom: 12 }}>
                  {c.img ? (
                    <img src={pu(c.img)} alt={c.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        ...mo,
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: 2,
                        color: t.d,
                        textTransform: "uppercase",
                      }}
                    >
                      Portrait
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <div style={{ ...se, fontSize: 14, fontWeight: 700, color: t.cardT, lineHeight: 1.2 }}>{c.n}</div>
                  {c.pdf && (
                    <span
                      style={{
                        ...mo,
                        fontSize: 8,
                        fontWeight: 700,
                        color: t.a,
                        letterSpacing: 1,
                        flexShrink: 0,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: `${t.a}22`,
                      }}
                    >
                      PDF
                    </span>
                  )}
                </div>
                <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: t.a, textTransform: "uppercase", marginBottom: 8 }}>
                  {c.u}
                </div>
                <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.45 }}>{c.p}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fu(8)} style={{ ...sa, fontSize: 17, fontWeight: 600, color: t.c, lineHeight: 1.55, marginTop: 20 }}>
            FAR ne présente pas des profils.{" "}
            <span style={{ color: t.a, fontWeight: 800 }}>FAR développe des univers.</span>
          </motion.p>
        </motion.div>
      ),
    },

    {
      title: "Grille d'opportunité",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="QUALIFICATION" title="Une bonne opportunité fait avancer l'univers." titleS={{ fontSize: 32 }} />

          <motion.div variants={fs} style={{ marginTop: 20, position: "relative", padding: "8px 0 24px" }}>
            <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", gap: 0, position: "relative" }}>
              <div style={{ position: "absolute", top: 36, left: "6%", right: "6%", height: 4, background: `linear-gradient(90deg, ${t.brd}, ${t.a}, ${t.brd})`, borderRadius: 4 }} />
              {[
                { k: "F", l: "Fidèle", d: "Elle respecte l'univers du créateur." },
                { k: "F", l: "Fluide", d: "Elle s'intègre naturellement à son contenu." },
                { k: "S", l: "Structurante", d: "Elle simplifie, clarifie ou renforce son développement." },
                { k: "A", l: "Ambitieuse", d: "Elle peut ouvrir plus qu'une prise de parole." },
                { k: "U", l: "Utile", d: "Elle crée une valeur claire pour le talent, la marque et l'audience." },
              ].map((c, i) => (
                <motion.div
                  key={c.l}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
                  style={{ flex: 1, textAlign: "center", padding: "0 6px" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: t.th,
                      color: t.thT,
                      border: `3px solid ${t.a}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                      ...se,
                      fontSize: 22,
                      fontWeight: 900,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {c.k}
                  </div>
                  <div style={{ ...sa, fontSize: 14, fontWeight: 800, color: t.c, marginBottom: 6 }}>{c.l}</div>
                  <div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.4 }}>{c.d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            style={{
              marginTop: 8,
              padding: "20px 22px",
              borderRadius: 14,
              border: `2px solid ${t.a}66`,
              background: `${t.a}14`,
            }}
          >
            <div style={{ ...se, fontSize: 14, fontWeight: 800, color: t.a, marginBottom: 12 }}>L&apos;entorse intelligente</div>
            <p style={{ ...sa, fontSize: 14, color: t.c, lineHeight: 1.6, margin: "0 0 12px" }}>
              FAR peut accepter une opportunité moins évidente au départ si elle ouvre un vrai levier de développement : revenu structurant, produit propriétaire, acquisition, participation, marque stratégique, nouveau vertical, recrutement clé ou accélération business.
            </p>
            <p style={{ ...sa, fontSize: 14, fontWeight: 600, color: t.m, lineHeight: 1.55, margin: 0 }}>
              Dans ce cas, le rôle de FAR est de transformer l&apos;opportunité en projet légitime.
            </p>
          </motion.div>
        </motion.div>
      ),
    },

    {
      title: "Do / Don't",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="LANGAGE" title="Les bons réflexes FAR." titleS={{ fontSize: 34 }} />
          <PosDoDont
            t={t}
            dos={[
              "Parler d'univers créateur.",
              "Construire autour de la création.",
              "Chercher le rôle juste de la marque.",
              "Structurer sans rigidifier.",
              "Développer des actifs, produits, formats ou marques propres.",
              "Protéger la cohérence éditoriale.",
              "Dire « partenaire de stratégie, de création et de visibilité ».",
              "Parler de développement serein et durable.",
            ]}
            donts={[
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
          <motion.p variants={fu(8)} style={{ ...sa, fontSize: 17, fontWeight: 600, color: t.c, lineHeight: 1.55, marginTop: 16 }}>
            FAR ne vend pas l&apos;accès aux créateurs.{" "}
            <span style={{ color: t.a, fontWeight: 800 }}>FAR construit ce qui les fait aller plus loin.</span>
          </motion.p>
        </motion.div>
      ),
    },

    {
      title: "Fermeture",
      r: (t, back) => (
        <div style={{ textAlign: "center", padding: "28px 0" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ marginBottom: 32 }}>
            <FarLogo size={96} variant={t.lv} />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Hl t={t} s={{ fontSize: 44, textAlign: "center", color: t.a }}>
              Qui veut aller loin, vient ici.
            </Hl>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22, duration: 0.45 }}>
            <Sh t={t} s={{ maxWidth: 700, margin: "20px auto", textAlign: "center" }}>
              FAR by La Porte accompagne les créateurs dans le développement de leur univers.
            </Sh>
          </motion.div>
          <motion.div initial="h" animate="v" variants={stg(0.08)} style={{ margin: "24px auto", maxWidth: 520 }}>
            {["Plus de vision.", "Plus de structure.", "Plus de sérénité.", "Plus d'ambition.", "Plus d'opportunités."].map((p) => (
              <motion.div key={p} variants={fu(10)} style={{ ...se, fontSize: 20, fontWeight: 700, color: t.c, padding: "6px 0" }}>
                {p}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.45 }}
            style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6, maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}
          >
            <p style={{ margin: 0 }}>
              Pour les talents, c&apos;est un cadre pour grandir sans se dénaturer.
            </p>
            <p style={{ margin: 0 }}>
              Pour les marques, c&apos;est une façon de créer avec des univers forts, sans les interrompre.
            </p>
            <p style={{ margin: 0 }}>
              Pour les audiences, ce sont des projets qui paraissent évidents.
            </p>
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
        </div>
      ),
    },
  ];
}
