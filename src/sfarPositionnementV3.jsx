import { motion } from "framer-motion";

/**
 * Deck positionnement V3 — DA papier type Grand JD, accent jaune FAR + encre noire.
 * Posture : la valeur des créateurs, rendue. Le fond (revenus, intérêts, rythme) se déploie dans le deck.
 * Faisceaux : liste ledger (01) / plan 2×2 (02 & 03).
 */
export function createSFarPositionnementV3(P) {
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

  const FAR_LEGS = [
    {
      index: 1,
      beam: 1,
      title: "Faire grandir leurs revenus",
      blocks: [
        {
          t: "Remplissage intelligent",
          d: "Tendre vers un partenaire par contenu, en structurant calendrier et catégories. Sans forcer ce qui n'a pas sa place.",
        },
        {
          t: "Des marques qui ont du sens",
          d: "Sélectionnées pour l'univers du créateur et pour ses vidéos, pas pour le budget qu'elles mettent sur la table.",
        },
        {
          t: "Premium & récurrence",
          d: "Des relations qui durent, des opérations qui pèsent : au-delà du one-shot, quand l'audience le justifie.",
        },
        {
          t: "Valoriser, puis ouvrir",
          d: "Défendre chaque prise de parole à sa juste hauteur. Puis, s'il le souhaite, l'accompagner sur les activités autour de son talent.",
        },
      ],
      lead: "Faire grandir ce qu'ils ont construit, sans le dénaturer.",
      footer: "Plus de revenus, sans jamais dénaturer ce qui existe.",
    },
    {
      index: 2,
      beam: 2,
      title: "Construire autour d'eux",
      lead: "Chaque créateur a des ambitions, un rythme et une manière de travailler qui lui sont propres. FAR s'aligne dessus.",
      blocks: [
        {
          t: "Le moins de temps possible",
          d: "Prospection, négociations, admin : on absorbe. Le créateur tranche, et il crée.",
        },
        {
          t: "Une structure solide",
          d: "Contrats, suivi, process : un cadre professionnel autour de l'activité, sans lui demander de tout porter.",
        },
        {
          t: "Calé sur ses projets",
          d: "On s'aligne sur ce qu'il veut construire maintenant, pas sur un process d'agence figé.",
        },
        {
          t: "Au-delà du commercial",
          d: "S'il le souhaite, un accompagnement sur les activités autour du talent : produits, concepts, nouveaux projets.",
        },
      ],
      footer: "Rendre l'activité solide, en chargeant le créateur le moins possible.",
    },
    {
      index: 3,
      beam: 3,
      title: "Défendre leurs intérêts",
      blocks: [
        {
          t: "Modèle compétitif",
          d: "15 % de commission, un taux unique. Pour leur laisser davantage sur chaque opération, sans marge cachée.",
        },
        {
          t: "Sans engagement",
          d: "Un contrat clair, transparent, résiliable. Rien qui enferme. On reste parce que ça marche.",
        },
        {
          t: "Négos à découvert",
          d: "Tout ce qui se discute avec les marques est partagé. Le créateur voit, tranche, et signe.",
        },
        {
          t: "Des intégrations naturelles",
          d: "Des partenaires cohérents avec son image, au bon moment, de la façon la plus naturelle possible.",
        },
      ],
      lead: "Un cadre clair, pour qu'ils restent maîtres de leurs choix.",
      footer: "Un modèle simple, aligné sur ce qu'ils gagnent.",
    },
  ];

  const BeamEyebrow = ({ leg, color }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color, marginBottom: 8 }}>
      Faisceau {String(leg.index).padStart(2, "0")} / 03
    </div>
  );

  /** 01 Revenus : liste verticale, filet jaune, papier réglé. */
  const BeamRevenus = ({ t, leg }) => (
    <M
      {...MV()}
      variants={stg(0.05)}
      style={{
        width: "100%",
        background: "#FFFFFF",
        color: "#12161A",
        borderRadius: 0,
        border: "1px solid #12161A",
        borderLeft: "10px solid #FFAA00",
        padding: "26px 32px 22px 28px",
        boxSizing: "border-box",
        backgroundImage: "linear-gradient(rgba(18,22,26,.055) 1px, transparent 1px)",
        backgroundSize: "100% 28px",
      }}
    >
      <div style={{ marginBottom: 6, paddingBottom: 14, borderBottom: "1px solid #12161A" }}>
        <BeamEyebrow leg={leg} color="#12161A" />
        <Hl t={t} s={{ fontSize: 32, marginBottom: 8, lineHeight: 1.06, color: "#12161A" }}>
          {leg.title}
        </Hl>
        {leg.lead ? (
          <Sh t={t} s={{ fontSize: 15, lineHeight: 1.45, margin: 0, maxWidth: 900, color: "rgba(18,22,26,.65)" }}>
            {leg.lead}
          </Sh>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {leg.blocks.map((block, i) => (
          <M
            key={block.t}
            variants={fu(8)}
            style={{
              display: "grid",
              gridTemplateColumns: "56px 1fr 1.35fr",
              gap: 18,
              alignItems: "baseline",
              padding: "15px 0",
              borderBottom: i === leg.blocks.length - 1 ? "none" : "1px solid rgba(18,22,26,.14)",
            }}
          >
            <div style={{ ...se, fontSize: 20, fontWeight: 800, letterSpacing: "-0.04em", color: "#FFAA00", lineHeight: 1 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ ...se, fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", lineHeight: 1.25 }}>
              {block.t}
            </div>
            <div style={{ ...sa, fontSize: 14, color: "rgba(18,22,26,.6)", lineHeight: 1.42 }}>{block.d}</div>
          </M>
        ))}
      </div>
      <div style={{ marginTop: 10, paddingTop: 14, borderTop: "4px solid #FFAA00" }}>
        <div style={{ ...se, fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#12161A", lineHeight: 1.4 }}>
          {leg.footer}
        </div>
      </div>
    </M>
  );

  /** 02 & 03 : plan 2×2, grille architecte. */
  const BeamAutour = ({ t, leg, planLabel = "Plan · 02" }) => (
    <M
      {...MV()}
      variants={stg(0.05)}
      style={{
        width: "100%",
        background: "#FFFFFF",
        color: "#12161A",
        borderRadius: 0,
        border: "1px solid #12161A",
        padding: "26px 32px 22px",
        boxSizing: "border-box",
        backgroundImage:
          "linear-gradient(rgba(18,22,26,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,22,26,.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "-1px -1px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6, borderBottom: "1px solid #12161A", paddingBottom: 12 }}>
        <div>
          <BeamEyebrow leg={leg} color="#12161A" />
          <Hl t={t} s={{ fontSize: 32, marginBottom: 0, lineHeight: 1.06, color: "#12161A" }}>
            {leg.title}
          </Hl>
        </div>
        <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2.4, textTransform: "uppercase", color: "#FFAA00", paddingBottom: 4 }}>
          {planLabel}
        </div>
      </div>
      {leg.lead ? (
        <Sh t={t} s={{ fontSize: 15, lineHeight: 1.48, margin: "12px 0 14px", maxWidth: 920, color: "rgba(18,22,26,.68)" }}>
          {leg.lead}
        </Sh>
      ) : null}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid #12161A" }}>
        {leg.blocks.map((block, i) => (
          <M
            key={block.t}
            variants={fu(8)}
            style={{
              padding: "18px 18px 18px 0",
              borderBottom: "1px solid #12161A",
              borderRight: i % 2 === 0 ? "1px solid #12161A" : "none",
              paddingRight: i % 2 === 0 ? 20 : 0,
              paddingLeft: i % 2 === 1 ? 20 : 0,
            }}
          >
            <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 1.8, color: "#FFAA00", marginBottom: 6 }}>
              {String.fromCharCode(65 + i)}
            </div>
            <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", marginBottom: 6, lineHeight: 1.2 }}>
              {block.t}
            </div>
            <div style={{ ...sa, fontSize: 14, color: "rgba(18,22,26,.6)", lineHeight: 1.42 }}>{block.d}</div>
          </M>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "4px solid #FFAA00" }}>
        <div style={{ ...se, fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#12161A", lineHeight: 1.4 }}>
          {leg.footer}
        </div>
      </div>
    </M>
  );

  const FarBeamLegSlide = ({ t, leg }) => {
    if (leg.beam === 1) return <BeamRevenus t={t} leg={leg} />;
    return <BeamAutour t={t} leg={leg} planLabel={leg.beam === 2 ? "Plan · 02" : "Charte · 03"} />;
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
    { k: "mission", t: "FAR s'assure qu'elle leur revienne." },
    { k: "body", t: "Des partenariats pertinents, bien négociés, intégrés naturellement." },
    { k: "body", t: "Un accompagnement calé sur leurs ambitions, sans alourdir le quotidien." },
    { k: "body", t: "Un modèle transparent, sans engagement, volontairement compétitif." },
    { k: "mission", t: "On construit autour d'eux, sans leur demander de s'adapter à une agence." },
    { k: "tagline", t: "Qui veut aller loin, vient ici." },
  ];

  const manifestoStyle = (t, k) => {
    switch (k) {
      case "hook":
        return { ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, lineHeight: 1.2, margin: "0 0 12px" };
      case "verse":
        return { ...se, fontSize: 16, fontWeight: 600, letterSpacing: "-0.016em", color: t.c, lineHeight: 1.26, margin: "0 0 2px" };
      case "univers":
        return { ...se, fontSize: 20, fontWeight: 700, letterSpacing: "-0.026em", color: t.a, lineHeight: 1.22, margin: "10px 0 5px" };
      case "trait":
        return { ...se, fontSize: 15, fontWeight: 600, letterSpacing: "-0.012em", color: t.c, lineHeight: 1.28, margin: "0 0 3px" };
      case "pillar":
        return { ...sa, fontSize: 15, fontWeight: 500, color: t.c, lineHeight: 1.36, margin: "0 0 3px" };
      case "mission":
        return { ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.022em", color: t.a, lineHeight: 1.26, margin: "10px 0 5px" };
      case "tagline":
        return { ...se, fontSize: 20, fontWeight: 700, letterSpacing: "-0.026em", color: t.a, lineHeight: 1.22, margin: "12px 0 0" };
      default:
        return { ...sa, fontSize: 14, color: t.m, lineHeight: 1.4, margin: "0 0 4px" };
    }
  };

  const FarModelOverview = ({ t }) => (
    <M {...MV()} variants={stg(0.08)} style={{ marginTop: 8, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          border: "1px solid #12161A",
          background: "#FFFFFF",
        }}
      >
        {FAR_LEGS.map((leg, i) => (
          <M
            key={leg.index}
            variants={fu(12)}
            style={{
              padding: "24px 26px 22px",
              borderRight: i < FAR_LEGS.length - 1 ? "1px solid #12161A" : "none",
              display: "flex",
              flexDirection: "column",
              minHeight: 160,
              boxSizing: "border-box",
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <FarBeams w={72} fill="#FFAA00" active={leg.beam} dimOpacity={0.22} />
            </div>
            <div style={{ ...mo, fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#FFAA00", marginBottom: 10 }}>
              {String(leg.index).padStart(2, "0")}
            </div>
            <div style={{ ...se, fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", lineHeight: 1.2 }}>
              {leg.title}
            </div>
          </M>
        ))}
      </div>
    </M>
  );

  return [
    {
      title: "FAR by La Porte",
      r: (t) => (
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 40, alignItems: "stretch", width: "100%", minHeight: 480 }}>
          <M
            {...MA({ opacity: 0, x: -12 }, { opacity: 1, x: 0 }, { transition: { duration: 0.45 } })}
            style={{
              background: "#12161A",
              borderRadius: 10,
              padding: "36px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <FarLogo size={80} variant="yellow" />
              <div style={{ ...se, fontSize: 48, fontWeight: 800, letterSpacing: "-0.05em", color: "#FFAA00", marginTop: 28, lineHeight: 0.9 }}>FAR</div>
              <div style={{ ...mo, fontSize: 12, fontWeight: 600, letterSpacing: 2.2, textTransform: "uppercase", color: "rgba(241,240,236,.45)", marginTop: 10 }}>
                by La Porte
              </div>
            </div>
            <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "#FFAA00", lineHeight: 1.3 }}>
              Qui veut aller loin,
              <br />
              vient ici.
            </div>
          </M>
          <M
            {...MA({ opacity: 0, y: 12 }, { opacity: 1, y: 0 }, { transition: { delay: 0.12, duration: 0.5 } })}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 0" }}
          >
            <div style={{ ...mo, fontSize: 12, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: t.d, marginBottom: 18 }}>
              Positionnement
            </div>
            <Hl t={t} s={{ fontSize: 42, marginBottom: 22, lineHeight: 1.06, maxWidth: 720 }}>
              L&apos;agence qui construit autour des créateurs.
            </Hl>
            <div style={{ width: 64, height: 5, background: "#FFAA00", marginBottom: 22 }} />
            <div style={{ ...mo, fontSize: 12, fontWeight: 500, color: t.d, letterSpacing: 1.4 }}>
              10 ans d&apos;expérience · +50 marques · +100 campagnes
            </div>
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
          <Mp variants={fu(10)} style={{ ...manifestoStyle(t, "hook"), maxWidth: 980 }}>
            {manifestoHook}
          </Mp>
          <div style={{ maxWidth: 980, width: "100%", textAlign: "center" }}>
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
          <SlideHead t={t} tag="NOTRE ROSTER" title="Un roster à taille humaine." titleS={{ fontSize: 32, marginBottom: 14 }} />
          <M variants={fu(8)} style={{ marginBottom: 16 }}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.5, margin: 0, maxWidth: 900 }}>
              Moins de créateurs, plus de temps pour chacun. On ne gère pas un catalogue : chaque créateur accompagné a été choisi.
            </Sh>
          </M>
          <M {...MV()} variants={stg(0.08)} style={{ display: "flex", gap: 12, marginTop: 0 }}>
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
                style={{ flex: 1, background: t.card, borderRadius: 12, overflow: "hidden", border: `1px solid ${t.brd}`, padding: 12 }}
              >
                <div style={{ aspectRatio: "1/1", overflow: "hidden", borderRadius: 8, background: t.cardAlt, marginBottom: 10 }}>
                  <img src={pu(c.img)} alt={c.n} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ ...se, fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.02em", color: t.cardT, lineHeight: 1.2, marginBottom: 6 }}>
                  {c.n}
                </div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, color: t.a, textTransform: "uppercase" }}>{c.u}</div>
              </M>
            ))}
          </M>
        </M>
      ),
    },

    {
      title: "Modèle FAR",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)} style={{ width: "100%" }}>
          <SlideHead t={t} tag="MODÈLE FAR" title="3 faisceaux pour accompagner un créateur." titleS={{ fontSize: 32, marginBottom: 12 }} />
          <M variants={fu(8)}>
            <Sh t={t} s={{ fontSize: 16, lineHeight: 1.5, marginBottom: 10, maxWidth: 920 }}>
              Faire grandir leurs revenus, construire autour d&apos;eux, défendre leurs intérêts.
            </Sh>
          </M>
          <FarModelOverview t={t} />
        </M>
      ),
    },

    { title: "Faire grandir leurs revenus", r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[0]} /> },
    { title: "Construire autour d'eux", r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[1]} /> },
    { title: "Défendre leurs intérêts", r: (t) => <FarBeamLegSlide t={t} leg={FAR_LEGS[2]} /> },

    {
      title: "Ce que le créateur y gagne",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)} style={{ width: "100%" }}>
          <SlideHead t={t} tag="POURQUOI NOUS REJOINDRE" title="Ce que le créateur y gagne." titleS={{ fontSize: 34, marginBottom: 20 }} />
          <M {...MV()} variants={stg(0.08)} style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", marginTop: 0 }}>
            {[
              { k: "01", t: "Une valeur qui grandit, sans dénaturer ce qu'il crée." },
              { k: "02", t: "Un accompagnement calé sur son rythme, pas sur le nôtre." },
              { k: "03", t: "Un modèle qui lui en laisse davantage." },
            ].map((o) => (
              <M
                key={o.k}
                variants={fu(10)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "22px 28px",
                  borderRadius: 12,
                  background: t.card,
                  border: `1px solid ${t.brd}`,
                  borderLeft: `5px solid ${t.a}`,
                }}
              >
                <span style={{ ...mo, fontSize: 15, fontWeight: 700, letterSpacing: 1.2, color: t.a, minWidth: 40 }}>{o.k}</span>
                <span style={{ ...se, fontSize: 24, fontWeight: 700, letterSpacing: "-0.028em", color: t.c, lineHeight: 1.25 }}>{o.t}</span>
              </M>
            ))}
          </M>
        </M>
      ),
    },

    {
      title: "Nos engagements",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)}>
          <SlideHead t={t} tag="ENGAGEMENTS" title="Nos engagements envers les créateurs." titleS={{ fontSize: 32, maxWidth: 960, marginBottom: 12 }} />
          <M variants={fu(6)}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.5, marginBottom: 12, maxWidth: 920 }}>
              5 règles simples, qui engagent FAR dès le premier jour.
            </Sh>
          </M>
          <M
            variants={fs}
            style={{ marginTop: 4, background: t.th, borderRadius: 12, padding: "14px 36px 16px", boxShadow: t.cS, position: "relative", overflow: "hidden" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0 8px", borderBottom: "1px solid rgba(255,255,255,.12)", marginBottom: 4 }}>
              <FarLogo size={26} variant="yellow" />
              <span style={{ ...mo, fontSize: 11, fontWeight: 600, letterSpacing: 2.4, color: t.thT, textTransform: "uppercase" }}>La charte créateur</span>
            </div>
            <M {...MV()} variants={stg(0.08)}>
              {[
                {
                  k: "Une création intouchable",
                  d: "FAR n'écrit pas, ne valide pas et n'encadre pas le contenu. On s'occupe du business. Le créateur crée.",
                },
                {
                  k: "Une liberté réelle",
                  d: "Aucun engagement commercial imposé. On reste parce que ça marche, pas parce qu'un contrat enferme.",
                },
                {
                  k: "Prioriser l'essentiel",
                  d: "Seuls les dossiers qui méritent une décision remontent. Moins de sollicitations, plus de partenaires justes.",
                },
                {
                  k: "Rien sans son accord",
                  d: "Aucune signature dans son dos. Chaque marque entre parce qu'elle a du sens, jamais parce qu'elle a mis le budget.",
                },
                {
                  k: "Un allié au quotidien",
                  d: "Une équipe dédiée sur la structure, le commercial et les projets, en prenant le moins de place possible.",
                },
              ].map((e, i) => (
                <M
                  key={e.k}
                  variants={fu(10)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 260px 1fr",
                    gap: 18,
                    alignItems: "baseline",
                    padding: "13px 0",
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <span style={{ ...mo, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: t.thT }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: t.thT, lineHeight: 1.18 }}>{e.k}</span>
                  <span style={{ ...sa, fontSize: 14.5, color: "rgba(255,255,255,.82)", lineHeight: 1.45 }}>{e.d}</span>
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
        <div
          style={{
            textAlign: "center",
            padding: "48px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            ...(globalThis.__FAR_PDF_EXPORT ? {} : { minHeight: 420 }),
          }}
        >
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
          {back && typeof document !== "undefined" && !document.documentElement.hasAttribute("data-far-live-export") && (
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
