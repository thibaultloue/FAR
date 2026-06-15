import { motion } from "framer-motion";

/** Deck « pour les marques » - DA dédiée (bleu signal / encre), animations mount-based (PDF-safe). */
export function createSFarMarques(P) {
  const { Tg, Hl, Sh, FarLogo, se, sa, mo, pu } = P;

  const isPdf = () => Boolean(globalThis.__FAR_PDF_EXPORT);
  const vis = { opacity: 1, y: 0, x: 0, scale: 1 };
  const pdfVisibleStyle = (style) => ({ opacity: 1, transform: "none", filter: "none", ...style });
  const M = ({ children, style, className, variants: _v, initial: _i, animate: _a, exit: _e, transition: _t, ...rest }) =>
    isPdf() ? (
      <div className={className} style={pdfVisibleStyle(style)} {...rest}>
        {children}
      </div>
    ) : (
      <motion.div className={className} style={style} variants={_v} initial={_i} animate={_a} exit={_e} transition={_t} {...rest}>
        {children}
      </motion.div>
    );
  const MV = (extra = {}) =>
    isPdf() ? { initial: false, animate: "v", ...extra } : { initial: "h", animate: "v", ...extra };
  const MA = (initial, animate, extra = {}) =>
    isPdf() ? { initial: false, animate, ...extra } : { initial, animate, ...extra };
  const stg = (d = 0.08) =>
    isPdf() ? { v: { transition: { staggerChildren: 0 } } } : { h: {}, v: { transition: { staggerChildren: d } } };
  const fu = (y = 14) =>
    isPdf() ? { v: vis } : { h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
  const fs = isPdf()
    ? { v: vis }
    : { h: { opacity: 0, scale: 0.96 }, v: { opacity: 1, scale: 1, transition: { duration: 0.45 } } };

  const SlideHead = ({ t, tag, title, titleS, subS }) => (
    <>
      <M variants={fu(10)}>
        <Tg t={t}>{tag}</Tg>
      </M>
      <M variants={fu(12)}>
        <Hl t={t} s={{ marginBottom: 18, ...titleS }}>{title}</Hl>
      </M>
    </>
  );

  /** Bandeau « phrase clé » - signature visuelle commune (fond accent, texte clair). */
  const KeyLine = ({ t, children, label = "L'idée" }) => (
    <M
      variants={fs}
      style={{
        marginTop: 18,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "18px 26px",
        borderRadius: 14,
        background: t.a,
        color: "#fff",
        boxShadow: t.cS,
      }}
    >
      <span style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.7)", flexShrink: 0 }}>
        {label} →
      </span>
      <span style={{ ...se, fontSize: 18, fontWeight: 800, lineHeight: 1.3 }}>{children}</span>
    </M>
  );

  const Intro = ({ t, children, s }) => (
    <M variants={fu(8)}>
      <Sh t={t} s={{ fontSize: 16, lineHeight: 1.6, marginBottom: 18, maxWidth: 1040, ...s }}>
        {children}
      </Sh>
    </M>
  );

  /** Schéma trépied 2D « blueprint » : 3 appuis (marque / créateur / audience) convergent vers un même point. */
  const TripodSchema = ({ t }) => {
    const acc = t.a;
    const con = "rgba(53,82,255,.42)";
    const faint = "rgba(19,21,28,.2)";
    const dot = "2 6";
    const ax = 500, ay = 118, by = 366;
    const feet = [
      { x: 170, y: by },
      { x: 500, y: by },
      { x: 830, y: by },
    ];
    const legs = [
      { n: "01", k: "L'ambition de la marque", d: "Notoriété, préférence, lancement, considération, conversion.", left: "1%" },
      { n: "02", k: "L'univers du créateur", d: "Ton, formats, codes éditoriaux et relation de confiance avec sa communauté.", left: "35%" },
      { n: "03", k: "L'attente de l'audience", d: "Une intégration utile : divertissement, inspiration, usage, preuve, proximité.", left: "69%" },
    ];
    return (
      <M variants={fs} style={{ position: "relative", width: 760, height: 410, margin: "4px auto 0" }}>
        <svg width="100%" height="100%" viewBox="0 0 1000 540" fill="none" style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden>
          <path d="M8,22 V8 H22 M992,22 V8 H978 M8,518 V532 H22 M992,518 V532 H978" stroke={faint} strokeWidth="1.2" />
          {/* ligne de sol */}
          <path d={`M140,${by} H860`} stroke={faint} strokeWidth="1.4" strokeDasharray={dot} />
          {/* arc d'écartement près du sommet */}
          <path d={`M${ax - 52},${ay + 60} Q${ax},${ay + 44} ${ax + 52},${ay + 60}`} stroke={con} strokeWidth="1.3" strokeDasharray={dot} />
          {/* jambes */}
          {feet.map((f, i) => (
            <path key={i} d={`M${ax},${ay} L${f.x},${f.y}`} stroke={acc} strokeWidth="4" strokeLinecap="round" />
          ))}
          {/* connecteur sommet -> libellé */}
          <path d={`M${ax},44 L${ax},${ay - 22}`} stroke={con} strokeWidth="1.4" strokeDasharray={dot} />
          {/* tête du trépied */}
          <rect x={ax - 34} y={ay - 22} width="68" height="16" rx="5" fill={acc} fillOpacity="0.16" stroke={acc} strokeWidth="1.6" />
          <circle cx={ax} cy={ay} r="5.5" fill={acc} />
          {/* pieds */}
          {feet.map((f, i) => (
            <g key={i}>
              <path d={`M${f.x - 16},${f.y} H${f.x + 16}`} stroke={acc} strokeWidth="3" strokeLinecap="round" />
              <circle cx={f.x} cy={f.y - 1} r="6.5" fill={t.bg} stroke={acc} strokeWidth="2.4" />
            </g>
          ))}
          {/* rappels vers les libellés */}
          {feet.map((f, i) => (
            <path key={i} d={`M${f.x},${f.y + 8} L${f.x},414`} stroke={con} strokeWidth="1.4" strokeDasharray={dot} />
          ))}
        </svg>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 2,
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 13px",
            borderRadius: 999,
            background: t.card,
            border: `1px solid ${t.a}`,
            color: t.a,
            ...mo,
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 1.3,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.a }} />
          Le point de rencontre
        </div>

        {legs.map((leg) => (
          <div key={leg.n} style={{ position: "absolute", left: leg.left, top: "77%", width: "30%", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, background: t.a, color: "#fff", ...mo, fontSize: 12, fontWeight: 800, marginBottom: 8 }}>
              {leg.n}
            </div>
            <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.c, marginBottom: 6, lineHeight: 1.2 }}>{leg.k}</div>
            <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.45 }}>{leg.d}</div>
          </div>
        ))}
      </M>
    );
  };

  return [
    // ── 0. Couverture ─────────────────────────────────────────────────────────
    {
      title: "FAR for Brands",
      r: (t) => (
        <div
          style={{
            textAlign: "center",
            padding: "28px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: isPdf() ? "fit-content" : "100%",
          }}
        >
          <M {...MA({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5 } })} style={{ marginBottom: 16 }}>
            <FarLogo size={96} variant={t.lv} />
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.08, duration: 0.45 } })}
            style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: t.d, marginBottom: 26 }}
          >
            Pour les marques
          </M>
          <M {...MA({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { transition: { delay: 0.15, duration: 0.55 } })}>
            <Hl t={t} s={{ fontSize: 50, maxWidth: 980, margin: "0 auto 16px", textAlign: "center" }}>
              Faire entrer les marques dans la culture créateur.
            </Hl>
          </M>
          <M {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.28, duration: 0.5 } })}>
            <Sh t={t} s={{ maxWidth: 760, margin: "0 auto 22px", textAlign: "center", fontSize: 18 }}>
              Transformer un objectif de marque en collaboration créateur juste, fluide et performante.
            </Sh>
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.42, duration: 0.5 } })}
            style={{ display: "inline-flex", gap: 14, alignItems: "center", ...mo, fontSize: 13, fontWeight: 700, letterSpacing: 1, color: t.a, marginTop: 6 }}
          >
            <span>Brand-first</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Creator-led</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Business-measured</span>
          </M>
        </div>
      ),
    },

    // ── 1. Notre conviction ───────────────────────────────────────────────────
    {
      title: "Notre conviction",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Conviction" title="La bonne collaboration crée l'évidence." titleS={{ fontSize: 32, maxWidth: 1000 }} />
          <Intro t={t} s={{ marginBottom: 4 }}>
            Une collaboration créateur ne tient pas debout sur une seule force. Elle naît de l'équilibre entre trois appuis. FAR crée leur point de rencontre.
          </Intro>
          <TripodSchema t={t} />
          <KeyLine t={t}>Une collaboration forte donne à la marque une vraie raison d'être dans le contenu.</KeyLine>
        </M>
      ),
    },

    // ── 2. Ce que FAR apporte aux marques ─────────────────────────────────────
    {
      title: "Ce que FAR apporte",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="Notre rôle"
            title="Le point de rencontre entre stratégie, marque et culture créateur."
            titleS={{ fontSize: 32, maxWidth: 1020 }}
          />
          <Intro t={t}>
            FAR accompagne les marques au-delà du casting de talents : transformer un objectif de communication ou de business en collaboration créateur juste, fluide et performante. Trois expertises complémentaires.
          </Intro>
          <M
            {...MV()}
            variants={stg(0.08)}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {[
              {
                k: "Expertise stratégique",
                d: "Comprendre l'enjeu de la marque, clarifier le rôle de la collaboration et définir les bons objectifs, formats et indicateurs de succès.",
              },
              {
                k: "Expertise marque",
                d: "Préserver la cohérence du territoire, la qualité d'exécution, la brand safety, les contraintes de validation, les droits et la mesure.",
              },
              {
                k: "Culture créateur native",
                d: "Maîtriser les codes des plateformes, les mécaniques éditoriales, les attentes des communautés et les conditions d'une intégration authentique.",
              },
            ].map((e, i) => (
              <M
                key={e.k}
                variants={fu(12)}
                style={{
                  background: t.card,
                  color: t.cardT,
                  borderRadius: 14,
                  border: `1px solid ${t.brd}`,
                  borderTop: `3px solid ${t.a}`,
                  padding: "20px 22px",
                }}
              >
                <div style={{ ...mo, fontSize: 12, fontWeight: 800, letterSpacing: 1, color: t.a, marginBottom: 12 }}>
                  0{i + 1}
                </div>
                <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.c, marginBottom: 10, lineHeight: 1.2 }}>{e.k}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.55 }}>{e.d}</div>
              </M>
            ))}
          </M>
          <KeyLine t={t}>Nous aidons les marques à entrer dans la culture créateur avec méthode, exigence et impact business.</KeyLine>
        </M>
      ),
    },

    // ── 3. Notre expertise ────────────────────────────────────────────────────
    {
      title: "Notre expertise",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Expertise" title="Notre expertise, de la stratégie à la performance." titleS={{ fontSize: 32, maxWidth: 1000 }} />
          <Intro t={t} s={{ marginBottom: 14 }}>
            FAR réunit sous un même toit les savoir-faire qui font une collaboration réussie : penser la stratégie, structurer le plan, puis exécuter avec exigence.
          </Intro>
          <M
            {...MV()}
            variants={stg(0.08)}
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 16 }}
          >
            {[
              { k: "Stratégie d'influence", d: "Définir le rôle des créateurs dans le mix de marque : profils, plateformes et formats au service de l'objectif." },
              { k: "Planning stratégique", d: "Transformer un enjeu business en plateforme de collaboration : insight, positionnement et narratif cohérents." },
            ].map((e, i) => (
              <M
                key={e.k}
                variants={fu(12)}
                style={{
                  background: t.card,
                  color: t.cardT,
                  borderRadius: 14,
                  border: `1px solid ${t.brd}`,
                  borderTop: `3px solid ${t.a}`,
                  padding: "20px 22px",
                }}
              >
                <div style={{ ...mo, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: t.a, textTransform: "uppercase", marginBottom: 10 }}>
                  Pilier 0{i + 1}
                </div>
                <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.c, marginBottom: 8, lineHeight: 1.15 }}>{e.k}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5 }}>{e.d}</div>
              </M>
            ))}
          </M>
          <M variants={fu(8)} style={{ ...mo, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: t.d, textTransform: "uppercase", marginBottom: 10 }}>
            Et l'ensemble de la chaîne
          </M>
          <M
            {...MV()}
            variants={stg(0.05)}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
          >
            {[
              { k: "Casting & matchmaking", d: "Créateurs alignés au territoire et à l'audience visée." },
              { k: "Direction créative & éditoriale", d: "Concepts et écriture pensés pour la plateforme." },
              { k: "Production & pilotage", d: "Brief, négociation, calendrier et validations." },
              { k: "Brand safety, droits & légal", d: "Cadre contractuel, droits d'usage et conformité." },
              { k: "Média & amplification", d: "Paid social, social ads et activation 360." },
              { k: "Data, mesure & performance", d: "KPIs, reporting et learnings actionnables." },
            ].map((e) => (
              <M
                key={e.k}
                variants={fu(10)}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  background: t.card,
                  color: t.cardT,
                  border: `1px solid ${t.brd}`,
                  borderRadius: 12,
                  padding: "13px 15px",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.a, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <div style={{ ...se, fontSize: 14.5, fontWeight: 800, color: t.c, marginBottom: 3, lineHeight: 1.2 }}>{e.k}</div>
                  <div style={{ ...sa, fontSize: 12.5, color: t.m, lineHeight: 1.4 }}>{e.d}</div>
                </div>
              </M>
            ))}
          </M>
          <KeyLine t={t}>De la stratégie d'influence à la mesure, une seule équipe : moins d'intermédiaires, plus de cohérence.</KeyLine>
        </M>
      ),
    },

    // ── 4. Notre méthode ──────────────────────────────────────────────────────
    {
      title: "Notre méthode",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Méthode" title="Brand-first. Creator-led. Business-measured." titleS={{ fontSize: 34, maxWidth: 1000 }} />
          <Intro t={t}>
            Chaque collaboration part d'une intention de marque claire, puis se construit dans le respect de l'univers du créateur et des attentes de son audience.
          </Intro>
          <M
            variants={fs}
            style={{ position: "relative", padding: "10px 0 4px" }}
          >
            <div style={{ position: "absolute", top: 34, left: "11%", right: "11%", height: 3, background: t.brd, borderRadius: 2 }} />
            <M
              {...MV()}
              variants={stg(0.1)}
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, position: "relative", zIndex: 1 }}
            >
              {[
                { n: "01", k: "Cadrer", d: "Identifier l'objectif réel : notoriété, image, préférence, lancement, trafic, considération ou conversion." },
                { n: "02", k: "Traduire", d: "Transformer le brief de marque en idée éditoriale naturelle, crédible et activable par le créateur." },
                { n: "03", k: "Orchestrer", d: "Piloter de bout en bout : casting, brief, négociation, production, validations, droits, mentions légales et calendrier." },
                { n: "04", k: "Amplifier & mesurer", d: "Au-delà de l'organique : paid, social ads, assets marque, reporting et learnings." },
              ].map((s) => (
                <M key={s.n} variants={fu(14)} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: t.a,
                      color: "#fff",
                      border: `3px solid ${t.bg}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                      ...mo,
                      fontSize: 14,
                      fontWeight: 800,
                      boxShadow: t.cS,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.c, marginBottom: 8 }}>{s.k}</div>
                  <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{s.d}</div>
                </M>
              ))}
            </M>
          </M>
          <KeyLine t={t}>Une collaboration créateur se construit comme un actif de marque : stratégique, créatif, activable et mesurable.</KeyLine>
        </M>
      ),
    },

    // ── 5. Nos terrains d'activation ──────────────────────────────────────────
    {
      title: "Terrains d'activation",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Activation" title="Du placement intelligent au partenariat de marque." titleS={{ fontSize: 32, maxWidth: 1000 }} />
          <Intro t={t}>
            Des collaborations adaptées au niveau d'ambition et aux objectifs de chaque marque, de l'intégration simple au dispositif plus structurant.
          </Intro>
          <M
            {...MV()}
            variants={stg(0.07)}
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}
          >
            {[
              { k: "Campagnes intégrées", d: "Faire entrer la marque dans un contenu de manière naturelle, mémorable et utile." },
              { k: "Ambassadorats", d: "Construire la confiance, la répétition et la préférence dans le temps." },
              { k: "Lancements produit", d: "Créer un moment éditorial autour d'une nouveauté, avec un rôle clair pour le produit ou le service." },
              { k: "Formats sur-mesure", d: "Imaginer des concepts où la marque devient un véritable ressort narratif." },
              { k: "Contenus amplifiables & activations 360", d: "Prolonger la valeur via paid media, social ads, événementiel, assets marque ou dispositifs de conversion." },
            ].map((e, i) => (
              <M
                key={e.k}
                variants={fu(12)}
                style={{
                  gridColumn: i < 3 ? "span 2" : "span 3",
                  background: t.card,
                  color: t.cardT,
                  borderRadius: 14,
                  border: `1px solid ${t.brd}`,
                  borderLeft: `5px solid ${t.a}`,
                  padding: "18px 20px",
                }}
              >
                <div style={{ ...se, fontSize: 16, fontWeight: 800, color: t.c, marginBottom: 8, lineHeight: 1.2 }}>{e.k}</div>
                <div style={{ ...sa, fontSize: 13.5, color: t.m, lineHeight: 1.5 }}>{e.d}</div>
              </M>
            ))}
          </M>
          <KeyLine t={t} label="Notre parti pris">Moins de placements. Plus de projets.</KeyLine>
        </M>
      ),
    },

    // ── 6. Clôture ────────────────────────────────────────────────────────────
    {
      title: "Clôture",
      r: (t) => (
        <div
          style={{
            textAlign: "center",
            padding: "28px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: isPdf() ? "fit-content" : "100%",
          }}
        >
          <M {...MA({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5 } })} style={{ marginBottom: 26 }}>
            <FarLogo size={92} variant={t.lv} />
          </M>
          <M {...MA({ opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5, delay: 0.1 } })}>
            <Hl t={t} s={{ fontSize: 46, maxWidth: 980, textAlign: "center", color: t.a }}>
              Votre marque, une évidence dans le contenu.
            </Hl>
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.4, duration: 0.45 } })}
            style={{ ...mo, fontSize: 13, fontWeight: 700, letterSpacing: 2, color: t.m, marginTop: 8 }}
          >
            Brand-first · Creator-led · Business-measured
          </M>
        </div>
      ),
    },
  ];
}
