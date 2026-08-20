import { motion } from "framer-motion";

/**
 * Deck positionnement V2 - DA native T1 (identique à la V1) + contenu recentré créateur.
 * Seule différence de forme : la typographie passe sur Inter.
 */
export function createSFarPositionnementV2(P) {
  const { FarLogo, FarBeams, pu } = P;

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
  const MV = (extra = {}) => (isPdf() ? { initial: false, animate: "v", ...extra } : { initial: "h", animate: "v", ...extra });
  const MA = (initial, animate, extra = {}) => (isPdf() ? { initial: false, animate, ...extra } : { initial, animate, ...extra });

  const stg = (d = 0.08) =>
    isPdf() ? { v: { transition: { staggerChildren: 0 } } } : { h: {}, v: { transition: { staggerChildren: d } } };
  const fu = (y = 14) =>
    isPdf() ? { v: vis } : { h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
  const fs = isPdf() ? { v: vis } : { h: { opacity: 0, scale: 0.96 }, v: { opacity: 1, scale: 1, transition: { duration: 0.45 } } };
  const ft = (y = 24) =>
    isPdf() ? { v: vis } : { h: { opacity: 0, y }, v: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  // ─── Typographie : Inter sur toute la hiérarchie ─────────────────────────────
  const IF = { fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" };
  const se = IF;
  const sa = IF;
  const mo = IF;

  const Tg = ({ t, children, s }) => (
    <div
      style={{
        ...IF,
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: 2.2,
        textTransform: "uppercase",
        color: t.d,
        marginBottom: 28,
        ...s,
      }}
    >
      {children}
    </div>
  );
  const Hl = ({ t, children, s }) => (
    <div style={{ ...IF, fontSize: 52, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.032em", color: t.c, marginBottom: 28, ...s }}>
      {children}
    </div>
  );
  const Sh = ({ t, children, white, s }) => (
    <div
      style={{
        ...IF,
        fontSize: 20,
        fontWeight: 400,
        color: white ? t.c2 : t.m,
        lineHeight: 1.6,
        letterSpacing: "-0.006em",
        marginBottom: 36,
        ...s,
      }}
    >
      {children}
    </div>
  );
  const Th = ({ t, children, s, alt }) => (
    <div
      style={{
        ...IF,
        fontSize: 18,
        fontWeight: 500,
        padding: "28px 34px",
        borderRadius: 14,
        marginTop: 32,
        lineHeight: 1.6,
        letterSpacing: "-0.006em",
        background: alt ? t.th2 : t.th,
        color: alt ? t.th2T : t.thT,
        ...s,
      }}
    >
      {children}
    </div>
  );

  const SlideHead = ({ t, tag, title, titleS }) => (
    <>
      <M variants={fu(10)}>
        <Tg t={t}>{tag}</Tg>
      </M>
      <M variants={fu(12)}>
        <Hl t={t} s={titleS}>
          {title}
        </Hl>
      </M>
    </>
  );

  const FAR_BEAM_THEMES = {
    1: {
      slideWash: "radial-gradient(ellipse 70% 50% at 6% 12%, rgba(26,26,26,0.025) 0%, transparent 50%)",
      symbolOpacity: 0.42,
      symbolAccent: "#1A1A1A",
    },
    2: { slideWash: null, symbolOpacity: 0.4, symbolAccent: "#1A1A1A" },
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
        <path d="M18 44 V34 H26 V28 H34 V22 H42 V16" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M42 16 L50 10 M42 16 H49" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const FAR_BEAM_STYLES = {
    1: {
      grid: { columns: "1fr 1fr", gap: 16 },
      decor: { w: 240, opacity: 0.1, top: -16, right: 0 },
      headerMarginBottom: 8,
      titleWrap: (t) => ({ borderLeft: `6px solid ${t.a}`, paddingLeft: 18, marginBottom: 4 }),
      block: (t) => ({ borderRadius: 18, border: `1px solid ${t.brd}`, borderLeft: `5px solid ${t.a}`, padding: "18px 20px" }),
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
      grid: { columns: "1fr 1fr", gap: 14 },
      decor: { w: 180, opacity: 0.08, top: 40, right: 24 },
      headerAlign: "center",
      headerMarginBottom: 6,
      titleWrap: (t) => ({ borderLeft: `6px solid ${t.a}`, paddingLeft: 18, marginBottom: 4 }),
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
      footer: (t) => ({ borderRadius: 4, borderLeft: `4px solid ${t.a}` }),
    },
    3: {
      grid: { columns: "1fr 1fr", gap: 14 },
      decor: { w: 260, opacity: 0.12, top: -20, right: -8 },
      headerAlign: "center",
      titleWrap: (t) => ({ borderLeft: `6px solid ${t.a}`, paddingLeft: 18, marginBottom: 4 }),
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
      footer: (t, th) => ({ borderRadius: "8px 16px 16px 16px", borderTop: `3px solid ${th?.blockAccent || t.a}` }),
    },
  };

  const FAR_LEGS = [
    {
      index: 1,
      beam: 1,
      title: "Garantir la croissance",
      blocks: [
        {
          t: "Partenariats long terme",
          d: "Ambassades, récurrence, relations marques sur 6-12 mois : des revenus prévisibles plutôt que simplement des one-shots.",
        },
        {
          t: "Des actifs qui lui appartiennent",
          d: "Marque, podcast, format récurrent, événement : monétiser ce que le créateur possède déjà et qu'il garde.",
        },
        {
          t: "Opérations premium",
          d: "Co-brandings et activations à forte valeur, au-delà du post sponsorisé, quand l'audience le justifie.",
        },
        {
          t: "Remplissage intelligent",
          d: "Tendre vers 1 partenaire par contenu, en structurant calendrier et catégories. C'est le premier levier de revenus.",
        },
      ],
      footer: "Plus de revenus, sans jamais dénaturer ce qui existe.",
    },
    {
      index: 2,
      beam: 2,
      title: "Solidifier la structure",
      blocks: [
        {
          t: "Priorisation, calendrier & soutien",
          d: "On hiérarchise les sollicitations et le calendrier commercial, avec un appui FAR (si sollicité) pour éviter la surcharge et garder le cap.",
        },
        {
          t: "Data & visibilité business",
          d: "Une lecture claire des revenus, des catégories, du pipeline et des priorités à 3-12 mois.",
        },
        {
          t: "Cadre admin, juridique & fiscal",
          d: "Contrats, facturation, conformité, relations partenaires : on structure et on suit.",
        },
        {
          t: "Process & outils",
          d: "Des outils de suivi et une organisation qui simplifient le quotidien.",
        },
      ],
      footer: "Rendre l'activité pilotable, en chargeant le créateur le moins possible.",
    },
    {
      index: 3,
      beam: 3,
      title: "Protéger la création",
      blocks: [
        {
          t: "Sa ligne, ses règles",
          d: "Le ton, le rythme, les formats, les limites : c'est le créateur qui les pose. FAR travaille avec, et les fait respecter en face.",
        },
        {
          t: "Un filtre sur les sollicitations",
          d: "Tout ce qui arrive est qualifié, pour ne plus perdre de temps sur les mauvaises pistes.",
        },
        {
          t: "Des marques qui ont une raison d'être là",
          d: "Une marque entre parce qu'elle a du sens, jamais parce qu'elle a mis le budget.",
        },
        {
          t: "Des catégories protégées",
          d: "On sanctuarise les associations sensibles et on évite les conflits de marques qui abîmeraient la crédibilité.",
        },
      ],
      footer: "Défendre la ligne et la valeur du créateur, sans jamais intervenir dessus.",
    },
  ];

  const FarModelBreadcrumb = ({ t, leg }) => (
    <M variants={fu(6)} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
      <span style={{ ...mo, fontSize: 10.5, fontWeight: 600, letterSpacing: 1.8, color: t.d, textTransform: "uppercase" }}>Modèle FAR</span>
      <span style={{ ...sa, fontSize: 14, color: t.d, lineHeight: 1 }} aria-hidden>
        →
      </span>
      <FarBeams w={44} h={14} fill={t.a} active={leg.beam} dimOpacity={0.2} />
      <span style={{ ...mo, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.8, color: t.a, textTransform: "uppercase" }}>
        Faisceau {String(leg.index).padStart(2, "0")}/03 · {leg.title}
      </span>
    </M>
  );

  const FarBeamBlocks = ({ t, leg, style: beamStyle, theme }) => (
    <M
      {...MV()}
      variants={stg(0.08)}
      style={{ display: "grid", gridTemplateColumns: beamStyle.grid.columns, gap: beamStyle.grid.gap }}
    >
      {leg.blocks.map((block, i) => (
        <M
          key={block.t}
          variants={fu(12)}
          style={{ background: t.card, color: t.cardT, ...beamStyle.block(t, i, theme) }}
        >
          <div style={{ ...beamStyle.indexWrap(t, theme), marginBottom: 10 }}>
            <span style={{ ...mo, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, color: beamStyle.indexColor(t, theme) }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div style={{ ...se, fontSize: leg.beam === 2 ? 15.5 : 16.5, fontWeight: 700, letterSpacing: "-0.02em", color: t.c, marginBottom: 8, lineHeight: 1.25 }}>
            {block.t}
          </div>
          <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.52, letterSpacing: "-0.006em" }}>{block.d}</div>
        </M>
      ))}
    </M>
  );

  const FarBeamLegSlide = ({ t, leg }) => {
    const beamStyle = FAR_BEAM_STYLES[leg.beam];
    const theme = FAR_BEAM_THEMES[leg.beam];
    const decor = beamStyle.decor;

    return (
      <M {...MV()} variants={stg(0.05)} style={{ width: "100%", position: "relative" }}>
        {theme.slideWash && (
          <div style={{ position: "absolute", inset: 0, background: theme.slideWash, pointerEvents: "none", zIndex: 0 }} />
        )}
        <div style={{ position: "absolute", right: decor.right ?? 0, top: decor.top ?? -12, opacity: decor.opacity, pointerEvents: "none", zIndex: 0 }}>
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
            </div>
          </M>
          <FarBeamBlocks t={t} leg={leg} style={beamStyle} theme={theme} />
          <M variants={fu(8)} style={{ marginTop: 16 }}>
            <Th
              t={t}
              s={{ marginTop: 0, marginBottom: 0, padding: "16px 22px", fontSize: 14.5, lineHeight: 1.5, ...beamStyle.footer(t, theme) }}
            >
              {leg.footer}
            </Th>
          </M>
        </div>
      </M>
    );
  };

  const manifestoHook = "Chez FAR, nous pensons qu'un créateur ne se résume pas à son audience.";

  const manifestoBlocks = [
    { k: "verse", t: "C'est une voix." },
    { k: "verse", t: "Un regard." },
    { k: "verse", t: "Une communauté." },
    { k: "verse", t: "Une confiance." },
    { k: "univers", t: "C'est une valeur." },
    { k: "trait", t: "Une valeur qui met des années à se construire." },
    { k: "trait", t: "Dans la cohérence. Dans la sincérité. Dans la durée." },
    { k: "body", t: "Pour aller loin, il ne suffit pas d'être visible." },
    { k: "pillar", t: "Il faut conserver sa valeur." },
    { k: "pillar", t: "Être entouré sans être encadré." },
    { k: "pillar", t: "Se développer sans jamais être dénaturé." },
    { k: "mission", t: "C'est la mission de FAR." },
    { k: "body", t: "Défendre cette valeur, la faire reconnaître, et lui donner les moyens de grandir." },
    { k: "body", t: "Pour que le créateur se consacre à la seule chose que personne ne peut faire à sa place : créer." },
    { k: "body", t: "Et pour que chaque marque trouve sa juste place, sans jamais s'imposer." },
    { k: "tagline", t: "Qui veut aller loin, vient ici." },
  ];

  const manifestoStyle = (t, k) => {
    switch (k) {
      case "hook":
        return { ...se, fontSize: 19, fontWeight: 700, letterSpacing: "-0.025em", color: t.c, lineHeight: 1.22, margin: "0 0 10px" };
      case "verse":
        return { ...se, fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.015em", color: t.c, lineHeight: 1.26, margin: "0 0 1px" };
      case "univers":
        return { ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: t.a, lineHeight: 1.24, margin: "6px 0 4px" };
      case "trait":
        return { ...se, fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.012em", color: t.c, lineHeight: 1.28, margin: "0 0 2px" };
      case "pillar":
        return { ...sa, fontSize: 13, fontWeight: 500, color: t.c, lineHeight: 1.36, margin: "0 0 2px" };
      case "mission":
        return { ...se, fontSize: 15, fontWeight: 700, letterSpacing: "-0.022em", color: t.a, lineHeight: 1.26, margin: "6px 0 4px" };
      case "tagline":
        return { ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: t.a, lineHeight: 1.24, margin: "8px 0 0" };
      default:
        return { ...sa, fontSize: 12.5, color: t.m, lineHeight: 1.38, margin: "0 0 3px" };
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
                <div style={{ ...mo, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.4, color: t.a, marginBottom: 4, textTransform: "uppercase" }}>
                  Faisceau {String(leg.index).padStart(2, "0")}
                </div>
                <div style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", color: t.c, lineHeight: 1.2 }}>{leg.title}</div>
              </div>
            </M>
          ))}
        </div>
      </div>
      <M variants={fu(8)} style={{ marginTop: 20, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
        <Sh t={t} s={{ fontSize: 16, lineHeight: 1.58, margin: 0, textAlign: "center" }}>
          Un créateur a besoin d&apos;être défendu, épaulé et développé, sans jamais perdre ce qui le rend singulier.
        </Sh>
      </M>
    </M>
  );

  /** Carte d'avantage : même vocabulaire que les blocs de faisceau. */
  const AdvCard = ({ t, k, title, children, s }) => (
    <M variants={fu(12)} style={{ padding: "20px 22px", borderRadius: 16, background: t.card, border: `1px solid ${t.brd}`, ...s }}>
      {k && <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.a, marginBottom: 10, textTransform: "uppercase" }}>{k}</div>}
      <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: t.c, marginBottom: 8, lineHeight: 1.24 }}>{title}</div>
      <div style={{ ...sa, fontSize: 13.5, color: t.m, lineHeight: 1.5, letterSpacing: "-0.006em" }}>{children}</div>
    </M>
  );

  return [
    {
      title: "FAR by La Porte",
      r: (t) => (
        <div style={{ textAlign: "center", padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <M
            {...MA({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, { transition: { duration: 0.5 } })}
            style={{ marginBottom: 16, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <FarLogo size={100} variant={t.lv} />
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.08, duration: 0.45 } })}
            style={{ ...mo, fontSize: 12.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: t.d, marginBottom: 28 }}
          >
            by La Porte
          </M>
          <M {...MA({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { transition: { delay: 0.15, duration: 0.55 } })}>
            <Hl t={t} s={{ fontSize: 48, maxWidth: 900, margin: "0 auto 16px", textAlign: "center" }}>
              L&apos;agence qui fait grandir les créateurs.
            </Hl>
          </M>
          <M {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.28, duration: 0.5 } })}>
            <Sh t={t} s={{ maxWidth: 760, margin: "0 auto 24px", textAlign: "center" }}>
              Construire les revenus, libérer du temps, défendre la valeur.
            </Sh>
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.42, duration: 0.5 } })}
            style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: t.a, marginTop: 20 }}
          >
            Qui veut aller loin, vient ici.
          </M>
          <M
            {...MA({ opacity: 0 }, { opacity: 1 }, { transition: { delay: 0.58, duration: 0.4 } })}
            style={{ ...mo, fontSize: 11.5, fontWeight: 500, color: t.d, marginTop: 32, letterSpacing: 1.6 }}
          >
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
            width: "100%",
          }}
        >
          <M variants={fu(8)} style={{ marginBottom: 10, width: "100%" }}>
            <div style={{ ...mo, fontSize: 12.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: t.d }}>MANIFESTO</div>
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
      title: "Créateurs / univers",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="NOTRE ROSTER" title="Un roster à taille humaine." titleS={{ fontSize: 32 }} />
          <M variants={fu(8)} style={{ marginBottom: 18 }}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, maxWidth: 880 }}>
              Moins de créateurs, plus de temps pour chacun. On ne gère pas un catalogue : chaque créateur accompagné a été choisi.
            </Sh>
          </M>
          <M {...MV()} variants={stg(0.08)} style={{ display: "flex", gap: 14, marginTop: 4 }}>
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
                  <img src={pu(c.img)} alt={c.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ ...se, fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.02em", color: t.cardT, lineHeight: 1.2, marginBottom: 8 }}>
                  {c.n}
                </div>
                <div style={{ ...mo, fontSize: 10.5, fontWeight: 600, letterSpacing: 1, color: t.a, textTransform: "uppercase" }}>{c.u}</div>
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
          <SlideHead t={t} tag="MODÈLE FAR" title="3 faisceaux pour faire grandir un créateur." titleS={{ fontSize: 32 }} />
          <M variants={fu(8)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.55, marginBottom: 4, maxWidth: 880 }}>
              Garantir la croissance, solidifier la structure, protéger la création.
            </Sh>
          </M>
          <FarModelOverview t={t} />
        </M>
      ),
    },

    { title: "Garantir la croissance", r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[0]} /> },
    { title: "Solidifier la structure", r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[1]} /> },
    { title: "Protéger la création", r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[2]} /> },

    {
      title: "Ce que le créateur y gagne",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="POURQUOI NOUS REJOINDRE" title="Ce que le créateur y gagne." titleS={{ fontSize: 34 }} />
          <M {...MV()} variants={stg(0.08)} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 8 }}>
            {[
              {
                k: "Rémunération",
                n: "15 %",
                u: "de commission",
                h: "Le taux le plus bas du marché",
                d: "L'essentiel de la valeur créée reste du côté du créateur.",
              },
              {
                k: "Remplissage",
                n: "100 %",
                u: "visés, intelligemment",
                h: "Un calendrier bien mieux rempli",
                d: "On construit le remplissage des mois à l'avance, et uniquement quand la marque a vraiment sa place.",
              },
              {
                k: "Temps",
                n: "1",
                u: "équipe dédiée",
                h: "Le moins de temps possible pris",
                d: "On absorbe tout ce qui est chronophage (prospection, négociation, contrats). Le créateur garde son temps pour créer.",
              },
            ].map((o) => (
              <M
                key={o.k}
                variants={fu(12)}
                style={{ padding: "20px 22px", borderRadius: 16, background: t.card, border: `1px solid ${t.brd}`, borderTop: `4px solid ${t.a}` }}
              >
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 12, textTransform: "uppercase" }}>{o.k}</div>
                <div style={{ ...se, fontSize: 42, fontWeight: 700, letterSpacing: "-0.045em", color: t.a, lineHeight: 1 }}>{o.n}</div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 600, letterSpacing: 1.2, color: t.d, margin: "8px 0 14px", textTransform: "uppercase" }}>{o.u}</div>
                <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: t.c, marginBottom: 8, lineHeight: 1.24 }}>{o.h}</div>
                <div style={{ ...sa, fontSize: 13.5, color: t.m, lineHeight: 1.5, letterSpacing: "-0.006em" }}>{o.d}</div>
              </M>
            ))}
          </M>
        </M>
      ),
    },

    {
      title: "Rémunération",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="RÉMUNÉRATION" title="La valeur reste du côté du créateur." titleS={{ fontSize: 34 }} />
          <M variants={fs} style={{ padding: "22px 24px", borderRadius: 16, border: `2px solid ${t.a}`, background: `${t.a}10`, marginBottom: 16, marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto" }}>
                <div style={{ ...se, fontSize: 64, fontWeight: 700, letterSpacing: "-0.05em", color: t.a, lineHeight: 0.95 }}>15 %</div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginTop: 8, textTransform: "uppercase" }}>
                  de commission
                </div>
              </div>
              <div style={{ flex: "1 1 320px" }}>
                <div style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.028em", color: t.c, lineHeight: 1.2 }}>
                  Le taux le plus bas du marché.
                </div>
              </div>
            </div>
          </M>
          <M variants={fu(8)}>
            <Th t={t} s={{ marginTop: 4, padding: "18px 22px", fontSize: 14.5, lineHeight: 1.5, borderRadius: 18, borderLeft: `5px solid ${t.a}` }}>
              <span style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", display: "block", marginBottom: 8, color: t.thT }}>
                Des tarifs défendus, jamais bradés
              </span>
              Chaque opération est pensée et négociée spécifiquement en fonction de la nature de l&apos;opération.
            </Th>
          </M>
        </M>
      ),
    },

    {
      title: "Remplissage",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="REMPLISSAGE" title="Tendre vers 100 %, intelligemment." titleS={{ fontSize: 34 }} />
          <M variants={fu(8)} style={{ marginBottom: 16 }}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, maxWidth: 900 }}>
              Objectif : un partenaire sur chaque contenu.
            </Sh>
          </M>
          <M variants={fs} style={{ padding: "20px 24px 18px", borderRadius: 16, border: `2px solid ${t.a}`, background: `${t.a}10`, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 auto" }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 6, textTransform: "uppercase" }}>
                  Aujourd&apos;hui
                </div>
                <div style={{ ...se, fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", color: t.m, lineHeight: 1 }}>33 %</div>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <div style={{ height: 10, borderRadius: 6, background: t.brd, overflow: "hidden" }}>
                  <div style={{ width: "33%", height: "100%", background: t.a, borderRadius: 6 }} />
                </div>
                <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.45, marginTop: 10 }}>
                  Environ 1 contenu sur 3 trouve un partenaire. Les autres partent à vide.
                </div>
              </div>
              <div style={{ flex: "0 0 auto", textAlign: "right" }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.a, marginBottom: 6, textTransform: "uppercase" }}>
                  Objectif FAR
                </div>
                <div style={{ ...se, fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", color: t.c, lineHeight: 1 }}>100 %</div>
              </div>
            </div>
          </M>
          <M {...MV()} variants={stg(0.08)} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              {
                w: "Pour le créateur",
                h: "Il garde la main.",
                d: "Rien n'est signé sans son accord. Chaque sollicitation est qualifiée en amont.",
              },
              {
                w: "Pour la marque",
                h: "La meilleure intégration possible.",
                d: "On cherche, avec la marque, où elle s'inscrit le mieux dans le contenu - pour que le partenariat serve les deux.",
              },
              {
                w: "Pour la communauté",
                h: "Le lien se renforce.",
                d: "Un partenariat bien placé est mieux accepté, mieux regardé et plus performant. Une intégration plaquée coûte toujours plus qu'elle ne rapporte.",
              },
            ].map((o) => (
              <M key={o.w} variants={fu(14)} style={{ padding: "18px 20px", borderRadius: 16, background: t.card, border: `1px solid ${t.brd}` }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 8, textTransform: "uppercase" }}>
                  {o.w}
                </div>
                <div style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.028em", color: t.a, marginBottom: 8, lineHeight: 1.2 }}>
                  {o.h}
                </div>
                <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.48 }}>{o.d}</div>
              </M>
            ))}
          </M>
          <M variants={fu(8)}>
            <Th t={t} s={{ marginTop: 14, padding: "16px 22px", fontSize: 14.5, lineHeight: 1.5, borderRadius: 18, borderLeft: `5px solid ${t.a}` }}>
              Seule entorse : une opportunité vectrice de développement significatif de CA.
            </Th>
          </M>
        </M>
      ),
    },

    {
      title: "Le temps du créateur",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="LE TEMPS" title="On prend le moins de temps possible." titleS={{ fontSize: 34 }} />
          <M variants={fu(8)} style={{ marginBottom: 20 }}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, maxWidth: 900 }}>
              Un allié au quotidien, pas une couche d&apos;organisation en plus.
            </Sh>
          </M>
          <M {...MV()} variants={stg(0.08)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <AdvCard t={t} title="On absorbe la prospection">
              Identification, approche, relances : seuls les dossiers qui méritent vraiment une décision remontent.
            </AdvCard>
            <AdvCard t={t} title="On gère l'administratif">
              Contrats, facturation, conformité, relances de paiement. Plus personne ne court derrière les process.
            </AdvCard>
            <AdvCard t={t} title="Une équipe dédiée">
              Pas de chaîne de comptes ni de brief à répéter. Une équipe qui connaît le dossier et qui répond vite.
            </AdvCard>
            <AdvCard t={t} title="Des décisions en quelques minutes">
              Chaque opportunité arrive qualifiée, chiffrée et argumentée. Le créateur tranche, on exécute.
            </AdvCard>
          </M>
          <M variants={fu(8)}>
            <Th t={t} s={{ marginTop: 18, padding: "16px 22px", fontSize: 14.5, lineHeight: 1.5, borderRadius: 18, borderLeft: `5px solid ${t.a}` }}>
              Le temps libéré revient là où il compte vraiment : la création.
            </Th>
          </M>
        </M>
      ),
    },

    {
      title: "Nos engagements",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="ENGAGEMENTS" title="Nos engagements envers les créateurs." titleS={{ fontSize: 32, maxWidth: 960 }} />
          <M variants={fu(6)}>
            <Sh t={t} s={{ fontSize: 15, lineHeight: 1.55, marginBottom: 14, maxWidth: 920 }}>
              5 règles simples, qui engagent FAR dès le premier jour.
            </Sh>
          </M>
          <M
            variants={fs}
            style={{ marginTop: 4, background: t.th, borderRadius: 20, padding: "14px 40px 18px", boxShadow: t.cS, position: "relative", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0 6px", borderBottom: "1px solid rgba(255,255,255,.12)", marginBottom: 4 }}>
              <FarLogo size={26} variant="yellow" />
              <span style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2.4, color: t.thT, textTransform: "uppercase" }}>La charte créateur</span>
            </div>
            <M {...MV()} variants={stg(0.08)}>
              {[
                {
                  k: "Une liberté garantie",
                  d: "Le créateur garde sa voix, son style et ses choix. Transparence totale sur chaque partenariat, aucun engagement commercial imposé.",
                },
                {
                  k: "Une création intouchable",
                  d: "FAR n'écrit pas, ne valide pas et n'encadre pas le contenu. On s'occupe du business, le créateur s'occupe de créer.",
                },
                {
                  k: "Un contrat clair & flexible",
                  d: "Un contrat basé sur la confiance, qui peut s'arrêter à tout moment sans préavis. Aucun engagement qui enferme.",
                },
                {
                  k: "Une rémunération juste & évolutive",
                  d: "Pas de grille unique : la rémunération évolue selon l'accompagnement réel, le chiffre d'affaires et les besoins.",
                },
                {
                  k: "Un allié, pas une couche de plus",
                  d: "Une équipe dédiée qui épaule sur la structure, le commercial et les projets, en prenant le moins de temps possible.",
                },
              ].map((e, i) => (
                <M
                  key={e.k}
                  variants={fu(10)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 268px 1fr",
                    gap: 22,
                    alignItems: "baseline",
                    padding: "15px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <span style={{ ...mo, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: t.thT }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.025em", color: t.thT, lineHeight: 1.18 }}>{e.k}</span>
                  <span style={{ ...sa, fontSize: 14.5, color: "rgba(255,255,255,.82)", lineHeight: 1.5 }}>{e.d}</span>
                </M>
              ))}
            </M>
          </M>
        </M>
      ),
    },

    {
      title: "Fermeture",
      r: (t, back) => (
        <div style={{ textAlign: "center", padding: "48px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", minHeight: 420 }}>
          <M
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 32, display: "flex", justifyContent: "center", width: "100%" }}
          >
            <FarLogo size={100} variant={t.lv} />
          </M>
          <M initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Hl t={t} s={{ fontSize: 44, textAlign: "center", color: t.a }}>
              Qui veut aller loin, vient ici.
            </Hl>
          </M>
          {back && (
            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.4 }}>
              <button
                onClick={back}
                style={{
                  marginTop: 40,
                  background: t.nav,
                  color: t.navT,
                  ...sa,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "-0.006em",
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
