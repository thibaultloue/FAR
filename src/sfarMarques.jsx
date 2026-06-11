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
          <SlideHead t={t} tag="Conviction" title="La bonne collaboration crée l'évidence." titleS={{ fontSize: 34, maxWidth: 1000 }} />
          <Intro t={t}>
            Une collaboration créateur performante ne repose pas sur une simple association de visibilité. Elle fonctionne quand elle trouve l'équilibre entre ce que la marque veut construire, ce que le créateur sait incarner et ce que son audience a envie de regarder. FAR crée ce point de rencontre : une présence de marque naturelle, crédible et utile dans le contenu.
          </Intro>
          <M
            {...MV()}
            variants={stg(0.08)}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: `1px solid ${t.brd}`, borderRadius: 16, overflow: "hidden", background: t.card }}
          >
            {[
              {
                k: "L'ambition de la marque",
                d: "Développer la notoriété, nourrir la préférence, accompagner un lancement, générer de la considération ou de la conversion.",
              },
              {
                k: "L'univers du créateur",
                d: "Respecter son ton, ses formats, ses codes éditoriaux et la relation de confiance qu'il entretient avec sa communauté.",
              },
              {
                k: "L'attente de l'audience",
                d: "Une intégration qui apporte de la valeur : divertissement, inspiration, usage, preuve ou proximité.",
              },
            ].map((e, i) => (
              <M
                key={e.k}
                variants={fu(12)}
                style={{
                  padding: "22px 24px",
                  borderLeft: i === 0 ? "none" : `1px solid ${t.brd}`,
                  color: t.cardT,
                }}
              >
                <div style={{ ...mo, fontSize: 12, fontWeight: 800, letterSpacing: 1, color: t.a, marginBottom: 10 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ ...se, fontSize: 18, fontWeight: 800, color: t.c, marginBottom: 10, lineHeight: 1.2 }}>{e.k}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.55 }}>{e.d}</div>
              </M>
            ))}
          </M>
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

    // ── 3. Notre méthode ──────────────────────────────────────────────────────
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

    // ── 4. Nos terrains d'activation ──────────────────────────────────────────
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

    // ── 5. Clôture ────────────────────────────────────────────────────────────
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
