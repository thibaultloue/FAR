import { motion } from "framer-motion";

/** Deck positionnement - DA native T1 + animations mount-based (PDF-safe). */
export function createSFarPositionnement(P) {
  const { Tg, Hl, Sh, Th, FarLogo, FarBeams, se, sa, mo, fi, sv, pu } = P;

  const isPdf = () => Boolean(globalThis.__FAR_PDF_EXPORT);
  const vis = { opacity: 1, y: 0, x: 0, scale: 1 };
  const pdfVisibleStyle = (style) => ({ opacity: 1, transform: "none", filter: "none", ...style });
  /** En export PDF : div statique (html2canvas ne voit pas les états initiaux Framer). */
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
  const Mp = ({ children, style, className, variants: _v, initial: _i, animate: _a, exit: _e, transition: _t, ...rest }) =>
    isPdf() ? (
      <p className={className} style={pdfVisibleStyle(style)} {...rest}>
        {children}
      </p>
    ) : (
      <motion.p className={className} style={style} variants={_v} initial={_i} animate={_a} exit={_e} transition={_t} {...rest}>
        {children}
      </motion.p>
    );
  const MV = (extra = {}) =>
    isPdf() ? { initial: false, animate: "v", ...extra } : { initial: "h", animate: "v", ...extra };
  const MA = (initial, animate, extra = {}) =>
    isPdf() ? { initial: false, animate, ...extra } : { initial, animate, ...extra };

  const stg = (d = 0.08) =>
    isPdf() ? { v: { transition: { staggerChildren: 0 } } } : { h: {}, v: { transition: { staggerChildren: d } } };
  const fu = (y = 14) =>
    isPdf()
      ? { v: vis }
      : { h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
  const fs = isPdf()
    ? { v: vis }
    : { h: { opacity: 0, scale: 0.96 }, v: { opacity: 1, scale: 1, transition: { duration: 0.45 } } };
  const fsc = isPdf()
    ? { v: vis }
    : { h: { opacity: 0, scale: 0.97 }, v: { opacity: 1, scale: 1, transition: { duration: 0.35 } } };
  const fl = isPdf()
    ? { v: vis }
    : { h: { opacity: 0, x: -16 }, v: { opacity: 1, x: 0, transition: { duration: 0.4 } } };
  const fr = isPdf()
    ? { v: vis }
    : { h: { opacity: 0, x: 20 }, v: { opacity: 1, x: 0, transition: { duration: 0.45 } } };
  const ft = (y = 24) =>
    isPdf()
      ? { v: vis }
      : { h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  const SlideHead = ({ t, tag, title, titleS }) => (
    <>
      <M variants={fu(10)}>
        <Tg t={t}>{tag}</Tg>
      </M>
      <M variants={fu(12)}>
        <Hl t={t} s={titleS}>{title}</Hl>
      </M>
    </>
  );

  const Lb = ({ t, children, s }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2, color: t.d, marginBottom: 10, textTransform: "uppercase", ...s }}>
      {children}
    </div>
  );

  const FAR_BEAM_THEMES = {
    1: {
      slideWash: "radial-gradient(ellipse 70% 50% at 6% 12%, rgba(26,26,26,0.025) 0%, transparent 50%)",
      symbolOpacity: 0.42,
      symbolAccent: "#1A1A1A",
    },
    2: {
      slideWash: null,
      symbolOpacity: 0.4,
      symbolAccent: "#1A1A1A",
    },
    3: {
      slideWash: "radial-gradient(ellipse 60% 45% at 94% 6%, rgba(255,170,0,0.06) 0%, transparent 55%)",
      symbolOpacity: 0.45,
      symbolAccent: "rgba(255,170,0,0.85)",
      blockAccent: "rgba(255,170,0,0.55)",
    },
  };

  const FarBeamSymbol = ({ beam, size = 44, stroke = "#1A1A1A", accent = "#1A1A1A", opacity = 0.45, style }) => {
    const svgProps = {
      width: size,
      height: size,
      viewBox: "0 0 64 64",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": true,
      style: { display: "block", opacity, ...style },
    };
    if (beam === 1) {
      return (
        <svg {...svgProps}>
          <path
            d="M32 8 L49 14.5 V30.5 C49 40 41 47 32 52 C23 47 15 40 15 30.5 V14.5 Z"
            stroke={stroke}
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="29" r="6" stroke={stroke} strokeWidth="1.4" fill="none" />
          <path d="M32 25 V33 M28 29 H36" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    }
    if (beam === 2) {
      return (
        <svg {...svgProps}>
          <rect x="16" y="16" width="32" height="32" stroke={stroke} strokeWidth="1.6" fill="none" />
          <line x1="16" y1="26.7" x2="48" y2="26.7" stroke={stroke} strokeWidth="1.1" />
          <line x1="16" y1="37.3" x2="48" y2="37.3" stroke={stroke} strokeWidth="1.1" />
          <line x1="26.7" y1="16" x2="26.7" y2="48" stroke={stroke} strokeWidth="1.1" />
          <line x1="37.3" y1="16" x2="37.3" y2="48" stroke={stroke} strokeWidth="1.1" />
        </svg>
      );
    }
    return (
      <svg {...svgProps}>
        <path
          d="M18 44 V34 H26 V28 H34 V22 H42 V16"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M42 16 L50 10 M42 16 H49" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const FarGrillePicto = ({ id, size = 38, stroke = "#1A1A1A", opacity = 0.52 }) => {
    const svgProps = {
      width: size,
      height: size,
      viewBox: "0 0 64 64",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": true,
      style: { display: "block", opacity },
    };
    const sw = 1.6;
    if (id === "vision") {
      return (
        <svg {...svgProps}>
          <path
            d="M32 17 C21 17 13 25 11 32 C13 39 21 47 32 47 C43 47 51 39 53 32 C51 25 43 17 32 17 Z"
            stroke={stroke}
            strokeWidth={sw}
          />
          <circle cx="32" cy="32" r="7" stroke={stroke} strokeWidth={1.4} />
          <circle cx="32" cy="32" r="2.5" fill={stroke} />
        </svg>
      );
    }
    if (id === "serenite") {
      return (
        <svg {...svgProps}>
          <path
            d="M32 13 L50 19.5 V33.5 C50 41.5 42 49 32 51 C22 49 14 41.5 14 33.5 V19.5 Z"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M24 33 Q32 27 40 33" stroke={stroke} strokeWidth={1.3} strokeLinecap="round" fill="none" />
        </svg>
      );
    }
    if (id === "structure") {
      return (
        <svg {...svgProps}>
          <rect x="17" y="17" width="30" height="30" stroke={stroke} strokeWidth={sw} />
          <line x1="17" y1="27" x2="47" y2="27" stroke={stroke} strokeWidth={1.1} />
          <line x1="17" y1="37" x2="47" y2="37" stroke={stroke} strokeWidth={1.1} />
          <line x1="27" y1="17" x2="27" y2="47" stroke={stroke} strokeWidth={1.1} />
          <line x1="37" y1="17" x2="37" y2="47" stroke={stroke} strokeWidth={1.1} />
        </svg>
      );
    }
    if (id === "ambition") {
      return (
        <svg {...svgProps}>
          <path
            d="M18 44 V34 H26 V26 H34 V18 H42"
            stroke={stroke}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M42 18 L50 12 M42 18 H48" stroke={stroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return (
      <svg {...svgProps}>
        <path d="M32 16 V22" stroke={stroke} strokeWidth={1.3} strokeLinecap="round" />
        <path d="M22 26 L25 29 M42 26 L39 29" stroke={stroke} strokeWidth={1.2} strokeLinecap="round" />
        <circle cx="32" cy="30" r="9" stroke={stroke} strokeWidth={sw} />
        <path d="M27 40 H37" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
        <path d="M29 44 H35 V40 H29 Z" stroke={stroke} strokeWidth={1.3} strokeLinejoin="round" />
      </svg>
    );
  };

  const FAR_BEAM_STYLES = {
    1: {
      layout: "grid",
      grid: { columns: "1fr 1fr", gap: 16, areas: null, place: null },
      decor: { w: 240, opacity: 0.1, top: -16, right: 0 },
      headerMarginBottom: 8,
      titleWrap: (t) => ({
        borderLeft: `6px solid ${t.a}`,
        paddingLeft: 18,
        marginBottom: 4,
      }),
      hookBox: null,
      block: (t) => ({
        borderRadius: 18,
        border: `1px solid ${t.brd}`,
        borderLeft: `5px solid ${t.a}`,
        padding: "18px 20px",
      }),
      indexColor: (t) => t.thT,
      indexWrap: (t) => ({
        minWidth: 36,
        padding: "6px 10px",
        borderRadius: 999,
        background: t.a,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }),
      footer: (t) => ({ borderRadius: 18, borderLeft: `5px solid ${t.a}` }),
    },
    2: {
      layout: "grid",
      grid: { columns: "1fr 1fr", gap: 14, areas: null, place: null },
      decor: { w: 180, opacity: 0.08, top: 40, right: 24 },
      headerAlign: "center",
      headerMarginBottom: 6,
      titleWrap: (t) => ({
        borderLeft: `6px solid ${t.a}`,
        paddingLeft: 18,
        marginBottom: 4,
      }),
      hookBox: null,
      hideFooter: true,
      block: (t) => ({
        padding: "16px 18px",
        borderLeft: `4px solid ${t.a}`,
        border: `1px solid ${t.brd}`,
        borderRadius: 4,
        background: "#fff",
        color: t.c,
      }),
      indexColor: (t) => t.a,
      indexWrap: (t) => ({
        display: "inline-flex",
        marginBottom: 8,
        padding: "2px 8px",
        border: `1.5px solid ${t.a}`,
        borderRadius: 2,
        background: "transparent",
      }),
      footer: () => ({}),
    },
    3: {
      layout: "grid",
      grid: { columns: "1fr 1fr", gap: 14, areas: null, place: null },
      decor: { w: 260, opacity: 0.12, top: -20, right: -8 },
      headerAlign: "center",
      titleWrap: (t) => ({
        borderLeft: `6px solid ${t.a}`,
        paddingLeft: 18,
        marginBottom: 4,
      }),
      hookBox: null,
      block: (t, i, th) => ({
        borderRadius: 4,
        border: `1px solid ${t.brd}`,
        borderTop: `3px solid ${th?.blockAccent || t.a}`,
        padding: "16px 18px",
        background: "#fff",
        color: t.c,
      }),
      indexColor: (t) => t.thT,
      indexWrap: (t) => ({
        minWidth: 36,
        padding: "6px 10px",
        borderRadius: 6,
        background: t.a,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }),
      footer: (t, th) => ({
        borderRadius: "8px 16px 16px 16px",
        borderTop: `3px solid ${th?.blockAccent || t.a}`,
      }),
    },
  };

  const FAR_LEGS = [
    {
      index: 1,
      beam: 1,
      title: "Protéger la création",
      hook: "1er faisceau du modèle FAR : défendre l'ADN de l'univers créateur.",
      blocks: [
        {
          t: "Ligne éditoriale & territoire",
          d: "Poser ce qui fait l'univers : ton, rythme, formats signature, communauté, imaginaire, limites et ambitions. Tout part de là.",
        },
        {
          t: "Intégrer les marques de façon crédible",
          d: "La marque entre dans l'univers avec un rôle éditorial structurant, jamais comme un placement plaqué qui casse le récit.",
        },
        {
          t: "Arbitrage des opportunités",
          d: "Qualifier chaque sollicitation. Dire non quand ça dénature. Utiliser la grille de lecture pour trancher vite et juste.",
        },
        {
          t: "Protection des catégories",
          d: "Sanctuariser les associations sensibles, éviter les conflits de marques, protéger ce qui ne doit pas être dilué.",
        },
      ],
      footer: "Sans création protégée, la structure et la croissance n'ont pas de socle.",
    },
    {
      index: 2,
      beam: 2,
      title: "Solidifier la structure",
      hook: "2e faisceau : rendre l'univers pilotable au quotidien, sans friction.",
      blocks: [
        {
          t: "Priorisation, calendrier & soutien",
          d: "Hiérarchiser les sollicitations et le calendrier éditorial et commercial, avec un soutien FAR au quotidien pour éviter la surcharge et garder le cap.",
        },
        {
          t: "Data & visibilité business",
          d: "Donner une lecture claire des revenus, des catégories, des pipelines et des priorités à 3-12 mois.",
        },
        {
          t: "Cadre admin, juridique & fiscal",
          d: "Structurer le cadre contractuel, la facturation, la conformité et les relations avec agents ou partenaires.",
        },
        {
          t: "Process & outils",
          d: "Mettre en place des process clairs, des outils de suivi et une organisation qui simplifie, pas qui alourdit.",
        },
      ],
      footer: "Une structure solide libère le talent pour développer sereinement.",
    },
    {
      index: 3,
      beam: 3,
      title: "Garantir la croissance",
      hook: "3e faisceau : ouvrir de nouveaux champs sans dénaturer l'univers.",
      blocks: [
        {
          t: "Partenariats long terme",
          d: "Ambassades, récurrence, relations marques sur 6-12 mois, pas seulement des one-shots.",
        },
        {
          t: "Actifs propriétaires des créateurs",
          d: "Développement de marques, podcasts, formats récurrents, événements : construire ce que le talent possède et peut monétiser.",
        },
        {
          t: "Opérations premium",
          d: "Co-brandings, activations structurantes, formats à forte valeur, au-delà du post sponsorisé.",
        },
        {
          t: "Remplissage à 100 % intelligent",
          d: "Viser un sponsor par vidéo, en structurant calendrier et catégories pour maximiser le taux de remplissage. Le CA reste le 1er levier de croissance, avant d'ouvrir de nouveaux territoires.",
        },
      ],
      footer: "La croissance n'a de valeur que si elle respecte l'univers. La grille de lecture sert à arbitrer.",
    },
  ];

  const FarModelBreadcrumb = ({ t, leg }) => (
    <M variants={fu(6)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
      <span style={{ ...mo, fontSize: 10, fontWeight: 600, letterSpacing: 2, color: t.d, textTransform: "uppercase" }}>Modèle FAR</span>
      <span style={{ ...sa, fontSize: 14, color: t.d, lineHeight: 1 }} aria-hidden>
        →
      </span>
      <FarBeams w={44} h={14} fill={t.a} active={leg.beam} dimOpacity={0.2} />
      <span style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2, color: t.a, textTransform: "uppercase" }}>
        Faisceau {String(leg.index).padStart(2, "0")}/03 · {leg.title}
      </span>
    </M>
  );

  const FarBeamBlocks = ({ t, leg, style: beamStyle, theme }) => {
    const renderBlockBody = (block, i) => (
      <>
        <div style={{ ...se, fontSize: leg.beam === 2 ? 15 : 16, fontWeight: 800, color: t.c, marginBottom: 8, lineHeight: 1.25 }}>{block.t}</div>
        <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.52 }}>{block.d}</div>
      </>
    );

    const { grid } = beamStyle;
    return (
      <M
        {...MV()}
        variants={stg(0.08)}
        style={{
          display: "grid",
          gridTemplateColumns: grid.columns,
          gridTemplateAreas: grid.areas || undefined,
          gap: grid.gap,
        }}
      >
        {leg.blocks.map((block, i) => (
          <M
            key={block.t}
            variants={fu(12)}
            style={{
              gridArea: grid.place ? grid.place[i] : undefined,
              background: t.card,
              color: t.cardT,
              ...beamStyle.block(t, i, theme),
            }}
          >
            <div style={{ ...beamStyle.indexWrap(t, theme), marginBottom: 10 }}>
              <span style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 1, color: beamStyle.indexColor(t, theme) }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {renderBlockBody(block, i)}
          </M>
        ))}
      </M>
    );
  };

  const FarBeamLegSlide = ({ t, leg }) => {
    const beamStyle = FAR_BEAM_STYLES[leg.beam];
    const theme = FAR_BEAM_THEMES[leg.beam];
    const decor = beamStyle.decor;
    const hookStyle = beamStyle.hookBox
      ? beamStyle.hookBox(t, theme)
      : { marginBottom: beamStyle.headerMarginBottom != null ? 0 : 12 };

    return (
      <M {...MV()} variants={stg(0.05)} style={{ width: "100%", position: "relative" }}>
        {theme.slideWash && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: theme.slideWash,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            right: decor.right ?? 0,
            top: decor.top ?? -12,
            opacity: decor.opacity,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <FarBeams w={decor.w} fill={t.a} active={leg.beam} dimOpacity={0.14} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <FarModelBreadcrumb t={t} leg={leg} />
          <M
            variants={fu(10)}
            style={{
              display: "flex",
              alignItems: beamStyle.headerAlign || "flex-start",
              gap: 18,
              marginBottom: beamStyle.headerMarginBottom ?? 14,
            }}
          >
            <FarBeamSymbol
              beam={leg.beam}
              size={44}
              stroke={t.a}
              accent={theme.symbolAccent}
              opacity={theme.symbolOpacity}
              style={{ flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <M variants={fu(8)} style={beamStyle.titleWrap(t, theme)}>
                <Hl t={t} s={{ fontSize: 34, marginBottom: 0, lineHeight: 1.12 }}>
                  {leg.title}
                </Hl>
              </M>
              <M variants={fu(8)} style={{ ...hookStyle, marginBottom: beamStyle.headerAlign === "center" ? 0 : hookStyle.marginBottom }}>
                <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, maxWidth: 900 }}>
                  {leg.hook}
                </Sh>
              </M>
            </div>
          </M>
          <FarBeamBlocks t={t} leg={leg} style={beamStyle} theme={theme} />
          {!beamStyle.hideFooter && (
            <M variants={fu(8)} style={{ marginTop: 16 }}>
              <Th
                t={t}
                s={{
                  marginTop: 0,
                  marginBottom: 0,
                  padding: "16px 22px",
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  ...beamStyle.footer(t, theme),
                }}
              >
              {leg.footer}
            </Th>
            </M>
          )}
        </div>
      </M>
    );
  };

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

  const FarModelOverview = ({ t }) => (
    <M {...MV()} variants={stg(0.08)} style={{ marginTop: 8 }}>
      <div
        style={{
          display: "flex",
          gap: 36,
          alignItems: "center",
          flexWrap: "wrap",
          padding: "24px 28px",
          borderRadius: 16,
          background: t.card,
          border: `1px solid ${t.brd}`,
        }}
      >
        <M variants={fu(10)} style={{ flex: "0 0 auto", textAlign: "center" }}>
          <FarLogo size={92} variant={t.lv} />
          <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
            <FarBeams w={128} fill={t.a} />
          </div>
        </M>
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 14 }}>
          {FAR_LEGS.map((leg, i) => (
            <M
              key={leg.index}
              variants={fu(12)}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: 18 }}
            >
              <FarBeams w={80} h={24} fill={t.a} active={leg.beam} dimOpacity={0.16} />
              <div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: t.a, marginBottom: 4 }}>
                  Faisceau {String(leg.index).padStart(2, "0")}
                </div>
                <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.c, lineHeight: 1.2 }}>{leg.title}</div>
              </div>
            </M>
          ))}
        </div>
      </div>
      <M variants={fu(8)} style={{ marginTop: 20, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
        <Sh t={t} s={{ fontSize: 16, lineHeight: 1.58, margin: 0, textAlign: "center" }}>
          Un univers créateur a besoin d&apos;être défendu, piloté et ouvert, sans perdre ce qui le rend singulier.
        </Sh>
      </M>
    </M>
  );

  const PosDoDont = ({ t, dos, donts }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
      <M
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
      </M>
      <M
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
      </M>
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
          <M
            {...MA({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5 } })}
            style={{ marginBottom: 16, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <FarLogo size={100} variant={t.lv} />
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.08, duration: 0.45 } })}
            style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: t.d, marginBottom: 28 }}
          >
            by La Porte
          </M>
          <M {...MA({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { transition: { delay: 0.15, duration: 0.55 } })}>
            <Hl t={t} s={{ fontSize: 48, maxWidth: 900, margin: "0 auto 16px", textAlign: "center" }}>
              Faire grandir les univers créateurs.
            </Hl>
          </M>
          <M {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.28, duration: 0.5 } })}>
            <Sh t={t} s={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "center" }}>
              Accompagner les créateurs dans leur développement, et aider les marques à construire des projets justes avec eux.
            </Sh>
          </M>
          <M {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.42, duration: 0.5 } })} style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginTop: 20 }}>
            Qui veut aller loin, vient ici.
          </M>
          <M {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.58, duration: 0.4 } })} style={{ ...mo, fontSize: 11, color: t.d, marginTop: 32, letterSpacing: 2 }}>
            10 ans d&apos;expérience · +50 marques · +100 campagnes
          </M>
        </div>
      ),
    },

    {
      title: "Manifesto",
      r: (t) => (
        <M
          {...MV()}
          variants={stg(0.04)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            minHeight: 0,
            flex: isPdf() ? "none" : 1,
            overflow: isPdf() ? "visible" : "hidden",
            width: isPdf() ? 920 : "100%",
          }}
        >
          <M variants={fu(8)} style={{ marginBottom: 10, width: "100%" }}>
            <div style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: t.d, marginBottom: 0 }}>
              MANIFESTO
            </div>
          </M>
          <Mp variants={fu(10)} style={{ ...manifestoStyle(t, "hook"), maxWidth: 900 }}>
            {manifestoHook}
          </Mp>
          <div style={{ maxWidth: 920, width: "100%", textAlign: "center" }}>
            {manifestoBlocks.map((block, i) => (
              <Mp key={i} variants={fu(4)} style={manifestoStyle(t, block.k)}>
                {block.t}
              </Mp>
            ))}
          </div>
        </M>
      ),
    },

    {
      title: "Talents / univers",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="NOTRE ROSTER"
            title="À taille humaine. 100 % créateurs-entrepreneurs."
            titleS={{ fontSize: 32 }}
          />
          <M
            {...MV()}
            variants={stg(0.06)}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}
          >
            {[
              {
                t: "Notre roster à taille humaine",
                d: "Moins de talents = plus de présence, plus de suivi, plus de qualité d'accompagnement, pas un catalogue à gérer.",
              },
              {
                t: "100 % créateurs-entrepreneurs",
                d: "Marques propres, formats, business au-delà du reach : chaque talent au roster construit déjà des actifs.",
              },
            ].map((box) => (
              <M
                key={box.t}
                variants={fu(12)}
                style={{
                  padding: "18px 20px",
                  borderRadius: 14,
                  background: t.th,
                  color: t.thT,
                  border: `1px solid ${t.brd}`,
                }}
              >
                <div style={{ ...se, fontSize: 17, fontWeight: 800, marginBottom: 8, lineHeight: 1.25 }}>{box.t}</div>
                <div style={{ ...sa, fontSize: 13.5, lineHeight: 1.52, opacity: 0.92 }}>{box.d}</div>
              </M>
            ))}
          </M>
          <M
            {...MV()}
            variants={stg(0.08)}
            style={{ display: "flex", gap: 14, marginTop: 4 }}
          >
            {[
              { n: "FastGoodCuisine", u: "Food entertainment", img: "/fgc.webp" },
              { n: "CYRILmp4", u: "Exploration, gaming, divertissement", img: "/cyrilmp4.webp" },
              { n: "Toinelag", u: "Construction, jeux, divertissement", img: "/toinelag.webp" },
              { n: "Teeqzy", u: "Fortnite, gaming communautaire", img: "/teeqzy.webp" },
              { n: "Bek1ng", u: "Performance gaming, coaching, Call of Duty", img: "/bek1ng.webp" },
            ].map((c) => (
              <M
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
                <div style={{ ...se, fontSize: 14, fontWeight: 700, color: t.cardT, lineHeight: 1.2, marginBottom: 8 }}>{c.n}</div>
                <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 1, color: t.a, textTransform: "uppercase" }}>
                  {c.u}
                </div>
              </M>
            ))}
          </M>
        </M>
      ),
    },

    {
      title: "Modèle FAR",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="MODÈLE FAR"
            title="3 faisceaux pour structurer un univers créateur."
            titleS={{ fontSize: 32 }}
          />
          <M variants={fu(8)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.55, marginBottom: 4, maxWidth: 880 }}>
              Protéger la création, solidifier la structure, garantir la croissance.
            </Sh>
          </M>
          <FarModelOverview t={t} />
        </M>
      ),
    },

    {
      title: "Protéger la création",
      r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[0]} />,
    },

    {
      title: "Solidifier la structure",
      r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[1]} />,
    },

    {
      title: "Garantir la croissance",
      r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[2]} />,
    },

    {
      title: "Piliers FAR",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="MÉTHODE" title="Notre grille de lecture." titleS={{ fontSize: 34 }} />
          <M variants={fu(6)}>
            <Sh t={t} s={{ fontSize: 15, lineHeight: 1.55, marginBottom: 16, maxWidth: 920 }}>
              Elle sert à arbitrer chaque opportunité au quotidien.
            </Sh>
          </M>
          <M
            {...MV()}
            variants={stg(0.08)}
            style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}
          >
            {[
              { p: "Vision", icon: "vision", q: "Est-ce que ça construit aujourd'hui en pensant à demain ?" },
              { p: "Sérénité", icon: "serenite", q: "Est-ce que le cadre est fluide, clair et sur-mesure ?" },
              { p: "Structure", icon: "structure", q: "Est-ce que ça simplifie, automatise ou clarifie quelque chose ?" },
              { p: "Ambition", icon: "ambition", q: "Est-ce que l'idée mérite plus qu'une simple prise de parole ?" },
              { p: "Opportunité", icon: "opportunite", q: "Est-ce que ça fait émerger un projet durable ?" },
            ].map((x) => (
              <M
                key={x.p}
                variants={fu(18)}
                style={{
                  flex: "1 1 160px",
                  minWidth: 140,
                  padding: "20px 16px 18px",
                  borderTop: `3px solid ${t.a}`,
                }}
              >
                <div style={{ marginBottom: 12 }}>
                  <FarGrillePicto id={x.icon} stroke={t.a} />
                </div>
                <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginBottom: 10, lineHeight: 1 }}>{x.p}</div>
                <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5 }}>{x.q}</div>
              </M>
            ))}
          </M>
        </M>
      ),
    },

    {
      title: "Ce que FAR apporte",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="ACCOMPAGNEMENT"
            title="Ce que nous faisons pour le talent fait avancer tout l'écosystème."
            titleS={{ fontSize: 30, maxWidth: 960 }}
          />

          <M
            variants={fs}
            style={{
              marginTop: 8,
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
              <M
                {...MV()}
                variants={stg(0.1)}
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, position: "relative", zIndex: 1 }}
              >
                {[
                  { n: "01", t: "Clarifier", d: "Positionnement, valeurs, ambitions, ligne éditoriale, priorités." },
                  { n: "02", t: "Structurer", d: "Administratif, juridique, fiscal, comptable, recrutement, process, outils, data." },
                  { n: "03", t: "Développer", d: "Collaborations, ambassades, formats, produits propriétaires, marques propres, actifs." },
                  { n: "04", t: "Protéger", d: "Cohérence éditoriale, image, droits, arbitrages, choix des bonnes opportunités." },
                ].map((s) => (
                  <M key={s.n} variants={fu(14)} style={{ textAlign: "center" }}>
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
                  </M>
                ))}
              </M>
            </div>
          </M>

          <M
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
                  b: "Des partenariats crédibles, mieux acceptés et plus performants, sans dénaturer l'univers ni briser la confiance.",
                  d: "Nous identifions où la marque peut s'inscrire sans interrompre le récit : un projet légitime, pas un placement plaqué.",
                },
                {
                  w: "Audience",
                  t: "Un projet qui paraît évident.",
                  b: "Une communauté qui comprend, adhère et reste engagée. Le partenariat renforce le lien plutôt que de le fragiliser.",
                  d: "Quand le talent est structuré et la marque bien placée, l'audience saisit naturellement pourquoi le projet existe.",
                },
              ].map((o, i) => (
                <M
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
                  <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.5, marginBottom: 12 }}>{o.d}</div>
                  <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: t.a, marginBottom: 6, textTransform: "uppercase" }}>
                    Bénéfice
                  </div>
                  <div style={{ ...sa, fontSize: 14, fontWeight: 600, color: t.c, lineHeight: 1.5, margin: 0 }}>{o.b}</div>
                </M>
              ))}
            </div>
          </M>
        </M>
      ),
    },

    {
      title: "Nos engagements",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead
            t={t}
            tag="ENGAGEMENTS"
            title="Nos engagements vis-à-vis des créateurs."
            titleS={{ fontSize: 32, maxWidth: 960 }}
          />
          <M variants={fu(6)}>
            <Sh t={t} s={{ fontSize: 15, lineHeight: 1.55, marginBottom: 14, maxWidth: 920 }}>
              Une charte simple, qui engage FAR à chaque collaboration.
            </Sh>
          </M>
          <M
            variants={fs}
            style={{
              marginTop: 4,
              background: t.th,
              borderRadius: 20,
              padding: "14px 40px 18px",
              boxShadow: t.cS,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0 6px",
                borderBottom: "1px solid rgba(255,255,255,.12)",
                marginBottom: 4,
              }}
            >
              <FarLogo size={26} variant="yellow" />
              <span style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 3, color: t.thT, textTransform: "uppercase" }}>
                La charte créateur
              </span>
            </div>
            <M {...MV()} variants={stg(0.08)}>
              {[
                {
                  k: "Liberté garantie",
                  d: "Le créateur garde sa voix, son style et sa liberté. Transparence totale sur chaque partenariat, aucun engagement commercial imposé.",
                },
                {
                  k: "Créativité respectée",
                  d: "Son univers et sa communauté restent sacrés. FAR n'encadre pas le contenu, il l'amplifie : des marques intégrées avec justesse, sans dénaturer le récit.",
                },
                {
                  k: "Contrat clair & flexible",
                  d: "Un contrat basé sur la confiance, qui peut s'arrêter à tout moment sans préavis. L'exclusivité reste recommandée pour construire sereinement.",
                },
                {
                  k: "Rémunération juste & évolutive",
                  d: "Pas de grille unique : la rémunération évolue avec le créateur, selon l'accompagnement, le chiffre d'affaires et les besoins réels.",
                },
                {
                  k: "Accompagnement sur-mesure",
                  d: "Chaque créateur est unique : un sparring-partner qui l'épaule sur la structure d'entreprise, le développement commercial, l'image et le produit.",
                },
              ].map((e, i) => (
                <M
                  key={e.k}
                  variants={fu(10)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 248px 1fr",
                    gap: 22,
                    alignItems: "baseline",
                    padding: "15px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <span style={{ ...mo, fontSize: 13, fontWeight: 800, letterSpacing: 1, color: t.thT }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ ...se, fontSize: 18, fontWeight: 800, color: t.thT, lineHeight: 1.18 }}>{e.k}</span>
                  <span style={{ ...sa, fontSize: 14.5, color: "rgba(255,255,255,.82)", lineHeight: 1.5 }}>{e.d}</span>
                </M>
              ))}
            </M>
          </M>
        </M>
      ),
    },

    {
      title: "Do / Don't",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
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
        </M>
      ),
    },

    {
      title: "Fermeture",
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 28, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <FarLogo size={100} variant={t.lv} />
          </M>
          <M initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Hl t={t} s={{ fontSize: 44, textAlign: "center", color: t.a }}>
              Qui veut aller loin, vient ici.
            </Hl>
          </M>
          <M
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
          </M>
          {back && (
            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.4 }}>
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
            </M>
          )}
        </div>
      ),
    },
  ];
}
