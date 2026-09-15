import { motion } from "framer-motion";

import emmaThumbUrl from "./assets/grandjd/emma/thumb.jpg";
import emmaIntegrationUrl from "./assets/grandjd/emma/integration.jpg";
import toinelagUbiThumbUrl from "./assets/grandjd/toinelag-ubi/thumb.jpg";
import cyrilAdopteThumbUrl from "./assets/grandjd/cyril-adopte/thumb.jpg";

/**
 * Deck positionnement V3 — DA papier type Grand JD, accent jaune FAR + encre noire.
 * Faisceaux : synthèse courte, puis développement (revenus / singularité / intérêts).
 * Cas commerciaux : assets Grand JD × FAR · V2, recomposés dans cette DA.
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
      title: "Faire grandir tes revenus intelligemment",
      summary:
        "Un calendrier préparé plusieurs mois à l'avance, le bon partenaire au bon endroit, dans une création cohérente avec ta direction artistique et ta ligne éditoriale.",
    },
    {
      index: 2,
      beam: 2,
      title: "Respecter ta singularité",
      summary: "Tes ambitions, ton rythme, ta manière de travailler. Un accompagnement qui s'y adapte et une structure qui les soutient.",
    },
    {
      index: 3,
      beam: 3,
      title: "Défendre tes intérêts",
      summary:
        "15 % de commission, un contrat clair, transparent et sans engagement, et une visibilité complète sur les négociations avec les marques.",
    },
  ];

  const REVENUE_LEVERS = [
    {
      n: "01",
      t: "Remplir intelligemment ton calendrier",
      d: "On part de tes contenus prévus pour construire le calendrier commercial plusieurs mois à l'avance. Le bon partenaire, au bon endroit, uniquement quand il a sa place.",
      note: "Intégrations et vidéos dédiées sont pensées avec toi, en cohérence avec ta direction artistique et ta ligne éditoriale.",
    },
    {
      n: "02",
      t: "Construire des partenariats long terme et des opérations premium",
      d: "Installer des relations qui durent et ouvrir la porte à des projets plus ambitieux : ambassades, vidéos dédiées et opérations spéciales conçues avec toi.",
      splits: [
        { k: "Long terme", d: "Anticiper les collaborations et construire une relation suivie." },
        { k: "Premium", d: "Développer des concepts plus ambitieux quand l'idée et le partenaire le justifient. Une opération premium peut rester ponctuelle." },
      ],
    },
    {
      n: "03",
      t: "Développer des actifs qui t'appartiennent",
      d: "Quand cela correspond à tes ambitions, développer des produits, des marques ou des formats propriétaires. Pour construire aussi au-delà des partenariats.",
    },
  ];

  const CASE_SOURCE = "Compteurs : deck Grand JD × FAR · V2";

  const YtPlay = ({ w = 56, h = 40 }) => (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <svg width={w} height={h} viewBox="0 0 68 48" aria-hidden>
        <path
          d="M66.52 7.74a8.53 8.53 0 0 0-6-6.04C55.25.18 34 0 34 0S12.75.18 7.48 1.7a8.53 8.53 0 0 0-6 6.04C0 13.04 0 24 0 24s0 10.96 1.48 16.26a8.53 8.53 0 0 0 6 6.04C12.75 47.82 34 48 34 48s21.25-.18 26.52-1.7a8.53 8.53 0 0 0 6-6.04C68 34.96 68 24 68 24s0-10.96-1.48-16.26z"
          fill="#FF0000"
        />
        <path d="M45 24 27 14v20z" fill="#fff" />
      </svg>
    </div>
  );

  const BeamEyebrow = ({ leg, color }) => (
    <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2.2, textTransform: "uppercase", color, marginBottom: 8 }}>
      Faisceau {String(leg.index).padStart(2, "0")} / 03
    </div>
  );

  const PaperSheet = ({ children, accentBar }) => (
    <M
      {...MV()}
      variants={stg(0.05)}
      style={{
        width: "100%",
        background: "#FFFFFF",
        color: "#12161A",
        borderRadius: 0,
        border: "1px solid #12161A",
        borderLeft: accentBar ? "10px solid #FFAA00" : "1px solid #12161A",
        padding: "22px 28px 18px",
        boxSizing: "border-box",
        backgroundImage: accentBar
          ? "linear-gradient(rgba(18,22,26,.055) 1px, transparent 1px)"
          : "linear-gradient(rgba(18,22,26,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,22,26,.04) 1px, transparent 1px)",
        backgroundSize: accentBar ? "100% 28px" : "24px 24px",
        backgroundPosition: accentBar ? undefined : "-1px -1px",
      }}
    >
      {children}
    </M>
  );

  const BeamRevenus = ({ t }) => (
    <PaperSheet accentBar>
      <div style={{ marginBottom: 6, paddingBottom: 12, borderBottom: "1px solid #12161A" }}>
        <BeamEyebrow leg={FAR_LEGS[0]} color="#12161A" />
        <Hl t={t} s={{ fontSize: 28, marginBottom: 6, lineHeight: 1.08, color: "#12161A" }}>
          Faire grandir tes revenus, avec les bons leviers.
        </Hl>
        <Sh t={t} s={{ fontSize: 14.5, lineHeight: 1.4, margin: 0, maxWidth: 920, color: "rgba(18,22,26,.65)" }}>
          Calendrier → relations et projets ambitieux → actifs propriétaires.
        </Sh>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {REVENUE_LEVERS.map((block, i) => (
          <M
            key={block.n}
            variants={fu(8)}
            style={{
              display: "grid",
              gridTemplateColumns: "48px 1fr",
              gap: 16,
              alignItems: "start",
              padding: "12px 0",
              borderBottom: i === REVENUE_LEVERS.length - 1 ? "none" : "1px solid rgba(18,22,26,.14)",
            }}
          >
            <div style={{ ...se, fontSize: 18, fontWeight: 800, letterSpacing: "-0.04em", color: "#FFAA00", lineHeight: 1.2, paddingTop: 1 }}>
              {block.n}
            </div>
            <div>
              <div style={{ ...se, fontSize: 16, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", lineHeight: 1.25, marginBottom: 4 }}>
                {block.t}
              </div>
              <div style={{ ...sa, fontSize: 13.5, color: "rgba(18,22,26,.62)", lineHeight: 1.4 }}>{block.d}</div>
              {block.note ? (
                <div style={{ ...sa, fontSize: 12.5, color: "rgba(18,22,26,.55)", lineHeight: 1.4, marginTop: 6 }}>{block.note}</div>
              ) : null}
              {block.splits ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
                  {block.splits.map((s) => (
                    <div key={s.k} style={{ padding: "8px 10px", border: "1px solid rgba(18,22,26,.14)", background: "rgba(255,170,0,.08)" }}>
                      <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: "#FFAA00", marginBottom: 3 }}>
                        {s.k}
                      </div>
                      <div style={{ ...sa, fontSize: 12.5, color: "rgba(18,22,26,.62)", lineHeight: 1.35 }}>{s.d}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </M>
        ))}
      </div>
    </PaperSheet>
  );

  const BeamSingularite = ({ t }) => (
    <PaperSheet>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6, borderBottom: "1px solid #12161A", paddingBottom: 10 }}>
        <div>
          <BeamEyebrow leg={FAR_LEGS[1]} color="#12161A" />
          <Hl t={t} s={{ fontSize: 28, marginBottom: 0, lineHeight: 1.08, color: "#12161A", maxWidth: 820 }}>
            Un accompagnement qui s&apos;adapte à toi. Pas l&apos;inverse.
          </Hl>
        </div>
        <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2.4, textTransform: "uppercase", color: "#FFAA00", paddingBottom: 4 }}>
          Plan · 02
        </div>
      </div>
      <Sh t={t} s={{ fontSize: 14.5, lineHeight: 1.45, margin: "10px 0 14px", maxWidth: 920, color: "rgba(18,22,26,.68)" }}>
        Chaque créateur a ses ambitions, son rythme et sa manière de travailler. Notre rôle est de construire le bon accompagnement autour de cette réalité.
      </Sh>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderTop: "1px solid #12161A", borderBottom: "1px solid #12161A" }}>
        {[
          { t: "Tes ambitions", d: "Des priorités définies ensemble et un niveau d'accompagnement adapté à tes besoins." },
          { t: "Ton rythme", d: "Un calendrier et une fréquence d'échange compatibles avec ta production." },
          { t: "Ta façon de travailler", d: "Notion, Google Drive, Slack ou WhatsApp : on s'adapte aux outils qui fonctionnent pour toi." },
        ].map((block, i) => (
          <M
            key={block.t}
            variants={fu(8)}
            style={{
              padding: "16px 16px 16px 0",
              borderRight: i < 2 ? "1px solid #12161A" : "none",
              paddingRight: i < 2 ? 18 : 0,
              paddingLeft: i > 0 ? 18 : 0,
            }}
          >
            <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 1.8, color: "#FFAA00", marginBottom: 6 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ ...se, fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", marginBottom: 6, lineHeight: 1.2 }}>
              {block.t}
            </div>
            <div style={{ ...sa, fontSize: 13.5, color: "rgba(18,22,26,.6)", lineHeight: 1.42 }}>{block.d}</div>
          </M>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginTop: 12, border: "1px solid #12161A" }}>
        {[
          { k: "Le créateur", d: "Garde la main sur la création et les décisions clés." },
          { k: "FAR", d: "Coordonne le suivi commercial et administratif." },
        ].map((row, i) => (
          <div
            key={row.k}
            style={{
              padding: "10px 16px",
              borderRight: i === 0 ? "1px solid #12161A" : "none",
            }}
          >
            <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: "#FFAA00", marginBottom: 3 }}>
              {row.k}
            </div>
            <div style={{ ...sa, fontSize: 13, color: "rgba(18,22,26,.62)", lineHeight: 1.35 }}>{row.d}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: "12px 0 0", borderTop: "4px solid #FFAA00" }}>
        <div style={{ ...se, fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "#12161A", lineHeight: 1.35, marginBottom: 4 }}>
          Une structure plus solide, moins de charge au quotidien.
        </div>
        <div style={{ ...sa, fontSize: 13.5, color: "rgba(18,22,26,.6)", lineHeight: 1.4 }}>
          Organisation, suivi administratif, coordination et appui au recrutement selon tes besoins.
        </div>
      </div>
    </PaperSheet>
  );

  const BeamInterets = ({ t }) => (
    <PaperSheet>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6, borderBottom: "1px solid #12161A", paddingBottom: 10 }}>
        <div>
          <BeamEyebrow leg={FAR_LEGS[2]} color="#12161A" />
          <Hl t={t} s={{ fontSize: 28, marginBottom: 0, lineHeight: 1.08, color: "#12161A" }}>
            Tu connais les conditions. Tu gardes la main.
          </Hl>
        </div>
        <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2.4, textTransform: "uppercase", color: "#FFAA00", paddingBottom: 4 }}>
          Charte · 03
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr 1fr", gap: 0, borderTop: "1px solid #12161A", marginTop: 12 }}>
        {[
          { n: "01", t: "15 % de commission", d: "Une rémunération annoncée clairement dès le départ.", accent: true },
          { n: "02", t: "Un contrat clair et sans engagement", d: "Un cadre transparent pour savoir à quoi tu t'engages." },
          { n: "03", t: "Une visibilité complète sur les négociations", d: "Tu connais les propositions des marques, les conditions discutées et l'avancée des échanges." },
        ].map((block, i) => (
          <M
            key={block.n}
            variants={fu(8)}
            style={{
              padding: "18px 16px 16px",
              borderRight: i < 2 ? "1px solid #12161A" : "none",
              background: block.accent ? "rgba(255,170,0,.1)" : "transparent",
            }}
          >
            <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 1.8, color: "#FFAA00", marginBottom: 8 }}>{block.n}</div>
            {block.accent ? (
              <div style={{ ...se, fontSize: 42, fontWeight: 800, letterSpacing: "-0.05em", color: "#FFAA00", lineHeight: 0.9, marginBottom: 8 }}>15 %</div>
            ) : null}
            <div style={{ ...se, fontSize: block.accent ? 15 : 16, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", marginBottom: 8, lineHeight: 1.22 }}>
              {block.accent ? "de commission" : block.t}
            </div>
            <div style={{ ...sa, fontSize: 13.5, color: "rgba(18,22,26,.6)", lineHeight: 1.42 }}>{block.d}</div>
          </M>
        ))}
      </div>
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "4px solid #FFAA00" }}>
        <div style={{ ...se, fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em", color: "#12161A", lineHeight: 1.4 }}>
          La confiance se construit aussi dans les conditions de travail.
        </div>
      </div>
    </PaperSheet>
  );

  const CaseProof = ({ t, k, d }) => (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.a, marginTop: 6, flexShrink: 0 }} />
      <div>
        <div style={{ ...sa, fontSize: 12.5, fontWeight: 700, color: t.c, lineHeight: 1.2, marginBottom: 2 }}>{k}</div>
        <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.38 }}>{d}</div>
      </div>
    </div>
  );

  const YtCard = ({ thumb, alt, videoTitle, channel, avatar, views }) => {
    const yt = { fontFamily: "Roboto, Arial, Helvetica, sans-serif" };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,.08)",
          boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 6px 18px rgba(0,0,0,.06)",
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#0F0F0F" }}>
          <img src={thumb} alt={alt} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
          <YtPlay />
        </div>
        <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ ...yt, fontSize: 14, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.25 }}>{videoTitle}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src={avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ ...yt, fontSize: 12, fontWeight: 600, color: "#0F0F0F", lineHeight: 1.2 }}>{channel}</div>
              <div style={{ ...yt, fontSize: 11, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.2 }}>{views}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CaseSlide = ({ t, tag, title, video, proofs, extra }) => (
    <M {...MV()} variants={stg(0.05)} style={{ width: "100%" }}>
      <M variants={fu(8)}>
        <Tg t={t} s={{ marginBottom: 10 }}>
          {tag}
        </Tg>
      </M>
      <M variants={fu(10)}>
        <Hl t={t} s={{ fontSize: 26, marginBottom: 12, lineHeight: 1.12, maxWidth: 980 }}>
          {title}
        </Hl>
      </M>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.95fr) minmax(0,1.05fr)", gap: 16, alignItems: "start" }}>
        <M variants={fu(10)}>
          <YtCard {...video} />
        </M>
        <M variants={fu(12)} style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 2 }}>
          {proofs.map((p) => (
            <CaseProof key={p.k} t={t} k={p.k} d={p.d} />
          ))}
        </M>
      </div>
      {extra ? (
        <M variants={fu(10)} style={{ marginTop: 12 }}>
          {extra}
        </M>
      ) : null}
      <div style={{ ...mo, fontSize: 10, fontWeight: 500, letterSpacing: 0.4, color: t.d, marginTop: 10 }}>{CASE_SOURCE}</div>
    </M>
  );

  const manifestoHook = "Chez FAR, nous pensons qu'un créateur ne se résume pas à son audience.";

  const manifestoBlocks = [
    { k: "verse", t: "C'est une voix." },
    { k: "verse", t: "Un regard." },
    { k: "verse", t: "Une communauté." },
    { k: "verse", t: "Une confiance." },
    { k: "univers", t: "C'est un univers singulier." },
    { k: "trait", t: "Un univers qui se construit dans la durée." },
    { k: "trait", t: "Dans la cohérence. Dans la sincérité. Dans la durée." },
    { k: "mission", t: "FAR s'assure que cet univers leur revienne." },
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
              minHeight: 210,
              boxSizing: "border-box",
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <FarBeams w={72} fill="#FFAA00" active={leg.beam} dimOpacity={0.22} />
            </div>
            <div style={{ ...mo, fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#FFAA00", marginBottom: 10 }}>
              {String(leg.index).padStart(2, "0")}
            </div>
            <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.03em", color: "#12161A", lineHeight: 1.2, marginBottom: 10 }}>
              {leg.title}
            </div>
            <div style={{ ...sa, fontSize: 13, color: "rgba(18,22,26,.58)", lineHeight: 1.4, marginTop: "auto" }}>
              {leg.summary}
            </div>
          </M>
        ))}
      </div>
    </M>
  );

  const slides = [
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
          <SlideHead
            t={t}
            tag="NOTRE ROSTER"
            title="La qualité de l'accompagnement avant la taille du roster."
            titleS={{ fontSize: 28, marginBottom: 14, maxWidth: 980 }}
          />
          <M variants={fu(8)} style={{ marginBottom: 16 }}>
            <Sh t={t} s={{ fontSize: 15.5, lineHeight: 1.5, margin: 0, maxWidth: 920 }}>
              Chez FAR, on privilégie la qualité de la relation à la quantité de talents représentés. On se choisit des deux côtés, avec une envie commune : construire dans la durée.
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
              Trois engagements. Le détail vient ensuite.
            </Sh>
          </M>
          <FarModelOverview t={t} />
        </M>
      ),
    },

    { title: "Faire grandir tes revenus", r: (t) => <BeamRevenus t={t} /> },

    {
      title: "Cas · Emma",
      r: (t) => (
        <M {...MV()} variants={stg(0.05)} style={{ width: "100%" }}>
          <M variants={fu(8)}>
            <Tg t={t} s={{ marginBottom: 8 }}>
              CAS · INTÉGRATION · EMMA × FASTGOODCUISINE
            </Tg>
          </M>
          <M variants={fu(10)}>
            <Hl t={t} s={{ fontSize: 24, marginBottom: 12, lineHeight: 1.12, maxWidth: 1000 }}>
              Le bon angle donne à la marque sa place dans le contenu.
            </Hl>
          </M>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.05fr) minmax(0,1.05fr) minmax(0,1.1fr)", gap: 14, alignItems: "start" }}>
            <M variants={fu(8)}>
              <YtCard
                thumb={emmaThumbUrl}
                alt="J'ai Testé Les Limites De 10 Restaurants !"
                videoTitle="J'ai Testé Les Limites De 10 Restaurants !"
                channel="FastGoodCuisine"
                avatar={pu("/fgc.webp")}
                views="6,8 M de vues"
              />
            </M>
            <M variants={fu(10)}>
              <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.4, textTransform: "uppercase", color: t.d, marginBottom: 6 }}>
                Plan
              </div>
              <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", background: "#0F0F0F", border: "1px solid rgba(0,0,0,.08)" }}>
                <img
                  src={emmaIntegrationUrl}
                  alt="Le lit Emma au drive"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
            </M>
            <M variants={fu(12)} style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 18 }}>
              {[
                { k: "L'idée", d: "Le lit Emma devient le véhicule d'une expérience au drive." },
                { k: "Le rôle de la marque", d: "Le produit participe à la scène, dans une intégration écrite avec le créateur." },
                { k: "La preuve", d: "L'audience reprend spontanément l'idée du lit-voiture dans les commentaires." },
              ].map((p) => (
                <CaseProof key={p.k} t={t} k={p.k} d={p.d} />
              ))}
            </M>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            {[
              { user: "@lemongoleoriginel", text: "Allo j'aimerais bien acheter votre voiture lit je voudrais l'acheter" },
              { user: "@karlo6769", text: "C vraiment random le lit dehors j'adore 😂 😂" },
            ].map((c) => (
              <div key={c.user} style={{ padding: "8px 12px", background: t.card, border: `1px solid ${t.brd}`, borderRadius: 8 }}>
                <div style={{ ...sa, fontSize: 11, fontWeight: 700, color: t.c, marginBottom: 2 }}>{c.user}</div>
                <div style={{ ...sa, fontSize: 12.5, color: t.m, lineHeight: 1.3 }}>{c.text}</div>
              </div>
            ))}
          </div>
          <div style={{ ...mo, fontSize: 10, fontWeight: 500, letterSpacing: 0.4, color: t.d, marginTop: 8 }}>{CASE_SOURCE}</div>
        </M>
      ),
    },

    {
      title: "Cas · Ubisoft",
      r: (t) => (
        <CaseSlide
          t={t}
          tag="CAS · VIDÉO DÉDIÉE · TOINELAG × UBISOFT"
          title="Un partenariat peut devenir le sujet de la vidéo."
          video={{
            thumb: toinelagUbiThumbUrl,
            alt: "Je Ressens la Douleur des Accidents dans la Vraie Vie",
            videoTitle: "Je Ressens la Douleur des Accidents dans la Vraie Vie",
            channel: "Toinelag Gaming",
            avatar: pu("/toinelag.webp"),
            views: "3,3 M de vues",
          }}
          proofs={[
            { k: "L'idée", d: "Transformer l'univers de The Crew Motorfest en expérience physique et divertissante." },
            { k: "Le rôle de la marque", d: "Un épisode pensé pour Ubisoft, du concept au passage dans le jeu et à l'appel à l'action." },
            { k: "La preuve", d: "Une vidéo dédiée, avec un partenariat annoncé clairement et un appel à l'action produit." },
          ]}
        />
      ),
    },

    {
      title: "Cas · Adopte",
      hidden: true,
      r: (t) => (
        <CaseSlide
          t={t}
          tag="CAS · OPÉRATION PREMIUM · CYRILMP4 × ADOPTE"
          title="Une expérience de marque portée par deux créateurs."
          video={{
            thumb: cyrilAdopteThumbUrl,
            alt: "La vérité sur les restaurants de Stars (ft. LE GRAND JD)",
            videoTitle: "La vérité sur les restaurants de Stars (ft. LE GRAND JD)",
            channel: "CYRILmp4",
            avatar: pu("/cyrilmp4.webp"),
            views: "905 k vues",
          }}
          proofs={[
            { k: "L'idée", d: "Une rencontre autour des restaurants de stars, portée par CYRILmp4 avec Le Grand JD." },
            { k: "Le rôle de la marque", d: "Adopte s'inscrit dans le récit de rencontre et dans l'expérience, avec une collaboration commerciale et un appel à l'action identifiés." },
            { k: "La preuve", d: "Un concept conçu autour de l'expérience et du duo de créateurs." },
            { k: "Le mécanisme", d: "Une opération premium ponctuelle : l'expérience et le duo portent le format, la marque s'y inscrit." },
          ]}
        />
      ),
    },

    { title: "Respecter ta singularité", r: (t) => <BeamSingularite t={t} /> },
    { title: "Défendre tes intérêts", r: (t) => <BeamInterets t={t} /> },

    {
      title: "Ce que le créateur y gagne",
      r: (t) => (
        <M {...MV()} variants={stg(0.06)} style={{ width: "100%" }}>
          <SlideHead t={t} tag="POURQUOI NOUS REJOINDRE" title="Ce que le créateur y gagne." titleS={{ fontSize: 34, marginBottom: 20 }} />
          <M {...MV()} variants={stg(0.08)} style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", marginTop: 0 }}>
            {[
              { k: "01", t: "Un univers qui grandit, sans dénaturer ce qu'il crée." },
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
  return slides.filter((s) => !s.hidden);
}
