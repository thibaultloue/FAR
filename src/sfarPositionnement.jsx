import { motion } from "framer-motion";

/** Deck positionnement - DA native T1 + animations mount-based (PDF-safe). */
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

  const manifestoHook = "Chez FAR, nous pensons qu'un créateur ne se résume pas à son audience.";

  const manifestoBlocks = [
    { k: "verse", t: "C'est une manière de voir." },
    { k: "verse", t: "De créer." },
    { k: "verse", t: "De raconter." },
    { k: "verse", t: "De rassembler." },
    { k: "univers", t: "C'est un univers." },
    { k: "trait", t: "Un univers a ses codes." },
    { k: "trait", t: "Son rythme. Ses formats. Sa communauté." },
    { k: "trait", t: "Ses exigences. Ses limites. Ses ambitions." },
    { k: "body", t: "Pour aller loin, il ne suffit pas d'être visible." },
    { k: "pillar", t: "Il faut être compris avant d'être exposé." },
    { k: "pillar", t: "Structuré sans être bridé." },
    { k: "pillar", t: "Protégé sans être enfermé." },
    { k: "pillar", t: "Développé sans être dénaturé." },
    { k: "mission", t: "C'est la mission de FAR." },
    {
      k: "body",
      t: "Accompagner les univers créateurs avec la vision, le cadre, les opportunités et la sérénité nécessaires pour grandir juste.",
    },
    { k: "body", t: "Pour que chaque talent puisse construire plus grand, sans perdre ce qui le rend singulier." },
    { k: "body", t: "Et que chaque marque puisse trouver sa place dans un univers qui existe déjà." },
    { k: "tagline", t: "Qui veut aller loin, vient ici." },
  ];

  const manifestoStyle = (t, k) => {
    switch (k) {
      case "hook":
        return { ...se, fontSize: 19, fontWeight: 700, color: t.c, lineHeight: 1.18, margin: "0 0 10px" };
      case "verse":
        return { ...se, fontSize: 14, fontWeight: 600, color: t.c, lineHeight: 1.2, margin: "0 0 1px" };
      case "univers":
        return { ...se, fontSize: 16, fontWeight: 800, color: t.a, lineHeight: 1.2, margin: "6px 0 4px" };
      case "trait":
        return { ...se, fontSize: 13, fontWeight: 700, color: t.c, lineHeight: 1.22, margin: "0 0 2px" };
      case "pillar":
        return { ...sa, fontSize: 12.5, fontWeight: 600, color: t.c, lineHeight: 1.3, margin: "0 0 2px" };
      case "mission":
        return { ...se, fontSize: 14, fontWeight: 800, color: t.a, lineHeight: 1.22, margin: "6px 0 4px" };
      case "tagline":
        return { ...se, fontSize: 16, fontWeight: 800, color: t.a, lineHeight: 1.2, margin: "8px 0 0" };
      default:
        return { ...sa, fontSize: 12, color: t.m, lineHeight: 1.32, margin: "0 0 3px" };
    }
  };

  const PosTripod = ({ t }) => {
    const footR = 12;
    const legs = [
      {
        id: "creation",
        title: "Protéger la création",
        desc: "Préserver l'ADN du créateur : ton, formats, communauté, imaginaire, cohérence éditoriale et exigence.",
        footX: 95,
        footY: 200,
      },
      {
        id: "structure",
        title: "Solidifier la structure",
        desc: "Apporter solidité et sérénité : cadre administratif, juridique, fiscal, process, outils, data et priorisation.",
        footX: 280,
        footY: 200,
      },
      {
        id: "growth",
        title: "Garantir la croissance",
        desc: "Ouvrir de nouveaux champs : collaborations, ambassades, produits et marques propres, actifs, acquisitions, participations.",
        footX: 465,
        footY: 200,
      },
    ];
    const apex = { x: 280, y: 52 };
    const hubR = 40;

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
              r={hubR}
              fill={t.th}
              stroke={t.a}
              strokeWidth="3"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, delay: 0.05 }}
            />
            <motion.text
              x={apex.x}
              y={apex.y - 2}
              textAnchor="middle"
              fill={t.thT}
              fontSize="10"
              fontWeight="800"
              fontFamily="Figtree,sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.35 }}
            >
              <tspan x={apex.x} dy="-5">
                Univers
              </tspan>
              <tspan x={apex.x} dy="13">
                créateur
              </tspan>
            </motion.text>
            {legs.map((leg, i) => (
              <motion.g key={`n-${leg.id}`} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 + i * 0.1, duration: 0.35 }}>
                <circle cx={leg.footX} cy={leg.footY} r={footR} fill={t.card} stroke={t.a} strokeWidth="2" />
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
          style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.d, marginTop: 12, textAlign: "center" }}
        >
          FAR - SYSTÈME QUI STABILISE L&apos;ENSEMBLE
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
        <div
          style={{
            textAlign: "center",
            padding: "32px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 16, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <FarLogo size={100} variant={t.lv} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: t.d, marginBottom: 28 }}
          >
            by La Porte
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.55 }}>
            <Hl t={t} s={{ fontSize: 48, maxWidth: 900, margin: "0 auto 16px", textAlign: "center" }}>
              Faire grandir les univers créateurs.
            </Hl>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28, duration: 0.5 }}>
            <Sh t={t} s={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "center" }}>
              Accompagner les créateurs dans leur développement, et aider les marques à construire des projets justes avec eux.
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
        <motion.div
          initial="h"
          animate="v"
          variants={stg(0.04)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: 0,
            flex: 1,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <motion.div variants={fu(8)} style={{ marginBottom: 10, width: "100%" }}>
            <div style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: t.d, marginBottom: 0 }}>
              MANIFESTO
            </div>
          </motion.div>
          <motion.p variants={fu(10)} style={{ ...manifestoStyle(t, "hook"), maxWidth: 900 }}>
            {manifestoHook}
          </motion.p>
          <div style={{ maxWidth: 920, width: "100%", textAlign: "center" }}>
            {manifestoBlocks.map((block, i) => (
              <motion.p key={i} variants={fu(4)} style={manifestoStyle(t, block.k)}>
                {block.t}
              </motion.p>
            ))}
          </div>
        </motion.div>
      ),
    },

    {
      title: "Modèle FAR",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="TRIPOD FAR" title="Le trépied FAR : un univers créateur repose sur trois appuis." titleS={{ fontSize: 32 }} />
          <PosTripod t={t} />
        </motion.div>
      ),
    },

    {
      title: "Piliers FAR",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead t={t} tag="MÉTHODE" title="Notre grille de lecture." titleS={{ fontSize: 34 }} />
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
            ].map((x) => (
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
        </motion.div>
      ),
    },

    {
      title: "Ce que FAR apporte",
      r: (t) => (
        <motion.div initial="h" animate="v" variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="ACCOMPAGNEMENT"
            title="Ce que nous faisons pour le talent fait avancer tout l'écosystème."
            titleS={{ fontSize: 30, maxWidth: 960 }}
          />

          <motion.div variants={fu(8)} style={{ marginTop: 8, marginBottom: 18 }}>
            <Sh t={t} s={{ fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 900 }}>
              Le schéma ci-dessous ne décrit que l&apos;accompagnement du talent. C&apos;est notre point de départ - et ce qui permet ensuite à la marque et à l&apos;audience de trouver leur place.
            </Sh>
          </motion.div>

          <motion.div
            variants={fs}
            style={{
              padding: "22px 24px 20px",
              borderRadius: 16,
              border: `2px solid ${t.a}`,
              background: `${t.a}10`,
              marginBottom: 20,
            }}
          >
            <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.a, marginBottom: 16 }}>
              POUR LE TALENT
            </div>
            <div style={{ position: "relative", paddingTop: 6 }}>
              <div style={{ position: "absolute", top: 30, left: "6%", right: "6%", height: 3, background: t.brd, borderRadius: 2 }} />
              <motion.div
                initial="h"
                animate="v"
                variants={stg(0.1)}
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, position: "relative", zIndex: 1 }}
              >
                {[
                  { n: "01", t: "Clarifier", d: "Positionnement, valeurs, ambitions, ligne éditoriale, priorités." },
                  { n: "02", t: "Structurer", d: "Administratif, juridique, fiscal, comptable, recrutement, process, outils, data." },
                  { n: "03", t: "Développer", d: "Collaborations, ambassades, formats, produits propriétaires, marques propres, actifs." },
                  { n: "04", t: "Protéger", d: "Cohérence éditoriale, image, droits, arbitrages, choix des bonnes opportunités." },
                ].map((s) => (
                  <motion.div key={s.n} variants={fu(14)} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: t.th,
                        color: t.thT,
                        border: `3px solid ${t.a}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                        ...mo,
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      {s.n}
                    </div>
                    <div style={{ ...sa, fontSize: 15, fontWeight: 800, color: t.c, marginBottom: 6 }}>{s.t}</div>
                    <div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.45 }}>{s.d}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            style={{ display: "flex", alignItems: "stretch", gap: 16 }}
          >
            <div style={{ flex: "0 0 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 24 }}>
              <div style={{ width: 2, flex: 1, minHeight: 40, background: `linear-gradient(180deg, ${t.a}, ${t.brd})`, borderRadius: 2 }} />
              <span style={{ ...mo, fontSize: 18, fontWeight: 800, color: t.a, margin: "8px 0" }}>→</span>
              <div style={{ width: 2, flex: 1, minHeight: 40, background: t.brd, borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                {
                  w: "Marque",
                  t: "Un rôle juste dans l'univers du créateur.",
                  d: "Nous identifions où la marque peut s'inscrire sans interrompre l'univers - pour un projet légitime, pas un placement.",
                },
                {
                  w: "Audience",
                  t: "Un projet qui paraît évident.",
                  d: "Quand le talent est structuré et la marque bien placée, l'audience comprend naturellement pourquoi le projet existe et a du sens.",
                },
              ].map((o, i) => (
                <motion.div
                  key={o.w}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                  style={{
                    padding: "22px 20px",
                    borderRadius: 14,
                    background: t.card,
                    border: `1px solid ${t.brd}`,
                  }}
                >
                  <div style={{ ...mo, fontSize: 9, fontWeight: 700, letterSpacing: 2, color: t.d, marginBottom: 10 }}>
                    CONSÉQUENCE
                  </div>
                  <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.c, marginBottom: 8 }}>{o.w}</div>
                  <div style={{ ...sa, fontSize: 15, fontWeight: 700, color: t.a, marginBottom: 10, lineHeight: 1.35 }}>{o.t}</div>
                  <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{o.d}</div>
                </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            style={{
              marginTop: 20,
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
