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
        <div style={{ whiteSpace: "nowrap" }}>
          <Tg t={t} s={{ marginBottom: isPdf() ? 20 : 28 }}>{tag}</Tg>
        </div>
      </M>
      <M variants={fu(12)}>
        <Hl
          t={t}
          s={{
            marginBottom: isPdf() ? 14 : 18,
            width: "100%",
            maxWidth: "none",
            textAlign: "left",
            ...titleS,
          }}
        >
          {title}
        </Hl>
      </M>
    </>
  );

  /** Bandeau « phrase clé » - signature visuelle commune (fond accent, texte clair). */
  const KeyLine = ({ t, children, label = "L'idée" }) => (
    <M
      variants={fs}
      style={{
        marginTop: isPdf() ? 12 : 18,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: isPdf() ? "14px 22px" : "18px 26px",
        borderRadius: 14,
        background: t.a,
        color: "#fff",
        boxShadow: t.cS,
      }}
    >
      {label ? (
        <span style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.7)", flexShrink: 0 }}>
          {label} →
        </span>
      ) : null}
      <span style={{ ...se, fontSize: 18, fontWeight: 800, lineHeight: 1.3, flex: 1, textAlign: "left" }}>{children}</span>
    </M>
  );

  const Intro = ({ t, children, s }) => (
    <M variants={fu(8)}>
      <Sh
        t={t}
        s={{
          fontSize: 16,
          lineHeight: 1.55,
          marginBottom: isPdf() ? 10 : 18,
          width: "100%",
          maxWidth: "none",
          textAlign: "justify",
          hyphens: "none",
          ...s,
        }}
      >
        {children}
      </Sh>
    </M>
  );

  /** Schéma trépied 3D « blueprint » — tout en SVG (coords fixes) pour un export PDF fidèle. */
  const TripodSchema = ({ t }) => {
    const acc = t.a;
    const con = "rgba(53,82,255,.4)";
    const faint = "rgba(19,21,28,.2)";
    const dot = "2 6";
    const dash = "8 7";
    const W = 1000;
    const H = 580;
    const A = { x: 500, y: 92 };
    const vL = { x: 180, y: 388 };
    const vR = { x: 820, y: 388 };
    const vB = { x: 500, y: 292 };
    const C = { x: 500, y: 355 };
    const verts = [vL, vB, vR];
    const legs = [
      { n: "01", k: "L'ambition de la marque", d: "Notoriété, préférence, lancement, considération, conversion.", cx: 170 },
      { n: "02", k: "L'univers du créateur", d: "Ton, formats, codes éditoriaux et relation de confiance avec sa communauté.", cx: 500 },
      { n: "03", k: "L'attente de l'audience", d: "Une intégration utile : divertissement, inspiration, usage, preuve, proximité.", cx: 830 },
    ];
    const ff = se.fontFamily;
    const ffm = mo.fontFamily;
    return (
      <M variants={fs} style={{ width: W, height: H, margin: isPdf() ? "0 auto" : "2px auto 0" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" style={{ display: "block", overflow: "visible" }} aria-hidden>
          <path d="M8,22 V8 H22 M992,22 V8 H978 M8,558 V572 H22 M992,558 V572 H978" stroke={faint} strokeWidth="1.2" />
          <ellipse cx="500" cy="418" rx="330" ry="44" stroke={faint} strokeWidth="1.4" strokeDasharray={dot} />
          <path d={`M${vL.x},${vL.y} L${vB.x},${vB.y}`} stroke={faint} strokeWidth="1.5" strokeDasharray={dot} />
          <path d={`M${vR.x},${vR.y} L${vB.x},${vB.y}`} stroke={faint} strokeWidth="1.5" strokeDasharray={dot} />
          <path d={`M${vL.x},${vL.y} L${vR.x},${vR.y}`} stroke={con} strokeWidth="1.8" strokeDasharray={dash} />
          {verts.map((v, i) => (
            <path key={`l${i}`} d={`M${C.x},${C.y} L${v.x},${v.y}`} stroke={con} strokeWidth="1.3" strokeDasharray={dot} />
          ))}
          {verts.map((v, i) => (
            <path key={`j${i}`} d={`M${A.x},${A.y} L${v.x},${v.y}`} stroke={acc} strokeWidth="2.6" strokeDasharray={dash} strokeLinecap="round" />
          ))}
          <circle cx={A.x} cy={A.y} r="6" fill={acc} />
          {verts.map((v, i) => (
            <circle key={`n${i}`} cx={v.x} cy={v.y} r="6.5" fill={t.bg} stroke={acc} strokeWidth="2.4" />
          ))}
          {verts.map((v, i) => (
            <path key={`r${i}`} d={`M${v.x},${v.y + 8} L${v.x},448`} stroke={con} strokeWidth="1.4" strokeDasharray={dot} />
          ))}
          <rect x={A.x - 54} y={A.y - 53} width={108} height={30} rx={15} fill={acc} />
          <circle cx={A.x - 38} cy={A.y - 38} r={3} fill="#fff" />
          <text x={A.x + 6} y={A.y - 33} textAnchor="middle" fill="#fff" style={{ fontFamily: ffm, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.3 }}>
            SUCCÈS
          </text>
          <circle cx={C.x} cy={C.y} r={23} fill={acc} stroke={t.bg} strokeWidth={3} />
          <text x={C.x} y={C.y + 5} textAnchor="middle" fill="#fff" style={{ fontFamily: ffm, fontSize: 14, fontWeight: 800 }}>
            FAR
          </text>
          <rect x={C.x - 72} y={C.y + 30} width={144} height={18} rx={6} fill={t.bg} />
          <text x={C.x} y={C.y + 43} textAnchor="middle" fill={acc} style={{ fontFamily: ffm, fontSize: 9.5, fontWeight: 700, letterSpacing: 1 }}>
            GARANT DE L&apos;ÉQUILIBRE
          </text>
          {legs.map((leg) => (
            <foreignObject key={leg.n} x={leg.cx - 158} y={452} width={316} height={124}>
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: "center", fontFamily: ff }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 9, background: acc, color: "#fff", fontFamily: ffm, fontSize: 13, fontWeight: 800, marginBottom: 10 }}>
                  {leg.n}
                </div>
                <div style={{ fontFamily: ff, fontSize: 19, fontWeight: 800, color: t.c, marginBottom: 8, lineHeight: 1.2, whiteSpace: "nowrap" }}>{leg.k}</div>
                <div style={{ fontFamily: ff, fontSize: 14.5, color: t.m, lineHeight: 1.5, textAlign: "center", hyphens: "none" }}>{leg.d}</div>
              </div>
            </foreignObject>
          ))}
        </svg>
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
          <SlideHead t={t} tag="Notre conviction" title="Une collaboration réussie n'est pas à géométrie variable." titleS={{ fontSize: 32 }} />
          <Intro t={t} s={{ marginBottom: isPdf() ? 0 : 4 }}>
            Elle naît de l'équilibre entre trois appuis. Le rôle de FAR est d'en être le garant.
          </Intro>
          <TripodSchema t={t} />
          <KeyLine t={t} label={null}>Une collaboration forte donne à la marque une vraie raison d'être dans le contenu.</KeyLine>
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
            titleS={{ fontSize: 32 }}
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
                d: "Nous comprenons les enjeux de la marque, clarifions le rôle de la collaboration et définissons les bons objectifs, formats et indicateurs de succès.",
              },
              {
                k: "Expertise marque",
                d: "Nous préservons la cohérence du territoire, la qualité d'exécution, la brand safety, les contraintes de validation, les droits et la mesure.",
              },
              {
                k: "Culture créateur native",
                d: "Nous maîtrisons les codes des plateformes, les mécaniques éditoriales, les attentes des communautés et les conditions d'une intégration authentique.",
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
                  padding: "30px 28px",
                  minHeight: 250,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ ...mo, fontSize: 13, fontWeight: 800, letterSpacing: 1, color: t.a, marginBottom: 16 }}>
                  0{i + 1}
                </div>
                <div style={{ ...se, fontSize: 21, fontWeight: 800, color: t.c, marginBottom: 14, lineHeight: 1.2 }}>{e.k}</div>
                <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.6, textAlign: "justify", hyphens: "none" }}>{e.d}</div>
              </M>
            ))}
          </M>
          <KeyLine t={t}>Nous aidons les marques à entrer dans la culture créateur avec méthode, exigence et impact business.</KeyLine>
        </M>
      ),
    },

    // ── 3. Notre méthode ──────────────────────────────────────────────────────
    {
      title: "Notre méthode",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Méthode" title="Brand-first. Creator-led. Business-measured." titleS={{ fontSize: 34, whiteSpace: "nowrap" }} />
          <Intro t={t}>
            Chaque collaboration part d'une intention de marque claire, puis se construit dans le respect de l'univers du créateur et des attentes de son audience.
          </Intro>
          <M
            variants={fs}
            style={{ position: "relative", padding: "36px 0 24px" }}
          >
            <div style={{ position: "absolute", top: 76, left: "11%", right: "11%", height: 3, background: t.brd, borderRadius: 2 }} />
            <M
              {...MV()}
              variants={stg(0.1)}
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative", zIndex: 1 }}
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
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: t.a,
                      color: "#fff",
                      border: `4px solid ${t.bg}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      ...mo,
                      fontSize: 17,
                      fontWeight: 800,
                      boxShadow: t.cS,
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ ...se, fontSize: 20, fontWeight: 800, color: t.c, marginBottom: 12 }}>{s.k}</div>
                  <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.6, textAlign: "justify", hyphens: "none" }}>{s.d}</div>
                </M>
              ))}
            </M>
          </M>
          <KeyLine t={t}>Une collaboration créateur se construit comme un actif de marque : stratégique, créatif, activable et mesurable.</KeyLine>
        </M>
      ),
    },

    // ── 4. Notre expertise ────────────────────────────────────────────────────
    {
      title: "Notre expertise",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Notre expertise" title="De la stratégie d'influence à la mesure, une chaîne complète." titleS={{ fontSize: 32 }} />
          <Intro t={t} s={{ marginBottom: isPdf() ? 8 : 12 }}>
            Nous réunissons l'ensemble des savoir-faire qui font une collaboration réussie. Chaque expertise compte, de la réflexion stratégique à l'activation et à la performance.
          </Intro>
          <M
            {...MV()}
            variants={stg(0.05)}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
          >
            {[
              {
                k: "Stratégie d'influence",
                d: "Nous définissons le rôle des créateurs dans le mix de marque : profils, plateformes et formats au service de l'objectif.",
              },
              {
                k: "Planning stratégique",
                d: "Nous transformons un enjeu business en plateforme de collaboration : insight, positionnement et narratif cohérents.",
              },
              {
                k: "Casting & matchmaking",
                d: "Nous identifions les créateurs alignés au territoire de la marque, à son audience et aux conditions d'une intégration crédible.",
              },
              {
                k: "Direction créative & éditoriale",
                d: "Nous concevons des idées et des écritures pensées pour la plateforme, naturelles dans la bouche du créateur.",
              },
              {
                k: "Production & pilotage",
                d: "Nous pilotons la collaboration de bout en bout : brief, négociation, calendrier, validations et livraison.",
              },
              {
                k: "Brand safety, droits & légal",
                d: "Nous sécurisons le cadre contractuel, les droits d'usage, la conformité et la brand safety à chaque étape.",
              },
              {
                k: "Média & amplification",
                d: "Nous prolongeons la valeur des collaborations via paid social, social ads et activations 360.",
              },
              {
                k: "Data, mesure & performance",
                d: "Nous structurons les KPIs, le reporting et les learnings pour piloter la performance et nourrir la suite.",
              },
            ].map((e, i) => (
              <M
                key={e.k}
                variants={fu(10)}
                style={{
                  background: t.card,
                  color: t.cardT,
                  borderRadius: 12,
                  border: `1px solid ${t.brd}`,
                  borderLeft: `5px solid ${t.a}`,
                  padding: "20px 20px",
                  minHeight: 172,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ ...mo, fontSize: 12, fontWeight: 800, letterSpacing: 1, color: t.a, marginBottom: 12 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.c, marginBottom: 10, lineHeight: 1.2, textAlign: "left" }}>{e.k}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.55, textAlign: "justify", hyphens: "none" }}>{e.d}</div>
              </M>
            ))}
          </M>
          <KeyLine t={t} label={null}>Une seule équipe, une chaîne complète : moins d'intermédiaires, plus de cohérence.</KeyLine>
        </M>
      ),
    },

    // ── 5. Nos terrains d'activation ──────────────────────────────────────────
    {
      title: "Terrains d'activation",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="Activation" title="Du placement intelligent au partenariat de marque." titleS={{ fontSize: 32, whiteSpace: "nowrap" }} />
          <Intro t={t}>
            Des collaborations adaptées au niveau d'ambition et aux objectifs de chaque marque, de l'intégration simple au dispositif plus structurant.
          </Intro>
          <M
            {...MV()}
            variants={stg(0.05)}
            style={{
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${t.brd}`,
              borderRadius: 14,
              overflow: "hidden",
              background: t.card,
            }}
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
                variants={fu(10)}
                style={{
                  display: "flex",
                  gap: 18,
                  alignItems: "flex-start",
                  padding: "15px 22px",
                  borderTop: i === 0 ? "none" : `1px solid ${t.brd}`,
                  color: t.cardT,
                }}
              >
                <div style={{ ...mo, fontSize: 13, fontWeight: 800, color: t.a, minWidth: 30, paddingTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...se, fontSize: 17, fontWeight: 800, color: t.c, marginBottom: 5, lineHeight: 1.2 }}>{e.k}</div>
                  <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5, textAlign: "justify", hyphens: "none" }}>{e.d}</div>
                </div>
              </M>
            ))}
          </M>
          <KeyLine t={t} label="Notre parti pris">Moins de placements. Plus de projets.</KeyLine>
        </M>
      ),
    },

    // ── 6. Clôture (reprise fermeture positionnement) ─────────────────────────
    {
      title: "Clôture",
      r: (t, back) => (
        <div
          style={{
            textAlign: "center",
            padding: "32px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: isPdf() ? "fit-content" : "100%",
          }}
        >
          <M
            {...MA({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5 } })}
            style={{ marginBottom: 28, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <FarLogo size={100} variant={t.lv} />
          </M>
          <M {...MA({ opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5, delay: 0.1 } })}>
            <Hl t={t} s={{ fontSize: 44, textAlign: "center", color: t.a }}>
              Qui veut aller loin, vient ici.
            </Hl>
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.55, duration: 0.45 } })}
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
          </M>
          {back ? (
            <M {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.85, duration: 0.4 } })}>
              <button
                type="button"
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
            </M>
          ) : null}
        </div>
      ),
    },
  ];
}
