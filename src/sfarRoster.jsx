/** Deck FAR - présentation générique agence & roster créateurs.
 *  Template FAR positionnement (T1 jaune) ; chaque profil créateur vit dans un
 *  panneau pleine largeur à ses couleurs, vignettes 16/9 non recadrées. */
export function createSFarRoster(P) {
  const { Tg, Hl, Sh, FarLogo, se, sa, mo, pu } = P;

  /** En export PDF le deck rend à 1580px de large : les vignettes 16/9 y sont
   *  plus hautes qu'à l'écran, le panneau doit donc être plus haut. */
  const isPdf = () => Boolean(globalThis.__FAR_PDF_EXPORT);

  /** Placeholder : élément à fournir / valider à la main. */
  const Ph = ({ children, s, dark }) => (
    <span
      style={{
        ...mo,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1.5,
        color: dark ? "#1A1A1A" : "rgba(255,255,255,.9)",
        border: `1.5px dashed ${dark ? "#1A1A1A" : "rgba(255,255,255,.7)"}`,
        borderRadius: 6,
        padding: "3px 8px",
        display: "inline-block",
        textTransform: "uppercase",
        ...s,
      }}
    >
      {children}
    </span>
  );

  /** Identité visuelle par créateur : panneau sombre + accent vif. */
  const CREATOR_DA = {
    fgc: { bg: "#A31016", acc: "#FFC94D" },
    mp4: { bg: "#0F3B58", acc: "#6ECBFF" },
    studio: { bg: "#37246B", acc: "#B49CFF" },
    toinelag: { bg: "#1A1A1A", acc: "#FFE14A" },
    tgaming: { bg: "#0E4D30", acc: "#7BE495" },
    bek1ng: { bg: "#23303B", acc: "#9FE870" },
    teeqzy: { bg: "#1E3FA8", acc: "#8FD3FF" },
    routin: { bg: "#8C4A17", acc: "#FFC94D" },
  };

  /** Slide profil créateur : panneau immersif aux couleurs du créateur. */
  const CreatorSlide = ({ da, name, avatar, avatarRound = true, desc, descPh, chips = [], stats, videos, collabs = [] }) => {
    const { bg, acc } = da;
    return (
      <div style={{ width: "100%" }}>
        <div style={{ background: bg, borderRadius: 26, padding: "24px 36px", color: "#fff", boxShadow: "0 10px 44px rgba(0,0,0,.22)", position: "relative", overflow: "hidden", height: isPdf() ? 695 : 644, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div style={{ position: "absolute", top: -70, right: -70, width: 260, height: 260, borderRadius: "50%", background: `${acc}17`, pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 10 }}>
            <img
              src={pu(avatar)}
              alt={name}
              style={{ width: 74, height: 74, borderRadius: avatarRound ? "50%" : 16, objectFit: "cover", border: `3px solid ${acc}`, flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...se, fontSize: 34, fontWeight: 800, lineHeight: 1.05, color: "#fff" }}>{name}</div>
              {chips.length > 0 && (
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  {chips.map((c, i) => (
                    <span key={i} style={{ ...mo, fontSize: 9.5, fontWeight: 800, letterSpacing: 1.5, color: bg, background: acc, padding: "4px 10px", borderRadius: 999, textTransform: "uppercase" }}>
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 2.5, color: acc, flexShrink: 0, alignSelf: "flex-start", marginTop: 4 }}>
              NOS CRÉATEURS · 2026
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
            <div style={{ ...sa, fontSize: 14, color: "rgba(255,255,255,.82)", lineHeight: 1.5, flex: 1 }}>{desc}</div>
            {descPh && <Ph s={{ flexShrink: 0, marginTop: 2 }}>{descPh}</Ph>}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,.2)", borderBottom: "1px solid rgba(255,255,255,.2)", padding: "11px 0", marginBottom: 10 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 26 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,.2)" : "none" }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 800, letterSpacing: 2, color: acc, marginBottom: 6 }}>{s.p}</div>
                <div style={{ ...se, fontSize: 30, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.v}</div>
                <div style={{ marginTop: 5 }}>
                  {(s.extra || []).map((x, j) =>
                    typeof x === "string" ? (
                      <div key={j} style={{ ...sa, fontSize: 12.5, color: "rgba(255,255,255,.72)", lineHeight: 1.4 }}>{x}</div>
                    ) : (
                      <div key={j} style={{ marginTop: 4 }}><Ph>{x.ph}</Ph></div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          {collabs.length > 0 && (
            <div style={{ marginTop: "auto", marginBottom: 10, padding: "8px 14px 9px", borderRadius: 12, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)" }}>
              <div style={{ ...mo, fontSize: 9, fontWeight: 800, letterSpacing: 2, color: acc, marginBottom: 5 }}>TYPES DE COLLABORATION RECHERCHÉS</div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${collabs.length},1fr)`, gap: 16 }}>
                {collabs.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 7 }}>
                    <span style={{ ...sa, fontSize: 11, fontWeight: 800, color: acc, lineHeight: 1.4, flexShrink: 0 }}>→</span>
                    <span style={{ ...sa, fontSize: 11, color: "rgba(255,255,255,.8)", lineHeight: 1.4 }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: collabs.length > 0 ? 0 : "auto" }}>
            {videos.map((v, i) => (
              <div key={i}>
                <img
                  src={pu(v.img)}
                  alt={v.title}
                  style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", borderRadius: 12, border: "1px solid rgba(255,255,255,.25)" }}
                />
                <div style={{ ...mo, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: acc, margin: "8px 0 3px", textTransform: "uppercase" }}>{v.tag}</div>
                <div style={{ ...sa, fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.35 }}>{v.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return [
    // ── 1. COUVERTURE : présentation générique de l'agence ─────────────────
    {
      title: "FAR by La Porte",
      r: (t) => (
        <div style={{ textAlign: "center", padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: "center", width: "100%" }}>
            <FarLogo size={100} variant={t.lv} />
          </div>
          <div style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: t.d, marginBottom: 28 }}>
            by La Porte
          </div>
          <Hl t={t} s={{ fontSize: 48, maxWidth: 900, margin: "0 auto 16px", textAlign: "center" }}>
            Faire grandir les univers créateurs.
          </Hl>
          <Sh t={t} s={{ maxWidth: 720, margin: "0 auto 24px", textAlign: "center" }}>
            Accompagner les créateurs dans leur développement, et aider les marques à construire des projets justes avec eux.
          </Sh>
          <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginTop: 12 }}>
            Qui veut aller loin, vient ici.
          </div>
          <div style={{ ...mo, fontSize: 11, color: t.d, marginTop: 30, letterSpacing: 2 }}>
            10 ans d&apos;expérience · +50 marques · +100 campagnes
          </div>
        </div>
      ),
    },

    // ── 2. L'AGENCE ─────────────────────────────────────────────────────────
    {
      title: "L'agence",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Tg t={t} s={{ marginBottom: 12 }}>L&apos;AGENCE</Tg>
          <div style={{ display: "flex", gap: 28, alignItems: "stretch", marginBottom: 30 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Hl t={t} s={{ fontSize: 28, marginBottom: 12 }}>Une agence d&apos;accompagnement de créateurs de contenu.</Hl>
              <Sh t={t} s={{ fontSize: 14, lineHeight: 1.55, marginBottom: 10 }}>
                FAR est une agence d&apos;accompagnement de créateurs de contenu (macro). Nous proposons un accompagnement 360° afin qu&apos;ils puissent se concentrer pleinement sur ce qui les anime : la création.
              </Sh>
              <Sh t={t} s={{ fontSize: 14, lineHeight: 1.55, marginBottom: 10 }}>
                L&apos;agence est née de la vision de Cyril, créateur de contenu fort de 15 ans d&apos;expérience. Après avoir développé un premier projet d&apos;agence aux côtés d&apos;Amixem, il a souhaité créer sa propre structure avec une ambition claire : accompagner les créateurs dans un développement serein et durable.
              </Sh>
              <Sh t={t} s={{ fontSize: 14, lineHeight: 1.55, marginBottom: 0 }}>
                L&apos;agence fait partie du Groupe La Porte, également fondé par Cyril : un écosystème de structures dont la vocation est de fournir les services et produits de la culture web de demain.
              </Sh>
            </div>
            <img
              src={pu("/havas/cyril-portrait.jpg")}
              alt="Cyril"
              style={{ height: 230, width: "auto", alignSelf: "center", display: "block", borderRadius: 16, boxShadow: "0 8px 28px rgba(0,0,0,.22)", flexShrink: 0 }}
            />
          </div>
          {/* Schéma : Groupe La Porte au-dessus, relié aux 5 entités. */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "baseline", gap: 12, padding: "13px 28px", borderRadius: 999, background: "#1A1A1A", boxShadow: "0 6px 22px rgba(0,0,0,.25)" }}>
              <span style={{ ...se, fontSize: 17, fontWeight: 800, color: "#FFAA00", letterSpacing: 0.5 }}>GROUPE LA PORTE</span>
              <span style={{ ...sa, fontSize: 12.5, color: "rgba(255,255,255,.7)" }}>fondé par Cyril</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", columnGap: 12, rowGap: 0 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={`c${i}`} style={{ position: "relative", height: 40 }}>
                {i === 2 && <div style={{ position: "absolute", left: "50%", top: 0, width: 2, height: 19, background: "#1A1A1A", transform: "translateX(-1px)" }} />}
                <div style={{ position: "absolute", top: 19, height: 2, background: "#1A1A1A", left: i === 0 ? "50%" : -7, right: i === 4 ? "50%" : -7 }} />
                <div style={{ position: "absolute", left: "50%", top: 19, width: 2, height: 21, background: "#1A1A1A", transform: "translateX(-1px)" }} />
              </div>
            ))}
            {[
              { n: "La Porte CYRILmp4", d: "Développement des chaînes CYRILmp4 & CYRILstudio et des réseaux associés." },
              { n: "La Porte Production", d: "Production de vidéos web : documentaires, clips, courts-métrages." },
              { n: "La Porte Académie", d: "Formations concrètes élaborées par des professionnels du web." },
              { n: "La Porte Beta", d: "Lancement rapide de produits pour la culture web." },
              { n: "FAR", d: "L'agence créateurs : développement, stratégie, structure, sur-mesure.", hl: true },
            ].map((e, i) => (
              <div key={i} style={{ padding: "14px 16px 15px", borderRadius: 12, background: "#1A1A1A", boxShadow: e.hl ? "0 6px 22px rgba(0,0,0,.28)" : "0 3px 12px rgba(0,0,0,.14)", outline: e.hl ? "3px solid #fff" : "none" }}>
                <div style={{ ...se, fontSize: 14, fontWeight: 800, color: e.hl ? "#FFAA00" : "#fff", marginBottom: 5, lineHeight: 1.2 }}>{e.n}</div>
                <div style={{ ...sa, fontSize: 11.5, color: "rgba(255,255,255,.7)", lineHeight: 1.42 }}>{e.d}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // ── 3. NOS CRÉATEURS (roster mosaïque colorée) ──────────────────────────
    {
      title: "Nos créateurs",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Hl t={t} s={{ fontSize: 32, marginBottom: 8 }}>Nos créateurs.</Hl>
          <Sh t={t} s={{ fontSize: 15, lineHeight: 1.55, marginBottom: 20, maxWidth: 880 }}>
            Un roster à taille humaine : moins de créateurs, plus de présence, plus de suivi, plus de qualité d&apos;accompagnement.
          </Sh>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {[
              { n: "FastGoodCuisine", img: "/fgc.webp", da: CREATOR_DA.fgc, st: [["YouTube", "8,4M"], ["TikTok", "2,4M"], ["Instagram", "2,3M"]] },
              { n: "CYRILmp4", img: "/cyrilmp4.webp", da: CREATOR_DA.mp4, st: [["YouTube", "5,22M"], ["YouTube Studio", "1,11M"], ["Instagram", "1,3M"]] },
              { n: "Le Routin", img: "/leroutin.webp", da: CREATOR_DA.routin, st: [["YouTube", "578k"], ["TikTok", "336,1k"], ["Instagram", "187k"]] },
              { n: "Toinelag", img: "/toinelag.webp", da: CREATOR_DA.toinelag, st: [["YouTube", "1,9M"], ["YT Gaming", "735k"], ["YT Plus", "317k"], ["Instagram", "17,1k"]] },
              { n: "Teeqzy", img: "/teeqzy.webp", da: CREATOR_DA.teeqzy, st: [["YouTube", "2,01M"], ["TikTok", "110k"]] },
              { n: "Bek1ng", img: "/bek1ng.webp", da: CREATOR_DA.bek1ng, st: [["Twitch", "210k"], ["TikTok", "473,8k"]] },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "16px 18px", borderRadius: 16, background: c.da.bg, color: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,.16)", alignItems: "center" }}>
                <img src={pu(c.img)} alt={c.n} style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2.5px solid ${c.da.acc}` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ ...se, fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{c.n}</div>
                  {c.st.map(([p, v], j) => (
                    <div key={j} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "1.5px 0" }}>
                      <span style={{ ...mo, fontSize: 9, fontWeight: 700, letterSpacing: 1, color: c.da.acc, textTransform: "uppercase" }}>{p}</span>
                      <span style={{ ...sa, fontSize: 12.5, fontWeight: 800, color: "#fff" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // ── 4. FASTGOODCUISINE ──────────────────────────────────────────────────
    {
      title: "FastGoodCuisine",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.fgc}
          name="FastGoodCuisine"
          avatar="/fgc.webp"
          chips={["Food", "Divertissement", "Formats courts"]}
          desc="FastGoodCuisine, c'est le cocktail explosif entre food, fun et format court ! Avec son énergie débordante, ce créateur ultra-gourmand régale une large communauté grâce à des vidéos créatives mêlant cuisine rapide, humour croustillant et concepts décalés. Sa recette ? Populariser la bouffe accessible et inventive tout en amusant sa communauté avec un ton unique et sans prise de tête."
          stats={[
            { p: "YOUTUBE", v: "8,4M abonnés", extra: ["Moyenne de vues (1 an) : 2,4M · Shorts : 2,7M"] },
            { p: "TIKTOK", v: "2,4M abonnés", extra: ["Moyenne de vues : 1,2M"] },
            { p: "INSTAGRAM", v: "2,3M abonnés", extra: ["Moyenne de vues Reels : 650k"] },
          ]}
          videos={[
            { img: "/havas/fgc-thumb1.jpg", tag: "Dégustation", title: "On Mange 30 Fast-Foods avec Valouzz (Mauvaise Idée)" },
            { img: "/havas/fgc-thumb2.jpg", tag: "Divertissement", title: "Le Dernier Qui Quitte La Table Gagne 10 000 €" },
            { img: "/havas/fgc-thumb3.jpg", tag: "Test / Hack", title: "Je Teste 25 Food Hack TikTok" },
          ]}
          collabs={[
            "Collaborations sur-mesure, intégrées à ses concepts éditoriaux (dont Le dernier qui quitte la table).",
            "Co-branding puissant, en synergie avec ses marques Pepe Chicken's et Pop's.",
            "Nouveaux formats à forte valeur ajoutée autour de l'univers de la cuisine.",
          ]}
        />
      ),
    },

    // ── 5. CYRILMP4 ─────────────────────────────────────────────────────────
    {
      title: "CYRILmp4",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.mp4}
          name="CYRILmp4"
          avatar="/cyrilmp4.webp"
          chips={["Exploration", "Voyages", "Docu / vlog"]}
          desc="Cyril propose sur sa chaîne des contenus très diversifiés mélangeant exploration, voyages, divertissement et gaming. Passionné et engagé, Cyril partage ses passions avec sa communauté depuis bientôt 15 ans."
          stats={[
            { p: "YOUTUBE", v: "5,22M abonnés", extra: ["Moyenne de vues : 972K"] },
            { p: "INSTAGRAM", v: "1,3M abonnés", extra: ["Moyenne de vues Reels : 600k"] },
          ]}
          videos={[
            { img: "/havas/mp4-thumb1.jpg", tag: "Docu / vlog", title: "100H dans un lac radioactif créé par une bombe nucléaire !" },
            { img: "/havas/mp4-thumb2.jpg", tag: "Docu / vlog", title: "Je teste les friteries notées 1 étoile" },
            { img: "/havas/mp4-thumb3.jpg", tag: "Docu / vlog", title: "48h dans une ville sans loi" },
          ]}
          collabs={[
            "Concepts dédiés et expériences insolites de luxe.",
            "Partenariats emblématiques annuels : sport, montres, automobile, matériel de voyage, téléphonie.",
            "Collaborations autour de ses marques propres, Tryhard et La Porte Académie.",
          ]}
        />
      ),
    },

    // ── 6. CYRILSTUDIO ──────────────────────────────────────────────────────
    {
      title: "CYRILstudio",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.studio}
          name="CYRILstudio"
          avatar="/havas/cyrilstudio-avatar.jpg"
          chips={["Gaming", "Tests", "Découvertes"]}
          desc="Avec près de 15 ans de passion partagée, Cyril vous embarque dans un univers 100 % jeux vidéo : tests, découvertes, défis et fun au rendez-vous. Expert et passionné, il partage ses coups de cœur et ses aventures gaming avec sa communauté."
          stats={[
            { p: "YOUTUBE", v: "1,11M abonnés", extra: ["Moyenne de vues : 350k"] },
          ]}
          videos={[
            { img: "/havas/studio-thumb1.jpg", tag: "Gaming", title: "J'explore les jeux abandonnés de notre enfance !" },
            { img: "/havas/studio-thumb2.jpg", tag: "Storytelling", title: "La chute de Medal Of Honor !" },
            { img: "/havas/studio-thumb3.jpg", tag: "Test d'objets", title: "Je teste les pires arnaques gaming Temu !" },
          ]}
          collabs={[
            "Intégrations et concepts dédiés au sein de ses formats gaming (dont « La chute de »).",
            "Partenariats emblématiques annuels avec les acteurs du gaming et de la tech.",
          ]}
        />
      ),
    },

    // ── 7. TOINELAG ─────────────────────────────────────────────────────────
    {
      title: "Toinelag",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.toinelag}
          name="Toinelag"
          avatar="/toinelag.webp"
          chips={["Construction", "Défis", "Divertissement"]}
          desc="Youtubeur divertissement aux multiples facettes, Toinelag anime une communauté engagée autour de vidéos funs et originales : défis, humour et gaming. Son but ? Divertir et surprendre son audience à chaque vidéo !"
          stats={[
            { p: "YOUTUBE", v: "1,9M abonnés", extra: ["Moyenne de vues : 1,5M"] },
            { p: "INSTAGRAM", v: "17,1k abonnés", extra: ["Moyenne de vues Story : 10k"] },
          ]}
          videos={[
            { img: "/havas/toinelag-thumb1.jpg", tag: "Construction", title: "Je Construis une Pièce Secrète dans un Trampoline Park" },
            { img: "/havas/toinelag-thumb2.jpg", tag: "Jeux", title: "Bonbon VS Vrai Vie Pendant 24H !" },
            { img: "/havas/toinelag-thumb3.jpg", tag: "Divertissement", title: "Énorme Bataille De Nerf !" },
          ]}
          collabs={[
            "Priorisation de concepts co-construits main dans la main avec les marques : cohérence, authenticité, performance.",
            "Accélération sur les formats drive-to-store, véritables leviers business à impact direct en point de vente.",
          ]}
        />
      ),
    },

    // ── 8. TOINELAG GAMING / TOINELAG + ─────────────────────────────────────
    {
      title: "Toinelag Gaming / +",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.tgaming}
          name="Toinelag Gaming / Toinelag +"
          avatar="/havas/toinelaggaming-avatar.jpg"
          chips={["Gaming", "Brainrot", "Défis"]}
          desc="Les chaînes secondaires de Toinelag prolongent son univers : gaming, formats courts et concepts brainrot qui cartonnent auprès d'une audience jeune. Des moyennes de vues supérieures au million sur des formats ultra-viraux."
          stats={[
            { p: "YOUTUBE GAMING", v: "735k abonnés", extra: ["Moyenne de vues : 2,2M"] },
            { p: "YOUTUBE PLUS", v: "317k abonnés", extra: ["Moyenne de vues : 2,6M"] },
          ]}
          videos={[
            { img: "/havas/tgaming-thumb1.jpg", tag: "Brainrot", title: "On mange des Brainrot dans la vraie vie" },
            { img: "/havas/tgaming-thumb2.jpg", tag: "Gaming", title: "Je ressens la douleur des accidents dans la vraie vie" },
            { img: "/havas/tgaming-thumb3.jpg", tag: "Défi", title: "Le meilleur pancake gagne" },
          ]}
          collabs={[
            "Concepts co-construits avec les marques, dans la continuité de la chaîne principale.",
            "Intégrations dans des formats courts ultra-viraux, pour toucher une audience jeune en volume.",
          ]}
        />
      ),
    },

    // ── 9. LE ROUTIN ────────────────────────────────────────────────────────
    {
      title: "Le Routin",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.routin}
          name="Le Routin"
          avatar="/leroutin.webp"
          chips={["Street food", "Tests", "Bonne bouffe"]}
          desc="Le Routin explore la food du quotidien avec un regard curieux et accessible : street food, nouveautés de supermarché, tests et bonnes adresses. Un ton simple et authentique qui fédère une communauté fidèle autour de la bonne bouffe, sans chichis."
          stats={[
            { p: "YOUTUBE", v: "578k abonnés", extra: ["Moyenne de vues : 224,6k"] },
            { p: "TIKTOK", v: "336,1k abonnés", extra: ["Moyenne de vues : 268k"] },
            { p: "INSTAGRAM", v: "187k abonnés", extra: ["Moyenne de vues Reels : 216k · Story : 45k"] },
          ]}
          videos={[
            { img: "/havas/routin-thumb1.jpg", tag: "Fast food", title: "Je teste le street food la moins chère de Paris" },
            { img: "/havas/routin-thumb2.jpg", tag: "Snack et supermarchés", title: "Je teste les nouveautés food au supermarché" },
            { img: "/havas/routin-thumb3.jpg", tag: "Bonne bouffe et recettes", title: "Je teste les plats préférés des youtubeurs" },
          ]}
          collabs={[
            "Partenariats 360° combinant formats courts et longs pour maximiser l'impact des campagnes.",
            "Co-création de nouveaux formats éditoriaux : recettes accessibles au plus grand nombre et concepts insolites.",
            "Collaborations hors food (ex. Vinted), marque blanche et co-productions, en live ou non.",
          ]}
        />
      ),
    },

    // ── 10. BEK1NG ──────────────────────────────────────────────────────────
    {
      title: "Bek1ng",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.bek1ng}
          name="Bek1ng"
          avatar="/bek1ng.webp"
          chips={["Call of Duty", "Live Twitch", "TikTok viral"]}
          desc="Référence de Call of Duty Warzone grâce à ses vidéos virales sur TikTok explosives, il cumule les spectateurs en réalisant des actions de grande classe tous les jours sur Twitch."
          stats={[
            { p: "TWITCH", v: "210k abonnés", extra: ["Moyenne de vues : 15k · Average viewers : 600"] },
            { p: "TIKTOK", v: "473,8k abonnés", extra: ["Moyenne de vues : 160k"] },
          ]}
          videos={[
            { img: "/havas/bek1ng-thumb1.jpg", tag: "Performance en live", title: "Ce streamer Italien et sa team vont regretter ce qu'ils m'ont fait" },
            { img: "/havas/bek1ng-thumb2.jpg", tag: "Défi inédit", title: "20 filles VS 20 garçons sur Rebirth Island" },
            { img: "/havas/bek1ng-thumb3.jpg", tag: "Devine le niveau", title: "Guess my rank des viewers sur Warzone" },
          ]}
        />
      ),
    },

    // ── 11. TEEQZY ──────────────────────────────────────────────────────────
    {
      title: "Teeqzy",
      r: () => (
        <CreatorSlide
          da={CREATOR_DA.teeqzy}
          name="Teeqzy"
          avatar="/teeqzy.webp"
          chips={["Fortnite", "Vidéo quotidienne", "Compétitif"]}
          desc="L'un des meilleurs joueurs du monde de Fortnite s'est reconverti en créateur de contenu considéré comme une référence de ce jeu depuis 10 ans. Avec une vidéo quotidienne, ses spectateurs ont un rendez-vous régulier immanquable."
          stats={[
            { p: "YOUTUBE", v: "2,01M abonnés", extra: ["Moyenne de vues : 90k"] },
            { p: "TIKTOK", v: "110k abonnés", extra: ["Moyenne de vues : 150k"] },
          ]}
          videos={[
            { img: "/havas/teeqzy-thumb1.jpg", tag: "Test de périphériques", title: "Je me suis Entraîné à la manette pendant 1 Mois... Voici le résultat" },
            { img: "/havas/teeqzy-thumb2.jpg", tag: "Défi impossible", title: "Faire top 1 en utilisant que des armes mythiques" },
            { img: "/havas/teeqzy-thumb3.jpg", tag: "Partie commentée", title: "On monte unreal sur cette game de fou" },
          ]}
        />
      ),
    },

    // ── 12. MERCI ───────────────────────────────────────────────────────────
    {
      title: "Merci",
      r: (t, back) => (
        <div style={{ textAlign: "center", padding: "60px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ marginBottom: 40 }}>
            <FarLogo size={100} variant={t.lv} />
          </div>
          <Hl t={t} s={{ fontSize: 56, textAlign: "center", marginBottom: 20 }}>Merci.</Hl>
          <div style={{ ...se, fontSize: 22, fontWeight: 800, color: t.a, marginBottom: 24 }}>
            Qui veut aller loin, vient ici.
          </div>
          <div style={{ ...sa, fontSize: 17, color: t.m, lineHeight: 1.6 }}>Thibault Loué</div>
          <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.7, marginTop: 6 }}>
            thibault.loue@far-agence.com · 06 26 28 11 05
          </div>
          <div style={{ width: 60, height: 3, background: t.a, borderRadius: 2, margin: "28px auto 0" }} />
          {back && (
            <button
              onClick={back}
              style={{ marginTop: 40, background: t.nav, color: t.navT, ...sa, fontSize: 14, fontWeight: 600, padding: "12px 32px", borderRadius: 10, border: "none", cursor: "pointer" }}
            >
              ← Retour à l&apos;accueil
            </button>
          )}
        </div>
      ),
    },
  ];
}
