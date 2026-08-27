/**
 * Le Grand JD V2 — DA Keynote claire, structure partant des besoins du créateur.
 * Agence condensée (extrait du deck Positionnement V2), puis besoins → accompagnement → preuves.
 */
export function createSGrandJdV2(P) {
  const { FarLogo, FarBeams, pu } = P;

  const IF = { fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" };
  const se = IF;
  const sa = IF;
  const mo = IF;

  const Eyebrow = ({ t, children, s, light }) => (
    <div
      style={{
        ...mo,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 2.2,
        textTransform: "uppercase",
        color: light ? "rgba(255,255,255,.72)" : t.d,
        marginBottom: 16,
        ...s,
      }}
    >
      {children}
    </div>
  );

  const Title = ({ t, children, s, light }) => (
    <div
      style={{
        ...se,
        fontSize: 44,
        fontWeight: 700,
        letterSpacing: "-0.034em",
        lineHeight: 1.08,
        color: light ? "#FFFFFF" : t.c,
        marginBottom: 16,
        ...s,
      }}
    >
      {children}
    </div>
  );

  const Lead = ({ t, children, s, light }) => (
    <div
      style={{
        ...sa,
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 1.55,
        letterSpacing: "-0.008em",
        color: light ? "rgba(255,255,255,.82)" : t.m,
        ...s,
      }}
    >
      {children}
    </div>
  );

  const Card = ({ t, children, s }) => (
    <div
      style={{
        background: t.card,
        border: `1px solid ${t.brd}`,
        borderRadius: 18,
        padding: "22px 24px",
        boxShadow: t.cS,
        ...s,
      }}
    >
      {children}
    </div>
  );

  /** Visuel à fournir : encadré pointillé avec le nom de fichier attendu. */
  const Ph = ({ t, label, file, h = 150, s }) => (
    <div
      style={{
        height: h,
        borderRadius: 14,
        border: `1.5px dashed ${t.a}`,
        background: t.cardAlt,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        textAlign: "center",
        padding: "12px 14px",
        ...s,
      }}
    >
      <div style={{ ...mo, fontSize: 10.5, fontWeight: 700, letterSpacing: 1.6, textTransform: "uppercase", color: t.a }}>{label}</div>
      {file && <div style={{ ...mo, fontSize: 10, color: t.d, letterSpacing: 0.4 }}>{file}</div>}
    </div>
  );

  /** Slide intercalaire : image plein cadre + titre posé dessus. */
  const ImageStatement = ({ t, img, eyebrow, title, sub, position = "center" }) => (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "66vh",
        minHeight: 420,
        borderRadius: 24,
        overflow: "hidden",
        background: "#12161A",
      }}
    >
      <img
        src={pu(img)}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: position, display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,13,16,.34) 0%, rgba(10,13,16,.16) 38%, rgba(10,13,16,.86) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 52px 46px" }}>
        <Eyebrow t={t} light s={{ marginBottom: 14, color: "#7FE3CE" }}>
          {eyebrow}
        </Eyebrow>
        <Title t={t} light s={{ fontSize: 54, maxWidth: 900, marginBottom: sub ? 14 : 0 }}>
          {title}
        </Title>
        {sub && <Lead t={t} light s={{ fontSize: 19, maxWidth: 720 }}>{sub}</Lead>}
      </div>
    </div>
  );

  /**
   * Barre de remplissage. `from` = acquis, `to` = niveau atteint (ou visé si `target`).
   * La zone visée est hachurée pour ne pas la confondre avec du réalisé.
   */
  const FillBar = ({ t, from, to, target }) => {
    const base = from == null ? to : from;
    return (
      <div style={{ position: "relative", height: 16, borderRadius: 8, background: t.brd, overflow: "hidden" }}>
        {to > base && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${to}%`,
              borderRadius: 8,
              background: target
                ? `repeating-linear-gradient(115deg, rgba(14,140,116,.3) 0 7px, rgba(14,140,116,.1) 7px 14px)`
                : "rgba(14,140,116,.34)",
            }}
          />
        )}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${base}%`, background: t.a, borderRadius: 8 }} />
      </div>
    );
  };

  const NEEDS = [
    {
      n: "01",
      k: "Chiffre d'affaires",
      t: "Développer ton chiffre d'affaires.",
      d: "Sans produire plus, ni changer ce que tu fais déjà très bien.",
    },
    {
      n: "02",
      k: "Remplissage",
      t: "Optimiser ton remplissage, intelligemment.",
      d: "Tendre vers un partenaire par contenu, uniquement quand c'est justifié.",
    },
    {
      n: "03",
      k: "Partenaires",
      t: "Trouver des partenaires qui te ressemblent.",
      d: "Des marques qui ont une raison d'être dans tes formats, pas un budget à placer.",
    },
  ];

  return [
    {
      title: "Ouverture",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "68vh",
              minHeight: 440,
              borderRadius: 24,
              overflow: "hidden",
              background: "#12161A",
            }}
          >
            <img
              src={pu("/grandjd/jd-portrait.jpg")}
              alt="Le Grand JD"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 22%", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(105deg, rgba(10,13,16,.9) 0%, rgba(10,13,16,.66) 44%, rgba(10,13,16,.18) 100%)",
              }}
            />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 56px", maxWidth: 860 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <FarLogo size={58} variant="white" />
                <div style={{ width: 1, height: 30, background: "rgba(255,255,255,.28)" }} />
                <FarBeams w={88} fill="#7FE3CE" />
              </div>
              <Eyebrow t={t} light s={{ color: "#7FE3CE" }}>
                Le Grand JD × FAR
              </Eyebrow>
              <Title t={t} light s={{ fontSize: 58, marginBottom: 20 }}>
                Développer ton business, sans jamais toucher à ton univers.
              </Title>
              <Lead t={t} light s={{ fontSize: 20, maxWidth: 620 }}>
                On part de ce dont tu as besoin. Puis on te montre exactement ce qu&apos;on met en face.
              </Lead>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "FAR en bref",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, marginBottom: 28, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 760 }}>
              <Eyebrow t={t}>L&apos;agence</Eyebrow>
              <Title t={t} s={{ fontSize: 42 }}>
                L&apos;agence qui fait grandir les créateurs.
              </Title>
              <Lead t={t} s={{ maxWidth: 640 }}>
                Construire les revenus, libérer du temps, défendre la valeur. Un roster à taille humaine : peu de créateurs, beaucoup de temps pour chacun.
              </Lead>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <FarLogo size={78} variant={t.lv} />
              <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                <FarBeams w={112} fill={t.a} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
            {[
              { i: 1, t: "Protéger la création", d: "Ta ligne, tes règles. On filtre les sollicitations et on refuse ce qui abîmerait ton récit." },
              { i: 2, t: "Solidifier la structure", d: "Contrats, facturation, calendrier, data business : on absorbe tout ce qui est chronophage." },
              { i: 3, t: "Garantir la croissance", d: "Partenariats longs, actifs propriétaires, remplissage intelligent. Plus de revenus, même univers." },
            ].map((leg) => (
              <Card key={leg.i} t={t} s={{ borderTop: `4px solid ${t.a}` }}>
                <div style={{ marginBottom: 12 }}>
                  <FarBeams w={58} h={18} fill={t.a} active={leg.i} dimOpacity={0.18} />
                </div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.6, color: t.a, marginBottom: 8, textTransform: "uppercase" }}>
                  Faisceau {String(leg.i).padStart(2, "0")}
                </div>
                <div style={{ ...se, fontSize: 20, fontWeight: 700, letterSpacing: "-0.028em", color: t.c, marginBottom: 8, lineHeight: 1.2 }}>{leg.t}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.52 }}>{leg.d}</div>
              </Card>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {[
              { v: "10 ans", l: "d'expérience marques & créateurs" },
              { v: "+50", l: "marques accompagnées" },
              { v: "+100", l: "campagnes réalisées" },
              { v: "5", l: "créateurs accompagnés" },
            ].map((s) => (
              <div key={s.l} style={{ flex: 1, padding: "14px 16px", borderRadius: 14, background: t.cardAlt, textAlign: "center" }}>
                <div style={{ ...se, fontSize: 26, fontWeight: 700, letterSpacing: "-0.035em", color: t.a, lineHeight: 1 }}>{s.v}</div>
                <div style={{ ...sa, fontSize: 12, color: t.m, marginTop: 6, lineHeight: 1.35 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Ce que tu y gagnes",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Pourquoi nous rejoindre</Eyebrow>
          <Title t={t} s={{ fontSize: 42 }}>
            Trois promesses, chiffrées.
          </Title>
          <Lead t={t} s={{ maxWidth: 720, marginBottom: 28 }}>
            Le reste du deck ne sert qu&apos;à prouver ces trois lignes.
          </Lead>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              {
                k: "Rémunération",
                n: "15 %",
                u: "de commission",
                h: "Le taux le plus bas du marché.",
                d: "L'essentiel de la valeur créée reste de ton côté.",
              },
              {
                k: "Remplissage",
                n: "100 %",
                u: "visés, intelligemment",
                h: "Un calendrier bien mieux rempli.",
                d: "On construit le remplissage des mois à l'avance, et seulement quand la marque a sa place.",
              },
              {
                k: "Temps",
                n: "1",
                u: "seul interlocuteur",
                h: "Le moins de temps possible pris.",
                d: "Prospection, négociation, contrats : on absorbe. Tu gardes ton temps pour créer.",
              },
            ].map((o) => (
              <Card key={o.k} t={t} s={{ borderTop: `4px solid ${t.a}`, padding: "24px 26px" }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 14, textTransform: "uppercase" }}>{o.k}</div>
                <div style={{ ...se, fontSize: 52, fontWeight: 700, letterSpacing: "-0.05em", color: t.a, lineHeight: 1 }}>{o.n}</div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 600, letterSpacing: 1.2, color: t.d, margin: "10px 0 18px", textTransform: "uppercase" }}>{o.u}</div>
                <div style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, marginBottom: 8, lineHeight: 1.24 }}>{o.h}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5 }}>{o.d}</div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Intercalaire · Tes besoins",
      r: (t) => (
        <ImageStatement
          t={t}
          img="/grandjd/axe-2-urbex.png"
          eyebrow="Le point de départ"
          title="Partons de ce dont tu as besoin."
          sub="Trois sujets reviennent chez tous les créateurs de ton niveau. On les prend un par un."
        />
      ),
    },

    {
      title: "Tes besoins",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Tes besoins</Eyebrow>
          <Title t={t} s={{ fontSize: 42 }}>
            Ce que tu cherches à régler.
          </Title>
          <Lead t={t} s={{ maxWidth: 760, marginBottom: 30 }}>
            Tes formats fonctionnent. Ce qui manque, c&apos;est la couche commerciale autour.
          </Lead>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {NEEDS.map((need) => (
              <Card key={need.n} t={t} s={{ padding: "26px 26px 28px" }}>
                <div style={{ ...se, fontSize: 40, fontWeight: 700, letterSpacing: "-0.05em", color: t.a, lineHeight: 1, marginBottom: 18, opacity: 0.28 }}>
                  {need.n}
                </div>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.a, marginBottom: 10, textTransform: "uppercase" }}>{need.k}</div>
                <div style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: t.c, marginBottom: 10, lineHeight: 1.2 }}>{need.t}</div>
                <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.52 }}>{need.d}</div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Notre réponse",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Ce qu&apos;on met en face</Eyebrow>
          <Title t={t} s={{ fontSize: 42 }}>
            Un besoin, une réponse concrète.
          </Title>
          <Lead t={t} s={{ maxWidth: 720, marginBottom: 26 }}>
            Pas de méthode fumeuse : trois chantiers, opérés par nous.
          </Lead>
          <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${t.brd}`, background: t.card, boxShadow: t.cS }}>
            {[
              {
                need: "Développer ton CA",
                answer: "Une force commerciale dédiée",
                d: "Prospection sortante, négociation, upsell sur les marques déjà en place. On vend ta valeur, pas ton reach.",
              },
              {
                need: "Optimiser ton remplissage",
                answer: "Un calendrier construit à l'avance",
                d: "On planifie les catégories mois par mois pour qu'aucune bonne vidéo ne parte à vide, sans jamais saturer ton audience.",
              },
              {
                need: "Des partenaires qui te ressemblent",
                answer: "Un filtre, puis une intégration native",
                d: "Chaque marque est qualifiée sur ton territoire. On construit l'angle avec elle avant de te la présenter.",
              },
            ].map((row, i, arr) => (
              <div
                key={row.need}
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 40px 1fr",
                  gap: 24,
                  alignItems: "center",
                  padding: "24px 28px",
                  borderBottom: i < arr.length - 1 ? `1px solid ${t.brd}` : "none",
                }}
              >
                <div>
                  <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.6, color: t.d, marginBottom: 6, textTransform: "uppercase" }}>
                    Besoin {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, lineHeight: 1.25 }}>{row.need}</div>
                </div>
                <div style={{ ...se, fontSize: 24, color: t.a, textAlign: "center", lineHeight: 1 }} aria-hidden>
                  →
                </div>
                <div>
                  <div style={{ ...se, fontSize: 19, fontWeight: 700, letterSpacing: "-0.028em", color: t.a, marginBottom: 6, lineHeight: 1.25 }}>{row.answer}</div>
                  <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.5 }}>{row.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Remplissage · la preuve",
      r: (t) => {
        const rows = [
          {
            name: "CYRILmp4",
            img: "/cyrilmp4.webp",
            from: null,
            to: 100,
            label: "~100 %",
            note: "Calendrier complet, un partenaire par contenu, catégories protégées.",
          },
          {
            name: "Toinelag",
            img: "/toinelag.webp",
            from: 33,
            to: 66,
            label: "33 % → 66 %",
            note: "Remplissage doublé en un an, sans changer sa ligne éditoriale.",
          },
          {
            name: "Le Grand JD",
            img: "/grandjd/jd-portrait.jpg",
            from: 28,
            to: 100,
            label: "~28 % → objectif 100 %",
            note: "Le potentiel le plus ouvert du roster : la majorité de tes vidéos partent encore sans partenaire.",
            target: true,
          },
        ];
        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Remplissage · preuves</Eyebrow>
            <Title t={t} s={{ fontSize: 42 }}>
              Ce qu&apos;on sait faire, chiffres à l&apos;appui.
            </Title>
            <Lead t={t} s={{ maxWidth: 780, marginBottom: 18 }}>
              Part des contenus qui sortent avec un partenaire. Même méthode, trois univers différents.
            </Lead>
            <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 18 }}>
              {[
                { c: t.a, l: "Point de départ" },
                { c: "rgba(14,140,116,.34)", l: "Gagné avec FAR" },
                { c: "repeating-linear-gradient(115deg, rgba(14,140,116,.3) 0 7px, rgba(14,140,116,.1) 7px 14px)", l: "Objectif" },
              ].map((x) => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 22, height: 10, borderRadius: 5, background: x.c, display: "block" }} />
                  <span style={{ ...mo, fontSize: 10.5, fontWeight: 600, letterSpacing: 1.2, color: t.d, textTransform: "uppercase" }}>{x.l}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {rows.map((row) => (
                <Card
                  key={row.name}
                  t={t}
                  s={{
                    padding: "20px 24px",
                    border: row.target ? `2px solid ${t.a}` : `1px solid ${t.brd}`,
                    background: row.target ? t.cardAlt : t.card,
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "210px 1fr 200px", gap: 24, alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src={pu(row.img)}
                        alt={row.name}
                        style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: `2px solid ${t.a}` }}
                      />
                      <div>
                        <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, lineHeight: 1.2 }}>{row.name}</div>
                        {row.target && (
                          <div style={{ ...mo, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.4, color: t.a, marginTop: 4, textTransform: "uppercase" }}>
                            Toi, demain
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <FillBar t={t} from={row.from} to={row.to} target={row.target} />
                      <div style={{ ...sa, fontSize: 13, color: t.m, lineHeight: 1.45, marginTop: 10 }}>{row.note}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ ...se, fontSize: 24, fontWeight: 700, letterSpacing: "-0.035em", color: row.target ? t.a : t.c, lineHeight: 1.1 }}>
                        {row.label}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div
              style={{
                marginTop: 18,
                padding: "16px 24px",
                borderRadius: 16,
                background: t.th,
                color: t.thT,
                ...sa,
                fontSize: 15,
                lineHeight: 1.5,
                borderLeft: `5px solid ${t.a}`,
              }}
            >
              Chaque point de remplissage gagné est du CA net, sur des vidéos que tu produis déjà.
            </div>
          </div>
        );
      },
    },

    {
      title: "Cas concret · Emma",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Cas concret · FastGoodCuisine</Eyebrow>
          <Title t={t} s={{ fontSize: 40 }}>
            Emma, intégrée sans casser la vidéo.
          </Title>
          <Lead t={t} s={{ maxWidth: 820, marginBottom: 24 }}>
            Une marque hors sujet sur le papier, rendue légitime par l&apos;angle. Résultat : l&apos;audience en parle d&apos;elle-même en commentaire.
          </Lead>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 12, textTransform: "uppercase" }}>
                La vidéo
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <Ph t={t} label="Miniature vidéo" file="/grandjd/emma-thumb-1.jpg" h={130} />
                <Ph t={t} label="Plan intégration" file="/grandjd/emma-thumb-2.jpg" h={130} />
              </div>
              <Card t={t} s={{ padding: "18px 20px" }}>
                {[
                  { k: "L'angle", v: "Le sommeil comme condition de la performance en cuisine, pas un encart plaqué." },
                  { k: "Le format", v: "Intégration longue au cœur de la vidéo, écrite avec le créateur." },
                  { k: "Le résultat", v: "Une marque acceptée par l'audience, et une reconduction derrière." },
                ].map((x, i, arr) => (
                  <div key={x.k} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${t.brd}` : "none" }}>
                    <div style={{ ...mo, fontSize: 9.5, fontWeight: 700, letterSpacing: 1.4, color: t.a, marginBottom: 4, textTransform: "uppercase" }}>
                      {x.k}
                    </div>
                    <div style={{ ...sa, fontSize: 14, color: t.c, lineHeight: 1.45 }}>{x.v}</div>
                  </div>
                ))}
              </Card>
            </div>
            <div>
              <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 12, textTransform: "uppercase" }}>
                Ce qu&apos;en dit l&apos;audience
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Ph t={t} label="Capture commentaires 1" file="/grandjd/emma-comments-1.png" h={126} />
                <Ph t={t} label="Capture commentaires 2" file="/grandjd/emma-comments-2.png" h={126} />
                <Ph t={t} label="Capture commentaires 3" file="/grandjd/emma-comments-3.png" h={126} />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Intercalaire · Partenaires",
      r: (t) => (
        <ImageStatement
          t={t}
          img="/grandjd/axe-1-reportage.png"
          eyebrow="Le filtre"
          title="Des marques qui ont une raison d'être là."
          sub="Une marque entre parce qu'elle a du sens dans ton récit. Jamais parce qu'elle a mis le budget."
        />
      ),
    },

    {
      title: "Exemples potentiels",
      r: (t) => {
        const cols = "48px minmax(0,1.15fr) minmax(0,1.25fr)";
        const rows = [
          {
            n: "01",
            v: "58 jours pour filmer un animal que personne ne voit",
            brand: "Optique & capture",
            angle: "Rendre visible l'invisible",
            d: "Patience, basse lumière, longue focale. Ex. Sony, Canon, Fujifilm.",
          },
          {
            n: "02",
            v: "L'épidémie la plus étrange de France",
            brand: "Santé digitale",
            angle: "Comprendre ce qu'on ne comprend pas",
            d: "Symptômes flous, accès au soin, diagnostic. Ex. Qare, Doctolib, Alan.",
          },
          {
            n: "03",
            v: "Le lac aux squelettes",
            brand: "4x4 & mobilité",
            angle: "L'expédition avant le mystère",
            d: "Accès extrême, altitude, terrain hostile. Ex. Land Rover, Jeep, Toyota.",
          },
        ];
        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Preuve de lecture</Eyebrow>
            <Title t={t} s={{ fontSize: 38 }}>
              3 vidéos sans marque. 3 intégrations qu&apos;on aurait imaginées.
            </Title>
            <Lead t={t} s={{ fontSize: 16, maxWidth: 900, marginBottom: 24 }}>
              Trois succès diffusés sans sponsor : autant de manque à gagner. Voici ce qu&apos;on aurait activé — natif, exigeant, défendable.
            </Lead>
            <div style={{ display: "grid", gridTemplateColumns: cols, gap: 24, padding: "0 0 10px", borderBottom: `1px solid ${t.brd}` }}>
              <div />
              <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: t.d }}>VIDÉO · CATÉGORIE</div>
              <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: t.d }}>INTÉGRATION</div>
            </div>
            {rows.map((x) => (
              <div
                key={x.n}
                style={{ display: "grid", gridTemplateColumns: cols, gap: 24, alignItems: "start", padding: "18px 0", borderBottom: `1px solid ${t.brd}` }}
              >
                <div style={{ ...mo, fontSize: 15, fontWeight: 700, color: t.a, lineHeight: 1.3 }}>{x.n}</div>
                <div>
                  <div style={{ ...sa, fontSize: 15.5, fontWeight: 600, color: t.c, lineHeight: 1.35, marginBottom: 10 }}>{x.v}</div>
                  <div style={{ ...se, fontSize: 21, fontWeight: 700, letterSpacing: "-0.03em", color: t.a, lineHeight: 1.15, marginBottom: 4 }}>{x.brand}</div>
                  <div style={{ ...sa, fontSize: 13.5, fontWeight: 600, color: t.c, lineHeight: 1.35 }}>{x.angle}</div>
                </div>
                <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.5, paddingTop: 2 }}>{x.d}</div>
              </div>
            ))}
          </div>
        );
      },
    },

    {
      title: "Rémunération",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Rémunération</Eyebrow>
          <Title t={t} s={{ fontSize: 42 }}>
            15 %. La meilleure offre du marché.
          </Title>
          <Lead t={t} s={{ maxWidth: 800, marginBottom: 26 }}>
            Un taux unique, sans palier, sans frais fixes. Uniquement sur le business qu&apos;on t&apos;apporte.
          </Lead>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)", gap: 20, alignItems: "stretch" }}>
            <div
              style={{
                borderRadius: 20,
                border: `2px solid ${t.a}`,
                background: t.cardAlt,
                padding: "34px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ ...se, fontSize: 108, fontWeight: 700, letterSpacing: "-0.06em", color: t.a, lineHeight: 0.92 }}>15 %</div>
              <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: t.d, marginTop: 14, textTransform: "uppercase" }}>
                de commission
              </div>
              <div style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: t.c, marginTop: 24, lineHeight: 1.24 }}>
                Le standard du marché se situe entre 20 et 30 %.
              </div>
              <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.55, marginTop: 12 }}>
                On a fait le choix inverse : la valeur créée reste très majoritairement de ton côté.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { t: "Zéro deal, zéro frais", d: "Aucun forfait, aucun minimum. On ne gagne que si tu gagnes." },
                { t: "Uniquement le business apporté", d: "Tes deals entrants et ton réseau restent à toi, sans commission." },
                { t: "Pas d'exclusivité totale", d: "FAR s'ajoute à ce que tu as déjà. Tu gardes la main sur ta ligne édito." },
                { t: "Aucun bradage", d: "On défend ton pricing. Jamais de remise pour closer plus vite." },
              ].map((x) => (
                <Card key={x.t} t={t} s={{ padding: "18px 22px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      background: t.a,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <div>
                    <div style={{ ...se, fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.024em", color: t.c, marginBottom: 4, lineHeight: 1.25 }}>
                      {x.t}
                    </div>
                    <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5 }}>{x.d}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Merci",
      r: (t, back) => (
        <div style={{ width: "100%" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "62vh",
              minHeight: 400,
              borderRadius: 24,
              overflow: "hidden",
              background: "#12161A",
            }}
          >
            <img
              src={pu("/grandjd/axe-3-rencontres.png")}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,13,16,.72) 0%, rgba(10,13,16,.88) 100%)" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "0 40px",
              }}
            >
              <FarLogo size={92} variant="white" />
              <div style={{ ...se, fontSize: 52, fontWeight: 700, letterSpacing: "-0.04em", color: "#FFFFFF", margin: "28px 0 14px", lineHeight: 1.1 }}>
                Merci.
              </div>
              <div style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "#7FE3CE" }}>Qui veut aller loin, vient ici.</div>
              <div style={{ ...sa, fontSize: 15, color: "rgba(255,255,255,.7)", marginTop: 20 }}>Thibault Loué · FAR</div>
              {back && (
                <button
                  onClick={back}
                  style={{
                    marginTop: 32,
                    background: "#FFFFFF",
                    color: "#12161A",
                    ...sa,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "12px 30px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ← Retour
                </button>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];
}
