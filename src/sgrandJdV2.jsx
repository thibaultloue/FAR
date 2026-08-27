/**
 * Le Grand JD V2. DA Keynote claire, structure partant des besoins du créateur.
 * Agence condensée (extrait du deck Positionnement V2), puis besoins → accompagnement → preuves.
 */
import jdPortraitUrl from "./assets/grandjd/jd-portrait.jpg";
import emmaThumbUrl from "./assets/grandjd/emma/thumb.jpg";
import emmaIntegrationUrl from "./assets/grandjd/emma/integration.jpg";
import toinelagUbiThumbUrl from "./assets/grandjd/toinelag-ubi/thumb.jpg";
import cyrilAdopteThumbUrl from "./assets/grandjd/cyril-adopte/thumb.jpg";
import ex58JoursUrl from "./assets/grandjd/exemples/58-jours.jpg";
import exEpidemieUrl from "./assets/grandjd/exemples/epidemie.jpg";
import exSquelettesUrl from "./assets/grandjd/exemples/squelettes.jpg";
import teamChloeUrl from "./assets/grandjd/team/chloe.jpg";
import teamThibaultUrl from "./assets/grandjd/team/thibault.jpg";
import teamAurelieUrl from "./assets/grandjd/team/aurelie.jpg";
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

  return [
    {
      title: "Présentation",
      r: (t) => {
        const src = jdPortraitUrl;
        return (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)",
              gap: 40,
              alignItems: "stretch",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "8px 0" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 14,
                  alignSelf: "flex-start",
                  padding: "10px 14px 10px 10px",
                  borderRadius: 999,
                  background: t.card,
                  border: `1px solid ${t.brd}`,
                  boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                }}
              >
                <img
                  src={src}
                  alt="Le Grand JD"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    flexShrink: 0,
                    display: "block",
                  }}
                />
                <div style={{ width: 1, height: 22, background: t.brd, flexShrink: 0 }} />
                <FarLogo size={52} variant={t.lv} />
                <FarBeams w={72} fill={t.a} style={{ marginLeft: 2 }} />
              </div>

              <div style={{ marginTop: "auto", marginBottom: "auto", paddingRight: 12 }}>
                <div style={{ ...se, fontSize: 64, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.98, color: t.c }}>
                  Le Grand JD
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 16,
                    marginTop: 10,
                  }}
                >
                  <span style={{ ...se, fontSize: 48, fontWeight: 700, letterSpacing: "-0.04em", color: t.a, lineHeight: 1 }}>×</span>
                  <span style={{ ...se, fontSize: 56, fontWeight: 700, letterSpacing: "-0.042em", color: t.c, lineHeight: 1 }}>FAR</span>
                </div>
              </div>

              <div style={{ height: 1 }} />
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                aspectRatio: "3 / 4",
                maxHeight: 560,
                backgroundColor: "#1a1f24",
                boxShadow: "0 24px 60px rgba(18,22,26,.14)",
              }}
            >
              <img
                src={src}
                alt="Le Grand JD"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 55%, rgba(10,13,16,.35) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        );
      },
    },

    {
      title: "Manifesto",
      r: (t) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            minHeight: 0,
          }}
        >
          <div style={{ ...mo, fontSize: 12.5, fontWeight: 600, letterSpacing: 2.4, textTransform: "uppercase", color: t.d, marginBottom: 10 }}>
            MANIFESTO
          </div>
          <div style={{ ...manifestoStyle(t, "hook"), maxWidth: 900 }}>{manifestoHook}</div>
          <div style={{ maxWidth: 920, width: "100%", textAlign: "center" }}>
            {manifestoBlocks.map((block, i) => (
              <div key={i} style={manifestoStyle(t, block.k)}>
                {block.t}
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Tes besoins",
      r: (t) => {
        const rows = [
          {
            n: "01",
            t: "Développer ton CA",
            d: "En optimisant le remplissage. Tendre vers un partenaire par contenu, quand c'est pertinent, ou que le deal est intéressant.",
          },
          {
            n: "02",
            t: "Préserver ton image",
            d: "Des marques qui ont une raison d'être dans tes formats, et dans ton calendrier.",
          },
          {
            n: "03",
            t: "Préserver ton temps",
            d: "Une équipe dédiée, tout le temps disponible pour toi, et des process optimisés.",
          },
        ];
        return (
          <div style={{ width: "100%" }}>
            <Title t={t} s={{ fontSize: 32, marginBottom: 28, maxWidth: 820 }}>
              Les priorités qui nous semblent pertinentes pour toi
            </Title>
            <div>
              {rows.map((x, i) => (
                <div
                  key={x.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "100px 1fr",
                    gap: 28,
                    alignItems: "center",
                    padding: "20px 0",
                    borderTop: i === 0 ? `1px solid ${t.brd}` : "none",
                    borderBottom: `1px solid ${t.brd}`,
                  }}
                >
                  <div
                    style={{
                      ...se,
                      fontSize: 52,
                      fontWeight: 700,
                      letterSpacing: "-0.07em",
                      lineHeight: 0.9,
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${t.a}`,
                    }}
                  >
                    {x.n}
                  </div>
                  <div>
                    <div style={{ ...se, fontSize: 26, fontWeight: 700, letterSpacing: "-0.038em", color: t.c, lineHeight: 1.12, marginBottom: 6 }}>
                      {x.t}
                    </div>
                    <div style={{ ...sa, fontSize: 15, color: t.m, lineHeight: 1.45, maxWidth: 640 }}>{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      },
    },

    {
      title: "Nos 3 promesses",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Title t={t} s={{ fontSize: 42, marginBottom: 28 }}>
            Nos 3 promesses
          </Title>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[
              {
                k: "Remplissage",
                kind: "remplissage",
                h: "Remplir intelligemment.",
                d: "On construit le calendrier des mois à l'avance, avec la bonne marque au bon endroit, uniquement quand elle a sa place.",
              },
              {
                k: "Rémunération",
                n: "15 %",
                u: "de commission",
                h: "Le taux le plus bas du marché.",
                d: "L'essentiel de la valeur créée reste de ton côté.",
              },
              {
                k: "Temps",
                n: "1",
                u: "équipe dédiée",
                h: "Plus de temps pour créer.",
                d: "On absorbe tout ce qui est chronophage (prospection, négociation, contrats). Tu gardes ton temps pour créer.",
              },
            ].map((o) => (
              <Card key={o.k} t={t} s={{ borderTop: `4px solid ${t.a}`, padding: "24px 26px" }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, marginBottom: 14, textTransform: "uppercase" }}>{o.k}</div>
                {o.kind === "remplissage" ? (
                  <>
                    <div style={{ ...mo, fontSize: 13, fontWeight: 600, letterSpacing: 0.4, color: t.d, marginBottom: 8, textTransform: "none" }}>
                      Tendre vers
                    </div>
                    <div style={{ ...se, fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em", color: t.a, lineHeight: 1.05, marginBottom: 18 }}>
                      100 % de remplissage
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ ...se, fontSize: 52, fontWeight: 700, letterSpacing: "-0.05em", color: t.a, lineHeight: 1 }}>{o.n}</div>
                    <div style={{ ...mo, fontSize: 10, fontWeight: 600, letterSpacing: 1.2, color: t.d, margin: "10px 0 18px", textTransform: "uppercase" }}>{o.u}</div>
                  </>
                )}
                <div style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, marginBottom: 8, lineHeight: 1.24 }}>{o.h}</div>
                <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.5 }}>{o.d}</div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Remplissage · les formats",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Promesse 01</Eyebrow>
          <Title t={t} s={{ fontSize: 40, marginBottom: 10 }}>
            Remplir intelligemment, avec 3 leviers.
          </Title>
          <Lead t={t} s={{ maxWidth: "100%", marginBottom: 28 }}>
            Le volume compte. L&apos;angle aussi. On place chaque marque là où elle a du sens dans ton récit, avec le format qui lui correspond.
          </Lead>

          {/* Sous-onglets */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 0,
              marginBottom: 0,
              borderBottom: `2px solid ${t.brd}`,
            }}
          >
            {[
              { n: "01", t: "Intégrations" },
              { n: "02", t: "Dédiées" },
              { n: "03", t: "Opérations premium" },
            ].map((tab, i) => (
              <div
                key={tab.t}
                style={{
                  padding: "14px 18px 16px",
                  borderBottom: `3px solid ${t.a}`,
                  marginBottom: -2,
                  background: i === 0 ? t.cardAlt : "transparent",
                }}
              >
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.6, color: t.a, marginBottom: 6, textTransform: "uppercase" }}>
                  {tab.n}
                </div>
                <div style={{ ...se, fontSize: 20, fontWeight: 700, letterSpacing: "-0.028em", color: t.c, lineHeight: 1.2 }}>{tab.t}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20, alignItems: "stretch" }}>
            {[
              {
                t: "Intégrations",
                h: "La marque entre dans la vidéo.",
                d: "Remplir intelligemment : trouver l'angle qui rend la marque légitime dans un format déjà prévu. Ex. Emma × FastGoodCuisine.",
              },
              {
                t: "Dédiées",
                h: "La vidéo est la marque.",
                d: "Un épisode entier pensé pour un partenaire : hook, récit, CTA. Ex. Toinelag × Ubisoft / The Crew Motorfest.",
              },
              {
                t: "Opérations premium",
                h: "Activations à forte valeur.",
                d: "Co-brandings, expériences, opérations spéciales, quand l'audience et le brief le justifient.",
              },
            ].map((x) => (
              <Card key={x.t} t={t} s={{ padding: "22px 22px 24px", height: "100%", boxSizing: "border-box" }}>
                <div style={{ ...se, fontSize: 18, fontWeight: 700, letterSpacing: "-0.026em", color: t.a, marginBottom: 8, lineHeight: 1.25 }}>{x.h}</div>
                <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.5 }}>{x.d}</div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Cas concret · Emma",
      r: (t) => {
        const fgcAvatar = pu("/fgc.webp");
        const yt = { fontFamily: "Roboto, Arial, Helvetica, sans-serif" };
        const comments = [
          {
            color: "#6B8FCE",
            user: "@lemongoleoriginel",
            when: "il y a 7 heures",
            text: "Allo j'aimerais bien acheter votre voiture lit je voudrais l'acheter",
          },
          {
            color: "#5BA88A",
            user: "@karlo6769",
            when: "il y a 3 semaines",
            text: "C vraiment random le lit dehors j'adore 😂 😂",
          },
          {
            color: "#C48A5A",
            user: "@Lamb-m9c",
            when: "il y a 1 mois",
            text: "Incroyable, le lit, voiture",
          },
        ];
        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Cas concret · FastGoodCuisine</Eyebrow>
            <Title t={t} s={{ fontSize: 32, marginBottom: 6 }}>
              Emma, intégrée nativement sans casser le concept
            </Title>
            <Lead t={t} s={{ maxWidth: "100%", marginBottom: 10, fontSize: 14, whiteSpace: "nowrap" }}>
              Emma n&apos;avait rien à faire dans un test resto sur le papier. L&apos;angle (le lit comme véhicule McDo) la rend légitime, et l&apos;audience en parle seule en commentaire.
            </Lead>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.92fr) minmax(0,1.08fr)", gap: 16, alignItems: "start" }}>
              {/* Gauche : carte YouTube */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    ...mo,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.8,
                    color: t.d,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  Exemple d&apos;intégration pour la marque EMMA
                </div>
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
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", flexShrink: 0, background: "#0F0F0F" }}>
                    <img
                      src={emmaThumbUrl}
                      alt="Je teste les limites des restaurants"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                      <svg width="56" height="40" viewBox="0 0 68 48" aria-hidden>
                        <path
                          d="M66.52 7.74a8.53 8.53 0 0 0-6-6.04C55.25.18 34 0 34 0S12.75.18 7.48 1.7a8.53 8.53 0 0 0-6 6.04C0 13.04 0 24 0 24s0 10.96 1.48 16.26a8.53 8.53 0 0 0 6 6.04C12.75 47.82 34 48 34 48s21.25-.18 26.52-1.7a8.53 8.53 0 0 0 6-6.04C68 34.96 68 24 68 24s0-10.96-1.48-16.26z"
                          fill="#FF0000"
                        />
                        <path d="M45 24 27 14v20z" fill="#fff" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", padding: "10px 12px 12px", gap: 8 }}>
                    <div style={{ ...yt, fontSize: 14, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                      J&apos;ai Testé Les Limites De 10 Restaurants !
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <img
                          src={fgcAvatar}
                          alt=""
                          style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ ...yt, fontSize: 12, fontWeight: 600, color: "#0F0F0F", lineHeight: 1.2 }}>FastGoodCuisine</span>
                            <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden>
                              <circle cx="12" cy="12" r="10" fill="#606060" />
                              <path d="M10.2 15.4 7.1 12.3l1.2-1.2 1.9 1.9 4.5-4.5 1.2 1.2-5.7 5.7z" fill="#fff" />
                            </svg>
                          </div>
                          <div style={{ ...yt, fontSize: 10.5, color: "#606060", lineHeight: 1.2 }}>8,77 M d&apos;abonnés</div>
                        </div>
                        <div
                          style={{
                            ...yt,
                            marginLeft: 4,
                            flexShrink: 0,
                            background: "#0F0F0F",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 600,
                            padding: "6px 10px",
                            borderRadius: 999,
                            lineHeight: 1,
                          }}
                        >
                          S&apos;abonner
                        </div>
                      </div>

                      <div
                        style={{
                          ...yt,
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          background: "#F2F2F2",
                          borderRadius: 999,
                          padding: "5px 9px",
                          fontSize: 11,
                          fontWeight: 500,
                          color: "#0F0F0F",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M18.77 11h-4.05l.58-3.59.03-.32c0-.41-.17-.8-.44-1.06L14.09 5.5 9.41 10.18A1.5 1.5 0 0 0 9 11.23V18a1.5 1.5 0 0 0 1.5 1.5h6.28a2 2 0 0 0 1.87-1.31l2.26-5.29A1.75 1.75 0 0 0 18.77 11zM5.5 19.5A1.5 1.5 0 0 0 7 18v-6.5A1.5 1.5 0 0 0 5.5 10h-1A1.5 1.5 0 0 0 3 11.5V18a1.5 1.5 0 0 0 1.5 1.5h1z" />
                        </svg>
                        <span>127 k</span>
                      </div>
                    </div>

                    <div style={{ background: "#F2F2F2", borderRadius: 10, padding: "8px 10px" }}>
                      <div style={{ ...yt, fontSize: 11.5, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.25, marginBottom: 2 }}>
                        6,8 M de vues · il y a 1 mois
                      </div>
                      <div style={{ ...yt, fontSize: 11, color: "#0F0F0F", lineHeight: 1.35 }}>
                        Soldes Emma jusqu&apos;à -50% + 10% avec le code FASTGOOD.{" "}
                        <span style={{ color: "#065FD4" }}>emma.fr…</span>{" "}
                        <span style={{ fontWeight: 700 }}>…afficher plus</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Droite : plan + commentaires remontés */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,0.95fr)", gap: 12, alignItems: "center" }}>
                  <div>
                    <div
                      style={{
                        ...mo,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1.8,
                        color: t.d,
                        marginBottom: 4,
                        textTransform: "uppercase",
                        lineHeight: 1.3,
                      }}
                    >
                      Plan d&apos;intégration
                    </div>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={emmaIntegrationUrl}
                        alt="Plan intégration"
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                      />
                    </div>
                    <div style={{ ...sa, fontSize: 11.5, fontStyle: "italic", color: t.m, lineHeight: 1.3, marginTop: 4 }}>
                      Mc Drive en voiture-matelas EMMA
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 8, paddingTop: 12 }}>
                    {[
                      { t: "L'angle", d: "Le lit devient le véhicule de l'expérience McDo." },
                      { t: "Le format", d: "Intégration longue, écrite avec le créateur." },
                      { t: "Le résultat", d: "L'audience reprend le produit en commentaire." },
                    ].map((x) => (
                      <div key={x.t} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: t.a,
                            marginTop: 6,
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div style={{ ...sa, fontSize: 12.5, fontWeight: 700, color: t.c, lineHeight: 1.2, marginBottom: 1 }}>{x.t}</div>
                          <div style={{ ...sa, fontSize: 12, color: t.m, lineHeight: 1.3 }}>{x.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.8, color: t.d, textTransform: "uppercase" }}>
                  Ce qu&apos;en dit l&apos;audience
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 12,
                    border: `1px solid ${t.brd}`,
                    background: t.card,
                    overflow: "hidden",
                    boxShadow: t.cS,
                  }}
                >
                  {comments.map((c, i) => (
                    <div
                      key={c.user}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "28px minmax(0,1fr)",
                        columnGap: 8,
                        alignItems: "start",
                        padding: "8px 12px",
                        borderBottom: i < comments.length - 1 ? `1px solid ${t.brd}` : "none",
                      }}
                    >
                      <div
                        aria-hidden
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: c.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="8.2" r="3.4" fill="rgba(255,255,255,.92)" />
                          <path d="M5.2 19.2c.6-3.4 3.2-5.2 6.8-5.2s6.2 1.8 6.8 5.2" fill="rgba(255,255,255,.92)" />
                        </svg>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 1, flexWrap: "wrap" }}>
                          <span style={{ ...sa, fontSize: 11.5, fontWeight: 700, color: t.c, lineHeight: 1.2 }}>{c.user}</span>
                          <span style={{ ...sa, fontSize: 11, color: t.d, lineHeight: 1.2 }}>{c.when}</span>
                        </div>
                        <div style={{ ...sa, fontSize: 12.5, color: t.c, lineHeight: 1.3 }}>{c.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Cas concret · Ubisoft",
      r: (t) => {
        const toineAvatar = pu("/toinelag.webp");
        const yt = { fontFamily: "Roboto, Arial, Helvetica, sans-serif" };
        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Cas concret · Toinelag × Ubisoft</Eyebrow>
            <Title t={t} s={{ fontSize: 38, marginBottom: 10 }}>
              Une vidéo dédiée à la marque, du concept au call-to-action.
            </Title>
            <Lead t={t} s={{ maxWidth: "100%", marginBottom: 18 }}>
              Un format pensé pour Ubisoft de bout en bout : angle, gameplay, saison The Crew Motorfest.
            </Lead>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.95fr) minmax(0,1.05fr)", gap: 20, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <div
                  style={{
                    ...mo,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.8,
                    color: t.d,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  Exemple de vidéo dédiée
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "#FFFFFF",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,.08)",
                    boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 6px 18px rgba(0,0,0,.06)",
                    minHeight: 0,
                  }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", flexShrink: 0, background: "#0F0F0F" }}>
                    <img
                      src={toinelagUbiThumbUrl}
                      alt="Je Ressens la Douleur des Accidents dans la Vraie Vie"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                      <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden>
                        <path
                          d="M66.52 7.74a8.53 8.53 0 0 0-6-6.04C55.25.18 34 0 34 0S12.75.18 7.48 1.7a8.53 8.53 0 0 0-6 6.04C0 13.04 0 24 0 24s0 10.96 1.48 16.26a8.53 8.53 0 0 0 6 6.04C12.75 47.82 34 48 34 48s21.25-.18 26.52-1.7a8.53 8.53 0 0 0 6-6.04C68 34.96 68 24 68 24s0-10.96-1.48-16.26z"
                          fill="#FF0000"
                        />
                        <path d="M45 24 27 14v20z" fill="#fff" />
                      </svg>
                    </div>
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 14px 14px", gap: 10, minHeight: 0 }}>
                    <div style={{ ...yt, fontSize: 15, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                      Je Ressens la Douleur des Accidents dans la Vraie Vie
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <img
                          src={toineAvatar}
                          alt=""
                          style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ ...yt, fontSize: 12.5, fontWeight: 600, color: "#0F0F0F", lineHeight: 1.2 }}>Toinelag Gaming</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                              <circle cx="12" cy="12" r="10" fill="#606060" />
                              <path d="M10.2 15.4 7.1 12.3l1.2-1.2 1.9 1.9 4.5-4.5 1.2 1.2-5.7 5.7z" fill="#fff" />
                            </svg>
                          </div>
                          <div style={{ ...yt, fontSize: 11, color: "#606060", lineHeight: 1.2 }}>853 k d&apos;abonnés</div>
                        </div>
                        <div
                          style={{
                            ...yt,
                            marginLeft: 4,
                            flexShrink: 0,
                            background: "#0F0F0F",
                            color: "#fff",
                            fontSize: 11.5,
                            fontWeight: 600,
                            padding: "7px 12px",
                            borderRadius: 999,
                            lineHeight: 1,
                          }}
                        >
                          S&apos;abonner
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <div
                          style={{
                            ...yt,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            background: "#F2F2F2",
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontSize: 11.5,
                            fontWeight: 500,
                            color: "#0F0F0F",
                            lineHeight: 1,
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M18.77 11h-4.05l.58-3.59.03-.32c0-.41-.17-.8-.44-1.06L14.09 5.5 9.41 10.18A1.5 1.5 0 0 0 9 11.23V18a1.5 1.5 0 0 0 1.5 1.5h6.28a2 2 0 0 0 1.87-1.31l2.26-5.29A1.75 1.75 0 0 0 18.77 11zM5.5 19.5A1.5 1.5 0 0 0 7 18v-6.5A1.5 1.5 0 0 0 5.5 10h-1A1.5 1.5 0 0 0 3 11.5V18a1.5 1.5 0 0 0 1.5 1.5h1z" />
                          </svg>
                          <span>25 k</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ flex: 1, background: "#F2F2F2", borderRadius: 12, padding: "10px 12px", minHeight: 0 }}>
                      <div style={{ ...yt, fontSize: 12, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.3, marginBottom: 4 }}>
                        3,3 M de vues · il y a 5 mois
                      </div>
                      <div style={{ ...yt, fontSize: 11.5, color: "#0F0F0F", lineHeight: 1.45 }}>
                        Je teste un simulateur d&apos;accidents ! La nouvelle saison de The Crew Motorfest est disponible gratuitement. La vidéo est réalisée en partenariat avec Ubisoft.{" "}
                        <span style={{ fontWeight: 700 }}>…afficher plus</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: "100%" }}>
                <div
                  style={{
                    ...mo,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.8,
                    color: t.d,
                    marginBottom: 0,
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  Pourquoi ça marche
                </div>

                {[
                  {
                    t: "L'angle",
                    d: "Ressentir un accident pour de vrai, et rendre tangible la casse, la vitesse et le fun de The Crew Motorfest.",
                  },
                  {
                    t: "Le format",
                    d: "Un épisode entier écrit pour Ubisoft : hook sensoriel, passage jeu, saison + Trackforge. 1 seule marque, du premier au dernier plan.",
                  },
                  {
                    t: "Le résultat",
                    d: "3,3 M de vues, partenariat annoncé clairement, CTA produit (saison gratuite + circuits à tester).",
                  },
                ].map((x) => (
                  <Card key={x.t} t={t} s={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: t.a,
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ ...sa, fontSize: 15, fontWeight: 700, color: t.c, lineHeight: 1.25, marginBottom: 4 }}>{x.t}</div>
                        <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.45 }}>{x.d}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Cas concret · Opération premium",
      r: (t) => {
        const cyrilAvatar = pu("/cyrilmp4.webp");
        const yt = { fontFamily: "Roboto, Arial, Helvetica, sans-serif" };
        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Cas concret · Opération premium · CYRILmp4 × Adopte</Eyebrow>
            <Title t={t} s={{ fontSize: 36, marginBottom: 10 }}>
              Une expérience brand, portée par deux créateurs.
            </Title>
            <Lead t={t} s={{ maxWidth: "100%", marginBottom: 18 }}>
              Adopte × Cyril, avec toi en guest : un concept date / restos de stars, bien au-delà d&apos;une intégration classique.
            </Lead>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.95fr) minmax(0,1.05fr)", gap: 20, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
                <div
                  style={{
                    ...mo,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.8,
                    color: t.d,
                    marginBottom: 4,
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  Exemple d&apos;opération premium
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "#FFFFFF",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: "1px solid rgba(0,0,0,.08)",
                    boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 6px 18px rgba(0,0,0,.06)",
                    minHeight: 0,
                  }}
                >
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", flexShrink: 0, background: "#0F0F0F" }}>
                    <img
                      src={cyrilAdopteThumbUrl}
                      alt="La vérité sur les restaurants de Stars (ft. LE GRAND JD)"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                      <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden>
                        <path
                          d="M66.52 7.74a8.53 8.53 0 0 0-6-6.04C55.25.18 34 0 34 0S12.75.18 7.48 1.7a8.53 8.53 0 0 0-6 6.04C0 13.04 0 24 0 24s0 10.96 1.48 16.26a8.53 8.53 0 0 0 6 6.04C12.75 47.82 34 48 34 48s21.25-.18 26.52-1.7a8.53 8.53 0 0 0 6-6.04C68 34.96 68 24 68 24s0-10.96-1.48-16.26z"
                          fill="#FF0000"
                        />
                        <path d="M45 24 27 14v20z" fill="#fff" />
                      </svg>
                    </div>
                  </div>

                  <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 14px 14px", gap: 10, minHeight: 0 }}>
                    <div style={{ ...yt, fontSize: 15, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                      La vérité sur les restaurants de Stars (ft. LE GRAND JD)
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <img
                          src={cyrilAvatar}
                          alt=""
                          style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ ...yt, fontSize: 12.5, fontWeight: 600, color: "#0F0F0F", lineHeight: 1.2 }}>CYRILmp4</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                              <circle cx="12" cy="12" r="10" fill="#606060" />
                              <path d="M10.2 15.4 7.1 12.3l1.2-1.2 1.9 1.9 4.5-4.5 1.2 1.2-5.7 5.7z" fill="#fff" />
                            </svg>
                          </div>
                          <div style={{ ...yt, fontSize: 11, color: "#606060", lineHeight: 1.2 }}>5 M d&apos;abonnés</div>
                        </div>
                        <div
                          style={{
                            ...yt,
                            marginLeft: 4,
                            flexShrink: 0,
                            background: "#0F0F0F",
                            color: "#fff",
                            fontSize: 11.5,
                            fontWeight: 600,
                            padding: "7px 12px",
                            borderRadius: 999,
                            lineHeight: 1,
                          }}
                        >
                          S&apos;abonner
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <div
                          style={{
                            ...yt,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            background: "#F2F2F2",
                            borderRadius: 999,
                            padding: "6px 10px",
                            fontSize: 11.5,
                            fontWeight: 500,
                            color: "#0F0F0F",
                            lineHeight: 1,
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M18.77 11h-4.05l.58-3.59.03-.32c0-.41-.17-.8-.44-1.06L14.09 5.5 9.41 10.18A1.5 1.5 0 0 0 9 11.23V18a1.5 1.5 0 0 0 1.5 1.5h6.28a2 2 0 0 0 1.87-1.31l2.26-5.29A1.75 1.75 0 0 0 18.77 11zM5.5 19.5A1.5 1.5 0 0 0 7 18v-6.5A1.5 1.5 0 0 0 5.5 10h-1A1.5 1.5 0 0 0 3 11.5V18a1.5 1.5 0 0 0 1.5 1.5h1z" />
                          </svg>
                          <span>30 k</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ flex: 1, background: "#F2F2F2", borderRadius: 12, padding: "10px 12px", minHeight: 0 }}>
                      <div style={{ ...yt, fontSize: 12, fontWeight: 700, color: "#0F0F0F", lineHeight: 1.3, marginBottom: 4 }}>
                        905 k de vues · Collaboration commerciale Adopte
                      </div>
                      <div style={{ ...yt, fontSize: 11.5, color: "#0F0F0F", lineHeight: 1.45 }}>
                        Je teste et découvre ce que cachent les restos de célébrités. Pour rencontrer de belles personnes sur Adopte : code CYRILMP4. ft. LE GRAND JD.{" "}
                        <span style={{ fontWeight: 700 }}>…afficher plus</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: "100%" }}>
                <div
                  style={{
                    ...mo,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.8,
                    color: t.d,
                    marginBottom: 0,
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  Pourquoi ça marche
                </div>

                {[
                  {
                    t: "L'angle",
                    d: "Un date en restos de stars : expérience réelle, conversation, découverte. Adopte s'inscrit dans le récit, pas en overlay.",
                  },
                  {
                    t: "Le format",
                    d: "Opération premium : concept brand + guest créateur. Tu incarnes l'expérience avec Cyril, la marque porte le CTA.",
                  },
                  {
                    t: "Le résultat",
                    d: "905 k de vues, collab commerciale claire, code promo Adopte. Preuve qu'un format expérience tient pour une marque et pour toi.",
                  },
                ].map((x) => (
                  <Card key={x.t} t={t} s={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: t.a,
                          marginTop: 8,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ ...sa, fontSize: 15, fontWeight: 700, color: t.c, lineHeight: 1.25, marginBottom: 4 }}>{x.t}</div>
                        <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.45 }}>{x.d}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );
      },
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
            note: "Marques 100 % sélectionnées par Cyril lui-même.",
          },
          {
            name: "FastGoodCuisine",
            img: "/fgc.webp",
            from: 0,
            to: 66,
            label: "0 % → 66 %",
            note: "Année 1 : de 0 à 66 %. Non représentatif : il souhaite conserver certaines vidéos sans partenaire.",
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
            img: jdPortraitUrl,
            from: 28,
            to: 66,
            label: "~28 % → objectif 66 % année 1",
            note: "Le potentiel le plus ouvert du roster : la majorité de tes vidéos partent encore sans partenaire.",
            target: true,
          },
        ];
        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Remplissage · preuves</Eyebrow>
            <Title t={t} s={{ fontSize: 36, marginBottom: 8 }}>
              Ce qu&apos;on sait faire, chiffres à l&apos;appui.
            </Title>
            <Lead t={t} s={{ maxWidth: 780, marginBottom: 12 }}>
              Part des contenus qui sortent avec un partenaire. Même méthode, 4 univers différents.
            </Lead>
            <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 12 }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rows.map((row) => (
                <Card
                  key={row.name}
                  t={t}
                  s={{
                    padding: "14px 20px",
                    border: row.target ? `2px solid ${t.a}` : `1px solid ${t.brd}`,
                    background: row.target ? t.cardAlt : t.card,
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "210px 1fr 200px", gap: 24, alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img
                        src={/\/assets\//.test(row.img) ? row.img : pu(row.img)}
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
                marginTop: 12,
                padding: "12px 20px",
                borderRadius: 14,
                background: t.th,
                color: t.thT,
                ...sa,
                fontSize: 14,
                lineHeight: 1.45,
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
      title: "Notre méthode",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Title t={t} s={{ fontSize: 38, marginBottom: 10 }}>
            Notre méthode qui nous permet de développer.
          </Title>
          <Lead t={t} s={{ maxWidth: 720, marginBottom: 28 }}>
            Simple, lisible, et calée sur ta façon de travailler.
          </Lead>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                n: "01",
                t: "Calendrier éditorial clair",
                d: "Posé suffisamment en amont pour placer les bonnes marques au bon moment, sans précipitation.",
              },
              {
                n: "02",
                t: "Points hebdo ou bi-mensuels",
                d: "Selon tes préférences. On passe les encours, on tranche, on avance.",
              },
              {
                n: "03",
                t: "Concepts brand et créateur friendly",
                d: "On va chercher des opérations premium de façon proactive. Possibilité de se rétracter quand on veut.",
              },
              {
                n: "04",
                t: "Brainstorm des intégrations",
                d: "On peut imaginer ensemble les différentes intégrations à effectuer, avant d'aller voir les marques.",
              },
              {
                n: "05",
                t: "Ways of working sur-mesure",
                d: "On s'adapte à toi : rythme, outils, niveau d'implication. Pas un process figé.",
              },
            ].map((x) => (
              <Card
                key={x.n}
                t={t}
                s={{
                  padding: "16px 22px",
                  display: "grid",
                  gridTemplateColumns: "56px 240px 1fr",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em", color: t.a, lineHeight: 1 }}>{x.n}</div>
                <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, lineHeight: 1.25 }}>{x.t}</div>
                <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.5 }}>{x.d}</div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },

    {
      title: "Exemples potentiels",
      r: (t) => {
        const yt = { fontFamily: "Roboto, Arial, Helvetica, sans-serif" };
        const YtPlay = () => (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <svg width="44" height="30" viewBox="0 0 68 48" aria-hidden>
              <path
                d="M66.52 7.74a8.53 8.53 0 0 0-6-6.04C55.25.18 34 0 34 0S12.75.18 7.48 1.7a8.53 8.53 0 0 0-6 6.04C0 13.04 0 24 0 24s0 10.96 1.48 16.26a8.53 8.53 0 0 0 6 6.04C12.75 47.82 34 48 34 48s21.25-.18 26.52-1.7a8.53 8.53 0 0 0 6-6.04C68 34.96 68 24 68 24s0-10.96-1.48-16.26z"
                fill="#FF0000"
              />
              <path d="M45 24 27 14v20z" fill="#fff" />
            </svg>
          </div>
        );
        const premium = [
          {
            thumb: ex58JoursUrl,
            v: "58 JOURS POUR FILMER UN ANIMAL QUE PERSONNE NE VOIT",
            views: "1,5 M de vues",
            when: "il y a 5 mois",
            likes: "114 k",
            brand: "Optique & capture",
            angle: "Rendre visible l'invisible",
            d: "Patience, basse lumière, longue focale. Ex. Sony, Canon, Fujifilm.",
            yt: ["Rhinoshield", "Shopify"],
          },
          {
            thumb: exEpidemieUrl,
            v: "L'ÉPIDÉMIE LA PLUS ÉTRANGE DE FRANCE",
            views: "505 k de vues",
            when: "il y a 10 mois",
            likes: "25 k",
            brand: "Santé digitale",
            angle: "Comprendre ce qu'on ne comprend pas",
            d: "Symptômes flous, accès au soin, diagnostic. Ex. Qare, Doctolib, Alan.",
            yt: ["Holy", "Odoo"],
          },
          {
            thumb: exSquelettesUrl,
            v: "LE LAC AUX SQUELETTES",
            views: "1,2 M de vues",
            when: "il y a 10 mois",
            likes: "53 k",
            brand: "4x4 & mobilité",
            angle: "L'expédition avant le mystère",
            d: "Accès extrême, altitude, terrain hostile. Ex. Land Rover, Jeep, Toyota.",
            yt: ["Revolut", "Trade Republic"],
          },
        ];
        return (
          <div style={{ width: "100%" }}>
            <Title t={t} s={{ fontSize: 28, marginBottom: 4 }}>
              3 intégrations qu&apos;on aurait imaginées.
            </Title>
            <Lead t={t} s={{ fontSize: 13, maxWidth: 820, marginBottom: 10 }}>
              Pour chaque vidéo : 2 pistes. Premium envisagée, ou YouTube-friendly.
            </Lead>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12, alignItems: "stretch" }}>
              {premium.map((x) => (
                <div key={x.v} style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      background: "#FFFFFF",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid rgba(0,0,0,.08)",
                      boxShadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.05)",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#0F0F0F" }}>
                      <img src={x.thumb} alt={x.v} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <YtPlay />
                    </div>
                    <div style={{ padding: "6px 8px 8px" }}>
                      <div
                        style={{
                          ...yt,
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#0F0F0F",
                          lineHeight: 1.25,
                          letterSpacing: "-0.01em",
                          marginBottom: 4,
                          height: 28,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {x.v}
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <img
                          src={jdPortraitUrl}
                          alt=""
                          style={{ width: 20, height: 20, borderRadius: "50%", objectFit: "cover", objectPosition: "center top", flexShrink: 0, display: "block" }}
                        />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ ...yt, fontSize: 10, fontWeight: 600, color: "#0F0F0F", lineHeight: 1.15 }}>LE GRAND JD</div>
                          <div style={{ ...yt, fontSize: 9, color: "#606060", lineHeight: 1.2 }}>
                            {x.views} · {x.when}
                          </div>
                        </div>
                        <div
                          style={{
                            ...yt,
                            flexShrink: 0,
                            background: "#F2F2F2",
                            borderRadius: 999,
                            padding: "3px 6px",
                            fontSize: 9,
                            fontWeight: 500,
                            color: "#0F0F0F",
                            lineHeight: 1,
                          }}
                        >
                          👍 {x.likes}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div aria-hidden style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4px 0", color: t.a, flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4v14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      <path d="M6.5 14.5 12 20l5.5-5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div
                      style={{
                        padding: "8px 10px 10px",
                        borderRadius: 10,
                        background: t.cardAlt,
                        border: `1px solid ${t.a}`,
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ ...mo, fontSize: 8, fontWeight: 700, letterSpacing: 1.1, color: t.a, textTransform: "uppercase", marginBottom: 4 }}>
                        Marques premium envisagées
                      </div>
                      <div style={{ ...se, fontSize: 13, fontWeight: 700, letterSpacing: "-0.03em", color: t.c, lineHeight: 1.15, marginBottom: 2 }}>
                        {x.brand}
                      </div>
                      <div style={{ ...sa, fontSize: 11, fontWeight: 600, color: t.c, lineHeight: 1.25, marginBottom: 2 }}>{x.angle}</div>
                      <div style={{ ...sa, fontSize: 11, color: t.m, lineHeight: 1.3 }}>{x.d}</div>
                    </div>

                    <div
                      style={{
                        ...mo,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                        color: t.d,
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1,
                      }}
                    >
                      ou
                    </div>

                    <div
                      style={{
                        padding: "8px 10px 10px",
                        borderRadius: 10,
                        background: t.card,
                        border: `1px solid ${t.brd}`,
                        boxSizing: "border-box",
                      }}
                    >
                      <div style={{ ...mo, fontSize: 8, fontWeight: 700, letterSpacing: 1.1, color: t.d, textTransform: "uppercase", marginBottom: 6 }}>
                        Marques YouTube-friendly
                      </div>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {x.yt.map((b) => (
                          <span
                            key={b}
                            style={{
                              ...se,
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: "-0.02em",
                              color: t.c,
                              padding: "5px 8px",
                              borderRadius: 7,
                              background: t.cardAlt,
                              border: `1px solid ${t.brd}`,
                              lineHeight: 1,
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      },
    },

    {
      title: "Rémunération",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Eyebrow t={t}>Promesse 02</Eyebrow>
          <Title t={t} s={{ fontSize: 42, marginBottom: 26 }}>
            La meilleure offre du marché.
          </Title>
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
                height: "100%",
                boxSizing: "border-box",
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
                La valeur créée reste très majoritairement de ton côté.
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%", minHeight: "100%" }}>
              {[
                { t: "0 deal, 0 frais", d: "Aucun engagement. Tu pars quand tu le souhaites." },
                { t: "Exclusivité ou non-exclusivité", d: "Aucune obligation. On souhaite trouver la meilleure formule pour s'inscrire avec toi sur le long terme." },
                { t: "Aucun bradage", d: "On défend ton pricing, y compris sous pression de close." },
              ].map((x) => (
                <Card
                  key={x.t}
                  t={t}
                  s={{
                    padding: "18px 22px",
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    flex: 1,
                    minHeight: 0,
                    boxSizing: "border-box",
                  }}
                >
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
      title: "Simulation",
      r: (t) => {
        // 27 vidéos · 27,5 k€ / vidéo remplie (moyenne 25–30 k€)
        // n-1 : 33% → 9 remplies → 247,5 k€
        // n   : 66% → 18 remplies → 495 k€ brut · FAR 15% = 74 k€ · net 421 k€
        // gain sec : +173 k€
        const col = (label, rows, accent) => (
          <div
            style={{
              borderRadius: 20,
              border: `1px solid ${accent ? t.a : t.brd}`,
              background: accent ? t.cardAlt : t.card,
              padding: "26px 28px",
              boxShadow: t.cS,
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ ...mo, fontSize: 11, fontWeight: 700, letterSpacing: 1.8, color: accent ? t.a : t.d, textTransform: "uppercase", marginBottom: 18 }}>
              {label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
              {rows.map((r) => (
                <div key={r.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                  <div style={{ ...sa, fontSize: 14, color: t.m, lineHeight: 1.3 }}>{r.k}</div>
                  <div style={{ ...se, fontSize: r.big ? 28 : 18, fontWeight: 700, letterSpacing: "-0.03em", color: r.accent ? t.a : t.c, lineHeight: 1.15, textAlign: "right", whiteSpace: "nowrap" }}>
                    {r.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Simulation</Eyebrow>
            <Title t={t} s={{ fontSize: 36, marginBottom: 8 }}>
              Un gain sec, sans produire plus.
            </Title>
            <Lead t={t} s={{ fontSize: 15, maxWidth: "100%", marginBottom: 22 }}>
              Même volume de vidéos. Moins de charge commerciale. Hypothèses : 27 vidéos · ~27,5 k€ de CA moyen par vidéo remplie (fourchette 25–30 k€) · commission FAR 15 %.
            </Lead>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: 0, alignItems: "stretch", marginBottom: 18 }}>
              {col("Année n-1", [
                { k: "Vidéos", v: "27" },
                { k: "Remplissage", v: "33 %" },
                { k: "Vidéos remplies", v: "9" },
                { k: "CA créateur", v: "248 k€", big: true },
              ])}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ ...se, fontSize: 28, fontWeight: 700, color: t.a, lineHeight: 1 }}>→</div>
              </div>
              {col(
                "Année n · avec FAR",
                [
                  { k: "Vidéos", v: "27" },
                  { k: "Remplissage", v: "66 %  ·  +100 %", accent: true },
                  { k: "Vidéos remplies", v: "18  ·  +100 %" },
                  { k: "CA brut", v: "495 k€" },
                  { k: "Commission FAR (15 %)", v: "74 k€" },
                  { k: "CA net créateur", v: "421 k€  ·  +70 %", big: true, accent: true },
                ],
                true,
              )}
            </div>

            <div
              style={{
                borderRadius: 16,
                background: t.c,
                color: "#FFFFFF",
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ ...sa, fontSize: 15, color: "rgba(255,255,255,.78)", lineHeight: 1.45, maxWidth: 520 }}>
                Gain sec, commission déjà déduite. Prospection, négo et contrats pris en charge : tu gardes ton temps pour créer.
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ ...mo, fontSize: 10, fontWeight: 700, letterSpacing: 1.6, color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginBottom: 6 }}>
                  Gain sec année n
                </div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "flex-end", gap: 14 }}>
                  <div style={{ ...se, fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em", color: "#7FE3CE", lineHeight: 1 }}>+173 k€</div>
                  <div style={{ ...se, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "rgba(127,227,206,.85)", lineHeight: 1 }}>+70 %</div>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Promesse 03",
      r: (t) => {
        const Person = ({ name, role, img, size = 100, accent }) => (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minWidth: 0 }}>
            <div
              style={{
                width: size,
                height: size,
                borderRadius: "50%",
                overflow: "hidden",
                border: accent ? `2px solid ${t.a}` : `1px solid ${t.brd}`,
                background: "#e8e6e2",
                marginBottom: 12,
                opacity: accent ? 1 : 0.9,
              }}
            >
              <img
                src={img}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: accent ? "none" : "grayscale(1)",
                }}
              />
            </div>
            <div style={{ ...se, fontSize: 17, fontWeight: 700, letterSpacing: "-0.026em", color: t.c, lineHeight: 1.15, marginBottom: 4 }}>{name}</div>
            <div style={{ ...mo, fontSize: 10.5, fontWeight: 600, letterSpacing: 1.1, color: accent ? t.a : t.d, textTransform: "uppercase" }}>{role}</div>
          </div>
        );

        return (
          <div style={{ width: "100%" }}>
            <Eyebrow t={t}>Promesse 03</Eyebrow>
            <Title t={t} s={{ fontSize: 40, marginBottom: 10 }}>
              1 équipe dédiée, toujours dispo.
            </Title>
            <Lead t={t} s={{ maxWidth: 640, marginBottom: 40 }}>
              Capable de se relayer sans rupture de suivi.
            </Lead>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 48px minmax(0,1fr)",
                gap: 0,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Person name="Le Grand JD" role="Créateur" img={jdPortraitUrl} size={108} accent />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden>
                <svg width="36" height="16" viewBox="0 0 36 16" fill="none">
                  <path d="M2 8h28" stroke={t.a} strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 2.5 32 8l-8 5.5" stroke={t.a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 20,
                  alignItems: "start",
                  padding: "22px 18px",
                  borderRadius: 20,
                  border: `1px solid ${t.brd}`,
                  background: t.card,
                  boxShadow: t.cS,
                }}
              >
                <Person name="Chloé" role="Talent manager" img={teamChloeUrl} />
                <Person name="Thibault" role="Head of creator partnerships" img={teamThibaultUrl} />
                <Person name="Aurélie" role="CEO" img={teamAurelieUrl} />
              </div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Process",
      r: (t) => {
        const W = 1200;
        const H = 520;
        const topY = 168;
        const botY = 340;
        const railX0 = 36;
        const railX1 = 1040;
        const ink = t.c;
        const T = { def: 90, disc: 300, aj: 470, int: 680, pub: 860 };
        const B = {
          prosp: 90,
          pres: 185,
          nego: 275,
          offre: 365,
          contrat: 470,
          brief: 580,
          valid: 700,
          fact: 810,
          suivi: 900,
          bilan: 980,
          rel: 1055,
        };
        const topPts = Object.values(T);
        const botPts = Object.values(B);
        const shorten = (x1, y1, x2, y2, pad = 11) => {
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.hypot(dx, dy) || 1;
          return [x1 + (dx / len) * pad, y1 + (dy / len) * pad, x2 - (dx / len) * pad, y2 - (dy / len) * pad];
        };
        const headPath = (x1, y1, x2, y2, s = 9) => {
          const a = Math.atan2(y2 - y1, x2 - x1);
          const p1x = x2 - s * Math.cos(a - 0.5);
          const p1y = y2 - s * Math.sin(a - 0.5);
          const p2x = x2 - s * Math.cos(a + 0.5);
          const p2y = y2 - s * Math.sin(a + 0.5);
          return `M${x2} ${y2} L${p1x} ${p1y} L${p2x} ${p2y} Z`;
        };
        const Arrow = ({ x1, y1, x2, y2, dashed, both }) => {
          const [sx, sy, ex, ey] = shorten(x1, y1, x2, y2);
          return (
            <g>
              <line
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke={t.a}
                strokeWidth={dashed ? 1.8 : 2.4}
                strokeDasharray={dashed ? "6 5" : undefined}
                strokeLinecap="round"
              />
              <path d={headPath(sx, sy, ex, ey)} fill={t.a} />
              {both && <path d={headPath(ex, ey, sx, sy)} fill={t.a} />}
            </g>
          );
        };

        return (
          <div style={{ width: "100%" }}>
            <Title t={t} s={{ fontSize: 28, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: 6, maxWidth: "100%", lineHeight: 1.12 }}>
              Notre objectif, minimiser la sollicitation des équipes du Grand JD
            </Title>
            <Lead t={t} s={{ fontSize: 14, maxWidth: 900, marginBottom: 14 }}>
              FAR porte le commercial de bout en bout. Toi, tu restes sur la création, aux seuls moments qui comptent.
            </Lead>

            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: W,
                aspectRatio: `${W} / ${H}`,
                borderRadius: 18,
                background: "#FFFFFF",
                border: `1px solid ${t.brd}`,
                boxShadow: t.cS,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", inset: 0, display: "block" }}
                aria-hidden
              >
                {/* Rails */}
                <line x1={railX0} y1={topY} x2={railX1} y2={topY} stroke={ink} strokeWidth="2.5" strokeLinecap="round" />
                <line x1={railX0} y1={botY} x2={railX1} y2={botY} stroke={ink} strokeWidth="2.5" strokeLinecap="round" />

                <Arrow x1={T.def} y1={topY} x2={B.prosp} y2={botY} dashed />
                <Arrow x1={T.disc} y1={topY} x2={B.offre} y2={botY} both />
                <Arrow x1={B.offre} y1={botY} x2={T.aj} y2={topY} dashed />
                <Arrow x1={T.aj} y1={topY} x2={B.contrat} y2={botY} dashed />
                <Arrow x1={B.brief} y1={botY} x2={T.int} y2={topY} dashed />
                <Arrow x1={T.int} y1={topY} x2={B.valid} y2={botY} dashed />
                <Arrow x1={B.valid} y1={botY} x2={T.pub} y2={topY} dashed />

                {topPts.map((x) => (
                  <circle key={`t${x}`} cx={x} cy={topY} r="5" fill={ink} />
                ))}
                {botPts.map((x) => (
                  <circle key={`b${x}`} cx={x} cy={botY} r="5" fill={ink} />
                ))}
              </svg>

              {/* Labels scaled to same box */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", containerType: "size" }}>
                  {/* Use % based on W/H */}
                  {[
                    { x: T.def, y: topY, a: "bottom", w: 128, t: "Définition des contenus" },
                    { x: T.disc, y: topY, a: "bottom", w: 150, t: <>Discussion du projet<br />(call de 15 min)</> },
                    { x: T.aj, y: topY, a: "bottom", w: 100, t: "Ajustement" },
                    { x: T.int, y: topY, a: "bottom", w: 140, t: "Intégration dans le contenu" },
                    { x: T.pub, y: topY, a: "bottom", w: 100, t: "Publication" },
                    { x: B.prosp, y: botY, a: "top", w: 100, t: "Prospection" },
                    { x: B.pres, y: botY, a: "top", w: 120, t: "Présentation des marques" },
                    { x: B.nego, y: botY, a: "top", w: 100, t: "Négociation" },
                    { x: B.offre, y: botY, a: "top", w: 100, t: "Offre initiale" },
                    { x: B.contrat, y: botY, a: "top", w: 80, t: "Contrat" },
                    { x: B.brief, y: botY, a: "top", w: 100, t: "Brief + script" },
                    { x: B.valid, y: botY, a: "top", w: 140, t: "Validation client + modifications" },
                    { x: B.fact, y: botY, a: "top", w: 70, t: "Facture" },
                    { x: B.suivi, y: botY, a: "top", w: 110, t: "Suivi performance" },
                    { x: B.bilan, y: botY, a: "top", w: 60, t: "Bilan" },
                    { x: B.rel, y: botY, a: "top", w: 100, t: "Relation client" },
                  ].map((l, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: `${(l.x / W) * 100}%`,
                        top: `${(l.y / H) * 100}%`,
                        width: l.w,
                        transform: l.a === "bottom" ? "translate(-50%, calc(-100% - 10px))" : "translate(-50%, 10px)",
                        textAlign: "center",
                        ...mo,
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: 0.1,
                        color: ink,
                        lineHeight: 1.25,
                      }}
                    >
                      {l.t}
                    </div>
                  ))}
                </div>
              </div>

              {/* JD */}
              <div
                style={{
                  position: "absolute",
                  right: "2.2%",
                  top: `${(topY / H) * 100}%`,
                  transform: "translateY(-50%)",
                  width: 54,
                  height: 54,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `2px solid ${t.a}`,
                  background: "#e8e6e2",
                  boxShadow: "0 4px 14px rgba(18,22,26,.12)",
                }}
              >
                <img src={jdPortraitUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
              </div>

              {/* FAR */}
              <div
                style={{
                  position: "absolute",
                  right: "2.2%",
                  top: `${(botY / H) * 100}%`,
                  transform: "translateY(-50%)",
                  width: 54,
                  height: 54,
                  borderRadius: 10,
                  background: ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FarLogo size={32} variant="white" />
              </div>

              {/* Légende */}
              <div style={{ position: "absolute", left: 22, bottom: 16, display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden>
                    <line x1="1" y1="5" x2="24" y2="5" stroke={t.a} strokeWidth="1.8" strokeDasharray="4 3" strokeLinecap="round" />
                    <path d="M24 2 L33 5 L24 8 Z" fill={t.a} />
                  </svg>
                  <span style={{ ...mo, fontSize: 11, fontWeight: 600, color: t.m }}>Document ou message</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <svg width="34" height="10" viewBox="0 0 34 10" aria-hidden>
                    <line x1="1" y1="5" x2="24" y2="5" stroke={t.a} strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M24 2 L33 5 L24 8 Z" fill={t.a} />
                  </svg>
                  <span style={{ ...mo, fontSize: 11, fontWeight: 600, color: t.m }}>Appel</span>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },

    {
      title: "Next steps",
      r: (t) => (
        <div style={{ width: "100%" }}>
          <Title t={t} s={{ fontSize: 40, marginBottom: 48 }}>
            Next steps
          </Title>
          <div style={{ position: "relative", width: "100%", paddingTop: 8 }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: "8%",
                right: "8%",
                top: 22,
                height: 2,
                background: t.a,
                opacity: 0.35,
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, alignItems: "start" }}>
              {[
                {
                  n: "01",
                  t: "Call de cadrage",
                  d: "Priorités, territoires de marques, rythme de travail. 30 minutes.",
                },
                {
                  n: "02",
                  t: "Choix du cadre",
                  d: "Exclusivité ou non-exclusivité. Conditions écrites, sans obligation de durée.",
                },
                {
                  n: "03",
                  t: "Kick-off opérationnel",
                  d: "Calendrier éditorial, premiers points, premières pistes de remplissage.",
                },
              ].map((x) => (
                <div key={x.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 18px" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: t.a,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ...se,
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      marginBottom: 18,
                      boxShadow: "0 0 0 8px #F1F0EC",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {x.n}
                  </div>
                  <div style={{ ...se, fontSize: 20, fontWeight: 700, letterSpacing: "-0.028em", color: t.c, marginBottom: 10, lineHeight: 1.22 }}>
                    {x.t}
                  </div>
                  <div style={{ ...sa, fontSize: 14.5, color: t.m, lineHeight: 1.5, maxWidth: 280 }}>{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Merci",
      r: (t, back) => {
        const pdf = Boolean(globalThis.__FAR_PDF_EXPORT);
        return (
          <div
            style={{
              textAlign: "center",
              padding: pdf ? "0" : "80px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginBottom: 40 }}>
              <FarLogo size={100} variant={t.lv} />
            </div>
            <div style={{ ...se, fontSize: 52, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16, color: t.c }}>
              Merci.
            </div>
            <div style={{ ...sa, fontSize: 17, color: t.m, lineHeight: 1.6, maxWidth: 520, marginBottom: 8 }}>
              Qui veut aller loin, vient ici.
            </div>
            <div style={{ width: 60, height: 3, background: t.a, borderRadius: 2, margin: "28px auto 0" }} />
            {back && (
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
                ← Retour à l'accueil
              </button>
            )}
          </div>
        );
      },
    }

  ];
}
